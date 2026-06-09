import { useState, useRef, useEffect } from 'react'
import type { Book } from '@/data/books'

function BookCard({ book }: { book: Book }) {
  return (
    <a
      href={book.href}
      className="group flex flex-col gap-3 flex-shrink-0
        w-[calc((100%-2*1.5rem)/3)]
        sm:w-[calc((100%-3*1.5rem)/4)]
        lg:w-[calc((100%-5*1.5rem)/6)]"
    >
      <div className="bg-neutral-subtlest aspect-[2/3]">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:-translate-y-2 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-headline text-base lg:text-lg text-navy-bolder leading-snug group-hover:text-navy-subtle transition-colors">
          {book.title}
        </h3>
        <p className="font-body text-sm text-neutral-subtle">{book.format}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-body font-bold text-sm text-navy-bolder">${book.price.toFixed(2)}</span>
          <span className="font-body text-sm text-neutral-subtle line-through">${book.originalPrice.toFixed(2)}</span>
        </div>
      </div>
    </a>
  )
}

interface BooksProductSectionProps {
  title: string
  seeAllLabel: string
  seeAllHref: string
  books: Book[]
  background?: 'white' | 'subtle'
}

export default function BooksProductSection({
  title,
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
    el.scrollBy({ left: dir === 'right' ? el.clientWidth * 0.75 : -el.clientWidth * 0.75, behavior: 'smooth' })
    setTimeout(updateArrows, 420)
  }

  return (
    <section className={`py-14 lg:py-16 ${background === 'subtle' ? 'bg-surface-subtle' : 'bg-white'}`}>
      <div className="container-site">

        {/* Section header */}
        <div className="flex items-end justify-between pb-4 border-b-2 border-[#0466C8]">
          <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-tight">
            {title}
          </h2>
          <a
            href={seeAllHref}
            className="font-body font-semibold text-sm text-[#0466C8] hover:text-navy transition-colors whitespace-nowrap flex items-center gap-1.5"
          >
            {seeAllLabel}
            <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
          </a>
        </div>

        {/* Carousel */}
        <div className="relative mt-8">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-[40%] -translate-y-1/2 z-10
                         w-10 h-10 rounded-full bg-white border border-border-light shadow-md
                         flex items-center justify-center text-navy-bolder hover:bg-surface-subtle
                         transition-colors"
              aria-label="Scroll left"
            >
              <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
            onScroll={updateArrows}
          >
            {books.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {canScrollRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-[40%] -translate-y-1/2 z-10
                         w-10 h-10 rounded-full bg-white border border-border-light shadow-md
                         flex items-center justify-center text-navy-bolder hover:bg-surface-subtle
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
