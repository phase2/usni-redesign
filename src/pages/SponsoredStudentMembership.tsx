import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JoinHero from '@/sections/JoinHero'
import { TierCard } from '@/sections/MembershipCustomizer'

/**
 * Sponsored Student Membership — a free year of student membership paid for
 * by donors (see /giving/student-memberships for the sponsor side).
 *
 * The live page lists the benefits once above two bare "Join Now" buttons.
 * Here the benefits become each card's checklist, matching /membership/join.
 * Join Now goes straight to the cart: the membership is free, so the magazine
 * upsell step is skipped.
 */

const sharedBenefits = [
  'Interactive flippable PDF edition of Proceedings (Nov 2024 onward).',
  'Up to 40% off Naval Institute Press titles.',
  '28% off Naval History Magazine.',
  'Sea Scroll — the weekly members-only USNI News newsletter.',
  'Free invitations to USNI conference series + discounted registration for WEST, the largest Sea Services conference.',
  '150+ years of archives — oral histories, photographs, and every Proceedings article from 1874 to today.',
  'A voice in the open forum to advance the naval profession.',
]

const tiers = [
  {
    plan: 'sponsored-student-full',
    name: 'Print + Digital',
    description: 'Includes the print edition of Proceedings, as well as full digital access.',
    features: [
      'Print Proceedings delivered monthly + digital edition + full access to USNI.org and the digital magazine archive.',
      ...sharedBenefits,
    ],
  },
  {
    plan: 'sponsored-student-digital',
    name: 'Digital',
    description: 'Read Proceedings online in its original format as a flippable PDF.',
    features: [
      'Digital edition of Proceedings + full access to USNI.org and the digital magazine archive.',
      ...sharedBenefits,
    ],
  },
]

export default function SponsoredStudentMembership() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <JoinHero
          eyebrow="Student Membership"
          title="Sponsored Student Membership"
          description="Sign up today for one year of Naval Institute student membership for free, thanks to our generous sponsors."
        />

        <section className="bg-white pt-10 pb-section">
          <div className="container-site">
            <h2 className="font-headline text-4xl lg:text-[56px] text-navy-bolder leading-[1.1] mb-10 text-center">
              Choose your free membership
            </h2>

            <div className="flex flex-col lg:flex-row gap-8 pt-8 border-t border-[#c4c9d4] items-stretch">
              {tiers.map((tier) => (
                <TierCard
                  key={tier.plan}
                  name={tier.name}
                  price={0}
                  priceText="Free"
                  priceUnit="1 year · sponsored"
                  description={tier.description}
                  features={tier.features}
                  showSpacer={false}
                  ctaText="Join Now"
                  cartHref={`/membership/cart?plan=${tier.plan}&term=1&region=us&price=0`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
