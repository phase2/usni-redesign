import ArticleAuthorBio from '@/sections/ArticleAuthorBio'
import ArticleComments from '@/sections/ArticleComments'
import ArticleCallout from '@/sections/ArticleCallout'
import ArticleImagePair from '@/sections/ArticleImagePair'
import ArticleInBrief from '@/sections/ArticleInBrief'
import ArticlePullQuote from '@/sections/ArticlePullQuote'
import ArticleTimeline from '@/sections/ArticleTimeline'
import ArticleAudioPlayer from '@/sections/ArticleAudioPlayer'
import AdUnit from '@/components/ui/AdUnit'

import antietamImg from '@/assets/images/proceedings-articles/grubb/uss-antietam.jpg'
import champlainImg from '@/assets/images/proceedings-articles/grubb/uss-lake-champlain.jpg'
import skyhawkImg from '@/assets/images/proceedings-articles/grubb/a4-skyhawk.jpg'
import figure1Img from '@/assets/images/proceedings-articles/grubb/figure-1-ski-slope.png'
import figure2Img from '@/assets/images/proceedings-articles/grubb/figure-2-changepoints.png'

// Article text provided by the client (Proceedings, July 2026) for this prototype.

const articleAuthors = [
  {
    name: 'Dr. Jefferson D. Grubb',
    role: 'Naval Safety Command',
    bio: 'Dr. Grubb is the head of the Operations Research Division at Naval Safety Command. He holds a Ph.D. in developmental cognitive neuroscience from the University of Denver. A retired Medical Service Corps officer, he spent his active-duty career addressing human factors issues in naval aviation as a naval aerospace experimental psychologist.',
  },
]

// ── Layout contract ───────────────────────────────────────────────────────────
// Two-column band (Harvard Magazine pattern): 1194px container = 864px reading
// column + 30px gap + 300px ad rail. All body content — text, figures, charts,
// color blocks — stays inside the left-aligned 864px column; the rail carries
// nothing but ads. Below xl the rail is hidden and the column centers itself.

// ── Chart figure (bordered, matches print treatment) ──────────────────────────

function ChartFigure({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string
  alt: string
  caption: string
  className?: string
}) {
  return (
    <figure className={`border border-[#c4c9d4] bg-white p-4 ${className}`}>
      <img src={src} alt={alt} className="w-full h-auto" />
      <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
        {caption}
      </figcaption>
    </figure>
  )
}

// ── Topics ────────────────────────────────────────────────────────────────────

const topics = ['Naval Aviation', 'Naval Safety', 'Organizational Learning', 'Naval History', 'Research & Analysis']

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

export default function GrubbArticleBody() {
  return (
    <>
      <section className="bg-white pt-10 pb-0 overflow-x-clip">

        {/* ── Article band: left-aligned reading column + ads-only rail ── */}
        <div className="max-w-[1194px] mx-auto w-full px-4 lg:px-8">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-[30px]">

          <div className="max-w-[864px] mx-auto xl:mx-0 w-full">

            <div className="bg-[#EBF4FF] p-6 lg:p-8">
              <ArticleInBrief
                readTime="9 min read"
                items={[
                  <>Annotated &ldquo;ski slope&rdquo; charts credit individual programs and equipment for naval aviation's safety gains&mdash;but the curve itself doesn't support that story.</>,
                  <>Plotted against a century of data, the mishap rate follows a single organizational learning curve, not a series of silver-bullet fixes.</>,
                  <>Mishap rates rise when the fleet deviates from established best practices&mdash;and the post-2022 uptick fits that historical pattern.</>,
                ]}
              />
            </div>

            <div className="mt-6">
              <ArticleAudioPlayer />
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
                  he first chapter of Tom Wolfe's 1979 work of narrative nonfiction, <em>The Right Stuff</em>, paints
                  a lurid portrait of naval aviation in the 1950s.<sup>1</sup> Wolfe follows aviator and future
                  astronaut Pete Conrad from funeral to funeral for squadron mates who had &ldquo;augured in,&rdquo;
                  been &ldquo;burned beyond recognition,&rdquo; or otherwise &ldquo;bought it&rdquo; in aircraft
                  mishaps. Conrad's experience was not unusual. In fiscal year 1953, the U.S. Navy and Marine Corps
                  lost 723 aircraft and 423 people to aviation mishaps.<sup>2</sup> In contrast, in FY 2025, naval
                  aviation lost just 11 aircraft and two people to aviation mishaps. Clearly, naval aviation got
                  better. But how?
                </p>
              </div>

              <p className="clear-left">
                Naval aviation safety presenters usually display a graph that plots historic improvements in the
                annual rate of major mishaps by fiscal year since 1950, though the shape of the curve is consistent
                back to the beginning of such recordkeeping in 1922.<sup>3</sup> (See figure 1.) The graph's steep
                initial decline tapers to a low, seemingly flat trend, a distinctive shape that gives the graphs
                their colloquial description&mdash;ski slope charts. In most cases, presenters annotate the slopes
                with text and arrows that indicate the timing of milestone changes to process and equipment. The
                annotations imply those things specifically called out are what drove down the mishap rate. That is,
                the charts imply naval aviation got better through a succession of silver bullet fixes to various
                safety problems.
              </p>

              <ChartFigure
                src={figure1Img}
                alt="Naval Aviation History and Safety Improvements chart, plotting mishap rates per 100,000 flight hours from 1950 to 2020, annotated with milestone safety programs"
                caption="Figure 1: A naval aviation safety graph that plots historic improvements in the annual rate of major mishaps by fiscal year since 1950. Its steep initial decline tapers to a low, nearly flat trend. The shape that gives it the colloquial name&mdash;the &ldquo;ski slope.&rdquo;"
              />

              <p>
                However, ski slope charts provide little actual evidence to support a causal relationship. In
                Aristotelian terms, they do not sufficiently differentiate between formal and efficient causes (see
                box below). In a survey of command briefs, books, journal articles, and web pages, the author
                examined 15 examples of annotated ski slope charts. Although each is annotated across its entire
                period, not all events are common to each. Especially post 1970, the charts' choices of highlighted
                events vary substantially. This suggests uncertainty about what changes significantly affected safety
                over the past half century.
              </p>

              <p>
                Even when the same pre-1970 innovations are present, they often are located at different places on
                the curves. And, even when multiple charts list the same annotation at the same point, the curve
                rarely deflects downward there&mdash;improvement is not immediately associated with the timing. This
                raises doubts about whether or how any given annotated thing benefited safety. In other words,
                classic ski slope charts indicate exactly two things: that naval aviation got better and that naval
                aviation did stuff. However, the charts provide no evidence that the getting better was because of
                the particular stuff being done.
              </p>

              <ArticlePullQuote>
                Classic ski slope charts indicate exactly two things: that naval aviation got better and that naval
                aviation did stuff.
              </ArticlePullQuote>

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                What Don't the Curves Say
              </h2>

              <p>
                To better understand what drove the mishap rate down, look past the annotations and examine the
                curve itself.
              </p>

              <p>
                From this larger perspective, both the steep initial decline and the recent flat trend of the curve
                are continuations of a single pattern that the mishap rate has followed over almost the entire
                history of U.S. naval aviation.
              </p>

              <ArticleCallout>
                <p>
                  <strong>ARISTOTLE SAYS</strong> that to explain why something exists or changes, four
                  &ldquo;causes&rdquo; must be examined: material, formal, efficient, and final. For this article's
                  purposes, it is especially helpful to distinguish between two:
                </p>
                <p className="pl-6">
                  The <em>formal cause</em> of something&mdash;what Aristotle defines as the structure that makes
                  something what it is. The blueprint, not the house.
                </p>
                <p className="pl-6">
                  And the <em>efficient cause</em>&mdash;for Aristotle, the agent who achieves the desired outcome.
                  The carpenters.
                </p>
                <p>
                  In this case&mdash;loosely speaking&mdash;the formal cause can be thought of as the learning itself
                  or becoming a learning organization that enables gradual discovery, dissemination, and retention of
                  best practices. The efficient causes would roughly be the people, processes, and tools developed
                  from and by that learning&mdash;the things the arrows on the ski slope chart point to and the
                  people who conceived and carried them out, whether angled decks, safety officers, or NATOPS. And
                  the end result&mdash;the house itself&mdash;is safety that is continually improving.
                </p>
              </ArticleCallout>

              <p>
                What is noisy data becomes a straight line when a formal analysis is performed, which indicates that
                the major mishap rate has the form of an exponential function. (The data analysis and methodology are
                discussed in the sidebar below.) In social science terms, this exponential has the shape of what is
                commonly called a learning curve. Here, its downward (negative) shape is &ldquo;eliminative.&rdquo;
                That is, when smaller numbers indicate better performance (e.g., fewer errors, less time to complete
                a task, lower cost per item produced, etc.), task experience is reducing the measured quantity
                (accidents, for example).<sup>4</sup> Business literature defines such organizational learning as
                changes in the organization's collective behavior that stem from experience.<sup>5</sup> Improvement
                occurs through the gradual discovery, dissemination, and retention of best practices across the
                enterprise. In this light, the shape of the ski slope indicates naval aviation got better less by
                taking specific actions and more through some organizational learning process.
              </p>

              <p>
                Although the overall learning curve by itself explains nearly all the variance in the major mishap
                rate, certain points in which the mishap rate changed significantly relative to its overall trend
                allow inferences to be drawn about what events significantly contributed to the learning, a process
                formally if somewhat obviously called &ldquo;changepoint analysis.&rdquo; Trivially, some of the key
                moments can readily be explained by probable changes in mishap reporting. Leaving those aside, the
                timing of other changepoints suggests a coherent story for how naval aviation got better.
              </p>

              {/* Centered ad at the mid-article break; clears the floated callout */}
              <AdUnit size="leaderboard" className="clear-right" />

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                Organizational Learning
              </h2>

              <p>
                The annotations on classic ski slope charts emphasize many of the &ldquo;discovery&rdquo; elements of
                the effects chain. However, until a good idea is promulgated, it is merely a good idea; its
                dissemination takes time. For example, many ski slope charts have arrows pointing to 1951 with the
                note &ldquo;angled decks.&rdquo; Although the U.S. and Royal Navies did indeed begin discussing the
                concept in 1951, angled decks could not affect the mishap rate until aviators began flying from them,
                which in the U.S. Navy began in January 1953 with test flights from its first permanent angled
                deck.<sup>6</sup>
              </p>

              <p>
                For the next two years, that deck&mdash;belonging to the USS <em>Antietam</em> (CVA/CVS-36)&mdash;was
                the only angled one on the more than 20 active fleet carriers. Twelve years later, the Essex-class
                USS <em>Lake Champlain</em> (CVS-39) was still in service and still conducting fixed-wing operations
                from her axial flight deck, the last in the fleet.<sup>7</sup> Consequently, the beneficial effects
                that angled decks had on the mishap rate could not have occurred prior to 1953, and the residual
                hazards of axial decks would still have affected the mishap rate through the <em>Lake
                Champlain</em>'s inactivation in late 1965. This is not to dispute that angled decks are safer, only
                to state that promulgating best practices and tools takes time.
              </p>

              <ArticleImagePair
                images={[
                  { src: antietamImg, alt: 'USS Antietam, the U.S. Navy\'s first carrier with an angled flight deck' },
                  { src: champlainImg, alt: 'USS Lake Champlain conducting fixed-wing flight operations from an axial flight deck' },
                ]}
                caption={
                  <>
                    The Essex-class USS <em>Antietam</em> (CVA/CVS-36), left. In 1953, the <em>Antietam</em> became
                    the Navy's first carrier with an angled deck, and was the only one until 1955. Twelve years
                    later, the USS <em>Lake Champlain</em> (CVS-39) was the last carrier in service with only an
                    axial flight deck.
                  </>
                }
                photoCredit="Naval History and Heritage Command"
              />

              <p>
                The organization can influence how much time, however. The analysis revealed two consecutive periods
                of unusually rapid improvement in the mishap rate that together stretched from 1954 through 1965. As
                classic ski slope charts typically note, beyond angled decks, this period included a significant
                expansion of the forerunner to Naval Safety Command; the creation of aviation safety officer billets
                at all aviation activities; standardization of aviation maintenance practices; development of the
                Naval Aviation Training and Operations Standardization (NATOPS) program; and creation of
                RAGs&mdash;replacement air groups&mdash;squadrons that standardized the training for each
                type/model/series of aircraft (now known as fleet replacement squadrons).<sup>8</sup>
              </p>

              <ArticleTimeline
                eyebrow="The Learning Decade"
                items={[
                  { year: '1953', label: 'First angled flight deck enters service (USS Antietam)' },
                  { year: '1955', label: 'Aviation Safety Center expands; safety officer billets fleet-wide' },
                  { year: '1958', label: 'Replacement air groups standardize training by aircraft type' },
                  { year: '1959', label: 'Naval Aviation Maintenance Program standardizes maintenance' },
                  { year: '1961', label: 'NATOPS standardizes operating procedures fleet-wide' },
                ]}
                caption="Key organizational-learning milestones. These cluster inside the two fastest-improving periods in the mishap-rate record, 1954&ndash;1965."
              />

              {/* Color-blocked sidebar — Understanding the Math (contained to the column) */}
              <section className="bg-[#F4F4F6]">
                <div className="px-6 lg:px-8 py-8 lg:py-10">
                  <div className="space-y-6 font-body text-[15px] lg:text-[16px] text-[#1d2535] leading-[1.65]">
                    <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2]">
                      Understanding the Math
                    </h2>
                    <p>
                      Although the commonly used ski slope charts usually present mishap rates since 1950, Naval
                      Safety Command's annual major naval aviations mishap rate dataset stretches back to fiscal year
                      1922.
                    </p>
                    <p>
                      The mishap rate data indicate that naval aviation began classifying mishaps differently in
                      1936, so the short-term drop in both raw mishap numbers and year-to-year variability during the
                      mid-1930s may be the result of an intentional change in how commands reported mishaps.
                      Similarly, the sharp drop in the mishap rate at the beginning of the 1940s coincides with the
                      onset of World War II. This period saw sudden, massive increases in operational tempo, aircraft
                      performance, personnel accession, etc., making an actual drop in the mishap rate implausible. A
                      more likely interpretation would be that, between competing priorities and alternative
                      explanations for losses, the drop reflects a decrease in reporting rather than a decrease in
                      mishaps.
                    </p>
                  </div>

                  <ChartFigure
                    src={figure2Img}
                    alt="Logarithmic plot of annual major naval aviation mishap rates since 1922 with changepoints marked as red vertical lines"
                    caption="Figure 2: Changepoints are mapped with red lines against a logarithmic plot of annual major naval aviation mishap rates since 1922. The changepoints indicate the timing of significant changes in the mishap rate's behavior relative to its overall trend."
                    className="my-8"
                  />

                  <div className="space-y-6 font-body text-[15px] lg:text-[16px] text-[#1d2535] leading-[1.65]">
                    <p>
                      Figure 2 plots the ski-slope mishap rate data from Figure 1 on a logarithmic scale. To do this,
                      an analyst takes the y<sub>1</sub> values&mdash;the number of mishaps per 100,000 flight
                      hours&mdash;and takes the natural logarithm of them: ln(y<sub>1</sub>)=y<sub>2</sub>. That gets
                      plotted on the same time-based (fiscal year) x axis. The resultant curve strongly resembles a
                      straight line, and a regression analysis produces a &ldquo;best-fit&rdquo; linear function,
                      which indicates that the major mishap rate followed a negative exponential trend. In the
                      behavioral sciences, negative exponential functions are characteristic of eliminative learning
                      curves.
                    </p>
                    <p>
                      Although a formal regression analysis revealed that this negative exponential explains 95
                      percent of the variance in the major mishap rate from 1922 through 2025, Figure 2 also shows
                      several extended periods during which the mishap rate remained consistently above or below the
                      trend line. This suggests that certain events discretely raised or lowered the mishap rate
                      relative to its overall trend.
                    </p>
                    <p>
                      To investigate this pattern, the author subtracted the overall trend from the raw mishap rate
                      data before performing a changepoint analysis on the residual data using the pruned exact
                      linear time algorithm for mean and variance.<sup>10</sup> This kind of analysis uses various
                      tools, including binary segmentation and Bayesian estimation, to identify points at which the
                      data's underlying pattern changes. These points can identify sudden, major shifts in
                      structure&mdash;in this case, instances of localized changes to the mishap rate relative to its
                      overall trend.
                    </p>
                    <p>
                      In Figure 2, these changepoints are marked with red vertical lines against the logarithmic plot
                      of the raw data. This timing allows inferences to be drawn about events that significantly
                      affected naval aviation safety&mdash;the efficient causes of improvements to or deterioration
                      of safety.
                    </p>
                  </div>
                </div>
              </section>

              <p>
                Rather than mitigating specific hazards, these efforts all helped aggregate, disseminate, and ensure
                compliance with best practices, both particular and general. However, none of these sorts of
                adjustments guarantee lasting success; the organization can forget what it has learned. The
                changepoint analysis indicates mishap rates spiked during periods in which naval aviation had
                apparent incentives to disregard best practices. Although mishap reporting dropped with the onset of
                World War II, by war's end the reported mishap rate exceeded its prewar baseline by 18 percent.
                Similarly, the mishap rate jumped during the Vietnam War and with the onset of the war on terror.
                Sustained combat operations have generally correlated with an increase in noncombat losses.
              </p>

              {/* Portrait image — in-column, like every other figure */}
              <figure>
                <div className="overflow-hidden bg-neutral-subtlest">
                  <img
                    src={skyhawkImg}
                    alt="A Douglas A-4 Skyhawk hangs in the catwalk of an aircraft carrier following a Vietnam War-era flight deck accident"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
                  In this undated Vietnam War&ndash;era photo, a Douglas A-4 Skyhawk hangs in the catwalk of an
                  aircraft carrier following a flight deck accident. The increase in noncombat mishaps during that
                  period is likely explained by the tempo of sustained combat operations.
                  <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: Naval History and Heritage Command</span>
                </figcaption>
              </figure>

              <p>
                Although the military continuously plans and prepares for war, the country cannot continuously
                provide resources to cover every possible contingency. When conflict breaks out, the military has no
                choice but to meet the increased operational demands with the available resources. To surge personnel
                and mat&eacute;riel to the fight, leaders must accept the risk of deviating from established best
                practices. When this happens, mishap rates go up.
              </p>

              <p>
                A resource-requirement mismatch may also explain the mishap rate increase after 2013. Under the
                sequestration provisions of the Budget Control Act of 2011, the Department of Defense took a $37
                billion budget cut midway through fiscal year 2013.<sup>9</sup> Prioritizing the Navy's operational
                requirements and fully funding other priority items resulted in cuts to maintenance and training
                budgets of about 30 percent, without commensurate cuts to operational requirements. Doing the same
                job with fewer resources necessarily entailed deviating from established practices. The changepoint
                analysis strongly suggests such deviations came at the cost of more mishaps.
              </p>

              <div className="bg-[#c4c9d4] h-px w-full" />

              <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">
                An Organization That Learns or a Learning Organization?
              </h2>

              <p>
                If naval aviation got better via organizational learning, does that mean naval aviation is a learning
                organization? Not necessarily. Again, organizational learning refers to a process by which an
                organization's collective behavior changes with experience. All organizations learn. Although such
                learning can be purposeful and beneficial to the enterprise, it can also be haphazard and even
                maladaptive. There even is a special term for maladaptive organizational learning: normalization of
                deviance.
              </p>

              <p>
                In contrast, a learning organization is an organization that actively promotes beneficial
                organizational learning. Instead of asking whether naval aviation is one, it is more appropriate to
                ask <em>how much of one</em> it is. For aviation safety, the changepoint analysis shows that this
                varies over time. When naval aviation attends to collecting, disseminating, and enforcing best
                practices, it gets better faster. When it focuses on other things, learning slows or even reverses.
              </p>

              {/* Inline fallback ad below xl (the ad rail takes over at xl) */}
              <div className="xl:hidden">
                <AdUnit size="rectangle" />
              </div>

              <p>
                That brings us to the most recent changepoint and what to do about it. The naval aviation mishap rate
                again spiked relative to its historical trend in FY 2022. This jump does not neatly correlate with
                any obvious, single event, which has led to debate over the uptick's cause.
              </p>

              <p>
                This debate is healthy, but the pattern of previous upticks suggests the quickest way to correct it
                is to ensure the enterprise is still doing those things it already knows work. Leaders need to
                honestly assess whether their organizations are still following established guidelines and
                procedures. If not, they must ask, Why not? Sometimes, there are good reasons for deviating from
                established practices, but doing so must be a conscious decision based on careful consideration of
                both the risks and potential rewards. If there is a good reason, it needs to be codified and shared
                so the entire organization can benefit. If not, we invite performance decay. Despite what the ski
                slope annotations suggest, silver bullet fixes are insufficient.
                <span className="inline-flex items-baseline ml-2 text-navy-bolder" aria-hidden="true">
                  <i className="fa-solid fa-anchor text-[14px]" />
                </span>
              </p>

              {/* References */}
              <div className="pt-6">
                <div className="bg-[#c4c9d4] h-px w-full mb-6" />
                <p className="font-headline text-[28px] text-[#060a0a] leading-[1.2] mb-4">References</p>
                <ol className="list-decimal list-inside space-y-2 font-body text-base text-neutral-subtle leading-relaxed">
                  <li>Tom Wolfe, <em>The Right Stuff</em> (New York: Farrar, Straus and Giroux, 1979).</li>
                  <li>Naval Aviation Safety Activity, <em>Review of Naval Aviation Accident Prevention Methods</em> (Norfolk, VA: Naval Aviation Safety Activity, 1953).</li>
                  <li>Current Class A mishaps or their equivalents under previous mishap classification systems.</li>
                  <li>Adedeji B. Badiru, "Half-Life Learning Curves in the Defense Acquisition Cycle," <em>Defense Acquisition Research Journal</em> 19, no. 3 (Summer 2012): 283&ndash;308.</li>
                  <li>Anders Ortenblad, "On Differences between Organizational Learning and Learning Organization," <em>The Learning Organization</em> 8, no. 3 (2001): 125&ndash;33.</li>
                  <li>Thomas C. Hone, Norman Friedman, and Mark D. Mandeles, "The Development of the Angled-Deck Aircraft Carrier: Innovation and Adaptation," <em>Naval War College Review</em> 64, no. 2 (2011): 1&ndash;16.</li>
                  <li>Michael Brayshaw, "Great Lake: The Fascinating History of the NNSY's World War II Aircraft Carrier USS <em>Lake Champlain</em>," Navy.mil, 4 June 2020.</li>
                  <li>VADM Robert F. Dunn, USN (Ret.), <em>Gear Up, Mishaps Down: The Evolution of Naval Aviation Safety, 1950&ndash;2000</em> (Annapolis, MD: Naval Institute Press, 2017).</li>
                  <li>Robert Hale, <em>Budgetary Turmoil at the Department of Defense from 2012 to 2014</em> (Washington, DC: Brookings Institution, 2015).</li>
                  <li>R. Killick, P. Fearnhead, and I. A. Eckley, "Optimal Detection of Changepoints with a Linear Computational Cost," <em>Journal of the American Statistical Association</em> 107 (2012): 1590&ndash;98.</li>
                </ol>
              </div>

            </div>

            <div className="bg-[#c4c9d4] h-px w-full mt-10" />
            <ArticleTopics />

          </div>

          {/* ── Right rail: ads only, staggered down the article's height.
              Ratio spacers replace justify-between: the first gap is smaller
              so the second rail ad sits above the in-body leaderboard instead
              of beside it. ── */}
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
