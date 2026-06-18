import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/sections/Hero'
import NavalInstituteAtWork from '@/sections/NavalInstituteAtWork'
import FeaturedEvent from '@/sections/FeaturedEvent'
import LatestNews from '@/sections/LatestNews'
import ProceedingsMagazine from '@/sections/ProceedingsMagazine'
import NavalHistory from '@/sections/NavalHistory'
import PromoRow from '@/sections/PromoRow'
import SplitFeature from '@/sections/SplitFeature'
import AdUnit from '@/components/ui/AdUnit'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <NavalInstituteAtWork />
        <FeaturedEvent />
        <div className="pt-8">
          <LatestNews />
        </div>
        <AdUnit />
        <ProceedingsMagazine />
        <NavalHistory />
        <AdUnit />
        <PromoRow />
        <SplitFeature />
      </main>
      <Footer />
    </div>
  )
}
