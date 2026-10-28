import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutSubNav from '@/sections/AboutSubNav'
import AboutPageHero from '@/sections/AboutPageHero'
import StateOfTheInstituteByYear from '@/sections/StateOfTheInstituteByYear'

/**
 * State of the Institute, year by year: archived as a future enhancement, at
 * /about/state-of-the-institute/by-year. The page itself
 * (/about/state-of-the-institute) is the one-to-one migration of the live
 * /about-us/state-of-the-institute; this is the proposed redesign of it.
 *
 * A basic page: the light-blue About sub-page header, then the live page's
 * dated election and governance notices in the redesign's type, one year at a
 * time with a year picker in the body rather than the live page's single long
 * scroll. The live page has no lede or artwork, so the header is the title
 * alone.
 */
export default function AboutStateOfTheInstituteByYear() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AboutSubNav />
        <AboutPageHero title="State of the Institute" breadcrumbLabel="State of the Institute" />
        <StateOfTheInstituteByYear />
      </main>
      <Footer />
    </div>
  )
}
