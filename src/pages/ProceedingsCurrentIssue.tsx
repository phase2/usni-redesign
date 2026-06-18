import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ProceedingsIssueHero from '@/sections/ProceedingsIssueHero'
import ProceedingsIssueArticles from '@/sections/ProceedingsIssueArticles'
import ProceedingsMembershipCTA from '@/sections/ProceedingsMembershipCTA'
import AdUnit from '@/components/ui/AdUnit'

export default function ProceedingsCurrentIssue() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ProceedingsSubNav />
        <ProceedingsIssueHero />
        <AdUnit />
        <ProceedingsIssueArticles />
        <ProceedingsMembershipCTA />
      </main>
      <Footer />
    </div>
  )
}
