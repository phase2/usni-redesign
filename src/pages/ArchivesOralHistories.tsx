import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import OralHistoriesListing from '@/sections/OralHistoriesListing'

/** The Oral History Program's catalogue, filed under Archives. */
export default function ArchivesOralHistories() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />
        <OralHistoriesListing />
      </main>
      <Footer />
    </div>
  )
}
