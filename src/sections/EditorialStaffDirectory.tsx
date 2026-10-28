import { Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import CardCta from '@/components/ui/CardCta'
import TabNav, { panelId, tabId, type TabItem } from '@/components/ui/TabNav'
import {
  editorialStaff,
  magazineNames,
  type Magazine,
  type StaffMember,
  type StaffRole,
} from '@/data/editorialStaff'
import { EmailLink } from '@/sections/ContactSections'
import proceedingsImage from '@/assets/images/proceedings-main-hero-bk.webp'
import navalHistoryImage from '@/assets/images/naval-history-main-hero-banner.webp'

/**
 * The editorial masthead: one directory for both magazines, in place of the
 * live site's two near-duplicate contact pages.
 *
 * Tabs for all staff, Proceedings, and Naval History (the shared TabNav), kept
 * in `?magazine=`, narrow the list to the people on that magazine's masthead. Each magazine section's "Contact"
 * link opens the page pre-filtered, so a reader coming from Naval History sees
 * Naval History's staff first and can widen to everyone with one click.
 */

const submissionCards = [
  {
    href: '/proceedings/submit',
    mag: 'Proceedings',
    image: proceedingsImage,
    body: 'Feature articles, commentary, Professional Notes, and the departments, with word limits and the review cycle.',
  },
  {
    href: '/naval-history/submit',
    mag: 'Naval History',
    image: navalHistoryImage,
    body: 'Article length, payment rates, and how to send a manuscript.',
  },
]

const tabs: TabItem[] = [
  { id: 'all', label: 'All staff' },
  { id: 'proceedings', label: 'Proceedings' },
  { id: 'naval-history', label: 'Naval History' },
]

function RoleLine({ role }: { role: StaffRole }) {
  return (
    <>
      {role.title}
      {role.magazines.length > 0 && ', '}
      {role.magazines.map((m, i) => (
        <Fragment key={m}>
          {i > 0 && ' and '}
          <em>{magazineNames[m]}</em>
        </Fragment>
      ))}
    </>
  )
}

function StaffCard({ person, magazine }: { person: StaffMember; magazine: Magazine | null }) {
  // The filtered magazine's titles lead; Institute titles apply to both
  const roles = magazine
    ? [...person.roles].sort(
        (a, b) =>
          Number(!(a.magazines.includes(magazine) || a.magazines.length === 0)) -
          Number(!(b.magazines.includes(magazine) || b.magazines.length === 0)),
      )
    : person.roles

  return (
    <li className="border border-navy-subtle bg-white p-5 flex flex-col gap-1.5">
      <h3 className="font-headline text-[20px] text-navy-bolder leading-tight">
        {person.profileHref ? (
          <a href={person.profileHref} className="article-link hover:text-navy-subtle">{person.name}</a>
        ) : (
          person.name
        )}
      </h3>
      <ul className="flex flex-col gap-0.5">
        {roles.map((r) => (
          <li key={r.title + r.magazines.join()} className="font-body text-sm text-neutral-bold leading-snug">
            <RoleLine role={r} />
          </li>
        ))}
      </ul>
      {person.email && (
        <p className="font-body text-sm mt-1.5">
          <EmailLink email={person.email} />
        </p>
      )}
    </li>
  )
}

export default function EditorialStaffDirectory() {
  const [params, setParams] = useSearchParams()
  const raw = params.get('magazine')
  const magazine: Magazine | null = raw === 'proceedings' || raw === 'naval-history' ? raw : null

  const activeTab = magazine ?? 'all'

  const pick = (id: string) => {
    const next = new URLSearchParams(params)
    if (id !== 'all') next.set('magazine', id)
    else next.delete('magazine')
    setParams(next, { replace: true })
  }

  const groups = editorialStaff
    .map((g) => ({ ...g, people: magazine ? g.people.filter((p) => p.mastheads.includes(magazine)) : g.people }))
    .filter((g) => g.people.length > 0)

  return (
    <>
      <section className="bg-white py-12 lg:py-16">
        <div className="container-site flex flex-col gap-10 lg:gap-12">
          <TabNav tabs={tabs} activeId={activeTab} onChange={pick} label="Editorial staff by magazine" size="lg" />

          <div role="tabpanel" id={panelId(activeTab)} aria-labelledby={tabId(activeTab)} className="flex flex-col gap-10 lg:gap-12">
            {groups.map((g) => (
              <div key={g.id} className="flex flex-col gap-6" role="group" aria-labelledby={`staff-${g.id}`}>
                <h2 id={`staff-${g.id}`} className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]">
                  {g.title}
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
                  {g.people.map((p) => <StaffCard key={p.name} person={p} magazine={magazine} />)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-subtle py-14 lg:py-16" aria-labelledby="write-for-us-heading">
        <div className="container-site">
          <h2 id="write-for-us-heading" className="font-headline text-[30px] lg:text-[40px] text-navy-bolder leading-[1.15] mb-8">
            Write for us
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {submissionCards.map((c) => (
              <li key={c.href}>
                <a href={c.href}
                  className="group flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow">
                  {/* Each magazine's own section hero, at its 12:5 proportion */}
                  <div className="aspect-[12/5] overflow-hidden bg-neutral-subtlest">
                    <img src={c.image} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col gap-3 p-6 lg:p-7 flex-1">
                    <h3 className="font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]">
                      <em>{c.mag}</em> submission guidelines
                    </h3>
                    <p className="font-body text-[15px] text-neutral-bold leading-[1.65] flex-1">{c.body}</p>
                    <div className="pt-1">
                      <CardCta>Read the guidelines</CardCta>
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
