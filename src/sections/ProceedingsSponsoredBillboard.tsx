import sponsoredImg from '@/assets/images/proceedings-articles/sponsored/uv-fleets-hero.jpg'
import sponsorLogoImg from '@/assets/images/proceedings-articles/sponsored/booz-allen-wordmark-stacked.png'
import SplitBillboard from '@/components/ui/SplitBillboard'

/**
 * The Proceedings landing's sponsored-content billboard, teasing the current
 * sponsored article. Title, summary, and image are that article's; the summary
 * is the live page's meta description.
 */
export default function ProceedingsSponsoredBillboard() {
  return (
    <section
      className="py-10 lg:py-16"
      style={{ background: 'linear-gradient(232deg, #ffffff 35%, #f4f4f6 100%)' }}
    >
      <div className="container-site">
        <SplitBillboard
          theme="tan"
          imagePosition="left"
          image={{
            src: sponsoredImg,
            alt: 'An unmanned surface vessel with a radar and antenna mast speeds across choppy water.',
          }}
          imageOverlay={
            <div className="absolute bottom-4 left-4 bg-white px-2 py-2 flex flex-col gap-1">
              <p className="font-body font-medium text-xs text-navy-subtle uppercase tracking-widest">
                Sponsored Content
              </p>
              <img src={sponsorLogoImg} alt="Booz Allen Hamilton" className="w-[134px] h-auto object-contain" />
            </div>
          }
          eyebrow="Sponsored Content"
          heading="Updating UV Fleets at Scale Quickly and Securely"
          body="The Navy can prepare today to keep its UVs dominant in a future conflict. By combining emerging technologies with current naval capabilities, the Navy can rapidly and securely update massive UV fleets."
          primary={{ label: 'Read this article', href: '/proceedings/sponsored/updating-uv-fleets' }}
          secondary={{ label: 'See all sponsored content', href: '/proceedings/sponsored' }}
        />
      </div>
    </section>
  )
}
