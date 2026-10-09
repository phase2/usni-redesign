import { useEffect, useRef, useState, type ComponentProps, type ContextType, type ReactNode } from 'react'
import { MemoryRouter, UNSAFE_LocationContext } from 'react-router-dom'
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
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionSubNav from '@/components/layout/SectionSubNav'
import TabNav, { panelId, tabId } from '@/components/ui/TabNav'
import BreakpointLabel from '@/components/design-system/BreakpointLabel'
import PreviewFrame from '@/components/design-system/PreviewFrame'
import { Button } from '@/components/ui/Button'
import ArticleMeterBanner from '@/components/ui/ArticleMeterBanner'
import ArticlePaywall from '@/components/ui/ArticlePaywall'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import GivingSubNav from '@/sections/GivingSubNav'
import GivingJumpNav from '@/sections/GivingJumpNav'

/**
 * Renders its children as though the browser were at `path`.
 *
 * The sub-navs, the header and the breadcrumb all derive their active state
 * from the current location, and on this sheet that location is
 * /design-system/navigation — which matches nothing, so every example would
 * show its rest state only. A nested MemoryRouter fixes that, but React Router
 * refuses to mount a router inside another, so the outer location context is
 * cleared first. Docs-only: nothing in the site does this.
 *
 * The path may carry a query string, which is how the header's preview-only
 * params (?previewNavOpen=…, ?previewMobileOpen=1, ?previewSearchOpen=1) reach
 * a static snapshot.
 */
function AtPath({ path, children }: { path: string; children: ReactNode }) {
  return (
    <UNSAFE_LocationContext.Provider value={null as unknown as ContextType<typeof UNSAFE_LocationContext>}>
      <MemoryRouter initialEntries={[path]}>{children}</MemoryRouter>
    </UNSAFE_LocationContext.Provider>
  )
}

/**
 * A PreviewFrame that mounts its iframe only once it nears the viewport.
 *
 * Each frame boots the whole prototype — on the dev server that is about a
 * thousand module requests — and this sheet has ten of them. Loaded at once,
 * the browser runs out of request slots (ERR_INSUFFICIENT_RESOURCES) and most
 * frames come up blank. Deferring them spreads the load as the reader scrolls.
 * A same-size placeholder holds the layout until then.
 */
function LazyFrame(props: ComponentProps<typeof PreviewFrame>) {
  const ref = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || show) return
    if (typeof IntersectionObserver === 'undefined') {
      setShow(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true)
          io.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [show])

  return (
    <div ref={ref}>
      {show ? (
        <PreviewFrame {...props} />
      ) : (
        <div className={`overflow-x-auto ${props.className ?? ''}`}>
          <div style={{ width: props.width, height: props.height }} className="bg-neutral-subtlest" aria-hidden="true" />
        </div>
      )}
    </div>
  )
}

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-sm [overflow-wrap:anywhere]">{children}</code>
}

function TabNavDemo() {
  const [active, setActive] = useState('2024')
  const years = ['2024', '2023', '2022', '2021', '2020']
  return (
    <>
      <TabNav
        label="Donor listing by year"
        tabs={years.map((y) => ({ id: y, label: y }))}
        activeId={active}
        onChange={setActive}
      />
      <div
        role="tabpanel"
        id={panelId(active)}
        aria-labelledby={tabId(active)}
        className="bg-white border border-t-0 border-border-light p-6 font-body text-sm text-neutral-subtle"
      >
        Panel content for {active}. The caller owns the panel — give it{' '}
        <code className="font-mono text-xs">role="tabpanel"</code>,{' '}
        <code className="font-mono text-xs">id={'{panelId(activeId)}'}</code> and{' '}
        <code className="font-mono text-xs">aria-labelledby={'{tabId(activeId)}'}</code>.
      </div>
    </>
  )
}

/* The Archives section's real link list, run through the shared component so
   the external-link treatment can be shown. */
const archivesItems = [
  { label: 'About the Archives', href: '/archives', exact: true },
  { label: 'Oral Histories', href: '/archives/oral-histories' },
  { label: 'Memoirs', href: '/archives/memoirs' },
  { label: 'Photos', href: 'https://photos.usni.org', external: true },
  { label: 'Contact the Archives', href: '/contact#archives' },
]

/** Contains a `position: fixed` child inside the preview box. */
const FIXED_BOX = 'relative [transform:translateZ(0)] h-[260px] lg:h-[200px] overflow-hidden bg-neutral-subtlest'

export default function Navigation() {
  const [meterVisible, setMeterVisible] = useState(false)

  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <DocPageHeader title="Navigation">
          <p>
            The header, footer, and the navigation that sits inside a page: section sub-navs, jump links,
            tabs, breadcrumbs, and the two metering surfaces on articles. The header and footer samples are
            the real, live components embedded in an isolated preview frame, so their own responsive
            breakpoints render correctly regardless of your window size, with interaction disabled so they
            can't be clicked or scrolled from here. Everything else renders inline.
          </p>
          <p>
            Each example carries the HTML and Tailwind it generates. The header and footer snapshots are long,
            so they start collapsed.
          </p>
        </DocPageHeader>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
        {/* ─────────────────────────────── Header ─────────────────────────────── */}
        <DocSection title="Header">
          <ul className="font-body text-sm text-neutral-subtle leading-relaxed mb-8 max-w-2xl list-disc pl-5 space-y-1.5">
            <li>Sticky on scroll, with a shadow that deepens once the page scrolls past the top</li>
            <li>Desktop splits into two bars: a utility bar (Archives, Events, Ship&rsquo;s Store, Cart,
              Login/Register, Donate) that collapses away on scroll, and a main nav bar with the primary
              site sections</li>
            <li>Top-level items open a mega-menu on hover — a link list alongside a featured image/headline/CTA block</li>
            <li>Site-wide search flydown with live type-ahead across books, articles, and pages</li>
            <li>Below <code className="font-mono text-xs bg-neutral-subtlest px-1 py-0.5">lg</code> (1024px), both bars
              are replaced by a single bar (logo, search, hamburger) that opens a full-screen off-canvas menu</li>
            <li>Between <code className="font-mono text-xs bg-neutral-subtlest px-1 py-0.5">lg</code> and{' '}
              <code className="font-mono text-xs bg-neutral-subtlest px-1 py-0.5">min-[1330px]</code> the nav type,
              padding and logo are a size smaller, so seven top-level items and the search toggle fit on one row
              at 1024px</li>
          </ul>

          <BreakpointLabel device="desktop">Desktop — Minimum: 1024px</BreakpointLabel>
          <div className="flex flex-col gap-8 mb-10">
            <LiveMarkup
              label="Default"
              previewClassName="bg-white p-0"
              defaultOpen={false}
              markupFor={<AtPath path="/"><Header /></AtPath>}
            >
              <LazyFrame
                src="/design-system/preview/header"
                width={1200}
                height={157}
                title="Header — desktop default"
                className="bg-white p-6"
              />
            </LiveMarkup>
            <LiveMarkup
              label="Mega-menu open (Membership)"
              previewClassName="bg-white p-0"
              defaultOpen={false}
              markupFor={<AtPath path="/?previewNavOpen=Membership"><Header /></AtPath>}
            >
              <LazyFrame
                src="/design-system/preview/header?previewNavOpen=Membership"
                width={1200}
                height={673}
                title="Header — desktop mega-menu open"
                className="bg-white p-6"
              />
            </LiveMarkup>
            <LiveMarkup
              label="Mega-menu open, side-image layout (Books & Press, right-anchored)"
              previewClassName="bg-white p-0"
              defaultOpen={false}
              markupFor={<AtPath path="/books?previewNavOpen=Books%20%26%20Press"><Header /></AtPath>}
            >
              <LazyFrame
                src="/design-system/preview/header?previewNavOpen=Books%20%26%20Press"
                width={1200}
                height={730}
                title="Header — desktop mega-menu open, Books & Press"
                className="bg-white p-6"
              />
            </LiveMarkup>
            <LiveMarkup
              label="Search flydown open"
              previewClassName="bg-white p-0"
              defaultOpen={false}
              markupFor={<AtPath path="/?previewSearchOpen=1"><Header /></AtPath>}
            >
              <LazyFrame
                src="/design-system/preview/header?previewSearchOpen=1"
                width={1200}
                height={320}
                title="Header — search flydown open"
                className="bg-white p-6"
              />
            </LiveMarkup>
          </div>

          <BreakpointLabel device="mobile">Mobile — Maximum: 1023px</BreakpointLabel>
          <div className="flex flex-col gap-8 mb-10">
            <div>
              <DocLabel className="mb-2">Default — same markup as the desktop Default above</DocLabel>
              <LazyFrame
                src="/design-system/preview/header"
                width={375}
                height={81}
                title="Header — mobile default"
                className="border border-border-light bg-white p-6"
              />
            </div>
            <LiveMarkup
              label="Off-canvas menu open"
              previewClassName="bg-white p-0"
              defaultOpen={false}
              markupFor={<AtPath path="/?previewMobileOpen=1"><Header /></AtPath>}
            >
              <LazyFrame
                src="/design-system/preview/header?previewMobileOpen=1"
                width={375}
                height={640}
                title="Header — mobile menu open"
                className="bg-white p-6"
              />
            </LiveMarkup>
          </div>

          <div className="flex flex-col gap-8">
            <DocLabel className="mb-0">Anatomy — shell and bars</DocLabel>
            <ClassTable
              rows={[
                { part: 'Header', classes: 'sticky top-0 z-40 bg-white transition-shadow duration-300 shadow-sm', note: <>Scrolled past 10px: <C>shadow-md</C> replaces <C>shadow-sm</C>. Search open: adds <C>z-50</C> so the flydown and its backdrop sit over page content that has its own stacking (sticky jump-link bar is <C>z-30</C>).</> },
                { part: 'Mobile bar', classes: 'lg:hidden flex items-center justify-between px-5 py-3.5 border-b border-border-light', note: 'Below lg only. 81px tall (52px logo + padding + rule).' },
                { part: 'Mobile icon button', classes: 'w-11 h-11 flex items-center justify-center text-navy-bolder hover:text-navy-subtle transition-colors', note: '44px square — the minimum touch target. Search and hamburger, inline SVG icons at w-5 h-5 / w-6 h-6.' },
                { part: 'Full logo', classes: 'w-auto h-[52px] lg:h-[56px] min-[1330px]:h-[69px]', note: 'One SVG at three heights. The step at 1330px is what buys the room for the full-size nav below it.' },
                { part: 'Utility bar', classes: 'header-top hidden lg:block transition-all duration-300 ease-in-out', note: <>At rest: <C>max-h-40 opacity-100 overflow-visible</C> (visible, so the Archives dropdown can hang out of it). Scrolled: <C>max-h-0 opacity-0 pointer-events-none overflow-hidden</C>. <C>header-top</C> is a hook only — no CSS targets it.</> },
                { part: 'Utility row', classes: 'flex items-center justify-between py-4', note: <>Inside <C>container-site</C>. Logo left, links right.</> },
                { part: 'Utility link', classes: 'group/nav font-body font-bold text-[15px] min-[1330px]:text-[16px] text-navy-subtle px-2.5 min-[1330px]:px-4 py-2 hover:text-navy-bolder transition-colors whitespace-nowrap leading-none', note: <>Links with an icon add <C>flex items-center gap-1.5</C>. The label sits in <C>{'<span class="article-link article-link--nav pb-0.5">'}</C>: a 2px #0466C8 underline that sweeps in when the whole padded link (<C>group/nav</C>) is hovered.</> },
                { part: 'Utility divider', classes: 'w-px h-5 bg-[#c4c9d4] mx-2', note: <>#c4c9d4 = <C>neutral-subtler</C>.</> },
                { part: 'Cart count badge', classes: 'flex items-center justify-center w-6 h-6 rounded-full bg-gold text-navy-bolder font-body font-bold text-[13px] leading-none flex-shrink-0', note: 'Rendered only when the cart holds something. One of the few deliberate rounded shapes.' },
                { part: 'Donate button', classes: 'ml-3 flex items-center gap-2.5 bg-gold text-navy-bolder font-body font-bold text-[15px] min-[1330px]:text-[16px] px-4 min-[1330px]:px-6 py-3 min-[1330px]:py-3.5 hover:bg-gold-dark transition-colors whitespace-nowrap leading-none', note: <>Carries the anchor mark <C>/donate-button-logo.svg</C> at 1.4rem high, <C>alt=""</C>.</> },
                { part: 'Main nav bar', classes: 'header-bottom hidden lg:block', note: <>Inner row: <C>container-site</C> › <C>flex items-center</C>. <C>header-bottom</C> is a hook only.</> },
                { part: 'Seal logo slot', classes: 'flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out', note: <>At rest: <C>max-w-0 opacity-0 mr-0</C>. Scrolled: <C>max-w-[70px] opacity-100 mr-4</C>. The seal (57px tall, inline style) replaces the full logo once the utility bar has collapsed.</> },
                { part: 'Primary nav', classes: 'flex items-stretch flex-1', note: <><C>{'<nav aria-label="Primary navigation">'}</C>. <C>items-stretch</C> lets each item&rsquo;s 4px active rule sit on the bar&rsquo;s bottom edge.</> },
                { part: 'Search toggle', classes: 'ml-2 p-2 transition-colors flex-shrink-0', note: <>Closed: <C>text-navy-subtle hover:text-navy-bolder</C>, magnifying glass at 1.125rem. Open: <C>text-navy-bolder</C>, <C>fa-xmark</C> at 1.375rem. <C>aria-label</C> flips between &ldquo;Open search&rdquo; and &ldquo;Close search&rdquo;.</> },
              ]}
            />

            <DocLabel className="mb-0">Anatomy — main nav item, mega-menu, simple dropdown</DocLabel>
            <ClassTable
              rows={[
                { part: 'Nav item wrapper', classes: 'relative h-full flex items-stretch border-b-[4px] transition-colors duration-150', note: <>Active section (path equals the item&rsquo;s href or sits beneath it): <C>border-gold</C>. Otherwise <C>border-transparent</C>. Hover opens the panel; leaving starts a 120ms close timer so the pointer can cross the gap into the panel.</> },
                { part: 'Nav item link', classes: 'flex items-center gap-1.5 min-[1330px]:gap-[10px] font-body font-extrabold whitespace-nowrap leading-none transition-colors duration-150', note: <>
                  At rest: <C>text-[16px] px-2.5 py-6 min-[1330px]:text-[18px] min-[1330px]:px-5</C>.
                  Scrolled (compact): <C>text-[15px] px-2.5 py-8 min-[1330px]:text-[18px] min-[1330px]:px-4</C> — taller padding, because the bar now carries the seal logo and has to match its height.
                  Panel open: <C>bg-navy-bolder text-white</C>; closed: <C>text-navy-subtle hover:text-navy-bolder</C>.
                  Carries <C>aria-current="page"</C> when active.</> },
                { part: 'Chevron', classes: 'w-3 h-3 flex-shrink-0 transition-transform duration-150', note: <>Inline SVG, 1.5 stroke. <C>rotate-180</C> while open. Only on items with children (USNI News has none).</> },
                { part: 'Mega-menu panel', classes: 'absolute top-full z-50 bg-white shadow-xl border border-border-light', note: <>Anchored <C>left-0</C>, or <C>right-0</C> for items flagged align-right (Books &amp; Press, About, Giving). Inline style <C>min-width: min(820px, calc(100vw - 32px))</C> plus a JS <C>translateX</C> from the viewport clamp — see below.</> },
                { part: 'Panel link column', classes: 'flex-1 py-2', note: <>Inside <C>flex</C>, beside the CTA column.</> },
                { part: 'Panel link', classes: 'flex items-center px-8 py-4 font-body font-bold text-lg text-navy-bolder border-b border-border-light last:border-0 hover:bg-surface-subtle hover:text-navy-subtle transition-colors' },
                { part: 'CTA column', classes: 'w-[380px] flex-shrink-0 bg-navy-boldest flex flex-col', note: 'Omitted when the item has no mega CTA.' },
                { part: 'CTA banner image', classes: 'w-full aspect-[16/9] overflow-hidden flex-shrink-0', note: <>Default layout (articles, photography). <C>img</C>: <C>w-full h-full object-cover</C>.</> },
                { part: 'CTA body', classes: 'flex flex-col justify-between gap-6 flex-1 p-8', note: <>Text stack: <C>flex flex-col gap-4</C>. Headline <C>font-headline text-3xl text-white not-italic leading-[1.1]</C>; body <C>font-body text-base text-white/80 leading-relaxed</C>.</> },
                { part: 'CTA side image', classes: 'flex-shrink-0 w-[90px]', note: <>Side layout (book covers): row <C>flex gap-5 items-start</C>, cover <C>w-full h-auto object-contain shadow-lg</C>, text stack <C>flex flex-col gap-3 min-w-0</C>, headline drops to <C>text-2xl</C>, body to <C>text-sm</C>.</> },
                { part: 'CTA eyebrow', classes: 'font-body font-medium text-xs uppercase tracking-[0.1em]', note: <>Colour is an inline <C>color: #E0E0CC</C> — the sub-nav tan, no token. Optional (&ldquo;Featured Article&rdquo;, &ldquo;Featured New Release&rdquo;).</> },
                { part: 'CTA button', classes: 'flex items-center justify-center bg-gold text-navy-bolder font-body font-bold text-base tracking-[-0.3px] px-6 py-4 hover:bg-gold-dark transition-colors', note: 'Full width of the column.' },
                { part: 'Simple dropdown', classes: 'absolute top-full left-0 min-w-[220px] bg-white border border-border-light shadow-lg z-50', note: 'Utility-bar Archives only. Same hover-and-120ms behaviour as the mega-menu, no CTA.' },
                { part: 'Simple dropdown item', classes: 'flex items-center gap-1.5 px-5 py-3.5 font-body font-bold text-base text-navy-bolder hover:bg-surface-subtle hover:text-navy-subtle transition-colors border-b border-border-light last:border-0', note: <>External items (Photos) get <C>target="_blank"</C>, the external-link glyph and an sr-only &ldquo;(opens in a new tab)&rdquo;.</> },
              ]}
            />

            <DocLabel className="mb-0">Anatomy — search flydown</DocLabel>
            <ClassTable
              rows={[
                { part: 'Backdrop', classes: 'absolute left-0 right-0 top-full z-40 bg-navy-boldest/30', note: <>Inline <C>height: 100vh</C>. Click closes.</> },
                { part: 'Panel', classes: 'absolute left-0 right-0 top-full z-50 bg-white shadow-2xl', note: <>Enters with a 0.18s fade-and-drop (<C>searchSlideIn</C>, 8px). Inner: <C>container-site py-6</C>.</> },
                { part: 'Input group', classes: 'flex items-stretch border-2 border-[#023e7d] bg-white', note: <>#023e7d = <C>navy-subtle</C>. Icon cell: <C>flex-shrink-0 flex items-center px-4 text-[#0466c8]</C> (#0466c8 = <C>navy-bright</C>).</> },
                { part: 'Input', classes: 'flex-1 font-body text-[17px] text-navy-bolder placeholder:text-neutral-subtle outline-none bg-transparent py-3', note: <>Focused on open. Placeholder &ldquo;What can we help you find?&rdquo;. <C>outline-none</C> with no replacement ring — the 2px border is the only focus cue.</> },
                { part: 'Clear button', classes: 'flex-shrink-0 flex items-center px-3 text-neutral-subtle hover:text-navy-bolder transition-colors', note: 'Shown only once something is typed.' },
                { part: 'Submit', classes: 'flex-shrink-0 flex items-center px-7 bg-navy-bolder text-white font-body font-bold text-[15px] tracking-[-0.3px] hover:bg-navy-bright transition-colors', note: <>An <C>{'<a>'}</C> to <C>/search?q=…</C>, not a form submit.</> },
                { part: 'Suggestion list', classes: 'mt-2 border border-t-0 border-[#023e7d]', note: <>From 2 characters, up to 7 matches. <C>role="listbox"</C>.</> },
                { part: 'Suggestion row', classes: 'flex items-center gap-3 px-4 py-3 hover:bg-surface-subtle transition-colors border-b border-border-light last:border-0', note: <>Title <C>font-body text-[15px] text-navy-bolder leading-snug</C>, subtitle <C>font-body text-[12px] text-neutral-subtle mt-0.5</C>. Matched text wrapped in <C>{'<mark class="bg-[#0466C8]/15 text-[#0466C8] font-semibold not-italic">'}</C>.</> },
                { part: 'Type badge', classes: 'flex-shrink-0 font-body font-bold text-[11px] uppercase tracking-wide px-2 py-0.5', note: <>Book <C>bg-[#e8f0fb] text-[#0466c8]</C>; Article <C>bg-[#edf7f0] text-[#0a7e3f]</C>; Page <C>bg-[#f0f0f0] text-[#4e576a]</C>. Only #0466c8 (navy-bright) and #4e576a (neutral-subtle) have tokens; the tints and the green do not.</> },
                { part: '“See all” row', classes: 'flex items-center gap-2 px-4 py-3 font-body font-semibold text-[14px] text-[#0466c8] hover:bg-surface-subtle transition-colors', note: <>Inside <C>{'<li class="border-t border-[#023e7d]/20">'}</C>.</> },
                { part: 'No results', classes: 'mt-3 font-body text-[14px] text-neutral-subtle' },
              ]}
            />

            <DocLabel className="mb-0">Anatomy — mobile off-canvas menu</DocLabel>
            <ClassTable
              rows={[
                { part: 'Overlay', classes: 'fixed inset-0 z-[60] lg:hidden flex flex-col bg-white', note: 'Full screen, above the header. Locks body scroll while open. Its own header bar repeats the mobile bar with search and close (×) buttons.' },
                { part: 'Scroll body', classes: 'flex-1 overflow-y-auto' },
                { part: 'Section row', classes: 'border-b border-border-light', note: 'One per top-level item.' },
                { part: 'Section toggle', classes: 'flex items-center justify-between w-full px-5 py-4 text-left bg-transparent', note: <>A <C>{'<button aria-expanded>'}</C>. Label <C>font-body font-extrabold text-[1.125rem] text-navy-subtle</C>. One section open at a time.</> },
                { part: 'Toggle chevron', classes: 'flex-shrink-0 w-9 h-9 flex items-center justify-center bg-surface-subtle text-navy-subtle transition-transform duration-200', note: <><C>rotate-180</C> when expanded.</> },
                { part: 'Child list', classes: 'border-l-[3px] border-gold ml-5 mb-4', note: 'The mega-menu links only — the CTA block is desktop-only.' },
                { part: 'Child link', classes: 'block px-4 py-3 font-body text-[1rem] text-navy-bolder hover:text-navy-subtle transition-colors' },
                { part: 'Leaf link', classes: 'flex items-center justify-between px-5 py-4 font-body font-extrabold text-[1.125rem] text-navy-subtle hover:text-navy-bolder transition-colors', note: 'A top-level item with no children (USNI News).' },
                { part: 'Utility list', classes: 'border-t-2 border-border-light mt-1', note: 'Donate, Events, Cart, Member Login / My Account.' },
                { part: 'Utility link', classes: 'flex items-center gap-3 px-5 py-4 font-body font-bold text-[1rem] text-navy-subtle hover:text-navy-bolder hover:bg-surface-subtle transition-colors border-b border-border-light last:border-0', note: <>Cart badge: <C>ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-gold text-navy-bolder font-body font-bold text-[12px] leading-none</C>.</> },
              ]}
            />

            <DevNote title="Mega-menu viewport clamp">
              <p>
                Each panel is 820px wide and hangs off one edge of its nav item. On a wide screen that always
                fits, but between <C>lg</C> and about 1330px the right-anchored panels (Books &amp; Press, About,
                Giving) ran off the left edge, and a left-anchored one late in the row could run off the right.
                Two things fix it, and the Drupal build needs both:
              </p>
              <p>
                <strong>CSS:</strong> the panel&rsquo;s width is <C>min-width: min(820px, calc(100vw - 32px))</C> —
                folded into <C>min-width</C> rather than a separate <C>max-width</C>, which would lose to{' '}
                <C>min-width</C> in a conflict.
              </p>
              <p>
                <strong>JS</strong> (<C>useViewportClamp</C> in Header.tsx): on open, measure the panel with its
                transform removed, and if its left edge is inside a 16px gutter, shift it right by the
                difference; if its right edge is, shift it left. Apply as <C>transform: translateX(…px)</C>.
                Re-measure on <C>resize</C> and on <C>scroll</C> (passive) — the compact header re-spaces the
                nav, which moves every panel&rsquo;s anchor.
              </p>
            </DevNote>

            <DevNote>
              <p>
                <strong>Menus.</strong> The main nav is Drupal&rsquo;s Main navigation menu, rendered by a menu
                block at depth 2 into a <C>menu--main.html.twig</C> override: each top-level link gives{' '}
                <C>{'{{ item.title }}'}</C>, <C>{'{{ item.url }}'}</C>, <C>{'{{ item.in_active_trail }}'}</C>{' '}
                (drives the gold rule and <C>aria-current</C>) and <C>{'{{ item.below }}'}</C> (the panel links).
                The mega-menu CTA is per top-level item, so it belongs on the menu link as fields
                (Menu Item Extras, or a referenced &ldquo;mega-menu promo&rdquo; block): eyebrow, headline,
                body, CTA label + link, image (media), image layout (<C>banner</C> | <C>side</C>), and an
                align-right flag. Archives, Events and Ship&rsquo;s Store are a second &ldquo;Utility&rdquo;
                menu (Archives at depth 2 for its dropdown). The mobile menu renders the same two menus, not a
                third copy.
              </p>
              <p>
                <strong>Variables.</strong> Cart count from Commerce (<C>{'{{ cart_count }}'}</C>; omit the badge
                at 0). Login/Register vs My Account from <C>{'{{ logged_in }}'}</C> — the prototype keys it off the
                URL. Logos are theme assets, not content.
              </p>
              <p>
                <strong>Behaviours</strong> (one Drupal behavior, <C>Drupal.behaviors.siteHeader</C>): toggle an{' '}
                <C>is-scrolled</C> state on the header when <C>window.scrollY &gt; 10</C> (the prototype swaps
                class lists — in Twig, emit both states and switch with a state class); hover-intent open with a
                120ms close delay; the viewport clamp above; the search flydown (focus the input on open,
                Escape and backdrop click close it, type-ahead from a Search API autocomplete endpoint rather
                than the prototype&rsquo;s hard-coded list); the mobile menu (body scroll lock, one section
                open at a time).
              </p>
              <p>
                <strong>Accessibility — gaps the prototype leaves.</strong> Panels open on hover only: the
                top-level link carries <C>aria-expanded</C> but nothing opens it from the keyboard. Production
                needs a disclosure control per item (a separate toggle button beside the link, or the link
                becoming a button) with <C>aria-expanded</C> and <C>aria-controls</C>, Escape to close and
                return focus, and the panel kept open while focus is inside it. The hamburger needs{' '}
                <C>aria-expanded</C>/<C>aria-controls</C>; the off-canvas menu needs <C>role="dialog"</C>,{' '}
                <C>aria-modal="true"</C>, a focus trap, Escape, and focus returned to the hamburger on close.
                The search input sets <C>aria-autocomplete</C> and <C>aria-expanded</C> without{' '}
                <C>role="combobox"</C>, <C>aria-controls</C> or arrow-key movement through the list — either
                implement the combobox pattern fully or drop those attributes. Its <C>outline-none</C> needs a
                visible focus ring.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/components/layout/Header.tsx', note: 'Header, NavLink, MegaMenuPanel + useViewportClamp, SimpleDropdown, SearchFlydown, MobileMenu' },
                { path: 'src/data/homepage.ts', note: 'navItems (labels, links, megaCta, alignRight) and archivesDropdown' },
                { path: 'src/pages/design-system/preview/HeaderPreview.tsx', note: 'the iframe route; ?previewNavOpen / ?previewMobileOpen / ?previewSearchOpen force a state open' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────── Footer ─────────────────────────────── */}
        <DocSection title="Footer">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-8 max-w-2xl">
            Logo and contact info, two link columns, and a newsletter signup card sit side by side on
            desktop. Below <code className="font-mono text-xs bg-neutral-subtlest px-1 py-0.5">lg</code>,
            they stack vertically; the bottom bar (copyright, legal links, social icons) stacks below{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1 py-0.5">sm</code>.
          </p>

          <BreakpointLabel device="desktop">Desktop — Minimum: 1024px</BreakpointLabel>
          <div className="mb-10">
            <LazyFrame
              src="/design-system/preview/footer"
              width={1200}
              height={725}
              title="Footer — desktop"
              className="border border-border-light bg-white p-6"
            />
          </div>

          <BreakpointLabel device="mobile">Mobile — Maximum: 1023px</BreakpointLabel>
          <div className="mb-10">
            <LazyFrame
              src="/design-system/preview/footer"
              width={375}
              height={1714}
              title="Footer — mobile"
              className="border border-border-light bg-white p-6"
            />
          </div>

          <div className="flex flex-col gap-8">
            <LiveMarkup label="Markup (rendered inline at this window's width)" previewClassName="bg-white p-0" defaultOpen={false}>
              <Footer />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Footer', classes: 'text-white py-[80px]', note: <>Background is an inline <C>radial-gradient(ellipse at 50% 0%, #023E7D 0%, #012B61 50%, #001845 100%)</C> — navy-subtle to navy-bolder through #012B61, which has no token. Inner: <C>container-site</C>.</> },
                { part: 'Top row', classes: 'flex flex-col lg:flex-row gap-16 pb-16', note: 'Stacks below lg.' },
                { part: 'Logo + address', classes: 'flex-shrink-0 lg:w-[225px]', note: <>Logo <C>h-[69px] w-auto</C>. Address block <C>mt-7 font-body text-[20px] text-white leading-[1.4]</C>; email links <C>text-light-blue underline hover:text-white transition-colors</C>.</> },
                { part: 'Link columns', classes: 'flex flex-col md:flex-row flex-1 gap-10', note: 'Side by side from md; each column flex-1 min-w-0.' },
                { part: 'Column heading', classes: 'font-headline text-[24px] text-tan-subtlest not-italic leading-[1.3]', note: <>Followed by a rule <C>block h-[2px] w-[55px] bg-tan mt-2</C>. A <C>{'<p>'}</C>, not a heading.</> },
                { part: 'Column link', classes: 'flex items-center gap-1.5 min-h-[44px] font-body font-normal text-base text-white/90 hover:text-white hover:underline underline-offset-2 transition-colors', note: '44px rows for touch. External links get the glyph and sr-only new-tab text.' },
                { part: 'Newsletter card', classes: 'bg-navy-boldest border border-navy-bolder px-8 py-16 flex flex-col items-center text-center gap-6', note: <>In a <C>flex-shrink-0 lg:w-[334px]</C> column. Heading <C>font-headline text-[36px] text-white not-italic leading-[1.2]</C>.</> },
                { part: 'Newsletter CTA', classes: 'flex items-center justify-center gap-2 w-full bg-gold text-navy-bolder font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-gold-dark transition-colors', note: 'Links to the hosted Mailchimp form, new tab. Deliberately the /subscribe URL, not /subscribe/post — see the comment in Footer.tsx.' },
                { part: 'Gold divider', classes: 'h-px w-full bg-gold-subtle' },
                { part: 'Bottom bar', classes: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6', note: <>Legal links <C>font-body font-bold text-base text-white underline hover:text-white/70 transition-colors</C>.</> },
                { part: '“Connect with us”', classes: 'font-body font-medium text-[18px] text-tan-subtle uppercase tracking-[0.06em] whitespace-nowrap', note: <>Trailing rule <C>w-[131px] h-px bg-tan-subtle hidden sm:block flex-shrink-0</C>.</> },
                { part: 'Social link', classes: 'flex items-center justify-center w-16 h-16 hover:opacity-70 transition-opacity', note: <>64px target, 32px icon (<C>w-8 h-8</C>).</> },
              ]}
            />

            <DevNote>
              <p>
                The two columns are two Drupal menus (&ldquo;Footer — About USNI&rdquo;, &ldquo;Footer — Content
                &amp; Resources&rdquo;) rendered by menu blocks, each heading being the block label{' '}
                <C>{'{{ label }}'}</C>. The address, phone and emails, the newsletter card copy and URL, the
                copyright year, the legal links and the social links are site-wide settings or blocks, not
                hard-coded — the social links are best a third small menu. No JavaScript.
              </p>
              <p>
                Accessibility: wrap each link column in <C>{'<nav aria-label="…">'}</C> and make the column
                headings real headings — the prototype has neither. The social links set both{' '}
                <C>aria-label</C> on the link and <C>alt</C> on the icon to the same name; keep one (the{' '}
                <C>aria-label</C>, with <C>alt=""</C>).
              </p>
            </DevNote>

            <SourceList title="Where it lives" items={[{ path: 'src/components/layout/Footer.tsx' }, { path: 'src/pages/design-system/preview/FooterPreview.tsx', note: 'the iframe route' }]} />
          </div>
        </DocSection>

        {/* ─────────────────────────── Section Sub-Nav ─────────────────────────── */}
        <DocSection title="Section Sub-Nav">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            The tan bar that sits under the site header on an interior page — the section's own pages
            as a centred row on desktop, and a labelled toggle below{' '}
            <code className="font-mono text-sm">lg</code>. Proceedings, Naval History, Books &amp; Press,
            About, Archives, and Essay Contests each still carry a hand-written copy of this markup;
            this is the shared component they can move to, and the one Giving uses. Active state is
            derived from the current path — <code className="font-mono text-sm">exact</code> for a
            landing tab whose href prefixes its siblings, <code className="font-mono text-sm">matchPrefix</code>{' '}
            for a tab whose child pages live elsewhere.
          </p>

          <div className="flex flex-col gap-8">
            <LiveMarkup label="Desktop — Giving, on /giving/donor-recognition (active tab underlined; JCTCC is a shortLabel)" previewClassName="bg-white p-0 overflow-x-auto">
              <AtPath path="/giving/donor-recognition"><GivingSubNav /></AtPath>
            </LiveMarkup>

            <LiveMarkup label="With an external link — the Archives list, on /archives" previewClassName="bg-white p-0 overflow-x-auto">
              <AtPath path="/archives"><SectionSubNav label="Archives" items={archivesItems} /></AtPath>
            </LiveMarkup>

            <div>
              <BreakpointLabel device="mobile">Mobile — 375px, on the live Giving page</BreakpointLabel>
              <LazyFrame
                src="/giving"
                width={375}
                height={150}
                title="Giving page header and section sub-nav at 375px"
                className="border border-border-light bg-white p-6"
              />
              <p className="font-body text-sm text-neutral-subtle leading-relaxed mt-3 max-w-2xl">
                The toggle bar is in the markup above (<C>lg:hidden</C>); its list renders only once the toggle
                is pressed, so the open list cannot be snapshotted — its classes are in the table below.
              </p>
            </div>

            <ClassTable
              rows={[
                { part: 'Bar', classes: 'border-b border-[#B8B49A]', note: <>Background is an inline <C>background-color: #E0E0CC</C>. Neither tan has a token — the nearest, <C>tan-subtle</C> #D9D7BF, is visibly different. Full width; not inside <C>container-site</C>.</> },
                { part: 'Mobile toggle', classes: 'flex items-center justify-center gap-3 w-full h-[53px] px-4', note: <>Wrapper <C>lg:hidden</C>. Hamburger icon swaps to × when open (inline SVG, <C>w-5 h-5 flex-shrink-0 text-navy-bolder</C>). <C>aria-expanded</C>, <C>aria-label="Toggle {'{section}'} section menu"</C>.</> },
                { part: 'Toggle label', classes: 'font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-bolder', note: 'The section name.' },
                { part: 'Mobile list', classes: 'border-t border-[#B8B49A]', note: <><C>{'<nav aria-label="{section} section navigation">'}</C>, rendered only while open. A link press closes it.</> },
                { part: 'Mobile link', classes: 'flex items-center gap-1.5 px-6 py-3.5 font-body font-semibold text-sm border-b border-[#C8C4A8] last:border-0 transition-colors', note: <>Active: <C>text-navy-boldest bg-[#D4D0BA]</C>. Otherwise <C>text-navy-bolder hover:text-navy-subtle hover:bg-[#D4D0BA]</C>. Always the full label. #C8C4A8 and #D4D0BA are further untokened tans.</> },
                { part: 'Desktop row', classes: 'hidden lg:flex items-center justify-center gap-8 py-4 flex-wrap px-6', note: <><C>flex-wrap</C> is load-bearing: a section with many long labels wraps to a second centred line at 1024px rather than overflowing.</> },
                { part: 'Desktop link', classes: 'font-body font-semibold text-sm whitespace-nowrap transition-colors', note: <>Active: <C>text-navy-boldest link-underline-always</C> — a 1px currentColor underline at rest that redraws on hover. Otherwise <C>text-navy-bolder hover:text-navy-subtle link-underline-hover</C> — the underline sweeps in on hover. A <C>shortLabel</C> shows abbreviated with the full name as <C>aria-label</C> and <C>title</C>.</> },
                { part: 'External marker', classes: 'relative -top-px', note: <>On the ExternalLinkIcon, after a space, plus <C>{'<span class="sr-only">(opens in a new tab)</span>'}</C>; the link gets <C>target="_blank" rel="noopener noreferrer"</C> and is never active.</> },
              ]}
            />

            <CodeBlock code={`import SectionSubNav from '@/components/layout/SectionSubNav'

<SectionSubNav
  label="Giving"
  items={[
    { label: 'Overview', href: '/giving', exact: true },
    { label: 'Donor Recognition', href: '/giving/donor-recognition' },
    { label: 'Photos', href: 'https://photos.usni.org', external: true },
  ]}
/>`} />
            <PropsTable
              rows={[
                { name: 'label', type: 'string', description: "Required. The section's name — labels the mobile toggle and both nav landmarks." },
                { name: 'items', type: 'SectionNavItem[]', description: 'Required. Each item takes label and href.' },
                { name: 'items[].shortLabel', type: 'string', description: 'Desktop-only abbreviation; the full label stays the accessible name and tooltip, and the mobile list always spells it out.' },
                { name: 'items[].exact', type: 'boolean', default: 'false', description: "Match the path exactly. Needed on a landing tab whose href is a prefix of every sibling page." },
                { name: 'items[].matchPrefix', type: 'string', description: "Stay active across pages under this prefix, when they don't sit beneath the item's own href." },
                { name: 'items[].external', type: 'boolean', default: 'false', description: 'Opens in a new tab and gets the external-link marker.' },
              ]}
            />

            <DevNote>
              <p>
                One template, one Drupal menu per section (&ldquo;Giving&rdquo;, &ldquo;Proceedings&rdquo;, …)
                placed by a menu block on that section&rsquo;s pages, depth 1. <C>{'{{ label }}'}</C> is the
                block label; each item gives <C>{'{{ item.title }}'}</C>, <C>{'{{ item.url }}'}</C> and{' '}
                <C>{'{{ item.in_active_trail }}'}</C>. Drupal&rsquo;s active trail replaces the
                prototype&rsquo;s path matching, but the edge cases the copies solved still need covering: a
                landing tab must not light up on every child (<C>exact</C>), and a tab can need to stay lit on
                pages outside its own path — Books&rsquo; PME tab owns <C>/books/series</C> and{' '}
                <C>/books/military-reading-lists</C>, two prefixes, which the shared <C>matchPrefix</C> (one
                string) cannot express yet. Use menu-link fields or Menu Trail By Path for those. A short label
                and an external flag are menu-link fields too.
              </p>
              <p>
                JS: only the mobile toggle (a Drupal behavior flipping <C>aria-expanded</C> and the list&rsquo;s
                <C> hidden</C> attribute). Give the toggle <C>aria-controls</C> pointing at the mobile list —
                the prototype omits it — and mark the active link <C>aria-current="page"</C>, which the
                underline alone does not convey.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/layout/SectionSubNav.tsx', note: 'the spec — current, and the only copy with shortLabel and external support built in' },
                { path: 'src/sections/GivingSubNav.tsx', note: 'already a thin wrapper around it' },
              ]}
            />
            <SourceList
              title="Drift — hand-written copies of the same bar"
              tone="drift"
              items={[
                { path: 'src/sections/BooksSubNav.tsx', note: <>mobile toggle is left-aligned (<C>gap-3 w-full h-[53px] px-6 text-left</C>, no <C>justify-center</C>); toggle reads &ldquo;Books &amp; Press&rdquo; but both landmarks say &ldquo;Books&rdquo;; <C>alsoActiveUnder</C> takes several prefixes; mobile links are <C>block</C>. Its Oral Histories link leaves the section for <C>/archives/oral-histories</C>, where the main nav and footer point too.</> },
                { path: 'src/sections/AboutSubNav.tsx', note: <>identical markup; landing-tab exact match hard-coded for <C>/about</C>; mobile links <C>block</C> rather than <C>flex items-center gap-1.5</C>.</> },
                { path: 'src/sections/ProceedingsSubNav.tsx', note: <>identical markup, plain prefix matching, no landing tab; mobile links <C>block</C>.</> },
                { path: 'src/sections/NavalHistorySubNav.tsx', note: 'same as Proceedings.' },
                { path: 'src/sections/ArchivesSubNav.tsx', note: <>the closest copy — same external handling; landing tab excluded from prefix matching by an <C>href !== '/archives'</C> check (equivalent to <C>exact</C>). Links <C>/archives/oral-histories</C> and <C>/archives/memoirs</C>, where the header&rsquo;s Archives dropdown uses <C>/archive/…</C>.</> },
                { path: 'src/sections/EssayContestsSubNav.tsx', note: <>its own <C>matchPrefix</C> means <C>pathname.startsWith(prefix)</C> with no trailing slash and no own-href check — different semantics from the shared prop of the same name (no item sets it today); mobile links <C>block</C>.</> },
                { path: 'src/sections/ArticleSubNav.tsx', note: <>a different variant and unused (nothing imports it): <C>border-b-4 border-navy-boldest</C> instead of the tan rule; desktop row left-aligned in <C>container-site</C> with a bold uppercase &ldquo;Proceedings&rdquo; link and a divider before the items; fixed <C>h-[62px] overflow-hidden</C>, so it clips instead of wrapping; mobile list rule <C>border-navy-boldest/20</C>. Don&rsquo;t build it.</> },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────── Jump Link Nav ─────────────────────────── */}
        <DocSection title="Jump Link Nav">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A sticky in-page navigation for long pages built from several stacked sections — Giving, Contact,
            Leadership, the reading lists, the Sea Power Project. White, so it never reads as a second
            section sub-nav; it links to anchors on the same page and highlights the section being read.
            On mobile it is a toggle labelled &ldquo;On this page&rdquo;.
          </p>
          <div className="flex flex-col gap-8">
            <LiveMarkup label="Desktop — the Giving page's links (first section active)" previewClassName="bg-white p-0 overflow-x-auto">
              <GivingJumpNav />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Nav', classes: 'bg-white border-b border-border-light sticky top-[86px] z-30', note: <><C>aria-label="Page sections"</C>. <C>top-[86px]</C> is the compact desktop header&rsquo;s height (84px below 1330px, 87px above), so the bar docks just under it once the utility bar has collapsed. On mobile the header is 81px, leaving a 5px slot. <C>z-30</C> sits under the header&rsquo;s <C>z-40</C>.</> },
                { part: 'Mobile toggle', classes: 'flex items-center justify-center gap-3 w-full h-[53px] px-4', note: <>Same build as the sub-nav toggle, label &ldquo;On this page&rdquo; (<C>mobileLabel</C>). <C>aria-label="Toggle page section links"</C>.</> },
                { part: 'Mobile list', classes: 'border-t border-border-light', note: 'Rendered only while open.' },
                { part: 'Mobile link', classes: 'block px-6 py-3.5 font-body font-semibold text-sm border-b border-border-light last:border-0 transition-colors', note: <>Current section: <C>text-navy-boldest bg-surface-subtle</C>; otherwise <C>text-navy-bolder hover:text-[#0466c8]</C> (navy-bright).</> },
                { part: 'Desktop list', classes: 'flex justify-center items-stretch gap-0', note: <>Inside <C>hidden lg:block container-site</C>. Each <C>{'<li class="flex-shrink-0">'}</C>. No wrap — keep labels short.</> },
                { part: 'Desktop link', classes: 'link-underline-hover relative flex items-center font-body font-bold text-[17px] text-navy-bolder px-8 py-5 whitespace-nowrap hover:text-[#0466c8] transition-colors', note: <>Current section adds a 3px gold bar on the bottom edge: <C>after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-gold</C>, and <C>aria-current="true"</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                <strong>Content.</strong> Links are <C>{'{{ label }}'}</C> + <C>#{'{{ anchor }}'}</C> pairs. On
                a Paragraphs-built page, generate them from the section paragraphs that carry an anchor-id
                field, so a renamed or removed section cannot leave a dead link.
              </p>
              <p>
                <strong>JS (Drupal behavior).</strong> Click: find the target; if it is missing, let the browser
                handle the fragment. Otherwise prevent default, close the mobile list, and scroll to the
                target&rsquo;s top minus the nav&rsquo;s computed <C>top</C> plus its own height — so targets
                don&rsquo;t need a <C>scroll-mt-*</C> each. Use <C>behavior: 'smooth'</C> unless{' '}
                <C>prefers-reduced-motion: reduce</C>, and <C>history.replaceState</C> the hash so the URL is
                shareable without a second jump. Scroll spy: on scroll, the current section is the last one
                whose top has passed 200px from the viewport top; before any has, the first.
              </p>
              <p>
                <strong>Accessibility.</strong> Use <C>aria-current="location"</C> rather than{' '}
                <C>"true"</C> — it names what kind of current this is. Give the mobile toggle{' '}
                <C>aria-controls</C>.
              </p>
            </DevNote>

            <SourceList
              title="Where it lives"
              items={[
                { path: 'src/components/ui/JumpLinkNav.tsx' },
                { path: 'src/sections/GivingJumpNav.tsx', note: 'Giving’s link list' },
                { path: 'src/pages/Contact.tsx, AboutLeadership.tsx, BooksReadingLists.tsx, SeaPowerProject.tsx, GivingSocietiesAnnual.tsx', note: 'the other pages that render it' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────── Tab Nav ─────────────────────────────── */}
        <DocSection title="Tab Nav">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A row of labels over a hairline rule, the selected one carrying a blue underline and a tan
            ground. The treatment comes from the author tabs on a book product page, which was the only
            place the site had tabs; the donor listings on the recognition society pages render the same
            component, so there is one tab bar rather than two that drift.
          </p>
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            Keyboard behaviour follows the tabs pattern: arrow keys move between tabs, Home and End jump
            to the ends, and only the selected tab is in the tab order — a keyboard user tabs past the
            bar rather than through every label. Try it below.
          </p>

          <div className="flex flex-col gap-8">
            <LiveMarkup label="Live" previewClassName="bg-surface-subtle p-8">
              <TabNavDemo />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Tab list', classes: 'flex flex-wrap gap-1 border-b border-navy-bolder/20', note: <><C>role="tablist"</C> with an <C>aria-label</C>. Wraps on narrow screens; caller adds margins via <C>className</C>.</> },
                { part: 'Tab', classes: 'px-5 py-3 font-body font-semibold text-sm text-left sm:whitespace-nowrap border-b-2 -mb-px transition-colors', note: <><C>-mb-px</C> lays the 2px underline over the list&rsquo;s 1px rule. Labels may wrap below <C>sm</C> (long author names).</> },
                { part: 'Tab — selected', classes: 'border-[#0466C8] text-navy-bolder bg-[#E0E0CC]', note: <><C>aria-selected="true"</C>, <C>tabIndex=0</C>. #0466C8 = navy-bright; #E0E0CC is the sub-nav tan (no token).</> },
                { part: 'Tab — unselected', classes: 'border-transparent text-navy-bolder/40 hover:text-navy-bolder/70', note: <><C>tabIndex=-1</C>. 40% navy on white is about 2.6:1 — below 4.5:1 for 14px text; worth raising in production.</> },
              ]}
            />

            <DevNote>
              <p>
                Tab labels and panels are content (<C>{'{{ tab.label }}'}</C>, one panel per tab — e.g. one per
                donor-listing year, one per book author). Render every panel server-side and hide the inactive
                ones with <C>hidden</C>, so each tab&rsquo;s <C>aria-controls</C> points at an element that
                exists (in the prototype only the active panel is in the DOM). Ids are{' '}
                <C>tab-{'{id}'}</C> / <C>tabpanel-{'{id}'}</C>; prefix them per instance in Twig if two tab sets
                can share a page.
              </p>
              <p>
                JS: click selects; ArrowLeft/ArrowRight move (clamped, not wrapping), Home/End jump; focus
                follows selection (automatic activation); roving <C>tabindex</C>.
              </p>
            </DevNote>

            <CodeBlock code={`import TabNav, { panelId, tabId } from '@/components/ui/TabNav'

const [active, setActive] = useState('2024')

<TabNav
  label="Donor listing by year"
  tabs={years.map((y) => ({ id: y.year, label: y.year }))}
  activeId={active}
  onChange={setActive}
/>
<div role="tabpanel" id={panelId(active)} aria-labelledby={tabId(active)}>
  ...
</div>`} />
            <PropsTable
              rows={[
                { name: 'tabs', type: 'TabItem[]', description: 'Required. Each takes an id (stable key, and the basis of the tab/panel element ids) and a label.' },
                { name: 'activeId', type: 'string', description: "Required. The selected tab's id — the component is controlled." },
                { name: 'onChange', type: '(id: string) => void', description: 'Required. Called with the newly selected id, by click or arrow key.' },
                { name: 'label', type: 'string', description: 'Required. Accessible name for the tab list, e.g. "Donor listing by year".' },
                { name: 'className', type: 'string', description: 'Extra layout classes on the bar, typically a margin.' },
              ]}
            />

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/TabNav.tsx' },
                { path: 'src/sections/BookProductAuthorBios.tsx, src/sections/SocietyDonorListing.tsx', note: 'the two callers' },
              ]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/ArticleAuthorBio.tsx', note: 'multi-author articles hand-roll the same tab classes as plain buttons — no tablist/tab roles, no aria-selected, no keyboard pattern. Build it on the one tab template.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ───────────────────────────── Breadcrumb ───────────────────────────── */}
        <DocSection title="Breadcrumb">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            Every interior page header carries one. Below <code className="font-mono text-sm">sm</code>{' '}
            it collapses to a single back-link — a left chevron and the immediate parent — because the
            last crumb is a page title, and a full trail wraps to three lines above the headline it is
            meant to sit under. From <code className="font-mono text-sm">sm</code> up the whole trail
            renders. Both forms are in the DOM and switched with{' '}
            <code className="font-mono text-sm">hidden</code>, which takes the inactive one out of the
            accessibility tree too.
          </p>

          <div className="flex flex-col gap-8">
            <LiveMarkup label="Full trail (sm and up) — light tone, on a light-blue hero" previewClassName="bg-[#ebf4ff] p-6">
              <Breadcrumb
                trail={[
                  { label: 'Home', href: '#' },
                  { label: 'Books & Press', href: '#' },
                ]}
                current="Studies in Marine Corps History and Amphibious Warfare"
              />
            </LiveMarkup>

            <LiveMarkup label="On a dark panel — dark tone, with homeIcon" previewClassName="bg-navy-boldest p-6">
              <Breadcrumb
                trail={[
                  { label: 'Home', href: '#' },
                  { label: 'Proceedings', href: '#' },
                ]}
                current="April 2026 Issue"
                tone="dark"
                homeIcon
              />
            </LiveMarkup>

            <div>
              <BreakpointLabel device="mobile">Mobile — below 640px, the back-link only</BreakpointLabel>
              <LazyFrame
                src="/books/new-releases"
                width={375}
                height={250}
                title="New Releases page at 375px, showing the collapsed breadcrumb"
                className="border border-border-light bg-white p-6"
              />
              <p className="font-body text-sm text-neutral-subtle leading-relaxed mt-3 max-w-2xl">
                The back-link is the first element in each snippet above (<C>sm:hidden</C>); the full trail
                follows it (<C>hidden sm:flex</C>). The frame also shows the Books sub-nav&rsquo;s
                left-aligned mobile toggle — one of the drifts listed under Section Sub-Nav; compare the centred
                Giving toggle there.
              </p>
            </div>

            <ClassTable
              rows={[
                { part: 'Nav', classes: 'text-sm', note: <><C>{'<nav aria-label="Breadcrumb">'}</C>. The caller adds the rule and spacing — on light-blue heroes <C>pb-4 border-b border-[#C2DDFF]</C> (= <C>border-light-blue</C>).</> },
                { part: 'Mobile back-link', classes: 'sm:hidden inline-flex items-center gap-1.5', note: <>Plus the tone&rsquo;s link classes. Chevron <C>fa-solid fa-chevron-left text-[10px]</C>. Points at the last crumb in the trail (the parent).</> },
                { part: 'Full trail', classes: 'hidden sm:flex flex-wrap items-center gap-x-2 gap-y-1' },
                { part: 'Crumb group', classes: 'inline-flex items-center gap-x-2', note: 'One per ancestor: the link, then a “/” separator.' },
                { part: 'Crumb link — light', classes: 'font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors', note: <>In the trail it adds <C>inline-flex items-center gap-1.5</C>.</> },
                { part: 'Crumb link — dark', classes: 'font-body font-bold text-light-blue hover:text-white transition-colors' },
                { part: 'Home icon', classes: 'fa-solid fa-house text-[10px]', note: <><C>homeIcon</C> only, first crumb only, <C>aria-hidden</C>.</> },
                { part: 'Separator', classes: 'text-neutral-subtle', note: <>Dark: <C>text-white/40</C>.</> },
                { part: 'Current page', classes: 'font-body italic text-neutral-subtle', note: <>Dark: <C>font-body italic text-[#f4f4f6]</C> (= <C>neutral-subtlest</C>). Text, never a link.</> },
              ]}
            />

            <DevNote>
              <p>
                Override <C>breadcrumb.html.twig</C> for the system breadcrumb block. Each crumb is{' '}
                <C>{'{{ item.text }}'}</C> / <C>{'{{ item.url }}'}</C>; the back-link is the last item.
                Core&rsquo;s path-based breadcrumb leaves out the current page, so append{' '}
                <C>{'{{ page_title }}'}</C> in preprocess (or use Easy Breadcrumb). Tone is a template
                variable set by the hero it sits in (<C>light</C> on light-blue and white heroes,{' '}
                <C>dark</C> on navy or photo heroes). No JavaScript.
              </p>
              <p>
                Accessibility: add <C>aria-current="page"</C> to the current-page span — the prototype
                doesn&rsquo;t — and mark the separators <C>aria-hidden="true"</C> so they aren&rsquo;t read as
                &ldquo;slash&rdquo;.
              </p>
            </DevNote>

            <CodeBlock code={`import Breadcrumb from '@/components/ui/Breadcrumb'

<Breadcrumb
  trail={[
    { label: 'Home', href: '/' },
    { label: 'Books & Press', href: '/books' },
  ]}
  current="New Releases"
  className="pb-4 border-b border-[#C2DDFF]"
/>`} />

            <PropsTable
              rows={[
                { name: 'trail', type: 'Crumb[]', description: 'Ancestors, outermost first. The last one is what the mobile back-link points at.' },
                { name: 'current', type: 'string', description: 'The page being viewed. Rendered as text, never a link.' },
                { name: 'tone', type: "'light' | 'dark'", default: "'light'", description: 'Use dark on a navy panel or over a photo.' },
                { name: 'homeIcon', type: 'boolean', default: 'false', description: 'House glyph beside the first crumb.' },
                { name: 'className', type: 'string', description: 'Wrapper layout — the dividing rule and its padding live here.' },
              ]}
            />

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/Breadcrumb.tsx', note: 'replaced fourteen hand-rolled copies' }]} />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/ArticleHeader.tsx', note: <>the article pages&rsquo; own breadcrumb: links <C>text-navy-bolder hover:text-navy-subtle</C> (not navy-subtle), separators <C>text-neutral-subtle/40</C>, current crumb not italic and truncated at <C>max-w-[320px]</C>, <C>aria-label="breadcrumb"</C>, and no mobile collapse. See the Article &amp; Media sheet.</> },
              ]}
            />
          </div>
        </DocSection>

        {/* ────────────────────────── Article Meter Banner ────────────────────────── */}
        <DocSection title="Article Meter Banner">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A fixed, dismissible banner shown on article pages once a non-member approaches their free-article
            limit for the month — Sign in / Join CTAs, inset from the screen edges.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6">
            <Button variant="primary" onClick={() => setMeterVisible(true)}>Show Meter Banner</Button>
          </div>
          {meterVisible && (
            <ArticleMeterBannerDemo onDismiss={() => setMeterVisible(false)} />
          )}

          <div className="flex flex-col gap-8">
            <LiveMarkup label="Proceedings — membership CTA (contained in a box here; on the page it is fixed to the viewport)" previewClassName="p-0 bg-white">
              <div className={FIXED_BOX}>
                <ArticleMeterBanner magazine="Proceedings" articlesRead={2} articlesLimit={3} />
              </div>
            </LiveMarkup>
            <LiveMarkup
              label="Naval History — subscription CTA"
              previewClassName="p-0 bg-white"
              markupFor={<ArticleMeterBanner magazine="Naval History" ctaLabel="Subscribe today" ctaHref="/naval-history/subscribe" />}
            >
              <div className={FIXED_BOX}>
                <ArticleMeterBanner magazine="Naval History" ctaLabel="Subscribe today" ctaHref="/naval-history/subscribe" />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Position', classes: 'fixed bottom-4 inset-x-4 lg:inset-x-9 z-50', note: <>16px inset on mobile, 36px from <C>lg</C>. <C>role="dialog"</C>, <C>aria-label="Membership offer"</C>.</> },
                { part: 'Card', classes: 'relative bg-navy-bolder shadow-[0_0_25px_rgba(0,18,51,0.35)] px-6 py-5 lg:px-10 lg:py-6', note: <>Shadow colour is navy-boldest (#001233) at 35%.</> },
                { part: 'Dismiss', classes: 'absolute top-3 right-3 lg:top-4 lg:right-4 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors', note: <><C>fa-solid fa-xmark text-lg</C>, <C>aria-label="Dismiss"</C>.</> },
                { part: 'Layout', classes: 'flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 pr-8', note: <>Copy above buttons on mobile, beside from <C>lg</C>. <C>pr-8</C> clears the dismiss button.</> },
                { part: 'Count line', classes: 'font-headline text-[20px] lg:text-[24px] text-white leading-[1.25]' },
                { part: 'Explainer', classes: 'font-body text-[14px] lg:text-[15px] text-white/85 leading-[1.5]', note: <>Inline link <C>text-light-blue font-bold underline</C>.</> },
                { part: 'Sign in', classes: 'font-body font-bold text-base text-white border border-white/50 px-6 py-2.5 hover:bg-white hover:text-navy-bolder transition-colors whitespace-nowrap' },
                { part: 'CTA', classes: 'font-body font-bold text-base bg-gold text-navy-bolder px-6 py-2.5 hover:bg-gold-dark transition-colors whitespace-nowrap', note: 'Proceedings sells membership; Naval History sells a subscription.' },
              ]}
            />

            <DevNote>
              <p>
                Variables: <C>{'{{ magazine }}'}</C>, <C>{'{{ articles_read }}'}</C>,{' '}
                <C>{'{{ articles_limit }}'}</C>, <C>{'{{ cta_label }}'}</C>, <C>{'{{ cta_url }}'}</C>. The count
                comes from whatever meters access (server-side, or a metering cookie read by JS) — the banner
                only displays it. Render it only for anonymous visitors under the limit; at the limit the
                paywall below replaces the body instead.
              </p>
              <p>
                JS: the dismiss button removes the banner and remembers that for the session
                (<C>sessionStorage</C>) — the prototype forgets on reload. Leave room at the bottom of the
                page (or at least the footer) so the banner never covers the last lines permanently.
              </p>
              <p>
                Accessibility: it is not modal and takes no focus, so <C>role="dialog"</C> overstates it — use{' '}
                <C>role="region"</C> (or <C>complementary</C>) with the same label. The inline &ldquo;Join
                now&rdquo; link is hard-coded to <C>/membership/join</C> even when the CTA is a Naval History
                subscription; point it at <C>{'{{ cta_url }}'}</C>.
              </p>
            </DevNote>

            <SourceList title="Where it lives" items={[{ path: 'src/components/ui/ArticleMeterBanner.tsx', note: 'rendered at the end of all four article pages' }]} />
          </div>
        </DocSection>

        {/* ─────────────────────────── Article Paywall ─────────────────────────── */}
        <DocSection title="Article Paywall">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            An in-article block shown in place of restricted content once a visitor has used all their
            free articles — the article body fades out above it. An unobscured photo on top with a solid navy
            panel pulled up over it carrying the membership CTA and sign-in link. Live on{' '}
            <a href="/proceedings/three-mefs" className="text-navy-subtle underline">/proceedings/three-mefs</a>.
          </p>
          <div className="flex flex-col gap-8">
            <LiveMarkup label="In the 864px reading column" previewClassName="bg-white p-8">
              <div className="max-w-[864px]">
                <ArticlePaywall />
              </div>
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'overflow-hidden', note: <><C>role="region"</C>, <C>aria-label="Members-only content"</C>.</> },
                { part: 'Photo', classes: 'w-full h-[280px] lg:h-[400px] object-cover object-center', note: <>Decorative: <C>alt=""</C> and <C>aria-hidden</C>. Fixed heights, not an aspect ratio, so the panel overlap is predictable.</> },
                { part: 'Panel', classes: 'relative bg-navy-boldest flex flex-col items-center text-center px-6 py-12 lg:px-12 lg:py-16 -mt-16 lg:-mt-40 mx-5 sm:mx-8 lg:mx-14', note: <>The negative top margin pulls it up over the photo; the side margins let the photo frame it on both sides (the JoinHero offset-card pattern).</> },
                { part: 'Eyebrow', classes: 'font-body font-bold text-eyebrow lg:text-eyebrow-lg uppercase text-gold' },
                { part: 'Headline', classes: 'font-headline text-[26px] lg:text-[32px] text-white leading-[1.25] mt-3 max-w-[560px]', note: <>A <C>{'<p>'}</C>, so it doesn&rsquo;t enter the article&rsquo;s heading outline.</> },
                { part: 'CTA', classes: 'font-body font-bold text-base bg-gold text-navy-bolder px-8 py-3 mt-8 hover:bg-gold-dark transition-colors whitespace-nowrap' },
                { part: 'Sign-in line', classes: 'font-body text-[15px] text-white mt-6', note: <>Link <C>font-bold underline hover:text-light-blue transition-colors</C>.</> },
              ]}
            />

            <DevNote>
              <p>
                Render server-side when access is denied: the body field is truncated to its first paragraphs,
                the last visible one gets the white fade (<C>absolute inset-0 bg-gradient-to-b from-white/0
                via-white/60 to-white pointer-events-none</C>, in ArticleBody — see the Article &amp; Media
                sheet), and this block follows. Never ship the hidden text to the browser and hide it with CSS.
                Copy, CTA URL and image are block settings (<C>{'{{ eyebrow }}'}</C>, <C>{'{{ headline }}'}</C>,{' '}
                <C>{'{{ cta_url }}'}</C>); the sign-in link should return the reader to the article
                (<C>/user/login?destination={'{{ path }}'}</C>). No JavaScript.
              </p>
            </DevNote>

            <SourceList title="Where it lives" items={[{ path: 'src/components/ui/ArticlePaywall.tsx' }, { path: 'src/sections/ArticleBody.tsx', note: 'the restricted prop: truncation, fade and placement' }]} />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}

function ArticleMeterBannerDemo({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div className="relative">
      <ArticleMeterBanner magazine="Proceedings" articlesRead={2} articlesLimit={3} />
      <button
        onClick={onDismiss}
        className="font-body font-bold text-xs text-navy-subtle hover:text-navy-bolder underline"
      >
        Hide preview (the banner itself is fixed to the viewport — dismiss it with its own × or use this)
      </button>
    </div>
  )
}
