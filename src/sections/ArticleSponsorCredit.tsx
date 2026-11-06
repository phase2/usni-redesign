/**
 * The sponsor credit on a sponsored article: a tan ribbon laid over the top
 * right corner of the hero image, so the sponsor is credited above the fold.
 *
 * As on the live page, the panel runs past the image's right edge and a
 * darker triangle under the overhang reads as the ribbon folding back around
 * the edge. Pass it to ArticleHeroImage's `overlay`, which positions it.
 *
 * The label always reads "Sponsored Content", followed by the sponsor's name.
 * The logo repeats the name, so it's decorative; it's dropped below sm, where
 * a full panel would cover most of the photograph.
 */

/** How far the ribbon runs past the image's right edge, and the fold's size. */
const OVERHANG = 'right-[-12px] lg:right-[-20px]'
const FOLD = 'w-3 h-3 lg:w-5 lg:h-5'

export default function ArticleSponsorCredit({ name, logo }: { name: string; logo: string }) {
  return (
    <div className={`absolute top-3 sm:top-6 lg:top-8 ${OVERHANG} z-10`}>
      <div className="flex flex-col items-center gap-3 lg:gap-4 bg-tan-subtlest shadow-[0_4px_12px_rgba(14,18,26,0.18)] px-4 py-3 sm:px-6 sm:py-5 lg:px-10 lg:py-7">
        <p className="flex items-center gap-2.5 lg:gap-3 font-body text-[11px] sm:text-xs lg:text-sm text-navy-bolder whitespace-nowrap">
          <span className="font-bold uppercase tracking-widest">Sponsored Content</span>
          <span className="w-0.5 self-stretch bg-navy-bolder" aria-hidden="true" />
          <span>{name}</span>
        </p>
        <img src={logo} alt="" className="hidden sm:block h-14 lg:h-20 w-auto" />
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
