/**
 * The sponsor credits on a sponsored article, both above the fold.
 *
 * ArticleSponsorBanner takes the leaderboard ad's place below the breadcrumb:
 * the sponsored billboard's double-bordered tan box, with "Sponsored Content:
 * <sponsor>" as a small headline on the left and the logo on the right. Pass
 * it to ArticleHeader's `banner`.
 *
 * ArticleSponsorCredit is a tan ribbon laid over the top right corner of the
 * hero image. As on the live page, the panel runs past the image's right edge
 * and a darker triangle under the overhang reads as the ribbon folding back
 * around the edge. Pass it to ArticleHeroImage's `overlay`, which positions it.
 *
 * Both always label it "Sponsored Content", never "Sponsored by".
 */

type Sponsor = { name: string; logo: string }

export function ArticleSponsorBanner({ name, logo }: Sponsor) {
  return (
    // The sponsored billboard's box: a tan ground with a tan-subtle border, and
    // a second border inset within it
    <div className="bg-tan-subtlest border border-tan-subtle p-3 lg:p-4">
      <div className="flex items-center justify-between gap-6 border border-tan-subtle px-5 py-4 lg:px-8 lg:py-5">
        <p className="font-headline text-[20px] lg:text-[24px] text-navy-bolder leading-[1.2]">
          Sponsored Content: {name}
        </p>
        {/* The name is in the label, so the logo is decorative here */}
        <img src={logo} alt="" className="h-10 lg:h-14 w-auto flex-none" />
      </div>
    </div>
  )
}

/**
 * How far the ribbon runs past the image's right edge: the panel's overhang,
 * the fold's size, and the inset that keeps the shadow over the photo.
 */
const OVERHANG = 'right-[-12px] lg:right-[-20px]'
const FOLD = 'w-3 h-3 lg:w-5 lg:h-5'
const OVER_IMAGE = 'right-3 lg:right-5'

export default function ArticleSponsorCredit({ name, logo }: Sponsor) {
  return (
    <div className={`absolute top-3 sm:top-6 lg:top-8 ${OVERHANG} z-10`}>
      {/* The shadow, cast only on the photo: it stops at the image's right
          edge, so none falls on the page beside the overhang */}
      <div
        className={`absolute inset-y-0 left-0 ${OVER_IMAGE} shadow-[0_6px_16px_rgba(14,18,26,0.12)]`}
        style={{ clipPath: 'inset(-40px 0 -40px -40px)' }}
        aria-hidden="true"
      />
      {/* The banner's tan: the light ground and its tan-subtle border */}
      <div className="relative flex flex-col items-center gap-2 sm:gap-3 lg:gap-4 bg-tan-subtlest border border-tan-subtle px-4 py-3 sm:px-6 sm:py-5 lg:px-10 lg:py-7">
        <p className="font-body font-bold uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm text-navy-bolder whitespace-nowrap">
          Sponsored Content
        </p>
        <img src={logo} alt={name} className="h-8 sm:h-14 lg:h-20 w-auto" />
      </div>
      {/* The fold: the ribbon's underside, turning back behind the image */}
      <div
        className={`absolute top-full right-0 ${FOLD} bg-tan-subtle`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        aria-hidden="true"
      />
    </div>
  )
}
