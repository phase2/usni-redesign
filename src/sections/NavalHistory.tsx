import SmallFeature from '@/components/cards/SmallFeature'
import ButtonLinkCTA from '@/components/ui/ButtonLinkCTA'
import { navalHistoryArticles, navalHistoryCoverImage } from '@/data/homepage'

export default function NavalHistory() {
  const col1Articles = navalHistoryArticles.slice(0, 2)
  const col2Articles = navalHistoryArticles.slice(2, 4)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-site">

        {/* ── Section header ── */}
        <div className="border-t-2 border-navy-bold pt-8 flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-12">
          <div className="flex-1">
            <p className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-2">
              April 2026 Edition
            </p>
            <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-tight">
              Naval History
            </h2>
          </div>
          <div className="flex-1 mt-6 lg:mt-0 flex flex-col gap-5 justify-start">
            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              Bringing maritime conflict and seafaring tradition to life through rigorously researched
              narrative, rare photography, and the voices of those who were there. From ancient sea
              battles to the Cold War beneath the waves, each issue illuminates the events, commanders,
              and vessels that forged the world's greatest naval powers.
            </p>
            <ButtonLinkCTA href="/naval-history">
              Explore Naval History
            </ButtonLinkCTA>
          </div>
        </div>

        {/* ── 3-column grid: col1 | col2 | cover (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_260px] xl:grid-cols-[1fr_1fr_290px] gap-8">

          {/* Left column — 2 stacked articles */}
          <div className="flex flex-col gap-8">
            {col1Articles.map((article) => (
              <SmallFeature
                key={article.id}
                article={article}
                showImage={true}
                aspectRatio="aspect-[16/10]"
              />
            ))}
          </div>

          {/* Middle column — 2 stacked articles */}
          <div className="flex flex-col gap-8 border-t lg:border-t-0 pt-8 lg:pt-0">
            {col2Articles.map((article) => (
              <SmallFeature
                key={article.id}
                article={article}
                showImage={true}
                aspectRatio="aspect-[16/10]"
              />
            ))}
          </div>

          {/* Right — magazine cover + action buttons */}
          <div className="flex flex-col gap-4 border-t lg:border-t-0 pt-8 lg:pt-0">
            <a href="/naval-history" className="block overflow-hidden bg-neutral-subtlest">
              <img
                src={navalHistoryCoverImage}
                alt="Naval History Magazine — Current Issue"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </a>
            <a
              href="/naval-history"
              className="flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm py-4 px-5 w-full hover:bg-navy transition-colors"
            >
              Read the latest edition
            </a>
            <a
              href="/naval-history/all-issues"
              className="flex items-center justify-center bg-transparent text-navy-bolder border border-navy-bolder font-body font-bold text-sm py-4 px-5 w-full hover:bg-navy-bolder hover:text-white transition-colors"
            >
              Browse the full archive
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
