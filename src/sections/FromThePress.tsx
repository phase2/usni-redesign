import { useState, useRef, useEffect } from 'react'
import CardCta from '@/components/ui/CardCta'
import { allBooks, type Book } from '@/data/books'

// Homepage concept block for the Naval Institute Press team: a featured
// product spotlight on a white panel, a "more like this" carousel beside it,
// and a seasonal coupon alert.

const featured = allBooks.find((b) => b.id === 'nr9')! // AI Warfighting
const similarTitles = ['nr10', 'ex1', 'nr4', 'ex2', 'nr6']
  .map((id) => allBooks.find((b) => b.id === id))
  .filter((b): b is Book => Boolean(b))

function CarouselCard({ book }: { book: Book }) {
  return (
    <a
      href={book.href}
      className="group flex flex-col gap-3 flex-shrink-0 snap-start
        w-[calc((100%-1.5rem)/2)] sm:w-[calc((100%-2*1.5rem)/3)]"
    >
      <div className="bg-neutral-subtlest aspect-[2/3]">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-full object-cover group-hover:-translate-y-2 transition-transform duration-300"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-headline text-[18px] leading-snug text-navy-bolder">
          {book.title}
        </h4>
        <p className="font-body text-sm text-neutral-subtle">{book.format}</p>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="font-body font-bold text-sm text-navy-bolder">${book.price.toFixed(2)}</span>
          <span className="font-body text-[16px] text-neutral-subtle">${book.originalPrice.toFixed(2)}</span>
        </div>
      </div>
    </a>
  )
}

export default function FromThePress() {
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
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? el.clientWidth : -el.clientWidth, behavior: 'smooth' })
    setTimeout(updateArrows, 420)
  }

  const savePercent = Math.round((1 - featured.price / featured.originalPrice) * 100)

  return (
    <section className="bg-[#ebf4ff] py-16 lg:py-20">
      <div className="container-site">

        {/* ── Section header ── */}
        <div className="border-t-2 border-navy-bold pt-8 flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-8">
          <div className="flex-1">
            <p className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-2">
              Naval Institute Press
            </p>
            <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">
              From the Press
            </h2>
          </div>
          <div className="flex-1 mt-6 lg:mt-0 flex flex-col gap-5 justify-start">
            <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed">
              For more than 120 years, the Naval Institute Press has published the books that shape
              the sea services &mdash; from professional guides and history to the ideas defining
              tomorrow's fight.
            </p>
            <CardCta href="/books">
              Browse Books &amp; Press
            </CardCta>
          </div>
        </div>

        {/* ── Featured spotlight + carousel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 xl:gap-12 items-stretch">

          {/* Featured product — white panel, cover stage over info */}
          <div className="bg-white border border-navy-subtle flex flex-col">

            {/* Cover stage — the cover floats over a blurred, scaled copy of itself
                and sits flush to the bottom edge, so it reads as standing on the
                info block rather than floating in a box. */}
            <div className="relative overflow-hidden border-b border-navy-subtle px-6 pt-10 lg:pt-12 flex items-end justify-center">
              {/* Blurred backdrop. Inset negatively so the blur's soft edges fall
                  outside the clip and don't vignette against the card border, and
                  scaled well past 100% so it reads as a zoomed crop of colour
                  rather than a recognisable second copy of the cover. */}
              <div
                aria-hidden="true"
                className="absolute -inset-16 bg-cover bg-center blur-xl scale-150 saturate-150"
                style={{ backgroundImage: `url(${featured.image})` }}
              />
              {/* Vignette so the sharp cover reads forward off the backdrop */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-b from-navy-boldest/25 via-navy-boldest/5 to-navy-boldest/45"
              />
              <a href={featured.href} className="relative block w-44 lg:w-52">
                <img
                  src={featured.image}
                  alt={`${featured.title} cover`}
                  className="w-full ring-1 ring-black/25 hover:opacity-90 transition-opacity
                    shadow-[0_10px_18px_-4px_rgba(0,0,0,0.45),0_28px_60px_-10px_rgba(0,0,0,0.55)]"
                />
              </a>
            </div>

            {/* Product info, stacked beneath the cover */}
            <div className="flex flex-col gap-3 p-6 lg:p-8">
              <p className="font-body font-bold text-eyebrow uppercase text-neutral-subtle">
                Featured Release
              </p>
              <h3 className="font-headline text-[26px] lg:text-[30px] text-navy-bolder leading-[1.15]">
                <a href={featured.href} className="hover:text-navy-bright transition-colors">
                  {featured.title}
                </a>
              </h3>
              <p className="font-body text-base text-neutral-subtle leading-snug">
                Autonomous Weapons and the Future of Naval Conflict
              </p>
              <p className="font-body text-sm text-navy-subtle">
                By Matthew Moellering and Genna Moellering
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="font-headline text-[28px] text-navy-bolder leading-none">
                  ${featured.price.toFixed(2)}
                </span>
                <span className="font-body text-[16px] text-neutral-subtle">
                  ${featured.originalPrice.toFixed(2)}
                </span>
                <span className="font-body text-xs font-bold text-[#0a5c2e] bg-[#e6f7ed] px-2 py-1">
                  Members save {savePercent}%
                </span>
              </div>
              <div className="pt-1">
                <a
                  href={featured.href}
                  className="inline-flex items-center font-body font-bold text-base bg-navy-bolder text-white px-6 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
                >
                  View the Book
                </a>
              </div>
            </div>
          </div>

          {/* More like this — carousel, with the seasonal coupon alert above it */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3 bg-[#FFF9EB] border border-l-4 border-gold px-5 py-3 mb-6">
              <p className="font-body text-base text-navy-bolder">
                <span className="font-bold">Summer Reading Sale:</span> Take 25% off all Press titles with code{' '}
                <span className="font-mono font-bold text-navy-bolder border border-dashed border-gold-dark bg-white px-2 py-0.5">
                  SUMMER25
                </span>{' '}
                at checkout through Labor Day.
              </p>
            </div>

            <div className="flex items-center justify-between gap-4 mb-5">
              <h3 className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-bolder">
                More Like This
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className="w-9 h-9 rounded-full bg-white border border-[#0466C8] flex items-center justify-center
                             text-navy-bolder hover:bg-light-blue transition-colors
                             disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Scroll to previous books"
                >
                  <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true" />
                </button>
                <button
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className="w-9 h-9 rounded-full bg-white border border-[#0466C8] flex items-center justify-center
                             text-navy-bolder hover:bg-light-blue transition-colors
                             disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Scroll to more books"
                >
                  <i className="fa-solid fa-chevron-right text-sm" aria-hidden="true" />
                </button>
              </div>
            </div>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              onScroll={updateArrows}
            >
              {similarTitles.map((book) => (
                <CarouselCard key={book.id} book={book} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
