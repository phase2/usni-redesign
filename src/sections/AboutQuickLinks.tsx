import imgHistory from '@/assets/images/our-histroy-feature-image.png'
import imgStrategicPlan from '@/assets/images/giving-feature-2.jpg'
import imgLeadership from '@/assets/images/giving-opps-modal-hero-Conferences GO.jpg'
import imgTaylorCenter from '@/assets/images/Daylight-Outside-Zoomed-In-e1639073841206.jpeg'

/**
 * Wayfinding into the rest of the About section — the PlainCard treatment used
 * by "The Naval Institute at work" on the homepage, with a photo added above
 * the headline. Sits on the light blue band between the white mission block
 * above and the navy pillars below.
 *
 * Only the history image is final; the other three are stand-ins pending final
 * art from USNI.
 */
const links = [
  {
    headline: 'Our History',
    body: 'Fifteen naval officers, a post–Civil War Navy, and the forum they founded on the grounds of the Naval Academy.',
    cta: 'Discover our story',
    href: '/about/history',
    image: imgHistory,
    alt: 'Historical illustration of the Naval Institute’s founding era',
  },
  {
    headline: 'Strategic Plan 2030',
    body: 'How the Institute intends to grow its reach and influence through the next decade of maritime competition.',
    cta: 'View the strategic plan',
    href: '/about/strategic-plan',
    image: imgStrategicPlan,
    alt: 'An aircraft carrier under way at sea',
  },
  {
    headline: 'Leadership & Staff',
    body: 'The executives, directors, trustees, and editors who steward the Institute and its mission.',
    cta: 'Meet our leadership',
    href: '/about/leadership',
    image: imgLeadership,
    alt: 'Attendees at a U.S. Naval Institute conference',
  },
  {
    headline: 'Jack C. Taylor Conference Center',
    body: 'The Institute’s conference and event venue on the grounds of the U.S. Naval Academy.',
    cta: 'Visit the center',
    // The Center's page lives in Giving — it was built with private donations
    // and is still maintained by them — but it belongs in this grid too, since
    // it is one of the four things people come to About looking for.
    href: '/giving/taylor-conference-center',
    image: imgTaylorCenter,
    alt: 'Exterior signage on the Jack C. Taylor Conference Center in Annapolis',
  },
]

export default function AboutQuickLinks() {
  return (
    <section className="py-16 lg:py-20 bg-[#ebf4ff]">
      <div className="container-site">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {links.map((item) => (
            <div key={item.href} className="flex flex-col border border-navy-subtle bg-white">
              <div className="overflow-hidden aspect-[3/2]">
                <img src={item.image} alt={item.alt} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col flex-1 p-6 lg:p-7">
                <h3 className="font-headline text-2xl text-navy-bolder leading-[1.1] mb-4">
                  {item.headline}
                </h3>
                <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-8 flex-1">
                  {item.body}
                </p>
                <a
                  href={item.href}
                  className="inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors duration-150 w-full"
                >
                  {item.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
