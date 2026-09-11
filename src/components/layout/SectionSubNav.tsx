import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

export interface SectionNavItem {
  label: string
  href: string
  /** Leaves the site — opens in a new tab and gets the external-link marker. */
  external?: boolean
  /**
   * Keep the tab active across sibling pages under this prefix, when they do
   * not sit beneath the item's own href — e.g. an Archive tab at
   * `/x/archive` that should also light up on `/x/archive/2024`.
   */
  matchPrefix?: string
  /**
   * Match the path exactly. A section's landing tab needs this, because its
   * href (`/giving`) is a prefix of every other page in the section and would
   * otherwise stay lit on all of them.
   */
  exact?: boolean
}

/**
 * The tan section navigation bar that sits under the site header on an
 * interior page: a horizontal row of section links on desktop, a labelled
 * toggle on mobile.
 *
 * Proceedings, Naval History, Books & Press, About, Archives, and Essay
 * Contests each carry their own hand-written copy of this bar, all six built
 * from the same markup and differing only in their link list and a wrinkle or
 * two of active-state logic. This is that markup, once, with those wrinkles as
 * options — `exact` for a landing tab, `matchPrefix` for a tab whose children
 * live elsewhere, `external` for a link off the site. Giving is the first
 * section to use it; the other six still hold their own copies and can be
 * moved over one at a time.
 */
export default function SectionSubNav({
  label,
  items,
}: {
  /** The section's name. Labels the mobile toggle and both nav landmarks. */
  label: string
  items: SectionNavItem[]
}) {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  function isActive(item: SectionNavItem) {
    if (item.external) return false
    if (item.exact) return pathname === item.href
    const prefix = item.matchPrefix ?? item.href
    return pathname === item.href || pathname.startsWith(prefix + '/')
  }

  const externalProps = (item: SectionNavItem) =>
    item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>

      {/* Mobile: toggle bar */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center justify-center gap-3 w-full h-[53px] px-4"
          aria-expanded={open}
          aria-label={`Toggle ${label} section menu`}
        >
          {open ? (
            <svg className="w-5 h-5 flex-shrink-0 text-navy-bolder" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          ) : (
            <svg className="w-5 h-5 flex-shrink-0 text-navy-bolder" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M2 5h16M2 10h16M2 15h16" />
            </svg>
          )}
          <span className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-bolder">
            {label}
          </span>
        </button>

        {open && (
          <nav className="border-t border-[#B8B49A]" aria-label={`${label} section navigation`}>
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                {...externalProps(item)}
                className={`flex items-center gap-1.5 px-6 py-3.5 font-body font-semibold text-sm border-b border-[#C8C4A8] last:border-0 transition-colors
                  ${isActive(item)
                    ? 'text-navy-boldest bg-[#D4D0BA]'
                    : 'text-navy-bolder hover:text-navy-subtle hover:bg-[#D4D0BA]'
                  }`}
              >
                {item.label}
                {item.external && (
                  <>
                    <ExternalLinkIcon />
                    <span className="sr-only">(opens in a new tab)</span>
                  </>
                )}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop: horizontal nav */}
      <nav
        className="hidden lg:flex items-center justify-center gap-8 py-4 flex-wrap px-6"
        aria-label={`${label} section navigation`}
      >
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            {...externalProps(item)}
            className={`font-body font-semibold text-sm whitespace-nowrap transition-colors
              ${isActive(item)
                ? 'text-navy-boldest link-underline-always'
                : 'text-navy-bolder hover:text-navy-subtle link-underline-hover'
              }`}
          >
            {item.label}
            {item.external && (
              <>
                {' '}
                <ExternalLinkIcon className="relative -top-px" />
                <span className="sr-only">(opens in a new tab)</span>
              </>
            )}
          </a>
        ))}
      </nav>
    </div>
  )
}
