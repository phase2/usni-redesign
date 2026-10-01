import type { ReactNode } from 'react'

/**
 * Anatomy of a component: each part, the exact Tailwind classes it carries, and
 * what they are doing. The developer-facing complement to LiveMarkup — the
 * snippet shows the whole tree, this table explains it a part at a time
 * (states, breakpoints, and the reason behind a non-obvious value).
 */
export interface ClassRow {
  /** The element or role, e.g. "Wrapper", "Chevron badge". */
  part: string
  /** Space-separated Tailwind classes (or a global CSS class). */
  classes: string
  note?: ReactNode
}

export default function ClassTable({ rows }: { rows: ClassRow[] }) {
  return (
    <div className="overflow-x-auto border border-border-light bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-subtlest border-b border-border-light">
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[180px]">Part</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Classes</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[34%]">Notes</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.part} className="border-b border-border-light last:border-b-0">
              <td className="font-body font-semibold text-sm text-navy-bolder px-4 py-3 align-top">{row.part}</td>
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-xs text-navy-subtle leading-relaxed break-words">{row.classes}</code>
              </td>
              <td className="font-body text-sm text-neutral-subtle px-4 py-3 align-top leading-relaxed">{row.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
