import inlineImg from '@/assets/images/proceedings-confronting-cyber-threats.png'
import ArticleAuthorBio from '@/sections/ArticleAuthorBio'
import SharePopover from '@/components/ui/SharePopover'
import ArticleComments from '@/sections/ArticleComments'

const articleAuthors = [
  {
    name: 'Commander James M. Thornton, USN',
    role: 'Information Warfare Officer, Naval Cyber Forces',
    bio: 'Commander Thornton is an information warfare officer with 18 years of service in the U.S. Navy. He currently serves at Naval Cyber Forces, where he leads operational planning for fleet cyber readiness. He has deployed with carrier strike groups across INDOPACOM and has held assignments at NSA, Fleet Cyber Command, and OPNAV N2/N6.',
  },
  {
    name: 'Lieutenant Commander Sarah K. Reyes, USN',
    role: 'Cryptologic Warfare Officer, Fleet Cyber Command',
    bio: 'Lieutenant Commander Reyes is a cryptologic warfare officer serving at Fleet Cyber Command. She specializes in network defense operations and adversary threat analysis, with previous assignments at NCIS Cyber Division and the National Security Agency. She holds a master\'s degree in cybersecurity from Naval Postgraduate School.',
  },
  {
    name: 'Major David L. Park, USMC',
    role: 'Signals Officer, Marine Forces Cyberspace Command',
    bio: 'Major Park is a signals officer assigned to Marine Forces Cyberspace Command. He has extensive experience in communications security and offensive cyber operations support, with deployments to CENTCOM and INDOPACOM. He is a graduate of the Marine Corps Command and Staff College and holds a master\'s degree in computer science from the Naval Postgraduate School.',
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
              {[5,8,12,9,14,7,11,15,10,8,6,11,13,9,7,12,8,5,10,13,11,7,9,8,6,10,13,9,7,5].map((h, i) => (
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
            <span className="font-body text-xs text-neutral-subtle flex-shrink-0">11:24</span>
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
      <AdPlaceholder width={300} height={250} label="Posterboard" />
      <div className="flex justify-center">
        <AdPlaceholder width={160} height={600} label="Skyscraper" />
      </div>
    </aside>
  )
}

// ── Topics ────────────────────────────────────────────────────────────────────

const topics = ['Cybersecurity', 'Information Warfare', 'Navy', 'Marine Corps', 'Fleet Readiness']

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

export default function FortifyingArticleBody() {
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
                    he U.S. Navy and Marine Corps operate in a contested electromagnetic environment that is qualitatively
                    different from any previous era of naval warfare. Adversaries — principally China and Russia — have
                    invested heavily in cyberspace capabilities designed to blind, deceive, and degrade American naval
                    forces before a single shot is fired. The digital watch, once a secondary concern for platform
                    operators focused on kinetic threats, has become the first line of defense in every operational
                    scenario that matters.
                  </p>
                </div>

                <p className="clear-left">
                  Yet the forces assigned to stand that watch are stretched thin. Fleet Cyber Command and Marine Forces
                  Cyberspace Command have expanded their mission scope dramatically since their establishment, absorbing
                  offensive, defensive, and intelligence responsibilities simultaneously. Meanwhile, the fleet's appetite
                  for cyber support continues to grow as platforms become more networked, software-defined, and dependent
                  on data links that adversaries actively seek to exploit. The gap between demand and capacity is not a
                  temporary imbalance — it is a structural deficit that requires a structural solution.
                </p>

                <h2 className="font-headline text-[36px] text-[#060a0a] leading-[1.2] pt-2">
                  An Expanding Attack Surface at Sea
                </h2>

                <p>
                  The modern warship is a floating network. A DDG-51 Arleigh Burke-class destroyer operates hundreds of
                  interconnected systems — from combat management software and radar signal processors to logistics
                  terminals, administrative networks, and maintenance tracking databases. Each integration point that
                  improves warfighting effectiveness is also a potential attack vector. Adversary cyber operators know
                  this intimately. Chinese and Russian doctrine both envision disrupting command-and-control links and
                  degrading sensor fidelity as prerequisites for conventional military action, not adjuncts to it.
                </p>

                <p>
                  The challenge is compounded by the pace of technology insertion. The Navy's digital modernization
                  initiatives — including Project Overmatch, the Integrated Combat System, and the expansion of
                  cloud-based data architectures — are operationally essential and strategically sound. They are also
                  outpacing the cybersecurity review cycles designed to validate them. Deploying capability faster than
                  it can be hardened is not modernization; it is the creation of vulnerability at scale.
                </p>

                {/* Inline image */}
                <figure className="my-2">
                  <div className="aspect-[16/9] overflow-hidden bg-neutral-subtlest">
                    <img
                      src={inlineImg}
                      alt="Sailors conducting network operations in a ship combat information center"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
                    Sailors monitor network traffic in a ship's combat information center. Persistent crew-level
                    cybersecurity awareness is as operationally critical as radar readiness.
                    <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: U.S. Navy</span>
                  </figcaption>
                </figure>

                {/* Inline banner ad */}
                <div className="flex justify-center py-4">
                  <AdPlaceholder width={468} height={60} label="Banner" />
                </div>

                <h2 className="font-headline text-[36px] text-[#060a0a] leading-[1.2] pt-2">
                  Crew-Level Readiness Is the Decisive Layer
                </h2>

                <p>
                  Technical architecture and policy frameworks matter, but they are insufficient without a force that
                  can recognize and respond to cyber threats at the deckplate level. Human error remains the primary
                  vector for successful intrusions — phishing attempts, misconfigured access controls, and unpatched
                  systems that sailors and Marines allowed to lapse between operational cycles. The sophistication of
                  adversary toolsets makes this problem worse, not better: advanced persistent threat actors deliberately
                  craft intrusions that mimic normal network behavior precisely because they know defenders will dismiss
                  ambiguous indicators.
                </p>

                <p>
                  Current training pipelines address this partially. The Navy's Information Warfare Training Command and
                  the Marine Corps' cyberspace training programs provide foundational skills, but coverage is uneven
                  across ratings and MOS specialties. A machinist's mate or a logistics specialist who manages a
                  networked maintenance terminal is a potential entry point into shipboard systems, yet their cyber
                  hygiene training may be limited to an annual computer-based module. Adversaries do not limit their
                  targeting to IT ratings. Neither can our training.
                </p>

                <h2 className="font-headline text-[36px] text-[#060a0a] leading-[1.2] pt-2">
                  A Framework for Persistent Defense
                </h2>

                <p>
                  Closing the gap requires action across three lines of effort. First, continuous monitoring must become
                  an operational norm rather than a periodic audit function. The tools to support this exist — automated
                  anomaly detection, endpoint telemetry collection, and network traffic analysis platforms are mature
                  and fielded. The obstacle is integration: these systems generate data that exceeds the current
                  capacity of cyber operations teams to analyze and act upon. Artificial intelligence-assisted triage,
                  applied at the fleet level with human review thresholds calibrated to operational tempo, offers a
                  realistic path forward.
                </p>

                <p>
                  Second, cyber readiness must be embedded in the pre-deployment certification process with the same
                  rigor applied to engineering and damage control. A ship that cannot demonstrate network segmentation,
                  patch currency, and crew proficiency in cyber incident response should not receive a combat-ready
                  certification regardless of its kinetic readiness posture. These are not separate domains — a
                  platform that can be blinded or spoofed before it fires is not combat-ready.
                </p>

                <p>
                  Third, the joint force must develop shared awareness at the operational level. Cyber threats to a
                  carrier strike group do not respect component boundaries. Fleet Cyber Command, Marine Forces
                  Cyberspace Command, and the joint cyber mission forces need common operating picture tools and
                  streamlined information-sharing authorities that allow them to respond to distributed threats with
                  distributed forces. The current architecture is improving, but it still reflects institutional
                  boundaries that adversaries do not observe.
                </p>

                <p>
                  The digital watch cannot be fortified by cyber specialists alone. It requires a fleet that treats
                  cyber readiness as a warfighting imperative, resourced and evaluated accordingly. The adversary is
                  already inside the network boundary. The question is whether the force standing watch will be ready
                  when it matters.
                </p>

                {/* References */}
                <div className="pt-6">
                  <div className="bg-[#c4c9d4] h-px w-full mb-6" />
                  <p className="font-headline text-[28px] text-[#060a0a] leading-[1.2] mb-4">References</p>
                  <ol className="list-decimal list-inside space-y-2 font-body text-base text-neutral-subtle leading-relaxed">
                    <li>Department of Defense, <em>2023 Cyber Strategy</em>, Washington, D.C.: Office of the Secretary of Defense, 2023.</li>
                    <li>Commander, Fleet Cyber Command, "Fleet Cyber Readiness Assessment FY2025," unclassified summary, January 2026.</li>
                    <li>RAND Corporation, "Strengthening U.S. Naval Cybersecurity," Research Report RR-A1234-1, 2025.</li>
                    <li>Chief of Naval Operations, <em>Navigation Plan 2024</em>, Washington, D.C.: Department of the Navy, 2024.</li>
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
