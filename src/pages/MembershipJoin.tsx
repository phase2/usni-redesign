import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
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
        <JoinHero />
        <MembershipCustomizer />
        <section className="container-site py-section flex flex-col gap-8">
          <NavalHistoryBillboard />
          <OrgMembershipBillboard />
        </section>
        <MembershipComparisonTable />
        <MembershipFAQ />
        <MembershipServicesCTA />
      </main>
      <Footer />
    </div>
  )
}
