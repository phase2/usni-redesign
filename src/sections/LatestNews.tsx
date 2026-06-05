import SectionHeader from '@/components/ui/SectionHeader'
import SmallFeature from '@/components/cards/SmallFeature'
import LargeFeature from '@/components/cards/LargeFeature'
import XSmallFeature from '@/components/cards/XSmallFeature'
import { latestNewsArticles } from '@/data/homepage'

export default function LatestNews() {
  const leftColArticles = latestNewsArticles.slice(0, 2)
  const featuredArticle = latestNewsArticles[2]
  const mostPopular = latestNewsArticles.slice(3)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-site">
        <SectionHeader
          eyebrow="The Latest From Our Newsroom"
          headline="Latest Maritime News & Analysis"
          description="Stay current with breaking news, analysis, and photography from USNI News — the authoritative source for U.S. naval and maritime affairs."
          ctaLabel="All Latest News"
          ctaHref="/news"
          className="mb-10"
        />

        {/* News grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_2fr_1px_1fr] gap-0">
          {/* Left column: 2 small features */}
          <div className="flex flex-col gap-0 divide-y divide-border-light">
            {leftColArticles.map((article) => (
              <div key={article.id} className="py-6 first:pt-0">
                <SmallFeature article={article} showImage={true} />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border-light mx-6" />

          {/* Center: large feature */}
          <div className="py-6 lg:py-0 lg:px-8 border-t lg:border-t-0 border-border-light">
            <LargeFeature article={featuredArticle} />
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border-light mx-6" />

          {/* Right column: Most Popular */}
          <div className="py-6 lg:py-0 border-t lg:border-t-0 border-border-light">
            <div className="bg-surface-subtle px-4 py-3 mb-2">
              <p className="font-body font-bold text-sm text-navy-bolder">Most Popular</p>
            </div>
            <div className="divide-y divide-border-light">
              {mostPopular.map((article) => (
                <XSmallFeature key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
