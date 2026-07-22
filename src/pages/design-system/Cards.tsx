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
          <CodeBlock code={`import SmallFeature from '@/components/cards/SmallFeature'

<SmallFeature article={article} />
<SmallFeature article={article} showImage={false} />
<SmallFeature article={article} aspectRatio="aspect-[16/9]" />`} />
          <div className="mt-6">
            <PropsTable
              rows={[
                { name: 'article', type: 'Article', description: 'Required. category, headline, date, author, image, href.' },
                { name: 'showImage', type: 'boolean', default: 'true', description: 'Hides the thumbnail entirely when false.' },
                { name: 'aspectRatio', type: 'string', default: "'aspect-[4/3]'", description: 'Tailwind aspect-ratio class applied to the image container.' },
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
