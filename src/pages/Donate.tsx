import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import DonateHero from '@/sections/DonateHero'
import DonateForm from '@/sections/DonateForm'
import DonateFAQ from '@/sections/DonateFAQ'
import DonateDisclosure from '@/sections/DonateDisclosure'

export default function Donate() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <DonateHero />
        <DonateForm />
        <DonateFAQ />
        <DonateDisclosure />
      </main>
      <Footer />
    </div>
  )
}
