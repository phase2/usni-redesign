import { useState, useEffect, useCallback } from 'react'
import imgInformation from '@/assets/images/information-modal-hero.png'
import imgCommunity from '@/assets/images/community-modal-hero.png'
import imgKnowledge from '@/assets/images/knowledge-modal-hero.png'
import imgHistory from '@/assets/images/naval-history-modal-banner.jpg'

interface Benefit {
  id: string
  title: string
  cardBody: JSX.Element
  modalImage: string
  modalImageAlt: string
  modalHeadline: string
  modalBody: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

const benefits: Benefit[] = [
  {
    id: 'information',
    title: 'Information',
    cardBody: (
      <>
        Always stay informed with USNI News, Proceedings Today, and{' '}
        <em>Proceedings</em>, the must-read flagship publication that keeps you on top of current
        events, pressing issues and provocative ideas!
      </>
    ),
    modalImage: imgInformation,
    modalImageAlt: 'HIMARS missile system deployed during Balikatan exercise',
    modalHeadline: 'Stay informed with unbiased naval reporting',
    modalBody:
      'Membership includes a subscription to Proceedings or Naval History magazine, plus unlimited access to USNI News — the leading source for breaking defense and naval news. Our editors and contributors represent the best analytical voices in the field, keeping you ahead of events that shape U.S. maritime policy and global security.',
    primaryLabel: 'Join USNI today',
    primaryHref: '/membership/join',
    secondaryLabel: 'Browse USNI News',
    secondaryHref: '/news',
  },
  {
    id: 'community',
    title: 'Community',
    cardBody: (
      <>
        Join and network with top-level military leaders and industry insiders at Naval Institute
        professional conferences and events.
      </>
    ),
    modalImage: imgCommunity,
    modalImageAlt: 'Sailors and Marines in dress uniforms at a Naval Institute event',
    modalHeadline: 'Connect with the naval professional community',
    modalBody:
      'As a member, you join a community of more than 50,000 naval professionals, veterans, civilians, and concerned citizens who share a commitment to strong maritime defense. Attend USNI-sponsored conferences, engage through our publications, and add your voice to the "intellectual heart of the Sea Services."',
    primaryLabel: 'Join USNI today',
    primaryHref: '/membership/join',
    secondaryLabel: 'View events',
    secondaryHref: '/events',
  },
  {
    id: 'knowledge',
    title: 'Knowledge',
    cardBody: (
      <>
        Augment your personal library with significant discounts on more than 1,000 titles from
        Naval Institute Press books, ranging from military history to current affairs.
      </>
    ),
    modalImage: imgKnowledge,
    modalImageAlt: 'Naval Institute Press books on a shelf',
    modalHeadline: 'Build your naval knowledge with exclusive discounts',
    modalBody:
      'Members receive 20% off all Naval Institute Press titles — more than 1,000 books spanning naval history, strategy, technology, biography, and fiction. From essential professional reading to rare archival works, the Press is the foremost publisher of naval literature and a benefit unique to USNI membership.',
    primaryLabel: 'Browse books',
    primaryHref: '/books',
    secondaryLabel: 'Learn about the Press',
    secondaryHref: '/books/about',
  },
  {
    id: 'history',
    title: 'History',
    cardBody: (
      <>
        With our mission to preserve the heritage and history of the Sea Services, enjoy access to
        the archives and discounts on the full collection of rare photos, certificates,{' '}
        <em>Naval History</em> magazine and more!
      </>
    ),
    modalImage: imgHistory,
    modalImageAlt: 'Historic tall ships in harbor',
    modalHeadline: 'Explore 150+ years of naval heritage',
    modalBody:
      'The Naval Institute has been the guardian of sea-service history since 1873. Members enjoy access to rare photo archives, oral history collections, historical documents, and a subscription to Naval History magazine — a bimonthly publication connecting remarkable stories of the Navy\'s past to present challenges in maritime affairs.',
    primaryLabel: 'Explore Naval History',
    primaryHref: '/naval-history',
    secondaryLabel: 'Browse the archives',
    secondaryHref: '/archives',
  },
]

function BenefitModal({ benefit, onClose }: { benefit: Benefit; onClose: () => void }) {
  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-headline-${benefit.id}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-boldest/70"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative bg-white w-full max-w-[864px] shadow-2xl z-10">
        {/* Image */}
        <div className="relative">
          <img
            src={benefit.modalImage}
            alt={benefit.modalImageAlt}
            className="w-full h-[490px] object-cover block"
          />
          {/* Close button */}
          <button
            className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-white text-neutral-subtle hover:bg-neutral-subtlest transition-colors"
            onClick={onClose}
            aria-label="Close"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-10 pt-8 pb-10 flex flex-col gap-5">
          <h3
            id={`modal-headline-${benefit.id}`}
            className="font-headline text-[28px] text-navy-bolder leading-[1.2]"
          >
            {benefit.modalHeadline}
          </h3>
          <p className="font-body text-lg text-neutral-subtle leading-relaxed">
            {benefit.modalBody}
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href={benefit.primaryHref}
              className="inline-flex items-center justify-center bg-navy-bold text-white
                         font-body font-bold text-base tracking-[-0.5px] px-6 py-4
                         border border-navy-bold hover:bg-navy transition-colors"
            >
              {benefit.primaryLabel}
            </a>
            <a
              href={benefit.secondaryHref}
              className="inline-flex items-center gap-1.5 font-body font-bold text-base text-navy-subtle hover:text-navy transition-colors"
            >
              {benefit.secondaryLabel}
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function MembershipBenefits() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeBenefit = benefits.find((b) => b.id === activeId) ?? null

  return (
    <>
      <section className="bg-surface-subtle py-section">
        <div className="container-site">

          {/* Section header */}
          <div className="text-center mb-8">
            <p className="eyebrow text-navy-subtle mb-1.5">Membership Benefits</p>
            <h2 className="font-headline text-5xl xl:text-[56px] text-navy-bolder leading-[1.1]">
              More than a subscription
            </h2>
          </div>

          {/* 4-column card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.id}
                className="bg-white border border-navy-subtle flex flex-col gap-4 p-5"
              >
                {/* Card headline + rule */}
                <div className="border-b border-[#0466c8] pb-4">
                  <h3 className="font-headline text-[28px] text-navy-bolder leading-[1.2]">
                    {benefit.title}
                  </h3>
                </div>

                {/* Card body */}
                <p className="font-body text-base text-neutral-subtle leading-relaxed flex-1">
                  {benefit.cardBody}
                </p>

                {/* CTA button */}
                <button
                  className="w-full flex items-center justify-center gap-2 bg-navy-bold text-white
                             font-body font-bold text-base tracking-[-0.5px] px-6 py-3.5
                             border border-navy-bold hover:bg-navy transition-colors"
                  onClick={() => setActiveId(benefit.id)}
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6.5" />
                    <path d="M8 5v6M5 8h6" strokeLinecap="round" />
                  </svg>
                  More information
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {activeBenefit && (
        <BenefitModal benefit={activeBenefit} onClose={() => setActiveId(null)} />
      )}
    </>
  )
}
