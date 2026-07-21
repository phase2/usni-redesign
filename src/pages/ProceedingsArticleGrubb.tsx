import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ArticleHeader from '@/sections/ArticleHeader'
import ArticleHeroImage from '@/sections/ArticleHeroImage'
import GrubbArticleBody from '@/sections/GrubbArticleBody'
import ArticleRelated from '@/sections/ArticleRelated'
import ArticleMeterBanner from '@/components/ui/ArticleMeterBanner'
import heroImg from '@/assets/images/proceedings-articles/grubb/crash-onboard.jpg'

export default function ProceedingsArticleGrubb() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProceedingsSubNav />
      <main className="flex-1">
        <ArticleHeader
          title="Get Real about How Naval Aviation Got Better"
          deck="Safety doesn't come from magic bullets, but from organizational learning."
          date="July 2026"
          magazineName="Proceedings Magazine"
          author="Dr. Jefferson D. Grubb"
          readTime="9 min read"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Proceedings', href: '/proceedings' },
            { label: 'July 2026', href: '/proceedings/apr-2026' },
            { label: 'How Naval Aviation Got Better' },
          ]}
        />
        <ArticleHeroImage
          src={heroImg}
          alt="Crewmen scramble as a crash-landed fighter burns on a carrier flight deck during World War II"
          caption="A pilot scrambles from his crash-landed fighter as flames spread across the flight deck. In fiscal year 1953 alone, the U.S. Navy and Marine Corps lost 723 aircraft to aviation mishaps; in FY 2025, they lost 11."
          photoCredit="U.S. Navy"
        />
        <GrubbArticleBody />
        <ArticleRelated />
      </main>
      <Footer />
      <ArticleMeterBanner magazine="Proceedings" />
    </div>
  )
}
