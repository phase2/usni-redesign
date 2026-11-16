import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout from '@/components/layout/AccountLayout'
import { AccountCard, EmptyState } from '@/components/ui/AccountCard'
import Alert from '@/components/ui/Alert'
import BookPrice from '@/components/ui/BookPrice'
import { wishlist } from '@/data/account'

/**
 * Wishlist.
 *
 * The book product page has carried an "Add to Wishlist" control with no
 * destination (see BookProductHero); this is where those saves live. Kept as a
 * list rather than a cover grid: the account section is a records view, and the
 * decisions a member makes here — buy it, drop it — need the price and format
 * beside the title, not a larger cover.
 */
export default function AccountWishlist() {
  const [items, setItems] = useState(wishlist)
  /*
   * The removed row is held whole, with the position it came from, so Undo can
   * put it back where it was rather than appending it to the end — the list is
   * ordered by when each book was saved.
   */
  const [removed, setRemoved] = useState<{ entry: (typeof wishlist)[number]; index: number } | null>(null)

  const remove = (id: string) => {
    const index = items.findIndex(i => i.book.id === id)
    if (index === -1) return
    setRemoved({ entry: items[index], index })
    setItems(items.filter(i => i.book.id !== id))
  }

  const undoRemove = () => {
    if (!removed) return
    setItems(current => {
      const next = [...current]
      next.splice(removed.index, 0, removed.entry)
      return next
    })
    setRemoved(null)
  }

  return (
    <AccountLayout
      title="Wishlist"
      lede="Books you've saved from the Naval Institute Press. Member pricing is applied at checkout."
    >
      {/* Removal is the one destructive action on this page and it happens
          without a confirm, so the acknowledgement carries the way back. */}
      {removed && (
        <Alert
          variant="success"
          title={`Removed ${removed.entry.book.title} from your wishlist`}
          action={
            <button
              type="button"
              onClick={undoRemove}
              className="bg-white border border-navy-bolder text-navy-bolder font-body font-bold text-[15px] px-5 py-2.5 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
            >
              Undo
            </button>
          }
        />
      )}

      {items.length === 0 ? (
        <AccountCard>
          <EmptyState
            icon="fa-heart"
            title="Your wishlist is empty"
            action={
              <Link
                to="/press/books"
                className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
              >
                Browse the Press catalogue
              </Link>
            }
          >
            Use the Add to Wishlist control on any book to keep it here.
          </EmptyState>
        </AccountCard>
      ) : (
        <ul className="flex flex-col">
          {items.map(({ book, addedOn }) => (
            <li
              key={book.id}
              className="flex flex-wrap sm:flex-nowrap items-start gap-4 sm:gap-5 py-5 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0"
            >
              {/* Cover thumbnail — small enough to stay a record row, and a
                  link so the whole row isn't one big target competing with
                  the two buttons on the right. */}
              <Link to={book.href} className="flex-shrink-0 w-[68px]" tabIndex={-1} aria-hidden="true">
                <img
                  src={book.image}
                  alt=""
                  loading="lazy"
                  className="w-full aspect-[2/3] object-cover shadow-[0_2px_8px_rgba(0,18,51,0.14)]"
                />
              </Link>

              <div className="flex-1 min-w-0">
                <Link
                  to={book.href}
                  className="link-underline-hover font-headline text-[21px] text-navy-bolder leading-snug hover:text-navy-bright transition-colors"
                >
                  {book.title}
                </Link>
                <p className="font-body text-[14px] text-neutral-subtle mt-1">{book.author}</p>
                {/* Same block the book teasers use: member price and its label
                    lead, list price and binding on the line beneath. `price` is
                    the member figure in this data — see the Book interface. */}
                <div className="mt-2">
                  <BookPrice
                    listPrice={book.originalPrice}
                    memberPrice={book.price}
                    format={book.format}
                  />
                </div>
                <p className="font-body text-[13px] text-neutral-subtle mt-1.5">Added {addedOn}</p>
              </div>

              <div className="flex flex-col items-stretch gap-2 w-full sm:w-auto sm:flex-shrink-0">
                <Link
                  to={`/press/cart?id=${book.id}&format=${encodeURIComponent(book.format)}&price=${book.price}`}
                  className="inline-flex items-center justify-center gap-2 bg-gold text-navy-bolder font-body font-bold text-[14px] px-4 py-2.5 hover:bg-gold-dark transition-colors whitespace-nowrap"
                >
                  <i className="fa-solid fa-cart-shopping text-[12px]" aria-hidden="true" />
                  Add to cart
                </Link>
                <button
                  type="button"
                  onClick={() => remove(book.id)}
                  className="inline-flex items-center justify-center gap-1.5 font-body font-semibold text-[14px] text-[#c1121f] px-4 py-2 border border-transparent hover:underline whitespace-nowrap"
                >
                  <i className="fa-solid fa-xmark text-[12px]" aria-hidden="true" />
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AccountLayout>
  )
}
