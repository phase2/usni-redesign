import { useId, useState, type ReactNode } from 'react'

/**
 * A full-width announcement band at the top of a page, under the header: the
 * live site's site-wide alert (first used for the 2026 holiday Press sale on
 * /books), in the redesign's treatment.
 *
 * The band runs edge to edge on the lightest yellow on the site (#fefde8, the
 * donate cart banner's), with its content held to the page container so it
 * lines up with everything below it. A headline leads, then a one-line
 * summary. Anything longer, such as shipping deadlines, goes in `more`, behind
 * a See More toggle at the end of the summary, so the band stays short until
 * a reader asks for the detail.
 *
 * Unlike Alert it has no role: it is standing page content, not a status
 * change, so a screen reader should meet it in reading order rather than have
 * it announced on load. It is an <aside> named "Announcement" so it can be
 * found as a landmark and skipped. The headline is a styled <p>, not a
 * heading, so the page's own h1 below stays first in the outline.
 */
export default function SiteAlert({
  title,
  children,
  more,
}: {
  /** The headline, in the headline face. */
  title: ReactNode
  /** The one-line summary under the headline. */
  children: ReactNode
  /** Detail revealed by See More. Omit it and the toggle isn't shown. */
  more?: ReactNode
}) {
  const [open, setOpen] = useState(false)
  const moreId = useId()

  return (
    <aside aria-label="Announcement" className="bg-[#fefde8] border-b border-gold-dark">
      <div className="container-site py-5 lg:py-6 flex flex-col gap-1.5">
        <p className="font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.2]">{title}</p>
        <p className="font-body text-base text-[#1d2535] leading-relaxed">
          {children}
          {more && (
            <>
              {' '}
              <button
                type="button"
                aria-expanded={open}
                aria-controls={moreId}
                onClick={() => setOpen(o => !o)}
                className="inline-flex items-center gap-1.5 font-body font-bold text-link whitespace-nowrap"
              >
                {open ? 'See Less' : 'See More'}
                <i
                  className={`fa-solid fa-chevron-down text-[11px] transition-transform ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
            </>
          )}
        </p>
        {more && (
          <div
            id={moreId}
            hidden={!open}
            className="font-body text-[15px] text-[#1d2535] leading-relaxed max-w-[960px] pt-1.5"
          >
            {more}
          </div>
        )}
      </div>
    </aside>
  )
}

/** A promo code, set apart so it can't be misread: the site's coupon chip. */
export function PromoCode({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono font-bold text-navy-bolder border border-dashed border-gold-dark bg-white px-2 py-0.5">
      {children}
    </span>
  )
}
