import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
  ConfirmationActions,
  ConfirmationBanner,
  ConfirmationSupport,
  NextSteps,
  PrintReceiptButton,
  ReceiptCard,
  ReceiptMeta,
  ReceiptRow,
  ReceiptTotal,
} from '@/components/ui/Confirmation'
import {
  MEMBER_SERVICES_EMAIL,
  MEMBER_SERVICES_PHONE,
  formatReceiptDate,
} from '@/data/transactions'
import { BOOK_CATALOG, money, orderTotals, shippingMethod } from '@/data/booksOrder'

/**
 * Book order receipt. The books flow had no confirmation step — the same shape
 * as the membership, donation, and subscription receipts.
 */
export default function BooksConfirmation() {
  const [searchParams] = useSearchParams()
  const { setCartCount } = useCart()

  // The order is placed — the badge should not still show its items.
  useEffect(() => { setCartCount(0) }, [setCartCount])


  const bookId = searchParams.get('id') ?? ''
  const format = searchParams.get('format') ?? 'Hardcover'
  const unitPrice = Number(searchParams.get('price') ?? '0')
  const qty = Math.max(1, Number(searchParams.get('qty') ?? '1'))
  const shippingId = searchParams.get('shipping') ?? 'standard'

  const orderNumber = searchParams.get('order') ?? 'NIP-2026-118204'
  const email       = searchParams.get('email') ?? 'customer@example.com'
  const firstName   = searchParams.get('name')  ?? ''
  const cardLast4   = searchParams.get('card')

  const book = BOOK_CATALOG[bookId]
  const method = shippingMethod(shippingId)
  const totals = orderTotals(unitPrice, qty, shippingId)

  const steps = [
    {
      title: 'Your receipt is on its way',
      body: (
        <>
          A confirmation carrying this order number has been emailed to{' '}
          <a href={`mailto:${email}`} className="text-link">{email}</a>.
        </>
      ),
    },
    {
      title: 'We’re packing your order',
      body: (
        <>
          Orders leave our Annapolis warehouse within one business day. You’ll get a second email with
          tracking as soon as it ships.
        </>
      ),
    },
    {
      title: `${method.label} — ${method.detail.toLowerCase()}`,
      body: (
        <>
          Delivery estimates run from the day your order ships, not the day it was placed. Tax shown here
          is an estimate and is finalised at shipment.
        </>
      ),
    },
  ]

  return (
    <div className="print-receipt flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <ConfirmationBanner
          eyebrow="Order confirmed"
          title={firstName ? `Thank you, ${firstName}` : 'Thank you for your order'}
        >
          Your order from the Naval Institute Press is confirmed. A receipt is on its way to your inbox.
        </ConfirmationBanner>

        <section className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="max-w-[860px] mx-auto flex flex-col gap-8">

              <ReceiptMeta
                items={[
                  { label: 'Order number', value: orderNumber },
                  { label: 'Date', value: formatReceiptDate() },
                  { label: 'Receipt sent to', value: email },
                ]}
              />

              <ReceiptCard title="What you ordered" action={<PrintReceiptButton />}>
                <div className="flex flex-col">
                  <ReceiptRow label="Title" value={book?.title ?? 'Book'} />
                  <ReceiptRow label="Format" value={format} />
                  <ReceiptRow label="Quantity" value={String(qty)} />
                  <ReceiptRow label="Price each" value={money(unitPrice)} />
                  <ReceiptRow label="Subtotal" value={money(totals.subtotal)} />
                  <ReceiptRow label={method.label} value={money(totals.shipping)} />
                  <ReceiptRow label="Estimated tax" value={money(totals.tax)} />
                  <ReceiptRow
                    label="Payment method"
                    value={cardLast4 ? `Credit card ending in ${cardLast4}` : 'Credit card'}
                  />
                  <ReceiptTotal value={money(totals.total)} />
                </div>

                <p className="font-body text-[14px] text-neutral-subtle leading-relaxed border-t border-[#e8eaed] pt-4">
                  {method.detail} from the day your order ships. Estimated tax is finalised at shipment.
                </p>
              </ReceiptCard>

              <ReceiptCard title="What happens next">
                <NextSteps steps={steps} />
              </ReceiptCard>

              <ConfirmationActions
                links={[
                  { label: 'Keep browsing the Press', href: '/press' },
                  { label: 'View your orders', href: '/account/orders' },
                  { label: 'Back to home', href: '/' },
                ]}
              />

              <ConfirmationSupport>
                Questions about this order? Call member services at{' '}
                <a href={`tel:${MEMBER_SERVICES_PHONE.replace(/[^0-9]/g, '')}`} className="text-link">
                  {MEMBER_SERVICES_PHONE}
                </a>{' '}
                or email{' '}
                <a href={`mailto:${MEMBER_SERVICES_EMAIL}`} className="text-link">
                  {MEMBER_SERVICES_EMAIL}
                </a>{' '}
                and reference order {orderNumber}.
              </ConfirmationSupport>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
