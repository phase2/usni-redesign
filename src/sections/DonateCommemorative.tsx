import imgChairs from '@/assets/images/taylor-center/jctcc-chair-nameplate.webp'
import imgBricks from '@/assets/images/taylor-center/jctcc-commemorative-brick-wall.webp'
import { COMMEMORATIVE_GIFTS, type CommemorativeGift } from '@/data/commemorativeGifts'

/**
 * Commemorative bricks and chairs at the Jack C. Taylor Conference Center, as
 * part of the main donation form — under the amount cards, as on the live
 * /foundation page. A donor can add a brick or chair to a gift, or give one on
 * its own; the form's running total and Add to Cart cover both.
 *
 * Controlled by DonateForm, which owns the selection so the total and the
 * cart hand-off see it. Each gift is a large checkbox card: tick it, set how
 * many, and it joins the total.
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

export type CommemorativeSelection = Record<CommemorativeGift['id'], { on: boolean; count: number }>

/** The picker's bounds, as `readCommemorativeLines` applies them to a URL. */
export const clampCount = (n: number) => Math.max(1, Math.min(99, n))

export default function DonateCommemorative({
  selection,
  onChange,
}: {
  selection: CommemorativeSelection
  onChange: (id: CommemorativeGift['id'], next: { on: boolean; count: number }) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.15]">
          Purchase a Brick or Chair at the new Jack C. Taylor Conference Center
        </h2>
        <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] max-w-[820px]">
          In addition to your gift, consider honoring or memorializing someone in your life with a
          personalized brick or chair at the Jack C. Taylor Conference Center.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {OPTIONS.map(option => {
          const { on, count } = selection[option.id]
          return (
            <div
              key={option.id}
              className={`bg-white border-2 transition-colors ${on ? 'border-navy-bolder' : 'border-border-light hover:border-navy-subtle'}`}
            >
              <div className="p-6 flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    id={`commem-${option.id}`}
                    type="checkbox"
                    checked={on}
                    onChange={e => onChange(option.id, { on: e.target.checked, count })}
                    className="w-6 h-6 flex-shrink-0 accent-navy-bolder cursor-pointer"
                  />
                  <label
                    htmlFor={`commem-${option.id}`}
                    className="font-headline text-[26px] text-navy-bolder leading-none cursor-pointer"
                  >
                    ${option.unitPrice.toLocaleString()} &times;
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    step={1}
                    aria-label={option.countLabel}
                    value={count}
                    // Setting a quantity is choosing the gift.
                    onChange={e =>
                      onChange(option.id, {
                        on: true,
                        count: clampCount(Number(e.target.value.replace(/[^0-9]/g, '')) || 1),
                      })
                    }
                    className="w-20 border border-[#4e576a] bg-white px-2 py-2 font-body text-base text-navy-bolder
                               outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition"
                  />
                  <span className="font-headline text-[26px] text-navy-bolder leading-none">
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

              <img src={option.src} alt={option.alt} loading="lazy" className="w-full h-[240px] object-cover" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
