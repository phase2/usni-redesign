import ArticleAuthorBio from '@/sections/ArticleAuthorBio'
import ArticleComments from '@/sections/ArticleComments'
import ArticleInBrief from '@/sections/ArticleInBrief'
import ArticleAudioPlayer from '@/sections/ArticleAudioPlayer'
import AdUnit from '@/components/ui/AdUnit'

import iwoJimaImg from '@/assets/images/proceedings-articles/mefs/iwo-jima-briefing.jpg'
import hornetsImg from '@/assets/images/proceedings-articles/mefs/fa18-hornets.jpg'
import musterImg from '@/assets/images/proceedings-articles/mefs/reserve-muster.jpg'

// Article text from the live article (Proceedings, April 2026):
// https://www.usni.org/magazines/proceedings/2026/april/three-mefs-wont-be-enough

const articleAuthors = [
  {
    name: 'Corporal Richard Sweeney III, U.S. Marine Corps Reserve',
    role: 'U.S. Marine Corps Reserve',
    bio: 'Corporal Sweeney is a reserve military policeman assigned to 4th Law Enforcement Battalion. He holds degrees in history and political science from the Pennsylvania State University.',
  },
]

// ── Layout contract ───────────────────────────────────────────────────────────
// Two-column band (matches GrubbArticleBody): 1194px container = 864px reading
// column + 30px gap + 300px ad rail. All body content stays inside the
// left-aligned 864px column; the rail carries nothing but ads. Below xl the
// rail is hidden and the column centers itself.

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

const topics = ['Marine Corps', 'Force Structure', 'Reserve Forces', 'Great Power Competition', 'Readiness']

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
      <section className="bg-white pt-10 pb-0 overflow-x-clip">

        {/* ── Article band: left-aligned reading column + ads-only rail ── */}
        <div className="max-w-[1194px] mx-auto w-full px-4 lg:px-8">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-[30px]">

          <div className="max-w-[864px] mx-auto xl:mx-0 w-full">

            <div className="bg-[#EBF4FF] p-6 lg:p-8">
              <ArticleInBrief
                readTime="8 min read"
                items={[
                  <>To prepare for mass casualties in a great power war, the Marine Corps should reactivate the 5th and 6th Marine Division headquarters as the ground combat elements of new V and VI MEFs.</>,
                  <>From Kitchener's Army to Ukraine and Israel, history shows professional militaries deplete quickly&mdash;and that framework units built in advance absorb new troops fastest.</>,
                  <>Both divisions went from scratch to combat-ready in about 11 months during World War II&mdash;evidence the timeline works without sacrificing quality.</>,
                ]}
              />
            </div>

            <div className="mt-6">
              <ArticleAudioPlayer src="https://player.instaread.co/player?article=three-mefs-wont-be-enough&amp;publication=usni.org&amp;article_url=https%3A%2F%2Fwww.usni.org%2Fmagazines%2Fproceedings%2F2026%2Fapril%2Fthree-mefs-wont-be-enough&amp;pay_wall=true&amp;redirect=https%3A%2F%2Fwww.usni.org%2Fjoin&amp;locked_message=Members%3A%20Sign%20in%20to%20listen&amp;version=1784748000000" />
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
                  he United States is coming to terms with the possibility of another great power war. Although such
                  a war's specific characteristics cannot be known, one thing is almost guaranteed: The United States
                  must prepare to respond to mass casualties. In the Pacific, the Marine Corps must face the
                  probability of thousands wounded or killed during the conflict's opening months. To prepare to
                  replace those Marines expeditiously, the Marine Corps should reactivate the headquarters components
                  of the 5th and 6th Marine Divisions along with those of their accompanying major subordinate
                  commands.
                </p>
              </div>

              <p className="clear-left">
                These divisions should comprise the ground combat elements of newly created V and VI Marine
                Expeditionary Forces (MEFs), giving the Marine Corps&mdash;at least on paper&mdash;a strength of six
                MEFs (if a potential IV MEF is organized from Marine Forces Reserve).
              </p>

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                History Rhymes
              </h2>

              <p>
                History shows the pros and cons of fielding a standing, professional military. Prior to 1914, the
                British Army was considered one of the best in the world&mdash;certainly in its own
                eyes.<sup>1</sup> Relying strictly on volunteers, it was able to maintain order throughout the Empire
                and defeat threats to its colonies. British soldiers were well trained and equipped, and many saw
                combat in Britain's colonial wars.<sup>2</sup>
              </p>

              <PhotoFigure
                src={iwoJimaImg}
                alt="Marines from the 5th Marine Division hold a battlefield briefing during their advance up the west coast of Iwo Jima on 25 February 1945"
                caption={
                  <>
                    Marines from the 5th Marine Division hold a battlefield briefing during their advance up the west
                    coast of Iwo Jima on 25 February 1945.
                  </>
                }
                credit="U.S. Marine Corps / Vanguardmil.com"
              />

              <p>
                However, at the Battle of Mons in 1914, the first battle of World War I involving the United Kingdom,
                the 100,000 mostly professional soldiers of the British Expeditionary Force were forced to retreat by
                the far greater numbers of the Imperial German 1st Army.<sup>3</sup> While the Imperial German Army
                also was highly professionalized and employed a command philosophy that promoted initiative at the
                small-unit level, British soldiers were more experienced. Furthermore, many British soldiers spent
                their entire careers in the army, as opposed to German soldiers, who were usually conscripted for a
                certain duration, then kept on reserve status. This dichotomy meant that although British soldiers
                usually had more combat experience at an individual level, Germany had more with military experience.
                Those could be reassimilated into the army rapidly and deployed to the Western Front.
              </p>

              <p>
                As casualties mounted, the British sought solutions to replace battlefield losses. First there were
                the &ldquo;Pals Battalions,&rdquo; which encouraged groups of men to enlist and serve together. After
                this produced insufficient numbers, conscription began in 1916. The vast increase in numbers forced
                the British Army to create dozens of new divisions built from conscripts and wartime volunteers. This
                so-called Kitchener's Army&mdash;named for Herbert Kitchener, the Secretary of State for
                War&mdash;comprised the majority of the British Army on Armistice Day.
              </p>

              <p>
                In the United States, the beginning of the all-volunteer force in the mid-1970s professionalized the
                military, which helped it recover institutionally from the Vietnam War. This has been a net positive,
                helping the United States achieve unparalleled military dominance since the late 20th century,
                beginning with the defeat of the Iraqi Army in 1991. The U.S. military is regarded as the world's
                best, largely because of the training and experience of its members. The military rise of China,
                however, has put the U.S. military into a position like that occupied by the United Kingdom in the
                early 20th century: a superpower with an experienced, well-trained, yet comparatively small military
                it claims to be the world's best, facing a rising power with a much larger, also well-trained, but
                inexperienced military.
              </p>

              <p>
                The recent experiences of Ukraine and Israel have demonstrated the limits of professional militaries.
                High casualty rates for Ukraine and prolonged deployments to frontline areas for Israel have depleted
                both countries' supply of well-trained soldiers&mdash;and left exhausted those who
                remain.<sup>4</sup> The Marine Corps will face something similar during a peer conflict. The service
                almost certainly would play the principal role in heavy combat operations from the onset of any war
                in the Indo-Pacific but still be expected to lead the way to victory in a war that is likely to be
                long. To succeed, the service will need to change its system to absorb a rapid influx of recruits,
                whether volunteer or conscript, and train them to meet the standards of Marines.
              </p>

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                Getting It Done
              </h2>

              <p>
                Minimally staffing new MEFs would offer one possible solution. Reactivate the headquarters of the 5th
                and 6th Marine Divisions&mdash;both created during World War II&mdash;and the headquarters of their
                subordinate units down to the battalion level. Each division would have a corresponding aircraft wing
                and logistics group, forming the administrative structure of a complete MEF.
              </p>

              <p>
                Each division would be given the same table of organization as the existing divisions, including
                artillery, light-armored reconnaissance, combat engineering, reconnaissance, and assault amphibians,
                making it combat effective almost from the moment it reaches required wartime staffing levels. The
                air combat element would be the only exception: Because of the financial costs associated with
                military aviation, the squadrons of these new aircraft wings would have three-quarters of the
                aircraft normally assigned to an active-duty squadron. And until newer aircraft were procured, these
                new squadrons would field older platforms such as the F/A-18C/D and CH-53E as stopgaps. The logistics
                groups, like the division, would be fully equipped with all necessary mat&eacute;riel. Finally, each
                new MEF would have its own information group, including intelligence, communication, radio, and air
                and naval gunfire liaison companies.
              </p>

              <p>
                A reserve unit's inspector and instructor (I&amp;I) functions are performed by active-duty and
                activated Marine Corps Reserve personnel, who manage, train, and equip the unit. The new MEFs would
                be staffed in a similar way, because activated reserve Marines would be the most experienced working
                in an I&amp;I-type environment. Each battalion would be assigned a commander, a senior enlisted
                advisor, and the staff to perform key functions, such as administration, motor transport, and armory.
                Marines from the active or Selected Marine Corps Reserve (SMCR) components should not be prohibited
                from staffing, although SMCR Marines should be required to accept active-duty orders of at least
                three years to join.
              </p>

              <p>
                In the opening days of a large conflict, existing deployed Marine expeditionary units would be moved
                toward the conflict quickly, while nondeployed active-duty formations and SMCR components would be
                readied. Away from the initial fighting, the 5th and 6th MEFs would get the highest priority for
                staffing to bring them to full strength and begin unit training expeditiously. Marines recalled from
                the Ready Reserve would form the noncommissioned and commissioned officer corps, while junior
                enlisted would be the most recent graduates of the military occupational specialty schoolhouses.
                Fully staffing each should be given priority over immediately replacing the casualties suffered by
                units already engaged in the conflict.
              </p>

              <p>
                In addition to their role relieving troops already engaged, these new MEFs would give the Marine
                Corps the capacity to fight over a much larger geographic area. Relations among the United States'
                adversaries are only growing stronger, which could turn any regional conflict into a global one, and
                the United States would almost certainly turn to the Marine Corps to respond across the globe.
                Because the most likely adversaries&mdash;China and Russia&mdash;field large militaries that would
                only get larger during a war, the Marine Corps must grow to offset some of that advantage.
              </p>

              {/* Centered ad at the mid-article break */}
              <AdUnit size="leaderboard" />

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                It Takes (Less) Time
              </h2>

              <p>
                There are two dominant philosophies for replacing battlefield losses in a protracted war. The first
                is to assign replacement troops directly to the units that have taken casualties. This can be done in
                two ways: by sending replacements into frontline areas, as was done by U.S. forces in Vietnam; or by
                rotating units through combat areas, assigning them replacements only when they return home. The
                first has the obvious virtue of helping units already engaged remain combat effective. But it comes
                at the cost of making it more difficult to pull forces off the line for regeneration.
              </p>

              <PhotoFigure
                src={hornetsImg}
                alt="Marine Corps F/A-18D Hornets from Marine Fighter Attack Squadron 232"
                caption={
                  <>
                    Marine Corps F/A-18D Hornets from Marine Fighter Attack Squadron 232. In early going, the new
                    MEFs may need to work with older mat&eacute;riel until newer equipment such as F-35s become
                    available.
                  </>
                }
                credit="U.S. Marine Corps (Jennifer Sanchez)"
              />

              <p>
                The second philosophy requires the creation of new formations to rotate in, which has been Ukraine's
                primary method of replacing casualties in its ongoing war with Russia. But generating new elements
                out of whole cloth takes time, something not plentiful in war. Building the framework for such units
                in advance would accelerate the organization and assimilation of new and reserve Marines, bringing
                new units to full strength quickly and permitting rapid rotation of other units through the combat
                area. This would ensure Marines are always either in the fight or readying to return to it.
              </p>

              <p>
                To fully maximize the potential for such a concept, the Marine Corps would have to invest in itself
                to a greater degree than it currently does. Otherwise, the cost to maintain such a system would not
                be worth the dividends. The quality and professionalism of the Marine Corps is unique, and it derives
                from the quality of individual Marines. This must not change, regardless of circumstances; this
                requirement could raise concerns about the time required to fully man and train these units. But the
                history of the proposed divisions suggests it is possible both to generate formations on a useful
                timeline and preserve quality.
              </p>

              <p>
                The 5th and 6th Marine Divisions were formed in January and September 1944, respectively, because the
                four existing Marine divisions were not enough to wage war across the Pacific. The 5th Marine
                Division's training began in February 1944 and continued until mid-December, with intermittent
                breaks. The 6th trained from October 1944 through February 1945.<sup>5</sup> Compared with the 1st
                Marine Division, which did not begin combat operations until August 1942&mdash;almost nine months
                after Pearl Harbor&mdash;the 5th and 6th Divisions spent about the same amount of time in
                training.<sup>6</sup> This was done while both new divisions were constantly competing with the four
                original ones for personnel and equipment&mdash;and both units started from scratch. Each took
                roughly two months to get an organization in place before the nine months of training could even
                begin.
              </p>

              <p>
                Equipping the new MEFs with mat&eacute;riel being phased out or that has been placed in long-term
                storage would not be free, but it could be an affordable interim solution. To better justify the cost
                of maintenance and increase longevity, equipment could be rotated through the active component, the
                reserves, and these paper formations. However, the new MEF units must always be fully equipped with
                <em> something</em>; the enemy has a say in when conflict occurs.
              </p>

              <PhotoFigure
                src={musterImg}
                alt="Marines from the Individual Ready Reserve attend a muster at La Jolla, California"
                caption={
                  <>
                    Marines from the Individual Ready Reserve attend a muster at La Jolla, California. Marines from
                    the Ready Reserve would be recalled to form the noncommissioned and commissioned officer corps of
                    the operational elements of the new MEFs.
                  </>
                }
                credit="U.S. Marine Corps (Grace J. Kindred)"
              />

              <p>
                In addition, Marines from the Ready Reserve would not be starting from scratch; they already have
                experienced the service, and some would likely have deployed at least once. One possible concern
                would be that the lack of experience of the new MEFs' junior-enlisted Marines would adversely affect
                the units' performance. But that argument undervalues the importance of training, discipline, and
                spirit. Furthermore, it ignores the Marine Corps' own history. The Marines who defeated the Germans
                at Belleau Wood, for example, were inexperienced but well-trained and led by highly experienced,
                proficient NCOs. Many such NCOs and commissioned officers serve in the Ready Reserve today.
              </p>

              {/* Inline fallback ad below xl (the ad rail takes over at xl) */}
              <div className="xl:hidden">
                <AdUnit size="rectangle" />
              </div>

              <div className="bg-[#c4c9d4] h-px w-full" />

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                Not a Moment to Lose
              </h2>

              <p>
                Every day, war between the world's major powers seems to inch closer. In prolonged great power
                conflicts, superior tactics and doctrine contribute to success, but numerical strength&mdash;though
                not necessarily superiority&mdash;often proves decisive. The Marine Corps may be called on to fight a
                war that demands many more Marines than it currently has. Reactivating the headquarters of the 5th
                and 6th Marine Divisions and creating the aviation and logistics elements necessary to form two
                additional MEFs would help prepare the Marine Corps for such a scenario. This would replace
                casualties more expeditiously, rotate units through combat operations more frequently, and permit
                fighting across larger geographic areas. By preparing these formations now, the Marine Corps would be
                able to activate them much faster in wartime and subsequently deploy them more quickly. However
                tragic, battlefield losses must be replaced, and building two additional MEFs now is the best option
                to do so.
                <span className="inline-flex items-baseline ml-2 text-navy-bolder" aria-hidden="true">
                  <i className="fa-solid fa-anchor text-[14px]" />
                </span>
              </p>

              {/* References */}
              <div className="pt-6">
                <div className="bg-[#c4c9d4] h-px w-full mb-6" />
                <p className="font-headline text-[28px] text-[#060a0a] leading-[1.2] mb-4">References</p>
                <ol className="list-decimal list-inside space-y-2 font-body text-base text-neutral-subtle leading-relaxed">
                  <li>George Stuart Gordon, <em>The Operations of the British Army in the Present War: The Retreat from Mons</em> (Boston, MA: Houghton Mifflin Company, 1917).</li>
                  <li>Nikolas Gardner, <em>Trial by Fire: Command and the British Expeditionary Force in 1914</em> (London: Bloomsbury Publishing, 2003), 34&ndash;36.</li>
                  <li>Gardner, <em>Trial by Fire</em>, 36.</li>
                  <li>Debbie Danan, &ldquo;As IDF Raises Reservist Call-Up Cap to 450,000, Weary Troops Decry Low Haredi Enlistment,&rdquo; <em>Times of Israel</em>, 30 May 2025.</li>
                  <li>&ldquo;Fifth Marine Division History,&rdquo; Fifth Marine Division Association, 2021, 5thmarinedivision.org/5th-marine-division-history/; and James R. Stockman, <em>The Sixth Marine Division</em> (Prague, CZ: Good Press, 2022).</li>
                  <li>Joel Thacker, &ldquo;The History of the 1st Division through World War II,&rdquo; <em>Leatherneck</em>, 2021.</li>
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
