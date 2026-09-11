import {
  CONTACT_PLACEHOLDER_IMAGE,
  foundationContact,
  foundationStaff,
} from '@/data/contact'

/**
 * The Foundation's development team, and how to reach the office.
 *
 * The live site puts the staff and the contact details in two columns side by
 * side, which reads as two unrelated blocks. Here the people come first and the
 * office details sit under a rule below them — you meet the team, then you get
 * the address.
 *
 * Portraits use the circle-and-tan-ring treatment from the leadership roster,
 * including its watermark stand-in for the two staff we have no headshot for —
 * so a missing photo reads as a deliberate placeholder rather than a gap.
 */
export default function GivingMeetTheTeam() {
  const phones: { label: string; value: string }[] = [
    { label: 'Foundation office', value: foundationContact.phone },
    { label: 'General information (toll-free)', value: foundationContact.tollFree },
    { label: 'General information (local)', value: foundationContact.local },
    { label: 'Fax', value: foundationContact.fax },
  ]

  return (
    <section id="meet-the-team" className="bg-white py-16 lg:py-20 scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
          Meet the Team
        </h2>

        <p className="font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] max-w-[780px] mt-6">
          {foundationContact.blurb}
        </p>

        {/* The team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-10">
          {foundationStaff.map((person) => {
            // The watermark carries its own margin on a tinted field, so it
            // fills the circle without the slight zoom real photos need to
            // clear their anti-aliased edge.
            const isPlaceholder = person.image === CONTACT_PLACEHOLDER_IMAGE
            return (
              <div key={person.email} className="flex flex-col items-center text-center gap-4">
                <div
                  className={`w-[132px] h-[132px] lg:w-[148px] lg:h-[148px] rounded-full overflow-hidden
                              border-[6px] border-tan flex-shrink-0
                              ${isPlaceholder ? 'bg-tan-subtlest' : 'bg-white'}`}
                >
                  <img
                    src={person.image}
                    alt={isPlaceholder ? '' : person.name}
                    aria-hidden={isPlaceholder || undefined}
                    loading="lazy"
                    className={`w-full h-full object-cover ${isPlaceholder ? '' : 'scale-[1.08]'}`}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <h3 className="font-headline text-[22px] text-navy-bolder leading-[1.2]">
                    {person.name}
                  </h3>
                  <p className="font-body font-semibold text-[15px] text-navy-subtle leading-snug">
                    {person.role}
                  </p>
                  {/* `items-center` rather than relying on `text-center`:
                      `.text-link` shrinks the email to `width: fit-content`, so
                      as a stretch-aligned flex child it would sit at the left
                      edge while the full-width phone above it centred. */}
                  <div className="flex flex-col items-center gap-0.5 mt-1.5">
                    {person.phone && (
                      <a
                        href={`tel:${person.phone.replace(/[^0-9+]/g, '')}`}
                        className="font-body text-[15px] text-neutral-bold hover:text-navy-bolder transition-colors"
                      >
                        {person.phone}
                      </a>
                    )}
                    <a
                      href={`mailto:${person.email}`}
                      className="font-body text-[15px] text-link break-words"
                    >
                      {person.email}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Office details, under the rule */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mt-12 pt-10 border-t border-border-light">
          <div className="flex flex-col gap-2">
            <h3 className="font-body font-bold text-sm uppercase tracking-[0.08em] text-navy-subtle">
              Mailing Address
            </h3>
            <address className="font-body text-base text-neutral-bold leading-[1.7] not-italic">
              {foundationContact.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-body font-bold text-sm uppercase tracking-[0.08em] text-navy-subtle">
              Email
            </h3>
            <a
              href={`mailto:${foundationContact.email}`}
              className="font-body text-base text-link self-start break-words"
            >
              {foundationContact.email}
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-body font-bold text-sm uppercase tracking-[0.08em] text-navy-subtle">
              Phone Numbers
            </h3>
            <ul className="flex flex-col gap-1">
              {phones.map((phone) => (
                <li key={phone.label} className="font-body text-base text-neutral-bold leading-[1.6]">
                  {phone.label}:{' '}
                  <a
                    href={`tel:${phone.value.replace(/[^0-9+]/g, '')}`}
                    className="hover:text-navy-bolder transition-colors"
                  >
                    {phone.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
