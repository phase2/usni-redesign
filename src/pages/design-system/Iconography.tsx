import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import { ButtonLink } from '@/components/ui/Button'
import { AcceptedCards } from '@/components/ui/CardBrandIcons'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'
import imgHomepageHero from '@/assets/images/homepage-hero-image.jpg'
import imgProceedingsAug26 from '@/assets/images/proceedings-magazine-aug26-cover.png'
import facebookIcon from '@/assets/images/facebook.svg'
import instagramIcon from '@/assets/images/instagram.svg'
import youtubeIcon from '@/assets/images/youtube.svg'
import linkedinIcon from '@/assets/images/linkedin.svg'

const UI_ICONS = ['fa-magnifying-glass', 'fa-xmark', 'fa-caret-down', 'fa-chevron-left', 'fa-chevron-right', 'fa-check', 'fa-plus', 'fa-grip', 'fa-list']
const ACTION_ICONS = ['fa-cart-shopping', 'fa-arrow-up-from-bracket', 'fa-link', 'fa-envelope', 'fa-house', 'fa-arrow-right']
const CONTENT_ICONS = ['fa-star', 'fa-star-half-stroke', 'fa-book-open', 'fa-anchor', 'fa-award', 'fa-shield-halved', 'fa-trophy', 'fa-people-group', 'fa-handshake']
const BRAND_ICONS = ['fa-facebook-f', 'fa-x-twitter', 'fa-linkedin-in', 'fa-bluesky', 'fa-google', 'fa-apple']

function IconSwatch({ icon, prefix = 'fa-solid' }: { icon: string; prefix?: string }) {
  return (
    <div className="border border-border-light bg-white flex flex-col items-center justify-center gap-2 py-5">
      <i className={`${prefix} ${icon} text-xl text-navy-bolder`} aria-hidden="true" />
      <p className="font-mono text-[10px] text-neutral-subtle text-center px-2">{icon}</p>
    </div>
  )
}

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

/* ─── Icon glossary ──────────────────────────────────────────────────────────
   Every Font Awesome glyph the prototype renders, with what it means on the
   site, so a template reaches for the same glyph for the same job. Compiled by
   searching src/ for fa-* class names (including icon names stored in data). */

interface GlossaryEntry {
  classes: string
  meaning: string
  where: string
}

const GLOSSARY: { group: string; entries: GlossaryEntry[] }[] = [
  {
    group: 'Navigation and disclosure',
    entries: [
      { classes: 'fa-solid fa-arrow-right', meaning: 'Go to / continue', where: 'CardCta, trailing icon on buttons, step navigation' },
      { classes: 'fa-solid fa-arrow-down', meaning: 'Jump further down this page', where: 'CardCta direction="down"' },
      { classes: 'fa-solid fa-chevron-left', meaning: 'Back / previous', where: 'Breadcrumb parent link, carousels, pagination' },
      { classes: 'fa-solid fa-chevron-right', meaning: 'Next / drill in', where: 'Carousels, pagination, collection cross-links' },
      { classes: 'fa-solid fa-chevron-down', meaning: 'Expand (rotates 180° when open)', where: 'Disclosure toggles, Member updates, filters' },
      { classes: 'fa-solid fa-chevron-up', meaning: 'Collapse', where: 'Read-more toggles (GivingOpportunities, EssayContestsAbout)' },
      { classes: 'fa-solid fa-caret-down', meaning: 'Menu / sort dropdown', where: 'ArticleComments sort' },
      { classes: 'fa-solid fa-house', meaning: 'Home (breadcrumb root)', where: 'Breadcrumb' },
      { classes: 'fa-solid fa-xmark', meaning: 'Close / clear', where: 'Popovers, search clear, filter chips, header search' },
      { classes: 'fa-solid fa-magnifying-glass', meaning: 'Search', where: 'Header, archive and collection search fields' },
      { classes: 'fa-solid fa-grip', meaning: 'Grid view', where: 'Issue article view toggle' },
      { classes: 'fa-solid fa-list', meaning: 'List view', where: 'Issue article view toggle' },
    ],
  },
  {
    group: 'Actions',
    entries: [
      { classes: 'fa-solid fa-arrow-up-from-bracket', meaning: 'Share', where: 'SharePopover trigger' },
      { classes: 'fa-solid fa-link', meaning: 'Copy link', where: 'SharePopover' },
      { classes: 'fa-solid fa-envelope', meaning: 'Email', where: 'Share rows, contact tiles, newsletter' },
      { classes: 'fa-regular fa-bookmark / fa-solid fa-bookmark', meaning: 'Save / saved article', where: 'SaveArticleButton, Saved articles' },
      { classes: 'fa-regular fa-heart', meaning: 'Wishlist (books)', where: 'BookProductHero, Wishlist empty state' },
      { classes: 'fa-solid fa-cart-shopping', meaning: 'Add to cart', where: 'BookProductHero, Wishlist' },
      { classes: 'fa-regular fa-comment', meaning: 'Comments', where: 'Article toolbar' },
      { classes: 'fa-solid fa-plus', meaning: 'Add (card, address, interest)', where: 'Account payment and addresses, NewsletterJoin' },
      { classes: 'fa-solid fa-pen', meaning: 'Edit', where: 'Account layout' },
      { classes: 'fa-solid fa-print', meaning: 'Print', where: 'Confirmation' },
      { classes: 'fa-solid fa-arrow-right-from-bracket', meaning: 'Sign out', where: 'Account layout' },
      { classes: 'fa-solid fa-bell', meaning: 'Notifications', where: 'AccountNotifications' },
      { classes: 'fa-solid fa-arrow-up-right-from-square', meaning: 'External (drift; use ExternalLinkIcon)', where: 'EventsHero, EventsConferenceCenter' },
    ],
  },
  {
    group: 'Status',
    entries: [
      { classes: 'fa-solid fa-circle-check', meaning: 'Success', where: 'Alert success' },
      { classes: 'fa-solid fa-triangle-exclamation', meaning: 'Warning', where: 'Alert warning' },
      { classes: 'fa-solid fa-circle-info', meaning: 'Information', where: 'Alert info, disclaimers, archive notes' },
      { classes: 'fa-solid fa-circle-exclamation', meaning: 'Error', where: 'Alert danger, field error messages' },
      { classes: 'fa-solid fa-check', meaning: 'Done / included', where: 'Confirmation, checklists, empty “all caught up” state' },
    ],
  },
  {
    group: 'Content and topics',
    entries: [
      { classes: 'fa-solid fa-anchor', meaning: 'End-of-article mark; Naval Institute topic tile', where: 'ArticleBody (end mark), account tiles' },
      { classes: 'fa-solid fa-book-open / fa-solid fa-book', meaning: 'Books, reading', where: 'Collections, NewsletterJoin, account tiles' },
      { classes: 'fa-solid fa-calendar-days', meaning: 'Date', where: 'Book details, account tiles' },
      { classes: 'fa-regular fa-clock', meaning: 'Reading time', where: 'ArticleInBrief' },
      { classes: 'fa-solid fa-location-dot', meaning: 'Event location', where: 'Event cards' },
      { classes: 'fa-solid fa-star / fa-solid fa-star-half-stroke / fa-regular fa-star', meaning: 'Rating', where: 'BookProductHero, comments' },
      { classes: 'fa-solid fa-barcode', meaning: 'ISBN', where: 'Book details' },
      { classes: 'fa-solid fa-building', meaning: 'Publisher', where: 'Book details' },
      { classes: 'fa-solid fa-file-lines', meaning: 'Page count', where: 'Book details' },
      { classes: 'fa-solid fa-ruler-combined', meaning: 'Dimensions', where: 'Book details' },
      { classes: 'fa-solid fa-layer-group', meaning: 'Series', where: 'Book details' },
      { classes: 'fa-solid fa-pen-nib', meaning: 'Writing / essay entry', where: 'Essay contest pages' },
      { classes: 'fa-solid fa-camera', meaning: 'Photo entry', where: 'Essay contest pages' },
      { classes: 'fa-solid fa-file-word / fa-solid fa-file-image', meaning: 'Accepted upload type', where: 'EssaySubmitForm' },
      { classes: 'fa-solid fa-trophy / fa-solid fa-award', meaning: 'Prizes, recognition', where: 'Featured content tiles, Giving quick links' },
      { classes: 'fa-solid fa-people-group / fa-solid fa-handshake', meaning: 'Societies, partnerships', where: 'Giving quick links' },
      { classes: 'fa-solid fa-file-pen', meaning: 'Submit writing', where: 'Naval History featured content' },
      { classes: 'fa-solid fa-newspaper / fa-solid fa-ship / fa-solid fa-id-card', meaning: 'Newsletter topics, member ID', where: 'NewsletterJoin' },
      { classes: 'fa-solid fa-receipt', meaning: 'Orders', where: 'AccountOrders' },
      { classes: 'fa-solid fa-shield-halved / fa-solid fa-question', meaning: 'Comment policy, help', where: 'ArticleComments' },
    ],
  },
  {
    group: 'Brands',
    entries: [
      { classes: 'fa-brands fa-facebook-f', meaning: 'Facebook', where: 'Share rows, book share, comments sign-in' },
      { classes: 'fa-brands fa-x-twitter', meaning: 'X (Twitter)', where: 'Share rows, book share, comments sign-in' },
      { classes: 'fa-brands fa-linkedin-in', meaning: 'LinkedIn', where: 'Share rows, book share' },
      { classes: 'fa-brands fa-bluesky', meaning: 'Bluesky', where: 'SharePopover' },
      { classes: 'fa-brands fa-google / fa-brands fa-apple / fa-brands fa-disqus', meaning: 'Comment sign-in providers', where: 'ArticleComments' },
    ],
  },
]

function GlossaryTable({ entries }: { entries: GlossaryEntry[] }) {
  return (
    <div className="overflow-x-auto border border-border-light bg-white">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-neutral-subtlest border-b border-border-light">
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[72px]">Icon</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Classes</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Meaning</th>
            <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[34%]">Where</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e) => (
            <tr key={e.classes} className="border-b border-border-light last:border-b-0">
              <td className="px-4 py-3 align-top">
                <span className="flex items-center gap-2 text-navy-bolder">
                  {e.classes.split(' / ').map((c) => (
                    <i key={c} className={`${c} text-lg`} aria-hidden="true" />
                  ))}
                </span>
              </td>
              <td className="px-4 py-3 align-top">
                <code className="font-mono text-xs text-navy-subtle leading-relaxed break-words">{e.classes}</code>
              </td>
              <td className="font-body text-sm text-navy-bolder px-4 py-3 align-top">{e.meaning}</td>
              <td className="font-body text-sm text-neutral-subtle px-4 py-3 align-top leading-relaxed">{e.where}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─── Inline SVG glossary ────────────────────────────────────────────────────
   Paths copied verbatim from the files named. Each is drawn on its own viewBox
   with a currentColor stroke, so color comes from the parent's text class. */

interface SvgEntry {
  name: string
  viewBox: string
  strokeWidth: string
  paths: string[]
  size: string
  where: string
}

const INLINE_SVGS: SvgEntry[] = [
  { name: 'Close (modal)', viewBox: '0 0 16 16', strokeWidth: '2', paths: ['M3 3l10 10M13 3L3 13'], size: 'w-4 h-4', where: 'Modal, CreditCardModal, AccountLayout, ArticleImageGallery, Member updates' },
  { name: 'Close (sub-nav)', viewBox: '0 0 20 20', strokeWidth: '2', paths: ['M4 4l12 12M16 4L4 16'], size: 'w-5 h-5', where: 'SectionSubNav and its copies, JumpLinkNav (open state)' },
  { name: 'Menu (sub-nav)', viewBox: '0 0 20 20', strokeWidth: '2', paths: ['M2 5h16M2 10h16M2 15h16'], size: 'w-5 h-5', where: 'SectionSubNav and its copies, JumpLinkNav' },
  { name: 'Menu (header)', viewBox: '0 0 24 24', strokeWidth: '2', paths: ['M4 6h16M4 12h16M4 18h16'], size: 'w-6 h-6', where: 'Header mobile menu' },
  { name: 'Search (header)', viewBox: '0 0 24 24', strokeWidth: '2', paths: ['m21 21-4.35-4.35'], size: 'w-5 h-5', where: 'Header (with <circle cx="11" cy="11" r="8">)' },
  { name: 'Accordion chevron', viewBox: '0 0 16 16', strokeWidth: '2', paths: ['M3 6l5 5 5-5'], size: 'w-4 h-4', where: 'Every FAQ accordion (.accordion-chevron box), archive filters' },
  { name: 'Small arrow right', viewBox: '0 0 12 12', strokeWidth: '1.75', paths: ['M2 6h8M6 2l4 4-4 4'], size: 'w-3 h-3', where: 'Billboard and cart CTAs (MembershipBillboard, CartItems, Login)' },
  { name: 'Small arrow left', viewBox: '0 0 12 12', strokeWidth: '1.75', paths: ['M10 6H2M6 2L2 6l4 4'], size: 'w-3 h-3', where: 'Cart “Back to …” buttons' },
  { name: 'Arrow right (16)', viewBox: '0 0 16 16', strokeWidth: '2', paths: ['M3 8h10M9 4l4 4-4 4'], size: 'w-4 h-4', where: 'ArchivesAbout, DonateForm, MembershipBenefits' },
  { name: 'Check', viewBox: '0 0 16 16', strokeWidth: '1.75', paths: ['M3 8l3.5 3.5L13 4.5'], size: 'w-4 h-4', where: 'Plan feature lists (MembershipCustomizer, upsells); stroked #0466c8' },
  { name: 'Remove', viewBox: '0 0 14 14', strokeWidth: '1.75', paths: ['M1 1l12 12M13 1L1 13'], size: 'w-3.5 h-3.5', where: 'Cart line-item Remove' },
  { name: 'Edit', viewBox: '0 0 24 24', strokeWidth: '2', paths: ['M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7', 'M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'], size: 'w-3.5 h-3.5', where: 'Cart line-item Edit' },
]

function SvgSwatch({ entry }: { entry: SvgEntry }) {
  return (
    <svg
      className={`${entry.size} text-navy-bolder`}
      viewBox={entry.viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={entry.strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {entry.name === 'Search (header)' && <circle cx="11" cy="11" r="8" />}
      {entry.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

/* ─── Reproductions ──────────────────────────────────────────────────────────
   Classes copied verbatim from the files named, so the markup can be shown
   without rendering the whole footer or a whole card grid. */

/** Footer.tsx social links (images, not Font Awesome). */
const SOCIAL = [
  { src: facebookIcon, label: 'Facebook', href: 'https://facebook.com/usnavalinsitute' },
  { src: instagramIcon, label: 'Instagram', href: 'https://instagram.com/usnavalinsitute' },
  { src: youtubeIcon, label: 'YouTube', href: 'https://youtube.com/usnavalinsitute' },
  { src: linkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com/company/usnavalinsitute' },
]

function FooterSocialCopy() {
  return (
    <div className="flex items-center">
      {SOCIAL.map(({ src, label, href }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          className="flex items-center justify-center w-16 h-16 hover:opacity-70 transition-opacity"
        >
          <img src={src} alt={label} className="w-8 h-8" />
        </a>
      ))}
    </div>
  )
}

/** GivingQuickLinks.tsx icon tile. */
function IconTileCopy() {
  return (
    <div className="w-12 h-12 bg-[#EBF4FF] flex items-center justify-center text-[#0466c8] flex-shrink-0">
      <i className="fa-solid fa-people-group" style={{ fontSize: '1.25rem' }} />
    </div>
  )
}

export default function Iconography() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Iconography & Imagery">
          <p>
            There's no custom icon component — every icon is a Font Awesome glyph loaded via CDN kit, or a
            hand-drawn inline SVG for a handful of one-off UI marks. This page documents both, plus the image
            treatment conventions used across cards and heroes.
          </p>
        </DocPageHeader>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Icons — Font Awesome">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              Loaded globally via a kit script in <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">index.html</code>,
              so any <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">{'<i>'}</code> tag with the
              right classes renders — no per-icon import needed. Always pair with{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">aria-hidden="true"</code> since
              these are decorative next to visible text, or add an{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">aria-label</code> on the parent
              control when the icon is the only content (e.g. an icon-only button).
            </p>

            <div>
              <DocLabel>UI &amp; Interaction</DocLabel>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                {UI_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} />)}
              </div>
            </div>

            <div>
              <DocLabel>Actions</DocLabel>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2">
                {ACTION_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} />)}
              </div>
            </div>

            <div>
              <DocLabel>Content &amp; Ratings</DocLabel>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
                {CONTENT_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} />)}
              </div>
            </div>

            <div>
              <DocLabel>Brand / Social</DocLabel>
              <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2">
                {BRAND_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} prefix="fa-brands" />)}
              </div>
            </div>

            <CodeBlock code={`<i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
<i className="fa-brands fa-linkedin-in" aria-hidden="true" />
<i className="fa-regular fa-heart" aria-hidden="true" />`} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Font Awesome conventions">
          <div className="flex flex-col gap-8">
            <Lead>
              The kit is <C>{'<script src="https://kit.fontawesome.com/0482ae9e70.js" crossorigin="anonymous">'}</C> in{' '}
              <C>index.html</C>. It is a webfont kit: the <C>{'<i>'}</C> stays in the DOM and draws its glyph in a{' '}
              <C>::before</C>. In the browser the font resolves to &ldquo;Font Awesome 7 Pro&rdquo;, so Pro glyphs are
              available, though only the free-tier names are used. Three styles appear: <C>fa-solid</C> (almost
              everything), <C>fa-regular</C> (the outline half of a toggle: bookmark, heart, star, comment, clock), and{' '}
              <C>fa-brands</C>.
            </Lead>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <LiveMarkup label="Decorative, beside text (Button + trailing icon)">
                <ButtonLink href="/membership/join" variant="navy" size="sm">
                  Join Today
                  <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
                </ButtonLink>
              </LiveMarkup>
              <LiveMarkup label="Icon only: label on the control">
                <button
                  type="button"
                  className="w-9 h-9 rounded-full bg-white border border-[#0466C8] flex items-center justify-center
                             text-navy-bolder hover:bg-light-blue transition-colors
                             disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Scroll to more books"
                >
                  <i className="fa-solid fa-chevron-right text-sm" aria-hidden="true" />
                </button>
              </LiveMarkup>
              <LiveMarkup label="Icon tile (Giving quick links)">
                <IconTileCopy />
              </LiveMarkup>
            </div>

            <ClassTable
              rows={[
                { part: 'Glyph', classes: 'fa-solid fa-{name}  ›  aria-hidden="true"', note: 'Always aria-hidden. A glyph is never the only signal: beside text, the text carries the meaning; alone, the parent control’s aria-label does.' },
                { part: 'Color', classes: '(inherits currentColor)', note: 'Set the color on the parent (the button, link or tile) so the icon follows its hover state. Only put a text-* color on the <i> when it must differ from the label, as in Alert.' },
                { part: 'Trailing icon in a button or CTA', classes: 'text-xs', note: '12px, beside 14–16px labels. Spaced by the parent’s gap-2. The most common size (Button, CardCta, toolbar buttons).' },
                { part: 'Inline marks in small UI', classes: 'text-[10px]  ·  text-[11px]  ·  text-[12px]', note: 'Breadcrumb chevron and home (10px), disclosure chevrons in compact controls (11px), meta-line icons (12px).' },
                { part: 'Icon-only controls', classes: 'text-sm  ·  text-base', note: 'text-sm in 32–36px round buttons and the share discs; text-base for a bare close glyph.' },
                { part: 'Status icon', classes: 'text-[18px] leading-[1.45] flex-shrink-0', note: 'Alert. The line-height matches the title line so the glyph aligns with it.' },
                { part: 'Tile icon', classes: 'style="font-size: 1.25rem" inside w-12 h-12 bg-[#EBF4FF] flex items-center justify-center text-[#0466c8] flex-shrink-0', note: 'GivingQuickLinks. The size is an inline style (text-xl is the same 20px), and the <i> is missing aria-hidden.' },
                { part: 'Rotating chevron', classes: 'fa-solid fa-chevron-down transition-transform  +  rotate-180 when open', note: 'One glyph that turns, rather than swapping down/up. The read-more toggles that swap fa-chevron-down / fa-chevron-up are the exception.' },
              ]}
            />

            <DevNote>
              <p>
                Load the same kit in the Drupal theme&rsquo;s <C>libraries.yml</C> as an external JS library (or
                self-host the webfont CSS if the kit&rsquo;s domain allowlist is a problem for staging hosts). Confirm
                with USNI which Font Awesome license and version the kit is on; the prototype renders FA 7 Pro.
              </p>
              <p>
                Store icon names as plain strings where editors pick them (a list field on a quick-link paragraph:{' '}
                <C>{'{{ icon }}'}</C> = <C>fa-solid fa-people-group</C>) and render <C>{'<i class="{{ icon }}" aria-hidden="true"></i>'}</C>.
                Limit the allowed values to this glossary so the same job always gets the same glyph. Icons inside an
                aria-hidden wrapper (the article end mark, the Confirmation check disc) do not need their own aria-hidden,
                but adding it costs nothing.
              </p>
            </DevNote>
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Icon glossary">
          <div className="flex flex-col gap-8">
            <Lead>
              Every Font Awesome glyph in the prototype, and the one job it does. When a template needs an icon for
              one of these jobs, use this glyph; when it needs a new job, add a row here before adding a glyph.
            </Lead>
            {GLOSSARY.map((g) => (
              <div key={g.group} className="flex flex-col gap-3">
                <DocLabel>{g.group}</DocLabel>
                <GlossaryTable entries={g.entries} />
              </div>
            ))}
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Icons — Inline SVG">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              A small set of icons are hand-drawn as inline SVGs instead of Font Awesome — mainly modal close
              buttons, form chevrons, and the newsletter mail/checkmark glyphs — anywhere a precise stroke weight
              or a guaranteed no-network-dependency icon matters more than convenience.
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              <div className="border border-border-light bg-white flex flex-col items-center justify-center gap-2 py-5">
                <svg className="w-4 h-4 text-navy-bolder" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
                <p className="font-mono text-[10px] text-neutral-subtle">close</p>
              </div>
              <div className="border border-border-light bg-white flex flex-col items-center justify-center gap-2 py-5">
                <svg className="w-3 h-3 text-navy-bolder" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 3l5 5 5-5" />
                </svg>
                <p className="font-mono text-[10px] text-neutral-subtle">select chevron</p>
              </div>
              <div className="border border-border-light bg-white flex flex-col items-center justify-center gap-2 py-5">
                <svg className="w-4 h-4 text-navy-bolder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                <p className="font-mono text-[10px] text-neutral-subtle">mail</p>
              </div>
              <div className="border border-border-light bg-white flex flex-col items-center justify-center gap-2 py-5">
                <svg className="w-4 h-4 text-navy-bolder" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <p className="font-mono text-[10px] text-neutral-subtle">success check</p>
              </div>
            </div>

            <DocLabel>Inline SVG glossary (paths copied from source)</DocLabel>
            <div className="overflow-x-auto border border-border-light bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-subtlest border-b border-border-light">
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[72px]">Icon</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">Name</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3">viewBox · stroke · size · path</th>
                    <th className="font-body font-bold text-xs uppercase tracking-[0.06em] text-navy-bolder px-4 py-3 w-[30%]">Where</th>
                  </tr>
                </thead>
                <tbody>
                  {INLINE_SVGS.map((s) => (
                    <tr key={s.name} className="border-b border-border-light last:border-b-0">
                      <td className="px-4 py-3 align-top"><SvgSwatch entry={s} /></td>
                      <td className="font-body text-sm text-navy-bolder px-4 py-3 align-top">{s.name}</td>
                      <td className="px-4 py-3 align-top">
                        <code className="font-mono text-xs text-navy-subtle leading-relaxed break-words">
                          {s.viewBox} · {s.strokeWidth} · {s.size} · {s.paths.join(' ')}
                        </code>
                      </td>
                      <td className="font-body text-sm text-neutral-subtle px-4 py-3 align-top leading-relaxed">{s.where}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <LiveMarkup label="ExternalLinkIcon: inline (0.75em, default) and in a button (1.1em)">
              <div className="flex flex-wrap items-center gap-8">
                <a href="https://photos.usni.org" target="_blank" rel="noopener noreferrer" className="text-link font-body text-base inline-flex items-center gap-1.5">
                  Photos &amp; Historical Prints
                  <ExternalLinkIcon />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                <span className="inline-flex items-center gap-2 font-body font-bold text-sm text-navy-bolder">
                  Plan an event
                  <ExternalLinkIcon size="1.1em" />
                </span>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Stroke icons', classes: 'fill="none" stroke="currentColor" stroke-linecap="round" (stroke-linejoin="round")', note: 'Every inline icon is a stroke on a transparent fill, colored by the parent’s text color. stroke-width is 2 on 16/20/24 grids and 1.75 on the 12/14 grids, so the line weight looks the same at the smaller size.' },
                { part: 'Size', classes: 'w-3 h-3  ·  w-3.5 h-3.5  ·  w-4 h-4  ·  w-5 h-5  ·  w-6 h-6', note: '12, 14, 16, 20 and 24px boxes. Add flex-shrink-0 when the icon sits in a flex row with wrapping text.' },
                { part: 'ExternalLinkIcon', classes: 'inline-block flex-shrink-0  ›  style="width:{size};height:{size}"', note: 'The one exported icon component. em-sized: 0.75em inline, 1.1em in buttons. Always followed by an sr-only “(opens in a new tab)”.' },
                { part: 'Select chevron', classes: 'select.select-field  ›  background-image: url("data:image/svg+xml,…M5 8l5 5 5-5…")', note: 'Not an element: a data-URI SVG in index.css, stroked #1D2535, positioned right 1rem center at 1.05rem. See Forms.' },
                { part: 'Accessibility', classes: 'aria-hidden="true"', note: 'Required on every decorative SVG. ExternalLinkIcon sets it; most hand-drawn ones in the prototype do not (Modal close, sub-nav menu, cart icons). They sit beside text or inside a labelled button, so add aria-hidden in the templates.' },
              ]}
            />

            <DevNote>
              <p>
                Put each inline icon in one Twig partial (<C>{"{% include '@usni/icons/close.twig' with { class: 'w-4 h-4' } %}"}</C>)
                rather than pasting paths, and render it with <C>aria-hidden="true" focusable="false"</C>. There are near-duplicates
                to collapse: two close marks (16px and 20px grids), two menu marks, and two right arrows (12px and 16px). The
                card-brand marks are documented on <DsLink to="/design-system/commerce">Commerce → Card brand marks</DsLink>; they
                are the only SVGs that carry meaning (<C>role="img"</C> with an <C>aria-label</C> naming the card).
              </p>
            </DevNote>

            <div className="border border-border-light bg-white p-6 flex flex-wrap items-center gap-6">
              <AcceptedCards />
              <p className="font-body text-sm text-neutral-subtle">
                Card brand marks (preview). Markup and anatomy on{' '}
                <DsLink to="/design-system/commerce">Commerce</DsLink>.
              </p>
            </div>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/ExternalLinkIcon.tsx' },
                { path: 'src/components/ui/CardBrandIcons.tsx', note: 'Visa, Mastercard, American Express' },
                { path: 'src/components/ui/Modal.tsx', note: 'close mark' },
                { path: 'src/components/layout/SectionSubNav.tsx', note: 'menu and close marks for section sub-navs' },
                { path: 'src/index.css', note: 'select chevron (data URI)' },
              ]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/components/layout/Header.tsx', note: 'its own close (M2 2l12 12…, and M6 18L18 6… at 24px), search, heart, cart and user marks; the search flydown uses Font Awesome sized with inline style fontSize 1.125rem / 1.375rem instead of a text-* class' },
                { path: 'src/sections/CartItems.tsx', note: 'Edit, Remove, plus-circle and both small arrows drawn inline, repeated in BooksCartItems, DonateCartItems and NavalHistoryCartItems' },
                { path: 'src/sections/MembershipCustomizer.tsx', note: 'check mark with a hard-coded stroke="#0466c8" instead of currentColor; copied into MembershipMagazineUpsell (stroke="#023e7d"), NavalHistorySubscribe (currentColor) and NavalHistoryMembershipUpsell' },
                { path: 'src/sections/EventsHero.tsx', note: 'Font Awesome fa-arrow-up-right-from-square instead of ExternalLinkIcon (also EventsConferenceCenter)' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Social and logo artwork">
          <div className="flex flex-col gap-8">
            <Lead>
              Two sets of social marks exist. The footer&rsquo;s &ldquo;Connect with us&rdquo; row uses full-color 32px SVG
              files from <C>src/assets/images</C> as <C>{'<img>'}</C>s; sharing (SharePopover, the book page) uses
              monochrome <C>fa-brands</C> glyphs in a 32px ring. Logos are files in <C>public/</C>.
            </Lead>

            <LiveMarkup label="Footer social links (reproduced from Footer.tsx)" previewClassName="p-6 lg:p-8 bg-navy-boldest">
              <FooterSocialCopy />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Link', classes: 'flex items-center justify-center w-16 h-16 hover:opacity-70 transition-opacity', note: 'A 64px hit area around a 32px mark. aria-label names the network.' },
                { part: 'Mark', classes: 'w-8 h-8', note: 'facebook.svg, instagram.svg, youtube.svg, linkedin.svg: 32×32 artwork with its own fills, so color utilities do not apply; hover dims the whole mark instead. The snippet shows the data: URI the prototype build inlines them as; in Drupal it is a theme file path.' },
                { part: 'Share ring', classes: 'w-8 h-8 rounded-full border border-[#c4c9d4] flex items-center justify-center', note: 'SharePopover and BookProductHero, with an fa-brands glyph at text-sm / text-xs. #c4c9d4 is neutral-subtler.' },
                { part: 'Logos (public/)', classes: 'usni-logo-full.svg  ·  usni-logo-footer.svg  ·  usni-logo-seal.svg  ·  donate-button-logo.svg  ·  favicon.svg', note: 'Referenced by absolute path (/usni-logo-footer.svg). The donate mark sits in the header Donate button at height 1.4rem with alt="" aria-hidden.' },
              ]}
            />

            <DevNote>
              <p>
                In the footer, each link has both <C>aria-label</C> and an <C>{'<img alt>'}</C> with the same name; keep
                one (an empty <C>alt=""</C> on the image is enough when the link is labelled). The links open in the same
                tab with no new-tab note, unlike every other external link, and every profile URL is misspelled
                (&ldquo;usnavalinsitute&rdquo;). Take the real handles from USNI. Social links belong in a menu or a
                block config (<C>{'{{ url }}'}</C>, <C>{'{{ network }}'}</C>) so the theme picks the mark by network name.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/components/layout/Footer.tsx', note: 'social row' },
                { path: 'src/assets/images/facebook.svg', note: 'and instagram.svg, youtube.svg, linkedin.svg' },
                { path: 'src/components/ui/SharePopover.tsx', note: 'share ring' },
                { path: 'public/usni-logo-full.svg', note: 'and the other logo files in public/' },
              ]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/BookProductHero.tsx', note: 'share ring hovers the border to navy-bolder and uses text-xs glyphs; its buttons have no type and no handler, so they do nothing' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Image Treatment">
          <div className="flex flex-col gap-8">
            <p className="font-body text-sm text-neutral-subtle leading-relaxed max-w-2xl">
              Images sit in a fixed-aspect container with <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">object-cover</code>,
              a <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">bg-neutral-subtlest</code> placeholder
              behind them while loading, and a <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">hover:scale-105</code> zoom
              on linked card images.
            </p>

            <div>
              <DocLabel>Common aspect ratios</DocLabel>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="aspect-[4/3] bg-neutral-subtlest overflow-hidden">
                    <img src={imgAIWarfighting} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                  <p className="font-mono text-xs text-neutral-subtle mt-2">aspect-[4/3] — cards</p>
                </div>
                <div>
                  <div className="aspect-[16/9] bg-neutral-subtlest overflow-hidden">
                    <img src={imgAIWarfighting} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-mono text-xs text-neutral-subtle mt-2">aspect-[16/9] — hero/banner</p>
                </div>
                <div>
                  <div className="aspect-[2/3] bg-neutral-subtlest overflow-hidden mx-auto max-w-[120px]">
                    <img src={imgAIWarfighting} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-mono text-xs text-neutral-subtle mt-2">aspect-[2/3] — book covers</p>
                </div>
                <div>
                  <div className="aspect-square bg-neutral-subtlest overflow-hidden max-w-[120px]">
                    <img src={imgAIWarfighting} alt="" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-mono text-xs text-neutral-subtle mt-2">aspect-square — thumbnails</p>
                </div>
              </div>
            </div>

            <CodeBlock code={`<a href={article.href} className="block overflow-hidden aspect-[4/3] bg-neutral-subtlest">
  <img
    src={article.image}
    alt={article.imageAlt ?? article.headline}
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
  />
</a>`} />

            <ClassTable
              rows={[
                { part: 'aspect-[16/9]', classes: 'aspect-[16/9]  ·  aspect-video', note: 'The most used ratio (about 40 boxes): mega-menu promos, full-bleed and gallery images, video posters, podcast art. aspect-video is the same 16:9.' },
                { part: 'aspect-[4/3]', classes: 'aspect-[4/3]', note: 'Article teasers (Large, Small Feature) and every photo hero below lg (PageHero, CollectionHero).' },
                { part: 'aspect-[2/3]', classes: 'aspect-[2/3]', note: 'Book covers everywhere.' },
                { part: 'aspect-[16/10]', classes: 'aspect-[16/10]', note: 'Issue article grids and related-article cards.' },
                { part: 'Magazine covers', classes: 'aspect-[2400/3175]  ·  aspect-[534/728]  ·  aspect-[350/478]  ·  aspect-[2363/3225]', note: 'The native pixel ratios of the cover scans (about 3:4), so covers are never cropped. IssueCoverCard defaults to 2400/3175. Normalize to one cover ratio and image style in Drupal.' },
                { part: 'Banners', classes: 'aspect-[3/1]  ·  aspect-[2/1]  ·  aspect-[16/7]', note: '3:1 for the giving promo banners (1200×400 art), 2:1 for PageHero’s short mobile crop, 16:7 for the article hero.' },
                { part: 'Other', classes: 'aspect-[3/2]  ·  aspect-[4/5]  ·  aspect-square', note: '3:2 for the AboutQuickLinks and Taylor Center history photos; 4:5 for the Taylor Center namesake portrait. Square thumbnails are fixed boxes rather than aspect-square: XSmall Feature uses w-20 h-20 (80px).' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Object-fit, position and motion">
          <div className="flex flex-col gap-8">
            <Lead>
              Photographs fill a fixed-ratio box and crop (<C>object-cover</C>). Artwork that must not be cropped (logos,
              the lightbox, chart figures) uses <C>object-contain</C> or <C>h-auto</C>. Motion depends on what the image
              belongs to: an article teaser&rsquo;s image zooms, a cover lifts, and an image inside a linked card holds
              still (the card&rsquo;s shadow is the hover; see <DsLink to="/design-system/cards">Cards</DsLink>).
            </Lead>

            <LiveMarkup label="The three image behaviors: teaser zoom, cover lift, static banner" previewClassName="p-6 lg:p-8 bg-white" defaultOpen={false}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 items-start">
                <a href="/proceedings" className="block overflow-hidden aspect-[4/3] bg-neutral-subtlest flex-shrink-0">
                  <img
                    src={imgHomepageHero}
                    alt="Sailors on the flight deck of a carrier at sea"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </a>
                <a href="/proceedings/issues/2026/august" className="group flex flex-col max-w-[180px]">
                  <div className="aspect-[2400/3175] bg-neutral-subtlest">
                    <img
                      src={imgProceedingsAug26}
                      alt="Proceedings, August 2026 cover"
                      loading="lazy"
                      className="w-full h-full object-cover transition-[transform,box-shadow] duration-300
                        shadow-[0_2px_8px_rgba(0,18,51,0.14)]
                        group-hover:-translate-y-2 group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]"
                    />
                  </div>
                </a>
                <div className="aspect-[3/1] overflow-hidden bg-neutral-subtlest">
                  <img src={imgHomepageHero} alt="" className="w-full h-full object-cover" />
                </div>
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Frame', classes: '{aspect} overflow-hidden bg-neutral-subtlest', note: 'The ratio lives on the frame, not the image, so the space is reserved before the image loads (no layout shift). The neutral ground shows while it loads or if it fails.' },
                { part: 'Photo', classes: 'w-full h-full object-cover', note: 'Fills the frame and crops the overflow, centered. object-center is the browser default; the 17 places that write it explicitly change nothing.' },
                { part: 'Teaser zoom', classes: 'hover:scale-105 transition-transform duration-300', note: 'On the <img>, inside the overflow-hidden link, so the zoom is clipped. Article teasers only (LargeFeature, SmallFeature).' },
                { part: 'Cover lift', classes: 'transition-[transform,box-shadow] duration-300 shadow-[0_2px_8px_rgba(0,18,51,0.14)] group-hover:-translate-y-2 group-hover:shadow-[0_10px_26px_rgba(0,18,51,0.24)]', note: 'Book and magazine covers. The frame has no overflow-hidden, since the cover rises 8px out of it and its shadow falls outside. The shadows are hand-rolled (no spread, no horizontal offset) so they wrap a tall cover evenly. rgba(0,18,51) is navy-boldest.' },
                { part: 'Crop position', classes: 'object-top  ·  style="object-position: {imagePosition}"', note: 'object-top keeps faces in tall portrait crops (Taylor Center namesake, Naval History article hero). CollectionHero and CollectionTeaserCard take an editor-set position from data (e.g. “left center”), defaulting to center: the prototype’s stand-in for a focal point.' },
                { part: 'Uncropped', classes: 'object-contain  ·  w-full h-auto', note: 'Logos (MagazineHero, ProceedingsSponsoredBillboard, school crests), the gallery lightbox, the mega-menu cover art, in-column photos and charts.' },
                { part: 'Photo hero (desktop)', classes: 'bg-cover bg-center  ›  style="background-image: url({image})"', note: 'PageHero paints the photo as a CSS background from lg, and renders a separate lg:hidden <img> (aspect-[4/3] or aspect-[2/1]) for mobile, which carries the alt text.' },
                { part: 'Lazy loading', classes: 'loading="lazy"', note: 'On covers and below-the-fold grids (23 places). Never on a hero or the first row of a page.' },
              ]}
            />

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/cards/LargeFeature.tsx', note: 'teaser zoom' },
                { path: 'src/components/ui/IssueCoverCard.tsx', note: 'cover lift; its comments explain the shadow' },
                { path: 'src/sections/BooksProductSection.tsx', note: 'cover lift on book covers' },
                { path: 'src/sections/GivingPromoCards.tsx', note: 'static banner in a linked card' },
                { path: 'src/sections/CollectionHero.tsx', note: 'data-driven object-position' },
              ]}
            />
            <SourceList
              title="Drift: other hover zooms"
              tone="drift"
              items={[
                { path: 'src/sections/UpcomingEvents.tsx', note: 'group-hover:scale-[1.04] on the event image (also PastEventsArchive)' },
                { path: 'src/sections/LeadershipRoster.tsx', note: 'group-hover:scale-[1.06], and a pre-scaled scale-[1.08] variant that zooms further' },
                { path: 'src/sections/ArchivesCollections.tsx', note: 'group-hover:scale-[1.02]' },
                { path: 'src/sections/AboutStrategicPlanForeword.tsx', note: 'a pre-scaled scale-[1.08] image' },
                { path: 'src/sections/EssayContestsCurrentGrid.tsx', note: 'group-hover:scale-105 inside a linked card, which the card convention rules out' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Captions, credits and alt text">
          <div className="flex flex-col gap-6">
            <Lead>
              Captions and photo credits are an article concern and are specified on{' '}
              <DsLink to="/design-system/media">Media → Image ratios, captions and credits</DsLink>: in-column captions are{' '}
              <C>mt-3 font-body text-sm text-neutral-subtle leading-relaxed</C> with the credit on its own line, prefixed
              &ldquo;Photo Credit:&rdquo;. Elsewhere on the site, images carry no caption.
            </Lead>
            <ClassTable
              rows={[
                { part: 'Alt: content image', classes: 'alt="{description}"', note: 'Describes the picture (“Sailors on the flight deck of a carrier at sea”), never the caption or the headline repeated.' },
                { part: 'Alt: teaser image', classes: 'alt={article.imageAlt ?? article.headline}', note: 'The teasers fall back to the headline, so a screen reader hears the headline twice (image link, then headline link). Prefer the image link aria-hidden with tabindex="-1" (see Cards).' },
                { part: 'Alt: decorative', classes: 'alt=""', note: 'Banners, background photos, icon art, and images inside a link whose text already names the destination.' },
                { part: 'Alt: covers', classes: 'alt="{title}"  ·  alt="{magazine}, {issue} cover"', note: 'Book covers use the title; magazine covers name the issue.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Drupal image styles and responsive images">
          <div className="flex flex-col gap-6">
            <DevNote>
              <p>
                Create one image style per ratio in the table above, not per placement: <C>16_9</C>, <C>4_3</C>,{' '}
                <C>2_3</C> (book cover), <C>16_10</C>, <C>3_1</C>, <C>16_7</C>, one magazine-cover ratio, and{' '}
                <C>square</C>, each with &ldquo;Focal Point Scale and Crop&rdquo; at 1x and 2x widths. Group them into
                Responsive Image styles keyed to the Tailwind breakpoints (<C>sm</C> 640, <C>md</C> 768, <C>lg</C> 1024,{' '}
                <C>xl</C> 1280) and output <C>srcset</C> + <C>sizes</C>; the frame&rsquo;s <C>aspect-*</C> class stays on the
                wrapper, and the <C>{'<img>'}</C> keeps <C>w-full h-full object-cover</C>.
              </p>
              <p>
                Install the Focal Point module so editors set the crop center once on the media entity; it replaces the
                prototype&rsquo;s per-image <C>imagePosition</C> and most uses of <C>object-top</C>. Logos and covers use a
                &ldquo;Scale&rdquo; style (no crop). Images outside the first screen get <C>loading="lazy"</C> (Drupal core
                adds it by default; switch it off for heroes in the formatter).
              </p>
              <p>
                For PageHero&rsquo;s desktop background photo, print the style&rsquo;s URL into the inline{' '}
                <C>background-image</C> (or use an absolutely positioned <C>{'<img>'}</C> with <C>object-cover</C> instead,
                which gets <C>srcset</C> for free). Credit and caption fields belong to the media entity and the placing
                paragraph respectively, as described on Media.
              </p>
            </DevNote>
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
