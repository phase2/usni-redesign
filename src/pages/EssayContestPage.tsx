import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import EssayContestsSubNav from '@/sections/EssayContestsSubNav'
import EssayContestsHero from '@/sections/EssayContestsHero'
import EssayContestBody from '@/sections/EssayContestBody'
import EssayContestPreviousWinners from '@/sections/EssayContestPreviousWinners'
import EssayContestSelectedSubmissions from '@/sections/EssayContestSelectedSubmissions'
import EssayContestPastEditions from '@/sections/EssayContestPastEditions'
import { ButtonLink } from '@/components/ui/Button'
import { getContest, contestFullTitle, essaySubmitPath } from '@/data/essayContests'

/**
 * Shared template for every contest detail page — the routes in App.tsx pass the
 * slug, so all five contests stay one layout instead of five near-identical files.
 *
 * A closed edition (see `pastEssayContests`) uses the same layout, as the live
 * past-contest pages do: the hero drops its submit button and carries the
 * edition's support credit, the sidebar reports the contest closed, its own
 * winners follow as a table, and cards lead to the series' other editions in
 * place of the archive callout.
 */
export default function EssayContestPage({ slug }: { slug: string }) {
  const contest = getContest(slug)
  const closed = contest.status === 'closed'
  const fundingLine = contest.fundedBy?.length
    ? `${contest.fundedByLabel ?? 'Funded by'} ${contest.fundedBy.join(' and ')}`
    : undefined

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <EssayContestsSubNav />
        {/* Contests with banner art get the large split photo hero; the rest
            fall back to the light-blue interior header. */}
        <EssayContestsHero
          title={`${contest.year} ${contest.title}`}
          // The live past pages subtitle the hero with the support credit
          deck={closed ? fundingLine : contest.division}
          description={closed ? undefined : contest.summary}
          breadcrumbLabel={contestFullTitle(contest)}
          image={contest.heroImage}
          panelSide={contest.heroPanelSide}
          actions={
            contest.heroImage && !closed ? (
              <ButtonLink href={essaySubmitPath(contest)} variant="primary" size="md">
                {contest.submitLabel ?? 'Submit Your Essay'}
              </ButtonLink>
            ) : undefined
          }
        />
        <EssayContestBody contest={contest} />
        {closed ? (
          <>
            {contest.winners?.length ? <EssayContestSelectedSubmissions winners={contest.winners} /> : null}
            <EssayContestPastEditions contest={contest} />
          </>
        ) : (
          <EssayContestPreviousWinners contest={contest} />
        )}
      </main>
      <Footer />
    </div>
  )
}
