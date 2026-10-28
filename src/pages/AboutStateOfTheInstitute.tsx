import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutSubNav from '@/sections/AboutSubNav'
import AboutPageHero from '@/sections/AboutPageHero'
import StateOfTheInstituteEntries from '@/sections/StateOfTheInstituteEntries'

/**
 * State of the Institute — the live /about-us/state-of-the-institute page.
 *
 * A basic page: the light-blue About sub-page header, then the live page's
 * dated election and governance notices in the redesign's type. The live page
 * has no lede or artwork, so the header is the title alone.
 */
export default function AboutStateOfTheInstitute() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AboutSubNav />
        <AboutPageHero title="State of the Institute" breadcrumbLabel="State of the Institute" />
        <StateOfTheInstituteEntries />
      </main>
      <Footer />
    </div>
  )
}
