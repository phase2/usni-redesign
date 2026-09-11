import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import PageHero from '@/sections/PageHero'
import GivingSubNav from '@/sections/GivingSubNav'
import GivingOpportunities from '@/sections/GivingOpportunities'
import { givingImage } from '@/data/givingSocieties'
import { regionTotals } from '@/data/studentMemberships'

/**
 * Giving Opportunities — its own page, pulled off the Giving landing.
 *
 * The live version is ten cards that each lead to a sub-page, and the
 * prototype's version was ten cards each carrying its own "make a gift"
 * button. Reviewers found the content thin and the donate call repetitive, so
 * the ask now sits once in the hero, each opportunity keeps a single contextual
 * link, and the detail stays in a modal rather than another page load.
 *
 * Sponsoring Student Memberships is lifted out of the grid entirely: it is the
 * one opportunity with a page, a directory, and a number attached to it, and
 * the one reviewers asked to promote.
 */
export default function GivingOpportunitiesPage() {
  const needed = regionTotals.reduce((n, r) => n + r.needed, 0)
  const schools = regionTotals.reduce((n, r) => n + r.schools, 0)

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

        {/* Featured: the one opportunity with a page of its own.
            The contained navy billboard used by the essay contest archive
            teaser and the Books landing — photo half, bordered panel, gold CTA. */}
        <section className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="bg-navy-bolder flex flex-col lg:flex-row w-full">
              <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
                <img
                  src={givingImage('student-memberships-hero.jpg')}
                  alt="Newly commissioned ensigns throwing their hats into the air at commencement"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 flex items-center p-6 lg:p-12">
                <div className="border border-navy-bold w-full flex flex-col gap-4 px-6 py-10 lg:px-12 lg:py-14">
                  <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-light-blue">
                    Featured Opportunity
                  </p>
                  <h2 className="font-headline text-[32px] lg:text-[44px] text-white leading-[1.1]">
                    Sponsor Student Memberships
                  </h2>
                  <p className="font-body text-lg lg:text-xl text-white/90 leading-[1.4]">
                    A tax-deductible gift gives a midshipman or cadet a year of Naval Institute
                    membership — <em>Proceedings</em>, the online archives, the forums, and member
                    discounts.
                  </p>
                  <p className="font-body text-base lg:text-lg text-light-blue leading-[1.5]">
                    <span className="font-bold text-white">
                      {needed.toLocaleString()} memberships
                    </span>{' '}
                    are still needed across {schools} academies and colleges.
                  </p>
                  <div className="pt-3">
                    <a
                      href="/giving/student-memberships"
                      className="inline-flex items-center gap-2 self-start bg-gold text-navy-boldest font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-gold-dark transition-colors"
                    >
                      Sponsor a Student Membership
                      <svg
                        className="w-3 h-3 flex-shrink-0"
                        viewBox="0 0 12 12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M2 6h8M6 2l4 4-4 4" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <GivingOpportunities heading="More Ways to Give" />
      </main>
      <Footer />
    </div>
  )
}
