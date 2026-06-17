import inlineImg1 from '@/assets/images/naval-history-articles/Russell-NH-5-26-1 Hero.jpg'
import SharePopover from '@/components/ui/SharePopover'
import ArticleComments from '@/sections/ArticleComments'
import ArticleAuthorBio from '@/sections/ArticleAuthorBio'

const articleAuthors = [
  {
    name: 'James D. Russell',
    role: 'Naval Historian & Retired U.S. Navy Commander',
    bio: 'James D. Russell is a naval historian and retired U.S. Navy commander who served as a carrier aviator for 22 years. He holds a Ph.D. in military history from the Naval War College and has written extensively on the Pacific War. His previous work includes articles in Naval History, Naval War College Review, and The Journal of Military History.',
  },
]

function AdFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F4F4F6] p-2 border border-[#C4C9D4]">
      {children}
    </div>
  )
}

function AdPlaceholder({ width, height, label }: { width: number; height: number; label: string }) {
  return (
    <AdFrame>
      <div
        className="bg-[#DDE1E7] flex flex-col items-center justify-center gap-1"
        style={{ width, height }}
      >
        <span className="font-body text-xs font-semibold text-neutral-subtle uppercase tracking-wider">Advertisement</span>
        <span className="font-body text-[11px] text-neutral-subtle/60">{label} · {width} × {height}</span>
      </div>
    </AdFrame>
  )
}

function AudioPlayer() {
  return (
    <div className="border-l-4 border-[#023e7d]">
      <div className="bg-white border border-[#023e7d] border-l-0 p-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <p className="font-body font-medium text-[14px] uppercase tracking-[0.5px] text-[#0466c8] leading-[1.5]">
              Members-only Feature
            </p>
            <p className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">
              Listen to this story
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              type="button"
              aria-label="Play audio"
              className="w-9 h-9 rounded-full bg-[#E85D04] flex items-center justify-center hover:brightness-90 transition-all flex-shrink-0"
            >
              <i className="fa-solid fa-play text-white text-xs ml-0.5" aria-hidden="true" />
            </button>
            <div className="flex items-end gap-[3px] h-7">
              {[4,7,11,8,13,6,9,14,10,8,5,11,13,8,6,10,9,5,8,12,11,6,10,9,7,12,11,9,7,5].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm flex-shrink-0"
                  style={{ height: `${h * 2}px`, backgroundColor: i < 8 ? '#E85D04' : '#C0B9A8' }}
                />
              ))}
            </div>
            <span className="font-body text-xs text-neutral-subtle flex-shrink-0">12:17</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArticleSidebar() {
  return (
    <aside className="flex flex-col gap-6">
      <AdPlaceholder width={300} height={250} label="Posterboard" />
      <div className="flex justify-center">
        <AdPlaceholder width={160} height={600} label="Skyscraper" />
      </div>
    </aside>
  )
}

function PullQuote({ quote, attribution }: { quote: string; attribution?: string }) {
  return (
    <blockquote className="border-l-4 border-[#023e7d] pl-6 py-2 my-6">
      <p className="font-headline text-[24px] text-[#023e7d] leading-[1.3] italic">{quote}</p>
      {attribution && (
        <footer className="mt-3 font-body text-[14px] text-[#4e576a] font-semibold not-italic">{attribution}</footer>
      )}
    </blockquote>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-headline text-[28px] text-[#001845] leading-[1.2] mt-10 mb-4 pt-8 border-t border-[#e8eaed]">
      {children}
    </h2>
  )
}

const topics = ['World War II', 'Battle of Midway', 'Naval Aviation', 'Pacific Theater', 'Biography']

function ArticleTopics() {
  return (
    <div className="pt-8 pb-8">
      <p className="font-body font-medium text-[18px] uppercase tracking-[1px] text-[#1d2535] mb-4">Topics</p>
      <div className="flex flex-wrap gap-3">
        {topics.map((tag) => (
          <a
            key={tag}
            href={`/naval-history/series?topic=${encodeURIComponent(tag.toLowerCase())}`}
            className="font-body font-bold text-base text-[#023e7d] border border-[#023e7d] px-4 py-2 hover:bg-surface-subtle transition-colors"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  )
}

export default function MitscherArticleBody() {
  return (
    <>
      <section className="bg-white pt-8 pb-16">
        <div className="max-w-[1090px] mx-auto w-full px-4 lg:px-8">
          <div className="flex gap-12 items-start">

            {/* ── Main article content ── */}
            <div className="flex-1 min-w-0">
              <AudioPlayer />

              <div className="font-body text-[16px] lg:text-[18px] text-[#1d2535] leading-[1.75] flex flex-col gap-5">

                <p>
                  At 0700 on 4 June 1942, Captain Marc A. Mitscher stood on the flag bridge of USS <em>Hornet</em> (CV-8) and watched his aviators disappear into the morning overcast. He was sending them against the Kido Butai — Japan's carrier striking force — some 155 miles to the northwest. What happened next would be debated by naval historians for generations.
                </p>

                <p>
                  The Battle of Midway is rightly celebrated as America's greatest naval victory, the turning point that broke the offensive power of the Imperial Japanese Navy and shifted the initiative in the Pacific War. But the road to that victory ran through controversy — and much of that controversy has centered on the decisions of a single man aboard the <em>Hornet</em>.
                </p>

                <SectionHeading>A Commander Under Scrutiny</SectionHeading>

                <p>
                  Marc Mitscher came to Midway with an impressive record. A 1910 Naval Academy graduate, he had earned his aviator's wings in 1916 and spent the interwar years building the institutional foundations of naval aviation. He had piloted one of the NC flying boats on the first transatlantic crossing attempt in 1919. By 1942 he was among the Navy's most experienced carrier officers.
                </p>

                <p>
                  Yet for all his credentials, the events of June 4 — specifically the flight vectors he assigned to his air group and the fate of Torpedo Squadron 8 (VT-8) under Lieutenant Commander John C. Waldron — would cast a long shadow over his legacy. The question historians have wrestled with ever since: did Mitscher's navigational decisions contribute to one of the most devastating losses in American aviation history?
                </p>

                <PullQuote
                  quote="My greatest hope is that we encounter the enemy and that my group can be the first to make contact."
                  attribution="— Lt. Cdr. John C. Waldron, to his pilots before launch, June 4, 1942"
                />

                <SectionHeading>The Flight to Nowhere</SectionHeading>

                <p>
                  The central controversy concerns the launch vectors assigned to <em>Hornet</em>'s air group. Shortly before launch, intelligence placed the Japanese carriers at roughly 155 miles bearing 239 degrees true. Mitscher's air group commander, Commander Stanhope Ring, led the main strike element — the Hornet's dive bombers and fighters — on a course of approximately 265 degrees. Waldron, leading VT-8, broke from the formation almost immediately and flew his own heading to the southwest.
                </p>

                <p>
                  Ring's group flew southwest and then south, found nothing, and ultimately had to land at Midway and on the water, having exhausted their fuel. Waldron's torpedo squadron, flying the heading Waldron believed was correct based on his own calculations, found the Japanese fleet. All fifteen of his TBD Devastators were shot down. Only Ensign George H. Gay Jr. survived, clinging to a seat cushion as the carrier battle raged above him.
                </p>

                {/* Inline image */}
                <figure className="my-4">
                  <div className="overflow-hidden">
                    <img
                      src={inlineImg1}
                      alt="Carrier aircraft being prepared for launch on USS Hornet flight deck"
                      className="w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-2">
                    <p className="font-body text-xs text-neutral-subtle leading-relaxed">
                      Aircraft spotted on a carrier flight deck in the hours before the decisive engagement. The coordinated launch of dive bombers, torpedo planes, and fighters proved far more difficult to execute than pre-battle planning suggested.
                    </p>
                    <p className="font-body text-xs text-neutral-subtle/70 mt-1">U.S. Naval Institute Photo Archive</p>
                  </figcaption>
                </figure>

                <SectionHeading>The Waldron Factor</SectionHeading>

                <p>
                  Waldron had left a note for his wife before the battle. He had also briefed his pilots with a frankness that stood in stark contrast to the sanitized optimism of official communications. He told his men he believed they would meet fierce opposition, that losses would be heavy, and that he expected them to press their attacks regardless.
                </p>

                <p>
                  After the battle, questions arose about what orders Waldron had actually received and whether his decision to break from Ring's formation was authorized or insubordinate. The surviving record — including Mitscher's own action report — contains significant ambiguities, some of which appear to have been introduced after the fact. Samuel Eliot Morison, writing in his authoritative naval history series, was careful and measured in his conclusions. Others were less restrained.
                </p>

                <p>
                  The core allegation, pressed most persistently by historians Clay Blair and later Gordon Prange, was that Ring flew the wrong course — that Mitscher either authorized or failed to correct a navigational error that sent the <em>Hornet</em>'s main strike group away from the Japanese fleet. Under this interpretation, Waldron broke away because he correctly identified the error and flew on his own judgment.
                </p>

                <SectionHeading>The Official Record and Its Gaps</SectionHeading>

                <p>
                  What makes the Mitscher controversy so persistent is the fragility of the documentary record. Mitscher's action report, filed on June 13, 1942, contains errors and inconsistencies that have fueled suspicion of deliberate revision. The report's account of VT-8's launch and subsequent fate differs in key details from Ensign Gay's testimony and from the squadron's own war diary.
                </p>

                <p>
                  Admiral Chester Nimitz was reportedly dissatisfied with Mitscher's report and ordered corrections. The precise nature of those corrections — and what they changed — has been a subject of debate ever since. Researchers who have combed the National Archives in search of the original draft have found the documentary trail frustratingly incomplete.
                </p>

                <PullQuote
                  quote="The Hornet's performance at Midway remains the most vexed question in the historiography of that battle — not because we lack sources, but because the sources we have cannot be fully trusted."
                  attribution="— Jonathan Parshall and Anthony Tully, Shattered Sword (2005)"
                />

                <SectionHeading>Modern Reassessments</SectionHeading>

                <p>
                  The most rigorous modern reassessment of the battle came with the publication of Jonathan Parshall and Anthony Tully's <em>Shattered Sword: The Untold Story of the Battle of Midway</em> in 2005. Drawing on Japanese sources unavailable to earlier historians — including the detailed combat reports of the Kido Butai's surviving officers — Parshall and Tully were able to reconstruct the Japanese perspective with unprecedented precision.
                </p>

                <p>
                  Their analysis complicates the simple narrative that had long framed the Mitscher controversy. The timing of the American attacks — including the sacrifice of three torpedo squadrons in the minutes before the SBD Dauntlesses arrived overhead — was less the result of coordinated planning than a cascading series of near-accidents. The Japanese carriers were caught with aircraft on deck not because American planners had designed a perfect approach sequence, but because Japanese damage control was overwhelmed at a critical moment.
                </p>

                <p>
                  This does not exonerate Mitscher's decisions; it complicates them. The loss of VT-8 — and of the <em>Yorktown</em>'s Torpedo Squadron 3 and the <em>Enterprise</em>'s Torpedo Squadron 6 — was real and catastrophic. Whether those losses contributed to the eventual sinking of four Japanese carriers, or whether they were simply the tragic cost of a victory that would have occurred anyway, remains an open question.
                </p>

                <SectionHeading>Mitscher's Subsequent Career</SectionHeading>

                <p>
                  Whatever the ultimate verdict on his performance at Midway, Mitscher went on to become one of the Navy's most celebrated combat commanders. In 1944, as commander of Task Force 58, he led the fast carrier force through the Marianas campaign, the Battle of the Philippine Sea, and the operations against Japan that brought the war to its close. His handling of the nighttime recovery of his airmen following the "Marianas Turkey Shoot" — ordering his carriers to turn on their lights despite the submarine threat — became one of the defining acts of moral leadership in the Pacific War.
                </p>

                <p>
                  The man who emerged from the controversy of Midway was not destroyed by it. He was tested by it. Whether that testing revealed a commander who had made serious errors in his first major engagement and learned from them, or one who had been unfairly maligned by the fog of war and the imperfect record it leaves behind, is a judgment each reader must reach for themselves.
                </p>

                <SectionHeading>The Continuing Debate</SectionHeading>

                <p>
                  Eighty-four years after the battle, no definitive consensus has emerged. The historians who have studied Midway most closely tend toward a shared conclusion: the victory was far more contingent, far more dependent on accident and improvisation, than the clean narrative of American intelligence superiority and Japanese complacency allows. In that context, the controversy over Mitscher is not a distraction from the history of Midway — it is a window into it.
                </p>

                <p>
                  The fog of battle, the unreliability of official records composed under stress and revised in its aftermath, the competing imperatives of career protection and historical honesty — these are features of every major military engagement. They are simply more visible at Midway, because the stakes were higher, the documentation more contested, and the scrutiny more sustained.
                </p>

                <p>
                  Mitscher himself never publicly addressed the controversy in detail. He died in February 1947, before the most pointed critiques had been published. His silence — whether the product of discretion, indifference, or calculation — is itself part of the record that historians must interpret.
                </p>

                <ArticleTopics />
              </div>
            </div>

            {/* ── Sidebar ── */}
            <ArticleSidebar />
          </div>
        </div>
      </section>

      <ArticleAuthorBio authors={articleAuthors} />
      <ArticleComments />
    </>
  )
}
