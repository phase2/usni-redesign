import type { ReactNode } from 'react'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import InlineItalics from '@/components/ui/InlineItalics'

/**
 * A string of transcribed copy with its links and italics, so data files can
 * keep paragraphs as plain strings instead of JSX.
 *
 * - `[label](href)` is a link. An http(s) href opens in a new tab with the
 *   external-link icon; anything else (a site path, `mailto:`, `tel:`) opens
 *   in place.
 * - Email addresses and US phone numbers, "(410) 295-1054" or
 *   "410-295-1054", link themselves, since nearly every Foundation paragraph
 *   ends on both and none should need marking up by hand.
 * - `*text*` is italic, as in InlineItalics (titles: *Proceedings*).
 *
 * Links take `.text-link`, the site's underlined in-text link, so they don't
 * rely on color alone to stand out from the paragraph.
 */

const TOKEN = new RegExp(
  [
    String.raw`\[([^\]]+)\]\(([^)\s]+)\)`, // [label](href)
    String.raw`([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})`, // email
    String.raw`(\(\d{3}\)\s?\d{3}-\d{4}|\b\d{3}-\d{3}-\d{4}\b)`, // phone
  ].join('|'),
  'g',
)

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:\/\//.test(href)
  return (
    <a
      href={href}
      className="text-link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external && (
        <>
          {' '}
          <ExternalLinkIcon />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </a>
  )
}

export default function InlineRichText({ text }: { text: string }) {
  const out: ReactNode[] = []
  let last = 0
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0
    if (at > last) out.push(<InlineItalics key={`t${last}`} text={text.slice(last, at)} />)
    const [whole, label, href, email, phone] = m
    if (label !== undefined) {
      out.push(<TextLink key={at} href={href}><InlineItalics text={label} /></TextLink>)
    } else if (email !== undefined) {
      out.push(<TextLink key={at} href={`mailto:${email}`}>{email}</TextLink>)
    } else if (phone !== undefined) {
      out.push(<TextLink key={at} href={`tel:${phone.replace(/\D/g, '')}`}>{phone}</TextLink>)
    }
    last = at + whole.length
  }
  if (last < text.length) out.push(<InlineItalics key={`t${last}`} text={text.slice(last)} />)
  return <>{out}</>
}
