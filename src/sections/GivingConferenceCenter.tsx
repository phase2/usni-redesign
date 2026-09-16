import conferenceCenterImage from '@/assets/images/jackctaylorcenter-extended.jpg'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import { JCTCC_URL } from '@/sections/TaylorCenterAbout'

/**
 * The Taylor Center, closing the Giving landing.
 *
 * The secondary button used to point at `/conference-center`, a route that was
 * never built. It now leads to the Center's page in this section, and the
 * outbound link to the Center's own site is the one marked external.
 */
export default function GivingConferenceCenter() {
  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${conferenceCenterImage})`, minHeight: '520px' }}
    >
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      {/* White card — left side */}
      <div className="relative container-site h-full flex items-center min-h-[520px]">
        <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] my-12">
          <div className="eyebrow-headline mb-4">
            <p className="eyebrow">Hosting Inspiring Events</p>
            <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1]">
              The Jack C. Taylor Conference Center
            </h2>
          </div>
          <p className="font-body text-base text-neutral-subtle leading-relaxed mb-6">
            The Jack C. Taylor Conference Center is a Temporary Secure Working Area capable of
            hosting classified presentations and discussions up to the TS/SCI level. We look
            forward to hosting your next conference, lecture, workshop, meeting, or professional
            gathering.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/giving/taylor-conference-center"
              className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
            >
              About the Center
            </a>
            <a
              href={JCTCC_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-navy-bolder border border-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
            >
              Host an event
              <ExternalLinkIcon size="1.1em" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
