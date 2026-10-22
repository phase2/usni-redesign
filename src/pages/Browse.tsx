import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BrowseArticles from '@/sections/BrowseArticles'

/** Browse All Articles — the magazine archive's own search. */
export default function Browse() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BrowseArticles />
      </main>
      <Footer />
    </div>
  )
}
