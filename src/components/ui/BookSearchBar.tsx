import { useState, useRef, useEffect } from 'react'

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

interface BookSearchBarProps {
  className?: string
}

export default function BookSearchBar({ className = '' }: BookSearchBarProps) {
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

  const dropdownOpen = open && suggestions.length > 0

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        className={`flex items-center border-2 bg-white px-4 py-3.5 transition-colors
          ${dropdownOpen
            ? 'border-[#023E7D]'
            : 'border-[#94A3B8] focus-within:border-[#023E7D]'
          }`}
      >
        <i
          className="fa-solid fa-magnifying-glass text-[#0466C8] mr-3 text-lg flex-shrink-0"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          placeholder="Search full collection by keyword"
          className="flex-1 font-body text-base text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent"
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => e.key === 'Escape' && setOpen(false)}
          aria-label="Search books"
          aria-autocomplete="list"
          aria-expanded={dropdownOpen}
        />
        {query && (
          <button
            onClick={() => { setQuery(''); setOpen(false) }}
            className="ml-2 text-neutral-subtle hover:text-navy-bolder transition-colors flex-shrink-0"
            aria-label="Clear search"
          >
            <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
          </button>
        )}
      </div>

      {dropdownOpen && (
        <ul
          className="absolute left-0 right-0 bg-white border-2 border-t-0 border-[#023E7D] shadow-lg z-50"
          role="listbox"
        >
          {suggestions.map((item) => (
            <li key={item.href} role="option">
              <a
                href={item.href}
                className="flex items-start gap-3 px-4 py-3 hover:bg-surface-subtle transition-colors"
                onClick={() => setOpen(false)}
              >
                <div className="min-w-0">
                  <p className="font-body text-base text-navy-bolder leading-snug">
                    {highlight(item.title, query)}
                  </p>
                  <p className="font-body text-base text-neutral-subtle mt-0.5">{item.author}</p>
                </div>
              </a>
            </li>
          ))}
          <li className="border-t border-border-light">
            <a
              href={`/books/collection?q=${encodeURIComponent(query)}`}
              className="flex items-center gap-2 px-4 py-3 font-body font-semibold text-base text-[#0466C8] hover:bg-surface-subtle transition-colors"
              onClick={() => setOpen(false)}
            >
              <i className="fa-solid fa-magnifying-glass text-xs" aria-hidden="true" />
              See all results for "{query}"
            </a>
          </li>
        </ul>
      )}
    </div>
  )
}
