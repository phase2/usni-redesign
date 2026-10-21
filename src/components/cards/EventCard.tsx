/**
 * Event teaser card, shared by the Events landing's upcoming grid and the Past
 * Events archive.
 *
 * A bordered card: the event image with its red type badge, then the title,
 * city, date and an optional summary. The title link is stretched over the
 * whole card, so hovering anywhere sweeps the title's underline, zooms the
 * image and lifts the shadow. There is no separate "View event" row; the title
 * is the call to action.
 */
export interface EventCardData {
  href: string
  title: string
  /** Badge label, e.g. "Conference" or "Author Event". */
  kind: string
  location: string
  date: string
  summary?: string
  image: string
  imageAlt: string
}

export default function EventCard({ event }: { event: EventCardData }) {
  return (
    <article className="group relative flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-bolder">
        <img
          src={event.image}
          alt={event.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300 ease-out"
        />
        <span className="absolute top-3 left-3 bg-[#C1272D] text-white font-body font-bold text-xs uppercase tracking-[0.05em] px-2.5 py-1">
          {event.kind}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-headline text-lg lg:text-xl leading-[1.25]">
          {/* Stretched hit area so the whole card is clickable */}
          <a
            href={event.href}
            className="link-underline-hover text-navy-bolder
                       after:absolute after:inset-0"
          >
            {event.title}
          </a>
        </h3>

        {event.location && (
          <p className="flex items-center gap-2 font-body text-sm text-navy-subtle">
            <i className="fa-solid fa-location-dot text-xs" aria-hidden="true" />
            {event.location}
          </p>
        )}

        <p className="font-body font-bold text-sm text-navy-bolder">{event.date}</p>

        {event.summary && (
          <p className="font-body text-sm text-neutral-subtle leading-relaxed line-clamp-4">
            {event.summary}
          </p>
        )}
      </div>
    </article>
  )
}
