import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout from '@/components/layout/AccountLayout'
import { AccountCard, Badge, DataRow, SectionLink, Toggle } from '@/components/ui/AccountCard'
import Modal from '@/components/ui/Modal'
import Alert from '@/components/ui/Alert'
import { membership, orders, subscriptions, wishlist } from '@/data/account'

/**
 * Account landing page.
 *
 * The live site opens with a promotional Member Updates feed and, for personal
 * data, a member number above "Your Membership information is temporarily
 * unavailable online." This page inverts that: status first, then the member's
 * own records. The promo feed moves to the notification bell in the hero
 * (see AccountNotifications), so it stays reachable without leading the page.
 */
export default function AccountDashboard() {
  const [autoRenew, setAutoRenew] = useState(membership.autoRenew)
  const [confirmOff, setConfirmOff] = useState(false)
  const recentOrders = orders.slice(0, 3)

  /*
   * Switching auto-renew off lapses the membership, so it asks first; switching
   * it back on is harmless and stays a single tap. The toggle itself does not
   * move until the member confirms — flipping it and then undoing it on cancel
   * would read as though the setting had already changed.
   */
  const handleAutoRenew = () => {
    if (autoRenew) setConfirmOff(true)
    else setAutoRenew(true)
  }

  return (
    <AccountLayout
      title="Dashboard"
      lede="Your membership, subscriptions, and recent activity at a glance."
    >
      {/* ── Membership status ─────────────────────────────────────────── */}
      {membership.statusAvailable ? (
        <div className="border border-[#c4c9d4]">
          <div className="bg-navy-bolder px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-body font-medium text-[12px] uppercase tracking-[0.08em] text-light-blue mb-1">
                Current membership
              </p>
              <p className="font-headline text-[28px] text-white leading-tight">{membership.plan}</p>
            </div>
            <Badge tone="active">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0] border-b border-[#e2e8f0]">
            {[
              { label: 'Term', value: membership.term },
              { label: 'Renews on', value: membership.renewsOn },
              { label: 'Price', value: `$${membership.price}/year` },
            ].map(stat => (
              <div key={stat.label} className="px-6 py-4">
                <p className="font-body font-semibold text-[12px] uppercase tracking-[0.06em] text-neutral-subtle">
                  {stat.label}
                </p>
                <p className="font-body font-bold text-[17px] text-navy-bolder mt-0.5">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-start gap-3 max-w-[460px]">
              <Toggle on={autoRenew} label="Auto-renew membership" onChange={handleAutoRenew} />
              <p className="font-body text-[14px] text-neutral-subtle leading-relaxed">
                {autoRenew ? (
                  <>
                    Auto-renew is on. We’ll charge your Visa ending 4242 on {membership.renewsOn}.
                  </>
                ) : (
                  <>Auto-renew is off. We’ll email you before your membership lapses on {membership.renewsOn}.</>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/membership/join"
                className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
              >
                Renew now
              </Link>
              <Link
                to="/account/payment"
                className="inline-flex items-center justify-center font-body font-bold text-[15px] text-navy-bolder px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
              >
                Update payment
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Fallback that reproduces the live site's Salesforce-unavailable state. */
        <div className="border border-l-4 border-[#f0d98a] bg-[#fff8d6] px-6 py-5">
          <p className="font-body font-bold text-[16px] text-navy-bolder mb-1">
            Membership information is temporarily unavailable
          </p>
          <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
            Your member number is {membership.memberNumber}. Please contact Member Services at{' '}
            <a href="tel:4102686110" className="text-link">410-268-6110</a>{' '}
            with any membership questions.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Recent orders ───────────────────────────────────────────── */}
        <AccountCard title="Recent orders" action={<SectionLink to="/account/orders">All orders</SectionLink>}>
          <ul className="flex flex-col">
            {recentOrders.map(o => (
              <li key={o.number} className="py-3 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="font-body font-bold text-[14px] text-navy-bolder">{o.number}</p>
                  <p className="font-body font-bold text-[15px] text-navy-bolder">${o.total.toFixed(2)}</p>
                </div>
                <p className="font-body text-[13px] text-neutral-subtle leading-snug mt-0.5">
                  {o.placedOn} · {o.state}
                </p>
              </li>
            ))}
          </ul>
        </AccountCard>

        {/* ── Subscriptions ───────────────────────────────────────────── */}
        <AccountCard
          title="Your subscriptions"
          action={<SectionLink to="/account/subscriptions">Manage</SectionLink>}
        >
          <dl className="flex flex-col">
            {subscriptions.map(s => (
              <DataRow
                key={s.title}
                label={s.title}
                value={
                  <>
                    Next issue {s.nextIssue}
                    <br />
                    <span className="text-[13px]">Renews {s.renewsOn}</span>
                  </>
                }
              />
            ))}
          </dl>
        </AccountCard>

        {/* Saved articles is parked with giving — out of the account menu and
            off this dashboard for phase one. /account/saved still works, and
            the card lives on the next-gen dashboard. */}

        {/* ── Wishlist ────────────────────────────────────────────────── */}
        <AccountCard title="Wishlist" action={<SectionLink to="/account/wishlist">All saved books</SectionLink>}>
          <ul className="flex flex-col">
            {wishlist.slice(0, 3).map(({ book }) => (
              <li key={book.id} className="flex items-start gap-3 py-3 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0">
                <img
                  src={book.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="flex-shrink-0 w-10 aspect-[2/3] object-cover shadow-[0_2px_8px_rgba(0,18,51,0.14)]"
                />
                <div className="min-w-0 flex-1">
                  <Link
                    to={book.href}
                    className="link-underline-hover font-body font-bold text-[15px] text-navy-bolder hover:text-navy-bright transition-colors"
                  >
                    {book.title}
                  </Link>
                  <p className="font-body text-[13px] text-neutral-subtle mt-0.5">
                    {book.format} · ${book.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </AccountCard>

        {/* Giving is out of scope for phase one, so there is no "Your giving"
            card here and no Giving history entry in the account menu. The page
            itself still works at /account/giving, and the card — totals, last
            gift, and progress toward the Leadership Circle — is built out on
            the next-gen dashboard. */}
      </div>

      {/* ── Confirm turning auto-renew off ────────────────────────────── */}
      <Modal
        open={confirmOff}
        onClose={() => setConfirmOff(false)}
        title="Turn off auto-renew?"
        maxWidth="520px"
      >
        <Alert variant="warning" title={`Your membership would end on ${membership.renewsOn}`}>
          We won’t charge your card again. On that date your {membership.plan} lapses, and access
          to <em>Proceedings</em>, <em>Naval History</em>, and the digital archive ends with it.
        </Alert>

        <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
          You can turn auto-renew back on at any time before{' '}
          <strong className="font-semibold">{membership.renewsOn}</strong> and nothing will change.
        </p>

        {/* The safe choice is the solid button and comes first, so the
            destructive one is never the default action under a stray tap. */}
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              setAutoRenew(false)
              setConfirmOff(false)
            }}
            className="inline-flex items-center justify-center font-body font-bold text-[15px] text-[#c1121f] px-5 py-3 border border-[#c1121f] hover:bg-[#c1121f] hover:text-white transition-colors"
          >
            Turn off auto-renew
          </button>
          <button
            type="button"
            onClick={() => setConfirmOff(false)}
            className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
          >
            Keep auto-renew on
          </button>
        </div>
      </Modal>

    </AccountLayout>
  )
}
