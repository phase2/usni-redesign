import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import BookProductHero from '@/sections/BookProductHero'
import BookProductOverview from '@/sections/BookProductOverview'
import BookProductAuthorBios from '@/sections/BookProductAuthorBios'
import BookProductCategoryTags from '@/sections/BookProductCategoryTags'
import BooksProductSection from '@/sections/BooksProductSection'
import { aiWarfightingBook, ausaSeriesBooks } from '@/data/bookProductData'
import { bestSellers } from '@/data/books'

const book = aiWarfightingBook

export default function BookProduct() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />
        <BookProductHero book={book} />
        <BookProductOverview overview={book.overview} book={book} />
        <BookProductAuthorBios authors={book.authors} />
        {book.series && (
          <BooksProductSection
            title="More in this series"
            subtitle={book.series.seriesName}
            seeAllLabel="See all in this series"
            seeAllHref={book.series.href}
            books={ausaSeriesBooks}
            background="subtle"
          />
        )}
        <BooksProductSection
          title="You might also like"
          seeAllLabel="See all books"
          seeAllHref="/books"
          books={bestSellers}
        />
        <BookProductCategoryTags categories={book.categories} />
      </main>
      <Footer />
    </div>
  )
}
