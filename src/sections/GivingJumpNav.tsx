import { useState } from 'react'

const links = [
  { label: 'About the Foundation', href: '#about-the-foundation' },
  { label: 'Ways to Give', href: '#ways-to-give' },
  { label: 'Giving Opportunities', href: '#giving-opportunities' },
  { label: 'Tax Information', href: '#tax-information' },
]

export default function GivingJumpNav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white border-b border-border-light sticky top-[86px] z-30" aria-label="Page sections">

      {/* Mobile: toggle bar */}
      <div className="lg:hidden">
        <button
          onClick={() => setOpen(o => !o)}
          className="flex items-center justify-center gap-3 w-full h-[53px] px-4"
          aria-expanded={open}
          aria-label="Toggle page section links"
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
            Giving
          </span>
        </button>

        {open && (
          <div className="border-t border-border-light">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-6 py-3.5 font-body font-semibold text-sm border-b border-border-light last:border-0 text-navy-bolder hover:text-navy transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: horizontal nav */}
      <div className="hidden lg:block container-site">
        <ul className="flex justify-center items-stretch gap-0">
          {links.map((link, i) => (
            <li key={link.href} className="flex-shrink-0">
              <a
                href={link.href}
                className={`relative flex items-center font-body font-bold text-[17px] text-navy-bolder px-8 py-5 whitespace-nowrap
                           hover:text-navy transition-colors
                           ${i === 0 ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gold' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
