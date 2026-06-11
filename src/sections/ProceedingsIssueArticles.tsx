import { useState } from 'react'
import type { Article } from '@/types'
import {
  featuredArticlesLeft,
  featuredArticleCenter,
  featuredArticlesRight,
  latestIssueCol1,
  latestIssueCol2,
} from '@/data/proceedings'

const articles: Article[] = [
  ...featuredArticlesLeft,
  featuredArticleCenter,
  ...featuredArticlesRight,
  ...latestIssueCol1,
  ...latestIssueCol2,
]

type ViewMode = 'grid' | 'list'

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
        {article.author && (
          <p className="font-body text-sm font-semibold text-navy-bolder leading-snug">{article.author}</p>
        )}
        {article.excerpt && (
          <p className="font-body text-sm text-neutral-subtle leading-[1.5]">{article.excerpt}</p>
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
        <a href={article.href}>
          <h3 className="font-headline text-[24px] text-navy-bolder leading-[1.3] hover:text-navy-subtle transition-colors">
            {article.headline}
          </h3>
        </a>
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

export default function ProceedingsIssueArticles() {
  const [view, setView] = useState<ViewMode>('grid')

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="container-site">

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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {articles.map((article) => (
              <GridArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {view === 'list' && (
          <div className="flex flex-col divide-y divide-[#c4c9d4]">
            {articles.map((article) => (
              <div key={article.id} className="py-5">
                <ListArticleRow article={article} />
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  )
}
