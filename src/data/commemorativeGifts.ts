/**
 * Commemorative bricks and chairs at the Jack C. Taylor Conference Center.
 *
 * As on the live /foundation page, they are part of the main donation form
 * (DonateCommemorative, under the amount cards): a donor can give an amount, a
 * brick or chair, or both in one cart. The gift has to be described again in
 * the cart, the checkout summary, and the receipt — so the prices and the
 * recognition wording live here rather than inside the section that happens to
 * render them first.
 *
 * The donation travels between those pages in the query string: `amount` is
 * the cash gift alone, and `chairs`/`bricks` the commemorative quantities, so
 * each step can itemise them and add them up (`readDonation`). Bricks and
 * chairs are always designated to the Center's Maintenance & Technology Fund;
 * the investment priorities a donor picks in the cart apply to the cash gift.
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

export interface Donation {
  /** The cash gift, apart from any bricks and chairs. 0 when there is none. */
  cash: number
  lines: CommemorativeLine[]
  /** The bricks and chairs together. */
  commemorativeTotal: number
  /** Everything charged today. */
  total: number
}

/**
 * The whole donation, off a URL: the cash gift in `amount`, and the bricks and
 * chairs. A missing or malformed amount is no cash gift — unless the URL holds
 * nothing at all, as when a reviewer opens the cart straight from the table of
 * contents, which shows a $100 gift so the page has something to render.
 */
export function readDonation(params: URLSearchParams): Donation {
  const lines = readCommemorativeLines(params)
  const raw = params.get('amount')
  const parsed = raw !== null && /^\d+(\.\d{1,2})?$/.test(raw) ? Number(raw) : 0
  const cash = parsed > 0 ? parsed : raw === null && lines.length === 0 ? 100 : 0
  const commemorativeTotal = lines.reduce((sum, line) => sum + line.subtotal, 0)
  return { cash, lines, commemorativeTotal, total: cash + commemorativeTotal }
}

/**
 * Back to the donation form with the donor's choices filled in, for a cart's
 * Edit and Back buttons.
 */
export function donateFormHref(donation: Pick<Donation, 'cash' | 'lines'>, priority?: string | null) {
  const params = new URLSearchParams()
  if (donation.cash > 0) params.set('amount', String(donation.cash))
  appendCommemorativeParams(params, donation.lines)
  if (priority) params.set('priority', priority)
  const qs = params.toString()
  return qs ? `/giving/donate?${qs}` : '/giving/donate'
}

/** "$1,000", or "$25.50" for a gift with cents. */
export const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`
