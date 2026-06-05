import imgProceedings from '@/assets/images/proceedings-magazine-april-cover.png'
import imgEssayContests from '@/assets/images/essay-contests-teaser.png'
import imgUSNINews from '@/assets/images/usni-news-article-feature-center.png'
import imgNavalHistoryMag from '@/assets/images/naval-history-magazine-april26.png'
import imgNavalInstitutePress from '@/assets/images/america-power-project-series.png'
import imgStudentMemberships from '@/assets/images/membership-home-teaser.png'

const opportunities = [
  {
    title: 'Proceedings Magazine',
    description: 'Widely admired as the best defense magazine in the world — it is the open forum.',
    image: imgProceedings,
    imageAlt: 'Proceedings Magazine cover',
    href: '/giving/opportunities/proceedings',
  },
  {
    title: 'The James Stavridis Proceedings Chair',
    description: 'Directs periodicals and is the editor-in-chief of Proceedings.',
    image: null,
    imageAlt: 'James Stavridis Proceedings Chair',
    href: '/giving/opportunities/stavridis-chair',
  },
  {
    title: 'Essay Contests',
    description: 'Stimulating thought from the smartest naval practitioners and operators since 1879.',
    image: imgEssayContests,
    imageAlt: 'USNI Essay Contests',
    href: '/giving/opportunities/essay-contests',
  },
  {
    title: 'USNI News',
    description: 'Your trusted source for maritime news and analysis.',
    image: imgUSNINews,
    imageAlt: 'USNI News',
    href: '/giving/opportunities/usni-news',
  },
  {
    title: 'Conferences & Events',
    description: 'Bringing the open forum to life via in-person discussions and engagement.',
    image: null,
    imageAlt: 'USNI Conferences and Events',
    href: '/giving/opportunities/conferences',
  },
  {
    title: 'Sponsoring Student Memberships',
    description: 'Introduces the Institute to midshipmen and cadets early in their careers.',
    image: imgStudentMemberships,
    imageAlt: 'Student Memberships',
    href: '/giving/opportunities/student-memberships',
  },
  {
    title: 'The Naval Institute Press',
    description: 'The university press of the Navy and a leader in naval publishing since 1898.',
    image: imgNavalInstitutePress,
    imageAlt: 'Naval Institute Press books',
    href: '/giving/opportunities/naval-institute-press',
  },
  {
    title: 'The Gordon England Chair of Professional Naval Literature',
    description: 'Directs the professional naval books program.',
    image: null,
    imageAlt: 'Gordon England Chair',
    href: '/giving/opportunities/gordon-england-chair',
  },
  {
    title: 'Naval History Magazine',
    description: 'The world\'s preeminent naval and maritime history magazine.',
    image: imgNavalHistoryMag,
    imageAlt: 'Naval History Magazine',
    href: '/giving/opportunities/naval-history-magazine',
  },
  {
    title: 'Historic Preservation',
    description: 'Keeps alive the lessons of naval history through the creation of primary-source history.',
    image: null,
    imageAlt: 'Historic Preservation',
    href: '/giving/opportunities/historic-preservation',
  },
]

function OpportunityCard({ title, description, image, imageAlt, href }: (typeof opportunities)[0]) {
  return (
    <div className="flex border-b border-border-light last:border-b-0">
      {/* Thumbnail */}
      <div className="w-[200px] flex-shrink-0 overflow-hidden bg-navy-bolder/10">
        {image ? (
          <img
            src={image}
            alt={imageAlt}
            className="w-full h-full object-cover"
            style={{ minHeight: '220px' }}
          />
        ) : (
          <div className="w-full h-full bg-navy-bolder/10 flex items-center justify-center" style={{ minHeight: '220px' }}>
            <div className="w-12 h-12 border-2 border-navy-bolder/20 rounded-full" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-5 lg:p-6">
        <div>
          <h3 className="font-body font-bold text-base lg:text-lg text-navy-subtle hover:text-navy transition-colors mb-2">
            <a href={href}>{title}</a>
          </h3>
          <p className="font-body text-sm lg:text-base text-neutral-subtle leading-relaxed">{description}</p>
        </div>
        <div className="mt-4">
          <a
            href={href}
            className="inline-flex items-center gap-1.5 font-body font-semibold text-sm text-navy-subtle hover:text-navy transition-colors"
          >
            Learn more
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default function GivingOpportunities() {
  const leftCol = opportunities.filter((_, i) => i % 2 === 0)
  const rightCol = opportunities.filter((_, i) => i % 2 === 1)

  return (
    <section id="giving-opportunities" className="py-16 lg:py-20 bg-white">
      <div className="container-site">
        <h2 className="font-headline text-3xl lg:text-4xl xl:text-5xl text-navy-bolder leading-tight mb-10">
          Giving Opportunities
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border-t border-border-light">
          <div className="border-r-0 lg:border-r border-border-light">
            {leftCol.map((opp) => (
              <OpportunityCard key={opp.title} {...opp} />
            ))}
          </div>
          <div>
            {rightCol.map((opp) => (
              <OpportunityCard key={opp.title} {...opp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
