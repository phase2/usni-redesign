import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ResultsCount } from '@/components/ui/ResultsList'
import Pagination from '@/components/ui/Pagination'
import FilterPanel from '@/components/ui/FilterPanel'
import { FacetShowMore } from '@/components/ui/FacetGroup'
import { essayContestSeries } from '@/data/essayContests'
import { archiveImage, essayArchive, type EssayArchiveEntry } from '@/data/essayArchive'

/**
 * Contest archive: every edition of every contest the Institute has run, as
 * teaser cards, with a filters sidebar.
 *
 * The cards are deliberately inert — the prototype has no per-edition pages, so
 * a card that looked clickable would lead nowhere. Each carries the same content
 * the live site's teaser does: art, contest name, funding credit, deadline, and
 * the one-line summary.
 *
 * Accepts `?q=` to arrive pre-filtered — contest pages link here that way to
 * show just their own series.
 */

const PER_PAGE = 12

type SortKey = 'recent' | 'oldest' | 'name'

const sorts: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'name', label: 'Name (A–Z)' },
]

const seriesName = new Map(essayContestSeries.map((s) => [s.slug, s.name]))

/** Entries per series, for the count beside each facet. */
const seriesCounts = essayArchive.reduce<Record<string, number>>((acc, e) => {
  acc[e.seriesSlug] = (acc[e.seriesSlug] ?? 0) + 1
  return acc
}, {})

// Same cut-off the Books collection facets use, so the two sidebars behave alike
const SEE_MORE_THRESHOLD = 12

function TeaserCard({ entry }: { entry: EssayArchiveEntry }) {
  const src = archiveImage(entry.image)

  return (
    <article className="group flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-bolder">
        {src ? (
          <img src={src} alt={entry.imageAlt ?? ''} className="w-full h-full object-cover" />
        ) : (
          // Roughly half the archive predates the site's teaser art; the year on
          // a navy field keeps those cards the same shape as the rest
          <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
            <span className="font-headline text-4xl text-white/25">{entry.year}</span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-headline text-lg lg:text-xl text-navy-bolder leading-[1.25]">
          <a href={entry.sourceHref} className="article-link article-link--card">
            {entry.title}
          </a>
        </h3>

        {entry.author && (
          <p className="font-body text-sm text-navy-subtle leading-snug">{entry.author}</p>
        )}

        {entry.deadline && (
          <p className="font-body text-sm text-navy-bolder">
            <span className="font-bold">Deadline: </span>
            <time dateTime={entry.deadlineISO}>{entry.deadline}</time>
          </p>
        )}

        {entry.summary && (
          <p className="font-body text-sm text-neutral-subtle leading-relaxed flex-1">
            {entry.summary}
          </p>
        )}
      </div>
    </article>
  )
}

/** Boxed chevron, matching the accordion treatment used site-wide. */
function AccordionChevron({ open }: { open: boolean }) {
  return (
    <span
      className="accordion-chevron flex-shrink-0 flex items-center justify-center bg-navy-subtle p-1.5"
      aria-hidden="true"
    >
      <svg
        className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${
          open ? 'rotate-180' : ''
        }`}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
      </svg>
    </span>
  )
}

export default function EssayContestsArchive() {
  const [params] = useSearchParams()
  // Seeded from the URL once; the field is user-owned from then on
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [categories, setCategories] = useState<string[]>([])
  const [categoriesOpen, setCategoriesOpen] = useState(true)
  const [showAllCategories, setShowAllCategories] = useState(false)
  const [sort, setSort] = useState<SortKey>('recent')
  const [page, setPage] = useState(1)

  // Any filter change invalidates the current page number
  const reset = () => setPage(1)

  const toggleCategory = (slug: string) => {
    setCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug],
    )
    reset()
  }

  const clearAll = () => {
    setQuery('')
    setCategories([])
    reset()
  }

  const activeCount = categories.length + (query.trim() ? 1 : 0)

  // A checked category stays visible when the list is collapsed, so clearing one
  // never means hunting for it behind "See more"
  const visibleCategories = showAllCategories
    ? essayContestSeries
    : essayContestSeries.filter(
        (s, i) => i < SEE_MORE_THRESHOLD || categories.includes(s.slug),
      )
  const hiddenCategoryCount = essayContestSeries.length - visibleCategories.length

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    // Keyword spans the card's own text plus its series name, so searching a
    // contest name still finds every edition of it
    const filtered = essayArchive.filter((e) => {
      if (categories.length > 0 && !categories.includes(e.seriesSlug)) return false
      if (!needle) return true
      const haystack = `${e.title} ${e.summary ?? ''} ${e.author ?? ''} ${
        seriesName.get(e.seriesSlug) ?? ''
      }`.toLowerCase()
      return haystack.includes(needle)
    })

    const byYear = (e: EssayArchiveEntry) => Number(e.year) || 0

    switch (sort) {
      case 'oldest':
        return filtered.sort((a, b) => byYear(a) - byYear(b) || a.title.localeCompare(b.title))
      case 'name':
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered.sort((a, b) => byYear(b) - byYear(a) || a.title.localeCompare(b.title))
    }
  }, [query, categories, sort])

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  // Guard against a stale page number after filtering shrinks the result set
  const current = Math.min(page, totalPages)
  const pageItems = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  return (
    <section className="bg-white py-12 lg:py-16">
      {/* Filters lead in the DOM and on the page: left column on desktop, above
          the results on mobile, so reading order and focus order agree at both */}
      <div className="container-site flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12">

        <FilterPanel activeCount={activeCount} onClearAll={clearAll}>

          {/* Rule closes the keyword facet, matching the one under Categories */}
          <div className="flex flex-col gap-1.5 border-b border-border-light pb-5">
            <label
              htmlFor="archive-search"
              className="font-body font-semibold text-sm text-navy-bolder"
            >
              Keyword
            </label>
            <div className="relative">
              <i
                className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-subtle"
                aria-hidden="true"
              />
              <input
                id="archive-search"
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); reset() }}
                placeholder="Contest name keyword…"
                className="w-full bg-white border border-[#94A3B8] pl-10 pr-3 py-2.5 font-body text-base
                  text-navy-bolder placeholder:text-neutral-subtle outline-none
                  focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition"
              />
            </div>
          </div>

          {/* No `last:border-0` here, unlike the stacked Books facets — this is
              the only accordion, so the rule under it is what closes the group */}
          <div className="border-b border-border-light">
            <button
              onClick={() => setCategoriesOpen((o) => !o)}
              aria-expanded={categoriesOpen}
              aria-controls="archive-categories"
              className="accordion-row flex items-center justify-between w-full gap-3 px-3 py-3 font-body font-bold text-sm text-navy-bolder text-left"
            >
              <span className="flex items-center gap-2">
                Categories
                {categories.length > 0 && (
                  <span className="accordion-count font-body font-bold text-xs text-white bg-navy-subtle rounded-full px-2 py-0.5">
                    {categories.length}
                  </span>
                )}
              </span>
              <AccordionChevron open={categoriesOpen} />
            </button>

            {categoriesOpen && (
              <div id="archive-categories" className="px-3 pt-3 pb-4">
                {/* 38 series is too many to sit open beside the results, so the
                    list reveals past the threshold rather than scrolling */}
                {visibleCategories.map((s) => (
                  <label
                    key={s.slug}
                    className="flex items-center gap-2.5 py-1.5 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={categories.includes(s.slug)}
                      onChange={() => toggleCategory(s.slug)}
                      className="w-4 h-4 flex-shrink-0 accent-navy-bolder"
                    />
                    <span className="font-body text-sm text-navy-bolder group-hover:text-navy-subtle transition-colors flex-1 leading-snug">
                      {s.name}
                    </span>
                    <span className="font-body text-xs text-neutral-subtle tabular-nums">
                      ({seriesCounts[s.slug] ?? 0})
                    </span>
                  </label>
                ))}

                {(showAllCategories || hiddenCategoryCount > 0) && (
                  <FacetShowMore
                    expanded={showAllCategories}
                    onToggle={() => setShowAllCategories((v) => !v)}
                    label="categories options"
                  />
                )}
              </div>
            )}
          </div>

        </FilterPanel>

        <div className="flex-1 min-w-0">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-light mb-4">
            <ResultsCount page={current} perPage={PER_PAGE} total={results.length} noun="entries" />

            <div className="flex items-center gap-2.5">
              <label
                htmlFor="archive-sort"
                className="font-body font-semibold text-sm text-navy-bolder whitespace-nowrap"
              >
                Sort by
              </label>
              <select
                id="archive-sort"
                value={sort}
                onChange={(e) => { setSort(e.target.value as SortKey); reset() }}
                className="select-field font-body text-base text-navy-bolder border border-[#94A3B8] pl-3.5 py-2
                  bg-white cursor-pointer outline-none focus:border-navy-bright
                  focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition min-w-[180px]"
              >
                {sorts.map((s) => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {pageItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {pageItems.map((entry) => (
                <TeaserCard key={`${entry.seriesSlug}-${entry.sourceHref}`} entry={entry} />
              ))}
            </div>
          ) : (
            <p className="font-body text-base text-neutral-subtle py-10">
              {query.trim()
                ? <>No entries match “{query.trim()}”.</>
                : <>No entries match the selected categories.</>}
            </p>
          )}

          {totalPages > 1 && (
            <div className="pt-10">
              <Pagination
                label="Contest archive pagination"
                totalPages={totalPages}
                page={current}
                onChange={setPage}
              />
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
