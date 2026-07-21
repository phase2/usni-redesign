import { useState, useEffect, useCallback } from 'react'

// Card thumbnails
import imgCardProceedings from '@/assets/images/giving/giving-proceedings-teaser.png'
import imgCardStavridis from '@/assets/images/giving/giving-The James Stavridis Proceedings Chair-teaser.png'
import imgCardEssays from '@/assets/images/giving/giving-essay-contest-teaser.png'
import imgCardNews from '@/assets/images/giving/giving-usni-news.png'
import imgCardConferences from '@/assets/images/giving/giving-events-teaser.png'
import imgCardStudents from '@/assets/images/giving/giving-students-teaser.png'
import imgCardPress from '@/assets/images/giving/giving-press-teaser.png'
import imgCardGordonEngland from '@/assets/images/giving/giving-The Gordon England Chair of Professional Naval Literature.png'
import imgCardNavalHistory from '@/assets/images/giving/giving-naval-history.png'
import imgCardHistoricPres from '@/assets/images/giving/giving-historic-pres-teaser.png'

// Modal hero images
import imgModalProceedings from '@/assets/images/giving-modal-hero-proceedings.png'
import imgModalStavridis from '@/assets/images/giving-modal-hero-James Stavridis Proceedings Chair.png'
import imgModalEssays from '@/assets/images/giving-opps-modal-hero-essays.jpg'
import imgModalNews from '@/assets/images/giving-opps-modal-hero-usni-news.jpg'
import imgModalConferences from '@/assets/images/giving-opps-modal-hero-Conferences GO.jpg'
import imgModalStudents from '@/assets/images/giving-opps-modal-hero-students.jpg'
import imgModalPress from '@/assets/images/giving-opps-modal-hero-The Naval Institute Press.png'
import imgModalGordonEngland from '@/assets/images/giving-opps-hero-modal-Gordon-England-GO.jpg'
import imgModalNavalHistory from '@/assets/images/giving-opps-modal-hero-Naval History Magazine.png'
import imgModalHistoricPres from '@/assets/images/giving-opps-modal-hero-OralHistoryGO.jpg'

type BodyBlock = { type: 'p' | 'h4'; text: string }
const p = (text: string): BodyBlock => ({ type: 'p', text })
const h4 = (text: string): BodyBlock => ({ type: 'h4', text })

interface Opportunity {
  id: string
  title: string
  description: string
  image: string | null
  modalImage: string | null
  imageAlt: string
  modalHeadline: string
  modalBody: BodyBlock[]
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
    image: imgCardProceedings,
    modalImage: imgModalProceedings,
    imageAlt: 'Proceedings Magazine cover',
    modalHeadline: 'Proceedings Magazine',
    modalBody: [
      p('For 145 years, the Naval Institute has fostered challenging debate and delivered what is hands-down the world\'s most vigorous independent forum on defense and security issues. Military readers consistently rank Proceedings as "Most Credible," "Most Relevant," "Most Important," and as a "Must Read" among all military journals. The magazine\'s writers include junior officers and enlisted professionals from all three Sea Services, senior fleet operators, acclaimed novelists, and even the heads of foreign navies. Its readership is just as diverse, spanning from cadets and midshipmen to the leaders of government agencies.'),
      p('The Proceedings Trust enables the Institute to protect the magazine\'s highly prized reputation for editorial independence, make Proceedings content more understandable and visually appealing, become less dependent on defense-contractor advertising, and build a more resilient, multi-source funding structure.'),
      p('The Proceedings Trust provides the opportunity for donors who care deeply about the Naval Institute\'s historic Open Forum to help secure Proceedings\' present and future. Supporters of The Proceedings Trust will provide direct philanthropic support to the ongoing needs of the magazine and to the strategic actions that are planned for its continued success.'),
      p('For more information on donating to Proceedings and the Proceedings Trust, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Read Proceedings',
    secondaryHref: '/proceedings',
  },
  {
    id: 'stavridis-chair',
    title: 'The James Stavridis Proceedings Chair',
    description: 'Directs periodicals and is the editor-in-chief of Proceedings.',
    image: imgCardStavridis,
    modalImage: imgModalStavridis,
    imageAlt: 'James Stavridis Proceedings Chair',
    modalHeadline: 'James Stavridis Proceedings Chair',
    modalBody: [
      p('The chair\'s incumbent will drive progress toward one of the Institute\'s key strategic initiatives: To identify issues important to the naval services and nurture useful discussions of those issues, emboldening contributors and increasing the dare factor of everything published in Proceedings. Proceedings is the Institute\'s historic magazine in the world.'),
      p('Sustaining this work will always rely on the discerning intelligence of experienced editors. To ensure that it is guided by accomplished professionals, the Naval Institute seeks to fund the editor-in-chief\'s chair for Proceedings. Judging from the experience of other leading institutions, we believe that this named chair will raise the sights and improve the performance of the entire editorial team, even as it serves to elicit contributions from a wider circle of writers. As a result, the magazine\'s reach and impact, already global, will only increase.'),
      p('All gifts and pledges raised for this purpose will fund the salary and benefits of Proceedings\' Editor-in-Chief, as well as those of his understudy, together with costs incurred in their work: travel, materials, equipment, and software.'),
      p('For more information on donating to the James Stavridis Proceedings Editorial Chair, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'About Proceedings',
    secondaryHref: '/proceedings',
  },
  {
    id: 'essay-contests',
    title: 'Essay Contests',
    description: 'Stimulating thought from the smartest naval practitioners and operators since 1879.',
    image: imgCardEssays,
    modalImage: imgModalEssays,
    imageAlt: 'USNI Essay Contests',
    modalHeadline: 'Essay Contests',
    modalBody: [
      p('Almost from the earliest days of the Naval Institute, its essay contests have been one of its most important functions. The idea of having such an event was first proposed by Lieutenant Commander Allan D. Brown, USN, at the 9 May 1878 meeting of the Naval Institute. The Chair at the time, Commander Alfred Thayer Mahan, USN, Vice President of the Naval Institute, appointed as chairman of a committee Commander William T. Sampson, USN, to prepare a prize to be offered to the author of a paper deemed the best out of those submitted.'),
      p('An essay contest on professional subjects for American naval officers clearly was indicated, but for a young and struggling organization with a total membership of only 250, it was a bold project to undertake. On 13 June 1878, with Commander Mahan again "in the Chair," Commander Sampson delivered the report of his committee, which was adopted without change. The rules for the essay contest were adopted by resolution "without reference to the Constitution."'),
      p('This action created the Naval Institute\'s Prize Essay Contest. In 1948, the name changed to the General Prize Essay Contest. For the period of 1985–2007 the name changed to the Arleigh Burke Essay Contest to honor World War II hero and Cold War Navy CNO and Naval Institute President Admiral Arleigh Burke. From 2008–2013, the Naval Institute awarded General Prizes, but these went to authors of Proceedings articles judged as the best in a calendar year.'),
      p('In 2014, the General Prize Essay Contest came back as generally envisioned by the Naval Institute\'s founding fathers. Currently, the Naval Institute sponsors 14 essay contests a year.'),
      p('The bottom line in all these essay contests is the Naval Institute remains committed to those authors who dare to write to advance the naval profession.'),
      p('Note: All the essay contests include publication of the winning essays in Proceedings or Naval History magazine, recognition of the winners at a public event and cash prizes. Visit the essay contest landing page for specific details — e.g., eligibility, word length, deadlines.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'View essay contests',
    secondaryHref: '/proceedings/essay-contests',
  },
  {
    id: 'usni-news',
    title: 'USNI News',
    description: 'Your trusted source for maritime news and analysis.',
    image: imgCardNews,
    modalImage: imgModalNews,
    imageAlt: 'USNI News',
    modalHeadline: 'USNI News',
    modalBody: [
      p('In 2013, USNI News was launched through unrestricted donations received by the Naval Institute Foundation. The vision? An independent news and analysis service focused on maritime and national security issues written by knowledgeable journalists and analysts who not only understand the densely interconnected world of navies and maritime commerce, but who also can explain it clearly to the general public.'),
      p('For our growing market of international maritime and defense news readers, we are thrilled with the success of USNI News and want to expand our tools to keep our news and analysis fresh, exciting, and informative. We put our effort toward original reporting. We\'re not repackaging someone else\'s story and we\'re not generating content just for clicks.'),
      p('USNI News has more reporters covering the Navy than any other trade news outlet. USNI News reporters are out in the field, every day, delivering relevant news straight from the newsmakers. Whether it\'s at a Congressional hearing in DC or aboard an aircraft carrier in the Middle East, we\'ll be there to cover it.'),
      p('For more information on how you can support USNI News, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Visit USNI News',
    secondaryHref: '/news',
  },
  {
    id: 'conferences',
    title: 'Conferences & Events',
    description: 'Bringing the open forum to life via in-person discussions and engagement.',
    image: imgCardConferences,
    modalImage: imgModalConferences,
    imageAlt: 'USNI Conferences and Events',
    modalHeadline: 'Conferences & Events',
    modalBody: [
      p('Naval Institute professional conferences bring together preeminent military and civilian leaders, historians and policy-makers to discuss challenges to the naval services and to the Nation. These popular events provide the opportunity for sponsors to position themselves as dedicated supporters of the Navy, Marine Corps, and Coast Guard, and illustrates that the sponsor intends to play a constructive role in timely debate by fostering informed discussion of important naval issues. The Naval Institute also hosts a number of member receptions and special events around the country, giving sponsors other avenues to demonstrate their support for the Sea Services. Underwriting conferences and events provides the sponsor with recognition opportunities in print and online as well as on-site.'),
      p('For more information on sponsoring conferences and events, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'View upcoming events',
    secondaryHref: '/events',
  },
  {
    id: 'student-memberships',
    title: 'Sponsoring Student Memberships',
    description: 'Introduces the Institute to midshipmen and cadets early in their careers.',
    image: imgCardStudents,
    modalImage: imgModalStudents,
    imageAlt: 'Student Memberships',
    modalHeadline: 'Sponsor Student Memberships',
    modalBody: [
      p('By underwriting student membership for midshipmen and cadets now enrolled in the U.S. Naval Academy, U.S. Coast Guard Academy, or NROTC program, as well as officer candidates and instructors, donors have the opportunity to bring the benefits of Naval Institute membership directly to the next generation of naval officers and help them advance as leaders. This is also a particularly effective way to honor one\'s alma mater by boosting fellow alumni . . . while also strengthening the Sea Services and supporting the Institute.'),
    ],
    primaryLabel: 'Sponsor a student',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Learn about membership',
    secondaryHref: '/membership',
  },
  {
    id: 'naval-institute-press',
    title: 'The Naval Institute Press',
    description: 'The university press of the Navy and a leader in naval publishing since 1898.',
    image: imgCardPress,
    modalImage: imgModalPress,
    imageAlt: 'Naval Institute Press books',
    modalHeadline: 'The Naval Institute Press',
    modalBody: [
      p('A founding member of the Association of American University Presses, the book-publishing arm of the Naval Institute was launched in 1898 with basic guides to naval practices. Now, more than a century later, Naval Institute Press titles address such diverse subjects as how-to books on boating and navigation, battle histories, biographies, ship and aircraft guides, and novels, including the bestsellers The Hunt for Red October (Tom Clancy) and Flight of the Intruder (Stephen Coonts). As of Fall 2018, the Press has expanded into publishing graphic novels under the Dead Reckoning imprint, bringing military history to new and younger audiences in a uniquely engaging format.'),
      p('The Naval Institute Press proposes to capitalize on major changes going on in the publishing world, ensuring that worthy books of military history find a reputable publisher, and that many more young historians are encouraged to write and publish. Your donations will enable author advances, offer author prizes and awards, underwrite indexing costs, provide price subventions, and fund special projects in both print and digital media.'),
      p('For more information on how you can support the Naval Institute Press, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Browse the Press',
    secondaryHref: '/books',
  },
  {
    id: 'gordon-england-chair',
    title: 'The Gordon England Chair of Professional Naval Literature',
    description: 'Directs the professional naval books program.',
    image: imgCardGordonEngland,
    modalImage: imgModalGordonEngland,
    imageAlt: 'Gordon England Chair of Professional Naval Literature',
    modalHeadline: 'Gordon England Chair of Professional Naval Literature',
    modalBody: [
      p('The chair\'s incumbent directs the professional naval books program of the Naval Institute Press and furthers the organization\'s strategic initiative to become the preeminent source of information for professional advancement in the naval services. The Gordon England Chair of Professional Naval Literature is the Naval Institute\'s first such named chair.'),
      p('The position greatly strengthens the Naval Institute\'s tradition for publishing books essential to the education of the men and women who have made the U.S. Navy one of the greatest forces in the history of the world. These essential books include such titles as: The Bluejackets Manual, The Coast Guardsman\'s Manual, The Naval Shiphandler\'s Guide, Dutton\'s Nautical Navigation, The Handbook for Marine NCOs, The Watch Officers Guide, and The Naval Institute Guide to Naval Writing. In 2015, professional books occupied 17 of the top 30 slots in the Naval Institute Press\'s list of best-selling books.'),
      p('The Chair also duly honors the rich legacy of Secretary England, a well-respected defense industry executive noted for his vision and innovation. England was selected to serve as the 72nd and 73rd Secretary of the Navy, the first Deputy Secretary for Homeland Security, and the 29th Deputy Secretary of Defense.'),
      p('The Gordon England Chair of Professional Naval Literature helps to oversee the revision of many of the classic professional books while developing new titles to address the evolving duties of the nation\'s Sailors, Marines, and Coast Guardsmen.'),
      p('For more information on how you can support The Gordon England Chair of Professional Naval Literature, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'About the Press',
    secondaryHref: '/books/about',
  },
  {
    id: 'naval-history-magazine',
    title: 'Naval History Magazine',
    description: 'The world\'s preeminent naval and maritime history magazine.',
    image: imgCardNavalHistory,
    modalImage: imgModalNavalHistory,
    imageAlt: 'Naval History Magazine',
    modalHeadline: 'Naval History Magazine',
    modalBody: [
      p('The Naval Institute\'s Naval History Magazine is the world\'s most authoritative and engaging periodical for readers interested in our nautical heritage. Beautifully illustrated with dramatic period photographs and evocative paintings, the magazine brings to life U.S. Navy, Marine Corps, and Coast Guard history through insightful analysis of events, and firsthand accounts by those involved in our naval triumphs and tragedies. Gripping battle accounts, enlightening articles on enduring mysteries, thoughtful essays, scholarly analyses, and book reviews make Naval History a "must read" for its devoted audience.'),
      p('Naval History Magazine dominates the subject of maritime history worldwide. It occupies a niche, with its American Sea Services focus, that no other magazine has occupied for many, many years. Naval History is a bridge between the academic world and popular naval history, with authoritative content supported by citations or named sources. David McCullough, host of "The American Experience" and Pulitzer Prize winning historian calls Naval History "One of the best magazines in the country…fundamental to improving the teaching and the understanding of American history…"'),
      p('Individuals who care deeply about the work of Naval History Magazine have an opportunity to help secure Naval History\'s present and future and, in this way, preserve and disseminate Sea Service history more widely and effectively.'),
      p('Supporters of Naval History Magazine provide direct philanthropic support to the ongoing needs of the magazine and to the strategic actions that are planned for its continued success. These actions include greater use of Navy and Marine photographic, film, and textual records at the National Archives, more graphics and maps, more use of graphic novel excerpts, more commissioned artwork to illustrate articles more richly, and more special gatefold packages.'),
      p('For more information on how you can support Naval History Magazine, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
    primaryLabel: 'Make a gift',
    primaryHref: '/giving/donate',
    secondaryLabel: 'Explore Naval History',
    secondaryHref: '/naval-history',
  },
  {
    id: 'historic-preservation',
    title: 'Historic Preservation',
    description: 'Keeps alive the lessons of naval history through the creation of primary-source history.',
    image: imgCardHistoricPres,
    modalImage: imgModalHistoricPres,
    imageAlt: 'Historic Preservation',
    modalHeadline: 'Historic Preservation',
    modalBody: [
      p('Sponsorship for Historic Preservation has two core programs: digitizing and preserving photo archives, and supporting the Oral History program.'),
      h4('Photo Digitization and Preservation'),
      p('The Naval Institute\'s photo archive consists of more than 450,000 prints, slides, and negatives dating back to the Civil War — the largest private collection of naval images in the world. Though maintained in a state-of-the-art, climate-controlled archive, these precious original prints are deteriorating before our eyes — curling up, turning yellow, fading away. Gifts will allow the Institute to digitize the most important photographs in its vast archive and ensure that they are preserved in effective, comprehensive, searchable fashion and available to historians, documentary film-makers, veterans and their families, and the public.'),
      h4('Oral History'),
      p('Spun off from the Columbia University program in 1969, the Naval Institute Oral History Program has amassed an unrivaled body of in-depth personal narratives of crucial naval events as experienced by the great leaders of the past century. These recollections have been painstakingly researched, recorded, transcribed, annotated, indexed, and published for use by historians, students, veterans, and documentary filmmakers. More than 270 oral histories have been completed, and dozens more are on deck. All supply rich detail often lost in official histories, creating an intimate, personal narrative of naval events and personalities. As such, they immediately become invaluable primary source materials for historians, as well as for Naval Academy and NROTC midshipmen and Coast Guard Academy cadets.'),
      p('Moving forward, the Naval Institute will aggressively identify, conduct, and publish fresh oral histories in a timely fashion, working from an evolving list of prospects. These new candidates will include strategic and operational leaders such as recent Chiefs of Naval Operations and carrier battle-group commanders, as well as naval strategists and chief technologists. The program will also capture the recollections of heroes and pacesetters such as Medal of Honor recipients and astronauts.'),
      p('Thanks to the generosity of past donors, the program\'s entire collection of audio-taped interviews has been digitized. Henceforth, all Naval Institute oral histories will be born digital, and key portions of the histories will be videotaped. Future historians and documentary filmmakers will thus be able to hear and watch these historic figures as they tell their most compelling stories. The oral histories will also be made available online.'),
      p('For more information on how you can support Historic Preservation, please contact the Naval Institute Foundation at (410) 295-1054 or foundation@usni.org. Or make a direct contribution today as part of your gift to the Institute\'s comprehensive campaign.'),
    ],
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

  const heroImg = opp.modalImage ?? opp.image

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-headline-${opp.id}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative bg-white w-full max-w-[864px] shadow-2xl z-10 flex flex-col max-h-[90vh]">

        {/* Hero image — pinned, does not scroll */}
        <div className="relative flex-shrink-0">
          {heroImg ? (
            <img
              src={heroImg}
              alt={opp.imageAlt}
              className="w-full h-[280px] object-cover block"
            />
          ) : (
            <div className="w-full h-[280px] bg-navy-bolder" />
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

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          <div className="px-10 pt-8 pb-10 flex flex-col gap-5">
            <h3
              id={`modal-headline-${opp.id}`}
              className="font-headline text-[28px] text-navy-bolder leading-[1.1]"
            >
              {opp.modalHeadline}
            </h3>

            <div className="flex flex-col gap-4">
              {opp.modalBody.map((block, i) =>
                block.type === 'h4' ? (
                  <h4 key={i} className="font-headline text-[18px] text-navy-bolder mt-2">
                    {block.text}
                  </h4>
                ) : (
                  <p key={i} className="font-body text-base text-neutral-subtle leading-relaxed">
                    {block.text}
                  </p>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center gap-6 pt-2">
              <a
                href={opp.primaryHref}
                className="inline-flex items-center justify-center bg-navy-bold text-white
                           font-body font-bold text-base tracking-[-0.5px] px-6 py-4
                           border border-navy-bold hover:bg-navy-bright hover:border-navy-bright transition-colors"
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
