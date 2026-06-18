import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NavalHistorySubNav from '@/sections/NavalHistorySubNav'
import NavalHistoryHero from '@/sections/NavalHistoryHero'
import NavalHistoryFeaturedArticles from '@/sections/NavalHistoryFeaturedArticles'
import NavalHistoryFeaturedContent from '@/sections/NavalHistoryFeaturedContent'
import NavalHistoryLatestIssue from '@/sections/NavalHistoryLatestIssue'
import NavalHistoryIssueArchive from '@/sections/NavalHistoryIssueArchive'
import NavalHistoryMembershipCTA from '@/sections/NavalHistoryMembershipCTA'
import AdUnit from '@/components/ui/AdUnit'

export default function NavalHistory() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <NavalHistorySubNav />
        <NavalHistoryHero />
        <AdUnit />
        <NavalHistoryFeaturedArticles />
        <NavalHistoryFeaturedContent />
        <AdUnit />
        <NavalHistoryLatestIssue />
        <NavalHistoryIssueArchive />
        <NavalHistoryMembershipCTA />
      </main>
      <Footer />
    </div>
  )
}
