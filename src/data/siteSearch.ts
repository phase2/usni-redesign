/**
 * Site search — one flat index over every piece of content the prototype
 * already carries, so /search has real titles, dates, and bylines to find.
 *
 * Nothing here is written for search. Each source keeps its own shape for the
 * page that owns it; this file only maps those records onto `SearchItem`. A
 * record that changes at its source changes in the results with it.
 *
 * Sources: the April 2026 Proceedings issue, the homepage's Proceedings picks,
 * the American Sea Power Project series, the August 2026 Naval History issue
 * and the homepage's Naval History picks, the homepage's USNI News feed, the
 * Press catalog, upcoming and past events, the Proceedings Podcast, and the
 * open essay contests. Section pages (Membership, Giving, and so on) are left
 * out: the main navigation already reaches them, and the client asked for
 * search to return content only.
 *
 * The production site would put this behind a search service; the prototype
 * filters in the browser, which is plenty for a few hundred records.
 */

import type { Article } from '@/types'
import { aprilIssueArticles } from './proceedingsApril2026'
import { augustIssueArticles } from './navalHistoryAugust2026'
import { latestNewsArticles, proceedingsArticles, navalHistoryArticles } from './homepage'
import {
  phaseOneArticles,
  phaseTwoArticles,
  phaseThreeArticles,
  additionalReading,
  withImages,
} from './seaPowerProject'
import { allBooks, newReleases } from './books'
import { upcomingEvents } from './events'
import { pastEvents } from './pastEvents'
import { episodes } from './podcastEpisodes'
import { essayContests } from './essayContests'
import imgProceedingsPodcast from '@/assets/images/proceedings-podcast-thumb.png'
import imgNavalHistoryPodcast from '@/assets/images/nh-podcast-thumb.png'

export type SearchType =
  | 'proceedings'
  | 'naval-history'
  | 'news'
  | 'books'
  | 'events'
  | 'podcasts'
  | 'essay-contests'

/** The content types, in the order the filter row lists them. */
export const SEARCH_TYPES: { id: SearchType; label: string; eyebrow: string }[] = [
  { id: 'proceedings', label: 'Proceedings', eyebrow: 'Proceedings' },
  { id: 'naval-history', label: 'Naval History', eyebrow: 'Naval History' },
  { id: 'news', label: 'USNI News', eyebrow: 'USNI News' },
  { id: 'books', label: 'Books', eyebrow: 'Book' },
  { id: 'events', label: 'Events', eyebrow: 'Event' },
  { id: 'podcasts', label: 'Podcasts', eyebrow: 'Podcast' },
  { id: 'essay-contests', label: 'Essay Contests', eyebrow: 'Essay Contest' },
]

export interface SearchItem {
  id: string
  type: SearchType
  /** Second eyebrow beside the type — a department, "Upcoming", a series. */
  label?: string
  title: string
  summary?: string
  href: string
  /** Display date, already formatted. */
  date?: string
  /** `YYYY-MM-DD`, for sorting and the Year facet. */
  sortDate?: string
  /** Facet values. Authors are also the byline. */
  authors: string[]
  topics: string[]
  /** Extra byline text that is not a facet, e.g. an event's city. */
  place?: string
  image?: string
  imageAlt?: string
  /** A book jacket: rendered portrait rather than cropped to landscape. */
  cover?: boolean
}

/* ── Dates ────────────────────────────────────────────────────────────────── */

const MONTHS = [
  'january', 'february', 'march', 'april', 'may', 'june',
  'july', 'august', 'september', 'october', 'november', 'december',
]

const pad = (n: number) => String(n).padStart(2, '0')

/**
 * The sources write dates four ways — "April 2026", "31 July 2026",
 * "April 27, 2026 5:38 PM", "Wednesday, 4 November 2026" — so each is read
 * here into a sortable ISO date and a display date in the site's day-month-year
 * style. Month-only dates sort to the first of the month and display as given.
 */
function readDate(raw?: string): { sortDate?: string; date?: string } {
  if (!raw) return {}
  const s = raw.replace(/^[A-Za-z]+day,\s*/, '').trim()
  const month = (name: string) => MONTHS.indexOf(name.toLowerCase()) + 1

  let m = s.match(/^(\d{4})-(\d{2})-(\d{2})/)
  if (m) {
    const [, y, mo, d] = m
    return { sortDate: `${y}-${mo}-${d}`, date: `${Number(d)} ${cap(MONTHS[Number(mo) - 1])} ${y}` }
  }
  m = s.match(/^(\d{1,2}) ([A-Za-z]+) (\d{4})/)
  if (m && month(m[2])) {
    return { sortDate: `${m[3]}-${pad(month(m[2]))}-${pad(Number(m[1]))}`, date: `${Number(m[1])} ${cap(m[2])} ${m[3]}` }
  }
  m = s.match(/^([A-Za-z]+) (\d{1,2}), (\d{4})/)
  if (m && month(m[1])) {
    return { sortDate: `${m[3]}-${pad(month(m[1]))}-${pad(Number(m[2]))}`, date: `${Number(m[2])} ${cap(m[1])} ${m[3]}` }
  }
  m = s.match(/^([A-Za-z]+) (\d{4})$/)
  if (m && month(m[1])) {
    return { sortDate: `${m[2]}-${pad(month(m[1]))}-01`, date: `${cap(m[1])} ${m[2]}` }
  }
  return { date: raw }
}

function cap(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
}

/* ── Mappers ──────────────────────────────────────────────────────────────── */

/** "By Andrew K. Blackley" → "Andrew K. Blackley". "Multiple Authors" is no one. */
function authorsOf(raw?: string): string[] {
  if (!raw) return []
  const name = raw.replace(/^By\s+/i, '').trim()
  return name && name !== 'Multiple Authors' ? [name] : []
}

/** Categories that only restate the type, or are placeholders, are not topics. */
const NOT_TOPICS = new Set(['Article Tag', 'USNI News', 'Event'])
const topicsOf = (...values: (string | undefined)[]) =>
  values.filter((v): v is string => !!v && !NOT_TOPICS.has(v))

function fromArticle(type: SearchType, a: Article, label?: string): SearchItem {
  return {
    id: `${type}-${a.id}`,
    type,
    label: label ?? (NOT_TOPICS.has(a.category) ? undefined : a.category),
    title: a.headline,
    summary: a.excerpt,
    href: a.href,
    ...readDate(a.date),
    authors: authorsOf(a.author),
    topics: topicsOf(a.category),
    image: a.image,
    imageAlt: a.imageAlt,
  }
}

/** The same story can sit in two source lists; the first one wins. */
function dedupe(items: SearchItem[]): SearchItem[] {
  const seen = new Set<string>()
  return items.filter((item) => {
    const key = `${item.type}|${item.title.toLowerCase()}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

const seaPower = withImages([
  ...phaseOneArticles,
  ...phaseTwoArticles,
  ...phaseThreeArticles,
  ...additionalReading,
]).map((a) => ({
  ...fromArticle('proceedings', a, 'American Sea Power Project'),
  topics: ['American Sea Power Project'],
}))

const proceedings = dedupe([
  ...proceedingsArticles.map((a) => fromArticle('proceedings', a)),
  ...aprilIssueArticles.map((a) => fromArticle('proceedings', a)),
  ...seaPower,
])

const navalHistory = dedupe([
  ...augustIssueArticles.map((a) => fromArticle('naval-history', a)),
  ...navalHistoryArticles.map((a) => fromArticle('naval-history', a)),
])

const news = dedupe(latestNewsArticles.map((a) => fromArticle('news', a)))

// New releases first: they carry the fuller byline where a title is in both.
const books: SearchItem[] = (() => {
  const seen = new Set<string>()
  return [...newReleases, ...allBooks]
    .filter((b) => !seen.has(b.href) && !!seen.add(b.href))
    .map((b) => ({
      id: `book-${b.id}`,
      type: 'books' as const,
      label: b.series,
      title: b.title,
      summary: `${b.format} · $${b.price.toFixed(2)} for members ($${b.originalPrice.toFixed(2)} list)`,
      href: b.href,
      authors: authorsOf(b.author),
      topics: topicsOf(...(b.subjects ?? [])),
      image: b.image,
      imageAlt: `Cover of ${b.title}`,
      cover: true,
    }))
})()

const events: SearchItem[] = [
  ...upcomingEvents.map((e) => ({ ...e, upcoming: true })),
  ...pastEvents.map((e, i) => ({ ...e, id: `past-${i}`, upcoming: false })),
].map((e) => ({
  id: `event-${e.id}`,
  type: 'events' as const,
  label: e.upcoming ? 'Upcoming' : undefined,
  title: e.title,
  summary: e.summary,
  href: e.href,
  ...readDate(e.startsOn),
  authors: [],
  topics: topicsOf(e.kind),
  place: e.location,
  image: e.image,
  imageAlt: e.imageAlt,
}))

const podcasts: SearchItem[] = episodes.map((ep, i) => ({
  id: `podcast-${i}`,
  type: 'podcasts' as const,
  label: ep.navalHistory ? 'Naval History Podcast' : 'Proceedings Podcast',
  title: ep.title,
  summary: ep.description,
  href: '/proceedings/podcast',
  ...readDate(ep.date),
  authors: [],
  topics: [],
  image: ep.navalHistory ? imgNavalHistoryPodcast : imgProceedingsPodcast,
  imageAlt: ep.navalHistory ? 'Naval History Podcast' : 'Proceedings Podcast',
}))

const contests: SearchItem[] = essayContests.map((c) => ({
  id: `contest-${c.slug}`,
  type: 'essay-contests' as const,
  label: c.status === 'closed' ? 'Closed' : c.status === 'closing-soon' ? 'Closing Soon' : 'Open',
  title: `${c.year} ${c.title}${c.division ? ` — ${c.division}` : ''}`,
  summary: c.summary,
  href: c.href,
  sortDate: c.deadlineISO,
  date: `Deadline ${c.deadline}`,
  authors: [],
  topics: [],
  image: c.image,
  imageAlt: c.imageAlt,
}))

export const searchIndex: SearchItem[] = [
  ...proceedings,
  ...navalHistory,
  ...news,
  ...books,
  ...events,
  ...podcasts,
  ...contests,
]

/* ── Matching ─────────────────────────────────────────────────────────────── */

/** Lower-cased search terms, quotes and punctuation stripped. */
export function searchTerms(query: string): string[] {
  return query
    .toLowerCase()
    .replace(/[“”"]/g, ' ')
    .split(/\s+/)
    .map((t) => t.replace(/^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu, ''))
    .filter(Boolean)
}

/**
 * A weighted match score, or 0 when any term is missing — every term has to
 * appear somewhere, as a reader typing two words expects. Title hits count
 * most, then bylines and topics, then the summary.
 */
export function scoreItem(item: SearchItem, terms: string[]): number {
  if (terms.length === 0) return 1
  const title = item.title.toLowerCase()
  const people = [...item.authors, ...item.topics, item.label ?? '', item.place ?? ''].join(' ').toLowerCase()
  const body = (item.summary ?? '').toLowerCase()
  let score = 0
  for (const term of terms) {
    const hit = (title.includes(term) ? 6 : 0) + (people.includes(term) ? 3 : 0) + (body.includes(term) ? 1 : 0)
    if (hit === 0) return 0
    score += hit
  }
  return score
}
