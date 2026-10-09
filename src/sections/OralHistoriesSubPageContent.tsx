import { useState, type ReactNode } from 'react'
import imgZumwalt from '@/assets/images/oral-history-program-zumwalt-bauernschmidt.jpg'

/**
 * Body copy for the two pages linked from the Oral Histories hero — About the
 * Oral History Program and Order Oral Histories.
 *
 * Transcribed from the live /press/oral-histories/about and
 * /press/oral-histories/place-order pages (test-usni3.pantheonsite.io,
 * captured 9 October 2026), wording and all, since these pages are migrated
 * 1:1. The About hero's second paragraph opens the body here, so the hero
 * keeps one. Links to individual oral histories point at
 * /archives/oral-histories/<slug>, where the listing's cards point; the live
 * /node/246 is John Reagan's. The foundation link goes to /giving.
 *
 * NOTE for USNI — worth fixing at source:
 * - About: the photo caption spells Bauernschmidt "Bauernscmidt"; the
 *   "Golden Thirteen" sentence links each word to a different member's oral
 *   history, which reads as a run of separate links; the contact email shows
 *   ehegranes@usni.org but mails jjorgensen@usni.org, and the FAQ's shows
 *   ehegranes@usni.org but mails emills@usni.org. Here both mail the address
 *   they show.
 * - Order: the ehegranes@usni.org link has no mailto: (it resolves as a
 *   relative path). Here it mails the address.
 */

export type OralHistoriesSubPageSlug = 'about' | 'place-order'

const oh = (slug: string) => `/archives/oral-histories/${slug}`

function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-headline text-[26px] lg:text-[30px] text-navy-bolder leading-[1.15] mt-4 first:mt-0">
      {children}
    </h2>
  )
}

function A({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="text-link">
      {children}
    </a>
  )
}

/* ── About ─────────────────────────────────────────────────────────────── */

function About() {
  return (
    <>
      <figure className="lg:float-right lg:w-[400px] lg:ml-10 lg:mb-4 flex flex-col gap-2">
        <img
          src={imgZumwalt}
          alt="Admiral Elmo R. Zumwalt, in uniform, handing a bound oral history to Rear Admiral George W. Bauernschmidt"
          className="w-full h-auto"
        />
        <figcaption className="font-body text-sm text-neutral-subtle leading-snug">
          Admiral Elmo R. Zumwalt, U.S. Navy (left) presenting Rear Admiral George W. Bauernscmidt, Supply Corps,
          U.S. Navy (Retired) his oral history.
          <br />
          (U.S. Naval Institute Photo Archive)
        </figcaption>
      </figure>

      <p>
        The U.S. Naval Institute’s award-winning Oral History Program, among the oldest in the country, was launched
        in March 1969 by Dr. John T. Mason (1909–1998), a former U.S. Navy officer who had conducted interviews on the
        naval history of World War II for the renowned Columbia University Center for Oral History. Mason served as
        the Program’s first director until 1982, when he was succeeded by author and historian Paul Stillwell, who
        also had served as an officer in the U.S. Navy. Mason and his successor established a program renowned for
        the meticulous preparation, skillful interviewing techniques, and painstaking editing of its interviews.
      </p>
      <p>
        They obtained, preserved, and disseminated a permanent record of the reminiscences of hundreds of significant
        leaders in 20th-century U.S. naval history, including staff officers and family of great commanders, such as
        those who served with <A href={oh('nimitz-chester')}>Fleet Admiral Chester W. Nimitz</A>, to influential
        postwar CNOs, such as <A href={oh('burke-arleigh')}>Admiral Arleigh A. Burke</A> and{' '}
        <A href={oh('zumwalt-elmo-russell-jr-adm-usn-ret-staff-officers')}>Admiral Elmo R. Zumwalt</A>, to
        influential but less familiar figures whose important contributions to the U.S. Navy’s success in World War
        II and the Cold War might have gone unnoticed otherwise. Groundbreaking individuals such as “
        <A href={oh('white-william')}>the</A> <A href={oh('arbor-jesse')}>Golden</A>{' '}
        <A href={oh('barnes-samuel')}>Thirteen</A>”—the <A href={oh('sublett-frank')}>U.S. Navy’s</A>{' '}
        <A href={oh('cooper-george')}>first</A> <A href={oh('hair-james')}>African</A>-
        <A href={oh('martin-graham')}>American</A> <A href={oh('reagan-john')}>officers</A>—and several of the{' '}
        <A href={oh('class-1980')}>first female U.S. Naval Academy midshipmen</A> also can be found in the
        Institute’s Oral History archives. Other pioneers whose memories are preserved here for future generations
        include <A href={oh('waves')}>Mildred McAfee</A>, first director of the WAVES, and{' '}
        <A href={oh('brashear-carl')}>Carl Brashear</A>, first African-American U.S. Navy Master Diver. These
        interviews are featured regularly in prominent works of military history, both scholarly and popular.
      </p>
      <p>
        In 2015, the Program started a new chapter in its history. Under the leadership of Vice Admiral Peter H.
        Daly, CEO of the Institute, and charged with maintaining Mason and Stillwell’s high standards, experienced
        historians deployed nationwide to conduct interviews of noteworthy leaders from contemporary history. New
        interview subjects include <A href={oh('arthur-stanley')}>Admiral Stanley R. Arthur, USN (Ret.)</A>; retired
        CNOs Vernon E. Clark, Jay Johnson, and Michael G. Mullen (who also served as Chairman of the Joint Chiefs of
        Staff); Admiral James G. Stavridis, USN (Ret.) (among other posts, recently NATO Supreme Allied Commander);
        and Admiral Thomas H. Collins, USCG (Ret.), Commandant of the U.S. Coast Guard. Additionally, in 2016,
        Stillwell completed the interview of CNO <A href={oh('trost-carlisle')}>Carlisle A. H. Trost, USN (Ret.)</A>
        . Other interviews are planned and under way.
      </p>
      <p>
        The Program also possesses some 40 valuable, previously unprocessed interviews conducted by Mason, Stillwell,
        and others from 1969 through 2004, a select number of which will be made available in nearly their original
        form as part of a “Legacy Series.” These and most interviews will be made available in multiple formats.
      </p>
      <p>
        The nonprofit Naval Institute’s Oral History Program depends on contributed funds and gratefully accepts
        tax-deductible gifts of all sizes for this purpose. This support allows the Institute to preserve the life
        experiences of today’s service men and women so they may enlighten and inspire future generations. For
        information about opportunities to support the Oral History Program, please contact the Naval Institute
        Foundation by email at <A href="mailto:foundation@usni.org">foundation@usni.org</A>, by phone at (410)
        295-1054 or by writing at 291 Wood Road, Annapolis, Maryland&nbsp;21402.
      </p>
      <p>
        The Naval Institute wishes to acknowledge the many donors who make this program possible, in particular, the
        generous support of the Pritzker Military Foundation of Chicago, Illinois, the late Jack C. Taylor, and Andrew
        Taylor of St. Louis, Missouri, and Capt. Roger E. Ekman, USN (Ret.) of Edina, Minnesota.
      </p>
      <p>For further information about oral history at the U.S. Naval Institute, please contact:</p>
      <p>
        Email: <A href="mailto:ehegranes@usni.org">ehegranes@usni.org</A>
        <br />
        Telephone: 410-295-1022
      </p>
    </>
  )
}

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: 'May I cite from the oral histories?',
    a: (
      <p>
        If you borrow or purchase an oral history, the rights for citing, etc. are noted in the front of the volume.
        Although most oral histories are classified open, some interviewees or their families request that you
        contact them for prior permission before citing.
      </p>
    ),
  },
  {
    q: 'How do I order an oral history volume?',
    a: (
      <>
        <p>
          Bound copies of Oral Histories are available direct from Amazon. Refer to the{' '}
          <A href="/archives/oral-histories">Oral History's page</A> to navigate to the purchase options on Amazon.
        </p>
        <p>
          Questions? <A href="mailto:ehegranes@usni.org?subject=Oral%20History%20Volume%20Order">ehegranes@usni.org</A>{' '}
          or <A href="mailto:research@usni.org?subject=Oral%20History%20Volume%20Order">research@usni.org</A>.
        </p>
        <p>
          <A href="/archives/oral-histories/place-order">Learn more about ordering oral histories.</A>
        </p>
      </>
    ),
  },
]

/** The accordion treatment BooksAboutFAQ, ArchivesFAQ, and DonateFAQ use. */
function FAQItem({ q, a }: { q: string; a: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-border-light last:border-b-0 transition-colors ${open ? 'bg-white' : ''}`}>
      <button
        className="accordion-row flex items-center justify-between w-full py-4 px-4 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-base text-navy-bolder">{q}</span>
        <span
          className={`accordion-chevron flex-shrink-0 w-8 h-8 bg-navy-bolder text-white flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pt-4 pb-5 pl-4 pr-16 flex flex-col gap-4 font-body text-base text-neutral-subtle leading-relaxed">
          {a}
        </div>
      )}
    </div>
  )
}

function AboutFAQ() {
  return (
    <section id="faq" className="py-16 lg:py-20 bg-surface-subtle">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[416px_1fr] gap-12 lg:gap-16">
          <div>
            <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1] mb-6">
              Frequently Asked Questions
            </h2>
            <a
              href="/faq"
              className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 hover:bg-navy-bright transition-colors"
            >
              View All Frequently Asked Questions
            </a>
          </div>
          <div className="border-t border-border-light">
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Order ─────────────────────────────────────────────────────────────── */

function PlaceOrder() {
  return (
    <>
      <Heading>Bound Individual Oral Histories are now available through Amazon via a purchase link on each Oral History's page.</Heading>
      <p>The following items are still available for sale direct from the U.S. Naval Institute:</p>
      <ul className="list-disc pl-6 flex flex-col gap-2">
        <li>Individual pages: $2.00 per page</li>
        <li>Oral History program cumulative index by subject (USB Flash Drive, .pdf file only): $65.00</li>
      </ul>
      <hr className="border-border-light my-2" />
      <Heading>To order the Index or individual pages, please contact:</Heading>
      <p>
        <strong className="font-semibold text-navy-bolder">Emily Hegranes</strong>
      </p>
      <p>
        Email: <A href="mailto:ehegranes@usni.org">ehegranes@usni.org</A>
      </p>
      <p>Telephone: 410-295-1022</p>
      <p>
        U.S. Naval Institute oral histories are funded by gift income. Tax-deductible contributions to underwrite a
        specific history or for general program support are gratefully accepted. Gifts by credit card are accepted at
        our <A href="/giving">website</A>, and by charge or check can be sent to:
      </p>
      <p>
        U.S. Naval Institute Foundation
        <br />
        Oral History Program
        <br />
        291 Wood Road
        <br />
        Annapolis, Maryland 21402-5034
      </p>
      <p>
        Phone: 1-800-233-8764
        <br />
        Fax: 410-269-7940
        <br />
        Email: <A href="mailto:oralhistory@usni.org">oralhistory@usni.org</A>
      </p>
    </>
  )
}

const CONTENT: Record<OralHistoriesSubPageSlug, () => ReactNode> = { about: About, 'place-order': PlaceOrder }

export default function OralHistoriesSubPageContent({ slug }: { slug: OralHistoriesSubPageSlug }) {
  const Body = CONTENT[slug]
  return (
    <>
      <section className="bg-white py-12 lg:py-16">
        <div className="container-site">
          {/* Wider than the 760px reading column when the About photo floats beside the copy. */}
          <div
            className={`flex flex-col gap-5 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] ${
              slug === 'about' ? 'max-w-[1100px] lg:block lg:[&>*+*]:mt-5' : 'max-w-[760px]'
            }`}
          >
            <Body />
          </div>
        </div>
      </section>
      {slug === 'about' && <AboutFAQ />}
    </>
  )
}
