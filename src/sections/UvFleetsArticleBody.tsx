import ArticleAuthorBio from '@/sections/ArticleAuthorBio'
import ArticleComments from '@/sections/ArticleComments'
import AdUnit from '@/components/ui/AdUnit'
import ArticleSponsorCredit from '@/sections/ArticleSponsorCredit'
import sponsorLogo from '@/assets/images/proceedings-articles/sponsored/booz-allen-wordmark-stacked.png'
import controlImg from '@/assets/images/proceedings-articles/sponsored/uv-fleets-control.jpg'

// Article text from the live sponsored article (Proceedings, Booz Allen):
// https://test-usni3.pantheonsite.io/magazines/proceedings/sponsored/updating-uv-fleets-scale-quickly-and-securely
//
// The live copy carries the print layout's line-break hyphens ("commu-nications",
// "autono-mously") and two run-together words ("themmay", "real time.The");
// those are repaired here. The live subheads are bold first lines of their
// paragraphs; they are set as h2s, as in the other Proceedings articles. The
// authors' email links on the live page are malformed and are left out.

const SPONSOR = { name: 'Booz Allen', logo: sponsorLogo }

const articleAuthors = [
  {
    name: 'Randy Yamada, Ph.D.',
    role: 'Booz Allen',
    bio: 'Booz Allen vice president of autonomy, Dr. Yamada leads technical teams in the operationalization and deployment of advanced technologies for the Department of War.',
  },
  {
    name: 'Vice Admiral Roy Kitchener, U.S. Navy (Retired)',
    role: 'Booz Allen',
    bio: 'A senior executive advisor at Booz Allen, Vice Admiral Kitchener served as Commander, Naval Surface Forces/Naval Surface Force, U.S. Pacific Fleet. During his 39 years of service, his commands included destroyers, a cruiser, and an expeditionary strike group.',
  },
]

// ── Layout contract ───────────────────────────────────────────────────────────
// The same two-column band as FortifyingArticleBody: an 864px reading column
// plus a 300px rail at xl, the column centered below it. The rail leads with
// the sponsor credit, then carries ads; below xl the credit moves to the top of
// the column.

function Subhead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-headline text-[32px] text-[#060a0a] leading-[1.2] pt-2">{children}</h2>
  )
}

export default function UvFleetsArticleBody() {
  return (
    <>
      <section className="bg-white pt-10 pb-0 overflow-x-clip">
        <div className="max-w-[1194px] mx-auto w-full px-4 lg:px-8">
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-[30px]">

          <div className="max-w-[864px] mx-auto xl:mx-0 w-full pb-10">

            <div className="xl:hidden mb-8">
              <ArticleSponsorCredit {...SPONSOR} layout="inline" />
            </div>

            <div className="font-body text-[16px] lg:text-[18px] text-[#1d2535] leading-[1.5] space-y-8 article-body">

              {/* Drop cap paragraph */}
              <div className="relative">
                <div
                  className="float-left bg-navy-bolder flex items-center justify-center mr-4 mb-1 flex-shrink-0 select-none"
                  style={{ width: 72, height: 72 }}
                  aria-hidden="true"
                >
                  <span className="font-headline text-[52px] text-white leading-none">I</span>
                </div>
                <p>
                  <span className="sr-only">I</span>t&rsquo;s a few years into the future, and the Navy now has an
                  attritable mass of tens of thousands of aerial, surface, and undersea drones in the Pacific, actively
                  performing routine tasking. They can also be called into conflict at any time&mdash;though, not all of
                  them may be ready.
                </p>
              </div>

              <p className="clear-left">
                Adversaries are developing new ways to defeat the Navy&rsquo;s unmanned vehicles (UVs), using new
                weapons and revised tactics, techniques, and procedures (TTPs). The Navy is aware of these
                countermeasures&mdash;and that it will need to continuously, rapidly, and securely update UV mission
                software to achieve mission success. But the updating won&rsquo;t be simple.
              </p>

              <p>
                There are now far too many and too varied UVs to manually upload new software through traditional
                methods. Different types of drones are programmed with distinct missions and TTPs and are produced by
                multiple manufacturers at different times. The number of platforms, as well as the multitude of
                software packages and different versions of software they carry, will be combinatorically massive. In
                addition, many of the UVs are controlled by tactical and other radio networks that do not have
                persistent internet connection.
              </p>

              <p>
                Fortunately, the Navy can prepare today to keep its UVs dominant in a future conflict. By combining
                emerging technologies with current naval capabilities, the Navy can rapidly and securely update
                massive UV fleets.
              </p>

              <Subhead>Over-the-Air Updating</Subhead>

              <p>
                One of the first requirements is an extensive cloud environment that will enable rapid, back-and-forth
                communications between UVs in the Pacific and various teams of software experts. To achieve this, the
                Navy can take advantage of the extensive investments from large, commercial cloud
                &ldquo;hyperscalers.&rdquo;
              </p>

              <p>
                Since there aren&rsquo;t enough technicians to do the updating, the UVs will need onboard device
                managers that determine which updates a given UV requires, then grab them from the cloud. Device
                managers can do this autonomously but with humans in the loop.
              </p>

              <p>
                New technological approaches make such device managers possible. Device managers keep a continuous
                inventory of UVs&rsquo; software, including autonomy missions, maps, firmware, drivers, and security
                patches. When connected to the cloud, device managers can listen for potential updates and determine
                which ones are needed to fill gaps in the inventory. They can also relay details about UVs&rsquo;
                current software versions and battery levels, among other information, giving commanders insight into
                the readiness of their UV fleets.
              </p>

              <p>
                Importantly, device managers autonomously install and test software updates, providing the onboard
                inventories with new behaviors and functionality. They can do this even when UVs don&rsquo;t have
                connectivity to the cloud, either intentionally or due to denied satellite communications.
              </p>

              <figure>
                <div className="overflow-hidden bg-neutral-subtlest">
                  <img
                    src={controlImg}
                    alt="A quadcopter drone hovers over open water as a surfaced submarine passes behind it, crew standing on its deck."
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
                  The appearance of U.S. Department of War (DoW) visual information does not imply or constitute DoW
                  endorsement.
                  <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: U.S. Navy (Devin M. Langer)</span>
                </figcaption>
              </figure>

              <p>
                UV device managers also help shape software updates. As an adversary responds to the tactics of a UV
                fleet, for example, device managers relay that information to analysts in real time. The analysts then
                use modeling and simulation to determine the best responses to the adversary, leveraging those
                insights to send new software back to the UVs.
              </p>

              <Subhead>Creating a Bridge</Subhead>

              <p>
                New approaches also make it possible to overcome another obstacle: updating UVs that are controlled by
                tactical and other radio networks that don&rsquo;t have persistent Wi-Fi or cellular connections. With
                these new technologies, the Navy can create a bridge between these UVs and the cloud.
              </p>

              <p>
                Here&rsquo;s how it works: Technicians on ships or land use laptops to connect with the cloud and
                download a cache of software updates and other data for UVs. The technicians then connect the laptops
                to the radio networks, which forward the cache to the UVs when the radios are turned on. The UVs send
                information back through the same path.
              </p>

              {/* Inline fallback ad below xl (the ad rail takes over at xl) */}
              <div className="xl:hidden">
                <AdUnit size="rectangle" />
              </div>

              <Subhead>Security and Speed</Subhead>

              <p>
                With attritable mass, it&rsquo;s not practical to protect every UV with NSA Type 1 encryption. However,
                the Navy can overcome this challenge by expanding its current use of zero-trust cybersecurity in
                updating UV software.
              </p>

              <p>
                Zero trust requires continuous verification of every user, device, and application seeking to access
                data. Device managers use zero trust to provide UVs with what is, essentially, an automated security
                system.
              </p>

              <p>
                Device managers ensure that software updates come from legitimate sources, rather than from the
                adversary. They also use zero trust to deny access to all data if the UV falls into the
                adversary&rsquo;s hands, as well as to determine whether there has been an attempt to reverse-engineer
                the UV to send false commands.
              </p>

              <p>
                An attritable mass of aerial, surface, and undersea UVs will help the Navy overwhelm its adversaries.
                Maintaining that advantage will require continuous, rapid, and secure updating&mdash;at a massive
                scale.
                <span className="inline-flex items-baseline ml-2 text-navy-bolder" aria-hidden="true">
                  <i className="fa-solid fa-anchor text-[14px]" />
                </span>
              </p>

            </div>

          </div>

          {/* Right rail: the sponsor credit, then ads — two rather than four,
              for a short article. The credit sits outside the ads' aside so it
              is not announced as part of the "Advertisements" landmark. */}
          <div className="hidden xl:flex xl:flex-col">
            <ArticleSponsorCredit {...SPONSOR} />
            <aside className="flex-1 flex flex-col mt-8" aria-label="Advertisements">
              <AdUnit size="rectangle" />
              <div className="flex-1" aria-hidden="true" />
              <AdUnit size="rectangle" />
            </aside>
          </div>

          </div>

          {/* Below the two-column band, so the ad rail ends at this rule
              rather than running down beside the closing link. */}
          <div className="xl:grid xl:grid-cols-[minmax(0,1fr)_300px] xl:gap-[30px]">
            <div className="max-w-[864px] mx-auto xl:mx-0 w-full">
              {/* The live article closes on a "Check out more sponsored articles"
                  link; it is the same destination as the landing billboard's
                  See all sponsored content. */}
              <div className="border-t border-[#c4c9d4] pt-8 pb-12 flex flex-col items-start gap-4">
                <p className="font-headline text-[24px] text-navy-bolder leading-[1.2]">
                  Check out more sponsored articles.
                </p>
                <a
                  href="/proceedings/sponsored"
                  className="inline-flex items-center justify-center bg-transparent text-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
                >
                  See all sponsored content
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ArticleAuthorBio authors={articleAuthors} />
      <ArticleComments />
    </>
  )
}
