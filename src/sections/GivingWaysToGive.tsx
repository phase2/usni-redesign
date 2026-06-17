import { useState } from 'react'

const accordionItems = [
  {
    title: 'Online Giving',
    content: 'Make a secure online donation to the Naval Institute Foundation using your credit card or bank account. Your gift helps fund mission-critical activities, preserve our history, and create useful tools for the naval community.',
  },
  {
    title: 'By Check',
    content: 'Send a check made payable to the U.S. Naval Institute Foundation. Please include a note indicating the purpose of your gift. Checks may be mailed to our Annapolis, Maryland headquarters.',
  },
  {
    title: 'Gifts of Securities',
    content: 'Donating appreciated stocks, bonds, or mutual fund shares directly to the Naval Institute Foundation may offer significant tax advantages, allowing you to make a larger gift at a lower cost.',
  },
  {
    title: 'Matching Gifts',
    content: "Many employers match their employees' charitable contributions, doubling or even tripling the impact of your gift. Check with your HR department to see if your company participates in a matching gift program.",
  },
  {
    title: 'In Honor of and In Memory of Gifts',
    content: 'Honor a friend, family member, or colleague with a meaningful gift to the Naval Institute Foundation. We will send an acknowledgment to the person you designate, notifying them of your tribute gift.',
  },
  {
    title: 'Planned Gifts',
    content: "A planned gift — such as a bequest, charitable remainder trust, or gift annuity — is a powerful way to create a lasting legacy in support of the Naval Institute's mission for generations to come.",
  },
  {
    title: 'AmazonSmile',
    content: 'Shop at smile.amazon.com and select the U.S. Naval Institute Foundation as your charity. Amazon will donate 0.5% of eligible purchases to the Foundation at no cost to you.',
  },
]

function AccordionItem({ title, content }: { title: string; content: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border-light last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-4 px-0 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-semibold text-base lg:text-lg text-navy-bolder">{title}</span>
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
          <p className="font-body text-base text-neutral-subtle leading-relaxed">{content}</p>
        </div>
      )}
    </div>
  )
}

export default function GivingWaysToGive() {
  return (
    <section id="ways-to-give" className="py-16 lg:py-20 bg-surface-subtle">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[416px_1fr] gap-12 lg:gap-16">

          {/* Left — intro */}
          <div>
            <div className="eyebrow-headline mb-6">
              <p className="eyebrow">Ways to Give</p>
              <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1]">
                There are Many Ways to Make a Gift
              </h2>
            </div>
            <p className="font-body text-base text-neutral-subtle leading-relaxed">
              Donations to the U.S. Naval Institute provide funding to mission-centric activities,
              preserves our history, and creates useful tools to make information and content
              available when and where we need it. Whether designated for a specific project, such
              as funding an oral history or creating a digital photo archive, or unrestricted to be
              used wherever the need is greatest, gifts transform everything the Naval Institute
              does to remain the independent forum for the Sea Services.
            </p>
          </div>

          {/* Right — accordion */}
          <div className="border-t border-border-light">
            {accordionItems.map((item) => (
              <AccordionItem key={item.title} title={item.title} content={item.content} />
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
