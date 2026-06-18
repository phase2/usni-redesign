import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Series & Topics', href: '/proceedings/series' },
  { label: 'Latest Issue', href: '/proceedings/apr-2026' },
  { label: 'Issue Archive', href: '/proceedings/archive' },
  { label: 'Essay Contests', href: '/essay-contests' },
  { label: 'Contact Proceedings', href: '/proceedings/contact' },
]

export default function ArticleSubNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b-4 border-navy-boldest" style={{ backgroundColor: '#E0E0CC' }}>

      {/* Mobile: toggle bar */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center justify-center gap-3 w-full h-[53px] px-4"
          aria-expanded={open}
          aria-label="Toggle Proceedings section menu"
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
            Proceedings
          </span>
        </button>

        {open && (
          <nav className="border-t border-navy-boldest/20" aria-label="Proceedings section navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
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

      {/* Desktop: horizontal nav with section label */}
      <nav className="hidden lg:flex container-site items-center gap-8 h-[62px] overflow-hidden" aria-label="Proceedings section navigation">
        <a
          href="/proceedings"
          className="font-body font-bold text-sm text-navy-boldest uppercase tracking-[0.06em] whitespace-nowrap flex-shrink-0"
        >
          Proceedings
        </a>
        <div className="w-px h-5 bg-navy-boldest/30 flex-shrink-0" />
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <a
              key={item.label}
              href={item.href}
              className={`font-body font-semibold text-sm whitespace-nowrap transition-colors
                ${isActive
                  ? 'text-navy-boldest underline underline-offset-4'
                  : 'text-navy-bolder hover:text-navy-subtle'
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
