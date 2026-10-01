import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import coverBelfast from '@/assets/images/books/digital-editions/belfast.jpg'
import coverCorsair from '@/assets/images/books/digital-editions/corsair.jpg'
import coverSaltwater from '@/assets/images/books/digital-editions/saltwater.jpg'

/**
 * The three digital editions on the live /press/digitaleditions page, in its
 * order: HMS Belfast, F4U Corsair, Saltwater Leadership, Second Edition.
 *
 * Each is a cover beside its title and description, as the live page's
 * two-column rows lay them out. The live cover is the only link to the
 * edition; it stays one here, and a navy button under the description gives
 * the row a destination a reader can find without knowing to click the art.
 * Its external-link glyph takes the 1.1em every button uses, not the inline
 * 0.75em default.
 * Both go to the edition's page on app.usni.org, the separate digital book
 * platform, so both open in a new tab.
 *
 * Covers are the live page's own art (`/sites/default/files/*600_0.jpg`).
 * Descriptions are transcribed as the live page has them.
 */
interface DigitalEdition {
  title: string
  href: string
  cover: string
  coverAlt: string
  description: ReactNode
}

const editions: DigitalEdition[] = [
  {
    title: 'HMS Belfast',
    href: 'https://app.usni.org/products/hms-belfast',
    cover: coverBelfast,
    coverAlt: 'Cover image of the Naval History Special Edition HMS Belfast',
    description: (
      <p>
        HMS <em>Belfast</em> remains the last of the “full-size” British cruisers, a
        designation that ended with her construction due to the restrictions imposed
        by the 2nd London Naval Treaty. In 1938, shortly after commissioning,{' '}
        <em>Belfast</em>’s career was nearly cut short when she was severely damaged by
        a German magnetic mine. However, because of her brand-new status she was
        granted a reprieve and underwent extensive repair work in drydocks. Her
        survival can largely be attributed to these repairs, which enhanced her unique
        capabilities. At the time of writing, HMS <em>Belfast</em> is due to see a
        namesake successor, in the form of a modern Type 26 frigate, enter service
        before the end of the decade.
      </p>
    ),
  },
  {
    title: 'F4U Corsair',
    href: 'https://app.usni.org/products/f4u-corsair',
    cover: coverCorsair,
    coverAlt: 'Cover image of the Naval History Special Edition F4U Corsair',
    description: (
      <p>
        Rarely is an aircraft design so inspired that it brings forth near-universal
        recognition and acclaim. In more than 110 years of naval aviation history, and
        more than 50 years of Vought Corsairs in active-duty squadrons, one Corsair
        model, the F4U, stands alone. The Vought F4U Corsair heads a short list of such
        aircraft by dint of its supremely efficient lines - a melding of the highly
        developed Double Wasp powerplant, the outsize Hydromatic propeller that it
        drove, and the finely-tuned airframe that wrapped it. Navy and Marine Corps
        aviators held the Corsair in high esteem for its ruggedness, speed and
        adaptability as fighter and bomber, long after its first appearance in the
        South Pacific in World War II, through the closing weeks of the Korean War. The
        Corsair's potency made it sought after by allied air forces long after its
        final days in U.S. inventory, rendering vital service in French livery at Dien
        Bien Phu, and finally, with South American air forces in the so-called "Soccer
        War" of the late 1960s. Here is the complete history of this storied aircraft,
        from early design through the legendary dogfights of Maj. Gregory “Pappy”
        Boyington’s Black Sheep Squadron over the Pacific, and operations in Korea and
        Vietnam.
      </p>
    ),
  },
  {
    title: 'Saltwater Leadership, Second Edition',
    href: 'https://app.usni.org/products/saltwater-leadership-second-edition',
    cover: coverSaltwater,
    coverAlt: 'Cover image of the book Saltwater Leadership',
    description: (
      <p>
        <em>Saltwater Leadership</em>, Second Edition is about leadership in the
        maritime environment. The unforgiving, dynamic, and unconquerable nature of the
        sea requires direct leadership, often with very little margin of error. The
        unique and common nature of professional life on the sea applies not only to
        junior naval leaders but also officer and enlisted leaders from the Marines,
        Coast Guard and Merchant Marines. Based on decades of leadership experiences,{' '}
        <em>Saltwater Leadership</em> covers a wide variety of topics, including basic
        junior officer leadership, taking care of people, providing forceful backup,
        leadership and culture, and professional competence.
      </p>
    ),
  },
]

export default function DigitalEditionsList() {
  return (
    <section className="bg-surface-subtle py-12 lg:py-16">
      <div className="container-site flex flex-col">
        {editions.map((edition, i) => (
          <article
            key={edition.href}
            className={`grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 sm:gap-10 lg:gap-14 items-start py-10 lg:py-12 ${
              i > 0 ? 'border-t border-neutral-subtler' : 'pt-0 lg:pt-0'
            } last:pb-0 lg:last:pb-0`}
          >
            <a
              href={edition.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-[180px] sm:w-full shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={edition.cover}
                alt={edition.coverAlt}
                loading="lazy"
                className="w-full h-auto block"
              />
              <span className="sr-only">
                {edition.title} on the Digital Book platform (opens in a new tab)
              </span>
            </a>

            <div className="flex flex-col gap-4 max-w-[760px]">
              <h2 className="font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15]">
                {edition.title}
              </h2>
              <div className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
                {edition.description}
              </div>
              <div className="pt-2">
                <ButtonLink
                  href={edition.href}
                  variant="navy"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View the digital edition
                  <ExternalLinkIcon size="1.1em" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
