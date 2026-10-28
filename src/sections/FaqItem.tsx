import { useState, type ReactNode } from 'react'

/**
 * One question in an FAQ accordion: the BooksAboutFAQ treatment, with a square
 * navy chevron and the shared `.accordion-row` hover and open bands. The FAQ
 * page and the Foundation contact page both list from `faqTopics`.
 */
export default function FaqItem({ q, a }: { q: string; a: ReactNode }) {
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
