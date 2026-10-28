import { useEffect, useRef } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { entryYear, stateOfTheInstituteEntries } from '@/data/stateOfTheInstitute'

/**
 * The State of the Institute archive, one year at a time. Archived as a future
 * enhancement: the live page migrates one to one (StateOfTheInstituteEntries),
 * and this view is kept at /about/state-of-the-institute/by-year for reference.
 *
 * The live page is one long scroll of every dated notice back to 2012. Here a
 * Year select at the top of the reading column shows a single year's notices,
 * newest year by default, with Newer / Older links at the foot to step through.
 * The year lives in `?year=`, so a year can be linked to and Back works.
 *
 * Each entry's date is its heading; the body is the live page's markup (see
 * src/data/stateOfTheInstitute.ts), styled by the `.rich-text` house styles in
 * index.css. The markup is trusted — transcribed by us, not user input — which
 * is what makes rendering it as HTML acceptable here.
 */

/** Every year with a notice, newest first. */
const years = [...new Set(stateOfTheInstituteEntries.map(entryYear))].sort((a, b) => b - a)

/**
 * With one year on screen, the 2016 notice's "below" link to the 2015 bylaws
 * amendments has to open 2015 first.
 */
const html = (markup: string) => markup.replace('href="#ballot"', 'href="?year=2015#ballot"')

export default function StateOfTheInstituteByYear() {
  const [params, setParams] = useSearchParams()
  const { hash } = useLocation()
  const topRef = useRef<HTMLDivElement>(null)

  const requested = Number(params.get('year'))
  const year = years.includes(requested) ? requested : years[0]
  const entries = stateOfTheInstituteEntries.filter((e) => entryYear(e) === year)

  const index = years.indexOf(year)
  const newer = index > 0 ? years[index - 1] : undefined
  const older = index < years.length - 1 ? years[index + 1] : undefined

  const showYear = (y: number) => {
    setParams({ year: String(y) })
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // A link into another year's notice (`?year=2015#ballot`) arrives before
  // that year has rendered, so the browser can't find the anchor on its own.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView()
  }, [hash, year])

  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div ref={topRef} className="max-w-[860px] mx-auto flex flex-col scroll-mt-32">

          <div className="flex flex-col gap-3 pb-8 mb-10 lg:mb-12 border-b border-neutral-subtler"
          >
            <label
              htmlFor="soti-year"
              className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-neutral-subtle"
            >
              Select Year
            </label>
            <select
              id="soti-year"
              value={year}
              onChange={(e) => showYear(Number(e.target.value))}
              className="w-full sm:w-auto sm:min-w-[180px] sm:self-start select-field font-body text-base text-navy-bolder border border-[#94A3B8] pl-3.5 py-2
                bg-white cursor-pointer outline-none focus:border-navy-bright
                focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {entries.map((entry, i) => (
            <article
              key={`${entry.date}-${i}`}
              className={`flex flex-col gap-5 ${
                i > 0 ? 'border-t border-neutral-subtler pt-10 mt-10 lg:pt-12 lg:mt-12' : ''
              }`}
            >
              <h2 className="font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15]">
                {entry.date}
              </h2>
              <div className="rich-text" dangerouslySetInnerHTML={{ __html: html(entry.html) }} />
            </article>
          ))}

          {(newer || older) && (
            <nav
              aria-label="Adjacent years"
              className="flex items-center justify-between gap-4 border-t border-neutral-subtler pt-8 mt-12"
            >
              {newer ? (
                <button
                  type="button"
                  onClick={() => showYear(newer)}
                  className="font-body font-bold text-sm text-link"
                >
                  &larr; {newer}
                </button>
              ) : <span />}
              {older && (
                <button
                  type="button"
                  onClick={() => showYear(older)}
                  className="font-body font-bold text-sm text-link"
                >
                  {older} &rarr;
                </button>
              )}
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}
