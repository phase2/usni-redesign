import { useLocation } from 'react-router-dom'

const navItems = [
  { label: 'About the Archives', href: '/archives' },
  { label: 'Oral Histories', href: '/archives/oral-histories' },
  { label: 'Memoirs', href: '/archives/memoirs' },
  { label: 'Photos', href: '/archives/photos' },
  { label: 'Contact the Archives', href: '/archives/contact' },
]

export default function ArchivesSubNav() {
  const { pathname } = useLocation()

  return (
    <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>
      <nav className="flex items-center justify-center gap-8 h-[62px] flex-wrap overflow-hidden px-6" aria-label="Archives navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/archives' && pathname.startsWith(item.href + '/'))
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
