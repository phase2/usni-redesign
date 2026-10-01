import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import { Button, ButtonLink, NavyButtonLink, type ButtonVariant } from '@/components/ui/Button'
import CardCta from '@/components/ui/CardCta'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import SharePopover from '@/components/ui/SharePopover'
import SaveArticleButton from '@/components/ui/SaveArticleButton'
import { givingSubPages } from '@/data/givingSocieties'

const VARIANTS = ['primary', 'outline', 'outline-dark', 'link'] as const
const SIZES = ['sm', 'md', 'lg'] as const

/** Every variant, for the variant × size matrix. `outline` needs a dark ground. */
const MATRIX: { variant: ButtonVariant; dark?: boolean; use: string }[] = [
  { variant: 'primary', use: 'Gold. The single highest-priority action on a page: Join, Subscribe, Donate, Add to Cart.' },
  { variant: 'navy', use: 'Solid navy. The primary action on light interior surfaces (account pages, modals, cards), where gold would read as secondary.' },
  { variant: 'outline', dark: true, use: 'White outline. The second action beside a primary on a dark or photo ground.' },
  { variant: 'outline-dark', use: 'Navy outline. The second action on a light ground, and the article toolbar.' },
  { variant: 'link', use: 'A button that looks like a text link. Use for low-emphasis actions that are still buttons (they do something rather than go somewhere).' },
]

/** The Quill and Sword Society intro link: the one real `direction="down"` CardCta. */
const quillAndSword = Object.values(givingSubPages).find((p) => p.introLink)?.introLink

/** Inline code, matching the other sheets. */
function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px] bg-neutral-subtlest px-1.5 py-0.5 [overflow-wrap:anywhere]">{children}</code>
}

/** Sheet prose — one width and size for every intro paragraph. */
function Lead({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

function DsLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-link">
      {children}
    </Link>
  )
}

/* ─── Reproductions of controls that are not exported ────────────────────────
   These icon buttons live inside larger components (Modal, the image gallery,
   the Books carousel, SharePopover). Their classes are copied verbatim from
   those files so the markup can be generated here without opening a modal. */

/** Modal.tsx close button: the canonical square icon button. */
function ModalCloseCopy() {
  return (
    <button
      type="button"
      aria-label="Close"
      className="flex items-center justify-center w-10 h-10 bg-navy-subtle text-white hover:bg-navy-bright transition-colors"
    >
      <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3 3l10 10M13 3L3 13" />
      </svg>
    </button>
  )
}

/** FromThePress.tsx carousel arrows: round, bordered, disabled at either end. */
function CarouselArrowsCopy() {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled
        className="w-9 h-9 rounded-full bg-white border border-[#0466C8] flex items-center justify-center
                   text-navy-bolder hover:bg-light-blue transition-colors
                   disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Scroll to previous books"
      >
        <i className="fa-solid fa-chevron-left text-sm" aria-hidden="true" />
      </button>
      <button
        type="button"
        className="w-9 h-9 rounded-full bg-white border border-[#0466C8] flex items-center justify-center
                   text-navy-bolder hover:bg-light-blue transition-colors
                   disabled:opacity-30 disabled:pointer-events-none"
        aria-label="Scroll to more books"
      >
        <i className="fa-solid fa-chevron-right text-sm" aria-hidden="true" />
      </button>
    </div>
  )
}

/** SharePopover.tsx panel close: a bare glyph, no box. */
function BareCloseCopy() {
  return (
    <button type="button" aria-label="Close" className="text-neutral-subtle hover:text-navy-bolder transition-colors">
      <i className="fa-solid fa-xmark text-base" aria-hidden="true" />
    </button>
  )
}

export default function Buttons() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Buttons & CTAs">
          <p>
            Four button-family components cover every call-to-action treatment on USNI.org:
            a shared <code className="font-mono text-sm">Button</code>/<code className="font-mono text-sm">ButtonLink</code> pair,
            a solid navy link, an arrow-badge CTA link, and a share popover trigger.
          </p>
          <p>
            <C>Button.tsx</C> is the spec. About sixty buttons across the prototype were hand-built with
            near-copies of its classes instead of using it; they are listed at the bottom of this page so the
            Drupal build ends up with one button template, not a dozen sizes.
          </p>
        </DocPageHeader>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Button / ButtonLink">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">Button</code> renders a{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">{'<button>'}</code>;{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">ButtonLink</code> renders an{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">{'<a>'}</code> with an identical class
              recipe. Both accept the same <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">variant</code>,{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">size</code>, and{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">fullWidth</code> props.
            </p>

            <LiveMarkup label="Variants — on light background">
              <div className="flex flex-wrap items-center gap-4">
                {VARIANTS.filter(v => v !== 'outline').map((variant) => (
                  <Button key={variant} variant={variant}>{variant}</Button>
                ))}
                <Button variant="navy">navy</Button>
              </div>
            </LiveMarkup>

            <div>
              <LiveMarkup label="Variants — on dark background" previewClassName="p-6 lg:p-8 bg-navy-bolder">
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary">primary</Button>
                  <Button variant="outline">outline</Button>
                </div>
              </LiveMarkup>
              <p className="font-body text-xs text-neutral-subtle mt-3">
                <code className="font-mono">outline</code> uses a white border/text and only reads correctly on a dark or
                image background. <code className="font-mono">outline-dark</code> is its light-background counterpart.
              </p>
            </div>

            <LiveMarkup label="Sizes">
              <div className="flex flex-wrap items-center gap-4">
                {SIZES.map((size) => (
                  <Button key={size} variant="primary" size={size}>Size {size}</Button>
                ))}
              </div>
            </LiveMarkup>

            <LiveMarkup label="States">
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Default</Button>
                <Button variant="primary" disabled>Disabled</Button>
                <Button variant="outline-dark" disabled>Disabled Outline</Button>
                <Button variant="navy" disabled>Disabled Navy</Button>
              </div>
            </LiveMarkup>

            <div className="max-w-sm">
              <LiveMarkup label="Full width">
                <Button variant="primary" fullWidth>Full Width Button</Button>
              </LiveMarkup>
            </div>

            <LiveMarkup label="ButtonLink — the same recipe on an anchor">
              <div className="flex flex-wrap items-center gap-4">
                <ButtonLink href="/membership/join" variant="primary" size="md">Join Today</ButtonLink>
                <ButtonLink href="/membership" variant="outline-dark" size="md">Learn More</ButtonLink>
              </div>
            </LiveMarkup>
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Every variant × size">
          <div className="flex flex-col gap-8">
            <Lead>
              Five variants, three sizes. Each block shows one variant at <C>sm</C>, <C>md</C> and <C>lg</C>,
              which is the full set a template needs to support. The live site uses <C>sm</C> for toolbars and
              rows of secondary buttons (article Share / Save / Comments, author bios, digital editions),{' '}
              <C>md</C> for hero and section CTAs, and <C>lg</C> for checkout and form submits.
            </Lead>

            {MATRIX.map(({ variant, dark, use }) => (
              <div key={variant} className="flex flex-col gap-3">
                <LiveMarkup
                  label={`variant="${variant}"`}
                  previewClassName={dark ? 'p-6 lg:p-8 bg-navy-bolder' : 'p-6 lg:p-8 bg-white'}
                >
                  <div className="flex flex-wrap items-center gap-4">
                    {SIZES.map((size) => (
                      <Button key={size} variant={variant} size={size}>
                        {variant === 'link' ? `Link ${size}` : `Join Today (${size})`}
                      </Button>
                    ))}
                  </div>
                </LiveMarkup>
                <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-[760px]">
                  <span className="font-bold text-navy-bolder">When to use: </span>
                  {use}
                </p>
              </div>
            ))}

            <ClassTable
              rows={[
                {
                  part: 'Base (every variant)',
                  classes: 'inline-flex items-center justify-center gap-2 font-body font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
                  note: (
                    <>
                      <C>gap-2</C> spaces a trailing icon 8px from the label. Corners are square because the base
                      layer sets <C>button {'{ border-radius: 0 }'}</C>. <C>disabled:</C> only applies to{' '}
                      <C>{'<button>'}</C>; an anchor cannot be disabled. The focus ring sets width and offset
                      but no style or color, so the browser&rsquo;s own ring (style <C>auto</C>) is what shows. See
                      the DevNote below.
                    </>
                  ),
                },
                {
                  part: 'primary',
                  classes: 'bg-gold text-navy-bolder hover:bg-gold-dark border border-gold',
                  note: (
                    <>
                      Hover lightens to <C>gold-dark</C> #FFEC99, the lightest gold despite its name. An unlayered rule
                      in <C>index.css</C> (<C>.hover\:bg-gold-dark:hover</C>) makes sure that hover wins over any other
                      background utility. The border matches the fill so every variant is the same height.
                    </>
                  ),
                },
                {
                  part: 'navy',
                  classes: 'bg-navy-bolder text-white hover:bg-navy-bright border border-navy-bolder hover:border-navy-bright',
                  note: 'Hover goes to navy-bright #0466C8, the site’s link blue.',
                },
                {
                  part: 'outline',
                  classes: 'bg-transparent text-white border border-white hover:bg-white hover:text-navy-bright',
                  note: 'Dark and photo grounds only. Fills white on hover, label turns navy-bright.',
                },
                {
                  part: 'outline-dark',
                  classes: 'bg-transparent text-navy-bolder border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright',
                  note: 'Fills to navy-bright on hover, the same color navy lands on, so an outline and a solid button side by side agree on hover.',
                },
                {
                  part: 'link',
                  classes: 'bg-transparent p-0 text-link',
                  note: (
                    <>
                      <C>.text-link</C> (in <C>index.css</C>) gives the #0466c8 color, a 1px underline drawn as a
                      background gradient, and a sweep animation on hover. <strong>Bug:</strong> the size classes are
                      still appended, and Tailwind emits <C>px-*</C> / <C>py-*</C> after <C>p-0</C>, so the link
                      variant keeps the size padding (16px × 20px at md). Measured in the browser.
                    </>
                  ),
                },
                { part: 'Size sm', classes: 'px-5 py-3 text-sm', note: '14px type, 12px × 20px padding. The article-toolbar size.' },
                { part: 'Size md (default)', classes: 'px-5 py-4 text-base tracking-[-0.5px]', note: '16px type with slightly tightened tracking.' },
                { part: 'Size lg', classes: 'px-6 py-4 text-base tracking-[-0.5px]', note: 'Same height as md; only the side padding grows (24px).' },
                { part: 'fullWidth', classes: 'w-full', note: 'Appended last. Used for card and checkout buttons.' },
                { part: 'Trailing icon', classes: 'fa-solid fa-arrow-right text-xs  ›  aria-hidden="true"', note: 'Any icon goes after the label as a child; the base gap-2 spaces it. Use ExternalLinkIcon for off-site links (below).' },
              ]}
            />

            <DevNote title="Tokens">
              <p>
                Everything here is a token: <C>gold</C> #FFD000, <C>gold-dark</C> #FFEC99, <C>navy-bolder</C> #001845,{' '}
                <C>navy-bright</C> #0466C8. The <C>.text-link</C> color is a hard-coded <C>#0466c8</C>, which is{' '}
                <C>navy-bright</C>.
              </p>
            </DevNote>

            <DevNote>
              <p>
                Build one button component (an SDC or an included Twig template) that takes{' '}
                <C>{'{{ label }}'}</C>, <C>{'{{ url }}'}</C>, <C>{'{{ variant }}'}</C> (primary, navy, outline,
                outline-dark, link), <C>{'{{ size }}'}</C> (sm, md, lg), <C>{'{{ full_width }}'}</C>,{' '}
                <C>{'{{ external }}'}</C>, an optional <C>{'{{ icon }}'}</C> class, and <C>{'{{ attributes }}'}</C>.
                Link fields, Views &ldquo;more&rdquo; links and Webform submit buttons should all render through it.
              </p>
              <p>
                <strong>Link or button.</strong> If it goes somewhere (it has a URL), render an <C>{'<a href>'}</C>. If it
                does something on the page (submit, open a popover, toggle, scroll), render a{' '}
                <C>{'<button type="button">'}</C> (or <C>type="submit"</C> in a form). Never put a click handler on an
                anchor with no href, and never wrap a button in a link. A disabled state only exists for buttons; for a
                link that is unavailable (an out-of-stock format), render a disabled <C>{'<button>'}</C> instead.
              </p>
              <p>
                <strong>Focus.</strong> Production should finish the focus ring the prototype starts: add{' '}
                <C>focus-visible:outline focus-visible:outline-navy-bright</C> to the base (and{' '}
                <C>focus-visible:outline-white</C> for <C>outline</C> on dark), so the ring is solid, 2px, offset 2px,
                and on-brand instead of browser-default. Fix the <C>link</C> variant&rsquo;s padding by not applying
                size classes to it. No JavaScript is needed for the button itself.
              </p>
              <CodeBlock
                code={`{# components/button/button.twig — sketch #}
{% set base = 'inline-flex items-center justify-center gap-2 font-body font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed' %}
{% set variants = {
  primary: 'bg-gold text-navy-bolder hover:bg-gold-dark border border-gold',
  navy: 'bg-navy-bolder text-white hover:bg-navy-bright border border-navy-bolder hover:border-navy-bright',
  outline: 'bg-transparent text-white border border-white hover:bg-white hover:text-navy-bright',
  'outline-dark': 'bg-transparent text-navy-bolder border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright',
  link: 'bg-transparent p-0 text-link',
} %}
{% set sizes = { sm: 'px-5 py-3 text-sm', md: 'px-5 py-4 text-base tracking-[-0.5px]', lg: 'px-6 py-4 text-base tracking-[-0.5px]' } %}
{% set v = variant|default('primary') %}
{% set classes = [base, variants[v], v != 'link' ? sizes[size|default('md')], full_width ? 'w-full'] %}

{% if url %}
  <a href="{{ url }}"{{ attributes.addClass(classes) }}{% if external %} target="_blank" rel="noopener noreferrer"{% endif %}>
    {{ label }}
    {% if external %}{% include 'external-link-icon.twig' with { size: '1.1em' } %}<span class="sr-only">(opens in a new tab)</span>
    {% elseif icon %}<i class="{{ icon }} text-xs" aria-hidden="true"></i>{% endif %}
  </a>
{% else %}
  <button type="{{ type|default('button') }}"{{ attributes.addClass(classes) }}{{ disabled ? ' disabled' }}>
    {{ label }}{% if icon %}<i class="{{ icon }} text-xs" aria-hidden="true"></i>{% endif %}
  </button>
{% endif %}`}
              />
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/Button.tsx', note: 'Button, ButtonLink and NavyButtonLink, with the variant and size maps' },
                { path: 'src/index.css', note: '.text-link (link variant), the base button radius, and the unlayered gold hover' },
              ]}
            />

            <PropsTable
              rows={[
                { name: 'variant', type: "'primary' | 'navy' | 'outline' | 'outline-dark' | 'link'", default: "'primary'", description: 'Visual treatment. outline is for dark/image backgrounds; outline-dark is for light backgrounds. navy is the primary action on light interior surfaces.' },
                { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Padding and font size.' },
                { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the button to 100% of its container.' },
                { name: 'href', type: 'string', description: 'ButtonLink only — required, renders an <a> instead of a <button>.' },
              ]}
            />

            <CodeBlock code={`import { Button, ButtonLink } from '@/components/ui/Button'

<Button variant="primary" size="md">Join Today</Button>
<ButtonLink variant="outline-dark" href="/membership">Learn More</ButtonLink>`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Navy Button Link">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              A solid navy CTA link used for secondary actions inside cards and content blocks — distinct from the
              gold <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">Button</code>{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">primary</code> variant, which is
              reserved for the highest-priority action on a page (e.g. Join / Subscribe).
            </p>
            <div className="max-w-sm">
              <LiveMarkup label="NavyButtonLink">
                <NavyButtonLink href="/proceedings">View All Articles</NavyButtonLink>
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                {
                  part: 'Link',
                  classes: 'inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-base tracking-[-0.5px] px-5 py-4 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors duration-150',
                  note: (
                    <>
                      Identical to <C>ButtonLink variant=&quot;navy&quot; size=&quot;md&quot;</C> except that it lacks the
                      base&rsquo;s <C>focus-visible:</C> and <C>disabled:</C> classes. It predates the <C>navy</C> variant.
                      In Drupal, it is the button template with variant navy and size md; do not build a separate one.
                    </>
                  ),
                },
                { part: 'fullWidth', classes: 'w-full' },
              ]}
            />
            <CodeBlock code={`import { NavyButtonLink } from '@/components/ui/Button'

<NavyButtonLink href="/proceedings">View All Articles</NavyButtonLink>`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="External-link buttons">
          <div className="flex flex-col gap-8">
            <Lead>
              A button that leaves usni.org (the Taylor Conference Center site, the Press storefront) opens in a new
              tab and says so twice: visually with the <C>ExternalLinkIcon</C> glyph after the label, and to screen
              readers with a visually hidden &ldquo;(opens in a new tab)&rdquo;. Inside a button, the glyph is
              passed <C>size=&quot;1.1em&quot;</C>; its 0.75em default is sized for inline text links and is too
              small to recognize at button weight.
            </Lead>

            <LiveMarkup label="Navy sm (Digital Editions) and outline md on dark (Taylor Center hero)" previewClassName="p-0 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 lg:p-8 bg-white flex items-center">
                  <ButtonLink
                    href="https://app.usni.org/products/hms-belfast"
                    variant="navy"
                    size="sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View the digital edition
                    <ExternalLinkIcon size="1.1em" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                </div>
                <div className="p-6 lg:p-8 bg-navy-boldest flex items-center">
                  <ButtonLink
                    href="https://www.jackctaylorconferencecenter.org/"
                    variant="outline"
                    size="md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Plan an event
                    <ExternalLinkIcon size="1.1em" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </ButtonLink>
                </div>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Anchor', classes: 'ButtonLink classes  +  target="_blank" rel="noopener noreferrer"', note: 'rel stops the new tab reaching back through window.opener.' },
                { part: 'Glyph', classes: 'inline-block flex-shrink-0  ›  style="width:1.1em;height:1.1em"', note: 'ExternalLinkIcon: a 16×16 stroked SVG (stroke-width 1.75, currentColor), aria-hidden. Sized in em so it tracks the label at any button size; flex-shrink-0 keeps it from squashing in a narrow button.' },
                { part: 'New-tab note', classes: 'sr-only', note: 'The literal text “(opens in a new tab)”, after the glyph, inside the anchor so it becomes part of the link name.' },
              ]}
            />

            <DevNote>
              <p>
                Decide &ldquo;external&rdquo; in the template, not per link: a URL whose host is not usni.org sets{' '}
                <C>external</C> on the button component, which adds the target, rel, glyph and the sr-only note. Keep
                the glyph as an included SVG partial (it is in the <DsLink to="/design-system/iconography">icon
                glossary</DsLink>) rather than a Font Awesome icon so its stroke matches the text links.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/ExternalLinkIcon.tsx' },
                { path: 'src/sections/DigitalEditionsList.tsx', note: 'navy sm' },
                { path: 'src/pages/GivingTaylorCenter.tsx', note: 'outline md in a hero' },
                { path: 'src/sections/TaylorCenterAbout.tsx' },
                { path: 'src/sections/TaylorCenterSpaces.tsx' },
                { path: 'src/sections/GivingOpportunities.tsx' },
              ]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/EventsHero.tsx', note: 'uses Font Awesome fa-solid fa-arrow-up-right-from-square text-xs instead of ExternalLinkIcon (keeps the sr-only note)' },
                { path: 'src/sections/EventsConferenceCenter.tsx', note: 'same Font Awesome glyph, on a hand-rolled borderless navy button' },
                { path: 'src/sections/GivingConferenceCenter.tsx', note: 'correct glyph and note, but both buttons are hand-rolled (compact navy recipe, see the drift list below)' },
                { path: 'src/sections/TaylorCenterVisit.tsx', note: 'correct glyph and note on a hand-rolled navy button' },
                { path: 'src/sections/ReadingListSection.tsx', note: 'correct glyph and note on a hand-rolled navy button' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Stylized Link (CardCta)">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              The site's one "read more" affordance: a bold blue label whose underline sweeps in from
              the left, with an arrow that nudges right. Used wherever a lighter-weight link fits better
              than a boxed button — section headers, card footers, and{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">SectionHeader</code>.
              It replaced the blue arrow-badge CTA that used to sit in section headers, so there is now
              one stylized link rather than two.
            </p>
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              Two forms, one treatment. Standalone, it takes an{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">href</code> and is its
              own link. Inside a card, the card wrapper is already the link, so the href is omitted and
              the wrapper carries{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">group</code> — hovering
              anywhere on the card drives the animation.
            </p>

            <LiveMarkup label="Standalone (with href)">
              <CardCta href="/archives">Explore the Archives</CardCta>
            </LiveMarkup>

            <LiveMarkup label="External">
              <CardCta href="https://photos.usni.org" external>Photos &amp; Historical Prints</CardCta>
            </LiveMarkup>

            <LiveMarkup label='direction="down" — jumps further down the same page (Quill and Sword Society)'>
              <CardCta href={quillAndSword?.href ?? '#planned-gift-info'} direction="down">
                {quillAndSword?.label ?? 'Information about making a planned gift'}
              </CardCta>
            </LiveMarkup>

            <LiveMarkup label="In a card — hover anywhere on the card" previewClassName="p-6 lg:p-8 bg-neutral-subtlest">
              <a href="/giving/donor-recognition" className="group block max-w-sm bg-white border border-navy-subtle p-6 hover:shadow-md transition-shadow">
                <h3 className="font-headline text-xl text-navy-bolder leading-[1.2] mb-2">
                  Stephen B. Luce Society
                </h3>
                <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-4">
                  Card headlines stay dark and static. Only the stylized link animates.
                </p>
                <CardCta>View donor courtesies and donor listing</CardCta>
              </a>
            </LiveMarkup>

            <ClassTable
              rows={[
                {
                  part: 'Link (standalone)',
                  classes: 'group inline-flex items-center gap-2 font-body font-bold text-sm text-[#0466c8]',
                  note: 'Carries its own group so the hover works with nothing around it. External adds target="_blank" rel="noopener noreferrer".',
                },
                {
                  part: 'Span (in a card)',
                  classes: 'inline-flex items-center gap-2 font-body font-bold text-sm text-[#0466c8]',
                  note: 'No href, so it renders a <span>: an anchor cannot nest inside the card’s anchor. The card wrapper must carry group.',
                },
                { part: 'Label', classes: 'relative', note: 'Positioning context for the underline.' },
                {
                  part: 'Underline',
                  classes: 'absolute bottom-0 left-0 right-0 h-[1.5px] bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out',
                  note: 'A 1.5px bar in the text color, scaled from 0 to full width from the left on hover. A transform rather than a width change, so it animates on the compositor.',
                },
                {
                  part: 'Arrow (right)',
                  classes: 'fa-solid text-xs transition-transform duration-200 fa-arrow-right group-hover:translate-x-1',
                  note: 'Nudges 4px right on hover. aria-hidden.',
                },
                {
                  part: 'Arrow (down)',
                  classes: 'fa-solid text-xs transition-transform duration-200 fa-arrow-down group-hover:translate-y-1',
                  note: 'direction="down", for an in-page anchor (#…). Nudges 4px down.',
                },
                {
                  part: 'External glyph',
                  classes: 'ExternalLinkIcon: inline-block flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5  ›  sr-only “(opens in a new tab)”',
                  note: 'Default 0.75em size here, since it sits beside 14px text. Nudges 2px rather than 4px.',
                },
              ]}
            />

            <DevNote title="Tokens">
              <p>
                <C>text-[#0466c8]</C> is <C>navy-bright</C>; use <C>text-navy-bright</C>.
              </p>
            </DevNote>

            <DevNote>
              <p>
                One Twig partial with <C>{'{{ label }}'}</C>, an optional <C>{'{{ url }}'}</C>, and{' '}
                <C>{'{{ external }}'}</C>. With a URL it renders the anchor (and <C>group</C>); without one it renders the
                span for use inside a linked card. Pick the arrow from the URL: an <C>#anchor</C> gets the down arrow, an
                off-site host gets the external glyph, anything else the right arrow. CSS only, no JavaScript.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/CardCta.tsx', note: 'its docblock states the card hover convention' },
                { path: 'src/pages/GivingSubPage.tsx', note: 'the direction="down" use' },
                { path: 'src/sections/ReadingListsOther.tsx', note: 'the external, in-card use' },
              ]}
            />

            <CodeBlock code={`import CardCta from '@/components/ui/CardCta'

// Standalone — renders its own anchor
<CardCta href="/archives">Explore the Archives</CardCta>

// Inside a card — the card wrapper is the link and carries \`group\`
<a href={href} className="group ... hover:shadow-md transition-shadow">
  ...
  <CardCta>View donor listing</CardCta>
</a>`} />
            <PropsTable
              rows={[
                { name: 'children', type: 'ReactNode', description: 'Required. The link label.' },
                { name: 'href', type: 'string', description: 'Supply when the link stands alone. Omit inside a card that is itself a link — an anchor cannot nest inside another.' },
                { name: 'external', type: 'boolean', default: 'false', description: 'Swaps the arrow for the external-link glyph, opens in a new tab, and adds a screen-reader note.' },
                { name: 'direction', type: "'right' | 'down'", default: "'right'", description: 'Which way the arrow points and nudges. down is for a link to further down the same page.' },
                { name: 'className', type: 'string', description: 'Extra layout classes on the link itself.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Share Popover">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              A button that opens a small popover with social share links, copy-link, and email — used on article
              pages. Click the button below to try it live.
            </p>
            <LiveMarkup label="Trigger — click Share (snippet is the closed state)">
              <div className="flex justify-start min-h-[340px]">
                <SharePopover title="AI Warfighting: The Next Generation of Naval Strategy" url="https://www.usni.org/press/books/ai-warfighting" />
              </div>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'relative', note: 'Anchors the panel; outside clicks are measured against it.' },
                {
                  part: 'Trigger',
                  classes: 'Button variant="outline-dark" size="sm"  ›  aria-expanded aria-haspopup="dialog"',
                  note: 'Label “Share” then fa-solid fa-arrow-up-from-bracket text-xs (aria-hidden). aria-expanded flips with the panel.',
                },
                {
                  part: 'Panel',
                  classes: 'absolute right-0 top-full mt-3 w-64 bg-white border border-[#c4c9d4] shadow-xl z-50',
                  note: 'Open state only, so it is not in the snippet. Its full anatomy is on the Overlays sheet.',
                },
              ]}
            />
            <DevNote>
              <p>
                The trigger is the button template (outline-dark, sm, icon <C>fa-arrow-up-from-bracket</C>). The open
                panel, its caret and rows, and the close behavior (second click, Escape, outside click) are documented
                under <DsLink to="/design-system/overlays">Overlays → Popovers</DsLink>. Share URLs are built from{' '}
                <C>{'{{ url }}'}</C> and <C>{'{{ title }}'}</C> in the template; a Drupal behavior toggles the panel and
                handles Copy link (Clipboard API) and Email (<C>mailto:</C>).
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/ui/SharePopover.tsx' }, { path: 'src/sections/ArticleHeader.tsx', note: 'the article toolbar it sits in' }]} />
            <CodeBlock code={`import SharePopover from '@/components/ui/SharePopover'

<SharePopover title={article.headline} url={articleUrl} />`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Save Article Button">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              A bookmark toggle that sits beside Share at the top of every article. Saved articles collect under{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">/account/saved</code>. Click to
              toggle between the Save and Saved states.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LiveMarkup label="Save (aria-pressed=false)">
                <SaveArticleButton />
              </LiveMarkup>
              <LiveMarkup label="Saved (aria-pressed=true)">
                <SaveArticleButton defaultSaved />
              </LiveMarkup>
            </div>
            <ClassTable
              rows={[
                {
                  part: 'Button',
                  classes: 'inline-flex items-center gap-2 border border-navy-bolder text-navy-bolder font-body font-bold text-sm px-5 py-3 transition-colors',
                  note: 'The sm size and outline-dark colors, hand-rolled rather than using Button. aria-pressed carries the state.',
                },
                { part: 'Unsaved', classes: 'hover:bg-[#EBF4FF]', note: 'Hover tints light blue. The Share and Comments buttons beside it fill navy-bright on hover, so the toolbar has two hover behaviors.' },
                { part: 'Saved', classes: 'bg-[#EBF4FF]', note: 'Stays tinted while saved.' },
                { part: 'Label', classes: 'min-w-[3.1rem] text-left', note: 'Fixed width so Save → Saved does not nudge the row.' },
                { part: 'Icon', classes: 'fa-regular fa-bookmark text-xs  →  fa-solid fa-bookmark text-xs', note: 'Outline when unsaved, solid when saved. aria-hidden.' },
              ]}
            />
            <DevNote>
              <p>
                <C>#EBF4FF</C> has no token (it is the light-blue band color). In Drupal this is a Flag module link
                (bookmark flag) rendered as a <C>{'<button aria-pressed>'}</C>; a behavior posts the flag/unflag and
                swaps the label, icon class and <C>aria-pressed</C>. Anonymous users should get a link to log in instead.
                Consider making its hover match the toolbar (outline-dark fills navy-bright) and keeping the tint for the
                saved state only.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/ui/SaveArticleButton.tsx' }]} />
            <CodeBlock code={`import SaveArticleButton from '@/components/ui/SaveArticleButton'

<SaveArticleButton />`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Icon buttons">
          <div className="flex flex-col gap-8">
            <Lead>
              A button whose only content is a glyph: modal close, carousel arrows, the popover close. There is no
              shared component, so each is reproduced here from its source with its classes copied verbatim. Every one
              needs an <C>aria-label</C> naming the action, and the glyph inside is <C>aria-hidden</C>.
            </Lead>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <LiveMarkup label="Square close (Modal)">
                <ModalCloseCopy />
              </LiveMarkup>
              <LiveMarkup label="Round carousel arrows (From the Press)">
                <CarouselArrowsCopy />
              </LiveMarkup>
              <LiveMarkup label="Bare close (Share popover)">
                <BareCloseCopy />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Square close (spec)',
                  classes: 'flex items-center justify-center w-10 h-10 bg-navy-subtle text-white hover:bg-navy-bright transition-colors',
                  note: 'A 40px navy-subtle square, hovering to navy-bright. Positioned absolute top-4 right-4 in the dialog. The glyph is the inline 16px close SVG (stroke 2), which in the prototype is missing aria-hidden="true"; add it. Shared by Modal, CreditCardModal and the Member Updates modal; the account drawer uses w-9 h-9.',
                },
                {
                  part: 'Round arrow (spec)',
                  classes: 'w-9 h-9 rounded-full bg-white border border-[#0466C8] flex items-center justify-center text-navy-bolder hover:bg-light-blue transition-colors disabled:opacity-30 disabled:pointer-events-none',
                  note: 'One of the few deliberate rounded-* uses. Disabled (not hidden) at either end of the scroll, so the pair never jumps. Glyph fa-solid fa-chevron-left / right text-sm.',
                },
                {
                  part: 'Bare glyph',
                  classes: 'text-neutral-subtle hover:text-navy-bolder transition-colors',
                  note: 'For a close inside a small panel. Glyph fa-solid fa-xmark text-base. Its hit area is only the 16px glyph; give it at least p-2 in production (24px minimum target).',
                },
                {
                  part: 'Gallery arrows',
                  classes: 'absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-navy-bolder/85 text-white hover:bg-navy-bolder transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100',
                  note: 'ArticleImageGallery, over a photo. Hidden until the stage is hovered, and shown on keyboard focus (focus-visible:opacity-100) so keyboard users can find them.',
                },
              ]}
            />

            <DevNote>
              <p>
                Build two icon-button partials, square and round, each taking <C>{'{{ label }}'}</C> (rendered as{' '}
                <C>aria-label</C>, required) and <C>{'{{ icon }}'}</C>. Icon buttons are always{' '}
                <C>{'<button type="button">'}</C>. Carousel arrows need a behavior that scrolls the track and sets{' '}
                <C>disabled</C> at either end; closes need the behavior of their dialog or popover (see{' '}
                <DsLink to="/design-system/overlays">Overlays</DsLink>).
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/Modal.tsx', note: 'square close' },
                { path: 'src/sections/FromThePress.tsx', note: 'round carousel arrows' },
                { path: 'src/components/ui/SharePopover.tsx', note: 'bare close' },
                { path: 'src/components/ui/ArticleImageGallery.tsx', note: 'gallery arrows' },
              ]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/BooksProductSection.tsx', note: 'carousel arrows are w-10 h-10 and hover to #EBF4FF instead of light-blue; they are removed (not disabled) at the ends, and lack type="button"' },
                { path: 'src/components/layout/AccountLayout.tsx', note: 'drawer close is w-9 h-9 instead of w-10 h-10' },
                { path: 'src/components/ui/ArticleImageGallery.tsx', note: 'its lightbox close is white (bg-white text-neutral-subtle hover:bg-neutral-subtlest) rather than navy-subtle' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Button rows and stacking">
          <div className="flex flex-col gap-8">
            <Lead>
              Two or more buttons together come in two kinds. A <strong className="text-navy-bolder">CTA row</strong>{' '}
              (md buttons in a hero or promo) stacks to full width on phones and goes inline from <C>sm</C> (640px),
              primary first. A <strong className="text-navy-bolder">toolbar row</strong> (sm buttons: article Share /
              Save / Comments, author bio links) never stacks; it wraps.
            </Lead>

            <LiveMarkup label="CTA row (spec): resize below 640px to see it stack" previewClassName="p-6 lg:p-8 bg-navy-boldest">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                <ButtonLink href="#commemorative-gifts" variant="primary" size="md">
                  Purchase a brick or chair
                </ButtonLink>
                <ButtonLink
                  href="https://www.jackctaylorconferencecenter.org/"
                  variant="outline"
                  size="md"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Plan an event
                  <ExternalLinkIcon size="1.1em" />
                  <span className="sr-only">(opens in a new tab)</span>
                </ButtonLink>
              </div>
            </LiveMarkup>

            <LiveMarkup label="Toolbar row (author bio)">
              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink href="/authors/james-stavridis" variant="navy" size="sm">
                  View Biography
                </ButtonLink>
                <ButtonLink href="/authors/james-stavridis#stories" variant="outline-dark" size="sm">
                  More Stories From This Author
                </ButtonLink>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                {
                  part: 'CTA row (spec)',
                  classes: 'flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center',
                  note: (
                    <>
                      Below 640px, a column: the flex items stretch, so each <C>inline-flex</C> button becomes full width,
                      12px apart. From <C>sm</C>, a row with a 16px gap; <C>sm:items-center</C> stops the buttons stretching
                      vertically when one label wraps. As used by PageHero children on Sponsor Student Memberships and the
                      Taylor Center.
                    </>
                  ),
                },
                {
                  part: 'CTA row (hero copies)',
                  classes: 'flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center',
                  note: 'The same row, but stacked until lg (1024px). Used by the one-off heroes (Hero, AboutHero, ArchivesHero, EventsHero, GivingHero, MembershipHero, EssayContestsHero). Two md buttons fit side by side well before 1024px, so prefer the sm breakpoint.',
                },
                {
                  part: 'Toolbar row',
                  classes: 'flex flex-wrap items-center gap-3',
                  note: 'Wraps instead of stacking; 12px between buttons on both axes. ArticleHeader adds flex-shrink-0 so the toolbar keeps its width beside the byline.',
                },
                {
                  part: 'Form button row',
                  classes: 'flex justify-end border-t border-border-light pt-8',
                  note: 'Page forms and modals have their own rows; see Forms and Overlays.',
                },
              ]}
            />

            <DevNote>
              <p>
                Give the button-group a single Twig wrapper (<C>{'{{ buttons }}'}</C> as a list of button components) with a
                &ldquo;stack&rdquo; and a &ldquo;wrap&rdquo; mode, and use the <C>sm</C> breakpoint for every stacking row. Order
                in the source is the order on screen and for keyboard focus: primary first. Form and confirm-dialog rows are on{' '}
                <DsLink to="/design-system/forms">Forms</DsLink> and <DsLink to="/design-system/overlays">Overlays</DsLink>.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/pages/GivingTaylorCenter.tsx', note: 'CTA row in a PageHero' },
                { path: 'src/pages/GivingStudentMemberships.tsx', note: 'CTA row in a PageHero' },
                { path: 'src/sections/ArticleAuthorBio.tsx', note: 'toolbar row' },
                { path: 'src/sections/ArticleHeader.tsx', note: 'toolbar row' },
              ]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/Hero.tsx', note: 'stacks until lg (the homepage hero); same for AboutHero, ArchivesHero, EventsHero, GivingHero, MembershipHero and EssayContestsHero' },
                { path: 'src/sections/BooksHero.tsx', note: 'flex flex-col lg:flex-row gap-3 lg:gap-4 without lg:items-center' },
                { path: 'src/sections/AboutGetInvolved.tsx', note: 'flex flex-col sm:flex-row gap-3: right breakpoint, but 12px gap at every width and no items-center' },
                { path: 'src/sections/NavalHistoryMembershipCTA.tsx', note: 'flex flex-col sm:flex-row gap-4' },
                { path: 'src/sections/ProceedingsSponsoredBillboard.tsx', note: 'flex flex-col sm:flex-row gap-4 pt-3' },
                { path: 'src/sections/GivingConferenceCenter.tsx', note: 'flex flex-wrap gap-3: a toolbar row used for md-weight CTAs' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Drift: hand-rolled buttons">
          <div className="flex flex-col gap-8">
            <Lead>
              These buttons copy parts of the Button recipe into a class string instead of using the component. Most
              differ only in padding, tracking or a missing border, but together they make about a dozen button sizes
              where the spec has three. A missing <C>border</C> makes a button 2px shorter than a bordered one beside
              it. None of them carry the base&rsquo;s <C>focus-visible:</C> classes. Build each as the Button template
              with the nearest variant and size; this list is not a set of variants to support.
            </Lead>

            <DocLabel>Found by searching for &ldquo;bg-navy-bolder text-white font-body font-bold&rdquo; and &ldquo;bg-gold text-navy&rdquo;</DocLabel>

            <SourceList
              title="Navy (nearest: Button navy)"
              tone="drift"
              items={[
                { path: 'src/components/cards/PlainCard.tsx', note: 'the most common copy: text-sm tracking-[-0.3px] px-5 py-3.5, bordered, gap-2, w-full. Between sm and md.' },
                { path: 'src/sections/AboutQuickLinks.tsx', note: 'same as PlainCard' },
                { path: 'src/sections/SplitFeature.tsx', note: 'same compact recipe (text-sm tracking-[-0.3px] px-5 py-3.5, bordered)' },
                { path: 'src/sections/FeaturedEvent.tsx', note: 'compact recipe' },
                { path: 'src/sections/GivingConferenceCenter.tsx', note: 'compact recipe, with an outline-dark copy beside it' },
                { path: 'src/sections/AboutGetInvolved.tsx', note: 'compact recipe, with an outline-dark copy beside it' },
                { path: 'src/sections/TaylorCenterVisit.tsx', note: 'compact recipe plus gap-2 and the external glyph' },
                { path: 'src/sections/ProceedingsMembershipCTA.tsx', note: 'compact recipe with px-6' },
                { path: 'src/sections/NavalHistoryMembershipCTA.tsx', note: 'compact recipe with px-6; its partner is a white button that hovers to neutral-subtlest (a fourth outline style), and the label carries a typed “→”' },
                { path: 'src/sections/EventsConferenceCenter.tsx', note: 'compact recipe with no border (2px shorter)' },
                { path: 'src/sections/DonateFAQ.tsx', note: 'compact recipe, no border' },
                { path: 'src/sections/BooksAboutFAQ.tsx', note: 'compact recipe, no border' },
                { path: 'src/sections/PmeIntro.tsx', note: 'text-sm tracking-[-0.2px] px-6 py-4 gap-2.5, bordered' },
                { path: 'src/sections/ReadingListSection.tsx', note: 'same as PmeIntro' },
                { path: 'src/sections/BooksNewReleasesHero.tsx', note: 'PmeIntro recipe with no border' },
                { path: 'src/sections/BooksHero.tsx', note: 'PmeIntro recipe, no border, display flex instead of inline-flex' },
                { path: 'src/sections/ReadingListsPressLibraries.tsx', note: 'a <span> styled as a button inside a card link (group-hover:bg-navy-bright); should be a CardCta' },
                { path: 'src/sections/ProceedingsMagazine.tsx', note: 'full width: text-sm py-4 px-5 w-full, no border' },
                { path: 'src/sections/NavalHistory.tsx', note: 'same as ProceedingsMagazine' },
                { path: 'src/sections/ContactSections.tsx', note: 'text-base px-6 py-3.5, bordered, no tracking (4px shorter than md/lg)' },
                { path: 'src/sections/EssaySubmitForm.tsx', note: 'text-base px-6 py-3.5 gap-2, bordered' },
                { path: 'src/pages/NotFound.tsx', note: 'text-base px-6 py-3.5, bordered' },
                { path: 'src/pages/account/AccountProfile.tsx', note: 'text-base px-6 py-3.5, bordered' },
                { path: 'src/components/ui/Confirmation.tsx', note: 'text-base px-6 py-4, bordered: Button navy lg without the tracking and base classes' },
                { path: 'src/pages/account/AccountDashboard.tsx', note: 'the account size: text-[15px] px-5 py-3, bordered. Used twice here.' },
                { path: 'src/pages/account/AccountDashboardNextGen.tsx', note: 'account size, three times' },
                { path: 'src/pages/account/AccountGiving.tsx', note: 'account size' },
                { path: 'src/pages/account/AccountSaved.tsx', note: 'account size' },
                { path: 'src/pages/account/AccountWishlist.tsx', note: 'account size' },
                { path: 'src/pages/account/AccountPayment.tsx', note: 'account size with gap-2 and a + icon' },
                { path: 'src/pages/account/AccountAddresses.tsx', note: 'account size with gap-2 and a + icon' },
                { path: 'src/components/ui/AccountNotifications.tsx', note: 'Member Updates modal CTA: text-[15px] px-6 py-3.5, split over several lines (so a one-line search misses it), uses <Link>' },
                { path: 'src/pages/Login.tsx', note: 'full-width submit, text-base py-4, no border, and hovers to navy-bold instead of navy-bright' },
                { path: 'src/sections/MembershipCustomizer.tsx', note: 'plan-card CTA: w-full text-base px-6 py-4; navy hovers to navy-bold, “most popular” is gold' },
                { path: 'src/sections/DonateForm.tsx', note: 'amount-card buttons (flex justify-between w-full text-sm px-4 py-3); documented on Forms' },
                { path: 'src/sections/ProceedingsContactContent.tsx', note: 'bg-navy-bold (not navy-bolder) full-width button inside a warning panel' },
                { path: 'src/components/layout/Header.tsx', note: 'search submit, px-7 text-[15px] tracking-[-0.3px], full height of the field. Intentional: it is part of the search input.' },
              ]}
            />

            <SourceList
              title="Gold (nearest: Button primary)"
              tone="drift"
              items={[
                { path: 'src/sections/BooksBillboards.tsx', note: 'billboard recipe: text-navy-boldest text-base tracking-[-0.5px] px-6 py-4, no border. Button primary lg minus the border, with navy-boldest text instead of navy-bolder.' },
                { path: 'src/sections/PmeReadingListsPromo.tsx', note: 'billboard recipe, self-start' },
                { path: 'src/sections/EssayContestsArchiveTeaser.tsx', note: 'billboard recipe, self-start' },
                { path: 'src/sections/EventsArchiveCta.tsx', note: 'billboard recipe, self-start' },
                { path: 'src/sections/EssayContestPreviousWinners.tsx', note: 'billboard recipe' },
                { path: 'src/pages/GivingOpportunitiesPage.tsx', note: 'billboard recipe, self-start' },
                { path: 'src/sections/MembershipBillboard.tsx', note: 'billboard recipe with navy-bolder text' },
                { path: 'src/pages/Login.tsx', note: 'billboard recipe with navy-bolder text (Join CTA)' },
                { path: 'src/sections/ProceedingsIssueHero.tsx', note: 'flex lg:inline-flex px-5 py-4, no border: primary md minus the border, full width below lg' },
                { path: 'src/sections/NavalHistoryIssueHero.tsx', note: 'same as ProceedingsIssueHero' },
                { path: 'src/sections/EssayContestBody.tsx', note: 'text-base px-5 py-3.5, bordered' },
                { path: 'src/sections/EssaySubmitForm.tsx', note: 'submit: px-8 py-4, bordered' },
                { path: 'src/sections/MembershipServicesCTA.tsx', note: 'tracking-[-0.3px] px-5 py-3.5, no border (multi-line class string)' },
                { path: 'src/sections/BooksOralHistory.tsx', note: 'text-sm tracking-[-0.2px] px-6 py-3.5, navy-boldest text' },
                { path: 'src/components/layout/Footer.tsx', note: 'flex w-full gap-2 px-6 py-4 (multi-line)' },
                { path: 'src/components/layout/Header.tsx', note: 'mega-menu CTA (flex tracking-[-0.3px] px-6 py-4) and the Donate button, which is deliberately compact: text-[15px] min-[1330px]:text-[16px] px-4 min-[1330px]:px-6 py-3 min-[1330px]:py-3.5 leading-none, with the logo mark' },
                { path: 'src/pages/NewsletterJoin.tsx', note: 'submit: px-6 py-4 w-full lg:w-auto lg:min-w-[240px]' },
                { path: 'src/components/ui/ArticleMeterBanner.tsx', note: 'px-6 py-2.5 whitespace-nowrap (shorter, to fit the meter bar)' },
                { path: 'src/components/ui/ArticlePaywall.tsx', note: 'px-8 py-3 mt-8 whitespace-nowrap' },
                { path: 'src/pages/account/AccountWishlist.tsx', note: 'Add to cart: text-[14px] px-4 py-2.5' },
                { path: 'src/pages/account/AccountDashboardNextGen.tsx', note: 'account size (text-[15px] px-5 py-3), bordered, hover:border-gold-dark' },
                { path: 'src/sections/BookProductHero.tsx', note: 'Add to Cart <a> (gap-2.5 px-6 py-4). Out of stock swaps to bg-[#c4c9d4] text-white cursor-not-allowed pointer-events-none with aria-disabled and no href, instead of a disabled <button> at opacity-50' },
              ]}
            />

            <SourceList
              title="Other treatments"
              tone="drift"
              items={[
                { path: 'src/components/ui/SaveArticleButton.tsx', note: 'sm outline that tints #EBF4FF on hover instead of filling navy-bright (see above)' },
                { path: 'src/pages/account/AccountWishlist.tsx', note: 'the Alert Undo action: bg-white border border-navy-bolder text-[15px] px-5 py-2.5, an outline-dark copy at its own size' },
                { path: 'src/pages/NavalHistorySubscribe.tsx', note: 'white bordered button (bg-white text-navy-bolder … px-6 py-3.5 border border-navy-bolder hover:bg-neutral-subtlest), the same fourth outline style as NavalHistoryMembershipCTA' },
              ]}
            />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
