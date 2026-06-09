import { useState, useRef, useEffect } from 'react'
import heroBg from '@/assets/images/books/custom-bookstore-hero.png'

const AUTOCOMPLETE_TITLES = [
  { title: 'Warfare Beneath the Waves', author: 'Axel Niestle', href: '/books/warfare-beneath-the-waves' },
  { title: 'Training for Victory', author: 'Frank R. Donche', href: '/books/training-for-victory' },
  { title: 'The Melting Point', author: 'Forrest L. Marion', href: '/books/the-melting-point' },
  { title: 'Standing Up the Space Force', author: 'Multiple Authors', href: '/books/standing-up-space-force' },
  { title: 'Rush to Disaster', author: 'James D. Hornfischer', href: '/books/rush-to-disaster' },
  { title: 'The Origins of Aegis', author: 'Thomas Wildenberg', href: '/books/origins-of-aegis' },
  { title: 'United States Marines: A History', author: 'Multiple Authors', href: '/books/marines-history' },
  { title: 'Japanese Submarines in World War Two', author: 'Terry C. Treadwell', href: '/books/japanese-submarines' },
  { title: 'Greyhounds of the Pacific', author: 'Multiple Authors', href: '/books/greyhounds-pacific' },
  { title: 'Give Me a Fast Ship', author: 'Tim McGrath', href: '/books/give-me-fast-ship' },
  { title: "The Admiral's Bookshelf", author: 'James Stavridis', href: '/books/admirals-bookshelf' },
  { title: 'Cold War Storm', author: 'Multiple Authors', href: '/books/cold-war-storm' },
  { title: 'Battleship Diplomat', author: 'Nancy Snow', href: '/books/battleship-diplomat' },
  { title: 'Career Compass', author: 'Douglas H. Raugh Jr.', href: '/books/career-compass' },
  { title: 'AI Warfighting', author: 'Multiple Authors', href: '/books/ai-warfighting' },
  { title: 'Countering China: The Great Game', author: 'Multiple Authors', href: '/books/countering-china' },
  { title: 'Cyber Warfare and Navies', author: 'Multiple Authors', href: '/books/cyber-warfare-navies' },
  { title: 'Destroyers at War', author: 'Multiple Authors', href: '/books/destroyers-at-war' },
  { title: 'Sea Power and the American Interest', author: 'John Fass Morton', href: '/books/sea-power-american-interest' },
  { title: 'American Airpower', author: 'Peter F. Owen', href: '/books/american-airpower' },
  { title: 'Fighting Falcons', author: 'Multiple Authors', href: '/books/fighting-falcons' },
  { title: 'Commanding Minds and Machines', author: 'Multiple Authors', href: '/books/commanding-minds-machines' },
  { title: 'The Gamble in the Coral Sea', author: 'Multiple Authors', href: '/books/gamble-coral-sea' },
  { title: 'Intruders and Wild Weasels', author: 'Thomas Wildenberg', href: '/books/intruders-wild-weasels' },
]

function highlight(text: string, query: string) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#0466C8]/15 text-[#0466C8] font-semibold">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

export default function BooksHero() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const suggestions = query.length >= 2
    ? AUTOCOMPLETE_TITLES.filter(b =>
        b.title.toLowerCase().includes(query.toLowerCase()) ||
        b.author.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 6)
    : []

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <section
      className="relative w-full bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Left-aligned white card — matches MembershipHero layout */}
      <div
        className="relative z-10 bg-white flex flex-col justify-center gap-8
                   w-full lg:w-1/2 xl:w-[49%] max-w-[860px]
                   py-14 lg:py-20
                   pr-8 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.5rem, 6.5vw, 7rem)' }}
      >
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
          Naval Institute Press
        </p>

        <div className="flex flex-col gap-5">
          <h1 className="font-headline text-5xl lg:text-[64px] text-navy-bolder leading-[1.05]">
            Books &amp; Press
          </h1>
          <p className="font-body text-lg text-neutral-subtle leading-relaxed">
            Founded in 1898, the Naval Institute Press publishes essential military
            and naval titles — from foundational Sea Service guides to New York Times
            bestselling fiction.
          </p>
        </div>

        {/* Search with autocomplete */}
        <div ref={wrapperRef} className="relative">
          <div
            className={`flex items-center border bg-white px-4 py-3.5 transition-all
              ${open && suggestions.length > 0
                ? 'border-[#023E7D] ring-2 ring-[#023E7D]/30 rounded-b-none'
                : 'border-[#94A3B8] focus-within:border-[#023E7D] focus-within:ring-2 focus-within:ring-[#023E7D]/30'
              }`}
          >
            <i className="fa-solid fa-magnifying-glass text-neutral-subtle mr-3 text-sm flex-shrink-0" aria-hidden="true" />
            <input
              type="search"
              value={query}
              placeholder="Search full collection by keyword"
              className="flex-1 font-body text-base text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent"
              onChange={e => { setQuery(e.target.value); setOpen(true) }}
              onFocus={() => setOpen(true)}
              onKeyDown={e => e.key === 'Escape' && setOpen(false)}
              aria-label="Search books"
              aria-autocomplete="list"
              aria-expanded={open && suggestions.length > 0}
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setOpen(false) }}
                className="ml-2 text-neutral-subtle hover:text-navy-bolder transition-colors"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Autocomplete dropdown */}
          {open && suggestions.length > 0 && (
            <ul
              className="absolute left-0 right-0 bg-white border border-t-0 border-[#023E7D] shadow-lg z-50"
              role="listbox"
            >
              {suggestions.map((item) => (
                <li key={item.href} role="option">
                  <a
                    href={item.href}
                    className="flex items-start gap-3 px-4 py-3 hover:bg-surface-subtle transition-colors group"
                    onClick={() => setOpen(false)}
                  >
                    <i className="fa-solid fa-book text-[#0466C8] text-xs mt-1 flex-shrink-0" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="font-body text-sm text-navy-bolder leading-snug">
                        {highlight(item.title, query)}
                      </p>
                      <p className="font-body text-xs text-neutral-subtle mt-0.5">
                        {item.author}
                      </p>
                    </div>
                  </a>
                </li>
              ))}
              <li className="border-t border-border-light">
                <a
                  href={`/books/search?q=${encodeURIComponent(query)}`}
                  className="flex items-center gap-2 px-4 py-3 font-body font-semibold text-sm text-[#0466C8] hover:bg-surface-subtle transition-colors"
                  onClick={() => setOpen(false)}
                >
                  <i className="fa-solid fa-magnifying-glass text-xs" aria-hidden="true" />
                  See all results for "{query}"
                </a>
              </li>
            </ul>
          )}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/books/collection"
            className="flex-1 flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 hover:bg-navy transition-colors"
          >
            Browse full collection
          </a>
          <a
            href="/books/about"
            className="flex-1 flex items-center justify-center border border-navy-bolder text-navy-bolder font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 hover:bg-surface-subtle transition-colors"
          >
            Learn more about the Press
          </a>
        </div>
      </div>
    </section>
  )
}
