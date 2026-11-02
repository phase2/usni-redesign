import InlineItalics from '@/components/ui/InlineItalics'
import type { BookReview } from '@/data/bookProductData'

interface Props {
  reviews: BookReview[]
}

/** Editorial blurbs from the live listing, set as attributed quotes. */
export default function BookProductReviews({ reviews }: Props) {
  return (
    <section className="bg-white pb-12 lg:pb-16">
      <div className="container-site">
        <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder mb-8">
          Editorial Reviews
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {reviews.map((review) => (
            <figure key={review.attribution} className="border-l-4 border-gold pl-6 py-1">
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
      </div>
    </section>
  )
}
