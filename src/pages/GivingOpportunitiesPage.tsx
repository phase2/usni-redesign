import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import PageHero from '@/sections/PageHero'
import GivingSubNav from '@/sections/GivingSubNav'
import GivingOpportunities from '@/sections/GivingOpportunities'
import { givingImage } from '@/data/givingSocieties'

/**
 * Giving Opportunities — its own page, pulled off the Giving landing.
 *
 * The live version is ten cards that each lead to a sub-page, and the
 * prototype's version was ten cards each carrying its own "make a gift"
 * button. Reviewers found the content thin and the donate call repetitive, so
 * the ask now sits once in the hero, each opportunity keeps a single contextual
 * link, and the detail stays in a modal rather than another page load.
 *
 * Sponsor Student Memberships was lifted out of the grid into a featured
 * billboard above it, until the Foundation decided in October 2026 that it did
 * not need the promotion. It is back in the grid as one card of twelve, beside
 * the commemorative bricks and chairs, which joined from the Taylor Center page.
 */
export default function GivingOpportunitiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />

        <PageHero
          title="Giving Opportunities"
          description="Every gift to the Naval Institute supports a specific part of its work — the magazines and the Press, the essay contests and conferences, the archives, and the next generation of naval officers."
          image={givingImage('opportunities-hero.jpg')}
          imageAlt="An aircraft carrier under way, taking on stores by helicopter"
          panelTone="light"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Giving', href: '/giving' },
              ]}
              current="Giving Opportunities"
              className="pb-4 border-b border-[#C2DDFF]"
            />
          }
        >
          <div>
            <ButtonLink href="/giving/donate" variant="primary" size="md">
              Donate Today
            </ButtonLink>
          </div>
        </PageHero>

        <GivingOpportunities heading="Where Your Gift Goes" />
      </main>
      <Footer />
    </div>
  )
}
