import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PageHero from '@/sections/PageHero'
import MemberServicesContact from '@/sections/MemberServicesContact'

/**
 * Contact Member Services, at /membership/contact.
 *
 * New: the live site has no Member Services page, only deep links into the
 * general contact page. A page and form of their own let members find support
 * directly and let the form tell a prospective member's question (a lead) from
 * a member's support request.
 */
export default function MembershipContact() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Contact Member Services"
          description="Questions about joining, renewing, magazine delivery, billing, or your account. Send a message, call, or take care of it online."
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Membership', href: '/membership' },
              ]}
              current="Contact Member Services"
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />
        <MemberServicesContact />
      </main>
      <Footer />
    </div>
  )
}
