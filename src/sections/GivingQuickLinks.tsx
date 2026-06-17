const links = [
  {
    eyebrow: 'Leadership',
    headline: 'Board of Trustees',
    body: 'Meet the volunteer leaders who guide the Naval Institute Foundation and champion its mission.',
    cta: 'View Board of Trustees',
    href: '/giving/board-of-trustees',
    icon: 'fa-solid fa-people-group',
  },
  {
    eyebrow: 'Partnerships',
    headline: 'Corporate Opportunities',
    body: 'Explore sponsorships, event partnerships, and other programs that connect your organization with naval professionals.',
    cta: 'Explore Corporate Giving',
    href: '/giving/corporate',
    icon: 'fa-solid fa-handshake',
  },
  {
    eyebrow: 'Recognition',
    headline: 'Donor Recognition',
    body: "Learn about the Naval Institute's premier giving societies and the special benefits extended to our most generous supporters.",
    cta: 'View Donor Recognition',
    href: '/giving/recognition',
    icon: 'fa-solid fa-award',
  },
  {
    eyebrow: 'Get in Touch',
    headline: 'Contact the Foundation',
    body: 'Reach our development team with questions about giving, pledges, planned gifts, or any aspect of supporting the Naval Institute.',
    cta: 'Contact the Foundation',
    href: '/giving/contact',
    icon: 'fa-solid fa-envelope',
  },
]

export default function GivingQuickLinks() {
  return (
    <section className="py-16 lg:py-20 bg-[#002B5C]">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((item) => (
            <a
              key={item.headline}
              href={item.href}
              className="group bg-white p-8 flex flex-col gap-5 hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-[#EBF4FF] flex items-center justify-center text-[#0466c8] flex-shrink-0">
                <i className={item.icon} style={{ fontSize: '1.25rem' }} />
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-body font-medium text-xs uppercase tracking-[0.08em] text-[#0466c8]">
                  {item.eyebrow}
                </p>
                <h3 className="font-headline text-xl text-navy-bolder leading-[1.2]">
                  {item.headline}
                </h3>
                <p className="font-body text-sm text-neutral-subtle leading-relaxed">
                  {item.body}
                </p>
              </div>
              <div className="mt-auto flex items-center gap-2 font-body font-semibold text-sm text-[#0466c8] group-hover:gap-3 transition-all">
                <span className="relative">
                  {item.cta}
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#0466c8] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
                </span>
                <i className="fa-solid fa-arrow-right" style={{ fontSize: '0.75rem' }} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
