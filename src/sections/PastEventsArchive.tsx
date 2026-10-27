import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ResultsCount } from '@/components/ui/ResultsList'
import Pagination from '@/components/ui/Pagination'
import FilterPanel from '@/components/ui/FilterPanel'
import { pastEvents } from '@/data/pastEvents'
import { upcomingEvents } from '@/data/events'
import EventCard, { type EventCardData } from '@/components/cards/EventCard'

/**
 * Past events listing, built on the essay contest archive's layout: a filters
 * sidebar on the left, a results header with sort, and a card grid.
 *
 * Cards link to the event pages the current site publishes; only a few of
 * those have a page in this prototype so far (see eventDetails.ts).
 *
 * `scope="all"` is the See All Events listing: the upcoming events join the
 * past ones, a When facet (Upcoming / Past) leads the filters, and the default
 * sort puts the next event first, then the past ones newest first. Whether an
 * event is upcoming comes from which list it is in, not today's date, so the
 * prototype's dates never drift into the wrong group.
 *
 * Accepts `?q=` and `?type=` so other pages can link here pre-filtered —
 * `type` is an event type in slug form, e.g. `?type=author-event`, which is
 * how the Books & Press nav's Author Events link lands here. Facets take
 * several values, comma-separated (`?type=conference,author-event`); the
 * all-events scope adds `?when=upcoming` or `?when=past`, and `?sort=` and
 * `?page=` round out the state, all kept in step with the controls below.
 */

const PER_PAGE = 12

type SortKey = 'upcoming' | 'recent' | 'oldest' | 'name'

const sortsByScope: Record<Scope, { key: SortKey; label: string }[]> = {
  past: [
    { key: 'recent', label: 'Newest first' },
    { key: 'oldest', label: 'Oldest first' },
    { key: 'name', label: 'Name (A–Z)' },
  ],
  all: [
    { key: 'upcoming', label: 'Upcoming first' },
    { key: 'recent', label: 'Newest first' },
    { key: 'oldest', label: 'Oldest first' },
    { key: 'name', label: 'Name (A–Z)' },
  ],
}

type Scope = 'past' | 'all'
type When = 'Upcoming' | 'Past'
const whens: When[] = ['Upcoming', 'Past']

type ListedEvent = EventCardData & { startsOn: string; when: When }

const eventsByScope: Record<Scope, ListedEvent[]> = {
  past: pastEvents.map((e) => ({ ...e, when: 'Past' })),
  all: [
    ...upcomingEvents.map((e) => ({ ...e, when: 'Upcoming' as const })),
    ...pastEvents.map((e) => ({ ...e, when: 'Past' as const })),
  ],
}

/** Facet options with a count for each, in alphabetical order. */
function countBy(events: ListedEvent[], key: (e: ListedEvent) => string) {
  return events.reduce<Record<string, number>>((acc, e) => {
    acc[key(e)] = (acc[key(e)] ?? 0) + 1
    return acc
  }, {})
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-')

/** Facet values named by a comma-separated list of slugs, e.g. `?type=conference,author-event`. */
function fromSlugs(param: string | null, options: string[]): string[] {
  if (!param) return []
  const wanted = param.split(',')
  return options.filter((option) => wanted.includes(slug(option)))
}

/** The inverse, in option order so the same selection always makes the same URL. */
function toSlugs(selected: string[], options: string[]): string | null {
  const value = options.filter((o) => selected.includes(o)).map(slug).join(',')
  return value || null
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

/**
 * One checkbox facet: a collapsible group with a selection count, each option
 * with its result count.
 */
function FacetGroup({
  id,
  title,
  options,
  counts,
  selected,
  onToggle,
}: {
  id: string
  title: string
  options: string[]
  counts: Record<string, number>
  selected: string[]
  onToggle: (value: string) => void
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border-b border-border-light">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={id}
        className="accordion-row flex items-center justify-between w-full gap-3 px-3 py-3 font-body font-bold text-sm text-navy-bolder text-left"
      >
        <span className="flex items-center gap-2">
          {title}
          {selected.length > 0 && (
            <span className="accordion-count font-body font-bold text-xs text-white bg-navy-subtle rounded-full px-2 py-0.5">
              {selected.length}
            </span>
          )}
        </span>
        <AccordionChevron open={open} />
      </button>

      {open && (
        <div id={id} className="px-3 pt-3 pb-4">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2.5 py-1.5 cursor-pointer group select-none"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="w-4 h-4 flex-shrink-0 accent-navy-bolder"
              />
              <span className="font-body text-sm text-navy-bolder group-hover:text-navy-subtle transition-colors flex-1 leading-snug">
                {option}
              </span>
              <span className="font-body text-xs text-neutral-subtle tabular-nums">
                ({counts[option]})
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

export default function PastEventsArchive({ scope = 'past' }: { scope?: Scope }) {
  const events = eventsByScope[scope]
  const sorts = sortsByScope[scope]
  const idPrefix = `${scope}-events`
  const kindCounts = useMemo(() => countBy(events, (e) => e.kind), [events])
  const kinds = useMemo(() => Object.keys(kindCounts).sort((a, b) => a.localeCompare(b)), [kindCounts])
  const whenCounts = useMemo(() => countBy(events, (e) => e.when), [events])

  /*
   * The URL is the state: every filter, the sort and the page are read from
   * the query string and written back to it, so a filtered view can be
   * shared, bookmarked, and stepped through with Back and Forward. Defaults
   * stay out of the URL, so an unfiltered listing is just its bare path.
   */
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const typeParam = params.get('type')
  const whenParam = scope === 'all' ? params.get('when') : null
  const selectedKinds = useMemo(() => fromSlugs(typeParam, kinds), [typeParam, kinds])
  const selectedWhens = useMemo(() => fromSlugs(whenParam, whens), [whenParam])
  const sort = sorts.find((s) => s.key === params.get('sort'))?.key ?? sorts[0].key
  const page = Math.max(1, Math.floor(Number(params.get('page'))) || 1)

  /**
   * Write params to the URL; null or '' removes one. Anything but a page
   * change drops the page number, since a new filter or sort starts the
   * results over. Keystrokes in the keyword field replace the history entry
   * rather than adding one per letter.
   */
  const update = (changes: Record<string, string | null>, { replace = false } = {}) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        for (const [key, value] of Object.entries(changes)) {
          if (value) next.set(key, value)
          else next.delete(key)
        }
        if (!('page' in changes)) next.delete('page')
        return next
      },
      { replace },
    )
  }

  const toggle = (param: 'type' | 'when', options: string[], selected: string[]) => (value: string) => {
    const nextSelected = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
    update({ [param]: toSlugs(nextSelected, options) })
  }

  const clearAll = () => update({ q: null, type: null, when: null })

  const activeCount = selectedKinds.length + selectedWhens.length + (query.trim() ? 1 : 0)

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    const filtered = events.filter((e) => {
      if (selectedWhens.length > 0 && !selectedWhens.includes(e.when)) return false
      if (selectedKinds.length > 0 && !selectedKinds.includes(e.kind)) return false
      if (!needle) return true
      return `${e.title} ${e.summary ?? ''} ${e.location} ${e.kind}`.toLowerCase().includes(needle)
    })

    switch (sort) {
      case 'upcoming':
        // The next event first, then everything already held, newest first
        return filtered.sort((a, b) =>
          a.when !== b.when
            ? (a.when === 'Upcoming' ? -1 : 1)
            : a.when === 'Upcoming'
              ? a.startsOn.localeCompare(b.startsOn)
              : b.startsOn.localeCompare(a.startsOn),
        )
      case 'oldest':
        return filtered.sort((a, b) => a.startsOn.localeCompare(b.startsOn))
      case 'name':
        return filtered.sort((a, b) => a.title.localeCompare(b.title))
      default:
        return filtered.sort((a, b) => b.startsOn.localeCompare(a.startsOn))
    }
  }, [events, query, selectedKinds, selectedWhens, sort])

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
              htmlFor={`${idPrefix}-search`}
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
                id={`${idPrefix}-search`}
                type="search"
                value={query}
                onChange={(e) => update({ q: e.target.value }, { replace: true })}
                placeholder="Event name or city…"
                className="w-full bg-white border border-[#94A3B8] pl-10 pr-3 py-2.5 font-body text-base
                  text-navy-bolder placeholder:text-neutral-subtle outline-none
                  focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition"
              />
            </div>
          </div>

          {scope === 'all' && (
            <FacetGroup
              id={`${idPrefix}-when`}
              title="When"
              options={whens}
              counts={whenCounts}
              selected={selectedWhens}
              onToggle={toggle('when', whens, selectedWhens)}
            />
          )}

          <FacetGroup
            id={`${idPrefix}-kinds`}
            title="Event Type"
            options={kinds}
            counts={kindCounts}
            selected={selectedKinds}
            onToggle={toggle('type', kinds, selectedKinds)}
          />

        </FilterPanel>

        <div className="flex-1 min-w-0">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-light mb-4">
            <ResultsCount page={current} perPage={PER_PAGE} total={results.length} noun="events" />

            <div className="flex items-center gap-2.5">
              <label
                htmlFor={`${idPrefix}-sort`}
                className="font-body font-semibold text-sm text-navy-bolder whitespace-nowrap"
              >
                Sort by
              </label>
              <select
                id={`${idPrefix}-sort`}
                value={sort}
                onChange={(e) => update({ sort: e.target.value === sorts[0].key ? null : e.target.value })}
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
                : <>No events match the selected filters.</>}
            </p>
          )}

          {totalPages > 1 && (
            <div className="pt-10">
              <Pagination
                label={scope === 'all' ? 'Events pagination' : 'Past events pagination'}
                totalPages={totalPages}
                page={current}
                onChange={(n) => update({ page: n > 1 ? String(n) : null })}
              />
            </div>
          )}
        </div>

      </div>
    </section>
  )
}
