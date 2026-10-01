import { useMemo, useState, type ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'

/**
 * A live example and its production markup, side by side in one block.
 *
 * The production site is built in Drupal / Twig, not React, so what a
 * developer needs from a component is its HTML and the exact Tailwind classes
 * on each element. Rather than hand-typing that (and watching it drift from the
 * component), the snippet is generated: `children` is rendered once to static
 * markup and pretty-printed. What you copy is what the prototype renders.
 *
 * The render runs in its own tree, so it is wrapped in the two providers the
 * components rely on — a router (for <Link> and useLocation) at the current
 * path, and the cart context the header reads. Interactive components are
 * captured in their initial state; pass `markupFor` to snapshot a different
 * one (e.g. a modal shown open) than the live preview.
 *
 * Image `src` values are the prototype's bundled asset paths — placeholders
 * for whatever Drupal's image styles output.
 */

/** Elements that never take a closing tag. */
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
/** Elements whose content reads better left on one line with its text. */
const INLINE = new Set(['a', 'abbr', 'b', 'button', 'code', 'em', 'i', 'label', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'u'])

/**
 * Indent markup one element per line. A leaf element holding only text and
 * inline children stays on one line, so a paragraph or a button reads as one
 * unit rather than exploding into fragments.
 */
export function formatMarkup(html: string): string {
  // Conditional class strings leave doubled and trailing spaces; tidy them so
  // the copied class list is clean.
  html = html.replace(/ class="([^"]*)"/g, (_, c: string) => ` class="${c.replace(/\s+/g, ' ').trim()}"`)
  const tokens = html.match(/<[^>]+>|[^<]+/g) ?? []
  const out: string[] = []
  let depth = 0
  let i = 0

  const tagName = (t: string) => (t.match(/^<\/?([a-zA-Z0-9-]+)/)?.[1] ?? '').toLowerCase()

  while (i < tokens.length) {
    const tok = tokens[i]
    if (!tok.startsWith('<')) {
      const text = tok.trim()
      if (text) out.push('  '.repeat(depth) + text)
      i++
      continue
    }
    if (tok.startsWith('</')) {
      depth = Math.max(0, depth - 1)
      out.push('  '.repeat(depth) + tok)
      i++
      continue
    }
    const name = tagName(tok)
    if (VOID.has(name) || tok.endsWith('/>')) {
      out.push('  '.repeat(depth) + tok)
      i++
      continue
    }
    // Look ahead: if everything up to the matching close is text or inline
    // tags, keep the element on one line.
    let j = i + 1
    let nest = 0
    let inlineOnly = true
    for (; j < tokens.length; j++) {
      const t = tokens[j]
      if (!t.startsWith('<')) continue
      const n = tagName(t)
      if (t.startsWith('</')) {
        if (nest === 0 && n === name) break
        nest--
      } else if (!VOID.has(n) && !t.endsWith('/>')) {
        if (!INLINE.has(n)) inlineOnly = false
        nest++
      } else if (!INLINE.has(n) && n !== 'br' && n !== 'img') {
        inlineOnly = false
      }
    }
    const inner = tokens.slice(i + 1, j).join('')
    if (inlineOnly && j < tokens.length && inner.length < 160) {
      out.push('  '.repeat(depth) + tok + inner.replace(/\s+/g, ' ').trim() + tokens[j])
      i = j + 1
      continue
    }
    out.push('  '.repeat(depth) + tok)
    depth++
    i++
  }
  return out.join('\n')
}

function useStaticMarkup(node: ReactNode) {
  const { pathname } = useLocation()
  return useMemo(() => {
    // React warns that useLayoutEffect "does nothing on the server" for every
    // component that uses one (the router included). It is true and harmless
    // here — the snapshot is static by design — so it is muted for the render.
    const consoleError = console.error
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].includes('useLayoutEffect does nothing on the server')) return
      consoleError(...args)
    }
    try {
      const html = renderToStaticMarkup(
        <MemoryRouter initialEntries={[pathname]}>
          <CartProvider>{node}</CartProvider>
        </MemoryRouter>,
      )
      return formatMarkup(html)
    } catch (err) {
      return `<!-- Markup could not be generated for this example: ${(err as Error).message} -->`
    } finally {
      console.error = consoleError
    }
    // The example is static per sheet; re-rendering on every state change of
    // the live preview would be wasted work.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}

export default function LiveMarkup({
  children,
  markupFor,
  label,
  previewClassName = 'p-6 lg:p-8 bg-white',
  defaultOpen = true,
}: {
  /** The live example. */
  children: ReactNode
  /** What to snapshot instead of `children`, e.g. an open state. */
  markupFor?: ReactNode
  /** Caption above the block. */
  label?: string
  /** Ground and padding for the preview pane. */
  previewClassName?: string
  /** Show the markup expanded. Long snippets can start collapsed. */
  defaultOpen?: boolean
}) {
  const markup = useStaticMarkup(markupFor ?? children)
  const [open, setOpen] = useState(defaultOpen)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(markup)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* Clipboard unavailable (insecure context) — the text is selectable. */
    }
  }

  return (
    <figure className="flex flex-col">
      {label && (
        <figcaption className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-3">
          {label}
        </figcaption>
      )}
      {/* Below sm, a preview wider than the phone scrolls inside its own box
          rather than widening the page. Only there: an x-scroll container also
          clips vertically, which would cut off popovers opened in a preview. */}
      <div className={`border border-border-light max-sm:overflow-x-auto ${previewClassName}`}>{children}</div>
      <div className="border border-t-0 border-border-light bg-navy-boldest">
        <div className="flex items-center justify-between gap-3 px-4 py-2 border-b border-white/10">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="flex items-center gap-2 font-body font-bold text-xs uppercase tracking-[0.08em] text-light-blue hover:text-white"
          >
            <i className={`fa-solid fa-chevron-${open ? 'down' : 'right'} text-[10px]`} aria-hidden="true" />
            HTML &amp; Tailwind
          </button>
          {open && (
            <button
              type="button"
              onClick={copy}
              className="font-body font-semibold text-xs text-white/70 hover:text-white"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          )}
        </div>
        {open && (
          <pre className="text-white/90 font-mono text-xs leading-relaxed p-4 overflow-x-auto max-h-[480px] overflow-y-auto">
            <code>{markup}</code>
          </pre>
        )}
      </div>
    </figure>
  )
}
