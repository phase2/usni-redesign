import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import PageHero from '@/sections/PageHero'
import GivingSubNav from '@/sections/GivingSubNav'
import TaylorCenterAbout, { JCTCC_URL } from '@/sections/TaylorCenterAbout'
import TaylorCenterSpaces from '@/sections/TaylorCenterSpaces'
import TaylorCenterCommemorative from '@/sections/TaylorCenterCommemorative'
import TaylorCenterNamesake from '@/sections/TaylorCenterNamesake'
import TaylorCenterHistory from '@/sections/TaylorCenterHistory'
import TaylorCenterVisit from '@/sections/TaylorCenterVisit'
import heroImage from '@/assets/images/taylor-center/jctcc-rooftop.jpg'

/**
 * The Jack C. Taylor Conference Center — moved out of About and into Giving.
 *
 * The live page (/about-us/taylor-conference-center) is a grand-opening recap:
 * it leads with a 30 September 2021 headline and dateline, then works through
 * the dedication, the building, the namesake, and the construction timeline
 * before arriving at a link to the Center's own site. Five years on, the first
 * thing a reader met was the oldest thing on the page.
 *
 * Reordered around what someone arriving from the Giving menu is there for:
 * what the Center is and what is in it, then the two ways to put a name on it,
 * then the namesake and the history as background, then the hand-off to
 * jackctaylorconferencecenter.org for anyone who came to book a room. The
 * commemorative bricks and chairs move here from the donate page, where they
 * interrupted the ask for unrestricted support.
 */
export default function GivingTaylorCenter() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />

        <PageHero
          title="Jack C. Taylor Conference Center"
          description="Built entirely with private donations, the Naval Institute's conference center on the Yard of the U.S. Naval Academy is where the Sea Services convene — and where a gift can carry your name permanently."
          image={heroImage}
          imageAlt="The Topside Terrace, the Center's indoor/outdoor rooftop room beneath its sail canopy"
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Giving', href: '/giving' },
              ]}
              current="Jack C. Taylor Conference Center"
              tone="dark"
              className="pb-4 border-b border-white/25"
            />
          }
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <ButtonLink href="#commemorative-gifts" variant="primary" size="md">
              Purchase a brick or chair
            </ButtonLink>
            <ButtonLink
              href={JCTCC_URL}
              variant="outline"
              size="md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Plan an event
              <ExternalLinkIcon size="1.1em" />
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
          </div>
        </PageHero>

        <TaylorCenterAbout />
        <TaylorCenterSpaces />
        <TaylorCenterCommemorative />
        <TaylorCenterNamesake />
        <TaylorCenterHistory />
        <TaylorCenterVisit />
      </main>
      <Footer />
    </div>
  )
}
