import { useState } from 'react'
import type { Article } from '@/types'
import { latestIssueCol1, latestIssueCol2 } from '@/data/proceedings'

const articles = [...latestIssueCol1, ...latestIssueCol2]

type ViewMode = 'grid' | 'list'

function DocIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.333 1.333H4a1.333 1.333 0 0 0-1.333 1.334v10.666A1.333 1.333 0 0 0 4 14.667h8a1.333 1.333 0 0 0 1.333-1.334V5.333L9.333 1.333z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.333 1.333v4h4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function GridArticleCard({ article }: { article: Article }) {
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
        <a href={article.href}>
          <h3 className="font-headline text-lg lg:text-xl text-navy-bolder leading-tight hover:text-navy-subtle transition-colors">
            {article.headline}
          </h3>
        </a>
        <p className="font-body text-xs text-neutral-subtle">
          {article.date}{article.author ? ` | by ${article.author}` : ''}
        </p>
      </div>
    </article>
  )
}

function ListArticleRow({ article }: { article: Article }) {
  return (
    <article className="flex gap-6 py-7 border-b border-border-light last:border-b-0">
      {article.image && (
        <a href={article.href} className="flex-shrink-0 w-[200px] aspect-[4/3] overflow-hidden bg-neutral-subtlest block">
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      )}
      <div className="flex flex-col gap-2 min-w-0 justify-center">
        <p className="font-body font-semibold text-xs uppercase tracking-widest text-navy-subtle">
          {article.category}
        </p>
        <a href={article.href}>
          <h3 className="font-headline text-xl lg:text-2xl text-navy-bolder leading-tight hover:text-navy-subtle transition-colors">
            {article.headline}
          </h3>
        </a>
        <p className="font-body text-sm text-neutral-subtle">
          {article.date}{article.author ? ` | by ${article.author}` : ''}
        </p>
      </div>
    </article>
  )
}

export default function ProceedingsIssueArticles() {
  const [view, setView] = useState<ViewMode>('grid')

  return (
    /* z-10 ensures the hero (z-20) paints over this section where the cover overhangs */
    <section className="relative z-10 bg-white pt-14 pb-16 lg:pb-20">
      <div className="container-site">
        <div className="flex gap-10 xl:gap-16 items-start">

          {/* Main articles column */}
          <div className="flex-1 min-w-0">
            {/* Toggle bar */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-border-light">
              <span className="font-body text-sm text-neutral-subtle">
                {articles.length} articles · April 2026
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
              <div className="grid grid-cols-2 gap-x-8 gap-y-12">
                {articles.map((article) => (
                  <GridArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}

            {view === 'list' && (
              <div className="border-t border-border-light">
                {articles.map((article) => (
                  <ListArticleRow key={article.id} article={article} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — width matches the cover in the hero above.
              pt-24 clears the portion of the cover that hangs below the hero boundary.
              sticky top-32 keeps buttons visible while scrolling the article list. */}
          <div className="hidden lg:flex flex-col gap-3 w-[300px] xl:w-[340px] flex-shrink-0 pt-24 sticky top-32">
            <a
              href="/proceedings/apr-2026/pdf"
              className="flex items-center justify-center gap-2.5 bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3.5 hover:bg-navy transition-colors"
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download PDF
            </a>
            <a
              href="/proceedings/apr-2026/epub"
              className="flex items-center justify-center gap-2.5 border border-navy-bolder text-navy-bolder font-body font-bold text-sm px-4 py-3.5 hover:bg-surface-subtle transition-colors"
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              Access ePub
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}
