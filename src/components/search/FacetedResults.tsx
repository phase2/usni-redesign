import { useId, useMemo, useRef, type ReactNode } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import FacetGroup, { type FacetOption } from '@/components/ui/FacetGroup'
import IssueRangePicker, { rangeLabel, type IssueRange } from '@/components/search/IssueRangePicker'
import FilterChip from '@/components/ui/FilterChip'
import FilterPanel from '@/components/ui/FilterPanel'
import Pagination from '@/components/ui/Pagination'
import {
  FACETS,
  SEARCH_TYPES,
  facetValues,
  issueSortKey,
  searchTerms,
  scoreItem,
  slugify,
  type FacetDef,
  type FacetKey,
  type SearchItem,
  type SearchType,
} from '@/data/siteSearch'
import { SUBJECTS } from '@/data/searchTaxonomy'
import imgPlaceholder from '@/assets/images/new-usni-default-watermark.png'

/**
 * The faceted results column shared by site search (/search) and Browse All
 * Articles (/browse): a facet column on the left, and the results in a list or
 * a grid, with sort and pagination. Each page hands it its records, its
 * keyword and its own facet column.
 *
 * Everything lives in the URL, so any view can be shared or linked to from
 * another page — e.g. /browse?publication=proceedings&topic=mine-warfare. Each
 * facet has its own parameter (see FacetDef), taking slugs and repeating for
 * several values (`topic=mine-warfare&topic=sea-power`). `sort`, `view` and
 * `page` are written only when they differ from the default. A slug that
 * matches nothing is ignored.
 *
 * Filter, sort, view and page changes replace the history entry rather than
 * push one, so Back leaves the listing instead of unticking boxes one at a time.
 *
 * Facet counts are disjunctive — each group counts as though its own
 * selections were cleared and every other group's were applied — so ticking a
 * topic does not zero out the other topics a reader might add to it.
 *
 * With no keyword the listing shows everything, newest first.
 */

type SortKey = 'relevance' | 'newest' | 'oldest' | 'title'
type ViewKey = 'list' | 'grid'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'relevance', label: 'Relevance' },
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'title', label: 'Title (A–Z)' },
]

const PER_PAGE = 12

/** Facets whose value a keyword can name, for the "this is a subject" offer. */
const SUBJECT_FACETS: FacetKey[] = ['topic', 'subtopic', 'ship', 'region', 'conflict', 'command', 'org', 'person', 'contributor']

const PARAM = Object.fromEntries(FACETS.map((f) => [f.key, f.param])) as Record<FacetKey, string>

const TYPE_EYEBROW = Object.fromEntries(SEARCH_TYPES.map((t) => [t.id, t.eyebrow])) as Record<
  SearchType,
  string
>

type Selection = Partial<Record<FacetKey, string[]>>

// The archive puts tens of thousands of records through these sorts: ISO dates
// compare as plain strings, and titles share one collator.
const collator = new Intl.Collator('en')
const byString = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0)

const byCountThenName = (a: FacetOption, b: FacetOption) => b.count - a.count || collator.compare(a.value, b.value)
const newestFirst = (a: FacetOption, b: FacetOption) => byString(b.value, a.value)
const newestIssueFirst = (a: FacetOption, b: FacetOption) => byString(issueSortKey(b.value), issueSortKey(a.value))

/** Every facet value in the records, by slug, so URL slugs resolve to labels. */
function labelsBySlug(items: SearchItem[], facets: FacetDef[]) {
  const maps = Object.fromEntries(facets.map((f) => [f.key, new Map<string, string>()])) as Partial<
    Record<FacetKey, Map<string, string>>
  >
  for (const item of items) {
    for (const f of facets) for (const v of facetValues(item, f.key)) maps[f.key]!.set(slugify(v), v)
  }
  return maps
}

/* ── Small pieces ─────────────────────────────────────────────────────────── */

interface ResultProps {
  item: SearchItem
  selection: Selection
  onToggle: (key: FacetKey, value: string) => void
}

const eyebrowOf = (item: SearchItem) => {
  const dept = item.archive ? item.tags.dept?.[0] : undefined
  return dept ? `${TYPE_EYEBROW[item.type]} · ${dept}` : TYPE_EYEBROW[item.type]
}

function Title({ item, className }: { item: SearchItem; className: string }) {
  return (
    <h3 className={`font-headline text-navy-bolder ${className}`}>
      {/* Archive articles have no page in the prototype, so no link. */}
      {item.href ? (
        <a href={item.href} className="link-underline-hover">
          {item.title}
        </a>
      ) : (
        item.title
      )}
    </h3>
  )
}

/**
 * Date, place and contributors. Bylines filter by contributor rather than
 * leave the page — the prototype has no contributor pages, and narrowing to
 * someone's other work is what a reader clicking a name usually wants.
 */
function Byline({ item, selection, onToggle }: ResultProps) {
  if (!item.date && item.authors.length === 0 && !item.place) return null
  const lead = [item.date, item.place].filter(Boolean)
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-[13px] text-neutral-subtle">
      {lead.map((part, i) => (
        <span key={part} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden="true">|</span>}
          {part}
        </span>
      ))}
      {item.authors.map((a) => (
        <span key={a} className="flex items-center gap-2">
          {lead.length > 0 && <span aria-hidden="true">|</span>}
          <button
            type="button"
            onClick={() => onToggle('contributor', a)}
            aria-pressed={selection.contributor?.includes(a) ?? false}
            className="text-left text-navy-bolder underline underline-offset-2 decoration-[#94A3B8] hover:decoration-navy-bolder"
          >
            {a}
            <span className="sr-only"> — filter by this contributor</span>
          </button>
        </span>
      ))}
    </p>
  )
}

function ResultRow(props: ResultProps) {
  const { item } = props
  return (
    <article className="flex gap-5 sm:gap-8 py-7">
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <p className="font-body font-bold text-xs uppercase tracking-[0.1em] text-[#0466c8]">{eyebrowOf(item)}</p>
        <Title item={item} className="text-xl lg:text-[22px] leading-[1.25]" />
        {item.summary && (
          <p className="font-body text-[15px] text-neutral-bold leading-[1.6] line-clamp-3">{item.summary}</p>
        )}
        <Byline {...props} />
      </div>

      {item.image && item.href && (
        <a
          href={item.href}
          tabIndex={-1}
          aria-hidden="true"
          className={`flex-shrink-0 self-start overflow-hidden bg-surface-subtle ${
            item.cover ? 'w-[72px] sm:w-[104px] aspect-[2/3]' : 'w-[96px] sm:w-[180px] lg:w-[200px] aspect-[3/2]'
          }`}
        >
          <img src={item.image} alt="" loading="lazy" className="w-full h-full object-cover" />
        </a>
      )}
    </article>
  )
}

/**
 * The grid card. A record with no picture — every archive article — takes the
 * crossed-swords watermark, as events without artwork do, so the grid keeps
 * its rhythm. A book jacket sits whole on the tint rather than being cropped.
 */
function ResultCard(props: ResultProps) {
  const { item } = props
  const media = (
    <div className="relative aspect-[16/10] overflow-hidden bg-surface-subtle">
      <img
        src={item.image ?? imgPlaceholder}
        alt=""
        loading="lazy"
        className={`w-full h-full ${item.image && item.cover ? 'object-contain p-4' : 'object-cover'}`}
      />
    </div>
  )
  return (
    <article className="flex flex-col bg-white border border-navy-subtle h-full">
      {item.href ? (
        <a href={item.href} tabIndex={-1} aria-hidden="true">
          {media}
        </a>
      ) : (
        media
      )}
      <div className="flex flex-col gap-2 p-5 flex-1">
        <p className="font-body font-bold text-xs uppercase tracking-[0.1em] text-[#0466c8]">{eyebrowOf(item)}</p>
        <Title item={item} className="text-lg lg:text-xl leading-[1.25]" />
        <Byline {...props} />
      </div>
    </article>
  )
}

/** List / Grid switch, beside Sort by. */
function ViewToggle({ view, onChange }: { view: ViewKey; onChange: (v: ViewKey) => void }) {
  const options: { key: ViewKey; label: string; icon: string }[] = [
    { key: 'list', label: 'List', icon: 'fa-list' },
    { key: 'grid', label: 'Grid', icon: 'fa-grip' },
  ]
  return (
    <div role="group" aria-label="Layout" className="flex border border-[#94A3B8]">
      {options.map((o) => {
        const on = o.key === view
        return (
          <button
            key={o.key}
            type="button"
            onClick={() => onChange(o.key)}
            aria-pressed={on}
            className={`flex items-center gap-2 px-3 py-2 font-body font-semibold text-sm transition-colors ${
              on ? 'bg-navy-bolder text-white' : 'bg-white text-navy-bolder hover:bg-surface-subtle'
            }`}
          >
            <i className={`fa-solid ${o.icon} text-xs`} aria-hidden="true" />
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

/** "This keyword is a subject" banner, above the results. */
function SubjectOffer({ text, action }: { text: ReactNode; action: ReactNode }) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between bg-[#ebf4ff] border-l-4 border-[#0466C8] px-4 py-3">
      <p className="font-body text-sm text-navy-bolder">{text}</p>
      <div className="self-start sm:self-auto flex-shrink-0 font-body font-semibold text-sm text-[#0466c8] hover:text-navy-bolder">
        {action}
      </div>
    </div>
  )
}

/* ── Results column ───────────────────────────────────────────────────────── */

export default function FacetedResults({
  items,
  query,
  facets,
  subjectOffer,
}: {
  items: SearchItem[]
  query: string
  /** The facet column, in order. */
  facets: FacetDef[]
  /**
   * What to do when the keyword is itself a subject ("mine warfare"):
   * `filter` swaps the keyword for that subject's facet, here; `browse` links
   * to that subject on Browse All Articles, where the archive is.
   */
  subjectOffer: 'filter' | 'browse'
}) {
  const [params, setParams] = useSearchParams()
  const topRef = useRef<HTMLDivElement>(null)
  const sortId = useId()
  const terms = useMemo(() => searchTerms(query), [query])
  const facetBy = useMemo(() => Object.fromEntries(facets.map((f) => [f.key, f])), [facets]) as Partial<
    Record<FacetKey, FacetDef>
  >

  const labels = useMemo(() => labelsBySlug(items, facets), [items, facets])

  // URL → selected labels, in URL order, unknown slugs dropped.
  const paramKey = params.toString()
  const selection = useMemo(() => {
    const out: Selection = {}
    for (const f of facets) {
      // Issue is a range, read below, not a list of values.
      if (f.key === 'issue') continue
      const values = params.getAll(f.param).flatMap((s) => labels[f.key]?.get(s) ?? [])
      if (values.length) out[f.key] = [...new Set(values)]
    }
    return out
    // `params` is a new object on every render; its string form is the state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramKey, labels, facets])

  // The Issue range: `from` and `to` as YYYY-MM. Either end alone runs open to
  // the other. An older single-issue link (`issue=december-1912`) is read as a
  // range of one.
  const hasIssue = facets.some((f) => f.key === 'issue')
  const range = useMemo((): IssueRange | null => {
    if (!hasIssue) return null
    const month = /^\d{4}-(0[1-9]|1[0-2])$/
    let from = params.get('from')
    let to = params.get('to')
    const legacy = params.get('issue')?.match(/^([a-z]+)-(\d{4})$/)
    if (!from && !to && legacy) {
      const key = issueSortKey(`${legacy[1].charAt(0).toUpperCase()}${legacy[1].slice(1)} ${legacy[2]}`)
      if (month.test(key)) from = to = key
    }
    if (from && !month.test(from)) from = null
    if (to && !month.test(to)) to = null
    if (!from && !to) return null
    const [lo, hi] = [from ?? '0000-01', to ?? '9999-12'].sort()
    return { from: lo, to: hi }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramKey, hasIssue])

  const defaultSort: SortKey = terms.length ? 'relevance' : 'newest'
  const sortParam = params.get('sort')
  const sort: SortKey =
    SORTS.some((s) => s.key === sortParam) && (sortParam !== 'relevance' || terms.length > 0)
      ? (sortParam as SortKey)
      : defaultSort
  const view: ViewKey = params.get('view') === 'grid' ? 'grid' : 'list'
  const page = Math.max(1, Number.parseInt(params.get('page') ?? '', 10) || 1)

  /** Rewrites the URL; any filter or sort change resets the page. */
  const write = (next: {
    selection?: Selection
    range?: IssueRange | null
    sort?: SortKey
    view?: ViewKey
    page?: number
    q?: string
  }) => {
    const out = new URLSearchParams()
    const q = next.q ?? query
    if (q) out.set('q', q)
    const sel = next.selection ?? selection
    for (const f of facets) {
      if (f.key === 'issue') continue
      for (const v of sel[f.key] ?? []) out.append(f.param, slugify(v))
    }
    const r = next.range === undefined ? range : next.range
    if (r) {
      if (r.from !== '0000-01') out.set('from', r.from)
      if (r.to !== '9999-12') out.set('to', r.to)
    }
    const s = next.sort ?? sort
    if (s !== (q ? 'relevance' : 'newest') && (s !== 'relevance' || q)) out.set('sort', s)
    if ((next.view ?? view) === 'grid') out.set('view', 'grid')
    const p = next.page ?? 1
    if (p > 1) out.set('page', String(p))
    setParams(out, { replace: true })
  }

  const toggle = (key: FacetKey, value: string) => {
    if (!facetBy[key]) return
    const list = selection[key] ?? []
    write({
      selection: { ...selection, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] },
    })
  }
  const clearAll = () => write({ selection: {}, range: null })

  const activeCount =
    Object.values(selection).reduce((n, list) => n + (list?.length ?? 0), 0) + (range ? 1 : 0)

  const scored = useMemo(
    () =>
      items.flatMap((item) => {
        const score = scoreItem(item, terms)
        return score > 0 ? [{ item, score }] : []
      }),
    [items, terms],
  )

  // One pass: a record that fails no facet is a result and counts everywhere;
  // one that fails exactly one facet counts toward that facet only.
  const { results, counts } = useMemo(() => {
    // A test per active filter: a facet's ticked values, or the Issue range.
    type Test = { key: FacetKey; passes: (item: SearchItem) => boolean }
    const active = facets.flatMap((f): Test[] => {
      if (f.key === 'issue') {
        if (!range) return []
        return [
          {
            key: f.key,
            passes: (item: SearchItem) => {
              const issue = facetValues(item, 'issue')[0]
              if (!issue) return false
              const k = issueSortKey(issue)
              return k >= range.from && k <= range.to
            },
          },
        ]
      }
      const values = selection[f.key]
      if (!values?.length) return []
      const set = new Set(values)
      return [{ key: f.key, passes: (item: SearchItem) => facetValues(item, f.key).some((v) => set.has(v)) }]
    })
    const counts = Object.fromEntries(facets.map((f) => [f.key, new Map<string, number>()])) as Partial<
      Record<FacetKey, Map<string, number>>
    >
    const bump = (key: FacetKey, item: SearchItem) => {
      const m = counts[key]!
      for (const v of new Set(facetValues(item, key))) m.set(v, (m.get(v) ?? 0) + 1)
    }
    const kept: typeof scored = []
    for (const m of scored) {
      let fails = 0
      let failed: FacetKey | null = null
      for (const a of active) {
        if (!a.passes(m.item)) {
          fails++
          failed = a.key
          if (fails > 1) break
        }
      }
      if (fails === 0) {
        kept.push(m)
        for (const f of facets) bump(f.key, m.item)
      } else if (fails === 1 && failed) {
        bump(failed, m.item)
      }
    }

    const newest = (a: SearchItem, b: SearchItem) =>
      byString(b.sortDate ?? '', a.sortDate ?? '') || collator.compare(a.title, b.title)
    switch (sort) {
      case 'relevance':
        kept.sort((a, b) => b.score - a.score || newest(a.item, b.item))
        break
      case 'oldest':
        // Undated records (books) go last either way, not first.
        kept.sort(
          (a, b) =>
            byString(a.item.sortDate ?? '9999', b.item.sortDate ?? '9999') ||
            collator.compare(a.item.title, b.item.title),
        )
        break
      case 'title':
        kept.sort((a, b) => collator.compare(a.item.title, b.item.title))
        break
      default:
        kept.sort((a, b) => newest(a.item, b.item))
    }
    return { results: kept, counts }
  }, [scored, selection, range, sort, facets])

  // A keyword that is itself a subject — "mine warfare", "USS Constitution".
  const offer = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return null
    if (subjectOffer === 'browse') {
      const hit = SUBJECTS.find(([, term]) => term.toLowerCase() === needle)
      if (!hit) return null
      const [key, label, p, n] = hit
      return { key: key as FacetKey, label, count: p + n }
    }
    for (const key of SUBJECT_FACETS) {
      if (!labels[key] || selection[key]?.length) continue
      for (const label of labels[key].values()) {
        if (label.toLowerCase() !== needle) continue
        const count = items.filter((item) => facetValues(item, key).includes(label)).length
        return { key, label, count }
      }
    }
    return null
  }, [query, labels, items, selection, subjectOffer])

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const pageItems = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)
  const first = (current - 1) * PER_PAGE + 1
  const last = Math.min(current * PER_PAGE, results.length)

  const goToPage = (p: number) => {
    write({ page: p })
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const optionsFor = (f: FacetDef): FacetOption[] =>
    [...counts[f.key]!]
      .map(([value, count]) => ({ value, count }))
      .sort(f.key === 'issue' ? newestIssueFirst : f.chrono ? newestFirst : byCountThenName)

  const facetLabel = (key: FacetKey) => (facetBy[key] ?? FACETS.find((f) => f.key === key))!.label.toLowerCase()

  return (
    <div className="flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12">
      <FilterPanel activeCount={activeCount} onClearAll={clearAll}>
        {/* One block, so the panel's gap sits under the Filters heading only and
            the accordion rows stack on their own rules. */}
        <div className="flex flex-col">
          {facets.map((f) =>
            f.key === 'issue' ? (
              // Too many issues for checkboxes: a month range picker instead.
              <IssueRangePicker
                key={f.key}
                title={f.label}
                options={optionsFor(f)}
                value={range}
                onChange={(r) => write({ range: r })}
                defaultOpen={!!range}
              />
            ) : (
              <FacetGroup
                key={f.key}
                title={f.label}
                options={optionsFor(f)}
                selected={selection[f.key] ?? []}
                onToggle={(v) => toggle(f.key, v)}
                defaultOpen={(selection[f.key]?.length ?? 0) > 0}
                findPlaceholder={f.find}
              />
            ),
          )}
        </div>
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
                  {first.toLocaleString()}–{last.toLocaleString()}
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

          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <ViewToggle view={view} onChange={(v) => write({ view: v, page: current })} />
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
        </div>

        {offer &&
          (subjectOffer === 'browse' ? (
            <SubjectOffer
              text={
                <>
                  <span className="font-semibold">{offer.label}</span> is a {facetLabel(offer.key)} in the
                  magazine archive, with {offer.count.toLocaleString()} Proceedings and Naval History articles.
                </>
              }
              action={
                <Link to={`/browse?${PARAM[offer.key]}=${slugify(offer.label)}`}>Browse all {offer.label} articles →</Link>
              }
            />
          ) : (
            <SubjectOffer
              text={
                <>
                  <span className="font-semibold">{offer.label}</span> is a {facetLabel(offer.key)}, with{' '}
                  {offer.count.toLocaleString()} {offer.count === 1 ? 'article' : 'articles'} tagged to it.
                </>
              }
              action={
                <button
                  type="button"
                  onClick={() => write({ q: '', selection: { ...selection, [offer.key]: [offer.label] } })}
                >
                  Show everything tagged {offer.label} →
                </button>
              }
            />
          ))}

        {/* Active filters, removable one at a time. */}
        {activeCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {facets.flatMap((f) =>
              f.key === 'issue'
                ? range
                  ? [<FilterChip key="issue" label={rangeLabel(range)} onRemove={() => write({ range: null })} />]
                  : []
                : (selection[f.key] ?? []).map((v) => (
                    <FilterChip key={`${f.key}-${v}`} label={v} onRemove={() => toggle(f.key, v)} />
                  )),
            )}
            <button type="button" onClick={clearAll} className="font-body text-xs text-link ml-1">
              Clear all
            </button>
          </div>
        )}

        {pageItems.length > 0 ? (
          view === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-7">
              {pageItems.map(({ item }) => (
                <ResultCard key={item.id} item={item} selection={selection} onToggle={toggle} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border-light border-b border-border-light">
              {pageItems.map(({ item }) => (
                <ResultRow key={item.id} item={item} selection={selection} onToggle={toggle} />
              ))}
            </div>
          )
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
                <>Check the spelling, or try fewer or broader words.</>
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
