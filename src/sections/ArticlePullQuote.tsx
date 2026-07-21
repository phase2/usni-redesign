interface ArticlePullQuoteProps {
  children: React.ReactNode
  attribution?: string
}

/** Oversized pull quote — a typographic pause point between sections. */
export default function ArticlePullQuote({ children, attribution }: ArticlePullQuoteProps) {
  return (
    <blockquote className="bg-neutral-subtlest p-8 lg:p-10">
      <span className="block w-16 h-1 bg-gold mb-7" aria-hidden="true" />
      <p className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.3]">
        {children}
      </p>
      {attribution && (
        <footer className="font-body font-bold text-sm uppercase tracking-[0.08em] text-neutral-subtle mt-5">
          {attribution}
        </footer>
      )}
    </blockquote>
  )
}
