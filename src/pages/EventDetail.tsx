import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventsPageHero from '@/sections/EventsPageHero'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import Alert from '@/components/ui/Alert'
import { ButtonLink } from '@/components/ui/Button'
import NotFound from '@/pages/NotFound'
import { upcomingEvents } from '@/data/events'
import { pastEvents } from '@/data/pastEvents'
import { eventDetail } from '@/data/eventDetails'

function FieldLabel({ children }: { children: string }) {
  return (
    <dt className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-neutral-subtle">
      {children}
    </dt>
  )
}

/**
 * A single event, upcoming or past. Only the events in `eventDetails.ts` have
 * a page so far; any other card falls through to the 404, as it always has.
 *
 * Both kinds share one layout, so date, time and location are always in the
 * same spot. The standard light-blue Events hero carries the title and the
 * live hero's second line; an event flagged `photoHero` takes the full-width
 * photo hero with a white panel instead, on its listing image. Below the
 * leaderboard ad, the centered reading column opens with the Date & Time and
 * Location fields, then a rule and the live body copy.
 *
 * An upcoming event's registration button sits in the hero and repeats after
 * the body copy, where the live event template places it. A past event drops
 * the button and shows a warning above the fields that it has passed.
 */
export default function EventDetail() {
  const { slug = '' } = useParams()
  const href = `/events/${slug}`
  const upcoming = upcomingEvents.find((e) => e.href === href)
  const past = pastEvents.find((e) => e.href === href)
  const event = upcoming ?? past
  const detail = eventDetail(slug)
  if (!event || !detail) return <NotFound />

  const time = detail.time ?? upcoming?.time
  const venue = detail.venue ?? upcoming?.venue ?? []
  // Hero buttons are always solid or outline navy; the repeat after the body
  // copy keeps the gold primary.
  const cta = (variant: 'navy' | 'primary') =>
    upcoming && detail.cta && (
      <ButtonLink href={detail.cta.href} variant={variant} className="self-start">
        {detail.cta.label}
      </ButtonLink>
    )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {detail.photoHero ? (
          <PageHero
            title={event.title}
            description={detail.subtitle}
            image={event.image}
            imageAlt={event.imageAlt}
            panelTone="light"
            panelSide={detail.photoHero.panelSide}
            imageFocus={detail.photoHero.focus}
            breadcrumb={
              <Breadcrumb
                trail={[
                  { label: 'Home', href: '/' },
                  { label: 'Events', href: '/events' },
                  ...(past ? [{ label: 'Past Events', href: '/events/past' }] : []),
                ]}
                current={event.title}
                className="border-b border-[#C2DDFF] pb-4"
              />
            }
          >
            {cta('navy')}
          </PageHero>
        ) : (
          <EventsPageHero
            title={event.title}
            subtitle={detail.subtitle}
            breadcrumbLabel={event.title}
            parent={past ? { label: 'Past Events', href: '/events/past' } : undefined}
          >
            {upcoming && detail.cta && <div className="pt-2 flex">{cta('navy')}</div>}
          </EventsPageHero>
        )}

        <AdUnit />

        <section className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="max-w-[860px] mx-auto flex flex-col gap-8">
              {past && (
                <Alert variant="warning">
                  This event has passed. See more in{' '}
                  <a href="/events/past" className="text-link">Past Events</a>.
                </Alert>
              )}

              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6">
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>{time ? 'Date & Time' : 'Date'}</FieldLabel>
                  <dd className="font-body text-base lg:text-[17px] text-navy-bolder leading-[1.5]">
                    <span className="block font-bold">{event.date}</span>
                    {time && <span className="block">{time}</span>}
                  </dd>
                </div>
                <div className="flex flex-col gap-1.5">
                  <FieldLabel>Location</FieldLabel>
                  <dd className="font-body text-base lg:text-[17px] text-navy-bolder leading-[1.5]">
                    {venue.length > 0 ? (
                      <>
                        <span className="block font-bold">{venue[0]}</span>
                        {venue.slice(1).map((line) => (
                          <span key={line} className="block">{line}</span>
                        ))}
                      </>
                    ) : (
                      <span className="font-bold">{event.location}</span>
                    )}
                  </dd>
                </div>
              </dl>

              <hr className="border-0 border-t border-neutral-subtler" />

              <div className="rich-text" dangerouslySetInnerHTML={{ __html: detail.html }} />

              {cta('primary')}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
