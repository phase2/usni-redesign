import { bookSeries, seriesHref } from '@/data/bookCollections'
import CollectionTeaserCard from '@/components/cards/CollectionTeaserCard'

/**
 * "More series from the Press" row at the foot of a collection page.
 *
 * The client's read on these pages is that their value is findability: someone
 * arrives from a search for one series name and, today, hits a dead end. This
 * row turns each page into an entry point to the rest of the imprint's series,
 * which is the whole reason the set is worth keeping as a group.
 */
export default function CollectionCrossLinks({
  currentSlug,
  limit = 3,
}: {
  /** Series to leave out — the one being read. */
  currentSlug?: string
  limit?: number
}) {
  const others = bookSeries.filter((s) => s.slug !== currentSlug).slice(0, limit)

  /*
   * Navy rather than the light blue this used to be: the bibliography directly
   * above it is already `surface-subtle`, so two tinted bands were stacking
   * with nothing to separate them. On the dark ground the header rule goes
   * gold, which is the site's accent on navy — the footer divider and the
   * active jump-nav underline both use it.
   */
  return (
    <section className="bg-navy-boldest py-12 lg:py-16">
      <div className="container-site">
        <div className="pb-4 border-b-2 border-gold flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
          <h2 className="font-headline text-[26px] lg:text-[32px] text-white leading-[1.15]">
            More series from the Press
          </h2>
          <a
            href="/press/professional-military-education"
            className="group font-body font-semibold text-sm text-light-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 flex-shrink-0 pb-0.5"
          >
            <span className="relative">
              See all series and reading lists
              <span className="absolute bottom-0 left-0 h-px w-full bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
            </span>
            <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {others.map((collection) => (
            <CollectionTeaserCard
              key={collection.slug}
              collection={collection}
              href={seriesHref(collection.slug)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
