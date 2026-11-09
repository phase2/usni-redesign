import { useId, useState, type ReactNode } from 'react'
import FilterPanel from '@/components/ui/FilterPanel'
import IssueCoverCard from '@/components/ui/IssueCoverCard'
import Pagination from '@/components/ui/Pagination'
import { ResultsCount } from '@/components/ui/ResultsList'

export interface ArchiveIssue {
  month: string
  year: number
  vol: string
  cover: string
  href: string
}

/** Covers per page, as on staging. */
const PER_PAGE = 12

const selectClasses =
  'select-field w-full font-body text-base text-navy-bolder border border-[#94A3B8] pl-3.5 pr-8 py-2.5 ' +
  'bg-white cursor-pointer outline-none focus:border-navy-bright ' +
  'focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition'

function FilterSelect({
  id,
  label,
  value,
  onChange,
  allLabel,
  options,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  allLabel: string
  options: string[]
}) {
  return (
    <div className="flex flex-col gap-1.5 border-b border-border-light pb-5">
      <label htmlFor={id} className="font-body font-semibold text-sm text-navy-bolder">
        {label}
      </label>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)} className={selectClasses}>
        <option value="all">{allLabel}</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

/**
 * A magazine's All Issues archive: the Year and Month filters in the listing
 * rail (FilterPanel), and the covers beside them under a results count, twelve
 * to a page.
 *
 * The filters were a row of selects above the covers until staging moved them
 * into the rail in November 2026, which builds more simply as the same filter
 * region every other listing uses. As there, the rail is a left column on
 * desktop and collapses behind a "Filters +" toggle above the results on
 * mobile, with filters first in the DOM so reading and focus order match.
 */
export default function IssueArchive({
  magazine,
  issues,
  years,
  months,
  aspect,
  footer,
}: {
  /** "Proceedings" or "Naval History", for the cover titles and alt text. */
  magazine: string
  issues: ArchiveIssue[]
  years: number[]
  /** The months an issue can fall in. */
  months: string[]
  /** The covers' aspect ratio class. */
  aspect: string
  /** Below the pagination, e.g. a donor credit. */
  footer?: ReactNode
}) {
  const idPrefix = useId()
  const [year, setYear] = useState('all')
  const [month, setMonth] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = issues.filter(
    (issue) =>
      (year === 'all' || issue.year === Number(year)) &&
      (month === 'all' || issue.month === month),
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const pageItems = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const activeCount = (year !== 'all' ? 1 : 0) + (month !== 'all' ? 1 : 0)
  const filterBy = (set: (v: string) => void) => (value: string) => {
    set(value)
    setPage(1)
  }

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12">

        <FilterPanel
          activeCount={activeCount}
          onClearAll={() => {
            setYear('all')
            setMonth('all')
            setPage(1)
          }}
        >
          <FilterSelect
            id={`${idPrefix}-year`}
            label="Year"
            value={year}
            onChange={filterBy(setYear)}
            allLabel="All Years"
            options={years.map(String)}
          />
          <FilterSelect
            id={`${idPrefix}-month`}
            label="Month"
            value={month}
            onChange={filterBy(setMonth)}
            allLabel="All Months"
            options={months}
          />
        </FilterPanel>

        <div className="flex-1 min-w-0">
          <div className="pb-4 border-b border-border-light mb-8" aria-live="polite">
            <ResultsCount page={current} perPage={PER_PAGE} total={filtered.length} noun="issues" />
          </div>

          {pageItems.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-10 lg:gap-y-12">
              {pageItems.map((issue) => (
                <IssueCoverCard
                  key={`${issue.month}-${issue.year}`}
                  href={issue.href}
                  cover={issue.cover}
                  alt={`${magazine} ${issue.month} ${issue.year} cover`}
                  title={`${magazine} – ${issue.month} ${issue.year}`}
                  subtitle={issue.vol}
                  aspect={aspect}
                />
              ))}
            </div>
          ) : (
            <p className="font-body text-lg text-neutral-subtle py-12 text-center">
              No issues match the selected filters.
            </p>
          )}

          <div className="mt-14">
            <Pagination label="Archive pagination" totalPages={totalPages} page={current} onChange={setPage} />
          </div>

          {footer}
        </div>

      </div>
    </section>
  )
}
