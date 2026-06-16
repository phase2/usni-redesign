import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ArticleHeader from '@/sections/ArticleHeader'
import ArticleHeroImage from '@/sections/ArticleHeroImage'
import ArticleBody from '@/sections/ArticleBody'
import ArticleRelated from '@/sections/ArticleRelated'

export default function ProceedingsArticle() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProceedingsSubNav />
      <main className="flex-1">
        <ArticleHeader
          title="Three MEFs Won't Be Enough"
          deck="The Marine Corps' current three-MEF structure cannot meet simultaneous crises across competing theaters — a fourth expeditionary force is no longer optional."
          date="April 2026"
          magazineName="Proceedings Magazine"
          author="Corporal Richard Sweeney III, U.S. Marine Corps Reserve"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Publications', href: '/publications' },
            { label: 'Proceedings', href: '/proceedings' },
            { label: 'April 2026', href: '/proceedings/apr-2026' },
            { label: "Three MEFs Won't Be Enough" },
          ]}
        />
        <ArticleHeroImage
          caption="Marines from 2nd Battalion, 4th Marines conduct amphibious assault training during Exercise Iron Fist. Growing Marine Corps expeditionary capacity is central to Pacific deterrence strategy."
          photoCredit="U.S. Marine Corps / Lance Corporal David Intriago"
        />
        <ArticleBody />
        <ArticleRelated />
      </main>
      <Footer />
    </div>
  )
}
