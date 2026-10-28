import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import NavalHistorySubNav from '@/sections/NavalHistorySubNav'
import PageHero from '@/sections/PageHero'
import NavalHistorySubmissionsContent from '@/sections/NavalHistorySubmissionsContent'

/**
 * Naval History submission guidelines, at /naval-history/submit.
 *
 * The Naval History counterpart to /proceedings/submit, from the live
 * /naval-history-magazine/submission-guidelines. The prototype's Naval History
 * sub-nav and menu have linked to a guidelines page with nothing behind it.
 */
export default function NavalHistorySubmissions() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <NavalHistorySubNav />
        <PageHero
          title="Naval History Submission Guidelines"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Naval History', href: '/naval-history' },
              ]}
              current="Submission Guidelines"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />
        <NavalHistorySubmissionsContent />
      </main>
      <Footer />
    </div>
  )
}
