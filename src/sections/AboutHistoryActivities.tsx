import imgProceedings from '@/assets/images/giving-opps-modal-hero-Conferences GO.jpg'
import imgPress from '@/assets/images/giving-opps-modal-hero-The Naval Institute Press.png'
import imgHeritage from '@/assets/images/giving-opps-modal-hero-OralHistoryGO.jpg'
import imgFoundation from '@/assets/images/giving-feature-2.jpg'

/**
 * "The Naval Institute has these core activities" — the four programme areas
 * from the history page, each currently a heading and a dense paragraph.
 *
 * Rendered as alternating image/text rows so each area can be read on its own
 * rather than as one continuous wall of prose. The inline links inside the copy
 * mirror the ones on the current page, repointed at prototype routes.
 */

/** A run of body copy: plain text, or text that links out. */
type Segment = string | { text: string; href: string; external?: boolean }

const activities: {
  id: string
  title: string
  image: string
  imageAlt: string
  body: Segment[][]
  cta: { label: string; href: string }
}[] = [
  {
    id: 'magazines-and-conferences',
    title: 'Magazines and Conferences',
    image: imgProceedings,
    imageAlt: 'A Naval Institute conference session',
    body: [
      [
        'Since 1874, ',
        { text: 'Proceedings', href: '/proceedings' },
        ' magazine has been the most identifiable journal of the Naval Institute. Each monthly issue includes articles from military professionals and civilian experts, historical essays, book reviews, full-color photography, and lively reader commentary. Its sister publication, the bimonthly ',
        { text: 'Naval History', href: '/naval-history' },
        ', was added in 1987.',
      ],
      [
        'To expand the impact of the forum, the Naval Institute created a ',
        { text: 'conferences', href: '/events' },
        ' program in 1985 that harks back to its earliest days. The conferences program, open to members and to the public, features live discussion of crucial defense-related topics at three sites each year: San Diego, Washington, DC, and Virginia Beach.',
      ],
    ],
    cta: { label: 'Explore Proceedings', href: '/proceedings' },
  },
  {
    id: 'naval-institute-press',
    title: 'Naval Institute Press',
    image: imgPress,
    imageAlt: 'Naval Institute Press titles',
    body: [
      [
        'The Naval Institute Press is the book-publishing arm of the Naval Institute. Created in 1898 with basic guides to naval practices, the Press has broadened its scope to include books of more general interest.',
      ],
      [
        'Now the Naval Institute Press publishes about eighty titles each year, ranging from how-to books on boating and navigation to battle histories, biographies, ship and aircraft guides, and novels. Institute members receive significant discounts on the Press’ more than eight hundred books in print.',
      ],
    ],
    cta: { label: 'Browse Books & Press', href: '/press' },
  },
  {
    id: 'history-and-preservation',
    title: 'History and Preservation',
    image: imgHeritage,
    imageAlt: 'Oral history recording session',
    body: [
      [
        'One of the primary aspects of the Naval Institute’s mission is to preserve our naval and maritime heritage with an ever-expanding collection of more than 200 oral histories and 450,000 rare naval and maritime images. Bound copies of the ',
        { text: 'oral histories', href: '/archives' },
        ' and photographs of naval ships, aircraft, and other historically significant images are sold, the profits of which are used to fund further growth.',
      ],
      [
        'The department recently began to digitize the photo collection and now sells digital ',
        { text: 'images', href: 'https://photos.usni.org/', external: true },
        '. The Naval Institute also has produced ',
        { text: 'Americans at War', href: 'https://www.americans-at-war.com/', external: true },
        ', a living history of Americans at war in their own words and from their own experiences. These 90-second vignettes convey powerful stories of inspiration, pride, and patriotism.',
      ],
    ],
    cta: { label: 'Visit the Archives', href: '/archives' },
  },
  {
    id: 'naval-institute-foundation',
    title: 'The Naval Institute Foundation',
    image: imgFoundation,
    imageAlt: 'Supporters of the Naval Institute Foundation',
    body: [
      [
        'The ',
        { text: 'Naval Institute Foundation', href: '/giving/donate' },
        ', Inc., was established in 1992 to ensure that the Naval Institute would have the firm financial footing necessary to continue its mission of advancing professional, literary, and scientific knowledge in the naval and maritime services.',
      ],
      [
        'The Internal Revenue Service has certified the Foundation as a 501(c)(3) educational / charitable organization, contributions to which, by individuals, corporations, and foundations, are tax-deductible to the extent allowed by law.',
      ],
    ],
    cta: { label: 'Support the Institute', href: '/giving' },
  },
]

/** Renders a paragraph built from plain and linked runs. */
export function Prose({ segments, className }: { segments: Segment[]; className?: string }) {
  return (
    <p className={className}>
      {segments.map((segment, i) =>
        typeof segment === 'string' ? (
          segment
        ) : (
          <a
            key={i}
            href={segment.href}
            {...(segment.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="link-underline-always font-semibold text-navy-subtle hover:text-navy-bright transition-colors"
          >
            {segment.text}
          </a>
        ),
      )}
    </p>
  )
}

/** Shared CTA treatment: label sweeps an underline, arrow slides. */
export function ActivityCta({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 self-start font-body font-bold text-base text-[#0466c8] hover:text-navy-bolder transition-colors"
    >
      <span className="relative">
        {label}
        <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
      </span>
      <i
        className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"
        aria-hidden="true"
      />
    </a>
  )
}

export default function AboutHistoryActivities() {
  return (
    <section className="py-16 lg:py-20 bg-[#ebf4ff]" aria-labelledby="core-activities-heading">
      <div className="container-site">
        <h2
          id="core-activities-heading"
          className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1] mb-10 lg:mb-14"
        >
          Our Core Activities
        </h2>

        <div className="flex flex-col">
          {activities.map((activity, i) => (
            <article
              key={activity.id}
              id={activity.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center
                          py-10 lg:py-14 first:pt-0 last:pb-0
                          ${i > 0 ? 'border-t border-[#C2DDFF]' : ''}`}
            >
              <div
                className={`overflow-hidden bg-neutral-subtlest aspect-[4/3] ${
                  // Alternate sides so four stacked rows don't read as a list
                  i % 2 === 1 ? 'lg:order-last' : ''
                }`}
              >
                <img
                  src={activity.image}
                  alt={activity.imageAlt}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-headline text-[28px] lg:text-[34px] text-navy-bolder leading-[1.15]">
                  {activity.title}
                </h3>
                {activity.body.map((para, j) => (
                  <Prose
                    key={j}
                    segments={para}
                    className="font-body text-base text-neutral-subtle leading-[1.7]"
                  />
                ))}
                <ActivityCta label={activity.cta.label} href={activity.cta.href} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
