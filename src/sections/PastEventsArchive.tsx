import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ResultsCount } from '@/components/ui/ResultsList'
import Pagination from '@/components/ui/Pagination'
import FilterPanel from '@/components/ui/FilterPanel'
import { pastEvents, type PastEvent } from '@/data/pastEvents'

/**
 * Past events listing, built on the essay contest archive's layout: a filters
 * sidebar on the left, a results header with sort, and a card grid.
 *
 * Cards link to the event pages the current site publishes; only a few of
 * those have a page in this prototype so far (see eventDetails.ts).
 *
 * Accepts `?q=` and `?type=` so other pages can link here pre-filtered —
 * `type` is an event type in slug form, e.g. `?type=author-event`, which is
 * how the Books & Press nav's Author Events link lands here.
 */

const PER_PAGE = 12

type SortKey = 'recent' | 'oldest' | 'name'

const sorts: { key: SortKey; label: string }[] = [
  { key: 'recent', label: 'Newest first' },
  { key: 'oldest', label: 'Oldest first' },
  { key: 'name', label: 'Name (A–Z)' },
]

/** Event types, in listing order, with a count for each facet. */
const kindCounts = pastEvents.reduce<Record<string, number>>((acc, e) => {
  acc[e.kind] = (acc[e.kind] ?? 0) + 1
  return acc
}, {})
const kinds = Object.keys(kindCounts).sort((a, b) => a.localeCompare(b))

const kindSlug = (kind: string) => kind.toLowerCase().replace(/[^a-z0-9]+/g, '-')

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

function EventCard({ event }: { event: PastEvent }) {
  return (
    <article className="group relative flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-bolder">
        <img
          src={event.image}
          alt={event.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300 ease-out"
        />
        <span className="absolute top-3 left-3 bg-[#C1272D] text-white font-body font-bold text-xs uppercase tracking-[0.05em] px-2.5 py-1">
          {event.kind}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-headline text-lg lg:text-xl leading-[1.25]">
          {/* Stretched hit area so the whole card is clickable */}
          <a
            href={event.href}
            className="link-underline-hover text-navy-bolder
                       after:absolute after:inset-0"
          >
            {event.title}
          </a>
        </h3>

        {event.location && (
          <p className="flex items-center gap-2 font-body text-sm text-navy-subtle">
            <i className="fa-solid fa-location-dot text-xs" aria-hidden="true" />
            {event.location}
          </p>
        )}

        <p className="font-body font-bold text-sm text-navy-bolder">{event.date}</p>

        {event.summary && (
          <p className="font-body text-sm text-neutral-subtle leading-relaxed flex-1">
            {event.summary}
          </p>
        )}
      </div>
    </article>
  )
}

export default function PastEventsArchive() {
  const [params] = useSearchParams()
  // Seeded from the URL once; the field is user-owned from then on
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [selectedKinds, setSelectedKinds] = useState<string[]>(() => {
    const type = params.get('type')
    return type ? kinds.filter((k) => kindSlug(k) === type) : []
  })
  const [kindsOpen, setKindsOpen] = useState(true)
  const [sort, setSort] = useState<SortKey>('recent')
  const [page, setPage] = useState(1)

  // Any filter change invalidates the current page number
  const reset = () => setPage(1)

  const toggleKind = (kind: string) => {
    setSelectedKinds((prev) =>
      prev.includes(kind) ? prev.filter((k) => k !== kind) : [...prev, kind],
    )
    reset()
  }

  const clearAll = () => {
    setQuery('')
    setSelectedKinds([])
    reset()
  }

  const activeCount = selectedKinds.length + (query.trim() ? 1 : 0)

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = pastEvents.filter((e) => {
      if (selectedKinds.length > 0 && !selectedKinds.includes(e.kind)) return false
      if (!needle) return true
      return `${e.title} ${e.summary} ${e.location} ${e.kind}`.toLowerCase().includes(needle)
    })

    switch (sort) {
      case 'oldest':
        return filtered.sort((a, b) => a.startsOn.localeCompare(b.startsOn))
      case 'name':
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered.sort((a, b) => b.startsOn.localeCompare(a.startsOn))
    }
  }, [query, selectedKinds, sort])

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

          <div className="flex flex-col gap-1.5 border-b border-border-light pb-5">
            <label
              htmlFor="past-events-search"
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
                id="past-events-search"
                type="search"
                value={query}
                onChange={(e) => { setQuery(e.target.value); reset() }}
                placeholder="Event name or city…"
                className="w-full bg-white border border-[#94A3B8] pl-10 pr-3 py-2.5 font-body text-base
                  text-navy-bolder placeholder:text-neutral-subtle outline-none
                  focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition"
              />
            </div>
          </div>

          <div className="border-b border-border-light">
            <button
              onClick={() => setKindsOpen((o) => !o)}
              aria-expanded={kindsOpen}
              aria-controls="past-events-kinds"
              className="accordion-row flex items-center justify-between w-full gap-3 px-3 py-3 font-body font-bold text-sm text-navy-bolder text-left"
            >
              <span className="flex items-center gap-2">
                Event Type
                {selectedKinds.length > 0 && (
                  <span className="accordion-count font-body font-bold text-xs text-white bg-navy-subtle rounded-full px-2 py-0.5">
                    {selectedKinds.length}
                  </span>
                )}
              </span>
              <AccordionChevron open={kindsOpen} />
            </button>

            {kindsOpen && (
              <div id="past-events-kinds" className="px-3 pt-3 pb-4">
                {kinds.map((kind) => (
                  <label
                    key={kind}
                    className="flex items-center gap-2.5 py-1.5 cursor-pointer group select-none"
                  >
                    <input
                      type="checkbox"
                      checked={selectedKinds.includes(kind)}
                      onChange={() => toggleKind(kind)}
                      className="w-4 h-4 flex-shrink-0 accent-navy-bolder"
                    />
                    <span className="font-body text-sm text-navy-bolder group-hover:text-navy-subtle transition-colors flex-1 leading-snug">
                      {kind}
                    </span>
                    <span className="font-body text-xs text-neutral-subtle tabular-nums">
                      ({kindCounts[kind]})
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

        </FilterPanel>

        <div className="flex-1 min-w-0">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-light mb-4">
            <ResultsCount page={current} perPage={PER_PAGE} total={results.length} noun="events" />

            <div className="flex items-center gap-2.5">
              <label
                htmlFor="past-events-sort"
                className="font-body font-semibold text-sm text-navy-bolder whitespace-nowrap"
              >
                Sort by
              </label>
              <select
                id="past-events-sort"
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
              {pageItems.map((event) => (
                <EventCard key={event.href} event={event} />
              ))}
            </div>
          ) : (
            <p className="font-body text-base text-neutral-subtle py-10">
              {query.trim()
                ? <>No events match “{query.trim()}”.</>
                : <>No events match the selected types.</>}
            </p>
          )}

          {totalPages > 1 && (
            <div className="pt-10">
              <Pagination
                label="Past events pagination"
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
