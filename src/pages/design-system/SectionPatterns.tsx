import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import CodeBlock from '@/components/design-system/CodeBlock'
import AdUnit from '@/components/ui/AdUnit'
import SectionHeader from '@/components/ui/SectionHeader'
import SeaPowerArticleGrid from '@/sections/SeaPowerArticleGrid'
import CollectionTitlesGrid from '@/sections/CollectionTitlesGrid'
import BooksAboutIntro from '@/sections/BooksAboutIntro'
import BooksAboutLinks from '@/sections/BooksAboutLinks'
import BooksAboutSubPageContent from '@/sections/BooksAboutSubPageContent'
import BooksAboutFAQ from '@/sections/BooksAboutFAQ'
import PmeIntro from '@/sections/PmeIntro'
import DigitalEditionsList from '@/sections/DigitalEditionsList'
import NavalInstituteAtWork from '@/sections/NavalInstituteAtWork'
import { phaseOneArticles, phaseOneIntro, notableBooks } from '@/data/seaPowerProject'
import { stateOfTheInstituteEntries } from '@/data/stateOfTheInstitute'

/* ── Page-skeleton diagrams ────────────────────────────────────────────────
   Stacked boxes, one per region, in the order the page renders them. Built
   here rather than screenshotted so the diagram cannot go stale against a
   redesign of any one section. */

type Region = 'chrome' | 'subnav' | 'hero-light' | 'hero-photo' | 'ad' | 'white' | 'band' | 'dark' | 'jump'

const REGION_STYLE: Record<Region, string> = {
  chrome: 'bg-navy-boldest text-white',
  subnav: 'bg-[#E0E0CC] text-navy-bolder border-b border-[#B8B49A]',
  'hero-light': 'bg-[#ebf4ff] text-navy-bolder',
  'hero-photo': 'bg-gradient-to-r from-navy-subtler to-navy-boldest text-white',
  ad: 'bg-neutral-subtlest text-neutral-subtle border-y border-dashed border-neutral-subtler',
  white: 'bg-white text-navy-bolder border-b border-border-light',
  band: 'bg-surface-subtle text-navy-bolder',
  dark: 'bg-[#002B5C] text-white',
  jump: 'bg-white text-navy-bolder border-y border-border-light',
}

interface DiagramRow {
  label: string
  note?: string
  region: Region
  /** Relative height, in rem. */
  h?: number
}

function PageDiagram({ title, example, rows }: { title: string; example: string; rows: DiagramRow[] }) {
  return (
    <figure className="flex flex-col">
      <figcaption className="mb-3 sm:min-h-[52px]">
        <p className="font-body font-bold text-sm text-navy-bolder">{title}</p>
        <p className="font-mono text-xs text-neutral-subtle">{example}</p>
      </figcaption>
      <div className="border border-neutral-subtler flex flex-col">
        {rows.map((row, i) => (
          <div
            key={`${row.label}-${i}`}
            className={`flex flex-col justify-center px-3 ${REGION_STYLE[row.region]}`}
            style={{ minHeight: `${row.h ?? 2}rem` }}
          >
            <span className="font-body font-bold text-[11px] uppercase tracking-[0.08em] leading-tight">{row.label}</span>
            {row.note && <span className="font-mono text-[10px] opacity-75 leading-tight mt-0.5">{row.note}</span>}
          </div>
        ))}
      </div>
    </figure>
  )
}

const SKELETONS: { title: string; example: string; rows: DiagramRow[] }[] = [
  {
    title: 'Section front',
    example: 'BooksAndPress.tsx · Giving.tsx',
    rows: [
      { label: 'Header', note: 'sticky', region: 'chrome', h: 2.25 },
      { label: 'Section sub-nav', region: 'subnav', h: 1.75 },
      { label: 'Section hero', note: 'BooksHero / GivingHero', region: 'hero-photo', h: 6 },
      { label: 'Jump-link nav (Giving)', note: 'optional, sticky', region: 'jump', h: 1.75 },
      { label: 'Content band', note: 'bg-white', region: 'white', h: 4.5 },
      { label: 'AdUnit leaderboard', note: 'between bands', region: 'ad', h: 2 },
      { label: 'Content band', note: 'bg-surface-subtle', region: 'band', h: 4.5 },
      { label: 'Content band', note: 'bg-white', region: 'white', h: 4.5 },
      { label: 'Footer', region: 'chrome', h: 3 },
    ],
  },
  {
    title: 'Basic page',
    example: 'BooksAboutSubPage.tsx · ProceedingsSubmissions.tsx · ArchivesOralHistoriesSubPage.tsx',
    rows: [
      { label: 'Header', note: 'sticky', region: 'chrome', h: 2.25 },
      { label: 'Section sub-nav', region: 'subnav', h: 1.75 },
      { label: 'PageHero (light)', note: 'breadcrumb + title', region: 'hero-light', h: 4.5 },
      { label: 'Reading column', note: 'max-w-[860px] mx-auto · py-12 lg:py-16', region: 'white', h: 14 },
      { label: 'Footer', region: 'chrome', h: 3 },
    ],
  },
  {
    title: 'Long archive page',
    example: 'AboutStateOfTheInstitute.tsx',
    rows: [
      { label: 'Header', note: 'sticky', region: 'chrome', h: 2.25 },
      { label: 'Section sub-nav', region: 'subnav', h: 1.75 },
      { label: 'AboutPageHero', note: 'title only', region: 'hero-light', h: 4 },
      { label: 'Entry · h2 date', note: '.rich-text body', region: 'white', h: 5 },
      { label: 'Entry · h2 date', note: 'border-t pt-10 mt-10', region: 'white', h: 5 },
      { label: 'Entry · h2 date', note: '…newest first', region: 'white', h: 5 },
      { label: 'Footer', region: 'chrome', h: 3 },
    ],
  },
  {
    title: 'Landing with photo hero',
    example: 'BooksAbout.tsx · BooksDigitalEditions.tsx',
    rows: [
      { label: 'Header', note: 'sticky', region: 'chrome', h: 2.25 },
      { label: 'Section sub-nav', region: 'subnav', h: 1.75 },
      { label: 'PageHero (photo)', note: 'navy panel right', region: 'hero-photo', h: 6 },
      { label: 'AdUnit leaderboard', note: 'directly under hero', region: 'ad', h: 2 },
      { label: 'Intro reading column', note: 'bg-white', region: 'white', h: 4 },
      { label: 'Card grid / list', note: 'white or subtle', region: 'band', h: 4 },
      { label: 'FAQ (heading-left)', note: 'bg-surface-subtle', region: 'band', h: 3.5 },
      { label: 'Footer', region: 'chrome', h: 3 },
    ],
  },
]

/* Real State of the Institute entry with an h3, h4s and ordered lists — the
   element mix the CMS body field produces. */
const richTextEntry = stateOfTheInstituteEntries[1]

export default function SectionPatterns() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Sections & Layout">
          <p>
            How a page is put together: the fixed order of regions every template shares, the
            full-width sections that fill the content area, and the handful of layouts those
            sections are built from — section headers, vertical rhythm and background bands, the
            reading column, card grids, two-column layouts, ad slots, and anchors.
          </p>
          <p>
            A section is one full-bleed <code className="font-mono text-base">&lt;section&gt;</code>{' '}
            carrying its own background and vertical padding, with a{' '}
            <code className="font-mono text-base">.container-site</code> inside it for the width.
            In Drupal, each maps naturally onto one paragraph type (or one Layout Builder section),
            with the band colour as a field on it.
          </p>
        </DocPageHeader>

        {/* ── 1. Page skeleton ─────────────────────────────────────────── */}
        <DocSection title="Page skeleton">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              Every page renders the same regions in the same order:{' '}
              <strong className="text-navy-bolder">Header → section sub-nav → hero → AdUnit (leaderboard) → content sections → Footer</strong>.
              The sub-nav is present on every page inside a section (Books, About, Giving,
              Proceedings…) and absent on the homepage. The ad sits directly under the hero on
              landing pages; basic pages and long archives drop it. Everything below the ad is a
              stack of full-width sections.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {SKELETONS.map((s) => (
                <PageDiagram key={s.title} {...s} />
              ))}
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Page wrapper',
                  classes: 'flex flex-col min-h-screen',
                  note: 'A column at least one viewport tall. Together with main.flex-1 it pins the footer to the bottom of short pages (confirmation screens, a two-paragraph basic page) instead of leaving it floating mid-screen.',
                },
                {
                  part: '<main>',
                  classes: 'flex-1',
                  note: 'Grows to fill whatever the header and footer leave. Holds the sub-nav, hero, ad and sections — the sub-nav is inside main, not part of the header, so it scrolls away while the header stays stuck.',
                },
                {
                  part: 'Header',
                  classes: 'sticky top-0 z-40 bg-white transition-shadow duration-300',
                  note: (
                    <>
                      Sticky. Full height 157–172px at the top of a desktop page, compacting to about
                      84–87px once scrolled (81px on mobile). Every anchor offset on this sheet is
                      sized against the compact height. See{' '}
                      <Link to="/design-system/navigation" className="text-link">Navigation</Link>.
                    </>
                  ),
                },
                {
                  part: 'Section',
                  classes: 'bg-white py-12 lg:py-16 → .container-site',
                  note: 'Full-bleed band; the container inside sets the width (max-w-container mx-auto px-6 lg:px-8 xl:px-0 — 1312px, gutters drop at xl because 1312 + margins already clears the edge).',
                },
              ]}
            />

            <div>
              <DocLabel>Composition, from source</DocLabel>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CodeBlock
                  code={`// Section front — src/pages/BooksAndPress.tsx
<div className="flex flex-col min-h-screen">
  <Header />
  <main className="flex-1">
    <BooksSubNav />
    <BooksHero />
    <BooksProductSection title="New releases" … />
    <AdUnit />
    <BooksTopSubjects />
    <BooksProductSection title="Best sellers" background="subtle" … />
    <BooksBillboards />
  </main>
  <Footer />
</div>

// Section front with jump links — src/pages/Giving.tsx
<main className="flex-1">
  <GivingSubNav />
  <GivingHero />
  <GivingJumpNav />
  <GivingAbout />          {/* bg-white   */}
  <GivingQuickLinks />     {/* bg-[#002B5C] */}
  <GivingWaysToGive />     {/* bg-surface-subtle */}
  <GivingMeetTheTeam />    {/* bg-white   */}
  <GivingTaxInfo />        {/* bg-surface-subtle */}
  <GivingConferenceCenter />
</main>`}
                />
                <CodeBlock
                  code={`// Basic page — src/pages/BooksAboutSubPage.tsx
<main className="flex-1">
  <BooksSubNav />
  <PageHero title={page.title} panelTone="light"
    breadcrumb={<Breadcrumb … />} />
  <BooksAboutSubPageContent slug={slug} />
</main>

// Long archive — src/pages/AboutStateOfTheInstitute.tsx
<main className="flex-1">
  <AboutSubNav />
  <AboutPageHero title="State of the Institute" … />
  <StateOfTheInstituteEntries />   {/* .rich-text */}
</main>

// Landing, photo hero + ad — src/pages/BooksAbout.tsx
<main className="flex-1">
  <BooksSubNav />
  <PageHero image={heroImage} mobileImage="short"
    panelSide="right" breadcrumb={…} />
  <AdUnit />
  <BooksAboutIntro />
  <BooksAboutLinks />
  <BooksAboutFAQ />
</main>`}
                />
              </div>
            </div>

            <DevNote>
              <p>
                The skeleton is the page template, and every region but the content is a block
                region, not body content. A sketch of <code className="font-mono text-xs">page.html.twig</code>:
              </p>
              <CodeBlock
                code={`<div class="flex flex-col min-h-screen">
  {{ page.header }}                 {# sticky site header #}
  <main class="flex-1" id="main-content">
    {{ page.section_nav }}          {# menu block, per section #}
    {{ page.hero }}                 {# hero field / paragraph #}
    {{ page.ad_leaderboard }}       {# ad block; empty on basic pages #}
    {{ page.content }}              {# stack of section paragraphs #}
  </main>
  {{ page.footer }}
</div>`}
              />
              <p>
                Leave the ad region empty (do not render the wrapper) on basic pages and archives —
                AdUnit carries its own <code className="font-mono text-xs">py-6 lg:py-8</code>, so an
                empty one still leaves a 48–64px gap. Add a skip link in the header that targets{' '}
                <code className="font-mono text-xs">#main-content</code>.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/pages/BooksAndPress.tsx', note: 'section front' },
                { path: 'src/pages/Giving.tsx', note: 'section front with a jump-link nav' },
                { path: 'src/pages/BooksAboutSubPage.tsx', note: 'basic page (three slugs, one template)' },
                { path: 'src/pages/ProceedingsSubmissions.tsx', note: 'basic page' },
                { path: 'src/pages/AboutStateOfTheInstitute.tsx', note: 'long archive' },
                { path: 'src/pages/BooksAbout.tsx', note: 'landing: photo hero, ad, content' },
                { path: 'src/pages/BooksDigitalEditions.tsx', note: 'landing: photo hero, ad, content' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/Home.tsx', note: 'no sub-nav (correct for the homepage), but the leaderboard sits after the first content band rather than under the hero, and LatestNews is wrapped in an ad-hoc <div className="pt-8"> to add space.' },
                { path: 'src/pages/BooksAndPress.tsx', note: 'ad after the first content row, not under the hero — the section-front convention; landing and sub-landing pages put it under the hero.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 2. Section header ────────────────────────────────────────── */}
        <DocSection title="Section header">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              Two treatments exist, and they are not interchangeable.{' '}
              <strong className="text-navy-bolder">The headline over a 2px blue rule is the canonical section header</strong>{' '}
              for every interior and landing page — 26 files use it. The{' '}
              <code className="font-mono text-sm">SectionHeader</code> component (rule <em>above</em>,
              bigger headline, description and CTA alongside) is the homepage's editorial band
              header, and only there.
            </p>

            <div>
              <DocLabel>Canonical — headline over a 2px #0466C8 rule, with intro and trailing link</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white" defaultOpen={false}>
                <CollectionTitlesGrid
                  heading="Notable Books on Maritime Strategy"
                  intro="Recommended further reading from the Naval Institute Press on sea power, strategy, and the history of maritime competition."
                  titles={notableBooks.slice(0, 5)}
                  seeAll={{ label: 'See all Press titles', href: '/books' }}
                />
              </LiveMarkup>
              <p className="font-body text-sm text-neutral-subtle leading-relaxed mt-3 max-w-[760px]">
                Real data from <code className="font-mono text-xs">notableBooks</code> (the foot of the
                American Sea Power Project page), cut to five titles. The intro and the See all link
                are added here to show the optional parts; the live page uses neither.
              </p>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Heading (no trailing link)',
                  classes: 'font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]',
                  note: 'The rule is the heading’s own bottom border, so it is exactly the heading’s width (the container). 26px → 32px at lg. #0466C8 = navy-bright; prefer border-navy-bright in the build.',
                },
                {
                  part: 'Wrapper (with trailing link)',
                  classes: 'pb-4 border-b-2 border-[#0466C8]',
                  note: 'When a link shares the row, the rule moves to a wrapper div and the h2 loses its pb-4/border.',
                },
                {
                  part: 'Row',
                  classes: 'flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6',
                  note: 'Stacks below sm; from sm the link sits at the right, baseline-aligned to the headline’s last line.',
                },
                {
                  part: 'Heading (in wrapper)',
                  classes: 'font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]',
                },
                {
                  part: 'See all link',
                  classes: 'group font-body font-semibold text-sm text-[#0466C8] hover:text-navy transition-colors whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 pb-0.5',
                  note: 'Underline is an inner span scaled from 0 to 100% on hover (scale-x-0 group-hover:scale-x-100 origin-left), plus fa-chevron-right text-xs.',
                },
                {
                  part: 'Optional eyebrow',
                  classes: 'font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle',
                  note: 'From ReadingListSection: inside the wrapper, above the h2, which then takes mt-1.5.',
                },
                {
                  part: 'Intro paragraph',
                  classes: 'font-body text-base text-neutral-bold leading-[1.7] max-w-[780px] mt-6',
                  note: 'Sits below the rule. Half the copies add lg:text-[17px] to match the reading column — build it with the step-up.',
                },
                {
                  part: 'Content below',
                  classes: 'mt-8',
                  note: 'The grid or list takes mt-8 from the rule (or the intro). CollectionTitlesGrid uses mt-1 pt-7 instead to give the cover hover-lift headroom inside the same 32px.',
                },
              ]}
            />

            <div>
              <DocLabel>Homepage band — SectionHeader (rule above)</DocLabel>
              <LiveMarkup>
                <SectionHeader
                  eyebrow="The Latest From Our Newsroom"
                  headline="Latest Maritime News & Analysis"
                  description="Stay current with breaking news, analysis, and photography from USNI News — the authoritative source for U.S. naval and maritime affairs."
                  ctaLabel="Visit USNI News"
                  ctaHref="/news"
                />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Rule + row',
                  classes: 'border-t-2 border-navy-bold pt-8 flex flex-col lg:flex-row lg:items-start lg:gap-8',
                  note: 'Rule is above the heading, in navy-bold (#002B5C), not blue. Two halves side by side from lg.',
                },
                {
                  part: 'Eyebrow + headline',
                  classes: 'eyebrow-headline → eyebrow → font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]',
                  note: '.eyebrow-headline is flex flex-col gap-2. 36px → 48px — a band-level headline, a step above the interior 26/32.',
                },
                {
                  part: 'Description column',
                  classes: 'flex-1 mt-6 lg:mt-0 lg:max-w-[600px] flex flex-col gap-6 justify-start',
                },
                {
                  part: 'Description',
                  classes: 'font-body text-base lg:text-lg text-neutral-subtle leading-relaxed',
                },
                {
                  part: 'Centered variant',
                  classes: 'text-center → eyebrow-headline items-center',
                  note: 'centered prop: no rule, no description. NavalInstituteAtWork hand-writes the same thing inline.',
                },
              ]}
            />

            <DevNote>
              <p>
                Build one section-header Twig include with <code className="font-mono text-xs">{'{{ heading }}'}</code>,
                optional <code className="font-mono text-xs">{'{{ eyebrow }}'}</code>,{' '}
                <code className="font-mono text-xs">{'{{ intro }}'}</code> and{' '}
                <code className="font-mono text-xs">{'{{ see_all.url }}'}</code> /{' '}
                <code className="font-mono text-xs">{'{{ see_all.title }}'}</code>, and a{' '}
                <code className="font-mono text-xs">heading_level</code> (default h2). Render the
                rule on the heading when there is no link and on a wrapper when there is, as above.
                Use the homepage SectionHeader only for the homepage bands; give it its own include.
              </p>
              <p>
                The <code className="font-mono text-xs">Eyebrow</code> React component is not used
                by any page (only the style guide). In the build, use one eyebrow class. Note the
                global <code className="font-mono text-xs">.eyebrow</code> class sets{' '}
                <code className="font-mono text-xs">tracking-widest</code> (0.1em) while every inline
                eyebrow and the <code className="font-mono text-xs">text-eyebrow</code> token use 0.08em —
                settle on 0.08em.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/sections/SeaPowerArticleGrid.tsx', note: 'canonical: rule on the h2' },
                { path: 'src/sections/CollectionTitlesGrid.tsx', note: 'canonical: rule on a wrapper with See all link' },
                { path: 'src/sections/GivingPromoCards.tsx', note: 'canonical, with intro' },
                { path: 'src/pages/design-system/TableOfContents.tsx', note: 'the /toc page — same classes on an h3' },
                { path: 'src/components/ui/SectionHeader.tsx', note: 'homepage band header (LatestNews is its only page user)' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift — underline header"
              items={[
                { path: 'src/sections/BooksProductSection.tsx', note: 'text-3xl lg:text-4xl leading-[1.1] (30/36px) instead of 26/32; flex items-end row with no sm stack.' },
                { path: 'src/sections/BooksTopSubjects.tsx', note: 'text-3xl lg:text-4xl leading-[1.1], and mb-2 on the h2 on top of the grid’s mt-8.' },
                { path: 'src/sections/ReadingListSection.tsx', note: 'eyebrow variant; lg:text-[36px]. Same in ReadingListsPressLibraries.tsx and ReadingListsOther.tsx.' },
                { path: 'src/sections/GivingOpportunities.tsx', note: 'mb-8 on the h2 rather than mt-8 on what follows. GivingSubPage.tsx line 135 does the same with mb-6.' },
                { path: 'src/sections/CollectionCrossLinks.tsx', note: 'same structure with border-gold, on a navy-boldest band — the dark-background counterpart.' },
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'filter sidebar label: mb-3 pb-3 border-b-2 border-[#0466C8] on a small uppercase h2 — a sidebar label, not a section header.' },
                { path: 'src/components/ui/FilterPanel.tsx', note: 'mobile toggle uses border-b-4 border-[#0466c8] pb-3.' },
                { path: 'src/pages/design-system/TableOfContents.tsx', note: 'h3, not h2.' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift — homepage band header (inline copies of SectionHeader)"
              items={[
                { path: 'src/sections/NavalHistory.tsx', note: 'lg:gap-12 not lg:gap-8; eyebrow is font-semibold … tracking-[0.08em] mb-2 instead of .eyebrow inside .eyebrow-headline; no lg:max-w-[600px] on the description column. Same in ProceedingsMagazine.tsx and FromThePress.tsx.' },
                { path: 'src/sections/EssayContestsCurrentGrid.tsx', note: 'rule + headline only, on an interior page — should be the underline header.' },
                { path: 'src/sections/UpcomingEvents.tsx', note: 'bare text-4xl lg:text-5xl h2 with no rule at all.' },
                { path: 'src/sections/NavalInstituteAtWork.tsx', note: 'inline copy of the centered variant.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 3. Section rhythm & backgrounds ──────────────────────────── */}
        <DocSection title="Section rhythm & backgrounds">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              Two padding steps cover nearly every section. A survey of every{' '}
              <code className="font-mono text-sm">&lt;section&gt;</code> in{' '}
              <code className="font-mono text-sm">src/sections</code> and{' '}
              <code className="font-mono text-sm">src/pages</code>:
            </p>

            <ClassTable
              rows={[
                {
                  part: 'Standard — 39 sections',
                  classes: 'py-12 lg:py-16',
                  note: '48px → 64px. Interior content: basic-page bodies, intros, card grids, archives, Giving sub-pages, Taylor Center. The default.',
                },
                {
                  part: 'Band — 25 sections',
                  classes: 'py-16 lg:py-20',
                  note: '64px → 80px. Homepage and section-front bands, About/Giving landing blocks, FAQ bands. Identical to py-section lg:py-section-lg in tokens.',
                },
                {
                  part: 'Follow-on',
                  classes: 'pb-12 lg:pb-16 / pt-12 lg:pt-16',
                  note: 'When two sections share a background, the second drops its top padding (BooksAboutLinks after BooksAboutIntro) or the first drops its bottom (the Sea Power intro) so the gap is not doubled.',
                },
                {
                  part: 'Drift',
                  classes: 'py-14 lg:py-16 · py-14 lg:py-20 · py-10 lg:py-16 · py-10 lg:py-20 · py-section · py-16 · py-16 lg:py-24',
                  note: 'Books & Press rows (6), issue pages (9), Membership (5, py-section with no lg step), carts/checkout (py-16), Login. Fold into the two steps.',
                },
              ]}
            />

            <div>
              <DocLabel>Background bands, in order of use</DocLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { cls: 'bg-white', name: 'bg-white', note: '85 sections — default' },
                  { cls: 'bg-surface-subtle', name: 'bg-surface-subtle', note: '#EEF2FF · 15 — the alternate band' },
                  { cls: 'bg-[#ebf4ff]', name: 'bg-[#ebf4ff]', note: 'no token · 26, mostly light heroes' },
                  { cls: 'bg-tan-subtlest', name: 'bg-tan-subtlest', note: '#F7F7F2 · 3 (+1 as bg-[#f7f7f2])' },
                  { cls: 'bg-neutral-subtlest', name: 'bg-neutral-subtlest', note: '#F4F4F6 · 1 as bg-[#F4F4F6]' },
                  { cls: 'bg-[#002B5C]', name: 'bg-[#002B5C]', note: '= navy-bold · 2 (dark feature band)' },
                  { cls: 'section-gradient', name: '.section-gradient', note: '256deg #FFF → #F4F4F6 · ProceedingsMagazine' },
                  { cls: '', name: 'linear-gradient(65deg, #ebf4ff 8%, #ffffff 73%)', note: 'inline style · issue archives', style: { background: 'linear-gradient(65deg, #ebf4ff 8%, #ffffff 73%)' } },
                ].map((b) => (
                  <div key={b.name} className="border border-border-light">
                    <div className={`h-20 ${b.cls}`} style={b.style} />
                    <div className="px-3 py-2 bg-white border-t border-border-light">
                      <p className="font-mono text-xs text-navy-bolder break-words">{b.name}</p>
                      <p className="font-body text-xs text-neutral-subtle">{b.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Alternation',
                  classes: 'bg-white ↔ bg-surface-subtle',
                  note: 'Adjacent content sections alternate white and surface-subtle so each reads as a band without a rule between them (Giving: white, navy, subtle, white, subtle; Sea Power: white, subtle, white…). Sections that take a background prop expose exactly these two: background?: \'white\' | \'subtle\'.',
                },
                {
                  part: 'Light blue',
                  classes: 'bg-[#ebf4ff]',
                  note: 'The light-blue page-header colour (PageHero, AboutPageHero, every *Hero). Used as a band in AboutQuickLinks, UpcomingEvents, FromThePress, TaylorCenterSpaces/History, AboutHistoryActivities, AboutStrategicPlanDocument. It is a different blue from surface-subtle (#EEF2FF) — two near-identical light bands is drift; pick one for bands and keep #ebf4ff for heroes.',
                },
                {
                  part: 'Dark band',
                  classes: 'bg-[#002B5C]',
                  note: 'Feature blocks on dark (GivingQuickLinks, AboutPillars). Hard-coded hex of the navy-bold token.',
                },
                {
                  part: 'Gradients',
                  classes: 'section-gradient · section-gradient-blue · inline linear-gradient(…)',
                  note: 'Four inline gradients, each hand-written: 65deg #ebf4ff→#fff (ProceedingsIssueArchive, NavalHistoryIssueArchive), 52.83deg variant of the same (PromoRow), to bottom #EBF4FF→#FFF (ArticleHeader), 232deg #fff→#f4f4f6 (ProceedingsSponsoredBillboard). .section-gradient-blue is defined in index.css but unused.',
                },
              ]}
            />

            <DevNote>
              <p>
                Expose the band as a list field on each section paragraph —{' '}
                <code className="font-mono text-xs">white</code>,{' '}
                <code className="font-mono text-xs">subtle</code>, and (for the few that need it){' '}
                <code className="font-mono text-xs">dark</code> — and the padding as{' '}
                <code className="font-mono text-xs">standard</code> /{' '}
                <code className="font-mono text-xs">band</code>, mapped to the classes above in the
                paragraph template. Editors should not be able to pick a hex.
              </p>
              <p>
                Promote the 65deg gradient to a class (e.g.{' '}
                <code className="font-mono text-xs">.section-gradient-sky</code>) rather than repeating
                the inline style; inline <code className="font-mono text-xs">style</code> attributes do
                not survive most Twig/XSS filters cleanly anyway.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ── 4. Reading column ────────────────────────────────────────── */}
        <DocSection title="Reading column & prose">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              On a basic content page — one whose body is nothing but prose — the copy is set in one
              column 860px at most, centred in the site container, with the text itself left-aligned
              (Memoirs, Books &amp; Press sub-pages, Oral History About and Order, Proceedings
              Submissions, State of the Institute). Prose that shares a page with grids, cards, or a
              rail keeps a 760px column pinned to the container's left edge, so it lines up with what
              sits beside and below it. The same treatment comes in two
              forms: utility classes on a wrapper when the copy is authored as markup in a template,
              and <code className="font-mono text-sm">.rich-text</code> when it arrives as HTML from
              a WYSIWYG field.
            </p>

            <div>
              <DocLabel>JSX prose — BooksAboutIntro (with See more toggle)</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white">
                <BooksAboutIntro />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Section',
                  classes: 'bg-white py-12 lg:py-16 → container-site',
                },
                {
                  part: 'Column',
                  classes: 'max-w-[760px] flex flex-col gap-5 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]',
                  note: 'Type is set once on the column, not on each <p>. gap-5 (20px) is the paragraph spacing — no margins on children. 16px → 17px at lg. neutral-bold #33415C is the body-copy colour. On a basic content page the width is max-w-[860px] mx-auto instead; the rest is the same.',
                },
                {
                  part: 'Inline link',
                  classes: 'text-link',
                  note: 'Global class: #0466c8, 1px underline at rest drawn as a background gradient, redrawn by a keyframe sweep on hover. box-decoration-break: clone so wrapped links underline every line. See Utilities.',
                },
                {
                  part: 'See more toggle',
                  classes: 'flex items-center gap-2 font-body font-semibold text-sm text-[#023E7D] group self-start',
                  note: 'aria-expanded on the button. Label span: underline group-hover:no-underline. #023E7D = navy-subtle.',
                },
              ]}
            />

            <div>
              <DocLabel>Basic page with subheadings — BooksAboutSubPageContent, Examination Requests</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white" defaultOpen={false}>
                <BooksAboutSubPageContent slug="examination-requests" />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Subheading',
                  classes: 'font-headline text-[26px] lg:text-[30px] text-navy-bolder leading-[1.15] mt-4 first:mt-0',
                  note: 'An h2 under the hero’s h1. mt-4 adds to the column’s gap-5 so a heading sits 36px below the paragraph before it and 20px above its own; first:mt-0 drops it at the top.',
                },
                {
                  part: 'List',
                  classes: 'list-disc pl-6 flex flex-col gap-2',
                },
                {
                  part: 'Emphasis',
                  classes: '<strong> · <em>',
                  note: 'Unstyled — inherit weight 700 / italic. The archive’s .rich-text sets strong to font-semibold text-navy-bolder instead; pick one.',
                },
                {
                  part: 'Small print',
                  classes: 'text-sm text-neutral-subtle',
                  note: 'Last-updated lines, footnotes (“Last Updated: April 2026”).',
                },
              ]}
            />

            <div>
              <DocLabel>CMS HTML — .rich-text, one State of the Institute entry ({richTextEntry.date})</DocLabel>
              <LiveMarkup>
                <div className="max-w-[760px]">
                  <div className="rich-text" dangerouslySetInnerHTML={{ __html: richTextEntry.html }} />
                </div>
              </LiveMarkup>
              <p className="font-body text-sm text-neutral-subtle leading-relaxed mt-3 max-w-[760px]">
                The entry’s body exactly as the live page’s markup has it (Drupal classes stripped).
                In the archive each entry is an{' '}
                <code className="font-mono text-xs">&lt;article className="flex flex-col gap-5"&gt;</code>{' '}
                with an h2 date (<code className="font-mono text-xs">font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15]</code>)
                and, after the first,{' '}
                <code className="font-mono text-xs">border-t border-neutral-subtler pt-10 mt-10 lg:pt-12 lg:mt-12</code>.
              </p>
            </div>

            <div>
              <DocLabel>.rich-text, from src/index.css</DocLabel>
              <CodeBlock
                code={`.rich-text        { @apply flex flex-col gap-4 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]; }
.rich-text h3     { @apply font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.2] mt-4; }
.rich-text h4     { @apply font-body font-bold text-base text-navy-bolder leading-[1.4] mt-2; }
.rich-text h3 + h4 { @apply mt-0; }
.rich-text ol     { @apply list-decimal pl-6 flex flex-col gap-1.5; }
.rich-text ul     { @apply list-disc pl-6 flex flex-col gap-1.5; }
.rich-text a      { @apply text-link; }
.rich-text strong { @apply font-semibold text-navy-bolder; }
.rich-text img    { @apply block h-auto max-w-full; }
.rich-text [id]   { @apply scroll-mt-32; }   /* in-page anchors clear the sticky header */`}
              />
            </div>

            <DevNote title="For the Drupal build — body fields and CKEditor">
              <p>
                <code className="font-mono text-xs">.rich-text</code> is the class for every formatted
                text field (body, and any long-text field on a paragraph). Put it on the field
                wrapper in <code className="font-mono text-xs">field--text-long.html.twig</code> /{' '}
                <code className="font-mono text-xs">field--body.html.twig</code>, inside a{' '}
                <code className="font-mono text-xs">max-w-[760px]</code> column, and load the same
                CSS into CKEditor 5 (<code className="font-mono text-xs">ckeditor5-stylesheets</code> in
                the theme info file) so editors see the house type.
              </p>
              <p>Recommended text format, so CKEditor’s output is something the CSS covers:</p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>
                  Headings: offer <strong>H2, H3 and H4</strong> only (the page title is the h1). The
                  CSS today styles only h3/h4 because the archive’s headings were shifted down under
                  an h2 date — add <code className="font-mono text-xs">.rich-text h2</code> using the
                  basic-page subheading (<code className="font-mono text-xs">font-headline text-[26px] lg:text-[30px] text-navy-bolder leading-[1.15] mt-4</code>) so a body field on a basic page and the hand-built pages match.
                </li>
                <li>Paragraph, bold, italic, link, bulleted and numbered list, block quote, horizontal rule, image (with alt required).</li>
                <li>
                  Strip inline styles, <code className="font-mono text-xs">&lt;span&gt;</code> and
                  <code className="font-mono text-xs"> &amp;nbsp;</code> runs; no font, colour or
                  alignment buttons. CKEditor wraps list items in{' '}
                  <code className="font-mono text-xs">&lt;p&gt;</code> when pasted from Word (as this
                  entry shows) — harmless, since the list gap governs spacing.
                </li>
                <li>
                  Not yet styled and needed before launch: <code className="font-mono text-xs">h2</code>,{' '}
                  <code className="font-mono text-xs">blockquote</code>,{' '}
                  <code className="font-mono text-xs">hr</code>,{' '}
                  <code className="font-mono text-xs">table</code>, and{' '}
                  <code className="font-mono text-xs">figure / figcaption</code>. The first
                  paragraph needs no special treatment; ledes belong in the hero.
                </li>
                <li>
                  External links in body copy that open a new tab need a visually hidden “(opens in a
                  new tab)”, as DigitalEditionsIntro does — a text-format filter can add it.
                </li>
              </ul>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/sections/BooksAboutIntro.tsx', note: 'canonical JSX reading column' },
                { path: 'src/sections/BooksAboutSubPageContent.tsx', note: 'canonical basic page (Heading, List)' },
                { path: 'src/sections/DigitalEditionsIntro.tsx', note: 'same column, external links' },
                { path: 'src/sections/StateOfTheInstituteEntries.tsx', note: '.rich-text archive' },
                { path: 'src/index.css', note: '.rich-text, .text-link' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/sections/ProceedingsSubmissionsContent.tsx', note: 'centred max-w-[1100px] mx-auto column; body is text-navy-bolder leading-[1.75] with no lg step; subheads font-headline text-[30px] lg:text-[40px]; groups spaced with gap-12 lg:gap-14. Build it on the canonical basic-page column instead.' },
                { path: 'src/sections/PmeIntro.tsx', note: 'max-w-[680px] — narrower because covers sit beside it (deliberate in a two-column row).' },
                { path: 'src/sections/TaylorCenterCommemorative.tsx', note: 'section intro at max-w-[820px]; other intros are 780px, the column 760px.' },
                { path: 'src/index.css (.rich-text)', note: 'gap-4 between blocks, where the JSX column uses gap-5; strong is semibold navy where JSX pages leave it bold, inherited colour.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 5. Grids ─────────────────────────────────────────────────── */}
        <DocSection title="Card grids">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              Card grids are plain CSS grids inside the container: one column on phones, stepping
              up at a breakpoint, with a single gap. Three recipes cover almost every grid; the
              cards themselves are documented on{' '}
              <Link to="/design-system/cards" className="text-link">Cards</Link>.
            </p>

            <div>
              <DocLabel>3-up, text cards — BooksAboutLinks</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white pt-8">
                <BooksAboutLinks />
              </LiveMarkup>
            </div>

            <div>
              <DocLabel>3-up, article cards with header — SeaPowerArticleGrid (first three Phase I articles)</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white" defaultOpen={false}>
                <SeaPowerArticleGrid
                  id="phase-i-demo"
                  heading={phaseOneIntro.title}
                  description={phaseOneIntro.description}
                  articles={phaseOneArticles.slice(0, 3)}
                />
              </LiveMarkup>
            </div>

            <div>
              <DocLabel>4-up on a band — NavalInstituteAtWork</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white" defaultOpen={false}>
                <NavalInstituteAtWork />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                {
                  part: '3-up, two-step',
                  classes: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6',
                  note: '1 → 2 at 640px → 3 at 1024px. The default for any card that has an image. UpcomingEvents uses gap-6 lg:gap-8; PmeCollectionsGrid gap-6.',
                },
                {
                  part: '3-up, article teasers',
                  classes: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-8',
                  note: 'SeaPowerArticleGrid. Unboxed SmallFeature cards need more air between rows than columns, hence split gaps.',
                },
                {
                  part: '3-up, text only',
                  classes: 'grid grid-cols-1 md:grid-cols-3 gap-6',
                  note: 'BooksAboutLinks. Skips the 2-up step — three short text cards fit at 768px, and 2 + 1 orphan looks broken.',
                },
                {
                  part: '4-up',
                  classes: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6',
                  note: 'NavalInstituteAtWork, AboutQuickLinks. 1 → 2 → 4; never 3, which would orphan one card.',
                },
                {
                  part: '2-up',
                  classes: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
                  note: 'Promo and wide cards (GivingPromoCards uses gap-8, and max-w-[640px] when there is only one).',
                },
                {
                  part: 'Cover grids',
                  classes: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10',
                  note: 'Book covers start at two columns even on phones (CollectionTitlesGrid).',
                },
                {
                  part: 'News 1-2-1',
                  classes: 'grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0',
                  note: 'LatestNews only: three columns divided by border-r border-border-light with lg:px-8 inside each instead of a gap.',
                },
                {
                  part: 'Card height',
                  classes: 'h-full · flex flex-col · flex-1 on the body',
                  note: 'Cards in a row stretch to the tallest (grid default); the body takes flex-1 so CTAs line up along the bottom.',
                },
              ]}
            />

            <DevNote>
              <p>
                In Drupal these are a Views grid or an entity-reference field rendered through one
                grid template with a <code className="font-mono text-xs">columns</code> variable (3,
                3-text, 4, 2) mapping to the class strings above. Use a{' '}
                <code className="font-mono text-xs">&lt;ul&gt;</code>/<code className="font-mono text-xs">&lt;li&gt;</code>{' '}
                for the grid when the cards are a list of links, so screen readers announce the count.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/sections/BooksAboutLinks.tsx', note: '3-up text' },
                { path: 'src/sections/SeaPowerArticleGrid.tsx', note: '3-up articles' },
                { path: 'src/sections/UpcomingEvents.tsx', note: 'highlight card + 3-up' },
                { path: 'src/sections/NavalInstituteAtWork.tsx', note: '4-up' },
                { path: 'src/sections/AboutQuickLinks.tsx', note: '4-up with images' },
                { path: 'src/sections/LatestNews.tsx', note: '1-2-1 news grid' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/sections/EssayContestsCurrentGrid.tsx', note: 'sm:grid-cols-2 lg:grid-cols-3 gap-8.' },
                { path: 'various', note: 'the same 3-up appears with gap-x-8 gap-y-12, gap-x-8 gap-y-8 and gap-x-8 gap-y-4; 4-up with gap-4, gap-5, gap-8 and gap-x-6 gap-y-8; sm:grid-cols-2 xl:grid-cols-3 twice. Fold into the recipes above.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 6. Two-column layouts ────────────────────────────────────── */}
        <DocSection title="Two-column layouts">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              Three kinds, all a single column below <code className="font-mono text-sm">lg</code>{' '}
              (1024px) and a fixed-width track beside a flexible one above it.
            </p>

            <div>
              <DocLabel>Heading left, content right — BooksAboutFAQ</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white" defaultOpen={false}>
                <BooksAboutFAQ />
              </LiveMarkup>
              <p className="font-body text-sm text-neutral-subtle leading-relaxed mt-3 max-w-[760px]">
                The accordion rows are documented on{' '}
                <Link to="/design-system/accordions" className="text-link">Accordions &amp; Disclosure</Link>.
              </p>
            </div>

            <div>
              <DocLabel>Copy beside a cover block — PmeIntro</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white" defaultOpen={false}>
                <PmeIntro />
              </LiveMarkup>
            </div>

            <div>
              <DocLabel>Cover beside text, repeated rows — DigitalEditionsList</DocLabel>
              <LiveMarkup previewClassName="p-0 bg-white" defaultOpen={false}>
                <DigitalEditionsList />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Heading left (FAQ)',
                  classes: 'grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[416px_1fr] gap-12 lg:gap-16',
                  note: 'The heading and a CTA in a 380px (416px at xl) column; the content takes the rest. Used identically by BooksAboutFAQ, DonateFAQ, ArchivesFAQ, GivingWaysToGive and GivingTaxInfo — the most consistent layout in the prototype.',
                },
                {
                  part: 'Content + right rail',
                  classes: 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-10 lg:gap-16',
                  note: 'Main copy with a 360px aside (contact, key facts, related links): TaylorCenterAbout, CollectionIntro, GivingSubPage, GivingStudentMemberships. minmax(0,1fr) rather than 1fr lets the main track shrink below its content’s min width, so a long URL or a carousel cannot push the rail off-screen.',
                },
                {
                  part: 'Copy + image',
                  classes: 'grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16',
                  note: 'GivingAbout, AboutMissionVision, ArchivesAbout.',
                },
                {
                  part: 'Copy + covers (PmeIntro)',
                  classes: 'grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-10 lg:gap-16 xl:gap-20 items-start',
                  note: 'Cover block sets its own width (lg:w-[420px] xl:w-[468px]); copy narrows to max-w-[680px].',
                },
                {
                  part: 'Cover row (DigitalEditionsList)',
                  classes: 'grid grid-cols-1 sm:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-6 sm:gap-10 lg:gap-14 items-start py-10 lg:py-12',
                  note: 'Goes two-column from sm (640px) — the only layout here that does — because a 200px cover beside text still reads on a small tablet. Rows after the first add border-t border-neutral-subtler; the first drops its top padding (pt-0 lg:pt-0) and the last its bottom (last:pb-0 lg:last:pb-0).',
                },
                {
                  part: 'Filter sidebar + results',
                  classes: 'container-site flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12',
                  note: 'Flex, not grid. The aside (FilterPanel) is w-full lg:w-[300px] xl:w-[320px] lg:flex-shrink-0, not sticky; collapses behind a toggle (aria-expanded/aria-controls) below lg. PastEventsArchive, EssayContestsArchive.',
                },
              ]}
            />

            <DevNote>
              <p>
                Layout Builder’s two-column section can host these, but the widths are fixed
                design decisions, not editor choices — implement each as its own layout (or
                paragraph template) with the class string baked in. The filter sidebar needs a
                Drupal behavior for the mobile toggle (<code className="font-mono text-xs">aria-expanded</code> on
                the button, <code className="font-mono text-xs">aria-controls</code> pointing at the panel);
                with Views exposed filters the panel content is the exposed form.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/sections/BooksAboutFAQ.tsx', note: 'heading-left' },
                { path: 'src/sections/TaylorCenterAbout.tsx', note: 'content + right rail' },
                { path: 'src/sections/PmeIntro.tsx', note: 'copy + covers' },
                { path: 'src/sections/DigitalEditionsList.tsx', note: 'cover rows' },
                { path: 'src/components/ui/FilterPanel.tsx', note: 'filter sidebar (with PastEventsArchive.tsx)' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'filter sidebar hand-built: hidden lg:block w-[220px] xl:w-[240px] flex-shrink-0, not sticky, no mobile toggle (filters simply disappear below lg).' },
                { path: 'src/components/layout/AccountLayout.tsx', note: 'sidebar at lg:w-[280px] on bg-[#f4f6fb] — its own pattern; see Account.' },
                { path: 'src/sections/ContactSections.tsx', note: 'heading-left at lg:grid-cols-[360px_1fr] gap-10 lg:gap-16 with no xl step.' },
                { path: 'src/sections/AboutStrategicPlanForeword.tsx', note: 'right rail at 340px → 380px with gap-10 xl:gap-12. BookProductOverview.tsx uses 1fr_340px → 1fr_380px (plain 1fr).' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 7. Ad placements ─────────────────────────────────────────── */}
        <DocSection title="Ad placements">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              <code className="font-mono text-sm">AdUnit</code> is a placeholder for an ad-server
              slot, in two sizes. The component itself is documented on{' '}
              <Link to="/design-system/cards" className="text-link">Cards</Link>; this is where it goes.
            </p>

            <LiveMarkup label="Leaderboard — between sections" previewClassName="p-0 bg-white">
              <AdUnit />
            </LiveMarkup>

            <ClassTable
              rows={[
                {
                  part: 'Leaderboard',
                  classes: 'w-full flex flex-col items-center py-6 lg:py-8',
                  note: '728 × 90 (h-[90px] max-w-[728px]). A direct child of <main> with no section or container around it — it centres itself and brings its own 24–32px of padding.',
                },
                {
                  part: 'Under the hero',
                  classes: '<PageHero /> → <AdUnit />',
                  note: 'Landing and sub-landing pages: About, Proceedings, Naval History, Archives, Books About, Digital Editions, PME, book series, current-issue pages.',
                },
                {
                  part: 'Between bands',
                  classes: '<Section /> → <AdUnit /> → <Section />',
                  note: 'Homepage (two) and Books & Press — after the first content band, never two ads in a row, never directly above the footer.',
                },
                {
                  part: 'In an article',
                  classes: 'AdUnit size="leaderboard" mid-body · size="rectangle" inline below xl · 300px rail at xl',
                  note: 'ArticleBody: a leaderboard at the mid-article break; the right rail (xl:grid-cols-[minmax(0,1fr)_300px]) holds rectangles from xl, with a xl:hidden inline rectangle standing in below that. See Article & Media.',
                },
                {
                  part: 'Never',
                  classes: '—',
                  note: 'Basic pages, archives, forms, cart/checkout, account. A transactional page with an ad looks like phishing.',
                },
              ]}
            />

            <DevNote>
              <p>
                Make the leaderboard a block placed in the <code className="font-mono text-xs">ad_leaderboard</code>{' '}
                region by content type / path visibility, and the in-body ad a paragraph type editors
                can insert. The ad tag (GPT <code className="font-mono text-xs">googletag.defineSlot</code>)
                replaces the grey box but keeps the outer wrapper and the “Advertisement” label; reserve the
                height (<code className="font-mono text-xs">h-[90px]</code>) so the page does not jump when
                the creative loads, and collapse the wrapper entirely when no ad is returned.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/components/ui/AdUnit.tsx' },
                { path: 'src/pages/BooksAbout.tsx', note: 'under the hero' },
                { path: 'src/pages/Home.tsx', note: 'between bands' },
                { path: 'src/sections/ArticleBody.tsx', note: 'in-article leaderboard, inline rectangle, rail' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 8. Anchors ───────────────────────────────────────────────── */}
        <DocSection title="Jump links & section anchors">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              Any section a link can land on carries an <code className="font-mono text-sm">id</code>{' '}
              on the <code className="font-mono text-sm">&lt;section&gt;</code> and a{' '}
              <code className="font-mono text-sm">scroll-mt-*</code> so the sticky chrome does not cover
              its heading. Measured at 1440px: the compact header is 87px tall (84px at 1100px, 81px on
              mobile); the sticky <code className="font-mono text-sm">JumpLinkNav</code> adds 67px (54px
              on mobile), so header plus jump nav is about 153px.
            </p>

            <ClassTable
              rows={[
                {
                  part: 'Header only',
                  classes: 'scroll-mt-32',
                  note: '128px — clears the 87px header with ~40px of air. The default, and what .rich-text [id] applies. 16 uses: SeaPowerArticleGrid, CollectionTitlesGrid, Taylor Center sections, GivingMeetTheTeam, SocietyDonorListing…',
                },
                {
                  part: 'Header + jump nav',
                  classes: 'scroll-mt-40',
                  note: '160px — clears ~153px. ReadingListSection, ReadingListsPressLibraries, ReadingListsOther (the reading-lists page has a JumpLinkNav).',
                },
                {
                  part: 'Forms',
                  classes: 'scroll-mt-28',
                  note: '112px — checkout steps scrolled to on validation errors (BooksCheckout, DonateCheckout…). The /toc groups use it too.',
                },
                {
                  part: 'Section',
                  classes: 'py-12 lg:py-16 scroll-mt-32',
                  note: 'From SeaPowerArticleGrid: id comes from a prop; the margin sits on the section, so the band’s own top padding adds to the clearance.',
                },
                {
                  part: 'Drift',
                  classes: 'scroll-mt-[100px] · scroll-mt-[150px] · scroll-mt-8',
                  note: 'UpcomingEvents (100px), LeadershipRoster and ContactSections (150px, both under a JumpLinkNav — 3px short of clearing it), EssayContestBody (32px, an in-column anchor).',
                },
              ]}
            />

            <DevNote>
              <p>
                <code className="font-mono text-xs">JumpLinkNav</code> handles its own clicks in JS: it
                measures the live sticky chrome and scrolls to just below it, so jump-link clicks
                land correctly whatever the target’s scroll margin. <code className="font-mono text-xs">scroll-mt</code>{' '}
                is what makes a <em>shared</em> link (<code className="font-mono text-xs">/proceedings/sea-power-project#phase-ii</code>)
                or an in-body anchor land correctly. Rule: sections on a page with a jump nav take{' '}
                <code className="font-mono text-xs">scroll-mt-40</code>; everything else{' '}
                <code className="font-mono text-xs">scroll-mt-32</code>. Sea Power and Giving sections carry
                scroll-mt-32 (or nothing) under a jump nav, so a deep link lands about 25px under it.
              </p>
              <p>
                Simpler in the build: set <code className="font-mono text-xs">scroll-padding-top</code> on{' '}
                <code className="font-mono text-xs">html</code> from a CSS variable the header and jump-nav
                behaviors update, and drop per-section scroll-mt entirely. Section ids come from a
                machine-name field on the paragraph (<code className="font-mono text-xs">{'id="{{ anchor }}"'}</code>);
                the jump-nav block lists the paragraphs that have one.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/components/ui/JumpLinkNav.tsx', note: 'sticky top-[86px] z-30; see Navigation' },
                { path: 'src/sections/SeaPowerArticleGrid.tsx', note: 'id + scroll-mt-32 on the section' },
                { path: 'src/sections/ReadingListSection.tsx', note: 'id + scroll-mt-40 under a jump nav' },
                { path: 'src/index.css', note: '.rich-text [id] { scroll-mt-32 }' },
              ]}
            />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
