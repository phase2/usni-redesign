const navItems = [
  { label: 'Books', href: '/books' },
  { label: 'New Releases', href: '/books/new-releases' },
  { label: 'Author Events', href: '/books/author-events' },
  { label: 'Professional Military Education', href: '/books/pme' },
  { label: 'Oral Histories', href: '/books/oral-histories' },
  { label: 'About the Press', href: '/books/about' },
  { label: 'Contact the Press', href: '/books/contact' },
]

export default function BooksSubNav() {
  return (
    <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>
      <nav className="flex items-center justify-center gap-8 h-[62px] flex-wrap overflow-hidden px-6">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="font-body font-semibold text-sm text-navy-bolder hover:text-navy-subtle transition-colors whitespace-nowrap"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
