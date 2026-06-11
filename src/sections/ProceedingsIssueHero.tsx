import coverImage from '@/assets/images/proceedings-magazine-april-cover.png'

export default function ProceedingsIssueHero() {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}>
      <div className="container-site py-12 lg:py-16">
        <div className="flex items-start gap-10 xl:gap-16">

          {/* Left column */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Breadcrumb + divider */}
            <div className="pb-4 border-b border-[#33415c]">
              <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body font-bold text-base text-white">
                <a href="/" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
                  <i className="fa-solid fa-house text-[10px]" aria-hidden="true" />
                  Home
                </a>
                <span className="text-white/40">/</span>
                <a href="/publications" className="hover:text-white/80 transition-colors">Publications</a>
                <span className="text-white/40">/</span>
                <a href="/proceedings" className="hover:text-white/80 transition-colors">Proceedings</a>
                <span className="text-white/40">/</span>
                <span className="font-normal italic text-[#f4f4f6]">April 2026 Issue</span>
              </nav>
            </div>

            {/* Title */}
            <h1 className="font-headline text-[56px] lg:text-[64px] text-white leading-[1.1]">
              Proceedings:<br />April 2026
            </h1>

            {/* Volume */}
            <p className="font-body font-bold text-[24px] text-[#f4f4f6] leading-[1.4]">
              Volume 152/4/1,478
            </p>

            {/* CTA */}
            <div className="pt-2">
              <a
                href="/proceedings/archive"
                className="inline-flex items-center justify-center bg-gold text-navy-bolder font-body font-bold text-base tracking-[-0.5px] px-5 py-4 hover:bg-gold-dark transition-colors"
              >
                See the Proceedings Archive
              </a>
            </div>
          </div>

          {/* Right: cover */}
          <div className="hidden lg:block flex-shrink-0 w-[280px] xl:w-[316px] self-center">
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
