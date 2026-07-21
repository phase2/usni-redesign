interface ArticleMarginNoteProps {
  term: string
  children: React.ReactNode
}

/**
 * Tufte-style sidenote. On wide (xl+) screens it floats out of the reading
 * column into the right gutter; below that it renders as a small inline aside.
 *
 * Layout contract: the reading column is 760px wide and centered; the note
 * occupies the gutter to the right (230px wide, 30px gap). Blocks that break
 * out of the column (Breakout/full-bleed wrappers) should clear right so a
 * hanging note never overlaps them.
 */
export default function ArticleMarginNote({ term, children }: ArticleMarginNoteProps) {
  return (
    <aside className="border-l-2 border-gold bg-tan-subtlest px-4 py-3 my-4 xl:float-right xl:clear-right xl:w-[230px] xl:-mr-[260px] xl:my-0 xl:ml-4 xl:bg-transparent xl:border-l-2 xl:border-gold xl:pl-4 xl:pr-0 xl:py-0.5">
      <p className="font-body font-bold text-[12px] uppercase tracking-[0.08em] text-navy-bolder mb-1">
        {term}
      </p>
      <p className="font-body text-[13px] text-neutral-subtle leading-[1.6]">{children}</p>
    </aside>
  )
}
