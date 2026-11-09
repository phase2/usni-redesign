/**
 * The donation as it travels between the form, the cart, the checkout, and the
 * receipt: in the query string, with `amount` the gift.
 *
 * Commemorative bricks and chairs at the Jack C. Taylor Conference Center used
 * to ride along here as `chairs`/`bricks` line items. In November 2026 the
 * client took them out of the online flow: what remains is limited, so they
 * are a conversation with the Foundation, presented as a card on
 * /giving/opportunities, not something to buy.
 */

/** A whole-dollar or dollars-and-cents amount above zero, or 0. */
export const parseAmount = (raw: string | null) =>
  raw !== null && /^\d+(\.\d{1,2})?$/.test(raw.trim()) ? Number(raw) : 0

/**
 * The gift, off a URL. A missing amount shows a $100 gift, as when a reviewer
 * opens the cart straight from the table of contents, so the page has
 * something to render; a malformed one is no gift.
 */
export function readDonationAmount(params: URLSearchParams): number {
  const raw = params.get('amount')
  return raw === null ? 100 : parseAmount(raw)
}

/**
 * Back to the donation form with the donor's choices filled in, for a cart's
 * Edit and Back buttons.
 */
export function donateFormHref(cash: number, priority?: string | null) {
  const params = new URLSearchParams()
  if (cash > 0) params.set('amount', String(cash))
  if (priority) params.set('priority', priority)
  const qs = params.toString()
  return qs ? `/giving/donate?${qs}` : '/giving/donate'
}

/** "$1,000", or "$25.50" for a gift with cents. */
export const money = (n: number) =>
  `$${n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`
