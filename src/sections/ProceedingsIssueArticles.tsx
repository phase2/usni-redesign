import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { Article } from '@/types'
import Pagination from '@/components/ui/Pagination'
import { aprilIssueArticles } from '@/data/proceedingsApril2026'

type ViewMode = 'grid' | 'list'

/** How a listing differs from the issue table of contents it was built for. */
interface CardOptions {
  /** Show each article's date in the grid too — for a list spanning many issues. */
  showDate?: boolean
  /** Clamp grid excerpts to four lines, for listings whose teasers run long. */
  clampExcerpts?: boolean
}

function GridArticleCard({ article, showDate, clampExcerpts }: { article: Article } & CardOptions) {
  return (
    <article className="flex flex-col gap-3">
      {article.image && (
        <a href={article.href} className="block overflow-hidden aspect-[16/10] bg-neutral-subtlest flex-shrink-0">
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-body font-semibold text-xs uppercase tracking-widest text-navy-subtle">
          {article.category}
        </p>
        <h3 className="font-headline text-lg lg:text-xl text-navy-bolder leading-[1.1]">
          <a href={article.href} className="article-link hover:text-navy-subtle">
            {article.headline}
          </a>
        </h3>
        {showDate && <p className="font-body text-sm text-neutral-subtle">{article.date}</p>}
        {article.author && (
          <p className="font-body text-sm font-semibold text-navy-bolder leading-snug">{article.author}</p>
        )}
        {article.excerpt && (
          <p className={`font-body text-sm text-neutral-subtle leading-[1.5] ${clampExcerpts ? 'line-clamp-4' : ''}`}>
            {article.excerpt}
          </p>
        )}
      </div>
    </article>
  )
}

function ListArticleRow({ article }: { article: Article }) {
  return (
    <article className="flex gap-6 items-start">
      {article.image && (
        <a href={article.href} className="flex-1 min-w-0 aspect-video overflow-hidden bg-neutral-subtlest block flex-shrink-0">
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      )}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <p className="font-body font-medium text-[14px] text-[#0466c8] uppercase tracking-[0.5px] leading-[1.5]">
          {article.category}
        </p>
        <h3 className="font-headline text-[24px] text-navy-bolder leading-[1.3]">
          <a href={article.href} className="article-link hover:text-navy-subtle">
            {article.headline}
          </a>
        </h3>
        <div className="flex flex-col gap-1.5">
          <p className="font-body text-sm text-neutral-subtle">{article.date}</p>
          {article.author && (
            <p className="font-body text-base font-semibold text-navy-bolder leading-snug">{article.author}</p>
          )}
          {article.excerpt && (
            <p className="font-body text-base font-normal text-neutral-subtle leading-[1.5] mt-0.5">{article.excerpt}</p>
          )}
        </div>
      </div>
    </article>
  )
}

/**
 * An article listing with a grid / list toggle. Built for an issue's table of
 * contents — by default the full April 2026 issue, all 34 items — and reused
 * for Sponsored Content, which spans many issues and so pages its results.
 */
export default function ProceedingsIssueArticles({
  articles = aprilIssueArticles,
  summary = `${aprilIssueArticles.length} articles · April 2026`,
  pageSize,
  paginationLabel = 'Articles pagination',
  showDate,
  clampExcerpts,
}: {
  articles?: Article[]
  /** The count line at the left of the toggle bar. */
  summary?: string
  /** Page the listing at this many per page, with the page kept in the URL (?page=). Omit to show all. */
  pageSize?: number
  paginationLabel?: string
} & CardOptions) {
  const [view, setView] = useState<ViewMode>('grid')
  const [params, setParams] = useSearchParams()
  const sectionRef = useRef<HTMLElement>(null)

  const totalPages = pageSize ? Math.max(1, Math.ceil(articles.length / pageSize)) : 1
  const page = Math.min(totalPages, Math.max(1, Math.floor(Number(params.get('page'))) || 1))
  const shown = pageSize ? articles.slice((page - 1) * pageSize, page * pageSize) : articles

  const goToPage = (n: number) => {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      if (n > 1) next.set('page', String(n))
      else next.delete('page')
      return next
    })
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="bg-white py-14 lg:py-20 scroll-mt-4">
      <div className="container-site">

        {/* Toggle bar */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-light">
          <span className="font-body text-sm text-neutral-subtle">
            {summary}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('grid')}
              className={`flex items-center gap-2 px-3 py-2 font-body font-semibold text-sm transition-colors
                ${view === 'grid'
                  ? 'bg-surface-subtle text-navy-bolder'
                  : 'text-neutral-subtle hover:text-navy-bolder hover:bg-surface-subtle'}`}
              aria-label="Grid view"
              aria-pressed={view === 'grid'}
            >
              <i className="fa-solid fa-grip" aria-hidden="true" />
              Grid
            </button>
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-3 py-2 font-body font-semibold text-sm transition-colors
                ${view === 'list'
                  ? 'bg-surface-subtle text-navy-bolder'
                  : 'text-neutral-subtle hover:text-navy-bolder hover:bg-surface-subtle'}`}
              aria-label="List view"
              aria-pressed={view === 'list'}
            >
              <i className="fa-solid fa-list" aria-hidden="true" />
              List
            </button>
          </div>
        </div>

        {view === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {shown.map((article) => (
              <GridArticleCard key={article.id} article={article} showDate={showDate} clampExcerpts={clampExcerpts} />
            ))}
          </div>
        )}

        {view === 'list' && (
          <div className="flex flex-col divide-y divide-[#c4c9d4]">
            {shown.map((article) => (
              <div key={article.id} className="py-5">
                <ListArticleRow article={article} />
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="pt-10">
            <Pagination label={paginationLabel} totalPages={totalPages} page={page} onChange={goToPage} />
          </div>
        )}

      </div>
    </section>
  )
}
