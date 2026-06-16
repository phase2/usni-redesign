import { useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Current Issue', href: '/naval-history/mar-apr-2026' },
  { label: 'All Issues', href: '/naval-history/all-issues' },
  { label: 'Naval History Podcast', href: '/naval-history/podcast' },
  { label: 'Essay Contests', href: '/essay-contests' },
  { label: 'Submission Guidelines', href: '/naval-history/submissions' },
  { label: 'Contact Naval History', href: '/naval-history/contact' },
  { label: 'Subscribe', href: '/membership/magazine-upsell?plan=full&term=1&region=us&price=75' },
]

export default function NavalHistorySubNav() {
  const { pathname } = useLocation()

  return (
    <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>
      <nav className="flex items-center justify-center gap-8 h-[62px] flex-wrap overflow-hidden px-6">
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
