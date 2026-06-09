import SmallFeature from '@/components/cards/SmallFeature'
import { latestIssueCol1, latestIssueCol2 } from '@/data/proceedings'
import magazineCoverUrl from '@/assets/images/proceedings-magazine-april-cover.png'

export default function ProceedingsLatestIssue() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-site">
        {/* Section heading */}
        <h2 className="font-headline text-5xl lg:text-[56px] text-navy-bolder text-center leading-tight mb-8">
          Latest Issue
        </h2>

        <div className="flex gap-8 items-start">
          {/* Magazine cover sidebar */}
          <div className="flex-none w-[350px] sticky top-[96px] pt-8">
            <div className="aspect-[350/478] bg-neutral-subtlest overflow-hidden mb-6">
              <img
                src={magazineCoverUrl}
                alt="Proceedings Magazine — April 2026"
                className="w-full h-full object-cover"
              />
            </div>
            <a
              href="/proceedings/current"
              className="flex items-center justify-center gap-2 bg-navy-bold text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bold hover:bg-navy transition-colors w-full"
            >
              View the full issue
            </a>
          </div>

          {/* Article grid */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <div className="flex gap-8 items-start pt-8">
              {/* Left separator */}
              <div className="w-px bg-border-light self-stretch flex-none" />

              {/* Column 1 */}
              <div className="flex-1 min-w-0 flex flex-col gap-5">
                {latestIssueCol1.map((article, i) => (
                  <div key={article.id}>
                    {i > 0 && <div className="h-px bg-border-light mb-5" />}
                    <SmallFeature article={article} showImage aspectRatio="aspect-[16/9]" />
                  </div>
                ))}
              </div>

              {/* Center separator */}
              <div className="w-px bg-border-light self-stretch flex-none" />

              {/* Column 2 */}
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
