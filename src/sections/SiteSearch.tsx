import { useId, useMemo, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
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
 * Site search results — /search?q=&type=
 *
 * Laid out after the faceted listing the client pointed to: a large keyword
 * box under the page title, a row of content-type pills, a facet column on the
 * left, and a list of results that each carry a type eyebrow, a title, a
 * summary, a date-and-byline line, and a thumbnail on the right.
 *
 * The keyword and the type live in the URL, so the header's search flydown can
 * link straight in and a results page can be shared. Facets, sort, and the page
 * number are local to one search: the results column is keyed on the keyword
 * and type, so a new search starts from a clean slate rather than carrying
 * filters that may no longer match anything.
 *
 * Facet counts are disjunctive — each group counts as though its own
 * selections were cleared and every other group's were applied — so ticking a
 * topic does not zero out the other topics a reader might add to it.
 *
 * With no keyword the page browses everything, newest first, the way the
 * reference's "All Insights" does.
 */

const PER_PAGE = 10

/** Options a facet shows before "Show all". */
const FACET_PREVIEW = 6

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

/** Boxed chevron, matching the accordion treatment used site-wide. */
function AccordionChevron({ open }: { open: boolean }) {
  return (
    <span
      className="accordion-chevron flex-shrink-0 flex items-center justify-center bg-navy-subtle p-1.5"
      aria-hidden="true"
    >
      <svg
        className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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

interface FacetOption {
  value: string
  count: number
}

/**
 * One facet group: an accordion row, an optional "Find …" box for long lists,
 * the first few options, and a Show all toggle for the rest. Selected options
 * stay listed even when the current results leave them at zero, so a reader
 * can always untick what they ticked.
 */
function FacetGroup({
  title,
  options,
  selected,
  onToggle,
  defaultOpen = true,
  findPlaceholder,
}: {
  title: string
  options: FacetOption[]
  selected: string[]
  onToggle: (value: string) => void
  defaultOpen?: boolean
  findPlaceholder?: string
}) {
  const id = useId()
  const [open, setOpen] = useState(defaultOpen)
  const [showAll, setShowAll] = useState(false)
  const [find, setFind] = useState('')

  // A facet with nothing to offer for these results (no topics or bylines on
  // Podcasts, say) stays in the column, disabled, so the sidebar keeps its shape
  // and a reader can see the filter exists. Leaves off `accordion-row`, which
  // carries the hover band.
  if (options.length === 0 && selected.length === 0) {
    return (
      <div className="border-b border-border-light">
        <button
          type="button"
          disabled
          className="flex items-center justify-between w-full gap-3 px-3 py-3 font-body font-bold text-sm text-navy-bolder text-left opacity-40 cursor-not-allowed"
        >
          <span>
            {title}
            <span className="sr-only"> — no options for these results</span>
          </span>
          <AccordionChevron open={false} />
        </button>
      </div>
    )
  }

  const listed = [
    ...selected
      .filter((v) => !options.some((o) => o.value === v))
      .map((value) => ({ value, count: 0 })),
    ...options,
  ]
  const needle = find.trim().toLowerCase()
  const matching = needle ? listed.filter((o) => o.value.toLowerCase().includes(needle)) : listed
  const visible = showAll || needle ? matching : matching.slice(0, FACET_PREVIEW)
  const hidden = matching.length - visible.length

  return (
    <div className="border-b border-border-light">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="accordion-row flex items-center justify-between w-full gap-3 px-3 py-3 font-body font-bold text-sm text-navy-bolder text-left"
      >
        <span className="flex items-center gap-2">
          {title}
          {selected.length > 0 && (
            <span className="font-body font-bold text-xs text-white bg-navy-subtle rounded-full px-2 py-0.5">
              {selected.length}
            </span>
          )}
        </span>
        <AccordionChevron open={open} />
      </button>

      {open && (
        <div id={id} className="pt-3 pb-4 flex flex-col">
          {findPlaceholder && listed.length > FACET_PREVIEW && (
            <input
              type="search"
              value={find}
              onChange={(e) => setFind(e.target.value)}
              placeholder={findPlaceholder}
              aria-label={findPlaceholder.replace(/…$/, '')}
              className="mb-2 w-full bg-white border border-[#94A3B8] px-3 py-2 font-body text-sm text-navy-bolder
                placeholder:text-neutral-subtle outline-none focus:border-navy-bright
                focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition"
            />
          )}

          {visible.map((o) => (
            <label
              key={o.value}
              className="flex items-start gap-2.5 py-1.5 cursor-pointer group select-none"
            >
              <input
                type="checkbox"
                checked={selected.includes(o.value)}
                onChange={() => onToggle(o.value)}
                className="w-4 h-4 mt-0.5 flex-shrink-0 accent-navy-bolder"
              />
              <span className="font-body text-sm text-navy-bolder group-hover:text-navy-subtle transition-colors flex-1 leading-snug">
                {o.value}
              </span>
              <span className="font-body text-xs text-neutral-subtle tabular-nums pt-0.5">{o.count}</span>
            </label>
          ))}

          {needle && matching.length === 0 && (
            <p className="font-body text-sm text-neutral-subtle py-1.5">No matches.</p>
          )}

          {!needle && (hidden > 0 || showAll) && matching.length > FACET_PREVIEW && (
            <button
              type="button"
              onClick={() => setShowAll((s) => !s)}
              className="self-start mt-1.5 flex items-center gap-1.5 font-body font-semibold text-sm text-[#0466c8] hover:text-navy-bolder transition-colors"
            >
              <i
                className={`fa-solid ${showAll ? 'fa-circle-minus' : 'fa-circle-plus'} text-sm`}
                aria-hidden="true"
              />
              {showAll ? 'Show fewer' : `Show all ${matching.length}`}
              <span className="sr-only"> {title.toLowerCase()} options</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

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
  const [topics, setTopics] = useState<string[]>([])
  const [years, setYears] = useState<string[]>([])
  const [authors, setAuthors] = useState<string[]>([])
  const [sort, setSort] = useState<SortKey>(terms.length ? 'relevance' : 'newest')
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const toggle = (set: typeof setTopics) => (value: string) => {
    set((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
    setPage(1)
  }
  const toggleTopic = toggle(setTopics)
  const toggleYear = toggle(setYears)
  const toggleAuthor = toggle(setAuthors)

  const clearAll = () => {
    setTopics([])
    setYears([])
    setAuthors([])
    setPage(1)
  }

  const activeCount = topics.length + years.length + authors.length

  const passes = (item: SearchItem, except?: FacetKey) =>
    (except === 'topic' || topics.length === 0 || item.topics.some((t) => topics.includes(t))) &&
    (except === 'year' || years.length === 0 || years.includes(yearOf(item) ?? '')) &&
    (except === 'author' || authors.length === 0 || item.authors.some((a) => authors.includes(a)))

  const items = matches.map((m) => m.item)
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
    setPage(p)
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
              onChange={(e) => {
                setSort(e.target.value as SortKey)
                setPage(1)
              }}
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
