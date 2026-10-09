import { useMemo, useRef, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FilterChip from '@/components/ui/FilterChip'
import Pagination from '@/components/ui/Pagination'
import { ResultsCount } from '@/components/ui/ResultsList'
import PageHero from '@/sections/PageHero'
import { oralHistories, oralHistoryHref, oralHistoryImage, type OralHistory } from '@/data/oralHistories'

/**
 * Oral Histories — /archives/oral-histories.
 *
 * The live listing (/press/oral-histories) is 234 cards in alphabetical order
 * across twenty pages, with no way in other than paging. The catalogue is a
 * reference collection — a researcher arrives with a name, a rank, or an era
 * in mind — so the redesign keeps the cards and adds the ways in:
 *
 * - a keyword box in the hero, the same full-width box as site search and All
 *   Books, which searches names, ranks, and the summaries;
 * - an A–Z row over the results, for the surname-first browsing the live
 *   site's order implies but cannot jump through.
 *
 * The keyword lives in the URL (?q=) so a filtered list can be linked to; the
 * letter, sort, and page are local. Letter counts reflect the keyword.
 */

const PER_PAGE = 24

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

type SortKey = 'az' | 'za' | 'born-asc' | 'born-desc'

const SORTS: { key: SortKey; label: string }[] = [
  { key: 'az', label: 'Name (A–Z)' },
  { key: 'za', label: 'Name (Z–A)' },
  { key: 'born-asc', label: 'Born (earliest)' },
  { key: 'born-desc', label: 'Born (latest)' },
]

const letterOf = (h: OralHistory) => h.title.charAt(0).toUpperCase()

/** Every word of the keyword has to appear in the name, note, or summary. */
function matchesKeyword(h: OralHistory, terms: string[]) {
  if (terms.length === 0) return true
  const text = `${h.name} ${h.note ?? ''} ${h.summary}`.toLowerCase()
  return terms.every((t) => text.includes(t))
}

function countBy(items: OralHistory[], value: (h: OralHistory) => string | undefined) {
  const counts = new Map<string, number>()
  for (const h of items) {
    const v = value(h)
    if (v) counts.set(v, (counts.get(v) ?? 0) + 1)
  }
  return counts
}

function OralHistoryCard({ history }: { history: OralHistory }) {
  return (
    <article className="group relative flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow">
      <div className="aspect-[5/3] overflow-hidden bg-surface-subtle">
        <img
          src={oralHistoryImage(history.image)}
          alt={history.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300 ease-out"
        />
      </div>

      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-headline text-xl leading-[1.25]">
          {/* Stretched hit area so the whole card is clickable */}
          <a
            href={oralHistoryHref(history)}
            className="link-underline-hover text-navy-bolder after:absolute after:inset-0"
          >
            {history.title}
          </a>
        </h3>

        {history.subtitle && (
          <p className="font-body text-sm text-navy-subtle leading-snug">{history.subtitle}</p>
        )}

        {history.dates && <p className="font-body font-bold text-sm text-navy-bolder">{history.dates}</p>}
        {history.note && <p className="font-body text-sm text-navy-bolder leading-snug">{history.note}</p>}

        <p className="font-body text-sm text-neutral-subtle leading-relaxed line-clamp-4">{history.summary}</p>
      </div>
    </article>
  )
}

function Listing({ keyword, onClearKeyword }: { keyword: string; onClearKeyword: () => void }) {
  const [letter, setLetter] = useState<string | null>(null)
  const [sort, setSort] = useState<SortKey>('az')
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const pickLetter = (l: string | null) => {
    setLetter(l)
    setPage(1)
  }

  const clearAll = () => {
    setLetter(null)
    setPage(1)
    if (keyword) onClearKeyword()
  }

  const activeCount = (keyword ? 1 : 0) + (letter ? 1 : 0)

  const terms = useMemo(() => keyword.toLowerCase().split(/\s+/).filter(Boolean), [keyword])
  const byKeyword = useMemo(() => oralHistories.filter((h) => matchesKeyword(h, terms)), [terms])

  const letterCounts = countBy(byKeyword, letterOf)

  const results = useMemo(() => {
    const kept = byKeyword.filter((h) => !letter || letterOf(h) === letter)
    const byName = (a: OralHistory, b: OralHistory) => a.name.localeCompare(b.name)
    switch (sort) {
      case 'za':
        return kept.sort((a, b) => byName(b, a))
      // Undated entries go last either way.
      case 'born-asc':
        return kept.sort((a, b) => (a.born ?? 9999) - (b.born ?? 9999) || byName(a, b))
      case 'born-desc':
        return kept.sort((a, b) => (b.born ?? 0) - (a.born ?? 0) || byName(a, b))
      default:
        return kept.sort(byName)
    }
  }, [byKeyword, letter, sort])

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const pageItems = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const goToPage = (p: number) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const letterButton = 'font-body font-bold text-sm min-w-[32px] h-8 px-1.5 flex items-center justify-center transition-colors'

  return (
    <div className="container-site">
      <div ref={topRef} className="scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-light">
          {results.length > 0 ? (
            <ResultsCount page={current} perPage={PER_PAGE} total={results.length} noun="oral histories" />
          ) : (
            <p className="font-body text-sm text-neutral-subtle">No oral histories</p>
          )}

          <div className="flex items-center gap-2.5">
            <label htmlFor="oral-histories-sort" className="font-body font-semibold text-sm text-navy-bolder whitespace-nowrap">
              Sort by
            </label>
            <select
              id="oral-histories-sort"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value as SortKey)
                setPage(1)
              }}
              className="select-field font-body text-base text-navy-bolder border border-[#94A3B8] pl-3.5 py-2
                bg-white cursor-pointer outline-none focus:border-navy-bright
                focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition min-w-[180px]"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Surname initial. A letter with nothing under the current filters is
            disabled rather than hidden, so the row never reflows. */}
        <div role="group" aria-label="Surname begins with" className="flex flex-wrap gap-1 py-4 border-b border-border-light">
          <button
            type="button"
            onClick={() => pickLetter(null)}
            aria-pressed={letter === null}
            className={`${letterButton} px-3 ${
              letter === null ? 'bg-navy-bolder text-white' : 'text-navy-bolder hover:bg-surface-subtle'
            }`}
          >
            All
          </button>
          {LETTERS.map((l) => {
            const on = letter === l
            const count = letterCounts.get(l) ?? 0
            return (
              <button
                key={l}
                type="button"
                onClick={() => pickLetter(on ? null : l)}
                aria-pressed={on}
                disabled={!on && count === 0}
                aria-label={`${l} — ${count} ${count === 1 ? 'oral history' : 'oral histories'}`}
                className={`${letterButton} ${
                  on
                    ? 'bg-navy-bolder text-white'
                    : 'text-navy-bolder hover:bg-surface-subtle disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed'
                }`}
              >
                {l}
              </button>
            )
          })}
        </div>

        {activeCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-4">
            {keyword && <FilterChip group="Keyword" label={`“${keyword}”`} onRemove={onClearKeyword} />}
            {letter && <FilterChip group="Surname" label={letter} onRemove={() => pickLetter(null)} />}
            <button type="button" onClick={clearAll} className="font-body text-xs text-link ml-1">
              Clear all
            </button>
          </div>
        )}

        {pageItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-6">
            {pageItems.map((h) => (
              <OralHistoryCard key={h.slug} history={h} />
            ))}
          </div>
        ) : (
          <div className="py-10 flex flex-col gap-3">
            <p className="font-headline text-2xl text-navy-bolder">
              {keyword ? <>No oral histories match “{keyword}”.</> : <>No oral histories match these filters.</>}
            </p>
            <p className="font-body text-base text-neutral-subtle leading-relaxed">
              Try removing a filter, or{' '}
              <button type="button" onClick={clearAll} className="text-link">
                clear them all
              </button>
              .
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="pt-10">
            <Pagination label="Oral histories pagination" totalPages={totalPages} page={current} onChange={goToPage} />
          </div>
        )}

        {/* How to get one — from the live About page's FAQ, which is the only
            place the site says it. */}
        <div className="mt-12 border-t-4 border-[#0466c8] bg-surface-subtle px-6 py-6 lg:px-8 flex flex-col gap-2">
          <h2 className="font-headline text-2xl text-navy-bolder">Ordering an oral history</h2>
          <p className="font-body text-base text-neutral-bold leading-relaxed">
            Bound copies are available from Amazon; each oral history’s page links to its purchase
            options. Most volumes may be cited freely — the rights are noted in the front of each. For
            questions, contact the archives at{' '}
            <a href="mailto:research@usni.org" className="text-link">
              research@usni.org
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default function OralHistoriesListing() {
  const [params, setParams] = useSearchParams()
  const keyword = (params.get('q') ?? '').trim()

  // The box is the reader's until they submit; the URL is what was searched.
  const [draft, setDraft] = useState(keyword)
  const [lastKeyword, setLastKeyword] = useState(keyword)
  if (keyword !== lastKeyword) {
    setLastKeyword(keyword)
    setDraft(keyword)
  }

  const setKeyword = (q: string) => {
    const next = new URLSearchParams(params)
    if (q) next.set('q', q)
    else next.delete('q')
    setParams(next)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setKeyword(draft.trim())
  }

  return (
    <>
      <PageHero
        title="Oral Histories"
        description={
          <>
            First-person recollections of more than 230 men and women who shaped 20th-century naval
            history — Chiefs of Naval Operations and Coast Guard commandants, the Golden Thirteen, Carl
            Brashear, the first women at the Naval Academy — recorded, transcribed, and annotated by the
            Naval Institute’s Oral History Program since 1969.
          </>
        }
        breadcrumb={
          <Breadcrumb
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Archives', href: '/archives' },
            ]}
            current="Oral Histories"
            className="pb-4 border-b border-[#C2DDFF]"
          />
        }
      >
        <form role="search" onSubmit={onSubmit} className="flex items-stretch border-2 border-navy-bolder bg-white mt-2">
          <label htmlFor="oral-histories-search" className="sr-only">
            Search oral histories
          </label>
          <input
            id="oral-histories-search"
            type="search"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Search by name, rank, ship, or subject…"
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
      </PageHero>

      <section className="bg-white pt-10 lg:pt-12 pb-16 lg:pb-24">
        {/* Keyed on the keyword: a new search starts with the letter, facets,
            and page cleared, rather than filters that may match nothing. */}
        <Listing key={keyword} keyword={keyword} onClearKeyword={() => setKeyword('')} />
      </section>
    </>
  )
}
