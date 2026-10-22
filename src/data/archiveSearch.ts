import { mergeTags, searchIndex, slugify, type SearchItem, type TagFacet } from './siteSearch'

/**
 * The magazine archive, for Browse All Articles (/browse): 34,686 Proceedings and Naval History
 * articles from 1874 on, tagged with the managed vocabulary the content
 * architecture plan proposes (74 topics, their subtopics, ships, regions,
 * conflicts, commands, organizations, people, service branches and
 * departments). Taken from the Browse prototype Phase2 built on the same data.
 *
 * It is too big for the page bundle, so it sits gzipped in
 * public/data/usni-archive.json.gz (about 865 KB) and is fetched the first time
 * Browse opens. The promise is kept, so every later visit reuses it.
 *
 * The records carry a title, issue month, contributors and tags — no summary,
 * image or page. Where one is also a current record (an article from the April
 * 2026 issue, say), its tags go onto that record and the archive copy is
 * dropped, so the article appears once, with its page and picture.
 */

const ARCHIVE_URL = '/data/usni-archive.json.gz'

/** The payload's shape: parallel arrays, with tags as indexes into `vocab`. */
interface ArchivePayload {
  vocab: Record<string, string[]>
  titles: string[]
  /** Year × 12 + month index. */
  ym: number[]
  /** Indexes into `authors`, per article. */
  auth: number[][]
  authors: string[]
  tags: Record<string, number[][]>
}

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** Payload facet → search facet. `pub` is the content type; `author` is the byline. */
const TAG_FACETS: [string, TagFacet][] = [
  ['topic', 'topic'],
  ['subtopic', 'subtopic'],
  ['ship', 'ship'],
  ['region', 'region'],
  ['conflict', 'conflict'],
  ['command', 'command'],
  ['org', 'org'],
  ['person', 'person'],
  ['branch', 'branch'],
  ['dept', 'dept'],
]

async function readPayload(res: Response): Promise<ArchivePayload> {
  const bytes = new Uint8Array(await res.arrayBuffer())
  // A server may already have undone the gzip (Content-Encoding); only
  // decompress what still starts with the gzip magic number.
  if (bytes[0] !== 0x1f || bytes[1] !== 0x8b) return JSON.parse(new TextDecoder().decode(bytes))
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'))
  return JSON.parse(await new Response(stream).text())
}

/**
 * Contributor names, with spellings that differ only in punctuation or spacing
 * ("W.T. Adams", "W. T. Adams") folded into the one used most — the plan's
 * "each contributor gets one profile". They would otherwise share a URL slug.
 */
function canonicalAuthors(d: ArchivePayload): string[] {
  const uses = new Array<number>(d.authors.length).fill(0)
  for (const list of d.auth) for (const a of list) uses[a]++
  const best = new Map<string, number>()
  d.authors.forEach((name, i) => {
    const key = slugify(name)
    const held = best.get(key)
    if (held === undefined || uses[i] > uses[held]) best.set(key, i)
  })
  return d.authors.map((name) => d.authors[best.get(slugify(name))!])
}

function toItems(d: ArchivePayload): SearchItem[] {
  const authors = canonicalAuthors(d)
  return d.titles.map((title, i) => {
    const year = Math.floor(d.ym[i] / 12)
    const month = d.ym[i] % 12
    const pub = d.vocab.pub[d.tags.pub[i][0]]
    const tags: SearchItem['tags'] = {}
    for (const [from, to] of TAG_FACETS) {
      const ids = d.tags[from][i]
      if (ids.length) tags[to] = ids.map((id) => d.vocab[from][id])
    }
    return {
      id: `archive-${i}`,
      type: pub === 'Naval History' ? 'naval-history' : 'proceedings',
      title,
      sortDate: `${year}-${String(month + 1).padStart(2, '0')}-01`,
      date: `${MONTHS[month]} ${year}`,
      authors: [...new Set(d.auth[i].map((a) => authors[a]))],
      tags,
      archive: true,
    }
  })
}

/**
 * The current magazine articles with archive tags merged in, then the rest of
 * the archive. A match needs the magazine, the title and the issue month: titles
 * alone repeat every month ("Comment & Discussion", "CEO Notes"). Each current
 * record takes at most one archive article.
 */
function combine(archive: SearchItem[]): SearchItem[] {
  const current = searchIndex
    .filter((item) => item.type === 'proceedings' || item.type === 'naval-history')
    .map((item) => ({ ...item, tags: structuredClone(item.tags) }))
  const key = (item: SearchItem) => `${item.type}|${item.title.toLowerCase()}|${item.sortDate?.slice(0, 7)}`
  const unmatched = new Map(current.filter((item) => item.sortDate).map((item) => [key(item), item]))
  const rest: SearchItem[] = []
  for (const item of archive) {
    const match = unmatched.get(key(item))
    if (match) {
      mergeTags(match.tags, item.tags)
      unmatched.delete(key(item))
    } else {
      rest.push(item)
    }
  }
  return [...current, ...rest]
}

let loading: Promise<SearchItem[]> | null = null

/** Every Proceedings and Naval History article: current and archive. Fetched once. */
export function loadArticleIndex(): Promise<SearchItem[]> {
  loading ??= fetch(ARCHIVE_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`Archive request failed: ${res.status}`)
      return readPayload(res)
    })
    .then((payload) => combine(toItems(payload)))
    .catch((err) => {
      // Let a later search try again rather than caching the failure.
      loading = null
      throw err
    })
  return loading
}
