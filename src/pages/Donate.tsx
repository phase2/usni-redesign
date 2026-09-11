import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GivingSubNav from '@/sections/GivingSubNav'
import DonateHero from '@/sections/DonateHero'
import DonateForm from '@/sections/DonateForm'
import DonateFAQ from '@/sections/DonateFAQ'
import DonateCommemorative from '@/sections/DonateCommemorative'
import DonateDisclosure from '@/sections/DonateDisclosure'

export default function Donate() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />
        <DonateHero />
        <DonateForm />
        <DonateFAQ />
        <DonateCommemorative />
        <DonateDisclosure />
      </main>
      <Footer />
    </div>
  )
}
