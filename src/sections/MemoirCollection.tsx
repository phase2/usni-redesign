import { useMemo, useRef, useState, type FormEvent } from 'react'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink, Button } from '@/components/ui/Button'
import { Field, SelectInput, TextInput } from '@/components/ui/FormField'
import Pagination from '@/components/ui/Pagination'
import { ResultsCount } from '@/components/ui/ResultsList'
import PageHero from '@/sections/PageHero'
import { memoirCoversYear, memoirHref, memoirImage, memoirs, type Memoir } from '@/data/memoirs'
import imgHero from '@/assets/images/memoirs-hero-mahan.jpg'

/**
 * Naval Institute Memoir Collection — /archives/memoirs.
 *
 * Migrated from the live /archives/memoirs, copy word for word: the hero
 * (title, tagline, and lede), the introduction with its bullets and the
 * Submit a Memoir call to action, then Search Memoirs — a filter form over the
 * collection, nine cards to a page.
 *
 * The live form has Ship Types, Last Name, Year, and Engagements fields. No
 * memoir carries a ship type, so that field is left out; Year is matched
 * against each memoir's Timeframe (see `memoirCoversYear`), since no memoir
 * has a year of its own. As on the live site, the filters apply when the form
 * is submitted, not as you type.
 */

const PER_PAGE = 9

/** The live Engagements options, in the live order. */
const ENGAGEMENTS = [
  'Afghan War',
  'American Revolution',
  'Anti-Slave Trade Enforcement',
  'Banana Wars',
  'Civil War',
  'Cold War',
  'First Gulf War',
  'Korean War',
  'Philippine Insurrection',
  'Pre-Revolution',
  'Second Gulf War',
  'Spanish-American War',
  'Uncategorized',
  'Vietnam War',
  'War of 1812',
  'War with Mexico',
  'World War I',
  'World War II',
]

interface Filters {
  lastName: string
  year: string
  engagement: string
}

const NO_FILTERS: Filters = { lastName: '', year: '', engagement: '' }

function MemoirCard({ memoir }: { memoir: Memoir }) {
  const src = memoirImage(memoir.image)
  return (
    <article className="group relative flex flex-col gap-4 bg-white border border-navy-subtle p-6 h-full hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-surface-subtle flex items-center justify-center">
          {src ? (
            <img src={src} alt={memoir.imageAlt ?? ''} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <i className="fa-solid fa-user text-2xl text-navy-subtle/50" aria-hidden="true" />
          )}
        </div>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className="font-body font-medium text-xs uppercase tracking-[0.08em] text-navy-subtle">Memoir</p>
          <p className="font-body font-bold text-sm text-navy-bolder">{memoir.engagement}</p>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <h3 className="font-headline text-xl leading-[1.25]">
          {/* Stretched hit area so the whole card is clickable */}
          <a href={memoirHref(memoir)} className="link-underline-hover text-navy-bolder after:absolute after:inset-0">
            {memoir.title}
          </a>
        </h3>
        <p className="font-body text-sm text-navy-subtle leading-snug">{memoir.name}</p>
      </div>

      <p className="font-body text-sm text-neutral-subtle leading-relaxed line-clamp-4">{memoir.summary}</p>

      <p className="mt-auto pt-1 font-body font-semibold text-sm text-link inline-flex items-center gap-2" aria-hidden="true">
        Read This Memoir
        <i className="fa-solid fa-arrow-right text-xs" />
      </p>
    </article>
  )
}

function SearchMemoirs() {
  const [draft, setDraft] = useState<Filters>(NO_FILTERS)
  const [applied, setApplied] = useState<Filters>(NO_FILTERS)
  const [page, setPage] = useState(1)
  const topRef = useRef<HTMLDivElement>(null)

  const results = useMemo(() => {
    const last = applied.lastName.trim().toLowerCase()
    const year = /^\d{4}$/.test(applied.year.trim()) ? Number(applied.year.trim()) : null
    return memoirs.filter(
      (m) =>
        (!last || m.lastName.toLowerCase().includes(last)) &&
        (!applied.engagement || m.engagement === applied.engagement) &&
        (year === null || memoirCoversYear(m, year)),
    )
  }, [applied])

  const active = applied.lastName.trim() !== '' || applied.year.trim() !== '' || applied.engagement !== ''

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setApplied(draft)
    setPage(1)
  }

  const reset = () => {
    setDraft(NO_FILTERS)
    setApplied(NO_FILTERS)
    setPage(1)
  }

  const totalPages = Math.max(1, Math.ceil(results.length / PER_PAGE))
  const current = Math.min(page, totalPages)
  const pageItems = results.slice((current - 1) * PER_PAGE, current * PER_PAGE)

  const goToPage = (p: number) => {
    setPage(p)
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section aria-labelledby="search-memoirs" className="bg-surface-subtle py-12 lg:py-16">
      <div className="container-site flex flex-col gap-6">
        <h2 id="search-memoirs" className="font-headline text-[32px] lg:text-[40px] text-navy-bolder leading-[1.1]">
          Search Memoirs
        </h2>

        <form
          role="search"
          aria-label="Filter memoirs"
          onSubmit={onSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_auto] gap-4 lg:items-end bg-white border border-border-light p-5 lg:p-6"
        >
          <Field label="Last Name" htmlFor="memoir-last-name">
            <TextInput
              id="memoir-last-name"
              value={draft.lastName}
              onChange={(e) => setDraft((d) => ({ ...d, lastName: e.target.value }))}
            />
          </Field>
          <Field label="Year" htmlFor="memoir-year">
            <TextInput
              id="memoir-year"
              inputMode="numeric"
              placeholder="YYYY"
              maxLength={4}
              value={draft.year}
              onChange={(e) => setDraft((d) => ({ ...d, year: e.target.value }))}
            />
          </Field>
          <Field label="Engagements" htmlFor="memoir-engagement">
            <SelectInput
              id="memoir-engagement"
              value={draft.engagement}
              onChange={(e) => setDraft((d) => ({ ...d, engagement: e.target.value }))}
            >
              <option value="">- Any -</option>
              {ENGAGEMENTS.map((en) => (
                <option key={en} value={en}>
                  {en}
                </option>
              ))}
            </SelectInput>
          </Field>
          <div className="flex items-center gap-4">
            <Button type="submit" variant="navy">
              Filter Memoirs
            </Button>
            {active && (
              <button type="button" onClick={reset} className="font-body text-sm text-link whitespace-nowrap">
                Reset
              </button>
            )}
          </div>
        </form>

        <div ref={topRef} className="scroll-mt-32 flex flex-col gap-6">
          {results.length > 0 ? (
            <ResultsCount page={current} perPage={PER_PAGE} total={results.length} noun="memoirs" />
          ) : (
            <p className="font-body text-sm text-neutral-subtle">No memoirs</p>
          )}

          {pageItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageItems.map((m) => (
                <MemoirCard key={m.slug} memoir={m} />
              ))}
            </div>
          ) : (
            <div className="py-6 flex flex-col gap-3">
              <p className="font-headline text-2xl text-navy-bolder">No memoirs match these filters.</p>
              <p className="font-body text-base text-neutral-subtle leading-relaxed">
                Try a different name, year, or engagement, or{' '}
                <button type="button" onClick={reset} className="text-link">
                  reset the filters
                </button>
                .
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <div className="pt-4">
              <Pagination label="Memoirs pagination" totalPages={totalPages} page={current} onChange={goToPage} />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default function MemoirCollection() {
  return (
    <>
      <PageHero
        title="Naval Institute Memoir Collection"
        description="Preserving the personal legacies of those who served."
        image={imgHero}
        breadcrumb={
          <Breadcrumb
            trail={[
              { label: 'Home', href: '/' },
              { label: 'Archives', href: '/archives' },
            ]}
            current="Memoirs"
            tone="dark"
            className="pb-4 border-b border-white/25"
          />
        }
      >
        <p className="font-body text-base lg:text-lg text-neutral-subtlest leading-relaxed">
          The U.S. Naval Institute’s Memoir Collection honors and preserves the personal stories of those who served in
          the Navy, Marine Corps, and Coast Guard.
        </p>
      </PageHero>

      <section aria-labelledby="memoir-intro" className="bg-white py-12 lg:py-16">
        <div className="container-site">
          <div className="max-w-[860px] mx-auto flex flex-col gap-6">
            <h2
              id="memoir-intro"
              className="font-headline text-[32px] lg:text-[40px] text-navy-bolder leading-[1.1]"
            >
              The U.S. Naval Institute Memoir Collection
            </h2>
            <p className="font-body text-base lg:text-lg text-neutral-bold leading-[1.7]">
              The U.S. Naval Institute’s Memoir Collection honors and preserves the personal stories of those who
              served in the Navy, Marine Corps, and Coast Guard. For family members, friends, shipmates, and
              researchers, the growing Collection serves as a valuable source of firsthand accounts and primary-source
              history.
            </p>
            <ul className="list-disc pl-6 flex flex-col gap-3 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
              <li>Many rank their military service as a defining milestone in their lives.</li>
              <li>
                While service memoirs generally face tough hurdles in the publishing market, the Naval Institute Memoir
                Collection provides authors with an accessible, central online location for the preservation of their
                autobiographical accounts, viewable today and by future generations as well. Whether already
                self-published or never published, their stories have a welcoming venue in perpetuity with the USNI
                Memoir Collection.
              </li>
              <li>
                Others may have a memoir - of their own or of a family member's service - simply gathering dust
                somewhere, unseen but nonetheless a part of the overall American historical record. With the Memoir
                Collection, such memories - be they in the form of a shorter vignette or a fuller autobiography - now
                have a valued place in a permanent, searchable online archive.
              </li>
              <li>Learn more by clicking below.</li>
            </ul>

            <div className="mt-4 bg-tan-subtlest border-t-4 border-tan px-6 py-8 lg:px-10 flex flex-col items-start gap-5">
              <h3 className="font-headline text-[26px] lg:text-[30px] text-navy-bolder leading-[1.15]">
                Do You Have a Story To Share?
              </h3>
              <ButtonLink href="/archives/memoirs/submit" variant="navy">Submit a Memoir</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <SearchMemoirs />
    </>
  )
}
