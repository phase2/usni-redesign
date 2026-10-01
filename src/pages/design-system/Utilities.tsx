import { useState, type ReactNode } from 'react'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import CodeBlock from '@/components/design-system/CodeBlock'
import Breadcrumb from '@/components/ui/Breadcrumb'
import IssueCoverCard from '@/components/ui/IssueCoverCard'
import { Field, SelectInput } from '@/components/ui/FormField'
import LargeFeature from '@/components/cards/LargeFeature'
import { stateOfTheInstituteEntries } from '@/data/stateOfTheInstitute'
import type { Article } from '@/types'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'
import aug26Cover from '@/assets/images/proceedings-magazine-aug26-cover.png'
import jul26Cover from '@/assets/images/proceedings-magazine-jul26-cover.png'
// The stylesheet's source text (Vite `?raw` — not processed, not injected).
// Every CSS snippet on this sheet is cut from it at render time, so the
// snippets are always exactly what index.css says.
import indexCss from '@/index.css?raw'

/* ──────────────────────────────────────────────────────────────────────────
   Cutting rules out of index.css
   ────────────────────────────────────────────────────────────────────────── */

const CSS_LINES = indexCss.split('\n')

/**
 * One rule (or at-rule block) from index.css, found by its exact first line,
 * e.g. `.text-link {` or `.link-underline-hover,`. Includes the comment directly
 * above it. `nth` picks a later occurrence of a repeated first line.
 */
function cssRule(firstLine: string, nth = 0): string {
  let seen = -1
  const start = CSS_LINES.findIndex((l) => l.trim() === firstLine && ++seen === nth)
  if (start === -1) return `/* not found in src/index.css: ${firstLine} */`

  let end = start
  let depth = 0
  let opened = false
  for (let i = start; i < CSS_LINES.length; i++) {
    for (const ch of CSS_LINES[i]) {
      if (ch === '{') { depth++; opened = true }
      if (ch === '}') depth--
    }
    end = i
    if (opened && depth === 0) break
  }

  let from = start
  if (CSS_LINES[start - 1]?.trim().endsWith('*/')) {
    from = start - 1
    while (from > 0 && !CSS_LINES[from].includes('/*')) from--
  }

  const block = CSS_LINES.slice(from, end + 1)
  const indent = Math.min(...block.filter((l) => l.trim()).map((l) => l.match(/^ */)![0].length))
  return block.map((l) => l.slice(indent)).join('\n')
}

const css = (...firstLines: string[]) => firstLines.map((l) => cssRule(l)).join('\n\n')

/* ──────────────────────────────────────────────────────────────────────────
   Small helpers
   ────────────────────────────────────────────────────────────────────────── */

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-xs text-navy-subtle break-words [overflow-wrap:anywhere]">{children}</code>
}

function P({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

type Layer = 'base' | 'components' | 'utilities' | 'unlayered'

const LAYER_STYLE: Record<Layer, string> = {
  base: 'bg-tan-subtlest text-navy-bolder border-tan-subtle',
  components: 'bg-surface-subtle text-navy-bolder border-light-blue',
  utilities: 'bg-neutral-subtlest text-navy-bolder border-border-light',
  unlayered: 'bg-gold-dark text-navy-bolder border-gold',
}

function Meta({ layer, apply, uses }: { layer: Layer; apply: boolean; uses: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2 font-body text-xs">
      <span className={`border px-2 py-0.5 font-bold uppercase tracking-[0.06em] ${LAYER_STYLE[layer]}`}>
        {layer === 'unlayered' ? 'Unlayered' : `@layer ${layer}`}
      </span>
      <span className="border border-border-light bg-white px-2 py-0.5 text-neutral-subtle">
        {apply ? 'Uses @apply' : 'Plain CSS'}
      </span>
      <span className="text-neutral-subtle">{uses}</span>
    </div>
  )
}

/** A heading for each class, with its layer and usage. */
function Entry({
  name,
  layer,
  apply,
  uses,
  children,
}: {
  name: string
  layer: Layer
  apply: boolean
  uses: ReactNode
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <h3 className="font-mono text-lg text-navy-bolder">{name}</h3>
        <Meta layer={layer} apply={apply} uses={uses} />
      </div>
      {children}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Example content (real data)
   ────────────────────────────────────────────────────────────────────────── */

const demoArticle: Article = {
  id: 'demo-1',
  category: 'Books',
  headline: 'AI Warfighting: The Next Generation of Naval Strategy',
  excerpt: 'A survey of how autonomous systems are reshaping doctrine, procurement, and the future fleet.',
  author: 'Morrison & Chen',
  date: 'July 2026',
  image: imgAIWarfighting,
  imageAlt: 'AI Warfighting book cover',
  href: '#',
}

const sotiEntry =
  stateOfTheInstituteEntries.find((e) => e.date === 'October 2025') ?? stateOfTheInstituteEntries[0]

const PROCEEDINGS_NAV = [
  { label: 'Current Issue', href: '/proceedings/apr-2026' },
  { label: 'All Issues', href: '/proceedings/all-issues' },
  { label: 'Proceedings Podcast', href: '/proceedings/podcast' },
  { label: 'Essay Contests', href: '/essay-contests' },
]

const FAQ = {
  question: 'How do I join the U.S. Naval Institute?',
  answer:
    'You can join online at usni.org/membership, by phone at 410-268-6110, or by mail. Choose from individual, life, or organizational membership options.',
}

/** The accordion row from MembershipFAQ, classes verbatim. */
function AccordionDemo({ initiallyOpen = false }: { initiallyOpen?: boolean }) {
  const [open, setOpen] = useState(initiallyOpen)
  return (
    <div className={`border-b border-border-light transition-colors ${open ? 'bg-white' : ''}`}>
      <button
        className={`accordion-row flex items-center justify-between w-full gap-4 px-5 py-5 text-left ${open ? 'bg-white' : ''}`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="font-body font-bold text-base text-navy-bolder leading-[1.4] flex-1">{FAQ.question}</span>
        <span className="accordion-chevron flex-shrink-0 flex items-center justify-center bg-navy-subtle p-2" aria-hidden="true">
          <svg
            className={`w-4 h-4 text-white transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l5 5 5-5" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-5 pt-4 pb-6">
          <p className="font-body text-base text-neutral-subtle leading-relaxed">{FAQ.answer}</p>
        </div>
      )}
    </div>
  )
}

/** The account drawer's mount animation, contained in an absolute box (the
    real one is fixed inset-0 z-[60] lg:hidden). Remounts on Replay. */
function DrawerDemo() {
  const [run, setRun] = useState(0)
  return (
    <div className="flex flex-col gap-3">
      <div key={run} className="relative h-[260px] overflow-hidden bg-white border border-border-light">
        <div className="p-6 font-body text-sm text-neutral-subtle">Page content behind the drawer.</div>
        <div className="overlay-fade-in absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm" aria-hidden="true" />
        <div className="drawer-in-left absolute inset-y-0 left-0 w-[86%] max-w-[330px] bg-[#f4f6fb] border-r border-[#c4c9d4] shadow-2xl p-6 pt-5">
          <p className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-neutral-subtle">Account menu</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setRun((r) => r + 1)}
        className="self-start inline-flex items-center gap-2 bg-navy-bolder text-white font-body font-bold text-sm px-4 py-2.5 hover:bg-navy-bright transition-colors"
      >
        <i className="fa-solid fa-rotate-right text-xs" aria-hidden="true" />
        Replay
      </button>
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Overview
   ────────────────────────────────────────────────────────────────────────── */

const OVERVIEW: { name: string; layer: Layer; apply: boolean; uses: string; what: string }[] = [
  { name: 'base rules (html, body, h1–h4, *, button)', layer: 'base', apply: true, uses: 'global', what: 'Smoothing, body font and colour, heading line-height, border-box, square buttons' },
  { name: '.container-site', layer: 'components', apply: true, uses: '180 / 158 files', what: 'Content-width wrapper' },
  { name: '.section-divider', layer: 'components', apply: true, uses: 'unused', what: 'Hairline top border' },
  { name: '.eyebrow', layer: 'components', apply: true, uses: '29 / 28', what: 'Eyebrow label typography' },
  { name: '.eyebrow-headline', layer: 'components', apply: true, uses: '22 / 21', what: 'Eyebrow + heading stack, 8px gap' },
  { name: '.footer-nav-accent', layer: 'components', apply: true, uses: 'unused', what: 'Short tan rule under a heading' },
  { name: '.section-gradient / -blue', layer: 'components', apply: false, uses: '1 / unused', what: 'Section background gradients' },
  { name: '.header-top / .header-bottom', layer: 'components', apply: true, uses: '1 each (Header)', what: 'Header zones' },
  { name: '.article-link', layer: 'components', apply: false, uses: '20 / 13', what: 'Blue underline sweep on hover' },
  { name: '.article-link--nav', layer: 'components', apply: false, uses: '5 (Header)', what: '2px sweep, triggered by group/nav' },
  { name: '.article-link--card', layer: 'components', apply: false, uses: '8 / 6', what: 'Sweep triggered by a hover anywhere on a group card' },
  { name: '.link-underline-hover', layer: 'components', apply: false, uses: '21 / 17', what: 'currentColor underline, hidden at rest' },
  { name: '.link-underline-always', layer: 'components', apply: false, uses: '10 / 10', what: 'currentColor underline at rest, redraws on hover' },
  { name: '.text-link', layer: 'components', apply: false, uses: '128 / 49', what: 'The inline link on light grounds' },
  { name: '.rich-text', layer: 'components', apply: true, uses: '1 (State of the Institute)', what: 'House styles for transcribed HTML' },
  { name: '.accordion-row / .accordion-chevron', layer: 'components', apply: false, uses: '8 / 7', what: 'Blue-band hover for accordion headers' },
  { name: 'select.select-field', layer: 'components', apply: false, uses: '26 / 15', what: 'Custom chevron for every <select>' },
  { name: "[aria-label='Breadcrumb'] a", layer: 'components', apply: false, uses: 'every Breadcrumb', what: 'Hover sweep on breadcrumb links' },
  { name: '.drawer-in-left / .overlay-fade-in', layer: 'unlayered', apply: false, uses: '1 each (AccountLayout)', what: 'Mount animations' },
  { name: '@keyframes link-underline-sweep', layer: 'unlayered', apply: false, uses: '3 rules', what: 'Underline redraw' },
  { name: '.hover\\:bg-gold-dark:hover', layer: 'unlayered', apply: false, uses: '25 / 24', what: 'Forces the gold hover' },
  { name: '.text-balance', layer: 'utilities', apply: false, uses: '2 (PageHero)', what: 'text-wrap: balance' },
  { name: '.scrollbar-hide', layer: 'utilities', apply: false, uses: '3 / 3', what: 'Hide scrollbars on scrollers' },
  { name: '@media print (.print-receipt, .print-hide)', layer: 'unlayered', apply: false, uses: '4 pages', what: 'Receipt printing' },
]

/* ──────────────────────────────────────────────────────────────────────────
   Sheet
   ────────────────────────────────────────────────────────────────────────── */

export default function Utilities() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Utility Classes">
          <p>
            Every global class and base rule in <code className="font-mono text-base">src/index.css</code>: what it
            does, its CSS, a live example, and where it is used. These are the styles Tailwind classes alone do not
            cover — they go into the Drupal theme’s main stylesheet, inside the same <code className="font-mono text-base">@layer</code>.
          </p>
          <p>
            The CSS on this sheet is cut from <code className="font-mono text-base">index.css</code> as the page
            renders, so it always matches the file. Usage counts are a survey of <code className="font-mono text-base">src/</code>{' '}
            (October 2026, design-system sheets excluded).
          </p>
        </DocPageHeader>

        {/* ── Overview ────────────────────────────────────────────────── */}
        <DocSection title="Overview">
          <div className="flex flex-col gap-6">
            <P>
              Where a rule sits decides what can override it. Tailwind emits <C>base</C>, then <C>components</C>, then{' '}
              <C>utilities</C>; at equal specificity the later layer wins, so a utility class beats a component class.
              Several rules below are deliberately written one notch more specific (element-qualified or two classes
              deep) to win against a utility — the notes say which and why. Unlayered rules come after all three.
            </P>
            <div className="overflow-x-auto border border-border-light bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-subtlest border-b border-border-light">
                    {['Class / rule', 'Layer', '@apply', 'Uses / files', 'What it does'].map((h) => (
                      <th key={h} className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {OVERVIEW.map((r) => (
                    <tr key={r.name} className="border-b border-border-light last:border-b-0">
                      <td className="px-4 py-3 align-top"><C>{r.name}</C></td>
                      <td className="px-4 py-3 align-top font-body text-sm text-neutral-subtle whitespace-nowrap">{r.layer}</td>
                      <td className="px-4 py-3 align-top font-body text-sm text-neutral-subtle">{r.apply ? 'yes' : '—'}</td>
                      <td className="px-4 py-3 align-top font-body text-sm text-neutral-subtle whitespace-nowrap">{r.uses}</td>
                      <td className="px-4 py-3 align-top font-body text-sm text-neutral-subtle">{r.what}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <DevNote>
              <p>
                <C>@apply</C> works in the Drupal theme’s Tailwind build as long as the tokens it names exist — copy the
                config from the Design Tokens sheet first. The plain-CSS rules hard-code <C>#0466C8</C> and{' '}
                <C>#ffffff</C>; in the theme they can be written as <C>theme(&apos;colors.navy.bright&apos;)</C> so a
                token change reaches them.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ── Base layer ──────────────────────────────────────────────── */}
        <DocSection title="Base layer">
          <Entry name="@layer base" layer="base" apply uses="Applies to every page">
            <P>
              Custom properties for the two font stacks, font smoothing and smooth in-page scrolling, the body’s
              default font, colour (<C>navy-bolder</C>) and ground, a 1.1 line-height for <C>h1</C>–<C>h4</C>,
              border-box sizing, and square buttons. Everything else is Tailwind’s preflight.
            </P>
            <CodeBlock code={cssRule('@layer base {')} />
            <LiveMarkup label="A bare button with a background — square, not native-rounded">
              <button type="button" className="bg-gold text-navy-bolder font-body font-bold px-5 py-3">
                Join Today
              </button>
            </LiveMarkup>
            <DevNote>
              <p>
                The <C>button</C> reset is in the base layer so any <C>rounded-*</C> utility still wins (SharePopover,
                avatars, quantity steppers). It does not cover <C>input</C>, <C>select</C> or <C>textarea</C>; several
                cart fields add <C>rounded-none</C> by hand for iOS Safari. Consider widening the selector in the theme.
              </p>
              <p>
                <C>scroll-behavior: smooth</C> on <C>html</C> is not wrapped in a reduced-motion query. Add{' '}
                <C>@media (prefers-reduced-motion: reduce) {'{ html { scroll-behavior: auto; } }'}</C> in the theme.
              </p>
            </DevNote>
          </Entry>
        </DocSection>

        {/* ── Layout ──────────────────────────────────────────────────── */}
        <DocSection title="Layout">
          <div className="flex flex-col gap-14">
            <Entry name=".container-site" layer="components" apply uses="180 uses in 158 files">
              <P>
                The content wrapper inside every full-bleed section: 1312px max, centred, with 24px gutters, 32px from{' '}
                <C>lg</C>, none from <C>xl</C>. The section around it carries the background and vertical padding.
              </P>
              <CodeBlock code={cssRule('.container-site {')} />
              <LiveMarkup label="Section + container" previewClassName="p-0 bg-neutral-subtlest">
                <section className="py-12 lg:py-16 bg-white">
                  <div className="container-site">
                    <p className="font-body text-sm text-neutral-subtle border border-dashed border-navy-bright/50 p-4">
                      Content inside .container-site
                    </p>
                  </div>
                </section>
              </LiveMarkup>
              <DevNote>
                <p>
                  Between a 1280px and 1312px viewport the padding is already gone but the container has not reached
                  its max-width, so content runs flush to the window edge. Keep <C>px-8</C> until 1376px (1312 + 2 ×
                  32) in the theme — see Design Tokens → Spacing &amp; layout.
                </p>
              </DevNote>
            </Entry>

            <Entry name=".section-divider" layer="components" apply uses="Unused">
              <CodeBlock code={cssRule('.section-divider {')} />
              <LiveMarkup label="A hairline between sections">
                <div className="section-divider" />
              </LiveMarkup>
              <P>
                Not referenced anywhere. Sections separate by ground colour and padding instead. Either drop it or
                use it for a rule between two white sections; it is the same as <C>border-t border-border-light</C>.
              </P>
            </Entry>

            <Entry name=".header-top / .header-bottom" layer="components" apply uses="1 each — Header.tsx">
              <P>
                Structural hooks for the two tiers of the desktop header. <C>.header-top</C> owns the single divider
                between the tiers and is <C>relative</C> so the utility dropdowns can position against it; its{' '}
                <C>overflow</C> is switched in the component (hidden while collapsing on scroll, visible otherwise) so
                the dropdowns can escape. No live example — see the Navigation sheet for the header itself.
              </P>
              <CodeBlock code={css('.header-top {', '.header-bottom {')} />
              <ClassTable
                rows={[
                  { part: 'Top tier', classes: 'header-top hidden lg:block transition-all duration-300 ease-in-out', note: 'Plus max-h-40 opacity-100 overflow-visible at rest; max-h-0 opacity-0 pointer-events-none overflow-hidden once scrolled.' },
                  { part: 'Bottom tier', classes: 'header-bottom hidden lg:block', note: 'Primary nav and search toggle.' },
                ]}
              />
              <SourceList title="Where it lives" items={[{ path: 'src/components/layout/Header.tsx' }]} />
            </Entry>
          </div>
        </DocSection>

        {/* ── Eyebrows & accents ─────────────────────────────────────── */}
        <DocSection title="Eyebrows & accents">
          <div className="flex flex-col gap-14">
            <Entry name=".eyebrow / .eyebrow-headline" layer="components" apply uses=".eyebrow 29 uses · .eyebrow-headline 22">
              <P>
                <C>.eyebrow</C> is typography only — 14px Inter medium, uppercase, wide tracking, <C>navy-subtle</C>.
                It sets no margin. <C>.eyebrow-headline</C> wraps an eyebrow and its heading in a flex column with an
                8px gap, so the pair spaces itself and neither element needs <C>mb-*</C>. On dark grounds add{' '}
                <C>text-light-blue</C>; it wins because utilities come after components.
              </P>
              <CodeBlock code={css('.eyebrow {', '.eyebrow-headline {')} />
              <LiveMarkup label="On light, and on navy">
                <div className="flex flex-col gap-6">
                  <div className="eyebrow-headline">
                    <p className="eyebrow">Naval History</p>
                    <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">Stories of Naval Heritage</h2>
                  </div>
                  <div className="bg-navy-boldest p-6">
                    <div className="eyebrow-headline">
                      <p className="eyebrow text-light-blue">About USNI</p>
                      <h2 className="font-headline text-[32px] lg:text-5xl text-white leading-[1.1]">The Independent Forum of the Sea Services</h2>
                    </div>
                  </div>
                </div>
              </LiveMarkup>
              <SourceList
                title="Used in"
                items={[
                  { path: 'src/components/ui/SectionHeader.tsx' },
                  { path: 'src/sections/PageHero.tsx' },
                  { path: 'src/sections/AboutHero.tsx', note: 'eyebrow text-light-blue' },
                ]}
              />
              <SourceList
                title="Drift"
                tone="drift"
                items={[
                  { path: 'src/components/ui/Eyebrow.tsx', note: 'inline recipe with tracking-[0.08em] (the class uses tracking-widest, 0.1em); ~13 sections inline the same recipe' },
                  { path: 'src/components/cards/LargeFeature.tsx', note: 'card category label — font-normal, tracking-[0.5px], #0466C8' },
                ]}
              />
            </Entry>

            <Entry name=".footer-nav-accent" layer="components" apply uses="Unused">
              <CodeBlock code={cssRule('.footer-nav-accent {')} />
              <LiveMarkup label="Tan accent under a heading">
                <div>
                  <p className="font-body font-bold text-base text-navy-bolder">About USNI</p>
                  <span className="footer-nav-accent" />
                </div>
              </LiveMarkup>
              <P>
                A 56 × 2px tan rule with 8px above it. The footer no longer uses it (its divider is{' '}
                <C>h-px w-full bg-gold-subtle</C>), so nothing references it. Drop it unless design brings it back.
              </P>
            </Entry>

            <Entry name=".section-gradient / .section-gradient-blue" layer="components" apply={false} uses=".section-gradient 1 (ProceedingsMagazine) · -blue unused">
              <P>
                Soft diagonal section grounds: white to <C>neutral-subtlest</C>, and <C>surface-subtle</C> to a slightly
                deeper blue (#E6EEFF, which has no token). Plain CSS because Tailwind’s gradient utilities do not take an
                angle like 256deg without an arbitrary value.
              </P>
              <CodeBlock code={css('.section-gradient {', '.section-gradient-blue {')} />
              <LiveMarkup label="Both gradients">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="section-gradient h-32 border border-border-light" />
                  <div className="section-gradient-blue h-32 border border-border-light" />
                </div>
              </LiveMarkup>
            </Entry>
          </div>
        </DocSection>

        {/* ── Links ───────────────────────────────────────────────────── */}
        <DocSection title="Links">
          <div className="flex flex-col gap-14">
            <P>
              Five link treatments, all built on one mechanic: a 1px (or 2px) <C>linear-gradient</C> background pinned
              to the bottom edge, whose <C>background-size</C> animates from 0% to 100%. A gradient rather than{' '}
              <C>text-decoration</C> because only a background can sweep. <C>box-decoration-break: clone</C> gives each
              line of a wrapped link its own underline.
            </P>

            <Entry name=".text-link" layer="components" apply={false} uses="128 uses in 49 files">
              <P>
                The one inline link on a light background: <C>#0466c8</C> (navy-bright), underlined at rest, the
                underline redrawing on hover. Not element-qualified, because some are <C>{'<button>'}</C>s. Links on
                dark grounds (footer, heroes) keep their own light colour and are deliberately not part of it.
              </P>
              <CodeBlock code={css('.text-link {', '.text-link:hover {')} />
              <LiveMarkup label="Inline links in body copy — hover one">
                <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed max-w-[760px]">
                  We serve our members by providing a monthly journal,{' '}
                  <a href="/proceedings" className="text-link">Proceedings</a>, and other benefits such as our daily news
                  service <a href="/news" className="text-link">USNI News</a>; discounts off all titles from the{' '}
                  <a href="/books" className="text-link">Naval Institute Press</a>.
                </p>
              </LiveMarkup>
              <DevNote>
                <p>
                  <C>width: fit-content</C> keeps the underline the width of the words when a link is a flex or grid
                  child. Add <C>w-full</C> where a full-width link is wanted. The colour is hard-coded; in the theme,
                  use <C>theme(&apos;colors.navy.bright&apos;)</C>.
                </p>
              </DevNote>
              <SourceList
                title="Used in"
                items={[
                  { path: 'src/sections/AboutMissionVision.tsx', note: 'the example above' },
                  { path: 'src/components/ui/Confirmation.tsx', note: 'on a <button> (Print receipt)' },
                  { path: 'src/components/ui/FilterPanel.tsx', note: 'Clear all' },
                  { path: 'src/index.css', note: '.rich-text a applies it with @apply' },
                ]}
              />
            </Entry>

            <Entry name=".link-underline-hover / .link-underline-always" layer="components" apply={false} uses="21 and 10 uses">
              <P>
                The same underline in <C>currentColor</C>, so it follows whatever text and hover colour the caller sets.{' '}
                <C>-hover</C> is hidden at rest and sweeps in (nav items); <C>-always</C> is underlined at rest and
                redraws on hover (the active nav item, inline links in navy). <C>-always</C> uses a keyframe rather than
                a transition, because a transition from 100% to 100% has nothing to animate.
              </P>
              <CodeBlock
                code={css(
                  '.link-underline-hover,',
                  'a.link-underline-hover {',
                  'a.link-underline-hover:hover {',
                  '.link-underline-always {',
                  '.link-underline-always:hover {',
                )}
              />
              <LiveMarkup label="Section sub-nav — active item and siblings" previewClassName="p-0 bg-white">
                <div className="border-b border-[#B8B49A]" style={{ backgroundColor: '#E0E0CC' }}>
                  <nav className="flex items-center justify-center gap-8 py-4 flex-wrap px-6" aria-label="Proceedings section navigation">
                    {PROCEEDINGS_NAV.map((item, i) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className={`font-body font-semibold text-sm whitespace-nowrap transition-colors
                ${i === 1
                  ? 'text-navy-boldest link-underline-always'
                  : 'text-navy-bolder hover:text-navy-subtle link-underline-hover'
                }`}
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </LiveMarkup>
              <DevNote>
                <p>
                  <C>-hover</C> must be on an <C>{'<a>'}</C>: the rule is written <C>a.link-underline-hover</C> so it
                  outranks Tailwind’s <C>transition-colors</C> (a later layer, equal specificity), which would otherwise
                  replace the transition and make the underline snap. The demo shows the desktop sub-nav row; the real
                  one adds <C>hidden lg:flex</C> and a mobile list (see Navigation).
                </p>
              </DevNote>
              <SourceList
                title="Used in"
                items={[
                  { path: 'src/sections/ProceedingsSubNav.tsx', note: 'and every other *SubNav' },
                  { path: 'src/sections/AboutHistoryActivities.tsx', note: 'link-underline-always font-semibold text-navy-subtle hover:text-navy-bright' },
                ]}
              />
            </Entry>

            <Entry name=".article-link" layer="components" apply={false} uses="20 uses in 13 files">
              <P>
                The headline link on article cards: no underline at rest, a 1px <C>#0466C8</C> rule sweeping in on
                hover of the link itself. The two modifiers below change what triggers the sweep.
              </P>
              <CodeBlock code={css('.article-link {', '.article-link:hover {')} />
              <LiveMarkup label="Large feature card — hover the headline" defaultOpen={false}>
                <div className="max-w-sm">
                  <LargeFeature article={demoArticle} />
                </div>
              </LiveMarkup>
            </Entry>

            <Entry name=".article-link--nav  (the group/nav contract)" layer="components" apply={false} uses="5 uses — header utility links">
              <P>
                For the header’s utility links. The padded <C>{'<a>'}</C> carries Tailwind’s named group marker{' '}
                <C>group/nav</C>; the label is an inner <C>{'<span class="article-link article-link--nav">'}</C>. A hover
                anywhere on the padded link sweeps a 2px underline on the label only — 2px to suit the bold nav type.
              </P>
              <CodeBlock code={css('.article-link--nav {', '.group\\/nav:hover .article-link--nav {')} />
              <LiveMarkup label="Header utility links — hover the padding, not just the word">
                <div className="flex items-center">
                  <a href="/events" className="group/nav font-body font-bold text-[15px] min-[1330px]:text-[16px] text-navy-subtle px-2.5 min-[1330px]:px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                    <span className="article-link article-link--nav pb-0.5">Events</span>
                  </a>
                  <a href="/ships-store" className="group/nav font-body font-bold text-[15px] min-[1330px]:text-[16px] text-navy-subtle px-2.5 min-[1330px]:px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none">
                    <span className="article-link article-link--nav pb-0.5">Ship&apos;s Store</span>
                  </a>
                </div>
              </LiveMarkup>
              <DevNote>
                <p>
                  The contract is two classes in two places: <C>group/nav</C> on the hover target and{' '}
                  <C>article-link article-link--nav</C> on the label inside it. <C>group/nav</C> generates no CSS of its
                  own — it is a marker the rule in index.css selects on (escaped as <C>.group\/nav</C>). In Twig, write
                  the class literally: <C>{'<a class="group/nav …" href="{{ url }}"><span class="article-link article-link--nav pb-0.5">{{ label }}</span></a>'}</C>.
                </p>
              </DevNote>
              <SourceList title="Where it lives" items={[{ path: 'src/components/layout/Header.tsx', note: 'Events, Ship’s Store, Cart, Login/Register, Archives' }]} />
            </Entry>

            <Entry name=".article-link--card  (the group contract)" layer="components" apply={false} uses="8 uses in 6 files">
              <P>
                For cards where the whole card is the link. The card’s <C>{'<a>'}</C> carries <C>group</C>; the
                headline text is an inner span with <C>article-link article-link--card</C>. Hovering anywhere on the
                card sweeps the underline under every line of the headline. Pairs with the cover lift (
                <C>group-hover:-translate-y-2</C>) on cover cards.
              </P>
              <CodeBlock code={css('.group .article-link--card {', '.group:hover .article-link--card {')} />
              <LiveMarkup label="Issue cover cards — hover a card" defaultOpen={false}>
                <div className="grid grid-cols-2 gap-x-6 lg:gap-x-8 max-w-md">
                  <IssueCoverCard href="#" cover={aug26Cover} alt="Proceedings August 2026 cover" title="Proceedings – August 2026" subtitle="Vol. 152/8/1,482" aspect="aspect-[534/728]" />
                  <IssueCoverCard href="#" cover={jul26Cover} alt="Proceedings July 2026 cover" title="Proceedings – July 2026" subtitle="Vol. 152/7/1,481" aspect="aspect-[534/728]" />
                </div>
              </LiveMarkup>
              <DevNote>
                <p>
                  Written as a descendant selector (<C>.group .article-link--card</C>) rather than a bare class so it
                  outranks <C>transition-colors</C>, which would drop <C>background-size</C> from the transition. The
                  card must have the plain <C>group</C> class — not a named group. Each line of a two-line caption is
                  its own span, so each underlines independently.
                </p>
              </DevNote>
              <SourceList
                title="Used in"
                items={[
                  { path: 'src/components/ui/IssueCoverCard.tsx', note: 'the example above' },
                  { path: 'src/components/cards/CollectionTitleCard.tsx' },
                  { path: 'src/sections/EssayContestsCurrentGrid.tsx', note: 'and EssayContestsArchive, BooksProductSection, BooksCollectionLayout' },
                ]}
              />
            </Entry>

            <Entry name="[aria-label='Breadcrumb'] a" layer="components" apply={false} uses="Every Breadcrumb (structural)">
              <P>
                Breadcrumb ancestor links get the hover sweep from their container’s <C>aria-label</C>, so no breadcrumb
                has to repeat a class. The current page is a span, not a link, so it never underlines.
              </P>
              <CodeBlock code={css("[aria-label='Breadcrumb'] a {", "[aria-label='Breadcrumb'] a:hover {")} />
              <LiveMarkup label="Breadcrumb — hover a crumb">
                <Breadcrumb
                  trail={[
                    { label: 'Home', href: '/' },
                    { label: 'About USNI', href: '/about' },
                  ]}
                  current="Leadership & Staff"
                  className="border-b border-[#C2DDFF] pb-4"
                />
              </LiveMarkup>
              <DevNote>
                <p>
                  The Twig breadcrumb must keep <C>aria-label=&quot;Breadcrumb&quot;</C> exactly (case and wording) — the
                  styling depends on it as well as the accessibility. Drupal core’s breadcrumb block uses{' '}
                  <C>aria-labelledby</C> with a hidden heading by default, so override the template.
                </p>
                <p>
                  This rule sets <C>transition: background-size</C> at higher specificity than the link’s{' '}
                  <C>transition-colors</C>, so the colour change on hover snaps rather than fades. Add{' '}
                  <C>color 0.2s ease</C> to the transition in the theme, as <C>a.link-underline-hover</C> does.
                </p>
              </DevNote>
              <SourceList title="Where it lives" items={[{ path: 'src/components/ui/Breadcrumb.tsx' }]} />
            </Entry>

            <Entry name="@keyframes link-underline-sweep" layer="unlayered" apply={false} uses="Used by .text-link:hover and .link-underline-always:hover">
              <P>Redraws the underline from 0 to full width. Keyframes cannot sit in a Tailwind layer.</P>
              <CodeBlock code={cssRule('@keyframes link-underline-sweep {')} />
            </Entry>
          </div>
        </DocSection>

        {/* ── Content ─────────────────────────────────────────────────── */}
        <DocSection title="Rich text">
          <Entry name=".rich-text" layer="components" apply uses="1 use — StateOfTheInstituteEntries">
            <P>
              House styles for HTML that arrives as markup rather than as classed elements — on the prototype, the State
              of the Institute archive, transcribed from the live site. Child elements cannot take utility classes, so
              the reading-column treatment (17px body, <C>neutral-bold</C>, 1.7 leading, headline subheads,{' '}
              <C>.text-link</C> links) is applied by descendant selector. <C>[id]</C> targets get{' '}
              <C>scroll-mt-32</C> to clear the sticky header.
            </P>
            <CodeBlock
              code={css(
                '.rich-text {',
                '.rich-text h3 {',
                '.rich-text h4 {',
                '.rich-text h3 + h4 {',
                '.rich-text ol {',
                '.rich-text ul {',
                '.rich-text a {',
                '.rich-text strong {',
                '.rich-text img {',
                '.rich-text [id] {',
              )}
            />
            <LiveMarkup label={`State of the Institute — ${sotiEntry.date}`} defaultOpen={false}>
              <div className="max-w-[780px]">
                <div className="rich-text" dangerouslySetInnerHTML={{ __html: sotiEntry.html }} />
              </div>
            </LiveMarkup>
            <DevNote>
              <p>
                This is the class to put on Drupal’s CKEditor body field output — <C>{'<div class="rich-text">{{ content.body }}</div>'}</C>
                — so editor content gets the same reading column as the hand-built pages. It covers p, h3, h4, ol, ul,
                a, strong and img. Before relying on it for all body fields, extend it for what CKEditor can also
                produce: <C>h2</C>, <C>blockquote</C>, <C>table</C>, <C>figure</C>/<C>figcaption</C> and <C>em</C>.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/StateOfTheInstituteEntries.tsx' }, { path: 'src/data/stateOfTheInstitute.ts', note: 'the markup' }]} />
          </Entry>
        </DocSection>

        {/* ── Controls ────────────────────────────────────────────────── */}
        <DocSection title="Controls">
          <div className="flex flex-col gap-14">
            <Entry name=".accordion-row / .accordion-chevron" layer="components" apply={false} uses="8 accordions, 7 with the chevron badge">
              <P>
                One hover treatment for every accordion header: a solid <C>#0466C8</C> band with white type, and the
                navy chevron badge inverting to white-on-blue. Written in CSS because the label and chevron set their own
                colours; these descendant selectors are two classes deep, which outranks the single-class text utilities
                that would otherwise keep the label navy on the blue band.
              </P>
              <CodeBlock
                code={css(
                  '.accordion-row {',
                  '.accordion-row:hover {',
                  '.accordion-row:hover,',
                  '.accordion-row:hover .accordion-chevron {',
                  '.accordion-row:hover .accordion-chevron svg {',
                )}
              />
              <LiveMarkup label="Closed, and open — hover a row" markupFor={<AccordionDemo initiallyOpen />}>
                <div className="border-t border-border-light">
                  <AccordionDemo />
                  <AccordionDemo initiallyOpen />
                </div>
              </LiveMarkup>
              <DevNote>
                <p>
                  The markup shown is the open state. Put <C>accordion-row</C> on the header <C>{'<button>'}</C> and{' '}
                  <C>accordion-chevron</C> on the badge. The hover rule recolours <C>span</C>, <C>h2</C>, <C>h3</C> and{' '}
                  <C>p</C> inside the row — any other element type in a header (a <C>div</C> of text, an <C>em</C>)
                  keeps its colour. Toggle <C>aria-expanded</C> with a Drupal behavior; the full accordion spec is on
                  the Accordions sheet.
                </p>
              </DevNote>
              <SourceList
                title="Used in"
                items={[
                  { path: 'src/sections/MembershipFAQ.tsx', note: 'the example above' },
                  { path: 'src/sections/DonateFAQ.tsx', note: 'and ArchivesFAQ, BooksAboutFAQ, GivingWaysToGive, BookProductDetails, EssayContestsArchive, PastEventsArchive' },
                ]}
              />
            </Entry>

            <Entry name="select.select-field" layer="components" apply={false} uses="26 uses in 15 files">
              <P>
                One chevron for every <C>{'<select>'}</C>: native appearance off, an inline SVG chevron (stroke{' '}
                <C>#1D2535</C>) 1rem from the right edge, and 3rem of right padding so long option labels never run
                under it. Element-qualified so it outranks Tailwind padding utilities that would otherwise win{' '}
                <C>padding-right</C>.
              </P>
              <CodeBlock code={css('select.select-field {', 'select.select-field:disabled {')} />
              <LiveMarkup label="Shared SelectInput — default and disabled">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[640px]">
                  <Field label="Membership type" htmlFor="util-select-1">
                    <SelectInput id="util-select-1" defaultValue="individual">
                      <option value="individual">Individual</option>
                      <option value="life">Life</option>
                      <option value="organizational">Organizational</option>
                    </SelectInput>
                  </Field>
                  <Field label="Country" htmlFor="util-select-2">
                    <SelectInput id="util-select-2" disabled defaultValue="us">
                      <option value="us">United States</option>
                    </SelectInput>
                  </Field>
                </div>
              </LiveMarkup>
              <DevNote>
                <p>
                  Add <C>select-field</C> to every select in the Drupal theme (in <C>select.html.twig</C>, or via <C>hook_preprocess_select</C>). Do not add a second chevron
                  element or a native arrow. Disabled only changes the cursor, and the shared controls in FormField
                  carry no disabled styling either, so the disabled select above looks enabled. Give the theme’s
                  controls a disabled state (e.g. <C>disabled:bg-neutral-subtlest disabled:text-neutral-subtle</C>).
                </p>
              </DevNote>
              <SourceList
                title="Used in"
                items={[
                  { path: 'src/components/ui/FormField.tsx', note: 'SelectInput — the canonical control' },
                  { path: 'src/components/ui/SentenceSelect.tsx', note: 'the large inline select' },
                  { path: 'src/sections/ProceedingsAllIssuesGrid.tsx', note: 'archive filters' },
                ]}
              />
            </Entry>
          </div>
        </DocSection>

        {/* ── Utilities layer ─────────────────────────────────────────── */}
        <DocSection title="Utilities layer">
          <div className="flex flex-col gap-14">
            <CodeBlock code={cssRule('@layer utilities {')} />
            <Entry name=".text-balance" layer="utilities" apply={false} uses="2 uses — PageHero (centered intro)">
              <P>
                Evens out line lengths so a short centred paragraph does not end in a one-word orphan. Tailwind 3.4
                ships an identical <C>text-balance</C> utility, so this rule is redundant in the theme — keep the class
                name, drop the rule.
              </P>
              <LiveMarkup label="Without and with text-balance">
                <div className="flex flex-col gap-6 max-w-[520px] mx-auto text-center">
                  <p className="font-body text-base lg:text-lg text-neutral-subtle leading-[1.6]">
                    Join the U.S. Naval Institute and support an independent forum for those who dare to think seriously about sea power.
                  </p>
                  <p className="font-body text-base lg:text-lg text-neutral-subtle leading-[1.6] text-balance">
                    Join the U.S. Naval Institute and support an independent forum for those who dare to think seriously about sea power.
                  </p>
                </div>
              </LiveMarkup>
            </Entry>

            <Entry name=".scrollbar-hide" layer="utilities" apply={false} uses="3 uses — FromThePress, ArticleImageGallery, BooksProductSection">
              <P>
                Hides the scrollbar on horizontal scrollers (carousels with their own arrow buttons) while keeping them
                scrollable by touch, trackpad and keyboard.
              </P>
              <LiveMarkup label="A snap scroller — scroll sideways">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                  {['Proceedings', 'Naval History', 'Books', 'Archives', 'Events', 'Essay Contests', 'USNI News', 'Ship’s Store'].map((t) => (
                    <div key={t} className="snap-start flex-shrink-0 w-48 h-24 bg-surface-subtle border border-border-light flex items-end p-4">
                      <span className="font-headline text-xl text-navy-bolder">{t}</span>
                    </div>
                  ))}
                </div>
              </LiveMarkup>
              <DevNote>
                <p>
                  A hidden scrollbar removes the only visible cue that a row scrolls. Every scroller using it must also
                  have visible prev/next buttons (as FromThePress does) or a cut-off item at the edge.
                </p>
              </DevNote>
            </Entry>
          </div>
        </DocSection>

        {/* ── Animations ──────────────────────────────────────────────── */}
        <DocSection title="Animations">
          <Entry name=".drawer-in-left / .overlay-fade-in" layer="unlayered" apply={false} uses="1 each — AccountLayout (mobile account drawer)">
            <P>
              Mount-time animations for the off-canvas account menu: the panel slides in from the left in 0.28s while
              its scrim fades in over 0.2s. They run when the element is inserted — the drawer unmounts when closed, so
              there is no exit animation. Both switch off under <C>prefers-reduced-motion</C>.
            </P>
            <CodeBlock
              code={css(
                '@keyframes drawer-in-left {',
                '@keyframes overlay-fade-in {',
                '.drawer-in-left {',
                '.overlay-fade-in {',
                '@media (prefers-reduced-motion: reduce) {',
              )}
            />
            <LiveMarkup label="Account drawer (contained) — press Replay">
              <DrawerDemo />
            </LiveMarkup>
            <DevNote>
              <p>
                The demo positions the drawer <C>absolute</C> inside the preview; the real wrapper is{' '}
                <C>lg:hidden fixed inset-0 z-[60]</C> with <C>role=&quot;dialog&quot; aria-modal=&quot;true&quot;</C>. In
                Drupal, insert or un-hide the drawer from a behavior so the animation runs on open, move focus into it,
                trap focus while open, close on Escape and scrim click, and return focus to the toggle.
              </p>
              <p>
                One more animation lives outside index.css: the header search flydown injects its own{' '}
                <C>@keyframes searchSlideIn</C> in an inline <C>{'<style>'}</C> (Header.tsx). Move it into the theme
                stylesheet with the others, under the same reduced-motion guard.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/components/layout/AccountLayout.tsx' }]} />
          </Entry>
        </DocSection>

        {/* ── Overrides & print ───────────────────────────────────────── */}
        <DocSection title="Overrides & print">
          <div className="flex flex-col gap-14">
            <Entry name=".hover\:bg-gold-dark:hover" layer="unlayered" apply={false} uses="25 uses in 24 files (every hover:bg-gold-dark)">
              <P>
                A hand-written copy of the Tailwind utility, outside any layer, so it beats every layered rule — it
                guarantees gold buttons hover to <C>#FFEC99</C> whatever else is on the element.
              </P>
              <CodeBlock code={cssRule('.hover\\:bg-gold-dark:hover {')} />
              <LiveMarkup label="Gold CTA — hover it">
                <a
                  href="/giving/donate"
                  className="inline-flex items-center gap-2.5 bg-gold text-navy-bolder font-body font-bold text-[15px] px-4 py-3 hover:bg-gold-dark transition-colors whitespace-nowrap leading-none"
                >
                  Donate
                </a>
              </LiveMarkup>
              <DevNote>
                <p>
                  With the same token in the theme’s config, Tailwind already generates this rule. Leave it out at first;
                  add it back only if a gold button is found not hovering (which would mean a conflicting background
                  utility on the same element — better fixed there).
                </p>
              </DevNote>
            </Entry>

            <Entry name="@media print — .print-receipt / .print-hide" layer="unlayered" apply={false} uses=".print-receipt on 4 confirmation pages · .print-hide 3 uses in Confirmation">
              <P>
                Confirmation pages print as a receipt: with <C>.print-receipt</C> on the page root, the site header and
                footer and anything marked <C>.print-hide</C> (the Print and navigation buttons) drop out of the printout.
              </P>
              <CodeBlock code={cssRule('@media print {')} />
              <DevNote>
                <p>
                  Opt-in by class, not global: add <C>print-receipt</C> to the confirmation page’s outer wrapper in the
                  order-confirmation template, and <C>print-hide</C> to its on-page controls. The selector
                  matches the <C>{'<header>'}</C> and <C>{'<footer>'}</C> elements, so the Drupal page template must use
                  those elements for the site chrome.
                </p>
              </DevNote>
              <SourceList
                title="Used in"
                items={[
                  { path: 'src/components/ui/Confirmation.tsx', note: 'print-hide on the controls' },
                  { path: 'src/pages/MembershipConfirmation.tsx', note: 'and BooksConfirmation, DonateConfirmation, NavalHistorySubscribeConfirmation' },
                ]}
              />
            </Entry>
          </div>
        </DocSection>

        <DocSection title="Source">
          <DocLabel>All of the above</DocLabel>
          <SourceList title="Where it lives" items={[{ path: 'src/index.css' }]} />
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
