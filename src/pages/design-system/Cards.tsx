import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import PlainCard from '@/components/cards/PlainCard'
import SmallFeature from '@/components/cards/SmallFeature'
import LargeFeature from '@/components/cards/LargeFeature'
import XSmallFeature from '@/components/cards/XSmallFeature'
import AdUnit from '@/components/ui/AdUnit'
import CollectionTitleCard from '@/components/cards/CollectionTitleCard'
import CollectionTeaserCard from '@/components/cards/CollectionTeaserCard'
import IssueCoverCard from '@/components/ui/IssueCoverCard'
import ContactCard from '@/components/ui/ContactCard'
import BooksAboutLinks from '@/sections/BooksAboutLinks'
import GivingPromoCards from '@/sections/GivingPromoCards'
import GivingQuickLinks from '@/sections/GivingQuickLinks'
import { seriesBySlug, seriesHref, blueAndGold, marineCorpsHistory } from '@/data/bookCollections'
import { givingSubPages } from '@/data/givingSocieties'
import type { Article } from '@/types'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'
import img250YearCelebration from '@/assets/images/250-year-celebration.png'
import imgOurHistory from '@/assets/images/our-histroy-feature-image.png'
import imgProceedingsAug26 from '@/assets/images/proceedings-magazine-aug26-cover.png'
import imgNavalHistoryAug26 from '@/assets/images/naval-history-magazine-aug26-cover.jpg'

const articles: Article[] = [
  {
    id: 'demo-1',
    category: 'Books',
    headline: 'AI Warfighting: The Next Generation of Naval Strategy',
    excerpt: 'A survey of how autonomous systems are reshaping doctrine, procurement, and the future fleet.',
    author: 'Morrison & Chen',
    date: 'July 2026',
    image: imgAIWarfighting,
    imageAlt: 'AI Warfighting book cover',
    href: '#',
  },
  {
    id: 'demo-2',
    category: 'News',
    headline: 'USNI Marks 250 Years of Naval Service',
    excerpt: 'A look back at a milestone anniversary and what it means for the Institute’s next chapter.',
    author: 'USNI Staff',
    date: 'June 2026',
    image: img250YearCelebration,
    imageAlt: '250 Year Celebration',
    href: '#',
  },
  {
    id: 'demo-3',
    category: 'Naval History',
    headline: 'Our History, Preserved for the Next Generation',
    excerpt: 'How the Naval Institute Archives keep firsthand accounts of naval history accessible.',
    author: 'Naval History Staff',
    date: 'May 2026',
    image: imgOurHistory,
    imageAlt: 'Our History feature image',
    href: '#',
  },
]

const demoArticle = articles[0]

/* Real entries from the Blue & Gold bibliography, so the two states of the
   collection card can be shown side by side as they actually occur. */
const demoSeries = seriesBySlug('blue-and-gold')
const demoTitleLinked = demoSeries?.titles.find((t) => t.href)
const demoTitleUnlinked = demoSeries?.titles.find((t) => !t.href)

const demoPlainCard = {
  headline: 'Become a Member',
  body: 'Join the U.S. Naval Institute and support an independent forum for those who dare to think seriously about sea power.',
  cta: 'Join Today',
  href: '#',
}

/* One annual society (has a destination, so the card is a link) and one
   corporate programme (no destination, so the card is static) — the two states
   GivingPromoCards renders, as they occur on the live pages. */
const promoLinked = givingSubPages.annual.promos[0]
const promoStatic = givingSubPages.corporate.promos[0]

const corporateContact = givingSubPages.corporate.contact

/** Inline code, matching the sheet's other inline references. */
function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px] bg-neutral-subtlest px-1.5 py-0.5 [overflow-wrap:anywhere]">{children}</code>
}

/** Sheet prose — one width and size for every intro paragraph. */
function Lead({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

export default function Cards() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Cards">
          <p>
            The content-surfacing patterns used across USNI.org: four article teasers sized for a news
            grid, the bordered linked card that does most of the site&rsquo;s wayfinding, the cover cards
            for books and magazine issues, the pale contact panel for a page&rsquo;s right rail, and the ad
            placement block that reserves space in the same grids.
          </p>
          <p>
            Every card has hard corners and a <C>navy-subtle</C> hairline where it has a frame at all.
            Most pages in the prototype hand-build their cards; where they do, the canonical version is
            documented here and the copies are listed beneath it so the Drupal build ends up with one
            template per card.
          </p>
        </DocPageHeader>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Linked cards: the hover convention">
          <div className="flex flex-col gap-8">
            <Lead>
              When a card leads somewhere, <strong className="text-navy-bolder">the whole card is the link</strong>.
              One <C>&lt;a&gt;</C> wraps it and carries <C>group</C>. On hover, three things hold still and
              one moves. The border stays the same color, the headline stays dark with no underline, and
              the image does not zoom. The shadow lifts (<C>hover:shadow-md transition-shadow</C>), and the
              stylized link at the foot (<C>CardCta</C>) sweeps its underline in from the left and nudges its
              arrow. Moving two things on one hover, such as a headline underline plus the CTA or an image
              zoom plus the CTA, is what this rule replaced.
            </Lead>
            <Lead>
              A card with no destination uses the same frame without <C>group</C>, the shadow, or a CTA, so
              nothing on it suggests it can be clicked. The stylized link itself is documented on{' '}
              <Link to="/design-system/buttons" className="text-link">Buttons &amp; CTAs</Link>; inside a card it
              renders as a <C>&lt;span&gt;</C>, because an anchor there would nest inside the card&rsquo;s.
            </Lead>

            <LiveMarkup label="Text-only linked card (About the Press wayfinding)" previewClassName="pt-8 bg-white">
              <BooksAboutLinks />
            </LiveMarkup>

            <LiveMarkup label="With a banner image: linked (left) and static (right)" previewClassName="p-0 bg-white">
              <GivingPromoCards promos={[promoLinked, promoStatic]} />
            </LiveMarkup>

            <LiveMarkup label="With an icon tile and eyebrow (Giving quick links, on navy)" previewClassName="p-0 bg-white" defaultOpen={false}>
              <GivingQuickLinks />
            </LiveMarkup>

            <ClassTable
              rows={[
                {
                  part: 'Card (linked)',
                  classes: 'group flex flex-col gap-3 bg-white border border-navy-subtle p-6 lg:p-7 h-full hover:shadow-md transition-shadow',
                  note: (
                    <>
                      The <C>&lt;a&gt;</C>. <C>group</C> lets the CTA respond to a hover anywhere on the card.{' '}
                      <C>h-full</C> makes cards in a grid row match heights. Padding is 24px, rising to 28px
                      at <C>lg</C>. The border is not given a hover color, so it holds.
                    </>
                  ),
                },
                {
                  part: 'Card (image variant)',
                  classes: 'group flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow',
                  note: 'GivingPromoCards. No padding on the shell, because the image runs edge to edge. The body below carries the padding.',
                },
                {
                  part: 'Card (static)',
                  classes: 'flex flex-col bg-white border border-navy-subtle h-full',
                  note: 'A <div>. Same frame, no group, no shadow, no CTA. Used when the live block has no button (the corporate programmes).',
                },
                {
                  part: 'Banner image',
                  classes: 'aspect-[3/1] overflow-hidden bg-neutral-subtlest  ›  img: w-full h-full object-cover',
                  note: 'The source art is a 1200×400 banner, so the box matches 3:1 and nothing is cropped. No zoom on hover.',
                },
                {
                  part: 'Body (image variant)',
                  classes: 'flex flex-col gap-3 p-6 lg:p-7 flex-1',
                  note: 'flex-1 fills the card, so the CTA sits at the bottom of every card in a row.',
                },
                {
                  part: 'Headline',
                  classes: 'font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]',
                  note: 'Static. No article-link class and no hover color.',
                },
                {
                  part: 'Summary',
                  classes: 'font-body text-[15px] text-neutral-bold leading-[1.65] flex-1',
                  note: 'flex-1 pushes the CTA row down when the summaries in a row differ in length.',
                },
                {
                  part: 'CTA row',
                  classes: 'pt-1  ›  CardCta (span): inline-flex items-center gap-2 font-body font-bold text-sm text-[#0466c8]',
                  note: (
                    <>
                      The underline is an absolutely positioned span:{' '}
                      <C>absolute bottom-0 left-0 right-0 h-[1.5px] bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out</C>.
                      The arrow is <C>fa-solid text-xs transition-transform duration-200 fa-arrow-right group-hover:translate-x-1</C>.
                      Use <C>fa-arrow-down group-hover:translate-y-1</C> when the card jumps to an anchor on the same page.
                    </>
                  ),
                },
                {
                  part: 'Icon tile',
                  classes: 'w-12 h-12 bg-[#EBF4FF] flex items-center justify-center text-[#0466c8] flex-shrink-0',
                  note: 'GivingQuickLinks only. The card there is p-8 flex flex-col gap-5, and the CTA wrapper is mt-auto.',
                },
                {
                  part: 'Eyebrow (icon variant)',
                  classes: 'font-body font-medium text-xs uppercase tracking-[0.08em] text-[#0466c8]',
                },
              ]}
            />

            <DevNote title="Tokens">
              <p>
                <C>#0466c8</C> / <C>#0466C8</C> is <C>navy-bright</C>, so use <C>text-navy-bright</C>.{' '}
                <C>#EBF4FF</C> (the icon tile) has no token. It is the light-blue band color used across
                the site. <C>navy-subtle</C>, <C>navy-bolder</C>, <C>neutral-bold</C> and{' '}
                <C>neutral-subtlest</C> are tokens. <C>shadow-md</C> is Tailwind&rsquo;s default.
              </p>
            </DevNote>

            <DevNote>
              <p>
                Build one card template with an optional image and an optional icon. Its fields are{' '}
                <C>{'{{ url }}'}</C>, <C>{'{{ title }}'}</C>, <C>{'{{ summary }}'}</C>, <C>{'{{ cta_label }}'}</C>, and
                an optional <C>{'{{ image }}'}</C> (a 3:1 image style) or <C>{'{{ eyebrow }}'}</C> + icon class. When{' '}
                <C>url</C> is empty, render the static <C>&lt;div&gt;</C> shell and drop the CTA. When the URL
                starts with <C>#</C>, swap the arrow for <C>fa-arrow-down</C>.
              </p>
              <p>
                Never put a second link or a button inside the card. The CTA is a <C>&lt;span&gt;</C> on
                purpose. Because the anchor wraps block content, a screen reader announces the whole card
                as the link name, so keep summaries to a sentence or two. The prototype has no focus style
                on these anchors and relies on the browser outline. Add a <C>focus-visible</C> ring (for
                example <C>focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy-bright</C>)
                so keyboard users get the same signal the hover gives. For an external destination, use the
                external CTA (new-tab glyph plus a visually hidden &ldquo;opens in a new tab&rdquo;) and add{' '}
                <C>target="_blank" rel="noopener noreferrer"</C> on the card anchor.
              </p>
              <p>No JavaScript.</p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/CardCta.tsx', note: 'the stylized link and the docblock that states the convention' },
                { path: 'src/sections/BooksAboutLinks.tsx', note: 'text-only linked card' },
                { path: 'src/sections/GivingPromoCards.tsx', note: 'image variant, with both the linked and the static state' },
              ]}
            />
            <SourceList
              title="Follow the convention, but repeated by hand"
              tone="drift"
              items={[
                { path: 'src/sections/GivingQuickLinks.tsx', note: 'icon-tile variant. p-8 gap-5, text-xl headline, text-sm neutral-subtle summary.' },
                { path: 'src/sections/NavalHistoryFeaturedContent.tsx', note: 'a line-for-line copy of GivingQuickLinks’ card' },
                { path: 'src/sections/ReadingListsOther.tsx', note: 'eyebrow plus external CardCta. p-6 gap-2, text-[20px] headline.' },
                { path: 'src/components/cards/CollectionTeaserCard.tsx', note: 'follows the convention (documented below)' },
                { path: 'src/sections/TaylorCenterSpaces.tsx', note: 'static card. Headline text-xl, summary text-sm neutral-subtle, instead of 22/26px and 15px neutral-bold.' },
              ]}
            />
            <SourceList
              title="Break the convention"
              tone="drift"
              items={[
                { path: 'src/sections/UpcomingEvents.tsx', note: 'EventCard is an <article> whose headline link is stretched over the card (after:absolute after:inset-0) instead of a wrapping <a>. It hand-builds the CardCta row, and its image zooms on hover (group-hover:scale-[1.04]), so two things move.' },
                { path: 'src/sections/PastEventsArchive.tsx', note: 'EventCard uses the same stretched link, but the headline sweeps its own underline (link-underline-hover), the image zooms, and there is no CTA.' },
                { path: 'src/sections/EssayContestsCurrentGrid.tsx', note: 'ContestCard wraps correctly but sweeps the headline (article-link--card) and zooms the image (group-hover:scale-105) instead of carrying a CardCta. Its p-5 padding is tighter than the canonical card.' },
                { path: 'src/sections/EssayContestsArchive.tsx', note: 'TeaserCard has hover:shadow-md but is not a link. Only the headline <a> inside it is, so the shadow promises a click the card does not deliver.' },
                { path: 'src/sections/ReadingListsPressLibraries.tsx', note: 'a navy button-styled <span> where the CardCta should be' },
                { path: 'src/sections/AboutQuickLinks.tsx', note: 'not a linked card at all. It is a PlainCard with a 3:2 photo and a full-width navy button, so only the button is clickable.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Large Feature">
          <div className="flex flex-col gap-8">
            <Lead>
              The largest article teaser, with image, category, headline, excerpt, and date. Use it for the
              lead story in a section, such as the top item in Latest News or Naval History. Article teasers
              are not whole-card links. The image and the headline each link, the image zooms, and the
              headline underline sweeps. That is the article-listing treatment, separate from the linked
              cards above.
            </Lead>
            <LiveMarkup label="In a 3-column grid">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {articles.map((article) => (
                  <LargeFeature key={article.id} article={article} />
                ))}
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Card', classes: 'flex flex-col gap-4', note: 'An <article>. Takes extra classes from the caller.' },
                { part: 'Image link', classes: 'block overflow-hidden aspect-[4/3] bg-neutral-subtlest flex-shrink-0', note: 'overflow-hidden clips the zoom. The ground shows while the image loads.' },
                { part: 'Image', classes: 'w-full h-full object-cover hover:scale-105 transition-transform duration-300', note: 'Hover is on the image itself, not the card.' },
                { part: 'Text stack', classes: 'flex flex-col gap-3' },
                { part: 'Category', classes: 'font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]', note: '#0466C8 = navy-bright.' },
                { part: 'Headline', classes: 'font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1]  ›  a: article-link hover:text-navy-subtle', note: '24px, 30px at lg. .article-link sweeps a 1px navy-bright underline in on hover.' },
                { part: 'Excerpt', classes: 'font-body text-sm text-neutral-subtle leading-relaxed line-clamp-3', note: 'Clamped to three lines, so a long dek cannot unbalance a row.' },
                { part: 'Date', classes: 'font-body text-xs text-neutral-subtle' },
              ]}
            />
            <DevNote>
              <p>
                A view mode on the Article node (&ldquo;Teaser — large&rdquo;). Fields: <C>{'{{ url }}'}</C>,{' '}
                <C>{'{{ image }}'}</C> (4:3 image style, alt from the media field), <C>{'{{ category }}'}</C>{' '}
                (the section/department term), <C>{'{{ title }}'}</C>, <C>{'{{ summary }}'}</C>, and{' '}
                <C>{'{{ date }}'}</C>.
              </p>
              <p>
                The image link repeats the headline link. Give it <C>tabindex="-1"</C> and{' '}
                <C>aria-hidden="true"</C> so keyboard and screen-reader users meet one link per teaser. The
                prototype does not do this yet.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/cards/LargeFeature.tsx' }]} />
            <CodeBlock code={`import LargeFeature from '@/components/cards/LargeFeature'

<LargeFeature article={article} />`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Small Feature">
          <div className="flex flex-col gap-8">
            <Lead>
              A compact article teaser, typically used for secondary items in a news grid. The image can be
              hidden with <C>showImage=false</C> to fit a dense text-only list, and the image aspect ratio
              can be overridden per placement.
            </Lead>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <LiveMarkup label="Default (with image)">
                <SmallFeature article={demoArticle} />
              </LiveMarkup>
              <LiveMarkup label="showImage=false">
                <SmallFeature article={demoArticle} showImage={false} />
              </LiveMarkup>
              <LiveMarkup label="showExcerpt">
                <SmallFeature article={demoArticle} showExcerpt />
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                { part: 'Card', classes: 'flex flex-col gap-3' },
                { part: 'Image link', classes: 'block overflow-hidden aspect-[4/3] bg-neutral-subtlest flex-shrink-0', note: 'aspect-[4/3] is the default. Callers pass another aspect class, such as aspect-[16/9].' },
                { part: 'Image', classes: 'w-full h-full object-cover hover:scale-105 transition-transform duration-300' },
                { part: 'Text stack', classes: 'flex flex-col gap-2' },
                { part: 'Category', classes: 'font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]', note: 'Omitted when the record has none.' },
                { part: 'Headline', classes: 'font-headline text-[20px] text-[#1d2535] leading-[1.2]  ›  a: article-link hover:text-navy-subtle', note: '#1d2535 = text-primary (neutral-bolder), unlike Large Feature’s navy-bolder.' },
                { part: 'Meta line', classes: 'font-body text-[16px] text-neutral-subtle', note: '“{date} | by {author}”. The author part drops when empty.' },
                { part: 'Excerpt (opt-in)', classes: 'font-body text-[15px] text-neutral-bold leading-[1.55]' },
              ]}
            />
            <DevNote>
              <p>
                The same view mode as Large Feature, with two settings: show the image (yes/no) and show the
                excerpt (yes/no), plus an image style per placement for the aspect ratio. Fields:{' '}
                <C>{'{{ url }}'}</C>, <C>{'{{ image }}'}</C>, <C>{'{{ category }}'}</C>, <C>{'{{ title }}'}</C>,{' '}
                <C>{'{{ date }}'}</C>, <C>{'{{ author }}'}</C>, <C>{'{{ summary }}'}</C>. Make the image link{' '}
                <C>aria-hidden</C> as for Large Feature.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/cards/SmallFeature.tsx' }]} />
            <SourceList
              title="Drift: hand-built small teasers"
              tone="drift"
              items={[
                { path: 'src/sections/ProceedingsIssueArticles.tsx', note: 'GridArticleCard. 16:10 image. Eyebrow is font-semibold text-xs tracking-widest text-navy-subtle instead of the blue 14px category. Headline is text-lg lg:text-xl navy-bolder, plus an author line and an unclamped excerpt.' },
                { path: 'src/sections/NavalHistoryIssueArticles.tsx', note: 'an identical copy of the Proceedings file (only the data import differs)' },
                { path: 'src/sections/ArticleRelated.tsx', note: 'RelatedArticleCard. Same differences as GridArticleCard, with a text-xs “date | by author” line.' },
              ]}
            />
            <CodeBlock code={`import SmallFeature from '@/components/cards/SmallFeature'

<SmallFeature article={article} />
<SmallFeature article={article} showImage={false} />
<SmallFeature article={article} showExcerpt />
<SmallFeature article={article} aspectRatio="aspect-[16/9]" />`} />
            <PropsTable
              rows={[
                { name: 'article', type: 'Article', description: 'Required. category, headline, date, author, image, href.' },
                { name: 'showImage', type: 'boolean', default: 'true', description: 'Hides the thumbnail entirely when false.' },
                { name: 'aspectRatio', type: 'string', default: "'aspect-[4/3]'", description: 'Tailwind aspect-ratio class applied to the image container.' },
                { name: 'showExcerpt', type: 'boolean', default: 'false', description: "Adds the article's dek under the date line. Opt-in, because most records already carry an excerpt for other layouts." },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="XSmall Feature">
          <div className="flex flex-col gap-8">
            <Lead>
              A horizontal list row, with text on the left and a small square thumbnail on the right. Used
              for dense &ldquo;more from this section&rdquo; lists. The rows carry their own vertical
              padding, and the list wrapper adds the rules between them.
            </Lead>
            <div className="max-w-md">
              <LiveMarkup label="Three rows in a divided list">
                <div className="divide-y divide-border-light">
                  {articles.map((article) => (
                    <XSmallFeature key={article.id} article={article} />
                  ))}
                </div>
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                { part: 'List wrapper', classes: 'divide-y divide-border-light', note: 'Belongs to the placement, not the row. Shown here as LatestNews uses it.' },
                { part: 'Row', classes: 'flex items-start gap-3 py-4' },
                { part: 'Text column', classes: 'flex flex-col gap-1.5 flex-1 min-w-0', note: 'min-w-0 lets a long headline wrap instead of pushing the thumbnail out.' },
                { part: 'Category', classes: 'font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]' },
                { part: 'Headline', classes: 'font-headline text-[20px] text-[#1d2535] leading-[1.2]  ›  a: article-link hover:text-navy-subtle', note: 'An <h4>. These rows sit under a section’s h3 items.' },
                { part: 'Date', classes: 'font-body text-[16px] text-neutral-subtle' },
                { part: 'Thumbnail link', classes: 'flex-shrink-0 w-20 h-20 overflow-hidden bg-neutral-subtlest  ›  img: w-full h-full object-cover', note: '80×80 and no zoom. It is too small for the motion to read.' },
              ]}
            />
            <DevNote>
              <p>
                A third Article view mode (&ldquo;Teaser — row&rdquo;), with a square 160×160 image style
                for 2× displays. Fields as for Small Feature, minus the author. Hide the duplicate thumbnail
                link from assistive tech as above.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/cards/XSmallFeature.tsx' }]} />
            <CodeBlock code={`import XSmallFeature from '@/components/cards/XSmallFeature'

<XSmallFeature article={article} />`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Plain Card">
          <div className="flex flex-col gap-8">
            <Lead>
              A bordered content card with a headline, body copy, and a full-width navy CTA button. Use it
              for non-article content like membership tiers and promotional blocks, where the button
              is the only target. If the whole card should be clickable, use the linked card above
              instead.
            </Lead>
            <div className="max-w-sm">
              <LiveMarkup>
                <PlainCard {...demoPlainCard} />
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                { part: 'Card', classes: 'flex flex-col border border-navy-subtle bg-white p-6 lg:p-7', note: 'A <div>. It does not respond to hover.' },
                { part: 'Headline', classes: 'font-headline text-2xl text-navy-bolder leading-[1.1] mb-4' },
                { part: 'Body', classes: 'font-body text-sm text-neutral-subtle leading-relaxed mb-8 flex-1', note: 'flex-1 aligns the buttons across a row of unequal cards.' },
                {
                  part: 'Button',
                  classes: 'inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors duration-150 w-full',
                  note: 'The label is followed by a literal “→” character, not an icon. Hover goes navy-bolder to navy-bright.',
                },
              ]}
            />
            <DevNote>
              <p>
                Fields: <C>{'{{ title }}'}</C>, <C>{'{{ body }}'}</C>, <C>{'{{ cta_label }}'}</C>,{' '}
                <C>{'{{ cta_url }}'}</C>, which fits a Link field. If the arrow is kept as a character, wrap it in{' '}
                <C>&lt;span aria-hidden="true"&gt;</C> so it is not read aloud. No JavaScript.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/cards/PlainCard.tsx', note: 'used by NavalInstituteAtWork and GivingSocieties' }]} />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/AboutQuickLinks.tsx', note: 'an inline copy of PlainCard with a 3:2 photo added above the headline. See the linked-card note above. This grid is better built as linked cards with an image.' },
              ]}
            />
            <CodeBlock code={`import PlainCard from '@/components/cards/PlainCard'

<PlainCard
  headline="Become a Member"
  body="Join the U.S. Naval Institute..."
  cta="Join Today"
  href="/membership/join"
/>`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Collection Title Card (book cover card)">
          <div className="flex flex-col gap-8">
            <Lead>
              One title in a Books &amp; Press collection bibliography, used on the series pages and the
              military reading lists. Two states. A title with a product page is a link with a hover lift
              and a price. A title the Press lists but no longer sells renders as a reference entry: the
              USNI mark framed as a book plate, no lift, and its availability where the price would be.
              The frame owns the 2:3 shape and the cover is absolutely positioned inside it, so every
              cover in a row scales alike and crops from the center.
            </Lead>
            <Lead>
              Cover cards are the one exception to the linked-card rule. They have no frame, so there is
              no shadow to raise. Instead the cover lifts 8px, its shadow deepens, and the title&rsquo;s
              underline sweeps (<C>article-link--card</C>). Books and magazine issues share this hover.
              The price block is <C>BookPrice</C>, documented on{' '}
              <Link to="/design-system/commerce" className="text-link">Commerce &amp; Checkout</Link>.
            </Lead>
            <div className="max-w-xl">
              <LiveMarkup label="Available and unavailable, as they appear together in a grid" previewClassName="p-6 pt-12 bg-white">
                <div className="grid grid-cols-2 gap-x-6 gap-y-10">
                  {demoTitleLinked && <CollectionTitleCard title={demoTitleLinked} />}
                  {demoTitleUnlinked && <CollectionTitleCard title={demoTitleUnlinked} />}
                </div>
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                { part: 'Card (linked)', classes: 'group flex flex-col gap-3', note: 'An <a> to the product page. No frame or padding.' },
                { part: 'Card (unavailable)', classes: 'flex flex-col gap-3', note: 'A <div>, with no group, so nothing lifts.' },
                { part: 'Cover frame', classes: 'relative aspect-[2/3] transition-transform duration-300 group-hover:-translate-y-2', note: 'The transition classes are only present in the linked state. The frame moves, not the image, so the plate state could lift too if it ever needed to.' },
                {
                  part: 'Cover image',
                  classes: 'absolute inset-0 w-full h-full object-cover object-center shadow-[0_2px_8px_rgba(0,18,51,0.14)] transition-shadow duration-300 group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]',
                  note: 'Absolute, so a cover whose own ratio is taller than 2:3 cannot stretch its row. The shadow is hand-rolled from navy-boldest (rgb 0,18,51) with no spread. shadow-md/xl pinch at the corners of a tall cover. There is no shadow token.',
                },
                { part: 'Book plate', classes: 'absolute inset-0 bg-tan-subtle border-[6px] border-white flex items-center justify-center  ›  img: w-[58%] h-auto', note: 'usni-icon-gold.svg on tan-subtle in a white mat. aria-hidden.' },
                { part: 'Text stack', classes: 'flex flex-col gap-1' },
                { part: 'Title', classes: 'font-headline text-[19px] leading-snug text-navy-bolder  ›  span: article-link article-link--card', note: 'The span is present only when linked. --card sweeps on a hover anywhere in the group, and clones per line so a wrapped title underlines every line.' },
                { part: 'Subtitle', classes: 'font-body text-[13px] text-neutral-subtle leading-snug' },
                { part: 'Byline', classes: 'font-body text-[13px] text-neutral-bold leading-snug mt-0.5' },
                { part: 'Format + price', classes: 'mt-2 flex flex-col gap-1.5  ›  format: font-body text-[13px] text-neutral-subtle leading-none', note: 'Then BookPrice (see Commerce).' },
                { part: 'Availability', classes: 'font-body text-[12px] italic text-neutral-subtle leading-snug mt-1.5', note: 'Unavailable state only, e.g. “Not available to order online”.' },
              ]}
            />
            <DevNote>
              <p>
                A Book node view mode. Fields: <C>{'{{ url }}'}</C> (empty means the unavailable state),{' '}
                <C>{'{{ cover }}'}</C> (2:3 image style; fall back to the plate when empty),{' '}
                <C>{'{{ title }}'}</C>, <C>{'{{ subtitle }}'}</C>, <C>{'{{ byline }}'}</C>,{' '}
                <C>{'{{ format }}'}</C>, the BookPrice block, and <C>{'{{ availability }}'}</C>.
              </p>
              <p>
                The grid that holds these needs ~28px of top padding, or a scrolling parent will clip the
                lifted cover and its shadow (see the note in <C>BooksProductSection.tsx</C>). The cover&rsquo;s alt
                text is the title, which repeats the visible title. Inside a link, <C>alt=""</C> is the
                better choice so the link name is read once. No JavaScript.
              </p>
            </DevNote>
            <SourceList
              title="Canonical"
              items={[{ path: 'src/components/cards/CollectionTitleCard.tsx', note: 'used by CollectionTitlesGrid and ReadingListSection' }]}
            />
            <SourceList
              title="Drift: other book cover cards"
              tone="drift"
              items={[
                { path: 'src/sections/BooksProductSection.tsx', note: 'BookCard. Carousel widths (3 / 4 / 6 across). The image fills the aspect box directly rather than sitting absolute. 20px title, BookPrice size="sm".' },
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'BookGridCard. 20px title with line-clamp-3, plus text-xs author and format lines.' },
                { path: 'src/sections/FromThePress.tsx', note: 'CarouselCard. Lifts the image but has no resting shadow and no deepened shadow, and no title underline. The prices are hand-set spans instead of BookPrice: the list price is not struck through and the member price is unlabeled.' },
                { path: 'src/sections/PmeIntro.tsx', note: 'cover only. The lift is -translate-y-1.5 instead of -translate-y-2.' },
              ]}
            />
            <CodeBlock code={`import CollectionTitleCard from '@/components/cards/CollectionTitleCard'

<CollectionTitleCard title={title} />`} />
            <PropsTable
              rows={[
                {
                  name: 'title',
                  type: 'CollectionTitle',
                  description:
                    'Entry from a collection in src/data/bookCollections.ts. Omitting href selects the unavailable state; availability then supplies the note shown in place of the price.',
                },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Issue Cover Card">
          <div className="flex flex-col gap-8">
            <Lead>
              A magazine cover linking to its issue, used by the Proceedings and Naval History
              &ldquo;All Issues&rdquo; archives. Same hover as the book cover card: the cover lifts and
              its shadow deepens while a blue underline sweeps both lines of the caption. The aspect box is
              set per magazine because the scanned covers differ, so <C>object-cover</C> never has to
              crop.
            </Lead>
            <div className="max-w-xl">
              <LiveMarkup label="Proceedings (aspect-[534/728]) and Naval History (aspect-[2400/3175])" previewClassName="p-6 pt-12 bg-white">
                <div className="grid grid-cols-2 gap-x-6 lg:gap-x-8">
                  <IssueCoverCard
                    href="#"
                    cover={imgProceedingsAug26}
                    alt="Proceedings August 2026 cover"
                    title="Proceedings – August 2026"
                    subtitle="Vol. 152/8/1,482"
                    aspect="aspect-[534/728]"
                  />
                  <IssueCoverCard
                    href="#"
                    cover={imgNavalHistoryAug26}
                    alt="Naval History August 2026 cover"
                    title="Naval History – August 2026"
                    subtitle="Volume 40, Number 4"
                    aspect="aspect-[2400/3175]"
                  />
                </div>
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                { part: 'Card', classes: 'group flex flex-col', note: 'An <a> to the issue page.' },
                { part: 'Aspect box', classes: 'aspect-[2400/3175] bg-neutral-subtlest', note: 'The default is the Naval History ratio. Proceedings passes aspect-[534/728]. No overflow-hidden: the cover lifts out of the box and the shadow falls outside it.' },
                {
                  part: 'Cover',
                  classes: 'w-full h-full object-cover transition-[transform,box-shadow] duration-300 shadow-[0_2px_8px_rgba(0,18,51,0.14)] group-hover:-translate-y-2 group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]',
                  note: 'loading="lazy". The same lift and shadow values as the book cards.',
                },
                {
                  part: 'Caption',
                  classes: 'font-body font-bold text-[17px] lg:text-[18px] text-navy-bolder leading-snug mt-4  ›  span ×2: article-link article-link--card',
                  note: 'Two spans separated by a <br>, one per line, so each line gets its own underline.',
                },
              ]}
            />
            <DevNote>
              <p>
                A view mode on the magazine Issue node. Fields: <C>{'{{ url }}'}</C>, <C>{'{{ cover }}'}</C>,{' '}
                <C>{'{{ title }}'}</C> (&ldquo;Proceedings – August 2026&rdquo;), <C>{'{{ volume }}'}</C>.
                Put the aspect class on the magazine (a per-bundle setting or image style) rather than per
                issue. The archive grid is <C>grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-10 lg:gap-y-12</C>.
                Its year/month filters and pager are on{' '}
                <Link to="/design-system/lists" className="text-link">Lists, Tables &amp; Pagination</Link>.
              </p>
            </DevNote>
            <SourceList
              title="Canonical"
              items={[{ path: 'src/components/ui/IssueCoverCard.tsx', note: 'used by ProceedingsAllIssuesGrid and NavalHistoryAllIssuesGrid' }]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/ProceedingsIssueArchive.tsx', note: 'the “recent issues” strip. Its cover zooms inside a clipped box (overflow-hidden, group-hover:scale-105) instead of lifting, and the caption is a text-xl/2xl headline month plus a text-sm volume line with no underline.' },
                { path: 'src/sections/NavalHistoryIssueArchive.tsx', note: 'the same strip, copied' },
              ]}
            />
            <PropsTable
              rows={[
                { name: 'href', type: 'string', description: 'Issue page.' },
                { name: 'cover', type: 'string', description: 'Cover image URL.' },
                { name: 'alt', type: 'string', description: 'Cover alt text.' },
                { name: 'title', type: 'string', description: 'First caption line.' },
                { name: 'subtitle', type: 'string', description: 'Second caption line (volume / number).' },
                { name: 'aspect', type: 'string', default: "'aspect-[2400/3175]'", description: 'Tailwind aspect class matching the magazine’s scans.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Collection Teaser Card">
          <div className="flex flex-col gap-8">
            <Lead>
              Teaser for a whole collection, used on the Professional Military Education hub and in the
              cross-links at the foot of every series page. On hover it follows the linked-card rule: the
              border holds, the shadow raises, and the CTA underline sweeps in. The headline stays dark
              and static, and only the stylized link animates. These pages have no photography of their
              own, so the card leads with three real covers from the series, bottom-aligned on a
              fixed-height shelf so every card&rsquo;s title lands on the same baseline across a grid.
              Nothing on the card states a count, because series grow and titles go out of print, and a
              number is a claim someone has to maintain. A series with no covers yet falls back to its own
              hero photograph, full-bleed in the shelf, and failing that to a quiet &ldquo;New
              series&rdquo; label.
            </Lead>
            <div className="max-w-sm">
              <LiveMarkup label="Shelf of covers">
                {demoSeries && (
                  <CollectionTeaserCard collection={demoSeries} href={seriesHref(demoSeries.slug)} />
                )}
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                { part: 'Card', classes: 'group flex flex-col bg-white border border-navy-subtle hover:shadow-md transition-shadow', note: 'The linked-card shell.' },
                { part: 'Shelf (covers)', classes: 'h-[172px] px-6 pt-9 flex items-end justify-center bg-light-blue  ›  flex items-end', note: 'A fixed 172px in all three states, so titles align across a grid. light-blue separates the shelf from the body without a rule.' },
                {
                  part: 'Shelf cover',
                  classes: 'w-[90px] aspect-[2/3] object-cover shadow-[0_2px_10px_rgba(0,18,51,0.18)]',
                  note: 'Overlap and stacking are inline styles: margin-left: -22px on every cover after the first, and z-index equal to its index. In Twig, use -ml-[22px] on non-first covers and z-0/z-[1]/z-[2] (flex items honor z-index). alt="" and aria-hidden, since the covers are decoration.',
                },
                { part: 'Shelf (photo fallback)', classes: 'h-[172px] overflow-hidden bg-navy-boldest  ›  img: w-full h-full object-cover', note: 'object-position comes from the series hero’s focal point (inline style).' },
                { part: 'Shelf (empty)', classes: 'h-[172px] flex items-center justify-center bg-light-blue  ›  span: font-body text-[11px] uppercase tracking-[0.14em] text-navy-subtler', note: '“New series”.' },
                { part: 'Body', classes: 'flex flex-col gap-2 p-6 flex-1' },
                { part: 'Name', classes: 'font-headline text-[21px] leading-[1.2] text-navy-bolder', note: 'Static.' },
                { part: 'Summary', classes: 'font-body text-sm text-neutral-subtle leading-[1.6] flex-1' },
                { part: 'CTA', classes: 'CardCta with mt-3', note: '“Explore this series”.' },
              ]}
            />
            <DevNote>
              <p>
                A view mode on the collection (series) term or node. Fields: <C>{'{{ url }}'}</C>,{' '}
                <C>{'{{ name }}'}</C>, <C>{'{{ summary }}'}</C>, the first three purchasable titles&rsquo;
                covers, which a Views relationship or preprocess can supply, and the hero image as the fallback. No
                JavaScript. The same accessibility notes as the linked card apply.
              </p>
            </DevNote>
            <SourceList
              title="Canonical"
              items={[{ path: 'src/components/cards/CollectionTeaserCard.tsx', note: 'used by PmeCollectionsGrid and CollectionCrossLinks' }]}
            />
            <CodeBlock code={`import CollectionTeaserCard from '@/components/cards/CollectionTeaserCard'
import { seriesHref } from '@/data/bookCollections'

<CollectionTeaserCard collection={collection} href={seriesHref(collection.slug)} />`} />
            <PropsTable
              rows={[
                {
                  name: 'collection',
                  type: 'BookCollection',
                  description:
                    'The collection to tease. Cover art is pulled from its first three purchasable titles.',
                },
                {
                  name: 'href',
                  type: 'string',
                  description: 'Where the card links. Use seriesHref(slug) for a series page.',
                },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Contact Card">
          <div className="flex flex-col gap-8">
            <Lead>
              The pale contact panel that sits in an interior page&rsquo;s right-hand rail, with a label,
              a name, and who to write to. It is used beside a book series introduction (&ldquo;Series
              Editor&rdquo;, &ldquo;Series Contact&rdquo;) and on Corporate Partners. It is not a link, so
              only the email and phone respond to hover.
            </Lead>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {marineCorpsHistory.editor && (
                <LiveMarkup label="Series Editor (role)">
                  <ContactCard
                    label="Series Editor"
                    name={marineCorpsHistory.editor.name}
                    role={marineCorpsHistory.editor.role}
                    inquiriesLabel="Send inquiries and proposals to:"
                    email={marineCorpsHistory.editor.email}
                  />
                </LiveMarkup>
              )}
              {blueAndGold.contact && (
                <LiveMarkup label="Series Contact (note)">
                  <ContactCard
                    label="Series Contact"
                    name={blueAndGold.contact.name}
                    note={blueAndGold.contact.note}
                    email={blueAndGold.contact.email}
                  />
                </LiveMarkup>
              )}
              {corporateContact && (
                <LiveMarkup label="Email and phone">
                  <ContactCard
                    label="Contact"
                    name={corporateContact.name}
                    role={corporateContact.role}
                    email={corporateContact.email}
                    phone={corporateContact.phone}
                  />
                </LiveMarkup>
              )}
            </div>
            <ClassTable
              rows={[
                { part: 'Panel', classes: 'bg-surface-subtle border border-navy-subtle p-6 lg:p-7 flex flex-col gap-4', note: 'A <div>. surface-subtle (#EEF2FF) ground, navy-subtle frame matching the white cards on the same pages.' },
                { part: 'Label', classes: 'font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle', note: 'A <p>, not a heading. It names the block for sighted readers.' },
                { part: 'Name group', classes: 'flex flex-col gap-1.5' },
                { part: 'Name', classes: 'font-headline text-[24px] text-navy-bolder leading-[1.15]', note: 'An <h3>.' },
                { part: 'Role', classes: 'font-body font-semibold text-[13px] text-navy-subtle leading-snug', note: 'Optional job title.' },
                { part: 'Note', classes: 'font-body text-sm text-neutral-subtle leading-[1.65]', note: 'Optional prose line, used where the record has no title.' },
                { part: 'Children slot', classes: '—', note: 'Anything between name and footer. CollectionIntro puts the editor’s bio here.' },
                { part: 'Footer', classes: 'border-t border-light-blue pt-4 mt-1', note: 'Present only when there is an email or phone. The light-blue rule separates rather than frames.' },
                { part: 'Footer label', classes: 'font-body font-bold text-sm text-navy-bolder mb-2', note: '“Send inquiries to:” by default.' },
                { part: 'Link list', classes: 'flex flex-col items-start gap-1', note: 'items-start shrinks each link to its text. Otherwise the hover underline runs to the panel edge.' },
                {
                  part: 'Email / phone',
                  classes: 'font-body text-sm text-[#0466C8] hover:text-navy-bolder transition-colors break-words link-underline-hover',
                  note: 'The phone link omits break-words. Its href strips everything but digits and “+” (tel:4102951041). #0466C8 = navy-bright.',
                },
              ]}
            />
            <DevNote>
              <p>
                Fields: <C>{'{{ label }}'}</C>, <C>{'{{ name }}'}</C>, <C>{'{{ role }}'}</C> or{' '}
                <C>{'{{ note }}'}</C>, optional <C>{'{{ bio }}'}</C>, <C>{'{{ inquiries_label }}'}</C>,{' '}
                <C>{'{{ email }}'}</C>, <C>{'{{ phone }}'}</C>. On a series it comes from the series&rsquo;
                editor or contact fields. On Corporate Partners it is a block or paragraph. Mark the rail
                as <C>&lt;aside&gt;</C>, as the prototype does. No JavaScript.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/ui/ContactCard.tsx', note: 'used by CollectionIntro and GivingSubPage' }]} />
            <SourceList
              title="Drift: same panel, hand-built"
              tone="drift"
              items={[
                { path: 'src/sections/TaylorCenterAbout.tsx', note: '“At a glance”. The identical shell and label, with a <dl> of facts (dt font-bold text-[13px] uppercase, dd text-sm) in place of the name and contact footer. Build it as the same panel template with a facts slot.' },
              ]}
            />
            <PropsTable
              rows={[
                { name: 'label', type: 'string', description: 'Eyebrow naming the block, e.g. “Series Editor”.' },
                { name: 'name', type: 'string', description: 'Required.' },
                { name: 'role', type: 'string', description: 'Job title, under the name.' },
                { name: 'note', type: 'string', description: 'A sentence under the name, where the record carries prose instead.' },
                { name: 'children', type: 'ReactNode', description: 'Anything between the name and the contact footer.' },
                { name: 'inquiriesLabel', type: 'string', default: "'Send inquiries to:'", description: 'Footer label.' },
                { name: 'email / phone', type: 'string', description: 'Either one shows the footer.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Ad Unit">
          <div className="flex flex-col gap-8">
            <Lead>
              A placeholder block that reserves ad space within the same content grids as the cards above.{' '}
              <C>leaderboard</C> (728×90) goes between page sections and <C>rectangle</C> (300×250) goes
              inline within article content. Swap the inner markup for real ad-network tags at build time.
            </Lead>
            <LiveMarkup label="Leaderboard" previewClassName="p-4 bg-white">
              <AdUnit size="leaderboard" />
            </LiveMarkup>
            <LiveMarkup label="Rectangle" previewClassName="p-4 bg-white">
              <AdUnit size="rectangle" />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'w-full flex flex-col items-center py-6 lg:py-8', note: 'Leaderboard. Rectangle uses py-4.' },
                { part: 'Label', classes: 'font-body text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-subtle/60 mb-1.5 self-center', note: '“Advertisement”. Keep it with the real ad, because disclosure is expected.' },
                { part: 'Slot', classes: 'bg-neutral-subtlest border border-neutral-subtle/20 flex items-center justify-center w-full h-[90px] max-w-[728px]', note: 'Rectangle: h-[250px] max-w-[300px]. The fixed height reserves space so the page does not shift when the ad loads.' },
                { part: 'Size label', classes: 'font-body text-xs text-neutral-subtle/40 select-none', note: 'Placeholder only. Remove it with the real tag.' },
              ]}
            />
            <DevNote>
              <p>
                Make it a block with a size setting. Replace the slot&rsquo;s contents with the ad-network
                (e.g. GPT) div, keeping the fixed height so layout does not shift. The ad library needs
                its own JavaScript and consent handling. The label and wrapper stay as they are.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/ui/AdUnit.tsx' }]} />
            <CodeBlock code={`import AdUnit from '@/components/ui/AdUnit'

<AdUnit size="leaderboard" />
<AdUnit size="rectangle" />`} />
          </div>
        </DocSection>

        <DocLabel>Related</DocLabel>
        <p className="font-body text-sm text-neutral-subtle">
          Book prices: <Link to="/design-system/commerce" className="text-link">Commerce &amp; Checkout</Link>.
          Account panels (<C>AccountCard</C>): <Link to="/design-system/account" className="text-link">Account</Link>.
          The stylized link: <Link to="/design-system/buttons" className="text-link">Buttons &amp; CTAs</Link>.
        </p>
      </div>
    </DesignSystemLayout>
  )
}
