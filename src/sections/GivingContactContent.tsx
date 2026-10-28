import { faqTopics } from '@/data/faqs'
import FaqItem from '@/sections/FaqItem'
import GivingMeetTheTeam from '@/sections/GivingMeetTheTeam'

/**
 * Contact the Naval Institute Foundation, at /giving/contact.
 *
 * The live /donate/contact-us: the development staff and the Foundation's
 * address and numbers (the Giving landing's Meet the Team section), then its
 * donations FAQ. The FAQ answers are the FAQ page's Foundation topic, so the
 * two pages can't drift apart.
 */

const foundationFaqs = faqTopics.find((t) => t.id === 'foundation')?.questions ?? []

export default function GivingContactContent() {
  return (
    <>
      <GivingMeetTheTeam />

      <section className="bg-surface-subtle py-14 lg:py-16" aria-labelledby="foundation-faq-heading">
        <div className="container-site">
          <div className="max-w-[860px] mx-auto flex flex-col gap-8">
            <h2 id="foundation-faq-heading" className="font-headline text-[30px] lg:text-[40px] text-navy-bolder leading-[1.15]">
              Frequently Asked Questions
            </h2>
            <div className="border-t border-border-light">
              {foundationFaqs.map((f) => <FaqItem key={f.q} q={f.q} a={f.a} />)}
            </div>
            <p className="font-body text-base">
              <a href="/faq" className="text-link font-bold">View all frequently asked questions</a>
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
