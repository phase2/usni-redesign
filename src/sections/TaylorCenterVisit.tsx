import conferenceCenterImage from '@/assets/images/jackctaylorcenter-extended.jpg'
import { JCTCC_URL } from '@/sections/TaylorCenterAbout'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

/**
 * The hand-off to the Center's own site, closing the page.
 *
 * Same white-card-over-photo treatment as the conference center features on the
 * Giving and Events landings, so the three read as one family. It is the page's
 * single outbound booking call; the giving calls sit above it.
 */
export default function TaylorCenterVisit() {
  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${conferenceCenterImage})`, minHeight: '480px' }}
    >
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      <div className="relative container-site h-full flex items-center min-h-[480px]">
        <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] my-12">
          <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1] mb-4">
            Plan your event at the Center
          </h2>
          <p className="font-body text-base text-neutral-subtle leading-relaxed mb-6">
            Spaces, capacities, in-house AV, approved vendors, frequently asked questions, and the
            booking form all live on the Center&rsquo;s own site.
          </p>
          <a
            href={JCTCC_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
          >
            Visit the conference center website
            <ExternalLinkIcon size="1.1em" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  )
}
