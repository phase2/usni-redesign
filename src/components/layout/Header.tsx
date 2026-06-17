import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useCart } from '@/context/CartContext'
import { navItems, archivesDropdown } from '@/data/homepage'
import type { NavItem, MegaMenuCTA } from '@/types'

/* ─── Site-wide search data ─────────────────────────────────────────────────── */
type SearchResult = { title: string; subtitle: string; type: 'Book' | 'Article' | 'Page'; href: string }

const SEARCH_DATA: SearchResult[] = [
  // Books
  { title: 'AI Warfighting', subtitle: 'Morrison & Chen', type: 'Book', href: '/books/ai-warfighting' },
  { title: 'Warfare Beneath the Waves', subtitle: 'Axel Niestle', type: 'Book', href: '/books/warfare-beneath-the-waves' },
  { title: 'Training for Victory', subtitle: 'Frank R. Donche', type: 'Book', href: '/books/training-for-victory' },
  { title: 'Standing Up the Space Force', subtitle: 'Multiple Authors', type: 'Book', href: '/books/standing-up-space-force' },
  { title: "The Admiral's Bookshelf", subtitle: 'James Stavridis', type: 'Book', href: '/books/admirals-bookshelf' },
  { title: 'Cold War Storm', subtitle: 'Multiple Authors', type: 'Book', href: '/books/cold-war-storm' },
  { title: 'Battleship Diplomat', subtitle: 'Nancy Snow', type: 'Book', href: '/books/battleship-diplomat' },
  { title: 'Career Compass', subtitle: 'Douglas H. Raugh Jr.', type: 'Book', href: '/books/career-compass' },
  { title: 'Countering China: The Great Game', subtitle: 'Multiple Authors', type: 'Book', href: '/books/countering-china' },
  { title: 'Destroyers at War', subtitle: 'Multiple Authors', type: 'Book', href: '/books/destroyers-at-war' },
  { title: 'Japanese Submarines in World War Two', subtitle: 'Terry C. Treadwell', type: 'Book', href: '/books/japanese-submarines' },
  { title: 'Greyhounds of the Pacific', subtitle: 'Multiple Authors', type: 'Book', href: '/books/greyhounds-pacific' },
  { title: 'The Gamble in the Coral Sea', subtitle: 'Multiple Authors', type: 'Book', href: '/books/gamble-coral-sea' },
  { title: 'United States Marines: A History', subtitle: 'Multiple Authors', type: 'Book', href: '/books/marines-history' },
  // Articles
  { title: 'Three MEFs in the Pacific: A Force Design Retrospective', subtitle: 'Proceedings · Apr 2026', type: 'Article', href: '/proceedings/three-mefs' },
  { title: 'The Drone Swarm Dilemma', subtitle: 'Proceedings · Apr 2026', type: 'Article', href: '/proceedings/apr-2026' },
  { title: 'Distributed Lethality at Scale', subtitle: 'Proceedings · Apr 2026', type: 'Article', href: '/proceedings/apr-2026' },
  { title: 'Unmanned Surface Vessels in the Taiwan Strait', subtitle: 'Naval History · Mar 2026', type: 'Article', href: '/naval-history' },
  { title: 'The Battle of Leyte Gulf Reconsidered', subtitle: 'Naval History · Feb 2026', type: 'Article', href: '/naval-history' },
  // Pages
  { title: 'Membership', subtitle: 'Join the U.S. Naval Institute', type: 'Page', href: '/membership' },
  { title: 'Proceedings Magazine', subtitle: 'Current issue and archives', type: 'Page', href: '/proceedings' },
  { title: 'Naval History Magazine', subtitle: 'Stories of naval heritage', type: 'Page', href: '/naval-history' },
  { title: 'Books & Press', subtitle: 'Naval Institute Press catalog', type: 'Page', href: '/books' },
  { title: 'Giving & Donations', subtitle: 'Support the USNI mission', type: 'Page', href: '/giving' },
  { title: 'Donate', subtitle: 'Make a gift to USNI', type: 'Page', href: '/giving/donate' },
  { title: 'Events', subtitle: 'Upcoming USNI events', type: 'Page', href: '/events' },
]

const TYPE_STYLES: Record<SearchResult['type'], string> = {
  Book:    'bg-[#e8f0fb] text-[#0466c8]',
  Article: 'bg-[#edf7f0] text-[#0a7e3f]',
  Page:    'bg-[#f0f0f0] text-[#4e576a]',
}

function highlight(text: string, query: string) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#0466C8]/15 text-[#0466C8] font-semibold not-italic">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

/* ─── Search flydown ────────────────────────────────────────────────────────── */
function SearchFlydown({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const suggestions = query.length >= 2
    ? SEARCH_DATA.filter(r =>
        r.title.toLowerCase().includes(query.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 7)
    : []

  return (
    <>
      {/* Backdrop */}
      <div
        className="absolute left-0 right-0 top-full z-40 bg-navy-boldest/30"
        style={{ height: '100vh' }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className="absolute left-0 right-0 top-full z-50 bg-white shadow-2xl"
        style={{ animation: 'searchSlideIn 0.18s ease-out both' }}
      >
        <style>{`@keyframes searchSlideIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div className="container-site py-6">

          <div className="flex items-stretch border-2 border-[#023e7d] bg-white">
            <span className="flex-shrink-0 flex items-center px-4 text-[#0466c8]" aria-hidden="true">
              <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '1.125rem' }} />
            </span>
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What can we help you find?"
              className="flex-1 font-body text-[17px] text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent py-3"
              aria-label="Site search"
              aria-autocomplete="list"
              aria-expanded={suggestions.length > 0}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="flex-shrink-0 flex items-center px-3 text-neutral-subtle hover:text-navy-bolder transition-colors"
                aria-label="Clear"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2 2l12 12M14 2L2 14"/>
                </svg>
              </button>
            )}
            <a
              href={query ? `/search?q=${encodeURIComponent(query)}` : '/search'}
              className="flex-shrink-0 flex items-center px-7 bg-navy-bolder text-white font-body font-bold text-[15px] tracking-[-0.3px] hover:bg-navy transition-colors"
            >
              Search
            </a>
          </div>

          {suggestions.length > 0 && (
            <ul className="mt-2 border border-t-0 border-[#023e7d]" role="listbox">
              {suggestions.map((item, i) => (
                <li key={item.href + i} role="option">
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-surface-subtle transition-colors border-b border-border-light last:border-0"
                  >
                    <span className={`flex-shrink-0 font-body font-bold text-[11px] uppercase tracking-wide px-2 py-0.5 ${TYPE_STYLES[item.type]}`}>
                      {item.type}
                    </span>
                    <div className="min-w-0">
                      <p className="font-body text-[15px] text-navy-bolder leading-snug">
                        {highlight(item.title, query)}
                      </p>
                      <p className="font-body text-[12px] text-neutral-subtle mt-0.5">{item.subtitle}</p>
                    </div>
                  </a>
                </li>
              ))}
              <li className="border-t border-[#023e7d]/20">
                <a
                  href={`/search?q=${encodeURIComponent(query)}`}
                  onClick={onClose}
                  className="flex items-center gap-2 px-4 py-3 font-body font-semibold text-[14px] text-[#0466c8] hover:bg-surface-subtle transition-colors"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                  </svg>
                  See all results for "{query}"
                </a>
              </li>
            </ul>
          )}

          {query.length >= 2 && suggestions.length === 0 && (
            <p className="mt-3 font-body text-[14px] text-neutral-subtle">
              No results for "<span className="text-navy-bolder font-semibold">{query}</span>" — try a different term.
            </p>
          )}

        </div>
      </div>
    </>
  )
}

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
      <img src="/usni-logo-full.svg" alt="U.S. Naval Institute" className="w-auto h-[52px] lg:h-[69px]" />
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

/* ─── Icons ─────────────────────────────────────────────────────────────────── */
function IconSearch() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  )
}

function IconClose() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M6 18L18 6M6 6l12 12"/>
    </svg>
  )
}

function IconMenu() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M4 6h16M4 12h16M4 18h16"/>
    </svg>
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
          <div className="w-[380px] flex-shrink-0 bg-navy-boldest flex flex-col">
            {/* Top-banner image (articles) */}
            {megaCta.image && megaCta.imageLayout !== 'side' && (
              <div className="w-full aspect-[16/9] overflow-hidden flex-shrink-0">
                <img src={megaCta.image} alt={megaCta.imageAlt ?? ''} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="flex flex-col justify-between gap-6 flex-1 p-8">
              {/* Side-by-side image (books) */}
              {megaCta.image && megaCta.imageLayout === 'side' ? (
                <div className="flex gap-5 items-start">
                  <div className="flex-shrink-0 w-[90px]">
                    <img src={megaCta.image} alt={megaCta.imageAlt ?? ''} className="w-full h-auto object-contain shadow-lg" />
                  </div>
                  <div className="flex flex-col gap-3 min-w-0">
                    {megaCta.eyebrow && (
                      <p className="font-body font-medium text-xs uppercase tracking-[0.1em]" style={{ color: '#E0E0CC' }}>
                        {megaCta.eyebrow}
                      </p>
                    )}
                    <h3 className="font-headline text-2xl text-white not-italic leading-[1.1]">{megaCta.headline}</h3>
                    <p className="font-body text-sm text-white/80 leading-relaxed">{megaCta.body}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {megaCta.eyebrow && (
                    <p className="font-body font-medium text-xs uppercase tracking-[0.1em]" style={{ color: '#E0E0CC' }}>
                      {megaCta.eyebrow}
                    </p>
                  )}
                  <h3 className="font-headline text-3xl text-white not-italic leading-[1.1]">{megaCta.headline}</h3>
                  <p className="font-body text-base text-white/80 leading-relaxed">{megaCta.body}</p>
                </div>
              )}
              <a
                href={megaCta.ctaHref}
                className="flex items-center justify-center bg-gold text-navy-bolder
                           font-body font-bold text-base tracking-[-0.3px]
                           px-6 py-4 hover:bg-gold-dark transition-colors"
              >
                {megaCta.ctaLabel}
              </a>
            </div>
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

/* ─── Nav link (desktop) ──────────────────────────────────────────────────────── */
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

/* ─── Mobile Menu (full-screen accordion) ───────────────────────────────────── */
function MobileMenu({ open, onClose, onSearchOpen, cartCount }: {
  open: boolean
  onClose: () => void
  onSearchOpen: () => void
  cartCount: number
}) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const utilityLinks = [
    {
      label: 'Donate',
      href: '/giving/donate',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      label: 'Events',
      href: '/events',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      label: 'Cart',
      href: '/membership/cart',
      badge: cartCount > 0 ? cartCount : undefined,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
      ),
    },
    {
      label: 'Member Login',
      href: '/login',
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
      ),
    },
  ]

  return (
    <div className="fixed inset-0 z-[60] lg:hidden flex flex-col bg-white">

      {/* Header bar */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border-light flex-shrink-0">
        <FullLogo />
        <div className="flex items-center gap-1">
          <button
            onClick={() => { onClose(); onSearchOpen() }}
            className="p-2.5 text-navy-bolder hover:text-navy-subtle transition-colors"
            aria-label="Search"
          >
            <IconSearch />
          </button>
          <button
            onClick={onClose}
            className="p-2.5 text-navy-bolder hover:text-navy-subtle transition-colors"
            aria-label="Close menu"
          >
            <IconClose />
          </button>
        </div>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto">
        <nav aria-label="Primary navigation">
          {navItems.map((item) => (
            <div key={item.href} className="border-b border-border-light">
              {item.children ? (
                <>
                  <button
                    className="flex items-center justify-between w-full px-5 py-4 text-left bg-transparent"
                    onClick={() => setExpandedItem(prev => prev === item.href ? null : item.href)}
                    aria-expanded={expandedItem === item.href}
                  >
                    <span className="font-body font-extrabold text-[1.125rem] text-navy-subtle">
                      {item.label}
                    </span>
                    <span className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded bg-surface-subtle text-navy-subtle transition-transform duration-200 ${expandedItem === item.href ? 'rotate-180' : ''}`}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 12 12" fill="none">
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                  {expandedItem === item.href && (
                    <div className="border-l-[3px] border-gold ml-5 mb-4">
                      {item.children.map((child, i) => (
                        <a
                          key={child.href + i}
                          href={child.href}
                          onClick={onClose}
                          className="block px-4 py-3 font-body text-[1rem] text-navy-bolder hover:text-navy-subtle transition-colors"
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center justify-between px-5 py-4 font-body font-extrabold text-[1.125rem] text-navy-subtle hover:text-navy-bolder transition-colors"
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}
        </nav>

        {/* Utility links */}
        <div className="border-t-2 border-border-light mt-1">
          {utilityLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="flex items-center gap-3 px-5 py-4 font-body font-bold text-[1rem] text-navy-subtle hover:text-navy-bolder hover:bg-surface-subtle transition-colors border-b border-border-light last:border-0"
            >
              <span className="flex-shrink-0">{link.icon}</span>
              {link.label}
              {link.badge !== undefined && (
                <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-gold text-navy-bolder font-body font-bold text-[12px] leading-none">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Header ────────────────────────────────────────────────────────────────── */
export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const scrolled = useScrolled(10)
  const { pathname } = useLocation()
  const { cartCount } = useCart()

  const openSearch = () => {
    setMobileOpen(false)
    setSearchOpen(true)
  }

  return (
    <header className={`sticky top-0 z-40 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'} ${searchOpen ? 'z-50' : ''}`}>

      {/* ── Mobile bar (always visible on small screens) ── */}
      <div className="lg:hidden flex items-center justify-between px-5 py-3.5 border-b border-border-light">
        <FullLogo />
        <div className="flex items-center gap-1">
          <button
            onClick={openSearch}
            className="p-2.5 text-navy-bolder hover:text-navy-subtle transition-colors"
            aria-label="Search"
            aria-expanded={searchOpen}
          >
            <IconSearch />
          </button>
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2.5 text-navy-bolder hover:text-navy-subtle transition-colors"
            aria-label="Open menu"
          >
            <IconMenu />
          </button>
        </div>
      </div>

      {/* ── Desktop utility bar — collapses on scroll ── */}
      <div
        className={`header-top hidden lg:block transition-all duration-300 ease-in-out ${
          scrolled
            ? 'max-h-0 opacity-0 pointer-events-none overflow-hidden'
            : 'max-h-40 opacity-100 overflow-visible'
        }`}
      >
        <div className="container-site">
          <div className="flex items-center justify-between py-4">
            <FullLogo />
            <div className="flex items-center">
              <ArchivesLink />
              <a href="/events" className="font-body font-bold text-[18px] text-navy-subtle px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                Events
              </a>
              <a href="/ships-store" className="font-body font-bold text-[18px] text-navy-subtle px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                Ship's Store
              </a>
              <div className="w-px h-5 bg-[#c4c9d4] mx-2" />
              <a href="/membership/cart" className="flex items-center gap-1.5 font-body font-bold text-[18px] text-navy-subtle px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                Cart
                {cartCount > 0 && (
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gold text-navy-bolder font-body font-bold text-[13px] leading-none flex-shrink-0">
                    {cartCount}
                  </span>
                )}
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
                           text-[18px] px-6 py-3.5 hover:bg-gold-dark transition-colors whitespace-nowrap leading-none"
              >
                <img src="/donate-button-logo.svg" alt="" style={{ height: '1.4rem' }} className="w-auto" aria-hidden="true" />
                Donate
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop main nav ── */}
      <div className="header-bottom hidden lg:block">
        <div className="container-site">
          <div className="flex items-center">
            {/* Seal logo — only visible when scrolled */}
            <div
              className={`flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out ${
                scrolled ? 'max-w-[70px] opacity-100 mr-4' : 'max-w-0 opacity-0 mr-0'
              }`}
            >
              <SealLogo />
            </div>

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

            <button
              onClick={() => setSearchOpen(o => !o)}
              className={`ml-2 p-2 transition-colors flex-shrink-0 ${searchOpen ? 'text-navy-bolder' : 'text-navy-subtle hover:text-navy-bolder'}`}
              aria-label={searchOpen ? 'Close search' : 'Open search'}
              aria-expanded={searchOpen}
            >
              {searchOpen
                ? <i className="fa-solid fa-xmark" style={{ fontSize: '1.375rem' }} />
                : <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '1.125rem' }} />
              }
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onSearchOpen={openSearch}
        cartCount={cartCount}
      />

      {searchOpen && <SearchFlydown onClose={() => setSearchOpen(false)} />}
    </header>
  )
}
