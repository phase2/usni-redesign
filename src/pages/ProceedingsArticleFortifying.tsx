import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ArticleHeader from '@/sections/ArticleHeader'
import ArticleHeroImage from '@/sections/ArticleHeroImage'
import FortifyingArticleBody from '@/sections/FortifyingArticleBody'
import ArticleRelated from '@/sections/ArticleRelated'
import heroImg from '@/assets/images/Nelson-PRO-4-26-Hero.jpg'

export default function ProceedingsArticleFortifying() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProceedingsSubNav />
      <main className="flex-1">
        <ArticleHeader
          title="Fortifying the Digital Watch"
          deck="As adversaries target naval networks before the first shot is fired, fleet cyber readiness demands the same rigor as engineering and damage control."
          date="April 2026"
          magazineName="Proceedings Magazine"
          author="CDR James M. Thornton, USN; LCDR Sarah K. Reyes, USN; Maj David L. Park, USMC"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Proceedings', href: '/proceedings' },
            { label: 'April 2026', href: '/proceedings/apr-2026' },
            { label: 'Fortifying the Digital Watch' },
          ]}
        />
        <ArticleHeroImage
          src={heroImg}
          alt="Navy cyber operations center with multiple screens displaying network telemetry"
          caption="Sailors monitor network telemetry at Fleet Cyber Command. Continuous monitoring has become as operationally critical as traditional combat systems readiness."
          photoCredit="U.S. Navy / Mass Communication Specialist 1st Class Nathan Burke"
        />
        <FortifyingArticleBody />
        <ArticleRelated />
      </main>
      <Footer />
    </div>
  )
}
