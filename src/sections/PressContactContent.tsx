import { memberServices, pressContact, pressGroups } from '@/data/contact'
import { DetailBlock, EmailLink, PeopleGrid, PhoneLink } from '@/sections/ContactSections'

/**
 * Contact the Naval Institute Press, at /books/contact.
 *
 * The live /press/contact-us, kept as its own page: its readers are booksellers,
 * reviewers, and authors rather than members, and its inquiries don't overlap
 * the hub's. The order follows the live page: the four kinds of inquiry, then
 * the staff by department, with the Press's address and social links beside the
 * inquiries.
 */

const inquiries = [
  {
    title: 'Review copies, events, and author interviews',
    body: (
      <>
        Contact Claire Noble, Sales and Marketing Director, at <EmailLink email="cnoble@usni.org" />.
      </>
    ),
  },
  {
    title: 'Orders from members and readers',
    body: (
      <>
        Orders may be placed on the Naval Institute website. For help with a title, placing or checking
        on an order, or a catalog, contact Member Services at <PhoneLink number={memberServices.tollFree} />{' '}
        ({memberServices.hours}) or <EmailLink email={memberServices.email} />.
      </>
    ),
  },
  {
    title: 'Trade retail and wholesale orders',
    body: (
      <>
        Send orders and inquiries to <EmailLink email="trade@usni.org" /> or <EmailLink email="jrussell@usni.org" />.
      </>
    ),
  },
  {
    title: 'Writing for the Press',
    body: (
      <>
        For manuscript submissions, see{' '}
        <a href="/books/about/writing" className="text-link">Writing for the Naval Institute Press</a>.
      </>
    ),
  },
]

export default function PressContactContent() {
  return (
    <>
      <section className="bg-white py-12 lg:py-16" aria-label="How to reach the Press">
        <div className="container-site">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 lg:gap-12 items-start">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {inquiries.map((n) => (
                <li key={n.title} className="border border-navy-subtle bg-white p-6 flex flex-col gap-2">
                  <h2 className="font-headline text-[22px] text-navy-bolder leading-tight">{n.title}</h2>
                  <p className="font-body text-[15px] text-neutral-bold leading-[1.65]">{n.body}</p>
                </li>
              ))}
            </ul>

            {/* The contact hub's tinted side panel */}
            <aside aria-label="Naval Institute Press address" className="bg-surface-subtle p-6 lg:p-7 flex flex-col gap-6">
              <DetailBlock title="Mailing address">
                <address className="not-italic">
                  {pressContact.address.map((l) => <span key={l} className="block">{l}</span>)}
                </address>
              </DetailBlock>
              <DetailBlock title="Telephone">
                <PhoneLink number={pressContact.phone} />
                <span>Fax {pressContact.fax}</span>
              </DetailBlock>
              <DetailBlock title="Social media">
                <ul className="flex flex-col gap-2 mt-0.5">
                  {pressContact.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2.5 text-navy-bolder hover:text-navy-bright transition-colors">
                        <span className="w-8 h-8 flex items-center justify-center bg-navy-bolder text-white group-hover:bg-navy-bright transition-colors flex-shrink-0" aria-hidden="true">
                          <i className={`${s.icon} text-sm`} />
                        </span>
                        <span className="font-semibold">{s.label}</span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </DetailBlock>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-tan-subtlest py-14 lg:py-16" aria-labelledby="press-staff-heading">
        <div className="container-site flex flex-col gap-10">
          <h2 id="press-staff-heading" className="font-headline text-[30px] lg:text-[40px] text-navy-bolder leading-[1.15]">
            Press staff
          </h2>
          {/* A light rule between departments, not above the first */}
          {pressGroups.map((g, i) => (
            <div key={g.title} className={`flex flex-col gap-5 ${i > 0 ? 'border-t border-tan-subtle pt-10' : ''}`}>
              <h3 className="font-headline text-[24px] lg:text-[28px] text-navy-bolder leading-[1.15]">{g.title}</h3>
              <PeopleGrid people={g.people} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
