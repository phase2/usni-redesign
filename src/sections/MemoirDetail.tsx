import AdUnit from '@/components/ui/AdUnit'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import Eyebrow from '@/components/ui/Eyebrow'
import type { Memoir } from '@/data/memoirs'
import type { MemoirDetail as Detail } from '@/data/memoirDetails'

/**
 * One memoir — /archives/memoirs/<slug>.
 *
 * The live page is a title over two columns: Memoir Summary, a Read Memoir
 * button (a PDF), and the Author / Submitter / Individual's Full Name fields
 * on the left; on the right, a light-blue panel with the portrait, the name,
 * Service History & Demographics, Engagements, and Timeframe, and under it the
 * Do You Have a Story To Share? call to action. The redesign keeps that order
 * and wording, with the top-of-page ad slot below the breadcrumb as on the
 * oral history pages.
 */

function Facts({ rows }: { rows: [string, string | undefined][] }) {
  return (
    <dl className="flex flex-col">
      {rows
        .filter((r): r is [string, string] => !!r[1])
        .map(([term, value]) => (
          <div key={term} className="grid grid-cols-[150px_1fr] gap-4 py-3 border-b border-border-light last:border-b-0">
            <dt className="font-body font-semibold text-sm text-navy-bolder">{term}</dt>
            <dd className="font-body text-sm text-neutral-bold">{value}</dd>
          </div>
        ))}
    </dl>
  )
}

export default function MemoirDetail({ memoir, detail }: { memoir: Memoir; detail: Detail }) {
  return (
    <section className="bg-white pt-8 pb-16 lg:pt-10 lg:pb-24">
      <div className="container-site">
        <Breadcrumb
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Archives', href: '/archives' },
            { label: 'Memoirs', href: '/archives/memoirs' },
          ]}
          current={memoir.title}
          className="pb-4 border-b border-border-light"
        />

        <AdUnit size="leaderboard" className="mb-2" />

        <div className="flex flex-col gap-2 mb-8 lg:mb-10 max-w-[900px]">
          <Eyebrow>Memoir</Eyebrow>
          <h1 className="font-headline text-[36px] lg:text-[48px] text-navy-bolder leading-[1.1]">{memoir.title}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] gap-10 xl:gap-16 items-start">
          {/* Summary, the memoir itself, and who wrote it */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h2 className="font-headline text-[28px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b border-border-light">
                Memoir Summary
              </h2>
              <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] max-w-[760px]">
                {detail.summary}
              </p>
            </div>

            <ButtonLink
              href={detail.memoirPdf}
              variant="navy"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start"
            >
              <i className="fa-regular fa-file-pdf text-lg" aria-hidden="true" />
              Read Memoir
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </ButtonLink>

            <div className="max-w-[760px] pt-2">
              <Facts
                rows={[
                  ['Author', detail.author],
                  ['Submitter', detail.submitter],
                  ["Individual's Full Name", detail.fullName],
                ]}
              />
            </div>
          </div>

          {/* The individual */}
          <aside className="flex flex-col gap-6" aria-label="About the individual">
            <div className="bg-surface-subtle border border-light-blue p-6 lg:p-7 flex flex-col gap-5">
              {/* Circle mask with a tan ring, as on the staff listings (LeadershipRoster,
                  GivingMeetTheTeam). */}
              {detail.portrait && (
                <div className="w-[140px] h-[140px] lg:w-[168px] lg:h-[168px] rounded-full overflow-hidden border-[6px] border-tan bg-white flex-shrink-0">
                  <img src={detail.portrait} alt={detail.portraitAlt ?? ''} className="w-full h-full object-cover" />
                </div>
              )}
              <p className="font-headline text-[26px] text-navy-bolder leading-[1.15]">
                {detail.firstName} {detail.lastName}
              </p>

              <div className="flex flex-col gap-1">
                <h2 className="font-body font-bold text-base text-navy-bolder pb-2 border-b border-light-blue">
                  Service History &amp; Demographics
                </h2>
                <Facts
                  rows={[
                    ['Service', detail.service],
                    ['Rank', detail.rank],
                    ['Military Status', detail.status],
                    ['Engagements', memoir.engagement],
                    ['Timeframe', memoir.timeframe],
                  ]}
                />
              </div>
            </div>

            <div className="bg-tan-subtlest border-t-4 border-tan px-6 py-7 flex flex-col items-start gap-5">
              <h2 className="font-headline text-[24px] lg:text-[26px] text-navy-bolder leading-[1.15]">
                Do You Have a Story To Share?
              </h2>
              <ButtonLink href="/archives/memoirs/submit" variant="navy">Submit a Memoir</ButtonLink>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
