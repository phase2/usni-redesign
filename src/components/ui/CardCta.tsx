import type { ReactNode } from 'react'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

/**
 * The site's stylized "read more" link: a bold blue label whose underline
 * sweeps in from the left, and an arrow that nudges right.
 *
 * Two forms, one treatment.
 *
 * **Inside a card** — omit `href`. The card wrapper is the link, so this
 * renders a `<span>`; an anchor here would nest inside that one. The hover is
 * driven by the *card*, not this row, so the wrapper must carry `group`. The
 * other half of the card hover lives on that wrapper: a static border and a
 * raised shadow (`hover:shadow-md transition-shadow`).
 *
 * **On its own** — pass `href`. Renders the anchor itself, carrying its own
 * `group` so the same hover works with nothing around it. This is the form for
 * a section header's "See all" or a standalone "Explore…" link.
 *
 * Card headlines stay dark and static. Only this link animates — a headline
 * sweeping its own underline alongside the CTA means two things moving on one
 * hover.
 *
 * Extracted because six cards had grown four different versions of this row —
 * some sweeping the underline, some only nudging the arrow, some widening the
 * gap. `UpcomingEvents` was the treatment we settled on; this is it. It also
 * replaced `ButtonLinkCTA`, the blue arrow-badge variant that used to sit in
 * section headers, so the site now has one stylized link rather than two.
 */
export default function CardCta({
  children,
  href,
  /** Swaps the arrow for the external-link glyph and adds the new-tab note. */
  external = false,
  direction = 'right',
  className = '',
}: {
  children: ReactNode
  /** Supply when this link stands alone; omit inside a card that is itself a link. */
  href?: string
  external?: boolean
  /**
   * Which way the arrow points, and which way it nudges on hover. `down` is for
   * a link that jumps further down the same page rather than leading away.
   */
  direction?: 'right' | 'down'
  className?: string
}) {
  const down = direction === 'down'
  const content = (
    <>
      <span className="relative">
        {children}
        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
      </span>
      {external ? (
        <>
          <ExternalLinkIcon className="transition-transform duration-200 group-hover:translate-x-0.5" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : (
        <i
          className={`fa-solid text-xs transition-transform duration-200 ${
            down ? 'fa-arrow-down group-hover:translate-y-1' : 'fa-arrow-right group-hover:translate-x-1'
          }`}
          aria-hidden="true"
        />
      )}
    </>
  )

  const classes = `inline-flex items-center gap-2 font-body font-bold text-sm text-[#0466c8] ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={`group ${classes}`}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {content}
      </a>
    )
  }

  return <span className={classes}>{content}</span>
}
