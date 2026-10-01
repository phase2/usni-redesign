import type { ReadingList } from '@/data/readingLists'
import CollectionTitleCard from '@/components/cards/CollectionTitleCard'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

const GRID =
  'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pt-7'

/**
 * One service reading list: whose it is, what it is for, and which Press titles
 * are on it.
 *
 * The Press's titles are the only part of someone else's reading list we can
 * usefully render as products, so they get one grid, and a solid navy button
 * under the description carries the reader to the full list on the service's own
 * site. The Commandant's list divides its picks into four categories on the
 * source site; those are named in the copy above the grid rather than split into
 * sub-sections, which on a list of six books left three near-empty rows.
 */
export default function ReadingListSection({
  list,
  background = 'white',
}: {
  list: ReadingList
  background?: 'white' | 'subtle'
}) {
  const count = list.titles.length

  return (
    <section
      id={list.id}
      className={`py-12 lg:py-16 scroll-mt-40 ${
        background === 'subtle' ? 'bg-surface-subtle' : 'bg-white'
      }`}
    >
      <div className="container-site">

        {/* Header */}
        <div className="pb-4 border-b-2 border-[#0466C8]">
          <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
            {list.service}
          </p>
          <h2 className="font-headline text-[26px] lg:text-[36px] text-navy-bolder leading-[1.15] mt-1.5">
            {list.name}
          </h2>
        </div>

        {/* About the list, with the outbound CTA directly beneath it. Sat in a
            bordered rail on the right until it turned out the rail's only job
            was to restate which service owns the list — which the section's own
            eyebrow already says. */}
        <div className="flex flex-col gap-4 max-w-[780px] mt-7">
          {list.intro.map((para, i) => (
            <p
              key={i}
              className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]"
            >
              {para}
            </p>
          ))}

          {list.attribution && (
            <div className="border-l-4 border-light-blue pl-4 mt-1">
              <p className="font-body font-bold text-sm text-navy-bolder">
                {list.attribution.name}
              </p>
              {list.attribution.title.map((line) => (
                <p key={line} className="font-body text-sm text-neutral-subtle">
                  {line}
                </p>
              ))}
            </div>
          )}

          {list.cta && (
            <div className="pt-2">
              <a
                href={list.cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
              >
                {list.cta.label}
                <ExternalLinkIcon size="1.1em" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          )}
        </div>

        {/* Press titles on the list */}
        {count > 0 && (
          <div className="mt-10 lg:mt-12">
            <div className={GRID}>
              {list.titles.map((title, i) => (
                <CollectionTitleCard
                  key={`${title.slug ?? title.title}-${i}`}
                  title={title}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
