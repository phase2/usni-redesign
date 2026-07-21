import SmallFeature from '@/components/cards/SmallFeature'
import { latestIssueCol1, latestIssueCol2 } from '@/data/naval-history'
import magazineCoverUrl from '@/assets/images/naval-history-magazine-april26.png'

export default function NavalHistoryLatestIssue() {
  return (
    <section className="bg-white py-10 lg:py-20">
      <div className="container-site">
        <h2 className="font-headline text-4xl lg:text-[56px] text-navy-bolder text-center leading-[1.1] mb-8">
          Latest Issue
        </h2>

        {/* Mobile: cover on top, articles single column below */}
        <div className="lg:hidden flex flex-col gap-6">
          <div>
            <div className="aspect-[350/478] bg-neutral-subtlest overflow-hidden mb-4">
              <img
                src={magazineCoverUrl}
                alt="Naval History Magazine — Mar/Apr 2026"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href="/naval-history/mar-apr-2026"
              className="flex items-center justify-center gap-2 bg-navy-bold text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bold hover:bg-navy-bright hover:border-navy-bright transition-colors w-full"
            >
              View the full issue
            </a>
          </div>
          <div className="flex flex-col gap-5">
            {[...latestIssueCol1, ...latestIssueCol2].map((article, i) => (
              <div key={article.id}>
                {i > 0 && <div className="h-px bg-border-light mb-5" />}
                <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: cover sidebar + two article columns */}
        <div className="hidden lg:flex gap-8 items-start">
          <div className="flex-none w-[350px] sticky top-[96px] pt-8">
            <div className="aspect-[350/478] bg-neutral-subtlest overflow-hidden mb-6">
              <img
                src={magazineCoverUrl}
                alt="Naval History Magazine — Mar/Apr 2026"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href="/naval-history/mar-apr-2026"
              className="flex items-center justify-center gap-2 bg-navy-bold text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bold hover:bg-navy-bright hover:border-navy-bright transition-colors w-full"
            >
              View the full issue
            </a>
          </div>

          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <div className="flex gap-8 items-start pt-8">
              <div className="w-px bg-border-light self-stretch flex-none" />
              <div className="flex-1 min-w-0 flex flex-col gap-5">
                {latestIssueCol1.map((article, i) => (
                  <div key={article.id}>
                    {i > 0 && <div className="h-px bg-border-light mb-5" />}
                    <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
                  </div>
                ))}
              </div>
              <div className="w-px bg-border-light self-stretch flex-none" />
              <div className="flex-1 min-w-0 flex flex-col gap-5">
                {latestIssueCol2.map((article, i) => (
                  <div key={article.id}>
                    {i > 0 && <div className="h-px bg-border-light mb-5" />}
                    <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
