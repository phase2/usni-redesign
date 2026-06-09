import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { navItems, archivesDropdown } from '@/data/homepage'
import type { NavItem, MegaMenuCTA } from '@/types'

/* ─── Scroll hook ───────────────────────────────────────────────────────────── */
function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/* ─── Logos ─────────────────────────────────────────────────────────────────── */
function FullLogo() {
  return (
    <a href="/" className="flex-shrink-0" aria-label="U.S. Naval Institute home">
      <img src="/usni-logo-full.svg" alt="U.S. Naval Institute" className="w-auto" style={{ height: '69px' }} />
    </a>
  )
}

function SealLogo() {
  return (
    <a href="/" className="flex-shrink-0" aria-label="U.S. Naval Institute home">
      <img src="/usni-logo-seal.svg" alt="U.S. Naval Institute" className="w-auto" style={{ height: '57px' }} />
    </a>
  )
}

/* ─── Chevron ───────────────────────────────────────────────────────────────── */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-3 h-3 flex-shrink-0 transition-transform duration-150 ${open ? 'rotate-180' : ''}`}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ─── Mega Menu panel ───────────────────────────────────────────────────────── */
function MegaMenuPanel({ links, megaCta, alignRight }: {
  links: NavItem[]
  megaCta?: MegaMenuCTA
  alignRight?: boolean
}) {
  return (
    <div
      className={`absolute top-full z-50 bg-white shadow-xl border border-border-light ${alignRight ? 'right-0' : 'left-0'}`}
      style={{ minWidth: '820px' }}
    >
      <div className="flex">
        <div className="flex-1 py-2">
          {links.map((link, i) => (
            <a
              key={link.href + i}
              href={link.href}
              className="flex items-center px-8 py-4 font-body font-bold text-lg text-navy-bolder
                         border-b border-border-light last:border-0
                         hover:bg-surface-subtle hover:text-navy-subtle transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
        {megaCta && (
          <div className="w-[380px] flex-shrink-0 bg-navy-boldest p-10 flex flex-col justify-between gap-6">
            <div className="flex flex-col gap-4">
              <h3 className="font-headline text-3xl text-white not-italic leading-tight">{megaCta.headline}</h3>
              <p className="font-body text-base text-white/80 leading-relaxed">{megaCta.body}</p>
            </div>
            <a
              href={megaCta.ctaHref}
              className="flex items-center justify-center bg-gold text-navy-bolder
                         font-body font-bold text-base tracking-[-0.3px]
                         px-6 py-4 hover:bg-gold-dark transition-colors"
            >
              {megaCta.ctaLabel}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Simple dropdown (Archives) ────────────────────────────────────────────── */
function SimpleDropdown({ items }: { items: NavItem[] }) {
  return (
    <div className="absolute top-full left-0 min-w-[220px] bg-white border border-border-light shadow-lg z-50">
      {items.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="block px-5 py-3.5 font-body font-bold text-base text-navy-bolder
                     hover:bg-surface-subtle hover:text-navy-subtle transition-colors
                     border-b border-border-light last:border-0"
        >
          {item.label}
        </a>
      ))}
    </div>
  )
}

/* ─── Nav link (full & compact) ──────────────────────────────────────────────── */
function NavLink({ item, compact, isActive }: { item: NavItem; compact: boolean; isActive: boolean }) {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setOpen(true)
  }
  const handleLeave = () => {
    timerRef.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className={`relative h-full flex items-stretch border-b-[4px] transition-colors duration-150
        ${isActive ? 'border-gold' : 'border-transparent'}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <a
        href={item.href}
        className={`flex items-center gap-[10px] font-body font-extrabold whitespace-nowrap leading-none
                    transition-colors duration-150
                    ${compact ? 'text-[18px] px-4 py-8' : 'text-[21px] px-5 py-6'}
                    ${open ? 'bg-navy-bolder text-white' : 'text-navy-subtle hover:text-navy-bolder'}`}
        aria-haspopup={item.children ? 'true' : undefined}
        aria-expanded={item.children ? open : undefined}
        aria-current={isActive ? 'page' : undefined}
      >
        {item.label}
        {item.children && <Chevron open={open} />}
      </a>
      {item.children && open && (
        <MegaMenuPanel links={item.children} megaCta={item.megaCta} alignRight={item.alignRight} />
      )}
    </div>
  )
}

/* ─── Archives utility dropdown ─────────────────────────────────────────────── */
function ArchivesLink() {
  const [open, setOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  return (
    <div
      className="relative"
      onMouseEnter={() => { if (timerRef.current) clearTimeout(timerRef.current); setOpen(true) }}
      onMouseLeave={() => { timerRef.current = setTimeout(() => setOpen(false), 120) }}
    >
      <a
        href="/archives"
        className="flex items-center gap-1.5 font-body font-bold text-[18px] text-navy-subtle
                   px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none"
      >
        Archives
        <Chevron open={open} />
      </a>
      {open && <SimpleDropdown items={archivesDropdown} />}
    </div>
  )
}

/* ─── Mobile menu ───────────────────────────────────────────────────────────── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="absolute inset-0 bg-navy-boldest/80" onClick={onClose} aria-hidden="true" />
      <div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border-light">
          <FullLogo />
          <button onClick={onClose} className="p-2 text-navy-bolder" aria-label="Close menu">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="border-b border-border-light px-4 py-3 flex flex-wrap gap-4">
          {[
            { label: 'Archives', href: '/archives' },
            { label: 'Events', href: '/events' },
            { label: "Ship's Store", href: '/ships-store' },
            { label: 'Cart', href: '/cart' },
            { label: 'Login/Register', href: '/login' },
          ].map((link) => (
            <a key={link.href} href={link.href} className="font-body font-bold text-sm text-navy-subtle">
              {link.label}
            </a>
          ))}
        </div>
        <nav className="px-4 py-2">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-border-light last:border-0">
              <button
                className="flex items-center justify-between w-full py-4 font-body font-extrabold text-lg text-navy-subtle text-left"
                onClick={() => setExpandedItem(expandedItem === item.href ? null : item.href)}
              >
                {item.label}
                {item.children && <Chevron open={expandedItem === item.href} />}
              </button>
              {item.children && expandedItem === item.href && (
                <div className="pb-3 pl-4">
                  {item.children.map((child, i) => (
                    <a key={child.href + i} href={child.href} className="block py-2.5 font-body font-bold text-base text-navy/70 hover:text-navy-subtle">
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="p-4">
          <a
            href="/giving/donate"
            className="flex items-center justify-center gap-2.5 w-full bg-gold text-navy-bolder
                       font-body font-bold text-base py-4 px-5 hover:bg-[#FFE566] transition-colors"
          >
            <img src="/donate-button-logo.svg" alt="" className="h-6 w-auto" aria-hidden="true" />
            Donate
          </a>
        </div>
      </div>
    </div>
  )
}

/* ─── Header ────────────────────────────────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrolled = useScrolled(10)
  const { pathname } = useLocation()

  return (
    <header className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>

      {/* ── Utility bar — collapses on scroll ── */}
      <div
        className={`header-top transition-all duration-300 ease-in-out ${
          scrolled
            ? 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
            : 'max-h-40 opacity-100 overflow-visible'
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between py-4">
            <FullLogo />
            <div className="hidden lg:flex items-center">
              <ArchivesLink />
              <a href="/events" className="font-body font-bold text-[18px] text-navy-subtle px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                Events
              </a>
              <a href="/ships-store" className="font-body font-bold text-[18px] text-navy-subtle px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                Ship's Store
              </a>
              <div className="w-px h-5 bg-[#c4c9d4] mx-2" />
              <a href="/cart" className="flex items-center gap-1.5 font-body font-bold text-[18px] text-navy-subtle px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Cart
              </a>
              <a href="/login" className="flex items-center gap-1.5 font-body font-bold text-[18px] text-navy-subtle px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Login/Register
              </a>
              <a
                href="/giving/donate"
                className="ml-3 flex items-center gap-2.5 bg-gold text-navy-bolder font-body font-bold
                           text-[18px] px-6 py-3.5 hover:bg-[#FFE566] transition-colors whitespace-nowrap leading-none"
              >
                <img src="/donate-button-logo.svg" alt="" style={{ height: '1.4rem' }} className="w-auto" aria-hidden="true" />
                Donate
              </a>
            </div>
            {/* Mobile toggle (utility bar) */}
            <button className="lg:hidden p-2 text-navy-bolder" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Main nav ── */}
      <div className="header-bottom">
        <div className="container-site">
          <div className="hidden lg:flex items-center">
            {/* Seal logo — only visible when scrolled */}
            <div
              className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
                scrolled ? 'max-w-[70px] opacity-100 mr-4' : 'max-w-0 opacity-0 mr-0'
              }`}
            >
              <SealLogo />
            </div>

            {/* Nav items */}
            <nav className="flex items-stretch flex-1" aria-label="Primary navigation">
              {navItems.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  compact={scrolled}
                  isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href + '/'))}
                />
              ))}
            </nav>

            {/* Search */}
            <button
              className="ml-2 p-2 text-navy-subtle hover:text-navy-bolder transition-colors flex-shrink-0"
              aria-label="Search"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </button>
          </div>

          {/* Mobile toggle (nav bar) — visible when utility bar is hidden */}
          <div className={`lg:hidden flex items-center justify-between py-3 transition-all duration-300 ${scrolled ? '' : 'hidden'}`}>
            <SealLogo />
            <button className="p-2 text-navy-bolder" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  )
}
