import type { ReactNode } from 'react'

/**
 * A developer callout: implementation guidance for the Drupal / Twig build —
 * which parts of a snippet become template variables or fields, what behaviour
 * needs JavaScript, accessibility requirements that the markup alone does not
 * carry. Kept visually distinct from the doc prose so it can be scanned for.
 */
export default function DevNote({ title = 'For the Drupal build', children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="bg-[#EBF4FF] border-l-4 border-[#0466C8] px-5 py-4">
      <p className="font-body font-bold text-sm text-navy-bolder mb-1.5 flex items-center gap-2">
        <i className="fa-solid fa-code text-xs text-[#0466C8]" aria-hidden="true" />
        {title}
      </p>
      <div className="font-body text-sm text-neutral-bold leading-relaxed flex flex-col gap-2">{children}</div>
    </aside>
  )
}
