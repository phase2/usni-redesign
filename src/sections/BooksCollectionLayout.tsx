import { useState, useMemo, useCallback, useEffect } from 'react'
import { allBooks, SERIES_FACETS, SUBJECT_FACETS } from '@/data/books'
import type { Book } from '@/data/books'

/* ── Constants ─────────────────────────────────────────────────────────────── */

const BINDING_OPTIONS: Book['format'][] = ['Hardcover', 'Paperback', 'eBook']

const PRICE_RANGES = [
  { label: 'Under $20', min: 0, max: 19.99 },
  { label: '$20 – $29.99', min: 20, max: 29.99 },
  { label: '$30 – $39.99', min: 30, max: 39.99 },
  { label: '$40 and above', min: 40, max: Infinity },
]

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'new', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'az', label: 'Title: A–Z' },
]

const SEE_MORE_THRESHOLD = 12

/* ── Accordion ──────────────────────────────────────────────────────────────── */

function Accordion({
  title,
  children,
  defaultOpen = true,
}: {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-border-light last:border-0">
      <button
        className="flex items-center justify-between w-full py-3 font-body font-bold text-sm text-navy-bolder text-left gap-3"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <span
          className="flex-shrink-0 flex items-center justify-center bg-navy-subtle p-1.5"
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
      </button>
      {open && <div className="pb-4">{children}</div>}
    </div>
  )
}

/* ── FacetCheckbox ──────────────────────────────────────────────────────────── */

function FacetCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string
  count: number
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="flex items-center gap-2.5 py-1.5 cursor-pointer group select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 flex-shrink-0 accent-navy-bolder"
      />
      <span className="font-body text-sm text-navy-bolder group-hover:text-navy-subtle transition-colors flex-1 leading-snug">
        {label}
      </span>
      <span className="font-body text-xs text-neutral-subtle tabular-nums">({count})</span>
    </label>
  )
}

/* ── FilterableFacetGroup ───────────────────────────────────────────────────── */

function FilterableFacetGroup({
  options,
  selected,
  onToggle,
  books,
  field,
  fieldLabel,
  showSearch = true,
}: {
  options: string[]
  selected: string[]
  onToggle: (val: string) => void
  books: Book[]
  field: 'series' | 'subjects'
  fieldLabel: string
  showSearch?: boolean
}) {
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState(false)

  const counts = useMemo(() => {
    const map: Record<string, number> = {}
    for (const book of books) {
      const vals = field === 'series'
        ? (book.series ? [book.series] : [])
        : (book.subjects ?? [])
      for (const v of vals) map[v] = (map[v] ?? 0) + 1
    }
    return map
  }, [books, field])

  const filtered = filter
    ? options.filter(o => o.toLowerCase().includes(filter.toLowerCase()))
    : options

  const visible = expanded ? filtered : filtered.slice(0, SEE_MORE_THRESHOLD)
  const hiddenCount = filtered.length - SEE_MORE_THRESHOLD

  return (
    <div>
      {showSearch && options.length > 5 && (
        <div className="relative mb-3">
          <i
            className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-neutral-subtle text-[11px] pointer-events-none"
            aria-hidden="true"
          />
          <input
            type="text"
            value={filter}
            onChange={e => { setFilter(e.target.value); setExpanded(false) }}
            placeholder={`Filter ${fieldLabel.toLowerCase()}…`}
            className="w-full pl-8 pr-3 py-2 font-body text-xs border border-border-light text-navy-bolder placeholder:text-neutral-subtle outline-none focus:border-navy-subtle transition-colors bg-white"
          />
          {filter && (
            <button
              onClick={() => setFilter('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-subtle hover:text-navy-bolder"
              aria-label="Clear filter"
            >
              <i className="fa-solid fa-xmark text-[10px]" aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <div>
        {visible.map(opt => (
          <FacetCheckbox
            key={opt}
            label={opt}
            count={counts[opt] ?? 0}
            checked={selected.includes(opt)}
            onChange={() => onToggle(opt)}
          />
        ))}
        {filtered.length === 0 && (
          <p className="font-body text-xs text-neutral-subtle py-2 italic">No matches</p>
        )}
      </div>

      {!filter && hiddenCount > 0 && (
        <button
          className="mt-1.5 font-body font-semibold text-xs text-[#0466C8] hover:text-navy-subtle transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'See less' : `See ${hiddenCount} more`}
          <i className={`fa-solid fa-chevron-${expanded ? 'up' : 'down'} text-[10px] ml-1`} aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

/* ── BookGridCard ───────────────────────────────────────────────────────────── */

function BookGridCard({ book }: { book: Book }) {
  return (
    <a href={book.href} className="group flex flex-col gap-3">
      <div className="bg-neutral-subtlest aspect-[2/3] overflow-hidden shadow-sm">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="font-headline text-[20px] leading-snug text-navy-bolder group-hover:text-navy-subtle transition-colors line-clamp-3">
          {book.title}
        </h3>
        <p className="font-body text-xs text-neutral-subtle mt-0.5">{book.author}</p>
        <p className="font-body text-xs text-neutral-subtle">{book.format}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-body font-bold text-sm text-navy-bolder">${book.price.toFixed(2)}</span>
          {book.originalPrice > book.price && (
            <span className="font-body text-xs text-neutral-subtle line-through">${book.originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </a>
  )
}

/* ── FilterChip ─────────────────────────────────────────────────────────────── */

function FilterChip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-surface-subtle border border-border-light px-2.5 py-1 font-body text-xs text-navy-bolder">
      {label}
      <button
        onClick={onRemove}
        className="text-neutral-subtle hover:text-navy-bolder transition-colors flex-shrink-0"
        aria-label={`Remove ${label} filter`}
      >
        <i className="fa-solid fa-xmark text-[10px]" aria-hidden="true" />
      </button>
    </span>
  )
}

/* ── Pager ──────────────────────────────────────────────────────────────────── */

function Pager({
  total,
  perPage,
  page,
  onPageChange,
}: {
  total: number
  perPage: number
  page: number
  onPageChange: (p: number) => void
}) {
  const totalPages = Math.ceil(total / perPage)
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-center gap-1 mt-12 pt-8 border-t border-border-light">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-2 px-4 py-2.5 font-body font-semibold text-sm text-navy-bolder border border-border-light hover:bg-surface-subtle disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true" />
        Previous
      </button>

      <div className="flex items-center gap-1 mx-1">
        {pages.map(p => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 font-body font-semibold text-sm border transition-colors
              ${p === page
                ? 'bg-navy-bolder text-white border-navy-bolder'
                : 'text-navy-bolder border-border-light hover:bg-surface-subtle'
              }`}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-2 px-4 py-2.5 font-body font-semibold text-sm text-navy-bolder border border-border-light hover:bg-surface-subtle disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
      </button>
    </div>
  )
}

/* ── Main layout ────────────────────────────────────────────────────────────── */

interface BooksCollectionLayoutProps {
  books?: Book[]
  showSeriesFacet?: boolean
  showSubjectFacet?: boolean
  showFacetSearch?: boolean
  pageSize?: number
}

export default function BooksCollectionLayout({
  books: sourceBooks = allBooks,
  showSeriesFacet = true,
  showSubjectFacet = true,
  showFacetSearch = true,
  pageSize,
}: BooksCollectionLayoutProps) {
  const [selectedBindings, setSelectedBindings] = useState<Book['format'][]>([])
  const [selectedSeries, setSelectedSeries] = useState<string[]>([])
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedPrices, setSelectedPrices] = useState<number[]>([])
  const [sort, setSort] = useState('featured')
  const [page, setPage] = useState(1)

  const toggleStr = useCallback((
    arr: string[],
    val: string,
    set: (a: string[]) => void,
  ) => {
    set(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  }, [])

  const toggleBinding = (val: Book['format']) => {
    setSelectedBindings(prev =>
      prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]
    )
  }

  const togglePrice = (idx: number) => {
    setSelectedPrices(prev =>
      prev.includes(idx) ? prev.filter(x => x !== idx) : [...prev, idx]
    )
  }

  const clearAll = () => {
    setSelectedBindings([])
    setSelectedSeries([])
    setSelectedSubjects([])
    setSelectedPrices([])
  }

  const hasFilters =
    selectedBindings.length > 0 ||
    selectedSeries.length > 0 ||
    selectedSubjects.length > 0 ||
    selectedPrices.length > 0

  const filtered = useMemo(() => {
    let books = sourceBooks
    if (selectedBindings.length)
      books = books.filter(b => selectedBindings.includes(b.format))
    if (selectedSeries.length)
      books = books.filter(b => b.series != null && selectedSeries.includes(b.series))
    if (selectedSubjects.length)
      books = books.filter(b => b.subjects?.some(s => selectedSubjects.includes(s)))
    if (selectedPrices.length)
      books = books.filter(b =>
        selectedPrices.some(i => b.price >= PRICE_RANGES[i].min && b.price <= PRICE_RANGES[i].max)
      )

    if (sort === 'price-asc') return [...books].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') return [...books].sort((a, b) => b.price - a.price)
    if (sort === 'az') return [...books].sort((a, b) => a.title.localeCompare(b.title))
    return books
  }, [sourceBooks, selectedBindings, selectedSeries, selectedSubjects, selectedPrices, sort])

  // Reset to page 1 whenever filters or sort change
  useEffect(() => { setPage(1) }, [selectedBindings, selectedSeries, selectedSubjects, selectedPrices, sort])

  const pagedBooks = pageSize
    ? filtered.slice((page - 1) * pageSize, page * pageSize)
    : filtered

  const bindingCount = (fmt: Book['format']) => sourceBooks.filter(b => b.format === fmt).length
  const priceCount = (i: number) =>
    sourceBooks.filter(b => b.price >= PRICE_RANGES[i].min && b.price <= PRICE_RANGES[i].max).length

  const startItem = pageSize ? (page - 1) * pageSize + 1 : 1
  const endItem = pageSize ? Math.min(page * pageSize, filtered.length) : filtered.length

  return (
    <div className="container-site py-10 lg:py-12">
      <div className="flex gap-8 lg:gap-10 items-start">

        {/* ── Sidebar ── */}
        <aside className="hidden lg:block w-[220px] xl:w-[240px] flex-shrink-0">

          <div className="flex items-center justify-between mb-3 pb-3 border-b-2 border-[#0466C8]">
            <h2 className="font-body font-extrabold text-sm uppercase tracking-[0.08em] text-navy-bolder">
              Filter By
            </h2>
            {hasFilters && (
              <button
                onClick={clearAll}
                className="font-body font-semibold text-xs text-[#0466C8] hover:text-navy-subtle transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <Accordion title="Binding">
            {BINDING_OPTIONS.map(opt => (
              <FacetCheckbox
                key={opt}
                label={opt}
                count={bindingCount(opt)}
                checked={selectedBindings.includes(opt)}
                onChange={() => toggleBinding(opt)}
              />
            ))}
          </Accordion>

          {showSeriesFacet && (
            <Accordion title="Series">
              <FilterableFacetGroup
                options={SERIES_FACETS}
                selected={selectedSeries}
                onToggle={val => toggleStr(selectedSeries, val, setSelectedSeries)}
                books={sourceBooks}
                field="series"
                fieldLabel="Series"
                showSearch={showFacetSearch}
              />
            </Accordion>
          )}

          {showSubjectFacet && (
            <Accordion title="Subject">
              <FilterableFacetGroup
                options={SUBJECT_FACETS}
                selected={selectedSubjects}
                onToggle={val => toggleStr(selectedSubjects, val, setSelectedSubjects)}
                books={sourceBooks}
                field="subjects"
                fieldLabel="Subject"
                showSearch={showFacetSearch}
              />
            </Accordion>
          )}

          <Accordion title="Price">
            {PRICE_RANGES.map((range, i) => (
              <FacetCheckbox
                key={range.label}
                label={range.label}
                count={priceCount(i)}
                checked={selectedPrices.includes(i)}
                onChange={() => togglePrice(i)}
              />
            ))}
          </Accordion>
        </aside>

        {/* ── Main content ── */}
        <div className="flex-1 min-w-0">

          {/* Toolbar */}
          <div className="flex items-center justify-between mb-5 pb-4 border-b border-border-light gap-4">
            <p className="font-body text-sm text-neutral-subtle">
              {pageSize && filtered.length > 0 ? (
                <>
                  Showing{' '}
                  <span className="font-semibold text-navy-bolder">{startItem}–{endItem}</span>
                  {' '}of{' '}
                  <span className="font-semibold text-navy-bolder">{filtered.length}</span>
                  {' '}results
                </>
              ) : (
                <>
                  Showing{' '}
                  <span className="font-semibold text-navy-bolder">{filtered.length}</span>{' '}
                  {filtered.length === 1 ? 'result' : 'results'}
                  {sourceBooks.length !== filtered.length && (
                    <> of <span className="font-semibold text-navy-bolder">{sourceBooks.length}</span></>
                  )}
                </>
              )}
            </p>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <label className="font-body text-sm text-neutral-subtle whitespace-nowrap">Sort by:</label>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="font-body text-sm text-navy-bolder border border-border-light px-3 py-1.5 outline-none focus:border-navy-subtle bg-white cursor-pointer"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Active filter chips */}
          {hasFilters && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedBindings.map(v => (
                <FilterChip key={`b-${v}`} label={v} onRemove={() => toggleBinding(v)} />
              ))}
              {selectedSeries.map(v => (
                <FilterChip
                  key={`s-${v}`}
                  label={v}
                  onRemove={() => toggleStr(selectedSeries, v, setSelectedSeries)}
                />
              ))}
              {selectedSubjects.map(v => (
                <FilterChip
                  key={`sub-${v}`}
                  label={v}
                  onRemove={() => toggleStr(selectedSubjects, v, setSelectedSubjects)}
                />
              ))}
              {selectedPrices.map(i => (
                <FilterChip
                  key={`p-${i}`}
                  label={PRICE_RANGES[i].label}
                  onRemove={() => togglePrice(i)}
                />
              ))}
            </div>
          )}

          {/* Grid */}
          {pagedBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10">
              {pagedBooks.map(book => (
                <BookGridCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center flex flex-col items-center gap-5">
              <i className="fa-solid fa-book-open text-4xl text-border-light" aria-hidden="true" />
              <div>
                <p className="font-headline text-2xl text-navy-bolder">No books match your filters</p>
                <p className="font-body text-sm text-neutral-subtle mt-1">Try adjusting or clearing your selections.</p>
              </div>
              <button
                onClick={clearAll}
                className="font-body font-semibold text-sm text-[#0466C8] hover:text-navy-subtle transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Pager */}
          {pageSize && (
            <Pager
              total={filtered.length}
              perPage={pageSize}
              page={page}
              onPageChange={p => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
