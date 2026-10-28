import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout from '@/components/layout/AccountLayout'
import { AccountCard, Badge, DataTable, EmptyState, Td } from '@/components/ui/AccountCard'
import { orders, type OrderRecord } from '@/data/account'

/**
 * Orders & receipts.
 *
 * The live view is a single flat table (Order number | Date | Total | State) with
 * a standing "may take a few minutes to appear" notice and no way to reach a
 * receipt. Commerce already distinguishes membership, subscription, donation, and
 * product orders, so this filters on that and links each row to its receipt where
 * the prototype has one.
 */

const FILTERS = [
  { id: 'all', label: 'All orders' },
  { id: 'membership', label: 'Membership' },
  { id: 'books', label: 'Books & Press' },
  { id: 'donation', label: 'Giving' },
] as const

const STATE_TONE: Record<OrderRecord['state'], 'active' | 'info' | 'muted' | 'warn'> = {
  Completed: 'active',
  Shipped: 'info',
  Processing: 'warn',
  Refunded: 'muted',
}

export default function AccountOrders() {
  const [filter, setFilter] = useState<typeof FILTERS[number]['id']>('all')
  const visible = filter === 'all' ? orders : orders.filter(o => o.kind === filter)

  return (
    <AccountLayout
      title="Orders & receipts"
      lede="Every membership, book, and gift order on your account. Receipts stay available here."
    >
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => {
          const active = filter === f.id
          const count = f.id === 'all' ? orders.length : orders.filter(o => o.kind === f.id).length
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              aria-pressed={active}
              className={`font-body font-semibold text-[14px] px-4 py-2 border transition-colors ${
                active
                  ? 'bg-navy-bolder text-white border-navy-bolder'
                  : 'bg-white text-navy-bolder border-[#c4c9d4] hover:border-navy-bolder'
              }`}
            >
              {f.label} ({count})
            </button>
          )
        })}
      </div>

      <AccountCard>
        {visible.length === 0 ? (
          <EmptyState
            icon="fa-receipt"
            title="No orders in this category"
            action={
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="font-body font-semibold text-[15px] text-link"
              >
                Show all orders
              </button>
            }
          >
            Recently placed orders can take a few minutes to appear here.
          </EmptyState>
        ) : (
          <DataTable
            caption="Your order history"
            columns={['Order', 'Date', 'Items', 'Total', 'Status', 'Details']}
          >
            {visible.map(o => (
              <tr key={o.number} className="border-b border-[#e8eaed] last:border-b-0">
                <Td className="font-bold text-navy-bolder whitespace-nowrap">{o.number}</Td>
                <Td className="whitespace-nowrap">{o.placedOn}</Td>
                <Td>{o.items}</Td>
                <Td className="font-bold text-navy-bolder whitespace-nowrap">${o.total.toFixed(2)}</Td>
                <Td><Badge tone={STATE_TONE[o.state]}>{o.state}</Badge></Td>
                <Td>
                  {o.receiptHref ? (
                    <Link
                      to={o.receiptHref}
                      className="inline-flex items-center gap-1.5 font-body font-semibold text-[14px] whitespace-nowrap text-link"
                    >
                      View details
                      <i className="fa-solid fa-arrow-right text-[11px]" aria-hidden="true" />
                    </Link>
                  ) : (
                    <span className="font-body text-[14px] text-neutral-subtle">—</span>
                  )}
                </Td>
              </tr>
            ))}
          </DataTable>
        )}
      </AccountCard>

      <p className="font-body text-[14px] text-neutral-subtle leading-relaxed max-w-[640px]">
        A recently placed order can take a few minutes to appear. If something looks wrong,{' '}
        <a href="/contact" className="text-link">contact us</a>{' '}
        with the order number and we’ll sort it out.
      </p>
    </AccountLayout>
  )
}
