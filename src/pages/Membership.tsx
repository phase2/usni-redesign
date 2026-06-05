import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import MembershipHero from '@/sections/MembershipHero'
import MembershipBody from '@/sections/MembershipBody'
import MembershipBenefits from '@/sections/MembershipBenefits'
import MembershipFAQ from '@/sections/MembershipFAQ'
import MembershipServicesCTA from '@/sections/MembershipServicesCTA'

export default function Membership() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <MembershipHero />
        <MembershipBody />
        <MembershipBenefits />
        <MembershipFAQ />
        <MembershipServicesCTA />
      </main>
      <Footer />
    </div>
  )
}
