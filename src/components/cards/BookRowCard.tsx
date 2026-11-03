import type { Book } from '@/data/books'
import BookPrice from '@/components/ui/BookPrice'

/**
 * A book as a horizontal row: the cover on the left, title and details beside
 * it. For narrow spaces such as a side rail, where `BookGridCard`'s stacked
 * layout would leave a postage-stamp cover. Type matches `BookGridCard`.
 */
export default function BookRowCard({ book }: { book: Book }) {
  return (
    <a href={book.href} className="group flex items-start gap-5">
      <div className="bg-neutral-subtlest aspect-[2/3] w-[110px] flex-shrink-0">
        <img
          src={book.image}
          alt={book.title}
          /* Same lift-and-shadow hover as BookGridCard, scaled to the smaller cover. */
          className="w-full h-full object-cover transition-[transform,box-shadow] duration-300
            shadow-[0_2px_8px_rgba(0,18,51,0.14)]
            group-hover:-translate-y-1 group-hover:shadow-[0_8px_20px_rgba(0,18,51,0.22)]"
        />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <h3 className="font-headline text-[20px] leading-snug text-navy-bolder line-clamp-3">
          <span className="article-link article-link--card">{book.title}</span>
        </h3>
        <p className="font-body text-sm font-medium text-neutral-subtle leading-snug mt-0.5">{book.author}</p>
        <p className="font-body text-sm text-neutral-subtle mt-1">{book.format}</p>
        <div className="mt-2">
          <BookPrice listPrice={book.originalPrice} memberPrice={book.price} />
        </div>
      </div>
    </a>
  )
}
