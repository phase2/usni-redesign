import { useState, useEffect, useCallback } from 'react'
import imgProceedings from '@/assets/images/proceedings-magazine-april-cover.png'
import imgEssayContests from '@/assets/images/essay-contests-teaser.png'
import imgUSNINews from '@/assets/images/usni-news-article-feature-center.png'
import imgNavalHistoryMag from '@/assets/images/naval-history-magazine-april26.png'
import imgNavalInstitutePress from '@/assets/images/america-power-project-series.png'
import imgStudentMemberships from '@/assets/images/membership-home-teaser.png'

interface Opportunity {
  id: string
  title: string
  description: string
  image: string | null
  imageAlt: string
  modalHeadline: string
  modalBody: string
  primaryLabel: string
  primaryHref: string
  secondaryLabel: string
  secondaryHref: string
}

const opportunities: Opportunity[] = [
  {
    id: 'proceedings',
    title: 'Proceedings Magazine',
    description: 'Widely admired as the best defense magazine in the world — it is the open forum.',
    image: imgProceedings,
    imageAlt: 'Proceedings Magazine cover',
    modalHeadline: 'Support the open forum for sea service professionals',
    modalBody: 'Proceedings has been the voice of the naval profession since 1873. Your gift supports the production of the world\'s premier defense magazine, ensuring that the best thinking on naval strategy, technology, and policy continues to reach the men and women who serve and those who support them.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Read Proceedings',
    secondaryHref: '/proceedings',
  },
  {
    id: 'stavridis-chair',
    title: 'The James Stavridis Proceedings Chair',
    description: 'Directs periodicals and is the editor-in-chief of Proceedings.',
    image: imgStudentMemberships,
    imageAlt: 'James Stavridis Proceedings Chair',
    modalHeadline: 'Endow the leadership of naval journalism',
    modalBody: 'The James Stavridis Proceedings Chair endowment ensures a visionary editor leads Proceedings into the future. The chair\'s work shapes the intellectual discourse of the naval profession and maintains the quality that has made Proceedings required reading for generations of military and civilian leaders.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'About Proceedings',
    secondaryHref: '/proceedings',
  },
  {
    id: 'essay-contests',
    title: 'Essay Contests',
    description: 'Stimulating thought from the smartest naval practitioners and operators since 1879.',
    image: imgEssayContests,
    imageAlt: 'USNI Essay Contests',
    modalHeadline: 'Invest in the next generation of naval thinkers',
    modalBody: 'USNI essay contests have discovered and elevated some of the most influential voices in naval affairs for nearly 150 years. Your support funds prizes, publication, and outreach that motivate active-duty personnel, students, and veterans to put their best ideas forward — strengthening the profession from the ground up.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'View essay contests',
    secondaryHref: '/proceedings/essay-contests',
  },
  {
    id: 'usni-news',
    title: 'USNI News',
    description: 'Your trusted source for maritime news and analysis.',
    image: imgUSNINews,
    imageAlt: 'USNI News',
    modalHeadline: 'Keep independent naval journalism thriving',
    modalBody: 'USNI News is the go-to source for breaking defense and maritime news, trusted by policymakers, commanders, and informed citizens alike. Gifts to USNI News support the investigative reporting, analysis, and multimedia coverage that keeps the fleet\'s story front and center in the national conversation.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Visit USNI News',
    secondaryHref: '/news',
  },
  {
    id: 'conferences',
    title: 'Conferences & Events',
    description: 'Bringing the open forum to life via in-person discussions and engagement.',
    image: imgStudentMemberships,
    imageAlt: 'USNI Conferences and Events',
    modalHeadline: 'Bring the open forum to life',
    modalBody: 'USNI conferences and symposia convene the sharpest minds in naval affairs — from fleet commanders to defense industry leaders to academic experts. Your gift underwrites programming, travel support for junior officers, and events that spark the candid dialogue critical to a strong, ready Navy.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'View upcoming events',
    secondaryHref: '/events',
  },
  {
    id: 'student-memberships',
    title: 'Sponsoring Student Memberships',
    description: 'Introduces the Institute to midshipmen and cadets early in their careers.',
    image: imgStudentMemberships,
    imageAlt: 'Student Memberships',
    modalHeadline: 'Shape the next generation of naval leaders',
    modalBody: 'Sponsoring student memberships connects midshipmen and cadets at service academies and NROTC units to the full breadth of USNI resources — publications, debates, and professional networks — at the moment when habits of mind are formed. A small gift can set a future commander on a lifelong path of professional reading and engagement.',
    primaryLabel: 'Sponsor a student',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Learn about membership',
    secondaryHref: '/membership',
  },
  {
    id: 'naval-institute-press',
    title: 'The Naval Institute Press',
    description: 'The university press of the Navy and a leader in naval publishing since 1898.',
    image: imgNavalInstitutePress,
    imageAlt: 'Naval Institute Press books',
    modalHeadline: 'Champion the definitive library of naval literature',
    modalBody: 'The Naval Institute Press is the most important publisher of naval and maritime books in the world, with more than 1,000 titles spanning strategy, history, biography, and fiction. Your support makes possible the editorial work, production, and distribution that keeps this body of knowledge growing and accessible.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Browse the Press',
    secondaryHref: '/books',
  },
  {
    id: 'gordon-england-chair',
    title: 'The Gordon England Chair of Professional Naval Literature',
    description: 'Directs the professional naval books program.',
    image: imgNavalInstitutePress,
    imageAlt: 'Gordon England Chair of Professional Naval Literature',
    modalHeadline: 'Sustain the pinnacle of naval book publishing',
    modalBody: 'The Gordon England Chair endowment supports the director of the Press\'s professional naval books program — the titles that educate serving officers, shape doctrinal thinking, and preserve the intellectual heritage of the sea services. This chair is a lasting legacy investment in the quality of naval literature.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'About the Press',
    secondaryHref: '/books/about',
  },
  {
    id: 'naval-history-magazine',
    title: 'Naval History Magazine',
    description: 'The world\'s preeminent naval and maritime history magazine.',
    image: imgNavalHistoryMag,
    imageAlt: 'Naval History Magazine',
    modalHeadline: 'Preserve the heritage of the sea services',
    modalBody: 'Naval History magazine brings the most compelling stories of naval warfare and maritime exploration to a global readership. Your gift supports the historians, editors, and artists who ensure that the lessons of the past remain vivid and relevant for those who serve today and study tomorrow.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Explore Naval History',
    secondaryHref: '/naval-history',
  },
  {
    id: 'historic-preservation',
    title: 'Historic Preservation',
    description: 'Keeps alive the lessons of naval history through the creation of primary-source history.',
    image: imgNavalHistoryMag,
    imageAlt: 'Historic Preservation',
    modalHeadline: 'Guard 150 years of naval heritage',
    modalBody: 'The Naval Institute has been collecting, preserving, and publishing primary-source naval history since 1873. Gifts to historic preservation fund oral history interviews, photo archive digitization, and the care of rare documents and artifacts — ensuring that the full story of America\'s sea power endures for generations to come.',
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Browse the archives',
    secondaryHref: '/archives',
  },
]

function OpportunityModal({ opp, onClose }: { opp: Opportunity; onClose: () => void }) {
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
      aria-labelledby={`modal-headline-${opp.id}`}
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
          {opp.image ? (
            <img
              src={opp.image}
              alt={opp.imageAlt}
              className="w-full h-[320px] object-cover block"
            />
          ) : (
            <div className="w-full h-[320px] bg-navy-bolder" />
          )}
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
            id={`modal-headline-${opp.id}`}
            className="font-headline text-[28px] text-navy-bolder leading-[1.2]"
          >
            {opp.modalHeadline}
          </h3>
          <p className="font-body text-lg text-neutral-subtle leading-relaxed">
            {opp.modalBody}
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <a
              href={opp.primaryHref}
              className="inline-flex items-center justify-center bg-navy-bold text-white
                         font-body font-bold text-base tracking-[-0.5px] px-6 py-4
                         border border-navy-bold hover:bg-navy transition-colors"
            >
              {opp.primaryLabel}
            </a>
            <a
              href={opp.secondaryHref}
              className="inline-flex items-center gap-1.5 font-body font-bold text-base text-navy-subtle hover:text-navy transition-colors"
            >
              {opp.secondaryLabel}
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

function OpportunityCard({ opp, onClick }: { opp: Opportunity; onClick: () => void }) {
  return (
    <button
      className="group w-full text-left bg-white border border-[#999fad] flex items-stretch overflow-hidden hover:border-[#023e7d] transition-colors cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="flex-shrink-0 w-[220px] lg:w-[260px] h-[280px] lg:h-[306px] overflow-hidden bg-navy-bolder/10">
        {opp.image ? (
          <img
            src={opp.image}
            alt={opp.imageAlt}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1d2535]/20" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 px-5 py-6 relative">
        {/* Title + description */}
        <div className="flex flex-col gap-4 flex-1">
          <h3 className="font-headline text-[22px] lg:text-[24px] text-[#023e7d] leading-[1.3]">
            {opp.title}
          </h3>
          <p className="font-body text-[18px] lg:text-[20px] text-[#1d2535] leading-[1.4]">
            {opp.description}
          </p>
        </div>

        {/* Learn more link */}
        <div className="flex items-center justify-end gap-1.5 mt-6">
          <span className="font-body font-extrabold text-[17px] text-[#0466c8] group-hover:text-[#023e7d] transition-colors">
            Learn more
          </span>
          <i className="fa-regular fa-circle-plus text-[#0466c8] group-hover:text-[#023e7d] transition-colors text-xl" aria-hidden="true" />
        </div>
      </div>
    </button>
  )
}

export default function GivingOpportunities() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const activeOpp = opportunities.find((o) => o.id === activeId) ?? null

  return (
    <>
      <section id="giving-opportunities" className="py-16 lg:py-20 bg-white">
        <div className="container-site">
          <h2 className="font-headline text-[48px] lg:text-[56px] text-[#1d2535] leading-[1.1] mb-10">
            Giving Opportunities
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opp={opp}
                onClick={() => setActiveId(opp.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {activeOpp && (
        <OpportunityModal opp={activeOpp} onClose={() => setActiveId(null)} />
      )}
    </>
  )
}
