import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import BooksAboutIntro from '@/sections/BooksAboutIntro'
import BooksAboutLinks from '@/sections/BooksAboutLinks'
import BooksAboutFAQ from '@/sections/BooksAboutFAQ'
import heroImage from '@/assets/images/books/custom-bookstore-hero.png'

/**
 * About the Naval Institute Press — the live /press/about page, at the
 * /books/about path the Books sub-nav already links to.
 *
 * The live page carries no artwork, so the hero reuses the cover wall from the
 * Books & Press landing (BooksHero) — an even field of covers, so it reads the
 * same whichever half the navy panel covers. The panel sits on the right.
 *
 * Below the hero: the live page's copy, a card grid into its three basic pages
 * (see BooksAboutSubPage), then the Press FAQs.
 */
export default function BooksAbout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />

        <PageHero
          title="About the Naval Institute Press"
          description="Founded in 1898, the Naval Institute Press publishes essential military and naval titles — from foundational Sea Service guides to New York Times bestselling fiction."
          image={heroImage}
          mobileImage="short"
          panelSide="right"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Books & Press', href: '/books' },
              ]}
              current="About the Press"
              tone="dark"
              className="pb-4 border-b border-white/25"
            />
          }
        />

        <AdUnit />

        <BooksAboutIntro />

        <BooksAboutLinks />

        <BooksAboutFAQ />
      </main>
      <Footer />
    </div>
  )
}
