import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import DigitalEditionsIntro from '@/sections/DigitalEditionsIntro'
import DigitalEditionsList from '@/sections/DigitalEditionsList'
import heroImage from '@/assets/images/books/digital-editions/water.jpg'

/**
 * Naval Institute Press Digital Editions — the live /press/digitaleditions page.
 *
 * The live header is the open-water banner with its copy on the right,
 * "Naval Institute Press" over "Digital Editions"; here that is the photo hero
 * with the navy panel on the right, the first line as its eyebrow. The water is
 * texture rather than subject, so it takes the short crop on mobile.
 *
 * The live page's opening paragraph is lifted into the hero as its lede.
 * Below it: an ad unit, the rest of the introduction, then the three editions.
 */
export default function BooksDigitalEditions() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />

        <PageHero
          eyebrow="Naval Institute Press"
          title="Digital Editions"
          description={
            <>
              Building on the expertise of the authors and historians of the U.S.
              Naval Institute, <em>digital editions</em> are designed to offer an
              entirely new way to visualize and understand a wide variety of
              subjects. Using interactives that explain complex concepts, embedded
              audio &amp; video, and high-quality imagery, these digital editions
              should appeal to scholars, enthusiasts, and general readers alike.
            </>
          }
          image={heroImage}
          mobileImage="short"
          panelSide="right"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Books & Press', href: '/books' },
              ]}
              current="Digital Editions"
              tone="dark"
              className="pb-4 border-b border-white/25"
            />
          }
        />

        <AdUnit />

        <DigitalEditionsIntro />

        <DigitalEditionsList />
      </main>
      <Footer />
    </div>
  )
}
