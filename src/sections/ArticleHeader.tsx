interface ArticleHeaderProps {
  publication?: string
  breadcrumbs?: { label: string; href?: string }[]
  title: string
  deck: string
  date: string
  magazineName?: string
  author: string
  commentCount?: number
}

function AdFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F4F4F6] p-2 border border-[#C4C9D4]">
      {children}
    </div>
  )
}

export default function ArticleHeader({
  breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Proceedings', href: '/proceedings' },
    { label: 'April 2026', href: '/proceedings/apr-2026' },
    { label: "Three MEFs Won't Be Enough" },
  ],
  title = "Three MEFs Won't Be Enough",
  deck = "The Marine Corps' current three-MEF structure cannot meet simultaneous crises across competing theaters — a fourth expeditionary force is no longer optional.",
  date = 'April 2026',
  magazineName = 'Proceedings Magazine',
  author = 'Corporal Richard Sweeney III, U.S. Marine Corps Reserve',
  commentCount = 0,
}: ArticleHeaderProps) {
  return (
    <section style={{ background: 'linear-gradient(to bottom, #EBF4FF 0%, #FFF 100%)' }}>

      {/* Leaderboard ad band */}
      <div className="flex justify-center py-4 border-b border-border-light overflow-x-auto">
        <AdFrame>
          <div
            className="bg-[#DDE1E7] flex flex-col items-center justify-center gap-1"
            style={{ width: 728, height: 90 }}
          >
            <span className="font-body text-xs font-semibold text-neutral-subtle uppercase tracking-wider">Advertisement</span>
            <span className="font-body text-[11px] text-neutral-subtle/60">Leaderboard · 728 × 90</span>
          </div>
        </AdFrame>
      </div>

      <div className="container-site">

        {/* Breadcrumb — light blue bottom border */}
        <nav
          aria-label="breadcrumb"
          className="flex items-center flex-wrap gap-x-2 gap-y-1 pt-8 pb-6 border-b border-[#C2DDFF]"
        >
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-neutral-subtle/40 text-sm">/</span>}
              {crumb.href ? (
                <a
                  href={crumb.href}
                  className="font-body font-bold text-sm text-navy-bolder hover:text-navy-subtle transition-colors"
                >
                  {crumb.label}
                </a>
              ) : (
                <span className="font-body text-sm text-neutral-subtle truncate max-w-[320px]">
                  {crumb.label}
                </span>
              )}
            </span>
          ))}
        </nav>

        {/* Narrow article hero — 864px centered */}
        <div className="max-w-[864px] mx-auto pt-8 pb-10">

          {/* Title */}
          <h1 className="font-headline text-[48px] lg:text-[60px] xl:text-[68px] text-navy-bolder leading-[1.05] mb-6">
            {title}
          </h1>

          {/* Deck — headline treatment, subtle gray */}
          <p className="font-headline text-[28px] lg:text-[32px] text-neutral-subtle leading-[1.35] mb-8">
            {deck}
          </p>

          {/* Date/Author + right-aligned buttons */}
          <div className="flex items-end justify-between gap-6">

            <div>
              {/* Date + Publication */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="font-body font-bold text-sm text-navy-bolder">{date}</span>
                {magazineName && (
                  <>
                    <span
                      className="inline-block flex-shrink-0 bg-navy-bolder"
                      style={{ width: 7, height: 7 }}
                      aria-hidden="true"
                    />
                    <span className="font-body font-bold text-sm text-navy-bolder">{magazineName}</span>
                  </>
                )}
              </div>
              {/* Author */}
              <p className="font-body text-sm text-navy-bolder">
                By {author}
              </p>
            </div>

            {/* Buttons — outline blue, right-aligned */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <button
                type="button"
                className="inline-flex items-center gap-2 border border-navy-bolder text-navy-bolder font-body font-bold text-sm px-5 py-3 hover:bg-[#EBF4FF] transition-colors"
              >
                Share
                <i className="fa-solid fa-arrow-up-from-bracket text-xs" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 border border-navy-bolder text-navy-bolder font-body font-bold text-sm px-5 py-3 hover:bg-[#EBF4FF] transition-colors"
              >
                Comments{commentCount > 0 ? ` (${commentCount})` : ''}
                <i className="fa-regular fa-comment text-xs" aria-hidden="true" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}
