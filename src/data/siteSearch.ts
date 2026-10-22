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
 * Every record is tagged with the managed vocabulary proposed in the content
 * architecture plan (src/data/searchTaxonomy.ts): its old category goes to the
 * facet it really belongs to — a department, an event type, a book subject's
 * nearest topic — and its title and summary are matched against the plan's
 * ships, regions, conflicts, commands, organizations and topics. The 34,686
 * archive articles the plan was tagged against are searched separately, on
 * Browse All Articles (src/data/archiveSearch.ts, src/sections/BrowseArticles.tsx).
 *
 * The production site would put this behind a search service; the prototype
 * filters in the browser.
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
import {
  BRANCHES,
  COMMANDS,
  CONFLICTS,
  DEPARTMENTS,
  ORGANIZATIONS,
  REGIONS,
  SHIPS,
  TOPICS,
} from './searchTaxonomy'

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

/** Facets a record carries tags for. Type, contributor and dates are fields. */
export type TagFacet =
  | 'topic'
  | 'subtopic'
  | 'ship'
  | 'region'
  | 'conflict'
  | 'command'
  | 'org'
  | 'person'
  | 'branch'
  | 'dept'
  | 'eventType'

export type FacetKey = 'type' | 'issue' | 'period' | 'year' | 'contributor' | TagFacet

export interface FacetDef {
  key: FacetKey
  label: string
  /** URL parameter, e.g. `organization` for `org`. */
  param: string
  /** Placeholder for the "Find …" box on a long list. */
  find?: string
  /** Options in date order, newest first, rather than by count. */
  chrono?: boolean
}

/**
 * Every facet, by key. Parameter names follow the Browse prototype, so its
 * addresses carry over. Each listing picks its own column from these.
 */
const FACET: Record<FacetKey, FacetDef> = {
  type: { key: 'type', label: 'Content Type', param: 'type' },
  issue: { key: 'issue', label: 'Issue', param: 'issue', chrono: true },
  topic: { key: 'topic', label: 'Topic', param: 'topic', find: 'Find a topic…' },
  period: { key: 'period', label: 'Time Period', param: 'period', chrono: true },
  ship: { key: 'ship', label: 'Ship or Class', param: 'ship', find: 'Find a ship…' },
  region: { key: 'region', label: 'Region', param: 'region', find: 'Find a region…' },
  conflict: { key: 'conflict', label: 'Conflict or Era', param: 'conflict', find: 'Find a conflict…' },
  command: { key: 'command', label: 'Command or Unit', param: 'command', find: 'Find a command…' },
  org: { key: 'org', label: 'Organization', param: 'organization', find: 'Find an organization…' },
  contributor: { key: 'contributor', label: 'Contributor', param: 'contributor', find: 'Find a contributor…' },
  subtopic: { key: 'subtopic', label: 'Subtopic', param: 'subtopic', find: 'Find a subtopic…' },
  person: { key: 'person', label: 'Person Covered', param: 'person', find: 'Find a person…' },
  branch: { key: 'branch', label: 'Service Branch', param: 'branch' },
  dept: { key: 'dept', label: 'Department', param: 'department', find: 'Find a department…' },
  eventType: { key: 'eventType', label: 'Event Type', param: 'event-type' },
  year: { key: 'year', label: 'Year', param: 'year', chrono: true, find: 'Find a year…' },
}

/**
 * Site search's column (/search): content type first — it replaced the row of
 * type pills — then the subjects current content is tagged with.
 */
export const SEARCH_FACETS: FacetDef[] = [
  FACET.type,
  FACET.topic,
  FACET.year,
  FACET.contributor,
  FACET.ship,
  FACET.region,
  FACET.conflict,
  FACET.command,
  FACET.org,
  FACET.branch,
  FACET.dept,
  FACET.eventType,
]

/**
 * Browse All Articles' column (/browse): the two magazines, then the plan's
 * subject dimensions, then the finer cuts. Content type is Publication here,
 * under the plan's `publication` parameter.
 */
export const BROWSE_FACETS: FacetDef[] = [
  { ...FACET.type, label: 'Publication', param: 'publication' },
  FACET.topic,
  FACET.period,
  FACET.issue,
  FACET.ship,
  FACET.region,
  FACET.conflict,
  FACET.command,
  FACET.org,
  FACET.contributor,
  FACET.subtopic,
  FACET.person,
  FACET.branch,
  FACET.dept,
  FACET.year,
]

/** Display labels and URL parameters, for links into a listing from elsewhere. */
export const FACETS = Object.values(FACET)

export interface SearchItem {
  id: string
  type: SearchType
  title: string
  summary?: string
  /** An archive article's leads to the 404 page; it has no page in the prototype yet. */
  href: string
  /** Display date, already formatted. */
  date?: string
  /** `YYYY-MM-DD`, for sorting and the Time Period and Year facets. */
  sortDate?: string
  /** The byline, and the Contributor facet. */
  authors: string[]
  tags: Partial<Record<TagFacet, string[]>>
  /** Extra byline text that is not a facet, e.g. an event's city. */
  place?: string
  image?: string
  imageAlt?: string
  /** A book jacket: rendered portrait rather than cropped to landscape. */
  cover?: boolean
  /** One of the 34,686 tagged archive articles (src/data/archiveSearch.ts). */
  archive?: boolean
}

/** URL form of a facet value, e.g. "Leadership & Command" → "leadership-command". */
export const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

const TYPE_LABEL = Object.fromEntries(SEARCH_TYPES.map((t) => [t.id, t.label])) as Record<SearchType, string>

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** `1912-12-01`, or the issue key `1912-12`, → "December 1912". */
export const issueLabel = (sortDate: string) =>
  `${MONTH_NAMES[Number(sortDate.slice(5, 7)) - 1]} ${sortDate.slice(0, 4)}`

/** "December 1912" → `1912-12`, so issues sort by date rather than by name. */
export const issueSortKey = (label: string) => {
  const [month, year] = label.split(' ')
  return `${year}-${String(MONTH_NAMES.indexOf(month) + 1).padStart(2, '0')}`
}

/** A record's values for one facet, as the filter column lists them. */
export function facetValues(item: SearchItem, key: FacetKey): string[] {
  switch (key) {
    case 'type':
      return [TYPE_LABEL[item.type]]
    case 'contributor':
      return item.authors
    case 'year':
      return item.sortDate ? [item.sortDate.slice(0, 4)] : []
    case 'issue':
      // Magazine articles only: the issue they ran in, as "December 1912".
      return (item.type === 'proceedings' || item.type === 'naval-history') && item.sortDate
        ? [issueLabel(item.sortDate)]
        : []
    case 'period':
      return item.sortDate ? [`${item.sortDate.slice(0, 3)}0s`] : []
    default:
      return item.tags[key] ?? []
  }
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

/* ── Tagging ──────────────────────────────────────────────────────────────── */

type Tags = SearchItem['tags']

/**
 * Where the sources' own categories land in the managed vocabulary. Magazine
 * categories are mostly departments, which the plan keeps as they are; book
 * subjects and news categories go to their nearest topic, conflict, region or
 * branch. A category not listed here and not a department ("Featured Article",
 * "Naval History" on a book) carries no facet.
 */
const CATEGORY_TAGS: Record<string, Tags> = {
  'American Sea Power Project': { dept: ['The American Sea Power Project'] },
  'Aviation & Air Power': { topic: ['Naval Aviation'] },
  Aviation: { topic: ['Naval Aviation'] },
  China: { region: ['China'] },
  'Cold War': { conflict: ['Cold War'] },
  'Cybersecurity & Technology': { topic: ['Cyber Operations', 'Emerging Technology & Innovation'] },
  'Foreign Forces': { topic: ['Foreign Navies'] },
  Industry: { topic: ['Shipbuilding & Industrial Base'] },
  'Leadership & Professional Development': { topic: ['Leadership & Command'] },
  'Marine Corps': { branch: ['Marine Corps'] },
  'Political Science & Policy': { topic: ['National Security Policy'] },
  'Strategy & Geopolitics': { topic: ['Strategy & Doctrine', 'Great Power Competition'] },
  Submarines: { topic: ['Undersea & Submarine Warfare'] },
  'World War II': { conflict: ['World War II'] },
}

const DEPARTMENT_SET = new Set<string>(DEPARTMENTS)

/**
 * Vocabulary terms looked for, whole-word, in a record's title and summary.
 * "Navy" is left out of the branches: nearly every record would match it.
 */
const MATCHED: [TagFacet, readonly string[]][] = [
  ['topic', TOPICS],
  ['ship', SHIPS],
  ['region', REGIONS],
  ['conflict', CONFLICTS],
  ['command', COMMANDS],
  ['org', ORGANIZATIONS],
  ['branch', BRANCHES.filter((b) => b !== 'Navy')],
]

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

const MATCHERS = MATCHED.map(
  ([facet, terms]) =>
    [facet, terms.map((term) => [term, new RegExp(`\\b${escapeRegExp(term)}\\b`, 'i')] as const)] as const,
)

/** Adds each value to its facet, once. */
export function mergeTags(into: Tags, from: Tags): Tags {
  for (const [facet, values] of Object.entries(from) as [TagFacet, string[]][]) {
    const list = (into[facet] ??= [])
    for (const v of values) if (!list.includes(v)) list.push(v)
  }
  return into
}

/** Tags for a record from its own categories and its words. */
function tagsOf(categories: (string | undefined)[], text: string): Tags {
  const tags: Tags = {}
  for (const c of categories) {
    if (!c) continue
    if (DEPARTMENT_SET.has(c)) mergeTags(tags, { dept: [c] })
    else if (CATEGORY_TAGS[c]) mergeTags(tags, structuredClone(CATEGORY_TAGS[c]))
  }
  for (const [facet, matchers] of MATCHERS) {
    const hits = matchers.filter(([, re]) => re.test(text)).map(([term]) => term)
    if (hits.length) mergeTags(tags, { [facet]: hits })
  }
  return tags
}

function fromArticle(type: SearchType, a: Article): SearchItem {
  return {
    id: `${type}-${a.id}`,
    type,
    title: a.headline,
    summary: a.excerpt,
    href: a.href,
    ...readDate(a.date),
    authors: authorsOf(a.author),
    tags: tagsOf([a.category], `${a.headline} ${a.excerpt ?? ''}`),
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
  ...fromArticle('proceedings', a),
  tags: tagsOf(['American Sea Power Project'], `${a.headline} ${a.excerpt ?? ''}`),
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
      title: b.title,
      summary: `${b.format} · $${b.price.toFixed(2)} for members ($${b.originalPrice.toFixed(2)} list)`,
      href: b.href,
      authors: authorsOf(b.author),
      tags: tagsOf(b.subjects ?? [], b.title),
      image: b.image,
      imageAlt: `Cover of ${b.title}`,
      cover: true,
    }))
})()

const events: SearchItem[] = [
  ...upcomingEvents,
  ...pastEvents.map((e, i) => ({ ...e, id: `past-${i}` })),
].map((e) => ({
  id: `event-${e.id}`,
  type: 'events' as const,
  title: e.title,
  summary: e.summary,
  href: e.href,
  ...readDate(e.startsOn),
  authors: [],
  tags: mergeTags(
    e.kind === 'Event' ? {} : { eventType: [e.kind] },
    tagsOf([], `${e.title} ${e.summary ?? ''}`),
  ),
  place: e.location,
  image: e.image,
  imageAlt: e.imageAlt,
}))

const podcasts: SearchItem[] = episodes.map((ep, i) => ({
  id: `podcast-${i}`,
  type: 'podcasts' as const,
  title: ep.title,
  summary: ep.description,
  href: '/proceedings/podcast',
  ...readDate(ep.date),
  authors: [],
  tags: tagsOf([], `${ep.title} ${ep.description ?? ''}`),
  image: ep.navalHistory ? imgNavalHistoryPodcast : imgProceedingsPodcast,
  imageAlt: ep.navalHistory ? 'Naval History Podcast' : 'Proceedings Podcast',
}))

const contests: SearchItem[] = essayContests.map((c) => ({
  id: `contest-${c.slug}`,
  type: 'essay-contests' as const,
  title: `${c.year} ${c.title}${c.division ? ` — ${c.division}` : ''}`,
  summary: c.summary,
  href: c.href,
  sortDate: c.deadlineISO,
  date: `Deadline ${c.deadline}`,
  authors: [],
  tags: tagsOf([], `${c.title} ${c.summary ?? ''}`),
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
 * most, then bylines and tags, then the summary. A record's lower-cased text is
 * built once and kept: the archive puts tens of thousands through this on
 * every keystroke.
 */
const haystacks = new WeakMap<SearchItem, { title: string; people: string; body: string }>()

export function scoreItem(item: SearchItem, terms: string[]): number {
  if (terms.length === 0) return 1
  let hay = haystacks.get(item)
  if (!hay) {
    hay = {
      title: item.title.toLowerCase(),
      people: [...item.authors, ...Object.values(item.tags).flat(), item.place ?? ''].join(' ').toLowerCase(),
      body: (item.summary ?? '').toLowerCase(),
    }
    haystacks.set(item, hay)
  }
  const { title, people, body } = hay
  let score = 0
  for (const term of terms) {
    const hit = (title.includes(term) ? 6 : 0) + (people.includes(term) ? 3 : 0) + (body.includes(term) ? 1 : 0)
    if (hit === 0) return 0
    score += hit
  }
  return score
}
