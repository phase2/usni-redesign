import { useState } from 'react'

const faqItems = [
  {
    question: 'How can I access the archival collections?',
    answer:
      'The Naval Institute Archives reading room is open to researchers by appointment. Please contact the Archives to schedule a visit. Many collections have also been digitized and are available online or may be requested via email.',
  },
  {
    question: 'How do I order a digital image from the Photographic Collection?',
    answer:
      'You can request a digital image by contacting the Archives with the photograph\'s accession number or a description of the image you need. Fees vary by intended use (personal, educational, or commercial). Most orders are fulfilled within 5–7 business days.',
  },
  {
    question: 'Can I transfer a photograph or document I have found?',
    answer:
      'Yes. If you have photographs, documents, manuscripts, or personal papers related to the naval profession that you would like to donate, please contact the Archives. Our staff will work with you to assess the materials and arrange for their transfer.',
  },
  {
    question: 'Are there restrictions on how archival materials can be used?',
    answer:
      'Access and use restrictions vary by collection. Some materials are subject to donor restrictions, copyright, or privacy considerations. The Archives staff will advise you on any applicable restrictions when you request materials.',
  },
  {
    question: 'How long does it take to process a research request?',
    answer:
      'Simple requests (a single photograph or short document) are typically fulfilled within one week. More complex research requests may take two to four weeks depending on the volume and condition of the materials involved.',
  },
  {
    question: 'What if I want to submit a memoir or personal papers?',
    answer:
      'The Naval Institute Archives actively collects unpublished memoirs, diaries, and personal papers from naval officers and their families. Please contact the Archives to discuss your donation. All donated materials are preserved, cataloged, and made available to researchers.',
  },
  {
    question: 'How do I cite materials from the Naval Institute Archives?',
    answer:
      'Standard citation format is: [Author/Subject Name], [Record/Interview Title], [Date], U.S. Naval Institute Archives, Annapolis, Maryland. The Archives staff can provide specific guidance on citing particular collections.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border-light last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-4 px-0 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-base lg:text-lg text-navy-bolder pr-4">{question}</span>
        <span
          className={`flex-shrink-0 w-8 h-8 bg-navy-bolder text-white flex items-center justify-center transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 pr-10">
          <p className="font-body text-base text-neutral-subtle leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function ArchivesFAQ() {
  return (
    <section id="faq" className="py-16 lg:py-20 bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[416px_1fr] gap-12 lg:gap-16">

          {/* Left */}
          <div>
            <div className="flex flex-col gap-4 mb-6">
              <p className="eyebrow text-navy-subtle">FAQ</p>
              <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1]">
                Frequently Asked Questions
              </h2>
            </div>
            <p className="font-body text-base text-neutral-subtle leading-relaxed mb-8">
              Have a question not answered here? Reach out to our archivists directly.
            </p>
            <a
              href="/archives/contact"
              className="inline-flex items-center justify-center bg-navy-bolder text-white
                         font-body font-bold text-base tracking-[-0.5px] px-6 py-4
                         hover:bg-navy transition-colors"
            >
              Contact the Archives
            </a>
          </div>

          {/* Right — accordion */}
          <div className="border-t border-border-light">
            {faqItems.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
