import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import type { EssayContestWinner } from '@/data/essayContests'

/**
 * A past edition's winners — the live page's "Selected Submissions" table:
 * prize, essay title (linked to the essay as published), and author. A table
 * from md up; below it each row stacks, prize first.
 */
export default function EssayContestSelectedSubmissions({ winners }: { winners: EssayContestWinner[] }) {
  return (
    <section className="pb-12 lg:pb-16 bg-white" aria-labelledby="selected-submissions-heading">
      <div className="container-site">
        <h2
          id="selected-submissions-heading"
          className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]"
        >
          Selected Submissions
        </h2>

        <table className="w-full text-left">
          <thead className="hidden md:table-header-group">
            <tr className="border-b border-border-light">
              {['Prize', 'Title', 'Name'].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="py-3 pr-6 font-body font-semibold text-xs uppercase tracking-[0.1em] text-neutral-subtle"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {winners.map((w) => (
              <tr key={w.title} className="block md:table-row border-b border-border-light py-4 md:py-0">
                <td className="block md:table-cell md:py-5 md:pr-6 md:w-[200px] align-top font-body font-semibold text-sm text-navy-subtle uppercase tracking-[0.05em] md:normal-case md:tracking-normal md:text-base md:text-navy-bolder">
                  {w.prize}
                </td>
                <td className="block md:table-cell md:py-5 md:pr-6 align-top mt-1 md:mt-0 font-headline text-xl text-navy-bolder leading-[1.3]">
                  {w.href ? (
                    <a href={w.href} target="_blank" rel="noopener noreferrer" className="text-link">
                      {w.title}
                      <ExternalLinkIcon size="0.65em" className="ml-1.5" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  ) : (
                    w.title
                  )}
                </td>
                <td className="block md:table-cell md:py-5 align-top mt-1 md:mt-0 md:w-[34%] font-body text-sm md:text-base text-neutral-subtle leading-snug">
                  {w.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
