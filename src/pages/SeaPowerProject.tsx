import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import JumpLinkNav from '@/components/ui/JumpLinkNav'
import PageHero from '@/sections/PageHero'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import SeaPowerArticleGrid from '@/sections/SeaPowerArticleGrid'
import SeaPowerVideos from '@/sections/SeaPowerVideos'
import CollectionTitlesGrid from '@/sections/CollectionTitlesGrid'
import {
  additionalReading,
  additionalReadingIntro,
  eventVideos,
  eventsIntro,
  notableBooks,
  phaseOneArticles,
  phaseOneIntro,
  phaseThreeArticles,
  phaseThreeIntro,
  phaseTwoArticles,
  phaseTwoIntro,
  remarksVideos,
  seaPowerHero,
  seaPowerImage,
  seaPowerIntro,
} from '@/data/seaPowerProject'

/**
 * The American Sea Power Project — the Proceedings series hub.
 *
 * The live page is one very long Drupal node: a banner, an italic introduction,
 * then six stacked blocks running to some sixty teasers. The redesign keeps all
 * of that content and every image, and changes only how it is navigated — the
 * blocks carry anchors and a sticky jump nav sits under the hero, so a reader
 * looking for Phase III or the recommended books does not have to scroll past
 * forty-nine article cards to find them.
 *
 * Nothing here is a bespoke layout: the hero, jump nav, article cards, video
 * players, and book grid are all components the site already had.
 */

const jumpLinks = [
  { label: 'Phase I', href: '#phase-i' },
  { label: 'Phase II', href: '#phase-ii' },
  { label: 'Phase III', href: '#phase-iii' },
  { label: 'Events', href: '#events' },
  { label: 'Author Remarks', href: '#remarks' },
  { label: 'Further Reading', href: '#additional-reading' },
  { label: 'Books', href: '#notable-books' },
]

export default function SeaPowerProject() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ProceedingsSubNav />

        <PageHero
          eyebrow={seaPowerHero.eyebrow}
          title={seaPowerHero.title}
          description={seaPowerHero.description}
          image={seaPowerImage('sea-power-hero-banner.jpg')}
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Proceedings', href: '/proceedings' },
              ]}
              current="American Sea Power Project"
              tone="dark"
              className="pb-4 border-b border-white/25"
            />
          }
        />

        <JumpLinkNav links={jumpLinks} />

        {/*
          The series introduction, inline rather than as its own section
          component: one heading and one paragraph, used once, with no state or
          variants of its own. The heading carries the same rule the grids below
          use, so the page has one section-header treatment rather than two.
        */}
        <section className="bg-white pt-12 lg:pt-16">
          <div className="container-site">
            <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
              {seaPowerIntro.title}
            </h2>
            <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] max-w-[780px] mt-6">
              {seaPowerIntro.body}
            </p>
          </div>
        </section>

        <SeaPowerArticleGrid
          id="phase-i"
          heading={phaseOneIntro.title}
          description={phaseOneIntro.description}
          articles={phaseOneArticles}
        />

        <SeaPowerArticleGrid
          id="phase-ii"
          heading={phaseTwoIntro.title}
          description={phaseTwoIntro.description}
          articles={phaseTwoArticles}
          background="subtle"
        />

        <SeaPowerArticleGrid
          id="phase-iii"
          heading={phaseThreeIntro.title}
          description={phaseThreeIntro.description}
          articles={phaseThreeArticles}
        />

        <SeaPowerVideos
          id="events"
          heading={eventsIntro.title}
          description={eventsIntro.description}
          videos={eventVideos}
        />

        <SeaPowerVideos
          id="remarks"
          heading="Remarks from the Authors"
          videos={remarksVideos}
          background="white"
        />

        <SeaPowerArticleGrid
          id="additional-reading"
          heading={additionalReadingIntro.title}
          description={additionalReadingIntro.description}
          articles={additionalReading}
          background="subtle"
        />

        <CollectionTitlesGrid
          id="notable-books"
          heading="Notable Books on Maritime Strategy"
          titles={notableBooks}
        />
      </main>
      <Footer />
    </div>
  )
}
