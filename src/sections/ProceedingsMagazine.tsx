import SectionHeader from '@/components/ui/SectionHeader'
import SmallFeature from '@/components/cards/SmallFeature'
import { proceedingsArticles } from '@/data/homepage'

const magazineCoverUrl = 'https://picsum.photos/seed/proceedings-mag/400/560'

export default function ProceedingsMagazine() {
  const col1Articles = proceedingsArticles.slice(0, 2)
  const col2Articles = proceedingsArticles.slice(2, 4)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-site">
        <SectionHeader
          eyebrow="Our Flagship Journal Since 1874"
          headline="Proceedings Magazine"
          description="The Proceedings is the U.S. Naval Institute's flagship monthly publication. It is the leading forum for the exchange of ideas on national defense and naval affairs. Read by senior leaders across the joint force."
          ctaLabel="Explore All Issues"
          ctaHref="/proceedings"
          className="mb-10"
        />

        {/* Magazine grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1px_1fr_1px_1fr] gap-0 items-start">
          {/* Left: magazine cover + CTAs */}
          <div className="lg:w-[280px] xl:w-[320px] flex-shrink-0 pb-8 lg:pb-0">
            <div className="aspect-[3/4] bg-neutral-subtlest overflow-hidden mb-6">
              <img
                src={magazineCoverUrl}
                alt="Proceedings Magazine — Current Issue"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="/proceedings/current"
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

          {/* Divider */}
          <div className="hidden lg:block bg-border-light mx-8" />

          {/* Middle articles */}
          <div className="divide-y divide-border-light border-t lg:border-t-0 border-border-light">
            {col1Articles.map((article) => (
              <div key={article.id} className="py-6 first:pt-0 lg:first:pt-0">
                <SmallFeature article={article} showImage={true} />
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="hidden lg:block bg-border-light mx-8" />

          {/* Right articles */}
          <div className="divide-y divide-border-light border-t lg:border-t-0 border-border-light">
            {col2Articles.map((article) => (
              <div key={article.id} className="py-6 first:pt-0 lg:first:pt-0">
                <SmallFeature article={article} showImage={true} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
