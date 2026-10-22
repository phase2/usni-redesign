import { useRef, useState, type ReactNode } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DONATION_PRIORITIES } from '@/data/givingOpportunities'
import { COMMEMORATIVE_GIFTS, money, readCommemorativeLines } from '@/data/commemorativeGifts'
import DonateCommemorative, { type CommemorativeSelection } from '@/sections/DonateCommemorative'

const presetAmounts = [50, 100, 500, 1000]

/** A whole-dollar or dollars-and-cents amount above zero. */
const parseAmount = (raw: string) => (/^\d+(\.\d{1,2})?$/.test(raw.trim()) ? Number(raw) : 0)

/**
 * The large checkbox on an amount card. The card is a radio underneath — one
 * amount per gift — drawn as a square tick box, as on the live /foundation
 * page, and it takes the keyboard focus ring for the hidden input beside it.
 */
function CheckBox({ on }: { on: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`flex-shrink-0 w-7 h-7 border-2 flex items-center justify-center transition-colors
        peer-focus-visible:ring-2 peer-focus-visible:ring-navy-bright peer-focus-visible:ring-offset-2
        ${on ? 'bg-navy-bolder border-navy-bolder' : 'bg-white border-[#94A3B8] group-hover:border-navy-bolder'}`}
    >
      {on && (
        <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 8.5l3.5 3.5L13 4.5" />
        </svg>
      )}
    </span>
  )
}

function AmountCard({
  on,
  onSelect,
  className = '',
  children,
}: {
  on: boolean
  onSelect: () => void
  className?: string
  children: ReactNode
}) {
  return (
    <label
      className={`group cursor-pointer border-2 p-5 flex flex-col gap-6 transition-colors
        ${on ? 'border-navy-bolder bg-surface-subtle' : 'border-border-light bg-white hover:border-navy-subtle'} ${className}`}
    >
      <input type="radio" name="donation-amount" checked={on} onChange={onSelect} className="peer sr-only" />
      {children}
    </label>
  )
}

/**
 * The donation form: an amount, bricks and chairs for the Jack C. Taylor
 * Conference Center, and a running total that goes to the cart — the live
 * /foundation page's flow, in the prototype's treatments.
 *
 * Choosing an amount no longer jumps to the cart. Each amount card is a large
 * checkbox (one amount at a time, with Clear selection to take it back), so a
 * donor can add a brick or chair to the same gift, or give one on its own,
 * before Add to Cart. The button stays disabled until there is something to
 * add.
 *
 * Everything the form needs arrives in the query string too — `amount`,
 * `chairs`, `bricks` — so the cart's Edit brings a donor back with their
 * choices still made.
 */
export default function DonateForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const customRef = useRef<HTMLInputElement>(null)

  /**
   * A donor who arrives from a specific giving opportunity — the Donate Today
   * buttons under More Ways to Give hand over `?priority=<id>` — has already
   * said where the gift should go. This page passes that designation straight
   * through to the cart, which opens with the priority toggled on and "where
   * needed most" off, so nobody is asked to choose twice.
   *
   * It travels silently: the cart is where the donor sees and changes their
   * designation, so restating it here only to offer an undo duplicated a
   * control that already exists one step later.
   *
   * Unrecognised ids resolve to null rather than being trusted onward.
   */
  const designation =
    DONATION_PRIORITIES.find(p => p.id === searchParams.get('priority')) ?? null

  // Seeded once from the URL, as the cart's Edit leaves it.
  const [initial] = useState(() => {
    const amount = parseAmount(searchParams.get('amount') ?? '')
    const lines = readCommemorativeLines(searchParams)
    return {
      preset: presetAmounts.includes(amount) ? amount : null,
      custom: amount > 0 && !presetAmounts.includes(amount) ? String(amount) : '',
      commemorative: Object.fromEntries(
        COMMEMORATIVE_GIFTS.map(gift => {
          const line = lines.find(l => l.gift.id === gift.id)
          return [gift.id, { on: !!line, count: line?.count ?? 1 }]
        }),
      ) as CommemorativeSelection,
    }
  })

  /** A preset amount, 'custom', or nothing. */
  const [selected, setSelected] = useState<number | 'custom' | null>(
    initial.preset ?? (initial.custom ? 'custom' : null),
  )
  const [custom, setCustom] = useState(initial.custom)
  const [commemorative, setCommemorative] = useState<CommemorativeSelection>(initial.commemorative)

  const cash = selected === 'custom' ? parseAmount(custom) : (selected ?? 0)
  const lines = COMMEMORATIVE_GIFTS.filter(g => commemorative[g.id].on).map(gift => ({
    gift,
    count: commemorative[gift.id].count,
  }))
  const total = cash + lines.reduce((sum, l) => sum + l.gift.unitPrice * l.count, 0)

  const addToCart = () => {
    const params = new URLSearchParams({ frequency: 'one-time' })
    if (cash > 0) params.set('amount', String(cash))
    lines.forEach(l => params.set(l.gift.id, String(l.count)))
    if (designation && cash > 0) params.set('priority', designation.id)
    navigate(`/giving/donate/cart?${params.toString()}`)
  }

  return (
    <section className="pb-16 lg:pb-20 bg-white">
      <div className="container-site flex flex-col gap-14">

        {/* Amount */}
        <fieldset className="flex flex-col gap-6">
          <legend className="font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1] text-center w-full mb-10">
            Select your donation amount
          </legend>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {presetAmounts.map(amount => (
              <AmountCard key={amount} on={selected === amount} onSelect={() => setSelected(amount)}>
                <CheckBox on={selected === amount} />
                <span className="font-headline text-4xl lg:text-5xl text-navy-subtle">${amount.toLocaleString()}</span>
              </AmountCard>
            ))}

            <AmountCard
              on={selected === 'custom'}
              onSelect={() => {
                setSelected('custom')
                customRef.current?.focus()
              }}
              className="col-span-2 lg:col-span-1"
            >
              <span className="flex items-center gap-3">
                <CheckBox on={selected === 'custom'} />
                <span className="font-body font-semibold text-base text-navy-bolder">Custom amount</span>
              </span>
              <span className="flex items-center border border-[#94A3B8] bg-white px-3 py-2 mt-auto focus-within:border-navy-bright focus-within:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition">
                <span className="font-body text-neutral-subtle mr-1">$</span>
                <input
                  ref={customRef}
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="___"
                  aria-label="Custom donation amount"
                  value={custom}
                  onChange={e => {
                    setCustom(e.target.value)
                    setSelected('custom')
                  }}
                  className="flex-1 font-body text-navy-bolder text-base outline-none w-full bg-transparent"
                />
              </span>
            </AmountCard>
          </div>

          {selected !== null && (
            <button
              type="button"
              onClick={() => {
                setSelected(null)
                setCustom('')
              }}
              className="self-start font-body text-sm text-link"
            >
              Clear selection
            </button>
          )}
        </fieldset>

        {/* Bricks and chairs */}
        <DonateCommemorative
          selection={commemorative}
          onChange={(id, next) => setCommemorative(prev => ({ ...prev, [id]: next }))}
        />

        {/* Running total and hand-off to the cart */}
        <div className="border-t border-[#c4c9d4] pt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Label and amount share a baseline — the amount is more than twice
              the label's size, so it needs `items-baseline` to sit on the line
              rather than beside it. */}
          <p className="font-body text-base text-neutral-subtle flex flex-wrap items-baseline gap-x-3" aria-live="polite">
            {total > 0 ? (
              <>
                <span>Your total</span>
                <span className="font-headline text-[32px] text-navy-bolder leading-none">
                  {money(total)}
                </span>
              </>
            ) : (
              'Select a donation amount or add a brick or chair to continue.'
            )}
          </p>
          <button
            type="button"
            disabled={total === 0}
            onClick={addToCart}
            className={`inline-flex items-center justify-center gap-2 font-body font-bold text-base px-6 py-4 border transition-colors ${
              total === 0
                ? 'bg-[#c4c9d4] text-white border-[#c4c9d4] cursor-not-allowed'
                : 'bg-navy-bolder text-white border-navy-bolder hover:bg-navy-bright hover:border-navy-bright'
            }`}
          >
            Add to Cart
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </button>
        </div>

        {/* Pledge note */}
        <p className="font-body text-base text-navy-bolder leading-relaxed max-w-[700px]">
          If you would like to make a payment toward an existing pledge, please contact Amanda Ojeda at{' '}
          <a href="tel:4102951062" className="text-link">(410) 295-1062</a>
          {' '}so we can ensure your contribution is properly credited. The online donation portal does not process pledge payments.
        </p>

      </div>
    </section>
  )
}
