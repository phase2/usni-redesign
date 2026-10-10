import type { ReactNode } from 'react'

/**
 * Proceedings submission guidelines.
 *
 * Follows the live page at /periodicals/proceedings-magazine/submission-guidelines
 * section for section: an unheaded intro, then "Submission Guidelines and
 * Categories" listing seven departments as name / word count / description, then
 * "Additional Information" as four paragraphs with a rule before the standing
 * disclaimer. One reading column throughout.
 *
 * What changes is the styling, not the structure: the redesign's type scale,
 * navy tokens, and link treatment in place of the Drupal theme's.
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

interface Category {
  name: string
  /** Parenthetical, exactly as the live page states it. */
  limit: string
  description: ReactNode
}

const categories: Category[] = [
  {
    name: 'Feature articles',
    limit: '(2,500-word maximum, not including endnotes)',
    description:
      'These pieces deal with major issues facing the Sea Services, are instructive, accessible, offer fresh ways of looking at military matters, or describe situations and circumstances of which military professionals should be aware.',
  },
  {
    name: 'Now Hear This/Nobody Asked Me, But . . .',
    limit: '(650-word maximum)',
    description:
      "Both these columns are commentaries that express a reader's view on an issue of consequence to the national security community, and often challenge conventional thinking.",
  },
  {
    name: 'Comment and Discussion',
    limit: '(500-word maximum)',
    description: (
      <>
        The equivalent of letters to the editor, &ldquo;Comment and Discussion&rdquo; items are
        commentaries on articles that have run in <em>Proceedings</em> previously. This department
        is where our independent forum gets a workout and, fittingly, it has its own email address,{' '}
        <a href="mailto:commentanddiscussion@usni.org" className="text-link">
          commentanddiscussion@usni.org
        </a>
        .
      </>
    ),
  },
  {
    name: 'Professional Notes',
    limit: '(1,000-word maximum, not including endnotes)',
    description:
      'This department—the oldest and among the most popular in the magazine—is the place for tips, advice, and instruction on shiphandling, small unit tactics, organization, training, or other more technical matters. Prof Notes attempt to identify and explain specific problems and, if possible, promote a solution.',
  },
  {
    name: 'Book Reviews',
    limit: '(650-word maximum)',
    description: (
      <>
        All book reviews are commissioned by the editorial staff. If you would like to review books
        for <em>Proceedings</em>, send a brief email to Book Review Editor, Jennifer Pompi, (
        <a href="mailto:jpompi@usni.org?subject=Book%20Reviews" className="text-link">
          jpompi@usni.org
        </a>
        ) describing your writing experience and the subjects you feel qualified to review.
      </>
    ),
  },
  {
    name: 'Leadership Forum',
    limit: '(1200-word maximum)',
    description: 'This is a monthly departmental column devoted to lessons in leadership.',
  },
  {
    name: 'From the Deckplates',
    limit: '(1000 words maximum)',
    description:
      'This is a column for enlisted professionals to highlight issues and problems affecting the Navy today, and offering solutions for implementation.',
  },
]

export default function ProceedingsSubmissionsContent() {
  return (
    <section className="bg-white py-12 lg:py-16">
      {/* The centred 860px reading column interior basic pages share, rather
          than the site container's full 1312px. */}
      <div className="container-site">
        <div className="max-w-[860px] mx-auto flex flex-col gap-12 lg:gap-14">

          {/* ── Intro ─────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5">
            <Body>
              <em>Proceedings</em> manuscripts should be submitted via our online portal as a
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
              Editor-in-Chief, <em>Proceedings</em>
              <br />
              U.S. Naval Institute
              <br />
              291 Wood Road
              <br />
              Annapolis, MD 21402-5034
            </address>
          </div>

          {/* ── Submission Guidelines and Categories ──────────────────── */}
          <div className="flex flex-col gap-8 lg:gap-10">
            <SectionTitle>Submission Guidelines and Categories</SectionTitle>

            <div className="flex flex-col gap-7">
              {categories.map(cat => (
                <div key={cat.name} className="flex flex-col gap-1">
                  <h3 className="font-headline text-[24px] text-navy-bolder leading-tight">
                    {cat.name}
                  </h3>
                  <p className="font-body font-bold text-[15px] text-navy-bolder leading-snug">
                    {cat.limit}
                  </p>
                  <div className="mt-1">
                    <Body>{cat.description}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Additional Information ────────────────────────────────── */}
          <div className="flex flex-col gap-8 lg:gap-10">
            <SectionTitle>Additional Information</SectionTitle>

            <div className="flex flex-col gap-5">
              <Body>
                Submissions are reviewed by the editorial staff of <em>Proceedings</em> and by the{' '}
                <a href="/about/leadership#editorial-board" className="text-link">
                  Editorial Board
                </a>
                , which meets once a month. This peer review process can take up to ten weeks,
                depending on when in the monthly review cycle an article is received. You can expect
                further communication from us in that time frame accepting or regretfully rejecting
                the submission.
              </Body>

              <Body>
                Of note, the editorial staff uses both a plagiarism and artificial intelligence
                checker in the initial review process. If it is determined a tool such as ChatGPT
                was used to write the essay, it will be rejected without further review. It is fine
                to use such a tool to format endnotes (Chicago Manual of Style please).
              </Body>

              <Body>
                The U.S. Naval Institute pays upon publication. Nonmembers published in{' '}
                <em>Proceedings</em> receive a complimentary one-year membership in the Naval
                Institute.
              </Body>

              <hr className="border-t border-border-light my-2" />

              <Body>
                The U.S. Naval Institute is a private, self-supporting, not-for-profit professional
                society that publishes Proceedings as part of the open forum it maintains for the
                Sea Services. The Naval Institute is not an agency of the U.S. government; the
                opinions expressed in these pages are the personal views of the authors.
              </Body>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
