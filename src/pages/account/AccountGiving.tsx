import { Link } from 'react-router-dom'
import AccountLayout, { ACCOUNT_NAV_NEXT_GEN } from '@/components/layout/AccountLayout'
import { AccountCard, Badge, DataTable, Td } from '@/components/ui/AccountCard'
import { giving, givingTotals } from '@/data/account'
import { FOUNDATION_EMAIL, FOUNDATION_PHONE, FOUNDATION_TAX_ID } from '@/data/transactions'

/**
 * Giving history, kept separate from Orders.
 *
 * A gift receipt carries the Foundation's 501(c)(3) statement and Tax ID that a
 * book order does not, and donors need annual totals at tax time — which a mixed
 * order table cannot give them.
 */
export default function AccountGiving() {
  const remaining = givingTotals.leadershipCircleThreshold - givingTotals.yearToDate

  return (
    <AccountLayout
      title="Giving history"
      lede="Your gifts to the Naval Institute Foundation, with receipts for your records."
      /* A parked page, so it carries the full menu rather than the shipped one
         that omits it — otherwise arriving here from the next-gen dashboard
         drops the link you just followed. */
      nav={ACCOUNT_NAV_NEXT_GEN}
      actions={
        <Link
          to="/giving/donate"
          className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
        >
          Make a gift
        </Link>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#c4c9d4] divide-y sm:divide-y-0 sm:divide-x divide-[#c4c9d4]">
        {[
          { label: `${givingTotals.calendarYear} to date`, value: `$${givingTotals.yearToDate.toLocaleString()}` },
          { label: 'Lifetime giving', value: `$${givingTotals.lifetime.toLocaleString()}` },
          { label: 'Gifts on record', value: String(giving.length) },
        ].map(s => (
          <div key={s.label} className="px-6 py-5">
            <p className="font-body font-semibold text-[12px] uppercase tracking-[0.06em] text-neutral-subtle">
              {s.label}
            </p>
            <p className="font-headline text-[30px] text-[#023e7d] leading-tight mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      <AccountCard title="Your gifts">
        <DataTable
          caption="Donation history"
          columns={['Receipt', 'Date', 'Designation', 'Amount', 'Type', '']}
        >
          {giving.map(g => (
            <tr key={g.receipt} className="border-b border-[#e8eaed] last:border-b-0">
              <Td className="font-bold text-navy-bolder whitespace-nowrap">{g.receipt}</Td>
              <Td className="whitespace-nowrap">{g.givenOn}</Td>
              <Td>
                {g.designation}
                {g.anonymous && (
                  <span className="ml-2 inline-block align-middle"><Badge tone="muted">Anonymous</Badge></span>
                )}
              </Td>
              <Td className="font-bold text-navy-bolder whitespace-nowrap">${g.amount.toLocaleString()}</Td>
              <Td className="whitespace-nowrap">{g.frequency}</Td>
              <Td>
                {g.receiptHref ? (
                  <Link
                    to={g.receiptHref}
                    className="inline-flex items-center gap-1.5 font-body font-semibold text-[14px] text-link whitespace-nowrap"
                  >
                    View receipt
                    <i className="fa-solid fa-arrow-right text-[11px]" aria-hidden="true" />
                  </Link>
                ) : (
                  <span className="font-body text-[14px] text-neutral-subtle">—</span>
                )}
              </Td>
            </tr>
          ))}
        </DataTable>
      </AccountCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AccountCard title="Leadership Circle">
          <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
            Gifts totalling ${givingTotals.leadershipCircleThreshold.toLocaleString()} or more within a calendar
            year are recognized in the Leadership Circle. You are ${remaining.toLocaleString()} away for{' '}
            {givingTotals.calendarYear}.
          </p>
        </AccountCard>

        <AccountCard title="Tax information">
          <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
            The Naval Institute Foundation is a 501(c)(3) public charity, Tax ID{' '}
            <span className="font-bold text-navy-bolder">{FOUNDATION_TAX_ID}</span>. For a consolidated annual
            statement, contact{' '}
            <a href={`mailto:${FOUNDATION_EMAIL}`} className="text-[#023e7d] underline underline-offset-2">
              {FOUNDATION_EMAIL}
            </a>{' '}
            or call{' '}
            <a href={`tel:${FOUNDATION_PHONE.replace(/[^0-9]/g, '')}`} className="text-link">
              {FOUNDATION_PHONE}
            </a>.
          </p>
        </AccountCard>
      </div>
    </AccountLayout>
  )
}
