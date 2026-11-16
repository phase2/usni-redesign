import { NavyButtonLink } from '@/components/ui/Button'

/**
 * Mission and vision, absorbed onto the About landing page.
 *
 * The standalone /about-us/mission-and-vision page is being retired, so its copy
 * lives here. The hero already carries the "Founded in 1873…" opener, so this
 * block picks up at the current page's second paragraph. The right column uses
 * the headline-over-gold-rule callout treatment from the membership landing
 * page, carrying the current page's exact Our Mission / Our Vision statements.
 */
const statements = [
  {
    heading: 'Our Mission',
    body: 'To advance the professional, literary, and scientific understanding of sea power and the critical issues shaping global security.',
  },
  {
    heading: 'Our Vision',
    body: 'To be the center for debate and thought leadership on the future of sea power, maritime security, and national defense.',
  },
]

export default function AboutMissionVision() {
  return (
    <section id="mission-and-vision" className="py-16 lg:py-20 bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16">

          {/* Left — text content */}
          <div className="flex flex-col gap-6">
            <div className="eyebrow-headline">
              <p className="eyebrow">Mission &amp; Vision</p>
              <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">
                A place where free and independent debate may flourish
              </h2>
            </div>

            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              The U.S. Naval Institute is a non-profit membership association serving a community of
              individuals who participate in an open forum to debate key issues in the Sea Services.
              We serve our members by providing a monthly journal,{' '}
              <a href="/proceedings" className="text-link">
                Proceedings
              </a>
              , and other benefits such as our daily news service{' '}
              <a href="/news" className="text-link">
                USNI News
              </a>
              ; blogs, newsletters, and mobile apps; discounts off all titles from the{' '}
              <a href="/press" className="text-link">
                Naval Institute Press
              </a>
              ; as well as a discounted subscription rate on our award-winning bi-monthly{' '}
              <a href="/naval-history" className="text-link">
                Naval History
              </a>{' '}
              magazine. Naval Institute members also have access to our{' '}
              <a href="/archives" className="text-link">
                archive
              </a>
              , and networking and professional development programs via our conferences and events.
            </p>

            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              Your membership ensures that the Naval Institute carries on its vital mission as{' '}
              <em>The Independent Forum of the Sea Services</em> — a place where free and independent
              debate may flourish.
            </p>

            <div>
              <NavyButtonLink href="/membership">
                Learn more about USNI membership
              </NavyButtonLink>
            </div>
          </div>

          {/* Right — Our Mission / Our Vision callouts */}
          <div className="flex flex-col gap-10 lg:gap-12 lg:pl-4">
            {statements.map(({ heading, body }) => (
              <div key={heading} className="flex flex-col gap-5 lg:gap-6">
                <h3 className="font-headline text-[38px] lg:text-[48px] text-navy-subtle leading-[1.1]">
                  {heading}
                </h3>
                <div className="h-1 w-full bg-gold-subtle" />
                <p className="font-body text-[18px] text-navy-bolder leading-[1.4]">{body}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
