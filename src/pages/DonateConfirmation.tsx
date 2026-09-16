import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { commemorativeLineLabel, readCommemorativeLines } from '@/data/commemorativeGifts'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import {
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
  FOUNDATION_EMAIL,
  FOUNDATION_PHONE,
  FOUNDATION_TAX_ID,
  PRIORITY_LABELS,
  TRIBUTE_LABELS,
  formatNextChargeDate,
  formatReceiptDate,
} from '@/data/transactions'

/**
 * Donation receipt, reached from the donate checkout's "Complete Donation".
 *
 * A gift receipt carries an obligation a membership order does not: the donor
 * needs the Foundation's tax status and ID in writing, so those sit on the page
 * itself rather than only in the emailed copy. Values arrive in the query string
 * for the same reasons as the membership confirmation.
 */
export default function DonateConfirmation() {
  const [searchParams] = useSearchParams()
  const { setCartCount } = useCart()

  const amount      = searchParams.get('amount')    ?? '100'
  const frequency   = searchParams.get('frequency') ?? 'one-time'
  const isAnonymous = searchParams.get('anonymous') === 'true'
  const tributeType = searchParams.get('tribute')
  const tributeName = searchParams.get('tributeName')?.trim() ?? ''
  const priorityIds = searchParams.get('priorities')?.split(',').filter(Boolean) ?? []

  const orderNumber = searchParams.get('order') ?? 'NIF-2026-317604'
  const email       = searchParams.get('email') ?? 'donor@example.com'
  const firstName   = searchParams.get('name')  ?? ''
  const cardLast4   = searchParams.get('card')

  const amountNum      = Number(amount)
  const isMonthly      = frequency === 'monthly'
  const frequencyLabel = isMonthly ? 'Monthly recurring' : 'One-time'
  const priorityLabels = priorityIds.map(id => PRIORITY_LABELS[id] ?? id)

  /**
   * A commemorative gift names what it bought on the receipt — the donor needs
   * the record to say "2 commemorative chairs", not only the fund the money
   * landed in, since the Foundation follows up about nameplate text.
   */
  const commemorativeLines = readCommemorativeLines(searchParams)

  const giftDate = formatReceiptDate()

  // The transaction is done — empty the header's cart badge.
  useEffect(() => { setCartCount(0) }, [setCartCount])

  const steps = [
    {
      title: 'Your tax receipt is on its way',
      body: (
        <>
          An itemized receipt has been emailed to{' '}
          <a href={`mailto:${email}`} className="text-link">{email}</a>. The Naval Institute Foundation
          is a 501(c)(3) public charity, Tax ID {FOUNDATION_TAX_ID}, and your gift is
          tax-deductible to the extent allowed by law.
        </>
      ),
    },
    {
      title: isMonthly ? 'Your next gift processes automatically' : 'Your gift goes to work now',
      body: isMonthly ? (
        <>
          We will charge ${amountNum.toLocaleString()} to your card on {formatNextChargeDate()} and
          monthly after that. You can change or cancel the schedule any time in your account
          settings, or by calling the Foundation.
        </>
      ) : (
        <>
          {priorityLabels.length > 0
            ? 'Your gift is directed to the priorities listed above and is put to use this fiscal year.'
            : 'Undesignated gifts go where the need is greatest, which is where they do the most good.'}
        </>
      ),
    },
    {
      title: amountNum >= 1000 ? 'Welcome to the Leadership Circle' : 'You will hear how it was used',
      body: amountNum >= 1000 ? (
        <>
          Gifts of $1,000 or more within a calendar year are recognized in the Leadership Circle, the
          first of the Institute's premier gift-recognition societies. A member of the Foundation
          staff will be in touch about its courtesies and benefits.
        </>
      ) : (
        <>
          Donors receive periodic reports on the programs their giving supports — the essay contests,
          the oral histories, the photo archive, and the forum itself.
        </>
      ),
    },
  ]

  return (
    <div className="print-receipt flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <ConfirmationBanner
          eyebrow={isMonthly ? 'Recurring gift confirmed' : 'Gift received'}
          title={firstName ? `Thank you, ${firstName}` : 'Thank you for your gift'}
        >
          {isMonthly
            ? 'Your recurring gift is set up. Sustaining donors give the Institute the one thing it can plan around — a dependable base of support.'
            : 'Your gift supports an independent forum that takes no government funding and answers to no one but its members.'}
        </ConfirmationBanner>

        <section className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="max-w-[860px] mx-auto flex flex-col gap-8">

              <ReceiptMeta
                items={[
                  { label: 'Receipt number', value: orderNumber },
                  { label: 'Date', value: giftDate },
                  { label: 'Receipt sent to', value: email },
                ]}
              />

              <ReceiptCard title="Your gift" action={<PrintReceiptButton />}>
                <div className="flex flex-col gap-0">
                  <ReceiptRow label="Frequency" value={frequencyLabel} />
                  {commemorativeLines.length > 0 && (
                    <ReceiptRow
                      label="Commemorative gift"
                      value={commemorativeLines
                        .map(line => commemorativeLineLabel(line))
                        .join(', ')}
                    />
                  )}
                  <ReceiptRow
                    label="Designation"
                    value={
                      priorityLabels.length > 0
                        ? priorityLabels.join(', ')
                        : 'Most Needed'
                    }
                  />
                  {tributeName && (
                    <ReceiptRow
                      label="Dedication"
                      value={`${TRIBUTE_LABELS[tributeType ?? 'honor'] ?? TRIBUTE_LABELS.honor} ${tributeName}`}
                    />
                  )}
                  <ReceiptRow
                    label="Payment method"
                    value={cardLast4 ? `Credit card ending in ${cardLast4}` : 'Credit card'}
                  />
                  <ReceiptRow label="Recognition" value={isAnonymous ? 'Anonymous' : 'Publicly acknowledged'} />
                  <ReceiptTotal label={isMonthly ? 'Charged today' : 'Total gift'} value={`$${amountNum.toLocaleString()}`} />
                </div>

                <p className="font-body text-[14px] text-neutral-subtle leading-relaxed border-t border-[#e8eaed] pt-4">
                  The Naval Institute Foundation is a 501(c)(3) public charity. Tax ID{' '}
                  <span className="font-bold text-[#1d2535]">{FOUNDATION_TAX_ID}</span>. No goods or
                  services were provided in exchange for this contribution, so the full amount is
                  deductible to the extent allowed by law.
                  {isMonthly && ' Each monthly gift generates its own receipt.'}
                </p>
              </ReceiptCard>

              <ReceiptCard title="What happens next">
                <NextSteps steps={steps} />
              </ReceiptCard>

              <ConfirmationSupport>
                Questions about this gift, or need to change a recurring schedule? Contact Amanda
                Ojeda at{' '}
                <a
                  href={`tel:${FOUNDATION_PHONE.replace(/[^0-9]/g, '')}`}
                  className="text-link"
                >
                  {FOUNDATION_PHONE}
                </a>{' '}
                or{' '}
                <a
                  href={`mailto:${FOUNDATION_EMAIL}`}
                  className="text-link"
                >
                  {FOUNDATION_EMAIL}
                </a>{' '}
                and reference receipt {orderNumber}.
              </ConfirmationSupport>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
