import CardCta from '@/components/ui/CardCta'
import { contestArchivePath, type EssayContest } from '@/data/essayContests'
import { pastEssayContests } from '@/data/essayContestsPast'

const MAX_CARDS = 8

/**
 * "Past Winners" on a past contest page: a card for each other edition of the
 * series that has announced winners, newest first, up to eight. Each card opens
 * that edition's page, where its Selected Submissions table lives.
 *
 * The live page lists every earlier edition's full winners table here (43 of
 * them on the 2025 Leadership page); the cards keep the list short and send
 * the reader to the edition itself, with the archive for the rest.
 */
export default function EssayContestPastEditions({ contest }: { contest: EssayContest }) {
  const editions = pastEssayContests
    .filter((c) => c.title === contest.title && c.slug !== contest.slug && c.winners?.length)
    .sort((a, b) => Number(b.year) - Number(a.year))
    .slice(0, MAX_CARDS)

  if (editions.length === 0) return null

  return (
    <section className="py-14 lg:py-16 bg-surface-subtle" aria-labelledby="past-winners-heading">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-4 border-b-2 border-[#0466C8] mb-8">
          <h2
            id="past-winners-heading"
            className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]"
          >
            Past Winners
          </h2>
          <CardCta href={contestArchivePath(contest)}>See all past winners</CardCta>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {editions.map((ed) => {
            const first = ed.winners![0]
            return (
              <li key={ed.slug}>
                <a
                  href={ed.href}
                  className="group flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-neutral-subtlest flex-shrink-0">
                    <img src={ed.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-3 p-6 lg:p-7 flex-1">
                    {/* No CardCta, so the headline carries the hover: the
                        shared card sweep (article-link--card), as on the
                        current-contest cards */}
                    <h3 className="font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]">
                      <span className="article-link article-link--card">
                        {ed.year} {ed.title}
                      </span>
                    </h3>
                    <p className="font-body text-sm text-neutral-subtle leading-relaxed">
                      <span className="font-semibold text-navy-bolder">{first.prize}:</span> {first.title}
                      <span className="block mt-0.5">{first.name}</span>
                    </p>
                  </div>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
