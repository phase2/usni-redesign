/**
 * The sponsor credits on a sponsored article, both above the fold.
 *
 * ArticleSponsorBanner takes the leaderboard ad's place below the breadcrumb:
 * a tan-bordered row with "Sponsored Content: <sponsor>" on the left and the
 * logo on the right. Pass it to ArticleHeader's `banner`.
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
    <div className="flex items-center justify-between gap-6 bg-tan-subtlest border-2 border-tan px-5 py-4 lg:px-8 lg:py-5">
      <p className="font-body text-sm lg:text-base text-navy-bolder">
        <span className="font-bold uppercase tracking-widest">Sponsored Content:</span>{' '}
        <span>{name}</span>
      </p>
      {/* The name is in the label, so the logo is decorative here */}
      <img src={logo} alt="" className="h-10 lg:h-14 w-auto flex-none" />
    </div>
  )
}

/** How far the ribbon runs past the image's right edge, and the fold's size. */
const OVERHANG = 'right-[-12px] lg:right-[-20px]'
const FOLD = 'w-3 h-3 lg:w-5 lg:h-5'

export default function ArticleSponsorCredit({ name, logo }: Sponsor) {
  return (
    <div className={`absolute top-3 sm:top-6 lg:top-8 ${OVERHANG} z-10`}>
      <div className="flex flex-col items-center gap-2 sm:gap-3 lg:gap-4 bg-tan-subtlest shadow-[0_4px_12px_rgba(14,18,26,0.18)] px-4 py-3 sm:px-6 sm:py-5 lg:px-10 lg:py-7">
        <p className="font-body font-bold uppercase tracking-widest text-[10px] sm:text-xs lg:text-sm text-navy-bolder whitespace-nowrap">
          Sponsored Content
        </p>
        <img src={logo} alt={name} className="h-8 sm:h-14 lg:h-20 w-auto" />
      </div>
      {/* The fold: the ribbon's underside, turning back behind the image */}
      <div
        className={`absolute top-full right-0 ${FOLD} bg-tan`}
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
        aria-hidden="true"
      />
    </div>
  )
}
