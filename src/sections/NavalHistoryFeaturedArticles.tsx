import SmallFeature from '@/components/cards/SmallFeature'
import LargeFeature from '@/components/cards/LargeFeature'
import { featuredArticlesLeft, featuredArticleCenter, featuredArticlesRight } from '@/data/naval-history'

export default function NavalHistoryFeaturedArticles() {
  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="container-site">

        {/* Mobile layout: large feature first, then small features */}
        <div className="lg:hidden flex flex-col gap-8">
          <LargeFeature article={featuredArticleCenter} />
          <div className="h-px bg-border-light" />
          <div className="flex flex-col gap-5">
            {featuredArticlesLeft.map((article, i) => (
              <div key={article.id}>
                {i > 0 && <div className="h-px bg-border-light mb-5" />}
                <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
              </div>
            ))}
          </div>
          <div className="h-px bg-border-light" />
          <div className="flex flex-col gap-5">
            {featuredArticlesRight.map((article, i) => (
              <div key={article.id}>
                {i > 0 && <div className="h-px bg-border-light mb-5" />}
                <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop layout: three-column */}
        <div className="hidden lg:flex gap-8 items-start">
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {featuredArticlesLeft.map((article, i) => (
              <div key={article.id}>
                {i > 0 && <div className="h-px bg-border-light mb-5" />}
                <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
              </div>
            ))}
          </div>
          <div className="w-px bg-border-light self-stretch flex-none" />
          <div className="flex-none" style={{ width: '640px' }}>
            <LargeFeature article={featuredArticleCenter} />
          </div>
          <div className="w-px bg-border-light self-stretch flex-none" />
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            {featuredArticlesRight.map((article, i) => (
              <div key={article.id}>
                {i > 0 && <div className="h-px bg-border-light mb-5" />}
                <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
