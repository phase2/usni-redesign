import type { ReactNode } from 'react'

/**
 * Naval History submission guidelines, at /naval-history/submit.
 *
 * Follows the live page at /naval-history-magazine/submission-guidelines
 * section for section (an unheaded intro with the mailing address, then
 * Article Length, Payment, and Past Articles) in the same reading column and
 * type as ProceedingsSubmissionsContent, so the two magazines' guidelines read
 * as a pair. Both magazines take manuscripts through the same article
 * submission form.
 */

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-headline text-[30px] lg:text-[40px] text-navy-bolder leading-[1.15]">
      {children}
    </h2>
  )
}

function Body({ children }: { children: ReactNode }) {
  return (
    <p className="font-body text-base text-navy-bolder leading-[1.75]">{children}</p>
  )
}

export default function NavalHistorySubmissionsContent() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="max-w-[860px] mx-auto flex flex-col gap-12 lg:gap-14">

          {/* ── Intro ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <Body>
              <em>Naval History</em> manuscripts should be submitted via our online portal as a
              Microsoft Word document:{' '}
              <a href="/proceedings/submissions/article-form" className="text-link">
                Article Submission Form
              </a>
              . Illustrations and graphics should be embedded in the document or sent as separate
              attachments to{' '}
              <a href="mailto:articlequestions@usni.org" className="text-link">
                articlequestions@usni.org
              </a>
              . If submitting by U.S. mail, send manuscripts to:
            </Body>

            <address className="font-body text-base text-navy-bolder leading-[1.75] not-italic pl-4 lg:pl-6">
              Editor-in-Chief, <em>Naval History</em>
              <br />
              U.S. Naval Institute
              <br />
              291 Wood Road
              <br />
              Annapolis, MD 21402-5034
            </address>
          </div>

          {/* ── Article Length ────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <SectionTitle>Article Length</SectionTitle>
            <Body>
              To qualify as an article in <em>Naval History</em>, a manuscript must have fewer than
              3,000 words.
            </Body>
          </div>

          {/* ── Payment ───────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <SectionTitle>Payment</SectionTitle>
            <Body>
              The rate of payment varies from $60 to $150 per estimated published page (1,000 words).
              Book reviews ($75 per review) and pictorials ($250&ndash;$500) are commissioned and,
              although queries are welcome, unsolicited reviews are discouraged. The rate of payment
              for anecdotes is $25 each.
            </Body>
          </div>

          {/* ── Past Articles ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <SectionTitle>Past Articles</SectionTitle>
            <Body>
              Review past <em>Naval History</em> articles by browsing the{' '}
              <a href="/naval-history/aug-2026" className="text-link">current table of contents</a> or
              the <a href="/naval-history/all-issues" className="text-link">table of contents archive</a>,
              or by <a href="/search" className="text-link">searching our article archive</a>. Payment
              is upon publication.
            </Body>
          </div>

        </div>
      </div>
    </section>
  )
}
