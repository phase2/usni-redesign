import type { Book } from '@/data/books'
import BookPrice from '@/components/ui/BookPrice'

/**
 * A book in a grid: cover, title, author, format, and price. Shared by the
 * collection results and the "Books by …" list on a person page.
 */
export default function BookGridCard({ book }: { book: Book }) {
  return (
    <a href={book.href} className="group flex flex-col gap-3">
      {/* No overflow-hidden: the cover lifts out of the aspect box on hover and
          the deepened shadow falls outside it, matching the issue archives. */}
      <div className="bg-neutral-subtlest aspect-[2/3]">
        <img
          src={book.image}
          alt={book.title}
          /* Shadow lives on the image, not the box, so it travels with the lift.
             Hand-rolled rather than shadow-sm/shadow-xl: those carry a negative
             spread and a downward offset, which on a tall cover pools the blur
             under the bottom edge and pinches it out at the corners. */
          className="w-full h-full object-cover transition-[transform,box-shadow] duration-300
            shadow-[0_2px_8px_rgba(0,18,51,0.14)]
            group-hover:-translate-y-2 group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <h3 className="font-headline text-[20px] leading-snug text-navy-bolder line-clamp-3">
          {/* Inner span, as on the essay-contest and issue cards: the underline
              is a background gradient, and `clone` only splits it per line on an
              inline box. Putting it on the clamped h3 itself would draw one bar
              under the whole block instead. */}
          <span className="article-link article-link--card">{book.title}</span>
        </h3>
        {/* 14px floor for both lines; the author takes medium weight and a
            small gap above the format so the two read as separate facts. */}
        <p className="font-body text-sm font-medium text-neutral-subtle leading-snug mt-0.5">{book.author}</p>
        <p className="font-body text-sm text-neutral-subtle mt-1">{book.format}</p>
        <div className="mt-2">
          <BookPrice listPrice={book.originalPrice} memberPrice={book.price} />
        </div>
      </div>
    </a>
  )
}
