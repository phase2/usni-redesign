import { useMemo, useState } from 'react'
import {
  foundationEmail,
  regionTotals,
  schoolLogo,
  schools,
  type School,
} from '@/data/studentMemberships'

/**
 * Every unit the Foundation is raising gratis memberships for, filterable.
 *
 * The live page pairs a region dropdown with a state dropdown, then an Apply
 * button. State is a filter-only field — no school record carries one — so this
 * filters on the two things the cards can actually answer: region, and the
 * school's name. Both apply as you type or click, with no Apply step.
 *
 * Each school shows how far along its sponsorship is, because "42 of 162" is
 * the number a prospective donor is deciding against; the live page prints the
 * two counts but never relates them.
 */

const REGIONS = regionTotals.map((r) => r.region)

function SchoolCard({ school }: { school: School }) {
  const [unitsOpen, setUnitsOpen] = useState(false)
  const goal = school.members + school.needed
  const pct = goal > 0 ? Math.round((school.members / goal) * 100) : 100

  return (
    <article className="bg-white border border-navy-subtle p-5 lg:p-6 flex flex-col gap-4">
      <div className="flex items-start gap-4">
        {schoolLogo(school.logo) && (
          <img
            src={schoolLogo(school.logo)}
            alt=""
            loading="lazy"
            className="w-16 h-16 object-contain flex-shrink-0"
          />
        )}
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-headline text-[20px] text-navy-bolder leading-[1.2]">
            {school.name}
          </h3>
          <p className="font-body font-semibold text-xs uppercase tracking-[0.08em] text-navy-subtle">
            {school.region}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-body text-sm text-neutral-bold">
            <span className="font-bold text-navy-bolder">{school.members.toLocaleString()}</span>{' '}
            sponsored
          </p>
          <p className="font-body text-sm text-neutral-subtle">
            {school.needed.toLocaleString()} still needed
          </p>
        </div>
        {/* Decorative: both numbers are already stated above it in text. */}
        <div className="h-1.5 bg-neutral-subtlest overflow-hidden" aria-hidden="true">
          <div className="h-full bg-[#0466c8]" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {school.note && (
        <p className="font-body text-sm text-neutral-subtle leading-[1.55]">{school.note}</p>
      )}

      {school.donors.length > 0 && (
        <div className="border-t border-border-light pt-3">
          <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-navy-subtle mb-1.5">
            Donors
          </p>
          <ul className="flex flex-col gap-1">
            {school.donors.map((donor) => (
              <li key={donor} className="font-body text-sm text-neutral-bold leading-snug">
                {donor}
              </li>
            ))}
          </ul>
        </div>
      )}

      {school.units.length > 0 && (
        <div className="border-t border-border-light pt-3">
          <button
            type="button"
            onClick={() => setUnitsOpen((o) => !o)}
            aria-expanded={unitsOpen}
            className="flex items-center gap-2 font-body font-bold text-sm text-[#0466c8] hover:text-navy-bolder transition-colors"
          >
            {unitsOpen ? 'Hide' : 'Show'} {school.units.length} companies
            <i
              className={`fa-solid fa-chevron-down text-xs transition-transform ${
                unitsOpen ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>

          {unitsOpen && (
            <ul className="flex flex-col gap-2 mt-3">
              {school.units.map((unit) => (
                <li
                  key={unit.name}
                  className="flex items-baseline justify-between gap-3 font-body text-sm border-b border-border-light last:border-0 pb-2 last:pb-0"
                >
                  <span className="text-navy-bolder font-semibold">{unit.name}</span>
                  <span className="text-neutral-subtle whitespace-nowrap">
                    {unit.members} sponsored · {unit.needed} needed
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      <a
        href={`mailto:${foundationEmail}?subject=${encodeURIComponent(
          `Sponsoring Student Memberships — ${school.name}`,
        )}`}
        className="mt-auto inline-flex items-center justify-center gap-2 border border-navy-bolder text-navy-bolder font-body font-bold text-sm px-5 py-3 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
      >
        Sponsor this unit
      </a>
    </article>
  )
}

export default function StudentSchoolDirectory() {
  const [region, setRegion] = useState('all')
  const [query, setQuery] = useState('')

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return schools.filter(
      (s) =>
        (region === 'all' || s.region === region) &&
        (!q || s.name.toLowerCase().includes(q)),
    )
  }, [region, query])

  return (
    <section id="schools" className="bg-tan-subtlest py-12 lg:py-16 scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
          Academies &amp; Colleges
        </h2>

        {/* Region totals, as the live page opens the directory */}
        <div className="border border-border-light overflow-x-auto mt-6 bg-white">
          <table className="w-full min-w-[560px] border-collapse">
            <caption className="sr-only">
              Sponsored student memberships by region
            </caption>
            <thead>
              <tr className="bg-navy-bolder">
                {['Region', 'Schools', 'Memberships Given', 'Memberships Needed'].map((h, i) => (
                  <th
                    key={h}
                    scope="col"
                    className={`font-body font-bold text-[12px] uppercase tracking-[0.06em] text-white px-5 py-3 ${
                      i === 0 ? 'text-left' : 'text-right'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {regionTotals.map((r, i) => (
                <tr key={r.region} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f4f4f6]'}>
                  <td className="font-body text-[15px] text-navy-bolder font-semibold px-5 py-3">
                    {r.region}
                  </td>
                  <td className="font-body text-[15px] text-neutral-bold px-5 py-3 text-right">
                    {r.schools}
                  </td>
                  <td className="font-body text-[15px] text-neutral-bold px-5 py-3 text-right">
                    {r.given.toLocaleString()}
                  </td>
                  <td className="font-body text-[15px] text-neutral-bold px-5 py-3 text-right">
                    {r.needed.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-10">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <label
              htmlFor="school-search"
              className="font-body font-bold text-xs uppercase tracking-[0.08em] text-navy-subtle"
            >
              Find a school
            </label>
            <input
              id="school-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name"
              className="font-body text-base border border-navy-subtle bg-white px-4 py-2.5 focus:outline-2 focus:outline-offset-2 focus:outline-[#0466c8]"
            />
          </div>
          <div className="flex flex-col gap-1.5 sm:w-[240px]">
            <label
              htmlFor="school-region"
              className="font-body font-bold text-xs uppercase tracking-[0.08em] text-navy-subtle"
            >
              Region
            </label>
            <select
              id="school-region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="font-body text-base border border-navy-subtle bg-white px-4 py-2.5 focus:outline-2 focus:outline-offset-2 focus:outline-[#0466c8]"
            >
              <option value="all">All regions</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="font-body text-sm text-neutral-subtle mt-4" role="status">
          Showing {visible.length} of {schools.length} schools
        </p>

        {visible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {visible.map((school) => (
              <SchoolCard key={school.slug} school={school} />
            ))}
          </div>
        ) : (
          <p className="font-body text-base text-neutral-bold bg-white border border-border-light p-6 mt-6">
            No schools match that search. Try a different name or region.
          </p>
        )}
      </div>
    </section>
  )
}
