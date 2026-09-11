import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JumpLinkNav from '@/components/ui/JumpLinkNav'
import PageHero from '@/sections/PageHero'
import GivingSubNav from '@/sections/GivingSubNav'
import GivingPromoCards from '@/sections/GivingPromoCards'
import SocietyDonorListing from '@/sections/SocietyDonorListing'
import { givingSubPages } from '@/data/givingSocieties'
import { annualSocieties, societyCourtesies } from '@/data/givingSocietyDonors'

/**
 * Annual Recognition Societies — all four societies on one page.
 *
 * Consolidated from a landing page plus four child pages, which reviewers found
 * "too clunky and click-y" and which hid the giving levels behind a click each.
 * The four cards now sit directly under the hero as the at-a-glance answer to
 * "what are my options", and each jumps to that society's section rather than
 * to another page.
 *
 * The donor courtesies are stated once. All four live pages list the same five,
 * so repeating them under every society would be four identical blocks between
 * the reader and the thing that actually differs — the gift level and the names.
 */

const ORDER = [
  'alfred-thayer-mahan-society',
  'stephen-b-luce-society',
  '1873-society',
  'leadership-circle',
] as const

/** Short enough to sit in one row of the desktop jump nav. */
const NAV_LABELS: Record<string, string> = {
  'alfred-thayer-mahan-society': 'Mahan Society',
  'stephen-b-luce-society': 'Luce Society',
  '1873-society': '1873 Society',
  'leadership-circle': 'Leadership Circle',
}

const jumpLinks = [
  { label: 'Giving Levels', href: '#giving-levels' },
  { label: 'Donor Courtesies', href: '#donor-courtesies' },
  ...ORDER.map((slug) => ({ label: NAV_LABELS[slug], href: `#${slug}` })),
]

export default function GivingSocietiesAnnual() {
  const page = givingSubPages.annual
  const societies = ORDER.map((slug) => annualSocieties[slug])

  // The cards keep the live banner art and gift levels; only their destination
  // changes, from another page to the matching section below.
  const promos = page.promos.map((promo, i) => ({
    ...promo,
    ctaLabel: 'See donors and gift level',
    ctaHref: `#${ORDER[i]}`,
  }))

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />

        <PageHero
          title={page.title}
          description={page.description}
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Giving', href: '/giving' },
                { label: 'Giving Societies', href: '/giving/societies' },
              ]}
              current={page.breadcrumbLabel}
              className="pb-4 border-b border-[#C2DDFF]"
            />
          }
        />

        <JumpLinkNav links={jumpLinks} />

        <div id="giving-levels" className="scroll-mt-32">
          <GivingPromoCards promos={promos} />
        </div>

        <section id="donor-courtesies" className="bg-surface-subtle py-12 lg:py-16 scroll-mt-32">
          <div className="container-site">
            <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
              Donor Courtesies
            </h2>
            <ul className="flex flex-col gap-3 mt-6 max-w-[780px]">
              {societyCourtesies.map((item) => (
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
        </section>

        {societies.map((society, i) => (
          <SocietyDonorListing
            key={society.slug}
            id={society.slug}
            heading={society.title}
            deck={society.description}
            years={society.years}
            /* Alternating grounds so four listings in a row stay distinguishable
               as separate societies rather than one very long table. */
            background={i % 2 === 0 ? 'white' : 'subtle'}
          />
        ))}
      </main>
      <Footer />
    </div>
  )
}
