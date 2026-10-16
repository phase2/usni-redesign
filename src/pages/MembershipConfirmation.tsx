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
  PLAN_LABELS,
  TERM_LABELS,
  formatReceiptDate,
  formatRenewalDate,
} from '@/data/transactions'

/**
 * Membership transaction receipt, reached from Checkout's "Complete Checkout".
 *
 * Every value arrives in the query string — the same way the cart hands the
 * order to checkout — so the page is deep-linkable and survives a refresh with
 * no backend behind it. Defaults cover a bare visit to /membership/confirmation
 * so the page is never blank for a reviewer opening the URL cold.
 */
export default function MembershipConfirmation() {
  const [searchParams] = useSearchParams()
  const { setCartCount } = useCart()

  const plan     = searchParams.get('plan')  ?? 'full'
  const term     = searchParams.get('term')  ?? '1'
  const price    = searchParams.get('price') ?? '75'
  const magTerm  = searchParams.get('magTerm')
  const magPrice = searchParams.get('magPrice')
  const magFormat = searchParams.get('magFormat') === 'digital' ? 'digital' : 'print'
  const donation = searchParams.get('donation')
  const isGift   = searchParams.get('gift') === 'true'
  const autoRenew = searchParams.get('autoRenew') !== 'false'

  const orderNumber = searchParams.get('order') ?? 'USNI-2026-408215'
  const email       = searchParams.get('email') ?? 'member@example.com'
  const firstName   = searchParams.get('name')  ?? ''
  const cardLast4   = searchParams.get('card')
  const giftName    = searchParams.get('giftName')

  const planLabel    = PLAN_LABELS[plan] ?? 'Full Membership'
  const termLabel    = TERM_LABELS[term] ?? '1 year'
  const magTermLabel = magTerm === '3' ? '3 years' : '1 year'
  const magFormatLabel = magFormat === 'digital' ? 'Digital Only' : 'Print & Digital'
  const isLifetime   = termLabel === 'Lifetime'

  const membershipPrice = Number(price)
  const magPriceNum     = magPrice ? Number(magPrice) : 0
  const donationNum     = donation ? Number(donation) : 0
  const total           = membershipPrice + magPriceNum + donationNum

  const purchaseDate = formatReceiptDate()

  // The transaction is done — empty the header's cart badge.
  useEffect(() => { setCartCount(0) }, [setCartCount])

  const steps = [
    {
      title: 'Your receipt is on its way',
      body: (
        <>
          A confirmation with this order number has been emailed to{' '}
          <a href={`mailto:${email}`} className="text-link">{email}</a>. Keep it for your records.
        </>
      ),
    },
    {
      title: 'Digital access is live now',
      body: (
        <>
          Sign in with the email above to read Proceedings and Naval History in full, plus the
          complete digital archive back to 1874.
        </>
      ),
    },
    {
      // No packet or card: the Institute no longer mails either, so this step is
      // about the magazines only.
      title: isGift ? 'The recipient hears from us next' : 'Watch for your magazines in the mail',
      body: isGift ? (
        <>
          {giftName ? <span className="font-bold text-[#1d2535]">{giftName}</span> : 'Your recipient'}{' '}
          will receive a note announcing the gift, followed by their first issue.
        </>
      ) : (
        <>
          Print issues begin with the next published number, typically four to six weeks out.
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
          title={
            isGift
              ? 'Your gift membership is confirmed'
              : firstName
                ? `Welcome to the Naval Institute, ${firstName}`
                : 'Welcome to the Naval Institute'
          }
        >
          {isGift
            ? 'Thank you for giving a membership in the independent forum for those who dare to think seriously about sea power.'
            : 'Your membership is active. Thank you for joining the independent forum for those who dare to think seriously about sea power.'}
        </ConfirmationBanner>

        <section className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="max-w-[860px] mx-auto flex flex-col gap-8">

              <ReceiptMeta
                items={[
                  { label: 'Order number', value: orderNumber },
                  { label: 'Date', value: purchaseDate },
                  { label: 'Receipt sent to', value: email },
                ]}
              />

              <ReceiptCard title="What you purchased" action={<PrintReceiptButton />}>
                <div className="flex flex-col gap-0">
                  <ReceiptRow label="Plan" value={planLabel} />
                  <ReceiptRow label="Term" value={termLabel} />
                  <ReceiptRow label="Membership dues" value={`$${membershipPrice.toLocaleString()}`} />
                  {magPrice && (
                    <>
                      <ReceiptRow label="Naval History Magazine" value={`$${magPriceNum.toLocaleString()}`} />
                      <ReceiptRow label="Naval History format" value={magFormatLabel} />
                      <ReceiptRow label="Naval History term" value={magTermLabel} />
                    </>
                  )}
                  {donationNum > 0 && (
                    <ReceiptRow label="Donation" value={`$${donationNum.toLocaleString()}`} />
                  )}
                  <ReceiptRow
                    label="Payment method"
                    value={cardLast4 ? `Credit card ending in ${cardLast4}` : 'Credit card'}
                  />
                  <ReceiptTotal value={`$${total.toLocaleString()}`} />
                </div>

                {!isLifetime && !plan.startsWith('sponsored-') && (
                  <p className="font-body text-[14px] text-neutral-subtle leading-relaxed border-t border-[#e8eaed] pt-4">
                    {autoRenew ? (
                      <>
                        Auto-renew is <span className="font-bold text-[#1d2535]">on</span>. Your
                        membership renews on {formatRenewalDate()} at the then-current rate. You can
                        turn it off any time in your account settings.
                      </>
                    ) : (
                      <>
                        Auto-renew is <span className="font-bold text-[#1d2535]">off</span>. We will
                        email you before your membership lapses on {formatRenewalDate()}.
                      </>
                    )}
                  </p>
                )}
              </ReceiptCard>

              <ReceiptCard title="What happens next">
                <NextSteps steps={steps} />
              </ReceiptCard>

              <ConfirmationActions
                links={[
                  { label: 'Start reading Proceedings', href: '/proceedings' },
                  { label: 'Explore the archives', href: '/archives' },
                  { label: 'Back to home', href: '/' },
                ]}
              />

              <ConfirmationSupport>
                Questions about this order? Call member services at{' '}
                <a
                  href={`tel:${MEMBER_SERVICES_PHONE.replace(/[^0-9]/g, '')}`}
                  className="text-link"
                >
                  {MEMBER_SERVICES_PHONE}
                </a>{' '}
                or email{' '}
                <a
                  href={`mailto:${MEMBER_SERVICES_EMAIL}`}
                  className="text-link"
                >
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
