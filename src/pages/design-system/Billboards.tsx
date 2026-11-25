import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import { NavalHistoryBillboard, OrgMembershipBillboard } from '@/sections/MembershipBillboard'
import SplitFeature from '@/sections/SplitFeature'
import MembershipServicesCTA from '@/sections/MembershipServicesCTA'
import GivingConferenceCenter from '@/sections/GivingConferenceCenter'
import GivingPromoCards from '@/sections/GivingPromoCards'
import FromThePress from '@/sections/FromThePress'
import { givingSubPages } from '@/data/givingSocieties'

const code = (s: string) => <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">{s}</code>

const annualPromos = givingSubPages.annual.promos.slice(0, 2)
const corporate = givingSubPages.corporate

export default function Billboards() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Billboards & Promos">
          <p>
            Full-width blocks that promote something away from the page they sit on: membership, a
            magazine, the Taylor Center, a giving society, a book. The prototype builds about a dozen of
            them as separate sections, but they come down to three layouts plus one homepage one-off.
          </p>
          <p>
            Each pattern below shows one canonical version as the spec and lists the copies with how
            they differ. Production needs one template per pattern, with fields for the copy, image and
            buttons, and a small set of options (panel color, which side the image is on).
          </p>
        </DocPageHeader>

        {/* ── 1. Split billboard ────────────────────────────────────────── */}
        <DocSection title="Split billboard">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              A 50/50 block from {code('lg')} up: a solid color panel on one side and a photograph filling
              the other. Inside the panel, a box with a 1px rule holds an optional eyebrow, a 36px headline,
              optional bold detail lines (an event&rsquo;s date and venue), a lead and one or two buttons,
              each with an arrow. Every 50/50 feature renders through one component,{' '}
              {code('SplitBillboard')}, so none of this can drift between pages. It comes in two themes, and
              either can sit on either side. <strong>Navy</strong> ({code('bg-navy-bolder')}, white type, gold
              button, white outline secondary) is for the strongest call to action on a page.{' '}
              <strong>Tan</strong> ({code('bg-tan-subtlest')}, navy type, solid navy button, navy outline
              secondary) is for a secondary offer. Below {code('lg')} the two halves stack, and the photograph
              always comes first.
            </p>

            <LiveMarkup label="Navy panel, image right — NavalHistoryBillboard" previewClassName="p-6 lg:p-8 bg-white">
              <NavalHistoryBillboard />
            </LiveMarkup>

            <LiveMarkup label="Tan panel, image left — OrgMembershipBillboard" previewClassName="p-6 lg:p-8 bg-white">
              <OrgMembershipBillboard />
            </LiveMarkup>

            <div>
              <DocLabel>Props</DocLabel>
              <ClassTable
                rows={[
                  { part: 'theme', classes: "'navy' | 'tan'", note: 'Swaps the panel, rule, type and button classes together.' },
                  { part: 'imagePosition', classes: "'left' | 'right'", note: <>Desktop side for the photo. Image-right keeps the photo second in the source and uses {code('flex-col-reverse')}, so it still leads when stacked.</> },
                  { part: 'image, imageOverlay', classes: '{ src, alt } · ReactNode', note: 'The overlay sits over the photo: the sponsored-content logo badge uses it.' },
                  { part: 'eyebrow', classes: 'string, optional' },
                  { part: 'heading, headingLevel', classes: "ReactNode · 'h2' (default) | 'h3'", note: 'Set the level from where the block sits; the size never changes with it.' },
                  { part: 'details', classes: 'ReactNode[], optional', note: 'Bold lines between the headline and the lead.' },
                  { part: 'body', classes: 'ReactNode' },
                  { part: 'primary, secondary', classes: '{ label, href, external? }', note: 'Secondary renders as the theme’s outline button. An external link swaps the arrow for the external-link marker and opens in a new tab.' },
                ]}
              />
            </div>

            <div>
              <DocLabel>Anatomy</DocLabel>
              <ClassTable
                rows={[
                  {
                    part: 'Billboard',
                    classes: 'bg-navy-bolder | bg-tan-subtlest  flex flex-col lg:flex-row w-full',
                    note: <>Image-right uses {code('flex-col-reverse')}. The billboard has no section or container of its own, so the page supplies them; stacked billboards sit 32px apart.</>,
                  },
                  {
                    part: 'Panel half',
                    classes: 'flex-1 flex items-center p-6 lg:p-12',
                    note: 'Half the width from lg. Centers the inner box vertically when the photo is taller.',
                  },
                  {
                    part: 'Inner box',
                    classes: 'border border-navy-bold | border-tan-subtle  flex flex-col gap-4 px-6 py-10 lg:px-12 lg:py-16 w-full',
                    note: <>Navy rule {code('navy-bold')} #002B5C, one step lighter than the panel; tan rule {code('tan-subtle')} #D9D7BF.</>,
                  },
                  {
                    part: 'Eyebrow',
                    classes: 'font-body font-medium text-sm uppercase tracking-[0.05em]  text-[#e0e0cc] | text-navy-bright',
                    note: <>{code('#e0e0cc')} has no token. It is the sub-nav tan; {code('tan-subtle')} #D9D7BF is the nearest token.</>,
                  },
                  {
                    part: 'Headline',
                    classes: 'font-headline text-[30px] lg:text-[36px] leading-[1.1]  text-white | text-navy-bolder',
                    note: '36px on desktop everywhere, stepping down to 30px on a phone.',
                  },
                  {
                    part: 'Detail lines',
                    classes: 'flex flex-col gap-1 font-body font-bold text-base  text-white | text-navy-bolder',
                  },
                  {
                    part: 'Lead',
                    classes: 'font-body text-lg leading-[1.5]  text-white/90 | text-neutral-subtle',
                  },
                  {
                    part: 'Button row',
                    classes: 'flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-3 pt-3',
                    note: 'Adds 12px above the buttons, on top of the box’s 16px gap.',
                  },
                  {
                    part: 'Buttons',
                    classes: 'ButtonLink size="lg"  primary + outline | navy + outline-dark',
                    note: <>Each carries the 12px arrow ({code('M2 6h8M6 2l4 4-4 4')}, {code('aria-hidden')}), or the external-link marker for a link off the site.</>,
                  },
                  {
                    part: 'Image half',
                    classes: 'flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden',
                    note: <>Stacked, it is at least 320px tall. From {code('lg')} the minimum goes, and the half stretches to the panel&rsquo;s height, so the copy sets the height and the photo crops to fit.</>,
                  },
                  {
                    part: 'Image',
                    classes: 'absolute inset-0 w-full h-full object-cover',
                    note: 'Absolutely positioned so that the photo never drives the height. Crops from the center.',
                  },
                ]}
              />
            </div>

            <DevNote>
              <p>
                <strong>One template, two options.</strong> Build a single Paragraph (or block) type with{' '}
                {code('{{ eyebrow }}')}, {code('{{ heading }}')}, optional detail lines, {code('{{ body }}')}, a
                primary and an optional secondary link field, and an image field rendered through an image
                style ({code('{{ image.url }}')}, {code('{{ image.alt }}')}). Add a {code('theme')} option (navy |
                tan) and an {code('image_position')} option (left | right). Keep the image second in the markup
                for image-right and use {code('flex-col-reverse')}, so the photo still leads on mobile without
                reordering the DOM.
              </p>
              <p>
                <strong>Accessibility.</strong> Set the headline level from where the block is placed: an{' '}
                {code('<h2>')} standing alone on a page, an {code('<h3>')} under a section heading. The image alt
                describes the photo; leave it empty if the photo is decorative. No JavaScript.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/SplitBillboard.tsx', note: 'the component' },
              ]}
            />

            <SourceList
              title="Uses"
              items={[
                { path: 'src/sections/FeaturedEvent.tsx', note: 'tan, image right, date and venue as detail lines, two buttons (homepage)' },
                { path: 'src/sections/ProceedingsSponsoredBillboard.tsx', note: 'tan, image left, sponsor logo badge over the photo, two buttons' },
                { path: 'src/sections/MembershipBillboard.tsx', note: 'NavalHistoryBillboard (navy, image right; parked) and OrgMembershipBillboard (tan, image left; /membership/join)' },
                { path: 'src/sections/BooksBillboards.tsx', note: 'Oral History (navy, image right) and Ship’s Store (tan, image left)' },
                { path: 'src/sections/EssayContestsArchiveTeaser.tsx', note: 'navy, image left, no eyebrow' },
                { path: 'src/sections/EventsArchiveCta.tsx', note: 'navy, image left, no eyebrow' },
                { path: 'src/sections/PmeReadingListsPromo.tsx', note: 'navy, image left, no eyebrow' },
                { path: 'src/pages/Login.tsx', note: 'navy, image right, two buttons (Join CTA)' },
              ]}
            />

            <SourceList
              title="Related, not a split billboard"
              tone="drift"
              items={[
                { path: 'src/sections/EssayContestPreviousWinners.tsx', note: <>The navy panel and inset frame with no photo, centered, and still at the old 48px headline.</> },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 2. Photo CTA ──────────────────────────────────────────────── */}
        <DocSection title="Photo CTA">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              A full-bleed photograph, at least 480px tall, under a 20% navy wash, with a card floating over
              it. The card holds an optional eyebrow, a 36px headline, a paragraph and one or two buttons. Use
              it to close a page with a single next step (join, subscribe, host an event). Every one renders
              through one component, {code('PhotoCta')}, so the headline, card width and buttons cannot drift
              between pages. The card is white, or navy where it needs to stand out, and sits on either side.
              Below {code('md')} the card fills the container and the photo shows as a band above and below it.
            </p>

            <LiveMarkup label="White card, right — SplitFeature (homepage)" previewClassName="p-0 bg-white">
              <SplitFeature />
            </LiveMarkup>

            <LiveMarkup label="White card, left, external link — GivingConferenceCenter" previewClassName="p-0 bg-white">
              <GivingConferenceCenter />
            </LiveMarkup>

            <LiveMarkup label="Navy card, right, two buttons — MembershipServicesCTA" previewClassName="p-0 bg-white">
              <MembershipServicesCTA />
            </LiveMarkup>

            <div>
              <DocLabel>Props</DocLabel>
              <ClassTable
                rows={[
                  { part: 'image', classes: 'string (URL)', note: 'Set as a CSS background, so it is decorative and takes no alt text.' },
                  { part: 'cardSide', classes: "'left' | 'right'", note: <>Right adds {code('justify-end')} to the container.</> },
                  { part: 'theme', classes: "'white' (default) | 'navy'", note: 'Swaps the card, type and button classes together.' },
                  { part: 'eyebrow', classes: 'string, optional' },
                  { part: 'heading', classes: 'ReactNode', note: <>Always an {code('<h2>')}: the block is a section of its own.</> },
                  { part: 'body', classes: 'ReactNode' },
                  { part: 'primary, secondary', classes: '{ label, href, external? }', note: 'Secondary renders as the theme’s outline button. An external link opens in a new tab and carries the external-link marker.' },
                ]}
              />
            </div>

            <div>
              <DocLabel>Anatomy</DocLabel>
              <ClassTable
                rows={[
                  {
                    part: 'Section',
                    classes: 'relative w-full bg-cover bg-center overflow-hidden',
                    note: <>The photo is set inline ({code('style="background-image: url(…); min-height: 480px"')}), cropped from the center.</>,
                  },
                  {
                    part: 'Wash',
                    classes: 'absolute inset-0 bg-navy-boldest/20',
                    note: <>{code('aria-hidden="true"')}. A 20% navy-boldest overlay, on both themes.</>,
                  },
                  {
                    part: 'Container',
                    classes: 'relative container-site h-full flex items-center min-h-[480px]  (+ justify-end)',
                    note: <>{code('justify-end')} for a right card. {code('relative')} lifts the content above the wash.</>,
                  },
                  {
                    part: 'Card',
                    classes: 'bg-white | bg-navy-boldest  p-8 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] my-12',
                    note: <>32px padding at every width, so the headline keeps a usable measure. Full width below {code('md')}, 480px from md and 520px from lg. {code('my-12')} leaves 48px of photo above and below.</>,
                  },
                  {
                    part: 'Eyebrow + headline',
                    classes: 'eyebrow-headline mb-4',
                    note: <>Eyebrow {code('.eyebrow')} (14px uppercase, navy-subtle); on navy, add {code('text-light-blue')}.</>,
                  },
                  {
                    part: 'Headline',
                    classes: 'font-headline text-2xl md:text-4xl leading-[1.1]  text-navy-bolder | text-white',
                    note: '36px from md, 24px on a phone. The same desktop size as the split billboard.',
                  },
                  {
                    part: 'Body',
                    classes: 'font-body text-base leading-relaxed mb-6  text-neutral-subtle | text-neutral-subtlest',
                  },
                  {
                    part: 'Button row',
                    classes: 'flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-3',
                  },
                  {
                    part: 'Buttons',
                    classes: 'ButtonLink size="md"  navy + outline-dark | primary + outline',
                    note: <>An external link adds {code('ExternalLinkIcon')} at 1.1em and an {code('sr-only')} &ldquo;(opens in a new tab)&rdquo;.</>,
                  },
                ]}
              />
            </div>

            <DevNote>
              <p>
                <strong>Fields.</strong> {code('{{ image.url }}')} goes into an inline{' '}
                {code('style="background-image: url({{ image.url }})"')} on the section. Use a wide image
                style (the prototype’s sources are 3500px across) and pick the focal point in the crop, since{' '}
                {code('bg-center')} decides what survives on a phone. Card fields: {code('{{ eyebrow }}')},{' '}
                {code('{{ heading }}')}, {code('{{ body }}')}, and up to two links. Options: card side
                (left | right) and card color (white | navy).
              </p>
              <p>
                <strong>Accessibility.</strong> A CSS background has no alt text, so the photo must be
                decorative. Nothing in it can carry meaning that the card does not repeat. If an editor needs
                alt text, render an {code('<img class="absolute inset-0 w-full h-full object-cover">')}{' '}
                instead, as the split billboard does. The card is opaque, so its own text contrast never
                depends on the photo. External links take the new-tab note. No JavaScript.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/PhotoCta.tsx', note: 'the component' },
              ]}
            />

            <SourceList
              title="Uses"
              items={[
                { path: 'src/sections/SplitFeature.tsx', note: 'white, right, one button (homepage)' },
                { path: 'src/sections/ProceedingsMembershipCTA.tsx', note: 'white, right, one button (Proceedings landing)' },
                { path: 'src/sections/NavalHistoryMembershipCTA.tsx', note: 'white, right, two buttons' },
                { path: 'src/pages/NavalHistorySubscribe.tsx', note: 'white, right, no eyebrow (membership cross-sell)' },
                { path: 'src/sections/AboutGetInvolved.tsx', note: 'white, right, two buttons' },
                { path: 'src/sections/GivingConferenceCenter.tsx', note: 'white, left, external link' },
                { path: 'src/sections/EventsConferenceCenter.tsx', note: 'white, left, external link' },
                { path: 'src/sections/TaylorCenterVisit.tsx', note: 'white, left, no eyebrow, external link' },
                { path: 'src/sections/MembershipServicesCTA.tsx', note: 'navy, right, two buttons' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 3. Banner promo card ──────────────────────────────────────── */}
        <DocSection title="Banner promo card">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              A bordered card led by a 3:1 banner image, with a title, a short paragraph and a stylized
              link, set two across from {code('lg')}. Use it for a run of parallel offers on one page:
              the giving societies, corporate programmes, and the homepage&rsquo;s Press and donation
              pair. When the card has a destination, the whole card is the link, and on hover only the
              shadow and the CTA&rsquo;s underline move. Without one, it renders as a plain card with no
              hover. A single card is capped at 640px rather than stretching full width.
            </p>

            <LiveMarkup label="Linked — GivingPromoCards with two annual societies" previewClassName="p-0 bg-white">
              <GivingPromoCards promos={annualPromos} />
            </LiveMarkup>

            <LiveMarkup
              label="Unlinked, with heading and intro — corporate programmes"
              previewClassName="p-0 bg-white"
              defaultOpen={false}
            >
              <GivingPromoCards promos={corporate.promos} heading={corporate.promosHeading} intro={corporate.promosIntro} />
            </LiveMarkup>

            <div>
              <DocLabel>Anatomy</DocLabel>
              <ClassTable
                rows={[
                  { part: 'Section', classes: 'bg-white py-12 lg:py-16' },
                  {
                    part: 'Heading (optional)',
                    classes: 'font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]',
                    note: <>The section-header rule. {code('#0466C8')} is {code('navy-bright')}.</>,
                  },
                  {
                    part: 'Intro (optional)',
                    classes: 'font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7] max-w-[780px] mt-6',
                  },
                  {
                    part: 'Grid',
                    classes: 'grid grid-cols-1 lg:grid-cols-2 gap-8',
                    note: <>One card: {code('max-w-[640px]')} instead of {code('lg:grid-cols-2')}. Adds {code('mt-8')} when a heading or intro sits above.</>,
                  },
                  {
                    part: 'Card — linked',
                    classes: 'group flex flex-col bg-white border border-navy-subtle h-full hover:shadow-md transition-shadow',
                    note: <>An {code('<a>')}. {code('group')} drives the CTA&rsquo;s underline. {code('h-full')} keeps cards in a row the same height. The border stays still on hover.</>,
                  },
                  {
                    part: 'Card — unlinked',
                    classes: 'flex flex-col bg-white border border-navy-subtle h-full',
                    note: <>A {code('<div>')}, with no hover.</>,
                  },
                  {
                    part: 'Banner',
                    classes: 'aspect-[3/1] overflow-hidden bg-neutral-subtlest',
                    note: 'The source art is 1200×400, so 3:1 shows it uncropped. The grey shows while the image loads.',
                  },
                  { part: 'Banner image', classes: 'w-full h-full object-cover', note: <>{code('loading="lazy"')}.</> },
                  { part: 'Body', classes: 'flex flex-col gap-3 p-6 lg:p-7 flex-1' },
                  {
                    part: 'Title',
                    classes: 'font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.15]',
                    note: 'Static on hover. Only the CTA animates.',
                  },
                  {
                    part: 'Copy',
                    classes: 'font-body text-[15px] text-neutral-bold leading-[1.65] flex-1',
                    note: <>{code('flex-1')} pushes the CTA to the bottom, so CTAs line up across a row.</>,
                  },
                  {
                    part: 'CTA',
                    classes: 'inline-flex items-center gap-2 font-body font-bold text-sm text-[#0466c8]',
                    note: <>The {code('CardCta')} span (it is not a link, because the card is), in a {code('pt-1')} wrapper. The underline sweeps in on card hover. The arrow points down for a same-page {code('#')} link and right otherwise.</>,
                  },
                ]}
              />
            </div>

            <DevNote>
              <p>
                <strong>Fields.</strong> Per card: {code('{{ title }}')}, {code('{{ body }}')}, a 3:1 image
                style ({code('{{ image.url }}')}, {code('{{ image.alt }}')}), and an optional link
                ({code('{{ cta.url }}')}, {code('{{ cta.title }}')}). Leaving the link empty renders the{' '}
                {code('<div>')} card. Per section: an optional {code('{{ heading }}')} and{' '}
                {code('{{ intro }}')}. Twig chooses the wrapper element ({code('<a>')} or {code('<div>')}) from
                whether the link is set.
              </p>
              <p>
                <strong>Accessibility.</strong> The whole card is one link, so its accessible name is all of
                its text. Keep the title first, and keep the copy short. Do not put another link or button
                inside a linked card. No JavaScript.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/sections/GivingPromoCards.tsx', note: 'Data from src/data/givingSocieties.ts. The CTA is src/components/ui/CardCta.tsx.' },
              ]}
            />

            <SourceList
              title="Drift"
              tone="drift"
              items={[
                {
                  path: 'src/sections/PromoRow.tsx',
                  note: (
                    <>
                      The homepage pair (Books &amp; Press, Donate). The card is not a link: it ends in a
                      full-width solid button ({code('bg-navy-bold … px-6 py-4 … w-full')}) with a typed
                      &ldquo;→&rdquo;. The image is inset inside {code('p-5')} padding at {code('aspect-[16/9]')}.
                      An 18px uppercase eyebrow and a 36px headline sit over a {code('border-b border-[#0466c8]')}{' '}
                      rule. Body text is {code('text-[#1d2535]')} ({code('text-primary')}). The grid is{' '}
                      {code('md:grid-cols-2')}, and the section ground is an inline{' '}
                      {code('linear-gradient(52.83deg, #EBF4FF 8.15%, #ffffff 72.81%)')} (#EBF4FF has no token). If
                      the homepage keeps this look, build it as a variant of the banner card, not a separate
                      template.
                    </>
                  ),
                },
              ]}
            />
          </div>
        </DocSection>

        {/* ── 4. Press spotlight ───────────────────────────────────────── */}
        <DocSection title="Press spotlight (homepage one-off)">
          <div className="flex flex-col gap-8">
            <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
              The homepage&rsquo;s From the Press block. A section header with intro and a &ldquo;Browse&rdquo;
              link sits above a featured title on a white panel, with its cover over a blurred copy of
              itself. Beside it are a seasonal coupon alert and a &ldquo;More Like This&rdquo; carousel. It is the
              only one of its kind, so it is documented as built. The carousel and book cards belong to the
              Commerce sheet; this covers the frame.
            </p>

            <LiveMarkup label="FromThePress" previewClassName="p-0 bg-white" defaultOpen={false}>
              <FromThePress />
            </LiveMarkup>

            <div>
              <DocLabel>Anatomy</DocLabel>
              <ClassTable
                rows={[
                  { part: 'Section', classes: 'bg-[#ebf4ff] py-16 lg:py-20', note: <>{code('#ebf4ff')}: the light-blue band, no token.</> },
                  {
                    part: 'Header',
                    classes: 'border-t-2 border-navy-bold pt-8 flex flex-col lg:flex-row lg:items-start lg:gap-12 mb-8',
                    note: 'Eyebrow and title on the left, intro and CardCta on the right, from lg.',
                  },
                  {
                    part: 'Body grid',
                    classes: 'grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-8 xl:gap-12 items-stretch',
                    note: <>Stacks below {code('lg')}. {code('minmax(0, …)')} lets the carousel column shrink instead of overflowing.</>,
                  },
                  { part: 'Featured panel', classes: 'bg-white border border-navy-subtle flex flex-col' },
                  {
                    part: 'Cover stage',
                    classes: 'relative overflow-hidden border-b border-navy-subtle px-6 pt-10 lg:pt-12 flex items-end justify-center',
                    note: 'The cover stands on the info block (flush to the bottom edge).',
                  },
                  {
                    part: 'Blurred backdrop',
                    classes: 'absolute -inset-16 bg-cover bg-center blur-xl scale-150 saturate-150',
                    note: <>The same cover as an inline background. The negative inset pushes the blur&rsquo;s soft edge outside the clip. {code('aria-hidden')}.</>,
                  },
                  {
                    part: 'Vignette',
                    classes: 'absolute inset-0 bg-gradient-to-b from-navy-boldest/25 via-navy-boldest/5 to-navy-boldest/45',
                  },
                  {
                    part: 'Coupon alert',
                    classes: 'flex flex-wrap items-center gap-3 bg-[#FFF9EB] border border-l-4 border-gold px-5 py-3 mb-6',
                    note: <>The seasonal-alert treatment shared with EssayContestsAbout. {code('#FFF9EB')} has no token and is not the Alerts warning ground (#FFF8D6).</>,
                  },
                  {
                    part: 'Carousel arrows',
                    classes: 'w-9 h-9 rounded-full bg-white border border-[#0466C8] flex items-center justify-center text-navy-bolder hover:bg-light-blue transition-colors disabled:opacity-30 disabled:pointer-events-none',
                    note: <>Round on purpose. Each has an {code('aria-label')} and is disabled at either end.</>,
                  },
                  {
                    part: 'Track',
                    classes: 'flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory',
                    note: <>Two cards visible below {code('sm')}, three from sm (width set on each card with {code('calc')}).</>,
                  },
                ]}
              />
            </div>

            <DevNote>
              <p>
                <strong>Fields.</strong> The featured title is an entity reference to a Book
                ({code('{{ book.title }}')}, {code('{{ book.cover }}')}, {code('{{ book.price }}')},{' '}
                {code('{{ book.url }}')}). &ldquo;More Like This&rdquo; is a View of related titles. The
                coupon line is a block editors can switch off out of season.
              </p>
              <p>
                <strong>Behaviour.</strong> The carousel needs a Drupal behavior. Arrow clicks scroll the
                track by one viewport width ({code('scrollBy({ left: clientWidth, behavior: "smooth" })')}),
                and the arrows are disabled at the start and end, rechecked on scroll and resize. The track
                still scrolls by touch and trackpad without the script. For accessibility, give the track a
                labelled region ({code('role="region" aria-label="More like this"')}) and make sure each card
                link is reachable by Tab.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/sections/FromThePress.tsx' }]} />
          </div>
        </DocSection>

        {/* ── Mobile stacking ──────────────────────────────────────────── */}
        <DocSection title="Stacking on mobile">
          <div className="flex flex-col gap-6 max-w-[760px]">
            <p className="font-body text-base text-neutral-subtle leading-relaxed">
              One rule covers every billboard that splits into copy and photo: <strong>when it stacks, the
              photo comes first.</strong> A phone reader who meets a headline with no picture has no reason
              to stop scrolling. The rule came from a fix to three 50/50 features whose image was second in
              the DOM and fell below the copy when stacked (commit &ldquo;Stack the footer nav and lead
              billboard images on mobile&rdquo;). Desktop layouts did not change.
            </p>
            <ClassTable
              rows={[
                {
                  part: 'Flex, image second in DOM',
                  classes: 'flex flex-col-reverse lg:flex-row',
                  note: 'SplitBillboard with imagePosition="right". Reverses only the stacked order; the row from lg is unaffected.',
                },
                {
                  part: 'Flex, image first in DOM',
                  classes: 'flex flex-col lg:flex-row',
                  note: 'SplitBillboard with imagePosition="left".',
                },
                {
                  part: 'Stacked image height',
                  classes: 'min-h-[320px] lg:min-h-0',
                  note: 'A stacked half has no row partner to borrow height from, so it needs its own minimum.',
                },
                {
                  part: 'Photo CTA',
                  classes: 'w-full max-w-full md:max-w-[480px]',
                  note: 'Not a stack: the card goes full container width below md and the photo stays behind it, visible in the my-12 margins.',
                },
                {
                  part: 'Banner cards',
                  classes: 'grid-cols-1 lg:grid-cols-2',
                  note: 'One column until lg (PromoRow goes to two at md).',
                },
              ]}
            />
            <DevNote title="Breakpoint">
              <p>
                Every split here changes at {code('lg')} (1024px). The photo CTA&rsquo;s card narrows at{' '}
                {code('md')} (768px). Keep the image second in the markup where the design puts it on the
                right, and fix the stacked order with {code('flex-col-reverse')} or {code('order-*')} rather
                than duplicating the image for mobile.
              </p>
            </DevNote>
          </div>
        </DocSection>

        <DocSection title="Not on this sheet">
          <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">
            {code('src/sections/NavalInstituteAtWork.tsx')} (homepage) is a centered section header over a
            four-up grid of {code('PlainCard')}s. It is a card grid, not a promo; see Cards.
          </p>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
