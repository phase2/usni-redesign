/**
 * A donor honour roll as a two-column table.
 *
 * Filled column-major: with 37 names the first column takes 19 and the second
 * 18, so row 0 is [0, 19], row 1 is [1, 20], and so on. Filling row-major
 * instead would run the alphabet across each row, which is not how anyone scans
 * for a name — and not how the source tables are laid out.
 *
 * `min-w` keeps both columns wide enough to read a rank-and-name on a phone;
 * the wrapper scrolls rather than squeezing them to a third of the screen, the
 * same arrangement the account tables use.
 *
 * A trailing asterisk on a name marks a deceased donor, and the footnote is
 * derived from the names rather than passed in: the live pages carry it
 * inconsistently — the 1873 Society's 2022 tab prints the note with no starred
 * name in the list — so reading it off the data is the more reliable of the two.
 */
export default function DonorTable({
  donors,
  caption,
}: {
  /** Alphabetical, as the source table reads down its columns. */
  donors: string[]
  /** Names the table for a screen reader; never shown. */
  caption: string
}) {
  const rowCount = Math.ceil(donors.length / 2)
  const rows = Array.from({ length: rowCount }, (_, i) => [donors[i], donors[i + rowCount]])
  const hasDeceased = donors.some((name) => name.includes('*'))

  return (
    <>
      <div className="border border-border-light overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse bg-white">
          <caption className="sr-only">{caption}</caption>
          <tbody>
            {rows.map(([left, right], i) => (
              <tr key={left ?? i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f4f6]'}>
                <td className="w-1/2 align-top font-body text-[15px] text-neutral-bold leading-[1.5] px-5 py-3">
                  {left}
                </td>
                <td className="w-1/2 align-top font-body text-[15px] text-neutral-bold leading-[1.5] px-5 py-3 border-l border-border-light">
                  {right}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {hasDeceased && (
        <p className="font-body text-sm text-neutral-subtle mt-5">* Deceased</p>
      )}
    </>
  )
}
