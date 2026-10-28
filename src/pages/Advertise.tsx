import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/sections/PageHero'
import AdvertiseContent from '@/sections/AdvertiseContent'

/**
 * Advertise With Us, at /advertise. See AdvertiseContent.
 */
export default function Advertise() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Advertise With Us"
          description="The Naval Institute’s platforms combine heritage, immediacy, and relevance to reach the people who lead and support the Sea Services."
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'About USNI', href: '/about' },
              ]}
              current="Advertise With Us"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />
        <AdvertiseContent />
      </main>
      <Footer />
    </div>
  )
}
