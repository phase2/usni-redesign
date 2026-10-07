import { useState, useRef, useEffect, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

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
  /**
   * `large` is the full-width box from site search (/search): a navy rule,
   * larger type, and a navy submit button in place of the leading icon. Used
   * where the bar is the page's main control, as on All Books, rather than one
   * element of a hero.
   */
  size?: 'default' | 'large'
  /** Seeds the field, e.g. with the keyword the collection is filtered by. */
  initialQuery?: string
}

/** Where a submitted search lands: the full collection, filtered. */
const resultsHref = (q: string) =>
  q.trim() ? `/books/collection?q=${encodeURIComponent(q.trim())}` : '/books/collection'

export default function BookSearchBar({ className = '', size = 'default', initialQuery = '' }: BookSearchBarProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState(initialQuery)
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
  const large = size === 'large'

  // Enter (and, on the large bar, the button) runs the search against the
  // whole collection rather than picking a suggestion.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setOpen(false)
    navigate(resultsHref(query))
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={onSubmit}
        className={large
          ? 'flex items-stretch border-2 border-navy-bolder bg-white'
          : `flex items-center border-2 bg-white px-4 py-3.5 transition-colors
          ${dropdownOpen
            ? 'border-[#023E7D]'
            : 'border-[#94A3B8] focus-within:border-[#023E7D]'
          }`}
      >
        {!large && (
          <i
            className="fa-solid fa-magnifying-glass text-[#0466C8] mr-3 text-lg flex-shrink-0"
            aria-hidden="true"
          />
        )}
        <input
          type="text"
          value={query}
          placeholder={large ? 'Search books by keyword, title, or author…' : 'Search full collection by keyword'}
          className={large
            ? 'flex-1 min-w-0 font-body text-lg lg:text-xl text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent px-4 lg:px-5 py-3.5 lg:py-4'
            : 'flex-1 font-body text-base text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent'}
          onChange={e => { setQuery(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          onKeyDown={e => e.key === 'Escape' && setOpen(false)}
          aria-label="Search books"
          aria-autocomplete="list"
          aria-expanded={dropdownOpen}
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setOpen(false) }}
            className={`${large ? 'px-3' : 'ml-2'} text-neutral-subtle hover:text-navy-bolder transition-colors flex-shrink-0`}
            aria-label="Clear search"
          >
            <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
          </button>
        )}
        {large && (
          <button
            type="submit"
            className="flex-shrink-0 flex items-center justify-center w-14 lg:w-16 bg-navy-bolder text-white hover:bg-navy-bright transition-colors"
          >
            <i className="fa-solid fa-magnifying-glass text-lg" aria-hidden="true" />
            <span className="sr-only">Search books</span>
          </button>
        )}
      </form>

      {dropdownOpen && (
        <ul
          className={`absolute left-0 right-0 bg-white border-2 border-t-0 ${large ? 'border-navy-bolder' : 'border-[#023E7D]'} shadow-lg z-50`}
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
              href={resultsHref(query)}
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
