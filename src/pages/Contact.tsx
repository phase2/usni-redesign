import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/sections/PageHero'
import heroImage from '@/assets/images/contact_usni_hero.jpg'
import { ContactMessage, ContactRouteCards, ContactVisiting } from '@/sections/ContactSections'

/**
 * Contact Us: the hub.
 *
 * The live /about-us/contact-us, with /media-inquiries folded in. It replaces
 * a long page that stacked every department's staff and addresses one after
 * another. Departments now keep their contact pages in their own sections
 * (Member Services, the editorial masthead, the Press, the Archives, the
 * Foundation, Advertising). The hub leads with the general form and the
 * Institute's numbers, then directions on a navy band, then cards for the six
 * department pages on a tan band.
 */
export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {/* Beach Hall and the Taylor Conference Center sit center-right, so
            the navy panel takes the left over the trees and sky */}
        <PageHero
          image={heroImage}
          panelSide="left"
          imageFocus="right"
          title="Contact Us"
          description="Send us a message, call, or visit us in Annapolis. For membership, the magazines, the Press, the Archives, giving, or advertising, the team that handles it is listed below."
        />
        <ContactMessage />
        <ContactVisiting />
        <ContactRouteCards />
      </main>
      <Footer />
    </div>
  )
}
