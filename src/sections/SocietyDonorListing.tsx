import { useState } from 'react'
import DonorTable from '@/components/ui/DonorTable'
import TabNav, { panelId, tabId } from '@/components/ui/TabNav'
import type { SocietyDonorYear } from '@/data/givingSocietyDonors'

/**
 * One society's honour roll, a year at a time.
 *
 * Tabs rather than five stacked lists, as the live pages do — the Leadership
 * Circle alone runs to nearly 1,200 names across its five years, and anyone
 * looking for a name is looking within a single year. Stacking all five for all
 * four societies on the consolidated page would run past 1,500 rows. The tab
 * bar is the one the book product pages use for author names.
 *
 * Ids are unique per society so the page's jump links have something to land
 * on, and so four tab lists on one page do not collide.
 */
export default function SocietyDonorListing({
  id,
  heading,
  deck,
  years,
  background = 'subtle',
}: {
  id: string
  heading: string
  /** The gift level that qualifies a donor for this society. */
  deck?: string
  years: SocietyDonorYear[]
  background?: 'white' | 'subtle'
}) {
  const [activeYear, setActiveYear] = useState(years[0]?.year ?? '')
  const current = years.find((y) => y.year === activeYear)
  if (!current) return null

  // Scoped so four listings on one page keep distinct tab / panel ids.
  const key = (year: string) => `${id}-${year}`

  return (
    <section
      id={id}
      className={`py-12 lg:py-16 scroll-mt-32 ${
        background === 'subtle' ? 'bg-tan-subtlest' : 'bg-white'
      }`}
    >
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
          {heading}
        </h2>

        {deck && (
          <p className="font-body font-semibold text-base lg:text-[17px] text-navy-subtle mt-5">
            {deck}
          </p>
        )}

        <TabNav
          label={`${heading} donor listing by year`}
          tabs={years.map((y) => ({ id: key(y.year), label: y.year }))}
          activeId={key(activeYear)}
          onChange={(tab) => setActiveYear(tab.slice(id.length + 1))}
          className="mt-6"
        />

        <div
          role="tabpanel"
          id={panelId(key(current.year))}
          aria-labelledby={tabId(key(current.year))}
          className="mt-6"
        >
          <DonorTable
            donors={current.donors}
            caption={`${heading} donors recognized in ${current.year}, in alphabetical order`}
          />
        </div>
      </div>
    </section>
  )
}
