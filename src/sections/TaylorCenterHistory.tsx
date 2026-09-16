import imgGroundbreaking from '@/assets/images/taylor-center/jctcc-groundbreaking.jpg'
import imgRibbonCutting from '@/assets/images/taylor-center/jctcc-ribbon-cutting.jpg'

/**
 * How the Center came to be.
 *
 * This is where the live page's 2021 material lands. That page is built around
 * the dedication — headline, dateline, and an opening paragraph in the present
 * tense — which made a five-year-old ribbon cutting the first thing a donor
 * read. The same three dates work as background once they are framed as a
 * record of how the building happened rather than as news.
 */
const milestones: { date: string; body: string }[] = [
  {
    date: '2018',
    body: 'The Naval Institute sets a bold goal: build a physical flagship, a venue where those committed to providing the nation the finest Sea Services can convene to debate sea power and global security.',
  },
  {
    date: '18 September 2019',
    body: 'Ground is broken on a site adjoining Naval Institute headquarters on the Yard of the U.S. Naval Academy.',
  },
  {
    date: 'September 2021',
    body: 'Construction is completed, and the Center is dedicated and opened on 30 September — funded, start to finish, by private donors.',
  },
  {
    date: 'Since',
    body: 'Conferences, lectures, workshops, wargames, and the Institute’s own annual meeting. For decades to come, Sea Service personnel will come here for professional development and for the face-to-face conversations that fuel debate within the naval profession.',
  },
]

export default function TaylorCenterHistory() {
  return (
    <section id="history" className="bg-[#ebf4ff] py-12 lg:py-16 scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
          How JCTCC was built
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
          <figure className="flex flex-col gap-2">
            <img
              src={imgGroundbreaking}
              alt="Naval Institute leaders and Sea Service officers turning earth at the groundbreaking ceremony"
              loading="lazy"
              className="w-full aspect-[3/2] object-cover"
            />
            <figcaption className="font-body text-[13px] italic text-neutral-subtle leading-snug">
              Groundbreaking, 18 September 2019.
            </figcaption>
          </figure>
          <figure className="flex flex-col gap-2">
            <img
              src={imgRibbonCutting}
              alt="A line of Naval Institute leaders and flag officers cutting the ribbon outside the completed Conference Center"
              loading="lazy"
              className="w-full aspect-[3/2] object-cover"
            />
            <figcaption className="font-body text-[13px] italic text-neutral-subtle leading-snug">
              Dedication and grand opening, 30 September 2021.
            </figcaption>
          </figure>
        </div>

        {/* The rule runs along the top of the row on desktop and down the left on
            mobile, so the four milestones read as one sequence either way. */}
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 mt-12">
          {milestones.map((milestone) => (
            <li
              key={milestone.date}
              className="border-l-2 lg:border-l-0 lg:border-t-2 border-[#0466C8] pl-5 lg:pl-0 lg:pt-5 flex flex-col gap-2"
            >
              <p className="font-body font-bold text-sm uppercase tracking-[0.06em] text-[#0466c8]">
                {milestone.date}
              </p>
              <p className="font-body text-[15px] text-neutral-bold leading-[1.65]">
                {milestone.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
