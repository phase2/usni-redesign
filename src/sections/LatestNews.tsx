import SectionHeader from '@/components/ui/SectionHeader'
import SmallFeature from '@/components/cards/SmallFeature'
import LargeFeature from '@/components/cards/LargeFeature'
import { latestNewsArticles } from '@/data/homepage'

/**
 * The five latest USNI News stories: the lead story large in the center, two
 * smaller on each side. On a phone the lead comes first.
 */
export default function LatestNews() {
  const [featuredArticle, ...rest] = latestNewsArticles
  const leftColArticles = rest.slice(0, 2)
  const rightColArticles = rest.slice(2, 4)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-site">
        <SectionHeader
          eyebrow="The Latest From Our Newsroom"
          headline="Latest Maritime News & Analysis"
          description="Stay current with breaking news, analysis, and photography from USNI News — the authoritative source for U.S. naval and maritime affairs."
          ctaLabel="Visit USNI News"
          ctaHref="https://news.usni.org/"
          className="mb-10"
        />

        {/* News grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr_1fr] gap-0">
          {/* Left column: 2 small features */}
          <div className="flex flex-col gap-0 divide-y divide-border-light pt-6 lg:pt-0 lg:pr-8 border-t lg:border-t-0 lg:border-r border-border-light order-2 lg:order-none">
            {leftColArticles.map((article) => (
              <div key={article.id} className="py-6 first:pt-0">
                <SmallFeature article={article} showImage={true} aspectRatio="aspect-[16/9]" />
              </div>
            ))}
          </div>

          {/* Center: large feature */}
          <div className="pb-6 lg:pb-0 lg:px-8 lg:border-r border-border-light order-1 lg:order-none">
            <LargeFeature article={featuredArticle} />
          </div>

          {/* Right column: 2 small features, mirroring the left */}
          <div className="flex flex-col gap-0 divide-y divide-border-light border-t lg:border-t-0 border-border-light lg:pl-8 order-3 lg:order-none">
            {rightColArticles.map((article) => (
              <div key={article.id} className="py-6 lg:first:pt-0">
                <SmallFeature article={article} showImage={true} aspectRatio="aspect-[16/9]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
