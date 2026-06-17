import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { aiWarfightingBook } from '@/data/bookProductData'
import type { BookProductData } from '@/data/bookProductData'

const BOOK_CATALOG: Record<string, BookProductData> = {
  'ai-warfighting': aiWarfightingBook,
}

export default function BooksCartItems() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setCartCount } = useCart()

  const bookId   = searchParams.get('id')     ?? ''
  const format   = searchParams.get('format') ?? 'Hardcover'
  const price    = searchParams.get('price')  ?? '0'
  const priceNum = Number(price)

  const book = BOOK_CATALOG[bookId]

  const [qty, setQty]     = useState(1)
  const [removed, setRemoved] = useState(false)

  const subtotal = priceNum * qty

  useEffect(() => {
    setCartCount(removed ? 0 : 1)
  }, [removed, setCartCount])

  const handleCheckout = () => {
    const params = new URLSearchParams({ id: bookId, format, price, qty: String(qty) })
    navigate(`/books/checkout?${params.toString()}`)
  }

  if (removed) {
    return (
      <section className="bg-white py-16">
        <div className="container-site flex flex-col gap-8">
          <div className="border-b border-[#0466c8] pb-6">
            <h2 className="font-headline text-[56px] text-[#1d2535] leading-[1.1]">Cart items</h2>
          </div>
          <p className="font-body text-[20px] text-[#4e576a]">Your cart is empty.</p>
          <div className="border-t border-[#999fad] pt-8">
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-[#f0f4f8] transition-colors"
            >
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 6H2M6 2L2 6l4 4" />
              </svg>
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16">
      <div className="container-site flex flex-col gap-8">

        {/* Cart items heading */}
        <div className="border-b border-[#0466c8] pb-6">
          <h2 className="font-headline text-[56px] text-[#1d2535] leading-[1.1]">Cart items</h2>
        </div>

        {/* Book row */}
        <div className="border border-[#c4c9d4] p-6 flex gap-6 items-start">

          {/* Cover thumbnail */}
          {book?.coverImage && (
            <a href={`/books/${bookId}`} className="flex-shrink-0 w-24">
              <img
                src={book.coverImage}
                alt={`${book?.title ?? 'Book'} cover`}
                className="w-24 shadow-md object-cover"
              />
            </a>
          )}

          {/* Book info */}
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <a href={`/books/${bookId}`} className="font-headline text-[22px] text-[#023e7d] leading-[1.2] hover:underline">
              {book?.title ?? 'Book'}
            </a>
            {book?.subtitle && (
              <p className="font-body text-[14px] text-[#4e576a] leading-[1.4]">{book.subtitle}</p>
            )}
            {book?.authors && (
              <p className="font-body text-[14px] text-[#4e576a]">
                By {book.authors.map(a => a.name).join(', ')}
              </p>
            )}
            <p className="font-body text-[14px] text-[#4e576a]">
              Format: <span className="font-bold text-[#1d2535]">{format}</span>
            </p>

            {/* Price */}
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-headline text-[22px] text-[#1d2535]">${priceNum.toFixed(2)}</span>
              <span className="font-body text-[13px] text-[#4e576a]">each</span>
            </div>

            {/* Quantity + remove */}
            <div className="flex items-center gap-6 mt-3">
              {/* Qty stepper */}
              <div className="flex items-center border border-[#c4c9d4]">
                <button
                  type="button"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-[#1d2535] hover:bg-[#f0f4f8] transition-colors font-body text-lg font-bold"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="w-10 h-10 flex items-center justify-center font-body font-bold text-[16px] text-[#1d2535] border-x border-[#c4c9d4]">
                  {qty}
                </span>
                <button
                  type="button"
                  onClick={() => setQty(q => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-[#1d2535] hover:bg-[#f0f4f8] transition-colors font-body text-lg font-bold"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                type="button"
                onClick={() => setRemoved(true)}
                className="flex items-center gap-1.5 font-body text-[14px] text-[#c0392b] hover:text-[#922b21] transition-colors"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
                Remove
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="flex-shrink-0 text-right flex flex-col gap-1">
            <p className="font-body text-[13px] text-[#4e576a] uppercase tracking-wide">Subtotal</p>
            <p className="font-headline text-[28px] text-[#1d2535]">${subtotal.toFixed(2)}</p>
          </div>

        </div>

        {/* Navigation */}
        <div className="border-t border-[#999fad] pt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/books')}
            className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-[#f0f4f8] transition-colors"
          >
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H2M6 2L2 6l4 4" />
            </svg>
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={handleCheckout}
            className="flex items-center gap-2 bg-[#002b5c] text-white font-body font-extrabold text-[20px] py-4 px-8 hover:bg-[#023e7d] transition-colors"
          >
            Continue to Checkout
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
