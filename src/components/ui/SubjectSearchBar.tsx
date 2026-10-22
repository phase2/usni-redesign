import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FACETS, slugify } from '@/data/siteSearch'
import { SUBJECTS } from '@/data/searchTaxonomy'

/**
 * Browse All Articles search box that suggests subjects as the reader types —
 * the topics, ships, regions, conflicts, commands and organizations the
 * content architecture plan gives a page of their own. Built on the Books & Press hero
 * search (BookSearchBar): a suggestion list under the field, the match
 * highlighted, and a closing "See all results" row.
 *
 * Rather than a page per subject, as the plan proposed, a subject is one pick
 * away from this box: a suggestion opens Browse All Articles (/browse) filtered
 * to it, e.g. /browse?publication=proceedings&topic=mine-warfare. Enter
 * searches the keyword there instead.
 *
 * `publications` scopes the box to one magazine (`publication` slugs), as on
 * the Proceedings and Naval History landings: suggestions count only that
 * magazine's articles, and every search the box starts keeps the scope. As on
 * Books & Press, the list appears only once the reader has typed two
 * characters; an empty field offers nothing.
 */

const FACET_BY_KEY = Object.fromEntries(FACETS.map((f) => [f.key, f]))

/** Suggestions shown at once. */
const LIMIT = 6

interface Suggestion {
  term: string
  facetLabel: string
  count: number
  href: string
}

function highlight(text: string, query: string) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (!query || idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-[#0466C8]/15 text-[#0466C8] font-semibold">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

function browseHref(publications: string[], extra: Record<string, string>) {
  const params = new URLSearchParams()
  for (const p of publications) params.append('publication', p)
  for (const [k, v] of Object.entries(extra)) params.set(k, v)
  const qs = params.toString()
  return qs ? `/browse?${qs}` : '/browse'
}

function suggestionsFor(query: string, publications: string[]): Suggestion[] {
  const proceedings = publications.length === 0 || publications.includes('proceedings')
  const navalHistory = publications.length === 0 || publications.includes('naval-history')
  const needle = query.trim().toLowerCase()

  return SUBJECTS.map(([facet, term, p, n]) => ({
    facet,
    term,
    count: (proceedings ? p : 0) + (navalHistory ? n : 0),
    at: needle ? term.toLowerCase().indexOf(needle) : 0,
  }))
    .filter((s) => s.count > 0 && s.at !== -1)
    .sort((a, b) => {
      // A term that starts with the query, or has a word that does, leads.
      const rank = (s: typeof a) => (s.at === 0 ? 0 : s.term[s.at - 1] === ' ' ? 1 : 2)
      return rank(a) - rank(b) || b.count - a.count
    })
    .slice(0, LIMIT)
    .map((s) => ({
      term: s.term,
      facetLabel: FACET_BY_KEY[s.facet].label,
      count: s.count,
      href: browseHref(publications, { [FACET_BY_KEY[s.facet].param]: slugify(s.term) }),
    }))
}

interface SubjectSearchBarProps {
  className?: string
  /** `large` is the full-width box at the top of /browse. */
  size?: 'default' | 'large'
  initialQuery?: string
  /** Magazines every search from this box is scoped to, as `publication` slugs. */
  publications?: string[]
  placeholder?: string
  /** Accessible name for the field. */
  label?: string
}

export default function SubjectSearchBar({
  className = '',
  size = 'default',
  initialQuery = '',
  publications = [],
  placeholder = 'Search articles by keyword, topic, ship, or region…',
  label = 'Search all articles',
}: SubjectSearchBarProps) {
  const navigate = useNavigate()
  const listId = useId()
  const [query, setQuery] = useState(initialQuery)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const suggestions = query.trim().length >= 2 ? suggestionsFor(query, publications) : []
  const dropdownOpen = open && suggestions.length > 0
  const large = size === 'large'
  const resultsHref = browseHref(publications, query.trim() ? { q: query.trim() } : {})

  const close = () => {
    setOpen(false)
    setActive(-1)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const picked = dropdownOpen && active >= 0 ? suggestions[active] : null
    close()
    navigate(picked ? picked.href : resultsHref)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') close()
    if (!dropdownOpen || (e.key !== 'ArrowDown' && e.key !== 'ArrowUp')) return
    e.preventDefault()
    // -1 is the field itself; the arrows cycle through it and the options.
    const step = e.key === 'ArrowDown' ? 1 : -1
    setActive((i) => {
      const next = i + step
      if (next >= suggestions.length) return -1
      if (next < -1) return suggestions.length - 1
      return next
    })
  }

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <form
        role="search"
        onSubmit={onSubmit}
        className={large
          ? 'flex items-stretch border-2 border-navy-bolder bg-white'
          : `flex items-center border-2 bg-white px-4 py-3.5 transition-colors
          ${dropdownOpen ? 'border-[#023E7D]' : 'border-[#94A3B8] focus-within:border-[#023E7D]'}`}
      >
        {!large && (
          <i className="fa-solid fa-magnifying-glass text-[#0466C8] mr-3 text-lg flex-shrink-0" aria-hidden="true" />
        )}
        <input
          type="text"
          value={query}
          placeholder={placeholder}
          className={large
            ? 'flex-1 min-w-0 font-body text-lg lg:text-xl text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent px-4 lg:px-5 py-3.5 lg:py-4'
            : 'flex-1 min-w-0 font-body text-base text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent'}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-label={label}
          aria-autocomplete="list"
          aria-expanded={dropdownOpen}
          aria-controls={listId}
          aria-activedescendant={dropdownOpen && active >= 0 ? `${listId}-${active}` : undefined}
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setActive(-1)
            }}
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
            <span className="sr-only">Search</span>
          </button>
        )}
      </form>

      {dropdownOpen && (
        <div
          className={`absolute left-0 right-0 bg-white border-2 border-t-0 ${large ? 'border-navy-bolder' : 'border-[#023E7D]'} shadow-lg z-50 text-left`}
        >
          <ul id={listId} role="listbox" aria-label="Suggested subjects">
            {suggestions.map((s, i) => (
              <li key={s.href} id={`${listId}-${i}`} role="option" aria-selected={i === active}>
                <Link
                  to={s.href}
                  onClick={close}
                  className={`flex items-baseline justify-between gap-4 px-4 py-3 hover:bg-surface-subtle transition-colors ${i === active ? 'bg-surface-subtle' : ''}`}
                >
                  <span className="min-w-0">
                    <span className="block font-body text-base text-navy-bolder leading-snug">
                      {highlight(s.term, query.trim())}
                    </span>
                    <span className="block font-body text-sm text-neutral-subtle mt-0.5">{s.facetLabel}</span>
                  </span>
                  <span className="flex-shrink-0 font-body text-xs text-neutral-subtle tabular-nums">
                    {s.count.toLocaleString()} {s.count === 1 ? 'article' : 'articles'}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            to={resultsHref}
            onClick={close}
            className="flex items-center gap-2 px-4 py-3 border-t border-border-light font-body font-semibold text-base text-[#0466C8] hover:bg-surface-subtle transition-colors"
          >
            <i className="fa-solid fa-magnifying-glass text-xs" aria-hidden="true" />
            See all results for “{query.trim()}”
          </Link>
        </div>
      )}
    </div>
  )
}
