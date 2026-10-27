import { useState, type ReactNode } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/sections/PageHero'
import { faqTopics } from '@/data/faqs'

/**
 * All frequently asked questions.
 *
 * The site-wide FAQ that the section FAQs (Membership, Donate, Books & Press,
 * Archives) link to with "View All Frequently Asked Questions". The live page's
 * "FAQ Topics" list becomes a tan block of plain anchor links at the top of the
 * reading column — the framed treatment ArticleCallout uses.
 *
 * Every topic group sits in one full-width section, divided by rules contained
 * to the column. Each group is a heading over the accordion BooksAboutFAQ uses
 * — square navy chevron and the shared `.accordion-row` hover and open bands.
 */
function FAQItem({ q, a }: { q: string; a: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`border-b border-border-light transition-colors ${open ? 'bg-white' : ''}`}>
      <button
        className="accordion-row flex items-center justify-between w-full py-4 px-4 text-left gap-4"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-base text-navy-bolder">{q}</span>
        <span className={`accordion-chevron flex-shrink-0 w-8 h-8 bg-navy-bolder text-white flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

export default function Faq() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PageHero
          title="Frequently Asked Questions"
          description="Find answers to common questions about membership, subscriptions, books, archives, giving, and more."
        />

        <section className="py-12 lg:py-16 bg-white">
          <div className="container-site">
            <div className="max-w-[860px] mx-auto">

              {/* Topic links */}
              <nav aria-labelledby="faq-topics-heading" className="bg-tan-subtlest p-1.5">
                <div className="border border-tan-subtle px-5 py-5 lg:px-6 lg:py-6">
                  <h2
                    id="faq-topics-heading"
                    className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-bolder"
                  >
                    FAQ Topics
                  </h2>
                  <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2.5 font-body text-base">
                    {faqTopics.map((topic) => (
                      <li key={topic.id}>
                        <a href={`#${topic.id}`} className="text-link">
                          {topic.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>

              {/* Topic groups */}
              {faqTopics.map((topic) => (
                <div
                  key={topic.id}
                  id={topic.id}
                  /* scroll-mt clears the collapsed sticky header */
                  className="pt-12 lg:pt-16 mt-12 lg:mt-16 first-of-type:mt-10 border-t-2 border-navy-bold first-of-type:border-t-0 first-of-type:pt-0 scroll-mt-[100px]"
                  aria-labelledby={`${topic.id}-heading`}
                  role="group"
                >
                  <h2
                    id={`${topic.id}-heading`}
                    className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1] mb-8"
                  >
                    {topic.title}
                  </h2>
                  <div className="border-t border-border-light">
                    {topic.questions.map((item) => (
                      <FAQItem key={item.q} q={item.q} a={item.a} />
                    ))}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
