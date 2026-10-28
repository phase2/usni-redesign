import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import { archivesContact, telHref } from '@/data/contact'
import { EmailLink } from '@/sections/ContactSections'

/**
 * Research Requests, at /archives/research-requests.
 *
 * The live /archives/contact-us renamed for what it is: a research service with
 * a turnaround, not a directory. The three ways in (a request by email, a visit
 * to the library, and the photo archive) lead as cards with their own action;
 * the live page's general inboxes (customer and member services) follow as
 * "Other questions". The photo collection figures come from the live page,
 * where they had been pasted into the research mailto link by mistake.
 */

const services = [
  {
    title: 'Send a research request',
    body: 'Library staff assist with research requests from people who can’t visit Beach Hall, including copies of past articles.',
    detail: 'Simple requests are normally handled within 24–48 hours. Detailed requests may take longer.',
    action: { label: 'Email research@usni.org', href: `mailto:${archivesContact.researchEmail}?subject=Research%20request` },
  },
  {
    title: 'Visit the library',
    body: 'The library is open to the public, and researchers are welcome to work on site in Beach Hall at the Naval Academy.',
    detail: `Schedule a visit by calling ${archivesContact.libraryPhone}.`,
    action: { label: `Call ${archivesContact.libraryPhone}`, href: telHref(archivesContact.libraryPhone) },
  },
  {
    title: 'Find a photo',
    body: 'About 15,000 images are online, from a collection of more than 450,000 spanning the Civil War to the present.',
    detail: `Questions about photos or orders go to ${archivesContact.photoEmail}.`,
    action: { label: 'Search the photo archive', href: archivesContact.photoSite, external: true },
  },
]

export default function ArchivesResearchContent() {
  return (
    <>
      <section className="bg-white py-12 lg:py-16" aria-labelledby="research-services-heading">
        <div className="container-site flex flex-col gap-8">
          <h2 id="research-services-heading" className="font-headline text-[30px] lg:text-[40px] text-navy-bolder leading-[1.15]">
            How we can help
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {services.map((s) => (
              <li key={s.title} className="flex flex-col gap-3 bg-white border border-navy-subtle p-6 lg:p-7">
                <h3 className="font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]">{s.title}</h3>
                <p className="font-body text-[15px] text-neutral-bold leading-[1.65]">{s.body}</p>
                <p className="font-body text-[15px] text-navy-bolder font-semibold leading-[1.5] flex-1">{s.detail}</p>
                <div className="pt-2">
                  <ButtonLink
                    href={s.action.href}
                    variant="navy"
                    size="md"
                    fullWidth
                    {...(s.action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {s.action.label}
                    {s.action.external && (
                      <>
                        <span className="sr-only"> (opens in a new tab)</span>
                        <ExternalLinkIcon size="1em" />
                      </>
                    )}
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-tan-subtlest py-12 lg:py-14" aria-labelledby="research-other-heading">
        <div className="container-site">
          <div className="max-w-[860px] flex flex-col gap-4">
            <h2 id="research-other-heading" className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]">
              Other questions
            </h2>
            <ul className="flex flex-col gap-2 font-body text-base text-navy-bolder leading-[1.6]">
              <li>
                Orders and customer service: <EmailLink email={archivesContact.customerEmail} />
              </li>
              <li>
                Membership: <a href="/membership/contact" className="text-link">Contact Member Services</a>
              </li>
              <li>
                Directions and getting onto the Naval Academy grounds:{' '}
                <a href="/contact#visiting" className="text-link">Visiting us</a>
              </li>
              <li>
                Common questions about the library:{' '}
                <a href="/faq#research-library-and-archive" className="text-link">Research Library and Archive FAQ</a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}
