const links = [
  {
    eyebrow: 'Write & Compete',
    headline: 'Essay Contests',
    body: 'Naval History sponsors annual essay competitions open to active-duty military, veterans, students, and civilian scholars. Cash prizes and publication await.',
    cta: 'View Essay Contests',
    href: '/essay-contests',
    icon: 'fa-solid fa-trophy',
  },
  {
    eyebrow: 'Contribute',
    headline: 'Submission Guidelines',
    body: 'Naval History publishes rigorously researched articles from historians, veterans, and enthusiasts. Review our guidelines and pitch your story.',
    cta: 'See Submission Guidelines',
    href: '/naval-history/submissions',
    icon: 'fa-solid fa-file-pen',
  },
  {
    eyebrow: 'Get in Touch',
    headline: 'Contact Naval History',
    body: 'Have a question for the editorial team? Reach out about subscriptions, submissions, advertising, or any other Naval History Magazine inquiry.',
    cta: 'Contact Naval History',
    href: '/naval-history/contact',
    icon: 'fa-solid fa-envelope',
  },
]

export default function NavalHistoryFeaturedContent() {
  return (
    <section className="py-16 lg:py-20 bg-surface-subtle">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
