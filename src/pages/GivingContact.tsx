import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import GivingSubNav from '@/sections/GivingSubNav'
import PageHero from '@/sections/PageHero'
import GivingContactContent from '@/sections/GivingContactContent'

/**
 * Contact the Foundation, at /giving/contact. See GivingContactContent.
 */
export default function GivingContact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />
        <PageHero
          title="Contact the Foundation"
          description="The Naval Institute Foundation’s development staff can help with gifts, stock transfers, planned giving, and corporate sponsorship."
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Giving', href: '/giving' },
              ]}
              current="Contact the Foundation"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />
        <GivingContactContent />
      </main>
      <Footer />
    </div>
  )
}
