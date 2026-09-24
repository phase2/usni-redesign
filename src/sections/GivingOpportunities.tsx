import { useState } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import {
  givingOpportunities,
  opportunityBanner,
  type Opportunity,
} from '@/data/givingOpportunities'

/**
 * The ten giving opportunities, as a two-column grid of cards.
 *
 * This was the site's standard accordion until the client asked for the copy to
 * be visible rather than behind a click: a donor deciding between ten programmes
 * had to open each one in turn, and could not compare two of them at once. Every
 * card now shows its banner, its copy in full, and its buttons.
 *
 * Bodies run 150-450 words, so a card opens on the first two paragraphs behind
 * a Read more toggle and the rest is a click away. That keeps ten cards
 * scannable without going back to hiding a whole opportunity, which is what the
 * client objected to about the accordion: the title, banner, gist, and buttons
 * are always visible, and only the detail is folded.
 *
 * The grid is row-major rather than CSS multi-column — a masonry flow would
 * mean reading the whole page down the left before scrolling back up for the
 * right. Cards stretch to share a row height, and the button row is pinned with
 * `mt-auto`, so the CTAs line up instead of floating at ten different heights.
 * The clamp is what makes that work: collapsed cards differ by a paragraph's
 * length, not by the 300 words that separated the longest body from the
 * shortest. Expanding one card still stretches its row-mate, which is the cost
 * of equal heights — the slack lands above that card's buttons.
 *
 * Each card ends with a Donate Today button, as every one of the source pages
 * does. It is rendered here rather than stored in the copy so the label and
 * destination stay the same across all ten. An opportunity may add a second,
 * more specific button of its own — see `cta` in `givingOpportunities`.
 */

/** Paragraphs shown before the fold. Tune here; the toggle follows. */
const PREVIEW_BLOCKS = 2

function OpportunityCard({ opp }: { opp: Opportunity }) {
  const [expanded, setExpanded] = useState(false)
  const visible = expanded ? opp.body : opp.body.slice(0, PREVIEW_BLOCKS)
  const hasMore = opp.body.length > PREVIEW_BLOCKS

  return (
    <article className="flex flex-col border border-border-light bg-white">
      <img
        src={opportunityBanner(opp.image)}
        alt={opp.imageAlt}
        loading="lazy"
        className="w-full aspect-[3/1] object-cover"
      />

      <div className="flex flex-col flex-1 gap-4 p-6 lg:p-7">
        <h3 className="font-headline text-[24px] lg:text-[26px] text-navy-bolder leading-[1.2]">
          {opp.title}
        </h3>

        {/* The container is what the toggle controls, and it is always in the
            DOM — only its later blocks come and go — so `aria-controls` always
            resolves to something. */}
        <div id={`opportunity-body-${opp.id}`} className="flex flex-col gap-4">
          {visible.map((block, i) =>
            block.type === 'h3' ? (
              <h4
                key={i}
                className="font-body font-bold text-[17px] text-navy-bolder leading-snug mt-1"
              >
                {block.text}
              </h4>
            ) : block.type === 'li' ? (
              <li key={i} className="font-body text-[15px] text-neutral-bold leading-[1.7] ml-5">
                {block.text}
              </li>
            ) : (
              <p key={i} className="font-body text-[15px] text-neutral-bold leading-[1.7]">
                {block.text}
              </p>
            ),
          )}
        </div>

        {/* Ten cards mean up to ten identical "Read more" buttons in the tab
            order, so the accessible name carries the opportunity it belongs to
            while the visible label stays short. */}
        {hasMore && (
          <button
            type="button"
            onClick={() => setExpanded(v => !v)}
            aria-expanded={expanded}
            aria-controls={`opportunity-body-${opp.id}`}
            className="self-start flex items-center gap-2 font-body font-semibold text-sm text-[#023E7D] group"
          >
            <span className="underline group-hover:no-underline">
              {expanded ? 'Read less' : 'Read more'}
            </span>
            <span className="sr-only">about {opp.title}</span>
            <i
              className={`fa-solid ${expanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-xs`}
              aria-hidden="true"
            />
          </button>
        )}

        {/* An opportunity with a destination of its own leads with it, and
            keeps Donate Today beside it as the outline secondary — the
            closing paragraph points at the donation form either way. Where
            `secondaryCta` is set, it takes that second slot instead.

            `mt-auto` puts the row on the card's bottom edge, so buttons line up
            across a row. The slack in a shorter card collects here, below the
            Read more toggle rather than above it — the toggle has to stay with
            the copy it expands. */}
        <div className="mt-auto pt-3 flex flex-wrap gap-3">
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
      </div>
    </article>
  )
}

export default function GivingOpportunities({
  heading = 'Giving Opportunities',
}: {
  heading?: string
}) {
  return (
    <section id="giving-opportunities" className="py-12 lg:py-16 bg-surface-subtle scroll-mt-32">
      <div className="container-site">
        <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8] mb-8">
          {heading}
        </h2>

        {/* items-stretch (the grid default) so both cards in a row share a
            height and their buttons line up. Single column below lg — two
            columns of this much copy do not survive a tablet width. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {givingOpportunities.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </div>
      </div>
    </section>
  )
}
