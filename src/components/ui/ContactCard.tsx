import type { ReactNode } from 'react'

/**
 * The pale contact block that sits in an interior page's right-hand rail:
 * a label, a name, and who to write to.
 *
 * Built for the Books & Press collection pages — "Series Editor" and "Series
 * Contact" beside the series introduction — and now also carries the Corporate
 * Partners contact, so a reader who came only for a name to write to finds it
 * in the same place on either page.
 *
 * The frame is `navy-subtle`, matching the bordered cards elsewhere on these
 * pages rather than the paler blue it used to carry; the hairline above the
 * email stays light, since it separates rather than frames.
 */
export default function ContactCard({
  label,
  name,
  role,
  note,
  children,
  inquiriesLabel = 'Send inquiries to:',
  email,
  phone,
}: {
  /** Eyebrow naming the block, e.g. "Series Editor". */
  label: string
  name: string
  /** Job title, under the name. */
  role?: string
  /** A sentence under the name, where the record carries prose instead. */
  note?: string
  /** Anything between the name and the contact footer, e.g. an editor bio. */
  children?: ReactNode
  inquiriesLabel?: string
  email?: string
  phone?: string
}) {
  return (
    <div className="bg-surface-subtle border border-navy-subtle p-6 lg:p-7 flex flex-col gap-4">
      <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
        {label}
      </p>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-headline text-[24px] text-navy-bolder leading-[1.15]">{name}</h3>
        {role && (
          <p className="font-body font-semibold text-[13px] text-navy-subtle leading-snug">
            {role}
          </p>
        )}
        {note && (
          <p className="font-body text-sm text-neutral-subtle leading-[1.65]">{note}</p>
        )}
      </div>

      {children}

      {(email || phone) && (
        <div className="border-t border-light-blue pt-4 mt-1">
          <p className="font-body font-bold text-sm text-navy-bolder mb-2">{inquiriesLabel}</p>
          {/* `items-start` so each link shrinks to its own text. A flex column
              stretches its items to full width by default, and the animated
              underline paints across the element's whole box — which ran the
              rule out to the card's edge. */}
          <div className="flex flex-col items-start gap-1">
            {email && (
              <a
                href={`mailto:${email}`}
                className="font-body text-sm text-[#0466C8] hover:text-navy-bolder transition-colors break-words link-underline-hover"
              >
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                className="font-body text-sm text-[#0466C8] hover:text-navy-bolder transition-colors link-underline-hover"
              >
                {phone}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
