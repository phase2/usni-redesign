import { useId, useMemo, useState } from 'react'
import { AccordionChevron, type FacetOption } from '@/components/ui/FacetGroup'
import { issueLabel, issueSortKey } from '@/data/siteSearch'

/**
 * The Issue filter on Browse All Articles: a range of issues, set as a From
 * month and year and a To month and year — four selects in place of a
 * checkbox per issue, of which there are nearly 1,800 back to 1874.
 *
 * Each end applies as soon as its month and year are both set; either alone
 * leaves the range open on the other side ("From June 1944"). The lists offer
 * only what exists for the current results — the year lists the years with an
 * issue, the month lists that year's issues with their article counts — and
 * keep the two ends in order: a From month after the To month is disabled, and
 * the other way round. Changing a year keeps the month if that year has it.
 * Availability follows the other filters (the counts are disjunctive, as in
 * every facet).
 *
 * The range is a pair of keys, `from` and `to`, as `YYYY-MM`. Shares
 * FacetGroup's accordion row, so the column reads as one set of filters.
 */

export interface IssueRange {
  /** `YYYY-MM`, inclusive. */
  from: string
  to: string
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Bounds a range open at one end carries — a link may give only `from` or `to`. */
const OPEN_FROM = '0000-01'
const OPEN_TO = '9999-12'

/** "June 1944 – August 1945", one issue alone, or "From June 1944" for an open end. */
export const rangeLabel = (r: IssueRange) => {
  if (r.from === OPEN_FROM) return `Up to ${issueLabel(r.to)}`
  if (r.to === OPEN_TO) return `From ${issueLabel(r.from)}`
  return r.from === r.to ? issueLabel(r.from) : `${issueLabel(r.from)} – ${issueLabel(r.to)}`
}

const keyOf = (year: string, month: string) => `${year}-${String(Number(month) + 1).padStart(2, '0')}`

/** One end of the range as select values: a month index and a year, or blanks. */
interface End {
  month: string
  year: string
}

const endOf = (key: string | undefined, open: string): End =>
  !key || key === open ? { month: '', year: '' } : { month: String(Number(key.slice(5, 7)) - 1), year: key.slice(0, 4) }

const keyOfEnd = (end: End) => (end.month !== '' && end.year ? keyOf(end.year, end.month) : null)

const selectClass =
  'select-field w-full font-body text-sm text-navy-bolder border border-[#94A3B8] pl-3 py-2 bg-white outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition disabled:bg-surface-subtle disabled:text-neutral-subtle'

function EndSelects({
  legend,
  end,
  onChange,
  counts,
  years,
  allows,
}: {
  legend: string
  end: End
  onChange: (end: End) => void
  counts: Map<string, number>
  /** Years with an issue, newest first. */
  years: string[]
  /** Whether this end may sit on an issue, given the other end. */
  allows: (key: string) => boolean
}) {
  const yearOpen = (y: string) => MONTHS.some((_, m) => counts.has(keyOf(y, String(m))) && allows(keyOf(y, String(m))))
  const monthOpen = (m: number) => !!end.year && counts.has(keyOf(end.year, String(m))) && allows(keyOf(end.year, String(m)))

  return (
    <fieldset className="flex flex-col gap-1.5">
      <legend className="font-body font-semibold text-xs text-navy-bolder mb-1.5">{legend}</legend>
      <div className="grid grid-cols-[1fr_6.5rem] gap-2">
        <select
          value={end.month}
          onChange={(e) => onChange({ ...end, month: e.target.value })}
          disabled={!end.year}
          aria-label={`${legend} month`}
          className={selectClass}
        >
          <option value="">Month</option>
          {MONTHS.map((name, m) => {
            const count = end.year ? counts.get(keyOf(end.year, String(m))) : undefined
            return (
              <option key={name} value={m} disabled={!monthOpen(m)}>
                {count === undefined ? name : `${name} (${count.toLocaleString()})`}
              </option>
            )
          })}
        </select>
        <select
          value={end.year}
          onChange={(e) => {
            const year = e.target.value
            // Keep the month if the new year has that issue.
            const keep = year && end.month !== '' && counts.has(keyOf(year, end.month)) && allows(keyOf(year, end.month))
            onChange({ year, month: keep ? end.month : '' })
          }}
          aria-label={`${legend} year`}
          className={selectClass}
        >
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y} disabled={!yearOpen(y)}>
              {y}
            </option>
          ))}
        </select>
      </div>
    </fieldset>
  )
}

export default function IssueRangePicker({
  title,
  options,
  value,
  onChange,
  defaultOpen = false,
}: {
  title: string
  /** Issues with their article counts, as "December 1912". */
  options: FacetOption[]
  value: IssueRange | null
  onChange: (range: IssueRange | null) => void
  defaultOpen?: boolean
}) {
  const id = useId()
  const [open, setOpen] = useState(defaultOpen)

  // The selects are the reader's until an end is complete; the URL is the filter.
  const fromValue = () => endOf(value?.from, OPEN_FROM)
  const toValue = () => endOf(value?.to, OPEN_TO)
  const [from, setFrom] = useState<End>(fromValue)
  const [to, setTo] = useState<End>(toValue)
  const valueKey = value ? `${value.from}|${value.to}` : ''
  const [lastValue, setLastValue] = useState(valueKey)
  if (valueKey !== lastValue) {
    setLastValue(valueKey)
    setFrom(fromValue())
    setTo(toValue())
  }

  const counts = useMemo(() => new Map(options.map((o) => [issueSortKey(o.value), o.count])), [options])
  const years = useMemo(
    () => [...new Set([...counts.keys()].map((k) => k.slice(0, 4)))].sort((a, b) => Number(b) - Number(a)),
    [counts],
  )

  const fromKey = keyOfEnd(from)
  const toKey = keyOfEnd(to)

  /** Applies whichever ends are complete. */
  const apply = (nextFrom: End, nextTo: End) => {
    const f = keyOfEnd(nextFrom)
    const t = keyOfEnd(nextTo)
    const next = f || t ? { from: f ?? OPEN_FROM, to: t ?? OPEN_TO } : null
    const nextKey = next ? `${next.from}|${next.to}` : ''
    if (nextKey !== valueKey) onChange(next)
  }

  if (options.length === 0 && !value) {
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
          {value && (
            <span className="accordion-count font-body font-bold text-xs text-white bg-navy-subtle rounded-full px-2 py-0.5">
              1
            </span>
          )}
        </span>
        <AccordionChevron open={open} />
      </button>

      {open && (
        <div id={id} className="px-3 pt-3 pb-4 flex flex-col gap-4">
          <EndSelects
            legend="From"
            end={from}
            counts={counts}
            years={years}
            allows={(k) => !toKey || k <= toKey}
            onChange={(end) => {
              setFrom(end)
              apply(end, to)
            }}
          />
          <EndSelects
            legend="To"
            end={to}
            counts={counts}
            years={years}
            allows={(k) => !fromKey || k >= fromKey}
            onChange={(end) => {
              setTo(end)
              apply(from, end)
            }}
          />

          {!value && (
            <p className="font-body text-xs text-neutral-subtle leading-relaxed">
              Set a From month and year, a To month and year, or both.
            </p>
          )}
        </div>
      )}
    </div>
  )
}
