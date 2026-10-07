import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SiteSearch from '@/sections/SiteSearch'

/** Site search results. The header's search flydown links here with `?q=`. */
export default function Search() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <SiteSearch />
      </main>
      <Footer />
    </div>
  )
}
