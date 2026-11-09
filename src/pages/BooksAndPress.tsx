import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import BooksHero from '@/sections/BooksHero'
import BooksProductSection from '@/sections/BooksProductSection'
import BooksTopSubjects from '@/sections/BooksTopSubjects'
import BooksBillboards from '@/sections/BooksBillboards'
import AdUnit from '@/components/ui/AdUnit'
import SiteAlert, { PromoCode } from '@/components/ui/SiteAlert'
import { newReleases, bestSellers } from '@/data/books'

/**
 * The Books & Press landing.
 *
 * It opens on the site-wide alert the client added to the live site for the
 * 2026 holiday Press sale (SiteAlert): the offer as a headline and one line,
 * with the shipping deadlines behind See More. The copy is the live alert's,
 * split at the offer.
 */
export default function BooksAndPress() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SiteAlert
        title="Celebrate the season with savings!"
        more={
          <p>
            For guaranteed delivery by December 25th, 2026, via USPS Media Mail, please place your order by noon
            (EST) Wednesday, December 2, 2026. While USPS shipping remains available through December 31, orders
            placed after the deadline may not arrive in time for the holidays. For rush delivery, orders placed
            after noon (EST) Friday, November 27th, 2026, should be made by phone through Member Services at{' '}
            <a href="tel:8002338764" className="text-link">800-233-8764</a> or{' '}
            <a href="tel:4102686110" className="text-link">410-268-6110</a>.
          </p>
        }
      >
        Enjoy 50% off titles when you enter code <PromoCode>HOLIDAY</PromoCode> at checkout.
      </SiteAlert>
      <main className="flex-1">
        <BooksSubNav />
        <BooksHero />
        <BooksProductSection
          title="New releases"
          seeAllLabel="See all new releases"
          seeAllHref="/books/new-releases"
          books={newReleases}
        />
        <AdUnit />
        <BooksTopSubjects />
        <BooksProductSection
          title="Best sellers"
          seeAllLabel="See all best sellers"
          seeAllHref="/books/best-sellers"
          books={bestSellers}
          background="subtle"
        />
        <BooksBillboards />
      </main>
      <Footer />
    </div>
  )
}
