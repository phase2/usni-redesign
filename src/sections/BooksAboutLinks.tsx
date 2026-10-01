import CardCta from '@/components/ui/CardCta'

/**
 * Wayfinding from About the Press into its three basic pages.
 *
 * Text-only cards — none of the pages has artwork — in the site's linked-card
 * treatment: the whole card is the link, the border stays put, the shadow lifts,
 * and only the CardCta animates (see CardCta). Summaries are drawn from each
 * page's own opening copy.
 */
const links = [
  {
    title: 'Examination Requests',
    body: 'How professors and instructors can request examination copies for course adoption, and the desk copies an adopted title earns.',
    cta: 'Request an exam copy',
    href: '/books/about/examination-requests',
  },
  {
    title: 'Writing for the Naval Institute Press',
    body: 'What to include with a proposal or completed manuscript, and how to submit your work digitally or by mail.',
    cta: 'Read the submission guidelines',
    href: '/books/about/writing',
  },
  {
    title: 'Artificial Intelligence at Naval Institute Press',
    body: 'How the Press uses AI to support publishing operations, where it will not, and what is expected of authors and peer reviewers.',
    cta: 'Read our AI policy',
    href: '/books/about/ai',
  },
]

export default function BooksAboutLinks() {
  return (
    <section className="bg-white pb-12 lg:pb-16">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex flex-col gap-3 bg-white border border-navy-subtle p-6 lg:p-7 h-full hover:shadow-md transition-shadow"
            >
              <h3 className="font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]">
                {link.title}
              </h3>
              <p className="font-body text-[15px] text-neutral-bold leading-[1.65] flex-1">
                {link.body}
              </p>
              <div className="pt-1">
                <CardCta>{link.cta}</CardCta>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
