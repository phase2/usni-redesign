import CardCta from '@/components/ui/CardCta'
const links = [
  {
    eyebrow: 'Leadership',
    headline: 'Board of Trustees',
    body: 'Meet the volunteer leaders who guide the Naval Institute Foundation and champion its mission.',
    cta: 'View Board of Trustees',
    href: '/about/leadership#foundation-trustees',
    icon: 'fa-solid fa-people-group',
  },
  {
    eyebrow: 'Partnerships',
    headline: 'Corporate Partners',
    body: 'Explore sponsorships, event partnerships, and other programs that connect your organization with naval professionals.',
    cta: 'Explore Corporate Partnerships',
    href: '/giving/corporate',
    icon: 'fa-solid fa-handshake',
  },
  {
    eyebrow: 'Recognition',
    headline: 'Donor Recognition',
    body: "Learn about the Naval Institute's premier giving societies and the special benefits extended to our most generous supporters.",
    cta: 'View Donor Recognition',
    href: '/giving/societies',
    icon: 'fa-solid fa-award',
  },
  {
    eyebrow: 'Get in Touch',
    headline: 'Contact the Foundation',
    body: 'Reach our development team with questions about giving, pledges, planned gifts, or any aspect of supporting the Naval Institute.',
    cta: 'Contact the Foundation',
    href: '/contact#foundation',
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
              className="group bg-white border border-navy-subtle hover:shadow-md
                         transition-shadow p-8 flex flex-col gap-5"
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
              <div className="mt-auto">
                <CardCta>{item.cta}</CardCta>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
