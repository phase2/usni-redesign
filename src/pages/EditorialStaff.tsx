import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AboutSubNav from '@/sections/AboutSubNav'
import PageHero from '@/sections/PageHero'
import EditorialStaffDirectory from '@/sections/EditorialStaffDirectory'

/**
 * Editorial Staff, at /about/editorial-staff.
 *
 * One masthead for Proceedings and Naval History, replacing the live site's two
 * magazine contact pages (/proceedings-magazine/contact-us and
 * /naval-history-magazine/contact-us), which list mostly the same people. Both
 * magazine sections link here, pre-filtered with ?magazine=.
 */
export default function EditorialStaff() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AboutSubNav />
        <PageHero
          title="Editorial Staff"
          description={
            <>
              The editorial team behind <em>Proceedings</em> and <em>Naval History</em> magazines.
            </>
          }
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'About USNI', href: '/about' },
              ]}
              current="Editorial Staff"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />
        <EditorialStaffDirectory />
      </main>
      <Footer />
    </div>
  )
}
