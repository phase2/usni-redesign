import type { ReactNode } from 'react'

/**
 * Where a component or pattern lives in the prototype source.
 *
 * Used two ways: for the canonical implementation a developer should build
 * from, and — for patterns the prototype repeats as near-copies rather than one
 * shared component — the list of copies that have drifted from it, so the
 * production build ends up with one template instead of inheriting the drift.
 */
export interface SourceItem {
  /** Repo-relative path, e.g. "src/sections/DonateFAQ.tsx". */
  path: string
  note?: ReactNode
}

export default function SourceList({
  title,
  items,
  tone = 'canonical',
}: {
  title: string
  items: SourceItem[]
  /** `canonical` for the version to build from; `drift` for the copies. */
  tone?: 'canonical' | 'drift'
}) {
  const drift = tone === 'drift'
  return (
    <div className={`border-l-4 ${drift ? 'border-gold' : 'border-[#0466C8]'} bg-white border-y border-r border-border-light px-5 py-4`}>
      <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-navy-bolder mb-3">{title}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.path} className="font-body text-sm text-neutral-subtle leading-relaxed">
            <code className="font-mono text-xs text-navy-subtle break-all">{item.path}</code>
            {item.note && <span> — {item.note}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}
