interface ArticleInBriefProps {
  items: React.ReactNode[]
  readTime?: string
}

/**
 * "In Brief" executive-summary content. Unboxed — the parent supplies the
 * band background and padding. Designed to sit in a row alongside a 300×250
 * ad unit at the top of a feature article.
 */
export default function ArticleInBrief({ items, readTime }: ArticleInBriefProps) {
  return (
    <aside className="h-full">
      <div className="flex items-baseline justify-between gap-4 border-b border-navy-bold pb-4 mb-5">
        <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">
          In Brief
        </h2>
        {readTime && (
          <p className="font-body font-bold text-xs text-navy-bolder flex-shrink-0 flex items-center gap-1.5">
            <i className="fa-regular fa-clock" aria-hidden="true" />
            {readTime}
          </p>
        )}
      </div>
      <ul className="space-y-3.5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span
              className="inline-block flex-shrink-0 bg-[#0466c8] mt-[7px]"
              style={{ width: 8, height: 8 }}
              aria-hidden="true"
            />
            <span className="font-body text-[15px] text-[#1d2535] leading-[1.55]">{item}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}
