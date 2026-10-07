import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  prototypeMap,
  flattenLinks,
  type PrototypeGroup,
  type PrototypeLink,
} from '@/data/prototypeMap'

/**
 * Prototype navigator: a launcher pinned to the bottom-left corner of every
 * page that opens a panel linking to every component sheet and prototype page.
 *
 * It is a review tool, not part of the USNI design — so it is styled to read as
 * chrome sitting over the prototype (a dark pill and panel) rather than as a
 * site component, and the full list lives on one data source shared with the
 * /toc table of contents (src/data/prototypeMap.ts).
 *
 * Groups collapse so ~120 links stay scannable; the one holding the current
 * page opens by default and the current page is marked. Typing in the filter
 * opens every group with a match and hides the rest.
 *
 * Stacking: z-[55] sits above the sticky header (40/50) and the article meter
 * banner (50), and below modals and the mobile menu (60), which should cover
 * it while open.
 *
 * Not rendered inside an iframe — the Navigation sheet frames the live header
 * and footer, and a launcher in each frame would be noise — nor on the
 * /design-system/preview routes those frames load.
 */

const inFrame = typeof window !== 'undefined' && window.self !== window.top

function matches(link: PrototypeLink, query: string): boolean {
  const q = query.toLowerCase()
  return (
    link.label.toLowerCase().includes(q) ||
    (link.href ?? '').toLowerCase().includes(q) ||
    (link.children ?? []).some((child) => matches(child, query))
  )
}

function filterLinks(links: PrototypeLink[], query: string): PrototypeLink[] {
  if (!query) return links
  return links
    .filter((link) => matches(link, query))
    .map((link) => {
      // A parent that matches on its own keeps all its children; otherwise
      // narrow them to the ones that matched.
      const selfMatch =
        link.label.toLowerCase().includes(query.toLowerCase()) ||
        (link.href ?? '').toLowerCase().includes(query.toLowerCase())
      return selfMatch || !link.children ? link : { ...link, children: filterLinks(link.children, query) }
    })
}

function NavLinks({
  links,
  pathname,
  depth = 0,
}: {
  links: PrototypeLink[]
  pathname: string
  depth?: number
}) {
  return (
    <ul className={depth > 0 ? 'ml-3 pl-3 border-l border-white/15' : ''}>
      {links.map((link) => {
        // A demo link may carry a query (Search Results); the page is the path
        const current = link.href?.split('?')[0] === pathname
        const label = (
          <>
            <span className="min-w-0">{link.label}</span>
            {link.note && (
              <span className="flex-shrink-0 font-normal text-[11px] text-white/50">{link.note}</span>
            )}
          </>
        )
        return (
          <li key={`${link.label}-${link.href ?? ''}`}>
            {link.href ? (
              <Link
                to={link.href}
                aria-current={current ? 'page' : undefined}
                className={`flex items-baseline justify-between gap-3 px-2 py-1.5 font-body text-[13px] leading-snug transition-colors ${
                  current
                    ? 'bg-white/10 text-white font-semibold'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ) : (
              <p className="flex items-baseline justify-between gap-3 px-2 py-1.5 font-body text-[13px] leading-snug text-white/50">
                {label}
              </p>
            )}
            {link.children && <NavLinks links={link.children} pathname={pathname} depth={depth + 1} />}
          </li>
        )
      })}
    </ul>
  )
}

function Group({
  group,
  pathname,
  query,
  defaultOpen,
}: {
  group: PrototypeGroup
  pathname: string
  query: string
  defaultOpen: boolean
}) {
  const [open, setOpen] = useState(defaultOpen)
  const links = filterLinks(group.links, query)
  if (links.length === 0) return null
  // A live filter overrides the collapse state so every match is visible.
  const expanded = query ? true : open

  return (
    <div className="border-t border-white/10 first:border-t-0">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={expanded}
        className="flex items-center justify-between w-full px-4 py-2.5 font-body font-semibold text-[13px] text-white text-left hover:bg-white/5"
      >
        {group.title}
        <i
          className={`fa-solid fa-chevron-down text-[10px] text-white/60 transition-transform ${expanded ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {expanded && (
        <div className="px-2 pb-3">
          <NavLinks links={links} pathname={pathname} />
        </div>
      )}
    </div>
  )
}

export default function PrototypeNav() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // The group holding the current page, opened by default each time.
  const currentGroupId = useMemo(() => {
    for (const section of prototypeMap) {
      for (const group of section.groups) {
        if (flattenLinks(group.links).some((link) => link.href === pathname)) return group.id
      }
    }
    return null
  }, [pathname])

  // Close on navigation, so following a link reveals the page it opened.
  useEffect(() => {
    setOpen(false)
    setQuery('')
  }, [pathname])

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onPointer)
    }
  }, [open])

  if (inFrame || pathname.startsWith('/design-system/preview')) return null

  const q = query.trim()
  const anyMatch =
    !q || prototypeMap.some((s) => s.groups.some((g) => filterLinks(g.links, q).length > 0))

  return (
    <div ref={rootRef} className="fixed bottom-4 left-4 z-[55] flex flex-col items-start gap-2 print:hidden">
      {open && (
        <div
          id="prototype-nav-panel"
          role="dialog"
          aria-label="Prototype navigator"
          className="w-[min(360px,calc(100vw-2rem))] max-h-[min(640px,calc(100vh-6rem))] flex flex-col bg-navy-boldest text-white shadow-2xl border border-white/10"
        >
          <div className="flex items-center justify-between gap-3 px-4 pt-4 pb-3">
            <p className="font-body font-bold text-sm">Prototype navigator</p>
            <Link
              to="/toc"
              className="font-body text-xs text-light-blue hover:text-white underline underline-offset-2"
            >
              Table of contents
            </Link>
          </div>

          <div className="px-4 pb-3">
            <label htmlFor="prototype-nav-filter" className="sr-only">
              Filter pages
            </label>
            <input
              ref={inputRef}
              id="prototype-nav-filter"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter pages…"
              className="w-full bg-white/10 border border-white/15 px-3 py-2 font-body text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-light-blue"
            />
          </div>

          <div className="overflow-y-auto overscroll-contain border-t border-white/10">
            {!anyMatch && (
              <p className="px-4 py-6 font-body text-sm text-white/60">No pages match “{q}”.</p>
            )}
            {prototypeMap.map((section) => (
              <div
                key={section.id}
                // Drop a section heading whose groups all filtered away.
                hidden={!!q && !section.groups.some((g) => filterLinks(g.links, q).length > 0)}
              >
                <p className="px-4 pt-4 pb-1 font-body font-medium text-[11px] uppercase tracking-[0.1em] text-light-blue">
                  {section.title}
                </p>
                {section.groups.map((group) => (
                  <Group
                    // Remount per page so "open by default" follows navigation.
                    key={`${group.id}-${pathname}`}
                    group={group}
                    pathname={pathname}
                    query={q}
                    defaultOpen={group.id === currentGroupId}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="prototype-nav-panel"
        className="flex items-center gap-2 bg-navy-boldest text-white font-body font-bold text-sm px-4 py-3 shadow-lg border border-white/15 hover:bg-navy-bolder transition-colors"
      >
        <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-sitemap'} text-sm w-4`} aria-hidden="true" />
        {open ? 'Close' : 'Pages'}
      </button>
    </div>
  )
}
