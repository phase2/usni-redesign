import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import ArchivesSubNav from '@/sections/ArchivesSubNav'
import PageHero from '@/sections/PageHero'
import MemoirSubmitForm from '@/sections/MemoirSubmitForm'

/** Submit a Memoir — /archives/memoirs/submit, filed under Memoirs. */
export default function ArchivesMemoirSubmit() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ArchivesSubNav />
        <PageHero
          title="Submit a Memoir"
          description="Add a personal account of naval service to the Naval Institute Memoir Collection."
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Archives', href: '/archives' },
                { label: 'Memoirs', href: '/archives/memoirs' },
              ]}
              current="Submit a Memoir"
            />
          }
        />
        <MemoirSubmitForm />
      </main>
      <Footer />
    </div>
  )
}
