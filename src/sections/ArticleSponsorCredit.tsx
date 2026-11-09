/**
 * The sponsor credits on a sponsored article.
 *
 * ArticleSponsorBanner takes the leaderboard ad's place below the breadcrumb:
 * the sponsored billboard's double-bordered tan box, with a "Sponsored
 * Content" eyebrow over the sponsor's name on the left and the logo on the
 * right. Pass it to ArticleHeader's `banner`. It signals the content type
 * above the fold at every width.
 *
 * ArticleSponsorCredit is a tan block with the eyebrow over the sponsor's
 * logo, at the head of the article's ad rail above the first ad, so the
 * sponsor is credited beside the opening of the article without covering the
 * hero image. The rail shows only at xl; below that the banner carries the
 * credit alone.
 *
 * Both always label it "Sponsored Content", never "Sponsored by".
 */

type Sponsor = { name: string; logo: string }

function Eyebrow() {
  return (
    <p className="font-body font-medium text-xs text-navy-subtle uppercase tracking-widest">
      Sponsored Content
    </p>
  )
}

export function ArticleSponsorBanner({ name, logo }: Sponsor) {
  return (
    // The sponsored billboard's box: a tan ground with a tan-subtle border, and
    // a second border inset within it
    <div className="bg-tan-subtlest border border-tan-subtle p-3 lg:p-4">
      <div className="flex items-center justify-between gap-6 border border-tan-subtle px-5 py-4 lg:px-8 lg:py-5">
        {/* The billboard's eyebrow over the sponsor's name */}
        <div className="flex flex-col gap-1.5">
          <Eyebrow />
          <p className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]">{name}</p>
        </div>
        {/* The name is in the label, so the logo is decorative here */}
        <img src={logo} alt="" className="h-10 lg:h-14 w-auto flex-none" />
      </div>
    </div>
  )
}

export default function ArticleSponsorCredit({ name, logo }: Sponsor) {
  return (
    <div className="flex flex-col items-center gap-4 bg-tan-subtlest border border-tan-subtle px-6 py-6 text-center">
      <Eyebrow />
      <div className="w-full border-t border-tan-subtle" aria-hidden="true" />
      <img src={logo} alt={name} className="h-20 w-auto" />
    </div>
  )
}
