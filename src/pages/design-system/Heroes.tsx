import type { ReactNode } from 'react'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import PreviewFrame from '@/components/design-system/PreviewFrame'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import PageHero from '@/sections/PageHero'
import CollectionHero from '@/sections/CollectionHero'
import AboutPageHero from '@/sections/AboutPageHero'
import ProceedingsIssueHero from '@/sections/ProceedingsIssueHero'
import ProceedingsPodcastHero from '@/sections/ProceedingsPodcastHero'
import ArticleHeader from '@/sections/ArticleHeader'
import BookProductHero from '@/sections/BookProductHero'
import Hero from '@/sections/Hero'
import BooksHero from '@/sections/BooksHero'
import ProceedingsHero from '@/sections/ProceedingsHero'
import DonateHero from '@/sections/DonateHero'
import { blueAndGold, warOnFilm } from '@/data/bookCollections'
import { aiWarfightingBook } from '@/data/bookProductData'
import { givingImage } from '@/data/givingSocieties'
import imgWater from '@/assets/images/books/digital-editions/water.jpg'
import imgBookstore from '@/assets/images/books/custom-bookstore-hero.png'
import imgAiHero from '@/assets/images/AdobeStock_191892422_extended.png'

/* ── Shared example props ─────────────────────────────────────────────────── */

/* Light-blue (and gradient) examples get a matching ground with an xl gutter: `.container-site`
   drops its padding at xl, which on the page is fine (the viewport is wider than
   the 1312px container) but in a preview box narrower than that would put the
   title flush against the frame. The padding is on the preview, not the hero. */
const LIGHT_BAND_PREVIEW = 'p-0 xl:px-8 bg-[#ebf4ff]'
const FULL_BLEED_PREVIEW = 'p-0 bg-white'

const booksTrail = [
  { label: 'Home', href: '/' },
  { label: 'Books & Press', href: '/books' },
]

const darkRule = 'pb-4 border-b border-white/25'
const lightRule = 'pb-4 border-b border-[#C2DDFF]'

/* ── Small doc helpers ────────────────────────────────────────────────────── */

function Prose({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

function Code({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm text-navy-subtle [overflow-wrap:anywhere]">{children}</code>
}

function Verdict({ children }: { children: ReactNode }) {
  return (
    <p className="font-body text-sm text-neutral-bold leading-relaxed max-w-[760px] border-l-4 border-gold bg-white px-4 py-3">
      <span className="font-bold text-navy-bolder">Verdict: </span>
      {children}
    </p>
  )
}

/** Clamp value vs. the `.container-site` gutter at common widths. */
const CLAMP_ROWS: { vw: string; clamp: string; gutter: string }[] = [
  { vw: '375', clamp: '24px (6.5vw = 24.4)', gutter: '24px (px-6)' },
  { vw: '768', clamp: '50px', gutter: '24px (px-6)' },
  { vw: '1024', clamp: '67px', gutter: '32px (lg:px-8)' },
  { vw: '1280', clamp: '83px', gutter: '0 (xl:px-0, container wider than viewport)' },
  { vw: '1440', clamp: '94px', gutter: '64px ((1440 − 1312) / 2)' },
  { vw: '1508', clamp: '98px', gutter: '98px — the two cross here' },
  { vw: '1723+', clamp: '112px (7rem cap)', gutter: '206px and growing' },
]

export default function Heroes() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Heroes & Page Headers">
          <p>
            Every page opens with one header. The site needs fewer kinds than the prototype has files:
            one shared component, <Code>PageHero</Code>, covers almost every section front and interior
            page in two treatments, a light-blue band and a photo with a solid panel. A handful of other
            headers do a different job and stay as their own templates.
          </p>
          <p>
            About twenty sections in the prototype hand-roll a copy of one of the PageHero treatments.
            They are listed at the end with how each differs, so the Drupal build ends up with one hero
            template and a few genuine siblings, not twenty.
          </p>
        </DocPageHeader>

        <DocSection title="Which header to use">
          <div className="overflow-x-auto border border-border-light bg-white">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-neutral-subtlest border-b border-border-light">
                  <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[240px]">Pattern</th>
                  <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Use it for</th>
                  <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[30%]">Status</th>
                </tr>
              </thead>
              <tbody className="font-body text-sm text-neutral-subtle">
                {[
                  ['PageHero — light-blue band', 'Interior pages: a title, optional breadcrumb, eyebrow and intro. Left-aligned by default; centered for a standalone statement page.', 'Canonical'],
                  ['PageHero — photo + panel', 'Section fronts and pages that own real photography. Navy or white panel, left or right.', 'Canonical'],
                  ['CollectionHero', 'Books & Press series and collection pages. PageHero plus a deck, a count line, a photo credit and a series mark plate.', 'Legitimate wrapper — build on PageHero'],
                  ['Media header (issue, podcast)', 'Magazine issue pages and the podcast page: copy on the left, cover art on the right.', 'Distinct pattern — one template, two tones'],
                  ['MagazineHero', 'The Proceedings and Naval History landing pages: the magazine logo centered over a darkened photo.', 'Distinct pattern'],
                  ['Overlap card', 'Join and Donate: a photo strip with a centered white card pulled up over it.', 'Distinct pattern — two identical copies'],
                  ['ArticleHeader', 'Article pages: breadcrumb, leaderboard ad, headline, deck, byline and the Share / Save / Comments toolbar.', 'Distinct pattern'],
                  ['BookProductHero', 'Book product pages: cover, title, formats, price and add-to-cart.', 'Distinct pattern — a product summary, not a hero'],
                ].map(([p, use, status]) => (
                  <tr key={p} className="border-b border-border-light last:border-b-0">
                    <td className="font-semibold text-navy-bolder px-4 py-3 align-top">{p}</td>
                    <td className="px-4 py-3 align-top leading-relaxed">{use}</td>
                    <td className="px-4 py-3 align-top leading-relaxed">{status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DocSection>

        {/* ── PageHero: light-blue band ─────────────────────────────────────── */}
        <DocSection title="PageHero — light-blue band">
          <div className="flex flex-col gap-8">
            <Prose>
              The default interior header: a <Code>#ebf4ff</Code> band with the title in DM Serif at 64px
              on desktop. Used when a page has no photography of its own. A breadcrumb, when present,
              sits first under its own light-blue rule. Without an <Code>image</Code>, this is what
              PageHero renders.
            </Prose>

            <LiveMarkup label="Left-aligned, with breadcrumb (Proceedings Submission Guidelines)" previewClassName={LIGHT_BAND_PREVIEW}>
              <PageHero
                title="Proceedings Submission Guidelines"
                breadcrumb={
                  <Breadcrumb
                    trail={[
                      { label: 'Home', href: '/' },
                      { label: 'Proceedings', href: '/proceedings' },
                    ]}
                    current="Submission Guidelines"
                    className="border-b border-[#C2DDFF] pb-4"
                  />
                }
              />
            </LiveMarkup>

            <LiveMarkup label="Left-aligned, eyebrow + description (Contact USNI — eyebrow added to show the slot)" previewClassName={LIGHT_BAND_PREVIEW}>
              <PageHero
                eyebrow="U.S. Naval Institute"
                title="Contact USNI"
                description="Reach the right department directly — member services, the Naval Institute Foundation, the Press, or the editorial offices in Annapolis."
              />
            </LiveMarkup>

            <LiveMarkup label="Centered, align=&quot;center&quot; (Subscribe to Naval History)" previewClassName={LIGHT_BAND_PREVIEW}>
              <PageHero
                align="center"
                title="Subscribe to Naval History"
                description="The award-winning bimonthly magazine dedicated to the preservation and promotion of naval history — battle accounts, enduring mysteries, essays, and book reviews, six times a year."
              />
            </LiveMarkup>

            <ClassTable
              rows={[
                {
                  part: 'Section',
                  classes: 'bg-[#ebf4ff] pt-10 lg:pt-12 pb-12 lg:pb-16',
                  note: <><Code>#ebf4ff</Code> has no Tailwind token; it recurs on every light-blue band and on the info Alert. Padding steps up once, at lg: 40/48px top, 48/64px bottom.</>,
                },
                {
                  part: 'Container',
                  classes: 'container-site flex flex-col gap-4',
                  note: <>Centered adds <Code>items-center text-center</Code>. Every child — breadcrumb, eyebrow, title, description, children — is spaced by the same 16px gap.</>,
                },
                {
                  part: 'Breadcrumb (slot)',
                  classes: 'pb-4 border-b border-[#C2DDFF]',
                  note: <>Passed in as the <Code>className</Code> of <Code>Breadcrumb</Code>, light tone. <Code>#C2DDFF</Code> is the <Code>light-blue</Code> token (<Code>border-light-blue</Code>).</>,
                },
                {
                  part: 'Eyebrow',
                  classes: 'font-body font-medium text-sm uppercase tracking-[0.08em] text-[#023e7d]',
                  note: <><Code>#023e7d</Code> is <Code>navy-subtle</Code>; the size/weight/tracking is the <Code>text-eyebrow</Code> token. Not the same as the photo variant, which uses the global <Code>.eyebrow</Code> class (tracking-widest, 0.1em). No page passes an eyebrow to this variant yet.</>,
                },
                {
                  part: 'Title (h1)',
                  classes: 'font-headline text-[32px] lg:text-[64px] text-navy-bolder leading-[1.1] text-pretty',
                  note: <>32px → 64px at lg; no xl step. Centered adds <Code>max-w-[900px]</Code>. <Code>text-pretty</Code> keeps a single word off the last line.</>,
                },
                {
                  part: 'Description',
                  classes: 'font-body text-base lg:text-lg text-neutral-subtle leading-[1.6] max-w-[760px] text-pretty',
                  note: <>16 → 18px at lg. <Code>text-pretty</Code> keeps a single word off the last line. Centered swaps the measure for <Code>max-w-[900px] mx-auto text-balance</Code>: centered copy has no column to align with, so it runs wider, and <Code>text-balance</Code> evens the lines rather than leaving a short tail.</>,
                },
                {
                  part: 'Children',
                  classes: '(inside the container, after the description)',
                  note: 'Anything below the intro — a CTA row, a search field. Inherits the 16px gap.',
                },
              ]}
            />
          </div>
        </DocSection>

        {/* ── PageHero: photo + panel ───────────────────────────────────────── */}
        <DocSection title="PageHero — photo with panel">
          <div className="flex flex-col gap-8">
            <Prose>
              Passing an <Code>image</Code> switches PageHero to the split treatment: the photo fills the
              section and a solid panel covers half of it on desktop. The panel is <Code>navy-boldest</Code>{' '}
              by default (<Code>panelTone=&quot;light&quot;</Code> makes it white) and sits on the right
              unless <Code>panelSide=&quot;left&quot;</Code> — flip it when the photo&rsquo;s subject would
              otherwise sit behind the panel. A breadcrumb on a navy panel needs the dark tone.
            </Prose>

            <LiveMarkup label="Navy panel right — breadcrumb, eyebrow, description, mobileImage=&quot;short&quot; (Digital Editions)" previewClassName={FULL_BLEED_PREVIEW}>
              <PageHero
                eyebrow="Naval Institute Press"
                title="Digital Editions"
                description={
                  <>
                    Building on the expertise of the authors and historians of the U.S. Naval Institute,{' '}
                    <em>digital editions</em> are designed to offer an entirely new way to visualize and
                    understand a wide variety of subjects. Using interactives that explain complex concepts,
                    embedded audio &amp; video, and high-quality imagery, these digital editions should
                    appeal to scholars, enthusiasts, and general readers alike.
                  </>
                }
                image={imgWater}
                mobileImage="short"
                panelSide="right"
                breadcrumb={
                  <Breadcrumb trail={booksTrail} current="Digital Editions" tone="dark" className={darkRule} />
                }
              />
            </LiveMarkup>

            <LiveMarkup label="Navy panel right — CTA row as children, standard crop (Sponsor Student Memberships)" previewClassName={FULL_BLEED_PREVIEW}>
              <PageHero
                title="Sponsor Student Memberships"
                description="Your tax-deductible gift provides young leaders with a year of Naval Institute membership, including Proceedings in print and digital, access to online archives and discussion forums, and member discounts."
                image={givingImage('student-memberships-hero.jpg')}
                imageAlt="Newly commissioned ensigns throwing their hats into the air at commencement"
                breadcrumb={
                  <Breadcrumb
                    trail={[
                      { label: 'Home', href: '/' },
                      { label: 'Giving', href: '/giving' },
                      { label: 'Giving Opportunities', href: '/giving/opportunities' },
                    ]}
                    current="Sponsor Student Memberships"
                    tone="dark"
                    className={darkRule}
                  />
                }
              >
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                  <ButtonLink href="/giving/donate" variant="primary" size="md">
                    Sponsor a Membership
                  </ButtonLink>
                  <ButtonLink href="#schools" variant="outline" size="md">
                    Find a School
                  </ButtonLink>
                </div>
              </PageHero>
            </LiveMarkup>

            <LiveMarkup label="Navy panel left — panelSide=&quot;left&quot; (About the Naval Institute Press, panel flipped to show the variant)" previewClassName={FULL_BLEED_PREVIEW}>
              <PageHero
                title="About the Naval Institute Press"
                description="Founded in 1898, the Naval Institute Press publishes essential military and naval titles — from foundational Sea Service guides to New York Times bestselling fiction."
                image={imgBookstore}
                mobileImage="short"
                panelSide="left"
                breadcrumb={
                  <Breadcrumb trail={booksTrail} current="About the Press" tone="dark" className={darkRule} />
                }
              />
            </LiveMarkup>

            <LiveMarkup label="White panel — panelTone=&quot;light&quot;, light breadcrumb (Artificial Intelligence at Naval Institute Press)" previewClassName={FULL_BLEED_PREVIEW}>
              <PageHero
                title="Artificial Intelligence at Naval Institute Press"
                description="Naval Institute Press uses artificial intelligence (AI) in a controlled, secure environment to support publishing operations and improve how our books reach readers."
                image={imgAiHero}
                panelTone="light"
                breadcrumb={
                  <Breadcrumb
                    trail={[...booksTrail, { label: 'About the Press', href: '/books/about' }]}
                    current="Artificial Intelligence"
                    className="border-b border-[#C2DDFF] pb-4"
                  />
                }
              />
            </LiveMarkup>

            <div className="flex flex-col gap-4">
              <h3 className="font-headline text-2xl text-navy-bolder">Below lg: photo above, panel below</h3>
              <Prose>
                Under 1024px a half-width panel would leave the copy a narrow strip over a busy photo, so
                the layout stacks. The section&rsquo;s background image stops being visible (there is no{' '}
                <Code>py</Code> below lg, so nothing shows around the panel); a separate{' '}
                <Code>&lt;img class=&quot;lg:hidden&quot;&gt;</Code> shows the photo as a block above, and
                the panel runs full width beneath it. <Code>mobileImage</Code> sets that block&rsquo;s crop:{' '}
                <Code>standard</Code> is 4:3, the crop every photo hero uses;{' '}
                <Code>short</Code> is 2:1, for artwork that is texture rather than subject (water, a wall of
                book covers) and does not deserve most of a phone screen before the title. The frames
                below are the real pages at 375px.
              </Prose>
              <div className="flex flex-wrap gap-8">
                <div className="min-w-0 max-w-full">
                  <DocLabel>mobileImage=&quot;short&quot; (2:1) — /books/digital-editions</DocLabel>
                  <PreviewFrame
                    src="/books/digital-editions"
                    width={375}
                    height={760}
                    title="Digital Editions at 375px"
                    className="border border-border-light bg-white inline-block max-w-full overflow-x-auto"
                  />
                </div>
                <div className="min-w-0 max-w-full">
                  <DocLabel>mobileImage=&quot;standard&quot; (4:3) — /giving/student-memberships</DocLabel>
                  <PreviewFrame
                    src="/giving/student-memberships"
                    width={375}
                    height={760}
                    title="Sponsor Student Memberships at 375px"
                    className="border border-border-light bg-white inline-block max-w-full overflow-x-auto"
                  />
                </div>
              </div>
            </div>

            <ClassTable
              rows={[
                {
                  part: 'Section',
                  classes: 'relative w-full bg-cover bg-center lg:py-20',
                  note: <>Plus inline <Code>style=&quot;background-image: url(…)&quot;</Code>. <Code>lg:py-20</Code> leaves 80px of photo visible above and below the panel on desktop; below lg there is no padding, so the background is fully covered.</>,
                },
                {
                  part: 'Mobile image',
                  classes: 'lg:hidden w-full aspect-[4/3] object-cover object-center',
                  note: <><Code>mobileImage=&quot;short&quot;</Code> swaps <Code>aspect-[4/3]</Code> for <Code>aspect-[2/1]</Code>. <Code>alt=&quot;&quot;</Code> and <Code>aria-hidden=&quot;true&quot;</Code> unless <Code>imageAlt</Code> is given.</>,
                },
                {
                  part: 'Panel row',
                  classes: 'relative z-10 flex lg:justify-end',
                  note: <><Code>lg:justify-start</Code> when the panel is on the left. Pushes the panel to one side from lg; below lg the panel is full width so it has no effect.</>,
                },
                {
                  part: 'Panel',
                  classes: 'bg-navy-boldest flex flex-col justify-center gap-6 lg:gap-8 w-full lg:w-1/2 xl:w-[49%] max-w-[900px] py-10 lg:py-16 xl:py-20 pl-5 lg:pl-14',
                  note: (
                    <>
                      <Code>bg-white</Code> for the light tone. Width: full below lg, half at lg, 49% at xl (a
                      sliver more photo shows beside it), never wider than 900px (reached at ~1837px). Vertical
                      padding 40 → 64 → 80px. Panel on the left mirrors the inner padding to{' '}
                      <Code>pr-5 lg:pr-14</Code>.
                    </>
                  ),
                },
                {
                  part: 'Panel edge padding',
                  classes: "style: padding-right: clamp(1.25rem, 6.5vw, 7rem)",
                  note: <>On the panel&rsquo;s viewport-edge side (<Code>padding-left</Code> when the panel is on the left). See the table below.</>,
                },
                {
                  part: 'Breadcrumb (slot)',
                  classes: 'pb-4 border-b border-white/25',
                  note: <>On a navy panel: <Code>tone=&quot;dark&quot;</Code> and a 25% white rule. On a white panel: light tone and <Code>border-[#C2DDFF]</Code>, as on the band.</>,
                },
                {
                  part: 'Eyebrow group',
                  classes: 'eyebrow-headline',
                  note: <>Global class: <Code>flex flex-col gap-2</Code>, so the eyebrow sits 8px above the title rather than the panel&rsquo;s 24/32px gap.</>,
                },
                {
                  part: 'Eyebrow',
                  classes: 'eyebrow text-light-blue',
                  note: <><Code>eyebrow text-navy-subtle</Code> on the white panel. <Code>.eyebrow</Code> is <Code>font-body text-sm font-medium uppercase tracking-widest</Code>.</>,
                },
                {
                  part: 'Title + description stack',
                  classes: 'flex flex-col gap-3 lg:gap-4',
                },
                {
                  part: 'Title (h1)',
                  classes: 'font-headline text-[32px] lg:text-5xl xl:text-[54px] leading-[1.1] text-pretty text-white',
                  note: <><Code>text-navy-bolder</Code> on the white panel. 32 → 48 → 54px. Smaller than the band&rsquo;s 64px because the panel is half the width.</>,
                },
                {
                  part: 'Description',
                  classes: 'font-body text-[18px] lg:text-xl leading-relaxed text-pretty text-neutral-subtlest',
                  note: <><Code>text-neutral-subtle</Code> on the white panel. 18 → 20px at lg.</>,
                },
                {
                  part: 'CTA row (children)',
                  classes: 'flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center',
                  note: <>As used on Sponsor Student Memberships. The one-off heroes use <Code>flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center</Code> instead (stacked until lg); pick one for the template. Buttons are <Code>ButtonLink</Code> primary + outline on navy, navy + outline-dark on white.</>,
                },
              ]}
            />

            <div className="flex flex-col gap-3">
              <DocLabel>The edge padding, clamp(1.25rem, 6.5vw, 7rem)</DocLabel>
              <Prose>
                The panel touches the viewport edge, so its outer padding stands in for the site
                container&rsquo;s gutter: it is meant to put the panel&rsquo;s text roughly where the
                header logo and the page content above and below start. The inner side, facing the photo,
                stays a fixed 20/56px. The clamp tracks the gutter closely on phones (24px at 375, the same
                as <Code>px-6</Code>), runs somewhat wider than it on laptops, and caps at 112px so it
                does not keep growing on wide screens. It is an approximation, not a computed alignment —
                above about 1508px the container&rsquo;s gutter is wider than the clamp, so panel text
                starts outside the content column.
              </Prose>
              <div className="overflow-x-auto border border-border-light bg-white max-w-[760px]">
                <table className="w-full text-left border-collapse font-body text-sm">
                  <thead>
                    <tr className="bg-neutral-subtlest border-b border-border-light">
                      <th className="font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-2.5">Viewport</th>
                      <th className="font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-2.5">Clamp resolves to</th>
                      <th className="font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-2.5">.container-site gutter</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CLAMP_ROWS.map((r) => (
                      <tr key={r.vw} className="border-b border-border-light last:border-b-0 text-neutral-subtle">
                        <td className="px-4 py-2 font-semibold text-navy-bolder">{r.vw}px</td>
                        <td className="px-4 py-2">{r.clamp}</td>
                        <td className="px-4 py-2">{r.gutter}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Prose>
                In the previews on this page the clamp is computed from the browser window, not the
                preview box, so the inset looks a little larger relative to the panel than it will on a
                real page.
              </Prose>
            </div>

            <DevNote>
              <p>
                Build the hero as one Paragraph type (or a field group on the node) with these fields,
                shared by both treatments: <Code>{'{{ title }}'}</Code> (usually the node title),{' '}
                <Code>{'{{ eyebrow }}'}</Code> (plain text), <Code>{'{{ description }}'}</Code> (short
                formatted text — italics only), and <Code>{'{{ ctas }}'}</Code> (a multi-value link field,
                max two, first rendered primary). Leaving the image empty gives the light-blue band; the{' '}
                <Code>align</Code> list field (left / center) applies only then.
              </p>
              <p>
                For the photo treatment add: <Code>{'{{ image }}'}</Code> (a Media image with a Focal Point
                widget), <Code>panel_side</Code> (left / right), <Code>panel_tone</Code> (dark / light) and{' '}
                <Code>mobile_crop</Code> (standard / short). The mobile crop picks the image style for the{' '}
                <Code>&lt;img&gt;</Code> — a 4:3 and a 2:1 style, both derived from the focal point. The
                focal point also becomes the desktop <Code>background-position</Code>{' '}
                (<Code>{'{{ focal_x }}% {{ focal_y }}%'}</Code>); PageHero always uses{' '}
                <Code>bg-center</Code>, but CollectionHero already needs a per-page position (War on Film is
                held at <Code>left center</Code>), so the template should take one from the start.
              </p>
              <p>
                The background image cannot be a Tailwind class — it is per-node. Either print it in a
                Twig <Code>style</Code> attribute,{' '}
                <Code>{'style="background-image: url({{ hero_url }}); background-position: {{ focal }};"'}</Code>,
                or, if the site&rsquo;s Content Security Policy blocks inline styles from varying, set a
                custom property (<Code>{'style="--hero-image: url({{ hero_url }})"'}</Code>) and use{' '}
                <Code>bg-[image:var(--hero-image)]</Code> in the class list. The clamp padding is also an
                inline style in the prototype; in the theme it can be a static class,{' '}
                <Code>pr-[clamp(1.25rem,6.5vw,7rem)]</Code> / <Code>pl-[…]</Code> chosen by panel side.
              </p>
              <p>
                The breadcrumb is Drupal&rsquo;s system breadcrumb block rendered into{' '}
                <Code>{'{{ breadcrumb }}'}</Code>, with its tone and rule colour chosen from{' '}
                <Code>panel_tone</Code> (dark → <Code>tone=&quot;dark&quot;</Code> + <Code>border-white/25</Code>;
                band or light panel → light + <Code>border-[#C2DDFF]</Code>). No JavaScript is needed.
              </p>
              <p>
                Accessibility: the hero holds the page&rsquo;s only <Code>h1</Code>. The photo is decorative
                by default (<Code>alt=&quot;&quot;</Code>, <Code>aria-hidden</Code>). If an editor supplies
                alt text, note that the prototype only exposes it on the mobile <Code>&lt;img&gt;</Code>,
                which is <Code>display: none</Code> from lg — desktop has only the CSS background, which
                has no text alternative. Either keep hero photos decorative, or add a visually hidden
                description for lg and up.
              </p>
            </DevNote>

            <PropsTable
              rows={[
                { name: 'title', type: 'string', description: 'Required. The page h1.' },
                { name: 'description', type: 'ReactNode', description: 'Intro under the title.' },
                { name: 'eyebrow', type: 'string', description: 'Small uppercase label above the title.' },
                { name: 'align', type: "'left' | 'center'", default: "'left'", description: 'Light-blue band only.' },
                { name: 'breadcrumb', type: 'ReactNode', description: 'A <Breadcrumb> with its rule in className. Pass tone="dark" on a navy panel.' },
                { name: 'image', type: 'string', description: 'Selects the photo treatment.' },
                { name: 'imageAlt', type: 'string', default: "''", description: 'Only when the photo carries meaning the copy does not (see the accessibility note).' },
                { name: 'panelSide', type: "'left' | 'right'", default: "'right'", description: 'Photo treatment only.' },
                { name: 'panelTone', type: "'dark' | 'light'", default: "'dark'", description: 'Navy-boldest or white panel.' },
                { name: 'mobileImage', type: "'standard' | 'short'", default: "'standard'", description: '4:3 or 2:1 crop for the stacked photo below lg.' },
                { name: 'children', type: 'ReactNode', description: 'Below the description — a CTA row.' },
              ]}
            />

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/sections/PageHero.tsx', note: 'both treatments' },
                { path: 'src/components/ui/Breadcrumb.tsx', note: 'the breadcrumb passed into the slot' },
                { path: 'src/pages/BooksDigitalEditions.tsx', note: 'navy panel, short crop' },
                { path: 'src/pages/GivingStudentMemberships.tsx', note: 'navy panel with CTA row' },
                { path: 'src/pages/BooksAboutSubPage.tsx', note: 'white panel (AI page) and light-blue band' },
                { path: 'src/pages/GivingOpportunitiesPage.tsx', note: 'white panel' },
                { path: 'src/pages/NavalHistorySubscribe.tsx', note: 'centered band' },
                { path: 'src/pages/ProceedingsSubmissions.tsx', note: 'band with breadcrumb' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── Breadcrumb tones ──────────────────────────────────────────────── */}
        <DocSection title="Breadcrumb in a header">
          <div className="flex flex-col gap-8">
            <Prose>
              Every header that carries a breadcrumb puts it first, above a 1px rule with 16px of space
              before it. The rule is part of the breadcrumb&rsquo;s <Code>className</Code>, not the hero,
              so it travels with the crumb. Below <Code>sm</Code> the trail collapses to a back-link to
              the parent (see Navigation).
            </Prose>
            <LiveMarkup label="Light — on the band or a white panel" previewClassName="p-6 lg:p-8 bg-[#ebf4ff]">
              <Breadcrumb trail={booksTrail} current="Digital Editions" className={lightRule} />
            </LiveMarkup>
            <LiveMarkup label="Dark — on a navy panel" previewClassName="p-6 lg:p-8 bg-navy-boldest">
              <Breadcrumb trail={booksTrail} current="Digital Editions" tone="dark" className={darkRule} />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Light rule', classes: 'pb-4 border-b border-[#C2DDFF]', note: <><Code>#C2DDFF</Code> = <Code>light-blue</Code>. Some files write the same classes in the other order.</> },
                { part: 'Dark rule', classes: 'pb-4 border-b border-white/25', note: 'A light-blue rule on navy reads too bright; 25% white is the one to use. The issue headers get this wrong (below).' },
                { part: 'Link (light / dark)', classes: 'font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors / font-body font-bold text-light-blue hover:text-white transition-colors' },
                { part: 'Current (light / dark)', classes: 'font-body italic text-neutral-subtle / font-body italic text-[#f4f4f6]', note: <><Code>#f4f4f6</Code> = <Code>neutral-subtlest</Code>.</> },
              ]}
            />
          </div>
        </DocSection>

        {/* ── CollectionHero ────────────────────────────────────────────────── */}
        <DocSection title="CollectionHero (Books & Press collections)">
          <div className="flex flex-col gap-8">
            <Prose>
              The header for a series or collection page. Same two treatments as PageHero, chosen by the
              collection&rsquo;s data (<Code>hero.variant</Code>) rather than by passing an image, and with
              four additions: a bold <Code>deck</Code> line (the series editor credit), a <Code>meta</Code>{' '}
              count line, a photo credit, and — on the light band — the series brand mark in a white plate
              to the right of the copy.
            </Prose>

            <LiveMarkup label="Light band with series mark plate (Blue and Gold Professional Series)" previewClassName={LIGHT_BAND_PREVIEW}>
              <CollectionHero
                title={blueAndGold.name}
                description={blueAndGold.summary}
                breadcrumbLabel={blueAndGold.shortName}
                breadcrumbParent={{ label: 'Professional Military Education', href: '/books/professional-military-education' }}
                hero={blueAndGold.hero}
                mark={blueAndGold.mark}
              />
            </LiveMarkup>

            <LiveMarkup label="Light band, no mark (Military Reading Lists)" previewClassName={LIGHT_BAND_PREVIEW}>
              <CollectionHero
                title="Military Reading Lists"
                breadcrumbLabel="Military Reading Lists"
                breadcrumbParent={{ label: 'Professional Military Education', href: '/books/professional-military-education' }}
                hero={{ variant: 'light' }}
              />
            </LiveMarkup>

            <LiveMarkup label="Image variant — deck, photo credit, imagePosition (War on Film)" previewClassName={FULL_BLEED_PREVIEW}>
              <CollectionHero
                title={warOnFilm.name}
                deck={warOnFilm.editor ? `${warOnFilm.editor.name}, Series Editor` : undefined}
                description={warOnFilm.summary}
                breadcrumbLabel={warOnFilm.shortName}
                breadcrumbParent={{ label: 'Professional Military Education', href: '/books/professional-military-education' }}
                hero={warOnFilm.hero}
              />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Image section', classes: 'relative w-full bg-cover lg:py-20', note: <>No <Code>bg-center</Code>: <Code>background-position</Code> comes inline from <Code>hero.imagePosition</Code> (default <Code>center</Code>), and the mobile <Code>&lt;img&gt;</Code> gets the same value as <Code>object-position</Code>. This is the focal-point hook PageHero lacks.</> },
                { part: 'Image panel', classes: 'bg-navy-boldest flex flex-col justify-center gap-6 lg:gap-8 w-full lg:w-1/2 xl:w-[49%] max-w-[900px] py-10 lg:py-16 xl:py-20 pl-5 lg:pl-14', note: 'Identical to PageHero; always on the right, always navy.' },
                { part: 'Image text stack', classes: 'flex flex-col gap-4 lg:gap-6', note: <>PageHero uses <Code>gap-3 lg:gap-4</Code>. Drift, not intent.</> },
                { part: 'Deck (navy / band)', classes: 'font-body font-bold text-[18px] lg:text-[22px] text-light-blue leading-[1.4] / font-body font-bold text-[18px] lg:text-[22px] text-navy-subtle leading-[1.4]', note: 'Same deck as EssayContestsHero.' },
                { part: 'Meta (navy / band)', classes: 'font-body text-sm text-light-blue/80 / font-body text-sm text-neutral-subtle' },
                { part: 'Photo credit', classes: 'font-body text-sm text-white leading-relaxed', note: <>Prefixed &ldquo;Photo Credit:&rdquo;. Full white, not a tint: <Code>white/50</Code> on navy-boldest is about 2:1 and fails contrast.</> },
                { part: 'Band layout', classes: 'flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-16', note: 'Inside container-site. Copy column then mark column; stacks below lg with the mark under the copy.' },
                { part: 'Band copy column', classes: 'flex-1 min-w-0 flex flex-col gap-4' },
                { part: 'Band title (h1)', classes: 'font-headline text-[32px] lg:text-[54px] text-navy-bolder leading-[1.1]', note: <>54px, not the band&rsquo;s usual 64px: series names are long — &ldquo;Studies in Marine Corps History and Amphibious Warfare&rdquo; runs to three lines at 64px.</> },
                { part: 'Band eyebrow', classes: 'font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle' },
                { part: 'Band description', classes: 'font-body text-base lg:text-lg text-neutral-subtle leading-[1.6] max-w-[760px]' },
                { part: 'Mark column', classes: 'w-full max-w-[320px] lg:max-w-none lg:w-[300px] xl:w-[340px] lg:flex-shrink-0 lg:self-center', note: '320px max when stacked; a fixed 300/340px column from lg, centered against the copy.' },
                { part: 'Mark plate', classes: 'bg-white shadow-lg p-6 lg:p-8 flex items-center justify-center', note: 'Brand marks always go on white, never inline on the blue, so a supplied logo sits on the ground its designers intended.' },
                { part: 'Mark image', classes: 'w-full h-auto object-contain' },
              ]}
            />
            <Verdict>
              A legitimate wrapper, not a separate pattern. Its image branch is PageHero plus deck, meta,
              credit and a focal point; its band branch is PageHero plus deck, meta, a 54px title and the
              mark plate — which is the same right-hand media column the podcast and issue headers use.
              Build it as the shared hero template with optional <Code>deck</Code>, <Code>meta</Code>,{' '}
              <Code>credit</Code> and <Code>media</Code> fields, not as its own template.
            </Verdict>
            <DevNote>
              <p>
                Fields on the collection (taxonomy term or node): <Code>{'{{ title }}'}</Code>,{' '}
                <Code>{'{{ deck }}'}</Code> (computed from the series editor reference: &ldquo;
                <Code>{'{{ editor.name }}'}</Code>, Series Editor&rdquo;), <Code>{'{{ description }}'}</Code>{' '}
                (the summary), <Code>{'{{ meta }}'}</Code> (a title count, computed), the hero image with
                focal point and <Code>{'{{ credit }}'}</Code>, and <Code>{'{{ mark }}'}</Code> (a Media image
                with required alt — the mark is the series name, so it is meaningful).
              </p>
            </DevNote>
            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/sections/CollectionHero.tsx' },
                { path: 'src/data/bookCollections.ts', note: 'hero, mark and editor data per series' },
                { path: 'src/pages/BookSeriesPage.tsx, src/pages/BooksPME.tsx, src/pages/BooksReadingLists.tsx', note: 'usages' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── AboutPageHero ─────────────────────────────────────────────────── */}
        <DocSection title="AboutPageHero">
          <div className="flex flex-col gap-8">
            <Prose>
              The header for About sub-pages. It is the light-blue band with the About trail baked in and
              one extra line: a <Code>subtitle</Code> set in DM Serif, between the title and the deck.
            </Prose>
            <LiveMarkup label="With subtitle and deck (Strategic Plan 2030)" previewClassName={LIGHT_BAND_PREVIEW}>
              <AboutPageHero
                title="Strategic Plan 2030"
                subtitle="U.S. Naval Institute’s Strategic Plan"
                deck="We are extending the Institute’s reach and broadening its community, seeking a greater diversity of informed perspective from all professionals—young and old, enlisted and officers, civilians, and international professionals—to maintain the best, most effective forum possible."
                breadcrumbLabel="Strategic Plan"
              />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: 'bg-[#ebf4ff] pt-12 pb-16', note: <>No mobile step: PageHero uses <Code>pt-10 lg:pt-12 pb-12 lg:pb-16</Code>, so this header is 8–16px taller on phones.</> },
                { part: 'Title + lines', classes: 'flex flex-col gap-3', note: 'A nested 12px group under the container’s 16px gap; PageHero puts every line on the 16px gap.' },
                { part: 'Subtitle', classes: 'font-headline text-[22px] lg:text-[32px] text-navy-subtle leading-[1.15]', note: 'The only thing PageHero has no slot for. AboutHistoryHero uses the identical line.' },
                { part: 'Deck', classes: 'font-body text-base lg:text-lg text-neutral-subtle leading-[1.5] max-w-[820px]', note: <>PageHero&rsquo;s description is <Code>leading-[1.6] max-w-[760px]</Code>.</> },
              ]}
            />
            <Verdict>
              Drift of the PageHero band. Rebuild with the shared template plus an optional subtitle field
              (which AboutHistoryHero also needs); the padding, line-height and measure differences are
              not deliberate.
            </Verdict>
            <SourceList title="Where it lives" tone="drift" items={[{ path: 'src/sections/AboutPageHero.tsx', note: 'used by AboutLeadership, AboutStrategicPlan, AboutStateOfTheInstitute' }]} />
          </div>
        </DocSection>

        {/* ── Media header (issue / podcast) ────────────────────────────────── */}
        <DocSection title="Media header — issue and podcast">
          <div className="flex flex-col gap-8">
            <Prose>
              A genuinely different layout: copy on the left and a cover image in a fixed column on the
              right, stacking with the cover below the copy on phones. The magazine issue pages use it on
              a dark gradient with a gold CTA; the podcast page uses it on the light-blue band with
              platform badges. CollectionHero&rsquo;s mark plate is the same column. One template with a
              tone switch covers all of them.
            </Prose>
            <LiveMarkup label="Dark — Proceedings: April 2026 (ProceedingsIssueHero)" previewClassName="p-0 xl:px-8 bg-gradient-to-b from-[#1d2535] to-[#0e121a]">
              <ProceedingsIssueHero />
            </LiveMarkup>
            <LiveMarkup label="Light — The Proceedings Podcast (ProceedingsPodcastHero)" previewClassName={LIGHT_BAND_PREVIEW} defaultOpen={false}>
              <ProceedingsPodcastHero />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section (dark)', classes: "style: background: linear-gradient(to bottom, #1d2535, #0e121a)", note: <>Inline. <Code>#1d2535</Code> = <Code>text-primary</Code> / <Code>neutral-bolder</Code>, <Code>#0e121a</Code> = <Code>neutral-boldest</Code> — expressible as <Code>bg-gradient-to-b from-neutral-bolder to-neutral-boldest</Code>. The magazine landing pages dropped this same gradient for MagazineHero&rsquo;s photo overlay.</> },
                { part: 'Section (light)', classes: 'bg-[#ebf4ff] pt-10 lg:pt-12 pb-12 lg:pb-16', note: 'Same band as PageHero.' },
                { part: 'Container (dark)', classes: 'container-site py-10 lg:py-16', note: 'Padding on the container rather than the section.' },
                { part: 'Row', classes: 'flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-16' },
                { part: 'Copy column', classes: 'flex-1 min-w-0 flex flex-col gap-4' },
                { part: 'Breadcrumb wrapper', classes: 'pb-4 border-b border-[#C2DDFF]', note: <>On a wrapping <Code>div</Code>, not the Breadcrumb&rsquo;s className, and with <Code>homeIcon</Code>. On the dark issue header this light-blue rule is a bug — it should be <Code>border-white/25</Code>.</> },
                { part: 'Title (dark)', classes: 'font-headline text-[32px] lg:text-[56px] xl:text-[64px] text-white leading-[1.1]', note: <>&ldquo;Proceedings:&rdquo; and the month are split with a <Code>&lt;br&gt;</Code>. Podcast title: <Code>font-headline text-[32px] lg:text-[64px] text-navy-bolder leading-[1.1]</Code>.</> },
                { part: 'Volume / tagline', classes: 'font-body font-bold text-[18px] lg:text-[24px] text-[#f4f4f6] leading-[1.4]', note: <><Code>#f4f4f6</Code> = <Code>neutral-subtlest</Code>. Podcast tagline uses <Code>text-navy-subtle</Code>. Both are 24px at lg where CollectionHero&rsquo;s deck is 22px.</> },
                { part: 'Issue CTA', classes: 'flex lg:inline-flex items-center justify-center bg-gold text-navy-bolder font-body font-bold text-base tracking-[-0.5px] px-5 py-4 hover:bg-gold-dark transition-colors', note: <>A hand-rolled copy of <Code>ButtonLink</Code> primary md, missing its border and focus-visible outline. Full width below lg.</> },
                { part: 'Cover column', classes: 'w-full max-w-[220px] lg:max-w-none lg:w-[280px] xl:w-[316px] lg:flex-shrink-0 lg:self-center' },
                { part: 'Cover image', classes: 'w-full shadow-2xl', note: <>Podcast art uses <Code>w-full shadow-lg</Code>; CollectionHero&rsquo;s plate is <Code>shadow-lg</Code> too.</> },
                { part: 'Podcast badges', classes: 'inline-block will-change-transform transition-transform duration-200 ease-out hover:-translate-y-1 focus-visible:-translate-y-1', note: <>Each badge image <Code>h-12 w-auto block</Code>. Lifts on hover rather than recolouring, because the platforms&rsquo; artwork may not be altered.</> },
              ]}
            />
            <Verdict>
              Keep as its own template (&ldquo;media header&rdquo;), with <Code>tone</Code> (dark gradient /
              light band), a media image, a secondary line and a CTA slot. ProceedingsIssueHero and
              NavalHistoryIssueHero are line-for-line copies that differ only in content — one template,
              fed by the issue node.
            </Verdict>
            <DevNote>
              <p>
                On an issue node: <Code>{'{{ magazine_name }}'}</Code> and <Code>{'{{ issue_date }}'}</Code>{' '}
                build the title, <Code>{'{{ volume }}'}</Code> the secondary line,{' '}
                <Code>{'{{ cover }}'}</Code> the image (alt: &ldquo;<Code>{'{{ magazine_name }} {{ issue_date }}'}</Code> cover&rdquo;),
                and the CTA links to the magazine&rsquo;s archive view. The podcast badges are a
                multi-value link + image field; each badge&rsquo;s alt is its label (&ldquo;Listen on
                Spotify&rdquo;), which is also the link&rsquo;s accessible name. No JavaScript.
              </p>
            </DevNote>
            <SourceList
              title="Where it lives"
              tone="drift"
              items={[
                { path: 'src/sections/ProceedingsIssueHero.tsx', note: 'dark; spec for the template' },
                { path: 'src/sections/NavalHistoryIssueHero.tsx', note: 'identical copy, Naval History content' },
                { path: 'src/sections/ProceedingsPodcastHero.tsx', note: 'light tone, badges instead of a CTA' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── ArticleHeader ─────────────────────────────────────────────────── */}
        <DocSection title="ArticleHeader">
          <div className="flex flex-col gap-8">
            <Prose>
              The top of every Proceedings and Naval History article: a light-blue-to-white gradient, the
              breadcrumb, a leaderboard ad, then an 864px reading column with the headline, a deck set in
              DM Serif, the byline and the article toolbar. It is a reading header, not a page banner, so
              it stays its own pattern.
            </Prose>
            <LiveMarkup label="Three MEFs Won’t Be Enough (Proceedings, April 2026)" previewClassName="p-0 xl:px-8 bg-gradient-to-b from-[#EBF4FF] to-white" defaultOpen={false}>
              <ArticleHeader
                title="Three MEFs Won't Be Enough"
                deck="To replace mass casualties in a great power war, the Marine Corps should reactivate the 5th and 6th Marine Divisions as the core of two new MEFs."
                date="April 2026"
                magazineName="Proceedings Magazine"
                author="Corporal Richard Sweeney III, U.S. Marine Corps Reserve"
                readTime="8 min read"
              />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: "style: background: linear-gradient(to bottom, #EBF4FF 0%, #FFF 100%)", note: <>Inline; equivalent to <Code>bg-gradient-to-b from-[#ebf4ff] to-white</Code>. Fades the band into the article body.</> },
                { part: 'Breadcrumb', classes: 'flex items-center flex-wrap gap-x-2 gap-y-1 pt-8 pb-6 border-b border-[#C2DDFF]', note: <>Hand-rolled, not <Code>Breadcrumb</Code>: no mobile collapse, links in <Code>text-navy-bolder</Code> rather than <Code>text-navy-subtle</Code>, current crumb <Code>truncate max-w-[320px]</Code>, separators <Code>text-neutral-subtle/40</Code>. Should use the shared component.</> },
                { part: 'Ad slot', classes: 'flex justify-center py-4', note: <>Frame <Code>bg-[#F4F4F6] p-2 border border-[#C4C9D4] max-w-full</Code> = <Code>bg-neutral-subtlest border-neutral-subtler</Code>; placeholder 728 × 90.</> },
                { part: 'Reading column', classes: 'max-w-[864px] mx-auto pt-8 pb-10', note: 'Matches the article body measure below it.' },
                { part: 'Title (h1)', classes: 'font-headline text-[48px] lg:text-[60px] xl:text-[68px] text-navy-bolder leading-[1.05] mb-6', note: 'Starts at 48px on phones — every other header starts at 32px. Long headlines will wrap heavily at 375px.' },
                { part: 'Deck', classes: 'font-headline text-[28px] lg:text-[32px] text-neutral-subtle leading-[1.35] mb-8' },
                { part: 'Meta row', classes: 'flex flex-col gap-6 md:flex-row md:items-end md:justify-between', note: 'Byline and toolbar side by side from md.' },
                { part: 'Byline column', classes: 'min-w-0 md:flex-1 md:max-w-[50%]', note: 'Capped at half so a long author list wraps in its own column rather than pushing the buttons.' },
                { part: 'Date / publication', classes: 'font-body font-bold text-sm text-navy-bolder', note: <>Separated by 7px navy squares, <Code>inline-block flex-shrink-0 bg-navy-bolder</Code> with an inline width/height (= <Code>w-[7px] h-[7px]</Code>).</> },
                { part: 'Toolbar', classes: 'flex flex-wrap items-center gap-3 flex-shrink-0', note: <>Share (popover), Save (<Code>aria-pressed</Code> toggle) and Comments (<Code>Button</Code> outline-dark sm, scrolls to <Code>#article-comments</Code>).</> },
              ]}
            />
            <DevNote>
              <p>
                Article node fields: <Code>{'{{ title }}'}</Code>, <Code>{'{{ deck }}'}</Code>,{' '}
                <Code>{'{{ issue_date }}'}</Code>, <Code>{'{{ magazine_name }}'}</Code>,{' '}
                <Code>{'{{ authors }}'}</Code> (rendered &ldquo;By …&rdquo;), <Code>{'{{ read_time }}'}</Code>{' '}
                (computed), <Code>{'{{ comment_count }}'}</Code>. The breadcrumb should be the shared
                Breadcrumb template; the ad is an ad-slot block region.
              </p>
              <p>
                JavaScript (Drupal behaviors): the Share popover (open/close, Escape, outside click, copy
                link — the trigger needs <Code>aria-expanded</Code> and <Code>aria-controls</Code>), the Save
                toggle (update <Code>aria-pressed</Code> and the label; persist via the account API), and a
                smooth scroll for Comments.
              </p>
            </DevNote>
            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/sections/ArticleHeader.tsx' },
                { path: 'src/components/ui/SharePopover.tsx, src/components/ui/SaveArticleButton.tsx', note: 'toolbar controls' },
              ]}
            />
          </div>
        </DocSection>

        {/* ── BookProductHero ───────────────────────────────────────────────── */}
        <DocSection title="BookProductHero">
          <div className="flex flex-col gap-8">
            <Prose>
              The top of a book product page: a sticky cover on the left, and on the right the title,
              authors, rating, format selector, price and add-to-cart. It is a product summary that
              happens to open the page, not a hero — it belongs with Commerce, and is noted here so it is
              not mistaken for a header variant.
            </Prose>
            <LiveMarkup label="AI Warfighting" previewClassName="p-0 xl:px-8 bg-white" defaultOpen={false}>
              <BookProductHero book={aiWarfightingBook} />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: 'bg-white py-10 lg:py-14' },
                { part: 'Breadcrumb', classes: 'pb-5 mb-8 border-b border-[#e4e7ec]', note: <>Hand-rolled: no <Code>aria-label</Code> on the <Code>nav</Code>, no Home crumb, current title in <Code>font-semibold</Code> rather than italic. <Code>#e4e7ec</Code> is close to <Code>border-light</Code> (#E2E8F0) but not it.</> },
                { part: 'Grid', classes: 'grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[340px_1fr] gap-10 xl:gap-16 items-start' },
                { part: 'Cover', classes: 'lg:sticky lg:top-8', note: <>Frame <Code>aspect-[2/3] bg-neutral-subtlest shadow-2xl overflow-hidden</Code>. Sticks while the details scroll past on desktop.</> },
                { part: 'Title (h1)', classes: 'font-headline text-[40px] lg:text-[48px] text-navy-bolder leading-[1.1]' },
                { part: 'Format button', classes: 'px-4 py-2.5 font-body font-semibold text-sm border transition-colors', note: <>Selected <Code>border-navy-bolder bg-navy-bolder text-white</Code>; otherwise <Code>border-[#c4c9d4] text-navy-bolder hover:border-navy-bolder bg-white</Code>. No <Code>aria-pressed</Code> and no <Code>type=&quot;button&quot;</Code>.</> },
                { part: 'Price', classes: 'font-headline text-[40px] text-navy-bolder leading-none', note: <>Member badge <Code>font-body text-sm font-bold text-[#0a5c2e] bg-[#e6f7ed] px-2 py-0.5</Code> — the success Alert&rsquo;s colours.</> },
                { part: 'Add to cart', classes: 'flex items-center justify-center gap-2.5 font-body font-bold text-base px-6 py-4 transition-colors', note: <>In stock <Code>bg-gold text-navy-bolder hover:bg-gold-dark cursor-pointer</Code>; out of stock <Code>bg-[#c4c9d4] text-white cursor-not-allowed pointer-events-none</Code> with <Code>aria-disabled</Code>.</> },
              ]}
            />
            <DevNote>
              <p>
                In Drupal Commerce the formats are product variations, and the format selector + price +
                Add to Cart are the variation&rsquo;s add-to-cart form, which swaps price and stock over
                AJAX when the variation changes. Mark the selector up as a radio group (or buttons with{' '}
                <Code>aria-pressed</Code>) so the selected format is announced. Rating, share buttons and
                the wishlist button need <Code>type=&quot;button&quot;</Code> and accessible names.
              </p>
            </DevNote>
            <SourceList title="Where it lives" items={[{ path: 'src/sections/BookProductHero.tsx' }, { path: 'src/data/bookProductData.ts' }]} />
          </div>
        </DocSection>

        {/* ── Representative one-offs ───────────────────────────────────────── */}
        <DocSection title="Representative one-offs">
          <div className="flex flex-col gap-8">
            <Prose>
              Four hand-built heroes, shown live because they are the most visible and the most likely
              to be argued for as special cases. Two are PageHero with small, undeliberate differences;
              two are genuinely different patterns.
            </Prose>

            <LiveMarkup label="Homepage — Hero" previewClassName={FULL_BLEED_PREVIEW}>
              <Hero />
            </LiveMarkup>
            <Verdict>
              PageHero&rsquo;s photo treatment with <Code>panelSide=&quot;left&quot;</Code> and a CTA row. It
              differs in three places: the section is <Code>lg:py-24</Code> (PageHero{' '}
              <Code>lg:py-20</Code>), the title reaches <Code>xl:text-[64px]</Code> (PageHero 54px), and
              the text stack is <Code>gap-4 lg:gap-6</Code>. The panel is the section&rsquo;s direct child
              rather than inside a flex row, which renders the same. If the homepage is meant to read
              larger, that is one <Code>size=&quot;lg&quot;</Code> option on the template, not a separate
              hero.
            </Verdict>

            <LiveMarkup label="Books & Press landing — BooksHero" previewClassName={FULL_BLEED_PREVIEW} defaultOpen={false}>
              <BooksHero />
            </LiveMarkup>
            <Verdict>
              PageHero with <Code>panelTone=&quot;light&quot; panelSide=&quot;left&quot;</Code>, with the
              search field and two buttons passed as children. Its differences are all drift: the panel
              caps at <Code>max-w-[860px]</Code> (900) and pads <Code>lg:py-14</Code> (16); the eyebrow is
              a hand-styled sibling outside an <Code>eyebrow-headline</Code> group, so it sits 24px from
              the title instead of 8px; the title carries both <Code>lg:text-5xl</Code> and{' '}
              <Code>lg:text-[64px]</Code> (the second wins — a conflicting pair); the description stays
              18px at lg; and the buttons are hand-rolled anchors at <Code>text-sm px-6</Code> rather than{' '}
              <Code>ButtonLink</Code> navy / outline-dark. The search field is the only real addition, and
              children already covers it.
            </Verdict>

            <LiveMarkup label="Proceedings landing — MagazineHero (via ProceedingsHero)" previewClassName={FULL_BLEED_PREVIEW}>
              <ProceedingsHero />
            </LiveMarkup>
            <Verdict>
              A distinct pattern: the magazine&rsquo;s logo centered over its photo, with a{' '}
              <Code>rgba(14, 18, 26, 0.72)</Code> overlay (<Code>neutral-boldest</Code> at 72%) doing the
              work of keeping white type legible, and <Code>lg:min-h-[480px]</Code> so both magazine
              banners are the same height. Keep it; ProceedingsHero and NavalHistoryHero are thin content
              wrappers over the one component, which is the right shape. One problem: neither landing page
              has an <Code>h1</Code> — the masthead is an <Code>&lt;img&gt;</Code>. Wrap the logo in the
              page&rsquo;s <Code>h1</Code> (its alt becomes the heading text).
            </Verdict>

            <LiveMarkup label="Donate — DonateHero (overlap card)" previewClassName={FULL_BLEED_PREVIEW}>
              <DonateHero />
            </LiveMarkup>
            <Verdict>
              A distinct pattern: a photo strip of height <Code>clamp(320px, 40vw, 580px)</Code> with a
              centered white card (<Code>max-w-[860px]</Code>) pulled up over it by a negative margin of{' '}
              <Code>clamp(-200px, calc(-28vw + 110px), 0px)</Code> — no overlap on phones, up to 200px on
              wide screens. Used for the two conversion pages, Donate and Join, which are exact copies
              (JoinHero centers the photo, DonateHero anchors it to the top). Build one &ldquo;overlap
              card&rdquo; template with a background-position option.
            </Verdict>
          </div>
        </DocSection>

        {/* ── Drift list ────────────────────────────────────────────────────── */}
        <DocSection title="Drift: one-off heroes">
          <div className="flex flex-col gap-6">
            <Prose>
              Every hand-built header in <Code>src/sections</Code>, grouped by what it should become. None
              have been changed; the canonical spec above is what to build.
            </Prose>

            <SourceList
              title="Photo + panel copies — rebuild as PageHero with an image"
              tone="drift"
              items={[
                { path: 'src/sections/Hero.tsx', note: 'homepage. Navy panel left; lg:py-24, xl:text-[64px], gap-4 lg:gap-6 (see above).' },
                { path: 'src/sections/GivingHero.tsx', note: 'navy panel right, eyebrow “Donate”, primary + outline CTAs. Only difference: text stack gap-4 lg:gap-6. → PageHero.' },
                { path: 'src/sections/AboutHero.tsx', note: 'a copy of GivingHero with About content. → PageHero.' },
                { path: 'src/sections/BooksHero.tsx', note: 'white panel left + search + CTAs; max-w-[860px], lg:py-14, loose eyebrow, conflicting title sizes, hand-rolled buttons (see above). → PageHero light/left with children.' },
                { path: 'src/sections/MembershipHero.tsx', note: 'white panel left; lg:py-24, xl:text-[64px], gap-4 lg:gap-6, eyebrow with no colour class (falls back to .eyebrow’s navy-subtle); NavyButtonLink + outline-dark. → PageHero light/left.' },
                { path: 'src/sections/EventsHero.tsx', note: 'a copy of MembershipHero without the eyebrow; the “Host an event” button opens a new tab with an sr-only notice. → PageHero light/left.' },
                { path: 'src/sections/ArchivesHero.tsx', note: 'a copy of MembershipHero with Archives content. → PageHero light/left.' },
                { path: 'src/sections/AboutHistoryHero.tsx', note: 'white panel left; Breadcrumb with homeIcon and no rule under it; a DM Serif subtitle (22/32px) in place of the description; lg:py-24, xl:text-[64px]. → PageHero light/left + subtitle.' },
                { path: 'src/sections/EssayContestsHero.tsx (PhotoHero)', note: 'PageHero was generalised from this — identical except a bold deck line and an actions prop instead of children. → PageHero + deck.' },
                { path: 'src/sections/CollectionHero.tsx (image branch)', note: 'adds deck, meta, photo credit and imagePosition; text stack gap-4 lg:gap-6. → PageHero + those fields (documented above).' },
              ]}
            />

            <SourceList
              title="Light-blue band copies — rebuild as the PageHero band"
              tone="drift"
              items={[
                { path: 'src/sections/EventsPageHero.tsx', note: 'class-for-class the PageHero band with the Events trail fixed. → PageHero, no changes.' },
                { path: 'src/sections/EssayContestsHero.tsx (InteriorHero)', note: 'the band plus a bold deck line. → PageHero + deck.' },
                { path: 'src/sections/AboutPageHero.tsx', note: 'pt-12 pb-16 with no mobile step, a DM Serif subtitle, deck at leading-[1.5] max-w-[820px] (see above). → PageHero + subtitle.' },
                { path: 'src/sections/ProceedingsContactHero.tsx', note: 'title only; pt-12 pb-20 — the deepest bottom padding of any band, for no stated reason. → PageHero.' },
                { path: 'src/sections/ProceedingsAllIssuesHero.tsx', note: 'title only; pt-12 pb-16. → PageHero.' },
                { path: 'src/sections/NavalHistoryAllIssuesHero.tsx', note: 'identical to ProceedingsAllIssuesHero but for the trail. → PageHero.' },
                { path: 'src/sections/BooksCollectionHero.tsx', note: 'pt-12 pb-14, gap-6; the title, then BookSearchBar size="large" full width beneath it, as on /search. → PageHero band with the search bar as children.' },
                { path: 'src/sections/BooksNewReleasesHero.tsx', note: 'the same title row as BooksCollectionHero with a hand-rolled navy “Browse all books” button instead of search. → same trailing slot, with ButtonLink navy.' },
              ]}
            />

            <SourceList
              title="Distinct patterns — keep, one template each"
              tone="drift"
              items={[
                { path: 'src/sections/MagazineHero.tsx', note: 'logo masthead over a darkened photo. Wrapped by ProceedingsHero.tsx and NavalHistoryHero.tsx, which pass content only — not drift. Missing h1.' },
                { path: 'src/sections/DonateHero.tsx, src/sections/JoinHero.tsx', note: 'overlap card. Exact copies apart from content and bg-top vs bg-center.' },
                { path: 'src/sections/ProceedingsIssueHero.tsx, src/sections/NavalHistoryIssueHero.tsx', note: 'media header, dark. Exact copies apart from content; both put a light-blue rule under a dark breadcrumb.' },
                { path: 'src/sections/ProceedingsPodcastHero.tsx', note: 'media header, light band. Breadcrumb rule on a wrapping div with homeIcon; tagline 24px where CollectionHero’s deck is 22px.' },
              ]}
            />

            <DevNote title="What the template needs, from the drift">
              <p>
                Folding the copies into PageHero asks for only a few additions to the canonical component:
                an optional <Code>deck</Code> (bold line, EssayContests and CollectionHero), an optional{' '}
                <Code>subtitle</Code> (DM Serif line, About pages), a focal point /{' '}
                <Code>background-position</Code> for the photo, a trailing slot on the band for a search
                field or button (Books collection pages), and possibly a larger title size for the
                homepage. Everything else in the list — padding of 56 vs 64 vs 80px, 54 vs 64px titles on
                the panel, gap-3 vs gap-4 stacks — is drift to drop, not variation to support.
              </p>
            </DevNote>
          </div>
        </DocSection>

        <DocSection title="Quick reference">
          <CodeBlock
            code={`import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'

// Light-blue band
<PageHero title="Contact USNI" description="…" />

// Photo, navy panel on the right, dark breadcrumb
<PageHero
  title="Digital Editions"
  eyebrow="Naval Institute Press"
  description="…"
  image={heroImage}
  mobileImage="short"
  breadcrumb={
    <Breadcrumb trail={trail} current="Digital Editions" tone="dark"
      className="pb-4 border-b border-white/25" />
  }
/>`}
          />
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
