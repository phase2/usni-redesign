import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import BooksNewReleasesHero from '@/sections/BooksNewReleasesHero'
import BooksCollectionLayout from '@/sections/BooksCollectionLayout'
import { newReleases } from '@/data/books'

export default function BooksNewReleases() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-white">
        <BooksSubNav activeHref="/books/new-releases" />
        <BooksNewReleasesHero />
        <BooksCollectionLayout
          books={newReleases}
          showSeriesFacet={false}
          showSubjectFacet={false}
        />
      </main>
      <Footer />
    </div>
  )
}
