import {
  contestEntryStat,
  currentEdition,
  essayContests,
  essaySubmitPath,
  isPhotoEntry,
  type EssayContest,
  type EssayContestBlock,
} from '@/data/essayContests'

/**
 * Contest detail body — one column of prose with a single "Enter this contest"
 * sidebar.
 *
 * Simplified from an earlier pass that also carried a full-width fact strip and
 * a three-card division switcher: all three surfaces repeated the same deadline,
 * word limit, and prize figures. Those facts now live in exactly one place, and
 * sibling divisions are plain links in the sidebar rather than cards.
 */

function Heading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]
        border-t border-navy-subtle pt-5 scroll-mt-8"
    >
      {children}
    </h2>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return (
    <>
      {items.map((p, i) => (
        <p key={i} className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]">
          {p}
        </p>
      ))}
    </>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            className="mt-[9px] w-1.5 h-1.5 bg-[#0466c8] flex-shrink-0 rotate-45"
            aria-hidden="true"
          />
          <span className="font-body text-base text-neutral-subtle leading-[1.7]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Block({ block }: { block: EssayContestBlock }) {
  return (
    <div className="flex flex-col gap-4">
      <Heading>{block.heading}</Heading>
      {block.paragraphs?.length ? <Paragraphs items={block.paragraphs} /> : null}
      {block.bulletsLead && (
        <p className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]">
          {block.bulletsLead}
        </p>
      )}
      {block.bullets && <Bullets items={block.bullets} />}
      {block.closingParagraphs?.length ? <Paragraphs items={block.closingParagraphs} /> : null}
    </div>
  )
}

export default function EssayContestBody({ contest }: { contest: EssayContest }) {
  // Judging/selection/announcement describe what happens after you enter, so
  // they read better after the rules than before the prompt.
  const isAfterRules = (b: EssayContestBlock) =>
    /judging|selection process|announcement|^winners$/i.test(b.heading)
  const beforeRules = contest.blocks.filter((b) => !isAfterRules(b))
  const afterRules = contest.blocks.filter(isAfterRules)

  const siblings = essayContests.filter(
    (c) => c.title === contest.title && c.year === contest.year && c.slug !== contest.slug,
  )

  const entryStat = contestEntryStat(contest)
  const closed = contest.status === 'closed'
  const current = closed ? currentEdition(contest) : undefined

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        {/* The reading measure caps the grid column itself, and justify-between
            pushes the sidebar to the container edge — capping width inside a
            1fr column instead leaves a dead gap between the two. */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,720px)_minmax(0,360px)] lg:justify-between gap-10 lg:gap-14 items-start">

          {/* ── Body ── */}
          <div className="flex flex-col gap-9">

            {contest.intro && (
              <div className="flex flex-col gap-4">
                <Paragraphs items={contest.intro} />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Heading>{contest.challengeHeading ?? 'The Challenge'}</Heading>
              <Paragraphs items={contest.challenge.paragraphs} />
              {contest.challenge.bulletsLead && (
                <p className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]">
                  {contest.challenge.bulletsLead}
                </p>
              )}
              {contest.challenge.bullets && <Bullets items={contest.challenge.bullets} />}
            </div>

            {beforeRules.map((block) => (
              <Block key={block.heading} block={block} />
            ))}

            {/* A past edition may say who could enter in its challenge instead */}
            {contest.eligibility.length > 0 && (
              <div className="flex flex-col gap-4">
                <Heading id="eligibility">Eligibility</Heading>
                <Bullets items={contest.eligibility} />
              </div>
            )}

            {contest.submissionGuidelines.length > 0 && (
              <div className="flex flex-col gap-4">
                <Heading id="submission-guidelines">Submission Guidelines</Heading>
                <Bullets items={contest.submissionGuidelines} />
              </div>
            )}

            <div className="flex flex-col gap-4">
              <Heading id="prizes">Prizes</Heading>
              {/* A plain list — three oversized prize cards drew more attention
                  than the figures warranted */}
              <dl className="flex flex-col divide-y divide-border-light border-y border-border-light">
                {contest.prizes.map((prize) => (
                  <div key={prize.place} className="flex justify-between gap-4 py-3">
                    <dt className="font-body text-base text-neutral-subtle">{prize.place}</dt>
                    <dd className="font-headline text-xl text-navy-bolder leading-none">
                      {prize.amount}
                    </dd>
                  </div>
                ))}
              </dl>
              {contest.prizeExtras && (
                <>
                  <p className="font-body font-semibold text-base text-navy-bolder mt-1">
                    Winners also receive:
                  </p>
                  <Bullets items={contest.prizeExtras} />
                </>
              )}
            </div>

            {afterRules.map((block) => (
              <Block key={block.heading} block={block} />
            ))}

            {contest.contacts && contest.contacts.length > 0 && (
              <div className="flex flex-col gap-4">
                <Heading>Questions</Heading>
                <dl className="flex flex-col gap-2.5">
                  {contest.contacts.map((c) => (
                    <div key={c.label} className="flex flex-col sm:flex-row sm:gap-2">
                      <dt className="font-body font-semibold text-base text-navy-bolder sm:min-w-[180px]">
                        {c.label}
                      </dt>
                      <dd className="font-body text-base text-neutral-subtle break-words">
                        {c.href ? (
                          <a href={c.href} className="text-link">
                            {c.value}
                          </a>
                        ) : (
                          c.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* ── Sidebar: the single place the entry facts appear ── */}
          <aside className="w-full lg:sticky lg:top-8 flex flex-col gap-5">
            <div className="bg-white border border-navy-subtle p-6 flex flex-col gap-5">
              <h2 className="font-headline text-xl text-navy-bolder">
                {closed ? 'This contest has closed' : 'Enter this contest'}
              </h2>

              <dl className="flex flex-col gap-3">
                <div className="flex justify-between gap-3 pb-3 border-b border-border-light">
                  <dt className="font-body font-semibold text-sm text-navy-bolder">
                    {closed ? 'Closed' : 'Deadline'}
                  </dt>
                  <dd className="font-body text-sm text-neutral-subtle text-right">
                    <time dateTime={contest.deadlineISO}>{contest.deadline}</time>
                  </dd>
                </div>
                <div className="flex justify-between gap-3 pb-3 border-b border-border-light">
                  <dt className="font-body font-semibold text-sm text-navy-bolder">
                    {entryStat.label}
                  </dt>
                  <dd className="font-body text-sm text-neutral-subtle text-right">
                    {entryStat.value}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="font-body font-semibold text-sm text-navy-bolder">First prize</dt>
                  <dd className="font-body font-bold text-sm text-navy-bolder text-right">
                    {contest.prizes[0].amount}
                  </dd>
                </div>
              </dl>

              {closed ? (
                current && (
                  <a
                    href={current.href}
                    className="flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-base px-5 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
                  >
                    Enter the {current.year} contest
                  </a>
                )
              ) : (
                <>
                  <a
                    href={essaySubmitPath(contest)}
                    className="flex items-center justify-center gap-2 bg-gold text-navy-bolder font-body font-bold text-base px-5 py-3.5 border border-gold hover:bg-gold-dark transition-colors"
                  >
                    <i
                      className={`fa-solid ${isPhotoEntry(contest) ? 'fa-camera' : 'fa-pen-nib'}`}
                      aria-hidden="true"
                    />
                    {contest.submitLabel ?? 'Submit Your Essay'}
                  </a>

                  <p className="font-body text-sm text-neutral-subtle leading-relaxed">
                    {isPhotoEntry(contest)
                      ? 'High-resolution tiff or jpg, no AI or manipulation. See '
                      : 'Word document, judged in the blind. See '}
                    <a href="#submission-guidelines" className="text-link">
                      submission guidelines
                    </a>
                    .
                  </p>
                </>
              )}
            </div>

            {/* Sibling divisions as plain links */}
            {siblings.length > 0 && (
              <div className="border border-navy-subtle p-6 flex flex-col gap-3">
                <p className="font-body font-semibold text-sm text-navy-bolder">
                  Other divisions of this contest
                </p>
                <ul className="flex flex-col gap-2">
                  {siblings.map((s) => (
                    <li key={s.slug}>
                      <a
                        href={s.href}
                        className="link-underline-always font-body font-bold text-base text-[#0466c8] hover:text-navy-bolder transition-colors"
                      >
                        {s.division}
                      </a>
                      <span className="font-body text-sm text-neutral-subtle">
                        {' '}— {contestEntryStat(s).value}, {s.prizes[0].amount}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {contest.fundedBy && contest.fundedBy.length > 0 && (
              <div className="border border-navy-subtle p-6 flex flex-col gap-1.5">
                <p className="font-body font-semibold text-xs uppercase tracking-[0.1em] text-neutral-subtle">
                  {contest.fundedByLabel ?? 'Funded by'}
                </p>
                {contest.fundedBy.map((funder) => (
                  <p key={funder} className="font-body text-base text-navy-bolder leading-snug">
                    {funder}
                  </p>
                ))}
              </div>
            )}
          </aside>

        </div>
      </div>
    </section>
  )
}
