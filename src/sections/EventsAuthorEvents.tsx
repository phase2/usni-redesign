import { NavyButtonLink } from '@/components/ui/Button'

/**
 * Author Events on the Events landing, as on the live /events/all page: a
 * heading and, while the Press has nothing scheduled, the live page's empty
 * message with a way into past author talks and signings — the Past Events
 * archive filtered to the Author Event type.
 *
 * When upcoming author events exist they would list here, in the same cards
 * as Upcoming Events.
 */
export default function EventsAuthorEvents() {
  return (
    <section
      id="author-events"
      className="pt-14 lg:pt-16 bg-white scroll-mt-[100px]"
      aria-labelledby="author-events-heading"
    >
      <div className="container-site flex flex-col gap-6">
        {/* The canonical section header: headline over a 2px blue rule */}
        <h2
          id="author-events-heading"
          className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]"
        >
          Author Events
        </h2>

        <div className="flex flex-col items-start gap-5">
          <p className="font-body text-base lg:text-lg text-neutral-subtle leading-[1.6]">
            There are no upcoming author events at this time.
          </p>
          <NavyButtonLink href="/events/past?type=author-event">
            View Past Author Events
          </NavyButtonLink>
        </div>
      </div>
    </section>
  )
}
