import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EventsHero from '@/sections/EventsHero'
import UpcomingEvents from '@/sections/UpcomingEvents'
import EventsArchiveCta from '@/sections/EventsArchiveCta'
import EventsConferenceCenter from '@/sections/EventsConferenceCenter'

export default function Events() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <EventsHero />
        <UpcomingEvents />
        <EventsArchiveCta />
        <EventsConferenceCenter />
      </main>
      <Footer />
    </div>
  )
}
