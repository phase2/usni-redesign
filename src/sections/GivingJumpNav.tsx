const links = [
  { label: 'About the Foundation', href: '#about-the-foundation' },
  { label: 'Ways to Give', href: '#ways-to-give' },
  { label: 'Giving Opportunities', href: '#giving-opportunities' },
  { label: 'Tax Information', href: '#tax-information' },
]

export default function GivingJumpNav() {
  return (
    <nav className="bg-white border-b border-border-light sticky top-[86px] z-30" aria-label="Page sections">
      <div className="container-site">
        <ul className="flex justify-center items-stretch gap-0 overflow-x-auto">
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
