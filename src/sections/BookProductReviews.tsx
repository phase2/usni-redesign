import { useState } from 'react'
import InlineItalics from '@/components/ui/InlineItalics'
import type { BookReview } from '@/data/bookProductData'

interface Props {
  reviews: BookReview[]
}

/** How many reviews show before "Show all". Four fills two rows of the grid. */
const INITIAL = 4

/**
 * Editorial blurbs from the live listing, set as attributed quotes. A title
 * with a long run of reviews (The Melting Point has 17) shows the first four
 * and expands in place, so the page does not become a wall of quotes.
 */
export default function BookProductReviews({ reviews }: Props) {
  const [expanded, setExpanded] = useState(false)
  const hasMore = reviews.length > INITIAL
  const visible = expanded ? reviews : reviews.slice(0, INITIAL)

  return (
    <section className="bg-white pb-12 lg:pb-16">
      <div className="container-site">
        <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder mb-8">
          Editorial Reviews
        </h2>
        <div id="editorial-reviews-list" className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {visible.map((review) => (
            <figure key={review.attribution + review.quote.slice(0, 24)} className="border-l-4 border-gold pl-6 py-1">
              <blockquote>
                <p className="font-body text-base lg:text-[17px] text-navy-bolder leading-[1.75]">
                  “<InlineItalics text={review.quote} />”
                </p>
              </blockquote>
              <figcaption className="font-body text-sm font-semibold text-neutral-subtle leading-[1.6] mt-4">
                — <InlineItalics text={review.attribution} />
              </figcaption>
            </figure>
          ))}
        </div>
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            aria-controls="editorial-reviews-list"
            className="mt-8 flex items-center gap-2 font-body font-semibold text-sm text-[#023E7D] group"
          >
            <span className="underline group-hover:no-underline">
              {expanded ? 'Show fewer reviews' : `Show all ${reviews.length} reviews`}
            </span>
            <i className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-sm`} aria-hidden="true" />
          </button>
        )}
      </div>
    </section>
  )
}
