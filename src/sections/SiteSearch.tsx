import { useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FacetGroup, { type FacetOption } from '@/components/ui/FacetGroup'
import FilterChip from '@/components/ui/FilterChip'
import FilterPanel from '@/components/ui/FilterPanel'
import Pagination from '@/components/ui/Pagination'
import PageHero from '@/sections/PageHero'
import {
  SEARCH_TYPES,
  searchIndex,
  searchTerms,
  scoreItem,
  type SearchItem,
  type SearchType,
} from '@/data/siteSearch'

/**
 * Site search results — /search?q=&type=&topic=&year=&author=&sort=&page=
 *
 * Laid out after the faceted listing the client pointed to: a large keyword
 * box under the page title, a row of content-type pills, a facet column on the
 * left, and a list of results that each carry a type eyebrow, a title, a
 * summary, a date-and-byline line, and a thumbnail on the right.
 *
 * Everything lives in the URL, so the header's search flydown can link straight
 * in and any filtered view can be shared or linked to from another page — e.g.
 * /search?type=events&topic=author-event. Topics and authors go in as slugs, a
 * year as itself, and a facet with several values ticked repeats its parameter
 * (`topic=author-event&topic=series`). `sort` is written only when it differs
 * from the default, and `page` only past the first. A slug that matches nothing
 * in the current results is ignored.
 *
 * Filter, sort and page changes replace the history entry rather than push
 * one, so Back leaves the search instead of unticking boxes one at a time. A
 * new keyword or type writes a fresh URL with neither, so a new search starts
 * from a clean slate rather than carrying filters that may no longer match.
 *
 * Facet counts are disjunctive — each group counts as though its own
 * selections were cleared and every other group's were applied — so ticking a
 * topic does not zero out the other topics a reader might add to it.
 *
 * With no keyword the page browses everything, newest first, the way the
 * reference's "All Insights" does.
 */

const PER_PAGE = 10

type SortKey = 'relevance' | 'newest' | 'oldest' | 'title'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'title', label: 'Title (A–Z)' },
]

const TYPE_EYEBROW = Object.fromEntries(SEARCH_TYPES.map((t) => [t.id, t.eyebrow])) as Record<
  SearchType,
  string
>

const isType = (v: string | null): v is SearchType => SEARCH_TYPES.some((t) => t.id === v)

/* ── Small pieces ─────────────────────────────────────────────────────────── */

function ResultRow({
  item,
  activeAuthors,
  onAuthor,
}: {
  item: SearchItem
  activeAuthors: string[]
  onAuthor: (a: string) => void
}) {
  const hasByline = item.date || item.authors.length > 0 || item.place

  return (
    <article className="flex gap-5 sm:gap-8 py-7">
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <p className="font-body font-bold text-xs uppercase tracking-[0.1em] text-[#0466c8]">
          {TYPE_EYEBROW[item.type]}
        </p>

        <h3 className="font-headline text-xl lg:text-[22px] text-navy-bolder leading-[1.25]">
          <a href={item.href} className="link-underline-hover">
            {item.title}
          </a>
        </h3>

        {item.summary && (
          <p className="font-body text-[15px] text-neutral-bold leading-[1.6] line-clamp-3">
            {item.summary}
          </p>
        )}

        {/* Bylines filter by author rather than leave the page — the prototype
            has no author pages, and narrowing to someone's other work is what
            a reader clicking a name in a results list usually wants. */}
        {hasByline && (
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[13px] text-neutral-subtle">
            {item.date && <span>{item.date}</span>}
            {item.place && (
              <>
                {item.date && <span aria-hidden="true">|</span>}
                <span>{item.place}</span>
              </>
            )}
            {item.authors.map((a) => (
              <span key={a} className="flex items-center gap-2">
                {(item.date || item.place) && <span aria-hidden="true">|</span>}
                <button
                  type="button"
                  onClick={() => onAuthor(a)}
                  aria-pressed={activeAuthors.includes(a)}
                  className="text-left text-navy-bolder underline underline-offset-2 decoration-[#94A3B8] hover:decoration-navy-bolder"
                >
                  {a}
                  <span className="sr-only"> — filter by this author</span>
                </button>
              </span>
            ))}
          </p>
        )}
      </div>

      {item.image && (
        <a
          href={item.href}
          tabIndex={-1}
          aria-hidden="true"
          className={`flex-shrink-0 self-start overflow-hidden bg-surface-subtle ${
            item.cover
              ? 'w-[72px] sm:w-[104px] aspect-[2/3]'
              : 'w-[96px] sm:w-[180px] lg:w-[200px] aspect-[3/2]'
          }`}
        >
          <img src={item.image} alt="" loading="lazy" className="w-full h-full object-cover" />
        </a>
      )}
    </article>
  )
}

/* ── Results column ───────────────────────────────────────────────────────── */

type FacetKey = 'topic' | 'year' | 'author'

const yearOf = (item: SearchItem) => item.sortDate?.slice(0, 4)

function countBy(items: SearchItem[], values: (item: SearchItem) => (string | undefined)[]) {
  const counts = new Map<string, number>()
  for (const item of items) {
    for (const v of new Set(values(item))) {
      if (v) counts.set(v, (counts.get(v) ?? 0) + 1)
    }
  }
  return [...counts].map(([value, count]) => ({ value, count }))
}

const byCountThenName = (a: FacetOption, b: FacetOption) =>
  b.count - a.count || a.value.localeCompare(b.value)

/** URL form of a topic or author, e.g. "Author Event" → "author-event". */
const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

/** The labels a list of slugs stands for, in URL order, dropping any unknown. */
function fromSlugs(slugs: string[], labels: Iterable<string>) {
  const bySlug = new Map([...labels].map((label) => [slugify(label), label]))
  return slugs.flatMap((s) => bySlug.get(s) ?? [])
}

function SearchResults({
  matches,
  query,
  terms,
}: {
  /** Items already matched to the keyword and type, with their scores. */
  matches: { item: SearchItem; score: number }[]
  query: string
  terms: string[]
}) {
  const [params, setParams] = useSearchParams()
  const topRef = useRef<HTMLDivElement>(null)

  const items = matches.map((m) => m.item)
  const topics = useMemo(
    () => fromSlugs(params.getAll('topic'), new Set(items.flatMap((i) => i.topics))),
    // `items` is rebuilt every render; `matches` is what it follows.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, matches],
  )
  const authors = useMemo(
    () => fromSlugs(params.getAll('author'), new Set(items.flatMap((i) => i.authors))),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, matches],
  )
  const years = useMemo(() => params.getAll('year'), [params])

  const defaultSort: SortKey = terms.length ? 'relevance' : 'newest'
  const sortParam = params.get('sort')
  const sort: SortKey =
    SORTS.some((s) => s.key === sortParam) && (sortParam !== 'relevance' || terms.length > 0)
      ? (sortParam as SortKey)
      : defaultSort
  const page = Math.max(1, Number.parseInt(params.get('page') ?? '', 10) || 1)

  /** Rewrites the filter, sort and page params; any filter change resets the page. */
  const write = (next: {
    topics?: string[]
    years?: string[]
    authors?: string[]
    sort?: SortKey
    page?: number
  }) => {
    const out = new URLSearchParams()
    const q = params.get('q')
    const type = params.get('type')
    if (q) out.set('q', q)
    if (type) out.set('type', type)
    for (const t of next.topics ?? topics) out.append('topic', slugify(t))
    for (const y of next.years ?? years) out.append('year', y)
    for (const a of next.authors ?? authors) out.append('author', slugify(a))
    const s = next.sort ?? sort
    if (s !== defaultSort) out.set('sort', s)
    const p = next.page ?? 1
    if (p > 1) out.set('page', String(p))
    setParams(out, { replace: true })
  }

  const toggled = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
  const toggleTopic = (v: string) => write({ topics: toggled(topics, v) })
  const toggleYear = (v: string) => write({ years: toggled(years, v) })
  const toggleAuthor = (v: string) => write({ authors: toggled(authors, v) })

  const clearAll = () => write({ topics: [], years: [], authors: [] })

  const activeCount = topics.length + years.length + authors.length

  const passes = (item: SearchItem, except?: FacetKey) =>
    (except === 'topic' || topics.length === 0 || item.topics.some((t) => topics.includes(t))) &&
    (except === 'year' || years.length === 0 || years.includes(yearOf(item) ?? '')) &&
    (except === 'author' || authors.length === 0 || item.authors.some((a) => authors.includes(a)))

  const topicOptions = countBy(items.filter((i) => passes(i, 'topic')), (i) => i.topics).sort(byCountThenName)
  const yearOptions = countBy(items.filter((i) => passes(i, 'year')), (i) => [yearOf(i)]).sort((a, b) =>
    b.value.localeCompare(a.value),
  )
  const authorOptions = countBy(items.filter((i) => passes(i, 'author')), (i) => i.authors).sort(byCountThenName)

  const results = useMemo(() => {
    const kept = matches.filter((m) => passes(m.item))
    const newest = (a: SearchItem, b: SearchItem) =>
      (b.sortDate ?? '').localeCompare(a.sortDate ?? '') || a.title.localeCompare(b.title)
    switch (sort) {
      case 'relevance':
        return kept.sort((a, b) => b.score - a.score || newest(a.item, b.item))
      case 'oldest':
        // Undated records (books) go last either way, not first.
        return kept.sort(
          (a, b) =>
            (a.item.sortDate ?? '9999').localeCompare(b.item.sortDate ?? '9999') ||
            a.item.title.localeCompare(b.item.title),
        )
      case 'title':
        return kept.sort((a, b) => a.item.title.localeCompare(b.item.title))
      default:
        return kept.sort((a, b) => newest(a.item, b.item))
    }
    // `passes` closes over the three facet arrays listed here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, topics, years, authors, sort])

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const pageItems = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)
  const first = (current - 1) * PER_PAGE + 1
  const last = Math.min(current * PER_PAGE, results.length)

  const goToPage = (p: number) => {
    write({ page: p })
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const sortId = useId()

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12">
      <FilterPanel activeCount={activeCount} onClearAll={clearAll}>
        <FacetGroup
          title="Topic"
          options={topicOptions}
          selected={topics}
          onToggle={toggleTopic}
          findPlaceholder="Find a topic…"
        />
        <FacetGroup title="Year" options={yearOptions} selected={years} onToggle={toggleYear} />
        <FacetGroup
          title="Author"
          options={authorOptions}
          selected={authors}
          onToggle={toggleAuthor}
          defaultOpen={false}
          findPlaceholder="Find an author…"
        />
      </FilterPanel>

      <div ref={topRef} className="flex-1 min-w-0 scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b-2 border-navy-bolder">
          <p className="font-body text-sm text-neutral-subtle" aria-live="polite">
            {results.length === 0 ? (
              <>No results</>
            ) : (
              <>
                Showing{' '}
                <span className="font-semibold text-navy-bolder">
                  {first}–{last}
                </span>{' '}
                of <span className="font-semibold text-navy-bolder">{results.length.toLocaleString()}</span>{' '}
                {results.length === 1 ? 'result' : 'results'}
              </>
            )}
            {query && (
              <>
                {' '}for <span className="font-semibold text-navy-bolder">“{query}”</span>
              </>
            )}
          </p>

          <div className="flex items-center gap-2.5">
            <label htmlFor={sortId} className="font-body font-semibold text-sm text-navy-bolder whitespace-nowrap">
              Sort by
            </label>
            <select
              id={sortId}
              value={sort}
              onChange={(e) => write({ sort: e.target.value as SortKey })}
              className="select-field font-body text-base text-navy-bolder border border-[#94A3B8] pl-3.5 py-2
                bg-white cursor-pointer outline-none focus:border-navy-bright
                focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition min-w-[160px]"
            >
              {SORTS.filter((s) => s.key !== 'relevance' || terms.length > 0).map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active filters, removable one at a time. Grouped labels because a
            bare year or author name reads ambiguously out of the sidebar. */}
        {activeCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {topics.map((v) => (
              <FilterChip key={`t-${v}`} group="Topic" label={v} onRemove={() => toggleTopic(v)} />
            ))}
            {years.map((v) => (
              <FilterChip key={`y-${v}`} group="Year" label={v} onRemove={() => toggleYear(v)} />
            ))}
            {authors.map((v) => (
              <FilterChip key={`a-${v}`} group="Author" label={v} onRemove={() => toggleAuthor(v)} />
            ))}
            <button type="button" onClick={clearAll} className="font-body text-xs text-link ml-1">
              Clear all
            </button>
          </div>
        )}

        {pageItems.length > 0 ? (
          <div className="flex flex-col divide-y divide-border-light border-b border-border-light">
            {pageItems.map(({ item }) => (
              <ResultRow
                key={item.id}
                item={item}
                activeAuthors={authors}
                onAuthor={toggleAuthor}
              />
            ))}
          </div>
        ) : (
          <div className="py-10 flex flex-col gap-3">
            <p className="font-headline text-2xl text-navy-bolder">
              {query ? <>Nothing matches “{query}”{activeCount > 0 && ' with these filters'}.</> : <>Nothing matches these filters.</>}
            </p>
            <p className="font-body text-base text-neutral-subtle leading-relaxed">
              {activeCount > 0 ? (
                <>
                  Try removing a filter, or{' '}
                  <button type="button" onClick={clearAll} className="text-link">
                    clear them all
                  </button>
                  .
                </>
              ) : (
                <>Check the spelling, try fewer or broader words, or search across all content types.</>
              )}
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pt-10">
            <Pagination label="Search results pagination" totalPages={totalPages} page={current} onChange={goToPage} />
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Page section ─────────────────────────────────────────────────────────── */

export default function SiteSearch() {
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') ?? '').trim()
  const typeParam = params.get('type')
  const type: SearchType | 'all' = isType(typeParam) ? typeParam : 'all'

  // The box is the reader's until they submit; the URL is what was searched.
  const [draft, setDraft] = useState(query)
  const [lastQuery, setLastQuery] = useState(query)
  if (query !== lastQuery) {
    // Back/forward or the header flydown changed the URL under us.
    setLastQuery(query)
    setDraft(query)
  }

  const terms = useMemo(() => searchTerms(query), [query])

  const scored = useMemo(
    () =>
      searchIndex
        .map((item) => ({ item, score: scoreItem(item, terms) }))
        .filter((m) => m.score > 0),
    [terms],
  )

  const typeCounts = useMemo(() => {
    const counts = {} as Record<SearchType, number>
    for (const { item } of scored) counts[item.type] = (counts[item.type] ?? 0) + 1
    return counts
  }, [scored])

  const matches = useMemo(
    () => (type === 'all' ? scored : scored.filter((m) => m.item.type === type)),
    [scored, type],
  )

  const update = (next: { q?: string; type?: SearchType | 'all' }) => {
    const q = next.q ?? query
    const t = next.type ?? type
    const out = new URLSearchParams()
    if (q) out.set('q', q)
    if (t !== 'all') out.set('type', t)
    setParams(out)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    update({ q: draft.trim() })
  }

  const pills: { id: SearchType | 'all'; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: scored.length },
    ...SEARCH_TYPES.map((t) => ({ id: t.id, label: t.label, count: typeCounts[t.id] ?? 0 })),
  ]

  return (
    <>
      {/* The site's light-blue interior header, carrying the search box and the
          type pills as well as the title, so the whole query sits in one block
          and the results start on white below it. */}
      <PageHero
        title={query ? 'Search Results' : 'Search'}
        breadcrumb={
          <Breadcrumb
            trail={[{ label: 'Home', href: '/' }]}
            current="Search"
            className="pb-4 border-b border-[#C2DDFF]"
          />
        }
      >
        <div className="flex flex-col gap-5 pt-2">
          <form role="search" onSubmit={onSubmit} className="flex items-stretch border-2 border-navy-bolder bg-white">
            <label htmlFor="site-search-input" className="sr-only">
              Search the Naval Institute
            </label>
            <input
              id="site-search-input"
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search by keyword, title, or author…"
              className="flex-1 min-w-0 font-body text-lg lg:text-xl text-navy-bolder placeholder:text-neutral-subtle
                outline-none bg-transparent px-4 lg:px-5 py-3.5 lg:py-4"
            />
            <button
              type="submit"
              className="flex-shrink-0 flex items-center justify-center w-14 lg:w-16 bg-navy-bolder text-white hover:bg-navy-bright transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass text-lg" aria-hidden="true" />
              <span className="sr-only">Search</span>
            </button>
          </form>

          {/* Content type. Counts follow the keyword, so a reader can see where
              the matches are before choosing; a type with none is still
              listed, so the row does not reshuffle between searches. */}
          <div
            role="group"
            aria-label="Content type"
            className="-mx-6 px-6 lg:mx-0 lg:px-0 flex gap-2 overflow-x-auto lg:flex-wrap pb-1"
          >
            {pills.map((p) => {
              const on = p.id === type
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => update({ type: p.id })}
                  aria-pressed={on}
                  disabled={!on && p.count === 0 && p.id !== 'all'}
                  className={`flex-shrink-0 flex items-center gap-1.5 rounded-full border px-4 py-2 font-body font-semibold text-sm whitespace-nowrap transition-colors
                    ${on
                      ? 'bg-navy-bolder border-navy-bolder text-white'
                      : 'bg-white border-[#c4c9d4] text-navy-bolder hover:border-navy-bolder disabled:opacity-40 disabled:hover:border-[#c4c9d4] disabled:cursor-not-allowed'
                    }`}
                >
                  {p.label}
                  <span className={`text-xs tabular-nums ${on ? 'text-white/75' : 'text-neutral-subtle'}`}>
                    {p.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </PageHero>

      <section className="bg-white pt-10 lg:pt-12 pb-16 lg:pb-24">
        <div className="container-site">
          <SearchResults key={`${query}|${type}`} matches={matches} query={query} terms={terms} />
        </div>
      </section>
    </>
  )
}
