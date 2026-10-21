import { upcomingEvents, type UsniEvent } from '@/data/events'
import { NavyButtonLink } from '@/components/ui/Button'
import EventCard from '@/components/cards/EventCard'

/** Red type badge, carried over from the current site's event cards. */
function KindBadge({ kind }: { kind: UsniEvent['kind'] }) {
  return (
    <span className="absolute top-3 left-3 bg-[#C1272D] text-white font-body font-bold text-xs uppercase tracking-[0.05em] px-2.5 py-1">
      {kind}
    </span>
  )
}

function LocationLine({ location }: { location: string }) {
  return (
    <p className="flex items-center gap-2 font-body text-sm text-navy-subtle">
      <i className="fa-solid fa-location-dot text-xs" aria-hidden="true" />
      {location}
    </p>
  )
}

/**
 * The next two events up, side by side above the grid — image on top, then the
 * full date, time and venue, the summary and a button.
 */
function HighlightEvent({ event }: { event: UsniEvent }) {
  return (
    <article className="flex flex-col bg-white border border-navy-subtle overflow-hidden h-full">
      {/* Image runs to the card's edges rather than sitting inside its padding */}
      <div className="relative overflow-hidden bg-neutral-subtlest aspect-[16/9]">
        <img
          src={event.image}
          alt={event.imageAlt}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <KindBadge kind={event.kind} />
      </div>

      <div className="flex flex-col flex-1 gap-4 p-6 lg:p-8">
        <h3 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]">
          {event.title}
        </h3>
        <LocationLine location={event.location} />
        <div className="flex flex-col gap-0.5">
          <p className="font-body font-bold text-base text-navy-bolder">{event.date}</p>
          {event.time && (
            <p className="font-body font-bold text-base text-navy-bolder">{event.time}</p>
          )}
          {event.venue?.map((line) => (
            <p key={line} className="font-body text-base text-neutral-subtle">
              {line}
            </p>
          ))}
        </div>
        <p className="font-body text-base text-neutral-subtle leading-[1.7]">{event.summary}</p>
        <div className="mt-auto pt-1">
          <NavyButtonLink href={event.href}>View event details</NavyButtonLink>
        </div>
      </div>
    </article>
  )
}

export default function UpcomingEvents() {
  // Two highlights over a 3-up grid: five events make a clean 2 + 3.
  const highlights = upcomingEvents.slice(0, 2)
  const rest = upcomingEvents.slice(2)

  return (
    <section
      id="upcoming-events"
      className="py-16 lg:py-20 bg-[#ebf4ff] scroll-mt-[100px]"
      aria-labelledby="upcoming-events-heading"
    >
      <div className="container-site flex flex-col gap-10 lg:gap-12">
        <h2
          id="upcoming-events-heading"
          className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]"
        >
          Upcoming Events
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {highlights.map((event) => (
            <HighlightEvent key={event.id} event={event} />
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {rest.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}
