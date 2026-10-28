import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import PageHero from '@/sections/PageHero'
import ArchivesResearchContent from '@/sections/ArchivesResearchContent'

/**
 * Research Requests, at /archives/research-requests. See ArchivesResearchContent.
 */
export default function ArchivesResearchRequests() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />
        <PageHero
          title="Research Requests"
          description="The Naval Institute’s library staff answer research questions by email and welcome researchers in Beach Hall."
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Archives', href: '/archives' },
              ]}
              current="Research Requests"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />
        <ArchivesResearchContent />
      </main>
      <Footer />
    </div>
  )
}
