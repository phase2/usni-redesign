import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import PlainCard from '@/components/cards/PlainCard'
import SmallFeature from '@/components/cards/SmallFeature'
import LargeFeature from '@/components/cards/LargeFeature'
import XSmallFeature from '@/components/cards/XSmallFeature'
import AdUnit from '@/components/ui/AdUnit'
import CollectionTitleCard from '@/components/cards/CollectionTitleCard'
import CollectionTeaserCard from '@/components/cards/CollectionTeaserCard'
import { seriesBySlug, seriesHref } from '@/data/bookCollections'
import type { Article } from '@/types'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'
import img250YearCelebration from '@/assets/images/250-year-celebration.png'
import imgOurHistory from '@/assets/images/our-histroy-feature-image.png'

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

export default function Cards() {
  return (
    <DesignSystemLayout breadcrumb="Cards">
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle mb-3">
          Components
        </p>
        <h1 className="font-headline text-5xl text-navy-bolder leading-[1.1] mb-4">Cards</h1>
        <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-2xl">
          Four content-surfacing patterns cover every card size used across USNI.org, plus the ad placement
          block used to reserve space within the same grids.
        </p>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
        <DocSection title="Large Feature">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            The largest article teaser — image, category, headline, excerpt, and date. Used for the lead story
            in a section (e.g. the top item in Latest News or Naval History).
          </p>
          <DocLabel>In a 3-column grid</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.map((article) => (
                <LargeFeature key={article.id} article={article} />
              ))}
            </div>
          </div>
          <CodeBlock code={`import LargeFeature from '@/components/cards/LargeFeature'

<LargeFeature article={article} />`} />
        </DocSection>

        <DocSection title="Small Feature">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A compact article teaser, typically used for secondary items in a news grid. The image can be
            hidden with <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">showImage=false</code> to
            fit a dense text-only list, and the image aspect ratio can be overridden per placement.
          </p>
          <DocLabel>Default (with image)</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-xs">
            <SmallFeature article={demoArticle} />
          </div>
          <DocLabel>showImage=false</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-xs">
            <SmallFeature article={demoArticle} showImage={false} />
          </div>
          <DocLabel>showExcerpt</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-xs">
            <SmallFeature article={demoArticle} showExcerpt />
          </div>
          <CodeBlock code={`import SmallFeature from '@/components/cards/SmallFeature'

<SmallFeature article={article} />
<SmallFeature article={article} showImage={false} />
<SmallFeature article={article} showExcerpt />
<SmallFeature article={article} aspectRatio="aspect-[16/9]" />`} />
          <div className="mt-6">
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

        <DocSection title="XSmall Feature">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A horizontal list row — text on the left, a small square thumbnail on the right. Used for dense
            "more from this section" lists.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-md divide-y divide-border-light">
            {articles.map((article) => (
              <XSmallFeature key={article.id} article={article} />
            ))}
          </div>
          <CodeBlock code={`import XSmallFeature from '@/components/cards/XSmallFeature'

<XSmallFeature article={article} />`} />
        </DocSection>

        <DocSection title="Plain Card">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A bordered content card with a headline, body copy, and a full-width navy CTA button — used for
            non-article content like membership tiers and promotional blocks.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-sm">
            <PlainCard {...demoPlainCard} />
          </div>
          <CodeBlock code={`import PlainCard from '@/components/cards/PlainCard'

<PlainCard
  headline="Become a Member"
  body="Join the U.S. Naval Institute..."
  cta="Join Today"
  href="/membership/join"
/>`} />
        </DocSection>

        <DocSection title="Collection Title Card">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            One title in a Books &amp; Press collection bibliography — the series pages and the military
            reading lists. Two states: a title with a product page is a link with a hover lift and a
            price, and a title the Press lists but no longer sells renders as a reference entry — the
            USNI mark framed as a book plate, no lift, and its availability where the price would
            be. The frame owns the 2:3 shape and the cover is absolutely positioned inside it, so every
            cover in a row scales alike and crops from the centre.
          </p>
          <DocLabel>Available and unavailable, as they appear together in a grid</DocLabel>
          <div className="border border-border-light bg-white p-6 mb-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 max-w-md pt-7">
              {demoTitleLinked && <CollectionTitleCard title={demoTitleLinked} />}
              {demoTitleUnlinked && <CollectionTitleCard title={demoTitleUnlinked} />}
            </div>
          </div>
          <CodeBlock code={`import CollectionTitleCard from '@/components/cards/CollectionTitleCard'

<CollectionTitleCard title={title} />`} />
          <div className="mt-6">
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

        <DocSection title="Collection Teaser Card">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            Teaser for a whole collection, used on the Professional Military Education hub and in the
            cross-links at the foot of every series page. On hover it does what every linked card on the
            site does: the border holds, the shadow raises, and the CTA underline sweeps in. The
            headline stays dark and static — only the stylized link animates. These pages have no photography of their own,
            so the card leads with three real covers from the series, bottom-aligned on a fixed-height
            shelf so every card&rsquo;s title lands on the same baseline across a grid. Nothing on the card
            states a count — series grow and titles go out of print, and a number is a claim someone has
            to maintain. A series with no covers yet falls back to its own hero photograph full-bleed in
            the shelf, and failing that to a quiet “New series” label.
          </p>
          <div className="border border-border-light bg-white p-6 mb-6 max-w-sm">
            {demoSeries && (
              <CollectionTeaserCard collection={demoSeries} href={seriesHref(demoSeries.slug)} />
            )}
          </div>
          <CodeBlock code={`import CollectionTeaserCard from '@/components/cards/CollectionTeaserCard'
import { seriesHref } from '@/data/bookCollections'

<CollectionTeaserCard collection={collection} href={seriesHref(collection.slug)} />`} />
          <div className="mt-6">
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

        <DocSection title="Ad Unit">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A placeholder block that reserves ad space within the same content grids as the cards above —
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5 ml-1">leaderboard</code> (728×90)
            between page sections, <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">rectangle</code> (300×250)
            inline within article content. Swap the inner markup for real ad-network tags at build time.
          </p>
          <DocLabel>Leaderboard</DocLabel>
          <div className="border border-border-light bg-white p-4 mb-6">
            <AdUnit size="leaderboard" />
          </div>
          <DocLabel>Rectangle</DocLabel>
          <div className="border border-border-light bg-white p-4 mb-6">
            <AdUnit size="rectangle" />
          </div>
          <CodeBlock code={`import AdUnit from '@/components/ui/AdUnit'

<AdUnit size="leaderboard" />
<AdUnit size="rectangle" />`} />
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
