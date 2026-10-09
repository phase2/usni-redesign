import { useState } from 'react'
import { useLocation } from 'react-router-dom'

interface SubNavItem {
  label: string
  href: string
  /**
   * Extra path prefixes that should light this item up. The PME hub owns the
   * series pages and the reading lists, which live at their own routes rather
   * than under the hub's own path, so they need naming here to keep the nav
   * from going blank on a series page.
   */
  alsoActiveUnder?: string[]
}

const navItems: SubNavItem[] = [
  { label: 'Books', href: '/books/collection' },
  { label: 'New Releases', href: '/books/new-releases' },
  { label: 'Author Events', href: '/books/author-events' },
  {
    label: 'Professional Military Education',
    href: '/books/professional-military-education',
    alsoActiveUnder: ['/books/series', '/books/military-reading-lists'],
  },
  { label: 'Oral Histories', href: '/archives/oral-histories' },
  { label: 'Digital Editions', href: '/books/digital-editions' },
  { label: 'About the Press', href: '/books/about' },
  { label: 'Contact the Press', href: '/contact#press' },
]

function isItemActive(pathname: string, item: SubNavItem): boolean {
  if (pathname === item.href || pathname.startsWith(item.href + '/')) return true
  return (item.alsoActiveUnder ?? []).some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/'),
  )
}

export default function BooksSubNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>

      {/* Mobile: toggle bar */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center gap-3 w-full h-[53px] px-6 text-left"
          aria-expanded={open}
          aria-label="Toggle Books section menu"
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
            Books &amp; Press
          </span>
        </button>

        {open && (
          <nav className="border-t border-[#B8B49A]" aria-label="Books section navigation">
            {navItems.map((item) => {
              const isActive = isItemActive(pathname, item)
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block px-6 py-3.5 font-body font-semibold text-sm border-b border-[#C8C4A8] last:border-0 transition-colors
                    ${isActive
                      ? 'text-navy-boldest bg-[#D4D0BA]'
                      : 'text-navy-bolder hover:text-navy-subtle hover:bg-[#D4D0BA]'
                    }`}
                >
                  {item.label}
                </a>
              )
            })}
          </nav>
        )}
      </div>

      {/* Desktop: horizontal nav */}
      <nav
        className="hidden lg:flex items-center justify-center gap-8 py-4 flex-wrap px-6"
        aria-label="Books section navigation"
      >
        {navItems.map((item) => {
          const isActive = isItemActive(pathname, item)
          return (
            <a
              key={item.label}
              href={item.href}
              className={`font-body font-semibold text-sm whitespace-nowrap transition-colors
                ${isActive
                  ? 'text-navy-boldest link-underline-always'
                  : 'text-navy-bolder hover:text-navy-subtle link-underline-hover'
                }`}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
    </div>
  )
}
