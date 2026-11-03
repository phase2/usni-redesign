import { aiWarfightingBook, meltingPointBook, type BookProductData } from '@/data/bookProductData'

/**
 * Shared lookups and money for the books purchase flow — cart, checkout, and
 * receipt.
 *
 * The catalog map lived in `sections/BooksCartItems.tsx`, where only the cart
 * could reach it; the checkout and receipt need the same title, cover, and
 * format to render an order, and a book mislabelled on a receipt is worse than
 * one mislabelled in a cart. Same reasoning as `data/transactions.ts`.
 */

export const BOOK_CATALOG: Record<string, BookProductData> = {
  'ai-warfighting': aiWarfightingBook,
  'melting-point': meltingPointBook,
}

export interface ShippingMethod {
  id: string
  label: string
  detail: string
  cost: number
}

/** Naval Institute Press ships from Annapolis; domestic options only for now. */
export const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'standard',  label: 'Standard shipping',  detail: 'Arrives in 5–7 business days', cost: 5.95 },
  { id: 'expedited', label: 'Expedited shipping', detail: 'Arrives in 2–3 business days', cost: 12.95 },
]

export function shippingMethod(id: string): ShippingMethod {
  return SHIPPING_METHODS.find(m => m.id === id) ?? SHIPPING_METHODS[0]
}

/** Maryland state rate, applied to merchandise only. Presented as an estimate. */
export const TAX_RATE = 0.06

export interface OrderTotals {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

/**
 * Tax is charged on merchandise, not on the shipping line, and every figure is
 * rounded to cents before it is summed — totalling raw floats and rounding once
 * at the end can leave a receipt whose lines do not add up to its total.
 */
export function orderTotals(unitPrice: number, qty: number, shippingId: string): OrderTotals {
  const cents = (n: number) => Math.round(n * 100) / 100
  const subtotal = cents(unitPrice * qty)
  const shipping = cents(shippingMethod(shippingId).cost)
  const tax = cents(subtotal * TAX_RATE)
  return { subtotal, shipping, tax, total: cents(subtotal + shipping + tax) }
}

export function money(n: number): string {
  return `$${n.toFixed(2)}`
}
