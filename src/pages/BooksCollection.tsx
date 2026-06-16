import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import BooksCollectionHero from '@/sections/BooksCollectionHero'
import BooksCollectionLayout from '@/sections/BooksCollectionLayout'

export default function BooksCollection() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        <BooksSubNav activeHref="/books/collection" />
        <BooksCollectionHero />
        <BooksCollectionLayout pageSize={16} />
      </main>
      <Footer />
    </div>
  )
}
