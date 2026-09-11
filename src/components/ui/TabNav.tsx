import { useCallback } from 'react'

export interface TabItem {
  /** Stable key, and the basis of the tab / panel element ids. */
  id: string
  label: string
}

/**
 * The site's tab bar: a row of labels over a hairline rule, the selected one
 * carrying a blue underline and a tan ground.
 *
 * The treatment comes from the author tabs on a book product page
 * (`BookProductAuthorBios`), which is the only place the site had tabs until
 * the donor listings needed them. Both render this now, so there is one tab
 * bar rather than two that drift.
 *
 * The caller owns the panel. Give it `role="tabpanel"`, `id={panelId(activeId)}`
 * and `aria-labelledby={tabId(activeId)}` so the pairing is announced.
 *
 * Keyboard behaviour follows the tabs pattern: arrow keys move between tabs,
 * Home and End jump to the ends, and only the selected tab is in the tab order,
 * so a keyboard user tabs past the bar rather than through every label.
 */
export const tabId = (id: string) => `tab-${id}`
export const panelId = (id: string) => `tabpanel-${id}`

export default function TabNav({
  tabs,
  activeId,
  onChange,
  label,
  className = '',
}: {
  tabs: TabItem[]
  activeId: string
  onChange: (id: string) => void
  /** Accessible name for the tab list, e.g. "Donor listing by year". */
  label: string
  className?: string
}) {
  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const i = tabs.findIndex((t) => t.id === activeId)
      const moves: Record<string, number> = {
        ArrowLeft: i - 1,
        ArrowRight: i + 1,
        Home: 0,
        End: tabs.length - 1,
      }
      const next = moves[event.key]
      if (next === undefined) return
      event.preventDefault()
      const target = tabs[Math.max(0, Math.min(tabs.length - 1, next))]
      onChange(target.id)
      // Focus follows selection, as an automatic-activation tab list does.
      document.getElementById(tabId(target.id))?.focus()
    },
    [tabs, activeId, onChange],
  )

  return (
    <div
      role="tablist"
      aria-label={label}
      onKeyDown={onKeyDown}
      className={`flex flex-wrap gap-1 border-b border-navy-bolder/20 ${className}`}
    >
      {tabs.map((tab) => {
        const selected = tab.id === activeId
        return (
          <button
            key={tab.id}
            id={tabId(tab.id)}
            role="tab"
            type="button"
            aria-selected={selected}
            aria-controls={panelId(tab.id)}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={`px-5 py-3 font-body font-semibold text-sm text-left sm:whitespace-nowrap border-b-2 -mb-px transition-colors
              ${selected
                ? 'border-[#0466C8] text-navy-bolder bg-[#E0E0CC]'
                : 'border-transparent text-navy-bolder/40 hover:text-navy-bolder/70'
              }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
