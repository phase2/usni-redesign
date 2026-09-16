import { useState } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import {
  givingOpportunities,
  opportunityBanner,
  type Opportunity,
} from '@/data/givingOpportunities'

/**
 * The ten giving opportunities, as the site's standard accordion.
 *
 * Rows carry the title alone — the same treatment "Ways to Give" uses on the
 * Giving landing, so ten closed rows fit on one screen and a reader can scan
 * the whole list before opening anything. The teaser line and the thumbnail
 * that used to sit in the row moved into the panel, where the banner has room
 * to run at its own 3:1 proportion.
 *
 * Each panel ends with a Donate Today button, as every one of the source pages
 * does. It is rendered here rather than stored in the copy so the label and
 * destination stay the same across all ten. An opportunity may add a second,
 * more specific button of its own — see `cta` in `givingOpportunities`.
 */
function AccordionItem({
  opp,
  open,
  onToggle,
}: {
  opp: Opportunity
  open: boolean
  onToggle: () => void
}) {
  return (
    <div className={`border-b border-border-light last:border-b-0 ${open ? 'bg-white' : ''}`}>
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={`opportunity-${opp.id}`}
          className="accordion-row flex items-center justify-between gap-5 w-full py-4 px-4 text-left"
        >
          <span className="font-body font-semibold text-base lg:text-lg text-navy-bolder">
            {opp.title}
          </span>
          <span
            className={`accordion-chevron flex-shrink-0 w-8 h-8 bg-navy-bolder text-white flex items-center justify-center transition-transform duration-200 ${
              open ? 'rotate-180' : ''
            }`}
            aria-hidden="true"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 6l5 5 5-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>

      {open && (
        <div id={`opportunity-${opp.id}`} className="pt-2 pb-8 px-4">
          <img
            src={opportunityBanner(opp.image)}
            alt={opp.imageAlt}
            loading="lazy"
            className="w-full aspect-[3/1] object-cover"
          />

          <div className="flex flex-col gap-4 mt-6 max-w-[780px]">
            {opp.body.map((block, i) =>
              block.type === 'h3' ? (
                <h4
                  key={i}
                  className="font-body font-bold text-[17px] text-navy-bolder leading-snug mt-1"
                >
                  {block.text}
                </h4>
              ) : block.type === 'li' ? (
                <li key={i} className="font-body text-base text-neutral-bold leading-[1.7] ml-5">
                  {block.text}
                </li>
              ) : (
                <p key={i} className="font-body text-base text-neutral-bold leading-[1.7]">
                  {block.text}
                </p>
              ),
            )}

            {/* An opportunity with a destination of its own leads with it, and
                keeps Donate Today beside it as the outline secondary — the
                closing paragraph points at the donation form either way. Where
                `secondaryCta` is set, it takes that second slot instead. */}
            <div className="pt-2 flex flex-wrap gap-3">
              {opp.cta && (
                <ButtonLink href={opp.cta.href} variant="navy" size="sm">
                  {opp.cta.label}
                </ButtonLink>
              )}
              {opp.secondaryCta ? (
                <ButtonLink
                  href={opp.secondaryCta.href}
                  variant={opp.cta ? 'outline-dark' : 'navy'}
                  size="sm"
                  {...(opp.secondaryCta.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  {opp.secondaryCta.label}
                  {opp.secondaryCta.external && (
                    <>
                      <ExternalLinkIcon size="1.1em" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </>
                  )}
                </ButtonLink>
              ) : (
                <ButtonLink
                  href="/giving/donate"
                  variant={opp.cta ? 'outline-dark' : 'navy'}
                  size="sm"
                >
                  Donate Today
                </ButtonLink>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function GivingOpportunities({
  heading = 'Giving Opportunities',
}: {
  heading?: string
}) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section id="giving-opportunities" className="py-12 lg:py-16 bg-surface-subtle scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8] mb-8">
          {heading}
        </h2>

        <div className="border border-border-light bg-white/60">
          {givingOpportunities.map((opp) => (
            <AccordionItem
              key={opp.id}
              opp={opp}
              open={openId === opp.id}
              onToggle={() => setOpenId((id) => (id === opp.id ? null : opp.id))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
