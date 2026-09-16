import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

/** The Taylor Center runs its own site, off usni.org. */
export const JCTCC_URL = 'https://www.jackctaylorconferencecenter.org/'

/**
 * What the Center is, and the specifications a prospective host or donor
 * actually asks about.
 *
 * The live /about-us/taylor-conference-center page opens on the 30 September
 * 2021 dedication and reads, five years on, as an event recap. The same facts
 * are here without the dateline — the building, what is in it, and who paid for
 * it — and the 2021 material becomes the history block further down the page.
 *
 * NOTE for USNI: the Center's own site now writes the force protection standard
 * as "Department of War" and states LEED *Silver*; the USNI page says
 * "Department of Defense" and "LEED certification standards". The Center's
 * wording is used below, since it is authoritative about the building — worth a
 * confirmation before launch.
 */
const facts: { label: string; value: string }[] = [
  {
    label: 'Location',
    value: '291 Wood Rd., Annapolis, Maryland — adjoining Naval Institute headquarters on the Yard of the U.S. Naval Academy, within 30 miles of Washington, D.C., and Baltimore.',
  },
  { label: 'Auditorium', value: '406 seats' },
  { label: 'Meeting rooms', value: 'Five, varying in size' },
  { label: 'Terraces', value: 'Two, indoor/outdoor' },
  { label: 'Also on site', value: 'Broadcast studio and reception spaces' },
  {
    label: 'Security',
    value: 'A Temporary Secure Working Area, approved for classified presentations and discussion up to the TS/SCI level on a per-use, waiver basis.',
  },
  { label: 'Sustainability', value: 'LEED Silver certified' },
  { label: 'Funding', value: 'Built entirely with private donations' },
]

export default function TaylorCenterAbout() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        {/* Prose left, facts right — the arrangement the Giving sub-pages and the
            Books & Press collection pages use, so a reader who came only for a
            capacity or an address finds it in the same place. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16">
          <div>
            <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
              The Naval Institute&rsquo;s place to convene
            </h2>

            <div className="flex flex-col gap-5 max-w-[780px] mt-6">
              <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
                In 2018 the Naval Institute set out to build a physical flagship — somewhere the
                people committed to giving the nation the finest Navy, Marine Corps, and Coast Guard
                could convene and argue face to face about sea power and global security. The Jack C.
                Taylor Conference Center is that place: a high-tech venue on the Yard of the U.S.
                Naval Academy, a short walk from the Institute&rsquo;s own front door.
              </p>
              <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
                Naval professionals, historians, government officials, midshipmen, students, and
                interested civilians gather here for conferences, lectures, workshops, wargames, and
                networking. The building meets federal force protection standards and is optimized
                for classified discussion on a per-use, waiver basis, so conversations that cannot
                happen in an ordinary conference hotel can happen here.
              </p>
              <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
                The Center was funded entirely with private donations, and private support is what
                keeps it current. Gifts to the Jack C. Taylor Conference Center Maintenance &amp;
                Technology Fund pay for the upkeep and the equipment behind every session held here.
              </p>

              {/* The Center's own site is the one thing this section sends a
                  reader away for — the page's own giving paths live further
                  down, under the commemorative gifts, so it gets the slot to
                  itself as a button rather than a link. */}
              <div className="pt-1">
                <ButtonLink
                  href={JCTCC_URL}
                  variant="navy"
                  size="sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit the Center&rsquo;s website
                  <ExternalLinkIcon size="1.1em" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              </div>
            </div>
          </div>

          <aside>
            <div className="bg-surface-subtle border border-navy-subtle p-6 lg:p-7 flex flex-col gap-4">
              <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
                At a glance
              </p>
              <dl className="flex flex-col">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="py-3 border-t border-light-blue first:border-t-0 first:pt-0 last:pb-0"
                  >
                    <dt className="font-body font-bold text-[13px] uppercase tracking-[0.06em] text-navy-bolder">
                      {fact.label}
                    </dt>
                    <dd className="font-body text-sm text-neutral-subtle leading-[1.65] mt-1">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
