import inlineImg from '@/assets/images/proceedings-prepare-marine-corps.png'
import ArticleAuthorBio from '@/sections/ArticleAuthorBio'
import SharePopover from '@/components/ui/SharePopover'
import ArticleComments from '@/sections/ArticleComments'

const articleAuthors = [
  {
    name: 'Corporal Richard Sweeney III',
    role: 'U.S. Marine Corps Reserve',
    bio: 'Corporal Sweeney is a rifleman with 2nd Battalion, 24th Marines, 4th Marine Division. He holds a degree in political science from the University of Notre Dame, where he focused on national security and military force structure. He has participated in multiple amphibious exercises with I and II MEF.',
  },
]

// ── Ad components ─────────────────────────────────────────────────────────────

function AdFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F4F4F6] p-2 border border-[#C4C9D4]">
      {children}
    </div>
  )
}

function AdPlaceholder({
  width,
  height,
  label,
}: {
  width: number
  height: number
  label: string
}) {
  return (
    <AdFrame>
      <div
        className="bg-[#DDE1E7] flex flex-col items-center justify-center gap-1"
        style={{ width, height }}
      >
        <span className="font-body text-xs font-semibold text-neutral-subtle uppercase tracking-wider">
          Advertisement
        </span>
        <span className="font-body text-[11px] text-neutral-subtle/60">
          {label} · {width} × {height}
        </span>
      </div>
    </AdFrame>
  )
}

// ── Audio Player ─────────────────────────────────────────────────────────────

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
              {[4,6,10,8,12,7,9,14,11,8,6,10,13,9,7,11,8,5,9,12,10,7,11,8,6,9,12,10,8,6].map((h, i) => (
                <div
                  key={i}
                  className="w-[3px] rounded-sm flex-shrink-0"
                  style={{
                    height: `${h * 2}px`,
                    backgroundColor: i < 8 ? '#E85D04' : '#C0B9A8',
                  }}
                />
              ))}
            </div>
            <span className="font-body text-xs text-neutral-subtle flex-shrink-0">8:42</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────


function ArticleSidebar() {
  return (
    <aside className="flex flex-col gap-6">

      {/* Posterboard ad */}
      <AdPlaceholder width={300} height={250} label="Posterboard" />

      {/* Skyscraper ad */}
      <div className="flex justify-center">
        <AdPlaceholder width={160} height={600} label="Skyscraper" />
      </div>

    </aside>
  )
}

// ── Topics ────────────────────────────────────────────────────────────────────

const topics = ['Marine Corps', 'Force Structure', 'Pacific Strategy', 'Amphibious Operations']

function ArticleTopics() {
  return (
    <div className="pt-8 pb-8">
      <p className="font-body font-medium text-[18px] uppercase tracking-[1px] text-[#1d2535] mb-4">
        Topics
      </p>
      <div className="flex flex-wrap gap-3">
        {topics.map((tag) => (
          <a
            key={tag}
            href={`/proceedings/series?topic=${encodeURIComponent(tag.toLowerCase())}`}
            className="font-body font-bold text-base text-[#023e7d] border border-[#023e7d] px-4 py-2 hover:bg-surface-subtle transition-colors"
          >
            {tag}
          </a>
        ))}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ArticleBody() {
  return (
    <>
      <section className="bg-white pt-10 pb-0">
        <div className="max-w-[1090px] mx-auto w-full px-4 lg:px-8">
          <div className="flex gap-10 xl:gap-12 items-start">

            {/* ── Main content column ── */}
            <div className="flex-1 min-w-0">

              <AudioPlayer />

              {/* Article body */}
              <div className="font-body text-[16px] lg:text-[18px] text-[#1d2535] leading-[1.5] space-y-6 article-body">

                {/* Drop cap paragraph */}
                <div className="relative overflow-hidden">
                  <div
                    className="float-left bg-navy-bolder flex items-center justify-center mr-4 mb-1 flex-shrink-0 select-none"
                    style={{ width: 72, height: 72 }}
                    aria-hidden="true"
                  >
                    <span className="font-headline text-[52px] text-white leading-none">T</span>
                  </div>
                  <p>
                    he United States Marine Corps maintains three Marine Expeditionary Forces — I&nbsp;MEF at Camp
                    Pendleton, II&nbsp;MEF at Camp Lejeune, and III&nbsp;MEF at Okinawa. For nearly four decades, this
                    structure has served as the foundation of America's expeditionary naval capability. Yet today's
                    operating environment — defined by simultaneous coercion campaigns from China, Russia, Iran, and North
                    Korea — demands a force structure designed for sustained, multi-theater competition. Three MEFs cannot
                    deliver that.
                  </p>
                </div>

                <p className="clear-left">
                  The assertion is not a critique of individual Marine units, which remain among the most capable
                  expeditionary forces on earth. It is a critique of capacity. When planners map current combatant
                  commander requirements against available MEF resources, the numbers do not add up. INDOPACOM needs
                  III&nbsp;MEF's amphibious assault capability to deter Chinese aggression across the first island chain.
                  EUCOM needs II&nbsp;MEF's capacity to reassure NATO allies along Europe's eastern flank. CENTCOM
                  requires continuous rotational presence to maintain access and reassure Gulf partners. SOUTHCOM and
                  AFRICOM make steady demands as well. The result is a Corps with no true strategic reserve.
                </p>

                <h2 className="font-headline text-[36px] text-[#060a0a] leading-[1.2] pt-2">
                  A Force Built for Sequential Conflict
                </h2>

                <p>
                  The current MEF structure was optimized for the post-Cold War era of sequential engagements and
                  uncontested maritime access. Each MEF commands approximately 50,000 Marines and sailors — together with
                  the ground combat element, aviation combat element, and logistics combat element needed to conduct
                  independent joint operations. In theory, the Marine Corps can surge any combination of these forces to
                  meet a contingency. In practice, simultaneous demands have stretched this construct to its structural
                  limits.
                </p>

                <p>
                  Military history offers few examples of major powers successfully sustaining two-theater warfighting
                  capacity without either a large standing army or a well-resourced reserve. The Marine Corps possesses
                  both active and reserve components, yet they are not currently organized, equipped, or trained to
                  function as a fourth operational MEF. That gap is not inevitable — it is a resource and policy choice
                  that can be reversed.
                </p>

                {/* Inline image */}
                <figure className="my-2">
                  <div className="aspect-[16/9] overflow-hidden bg-neutral-subtlest">
                    <img
                      src={inlineImg}
                      alt="Marine Corps expeditionary training operations"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
                    Marines conduct combined-arms live-fire training at Twentynine Palms. Sustained multi-theater
                    capability requires a larger rotational base than three MEFs can provide.
                    <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: U.S. Marine Corps</span>
                  </figcaption>
                </figure>

                {/* Inline banner ad */}
                <div className="flex justify-center py-4">
                  <AdPlaceholder width={468} height={60} label="Banner" />
                </div>

                <h2 className="font-headline text-[36px] text-[#060a0a] leading-[1.2] pt-2">
                  The Force Generation Problem
                </h2>

                <p>
                  The problem is not only numbers — it is regeneration time. A Marine Expeditionary Unit, the building
                  block of MEF-level operations, requires roughly 18 months from return to re-deployment-ready status.
                  With three MEFs, the Corps maintains a rotation base that leaves almost no strategic reserve. A major
                  contingency in the Western Pacific would immediately strip II&nbsp;MEF of aviation and logistics combat
                  elements to reinforce I and III&nbsp;MEFs. That is not a theoretical concern — it is the current
                  planning reality facing the service today.
                </p>

                <p>
                  Advocates for Force Design 2030 will rightly note that the Marine Corps has made important structural
                  reforms, distributing forces across the Pacific, adding long-range fires, and shedding legacy tank and
                  infantry battalion capacity in favor of lighter, more dispersible formations. Those reforms improve the
                  quality of what three MEFs can do within a single theater. They do not resolve the fundamental capacity
                  problem of operating across two theaters simultaneously while sustaining deterrence in a third.
                </p>

                <h2 className="font-headline text-[36px] text-[#060a0a] leading-[1.2] pt-2">
                  A Path to Four MEFs
                </h2>

                <p>
                  Establishing a fourth Marine Expeditionary Force is not a new idea — it has surfaced periodically in
                  service planning discussions for over a decade. What has changed is the urgency. A IV&nbsp;MEF built
                  around the Marine Reserve's existing 4th Marine Division, 4th Marine Aircraft Wing, and 4th Marine
                  Logistics Group could provide the strategic reserve the Corps currently lacks without requiring a
                  significant increase in active-duty end strength.
                </p>

                <p>
                  The key investment is readiness infrastructure. Reserve units today lack consistent access to amphibious
                  shipping for training, limited pre-positioned equipment sets in key theaters, and constrained annual
                  training days relative to operational requirements. Targeted congressional action on each of these areas
                  — shipping access agreements, pre-positioned materiel in Guam and Diego Garcia, and expanded training
                  authorizations — could move IV&nbsp;MEF from concept to operational reality within a single
                  Future Years Defense Program cycle. The force structure already exists. The political will to resource
                  it is the missing ingredient.
                </p>

                {/* References */}
                <div className="pt-6">
                  <div className="bg-[#c4c9d4] h-px w-full mb-6" />
                  <p className="font-headline text-[28px] text-[#060a0a] leading-[1.2] mb-4">References</p>
                  <ol className="list-decimal list-inside space-y-2 font-body text-base text-neutral-subtle leading-relaxed">
                    <li>Congressional Budget Office, "Options for Restructuring the Marine Corps," November 2025.</li>
                    <li>Force Design Working Group, "MEF Capacity Analysis: 2025 Update," Marine Corps Combat Development Command, Quantico, VA.</li>
                    <li>Lieutenant General (Ret.) Robert Schmidle, "The Case for a Fourth MEF," <em>Proceedings</em>, March 2025, 44–49.</li>
                  </ol>
                </div>

              </div>

              <div className="bg-[#c4c9d4] h-px w-full mt-10" />
              <ArticleTopics />
            </div>

            {/* ── Ad rail ── */}
            <div className="hidden lg:block flex-shrink-0 w-[320px]">
              <ArticleSidebar />
            </div>

          </div>
        </div>
      </section>

      <ArticleAuthorBio authors={articleAuthors} />
      <ArticleComments />
    </>
  )
}
