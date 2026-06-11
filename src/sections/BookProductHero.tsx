import { useState } from 'react'
import type { BookProductData } from '@/data/bookProductData'

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = rating >= star
          const half = !filled && rating >= star - 0.5
          return (
            <i
              key={star}
              className={`text-[#d4920a] text-sm ${
                half ? 'fa-solid fa-star-half-stroke' : filled ? 'fa-solid fa-star' : 'fa-regular fa-star'
              }`}
              aria-hidden="true"
            />
          )
        })}
      </div>
      <span className="font-body text-sm text-neutral-subtle">
        {rating} <span className="text-[#c4c9d4]">|</span> {count} reviews
      </span>
    </div>
  )
}

interface Props {
  book: BookProductData
}

export default function BookProductHero({ book }: Props) {
  const [selectedFormat, setSelectedFormat] = useState(0)
  const format = book.formats[selectedFormat]
  const savePercent = Math.round((1 - format.price / format.originalPrice) * 100)

  return (
    <section className="bg-white py-10 lg:py-14">
      <div className="container-site">

        {/* Breadcrumb */}
        <div className="pb-5 mb-8 border-b border-[#e4e7ec]">
          <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 font-body text-sm text-neutral-subtle">
            <a href="/books" className="hover:text-navy-bolder transition-colors">Books & Press</a>
            <span className="text-[#c4c9d4]">/</span>
            {book.categories[0] && (
              <>
                <a href={book.categories[0].href} className="hover:text-navy-bolder transition-colors">
                  {book.categories[0].label}
                </a>
                <span className="text-[#c4c9d4]">/</span>
              </>
            )}
            <span className="text-navy-bolder font-semibold">{book.title}</span>
          </nav>
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-10 xl:gap-16 items-start">

          {/* Cover — sticky on desktop */}
          <div className="lg:sticky lg:top-8">
            <div className="aspect-[2/3] bg-neutral-subtlest shadow-2xl overflow-hidden">
              <img
                src={book.coverImage}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col gap-5">

            {/* Title block */}
            <div>
              <h1 className="font-headline text-[40px] lg:text-[48px] text-navy-bolder leading-[1.1]">
                {book.title}
              </h1>
              {book.subtitle && (
                <p className="font-body font-bold text-lg text-neutral-subtle mt-1.5 leading-[1.4]">
                  {book.subtitle}
                </p>
              )}
            </div>

            {/* Authors */}
            <p className="font-body text-base text-navy-bolder">
              By{' '}
              {book.authors.map((a, i) => (
                <span key={a.name}>
                  <a
                    href="#author-bios"
                    className="text-[#023E7D] underline hover:underline font-semibold"
                  >
                    {a.name}
                  </a>
                  {i < book.authors.length - 2 && ', '}
                  {i === book.authors.length - 2 && ' and '}
                </span>
              ))}
            </p>

            {/* Star rating */}
            <StarRating rating={4.5} count={34} />

            {/* Format selector */}
            <div>
              <p className="font-body text-xs font-semibold uppercase tracking-widest text-neutral-subtle mb-2.5">
                Format
              </p>
              <div className="flex flex-wrap gap-2">
                {book.formats.map((f, i) => (
                  <button
                    key={f.label}
                    onClick={() => setSelectedFormat(i)}
                    className={`px-4 py-2.5 font-body font-semibold text-sm border transition-colors
                      ${selectedFormat === i
                        ? 'border-navy-bolder bg-navy-bolder text-white'
                        : 'border-[#c4c9d4] text-navy-bolder hover:border-navy-bolder bg-white'
                      }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-headline text-[40px] text-navy-bolder leading-none">
                ${format.price.toFixed(2)}
              </span>
              <span className="font-body text-base text-neutral-subtle line-through">
                ${format.originalPrice.toFixed(2)}
              </span>
              <span className="font-body text-sm font-bold text-[#0a7e3f] bg-[#e6f7ed] px-2 py-0.5">
                Save {savePercent}%
              </span>
            </div>

            {/* Member savings note */}
            <p className="font-body text-sm text-neutral-subtle border-l-2 border-gold pl-3">
              <span className="font-semibold text-navy-bolder">USNI members</span> save an additional 10% on all Press titles.{' '}
              <a href="/membership/join" className="text-[#023E7D] underline hover:underline">
                Join today
              </a>
            </p>

            {/* CTA row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href={format.inStock
                  ? `/books/cart?id=${book.id}&format=${encodeURIComponent(format.label)}&price=${format.price}`
                  : undefined
                }
                aria-disabled={!format.inStock}
                className={`flex items-center justify-center gap-2.5 font-body font-bold text-base px-6 py-4 transition-colors
                  ${format.inStock
                    ? 'bg-gold text-navy-bolder hover:bg-gold-dark cursor-pointer'
                    : 'bg-[#c4c9d4] text-white cursor-not-allowed pointer-events-none'
                  }`}
              >
                <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
                {format.inStock ? `Add to Cart — $${format.price.toFixed(2)}` : 'Out of Stock'}
              </a>
              <button className="flex items-center justify-center gap-2 border border-[#c4c9d4] px-5 py-4
                font-body font-semibold text-sm text-navy-bolder hover:border-navy-bolder hover:bg-surface-subtle transition-colors">
                <i className="fa-regular fa-heart" aria-hidden="true" />
                Add to Wishlist
              </button>
            </div>

            {/* Share */}
            <div className="flex items-center gap-3 pt-2">
              <span className="font-body text-xs text-neutral-subtle uppercase tracking-widest">Share</span>
              {[
                { icon: 'fa-brands fa-x-twitter', label: 'Share on X' },
                { icon: 'fa-brands fa-facebook-f', label: 'Share on Facebook' },
                { icon: 'fa-brands fa-linkedin-in', label: 'Share on LinkedIn' },
                { icon: 'fa-solid fa-envelope', label: 'Share by email' },
              ].map(({ icon, label }) => (
                <button
                  key={icon}
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-[#c4c9d4] flex items-center justify-center
                    text-neutral-subtle hover:text-navy-bolder hover:border-navy-bolder transition-colors"
                >
                  <i className={`${icon} text-xs`} aria-hidden="true" />
                </button>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
