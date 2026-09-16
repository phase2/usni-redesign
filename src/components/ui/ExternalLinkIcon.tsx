/**
 * Marks a link that leaves the site. Sized in `em` so it tracks whatever type
 * it sits beside, and hidden from assistive tech — the link itself carries a
 * "(opens in a new tab)" note instead.
 */
export default function ExternalLinkIcon({
  className = '',
  /**
   * Height and width, relative to the surrounding type. The 0.75em default is
   * right for an inline link; inside a button the glyph needs more to be
   * recognisable, so callers there pass 1.1em.
   */
  size = '0.75em',
}: {
  className?: string
  size?: string
}) {
  return (
    <svg
      style={{ width: size, height: size }}
      className={`inline-block flex-shrink-0 ${className}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.5 2.5H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.5" />
      <path d="M9.5 2.5h4v4M13.5 2.5L7 9" />
    </svg>
  )
}
