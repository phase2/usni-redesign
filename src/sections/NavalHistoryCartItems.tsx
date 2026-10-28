import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import {
  FORMAT_LABELS,
  REGION_LABELS,
  TERM_LABELS,
  offerFor,
  type Format,
  type Region,
  type Term,
} from '@/data/navalHistorySubscription'

/**
 * Naval History subscription cart — the review step between choosing a
 * subscription and paying for it.
 *
 * The subscribe page previously jumped straight to checkout, which is the one
 * conversion flow on the site that skipped a cart. Same shape as the membership
 * and donation carts: an alert, the line item with an Edit route back, the
 * options that can still be changed here, then Back / Continue.
 */
export default function NavalHistoryCartItems() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setCartCount } = useCart()

  const term   = (searchParams.get('term') === '3' ? '3' : '1') as Term
  const region = (searchParams.get('region') === 'international' ? 'international' : 'us') as Region
  const format = (searchParams.get('format') === 'digital' ? 'digital' : 'print') as Format
  const offer  = offerFor(format, region, term)

  /*
   * A membership added at the upsell step (step 2). Its presence is what puts
   * the subscription on the member rate, so both the line item and the total
   * read from `subPrice` rather than `offer.price`.
   */
  const memPlan  = searchParams.get('memPlan')
  const memPrice = Number(searchParams.get('memPrice')) || 0
  const hasMembership = memPlan === 'digital' || memPlan === 'full'
  const memPlanLabel = memPlan === 'full' ? 'Full' : 'Digital'

  const subPrice = hasMembership ? offer.memberPrice : offer.price
  const orderTotal = subPrice + (hasMembership ? memPrice : 0)

  const [isGift, setIsGift] = useState(searchParams.get('gift') === 'true')
  const [autoRenew, setAutoRenew] = useState(searchParams.get('autoRenew') !== 'false')

  useEffect(() => { setCartCount(hasMembership ? 2 : 1) }, [setCartCount, hasMembership])

  const handleCheckout = () => {
    const params = new URLSearchParams({
      term, region, format, price: String(subPrice),
      autoRenew: String(autoRenew),
    })
    if (isGift) params.set('gift', 'true')
    if (hasMembership) {
      params.set('memPlan', memPlan)
      params.set('memPrice', String(memPrice))
    }
    navigate(`/naval-history/subscribe/checkout?${params.toString()}`)
  }

  /** Back to the upsell, preserving the choices made in step 1. */
  const editMembership = () =>
    navigate(
      `/naval-history/subscribe/membership-upsell?term=${term}&region=${region}` +
        `&format=${format}&price=${offer.price}`,
    )

  return (
    <section className="bg-white py-16">
      <div className="container-site flex flex-col gap-8">

        {/* Alert banner */}
        <div className="bg-[#fefde8] border border-l-4 border-[#ffaa00] px-8 py-6 flex flex-col gap-3">
          <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Review your subscription</h2>
          <p className="font-body text-[16px] text-[#1d2535] leading-[1.5]">
            Thank you for subscribing to Naval History! Check the format and term below before
            proceeding to checkout. If you have any questions, please{' '}
            <a href="/contact" className="transition-colors text-link">
              contact us
            </a>.
          </p>
        </div>

        {/* Cart items heading */}
        <div className="border-b border-[#c4c9d4] pb-6">
          <h2 className="font-headline text-[40px] text-[#1d2535] leading-[1.1]">Cart items</h2>
        </div>

        {/* Subscription line item */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-headline text-[26px] text-[#023e7d] leading-[1.2]">
              Naval History Magazine &mdash; {FORMAT_LABELS[format]}
            </h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p className="font-body text-[17px] text-[#1d2535]">
                <span className="font-bold">Term:</span> {TERM_LABELS[term]}
              </p>
              <div className="w-px h-5 bg-[#c4c9d4]" aria-hidden />
              <p className="font-body text-[17px] text-[#1d2535]">
                <span className="font-bold">Delivery:</span> {REGION_LABELS[region]}
              </p>
              <div className="w-px h-5 bg-[#c4c9d4]" aria-hidden />
              <p className="font-body text-[17px] text-[#1d2535]">
                <span className="font-bold">Price:</span> ${subPrice}
                {hasMembership && (
                  <span className="text-[#4e576a]"> (member rate)</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 pt-1">
            <button
              type="button"
              onClick={() => navigate('/naval-history/subscribe')}
              className="flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <button
              type="button"
              onClick={() => navigate('/naval-history/subscribe')}
              className="flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#c1121f] hover:text-white transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
              Remove
            </button>
          </div>
        </div>

        {/* Membership line item, when one was added at the upsell step */}
        {hasMembership && (
          <div className="flex flex-wrap items-start justify-between gap-4 border-t border-[#c4c9d4] pt-6">
            <div className="flex flex-col gap-1">
              <h3 className="font-headline text-[26px] text-[#023e7d] leading-[1.2]">
                Naval Institute Membership &mdash; {memPlanLabel}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <p className="font-body text-[17px] text-[#1d2535]">
                  <span className="font-bold">Term:</span> 1 year
                </p>
                <div className="w-px h-5 bg-[#c4c9d4]" aria-hidden />
                <p className="font-body text-[17px] text-[#1d2535]">
                  <span className="font-bold">Price:</span> ${memPrice}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0 pt-1">
              <button
                type="button"
                onClick={editMembership}
                className="flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
              >
                Change
              </button>
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/naval-history/subscribe/cart?term=${term}&region=${region}` +
                      `&format=${format}&price=${offer.price}`,
                  )
                }
                className="flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#c1121f] hover:text-white transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Order total */}
        <div className="border-t border-[#c4c9d4] pt-6 flex flex-wrap items-baseline justify-between gap-4">
          <span className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Order total</span>
          <div className="text-right">
            <span className="font-headline text-[36px] text-[#023e7d] leading-none">${orderTotal}</span>
            {hasMembership ? (
              <p className="font-body text-[14px] text-[#4e576a] mt-1">
                Member pricing applied to your subscription.
              </p>
            ) : (
              <p className="font-body text-[14px] text-[#4e576a] mt-1">
                Members pay ${offer.memberPrice} — sign in at checkout to apply member pricing.
              </p>
            )}
          </div>
        </div>

        {/* Options that can still change here */}
        <div className="flex flex-col gap-4 border-t border-[#c4c9d4] pt-6">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={isGift}
              onChange={e => setIsGift(e.target.checked)}
              className="w-5 h-5 mt-0.5 accent-[#023e7d] cursor-pointer flex-shrink-0"
            />
            <span className="font-body text-[16px] text-[#1d2535]">
              This subscription is a gift for another person
            </span>
          </label>
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoRenew}
              onChange={e => setAutoRenew(e.target.checked)}
              className="w-5 h-5 mt-0.5 accent-[#023e7d] cursor-pointer flex-shrink-0"
            />
            <span className="font-body text-[16px] text-[#1d2535]">
              Automatically renew at the end of my {TERM_LABELS[term]} term
            </span>
          </label>
        </div>

        {/* Navigation */}
        <div className="border-t border-[#999fad] pt-8 flex flex-wrap items-center justify-between gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => navigate('/naval-history/subscribe')}
            className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
          >
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H2M6 2L2 6l4 4" />
            </svg>
            Back to Subscriptions
          </button>
          <button
            type="button"
            onClick={handleCheckout}
            className="flex items-center gap-2 bg-[#002b5c] text-white font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright transition-colors"
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
