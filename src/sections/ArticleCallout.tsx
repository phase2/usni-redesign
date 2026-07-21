interface ArticleCalloutProps {
  children: React.ReactNode
  className?: string
}

/**
 * Print-style sidebar panel (the "Aristotle Says" box): light tan field with
 * an inset tan border. On desktop it floats right, flush with the reading
 * column's right edge — sitting directly across the 30px gutter from the ad
 * rail — and the article text wraps around it; below lg it sits in the
 * normal flow. It deliberately never hangs into the rail, so it can't
 * collide with the ads.
 */
export default function ArticleCallout({ children, className = '' }: ArticleCalloutProps) {
  return (
    <aside className={`bg-tan-subtlest p-1.5 lg:float-right lg:w-[400px] lg:ml-8 lg:mb-2 ${className}`}>
      <div className="border border-tan-subtle px-5 py-5 lg:px-6 lg:py-6 font-body text-[14px] lg:text-[15px] text-[#1d2535] leading-[1.7] space-y-3">
        {children}
      </div>
    </aside>
  )
}
