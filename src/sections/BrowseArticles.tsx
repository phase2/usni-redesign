import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Breadcrumb from '@/components/ui/Breadcrumb'
import FacetedResults from '@/components/search/FacetedResults'
import SubjectSearchBar from '@/components/ui/SubjectSearchBar'
import PageHero from '@/sections/PageHero'
import { BROWSE_FACETS, searchIndex, type SearchItem } from '@/data/siteSearch'
import { loadArticleIndex } from '@/data/archiveSearch'

/**
 * Browse All Articles — /browse
 *
 * The content architecture plan's Browse, as a search of its own beside site
 * search: every Proceedings and Naval History article since 1874 — the 34,686
 * tagged archive articles and the current ones — filtered by publication,
 * issue and the plan's managed vocabulary (topic, ship, region, conflict,
 * command, organization, contributor and the finer cuts).
 *
 * Where the plan has a page per subject, this has a filtered view:
 * "everything USNI has published on mine warfare" is
 * /browse?topic=mine-warfare, and it narrows by magazine, decade, issue or
 * contributor like any other filter. The box suggests subjects as the reader
 * types (SubjectSearchBar), the Proceedings and Naval History heroes open it
 * scoped to their magazine, and site search sends a keyword that names a
 * subject here.
 *
 * Shares its results column with site search (FacetedResults); a keyword that
 * is itself a subject offers to swap for that subject's filter.
 */

/** The articles once the archive has loaded; the current ones alone if it cannot. */
function useArticleIndex() {
  const [state, setState] = useState<{ items: SearchItem[] | null; failed: boolean }>({
    items: null,
    failed: false,
  })
  useEffect(() => {
    let live = true
    loadArticleIndex()
      .then((items) => live && setState({ items, failed: false }))
      .catch(
        () =>
          live &&
          setState({
            items: searchIndex.filter((i) => i.type === 'proceedings' || i.type === 'naval-history'),
            failed: true,
          }),
      )
    return () => {
      live = false
    }
  }, [])
  return state
}

export default function BrowseArticles() {
  const [params] = useSearchParams()
  const query = (params.get('q') ?? '').trim()
  const publications = params.getAll('publication')
  const { items, failed } = useArticleIndex()

  return (
    <>
      <PageHero
        title="Browse All Articles"
        description="More than 150 years of Proceedings and Naval History in one place. Search by keyword, or start typing to jump to a topic, ship, region, conflict, command or organization."
        breadcrumb={
          <Breadcrumb
            trail={[{ label: 'Home', href: '/' }]}
            current="Browse All Articles"
            className="pb-4 border-b border-[#C2DDFF]"
          />
        }
      >
        <div className="flex flex-col gap-4 pt-2">
          {/* Keyed on the URL's keyword and scope so Back resets the field to
              what was searched. */}
          <SubjectSearchBar
            key={`${query}|${publications.join(',')}`}
            size="large"
            initialQuery={query}
            publications={publications}
          />
          {/* Browse covers the magazines only; a reader after a book to buy,
              an event or a podcast needs site search, with the keyword kept. */}
          <p className="font-body text-sm text-neutral-subtle">
            Looking for books, events, podcasts or other content?{' '}
            <Link to={query ? `/search?q=${encodeURIComponent(query)}` : '/search'} className="text-link">
              Search the full site
            </Link>
            .
          </p>
        </div>
      </PageHero>

      <section className="bg-white pt-10 lg:pt-12 pb-16 lg:pb-24">
        <div className="container-site">
          {failed && (
            <p className="mb-6 font-body text-sm text-neutral-subtle">
              The magazine archive could not be loaded, so these results cover current articles only.
            </p>
          )}
          {items ? (
            <FacetedResults items={items} query={query} facets={BROWSE_FACETS} subjectOffer="filter" />
          ) : (
            <p className="py-10 font-body text-base text-neutral-subtle" role="status">
              <i className="fa-solid fa-circle-notch fa-spin mr-2" aria-hidden="true" />
              Loading the archive…
            </p>
          )}
        </div>
      </section>
    </>
  )
}
