import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout, { ACCOUNT_NAV_NEXT_GEN } from '@/components/layout/AccountLayout'
import { AccountCard, Badge, DataRow, SectionLink, Toggle } from '@/components/ui/AccountCard'
import Modal from '@/components/ui/Modal'
import Alert from '@/components/ui/Alert'
import { membership, orders, savedArticles, subscriptions, wishlist } from '@/data/account'
import {
  activeEntitlements,
  amountToNextTier,
  currentTier,
  inactiveEntitlements,
  lifeBreakEvenYears,
  lifeUpgrade,
  memberPerks,
  monthlySuggestion,
  monthsLeftInYear,
  nextGenGiving,
  nextGenGivingTotals,
  nextTier,
  recognitionLadder,
  tierCourtesies,
} from '@/data/accountNextGen'

/**
 * Account dashboard, next gen — at `/account/next-gen`.
 *
 * Separate from the account dashboard being built for USNI, and deliberately
 * kept that way: the route is not in `ACCOUNT_NAV`, so the page is reachable
 * only by typing the URL. Nothing in the account section links to it, and it
 * imports no module that the shipped pages do not already import, so it can be
 * deleted (with `data/accountNextGen.ts` and its route) and leave no trace.
 *
 * The shipped dashboard (`AccountDashboard`) answers "am I current?" and lists
 * the member's own records. Two things were cut from it on the way out, and
 * this page puts them back with more room than the original blocks had:
 *
 *  1. **What your membership includes.** The original was a flat checklist of
 *     four entitlements. Here it splits into what the plan covers, what it does
 *     not (each with a way to add it), and the discounts a membership carries —
 *     then hands off to the Life upgrade, so the block ends on an action rather
 *     than a list.
 *  2. **Donation progress.** The original was a 2px bar in the corner of the
 *     giving card, against a $0 year-to-date that left it permanently empty.
 *     Here it is a full-width meter over the real recognition ladder, naming
 *     the society the member is working toward and what reaching it carries.
 *
 * The status card, auto-renew confirmation, and record cards are carried over
 * unchanged so the two pages can be compared on the differences that matter.
 * Giving figures come from `data/accountNextGen.ts`, which explains why.
 */
export default function AccountDashboardNextGen() {
  const [autoRenew, setAutoRenew] = useState(membership.autoRenew)
  const [confirmOff, setConfirmOff] = useState(false)
  const recentOrders = orders.slice(0, 3)

  const goal = nextTier?.threshold ?? nextGenGivingTotals.yearToDate
  const pct = Math.min(100, Math.round((nextGenGivingTotals.yearToDate / goal) * 100))
  const lastGift = nextGenGiving[0]

  /*
   * Same friction as the shipped dashboard: switching auto-renew off lapses the
   * membership, so it asks first; switching it back on is a single tap.
   */
  const handleAutoRenew = () => {
    if (autoRenew) setConfirmOff(true)
    else setAutoRenew(true)
  }

  return (
    <AccountLayout
      title="Dashboard"
      lede="Your membership, what it includes, your giving, and recent activity."
      /* The full menu, so Giving history and Saved articles — parked out of the
         shipped menu — stay reachable from this prototype. */
      nav={ACCOUNT_NAV_NEXT_GEN}
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
                  <>Auto-renew is on. We’ll charge your Visa ending 4242 on {membership.renewsOn}.</>
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
            <a href="tel:4102686110" className="text-link">410-268-6110</a> with any membership questions.
          </p>
        </div>
      )}

      {/* ── What your membership includes ─────────────────────────────── */}
      <AccountCard
        title="What your membership includes"
        action={<SectionLink to="/membership/join">Compare plans</SectionLink>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
          <div>
            <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-3">
              On your plan
            </p>
            <ul className="flex flex-col gap-3">
              {activeEntitlements.map(e => (
                <li key={e.role} className="flex items-start gap-3">
                  <i
                    className="fa-solid fa-circle-check text-[15px] text-[#0a5c2e] mt-0.5 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-body font-bold text-[15px] text-navy-bolder">{e.label}</p>
                    <p className="font-body text-[13px] text-neutral-subtle leading-snug">{e.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* The half the shipped block only greyed out. A member who sees
              "not on your plan" and no way to change that has been told about a
              paywall, not offered anything. */}
          <div>
            <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-3">
              Not on your plan
            </p>
            <ul className="flex flex-col gap-3">
              {inactiveEntitlements.map(e => (
                <li
                  key={e.role}
                  className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-[#f8fafd] border border-[#e2e8f0] px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-body font-bold text-[15px] text-navy-bolder">{e.label}</p>
                    <p className="font-body text-[13px] text-neutral-subtle leading-snug">
                      {/* The shared record's detail ends in "— not on your plan",
                          which this column's heading already says. */}
                      {e.detail.replace(/\s*—\s*not on your plan$/i, '')}
                    </p>
                  </div>
                  <Link
                    to="/account/subscriptions"
                    className="inline-flex items-center gap-2 font-body font-semibold text-[14px] text-link whitespace-nowrap"
                  >
                    Add it
                    <i className="fa-solid fa-arrow-right text-[11px]" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Member discounts ────────────────────────────────────────── */}
        <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
          <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-4">
            Also included
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-5">
            {memberPerks.map(perk => (
              <li key={perk.label} className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 w-9 h-9 bg-[#ebf4ff] flex items-center justify-center"
                  aria-hidden="true"
                >
                  <i className={`fa-solid ${perk.icon} text-[15px] text-[#023e7d]`} />
                </span>
                <div className="min-w-0">
                  <p className="font-body font-bold text-[15px] text-navy-bolder leading-snug">{perk.label}</p>
                  <p className="font-body text-[13px] text-neutral-subtle leading-snug mb-1">{perk.detail}</p>
                  <Link
                    to={perk.href}
                    className="link-underline-hover font-body font-semibold text-[13px] text-link"
                  >
                    {perk.cta}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </AccountCard>

      {/* ── Upgrade to Life ───────────────────────────────────────────── */}
      <section className="border border-navy-bolder bg-navy-bolder text-white">
        <div className="flex flex-col lg:flex-row lg:items-stretch">
          <div className="flex-1 min-w-0 px-6 py-7 lg:py-8">
            <p className="font-body font-medium text-[12px] uppercase tracking-[0.08em] text-light-blue mb-2">
              Never renew again
            </p>
            <h3 className="font-headline text-[28px] lg:text-[32px] leading-tight mb-2">{lifeUpgrade.name}</h3>
            <p className="font-body text-[15px] text-light-blue leading-relaxed max-w-[540px] mb-5">
              {lifeUpgrade.pitch}
            </p>
            <ul className="flex flex-col gap-2">
              {lifeUpgrade.bullets.map(b => (
                <li key={b} className="flex items-start gap-3">
                  <i
                    className="fa-solid fa-check text-[13px] text-gold mt-1 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="font-body text-[15px] text-white leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price rail. The comparison is arithmetic the member can check —
              how many years of dues the one-time price covers — not a savings
              claim, which would depend on a renewal rate nobody can promise. */}
          <div className="lg:w-[320px] lg:flex-shrink-0 bg-navy-boldest px-6 py-7 lg:py-8 flex flex-col justify-center gap-4 border-t lg:border-t-0 lg:border-l border-[#2b5496]">
            <div>
              <p className="font-headline text-[44px] leading-none">{lifeUpgrade.price}</p>
              <p className="font-body text-[13px] uppercase tracking-[0.06em] text-light-blue mt-1">
                {lifeUpgrade.priceNote}
              </p>
            </div>
            <p className="font-body text-[14px] text-light-blue leading-relaxed">
              About {lifeBreakEvenYears} years of dues at your current ${membership.price}/year rate.
            </p>
            <Link
              to={lifeUpgrade.ctaHref}
              className="inline-flex items-center justify-center bg-gold text-navy-bolder font-body font-bold text-[15px] px-5 py-3 border border-gold hover:bg-gold-dark hover:border-gold-dark transition-colors"
            >
              {lifeUpgrade.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Giving progress ───────────────────────────────────────────── */}
      <AccountCard
        title="Your giving"
        action={<SectionLink to="/account/giving">Giving history</SectionLink>}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#e2e8f0] divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0] mb-7">
          {[
            {
              label: `${nextGenGivingTotals.calendarYear} to date`,
              value: `$${nextGenGivingTotals.yearToDate.toLocaleString()}`,
            },
            { label: 'Lifetime giving', value: `$${nextGenGivingTotals.lifetime.toLocaleString()}` },
            { label: 'Last gift', value: `$${lastGift.amount.toLocaleString()}`, note: lastGift.givenOn },
          ].map(s => (
            <div key={s.label} className="px-5 py-4">
              <p className="font-body font-semibold text-[12px] uppercase tracking-[0.06em] text-neutral-subtle">
                {s.label}
              </p>
              <p className="font-headline text-[28px] text-[#023e7d] leading-tight mt-0.5">{s.value}</p>
              {s.note && <p className="font-body text-[13px] text-neutral-subtle mt-0.5">{s.note}</p>}
            </div>
          ))}
        </div>

        {nextTier ? (
          <>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 mb-2">
              <p className="font-body font-bold text-[15px] text-navy-bolder">
                ${amountToNextTier.toLocaleString()} from the {nextTier.name}
              </p>
              <p className="font-body text-[13px] text-neutral-subtle">
                {`$${nextGenGivingTotals.yearToDate.toLocaleString()} of $${nextTier.threshold.toLocaleString()}`}{' '}
                in {nextGenGivingTotals.calendarYear}
              </p>
            </div>

            {/*
              The bar carries progressbar semantics rather than being decorative
              chrome, so a screen reader is told the same number the fill shows.
              `aria-valuetext` names the society, because "600 of 1000" on its
              own says nothing about what reaching it means.

              The bar is scaled to the next tier alone, not the whole ladder:
              the four bands run $1,000 to $25,000, so one bar spanning all of
              them would squeeze the only band in play into a sliver. The ladder
              below carries the full scale instead.
            */}
            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={nextTier.threshold}
              aria-valuenow={nextGenGivingTotals.yearToDate}
              aria-valuetext={`$${nextGenGivingTotals.yearToDate.toLocaleString()} of $${nextTier.threshold.toLocaleString()} toward the ${nextTier.name}`}
              className="h-3 bg-[#e2e8f0]"
            >
              <div className="h-3 bg-[#023e7d]" style={{ width: `${pct}%` }} />
            </div>

            <p className="font-body text-[14px] text-neutral-subtle leading-relaxed mt-3">
              Gifts totalling ${nextTier.threshold.toLocaleString()} within {nextGenGivingTotals.calendarYear}{' '}
              are recognized in the {nextTier.name}
              {currentTier && <> — you are already recognized in the {currentTier.name}</>}. A recurring gift of{' '}
              <strong className="font-semibold text-navy-bolder">${monthlySuggestion}/month</strong> for the last{' '}
              {monthsLeftInYear} months of the year would get you there.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                to="/giving/donate"
                className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
              >
                Give ${amountToNextTier.toLocaleString()} now
              </Link>
              <Link
                to="/giving/donate"
                className="inline-flex items-center justify-center font-body font-bold text-[15px] text-navy-bolder px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
              >
                Set up ${monthlySuggestion}/month
              </Link>
            </div>
          </>
        ) : (
          <Alert variant="success" title={`You are recognized in the ${currentTier?.name}`}>
            Your {nextGenGivingTotals.calendarYear} giving has reached the top annual recognition society.
          </Alert>
        )}

        {/* ── The ladder ──────────────────────────────────────────────── */}
        <div className="mt-8 pt-6 border-t border-[#e2e8f0]">
          <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-4">
            Annual recognition societies
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recognitionLadder.map(tier => {
              const reached = nextGenGivingTotals.yearToDate >= tier.threshold
              const isNext = nextTier?.slug === tier.slug
              return (
                <li
                  key={tier.slug}
                  className={`flex flex-col gap-1 border-t-4 pt-3 ${
                    reached ? 'border-[#0a5c2e]' : isNext ? 'border-[#023e7d]' : 'border-[#e2e8f0]'
                  }`}
                >
                  <p className="font-body font-bold text-[13px] text-navy-bolder leading-snug">
                    ${tier.threshold.toLocaleString()}+
                  </p>
                  <Link
                    to={tier.href}
                    className={`link-underline-hover font-body text-[14px] leading-snug ${
                      reached || isNext ? 'text-navy-bolder font-semibold' : 'text-neutral-subtle'
                    }`}
                  >
                    {tier.name}
                  </Link>
                  {reached && (
                    <span className="mt-1 self-start">
                      <Badge tone="active">Reached</Badge>
                    </span>
                  )}
                  {isNext && (
                    <span className="mt-1 self-start">
                      <Badge tone="info">Next</Badge>
                    </span>
                  )}
                </li>
              )
            })}
          </ol>

          {nextTier && (
            <div className="mt-5 bg-[#f8fafd] border border-[#e2e8f0] px-5 py-4">
              <p className="font-body font-bold text-[14px] text-navy-bolder mb-2">
                What the {nextTier.name} carries
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
                {tierCourtesies.map(c => (
                  <li key={c} className="flex items-start gap-2.5">
                    <i
                      className="fa-solid fa-check text-[12px] text-[#023e7d] mt-1 flex-shrink-0"
                      aria-hidden="true"
                    />
                    <span className="font-body text-[14px] text-neutral-subtle leading-snug">{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </AccountCard>

      {/* ── Records ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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

        <AccountCard title="Saved articles" action={<SectionLink to="/account/saved">All saved</SectionLink>}>
          <ul className="flex flex-col">
            {savedArticles.map(a => (
              <li key={a.href} className="py-3 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0">
                <Link
                  to={a.href}
                  className="link-underline-hover font-body font-bold text-[15px] text-navy-bolder hover:text-navy-bright transition-colors"
                >
                  {a.title}
                </Link>
                <p className="font-body text-[13px] text-neutral-subtle mt-0.5">
                  {a.publication} · {a.issue}
                </p>
              </li>
            ))}
          </ul>
        </AccountCard>

        <AccountCard title="Wishlist" action={<SectionLink to="/account/wishlist">All saved books</SectionLink>}>
          <ul className="flex flex-col">
            {wishlist.slice(0, 3).map(({ book }) => (
              <li
                key={book.id}
                className="flex items-start gap-3 py-3 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0"
              >
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
      </div>

      {/* ── Confirm turning auto-renew off ────────────────────────────── */}
      <Modal
        open={confirmOff}
        onClose={() => setConfirmOff(false)}
        title="Turn off auto-renew?"
        maxWidth="520px"
      >
        <Alert variant="warning" title={`Your membership would end on ${membership.renewsOn}`}>
          We won’t charge your card again. On that date your {membership.plan} lapses, and access to{' '}
          <em>Proceedings</em>, <em>Naval History</em>, and the digital archive ends with it.
        </Alert>

        <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
          You can turn auto-renew back on at any time before{' '}
          <strong className="font-semibold">{membership.renewsOn}</strong> and nothing will change.
        </p>

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
