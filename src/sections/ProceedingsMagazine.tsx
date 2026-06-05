import SmallFeature from '@/components/cards/SmallFeature'
import ButtonLinkCTA from '@/components/ui/ButtonLinkCTA'
import { proceedingsArticles, proceedingsCoverImage } from '@/data/homepage'

export default function ProceedingsMagazine() {
  const col1Articles = proceedingsArticles.slice(0, 2)
  const col2Articles = proceedingsArticles.slice(2, 4)

  return (
    <section className="section-gradient py-16 lg:py-20">
      <div className="container-site">

        {/* ── Section header ── */}
        <div className="border-t-2 border-navy-bold pt-8 flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-12">
          <div className="flex-1">
            <p className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-2">
              April 2026 Edition
            </p>
            <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-tight">
              Proceedings Magazine
            </h2>
          </div>
          <div className="flex-1 mt-6 lg:mt-0 flex flex-col gap-5 justify-start">
            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              Our flagship publication since 1874, Proceedings is the independent forum where military
              professionals, scholars, and strategists debate the most consequential issues facing
              naval and maritime defense. Every issue delivers peer-reviewed analysis, firsthand
              perspective, and bold argument.
            </p>
            <ButtonLinkCTA href="/proceedings">
              Explore Proceedings Magazine
            </ButtonLinkCTA>
          </div>
        </div>

        {/* ── 3-column grid: cover | col1 | col2 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_1fr] xl:grid-cols-[290px_1fr_1fr] gap-8">

          {/* Left — magazine cover + action buttons */}
          <div className="flex flex-col gap-4">
            <a href="/proceedings" className="block overflow-hidden bg-neutral-subtlest">
              <img
                src={proceedingsCoverImage}
                alt="Proceedings Magazine — Current Issue"
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </a>
            <a
              href="/proceedings"
              className="flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm py-4 px-5 w-full hover:bg-navy transition-colors"
            >
              Read the latest edition
            </a>
            <a
              href="/proceedings/all-issues"
              className="flex items-center justify-center bg-transparent text-navy-bolder border border-navy-bolder font-body font-bold text-sm py-4 px-5 w-full hover:bg-navy-bolder hover:text-white transition-colors"
            >
              Browse the full archive
            </a>
          </div>

          {/* Middle column — 2 stacked articles */}
          <div className="flex flex-col gap-8 border-t lg:border-t-0 pt-8 lg:pt-0">
            {col1Articles.map((article) => (
              <SmallFeature
                key={article.id}
                article={article}
                showImage={true}
                aspectRatio="aspect-[16/10]"
              />
            ))}
          </div>

          {/* Right column — 2 stacked articles */}
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
        </div>
      </div>
    </section>
  )
}
