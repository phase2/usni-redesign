/**
 * Commemorative bricks and chairs at the Jack C. Taylor Conference Center.
 *
 * The picker lives on the Taylor Center page, but the gift it builds has to be
 * described again in the cart, the checkout summary, and the receipt — so the
 * prices and the recognition wording live here rather than inside the section
 * that happens to render them first.
 *
 * A commemorative gift travels between those pages as `?chairs=&bricks=`
 * alongside the usual `amount`/`frequency`. It is still an ordinary gift to the
 * Center's Maintenance & Technology Fund, so `priority` rides along too and the
 * receipt reads the same as any other designated gift.
 */

export interface CommemorativeGift {
  id: 'chairs' | 'bricks'
  unitPrice: number
  /** Line-item name — the quantity is printed by the caller, not baked in. */
  singular: string
  plural: string
  /** Tail of the picker's "$2,500 × [ n ] chair(s)" row. */
  unitLabel: string
  countLabel: string
  recognition: string
  footnote: string
}

/** The investment priority a commemorative gift arrives already designated to. */
export const COMMEMORATIVE_PRIORITY_ID = 'taylor-conference-center'

/** Where a donor goes to change a commemorative gift, rather than the donate form. */
export const COMMEMORATIVE_EDIT_PATH = '/giving/taylor-conference-center#commemorative-gifts'

export const COMMEMORATIVE_GIFTS: CommemorativeGift[] = [
  {
    id: 'chairs',
    unitPrice: 2500,
    singular: 'Commemorative chair',
    plural: 'Commemorative chairs',
    unitLabel: 'chair(s)',
    countLabel: 'Number of chairs',
    recognition:
      'Gift to be recognized with an engraved silver plate, permanently affixed to a seat in the Conference Center auditorium.*',
    footnote: '*We will be in touch with you regarding text for the nameplate.',
  },
  {
    id: 'bricks',
    unitPrice: 1000,
    singular: 'Commemorative brick',
    plural: 'Commemorative bricks',
    unitLabel: 'brick(s)',
    countLabel: 'Number of bricks',
    recognition:
      'Gift to be recognized with my name or that of a loved one, featured on a donor wall on the rooftop terrace.*',
    footnote: '*We will be in touch with you regarding text for the donor wall.',
  },
]

export interface CommemorativeLine {
  gift: CommemorativeGift
  count: number
  subtotal: number
}

/** The picker's own bounds, applied again on the way back out of a URL. */
const MAX_COUNT = 99

/**
 * Read `?chairs=&bricks=` back into line items. Anything absent, zero, or not a
 * whole number in range is dropped rather than coerced — these values come off
 * a URL a donor can edit, and a half-parsed quantity would price a gift wrong.
 */
export function readCommemorativeLines(params: URLSearchParams): CommemorativeLine[] {
  return COMMEMORATIVE_GIFTS.flatMap(gift => {
    const raw = params.get(gift.id)
    if (raw === null || !/^\d+$/.test(raw)) return []
    const count = Number(raw)
    if (count < 1 || count > MAX_COUNT) return []
    return [{ gift, count, subtotal: gift.unitPrice * count }]
  })
}

/** "2 commemorative chairs" — the line item's name, quantity included. */
export function commemorativeLineLabel({ gift, count }: CommemorativeLine): string {
  const name = count === 1 ? gift.singular : gift.plural
  return `${count} ${name.toLowerCase()}`
}

/** Carry a commemorative selection onto the next step of the flow. */
export function appendCommemorativeParams(
  target: URLSearchParams,
  lines: CommemorativeLine[],
): void {
  lines.forEach(({ gift, count }) => target.set(gift.id, String(count)))
}
