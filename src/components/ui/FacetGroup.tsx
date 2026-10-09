import { useId, useState } from 'react'

/**
 * One group of checkbox facets in a listing's filter column, inside
 * FilterPanel. Site search uses it; it was lifted out of SiteSearch so other
 * listings can share it.
 *
 * An accordion row with the selection count, an optional "Find …" box once
 * the list is long, the first few options, and a Show all toggle for the
 * rest. Counts are the caller's to compute (site search counts
 * disjunctively). A group with nothing to offer renders disabled rather than
 * vanishing, so the column keeps its shape between result sets.
 */

/** Options a facet shows before "Show all". */
const FACET_PREVIEW = 6

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

export interface FacetOption {
  value: string
  count: number
}

/**
 * One facet group: an accordion row, an optional "Find …" box for long lists,
 * the first few options, and a Show all toggle for the rest. Selected options
 * stay listed even when the current results leave them at zero, so a reader
 * can always untick what they ticked.
 */
export default function FacetGroup({
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
  // a podcast, say) stays in the column, disabled, so the sidebar keeps its shape
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
