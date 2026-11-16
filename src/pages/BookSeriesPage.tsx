import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import CollectionHero from '@/sections/CollectionHero'
import CollectionIntro from '@/sections/CollectionIntro'
import CollectionTitlesGrid from '@/sections/CollectionTitlesGrid'
import CollectionCrossLinks from '@/sections/CollectionCrossLinks'
import AdUnit from '@/components/ui/AdUnit'
import NotFound from '@/pages/NotFound'
import { seriesBySlug, purchasableTitles } from '@/data/bookCollections'

/**
 * The shared collection template: hero, custom introduction, grid of titles.
 *
 * Every Naval Institute Press series page is this page — nine routes in
 * `App.tsx` all render it with a different `slug`. Adding a tenth series, or a
 * one-off collection for a promotion, means adding an entry to
 * `src/data/bookCollections.ts` and a route; there is no per-series layout to
 * build or maintain.
 */
export default function BookSeriesPage({ slug }: { slug: string }) {
  const collection = seriesBySlug(slug)
  if (!collection) return <NotFound />

  const available = purchasableTitles(collection).length

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />

        <CollectionHero
          title={collection.name}
          deck={collection.editor ? `${collection.editor.name}, Series Editor` : undefined}
          description={collection.summary}
          breadcrumbLabel={collection.shortName}
          breadcrumbParent={{ label: 'Professional Military Education', href: '/press/professional-military-education' }}
          hero={collection.hero}
          mark={collection.mark}
        />

        <AdUnit />

        <CollectionIntro collection={collection} />

        <CollectionTitlesGrid
          titles={collection.titles}
          heading={collection.titlesHeading ?? 'Titles in the Series'}
          background="subtle"
          seeAll={
            available > 0
              ? { label: 'Browse the full catalog', href: '/press/books' }
              : undefined
          }
        />

        <CollectionCrossLinks currentSlug={collection.slug} />
      </main>
      <Footer />
    </div>
  )
}
