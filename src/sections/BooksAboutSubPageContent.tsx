import type { ReactNode } from 'react'

/**
 * Body copy for the three basic pages under About the Press — Examination
 * Requests, Writing for the Naval Institute Press, and Artificial Intelligence
 * at Naval Institute Press.
 *
 * Transcribed from the live /press/examination-requests, /press/writing, and
 * /press/a-i pages, wording and all (the live typos — "envelop", "editor’s",
 * "subject-a" — are left for USNI to correct at source). Live headings are a mix
 * of bold <h3>s and bold paragraphs doing a heading's job; both render here as
 * the same subheading. The AI page's opening <h3> repeats the page title, which
 * the hero already carries, so it is dropped; its first paragraph moved up into
 * the hero as the lede (see BooksAboutSubPage).
 */

export type BooksAboutSubPageSlug = 'examination-requests' | 'writing' | 'ai'

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-headline text-[26px] lg:text-[30px] text-navy-bolder leading-[1.15] mt-4 first:mt-0">
      {children}
    </h2>
  )
}

function List({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-6 flex flex-col gap-2">{children}</ul>
}

function ExaminationRequests() {
  return (
    <>
      <Heading>Examination &amp; Desk Copy Policy</Heading>
      <p>
        The Naval Institute Press features a wide range of history, foreign affairs
        and policy, national security, and leadership titles that have been adopted
        for course work by colleges and universities across the country. Professors
        and/or instructors interested in Naval Institute Press books for course
        adoptions should request examination copies by using one of the two methods
        below, mail or fax.
      </p>
      <p>
        Please <strong>email request</strong> on your{' '}
        <strong>department letterhead</strong>, specifying{' '}
        <strong>course name and number, date offered, projected enrollment</strong>, as
        well as <strong>your name, title, department address and phone/fax number.</strong>
      </p>
      <p>
        <strong>Send request to:</strong>{' '}
        <a href="mailto:cnoble@usni.org" className="text-link">
          cnoble@usni.org
        </a>
      </p>
      <p>
        <strong>
          If the text is adopted for course use, examination copies become the
          instructor's free desk copy.
        </strong>
      </p>
      <p>
        Qualified instructors in the United States and Canada are entitled to desk
        copies of adopted titles based on the total enrollment for the class.
      </p>
      <List>
        <li>Enrollment 1–30 = One (1) desk copy</li>
        <li>Enrollment 31–50 = Two (2) desk copies</li>
        <li>Enrollment 51+ = Three (3) desk copies</li>
      </List>
    </>
  )
}

function Writing() {
  return (
    <>
      <p>
        If you would like to publish a book with the Naval Institute Press, please
        submit either a proposal and/or completed manuscript. Manuscripts and
        proposals should be formatted in 12-point, Times New Roman font. Manuscripts
        and sample chapters should also have numbered pages, be single-sided and
        double spaced, and any submission should include a cover letter and complete
        contact information (an address, a phone number, and an email address).
      </p>

      <Heading>Completed Manuscript</Heading>
      <p>
        When submitting a completed manuscript, cover letters should include a word
        count, relevant biographical information, an estimated number of images, and
        a short summary or explanation of your work.
      </p>

      <Heading>Proposal</Heading>
      <p>
        In addition to a cover letter and your contact information, all proposals
        should include:
      </p>
      <List>
        <li>a narrative description (tell us what you intend to write)</li>
        <li>an outline (show us the anticipated structure of your work)</li>
        <li>
          anticipated word count (keep in mind that too long gets too expensive, but
          too short is not likely to adequately cover your subject-a good target for
          an average length book is about 100,000 words)
        </li>
        <li>
          your history of publication (articles, books you have had published, if
          any) and any relevant credentials (degrees, positions held, etc.)
        </li>
        <li>the potential market (who will buy this book)</li>
        <li>
          a discussion of the competition (describe what has been done before on the
          subject and include some commentary as to how yours will be different or
          how it will complement those existing works)
        </li>
        <li>
          time frame (how long do you think it will take you to write this proposed
          book)
        </li>
        <li>
          sample chapters (not required, but if any are completed these are helpful
          to the editors evaluating your proposal)
        </li>
      </List>

      <Heading>Digital</Heading>
      <p>
        To submit your work digitally, please send your cover letter in the body of
        an email to{' '}
        <a href="mailto:PressSubmissions@usni.org" className="text-link">
          PressSubmissions@usni.org
        </a>
        . Please ensure all text files are compatible with Microsoft word.
      </p>

      <Heading>Physical</Heading>
      <p>
        When submitting your work physically, please ensure your submission is
        printed, single sided, on 8 ½” x 11” paper. Include all the requested
        documentation. Because it is cost-prohibitive to return each unsolicited
        submission, editor’s will not return any work without a self-addressed
        prepaid envelop. Do not include anything with your submission you wish to
        have returned. This includes flash drives and original copies of documents
        or photos. All mail should be sent to:
      </p>
      <p>
        Naval Institute Press
        <br />
        Acquisitions Editor
        <br />
        291 Wood Road
        <br />
        Annapolis, MD 21402
      </p>
      <p>
        A member of our acquisitions team will review the project and get back to
        you in a timely manner. Please be aware that, due to the large number of book
        proposals and manuscripts we receive each day, it is not uncommon for the
        evaluation process to take several months.
      </p>

      <p className="font-bold text-navy-bolder">
        Please note that at this time we are not accepting any un-agented fiction. We
        also do not accept works that have been previously self-published and are
        available for sale.
      </p>
    </>
  )
}

function ArtificialIntelligence() {
  return (
    <>
      <Heading>Our approach is guided by a simple principle:</Heading>
      <p>
        AI is a tool to enhance our work—not a substitute for authorship, editorial
        judgment, or subject-matter expertise.
      </p>
      <p>
        We are committed to protecting the integrity of our publications and the
        rights of the authors we work with.
      </p>

      <Heading>How We Use AI</Heading>
      <List>
        <li>To create enhanced metadata to improve the discoverability of our books.</li>
        <li>For marketing materials and market research</li>
        <li>
          Operational workflows, including contract processing, rights tracking, and
          scheduling
        </li>
        <li>
          Audiobook production (AI-assisted tools supporting production workflows; any
          use of AI narration is subject to separate disclosure)
        </li>
        <li>
          Cover design exploration (used on a limited, case-by-case basis and subject
          to editorial review; not applied as a final design without human approval)
        </li>
      </List>

      <Heading>We Will Not Use AI</Heading>
      <List>
        <li>To replace authorship or generate original works for publication</li>
        <li>
          To make acquisitions, editorial, or production decisions (excluding basic
          spellcheck and grammar-checking functions).
        </li>
        <li>
          As a substitute for subject-matter expertise, peer review, or editorial
          judgment
        </li>
      </List>

      <Heading>Protecting Author Content</Heading>
      <List>
        <li>
          All use of AI tools occurs within secure, controlled environments-such as
          enterprise-licensed platforms with contractual data protections-that do not
          expose content to public-facing AI systems.
        </li>
        <li>
          Manuscripts and unpublished materials are not entered into systems that
          retain or learn from inputs
        </li>
        <li>No Naval Institute Press content is used to train AI models at any stage</li>
      </List>

      <Heading>Our Commitment</Heading>
      <p>
        We apply consistent standards across the organization to ensure that AI is
        used responsibly, ethically, and in ways that support the quality, integrity,
        and authority of our publications.
      </p>

      <Heading>Authors</Heading>
      <List>
        <li>
          Authors are fully responsible for the accuracy, originality, and sourcing of
          their work.
        </li>
        <li>
          Artificial intelligence tools do not qualify as authors and may not be
          credited as such. If generative AI is used in any substantive way—such as
          drafting or structuring text, generating content, or producing images—authors
          must disclose this to their editor. Authors uncertain about what requires
          disclosure should consult their editor.
        </li>
        <li>
          Authors should not upload manuscripts, drafts, or unpublished material into
          AI systems that retain or learn from user inputs.
        </li>
      </List>

      <Heading>Peer Reviewers</Heading>
      <List>
        <li>
          Peer reviewers are expected to provide their own independent evaluation and
          judgment.
        </li>
        <li>
          AI tools may be used in a limited way to support fact-checking or identify
          additional sources, but reviewers must write their own reports and feedback.
        </li>
        <li>
          Manuscripts, proposals, or any unpublished materials must not be entered into
          AI systems that retain or learn from inputs.
        </li>
      </List>

      <p className="text-sm text-neutral-subtle">Last Updated: April 2026</p>
    </>
  )
}

const CONTENT: Record<BooksAboutSubPageSlug, () => ReactNode> = {
  'examination-requests': ExaminationRequests,
  writing: Writing,
  ai: ArtificialIntelligence,
}

export default function BooksAboutSubPageContent({ slug }: { slug: BooksAboutSubPageSlug }) {
  const Body = CONTENT[slug]
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="max-w-[860px] mx-auto flex flex-col gap-5 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
          <Body />
        </div>
      </div>
    </section>
  )
}
