import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import PropsTable from '@/components/design-system/PropsTable'
import { ACCOUNT_NAV, ACCOUNT_NAV_NEXT_GEN } from '@/components/layout/AccountLayout'
import AccountNotifications from '@/components/ui/AccountNotifications'
import { AccountCard, Badge, DataRow, DataTable, EmptyState, SectionLink, Td, Toggle } from '@/components/ui/AccountCard'
import Alert from '@/components/ui/Alert'
import BookPrice from '@/components/ui/BookPrice'
import {
  addresses,
  member,
  memberUpdates,
  membership,
  orders,
  paymentMethods,
  savedArticles,
  subscriptions,
  wishlist,
  type OrderRecord,
} from '@/data/account'
import { PLACEHOLDER_IMAGE } from '@/data/leadership'

/* ─── Doc helpers ──────────────────────────────────────────────────────────── */

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px] text-navy-subtle [overflow-wrap:anywhere]">{children}</code>
}

function Prose({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

type NavGroup = (typeof ACCOUNT_NAV)[number]

/* ─── Extracted shell pieces ───────────────────────────────────────────────────
   AccountLayout's avatar, sidebar nav, and drawer are private to the layout
   (and the layout itself renders the site header and footer), so they are
   re-rendered here from its source with the classes copied verbatim. The menu
   data is the real exported ACCOUNT_NAV. */

function Avatar() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-32 h-32">
        <div className="w-32 h-32 rounded-full overflow-hidden border-[6px] border-tan bg-tan-subtlest">
          <img src={PLACEHOLDER_IMAGE} alt="" aria-hidden="true" className="w-full h-full object-cover" />
        </div>
        <button
          type="button"
          aria-label="Edit photo"
          title="Edit photo"
          className="absolute bottom-0 left-0 flex items-center justify-center w-10 h-10 rounded-full
                     bg-navy-bright text-white border-2 border-white shadow-md
                     hover:bg-navy-bolder transition-colors"
        >
          <i className="fa-solid fa-pen text-[14px]" aria-hidden="true" />
        </button>
      </div>
      <p className="font-headline text-[22px] text-navy-bolder leading-tight text-center">
        {member.salutation} {member.lastName}
      </p>
      <p className="font-body text-[13px] text-neutral-subtle text-center">
        Member #{membership.memberNumber}
        <br />
        Since {member.memberSince}
      </p>
    </div>
  )
}

function SidebarNav({ nav, activeHref }: { nav: NavGroup[]; activeHref: string }) {
  return (
    <nav aria-label="Account" className="flex flex-col gap-6">
      {nav.map(group => (
        <div key={group.title} className="flex flex-col">
          <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-2">
            {group.title}
          </p>
          <ul className="flex flex-col">
            {group.items.map(item => {
              const active = activeHref === item.href
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center justify-between gap-3 px-3 py-2.5 font-body text-[15px] border-l-2 transition-colors ${
                      active
                        ? 'border-[#023e7d] bg-white font-bold text-navy-bolder'
                        : 'border-transparent text-neutral-subtle hover:bg-white hover:text-navy-bolder'
                    }`}
                  >
                    {item.label}
                    <i
                      className={`fa-solid fa-arrow-right text-[11px] ${active ? 'text-[#023e7d]' : 'text-[#c4c9d4]'}`}
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
      <div className="border-t border-[#c4c9d4] pt-4">
        <Link
          to="/login?logged-out=1"
          className="flex w-full items-center justify-center gap-2 bg-navy-bolder text-white
                     font-body font-bold text-[15px] px-4 py-3 border border-navy-bolder
                     hover:bg-navy-bright hover:border-navy-bright transition-colors"
        >
          <i className="fa-solid fa-arrow-right-from-bracket text-[12px]" aria-hidden="true" />
          Log out
        </Link>
      </div>
    </nav>
  )
}

function Sidebar({ activeHref }: { activeHref: string }) {
  return (
    <aside className="hidden lg:flex w-full lg:w-[280px] lg:flex-shrink-0 bg-[#f4f6fb] border border-[#e2e8f0] p-6 flex-col gap-7 lg:sticky lg:top-8">
      <Avatar />
      <div className="h-px bg-[#c4c9d4]" />
      <SidebarNav nav={ACCOUNT_NAV} activeHref={activeHref} />
    </aside>
  )
}

function Banner({ bell }: { bell: ReactNode }) {
  return (
    <div className="bg-[#ebf4ff]">
      <div className="container-site py-10 lg:py-14 flex flex-wrap items-center justify-between gap-6">
        <div className="min-w-0">
          <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-[#023e7d] mb-2">My Account</p>
          <h1 className="font-headline text-[36px] lg:text-[48px] text-navy-bolder leading-[1.1]">
            Welcome back, {member.firstName}
          </h1>
        </div>
        {bell}
      </div>
    </div>
  )
}

function PageHeading({ title, lede, actions }: { title: string; lede?: string; actions?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e2e8f0] pb-5">
      <div className="min-w-0">
        <h2 className="font-headline text-[30px] lg:text-[34px] text-navy-bolder leading-[1.15]">{title}</h2>
        {lede && (
          <p className="font-body text-[15px] text-neutral-subtle leading-relaxed mt-1.5 max-w-[760px]">{lede}</p>
        )}
      </div>
      {actions}
    </div>
  )
}

function AddButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-2 bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
    >
      <i className="fa-solid fa-plus text-[12px]" aria-hidden="true" />
      {label}
    </button>
  )
}

function MenuToggle() {
  return (
    <button
      type="button"
      aria-expanded={false}
      aria-controls="account-drawer"
      className="lg:hidden flex items-center gap-3 w-full bg-white border border-[#c4c9d4]
                 px-5 py-4 font-body font-bold text-[16px] text-navy-bolder
                 hover:border-navy-bright hover:text-navy-bright transition-colors"
    >
      <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 5h14M3 10h14M3 15h14" />
      </svg>
      Account menu
    </button>
  )
}

/* ─── Notifications panel (open state, re-rendered from source) ─────────────── */

function NotificationsPanel() {
  const shown = memberUpdates.slice(0, 3)
  const unread = shown.filter(u => u.unread).length
  return (
    <div
      data-notif-panel
      className="w-[min(420px,calc(100vw-2.5rem))]
                 bg-white border border-[#c4c9d4] shadow-xl"
    >
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8fafd]">
        <div className="flex items-baseline gap-2.5 min-w-0">
          <h3 className="font-headline text-[19px] text-navy-bolder leading-tight">Member updates</h3>
          <p className="font-body text-[13px] text-neutral-subtle flex-shrink-0">{unread} new</p>
        </div>
        <button type="button" className="font-body font-semibold text-[13px] text-link flex-shrink-0">
          Dismiss all
        </button>
      </div>
      <ul className="flex flex-col max-h-[min(60vh,460px)] overflow-y-auto">
        {shown.map((update, i) => {
          const isUnread = i < 2
          return (
            <li
              key={update.id}
              className={`border-b border-[#e8eaed] last:border-b-0 flex items-stretch transition-colors
                hover:bg-[#ebf4ff] ${isUnread ? 'bg-white' : 'bg-[#fbfcfe]'}`}
            >
              <button type="button" className="flex-1 min-w-0 text-left pl-5 pr-2 py-4 flex gap-3">
                <span
                  className={`flex-shrink-0 w-2 h-2 rounded-full mt-[7px] ${isUnread ? 'bg-[#c1121f]' : 'bg-transparent'}`}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex flex-col gap-1">
                  <span
                    className={`font-body text-[15px] leading-snug ${
                      isUnread ? 'font-bold text-navy-bolder' : 'font-semibold text-neutral-subtle'
                    }`}
                  >
                    {update.title}
                  </span>
                  <span className="font-body text-[13px] text-neutral-subtle leading-snug">{update.blurb}</span>
                  <span className="flex items-center gap-2 mt-0.5">
                    <span className="font-body text-[12px] text-[#8a91a1]">{update.date}</span>
                    {isUnread && (
                      <span className="font-body font-bold text-[10px] uppercase tracking-[0.08em] text-[#c1121f] border border-[#f0b7bc] bg-[#fdf0f1] px-1.5 py-0.5 leading-none">
                        New
                      </span>
                    )}
                  </span>
                </span>
              </button>
              <button
                type="button"
                aria-label={`Dismiss ${update.title}`}
                title="Dismiss"
                className="flex-shrink-0 flex items-start justify-center w-11 pt-4 pb-4
                           text-[#8a91a1] hover:text-[#c1121f] transition-colors"
              >
                <svg className="w-3.5 h-3.5 mt-1" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" />
                </svg>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function PromoCode({ code, note }: { code: string; note: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-tan-subtlest border-l-4 border-gold px-5 py-4">
      <span className="font-body font-bold text-[13px] uppercase tracking-[0.08em] text-neutral-subtle">Code</span>
      <span className="font-body font-bold text-[20px] tracking-[0.06em] text-navy-bolder">{code}</span>
      <span className="font-body text-[14px] text-neutral-subtle leading-snug">{note}</span>
    </div>
  )
}

/* ─── Dashboard membership panel ───────────────────────────────────────────── */

function MembershipPanel() {
  const [on, setOn] = useState(true)
  return (
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
            <p className="font-body font-semibold text-[12px] uppercase tracking-[0.06em] text-neutral-subtle">{stat.label}</p>
            <p className="font-body font-bold text-[17px] text-navy-bolder mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="px-6 py-5 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-start gap-3 max-w-[460px]">
          <Toggle on={on} label="Auto-renew membership" onChange={() => setOn(!on)} />
          <p className="font-body text-[14px] text-neutral-subtle leading-relaxed">
            {on ? (
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
  )
}

function MembershipUnavailable() {
  return (
    <div className="border border-l-4 border-[#f0d98a] bg-[#fff8d6] px-6 py-5">
      <p className="font-body font-bold text-[16px] text-navy-bolder mb-1">Membership information is temporarily unavailable</p>
      <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
        Your member number is {membership.memberNumber}. Please contact Member Services at{' '}
        <a href="tel:4102686110" className="text-link">410-268-6110</a> with any membership questions.
      </p>
    </div>
  )
}

function ConfirmButtons() {
  return (
    <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
      <button
        type="button"
        className="inline-flex items-center justify-center font-body font-bold text-[15px] text-[#c1121f] px-5 py-3 border border-[#c1121f] hover:bg-[#c1121f] hover:text-white transition-colors"
      >
        Turn off auto-renew
      </button>
      <button
        type="button"
        className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
      >
        Keep auto-renew on
      </button>
    </div>
  )
}

/* ─── Records ──────────────────────────────────────────────────────────────── */

function AddressCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {addresses.map((a, i) => (
        <AccountCard key={`${a.label}-${i}`} title={a.label} action={a.isDefault ? <Badge tone="info">Default</Badge> : undefined}>
          <address className="font-body text-[15px] text-neutral-subtle not-italic leading-relaxed">
            <span className="font-bold text-navy-bolder">{a.name}</span>
            <br />
            {a.lines.map(l => <span key={l}>{l}<br /></span>)}
            {a.city}, {a.state} {a.zip}
            <br />
            {a.country}
          </address>
          <div className="flex flex-wrap gap-4 mt-5 pt-4 border-t border-[#e8eaed]">
            <button type="button" className="font-body font-semibold text-[14px] text-link">Edit</button>
            {!a.isDefault && (
              <>
                <button type="button" className="font-body font-semibold text-[14px] text-link">Make default</button>
                <button type="button" className="font-body font-semibold text-[14px] text-[#c1121f] hover:underline">Remove</button>
              </>
            )}
          </div>
        </AccountCard>
      ))}
    </div>
  )
}

function PaymentTable() {
  return (
    <AccountCard>
      <DataTable caption="Saved payment methods" columns={['Card', 'Expires', 'Used for', '']}>
        {paymentMethods.map(m => (
          <tr key={m.last4} className="border-b border-[#e8eaed] last:border-b-0">
            <Td className="whitespace-nowrap">
              <span className="font-bold text-navy-bolder">{m.brand} ····&nbsp;{m.last4}</span>
              {m.isDefault && <span className="ml-2 inline-block align-middle"><Badge tone="info">Default</Badge></span>}
            </Td>
            <Td className="whitespace-nowrap">{m.expires}</Td>
            <Td>
              {m.usedFor.length > 0 ? (
                <ul className="flex flex-col gap-0.5">
                  {m.usedFor.map(u => <li key={u}>{u}</li>)}
                </ul>
              ) : (
                '—'
              )}
            </Td>
            <Td>
              <div className="flex flex-wrap gap-3 justify-end">
                <button type="button" className="font-body font-semibold text-[14px] text-link">Edit</button>
                {!m.isDefault && (
                  <button type="button" className="font-body font-semibold text-[14px] text-[#c1121f] hover:underline">Remove</button>
                )}
              </div>
            </Td>
          </tr>
        ))}
      </DataTable>
    </AccountCard>
  )
}

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

function OrdersView() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all')
  const visible = filter === 'all' ? orders : orders.filter(o => o.kind === filter)
  return (
    <div className="flex flex-col gap-8">
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
                active ? 'bg-navy-bolder text-white border-navy-bolder' : 'bg-white text-navy-bolder border-[#c4c9d4] hover:border-navy-bolder'
              }`}
            >
              {f.label} ({count})
            </button>
          )
        })}
      </div>
      <AccountCard>
        <DataTable caption="Your order history" columns={['Order', 'Date', 'Items', 'Total', 'Status', 'Details']}>
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
      </AccountCard>
    </div>
  )
}

function SubscriptionCard({ index, initialOn }: { index: number; initialOn: boolean }) {
  const s = subscriptions[index]
  const [on, setOn] = useState(initialOn)
  return (
    <AccountCard title={s.title} action={<Badge tone="active">Active</Badge>}>
      <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
        <dl className="flex-1 min-w-0 flex flex-col">
          <DataRow label="Format" value={s.format} />
          <DataRow label="Term" value={s.term} />
          <DataRow label="Next issue" value={s.nextIssue} />
          <DataRow label="Renews on" value={s.renewsOn} />
          <DataRow label="Price" value={s.price === 0 ? 'Included with membership' : `$${s.price}/year`} />
        </dl>
        <div className="lg:w-[300px] lg:flex-shrink-0 flex flex-col gap-4">
          <div className="flex items-start gap-3">
            <Toggle on={on} label={`Auto-renew ${s.title}`} onChange={() => setOn(!on)} />
            <p className="font-body text-[14px] text-neutral-subtle leading-relaxed">
              {on ? `Renews automatically on ${s.renewsOn}.` : `Ends on ${s.renewsOn} unless you renew.`}
            </p>
          </div>
        </div>
      </div>
    </AccountCard>
  )
}

/** Wishlist with remove and Undo — the real behaviour, from AccountWishlist. */
function WishlistDemo({ startRemoved }: { startRemoved?: boolean }) {
  const seed = wishlist.slice(0, 3)
  const [items, setItems] = useState(startRemoved ? seed.slice(1) : seed)
  const [removed, setRemoved] = useState<{ entry: (typeof wishlist)[number]; index: number } | null>(
    startRemoved ? { entry: seed[0], index: 0 } : null,
  )

  const remove = (id: string) => {
    const index = items.findIndex(i => i.book.id === id)
    if (index === -1) return
    setRemoved({ entry: items[index], index })
    setItems(items.filter(i => i.book.id !== id))
  }

  const undoRemove = () => {
    if (!removed) return
    setItems(current => {
      const next = [...current]
      next.splice(removed.index, 0, removed.entry)
      return next
    })
    setRemoved(null)
  }

  return (
    <div className="flex flex-col gap-8">
      {removed && (
        <Alert
          variant="success"
          title={`Removed ${removed.entry.book.title} from your wishlist`}
          action={
            <button
              type="button"
              onClick={undoRemove}
              className="bg-white border border-navy-bolder text-navy-bolder font-body font-bold text-[15px] px-5 py-2.5 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
            >
              Undo
            </button>
          }
        />
      )}
      <ul className="flex flex-col">
        {items.map(({ book, addedOn }) => (
          <li
            key={book.id}
            className="flex flex-wrap sm:flex-nowrap items-start gap-4 sm:gap-5 py-5 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0"
          >
            <Link to={book.href} className="flex-shrink-0 w-[68px]" tabIndex={-1} aria-hidden="true">
              <img
                src={book.image}
                alt=""
                loading="lazy"
                className="w-full aspect-[2/3] object-cover shadow-[0_2px_8px_rgba(0,18,51,0.14)]"
              />
            </Link>
            <div className="flex-1 min-w-0">
              <Link
                to={book.href}
                className="link-underline-hover font-headline text-[21px] text-navy-bolder leading-snug hover:text-navy-bright transition-colors"
              >
                {book.title}
              </Link>
              <p className="font-body text-[14px] text-neutral-subtle mt-1">{book.author}</p>
              <div className="mt-2">
                <BookPrice listPrice={book.originalPrice} memberPrice={book.price} format={book.format} />
              </div>
              <p className="font-body text-[13px] text-neutral-subtle mt-1.5">Added {addedOn}</p>
            </div>
            <div className="flex flex-col items-stretch gap-2 w-full sm:w-auto sm:flex-shrink-0">
              <Link
                to={`/books/cart?id=${book.id}&format=${encodeURIComponent(book.format)}&price=${book.price}`}
                className="inline-flex items-center justify-center gap-2 bg-gold text-navy-bolder font-body font-bold text-[14px] px-4 py-2.5 hover:bg-gold-dark transition-colors whitespace-nowrap"
              >
                <i className="fa-solid fa-cart-shopping text-[12px]" aria-hidden="true" />
                Add to cart
              </Link>
              <button
                type="button"
                onClick={() => remove(book.id)}
                className="inline-flex items-center justify-center gap-1.5 font-body font-semibold text-[14px] text-[#c1121f] px-4 py-2 border border-transparent hover:underline whitespace-nowrap"
              >
                <i className="fa-solid fa-xmark text-[12px]" aria-hidden="true" />
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SavedRow() {
  const a = savedArticles[0]
  return (
    <ul className="flex flex-col">
      <li className="flex flex-wrap items-start justify-between gap-4 py-4 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0">
        <div className="min-w-0">
          <p className="font-body font-medium text-[11px] uppercase tracking-[0.08em] text-[#023e7d] mb-1">
            {a.publication} · {a.issue}
          </p>
          <Link
            to={a.href}
            className="link-underline-hover font-headline text-[21px] text-navy-bolder leading-snug hover:text-navy-bright transition-colors"
          >
            {a.title}
          </Link>
          <p className="font-body text-[13px] text-neutral-subtle mt-1">Saved {a.savedOn}</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 font-body font-semibold text-[14px] text-[#c1121f] hover:underline flex-shrink-0"
        >
          <i className="fa-solid fa-xmark text-[12px]" aria-hidden="true" />
          Remove
        </button>
      </li>
    </ul>
  )
}

/* ─── Sheet ───────────────────────────────────────────────────────────────── */

const shippedHrefs = new Set(ACCOUNT_NAV.flatMap(g => g.items.map(i => i.href)))

export default function AccountComponents() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Account">
          <p>
            The signed-in member&rsquo;s own records: membership, profile, addresses, payment methods, orders,
            subscriptions, and the wishlist. Every page shares one shell, a pale-blue welcome banner with the
            Member Updates bell, a persistent sidebar menu, and a content column that opens with a page heading.
            The records are built from a small kit of bordered cards, label/value rows, tables, badges, and empty
            states.
          </p>
          <p>
            The shell keeps the live Drupal account&rsquo;s shape (banner plus left rail), because members know
            it, and changes the grouping. The member&rsquo;s records lead, and promotional content moves into the
            notification bell. An exploratory dashboard lives at <C>/account/next-gen</C>. It is deliberately
            unlinked and is not part of the shipped account, so it is not documented here.
          </p>
        </DocPageHeader>

        {/* ── Shell ─────────────────────────────────────────────────────── */}
        <DocSection title="Account layout">
          <div className="flex flex-col gap-8">
            <Prose>
              <C>AccountLayout</C> wraps every account page. Below the site header comes the banner (eyebrow,
              &ldquo;Welcome back, Matt&rdquo;, and the bell), then a white body. From <C>lg</C> (1024px) up, the
              body is a 280px sticky sidebar beside the content column. Below <C>lg</C> the sidebar is replaced by
              a full-width &ldquo;Account menu&rdquo; button that opens the same menu in a drawer from the left. The
              content column always opens with the page&rsquo;s own heading, an optional one-sentence lede, and
              page-level actions on the right.
            </Prose>

            <LiveMarkup label="Sidebar and content column (lg and up), on the Orders page" defaultOpen={false}>
              <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-start">
                <Sidebar activeHref="/account/orders" />
                <div className="flex-1 min-w-0 flex flex-col gap-8">
                  <PageHeading
                    title="Orders & receipts"
                    lede="Every membership, book, and gift order on your account. Receipts stay available here."
                  />
                  <AccountCard title="Recent orders" action={<SectionLink to="/account/orders">All orders</SectionLink>}>
                    <p className="font-body text-[15px] text-neutral-subtle">Page content.</p>
                  </AccountCard>
                </div>
              </div>
            </LiveMarkup>

            <LiveMarkup label="Page heading with an action (Addresses)">
              <PageHeading
                title="Addresses"
                lede="Where print issues, books, and member materials are sent."
                actions={<AddButton label="Add an address" />}
              />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Body', classes: 'bg-white py-10 lg:py-14', note: <>Inner <C>container-site</C>, then the row <C>flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-start</C>.</> },
                { part: 'Sidebar', classes: 'hidden lg:flex w-full lg:w-[280px] lg:flex-shrink-0 bg-[#f4f6fb] border border-[#e2e8f0] p-6 flex-col gap-7 lg:sticky lg:top-8', note: <>Hidden below lg. <C>#f4f6fb</C> has no token (a cool off-white, close to <C>neutral-subtlest</C>). <C>#e2e8f0</C> = <C>border-light</C>.</> },
                { part: 'Avatar ring', classes: 'w-32 h-32 rounded-full overflow-hidden border-[6px] border-tan bg-tan-subtlest', note: 'The same tan ring and watermark fallback the staff roster uses. One of the few round shapes in the system.' },
                { part: 'Edit photo', classes: 'absolute bottom-0 left-0 flex items-center justify-center w-10 h-10 rounded-full bg-navy-bright text-white border-2 border-white shadow-md hover:bg-navy-bolder transition-colors', note: <>Sits on the lower-left arc. Icon-only, so it has <C>aria-label</C> and <C>title</C> “Edit photo”. Not wired up in the prototype.</> },
                { part: 'Name / number', classes: 'font-headline text-[22px] text-navy-bolder leading-tight text-center', note: <>Salutation and last name. Below it, <C>font-body text-[13px] text-neutral-subtle text-center</C> “Member #10012345 / Since March 2019”.</> },
                { part: 'Group label', classes: 'font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-2', note: 'A visual caption (a <p>), not a heading.' },
                { part: 'Nav link', classes: 'flex items-center justify-between gap-3 px-3 py-2.5 font-body text-[15px] border-l-2 transition-colors', note: <>Active <C>border-[#023e7d] bg-white font-bold text-navy-bolder</C> with <C>aria-current="page"</C>. Inactive <C>border-transparent text-neutral-subtle hover:bg-white hover:text-navy-bolder</C>. Trailing arrow <C>fa-arrow-right text-[11px]</C>, navy when active and <C>#c4c9d4</C> otherwise.</> },
                { part: 'Log out', classes: 'flex w-full items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-[15px] px-4 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors', note: <>Below <C>border-t border-[#c4c9d4] pt-4</C>. Goes to <C>/login?logged-out=1</C>, which shows the success alert.</> },
                { part: 'Content column', classes: 'flex-1 min-w-0 flex flex-col gap-8', note: 'Every block on a page is a direct child, so the 32px rhythm is the column’s.' },
                { part: 'Page heading', classes: 'flex flex-wrap items-end justify-between gap-4 border-b border-[#e2e8f0] pb-5', note: 'Actions drop below the heading when they do not fit.' },
                { part: 'Page title', classes: 'font-headline text-[30px] lg:text-[34px] text-navy-bolder leading-[1.15]', note: 'An <h2>. The banner’s “Welcome back” is the page h1.' },
                { part: 'Lede', classes: 'font-body text-[15px] text-neutral-subtle leading-relaxed mt-1.5 max-w-[760px]', note: 'Every lede is one sentence. 760px, not 620px, because the longest (Wishlist, Payment methods) run about 700px and would break one word onto a second line.' },
                { part: 'Page action', classes: 'inline-flex items-center gap-2 bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors', note: <>Solid navy, not gold. Navy is the primary action on light interior surfaces. Leading <C>fa-plus text-[12px]</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                In Drupal this is the user-page layout. Put the banner and sidebar in a <C>page--user.html.twig</C>{' '}
                region, or in a layout used by every <C>/user/{'{uid}'}/*</C> route, and put the page title and lede in
                the content region. Variables: <C>{'{{ user.first_name }}'}</C> for the banner,{' '}
                <C>{'{{ user.salutation }} {{ user.last_name }}'}</C>, <C>{'{{ member_number }}'}</C>, and{' '}
                <C>{'{{ member_since }}'}</C> for the sidebar (from the membership record), and{' '}
                <C>{'{{ user_picture }}'}</C> with the tan-ring fallback image.
              </p>
              <p>
                The menu is a Drupal menu (for example <C>account</C>), with the two groups as parent items rendered as
                captions. Mark the active link with <C>aria-current="page"</C>. Drupal&rsquo;s{' '}
                <C>is-active</C> class alone is not announced.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/layout/AccountLayout.tsx', note: 'banner, sidebar (Avatar, SidebarNav), drawer, page heading' }]} />
          </div>
        </DocSection>

        {/* ── Menu ──────────────────────────────────────────────────────── */}
        <DocSection title="Account menu: shipped and parked pages">
          <div className="flex flex-col gap-8">
            <Prose>
              The menu is defined once, as the full list (<C>ACCOUNT_NAV_NEXT_GEN</C>), and the shipped menu is
              derived from it by removing the parked pages (<C>ACCOUNT_NAV</C>, filtered by <C>PARKED_HREFS</C>).
              Giving history and Saved articles are parked for phase one. They are built and their routes work,
              but the shipped menu does not list them, and each one passes the full menu to its own layout so the
              link you followed does not disappear when you arrive. A group that loses every item drops out
              rather than leaving a heading over nothing.
            </Prose>

            <div className="overflow-x-auto border border-border-light bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-subtlest border-b border-border-light">
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Group</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Page</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Route</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Phase one</th>
                  </tr>
                </thead>
                <tbody>
                  {ACCOUNT_NAV_NEXT_GEN.flatMap(g =>
                    g.items.map(item => (
                      <tr key={item.href} className="border-b border-border-light last:border-b-0">
                        <td className="font-body text-sm text-neutral-subtle px-4 py-2.5">{g.title}</td>
                        <td className="font-body font-semibold text-sm text-navy-bolder px-4 py-2.5">{item.label}</td>
                        <td className="px-4 py-2.5"><a href={item.href} className="font-mono text-xs text-navy-subtle hover:underline">{item.href}</a></td>
                        <td className="px-4 py-2.5">
                          {shippedHrefs.has(item.href) ? <Badge tone="active">In menu</Badge> : <Badge tone="muted">Parked</Badge>}
                        </td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>

            <LiveMarkup label="Narrow screens: the menu toggle that opens the drawer" defaultOpen={false}>
              <MenuToggle />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Menu toggle', classes: 'lg:hidden flex items-center gap-3 w-full bg-white border border-[#c4c9d4] px-5 py-4 font-body font-bold text-[16px] text-navy-bolder hover:border-navy-bright hover:text-navy-bright transition-colors', note: <>Takes the sidebar’s place at the top of the page. <C>aria-expanded</C> and <C>aria-controls="account-drawer"</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                Parking a page is a menu decision, not a routing one. Disable its menu link and leave the route
                enabled. Do not delete it. In Drupal that is the menu link&rsquo;s <C>enabled</C> flag. Each parked page
                should render the full menu so its own link shows as current.
              </p>
              <p>
                The drawer itself (the off-canvas panel with <C>drawer-in-left</C>, its backdrop, close button, and
                the focus and Escape behavior it needs) is documented on{' '}
                <a href="/design-system/overlays" className="text-link">Modals &amp; Overlays</a>. It holds the same
                avatar and menu as the sidebar. The toggle here carries <C>aria-expanded</C> and{' '}
                <C>aria-controls="account-drawer"</C>, and focus returns to it when the drawer closes.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/layout/AccountLayout.tsx', note: 'ACCOUNT_NAV_NEXT_GEN, PARKED_HREFS, ACCOUNT_NAV, AccountDrawer' }, { path: 'src/data/prototypeMap.ts', note: 'marks Giving History and Saved Articles “Future phase”' }]} />
            <SourceList
              tone="drift"
              title="Pages that pass the full menu"
              items={[
                { path: 'src/pages/account/AccountGiving.tsx', note: 'nav={ACCOUNT_NAV_NEXT_GEN} (parked)' },
                { path: 'src/pages/account/AccountSaved.tsx', note: 'nav={ACCOUNT_NAV_NEXT_GEN} (parked)' },
                { path: 'src/pages/account/AccountDashboardNextGen.tsx', note: 'the unlinked exploration at /account/next-gen. Not part of the shipped account.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Notifications ─────────────────────────────────────────────── */}
        <DocSection title="Member updates bell">
          <div className="flex flex-col gap-8">
            <Prose>
              On the live site, Member Updates (a promotional feed of sales, codes, and announcements) takes
              the whole account landing page. Here it collapses to a bell in the banner with an unread count. The
              dropdown lists every update, each can be dismissed, and opening one marks it read and shows it in a
              reader modal with its promo code and call to action. Promotions stay reachable without displacing the
              member&rsquo;s records. Click the bell below to try it.
            </Prose>

            <LiveMarkup
              label="Banner with the live bell (snapshot shows the closed state)"
              previewClassName="p-0 bg-white"
              markupFor={<Banner bell={<AccountNotifications />} />}
            >
              <div className="relative [transform:translateZ(0)] h-[640px] overflow-hidden bg-white">
                <Banner bell={<AccountNotifications />} />
              </div>
            </LiveMarkup>

            <LiveMarkup label="Open panel, re-rendered from source (first three updates, two unread)">
              <div className="flex justify-end">
                <NotificationsPanel />
              </div>
            </LiveMarkup>

            <LiveMarkup label="Promo code, as shown inside an update">
              <PromoCode code="USA250" note="Use this code at checkout to take $25 off." />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'relative flex-shrink-0 ml-auto', note: <><C>ml-auto</C> keeps the bell on the right edge even when the banner wraps it onto its own row. The panel anchors to that edge.</> },
                { part: 'Bell button', classes: 'relative flex items-center gap-4 border px-4 py-3 font-body font-bold text-[15px] transition-colors', note: <>Closed <C>bg-white border-[#c4c9d4] text-navy-bolder hover:border-navy-bright hover:text-navy-bright</C>. Open <C>bg-navy-bolder border-navy-bolder text-white</C>. <C>aria-expanded</C>, <C>aria-haspopup="true"</C>. Chevron rotates 180° when open.</> },
                { part: 'Unread count', classes: 'absolute -top-2 -right-2.5 min-w-[19px] h-[19px] px-1 rounded-full bg-[#c1121f] flex items-center justify-center font-body font-bold text-[11px] text-white leading-none', note: <>On the bell glyph. The button also carries <C>sr-only</C> text “, 2 unread” / “, none unread”, since the red dot alone means nothing to a screen reader.</> },
                { part: 'Panel', classes: 'absolute right-0 top-[calc(100%+8px)] z-50 w-[min(420px,calc(100vw-2.5rem))] bg-white border border-[#c4c9d4] shadow-xl', note: 'Never wider than the viewport minus 20px a side. Closes on outside click and Escape.' },
                { part: 'Panel header', classes: 'flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8fafd]', note: <>Title <C>font-headline text-[19px] text-navy-bolder leading-tight</C>, “N new”, and a “Dismiss all” text button.</> },
                { part: 'List', classes: 'flex flex-col max-h-[min(60vh,460px)] overflow-y-auto', note: 'Scrolls inside the panel.' },
                { part: 'Row', classes: 'border-b border-[#e8eaed] last:border-b-0 flex items-stretch transition-colors hover:bg-[#ebf4ff]', note: <>Unread <C>bg-white</C>, read <C>bg-[#fbfcfe]</C>. A flex row of two buttons (open and dismiss), because a button cannot nest in a button.</> },
                { part: 'Unread dot', classes: 'flex-shrink-0 w-2 h-2 rounded-full mt-[7px]', note: <><C>bg-[#c1121f]</C> unread, <C>bg-transparent</C> read (keeps the indent). aria-hidden.</> },
                { part: 'Row title', classes: 'font-body text-[15px] leading-snug', note: <>Unread <C>font-bold text-navy-bolder</C>, read <C>font-semibold text-neutral-subtle</C>. Blurb <C>font-body text-[13px] text-neutral-subtle leading-snug</C>.</> },
                { part: 'Date + New', classes: 'flex items-center gap-2 mt-0.5', note: <>Date <C>font-body text-[12px] text-[#8a91a1]</C>. The “New” pill <C>font-body font-bold text-[10px] uppercase tracking-[0.08em] text-[#c1121f] border border-[#f0b7bc] bg-[#fdf0f1] px-1.5 py-0.5 leading-none</C> shares the date line so a long title never strands it.</> },
                { part: 'Dismiss', classes: 'flex-shrink-0 flex items-start justify-center w-11 pt-4 pb-4 text-[#8a91a1] hover:text-[#c1121f] transition-colors', note: <>Always visible, not revealed on hover, so it works by keyboard and touch. <C>aria-label="Dismiss {'{title}'}"</C>.</> },
                { part: 'Promo code', classes: 'flex flex-wrap items-center gap-x-4 gap-y-2 bg-tan-subtlest border-l-4 border-gold px-5 py-4', note: <>“Code” caption <C>font-body font-bold text-[13px] uppercase tracking-[0.08em] text-neutral-subtle</C>. Code <C>font-body font-bold text-[20px] tracking-[0.06em] text-navy-bolder</C>. Note <C>font-body text-[14px] text-neutral-subtle leading-snug</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                Updates are a node type (the live <C>/user/member-updates</C> nodes): <C>{'{{ title }}'}</C>,{' '}
                <C>{'{{ date }}'}</C>, <C>{'{{ blurb }}'}</C>, body paragraphs, and optional <C>{'{{ promo.code }}'}</C>{' '}
                / <C>{'{{ promo.note }}'}</C>, <C>{'{{ cta.label }}'}</C> / <C>{'{{ cta.url }}'}</C>, and{' '}
                <C>{'{{ footnote }}'}</C>. Read and dismissed state is per user. Store it server-side (a flag or a user
                data entry) so it survives a reload, which the prototype&rsquo;s React state does not. A promo code
                should match a real Commerce Promotion coupon, applied at checkout (see{' '}
                <a href="/design-system/commerce" className="text-link">Commerce</a>).
              </p>
              <p>
                The dropdown and dismiss need a Drupal behavior: toggle <C>aria-expanded</C>, close on outside click
                and Escape (return focus to the bell), and update the badge and its <C>sr-only</C> count. The reader
                is a modal. Build it on the shared Modal on{' '}
                <a href="/design-system/overlays" className="text-link">Modals &amp; Overlays</a>, which moves focus
                into the dialog. The prototype&rsquo;s reader is a hand-rolled copy that does not.
              </p>
              <p>
                The live bell&rsquo;s snapshot above shows only the closed state, because the component keeps its open
                state internally. The open panel is re-rendered from the component&rsquo;s source with its classes
                copied verbatim.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/AccountNotifications.tsx', note: 'bell, panel, rows, PromoCode, UpdateModal' }, { path: 'src/data/account.ts', note: 'memberUpdates' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/components/ui/AccountNotifications.tsx', note: 'UpdateModal re-implements the Modal chrome (z-[60], backdrop, close button) instead of using src/components/ui/Modal.tsx, and does not move focus into the dialog. Modal’s own docblock names it as one of the copies it replaced.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Kit ──────────────────────────────────────────────────────── */}
        <DocSection title="Account card">
          <div className="flex flex-col gap-8">
            <Prose>
              The bordered panel every account page is built from. With a title, it has a tinted header bar that
              can carry an action on the right: a section link, a badge, or an Edit. Without a title, it is a plain
              bordered box for a table or an empty state.
            </Prose>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              <LiveMarkup label="Titled, with a section link (dashboard)">
                <AccountCard title="Your subscriptions" action={<SectionLink to="/account/subscriptions">Manage</SectionLink>}>
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
              </LiveMarkup>
              <LiveMarkup label="Untitled (holds a table or an empty state)">
                <AccountCard>
                  <p className="font-body text-[15px] text-neutral-subtle leading-relaxed">
                    Your default address is used for print delivery and as the billing address at checkout unless you
                    choose otherwise.
                  </p>
                </AccountCard>
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                { part: 'Card', classes: 'border border-[#c4c9d4]', note: <>A <C>&lt;section&gt;</C>. <C>className</C> is appended for spacing.</> },
                { part: 'Header', classes: 'flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-6 py-4 border-b border-[#e2e8f0] bg-[#f8fafd]', note: <>A <C>&lt;header&gt;</C>. The action wraps under the title when it does not fit. <C>#f8fafd</C> has no token. It is the same tint as a selected ChoiceOption and the notification panel header.</> },
                { part: 'Title', classes: 'font-headline text-[22px] text-navy-bolder leading-tight', note: 'An <h3>, under the page’s h2.' },
                { part: 'Body', classes: 'p-6' },
                { part: 'Section link', classes: 'inline-flex items-center gap-2 font-body font-semibold text-[14px] text-link', note: <>Trailing <C>fa-arrow-right text-[11px]</C>. The label says where it goes (“All orders”, “Manage”).</> },
                { part: 'Data row', classes: 'flex flex-wrap justify-between items-baseline gap-x-6 gap-y-1 py-3 border-b border-[#e8eaed] last:border-b-0', note: <>A <C>&lt;dt&gt;</C>/<C>&lt;dd&gt;</C> pair inside a <C>&lt;dl&gt;</C>. Label <C>font-body font-bold text-[14px] text-navy-bolder</C>. Value <C>font-body text-[15px] text-neutral-subtle text-right</C>. Stacks when narrow.</> },
              ]}
            />

            <PropsTable
              rows={[
                { name: 'title', type: 'string', description: 'Header title. Omit for a plain bordered box.' },
                { name: 'action', type: 'ReactNode', description: 'Trailing header content: SectionLink, Badge, or a button.' },
                { name: 'className', type: 'string', description: 'Extra classes on the section.' },
              ]}
            />

            <DevNote>
              <p>
                One Twig component for every account panel: <C>{'{{ title }}'}</C>, <C>{'{{ action }}'}</C>, and{' '}
                <C>{'{{ content }}'}</C>. Render the header only when there is a title. If the page uses several
                titled cards, give each <C>&lt;section&gt;</C> an <C>aria-labelledby</C> pointing at its h3 so they
                appear as named regions.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/AccountCard.tsx', note: 'AccountCard, DataRow, SectionLink' }]} />
          </div>
        </DocSection>

        <DocSection title="Badges, table, and empty state">
          <div className="flex flex-col gap-8">
            <Prose>
              The rest of the account kit. Badges give a record&rsquo;s state in a word. The table is a scroll-safe
              wrapper for records too wide for a phone.
              The empty state is what a list says when it has nothing in it, with the one action that would fill
              it. The kit&rsquo;s auto-renew <C>Toggle</C> is documented under Toggle switch on{' '}
              <a href="/design-system/forms" className="text-link">Forms</a>, and it appears in context in the
              membership panel and subscription cards below.
            </Prose>

            <LiveMarkup label="Badge tones">
              <div className="flex flex-wrap items-center gap-3">
                <Badge tone="active">
                  <i className="fa-solid fa-circle-check" aria-hidden="true" />
                  Active
                </Badge>
                <Badge tone="active">Completed</Badge>
                <Badge tone="info">Default</Badge>
                <Badge tone="info">Shipped</Badge>
                <Badge tone="warn">Processing</Badge>
                <Badge tone="muted">Refunded</Badge>
              </div>
            </LiveMarkup>

            <LiveMarkup label="Empty state (orders, filtered to nothing)">
              <AccountCard>
                <EmptyState
                  icon="fa-receipt"
                  title="No orders in this category"
                  action={
                    <button type="button" className="font-body font-semibold text-[15px] text-link">
                      Show all orders
                    </button>
                  }
                >
                  Recently placed orders can take a few minutes to appear here.
                </EmptyState>
              </AccountCard>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Badge', classes: 'inline-flex items-center gap-1.5 border px-2.5 py-1 font-body font-bold text-[12px] uppercase tracking-[0.04em]', note: 'Square, uppercase, with an optional leading icon. The word carries the meaning and the color only reinforces it.' },
                { part: 'Badge: active', classes: 'bg-[#e6f7ed] text-[#0a5c2e] border-[#b5e3c8]', note: 'Active, Completed. The Alert success palette.' },
                { part: 'Badge: info', classes: 'bg-[#ebf4ff] text-[#023e7d] border-[#bcd8f7]', note: 'Default (the default address or card), Shipped.' },
                { part: 'Badge: warn', classes: 'bg-[#fff8d6] text-[#7a5c00] border-[#f0d98a]', note: 'Processing.' },
                { part: 'Badge: muted', classes: 'bg-[#f4f4f6] text-[#4e576a] border-[#d8dbe2]', note: <>Refunded, Anonymous. <C>#f4f4f6</C> = <C>neutral-subtlest</C>.</> },
                { part: 'Table wrapper', classes: 'overflow-x-auto', note: <>Table <C>w-full min-w-[640px] border-collapse</C>, so it scrolls sideways on a phone instead of crushing columns. An optional <C>sr-only</C> caption.</> },
                { part: 'Table head cell', classes: 'text-left font-body font-bold text-[12px] uppercase tracking-[0.06em] text-neutral-subtle pb-3 pr-4 last:pr-0', note: <><C>scope="col"</C>. Header row <C>border-b border-[#c4c9d4]</C>.</> },
                { part: 'Table cell', classes: 'align-top py-4 pr-4 last:pr-0 font-body text-[15px] text-neutral-subtle', note: <><C>Td</C>, with extra classes appended (<C>font-bold text-navy-bolder</C> for the key column, <C>whitespace-nowrap</C> for dates and money). Rows <C>border-b border-[#e8eaed] last:border-b-0</C>.</> },
                { part: 'Empty state', classes: 'flex flex-col items-center text-center gap-3 py-10 px-6', note: <>Icon tile <C>w-12 h-12 bg-[#ebf4ff] flex items-center justify-center</C> with <C>fa-solid {'{icon}'} text-[20px] text-[#023e7d]</C> (aria-hidden). Title <C>font-headline text-[20px] text-navy-bolder</C>. Body <C>font-body text-[15px] text-neutral-subtle leading-relaxed max-w-[420px]</C>. Then the action.</> },
              ]}
            />

            <DevNote>
              <p>
                Badge: a Twig include taking <C>{'{{ tone }}'}</C> (active · info · warn · muted) and{' '}
                <C>{'{{ label }}'}</C>. Map Commerce order states to tones in one place (completed → active, shipped
                → info, processing/draft → warn, canceled/refunded → muted), so the orders list and the receipt
                agree.
              </p>
              <p>
                Tables: core Views table output styled with
                the classes above. Keep <C>scope="col"</C> and a caption. Empty state: the View&rsquo;s &ldquo;No
                results&rdquo; area with <C>{'{{ icon }}'}</C>, <C>{'{{ title }}'}</C>, <C>{'{{ message }}'}</C>, and{' '}
                <C>{'{{ action }}'}</C>. See <a href="/design-system/lists" className="text-link">Lists, Tables &amp;
                Pagination</a> for the site&rsquo;s other tables.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/AccountCard.tsx', note: 'Badge, DataTable, Td, EmptyState (and Toggle, documented on Forms)' }]} />
            <SourceList
              tone="drift"
              title="Hand-rolled switches outside the kit"
              items={[
                { path: 'src/pages/MembershipCheckout.tsx', note: 'summary auto-renew: an aria-pressed button with a #1d2535 track and a translate-x knob.' },
                { path: 'src/sections/DonateCartItems.tsx', note: 'priority toggles: a larger 52×28 role="switch" with a check/cross glyph in the knob.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Dashboard ─────────────────────────────────────────────────── */}
        <DocSection title="Membership status panel">
          <div className="flex flex-col gap-8">
            <Prose>
              The dashboard opens with the member&rsquo;s status, not a promotion. A navy header gives the plan and
              an Active badge, a three-cell strip gives the term, renewal date, and price, and a footer holds the
              auto-renew switch with its consequence spelled out, plus Renew now and Update payment. Turning
              auto-renew <em>off</em> asks first, because it lapses the membership. Turning it back on is a single
              tap. When the membership system (Salesforce) is unreachable, the panel falls back to the live
              site&rsquo;s &ldquo;temporarily unavailable&rdquo; message with the member number and a phone number.
            </Prose>

            <LiveMarkup label="Status available">
              <MembershipPanel />
            </LiveMarkup>

            <LiveMarkup label="Status unavailable (Salesforce down)">
              <MembershipUnavailable />
            </LiveMarkup>

            <LiveMarkup label="Turn-off confirmation: the modal’s button pair">
              <ConfirmButtons />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Panel', classes: 'border border-[#c4c9d4]' },
                { part: 'Header', classes: 'bg-navy-bolder px-6 py-5 flex flex-wrap items-center justify-between gap-4', note: <>Eyebrow <C>font-body font-medium text-[12px] uppercase tracking-[0.08em] text-light-blue mb-1</C>. Plan <C>font-headline text-[28px] text-white leading-tight</C>.</> },
                { part: 'Stat strip', classes: 'grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[#e2e8f0] border-b border-[#e2e8f0]', note: <>Cells <C>px-6 py-4</C>. Label <C>font-body font-semibold text-[12px] uppercase tracking-[0.06em] text-neutral-subtle</C>. Value <C>font-body font-bold text-[17px] text-navy-bolder mt-0.5</C>. Stacks below sm.</> },
                { part: 'Footer', classes: 'px-6 py-5 flex flex-wrap items-center justify-between gap-4', note: <>Toggle and sentence in <C>flex items-start gap-3 max-w-[460px]</C>. The sentence names the card and the date (“We’ll charge your Visa ending 4242 on March 14, 2027”).</> },
                { part: 'Renew now', classes: 'inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors' },
                { part: 'Update payment', classes: 'inline-flex items-center justify-center font-body font-bold text-[15px] text-navy-bolder px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors' },
                { part: 'Unavailable', classes: 'border border-l-4 border-[#f0d98a] bg-[#fff8d6] px-6 py-5', note: <>Title <C>font-body font-bold text-[16px] text-navy-bolder mb-1</C>. Body <C>font-body text-[15px] text-neutral-subtle leading-relaxed</C>, with a <C>tel:</C> link.</> },
                { part: 'Confirm buttons', classes: 'flex flex-col-reverse sm:flex-row sm:justify-end gap-3', note: <>Destructive outline <C>text-[#c1121f] border-[#c1121f] hover:bg-[#c1121f] hover:text-white</C>, then the safe solid navy “Keep auto-renew on”. Reversed on mobile so the safe button is on top. On sm+ the safe button sits at the far right.</> },
              ]}
            />

            <DevNote>
              <p>
                Variables come from the membership record: <C>{'{{ membership.plan }}'}</C>,{' '}
                <C>{'{{ membership.term }}'}</C>, <C>{'{{ membership.renews_on }}'}</C>,{' '}
                <C>{'{{ membership.price }}'}</C>, <C>{'{{ membership.auto_renew }}'}</C>, and the default card&rsquo;s
                brand and last four. Render the fallback whenever the Salesforce lookup fails or times out, and never
                leave an empty panel.
              </p>
              <p>
                The switch must not move until the member confirms. Opening the modal is the switch&rsquo;s action,
                and the setting changes only on &ldquo;Turn off auto-renew&rdquo;. In the modal the safe action is
                visually primary, but the destructive button comes first in the DOM, so it is the first Tab stop.
                In production put the safe button first in source order and order them visually with CSS. The modal
                itself is the shared Modal (see <a href="/design-system/overlays" className="text-link">Modals &amp;
                Overlays</a>), with a warning Alert inside it.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/account/AccountDashboard.tsx', note: 'status panel, fallback, confirm modal' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/account/AccountDashboard.tsx', note: 'the unavailable fallback is a hand-rolled warning box (border-[#f0d98a], no icon, no role) rather than the shared Alert warning variant.' },
                { path: 'src/pages/account/AccountSubscriptions.tsx', note: 'turning a subscription’s auto-renew off has no confirmation, although it lapses access the same way.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Addresses and payment ─────────────────────────────────────── */}
        <DocSection title="Address and payment cards">
          <div className="flex flex-col gap-8">
            <Prose>
              Saved addresses are a two-up grid of account cards, one per address, with its label as the title and a
              Default badge on the default. Its actions are a row of text buttons under a hairline: Edit,
              plus Make default and Remove on any address that is not the default. The default cannot be removed
              from here, because something always has to receive print issues. Cards on file are a table instead,
              with columns for the card, expiry, and what it pays for. A card that carries an auto-renewal is
              explained in a callout before anyone removes it.
            </Prose>

            <LiveMarkup label="Addresses" defaultOpen={false}>
              <AddressCards />
            </LiveMarkup>

            <LiveMarkup label="Payment methods" defaultOpen={false}>
              <div className="flex flex-col gap-8">
                <PaymentTable />
                <div className="border border-l-4 border-[#bcd8f7] bg-[#ebf4ff] px-5 py-4">
                  <p className="font-body font-bold text-[15px] text-navy-bolder mb-0.5">Removing a card on auto-renew</p>
                  <p className="font-body text-[14px] text-neutral-subtle leading-relaxed">
                    Your Visa ending 4242 covers two auto-renewals. Add a replacement before removing it, or those renewals
                    will switch off.
                  </p>
                </div>
              </div>
            </LiveMarkup>

            <LiveMarkup label="After saving (both pages)">
              <Alert variant="success" title="Office address saved.">
                Prototype only — nothing is persisted between page loads.
              </Alert>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Address grid', classes: 'grid grid-cols-1 md:grid-cols-2 gap-6', note: 'Two up from md.' },
                { part: 'Address', classes: 'font-body text-[15px] text-neutral-subtle not-italic leading-relaxed', note: <>A real <C>&lt;address&gt;</C>, with the name in <C>font-bold text-navy-bolder</C> and lines separated by <C>&lt;br&gt;</C>.</> },
                { part: 'Address actions', classes: 'flex flex-wrap gap-4 mt-5 pt-4 border-t border-[#e8eaed]', note: <>Edit and Make default <C>font-body font-semibold text-[14px] text-link</C>. Remove <C>font-body font-semibold text-[14px] text-[#c1121f] hover:underline</C>. None are wired in the prototype.</> },
                { part: 'Card cell', classes: 'whitespace-nowrap', note: <>“Visa ····&nbsp;4242” in <C>font-bold text-navy-bolder</C>, a non-breaking space before the last four, and the Default badge in <C>ml-2 inline-block align-middle</C>.</> },
                { part: 'Used for', classes: 'flex flex-col gap-0.5', note: <>A list of the renewals the card pays for, or an em dash. Actions cell <C>flex flex-wrap gap-3 justify-end</C>. A default card has no Remove.</> },
                { part: 'Callout', classes: 'border border-l-4 border-[#bcd8f7] bg-[#ebf4ff] px-5 py-4', note: <>Title <C>font-body font-bold text-[15px] text-navy-bolder mb-0.5</C>. Body <C>font-body text-[14px] text-neutral-subtle leading-relaxed</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                Addresses are Commerce customer profiles (the address book at <C>/user/{'{uid}'}/address-book</C>).
                Variables per card: <C>{'{{ profile.label }}'}</C>, <C>{'{{ profile.is_default }}'}</C>, and the
                formatted <C>{'{{ address }}'}</C> field. Payment methods are stored <C>commerce_payment_method</C>{' '}
                entities (<C>/user/{'{uid}'}/payment-methods</C>): brand, last four, expiry, default flag, and a
                computed &ldquo;used for&rdquo; list from the member&rsquo;s recurring subscriptions.
              </p>
              <p>
                Add an address and Add a card open modals (AddressModal and CreditCardModal on{' '}
                <a href="/design-system/overlays" className="text-link">Modals &amp; Overlays</a>). After a save, show
                the success Alert at the top of the content column and move focus to it. Every Edit and Remove needs
                an accessible name with its record (&ldquo;Remove Office address&rdquo;, &ldquo;Remove Mastercard
                ending 8891&rdquo;). Removing a card that carries a renewal should confirm, using the same pattern as
                turning off auto-renew.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/account/AccountAddresses.tsx' }, { path: 'src/pages/account/AccountPayment.tsx' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/account/AccountPayment.tsx', note: 'the auto-renew callout is a hand-rolled info box (border-[#bcd8f7], no icon) rather than the shared Alert info variant. The table shows the brand as text, without the card marks from CardBrandIcons.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Orders ────────────────────────────────────────────────────── */}
        <DocSection title="Orders list">
          <div className="flex flex-col gap-8">
            <Prose>
              Every order on the account, in one table, newest first. Filter chips above it split the list
              by kind (membership, books, giving), with the count in each chip, and every row ends in a link to its
              receipt where one exists. The live site&rsquo;s version is a flat four-column table with no way to
              reach a receipt. The dashboard shows the three most recent orders as a compact list in an account
              card.
            </Prose>

            <LiveMarkup label="Filters and table (try the chips)" defaultOpen={false}>
              <OrdersView />
            </LiveMarkup>

            <LiveMarkup label="Dashboard: recent orders">
              <div className="max-w-[520px]">
                <AccountCard title="Recent orders" action={<SectionLink to="/account/orders">All orders</SectionLink>}>
                  <ul className="flex flex-col">
                    {orders.slice(0, 3).map(o => (
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
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Filter row', classes: 'flex flex-wrap gap-2' },
                { part: 'Filter chip', classes: 'font-body font-semibold text-[14px] px-4 py-2 border transition-colors', note: <>Active <C>bg-navy-bolder text-white border-navy-bolder</C>. Inactive <C>bg-white text-navy-bolder border-[#c4c9d4] hover:border-navy-bolder</C>. <C>aria-pressed</C> carries the state. Label includes the count, “Books &amp; Press (2)”.</> },
                { part: 'Columns', classes: 'Order · Date · Items · Total · Status · Details', note: <>Order number and total in <C>font-bold text-navy-bolder whitespace-nowrap</C>. Status is a Badge.</> },
                { part: 'Receipt link', classes: 'inline-flex items-center gap-1.5 font-body font-semibold text-[14px] whitespace-nowrap text-link', note: <>“View details” with a trailing arrow. An em dash in <C>font-body text-[14px] text-neutral-subtle</C> when no receipt exists.</> },
                { part: 'Recent order row', classes: 'py-3 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0', note: <>Number and total on one line (<C>font-body font-bold</C> 14px and 15px), then date and state in <C>font-body text-[13px] text-neutral-subtle leading-snug mt-0.5</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                This is the user orders View (<C>/user/{'{uid}'}/orders</C>) with an exposed filter on order type,
                rendered as chips. Use links with <C>?type=</C> (and <C>aria-current</C>) so filtering works without
                JavaScript, or buttons with <C>aria-pressed</C> if it filters in place. The receipt link goes to the
                user order view (<C>commerce-order--user.html.twig</C>), which should render the same receipt body as
                checkout&rsquo;s confirmation (see <a href="/design-system/commerce" className="text-link">Commerce</a>).
              </p>
              <p>
                Variables per row: <C>{'{{ order.order_number }}'}</C>, <C>{'{{ order.placed }}'}</C>, a summary of its
                items, <C>{'{{ order.total_price }}'}</C>, <C>{'{{ order.state }}'}</C> (mapped to a badge tone), and{' '}
                <C>{'{{ url }}'}</C>. The empty state&rsquo;s &ldquo;Show all orders&rdquo; clears the filter.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/account/AccountOrders.tsx' }, { path: 'src/pages/account/AccountDashboard.tsx', note: 'Recent orders card' }]} />
          </div>
        </DocSection>

        {/* ── Subscriptions ─────────────────────────────────────────────── */}
        <DocSection title="Subscriptions and renewal state">
          <div className="flex flex-col gap-8">
            <Prose>
              One account card per magazine. The details sit on the left as label/value rows (format, term, next
              issue, renewal date, and price, or &ldquo;Included with membership&rdquo;). The auto-renew switch sits
              on the right, from <C>lg</C>, with a sentence that says what will happen: &ldquo;Renews automatically on
              March 14, 2027&rdquo; or &ldquo;Ends on March 14, 2027 unless you renew&rdquo;. An &ldquo;Add a
              subscription&rdquo; card closes the page with outline links to the subscribe flows.
            </Prose>

            <div className="grid grid-cols-1 gap-6">
              <LiveMarkup label="Auto-renew on" defaultOpen={false}>
                <SubscriptionCard index={1} initialOn />
              </LiveMarkup>
              <LiveMarkup label="Auto-renew off">
                <SubscriptionCard index={0} initialOn={false} />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                { part: 'Card body', classes: 'flex flex-col lg:flex-row gap-8 lg:items-start', note: 'Details and the switch stack below lg.' },
                { part: 'Details', classes: 'flex-1 min-w-0 flex flex-col', note: <>A <C>&lt;dl&gt;</C> of DataRows.</> },
                { part: 'Renewal column', classes: 'lg:w-[300px] lg:flex-shrink-0 flex flex-col gap-4', note: <>Toggle and sentence in <C>flex items-start gap-3</C>. Sentence <C>font-body text-[14px] text-neutral-subtle leading-relaxed</C>.</> },
                { part: 'Header badge', classes: 'Badge tone="active"', note: '“Active” in the card header. It does not change when auto-renew is off, because the subscription is still active until it ends.' },
                { part: 'Add links', classes: 'inline-flex items-center justify-center font-body font-bold text-[15px] text-navy-bolder px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors', note: <>In <C>flex flex-wrap gap-3</C> under a lede.</> },
              ]}
            />

            <DevNote>
              <p>
                With Commerce Recurring, each card is a <C>commerce_subscription</C>: <C>{'{{ title }}'}</C>,{' '}
                <C>{'{{ format }}'}</C>, <C>{'{{ term }}'}</C>, <C>{'{{ next_issue }}'}</C> (from the publication
                schedule, not Commerce), <C>{'{{ renews_on }}'}</C> (the next billing date), <C>{'{{ price }}'}</C>, and{' '}
                <C>{'{{ auto_renew }}'}</C>. There is no subscriptions page on the live site today, so this route is new.
              </p>
              <p>
                The switch saves immediately and restates its state in the sentence beside it. Put that sentence in a
                polite live region. Consider the same confirmation the membership switch uses before turning a renewal
                off.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/account/AccountSubscriptions.tsx' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/account/AccountDashboard.tsx', note: '“Your subscriptions” card restates each as one DataRow (next issue and renewal date), with a Manage link here.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Wishlist ──────────────────────────────────────────────────── */}
        <DocSection title="Wishlist with undo">
          <div className="flex flex-col gap-8">
            <Prose>
              Books saved from the Press catalogue, kept as a list of records, not a cover grid, because the
              decisions here (buy it or drop it) need price and format beside the title. Each row has a small cover,
              the title, the author, the shared book price block, and the date added. Add to cart (gold) and Remove
              sit on the right. Remove happens without a confirmation, so the success alert that follows carries an{' '}
              <strong className="text-navy-bolder">Undo</strong>, which puts the book back where it was rather than at
              the end. The list is ordered by when each book was saved. Try removing one below.
            </Prose>

            <LiveMarkup label="Wishlist (live, with remove and Undo)" defaultOpen={false}>
              <WishlistDemo />
            </LiveMarkup>

            <LiveMarkup label="Just after a removal: the Undo alert" defaultOpen={false}>
              <WishlistDemo startRemoved />
            </LiveMarkup>

            <LiveMarkup label="Empty wishlist">
              <AccountCard>
                <EmptyState
                  icon="fa-heart"
                  title="Your wishlist is empty"
                  action={
                    <Link
                      to="/books/collection"
                      className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
                    >
                      Browse the Press catalogue
                    </Link>
                  }
                >
                  Use the Add to Wishlist control on any book to keep it here.
                </EmptyState>
              </AccountCard>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Row', classes: 'flex flex-wrap sm:flex-nowrap items-start gap-4 sm:gap-5 py-5 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0', note: 'Wraps on a phone so the buttons take a full-width line under the details.' },
                { part: 'Cover link', classes: 'flex-shrink-0 w-[68px]', note: <><C>tabIndex={'{-1}'}</C> and <C>aria-hidden</C>: the title link is the one tab stop. Image <C>w-full aspect-[2/3] object-cover shadow-[0_2px_8px_rgba(0,18,51,0.14)]</C>, the book-shadow used on every small cover.</> },
                { part: 'Title', classes: 'link-underline-hover font-headline text-[21px] text-navy-bolder leading-snug hover:text-navy-bright transition-colors', note: <><C>.link-underline-hover</C> sweeps the underline in on hover. Author <C>font-body text-[14px] text-neutral-subtle mt-1</C>.</> },
                { part: 'Price', classes: 'BookPrice listPrice memberPrice format', note: <>In <C>mt-2</C>. The member price leads (see <a href="/design-system/commerce" className="text-link">Commerce: Book price</a>). Added date <C>font-body text-[13px] text-neutral-subtle mt-1.5</C>.</> },
                { part: 'Actions', classes: 'flex flex-col items-stretch gap-2 w-full sm:w-auto sm:flex-shrink-0', note: 'Full-width stacked on a phone, natural width from sm.' },
                { part: 'Add to cart', classes: 'inline-flex items-center justify-center gap-2 bg-gold text-navy-bolder font-body font-bold text-[14px] px-4 py-2.5 hover:bg-gold-dark transition-colors whitespace-nowrap', note: <>Gold, as the one buying action on the page. Leading <C>fa-cart-shopping text-[12px]</C>.</> },
                { part: 'Remove', classes: 'inline-flex items-center justify-center gap-1.5 font-body font-semibold text-[14px] text-[#c1121f] px-4 py-2 border border-transparent hover:underline whitespace-nowrap', note: <>A transparent border keeps it the same height as Add to cart. Leading <C>fa-xmark</C>.</> },
                { part: 'Undo alert', classes: 'Alert variant="success" + action', note: <>Title “Removed {'{title}'} from your wishlist”. Undo is the outline button <C>bg-white border border-navy-bolder text-navy-bolder font-body font-bold text-[15px] px-5 py-2.5 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors</C>, the shared outline hover. Only the last removal can be undone.</> },
              ]}
            />

            <DevNote>
              <p>
                Commerce Wishlist provides the list (<C>/user/{'{uid}'}/wishlist</C>) and its add and remove routes.
                Variables per row: <C>{'{{ cover }}'}</C>, <C>{'{{ url }}'}</C>, <C>{'{{ title }}'}</C>,{' '}
                <C>{'{{ author }}'}</C>, <C>{'{{ list_price }}'}</C>, <C>{'{{ member_price }}'}</C>,{' '}
                <C>{'{{ format }}'}</C>, and <C>{'{{ added }}'}</C>. Add to cart is an add-to-cart form for that
                variation (not a link with the price in the URL).
              </p>
              <p>
                Undo needs a behavior. Remove the row optimistically, show the alert, and only commit the delete
                when the alert is dismissed or the page is left. Alternatively, delete at once and let Undo re-add at the
                saved position. Either way, <strong>move focus</strong>: the Remove button that had focus is gone, so
                send focus to the alert (or its Undo button), and after Undo return it to the restored row&rsquo;s
                title. The success Alert&rsquo;s <C>role="status"</C> announces the removal politely.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/pages/account/AccountWishlist.tsx', note: 'list, remove, Undo restore-at-index, empty state' }, { path: 'src/components/ui/Alert.tsx', note: 'action slot for Undo' }]} />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/account/AccountWishlist.tsx', note: 'the list sits directly in the content column. The same kind of list on Saved articles is wrapped in an untitled AccountCard.' },
                { path: 'src/pages/account/AccountDashboard.tsx', note: 'Wishlist card: w-10 covers and “Hardcover · $38.95” with the member price only, not BookPrice.' },
                { path: 'src/pages/account/AccountSaved.tsx', note: 'parked. The same row shape with an eyebrow (publication · issue), but Remove has no Undo.' },
              ]}
            />

            <LiveMarkup label="For comparison: a Saved articles row (parked page)">
              <AccountCard>
                <SavedRow />
              </AccountCard>
            </LiveMarkup>
          </div>
        </DocSection>

        {/* ── Profile & giving notes ───────────────────────────────────── */}
        <DocSection title="Profile form and stat strips">
          <div className="flex flex-col gap-6">
            <Prose>
              The Profile page is a form of three titled account cards (Name and service, Contact info, Password)
              built entirely from the shared form fields. The Rank / title select is keyed to the chosen service,
              and a Save changes / Cancel pair closes it. Its fields are documented on{' '}
              <a href="/design-system/forms" className="text-link">Forms</a>. A save shows the same success Alert as
              Addresses.
            </Prose>
            <Prose>
              The account shows the same &ldquo;three numbers in a bordered strip&rdquo; idea three ways. Treat the
              membership panel&rsquo;s strip as canonical inside a card, and the receipt&rsquo;s{' '}
              <C>ReceiptMeta</C> as canonical when the strip stands alone.
            </Prose>
            <SourceList
              title="Canonical"
              items={[
                { path: 'src/pages/account/AccountProfile.tsx', note: 'profile form' },
                { path: 'src/pages/account/AccountDashboard.tsx', note: 'stat strip inside a card: divide-[#e2e8f0], 17px bold values' },
                { path: 'src/components/ui/Confirmation.tsx', note: 'ReceiptMeta, the standalone strip: border and divide-[#c4c9d4], 16px bold values' },
              ]}
            />
            <SourceList
              tone="drift"
              title="Drift"
              items={[
                { path: 'src/pages/account/AccountGiving.tsx', note: 'parked. Standalone strip with divide-[#c4c9d4] and 30px headline values in #023e7d. Its tax-info email link is styled text-[#023e7d] underline underline-offset-2 rather than .text-link.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Drupal mapping ────────────────────────────────────────────── */}
        <DocSection title="Drupal user-account mapping">
          <div className="flex flex-col gap-6">
            <Prose>
              Where each account page lands in Drupal, so the build themes core and Commerce&rsquo;s own user pages
              inside the shell above instead of rebuilding them.
            </Prose>
            <ClassTable
              rows={[
                { part: 'Dashboard', classes: '/user/{uid}', note: 'The user canonical page with a custom display. Membership status from Salesforce, with the unavailable fallback when the lookup fails.' },
                { part: 'Profile', classes: '/user/{uid}/edit', note: 'The user entity form, trimmed to member-owned fields. Account status, roles, and URL alias stay admin-only.' },
                { part: 'Addresses', classes: '/user/{uid}/address-book', note: 'Commerce customer profiles. The default profile feeds checkout’s address on file.' },
                { part: 'Payment methods', classes: '/user/{uid}/payment-methods', note: 'Stored commerce_payment_method entities. The default card feeds checkout’s card on file.' },
                { part: 'Orders & receipts', classes: '/user/{uid}/orders', note: 'User orders View with an order-type filter. Receipts via commerce-order--user.html.twig.' },
                { part: 'Subscriptions', classes: 'new route', note: 'Commerce Recurring subscriptions per user. Not present on the live site.' },
                { part: 'Wishlist', classes: '/user/{uid}/wishlist', note: 'Commerce Wishlist.' },
                { part: 'Giving history', classes: 'parked', note: 'Donation orders, kept separate from Orders for tax receipts.' },
                { part: 'Saved articles', classes: 'parked', note: 'A bookmark flag on article nodes (Flag module), listed per user.' },
                { part: 'Member updates', classes: 'node type + per-user read state', note: 'Rendered into the banner bell, not as a page.' },
                { part: 'Entitlements', classes: 'roles', note: 'online_member, proceedings_subscriber, naval_history_subscriber, combat_fleets_subscriber, which decide what a membership unlocks.' },
              ]}
            />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
