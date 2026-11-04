import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  prototypeMap,
  flattenLinks,
  type PrototypeGroup,
  type PrototypeLink,
} from '@/data/prototypeMap'

/**
 * Prototype navigator: a "Menu" pill pinned to the bottom-left corner of every
 * page that opens a panel linking to every component sheet and prototype page.
 *
 * It is a review tool, not part of the USNI design, so it is styled as neutral
 * chrome sitting over the prototype rather than as a site component. The look
 * and shortcuts match the Ionis and Davis Polk prototypes: a near-black pill
 * and rounded panel in the system UI font, a blurred scrim behind the open
 * panel, ⌘K / Ctrl+K to toggle, Esc to close, and `.` to hide the pill entirely
 * for screenshots and presenting. The full list lives on one data source shared
 * with the /toc table of contents (src/data/prototypeMap.ts).
 *
 * Unlike those projects' flat lists, groups here collapse so ~120 links stay
 * scannable; the one holding the current page opens by default and the current
 * page is marked. Typing in the filter opens every group with a match and hides
 * the rest.
 *
 * Stacking: z-[55] sits above the sticky header (40/50) and the article meter
 * banner (50), with the scrim just under it at 54, and below modals and the
 * mobile menu (60), which should cover it while open.
 *
 * Not rendered inside an iframe (the Navigation sheet frames the live header
 * and footer, and a launcher in each frame would be noise) nor on the
 * /design-system/preview routes those frames load.
 */

const inFrame = typeof window !== 'undefined' && window.self !== window.top

/** The same system UI stack the Ionis and Davis Polk chrome uses. */
const CHROME_FONT = 'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif'

function matches(link: PrototypeLink, query: string): boolean {
  const q = query.toLowerCase()
  return (
    link.label.toLowerCase().includes(q) ||
    (link.href ?? '').toLowerCase().includes(q) ||
    (link.children ?? []).some((child) => matches(child, query))
  )
}

function filterLinks(links: PrototypeLink[], query: string): PrototypeLink[] {
  if (!query) return links
  return links
    .filter((link) => matches(link, query))
    .map((link) => {
      // A parent that matches on its own keeps all its children; otherwise
      // narrow them to the ones that matched.
      const selfMatch =
        link.label.toLowerCase().includes(query.toLowerCase()) ||
        (link.href ?? '').toLowerCase().includes(query.toLowerCase())
      return selfMatch || !link.children ? link : { ...link, children: filterLinks(link.children, query) }
    })
}

function NavLinks({
  links,
  pathname,
  depth = 0,
}: {
  links: PrototypeLink[]
  pathname: string
  depth?: number
}) {
  return (
    <ul className={depth > 0 ? 'ml-5 pl-2 border-l border-white/10' : ''}>
      {links.map((link) => {
        // A demo link may carry a query (Search Results); the page is the path
        const current = link.href?.split('?')[0] === pathname
        const label = (
          <>
            <span className="min-w-0">{link.label}</span>
            {link.note && <span className="flex-shrink-0 text-xs text-white/35">{link.note}</span>}
          </>
        )
        return (
          <li key={`${link.label}-${link.href ?? ''}`}>
            {link.href ? (
              <Link
                to={link.href}
                aria-current={current ? 'page' : undefined}
                className={`flex items-baseline justify-between gap-3 rounded-md px-3 py-2 text-[15px] leading-[1.35] ${
                  current
                    ? 'bg-white/[0.12] text-white'
                    : 'text-white/[0.78] hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                {label}
              </Link>
            ) : (
              <p className="flex items-baseline justify-between gap-3 px-3 py-2 text-[15px] leading-[1.35] text-white/45">
                {label}
              </p>
            )}
            {link.children && <NavLinks links={link.children} pathname={pathname} depth={depth + 1} />}
          </li>
        )
      })}
    </ul>
  )
}

function Group({
  group,
  pathname,
  query,
  defaultOpen,
}: {
  group: PrototypeGroup
  pathname: string
  query: string
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const links = filterLinks(group.links, query)
  if (links.length === 0) return null
  // A live filter overrides the collapse state so every match is visible.
  const expanded = query ? true : open

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={expanded}
        className="flex items-center justify-between w-full rounded-md px-3 py-2 text-[15px] font-medium text-white text-left hover:bg-white/[0.06]"
      >
        {group.title}
        <i
          className={`fa-solid fa-chevron-down text-[10px] text-white/40 transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {expanded && (
        <div className="pb-2">
          <NavLinks links={links} pathname={pathname} />
        </div>
      )}
    </div>
  )
}

export default function PrototypeNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // The group holding the current page, opened by default each time.
  const currentGroupId = useMemo(() => {
    for (const section of prototypeMap) {
      for (const group of section.groups) {
        if (flattenLinks(group.links).some((link) => link.href === pathname)) return group.id
      }
    }
    return null
  }, [pathname])

  // Close on navigation, so following a link reveals the page it opened.
  useEffect(() => {
    setOpen(false)
    setQuery('')
  }, [pathname])

  // ⌘K / Ctrl+K toggles, Esc closes, `.` hides the pill (ignored while typing).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setHidden(false)
        setOpen((o) => !o)
        return
      }
      if (e.key === 'Escape') {
        setOpen(false)
        return
      }
      const target = e.target as HTMLElement | null
      const typing =
        !!target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable)
      if (e.key === '.' && !typing && !e.metaKey && !e.ctrlKey && !e.altKey) {
        setOpen(false)
        setHidden((h) => !h)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) inputRef.current?.focus()
    else setQuery('')
  }, [open])

  if (inFrame || pathname.startsWith('/design-system/preview')) return null

  const q = query.trim()
  const anyMatch =
    !q || prototypeMap.some((s) => s.groups.some((g) => filterLinks(g.links, q).length > 0))

  return (
    <div className="print:hidden" style={{ fontFamily: CHROME_FONT }} hidden={hidden}>
      {/* While the menu is open the page behind it is dimmed and blurred;
          clicking it closes the menu. */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[54] bg-[rgb(17_17_20/0.35)] backdrop-blur-[6px] transition-opacity duration-200 motion-reduce:transition-none ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <div className="fixed bottom-4 left-4 z-[55] text-white">
        {open && (
          <div
            id="prototype-nav-panel"
            role="dialog"
            aria-label="Prototype navigation"
            className="mb-2 flex flex-col w-[min(440px,calc(100vw-32px))] max-h-[min(80vh,820px)] overflow-hidden rounded-[14px] border border-white/10 bg-[#111114] shadow-[0_24px_48px_rgb(0_0_0/0.4)]"
          >
            <div className="flex items-center justify-between gap-3 px-5 pt-3.5 pb-1.5 text-xs text-white/40">
              <Link
                to="/toc"
                className="group inline-flex items-center gap-2 text-[15px] font-semibold text-light-blue"
              >
                {/* Underline the words only; the arrow stays bare on hover. */}
                <span aria-hidden="true">←</span>
                <span className="group-hover:underline">Table of contents</span>
              </Link>
              <span className="whitespace-nowrap">
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">⌘K</kbd> toggle ·{' '}
                <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">.</kbd> hide
              </span>
            </div>

            <div className="px-3.5 pt-2 pb-3 border-b border-white/10">
              <label htmlFor="prototype-nav-filter" className="sr-only">
                Filter pages
              </label>
              <input
                ref={inputRef}
                id="prototype-nav-filter"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Filter pages and components…"
                className="w-full rounded-lg border-0 bg-white/[0.08] px-3.5 py-2.5 text-[15px] text-white placeholder:text-white/35 focus:outline-none focus:bg-white/[0.12]"
                style={{ fontFamily: CHROME_FONT }}
              />
            </div>

            <nav className="flex-1 overflow-y-auto overscroll-contain px-2 pt-2 pb-3">
              {!anyMatch && <p className="px-3 py-6 text-[15px] text-white/50">No pages match “{q}”.</p>}
              {prototypeMap.map((section) => (
                <div
                  key={section.id}
                  className="mb-2"
                  // Drop a section heading whose groups all filtered away.
                  hidden={!!q && !section.groups.some((g) => filterLinks(g.links, q).length > 0)}
                >
                  <p className="px-3 pt-3 pb-1.5 text-xs font-bold uppercase tracking-[0.08em] text-white/45">
                    {section.title}
                  </p>
                  {section.groups.map((group) => (
                    <Group
                      // Remount per page so "open by default" follows navigation.
                      key={`${group.id}-${pathname}`}
                      group={group}
                      pathname={pathname}
                      query={q}
                      defaultOpen={group.id === currentGroupId}
                    />
                  ))}
                </div>
              ))}
            </nav>
          </div>
        )}

        <div className="flex w-max items-center gap-1 rounded-full border border-white/10 bg-[#111114] p-1 shadow-[0_12px_28px_rgb(0_0_0/0.3)]">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="prototype-nav-panel"
            className="flex items-center gap-2.5 rounded-full py-[9px] pl-3.5 pr-[18px] text-[15px] font-medium hover:bg-white/[0.08]"
          >
            <span className="flex flex-col gap-[3px]" aria-hidden="true">
              <span className="block h-px w-4 bg-white/70" />
              <span className="block h-px w-4 bg-white/70" />
              <span className="block h-px w-4 bg-white/70" />
            </span>
            Menu
          </button>
        </div>
      </div>
    </div>
  )
}
