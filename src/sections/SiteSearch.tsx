import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FacetedResults from '@/components/search/FacetedResults'
import PageHero from '@/sections/PageHero'
import { SEARCH_FACETS, searchIndex } from '@/data/siteSearch'

/**
 * Site search results — /search
 *
 * Laid out after the faceted listing the client pointed to: a large keyword
 * box under the page title, a facet column on the left, and the results in a
 * list or a grid (FacetedResults).
 *
 * Covers the site's current content: the latest magazine articles, USNI News,
 * books, events, podcasts and essay contests. The 150-year magazine archive
 * has its own search, Browse All Articles (/browse); a keyword that names one
 * of its subjects offers the way there.
 *
 * Content type used to be a row of pills under the box; it is the first facet
 * now, so a reader can pick books and events together. A new keyword keeps the
 * content type, as the pills did, and clears the other filters.
 */
export default function SiteSearch() {
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') ?? '').trim()

  // The box is the reader's until they submit; the URL is what was searched.
  const [draft, setDraft] = useState(query)
  const [lastQuery, setLastQuery] = useState(query)
  if (query !== lastQuery) {
    // Back/forward or the header flydown changed the URL under us.
    setLastQuery(query)
    setDraft(query)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const out = new URLSearchParams()
    if (draft.trim()) out.set('q', draft.trim())
    for (const t of params.getAll('type')) out.append('type', t)
    setParams(out)
  }

  return (
    <>
      {/* The site's light-blue interior header, carrying the search box as well
          as the title, so the query sits in one block and the results start on
          white below it. */}
      <PageHero
        title={query ? 'Search Results' : 'Search'}
        breadcrumb={
          <Breadcrumb
            trail={[{ label: 'Home', href: '/' }]}
            current="Search"
            className="pb-4 border-b border-[#C2DDFF]"
          />
        }
      >
        <div className="flex flex-col gap-4 pt-2">
          <form role="search" onSubmit={onSubmit} className="flex items-stretch border-2 border-navy-bolder bg-white">
            <label htmlFor="site-search-input" className="sr-only">
              Search the Naval Institute
            </label>
            <input
              id="site-search-input"
              type="search"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Search by keyword, title, or author…"
              className="flex-1 min-w-0 font-body text-lg lg:text-xl text-navy-bolder placeholder:text-neutral-subtle
                outline-none bg-transparent px-4 lg:px-5 py-3.5 lg:py-4"
            />
            <button
              type="submit"
              className="flex-shrink-0 flex items-center justify-center w-14 lg:w-16 bg-navy-bolder text-white hover:bg-navy-bright transition-colors"
            >
              <i className="fa-solid fa-magnifying-glass text-lg" aria-hidden="true" />
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
      </PageHero>

      <section className="bg-white pt-10 lg:pt-12 pb-16 lg:pb-24">
        <div className="container-site">
          <FacetedResults items={searchIndex} query={query} facets={SEARCH_FACETS} subjectOffer="browse" />
        </div>
      </section>
    </>
  )
}
