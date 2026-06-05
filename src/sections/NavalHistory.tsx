import SectionHeader from '@/components/ui/SectionHeader'
import SmallFeature from '@/components/cards/SmallFeature'
import { navalHistoryArticles } from '@/data/homepage'

const magazineCoverUrl = 'https://picsum.photos/seed/naval-history-mag/400/560'

export default function NavalHistory() {
  const col1Articles = navalHistoryArticles.slice(0, 2)
  const col2Articles = navalHistoryArticles.slice(2, 4)

  return (
    <section className="bg-neutral-subtlest py-16 lg:py-20">
      <div className="container-site">
        <SectionHeader
          eyebrow="Preserving the Story of Sea Power"
          headline="Naval History"
          description="Naval History magazine brings the remarkable stories of the U.S. Navy's past to life for a new generation of naval professionals and history enthusiasts."
          ctaLabel="Explore Naval History"
          ctaHref="/naval-history"
          className="mb-10"
        />

        {/* Articles first on mobile, magazine right on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr_1px_auto] gap-0 items-start">
          {/* Left articles */}
          <div className="divide-y divide-border-light">
            {col1Articles.map((article) => (
              <div key={article.id} className="py-6 first:pt-0">
                <SmallFeature article={article} showImage={true} />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border-light mx-8" />

          {/* Middle articles */}
          <div className="divide-y divide-border-light border-t lg:border-t-0 border-border-light">
            {col2Articles.map((article) => (
              <div key={article.id} className="py-6 first:pt-0 lg:first:pt-0">
                <SmallFeature article={article} showImage={true} />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border-light mx-8" />

          {/* Right: magazine cover + CTAs */}
          <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0 pt-8 lg:pt-0 border-t lg:border-t-0 border-border-light">
            <div className="aspect-[3/4] bg-neutral-subtlest overflow-hidden mb-6">
              <img
                src={magazineCoverUrl}
                alt="Naval History Magazine — Current Issue"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/naval-history/current"
                className="flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm py-3.5 px-5 w-full hover:bg-navy transition-colors"
              >
                Read Current Issue
              </a>
              <a
                href="/membership"
                className="flex items-center justify-center bg-transparent text-navy-bolder border border-navy-bolder font-body font-bold text-sm py-3.5 px-5 w-full hover:bg-navy-bolder hover:text-white transition-colors"
              >
                Subscribe / Join
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
