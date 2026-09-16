import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import { JCTCC_URL } from '@/sections/TaylorCenterAbout'

/**
 * The rooms, named.
 *
 * The USNI page lists them in a single sentence — "a 406-seat auditorium,
 * reception spaces, an indoor/outdoor rooftop terrace, five unique meeting
 * rooms, and a broadcast studio" — which tells a donor nothing about what any
 * of them is. Broken out, they also give the commemorative section below a
 * referent: "the auditorium" and "the rooftop terrace" are rooms the reader has
 * now seen described.
 *
 * Booking detail — capacity charts, AV specifications, approved vendors — stays
 * on the Center's own site rather than being mirrored here, where it would go
 * stale.
 */
const spaces: { name: string; body: string }[] = [
  {
    name: 'Lockheed Martin Auditorium',
    body: '406 business-class seats with individual laptop tables, theater-quality acoustics and lighting, overhead central projection, and a stage LED wall. This is the room cleared for classified discussion.',
  },
  {
    name: 'Atrium & HII Grand Foyer',
    body: 'The marble hall outside the auditorium, lit by expansive skylights. Registration, receptions, networking, and sponsor displays happen here.',
  },
  {
    name: 'Topside Terrace',
    body: 'An indoor/outdoor rooftop room under a sail canopy, with 360-degree views of Annapolis and the Naval Academy and integrated sound and lighting.',
  },
  {
    name: 'Severn Terrace',
    body: 'The Vice Admiral William D. Houser — Battle of Midway Terrace, with panoramic views over the Naval Academy and the Severn River. Built for evening gatherings and dinners.',
  },
  {
    name: 'Five meeting rooms',
    body: 'Rooms varying in size, each with built-in presentation screens and plug-and-play AV, for breakouts, working groups, and board meetings.',
  },
  {
    name: 'Broadcast studio',
    body: 'An on-site studio for recording and streaming, so a session held in the auditorium can reach the audience that could not travel to it.',
  },
]

export default function TaylorCenterSpaces() {
  return (
    <section id="spaces" className="bg-[#ebf4ff] py-12 lg:py-16 scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
          Inside the Center
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {spaces.map((space) => (
            <div
              key={space.name}
              className="bg-white border border-navy-subtle p-6 lg:p-7 flex flex-col gap-3"
            >
              <h3 className="font-headline text-xl text-navy-bolder leading-[1.2]">{space.name}</h3>
              <p className="font-body text-sm text-neutral-subtle leading-[1.65]">{space.body}</p>
            </div>
          ))}
        </div>

        <p className="font-body text-base text-neutral-bold leading-[1.7] max-w-[780px] mt-8">
          Capacity charts, in-house AV capabilities, approved vendors, and the booking form all live
          on the Center&rsquo;s own site.
        </p>
        <div className="mt-4">
          <ButtonLink
            href={JCTCC_URL}
            variant="navy"
            size="sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Plan an event at the Center
            <ExternalLinkIcon size="1.1em" />
            <span className="sr-only">(opens in a new tab)</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
