import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ArticleHeader from '@/sections/ArticleHeader'
import ArticleHeroImage from '@/sections/ArticleHeroImage'
import FortifyingArticleBody from '@/sections/FortifyingArticleBody'
import ArticleRelated from '@/sections/ArticleRelated'
import heroImg from '@/assets/images/Nelson-PRO-4-26-Hero.jpg'
import ArticleMeterBanner from '@/components/ui/ArticleMeterBanner'

export default function ProceedingsArticleFortifying() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProceedingsSubNav />
      <main className="flex-1">
        <ArticleHeader
          title="Fortifying the Digital Watch"
          deck="To retain cyber talent, the Navy needs a Warrior Toughness refit for keyboard warriors—and a TOPGUN for hackers."
          date="April 2026"
          magazineName="Proceedings Magazine"
          author="Lieutenant Commanders Keith Nelson, Andrew Forester, and Yojana Garcia, U.S. Navy"
          readTime="11 min read"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Proceedings', href: '/proceedings' },
            { label: 'April 2026', href: '/proceedings/apr-2026' },
            { label: 'Fortifying the Digital Watch' },
          ]}
        />
        <ArticleHeroImage
          src={heroImg}
          alt="Sailors stand watch at U.S. Fleet Cyber Command / U.S. Tenth Fleet"
          caption="The Navy needs more than policy fixes to retain the best cyber talent. It needs a unique and enduring cyber warrior culture."
          photoCredit="U.S. Fleet Cyber Command/U.S. Tenth Fleet"
        />
        <FortifyingArticleBody />
        <ArticleRelated />
      </main>
      <Footer />
      <ArticleMeterBanner magazine="Proceedings" />
    </div>
  )
}
