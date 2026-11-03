import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import BookProductHero from '@/sections/BookProductHero'
import BookProductOverview from '@/sections/BookProductOverview'
import BookProductAuthorBios from '@/sections/BookProductAuthorBios'
import BookProductReviews from '@/sections/BookProductReviews'
import BookProductCategoryTags from '@/sections/BookProductCategoryTags'
import BooksProductSection from '@/sections/BooksProductSection'
import BookProductMedia from '@/sections/BookProductMedia'
import NotFound from '@/pages/NotFound'
import { useParams } from 'react-router-dom'
import { seriesBooksFor } from '@/data/bookProductData'
import { BOOK_CATALOG } from '@/data/booksOrder'
import { bestSellers } from '@/data/books'

/** A book product page, at /books/:slug, for any title in BOOK_CATALOG. */
export default function BookProduct() {
  const { slug = '' } = useParams()
  const book = BOOK_CATALOG[slug]
  if (!book) return <NotFound />
  const series = seriesBooksFor(book)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {/* Keyed so per-book state (format, author tab, Read more) resets
          when moving between books. */}
      <main key={book.id} className="flex-1">
        <BooksSubNav />
        <BookProductHero book={book} />
        <BookProductOverview overview={book.overview} book={book} />
        <BookProductAuthorBios authors={book.authors} />
        {book.reviews && book.reviews.length > 0 && <BookProductReviews reviews={book.reviews} />}
        {book.media && book.media.length > 0 && <BookProductMedia items={book.media} />}
        {book.series && series.length > 0 && (
          <BooksProductSection
            title="More in this series"
            subtitle={book.series.seriesName}
            seeAllLabel="See all in this series"
            seeAllHref={book.series.href}
            books={series}
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
