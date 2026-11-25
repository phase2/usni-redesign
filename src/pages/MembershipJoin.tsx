import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MembershipSubNav from '@/sections/MembershipSubNav'
import JoinHero from '@/sections/JoinHero'
import MembershipCustomizer from '@/sections/MembershipCustomizer'
import { NavalHistoryBillboard, OrgMembershipBillboard } from '@/sections/MembershipBillboard'
import MembershipComparisonTable from '@/sections/MembershipComparisonTable'
import MembershipFAQ from '@/sections/MembershipFAQ'
import MembershipServicesCTA from '@/sections/MembershipServicesCTA'

export default function MembershipJoin() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <MembershipSubNav />
        <JoinHero />
        <MembershipCustomizer />
        <MembershipComparisonTable />
        <section className="container-site py-section flex flex-col gap-8">
          {/* Naval History subscribe callout — parked for future use, not removed.
              The component still lives in `sections/MembershipBillboard.tsx` and
              its import above is intact, so re-enabling is a one-line uncomment. */}
          {/* <NavalHistoryBillboard /> */}
          <OrgMembershipBillboard />
        </section>
        <MembershipFAQ />
        <MembershipServicesCTA />
      </main>
      <Footer />
    </div>
  )
}
