import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import MemoirCollection from '@/sections/MemoirCollection'

/** The Naval Institute Memoir Collection, filed under Archives. */
export default function ArchivesMemoirs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />
        <MemoirCollection />
      </main>
      <Footer />
    </div>
  )
}
