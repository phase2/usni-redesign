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
// The config is plain JS with no type declarations (the project does not set
// allowJs), so TypeScript sees `any`. Its shape is asserted just below. Importing
// it rather than mirroring it means the colour tables can never drift from the
// tokens Tailwind actually generates.
// @ts-expect-error -- untyped JS module; shape asserted as TailwindThemeExtend
import tailwindConfig from '../../../tailwind.config.js'
import tailwindConfigSource from '../../../tailwind.config.js?raw'

/* ──────────────────────────────────────────────────────────────────────────
   Config, read from tailwind.config.js
   ────────────────────────────────────────────────────────────────────────── */

type ColorValue = string | Record<string, string>
interface TailwindThemeExtend {
  colors: Record<string, ColorValue>
  fontFamily: Record<string, string[]>
  fontSize: Record<string, [string, Record<string, string>]>
  maxWidth: Record<string, string>
  spacing: Record<string, string>
}
const extend = (tailwindConfig as { theme: { extend: TailwindThemeExtend } }).theme.extend

interface ColorToken {
  /** The name used in utilities, e.g. `navy-boldest`, `gold`. */
  token: string
  hex: string
  /** Where it sits in the config object, e.g. `navy.boldest`. */
  configPath: string
}

/** Nested scale objects become hyphenated names; `DEFAULT` becomes the bare key. */
function flattenColors(colors: Record<string, ColorValue>): ColorToken[] {
  const out: ColorToken[] = []
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      out.push({ token: key, hex: value, configPath: `'${key}'` })
    } else {
      for (const [step, hex] of Object.entries(value)) {
        out.push({
          token: step === 'DEFAULT' ? key : `${key}-${step}`,
          hex,
          configPath: `${key}.${step}`,
        })
      }
    }
  }
  return out
}

const COLOR_TOKENS = flattenColors(extend.colors)

/* ──────────────────────────────────────────────────────────────────────────
   What each colour is for. Usage counts are a survey of src/ (October 2026,
   design-system sheets excluded): "utility uses" counts bg-/text-/border-/…
   classes naming the token; "hard-coded" counts the same hex written out,
   e.g. text-[#1d2535] or style={{ color: '#1D2535' }}.
   ────────────────────────────────────────────────────────────────────────── */

type Group = 'Navy' | 'Neutral' | 'Gold' | 'Tan' | 'Utility'
const GROUPS: Group[] = ['Navy', 'Neutral', 'Gold', 'Tan', 'Utility']

const COLOR_META: Record<string, { group: Group; role: ReactNode; uses: number; hardCoded: number }> = {
  'navy-boldest': { group: 'Navy', role: 'Darkest panels: the navy hero panel, footer, overlays (`bg-navy-boldest/70` scrim). Hover/active text on tan sub-navs.', uses: 66, hardCoded: 0 },
  'navy-bolder': { group: 'Navy', role: 'The workhorse: headings and primary text on light grounds, solid navy buttons, card and button borders. Also the body default (base layer).', uses: 746, hardCoded: 9 },
  'navy-bold': { group: 'Navy', role: 'Section-header top rule (`border-t-2 border-navy-bold`), mid-dark panels.', uses: 46, hardCoded: 37 },
  navy: { group: 'Navy', role: 'Brand navy. Rarely used directly.', uses: 8, hardCoded: 0 },
  'navy-subtle': { group: 'Navy', role: 'Eyebrows, header/nav text, links in chrome (breadcrumbs, sub-navs), accordion chevron badge.', uses: 173, hardCoded: 111 },
  'navy-subtler': { group: 'Navy', role: 'Lightest navy. Effectively unused.', uses: 1, hardCoded: 1 },
  'navy-bright': { group: 'Navy', role: 'Hover fill for solid navy buttons; focus borders. Same blue as the inline-link colour, the accordion hover band and the interior H2 rule, which are all still hard-coded as #0466C8.', uses: 231, hardCoded: 115 },
  'text-primary': { group: 'Neutral', role: 'Semantic alias of neutral-bolder. Defined, but no file uses `text-text-primary`; files hard-code #1d2535 instead.', uses: 0, hardCoded: 186 },
  'neutral-boldest': { group: 'Neutral', role: 'Highest-contrast neutral. Defined, unused. The near-black #060a0a in article bodies should become this.', uses: 0, hardCoded: 4 },
  'neutral-bolder': { group: 'Neutral', role: 'Primary text tone from Figma (same value as text-primary). Card headlines, cart and checkout text — all hard-coded as #1d2535.', uses: 0, hardCoded: 186 },
  'neutral-bold': { group: 'Neutral', role: 'Body copy in reading columns (`text-neutral-bold leading-[1.7]`).', uses: 47, hardCoded: 0 },
  'neutral-white': { group: 'Neutral', role: 'White. Unused — files write `bg-white`, which is the same value.', uses: 0, hardCoded: 0 },
  'neutral-subtle': { group: 'Neutral', role: 'Secondary text: decks, excerpts, meta, dates, breadcrumb current page. Also the border and value colour of the hand-built cart and checkout fields (hard-coded #4e576a).', uses: 411, hardCoded: 91 },
  'neutral-subtler': { group: 'Neutral', role: 'Stronger dividers and input borders, disabled fills. Almost always hard-coded — `border-[#c4c9d4]` is the second most common arbitrary value in the codebase.', uses: 2, hardCoded: 124 },
  'neutral-subtlest': { group: 'Neutral', role: 'Page background behind cards, image placeholders, light-grey section bands, text on navy panels.', uses: 53, hardCoded: 16 },
  gold: { group: 'Gold', role: 'Primary CTA fill (Join, Donate, Subscribe), cart-count badge.', uses: 50, hardCoded: 2 },
  'gold-subtle': { group: 'Gold', role: 'Thin accent rules (footer divider, 4px bar above pillar cards).', uses: 4, hardCoded: 0 },
  'gold-dark': { group: 'Gold', role: 'Hover for gold buttons. The name is legacy: it is the lightest gold, not the darkest.', uses: 28, hardCoded: 5 },
  tan: { group: 'Tan', role: 'Accent underlines (`.footer-nav-accent`, currently unused), tan borders.', uses: 6, hardCoded: 0 },
  'tan-subtle': { group: 'Tan', role: 'Tan borders on tan-subtlest panels.', uses: 8, hardCoded: 4 },
  'tan-subtlest': { group: 'Tan', role: 'Warm section band (commemorative gifts, school directory), article callouts.', uses: 14, hardCoded: 8 },
  'light-blue': { group: 'Utility', role: 'Eyebrows and links on navy; the rule under the breadcrumb on light-blue heroes; cover-art panels. Figma calls it primary-subtler.', uses: 37, hardCoded: 23 },
  'surface-subtle': { group: 'Utility', role: 'Light blue-tinted band (tax information, selected donation amount).', uses: 54, hardCoded: 0 },
  'border-light': { group: 'Utility', role: 'Default hairline: card borders, list dividers, the header’s top-zone rule. Utility reads `border-border-light`.', uses: 107, hardCoded: 18 },
}

/** Text colour that reads on a swatch of this hex. */
function onSwatch(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  const lum = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255
  return lum < 0.6 ? '#FFFFFF' : '#001845'
}

/* ──────────────────────────────────────────────────────────────────────────
   Small table used throughout the sheet (styled to match ClassTable)
   ────────────────────────────────────────────────────────────────────────── */

function DataTable({ head, rows, widths = [] }: { head: string[]; rows: ReactNode[][]; widths?: string[] }) {
  return (
    <div className="overflow-x-auto border border-border-light bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-subtlest border-b border-border-light">
            {head.map((h, i) => (
              <th key={h} className={`font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 ${widths[i] ?? ''}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-b border-border-light last:border-b-0">
              {row.map((cell, c) => (
                <td key={c} className="font-body text-sm text-neutral-subtle px-4 py-3 align-top leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-xs text-navy-subtle break-words [overflow-wrap:anywhere]">{children}</code>
}

/** Renders `backticked` spans of a plain-string note as inline code. */
function Ticks({ text }: { text: ReactNode }) {
  if (typeof text !== 'string') return <>{text}</>
  return (
    <>
      {text.split(/`([^`]+)`/).map((part, i) => (i % 2 ? <C key={i}>{part}</C> : part))}
    </>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

function Swatch({ hex, label }: { hex: string; label?: string }) {
  return (
    <span
      className="inline-flex items-center justify-center w-14 h-10 border border-border-light font-mono text-[10px] flex-shrink-0"
      style={{ backgroundColor: hex, color: onSwatch(hex) }}
    >
      {label}
    </span>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Hard-coded colour survey
   ────────────────────────────────────────────────────────────────────────── */

const HARD_CODED_WITH_TOKEN: { hex: string; uses: number; files: number; token: string; note?: string }[] = [
  { hex: '#1D2535', uses: 186, files: 40, token: 'neutral-bolder (or text-primary)', note: 'Card headlines, cart/checkout text and titles.' },
  { hex: '#C4C9D4', uses: 124, files: 38, token: 'neutral-subtler', note: '80 of these are border-[#c4c9d4]; also input borders and 1px separators.' },
  { hex: '#0466C8', uses: 115, files: 75, token: 'navy-bright', note: 'Card category labels, interior H2 rule, focus rings, info accent. index.css repeats it in .text-link, .article-link and .accordion-row.' },
  { hex: '#023E7D', uses: 111, files: 33, token: 'navy-subtle', note: 'Mostly form focus states (focus:border-[#023e7d], focus:ring-[#023e7d]/30).' },
  { hex: '#4E576A', uses: 91, files: 14, token: 'neutral-subtle', note: 'Field borders and values in the hand-built cart and checkout forms. The shared FormField uses #94A3B8 instead — pick one.' },
  { hex: '#002B5C', uses: 37, files: 10, token: 'navy-bold' },
  { hex: '#C2DDFF', uses: 23, files: 22, token: 'light-blue', note: 'The rule under the breadcrumb on light-blue heroes (border-[#C2DDFF]).' },
  { hex: '#E2E8F0', uses: 18, files: 6, token: 'border-light' },
  { hex: '#F4F4F6', uses: 16, files: 14, token: 'neutral-subtlest', note: 'Breadcrumb current-page text on dark (text-[#f4f4f6]).' },
  { hex: '#001845', uses: 9, files: 7, token: 'navy-bolder' },
  { hex: '#F7F7F2', uses: 8, files: 7, token: 'tan-subtlest' },
  { hex: '#FFEC99', uses: 5, files: 1, token: 'gold-dark', note: 'MembershipComparisonTable.' },
  { hex: '#D9D7BF', uses: 4, files: 2, token: 'tan-subtle' },
  { hex: '#FFD000', uses: 2, files: 1, token: 'gold' },
]

const HARD_CODED_NO_TOKEN: { hex: string; uses: number; files: number; proposed: string; role: string }[] = [
  { hex: '#EBF4FF', uses: 64, files: 52, proposed: 'light-blue-subtle', role: 'The light-blue interior hero (`bg-[#ebf4ff]`), info alert background, light-blue bands and hover fills. Within a few points of surface-subtle (#EEF2FF) — design should confirm whether they are meant to be one colour before both ship.' },
  { hex: '#C1121F', uses: 46, files: 19, proposed: 'danger', role: 'Error text and borders on form fields, danger alert accent, remove-item hover.' },
  { hex: '#E8EAED', uses: 32, files: 21, proposed: 'border-subtle (or merge into border-light)', role: 'Row dividers in account cards, confirmation summaries, article-body rules. Visually indistinguishable from border-light #E2E8F0.' },
  { hex: '#D4D0BA', uses: 16, files: 8, proposed: 'tan-muted', role: 'Sub-nav item hover and active fill (mobile sub-nav list).' },
  { hex: '#060A0A', uses: 16, files: 4, proposed: '→ neutral-boldest', role: 'Near-black H2s in article bodies. No new token: use neutral-boldest (#0E121A).' },
  { hex: '#E0E0CC', uses: 15, files: 14, proposed: 'tan-light', role: 'Section sub-nav bar background (set as an inline style in every *SubNav), eyebrows on billboard photos, author-bio active tab.' },
  { hex: '#B8B49A', uses: 14, files: 7, proposed: 'tan-bold', role: 'Sub-nav bar bottom border and the mobile list top border.' },
  { hex: '#94A3B8', uses: 13, files: 10, proposed: 'border-input', role: 'Idle border of the shared form controls (FormField: TextInput, SelectInput, TextArea) and the archive filter selects. Equals Tailwind’s default slate-400. Cart and checkout fields use #4e576a instead; align them to this.' },
  { hex: '#FFF8D6', uses: 12, files: 11, proposed: 'warning-subtle', role: 'Warning alert background, cart notices.' },
  { hex: '#FFAA00', uses: 11, files: 10, proposed: 'warning', role: 'Warning alert accent bar and icon.' },
  { hex: '#0A5C2E', uses: 11, files: 8, proposed: 'success', role: 'Success alert accent, “in stock”, “open” contest badges.' },
  { hex: '#999FAD', uses: 10, files: 4, proposed: 'neutral-muted', role: 'Cart section rules. This is Figma’s real neutral “subtle” tier; our neutral-subtle (#4E576A) is Figma’s “default” tier, so the natural name is taken.' },
  { hex: '#C8C4A8', uses: 8, files: 8, proposed: '→ tan', role: 'Mobile sub-nav row dividers. Three points from tan (#C5C19D); use tan.' },
  { hex: '#E4E7EC', uses: 8, files: 7, proposed: '→ border-light', role: 'Book product page dividers.' },
  { hex: '#9CA3AF', uses: 7, files: 5, proposed: '→ neutral-muted', role: 'Input placeholder text. Equals Tailwind’s default gray-400.' },
  { hex: '#E6F7ED', uses: 6, files: 5, proposed: 'success-subtle', role: 'Success alert background, “in stock” badge.' },
  { hex: '#FEF6F6', uses: 6, files: 4, proposed: 'danger-subtle', role: 'Danger alert and errored-field background.' },
  { hex: '#F8FAFD', uses: 5, files: 4, proposed: '→ neutral-subtlest', role: 'Header strip of account cards and notification panels.' },
  { hex: '#CDE4F8', uses: 4, files: 4, proposed: '(decide)', role: 'Selected tab on checkout payment tabs, paired with #ebf4ff for the unselected tab.' },
]

/* ──────────────────────────────────────────────────────────────────────────
   Type scale as used. Class strings are copied verbatim from the cited files.
   ────────────────────────────────────────────────────────────────────────── */

interface TypeRow {
  role: string
  classes: string
  sample: string
  where: ReactNode
  dark?: boolean
  note?: ReactNode
}

const HEADINGS: TypeRow[] = [
  {
    role: 'H1 — light-blue interior hero',
    classes: 'font-headline text-[32px] lg:text-[64px] text-navy-bolder leading-[1.1]',
    sample: 'Leadership & Staff',
    where: '9 files: AboutPageHero, EventsPageHero, EssayContestsHero, ProceedingsAllIssuesHero, NavalHistoryAllIssuesHero, ProceedingsPodcastHero, ProceedingsContactHero…',
    note: 'The canonical page title. Two sizes only: 32px below lg, 64px from lg.',
  },
  {
    role: 'H1 — landing hero (three steps)',
    classes: 'font-headline text-[32px] lg:text-5xl xl:text-[64px] text-navy-bolder leading-[1.1]',
    sample: 'Our History',
    where: 'AboutHistoryHero, MembershipHero, ArchivesHero, EventsHero',
    note: 'Adds a 48px step at lg because these titles share the row with an image.',
  },
  {
    role: 'H1 — navy panel over photo',
    classes: 'font-headline text-[32px] lg:text-5xl xl:text-[54px] text-white leading-[1.1]',
    sample: 'The Independent Forum of the Sea Services',
    where: 'AboutHero, GivingHero, CollectionHero, EssayContestsHero',
    dark: true,
    note: 'Caps at 54px, not 64px — the panel is half the width.',
  },
  {
    role: 'H1 — magazine issue hero',
    classes: 'font-headline text-[32px] lg:text-[56px] xl:text-[64px] text-white leading-[1.1]',
    sample: 'October 2026',
    where: 'ProceedingsIssueHero, NavalHistoryIssueHero',
    dark: true,
  },
  {
    role: 'H1 — cart and checkout',
    classes: 'font-headline text-[64px] text-[#1d2535] leading-[1.1] text-center',
    sample: 'Your Cart',
    where: '8 pages: BooksCart, MembershipCart, DonateCart, *Checkout…',
    note: 'No mobile step — renders 64px on a phone. Build with the light-hero H1 sizes instead.',
  },
  {
    role: 'H2 — section header',
    classes: 'font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]',
    sample: 'Stories of Naval Heritage',
    where: 'SectionHeader component + 15 inline copies',
    note: '36px / 48px. Text-4xl carries a 1.1 line-height override in the config.',
  },
  {
    role: 'H2 — interior heading with blue rule',
    classes: 'font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]',
    sample: 'Purchase a Brick or Chair at the new Jack C. Taylor Conference Center',
    where: '17 uses — TaylorCenterCommemorative, StudentSchoolDirectory…',
    note: 'The rule colour is navy-bright, hard-coded.',
  },
  {
    role: 'H2 — sub-section',
    classes: 'font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1]',
    sample: 'Ways to Give',
    where: '11 uses',
  },
  {
    role: 'H2 — dated entry in a reading column',
    classes: 'font-headline text-[28px] lg:text-[36px] text-navy-bolder leading-[1.15]',
    sample: 'October 2025',
    where: 'StateOfTheInstituteEntries',
  },
  {
    role: 'H2 — article body',
    classes: 'font-headline text-[32px] text-[#060a0a] leading-[1.2]',
    sample: 'History Rhymes',
    where: '12 uses — ArticleBody, GrubbArticleBody, ProceedingsPodcastEpisodes',
    note: '#060a0a has no token; use neutral-boldest.',
  },
  {
    role: 'H3 — rich-text subhead',
    classes: 'font-headline text-[22px] lg:text-[26px] text-navy-bolder leading-[1.2]',
    sample: 'Board of Directors',
    where: '.rich-text h3 (index.css)',
  },
  {
    role: 'Card headline — large feature',
    classes: 'font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1]',
    sample: 'AI Warfighting: The Next Generation of Naval Strategy',
    where: 'LargeFeature',
  },
  {
    role: 'Card headline — plain card',
    classes: 'font-headline text-2xl text-navy-bolder leading-[1.1]',
    sample: 'Become a Member',
    where: 'PlainCard',
  },
  {
    role: 'Card headline — contest / collection card',
    classes: 'font-headline text-xl lg:text-[22px] text-navy-bolder leading-[1.2]',
    sample: 'General Prize Essay Contest',
    where: 'EssayContestsCurrentGrid, EssayContestsArchive',
  },
  {
    role: 'Card headline — small / list row',
    classes: 'font-headline text-[20px] text-[#1d2535] leading-[1.2]',
    sample: 'USNI Marks 250 Years of Naval Service',
    where: 'SmallFeature (h3), XSmallFeature (h4)',
    note: 'text-[20px] is text-xl; #1d2535 is neutral-bolder.',
  },
]

const BODY: TypeRow[] = [
  {
    role: 'Reading-column body',
    classes: 'font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]',
    sample: 'Founded in 1873, the U.S. Naval Institute is the independent forum for those who dare to read, think, speak, and write in order to advance the professional, literary, and scientific understanding of sea power.',
    where: '21 uses + .rich-text — DigitalEditionsIntro, BooksAboutIntro, PmeIntro, TaylorCenterNamesake…',
    note: 'Long-form copy. Paired with max-w-[780px] (or 760px).',
  },
  {
    role: 'Intro / deck on light',
    classes: 'font-body text-base lg:text-lg text-neutral-subtle leading-relaxed',
    sample: 'Explore firsthand accounts and expert analysis spanning the history of naval and maritime affairs.',
    where: '15 uses — SectionHeader description, AboutMissionVision, hero decks',
  },
  {
    role: 'Deck on a navy hero panel',
    classes: 'font-body text-[18px] lg:text-xl text-neutral-subtlest leading-relaxed',
    sample: 'Founded in 1873, the U.S. Naval Institute is the independent forum of the Sea Services.',
    where: 'AboutHero, GivingHero and 3 more',
    dark: true,
  },
  {
    role: 'Card excerpt',
    classes: 'font-body text-sm text-neutral-subtle leading-relaxed',
    sample: 'A survey of how autonomous systems are reshaping doctrine, procurement, and the future fleet.',
    where: '24 uses — LargeFeature, PlainCard',
  },
  {
    role: 'Meta / small text',
    classes: 'font-body text-sm text-neutral-subtle',
    sample: 'By Morrison & Chen · 12 min read',
    where: '37 uses',
  },
  {
    role: 'Date line',
    classes: 'font-body text-xs text-neutral-subtle',
    sample: 'July 2026',
    where: 'LargeFeature',
  },
]

const EYEBROWS: TypeRow[] = [
  {
    role: '.eyebrow (global class)',
    classes: 'eyebrow',
    sample: 'Naval History',
    where: '29 uses — PageHero, Hero, SectionHeader, SplitFeature…',
    note: 'Expands to font-body text-sm font-medium uppercase tracking-widest text-navy-subtle. Canonical.',
  },
  {
    role: '.eyebrow on dark',
    classes: 'eyebrow text-light-blue',
    sample: 'About USNI',
    where: '6 uses — AboutHero, GivingHero…',
    dark: true,
  },
  {
    role: 'Inline eyebrow recipe',
    classes: 'font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle',
    sample: 'Proceedings Magazine',
    where: '~13 uses, and the Eyebrow React component',
    note: 'Drift: 0.08em tracking against the class’s 0.1em (tracking-widest).',
  },
  {
    role: 'Card category label',
    classes: 'font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]',
    sample: 'Books',
    where: 'LargeFeature, SmallFeature, XSmallFeature',
    note: 'Regular weight, ~0.036em tracking, navy-bright. A deliberate card variant, but should be a class, not three copies.',
  },
  {
    role: 'text-eyebrow size token',
    classes: 'font-body font-bold text-eyebrow uppercase text-neutral-subtle',
    sample: 'From the Press',
    where: 'FromThePress, ArticlePaywall (with lg:text-eyebrow-lg)',
    note: 'The config token. Only two files use it.',
  },
]

function TypeTable({ rows }: { rows: TypeRow[] }) {
  return (
    <div className="flex flex-col border border-border-light bg-white">
      {rows.map((row) => (
        <div key={row.role} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] border-b border-border-light last:border-b-0">
          <div className={`p-5 lg:p-6 ${row.dark ? 'bg-navy-boldest' : ''}`}>
            <p className={row.classes}>{row.sample}</p>
          </div>
          <div className="p-5 lg:p-6 flex flex-col gap-2 border-t lg:border-t-0 lg:border-l border-border-light">
            <p className="font-body font-bold text-sm text-navy-bolder">{row.role}</p>
            <C>{row.classes}</C>
            <p className="font-body text-xs text-neutral-subtle leading-relaxed">{row.where}</p>
            {row.note && <p className="font-body text-xs text-neutral-bold leading-relaxed">{row.note}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────────
   Recommended config for the Drupal theme
   ────────────────────────────────────────────────────────────────────────── */

const RECOMMENDED_CONFIG = `/** @type {import('tailwindcss').Config} */
module.exports = {
  // Point content at the theme's Twig templates and behaviours, not src/**.
  content: [
    './templates/**/*.html.twig',
    './components/**/*.{twig,js}',
    './js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          boldest: '#001233',
          bolder: '#001845',
          bold: '#002B5C',
          DEFAULT: '#012A74',
          subtle: '#023E7D',
          subtler: '#2B5496',
          bright: '#0466C8',
        },
        'text-primary': '#1D2535',
        neutral: {
          boldest: '#0E121A',
          bolder: '#1D2535',
          bold: '#33415C',
          subtler: '#C4C9D4',
          white: '#FFFFFF',
          muted: '#999FAD',        // PROPOSED — Figma's neutral "subtle" tier
        },
        'neutral-subtle': '#4E576A',
        'neutral-subtlest': '#F4F4F6',
        gold: {
          DEFAULT: '#FFD000',
          subtle: '#FFC425',
          dark: '#FFEC99',         // lightest gold; name is legacy
        },
        tan: {
          DEFAULT: '#C5C19D',
          subtle: '#D9D7BF',
          subtlest: '#F7F7F2',
          light: '#E0E0CC',        // PROPOSED — section sub-nav bar
          muted: '#D4D0BA',        // PROPOSED — sub-nav hover / active
          bold: '#B8B49A',         // PROPOSED — sub-nav border
        },
        'light-blue': {
          DEFAULT: '#C2DDFF',
          subtle: '#EBF4FF',       // PROPOSED — light-blue hero, info bg
        },
        'surface-subtle': '#EEF2FF',
        'border-light': '#E2E8F0',
        'border-subtle': '#E8EAED', // PROPOSED — or fold into border-light
        'border-input': '#94A3B8',  // PROPOSED — form-control idle border
        // PROPOSED — status colours (Alert, form errors, badges)
        success: { DEFAULT: '#0A5C2E', subtle: '#E6F7ED' },
        warning: { DEFAULT: '#FFAA00', subtle: '#FFF8D6' },
        danger: { DEFAULT: '#C1121F', subtle: '#FEF6F6' },
      },
      fontFamily: {
        headline: ['"DM Serif Text"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        eyebrow: ['14px', { lineHeight: '1.5', letterSpacing: '0.08em', fontWeight: '500' }],
        'eyebrow-lg': ['18px', { lineHeight: '1.5', letterSpacing: '0.06em', fontWeight: '500' }],
        '4xl': ['2.25rem', { lineHeight: '1.1' }],
        display: ['64px', { lineHeight: '1.1' }],  // PROPOSED — desktop page title
        reading: ['17px', { lineHeight: '1.7' }],  // PROPOSED — reading-column body (lg)
      },
      maxWidth: {
        container: '1312px',
        reading: '780px',          // PROPOSED — long-form column
      },
      spacing: {
        section: '64px',
        'section-lg': '80px',
      },
      screens: {
        nav: '1330px',             // PROPOSED — replaces min-[1330px]: in the header
      },
      boxShadow: {
        // PROPOSED — the three arbitrary shadows that recur
        cover: '0 2px 8px rgba(0,18,51,0.14)',
        'cover-hover': '0 10px 26px rgba(0,18,51,0.24)',
        focus: '0 0 0 3px rgba(4,102,200,0.15)',
      },
      zIndex: {
        // PROPOSED — name the layers instead of z-40 / z-50 / z-[60]
        header: '40',
        dropdown: '50',
        modal: '60',
      },
    },
  },
  plugins: [],
}`

/* ──────────────────────────────────────────────────────────────────────────
   Sheet
   ────────────────────────────────────────────────────────────────────────── */

export default function Tokens() {
  const grouped = GROUPS.map((g) => ({ group: g, tokens: COLOR_TOKENS.filter((t) => COLOR_META[t.token]?.group === g) }))
  const undocumented = COLOR_TOKENS.filter((t) => !COLOR_META[t.token])

  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Design Tokens">
          <p>
            The full Tailwind reference for developers setting up the Drupal theme: every custom token in{' '}
            <code className="font-mono text-base">tailwind.config.js</code>, the classes it generates, and how the
            prototype actually uses type, spacing, breakpoints, borders, shadows and stacking.
          </p>
          <p>
            The Style Guide is the quick visual summary for stakeholders. This sheet is the one to build from. The
            colour tables are read from the config file itself, so they always match the tokens Tailwind generates.
            Usage counts come from a survey of <code className="font-mono text-base">src/</code> (October 2026,
            design-system sheets excluded).
          </p>
        </DocPageHeader>

        {/* ── Colours ─────────────────────────────────────────────────── */}
        <DocSection title="Colors">
          <div className="flex flex-col gap-10">
            <P>
              Each token works with every colour utility: <C>bg-</C>, <C>text-</C>, <C>border-</C>, <C>ring-</C>,{' '}
              <C>divide-</C>, <C>outline-</C>, <C>fill-</C>, <C>from-</C>/<C>to-</C> and the rest, plus opacity
              modifiers such as <C>bg-navy-boldest/70</C>. Scale objects in the config (<C>navy: {'{ boldest, … }'}</C>)
              become hyphenated names, and <C>DEFAULT</C> becomes the bare name (<C>bg-navy</C>, <C>bg-gold</C>).
              Tailwind’s default palette is still available, because the config uses <C>extend</C>.
            </P>

            {grouped.map(({ group, tokens }) => (
              <div key={group}>
                <DocLabel>{group}</DocLabel>
                <DataTable
                  head={['Swatch', 'Token', 'Utilities', 'Hex', 'Role', 'Uses']}
                  widths={['w-[90px]', 'w-[170px]', 'w-[230px]', 'w-[90px]', '', 'w-[140px] whitespace-nowrap']}
                  rows={tokens.map((t) => {
                    const meta = COLOR_META[t.token]
                    return [
                      <Swatch key="s" hex={t.hex} />,
                      <span key="t" className="flex flex-col gap-0.5">
                        <span className="font-body font-bold text-sm text-navy-bolder">{t.token}</span>
                        <span className="font-mono text-[11px] text-neutral-subtle">{t.configPath}</span>
                      </span>,
                      <C key="u">
                        <span className="flex flex-col">{["bg-", "text-", "border-"].map((p) => <span key={p}>{p}{t.token}</span>)}</span>
                      </C>,
                      <span key="h" className="font-mono text-xs uppercase">{t.hex}</span>,
                      <Ticks key="r" text={meta.role} />,
                      <span key="n" className="text-xs">
                        {meta.uses} utility
                        <br />
                        {meta.hardCoded} hard-coded
                      </span>,
                    ]
                  })}
                />
              </div>
            ))}

            {undocumented.length > 0 && (
              <div>
                <DocLabel>In the config but not yet described here</DocLabel>
                <DataTable
                  head={['Swatch', 'Token', 'Hex']}
                  rows={undocumented.map((t) => [<Swatch key="s" hex={t.hex} />, <C key="t">{t.token}</C>, t.hex])}
                />
              </div>
            )}

            <DevNote>
              <p>
                Copy the colour block as-is: these names are already in every class string in the prototype, and
                renaming any of them (even the awkward ones — <C>gold-dark</C> is the lightest gold,{' '}
                <C>border-border-light</C> stutters) means rewriting markup across the whole site.
              </p>
              <p>
                <strong className="text-navy-bolder">Defined but unused:</strong> <C>text-primary</C>,{' '}
                <C>neutral-bolder</C>, <C>neutral-boldest</C>, <C>neutral-white</C>, and nearly{' '}
                <C>neutral-subtler</C> and <C>navy-subtler</C>. The first three are unused only because the same hex is
                written out instead — see the next table. When templating, write the token, never the hex.
              </p>
            </DevNote>
          </div>
        </DocSection>

        <DocSection title="Hard-coded values that already have a token">
          <div className="flex flex-col gap-6">
            <P>
              The same colours, written as arbitrary values instead of tokens. Each is an exact match, so swapping it
              changes nothing visually. In Twig, use the token.
            </P>
            <DataTable
              head={['Swatch', 'Hex', 'Uses / files', 'Use instead', 'Notes']}
              widths={['w-[90px]', 'w-[100px]', 'w-[110px]', 'w-[230px]', '']}
              rows={HARD_CODED_WITH_TOKEN.map((r) => [
                <Swatch key="s" hex={r.hex} />,
                <span key="h" className="font-mono text-xs">{r.hex}</span>,
                `${r.uses} / ${r.files}`,
                <C key="t">{r.token}</C>,
                r.note ?? '',
              ])}
            />
          </div>
        </DocSection>

        <DocSection title="Hard-coded values that should become tokens">
          <div className="flex flex-col gap-6">
            <P>
              Recurring arbitrary colours with no token. Names marked → fold into an existing token instead of
              adding one; the rest are proposed new tokens, also marked PROPOSED in the config block at the end of this
              sheet. Counts include inline <C>style</C> values. One-offs (card-brand logo colours, single uses) are
              left out.
            </P>
            <DataTable
              head={['Swatch', 'Hex', 'Uses / files', 'Proposed token', 'What it is']}
              widths={['w-[90px]', 'w-[100px]', 'w-[110px]', 'w-[220px]', '']}
              rows={HARD_CODED_NO_TOKEN.map((r) => [
                <Swatch key="s" hex={r.hex} />,
                <span key="h" className="font-mono text-xs">{r.hex}</span>,
                `${r.uses} / ${r.files}`,
                <C key="t">{r.proposed}</C>,
                <Ticks key="r" text={r.role} />,
              ])}
            />
            <DevNote>
              <p>
                The four tan values belong to one pattern — the section sub-nav bar under each section’s hero
                (<C>AboutSubNav</C>, <C>BooksSubNav</C>, <C>ProceedingsSubNav</C> …). Its background is set with an
                inline <C>style={'{{ backgroundColor: \'#E0E0CC\' }}'}</C> in every copy, which Tailwind cannot see.
                Tokenising it lets the Twig template write <C>bg-tan-light border-b border-tan-bold</C>.
              </p>
              <p>
                The status colours come from the Alert component (see the Alerts sheet) and the form error states; one
                token set covers both.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ── Typography ──────────────────────────────────────────────── */}
        <DocSection title="Typography">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <DocLabel className="mb-0">Font families</DocLabel>
              <DataTable
                head={['Utility', 'Stack', 'Sample', 'Used for']}
                widths={['w-[140px]', 'w-[260px]', '', 'w-[260px]']}
                rows={[
                  [
                    <C key="c">font-headline</C>,
                    <C key="s">{extend.fontFamily.headline.join(', ')}</C>,
                    <span key="x" className="font-headline text-3xl text-navy-bolder leading-[1.1]">
                      Sea Power
                    </span>,
                    'Every heading and card headline. Regular (400) and italic only — the face has no bold.',
                  ],
                  [
                    <C key="c">font-body</C>,
                    <C key="s">{extend.fontFamily.body.join(', ')}</C>,
                    <span key="x" className="font-body text-lg text-navy-bolder">
                      Join the Naval Institute
                    </span>,
                    'Everything else. Set on <body> by the base layer, so font-body on an element is a reset, not a requirement.',
                  ],
                ]}
              />
              <CodeBlock
                code={`<!-- index.html — Google Fonts: DM Serif Text (headlines) + Inter (body) -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=DM+Serif+Text:ital@0;1&family=Inter:wght@400;500;700;800&display=swap"
  rel="stylesheet"
/>`}
              />
              <DevNote title="Font weights: load 600">
                <p>
                  The Google Fonts URL loads Inter at 400, 500, 700 and 800 — but <C>font-semibold</C> (600) is the
                  second most used weight in the prototype (172 uses, against 406 <C>font-bold</C>). With no 600 file
                  the browser substitutes 700, so every “semibold” label in the prototype is really rendering bold.
                  Add <C>600</C> to the <C>wght@</C> list in the Drupal theme’s library (and expect those labels to
                  look slightly lighter than they do here), or swap the classes for <C>font-bold</C> if bold was the
                  intent. Weights in use: normal 9, medium 44, semibold 172, bold 406, extrabold 18.
                </p>
                <p>
                  The base layer also sets <C>--font-headline</C> and <C>--font-body</C> custom properties on{' '}
                  <C>:root</C> for any non-Tailwind CSS that needs the stacks.
                </p>
              </DevNote>
            </div>

            <div className="flex flex-col gap-6">
              <DocLabel className="mb-0">Custom font sizes</DocLabel>
              <DataTable
                head={['Utility', 'Value', 'Sample', 'Notes']}
                widths={['w-[150px]', 'w-[300px]', 'w-[260px]', '']}
                rows={Object.entries(extend.fontSize).map(([name, [size, opts]]) => [
                  <C key="c">text-{name}</C>,
                  <C key="v">
                    {size} · {Object.entries(opts).map(([k, v]) => `${k} ${v}`).join(' · ')}
                  </C>,
                  name === 'eyebrow' ? (
                    <span key="x" className="font-body text-eyebrow uppercase text-navy-subtle">Proceedings</span>
                  ) : name === 'eyebrow-lg' ? (
                    <span key="x" className="font-body text-eyebrow-lg uppercase text-navy-subtle">Proceedings</span>
                  ) : (
                    <span key="x" className="font-headline text-4xl text-navy-bolder">Join Today</span>
                  ),
                  name === '4xl'
                    ? 'Overrides Tailwind’s default 4xl (36px / 40px line-height) to keep 36px headings at 1.1.'
                    : name === 'eyebrow'
                      ? 'Carries weight and tracking with the size. Two uses; most eyebrows use the .eyebrow class instead.'
                      : 'The large eyebrow, at lg in ArticlePaywall.',
                ])}
              />
              <DevNote title="Arbitrary sizes that already equal a default">
                <p>
                  Several bracketed sizes are exactly a Tailwind default: <C>text-[14px]</C> = <C>text-sm</C>,{' '}
                  <C>text-[16px]</C> = <C>text-base</C>, <C>text-[18px]</C> = <C>text-lg</C>, <C>text-[20px]</C> ={' '}
                  <C>text-xl</C>, <C>text-[24px]</C> = <C>text-2xl</C>, <C>text-[30px]</C> = <C>text-3xl</C>,{' '}
                  <C>text-[36px]</C> = <C>text-4xl</C>, <C>text-[48px]</C> = <C>text-5xl</C>. Every heading sets its
                  own <C>leading-[…]</C>, so swapping is safe. The sizes with no default — 22, 26, 28, 32, 54, 56,
                  64px — are the ones worth tokenising if the type scale is formalised.
                </p>
              </DevNote>
            </div>

            <div className="flex flex-col gap-6">
              <DocLabel className="mb-0">Type scale as used — headings</DocLabel>
              <P>
                Surveyed from the markup rather than from Figma. Where the prototype has several sizes for one job, the
                most common is listed first and drift is noted. All headings are DM Serif Text at regular weight.
              </P>
              <TypeTable rows={HEADINGS} />
            </div>

            <div className="flex flex-col gap-6">
              <DocLabel className="mb-0">Type scale as used — body</DocLabel>
              <TypeTable rows={BODY} />
            </div>

            <div className="flex flex-col gap-6">
              <DocLabel className="mb-0">Eyebrows</DocLabel>
              <TypeTable rows={EYEBROWS} />
              <LiveMarkup label="Eyebrow + headline group (canonical)">
                <div className="eyebrow-headline">
                  <p className="eyebrow">Naval History</p>
                  <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">
                    Stories of Naval Heritage
                  </h2>
                </div>
              </LiveMarkup>
              <SourceList
                title="Canonical"
                items={[
                  { path: 'src/index.css', note: '.eyebrow and .eyebrow-headline' },
                  { path: 'src/components/ui/SectionHeader.tsx', note: 'the H2 pairing above' },
                ]}
              />
              <SourceList
                title="Drift"
                tone="drift"
                items={[
                  { path: 'src/components/ui/Eyebrow.tsx', note: 'tracking-[0.08em] rather than the class’s tracking-widest (0.1em); only used on the Style Guide' },
                  { path: 'src/components/cards/LargeFeature.tsx', note: 'card category: font-normal, tracking-[0.5px], #0466C8 — same in SmallFeature and XSmallFeature' },
                  { path: 'src/sections/BooksBillboards.tsx', note: 'tracking-[0.05em] text-[#e0e0cc] — same in MembershipBillboard' },
                ]}
              />
            </div>
          </div>
        </DocSection>

        {/* ── Spacing & layout ────────────────────────────────────────── */}
        <DocSection title="Spacing & layout">
          <div className="flex flex-col gap-10">
            <DataTable
              head={['Token / class', 'Value', 'Notes']}
              widths={['w-[220px]', 'w-[300px]', '']}
              rows={[
                [<C key="c">max-w-container</C>, extend.maxWidth.container, 'The content width. Figma’s canvas is 1728px, which leaves 208px each side.'],
                [<C key="c">.container-site</C>, <C key="v">max-w-container mx-auto px-6 lg:px-8 xl:px-0</C>, '180 uses in 158 files. The wrapper inside every full-bleed section. Gutters: 24px, then 32px from lg, then none from xl.'],
                [<C key="c">section</C>, extend.spacing.section, <>Spacing token: <C>py-section</C> (5 uses), <C>pb-section</C> (1). Equal to <C>py-16</C>.</>],
                [<C key="c">section-lg</C>, extend.spacing['section-lg'], <>Equal to <C>py-20</C>. Defined, unused.</>],
                [<span key="c"><C>max-w-[780px]</C> / <C>max-w-[760px]</C></span>,'780px / 760px', 'Reading-column widths (15 and 14 uses). Proposed as max-w-reading.'],
              ]}
            />

            <div className="flex flex-col gap-6">
              <DocLabel className="mb-0">Section vertical rhythm, as used</DocLabel>
              <DataTable
                head={['Classes', 'Mobile → lg', 'Uses', 'Where']}
                widths={['w-[220px]', 'w-[140px]', 'w-[80px]', '']}
                rows={[
                  [<C key="c">py-12 lg:py-16</C>, '48 → 64px', '46', 'The default content section. Use this unless there is a reason not to.'],
                  [<C key="c">py-16 lg:py-20</C>, '64 → 80px', '31', 'Landing-page feature bands and gradient sections (ProceedingsMagazine, GivingTaxInfo).'],
                  [<C key="c">py-10 lg:py-16</C>, '40 → 64px', '19', 'Denser sections that follow a hero or a sub-nav.'],
                  [<C key="c">py-10 lg:py-14</C>, '40 → 56px', '9', 'Short bands — promos, CTAs.'],
                  [<C key="c">py-14 lg:py-16</C>, '56 → 64px', '7', 'Drift of the default.'],
                  [<C key="c">py-section</C>, '64px', '5', 'Token form of py-16, no step (MembershipFAQ).'],
                  [<C key="c">pt-12 pb-16</C>, '48 / 64px', '—', 'Light-blue interior hero (AboutPageHero).'],
                ]}
              />
              <P>
                Inside a section the common gaps are <C>gap-6 lg:gap-8</C> between grid columns, <C>gap-8</C>–
                <C>gap-12</C> between stacked blocks, and <C>mb-10</C>/<C>mb-12</C> under a SectionHeader.
              </P>
              <LiveMarkup label="A standard content section" previewClassName="p-0 bg-neutral-subtlest">
                <section className="py-12 lg:py-16 bg-white">
                  <div className="container-site">
                    <div className="border border-dashed border-navy-bright/50 p-4">
                      <p className="font-body text-sm text-neutral-subtle">
                        .container-site — content sits inside this box; the section supplies the ground colour and
                        vertical padding.
                      </p>
                    </div>
                  </div>
                </section>
              </LiveMarkup>
              <DevNote title="Gutter gap between 1280px and 1312px">
                <p>
                  <C>.container-site</C> drops its side padding at <C>xl</C> (1280px), but the container is 1312px
                  wide. Between a 1280px and 1312px viewport the content is narrower than the container’s max-width
                  and has no padding, so it runs flush to the window edge. In the Drupal theme, keep{' '}
                  <C>px-8</C> until the container has room: e.g. <C>max-w-container mx-auto px-6 lg:px-8
                  min-[1376px]:px-0</C> (1312 + 2 × 32), or simply never drop to zero. Flagged, not changed here.
                </p>
              </DevNote>
            </div>
          </div>
        </DocSection>

        {/* ── Breakpoints ─────────────────────────────────────────────── */}
        <DocSection title="Breakpoints">
          <div className="flex flex-col gap-8">
            <P>
              Tailwind’s default screens, mobile-first (<C>min-width</C>). No <C>max-*</C> variants are used, and{' '}
              <C>2xl</C> is unused. One arbitrary breakpoint exists, in the header only.
            </P>
            <DataTable
              head={['Prefix', 'Min width', 'Uses', 'What changes']}
              widths={['w-[140px]', 'w-[110px]', 'w-[80px]', '']}
              rows={[
                [<C key="c">(none)</C>, '0', '—', 'Phone layout: single column, mobile header bar (logo, search, menu button), breadcrumbs collapse to a back-link.'],
                [<C key="c">sm:</C>, '640px', '158', 'Two-column card grids; breadcrumb shows the full trail (Breadcrumb.tsx).'],
                [<C key="c">md:</C>, '768px', '30', 'Occasional three-column grids (card rows). Lightly used — most layouts jump straight to lg.'],
                [<C key="c">lg:</C>, '1024px', '1046', 'The main switch. Desktop header (two tiers) replaces the mobile bar; section sub-navs go horizontal; heading sizes step up; container gutter 24 → 32px; side-by-side layouts.'],
                [<C key="c">xl:</C>, '1280px', '116', 'Third heading step on landing heroes; container gutter drops to 0 (see the gutter note above).'],
                [<C key="c">min-[1330px]:</C>, '1330px', '19', 'Header only: logo, nav type and nav padding grow to their full desktop sizes. Proposed as a named nav: screen.'],
              ]}
            />
            <div className="flex flex-col gap-4">
              <DocLabel className="mb-0">The header across breakpoints</DocLabel>
              <ClassTable
                rows={[
                  { part: 'Below lg', classes: 'lg:hidden flex items-center justify-between px-5 py-3.5 border-b border-border-light', note: 'Mobile bar: full logo (h-[52px]), 44px search and menu buttons. The menu opens a full-screen panel (fixed inset-0 z-[60] lg:hidden).' },
                  { part: 'lg and up — top', classes: 'header-top hidden lg:block transition-all duration-300 ease-in-out', note: 'Utility bar: logo (lg:h-[56px]), Archives, Events, Ship’s Store, Cart, Login, Donate. Collapses to max-h-0 opacity-0 on scroll.' },
                  { part: 'lg and up — bottom', classes: 'header-bottom hidden lg:block', note: 'Primary nav and search toggle. On scroll the seal logo slides in (max-w-0 → max-w-[70px]) and nav items go compact (py-6 → py-8, 16px → 15px).' },
                  { part: 'Utility links', classes: 'group/nav font-body font-bold text-[15px] min-[1330px]:text-[16px] text-navy-subtle px-2.5 min-[1330px]:px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none', note: 'Grow at 1330px — below it, the full row of links and the Donate button would not fit beside the logo.' },
                  { part: 'Primary nav items', classes: 'flex items-center gap-1.5 min-[1330px]:gap-[10px] font-body font-extrabold whitespace-nowrap leading-none', note: <>At rest adds <code className="font-mono text-xs">text-[16px] px-2.5 py-6 min-[1330px]:text-[18px] min-[1330px]:px-5</code>; compact (scrolled) adds <code className="font-mono text-xs">text-[15px] px-2.5 py-8 min-[1330px]:text-[18px] min-[1330px]:px-4</code>.</> },
                  { part: 'Logo', classes: 'w-auto h-[52px] lg:h-[56px] min-[1330px]:h-[69px]', note: 'Three sizes.' },
                ]}
              />
              <SourceList title="Where it lives" items={[{ path: 'src/components/layout/Header.tsx', note: 'the only file using min-[1330px]' }]} />
            </div>
          </div>
        </DocSection>

        {/* ── Borders & radius ────────────────────────────────────────── */}
        <DocSection title="Borders & radius">
          <div className="flex flex-col gap-8">
            <DataTable
              head={['Pattern', 'Classes', 'Notes']}
              widths={['w-[220px]', 'w-[340px]', '']}
              rows={[
                ['Hairline (default)', <C key="c">border border-border-light</C>, 'Cards, tables, list dividers. border-border-light is the most used border colour token after navy.'],
                ['Stronger divider', <C key="c">border-[#c4c9d4]</C>, 'Hard-coded neutral-subtler: inputs, cart rows, separators. Write border-neutral-subtler.'],
                ['Outlined card / control', <C key="c">border border-navy-subtle</C>, 'Contest cards, outline buttons (border-navy-bolder).'],
                ['Section-header rule', <C key="c">border-t-2 border-navy-bold pt-8</C>, 'Top rule over a SectionHeader.'],
                ['Interior H2 rule', <C key="c">pb-4 border-b-2 border-[#0466C8]</C>, 'Blue rule under interior headings (navy-bright).'],
                ['Accent bar', <C key="c">border-l-4</C>, 'Alerts and DevNote-style callouts: a 4px leading edge in the accent colour.'],
                ['Widths in use', <C key="c">border · border-b · border-t · border-b-2 · border-l-2 · border-t-2 · border-l-4 · border-2</C>, '310 · 132 · 78 · 29 · 8 · 7 · 6 · 5 uses.'],
              ]}
            />
            <div className="flex flex-col gap-4">
              <DocLabel className="mb-0">Radius — squared corners by default</DocLabel>
              <P>
                Every surface has square corners. Tailwind’s defaults already give most elements a zero radius; the
                base layer adds one rule for <C>{'<button>'}</C>, because Safari and newer Chrome draw a native radius
                on a bare button that takes a background. It sits in the base layer, so a <C>rounded-*</C> utility
                still wins where a radius is wanted.
              </P>
              <CodeBlock
                code={`@layer base {
  button {
    border-radius: 0;
  }
}`}
              />
              <DataTable
                head={['Utility', 'Uses', 'Where']}
                widths={['w-[160px]', 'w-[80px]', '']}
                rows={[
                  [<C key="c">rounded-full</C>, '41', 'Avatars, cart-count badge, toggle switches, quantity steppers, icon buttons.'],
                  [<C key="c">rounded-none</C>, '12', 'Text inputs in cart and checkout (CartItems, DonateCartItems, CreditCardModal, *Checkout) — iOS Safari rounds inputs otherwise.'],
                  [<C key="c">rounded / rounded-sm</C>, '3 / 2', 'ArticleComments only (avatar, comment fields). Drift — square them.'],
                ]}
              />
              <DevNote>
                <p>
                  Extend the base rule to form controls in the Drupal theme —{' '}
                  <C>button, input, select, textarea {'{ border-radius: 0; }'}</C> — so the squared default does not
                  depend on each field remembering <C>rounded-none</C>.
                </p>
              </DevNote>
            </div>
          </div>
        </DocSection>

        {/* ── Shadows ─────────────────────────────────────────────────── */}
        <DocSection title="Shadows">
          <div className="flex flex-col gap-8">
            <P>
              Shadows are rare and mean one of three things: something floats above the page (menus, popovers), a card
              responds to hover, or a field has focus. Flat is the default.
            </P>
            <DataTable
              head={['Sample', 'Classes', 'Uses', 'Role']}
              widths={['w-[120px]', 'w-[340px]', 'w-[70px]', '']}
              rows={[
                [<span key="s" className="block w-16 h-10 bg-white shadow-sm" />, <C key="c">shadow-sm → shadow-md</C>, '3 / 4', 'Sticky header at rest, then once scrolled (transition-shadow duration-300).'],
                [<span key="s" className="block w-16 h-10 bg-white shadow-lg" />, <C key="c">shadow-lg · shadow-xl · shadow-2xl</C>, '7 · 4 · 10', 'Dropdowns, mega-menu panel, search flydown, popovers, modals.'],
                [<span key="s" className="block w-16 h-10 bg-white shadow-md" />, <C key="c">hover:shadow-md transition-shadow</C>, '12', 'Card hover lift (contest cards, collection cards).'],
                [<span key="s" className="block w-10 h-14 bg-white shadow-[0_2px_8px_rgba(0,18,51,0.14)]" />, <C key="c">shadow-[0_2px_8px_rgba(0,18,51,0.14)]</C>, '8', 'Book and issue covers at rest. Proposed: shadow-cover.'],
                [<span key="s" className="block w-10 h-14 bg-white shadow-[0_10px_26px_rgba(0,18,51,0.24)]" />, <C key="c">group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]</C>, '5', 'Covers on hover, with group-hover:-translate-y-2. Proposed: shadow-cover-hover.'],
                [<span key="s" className="block w-16 h-10 bg-white border border-navy-bright shadow-[0_0_0_3px_rgba(4,102,200,0.15)]" />, <C key="c">focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)]</C>, '11', 'Focus halo on the shared FormField controls and the archive filter selects, with focus:border-navy-bright. Proposed: shadow-focus.'],
              ]}
            />
            <DevNote>
              <p>
                Form focus treatment has drifted: the halo above (11 uses), <C>focus:ring-2 focus:ring-[#023e7d]/30</C>{' '}
                (12), and <C>focus:ring-[#0466c8]</C> (6). Pick one for the Drupal form theme — the Forms sheet
                documents the field component — and make sure it is visible (a 15%-opacity halo alone is faint; the
                border change carries it).
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ── Z-index ─────────────────────────────────────────────────── */}
        <DocSection title="Z-index">
          <div className="flex flex-col gap-8">
            <DataTable
              head={['Layer', 'Class', 'What sits there']}
              widths={['w-[90px]', 'w-[140px]', '']}
              rows={[
                ['0–10', <C key="c">z-0 · z-10</C>, '25 uses. Local stacking only: hero content over its background image, gallery controls over slides. Not a page layer.'],
                ['20–30', <C key="c">z-20 · z-30</C>, 'Gallery arrows and captions; JumpLinkNav (sticky top-[86px] z-30) — the in-page section nav that docks under the header.'],
                ['40', <C key="c">z-40</C>, 'The sticky header (Header.tsx), the mega-menu scrim, InfoTooltip.'],
                ['50', <C key="c">z-50</C>, 'Header while search is open; mega-menu and dropdown panels; popovers (SharePopover, AccountNotifications, BookSearchBar results); the fixed ArticleMeterBanner.'],
                ['55', <C key="c">z-[55]</C>, 'PrototypeNav — prototype only, do not ship. Sits above header and meter banner, below modals.'],
                ['60', <C key="c">z-[60]</C>, 'Modal, the notifications dialog, the mobile menu, the account drawer (AccountLayout).'],
              ]}
            />
            <DevNote title="Inconsistent modal layers">
              <p>
                Three full-screen overlays use <C>z-50</C> instead of <C>z-[60]</C>: <C>CreditCardModal</C>, the{' '}
                <C>ArticleImageGallery</C> lightbox and the <C>MembershipBenefits</C> dialog. At 50 they tie with the
                header’s open-search state and sit under the prototype nav. In Drupal, give every dialog the one modal
                layer (proposed <C>z-modal</C>). Also note <C>top-[86px]</C> on JumpLinkNav is the collapsed header’s
                height, hard-coded — if the header changes, it must too.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ── Config ──────────────────────────────────────────────────── */}
        <DocSection title="Tailwind config for the Drupal theme">
          <div className="flex flex-col gap-8">
            <P>
              A drop-in <C>tailwind.config.js</C> for the theme. Everything the prototype uses is kept with its
              current name; additions are marked <C>// PROPOSED</C> and are safe to add before any markup uses them.
              Tailwind 3.4 (the prototype runs 3.4.19).
            </P>
            <CodeBlock code={RECOMMENDED_CONFIG} className="max-h-[640px] overflow-y-auto" />
            <DevNote>
              <p>
                <strong className="text-navy-bolder">screens.nav</strong> is added through <C>extend</C>, so it lands
                after <C>2xl</C> in the cascade. That is harmless while <C>2xl</C> is unused; if <C>2xl</C> is ever
                adopted, define <C>screens</C> in full instead so the order is sm, md, lg, xl, nav, 2xl.
              </p>
              <p>
                The global classes in <C>src/index.css</C> (<C>.container-site</C>, <C>.eyebrow</C>, <C>.text-link</C>,
                the accordion and select rules…) are not config — they go in the theme’s main CSS under the same{' '}
                <C>@layer</C>. See Utility Classes.
              </p>
            </DevNote>
            <div className="flex flex-col gap-3">
              <DocLabel className="mb-0">Current prototype config, verbatim</DocLabel>
              <CodeBlock code={tailwindConfigSource} className="max-h-[480px] overflow-y-auto" />
            </div>
            <SourceList
              title="Where it lives"
              items={[
                { path: 'tailwind.config.js', note: 'the tokens' },
                { path: 'index.html', note: 'Google Fonts and Font Awesome kit' },
                { path: 'src/index.css', note: 'base layer, global classes' },
              ]}
            />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
