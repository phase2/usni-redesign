import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { DONATION_PRIORITIES } from '@/data/givingOpportunities'

const presetAmounts = [50, 100, 500, 1000]


export default function DonateForm() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState('')

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

  const goToCart = (amount: number) => {
    const params = new URLSearchParams({ amount: String(amount), frequency: 'one-time' })
    if (designation) params.set('priority', designation.id)
    navigate(`/giving/donate/cart?${params.toString()}`)
  }

  return (
    <section className="pb-16 lg:pb-20 bg-white">
      <div className="container-site">

        {/* Heading */}
        <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1] text-center mb-10">
          Select your donation amount
        </h2>

        {/* Amount cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {presetAmounts.map((amount) => (
            <div
              key={amount}
              className={`border p-5 flex flex-col gap-6 transition-colors
                ${selected === amount ? 'border-navy-bolder bg-surface-subtle' : 'border-border-light'}`}
            >
              <p className="font-headline text-4xl lg:text-5xl text-navy-subtle">${amount.toLocaleString()}</p>
              <button
                onClick={() => goToCart(amount)}
                className="flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy-bright transition-colors"
              >
                Select Amount
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}

          {/* Custom amount */}
          <div className={`border p-5 flex flex-col gap-3 transition-colors col-span-2 lg:col-span-1
            ${selected === -1 ? 'border-navy-bolder bg-surface-subtle' : 'border-border-light'}`}
          >
            <div>
              <label className="font-body font-semibold text-sm text-navy-bolder block mb-1">
                Custom Amount
              </label>
              <div className="flex items-center border border-border-light bg-white px-3 py-2">
                <span className="font-body text-neutral-subtle mr-1">$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="___"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(-1) }}
                  className="flex-1 font-body text-navy-bolder text-base outline-none w-full"
                />
              </div>
            </div>
            <button
              onClick={() => { if (custom) goToCart(Number(custom)) }}
              disabled={!custom}
              className="flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy-bright transition-colors mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select Amount
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
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
