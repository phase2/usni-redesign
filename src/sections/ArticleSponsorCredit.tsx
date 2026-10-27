/**
 * The sponsor credit on a sponsored article: a "Sponsored by" eyebrow and the
 * sponsor's logo in a tan block. The tan and the eyebrow treatment are the
 * Proceedings landing's sponsored billboard, so the article and its teaser read
 * as the same paid placement.
 *
 * It sits at the head of the ad rail, above the first ad, so the sponsor is
 * credited beside the opening of the article without covering the hero image.
 * Below xl the rail is hidden, and the `inline` layout carries the credit at
 * the top of the reading column instead.
 */
export default function ArticleSponsorCredit({
  name,
  logo,
  layout = 'stacked',
}: {
  name: string
  logo: string
  /** `stacked` for the 300px rail; `inline`, a single row, for the reading column. */
  layout?: 'stacked' | 'inline'
}) {
  const eyebrow = (
    <p className="font-body font-medium text-xs text-navy-subtle uppercase tracking-widest">
      Sponsored by
    </p>
  )

  if (layout === 'inline') {
    return (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 bg-tan-subtlest border border-tan-subtle px-5 py-4">
        {eyebrow}
        <img src={logo} alt={name} className="h-14 w-auto" />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4 bg-tan-subtlest border border-tan-subtle px-6 py-6 text-center">
      {eyebrow}
      <div className="w-full border-t border-tan-subtle" aria-hidden="true" />
      <img src={logo} alt={name} className="h-20 w-auto" />
    </div>
  )
}
