const navItems = [
  { label: 'Current Issue', href: '/proceedings/apr-2026', active: true },
  { label: 'All Issues', href: '/proceedings/all-issues' },
  { label: 'Proceedings Podcast', href: '/proceedings/podcast' },
  { label: 'Essay Contests', href: '/essay-contests' },
  { label: 'American Sea Power Project', href: '/proceedings/sea-power-project' },
  { label: 'Submission Guidelines', href: '/proceedings/submissions' },
  { label: 'Contact Proceedings', href: '/proceedings/contact' },
  { label: 'Subscribe', href: '/membership/join' },
]

export default function ProceedingsSubNav() {
  return (
    <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>
      <nav className="flex items-center justify-center gap-8 h-[62px] flex-wrap overflow-hidden px-6">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={`font-body font-semibold text-sm whitespace-nowrap transition-colors
              ${item.active
                ? 'text-navy-boldest underline underline-offset-4'
                : 'text-navy-bolder hover:text-navy-subtle'
              }`}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
