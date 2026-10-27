import { useCallback, useState, type ReactNode } from 'react'
import { Button, ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import Modal from '@/components/ui/Modal'
import {
  givingOpportunities,
  opportunityBanner,
  type Opportunity,
  type OpportunityBlock,
} from '@/data/givingOpportunities'

/**
 * The twelve giving opportunities, as a three-by-four grid of cards that each
 * open a modal with the full copy.
 *
 * This was the site's standard accordion, then a grid of cards showing each
 * body's first paragraph behind a Read more toggle. At 150-450 words a body,
 * the open cards still ran long and stretched their row-mates, so the client
 * asked for the "More than a subscription" treatment from the membership
 * landing: each card carries its banner, title, and the one-line teaser, and
 * More information opens the whole opportunity in a modal.
 *
 * The modal's body scrolls under a fade while its buttons stay pinned below it
 * (Modal's `footer`), so the way to give is in reach however long the copy
 * runs. Each opportunity ends with a Donate Today button, as every one of the
 * source pages does. It is rendered here rather than stored in the copy so the
 * label and destination stay the same across the grid. An opportunity may add a
 * second, more specific button of its own — see `cta` in `givingOpportunities`
 * — or, like the bricks and chairs, drop Donate Today for a contact link.
 *
 * The grid is row-major rather than CSS multi-column, and cards stretch to
 * share a row height with the button pinned by `mt-auto`, so the buttons line
 * up across a row.
 */

function OpportunityActions({ opp }: { opp: Opportunity }) {
  return (
    /* An opportunity with a destination of its own leads with it, and keeps
       Donate Today beside it as the outline secondary — the closing paragraph
       points at the donation form either way. Where `secondaryCta` is set, it
       takes that second slot instead. */
    <div className="flex flex-wrap gap-3">
      {opp.cta && (
        <ButtonLink
          href={opp.cta.href}
          variant="navy"
          size="sm"
          {...(opp.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {opp.cta.label}
          {opp.cta.external && (
            <>
              <ExternalLinkIcon size="1.1em" />
              <span className="sr-only">(opens in a new tab)</span>
            </>
          )}
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
      ) : opp.donate === false ? null : (
        /* Picking an opportunity is the donor's signal that they want a
           restricted gift, so the designation rides along to the donation
           form and on into the cart, where it arrives already toggled.
           `opp.id` is a valid priority id by construction — DONATION_PRIORITIES
           is built from this same list. */
        <ButtonLink
          href={`/giving/donate?priority=${opp.id}`}
          variant={opp.cta ? 'outline-dark' : 'navy'}
          size="sm"
        >
          Donate Today
        </ButtonLink>
      )}
    </div>
  )
}

/** The copy as paragraphs, sub-headings, and bullets, with each run of bullets in one list. */
function OpportunityBody({ blocks }: { blocks: OpportunityBlock[] }) {
  const out: ReactNode[] = []
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i]
    if (block.type === 'li') {
      const items: OpportunityBlock[] = []
      while (i < blocks.length && blocks[i].type === 'li') items.push(blocks[i++])
      i--
      out.push(
        <ul key={i} className="list-disc ml-5 flex flex-col gap-2 font-body text-base text-neutral-bold leading-[1.7]">
          {items.map((item, j) => <li key={j}>{item.text}</li>)}
        </ul>,
      )
    } else if (block.type === 'h3') {
      out.push(
        <h3 key={i} className="font-body font-bold text-[17px] text-navy-bolder leading-snug mt-1">
          {block.text}
        </h3>,
      )
    } else {
      out.push(
        <p key={i} className="font-body text-base text-neutral-bold leading-[1.7]">
          {block.text}
        </p>,
      )
    }
  }
  return <div className="flex flex-col gap-4">{out}</div>
}

function OpportunityCard({ opp, onOpen }: { opp: Opportunity; onOpen: () => void }) {
  return (
    <article className="flex flex-col border border-border-light bg-white">
      <img
        src={opportunityBanner(opp.image)}
        alt={opp.imageAlt}
        loading="lazy"
        className="w-full aspect-[3/1] object-cover"
      />

      <div className="flex flex-col flex-1 gap-4 p-6">
        <h3 className="font-headline text-[22px] lg:text-[24px] text-navy-bolder leading-[1.2]">
          {opp.title}
        </h3>
        <p className="font-body text-[15px] text-neutral-bold leading-[1.7]">{opp.teaser}</p>

        {/* Twelve cards mean twelve identical buttons in the tab order, so the
            accessible name carries the opportunity while the label stays short.
            `mt-auto` puts it on the card's bottom edge, lined up across a row. */}
        <div className="mt-auto pt-3">
          <Button variant="navy" size="sm" fullWidth onClick={onOpen} aria-haspopup="dialog">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" />
              <path d="M8 5v6M5 8h6" strokeLinecap="round" />
            </svg>
            More information
            <span className="sr-only">about {opp.title}</span>
          </Button>
        </div>
      </div>
    </article>
  )
}

export default function GivingOpportunities({
  heading = 'Giving Opportunities',
}: {
  heading?: string
}) {
  const [activeId, setActiveId] = useState<string | null>(null)
  const active = givingOpportunities.find((opp) => opp.id === activeId) ?? null
  // Stable, because Modal re-binds its Escape listener whenever onClose changes.
  const close = useCallback(() => setActiveId(null), [])

  return (
    <section id="giving-opportunities" className="py-12 lg:py-16 bg-surface-subtle scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8] mb-8">
          {heading}
        </h2>

        {/* items-stretch (the grid default) so the cards in a row share a
            height and their buttons line up. Twelve divides by both two and
            three, so neither the tablet nor the desktop grid ends on a
            half-empty row. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {givingOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} onOpen={() => setActiveId(opp.id)} />
          ))}
        </div>
      </div>

      {active && (
        <Modal
          open
          onClose={close}
          title={active.title}
          maxWidth="864px"
          media={
            <img
              src={opportunityBanner(active.image)}
              alt={active.imageAlt}
              className="w-full aspect-[3/1] object-cover block"
            />
          }
          footer={<OpportunityActions opp={active} />}
        >
          <OpportunityBody blocks={active.body} />
        </Modal>
      )}
    </section>
  )
}
