export interface TimelineItem {
  year: string
  label: string
}

interface ArticleTimelineProps {
  eyebrow?: string
  items: TimelineItem[]
  caption?: string
}

/**
 * Horizontal milestone strip (vertical rail on mobile) — turns a run of dated
 * events into a designed pause point within an article.
 */
export default function ArticleTimeline({ eyebrow, items, caption }: ArticleTimelineProps) {
  return (
    <div className="bg-[#EBF4FF] p-6 lg:p-8">
      {eyebrow && (
        <p className="font-body font-bold text-[13px] uppercase tracking-[0.1em] text-navy-bolder mb-8">
          {eyebrow}
        </p>
      )}

      {/* Desktop: horizontal strip */}
      <ol className="hidden lg:flex relative">
        {/* connector line */}
        <span className="absolute top-[7px] left-0 right-0 h-px bg-navy-bolder/20" aria-hidden="true" />
        {items.map((item) => (
          <li key={item.year + item.label} className="flex-1 relative flex flex-col items-start pr-6">
            <span
              className="relative z-10 inline-block bg-[#0466c8] rounded-full flex-shrink-0"
              style={{ width: 15, height: 15 }}
              aria-hidden="true"
            />
            <p className="font-body font-bold text-[15px] text-navy-bolder mt-3">{item.year}</p>
            <p className="font-body text-sm text-neutral-subtle leading-snug mt-1">{item.label}</p>
          </li>
        ))}
      </ol>

      {/* Mobile: vertical rail */}
      <ol className="lg:hidden border-l-2 border-navy-bolder/20 ml-[7px] space-y-6">
        {items.map((item) => (
          <li key={item.year + item.label} className="relative pl-6">
            <span
              className="absolute -left-[8.5px] top-[3px] inline-block bg-[#0466c8] rounded-full"
              style={{ width: 15, height: 15 }}
              aria-hidden="true"
            />
            <p className="font-body font-bold text-[15px] text-navy-bolder">{item.year}</p>
            <p className="font-body text-sm text-neutral-subtle leading-snug mt-0.5">{item.label}</p>
          </li>
        ))}
      </ol>

      {caption && (
        <p className="font-body text-xs text-neutral-subtle/70 mt-7">{caption}</p>
      )}
    </div>
  )
}
