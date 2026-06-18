import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import BooksHero from '@/sections/BooksHero'
import BooksProductSection from '@/sections/BooksProductSection'
import BooksTopSubjects from '@/sections/BooksTopSubjects'
import BooksBillboards from '@/sections/BooksBillboards'
import AdUnit from '@/components/ui/AdUnit'
import { newReleases, bestSellers } from '@/data/books'

export default function BooksAndPress() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
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
