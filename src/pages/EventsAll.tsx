import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventsPageHero from '@/sections/EventsPageHero'
import PastEventsArchive from '@/sections/PastEventsArchive'

/**
 * See All Events — every upcoming and past event in the standard filters
 * sidebar and card grid. The Events landing's first hero button leads here.
 */
export default function EventsAll() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <EventsPageHero
          title="All Events"
          // No count in the copy — the results header reports it from the data
          description="Upcoming conferences, panel discussions, and member events, along with everything the Naval Institute has hosted and the talks and signings of Naval Institute Press authors."
          breadcrumbLabel="All Events"
        />
        <PastEventsArchive scope="all" />
      </main>
      <Footer />
    </div>
  )
}
