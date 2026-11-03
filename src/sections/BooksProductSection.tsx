import { useState, useRef, useEffect } from 'react'
import type { Book } from '@/data/books'
import BookPrice from '@/components/ui/BookPrice'
import BookCoverPlate from '@/components/ui/BookCoverPlate'

function BookCard({ book }: { book: Book }) {
  return (
    <a
      href={book.href}
      className="group flex flex-col gap-3 flex-shrink-0 snap-start
        w-[calc((100%-2*1.5rem)/3)]
        sm:w-[calc((100%-3*1.5rem)/4)]
        lg:w-[calc((100%-5*1.5rem)/6)]"
    >
      <div className="relative bg-neutral-subtlest aspect-[2/3]">
        {book.image ? <img
          src={book.image}
          alt={book.title}
          /* Shadow on the image, not the box, so it travels with the lift.
             Hand-rolled rather than shadow-sm/shadow-xl: those carry a negative
             spread and a downward offset, which on a tall cover pools the blur
             under the bottom edge and pinches it out at the corners. */
          className="w-full h-full object-cover transition-[transform,box-shadow] duration-300
            shadow-[0_2px_8px_rgba(0,18,51,0.14)]
            group-hover:-translate-y-2 group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]"
        /> : (
          <div className="absolute inset-0 transition-transform duration-300 group-hover:-translate-y-2">
            <BookCoverPlate />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-headline text-[20px] leading-snug text-navy-bolder">
          <span className="article-link article-link--card">{book.title}</span>
        </h3>
        <p className="font-body text-sm text-neutral-subtle">{book.format}</p>
        <div className="mt-1">
          <BookPrice listPrice={book.originalPrice} memberPrice={book.price} size="sm" />
        </div>
      </div>
    </a>
  )
}

interface BooksProductSectionProps {
  title: string
  subtitle?: string
  seeAllLabel: string
  seeAllHref: string
  books: Book[]
  background?: 'white' | 'subtle'
}

export default function BooksProductSection({
  title,
  subtitle,
  seeAllLabel,
  seeAllHref,
  books,
  background = 'white',
}: BooksProductSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = () => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    updateArrows()
    const el = scrollRef.current
    if (!el) return
    const observer = new ResizeObserver(updateArrows)
    observer.observe(el)
    return () => observer.disconnect()
  }, [books])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? el.clientWidth : -el.clientWidth, behavior: 'smooth' })
    setTimeout(updateArrows, 420)
  }

  return (
    <section className={`py-14 lg:py-16 ${background === 'subtle' ? 'bg-surface-subtle' : 'bg-white'}`}>
      <div className="container-site">

        {/* Section header */}
        <div className="pb-4 border-b-2 border-[#0466C8]">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1]">
                {title}
              </h2>
              {subtitle && (
                <p className="font-body font-bold text-base text-neutral-subtle mt-1.5">
                  {subtitle}
                </p>
              )}
            </div>
            <a
              href={seeAllHref}
              className="group font-body font-semibold text-sm text-[#0466C8] hover:text-navy transition-colors whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 pb-0.5"
            >
              <span className="relative">
                {seeAllLabel}
                <span className="absolute bottom-0 left-0 h-px w-full bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              </span>
              <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Carousel */}
        <div className="relative mt-8 px-14 lg:px-0">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 lg:-left-14 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 rounded-full bg-white border border-[#0466C8]
                         flex items-center justify-center text-navy-bolder hover:bg-[#EBF4FF]
                         transition-colors"
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true" />
            </button>
          )}

          {/* -mt-7/pt-7 buys the scrollport 28px of headroom above the covers.
              overflow-x: auto forces overflow-y to compute to auto as well, so
              the scrollport clips at the track's top edge — which is exactly
              where a lifted cover and its shadow want to be. The lift is 8px
              and the shadow reaches 16px past it, so 28px clears both; the
              negative margin cancels the padding, leaving spacing unchanged. */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mt-7 pt-7"
            onScroll={updateArrows}
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 lg:-right-14 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 rounded-full bg-white border border-[#0466C8]
                         flex items-center justify-center text-navy-bolder hover:bg-[#EBF4FF]
                         transition-colors"
              aria-label="Scroll right"
            >
              <i className="fa-solid fa-chevron-right text-sm" aria-hidden="true" />
            </button>
          )}
        </div>

      </div>
    </section>
  )
}
