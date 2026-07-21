import ArticleAuthorBio from '@/sections/ArticleAuthorBio'
import ArticleComments from '@/sections/ArticleComments'
import ArticleInBrief from '@/sections/ArticleInBrief'
import AdUnit from '@/components/ui/AdUnit'

import fitnessImg from '@/assets/images/proceedings-articles/fortifying/fitness-event.jpg'
import rochefortImg from '@/assets/images/proceedings-articles/fortifying/joe-rochefort.jpg'

// Article text from the live article (Proceedings, April 2026):
// https://www.usni.org/magazines/proceedings/2026/april/fortifying-digital-watch

const articleAuthors = [
  {
    name: 'Lieutenant Commander Keith Nelson, U.S. Navy',
    role: 'U.S. Navy',
    bio: 'Lieutenant Commander Nelson is a career cryptologic warfare officer. He earned a master’s of science in computer science from the Naval Postgraduate School and has led cyberwarfare operations, training programs, and international-partnership initiatives.',
  },
  {
    name: 'Lieutenant Commander Andrew Forester, U.S. Navy',
    role: 'U.S. Navy',
    bio: 'Lieutenant Commander Forester is a Navy Chaplain Corps officer. He is currently a doctoral candidate at Erskine Theological Seminary. He serves at Navy Information Operations Command, Pacific.',
  },
  {
    name: 'Lieutenant Commander Yojana Garcia, U.S. Navy',
    role: 'U.S. Navy',
    bio: 'Lieutenant Commander Garcia is a licensed clinical social worker serving as the embedded mental health provider at Cyber Group One, Hawaii. She holds a master’s degree in social work from Boise State University.',
  },
]

// ── Layout contract ───────────────────────────────────────────────────────────
// Two-column band (matches GrubbArticleBody): 1194px container = 864px reading
// column + 30px gap + 300px ad rail. All body content stays inside the
// left-aligned 864px column; the rail carries nothing but ads. Below xl the
// rail is hidden and the column centers itself.

// ── Audio Player ─────────────────────────────────────────────────────────────

function AudioPlayer() {
  return (
    <div className="border-l-4 border-[#023e7d]">
      <div className="bg-white border border-[#023e7d] border-l-0 p-4">
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

// ── Photo figure ──────────────────────────────────────────────────────────────

function PhotoFigure({
  src,
  alt,
  caption,
  credit,
}: {
  src: string
  alt: string
  caption: React.ReactNode
  credit: string
}) {
  return (
    <figure>
      <div className="overflow-hidden bg-neutral-subtlest">
        <img src={src} alt={alt} className="w-full h-auto" />
      </div>
      <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
        {caption}
        <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: {credit}</span>
      </figcaption>
    </figure>
  )
}

// ── Topics ────────────────────────────────────────────────────────────────────

const topics = ['Cybersecurity', 'Information Warfare', 'Training & Education', 'Retention', 'Navy Culture']

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
      <section className="bg-white pt-10 pb-0 overflow-x-clip">

        {/* ── Article band: left-aligned reading column + ads-only rail ── */}
        <div className="max-w-[1194px] mx-auto w-full px-4 lg:px-8">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-[30px]">

          <div className="max-w-[864px] mx-auto xl:mx-0 w-full">

            <div className="bg-[#EBF4FF] p-6 lg:p-8">
              <ArticleInBrief
                readTime="11 min read"
                items={[
                  <>By the end of fiscal year 2024, 28,000 cyber billets across the armed services sat vacant&mdash;and the Navy's policy fixes for retention remain halting and incomplete.</>,
                  <>&ldquo;Warrior Toughness&rdquo; is written for the whole Navy, but cyber sailors fight a cognitive battle&mdash;the model needs a cyber-specific refit.</>,
                  <>A &ldquo;Cyber TOPGUN&rdquo; built on nine institutional practices would retain elite talent and benefit every high-cognition community in the fleet.</>,
                ]}
              />
            </div>

            <div className="mt-6">
              <AudioPlayer />
            </div>

            <div className="font-body text-[16px] lg:text-[18px] text-[#1d2535] leading-[1.5] space-y-8 article-body mt-6">

              {/* Drop cap paragraph */}
              <div className="relative">
                <div
                  className="float-left bg-navy-bolder flex items-center justify-center mr-4 mb-1 flex-shrink-0 select-none"
                  style={{ width: 72, height: 72 }}
                  aria-hidden="true"
                >
                  <span className="font-headline text-[52px] text-white leading-none">T</span>
                </div>
                <p>
                  he U.S. Navy's cyber operators will play a key role in the fight of the future. Yet too many cyber
                  billets sit vacant just as the service most needs to be training and integrating these warriors. At
                  the root of the issue are gaps between Navy traditions and the values of the broader cyber
                  community, as well as stark differences between the &ldquo;warrior toughness&rdquo; demanded of most
                  sailors and the physical, mental, and constitutional traits a cyber operator must possess to
                  succeed.
                </p>
              </div>

              <p className="clear-left">
                But the Navy has faced even more acute reckonings in the past. When naval aviation ran into crisis
                during the Vietnam War, the service's response&mdash;including the founding of the Navy Fighter
                Weapons School (TOPGUN)&mdash;helped stem the rate of losses and ensured U.S. naval aviators would be
                the world's best for decades to come.
              </p>

              <p>
                The Navy needs a similar approach now to stop cyber operators from walking out the door. To retain
                cyber talent, the Navy must revisit Warrior Toughness and develop a model that fits the specific
                needs of cyber warriors. Further, to ensure the service consistently trains the best cyber operators,
                then retains them and places them throughout the force, the development of that model should
                culminate with a program for cyber personnel similar to TOPGUN. The benefits would permeate beyond
                cyber to every high-cognition community in the service.
              </p>

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                The Navy's Cyber Talent Crisis
              </h2>

              <p>
                By the end of fiscal year 2024, 28,000 cyber billets across the armed services sat vacant&mdash;about
                16 percent of the uniformed and civilian force&mdash;and some 4,000 qualified operators had walked
                away.<sup>1</sup> A Government Accountability Office audit amplified the alarm, finding that
                mismatched manpower databases jam training pipelines and conceal readiness risk.<sup>2</sup>
              </p>

              <p>
                Policy fixes to aid retention are halting and incomplete.<sup>3</sup> The service needs to develop a
                resilience model for keyboard warriors&mdash;one built for overnight malware hunts, cognitive
                overload, and introvert-heavy teams.
              </p>

              <p>
                To develop a model that retains the best cyber talent, the Navy must understand their culture.
                Today's cyber warriors echo their cryptologic ancestors: brilliant, blunt, and allergic to
                bureaucracy. Battle of Midway codebreaker Captain Joe Rochefort was &ldquo;quirky, touchy . . .
                arrogant and irascible.&rdquo;<sup>4</sup> Lieutenant Grace Hopper kept the Harvard Mark I humming
                through &ldquo;irreverence bordering on insubordination.&rdquo;<sup>5</sup> The fleet needs to keep
                that edge but has not built a structure that can house it.
              </p>

              <PhotoFigure
                src={fitnessImg}
                alt="Sailors from U.S. Fleet Cyber Command participate in a fitness event in 2023"
                caption={
                  <>
                    Sailors from U.S. Fleet Cyber Command participate in a fitness event in 2023. Physical fitness is
                    important to the health of all sailors, but cyber sailors need a different definition of Warrior
                    Toughness.
                  </>
                }
                credit="U.S. Navy (Jon Dasbach)"
              />

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                A Culture Clash
              </h2>

              <p>
                The Navy took a step in the right direction with Warrior Toughness 2.0. Nested inside the Navy's
                Culture of Excellence, the program equips sailors with on-the-spot performance drills and
                team-building approaches, such as box breathing before advancement exams, quick recalibrations during
                screening boards, and sea stories shared on the mess-decks to defuse stress and create cohesion. The
                initiative empowers sailors to fortify their minds, bodies, and spirits without tying leaders to
                another checklist.
              </p>

              <p>
                But &ldquo;toughness&rdquo; still conjures push-ups and physical grit, and that idea is a mismatch
                for keyboard warriors whose fight is cognitive. Warrior Toughness is written for the whole Navy, but
                it needs a cyber-specific refit. Cyber sailors need the cerebral fortitude to untangle hostile code,
                the drive to master deep protocols, the analytic stamina to stay in hack mode for hours, and the
                mental conditioning to see a solution through. When cyber talent leaves the Navy, the fleet loses
                those strengths&mdash;and it cannot afford the loss.
              </p>

              <p>
                The service needs a version of Warrior Toughness that gives Navy cyber the language, tools, and
                culture to command the fight in the stormy seas of cyberspace&mdash;and the ability to understand
                these sailors and steward them through the challenges of their unique missions.
              </p>

              <p>
                High-cognition areas such as cyber draw different kinds of operators&mdash;and different challenges
                as well. Depression, anxiety, and silent despair stalked high performers long before
                &ldquo;cyber&rdquo; became a warfare area. Admiral Raymond Spruance spent his career masking mood
                swings. Rear Admiral Hopper wrestled with suicidal ideations.<sup>6</sup> Their stories echo across
                today's watch floors, but far too many sailors still choose to struggle in silence rather than seek
                help.
              </p>

              <p>
                Culture is the reason. Navy tradition prizes vocal confidence and extroverted leadership qualities.
                Cyber as a discipline, however, attracts people with analytical minds and introverted personalities,
                a trend confirmed by cyber schoolhouse surveys. Faking extroversion just to be heard burns cognitive
                fuel, but operators who choose not to do so seem to confirm the myth that &ldquo;silent&rdquo; equals
                &ldquo;unmotivated.&rdquo;
              </p>

              <p>
                High performers also experience much higher rates of neurodivergence, including autism-spectrum
                traits, attention-deficit/hyperactivity disorder, and other differences in cognitive function that
                characterize 15&ndash;20 percent of humans.<sup>7</sup> Some of the fleet's finest packet wizards
                parse hex in seconds but struggle with small talk and time management. Masking these differences to
                fit in drains morale and accelerates burnout.
              </p>

              <p>
                Toxic microclimates magnify every stressor. Sailors who were bullied in school or at work seldom
                forget the experience, and when they serve under leaders who reward volume over insight, they slip
                into malicious compliance or look for ways to leave the service.
              </p>

              <p>
                Navy policy is improving. The Brandon Act, introduced in 2021 after Petty Officer Brandon Caserta's
                suicide, lets any service member confidentially self-refer for mental health care. The Navy Mental
                Health Playbook admits that the process of accessing needed care can be confusing and vows to clarify
                it.<sup>8</sup> Still, it often takes four to six weeks to arrange specialty appointments. Further,
                the idea persists that if a sailor admits to depression, they will lose their security clearance.
                That keeps many sailors from trying.
              </p>

              <p>
                Warrior Toughness 1.0&mdash;built on push-ups and loud motivation&mdash;was incomplete. Warrior 2.0
                is an improvement, but the service still needs an upgrade to its command culture so the quietest
                voice may raise a red flag when it counts.
              </p>

              {/* Centered ad at the mid-article break */}
              <AdUnit size="leaderboard" />

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                Shared Identity and Personal Ethos
              </h2>

              <PhotoFigure
                src={rochefortImg}
                alt="Today's cyber warriors take inspiration from their cryptologic ancestors, such as Battle of Midway codebreaker Captain Joe Rochefort"
                caption={
                  <>
                    Today's cyber warriors take inspiration from their cryptologic ancestors, such as Battle of
                    Midway codebreaker Captain Joe Rochefort.
                  </>
                }
                credit="Naval History and Heritage Command"
              />

              <p>
                A future Cyber TOPGUN would forge leaders who could help guide the Navy toward a version of Warrior
                Toughness that would draw and retain cyber talent. It also would institutionalize a durable Navy
                cyber identity that fuses naval lineage with civilian trailblazers.
              </p>

              <p>
                The foundational building blocks exist in the Navy's own history. Rear Admiral Hopper liked to remind
                audiences the first large-scale digital computer was a &ldquo;Navy computer operated by a Navy
                crew,&rdquo; anchoring the story in uniform. But civilian visionaries provide equally strong
                inspiration: Vannevar Bush sketched the web-like Memex, Alan Turing mapped thinking machines, and
                J.C.R. Licklider imagined human-computer symbiosis. Today's cyber sailors inherit a hybrid legacy of
                naval discipline and civilian daring that is unique in the service.
              </p>

              <p>
                From that heritage flows an ethos. The original hackers of MIT's Tech Model Railroad Club prized
                relentless curiosity. Their productivity and solutions became legendary. Author Steven Levy distilled
                their creed, which prized core values such as transparency, decentralization, and a hands-on
                imperative.<sup>9</sup> Eric S. Raymond cautioned that &ldquo;attitude is no substitute for
                competence.&rdquo;<sup>10</sup>
              </p>

              <p>
                Storm-tossed metaphors resonate with cyber operators: Technology shifts like weather and rewards
                those who sail into the squall. Moral courage in hackers expresses itself as the instinct to
                challenge brittle processes. Steve Jobs flew a pirate flag with a Macintosh logo as an eyepatch and
                declared it is &ldquo;better to be a pirate than join the Navy,&rdquo; capturing a rebel spark he
                wanted his company not to smother with bureaucracy.<sup>11</sup> The Navy also must harness that
                spirit.
              </p>

              <p>
                Yet, even pirates need ballast. Jobs maintained a quiet practice of weekly zazen&mdash;seated
                meditation&mdash;with S&#333;t&#333; Zen priest K&#333;bun Chino Otogawa, because sustained
                creativity draws on disciplined stillness as much as caffeine and code. A moment of shared silence at
                watch turnover can deliver the same centering effect without ceremony. It should be just long enough
                to steady breathing and recall the humans at each end of the network&mdash;a routine to free
                cognitive memory before the next exploit fires.
              </p>

              <p>
                Mystery swirls through naval cyber lore. Cryptologic projects carry codenames that read like spells.
                Cold War red teamers hired stage magicians to expose sleight of hand, and technical manuals still
                call elite coders &ldquo;wizards.&rdquo; The language is more than color&mdash;it legitimizes the
                frank talk about conscience and purpose that creates an invisible mesh to keep a watch team coherent.
              </p>

              <p>
                To tend that mesh&mdash;not only in the cyber community but throughout the fleet&mdash;the Chaplain
                Corps has released the Assessment Battery for Spiritual Readiness (ABSR). The tool serves two
                audiences: For watchstanders, it prescribes a private, three-minute check-in composed of 21 prompts
                on gratitude, forgiveness, and hope. The check-in produces a personal snapshot the sailor can keep or
                delete. No chain of command sees the raw answers, but for command leaders, the battery produces an
                anonymized rollup that reveals trends&mdash;spikes in anxiety, dips in gratitude&mdash;without
                identifying any sailor. This allows commanders to detect stress early and patch morale fast. Used
                properly, it can help keep the consoles manned.
              </p>

              <p>
                ABSR&mdash;voluntary, belief-neutral, and fleetwide&mdash;could be crucial for communities such as
                cyber. It invites commands to initiate conversations about spiritual wellness and mental toughness
                that weld teams together before a zero-day exploit slips past the perimeter on the midwatch.
              </p>

              <p>
                But ethos alone will not hold without leadership scaffolding. Modern playbooks such as servant
                leadership, good to great, and agile are modeled on naval success stories such as Station Hypo's
                protected creativity and Admiral Nimitz' psychologically safe staff culture. The playbooks share some
                of the same threads needed to keep a cyber team together, such as trimmed bureaucracy, selective
                recruiting, humility fused to a strong will, and an obsessive focus on growing subordinates. These
                protocols translate hacker virtues into command practice.
              </p>

              <div className="bg-[#c4c9d4] h-px w-full" />

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                A TOPGUN for Hackers
              </h2>

              <p>
                Naval aviation faced a reckoning in 1968 when it suffered unsustainable losses over Vietnam. TOPGUN
                was founded and the following year reversed the kill ratio.<sup>12</sup> Navy cyber faces a similar
                challenge today. Cyber threats are relentless, and talent bleed imperils mission success in much the
                same way losses of F-4 aircraft did in Vietnam. A cyber-equivalent TOPGUN should launch before drift
                hardens into defeat.
              </p>

              <p>
                The specialized training would benefit from nine institutional practices that blend modern management
                science with Navy heritage. Each practice transfers to other intellect-heavy specialties, meaning
                that a Cyber TOPGUN that incorporates Warrior Toughness with a cyber-specific refit would benefit the
                whole fleet:
              </p>

              <ul className="list-disc pl-6 space-y-3">
                <li>
                  Provide an on-demand, personalized mental-health ecosystem. This should mirror best-in-class
                  corporate wellness practices to keep minds sharp in cyber cells, intelligence watch floors, and
                  nuclear engineering control rooms.
                </li>
                <li>
                  Emphasize whole-body readiness for console warriors. Emphasis should be on ergonomic consoles and
                  targeted physical therapy to reduce back, neck, and wrist injuries.
                </li>
                <li>
                  Offload and automate administrative workflow. Strip non-value chores so experts work within their
                  expertise&mdash;this is important for reactor technicians, satellite operators, and cryptology
                  linguists.
                </li>
                <li>
                  Instill heritage-driven culture and recognition. Development and promulgation of culture is equally
                  powerful for intelligence analysts, divers, and nuclear engineers&mdash;communities that prize
                  insider lore.
                </li>
                <li>
                  Focus on relentless skill sharpening (WTI paths, skills Olympics, etc.). A continuous learning
                  model &agrave; la SpaceX or Google keeps any technical cadre on the cutting edge.
                </li>
                <li>
                  Build human-centric workspaces. Biophilic lighting, circadian watch bills, and quiet zones lift
                  cognition. Perfecting such workspaces also benefits combat information center crews, sonar stacks,
                  and engine-room watch teams.
                </li>
                <li>
                  Leverage native tech skill. Let digital natives teach upward. This core servant-leadership practice
                  scales across the fleet.
                </li>
                <li>
                  Perfect AI-enabled human-machine teaming. Develop a &ldquo;copilot&rdquo; model that curates data
                  and filters out noise; this is priceless for ISR cells, space operations, and sonar analysis.
                </li>
                <li>
                  Teach cryptologic lessons. A fast-feedback, safe-to-fail ethos suits autonomous-systems detachments
                  and expeditionary logistics.
                </li>
              </ul>

              {/* Inline fallback ad below xl (the ad rail takes over at xl) */}
              <div className="xl:hidden">
                <AdUnit size="rectangle" />
              </div>

              <p>
                A Cyber TOPGUN built on these nine practices would forge elite packet pilots and propagate best
                practices across every brain-powered warfare specialty. It would also create a space within which the
                Navy's cyber operators could define their values and forge, on their own terms, the warrior toughness
                they will require to help win the next war.
                <span className="inline-flex items-baseline ml-2 text-navy-bolder" aria-hidden="true">
                  <i className="fa-solid fa-anchor text-[14px]" />
                </span>
              </p>

              {/* References */}
              <div className="pt-6">
                <div className="bg-[#c4c9d4] h-px w-full mb-6" />
                <p className="font-headline text-[28px] text-[#060a0a] leading-[1.2] mb-4">References</p>
                <ol className="list-decimal list-inside space-y-2 font-body text-base text-neutral-subtle leading-relaxed">
                  <li>Lauren C. Williams, &ldquo;Pentagon Puts a Dent in Cyber Workforce Vacancies,&rdquo; <em>Defense One</em>, 7 November 2024.</li>
                  <li>Government Accountability Office, <em>Cyber Personnel, Navy Needs to Address Accuracy of Workforce Data</em>, GAO-24-106879 (Washington, DC: GAO), 13 May 2024.</li>
                  <li>C. Todd Lopez, &ldquo;For Service Members, Access to Mental Health Care Streamlined Under Brandon Act,&rdquo; <em>DoD News</em>, 22 January 2024.</li>
                  <li>Elliot Carlson, <em>Joe Rochefort's War: The Odyssey of the Codebreaker Who Outwitted Yamamoto at Midway</em> (Annapolis, MD: Naval Institute Press), 2011.</li>
                  <li>Kurt W. Beyer, <em>Grace Hopper and the Invention of the Information Age</em> (Cambridge, MA: MIT Press), 2011.</li>
                  <li>Kurt W. Beyer, <em>Grace Hopper and the Invention of the Information Age</em>.</li>
                  <li>Northwestern Medicine, &ldquo;Understanding Neurodiversity,&rdquo; April 2024, https://www.nm.org/healthbeat/healthy-tips/Understanding-Neurodiversity.</li>
                  <li>Chief of Naval Personnel (N17), <em>Navy Mental Health Playbook</em>, February 2023.</li>
                  <li>Steven Levy, <em>Hackers: Heroes of the Computer Revolution</em> (New York: Doubleday), 1984.</li>
                  <li>Eric S. Raymond, <em>The Cathedral &amp; the Bazaar: Musings on Linux and Open Source by an Accidental Revolutionary</em> (Sebastopol, CA: O'Reilly Media), 1999.</li>
                  <li>Tim Maughan, &ldquo;A Buccaneering Spirit Is Not Piracy's Only Gift to Business,&rdquo; <em>WIRED</em>, 2 October 2012.</li>
                  <li>Center for Naval Analyses, <em>TOPGUN Turns 50&mdash;Quick Facts</em> (Arlington, VA: CAN), 2019.</li>
                </ol>
              </div>

            </div>

            <div className="bg-[#c4c9d4] h-px w-full mt-10" />
            <ArticleTopics />

          </div>

          {/* ── Right rail: ads only, staggered down the article's height.
              Ratio spacers keep the second rail ad clear of the in-body
              leaderboard (same contract as GrubbArticleBody). ── */}
          <aside className="hidden xl:flex xl:flex-col" aria-label="Advertisements">
            <AdUnit size="rectangle" />
            <div className="flex-[3]" aria-hidden="true" />
            <AdUnit size="rectangle" />
            <div className="flex-[4]" aria-hidden="true" />
            <AdUnit size="rectangle" />
            <div className="flex-[4]" aria-hidden="true" />
            <AdUnit size="rectangle" />
          </aside>

          </div>
        </div>
      </section>

      <ArticleAuthorBio authors={articleAuthors} />
      <ArticleComments />
    </>
  )
}
