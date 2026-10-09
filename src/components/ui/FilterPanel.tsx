import { useId, useState, type ReactNode } from 'react'

interface FilterPanelProps {
  /** Number of active filters, shown in the mobile toggle's badge. */
  activeCount: number
  onClearAll: () => void
  children: ReactNode
}

/**
 * Filters sidebar for the listing pages.
 *
 * Desktop keeps the facets open in a left column that scrolls with the page. On mobile the stack
 * would push the results a screen or two down, so it collapses behind a toggle
 * that reports how many filters are on.
 */
export default function FilterPanel({ activeCount, onClearAll, children }: FilterPanelProps) {
  const panelId = useId()
  const [open, setOpen] = useState(false)

  const heading = 'font-headline text-[28px] lg:text-[32px] text-navy-bolder leading-[1.15]'

  return (
    <aside className="w-full lg:w-[300px] xl:w-[320px] lg:flex-shrink-0 flex flex-col gap-5">

      {/* Mobile: the heading is a full-width toggle, with the plus/minus pinned
          to the far right. Desktop: it's just a heading. */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="lg:hidden w-full flex items-center justify-between gap-3 text-left border-b-4 border-[#0466c8] pb-3"
      >
        <span className="flex items-center gap-2.5">
          <span className={heading}>Filters</span>
          {activeCount > 0 && (
            <span className="font-body font-bold text-xs text-white bg-navy-subtle rounded-full px-2 py-0.5">
              {activeCount}
            </span>
          )}
        </span>
        <span
          className="flex-shrink-0 flex items-center justify-center bg-navy-subtle w-7 h-7"
          aria-hidden="true"
        >
          <svg
            className="w-3.5 h-3.5 text-white"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M3 8h10" />
            {!open && <path d="M8 3v10" />}
          </svg>
        </span>
      </button>

      <div className="hidden lg:flex items-center justify-between gap-3 border-b-4 border-[#0466c8] pb-3">
        <h2 className={heading}>Filters</h2>
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="font-body text-sm flex-shrink-0 text-link"
          >
            Clear all
          </button>
        )}
      </div>

      <div id={panelId} className={`${open ? 'flex' : 'hidden'} lg:flex flex-col gap-5`}>
        {/* Desktop keeps this beside the heading; on mobile the heading row is
            the toggle, so it moves into the panel */}
        {activeCount > 0 && (
          <button
            onClick={onClearAll}
            className="lg:hidden self-start font-body text-sm text-link"
          >
            Clear all
          </button>
        )}
        {children}
      </div>

    </aside>
  )
}
