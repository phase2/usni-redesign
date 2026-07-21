import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ArticleHeader from '@/sections/ArticleHeader'
import ArticleHeroImage from '@/sections/ArticleHeroImage'
import ArticleBody from '@/sections/ArticleBody'
import ArticleRelated from '@/sections/ArticleRelated'
import heroImg from '@/assets/images/proceedings-articles/mefs/hero.jpg'
import ArticleMeterBanner from '@/components/ui/ArticleMeterBanner'

export default function ProceedingsArticle() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProceedingsSubNav />
      <main className="flex-1">
        <ArticleHeader
          title="Three MEFs Won't Be Enough"
          deck="To replace mass casualties in a great power war, the Marine Corps should reactivate the 5th and 6th Marine Divisions as the core of two new MEFs."
          date="April 2026"
          magazineName="Proceedings Magazine"
          author="Corporal Richard Sweeney III, U.S. Marine Corps Reserve"
          readTime="8 min read"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Proceedings', href: '/proceedings' },
            { label: 'April 2026', href: '/proceedings/apr-2026' },
            { label: "Three MEFs Won't Be Enough" },
          ]}
        />
        <ArticleHeroImage
          src={heroImg}
          alt="A mass casualty exercise with U.S. Marines and soldiers from the Australian Defence Force during Southern Jackaroo"
          caption="A mass casualty exercise with U.S. Marines and soldiers from the Australian Defence Force during Southern Jackaroo at Shoalwater Bay Training Area, Queensland, Australia."
          photoCredit="U.S. Marine Corps (Cedar Barnes)"
        />
        <ArticleBody />
        <ArticleRelated />
      </main>
      <Footer />
      <ArticleMeterBanner magazine="Proceedings" />
    </div>
  )
}
