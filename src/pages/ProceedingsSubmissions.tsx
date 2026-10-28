import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import PageHero from '@/sections/PageHero'
import ProceedingsSubmissionsContent from '@/sections/ProceedingsSubmissionsContent'
import Breadcrumb from '@/components/ui/Breadcrumb'

/**
 * Proceedings submission guidelines, at /proceedings/submit (formerly
 * /proceedings/submissions, which redirects here). The Naval History
 * counterpart is /naval-history/submit, and the editorial masthead links to
 * both. Structure and copy follow the live page at
 * /periodicals/proceedings-magazine/submission-guidelines section for
 * section; only the styling is the redesign's.
 */
export default function ProceedingsSubmissions() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ProceedingsSubNav />

        {/* No eyebrow or lede: the live page's header is the title alone, and
            the breadcrumb already names Proceedings a line above. */}
        <PageHero
          title="Proceedings Submission Guidelines"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Proceedings', href: '/proceedings' },
              ]}
              current="Submission Guidelines"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />

        <ProceedingsSubmissionsContent />
      </main>
      <Footer />
    </div>
  )
}
