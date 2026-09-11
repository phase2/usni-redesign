import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import PageHero from '@/sections/PageHero'
import GivingSubNav from '@/sections/GivingSubNav'
import StudentSchoolDirectory from '@/sections/StudentSchoolDirectory'
import { givingImage } from '@/data/givingSocieties'
import {
  foundationEmail,
  regionTotals,
  studentMembershipBenefits,
  studentMembershipBenefitsIntro,
  studentMembershipIntro,
} from '@/data/studentMemberships'

/**
 * Sponsor Student Memberships.
 *
 * The one giving opportunity with a page of its own, and the one reviewers
 * asked to promote — so it keeps the photo hero while the other opportunities
 * are a card on the index.
 *
 * The two totals under the hero are summed from the regional table the live
 * page prints, which states them per region but never adds them up. The gap
 * between what has been given and what is still needed is the ask.
 */
export default function GivingStudentMemberships() {
  const given = regionTotals.reduce((n, r) => n + r.given, 0)
  const needed = regionTotals.reduce((n, r) => n + r.needed, 0)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />

        <PageHero
          title="Sponsor Student Memberships"
          description="Your tax-deductible gift provides young leaders with a year of Naval Institute membership, including Proceedings in print and digital, access to online archives and discussion forums, and member discounts."
          image={givingImage('student-memberships-hero.jpg')}
          imageAlt="Newly commissioned ensigns throwing their hats into the air at commencement"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Giving', href: '/giving' },
                { label: 'Giving Opportunities', href: '/giving/opportunities' },
              ]}
              current="Sponsor Student Memberships"
              tone="dark"
              className="pb-4 border-b border-white/25"
            />
          }
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <ButtonLink href="/giving/donate" variant="primary" size="md">
              Sponsor a Membership
            </ButtonLink>
            <ButtonLink href="#schools" variant="outline" size="md">
              Find a School
            </ButtonLink>
          </div>
        </PageHero>

        <section className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16">
              <div className="max-w-[780px] flex flex-col gap-5">
                {studentMembershipIntro.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]"
                  >
                    {para}
                  </p>
                ))}

                <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] mt-1">
                  {studentMembershipBenefitsIntro}
                </p>
                <ul className="flex flex-col gap-3">
                  {studentMembershipBenefits.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <i
                        className="fa-solid fa-check text-[#0466c8] text-sm mt-1.5 flex-shrink-0"
                        aria-hidden="true"
                      />
                      <span className="font-body text-base text-neutral-bold leading-[1.6]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* The scale of the ask, in the rail where the contact card sits
                  on the other Giving pages. */}
              <aside className="flex flex-col gap-6">
                <div className="bg-surface-subtle border border-navy-subtle p-6 lg:p-7 flex flex-col gap-5">
                  <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
                    Where It Stands
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="font-headline text-[40px] text-navy-bolder leading-none">
                      {given.toLocaleString()}
                    </p>
                    <p className="font-body text-sm text-neutral-subtle">
                      memberships sponsored to date
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 border-t border-light-blue pt-5">
                    <p className="font-headline text-[40px] text-navy-bolder leading-none">
                      {needed.toLocaleString()}
                    </p>
                    <p className="font-body text-sm text-neutral-subtle">
                      still needed across {regionTotals.reduce((n, r) => n + r.schools, 0)} schools
                    </p>
                  </div>
                  <a
                    href={`mailto:${foundationEmail}?subject=${encodeURIComponent(
                      'Sponsoring Student Memberships Inquiry',
                    )}`}
                    className="text-link font-body text-[15px]"
                  >
                    {foundationEmail}
                  </a>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <StudentSchoolDirectory />
      </main>
      <Footer />
    </div>
  )
}
