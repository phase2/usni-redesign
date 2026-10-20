import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventsPageHero from '@/sections/EventsPageHero'
import PastEventsArchive from '@/sections/PastEventsArchive'

export default function EventsPast() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <EventsPageHero
          title="Past Events"
          // No count in the copy — the results header reports it from the data,
          // so the description never goes stale as events are added.
          description="Conferences, panel discussions, workshops, and member events the Naval Institute has hosted, along with talks and signings by Naval Institute Press authors. Each links to that event's page, with speakers, video, and coverage where available."
          breadcrumbLabel="Past Events"
        />
        <PastEventsArchive />
      </main>
      <Footer />
    </div>
  )
}
