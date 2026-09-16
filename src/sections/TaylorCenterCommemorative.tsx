import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import imgChairs from '@/assets/images/taylor-center/jctcc-chair-nameplate.webp'
import imgBricks from '@/assets/images/taylor-center/jctcc-commemorative-brick-wall.webp'
import {
  COMMEMORATIVE_GIFTS,
  COMMEMORATIVE_PRIORITY_ID,
  type CommemorativeGift,
} from '@/data/commemorativeGifts'

/**
 * Commemorative bricks and chairs at the Jack C. Taylor Conference Center.
 *
 * On the live /foundation page these sit inside the main donation form, and in
 * the prototype they sat below the donate page's FAQs. Both arrangements put a
 * named gift to one building in the middle of the ask for unrestricted support.
 * They belong with the building, so the section now lives on the Taylor Center
 * page, after the rooms it names — the reader meets "the auditorium" and "the
 * rooftop terrace" before being offered a seat in one and a brick on the other.
 *
 * The running subtotal still hands its amount to the donation cart by query
 * string rather than holding form state, now carrying `priority=taylor-conference-center`
 * so the gift arrives designated to the Center's Maintenance & Technology Fund.
 *
 * Photography is the real thing as of 16 September 2026: an engraved seat
 * nameplate, and the commemorative brick wall itself.
 *
 * NOTE for USNI: the brick recognition copy, transcribed from the live site,
 * places the donor wall "on the rooftop terrace", but the wall in the supplied
 * photograph is an interior one. Worth confirming which is current before
 * launch — the copy is left as the live site has it.
 */

/** The photograph each gift carries, keyed to the shared definitions. */
const IMAGES: Record<CommemorativeGift['id'], { src: string; alt: string }> = {
  chairs: {
    src: imgChairs,
    alt: 'An engraved silver nameplate on an auditorium seat, reading "In honor of Admiral Chuck Larson, USN (Ret.), a great leader and super submariner!"',
  },
  bricks: {
    src: imgBricks,
    alt: 'The Jack C. Taylor Conference Center commemorative brick wall, its engraved donor names arranged in columns',
  },
}

const OPTIONS = COMMEMORATIVE_GIFTS.map(gift => ({ ...gift, ...IMAGES[gift.id] }))

export default function TaylorCenterCommemorative() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<Record<string, boolean>>({ chairs: false, bricks: false })
  const [counts, setCounts] = useState<Record<string, number>>({ chairs: 1, bricks: 1 })

  const subtotal = OPTIONS.reduce(
    (sum, o) => (selected[o.id] ? sum + o.unitPrice * counts[o.id] : sum),
    0,
  )

  const clamp = (n: number) => Math.max(1, Math.min(99, n))

  const setCount = (id: string, raw: string) => {
    setCounts(prev => ({ ...prev, [id]: clamp(Number(raw.replace(/[^0-9]/g, '')) || 1) }))
  }

  /**
   * The cart is told what was bought, not just what it costs — a quantity of
   * each gift alongside the total, so the cart can itemise the bricks and
   * chairs rather than showing the donation form's priority picker for a gift
   * that is already designated.
   */
  const cartParams = () => {
    const params = new URLSearchParams({
      amount: String(subtotal),
      frequency: 'one-time',
      priority: COMMEMORATIVE_PRIORITY_ID,
    })
    OPTIONS.forEach(o => {
      if (selected[o.id]) params.set(o.id, String(counts[o.id]))
    })
    return params.toString()
  }


  return (
    <section id="commemorative-gifts" className="py-12 lg:py-16 bg-tan-subtlest scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
          Purchase a Brick or Chair at the new Jack C. Taylor Conference Center
        </h2>
        <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] mt-6 max-w-[820px]">
          Honor or memorialize someone in your life with a personalized chair in the auditorium or a
          brick on the rooftop terrace. Both are permanent, both carry the name you choose, and both
          support the Center that carries the Naval Institute&rsquo;s forum into its next century.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {OPTIONS.map(option => {
            const on = selected[option.id]
            return (
              <div
                key={option.id}
                className={`bg-white border transition-colors ${on ? 'border-[#023e7d]' : 'border-[#c4c9d4]'}`}
              >
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <input
                      id={`commem-${option.id}`}
                      type="checkbox"
                      checked={on}
                      onChange={e => setSelected(prev => ({ ...prev, [option.id]: e.target.checked }))}
                      className="w-5 h-5 flex-shrink-0 accent-[#023e7d] cursor-pointer"
                    />
                    <label
                      htmlFor={`commem-${option.id}`}
                      className="font-headline text-[26px] text-[#023e7d] leading-none cursor-pointer"
                    >
                      ${option.unitPrice.toLocaleString()} &times;
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      step={1}
                      aria-label={option.countLabel}
                      value={counts[option.id]}
                      onChange={e => setCount(option.id, e.target.value)}
                      className="w-20 border border-[#4e576a] bg-white px-2 py-2 font-body text-base text-navy-bolder
                                 outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition"
                    />
                    <span className="font-headline text-[26px] text-[#023e7d] leading-none">
                      {option.unitLabel}
                    </span>
                  </div>

                  <p className="font-body font-bold text-[15px] text-navy-bolder leading-relaxed">
                    {option.recognition}
                  </p>
                  <p className="font-body italic text-[14px] text-neutral-subtle leading-relaxed">
                    {option.footnote}
                  </p>

                </div>

                <img
                  src={option.src}
                  alt={option.alt}
                  loading="lazy"
                  className="w-full h-[280px] object-cover"
                />
              </div>
            )
          })}
        </div>

        {/* Running total and hand-off to the cart */}
        <div className="mt-8 border-t border-[#c4c9d4] pt-6 flex flex-wrap items-center justify-between gap-4">
          {/* Label and amount share a baseline — the amount is more than twice
              the label's size, so it needs `items-baseline` to sit on the line
              rather than beside it. */}
          <p className="font-body text-base text-neutral-subtle flex flex-wrap items-baseline gap-x-2">
            {subtotal > 0 ? (
              <>
                <span>Commemorative gift total:</span>
                <span className="font-headline text-[28px] text-[#023e7d] leading-none">
                  ${subtotal.toLocaleString()}
                </span>
              </>
            ) : (
              'Select a brick or a chair to add a commemorative gift.'
            )}
          </p>
          <button
            type="button"
            disabled={subtotal === 0}
            onClick={() => navigate(`/giving/donate/cart?${cartParams()}`)}
            className={`inline-flex items-center justify-center gap-2 font-body font-bold text-base px-6 py-4 border transition-colors ${
              subtotal === 0
                ? 'bg-[#c4c9d4] text-white border-[#c4c9d4] cursor-not-allowed'
                : 'bg-navy-bolder text-white border-navy-bolder hover:bg-navy-bright hover:border-navy-bright'
            }`}
          >
            Continue to cart
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
