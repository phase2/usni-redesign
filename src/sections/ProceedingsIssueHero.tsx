import coverImage from '@/assets/images/proceedings-magazine-april-cover.png'

export default function ProceedingsIssueHero() {
  return (
    <section
      className="relative z-20"
      style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}
    >
      <div className="container-site pt-10 pb-0 lg:pt-14">
        <div className="flex items-start gap-10 xl:gap-16">

          {/* Left: issue info */}
          <div className="flex-1 pb-10 lg:pb-14">
            <nav className="flex items-center gap-2 mb-8 font-body text-sm text-white/55">
              <a href="/" className="hover:text-white transition-colors">Home</a>
              <span>/</span>
              <a href="/publications" className="hover:text-white transition-colors">Publications</a>
              <span>/</span>
              <a href="/proceedings" className="hover:text-white transition-colors">Proceedings</a>
              <span>/</span>
              <span className="text-white/80">April 2026 Issue</span>
            </nav>

            <h1 className="font-headline text-5xl lg:text-[64px] text-white leading-[0.95] mb-4">
              April 2026
            </h1>
            <p className="font-body text-base text-white/60 mb-10 tracking-wide">
              Vol. 152/4/1,478
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="/proceedings/apr-2026/digital"
                className="inline-flex items-center gap-2 bg-gold text-navy-boldest font-body font-bold text-sm tracking-[-0.2px] px-6 py-3.5 hover:brightness-95 transition-all"
              >
                Access Digital Edition (PDF)
              </a>
              <a
                href="/proceedings/archive"
                className="inline-flex items-center gap-2 border border-white/70 text-white font-body font-bold text-sm tracking-[-0.2px] px-6 py-3.5 hover:bg-white/10 transition-colors"
              >
                See the Proceedings Archive
              </a>
            </div>
          </div>

          {/* Right: cover anchored to top, extends below hero via negative margin */}
          <div className="hidden lg:block flex-shrink-0 w-[300px] xl:w-[340px] -mb-32 xl:-mb-40">
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
