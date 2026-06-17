import coverImage from '@/assets/images/proceedings-magazine-april-cover.png'

export default function ProceedingsIssueHero() {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}>
      <div className="container-site py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-16">

          {/* Content column */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Breadcrumb */}
            <div className="pb-4 border-b border-[#C2DDFF]">
              <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body font-bold text-sm lg:text-base text-white">
                <a href="/" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <i className="fa-solid fa-house text-[10px]" aria-hidden="true" />
                  Home
                </a>
                <span className="text-white/40">/</span>
                <a href="/proceedings" className="hover:text-white/80 transition-colors">Proceedings</a>
                <span className="text-white/40">/</span>
                <span className="font-normal italic text-[#f4f4f6]">April 2026 Issue</span>
              </nav>
            </div>

            {/* Title */}
            <h1 className="font-headline text-[32px] lg:text-[56px] xl:text-[64px] text-white leading-[1.1]">
              Proceedings:<br />April 2026
            </h1>

            {/* Volume */}
            <p className="font-body font-bold text-[18px] lg:text-[24px] text-[#f4f4f6] leading-[1.4]">
              Volume 152/4/1,478
            </p>

            {/* CTA */}
            <div className="pt-1">
              <a
                href="/proceedings/archive"
                className="flex lg:inline-flex items-center justify-center bg-gold text-navy-bolder font-body font-bold text-base tracking-[-0.5px] px-5 py-4 hover:bg-gold-dark transition-colors"
              >
                See the Proceedings Archive
              </a>
            </div>
          </div>

          {/* Cover — stacks below on mobile, right column on desktop */}
          <div className="w-full max-w-[220px] lg:max-w-none lg:w-[280px] xl:w-[316px] lg:flex-shrink-0 lg:self-center">
            <img
              src={coverImage}
              alt="Proceedings April 2026 Cover"
              className="w-full shadow-2xl"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
