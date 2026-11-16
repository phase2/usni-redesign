import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BooksSubNav from '@/sections/BooksSubNav'
import CollectionHero from '@/sections/CollectionHero'
import JumpLinkNav from '@/components/ui/JumpLinkNav'
import ReadingListSection from '@/sections/ReadingListSection'
import ReadingListsPressLibraries from '@/sections/ReadingListsPressLibraries'
import ReadingListsOther from '@/sections/ReadingListsOther'
import { serviceLists, readingListsNav } from '@/data/readingLists'

/**
 * Military Reading Lists.
 *
 * Nine stacked promo blocks on the live site, in no particular order, four of
 * them empty. Reordered here so the lists that carry Press titles come first,
 * with a jump nav over the top — the page is long by nature and a reader
 * arriving for one service's list should not have to scroll past six others.
 *
 * Several of the outbound CTAs on this page are broken or stale on the live
 * site; the client asked for those to be flagged rather than quietly fixed. See
 * `project-references/books-press-collections-link-audit.md`.
 */
export default function BooksReadingLists() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <BooksSubNav />

        <CollectionHero
          title="Military Reading Lists"
          breadcrumbLabel="Military Reading Lists"
          breadcrumbParent={{ label: 'Professional Military Education', href: '/press/professional-military-education' }}
          hero={{ variant: 'light' }}
        />

        <JumpLinkNav links={readingListsNav} />

        {serviceLists.map((list, i) => (
          <ReadingListSection
            key={list.id}
            list={list}
            background={i % 2 === 1 ? 'subtle' : 'white'}
          />
        ))}

        <ReadingListsPressLibraries />
        <ReadingListsOther />
      </main>
      <Footer />
    </div>
  )
}
