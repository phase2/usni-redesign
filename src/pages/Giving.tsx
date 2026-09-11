import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GivingHero from '@/sections/GivingHero'
import GivingSubNav from '@/sections/GivingSubNav'
import GivingJumpNav from '@/sections/GivingJumpNav'
import GivingAbout from '@/sections/GivingAbout'
import GivingWaysToGive from '@/sections/GivingWaysToGive'
import GivingMeetTheTeam from '@/sections/GivingMeetTheTeam'
import GivingTaxInfo from '@/sections/GivingTaxInfo'
import GivingConferenceCenter from '@/sections/GivingConferenceCenter'
import GivingQuickLinks from '@/sections/GivingQuickLinks'

export default function Giving() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />
        <GivingHero />
        <GivingJumpNav />
        <GivingAbout />
        <GivingQuickLinks />
        <GivingWaysToGive />
        <GivingMeetTheTeam />
        <GivingTaxInfo />
        <GivingConferenceCenter />
      </main>
      <Footer />
    </div>
  )
}
