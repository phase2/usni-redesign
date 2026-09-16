import { useState } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * About section navigation, following the same tan section-nav pattern used by
 * Proceedings, Naval History, and Essay Contests.
 *
 * "Mission & Vision" is deliberately absent — that page is being retired and
 * its content now lives on the About landing page. The Taylor Conference
 * Center has moved to the Giving section; the About landing still cards
 * across to it, but it is no longer a stop in this nav.
 */
const navItems = [
  { label: 'Overview', href: '/about' },
  { label: 'History', href: '/about/history' },
  { label: 'Strategic Plan', href: '/about/strategic-plan' },
  { label: 'Leadership & Staff', href: '/about/leadership' },
  { label: 'Media Inquiries', href: '/about/media' },
  { label: 'Contact USNI', href: '/contact#general' },
]

function isActive(pathname: string, href: string) {
  // '/about' prefixes every page in the section, so the landing tab needs an
  // exact match or it would stay active on every sub-page.
  if (href === '/about') return pathname === href
  return pathname === href || pathname.startsWith(href + '/')
}

export default function AboutSubNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>

      {/* Mobile: toggle bar */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center justify-center gap-3 w-full h-[53px] px-4"
          aria-expanded={open}
          aria-label="Toggle About section menu"
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
            About
          </span>
        </button>

        {open && (
          <nav className="border-t border-[#B8B49A]" aria-label="About section navigation">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-6 py-3.5 font-body font-semibold text-sm border-b border-[#C8C4A8] last:border-0 transition-colors
                  ${isActive(pathname, item.href)
                    ? 'text-navy-boldest bg-[#D4D0BA]'
                    : 'text-navy-bolder hover:text-navy-subtle hover:bg-[#D4D0BA]'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}
      </div>

      {/* Desktop: horizontal nav */}
      <nav
        className="hidden lg:flex items-center justify-center gap-8 py-4 flex-wrap px-6"
        aria-label="About section navigation"
      >
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`font-body font-semibold text-sm whitespace-nowrap transition-colors
              ${isActive(pathname, item.href)
                ? 'text-navy-boldest link-underline-always'
                : 'text-navy-bolder hover:text-navy-subtle link-underline-hover'
              }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
