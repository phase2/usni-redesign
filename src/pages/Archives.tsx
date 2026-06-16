import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ArchivesHero from '@/sections/ArchivesHero'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import ArchivesAbout from '@/sections/ArchivesAbout'
import ArchivesCollections from '@/sections/ArchivesCollections'
import ArchivesFAQ from '@/sections/ArchivesFAQ'

export default function Archives() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />
        <ArchivesHero />
        <ArchivesAbout />
        <ArchivesCollections />
        <ArchivesFAQ />
      </main>
      <Footer />
    </div>
  )
}
