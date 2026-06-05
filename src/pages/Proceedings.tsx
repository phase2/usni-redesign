import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsHero from '@/sections/ProceedingsHero'
import ProceedingsFeaturedArticles from '@/sections/ProceedingsFeaturedArticles'
import ProceedingsFeaturedContent from '@/sections/ProceedingsFeaturedContent'
import ProceedingsLatestIssue from '@/sections/ProceedingsLatestIssue'
import ProceedingsIssueArchive from '@/sections/ProceedingsIssueArchive'
import ProceedingsSponsoredBillboard from '@/sections/ProceedingsSponsoredBillboard'
import ProceedingsMembershipCTA from '@/sections/ProceedingsMembershipCTA'

export default function Proceedings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ProceedingsHero />
        <ProceedingsFeaturedArticles />
        <ProceedingsFeaturedContent />
        <ProceedingsLatestIssue />
        <ProceedingsIssueArchive />
        <ProceedingsSponsoredBillboard />
        <ProceedingsMembershipCTA />
      </main>
      <Footer />
    </div>
  )
}
