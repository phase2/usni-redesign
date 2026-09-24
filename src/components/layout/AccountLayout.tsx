import { useEffect, useState, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AccountNotifications from '@/components/ui/AccountNotifications'
import { member, membership } from '@/data/account'
import { PLACEHOLDER_IMAGE } from '@/data/leadership'

/**
 * Shell for every /account page.
 *
 * The live Drupal account uses a banner plus a persistent left sidebar holding an
 * avatar and a flat nav list (see project-references/account-section-audit.md).
 * That shape is kept because members know it; what changes is the grouping — the
 * live list mixes a member's own records with marketing content in one
 * undifferentiated column.
 */

interface NavItem {
  label: string
  href: string
}

interface NavGroup {
  title: string
  items: NavItem[]
}

/**
 * Every account page, in menu order. This is the full menu, and the one the
 * next-gen dashboard shows — pass it as `nav` to get it.
 *
 * Note it does *not* list the next-gen dashboard itself: that page stays
 * reachable only by typing /account/next-gen (see the route in App.tsx).
 */
export const ACCOUNT_NAV_NEXT_GEN: NavGroup[] = [
  {
    title: 'My account',
    items: [
      { label: 'Dashboard', href: '/account' },
      { label: 'Profile', href: '/account/profile' },
      { label: 'Addresses', href: '/account/addresses' },
      { label: 'Payment methods', href: '/account/payment' },
    ],
  },
  {
    title: 'My content',
    items: [
      { label: 'Orders & receipts', href: '/account/orders' },
      { label: 'Subscriptions', href: '/account/subscriptions' },
      { label: 'Giving history', href: '/account/giving' },
      { label: 'Saved articles', href: '/account/saved' },
      { label: 'Wishlist', href: '/account/wishlist' },
    ],
  },
]

/**
 * Pages parked as future items. They are built and their routes work; the
 * shipped menu just doesn't list them, so they are reachable by typing the URL
 * or by following the next-gen dashboard's menu.
 */
const PARKED_HREFS = ['/account/giving', '/account/saved']

/**
 * The shipped menu — the full list minus the parked pages. Derived rather than
 * written out twice, so adding a page means editing one list and deciding
 * whether its href belongs in `PARKED_HREFS`.
 *
 * A group that loses every item drops out entirely rather than rendering a
 * heading over nothing. That cannot happen with today's two parked hrefs, but
 * it is one line to get right now and a stray heading to debug later.
 */
export const ACCOUNT_NAV: NavGroup[] = ACCOUNT_NAV_NEXT_GEN
  .map(group => ({ ...group, items: group.items.filter(i => !PARKED_HREFS.includes(i.href)) }))
  .filter(group => group.items.length > 0)

function Avatar() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Default portrait is the same watermark the staff roster falls back to,
          in the same tan ring it uses (see LeadershipRoster). The edit control
          sits on the lower-left arc. */}
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

function SidebarNav({ nav, onNavigate }: { nav: NavGroup[]; onNavigate?: () => void }) {
  const { pathname } = useLocation()
  return (
    <nav aria-label="Account" className="flex flex-col gap-6">
      {nav.map(group => (
        <div key={group.title} className="flex flex-col">
          <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle mb-2">
            {group.title}
          </p>
          <ul className="flex flex-col">
            {group.items.map(item => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    onClick={onNavigate}
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
          onClick={onNavigate}
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

function SidebarBody({ nav, onNavigate }: { nav: NavGroup[]; onNavigate?: () => void }) {
  return (
    <>
      <Avatar />
      <div className="h-px bg-[#c4c9d4]" />
      <SidebarNav nav={nav} onNavigate={onNavigate} />
    </>
  )
}

/** Off-canvas account nav for narrow screens. */
function AccountDrawer({
  nav,
  open,
  onClose,
}: {
  nav: NavGroup[]
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="lg:hidden fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Account menu">
      <div
        className="overlay-fade-in absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        id="account-drawer"
        className="drawer-in-left absolute inset-y-0 left-0 w-[86%] max-w-[330px]
                   bg-[#f4f6fb] border-r border-[#c4c9d4] shadow-2xl
                   overflow-y-auto overscroll-contain p-6 pt-5 flex flex-col gap-7"
      >
        <div className="flex items-center justify-between">
          <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle">
            Account menu
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account menu"
            className="flex items-center justify-center w-9 h-9 bg-navy-subtle text-white hover:bg-navy-bright transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        <SidebarBody nav={nav} onNavigate={onClose} />
      </div>
    </div>
  )
}

export default function AccountLayout({
  title,
  lede,
  actions,
  nav = ACCOUNT_NAV,
  children,
}: {
  title: string
  lede?: ReactNode
  /** Page-level controls, rendered to the right of the heading. */
  actions?: ReactNode
  /**
   * Menu to show in the sidebar and the mobile drawer. Defaults to the shipped
   * menu; pass `ACCOUNT_NAV_NEXT_GEN` to include the parked pages.
   */
  nav?: NavGroup[]
  children: ReactNode
}) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  // Reaching a new account page closes the drawer, including via browser back.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        {/* Banner — the live site's photographic header, flattened to the
            redesign's pale-blue band so the member's own data leads instead. */}
        <div className="bg-[#ebf4ff]">
          <div className="container-site py-10 lg:py-14 flex flex-wrap items-center justify-between gap-6">
            <div className="min-w-0">
              <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-[#023e7d] mb-2">
                My Account
              </p>
              <h1 className="font-headline text-[36px] lg:text-[48px] text-navy-bolder leading-[1.1]">
                Welcome back, {member.firstName}
              </h1>
            </div>
            <AccountNotifications />
          </div>
        </div>

        <div className="bg-white py-10 lg:py-14">
          <div className="container-site">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 lg:items-start">

              {/* Narrow screens get a toggle in the sidebar's place, at the top
                  of the page, and the nav itself flies in from the left. */}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
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

              <AccountDrawer nav={nav} open={menuOpen} onClose={() => setMenuOpen(false)} />

              {/* Sidebar — the persistent rail from lg up */}
              <aside className="hidden lg:flex w-full lg:w-[280px] lg:flex-shrink-0 bg-[#f4f6fb] border border-[#e2e8f0] p-6 flex-col gap-7 lg:sticky lg:top-8">
                <SidebarBody nav={nav} />
              </aside>

              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col gap-8">
                <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[#e2e8f0] pb-5">
                  <div className="min-w-0">
                    <h2 className="font-headline text-[30px] lg:text-[34px] text-navy-bolder leading-[1.15]">
                      {title}
                    </h2>
                    {/* Lede measure is 760px rather than 620px: every account
                        lede is a single sentence, and the longest of them
                        (Wishlist, Payment methods) run to ~700px at 15px Inter,
                        so 620 broke one word onto a second line. */}
                    {lede && (
                      <p className="font-body text-[15px] text-neutral-subtle leading-relaxed mt-1.5 max-w-[760px]">
                        {lede}
                      </p>
                    )}
                  </div>
                  {actions}
                </div>

                {children}
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
