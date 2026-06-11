import { useState } from 'react'
import { NavyButtonLink } from '@/components/ui/Button'

const faqs = [
  {
    question: 'How do I join the U.S. Naval Institute?',
    answer:
      'You can join online at usni.org/membership, by phone at 410-268-6110, or by mail. Choose from individual, life, or organizational membership options.',
  },
  {
    question: 'How do I become a Member of the U.S. Naval Institute?',
    answer:
      'Select a membership plan on our website and complete the registration form. Membership includes a subscription to Proceedings or Naval History magazine, member discounts, and access to exclusive content.',
  },
  {
    question: 'How do I check the status of my Membership?',
    answer:
      'Log in to your account at usni.org or contact Member Services at member@usni.org or 410-268-6110. Our team is available Monday through Friday, 8 a.m. to 5 p.m. ET.',
  },
  {
    question: 'How do I give a gift Membership?',
    answer:
      'Gift memberships are available at usni.org/gift. Select the membership type and duration, then provide the recipient\'s information. A welcome letter and membership card will be sent directly to them.',
  },
  {
    question:
      "I'm a Member and would like to also subscribe to Naval History magazine. How do I subscribe?",
    answer:
      'Members can add a Naval History magazine subscription to their existing membership by logging into their account or contacting Member Services. A discounted rate is available for current members.',
  },
  {
    question: "Why did I get a Membership solicitation when I'm already a member?",
    answer:
      'Renewal notices are sent in advance of your expiration date to ensure uninterrupted service. If you believe you received a solicitation in error, please contact Member Services with your member ID.',
  },
  {
    question: 'What are the benefits of joining the U.S. Naval Institute?',
    answer:
      'Members receive a subscription to Proceedings or Naval History magazine, 20% off Naval Institute Press books and Ship\'s Store merchandise, access to the USNI digital archive, exclusive member events, and the ability to submit articles to our publications.',
  },
]

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-light">
      <button
        className={`flex items-center justify-between w-full gap-4 px-5 py-5 text-left transition-colors ${open ? 'bg-surface-subtle' : 'hover:bg-surface-subtle'}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-bold text-base text-navy-bolder leading-[1.4] flex-1">{question}</span>
        <span
          className="flex-shrink-0 flex items-center justify-center bg-navy-subtle p-2"
          aria-hidden="true"
        >
          <svg
            className={`w-4 h-4 text-white transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-5 pt-4 pb-6">
          <p className="font-body text-base text-neutral-subtle leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function MembershipFAQ() {
  return (
    <section className="py-section" style={{ background: 'linear-gradient(71deg, #EBF4FF 8.15%, #FFF 72.81%)' }}>
      <div className="container-site">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left — title + CTA */}
          <div className="flex flex-col gap-4 lg:w-[32%] lg:sticky lg:top-32">
            <h2 className="font-headline text-4xl text-navy-bolder leading-[1.2]">
              Membership Frequently Asked Questions
            </h2>
            <NavyButtonLink href="/membership/faq">
              View All Frequently Asked Questions
            </NavyButtonLink>
          </div>

          {/* Right — accordion */}
          <div className="flex-1 border-t border-border-light">
            {faqs.map((faq) => (
              <AccordionItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
