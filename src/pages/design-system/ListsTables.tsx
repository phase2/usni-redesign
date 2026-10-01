import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocPageHeader from '@/components/design-system/DocPageHeader'
import DocSection from '@/components/design-system/DocSection'
import LiveMarkup from '@/components/design-system/LiveMarkup'
import ClassTable from '@/components/design-system/ClassTable'
import SourceList from '@/components/design-system/SourceList'
import DevNote from '@/components/design-system/DevNote'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import PastEventsArchive from '@/sections/PastEventsArchive'
import EssayContestsArchive from '@/sections/EssayContestsArchive'
import BookProductDetails from '@/sections/BookProductDetails'
import MembershipComparisonTable from '@/sections/MembershipComparisonTable'
import LeadershipRoster from '@/sections/LeadershipRoster'
import ResultsList, { ResultsCount, type ResultItem } from '@/components/ui/ResultsList'
import Pagination from '@/components/ui/Pagination'
import DonorTable from '@/components/ui/DonorTable'
import { DataTable, Td, Badge } from '@/components/ui/AccountCard'
import { essayContests } from '@/data/essayContests'
import { aiWarfightingBook } from '@/data/bookProductData'
import { annualSocieties } from '@/data/givingSocietyDonors'
import { executiveStaff } from '@/data/leadership'
import { orders, type OrderRecord } from '@/data/account'

/** Three open contests as search results, the shape ResultsList is built for. */
const resultItems: ResultItem[] = essayContests.slice(0, 3).map((c) => ({
  id: c.slug,
  kind: 'Essay Contest',
  title: `${c.year} ${c.title}`,
  href: c.href,
  summary: c.summary,
  meta: [
    { label: 'Deadline', value: c.deadline },
    { label: 'Top prize', value: c.prizes[0].amount },
  ],
}))

const mahan = annualSocieties['alfred-thayer-mahan-society']
const mahanYear = mahan.years[0]

/** Same mapping the Orders page uses for its status badges. */
const STATE_TONE: Record<OrderRecord['state'], 'active' | 'info' | 'muted' | 'warn'> = {
  Completed: 'active',
  Shipped: 'info',
  Processing: 'warn',
  Refunded: 'muted',
}

/** A working pager for the live examples. The snapshot captures the initial page. */
function LivePager({ initial, total }: { initial: number; total: number }) {
  const [page, setPage] = useState(initial)
  return <Pagination label="Example pagination" totalPages={total} page={page} onChange={setPage} />
}

function C({ children }: { children: ReactNode }) {
  return <code className="font-mono text-[13px] bg-neutral-subtlest px-1.5 py-0.5 [overflow-wrap:anywhere]">{children}</code>
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-[760px]">{children}</p>
}

/** Scroll box for full-section previews, so a long listing does not take over the sheet. */
const tallPreview = 'p-0 bg-white max-h-[760px] overflow-y-auto'

export default function ListsTables() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-24">
        <DocPageHeader title="Lists, Tables & Pagination">
          <p>
            How the site lists many things at once. Filterable listing pages have a filter panel, a
            results header, a grid or list of results, and a pager. Below them are the tables (honour
            rolls, product specs, account records, the membership comparison) and the people roster.
          </p>
          <p>
            Every filter, sort, and pager in the prototype runs client-side in React. In Drupal they
            belong to <strong className="text-navy-bolder">Views</strong>: exposed filters and sorts, a
            result summary, and the pager. The notes in each section say which element maps to which Views
            feature.
          </p>
        </DocPageHeader>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Listing page layout">
          <div className="flex flex-col gap-8">
            <Lead>
              The archive layout has a filter panel in a sticky left column, and a results column with a
              count, a sort control, the result cards, and the pager. Below <C>lg</C> the panel stacks
              above the results and collapses behind a toggle. The filters come first in the DOM as well
              as on screen, so reading order and focus order agree at every width. The live example is
              the Past Events archive. Its cards follow the event card on{' '}
              <Link to="/design-system/cards" className="text-link">Cards</Link>.
            </Lead>

            <LiveMarkup label="Past Events archive (scrolls)" previewClassName={tallPreview} defaultOpen={false}>
              <PastEventsArchive />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Section', classes: 'bg-white py-12 lg:py-16' },
                {
                  part: 'Layout row',
                  classes: 'container-site flex flex-col lg:flex-row lg:items-start gap-8 xl:gap-12',
                  note: 'Stacked below lg (1024). lg:items-start is what lets the sticky panel stick. A stretched flex child has no room to travel.',
                },
                { part: 'Filter panel', classes: 'FilterPanel (next section)' },
                { part: 'Results column', classes: 'flex-1 min-w-0', note: 'min-w-0 keeps a wide card grid from forcing the row wider than the container.' },
                {
                  part: 'Results header',
                  classes: 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-border-light mb-4',
                  note: 'The count and sort stack on phones and share a row from sm (640).',
                },
                { part: 'Results count', classes: 'ResultsCount (see “Results count & results list”)' },
                { part: 'Sort group', classes: 'flex items-center gap-2.5' },
                { part: 'Sort label', classes: 'font-body font-semibold text-sm text-navy-bolder whitespace-nowrap', note: 'A real <label for>.' },
                {
                  part: 'Sort select',
                  classes: 'select-field font-body text-base text-navy-bolder border border-[#94A3B8] pl-3.5 py-2 bg-white cursor-pointer outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition min-w-[180px]',
                  note: '.select-field (index.css) draws the chevron. The focus ring is a 3px navy-bright halo at 15%. #94A3B8 has no token. text-base (16px) stops iOS zooming the page on focus.',
                },
                { part: 'Results grid', classes: 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6', note: '1 / 2 / 3 across at base / sm / xl. Still two across at lg, because the sidebar takes 300px.' },
                { part: 'Empty state', classes: 'font-body text-base text-neutral-subtle py-10', note: 'Names the search when there is one (“No events match “{q}”.”), otherwise the facet.' },
                { part: 'Pager wrapper', classes: 'pt-10', note: 'Only rendered when there is more than one page.' },
              ]}
            />

            <DevNote title="For the Drupal build: Views">
              <p>
                One View per archive, with a page display, 12 items per page, and a full pager. The pieces map
                onto Views as follows:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-1">
                <li>
                  <strong>Keyword</strong>: an exposed &ldquo;Combine fields&rdquo; filter, or a Search API
                  fulltext filter if the index is Search API. Identifier <C>q</C>, because other pages link
                  in with <C>?q=</C> (the contest pages do).
                </li>
                <li>
                  <strong>Checkbox facets with counts</strong>: the Facets module on a Search API index
                  gives checkboxes, per-option counts, and a soft limit (&ldquo;See N more&rdquo;) out of the
                  box. Core exposed filters with Better Exposed Filters give checkboxes but no counts.
                </li>
                <li>
                  <strong>Sort</strong>: exposed sorts (newest, oldest, A–Z), rendered as the select above.
                </li>
                <li>
                  <strong>Results count</strong>: a &ldquo;Result summary&rdquo; header area, with text{' '}
                  <C>Showing @start–@end of @total events</C>, wrapped in the bold spans of ResultsCount.
                </li>
                <li>
                  <strong>Empty state</strong>: the &ldquo;No results behavior&rdquo; area.
                </li>
                <li>
                  <strong>Pager</strong>: the full pager, themed as Pagination (below).
                </li>
              </ul>
              <p>
                The prototype applies filters as you type or tick, with no Apply button. In Drupal, either
                enable AJAX with BEF auto-submit (debounce the keyword field) or add an Apply button. Both
                are acceptable. Auto-submit must move nothing under the user&rsquo;s cursor. Any filter
                change returns to the first page, which Views does on its own because the pager
                parameter is dropped on submit.
              </p>
              <p>
                Accessibility: put the results count in a live region (<C>role="status"</C>) so an AJAX
                refresh is announced. The prototype only does this on the student-membership directory.
                Keep filters before results in source order.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[
                { path: 'src/sections/PastEventsArchive.tsx', note: 'layout, keyword, one checkbox facet, sort, pager' },
                { path: 'src/sections/EssayContestsArchive.tsx', note: 'the same layout, plus the “See N more” threshold' },
              ]}
            />
            <SourceList
              title="Drift: other filterable listings"
              tone="drift"
              items={[
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'Its own sidebar, hidden lg:block, so below 1024px the books listing has no filters at all. It also has a “Filter By” heading in font-extrabold text-sm uppercase over border-b-2, a w-[220px] xl:w-[240px] column, a local Accordion without .accordion-row or aria-controls, a type-ahead filter inside long facets, removable filter chips, a “Sort by:” label in neutral-subtle, a border-border-light select, and its own pager (below).' },
                { path: 'src/sections/StudentSchoolDirectory.tsx', note: 'filters inline above the grid rather than in a panel. Labels are font-bold text-xs uppercase navy-subtle, and inputs use border-navy-subtle with a focus outline instead of the halo. Its count line is the only one with role="status".' },
                { path: 'src/sections/ProceedingsAllIssuesGrid.tsx', note: 'year and month selects above the issue grid (uppercase text-sm labels), then a bg-[#C2DDFF] h-px rule (light-blue) and the demo pager' },
                { path: 'src/sections/NavalHistoryAllIssuesGrid.tsx', note: 'the same as Proceedings' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Filter panel">
          <div className="flex flex-col gap-8">
            <Lead>
              <C>FilterPanel</C> is the frame: the &ldquo;Filters&rdquo; heading with its 4px blue rule,
              the active-filter count, Clear all, and the mobile toggle. Its children are the facets. A
              keyword field comes first, then one disclosure per facet holding a checkbox list with a count
              per option. The facet disclosure&rsquo;s row and chevron are the site accordion, documented
              on <Link to="/design-system/accordions" className="text-link">Accordions &amp; Disclosure</Link>.
              This section covers what sits around and inside it.
            </Lead>
            <Lead>
              The example is the essay contest archive. Its Categories facet has 38 options, so the list stops
              at 12 with a &ldquo;See 26 more&rdquo; button. A checked option stays visible when the list
              collapses, so clearing it never means hunting behind &ldquo;See more&rdquo;. Tick a box to see
              the count badge and Clear all appear.
            </Lead>

            <LiveMarkup label="Essay contest archive (scrolls)" previewClassName={tallPreview} defaultOpen={false}>
              <EssayContestsArchive />
            </LiveMarkup>

            <ClassTable
              rows={[
                {
                  part: 'Panel (aside)',
                  classes: 'w-full lg:w-[300px] xl:w-[320px] lg:flex-shrink-0 lg:sticky lg:top-8 flex flex-col gap-5',
                  note: 'Full width when stacked. A 300px column from lg and 320px from xl. Sticks 32px from the top while the results scroll.',
                },
                {
                  part: 'Mobile toggle',
                  classes: 'lg:hidden w-full flex items-center justify-between gap-3 text-left border-b-4 border-[#0466c8] pb-3',
                  note: 'A <button> with aria-expanded and aria-controls pointing at the panel body. Below lg the heading itself is the toggle. Starts closed.',
                },
                { part: 'Heading text', classes: 'font-headline text-[28px] lg:text-[32px] text-navy-bolder leading-[1.15]', note: '“Filters”. A <span> inside the mobile toggle and an <h2> on desktop.' },
                {
                  part: 'Active-count badge',
                  classes: 'font-body font-bold text-xs text-white bg-navy-subtle rounded-full px-2 py-0.5',
                  note: 'Beside “Filters” on mobile, and beside each facet title for that facet’s ticks. One of the few deliberate rounded-full shapes on the site. Hidden at 0.',
                },
                {
                  part: 'Plus / minus box',
                  classes: 'flex-shrink-0 flex items-center justify-center bg-navy-subtle w-7 h-7  ›  svg: w-3.5 h-3.5 text-white',
                  note: 'An inline SVG. The horizontal stroke is always drawn and the vertical one only while closed, so it reads + when closed and − when open. aria-hidden.',
                },
                {
                  part: 'Desktop heading row',
                  classes: 'hidden lg:flex items-center justify-between gap-3 border-b-4 border-[#0466c8] pb-3',
                  note: '#0466c8 = navy-bright.',
                },
                {
                  part: 'Clear all',
                  classes: 'font-body text-sm flex-shrink-0 text-link',
                  note: 'Desktop: in the heading row. Mobile: lg:hidden self-start font-body text-sm text-link, at the top of the open panel. Only shown when a filter is on. .text-link is the site’s inline link.',
                },
                {
                  part: 'Panel body',
                  classes: 'hidden lg:flex flex-col gap-5',
                  note: 'Closed on mobile. When opened, hidden becomes flex. Always flex from lg. The id comes from React’s useId; use a stable id in Twig.',
                },
                { part: 'Keyword facet', classes: 'flex flex-col gap-1.5 border-b border-border-light pb-5', note: 'The rule closes the facet, matching the one under each disclosure.' },
                { part: 'Keyword label', classes: 'font-body font-semibold text-sm text-navy-bolder' },
                { part: 'Search icon', classes: 'fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-subtle', note: 'Inside a relative wrapper. aria-hidden.' },
                {
                  part: 'Keyword input',
                  classes: 'w-full bg-white border border-[#94A3B8] pl-10 pr-3 py-2.5 font-body text-base text-navy-bolder placeholder:text-neutral-subtle outline-none focus:border-navy-bright focus:shadow-[0_0_0_3px_rgba(4,102,200,0.15)] transition',
                  note: 'type="search". The same focus halo as the sort select.',
                },
                { part: 'Facet group', classes: 'border-b border-border-light', note: 'Holds the disclosure button (.accordion-row … px-3 py-3 font-body font-bold text-sm) and its option list. See Accordions.' },
                { part: 'Option list', classes: 'pb-4', note: 'Rendered only while open.' },
                {
                  part: 'Checkbox row',
                  classes: 'flex items-center gap-2.5 py-1.5 cursor-pointer group select-none',
                  note: 'The whole row is the <label>, so the text and count are part of the hit area.',
                },
                { part: 'Checkbox', classes: 'w-4 h-4 flex-shrink-0 accent-navy-bolder', note: 'A native checkbox, tinted with accent-color. It keeps native focus and keyboard behavior.' },
                {
                  part: 'Option text',
                  classes: 'font-body text-sm text-navy-bolder group-hover:text-navy-subtle transition-colors flex-1 leading-snug',
                  note: 'flex-1 pushes the count to the right edge.',
                },
                { part: 'Option count', classes: 'font-body text-xs text-neutral-subtle tabular-nums', note: '“(14)”. tabular-nums lines the digits up down the column.' },
                {
                  part: 'See N more',
                  classes: 'mt-1.5 font-body font-semibold text-xs text-[#0466C8] hover:text-navy-subtle transition-colors  ›  i: fa-solid fa-chevron-down text-[10px] ml-1',
                  note: 'EssayContestsArchive. Shown past 12 options. The chevron flips to fa-chevron-up and the label to “See less”. Should carry aria-expanded.',
                },
              ]}
            />

            <DevNote title="For the Drupal build: behaviour">
              <p>
                <strong>Mobile toggle</strong> (a Drupal behavior): on click, flip <C>aria-expanded</C>, swap{' '}
                <C>hidden</C> ↔ <C>flex</C> on the panel body, and show or hide the SVG&rsquo;s vertical
                stroke. Render it closed by default. If filters are active on load, consider rendering it open
                so the user can see why the results are narrowed.
              </p>
              <p>
                <strong>Facet disclosures</strong> use the accordion behavior. The button needs{' '}
                <C>aria-controls</C> pointing at the option list id. <strong>See N more</strong> is the Facets
                module&rsquo;s soft limit. If built by hand, it toggles a class on options past the 12th
                and must keep checked options visible.
              </p>
              <p>
                <strong>Counts</strong> come from Facets (per option) and from the active query
                (the badges: the number of active filter values plus one for a non-empty keyword).{' '}
                <strong>Clear all</strong> is a plain link to the View&rsquo;s path with no query string
                (Facets&rsquo; &ldquo;Reset&rdquo; or BEF&rsquo;s reset button). Show it only when something
                is applied. Template variables: <C>{'{{ active_count }}'}</C>, <C>{'{{ reset_url }}'}</C>,
                and per option <C>{'{{ label }}'}</C>, <C>{'{{ count }}'}</C>, <C>{'{{ checked }}'}</C>.
              </p>
              <p>
                Wrap each checkbox list in a <C>&lt;fieldset&gt;</C> with a visually hidden{' '}
                <C>&lt;legend&gt;</C> naming the facet. The prototype has none, so a screen reader hears
                &ldquo;Workshop, checkbox&rdquo; without &ldquo;Event Type&rdquo;.
              </p>
            </DevNote>

            <SourceList title="Canonical" items={[{ path: 'src/components/ui/FilterPanel.tsx', note: 'the frame. Facet markup lives in the two archive sections above.' }]} />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/PastEventsArchive.tsx', note: 'AccordionChevron is defined locally here …' },
                { path: 'src/sections/EssayContestsArchive.tsx', note: '… and again here, identically. One shared chevron partial is enough.' },
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'FacetCheckbox matches the checkbox row exactly. The panel around it does not (see the listing drift above). Its FilterChip (inline-flex items-center gap-1.5 bg-surface-subtle border border-border-light px-2.5 py-1 font-body text-xs text-navy-bolder, with an fa-xmark remove button) is the only active-filter chip on the site.' },
              ]}
            />
            <PropsTable
              rows={[
                { name: 'activeCount', type: 'number', description: 'Active filters. Drives the mobile badge and whether Clear all shows.' },
                { name: 'onClearAll', type: '() => void', description: 'Clear all handler.' },
                { name: 'children', type: 'ReactNode', description: 'The facets.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Results count & results list">
          <div className="flex flex-col gap-8">
            <Lead>
              <C>ResultsCount</C> is the &ldquo;Showing 1–12 of 47 events&rdquo; line at the top of every
              paged listing. The range and total are bold navy, and the noun is set per listing.{' '}
              <C>ResultsList</C> is the text-first result row built for site search and mixed listings,
              with a kind label, a title link, a one-line summary, and a row of label/value metadata.
              One row works for contests, articles, books, and issues without each needing its own card.
              It is ready but not yet placed on a page.
            </Lead>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <LiveMarkup label="Count, first page">
                <ResultsCount page={1} perPage={12} total={47} noun="events" />
              </LiveMarkup>
              <LiveMarkup label="Count, a later page">
                <ResultsCount page={4} perPage={12} total={1186} noun="entries" />
              </LiveMarkup>
            </div>

            <LiveMarkup label="Results list">
              <ResultsList items={resultItems} />
            </LiveMarkup>

            <LiveMarkup label="Results list, empty">
              <ResultsList items={[]} emptyMessage="No results match “carrier aviation”. Try a broader keyword." />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Count', classes: 'font-body text-sm text-neutral-subtle  ›  spans: font-semibold text-navy-bolder', note: 'The range uses an en dash. The total is locale-formatted (1,186). Renders nothing when the total is 0, and the empty state speaks instead.' },
                { part: 'List', classes: 'flex flex-col divide-y divide-border-light border-t border-border-light', note: 'A rule above the first row and between rows, none after the last.' },
                { part: 'Row', classes: 'flex flex-col gap-2 py-6', note: 'An <article>.' },
                { part: 'Kind', classes: 'font-body font-semibold text-xs uppercase tracking-[0.1em] text-[#0466c8]', note: '#0466c8 = navy-bright.' },
                { part: 'Title', classes: 'font-headline text-xl lg:text-[24px] text-navy-bolder leading-[1.25]  ›  a: hover:text-[#0466c8] transition-colors', note: 'A color change only, with no underline sweep. That differs from the article teasers and should probably become .article-link.' },
                { part: 'Summary', classes: 'font-body text-base text-neutral-subtle leading-[1.6]' },
                { part: 'Meta', classes: 'flex flex-wrap gap-x-6 gap-y-1 mt-0.5  ›  pair: flex gap-1.5', note: 'A <dl>. Pairs wrap as a unit on narrow screens.' },
                { part: 'Meta label / value', classes: 'dt: font-body text-sm text-neutral-subtle  ·  dd: font-body font-semibold text-sm text-navy-bolder', note: 'The label carries a trailing colon.' },
                { part: 'Empty', classes: 'font-body text-base text-neutral-subtle py-8 border-t border-border-light', note: 'Default text “No results found.”, overridable.' },
              ]}
            />
            <DevNote>
              <p>
                For Search API, a &ldquo;Search result&rdquo; view mode per content type, all rendering this
                row. Fields: <C>{'{{ kind }}'}</C> (bundle label), <C>{'{{ url }}'}</C>, <C>{'{{ title }}'}</C>,{' '}
                <C>{'{{ summary }}'}</C> (or the search excerpt), and a list of <C>{'{{ meta }}'}</C>{' '}
                label/value pairs chosen per bundle. The View&rsquo;s rows wrapper takes the list classes.
                The count is the View&rsquo;s Result summary. No JavaScript.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/components/ui/ResultsList.tsx', note: 'ResultsList, ResultRow, ResultsCount' }]} />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'writes its own count line. When unpaged it reads “Showing 24 results of 61” rather than the range form.' },
                { path: 'src/sections/StudentSchoolDirectory.tsx', note: '“Showing N of M schools”: no range, unbolded numbers, but a live region' },
                { path: 'src/sections/ProceedingsIssueArticles.tsx', note: 'ListArticleRow is a hand-built image-plus-text result row for the issue table of contents (and its Naval History copy)' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Pagination">
          <div className="flex flex-col gap-8">
            <Lead>
              The pager has page numbers in 36px squares, the current page filled navy, and word links at
              either end. It keeps the first and last page reachable plus one page either side of the
              current one, and fills the gaps with an ellipsis. Up to seven pages are shown in full. First
              and Previous are left out on page one, and Next and Last on the final page, rather than
              shown disabled. One component has two modes. Live mode is the working pager. Demo mode
              (no props) is a static 1–5 row that the issue and podcast archives use as a placeholder.
            </Lead>

            <LiveMarkup label="Live: first of 8 pages (click to page through)">
              <LivePager initial={1} total={8} />
            </LiveMarkup>
            <LiveMarkup label="Live: page 6 of 12, gaps on both sides">
              <LivePager initial={6} total={12} />
            </LiveMarkup>
            <LiveMarkup label="Live: last page">
              <LivePager initial={12} total={12} />
            </LiveMarkup>
            <LiveMarkup label="Demo mode (static placeholder)">
              <Pagination label="Archive pagination" />
            </LiveMarkup>

            <ClassTable
              rows={[
                { part: 'Nav', classes: 'flex flex-wrap items-center justify-center gap-2', note: 'A <nav> with an aria-label naming the listing (“Past events pagination”). Wraps onto two lines on a narrow phone rather than scrolling.' },
                {
                  part: 'Page number',
                  classes: 'font-body font-bold text-sm min-w-[36px] h-9 flex items-center justify-center px-2 transition-colors',
                  note: 'At least 36×36px. px-2 lets a three-digit number widen the square.',
                },
                { part: 'Page: other', classes: 'text-navy-bolder border border-[#c4c9d4] hover:bg-surface-subtle', note: '#c4c9d4 = neutral-subtler. Hover is the surface-subtle tint.' },
                { part: 'Page: current', classes: 'bg-navy-bolder text-white', note: 'aria-current="page". No border, so the filled square is the same size as the bordered ones.' },
                {
                  part: 'Word link',
                  classes: 'font-body font-bold text-sm h-9 flex items-center px-3 border border-[#c4c9d4] transition-colors  +  text-navy-bolder hover:bg-surface-subtle',
                  note: '« First, ‹ Previous, Next ›, Last ». The disabled styling (text-neutral-subtle opacity-40 cursor-not-allowed) exists in the component but is never used, because the links are omitted instead.',
                },
                { part: 'Ellipsis', classes: 'font-body font-bold text-sm text-neutral-subtle px-1', note: 'aria-hidden.' },
              ]}
            />

            <DevNote title="For the Drupal build: the pager">
              <p>
                Theme Drupal&rsquo;s full pager (<C>pager.html.twig</C>) to this markup. Its{' '}
                <C>items.first</C>, <C>items.previous</C>, <C>items.pages</C>, <C>items.next</C>,{' '}
                <C>items.last</C>, <C>current</C>, and <C>ellipses</C> map one to one. Set the full pager&rsquo;s
                &ldquo;Number of pager links visible&rdquo; to 3 for the one-page-either-side window. Core does
                not repeat page 1 and the last page as numbers (First/Last stand in for them), so add those two
                in a preprocess if the exact prototype row is wanted. Core already drops First/Previous on the first
                page and Next/Last on the last.
              </p>
              <p>
                In Drupal these are <strong>links</strong> (<C>?page=N</C>, zero-based, so page 2 is{' '}
                <C>?page=1</C>), not the <C>&lt;button&gt;</C>s the prototype&rsquo;s live mode uses. Keep the
                other query parameters on every link so paging never drops the filters. Keep{' '}
                <C>aria-current="page"</C> on the current item, the <C>&lt;nav aria-label&gt;</C>, and the
                visible words on First/Previous/Next/Last. The arrows are text characters, so wrap them in{' '}
                <C>aria-hidden</C> spans. With AJAX paging, move focus to the results heading or count after
                the swap.
              </p>
            </DevNote>

            <SourceList
              title="Canonical"
              items={[{ path: 'src/components/ui/Pagination.tsx', note: 'live in PastEventsArchive and EssayContestsArchive. Demo in the two All Issues grids and ProceedingsPodcastEpisodes.' }]}
            />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/BooksCollectionLayout.tsx', note: 'Pager. Previous/Next with chevron icons in px-4 py-2.5 font-semibold, 40px (w-10 h-10) squares with border-border-light, gap-1. Every page is listed with no ellipsis, the end buttons are shown disabled (disabled:opacity-30), there is no aria-current and no <nav>, and it carries its own mt-12 pt-8 border-t. It is also the only pager that scrolls back to the top on change.' },
              ]}
            />
            <PropsTable
              rows={[
                { name: 'label', type: 'string', description: 'aria-label for the <nav>.' },
                { name: 'totalPages', type: 'number', description: 'Omit (with page/onChange) for the static demo row. Renders nothing when ≤ 1.' },
                { name: 'page', type: 'number', description: 'Current page, 1-based.' },
                { name: 'onChange', type: '(page: number) => void', description: 'Called with the target page.' },
              ]}
            />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="Tables">
          <div className="flex flex-col gap-8">
            <Lead>
              Two table styles are canonical. <strong className="text-navy-bolder">Striped</strong> is for
              public listings. It has a framed, horizontally scrolling table with alternating white and{' '}
              <C>neutral-subtlest</C> rows, and an optional navy header row (DonorTable, and the
              student-membership region totals). <strong className="text-navy-bolder">Ruled</strong> is for
              records inside an account panel. It has a small uppercase header and hairlines between rows
              (DataTable). The product-spec table and the membership comparison are one-offs, documented here
              as they are so their drift is visible.
            </Lead>

            <h3 className="font-headline text-2xl text-navy-bolder">Striped table: DonorTable</h3>
            <Lead>
              A donor honour roll in two columns, filled down each column so the names read
              alphabetically top to bottom. A trailing asterisk marks a deceased donor, and the footnote
              is derived from the names. On the society pages it sits under a year tab bar (TabNav, on{' '}
              <Link to="/design-system/navigation" className="text-link">Navigation</Link>).
            </Lead>
            <LiveMarkup label={`${mahan.title}, ${mahanYear.year}`} defaultOpen={false}>
              <DonorTable
                donors={mahanYear.donors}
                caption={`${mahan.title} donors recognized in ${mahanYear.year}, in alphabetical order`}
              />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Frame', classes: 'border border-border-light overflow-x-auto', note: 'The scroll container. On a phone the table scrolls sideways rather than squeezing.' },
                { part: 'Table', classes: 'w-full min-w-[560px] border-collapse bg-white', note: '560px keeps two rank-and-name columns readable.' },
                { part: 'Caption', classes: 'sr-only', note: 'Names the table for screen readers. The visible heading sits above, outside the table.' },
                { part: 'Row', classes: 'bg-white  /  bg-[#f4f4f6]', note: 'Even rows white, odd rows #f4f4f6 = neutral-subtlest. The stripe starts on the second row.' },
                { part: 'Cell', classes: 'w-1/2 align-top font-body text-[15px] text-neutral-bold leading-[1.5] px-5 py-3', note: 'The right cell adds border-l border-border-light.' },
                { part: 'Footnote', classes: 'font-body text-sm text-neutral-subtle mt-5', note: '“* Deceased”, only when a name carries an asterisk.' },
                {
                  part: 'Header row (variant)',
                  classes: 'tr: bg-navy-bolder  ›  th: font-body font-bold text-[12px] uppercase tracking-[0.06em] text-white px-5 py-3',
                  note: 'StudentSchoolDirectory’s region totals, the one striped table with column headers. th scope="col". Numeric columns use text-right in both th and td. First-column cells there are font-semibold text-navy-bolder.',
                },
              ]}
            />
            <DevNote>
              <p>
                The donor list is one multi-value field (or a View of donor records), split in a preprocess
                function into <C>ceil(n / 2)</C> rows, pairing item <C>i</C> with item <C>i + rows</C>.
                Template variables: <C>{'{{ caption }}'}</C>, <C>{'{{ rows }}'}</C>,{' '}
                <C>{'{{ has_deceased }}'}</C>. If the stripes can go, a <C>&lt;ul class="columns-2"&gt;</C>{' '}
                gives the same column-major order with list semantics, which is more honest for a list of
                names than a table without headers. No JavaScript, but the year tabs above it need the
                TabNav behavior.
              </p>
            </DevNote>
            <SourceList
              title="Canonical"
              items={[
                { path: 'src/components/ui/DonorTable.tsx', note: 'used by SocietyDonorListing and GivingSubPage' },
                { path: 'src/sections/StudentSchoolDirectory.tsx', note: 'the header-row variant (inline, not a component)' },
              ]}
            />

            <h3 className="font-headline text-2xl text-navy-bolder mt-6">Ruled table: DataTable</h3>
            <Lead>
              The account-records table for orders, gifts, and saved payment methods. It sits inside an
              account panel, so it has no frame of its own. The header is small uppercase gray, the rows
              are divided by hairlines, and everything is top-aligned so a wrapped item list does not
              misalign its row. The panel and the status badge are on{' '}
              <Link to="/design-system/account" className="text-link">Account</Link>.
            </Lead>
            <LiveMarkup label="Order history (rows as on the Orders page)">
              <DataTable caption="Your order history" columns={['Order', 'Date', 'Items', 'Total', 'Status']}>
                {orders.slice(0, 4).map((o) => (
                  <tr key={o.number} className="border-b border-[#e8eaed] last:border-b-0">
                    <Td className="font-bold text-navy-bolder whitespace-nowrap">{o.number}</Td>
                    <Td className="whitespace-nowrap">{o.placedOn}</Td>
                    <Td>{o.items}</Td>
                    <Td className="font-bold text-navy-bolder whitespace-nowrap">${o.total.toFixed(2)}</Td>
                    <Td><Badge tone={STATE_TONE[o.state]}>{o.state}</Badge></Td>
                  </tr>
                ))}
              </DataTable>
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Wrapper', classes: 'overflow-x-auto' },
                { part: 'Table', classes: 'w-full min-w-[640px] border-collapse', note: 'Scrolls sideways under 640px of available width.' },
                { part: 'Caption', classes: 'sr-only' },
                { part: 'Header row', classes: 'border-b border-[#c4c9d4]', note: '#c4c9d4 = neutral-subtler.' },
                { part: 'Header cell', classes: 'text-left font-body font-bold text-[12px] uppercase tracking-[0.06em] text-neutral-subtle pb-3 pr-4 last:pr-0', note: 'scope="col". No left padding, so the columns align with the panel’s content edge.' },
                { part: 'Row', classes: 'border-b border-[#e8eaed] last:border-b-0', note: 'Set by the caller. #e8eaed has no token, sitting between border-light and neutral-subtlest.' },
                { part: 'Cell (Td)', classes: 'align-top py-4 pr-4 last:pr-0 font-body text-[15px] text-neutral-subtle', note: 'Key columns add font-bold text-navy-bolder. Dates and money add whitespace-nowrap.' },
              ]}
            />
            <DevNote>
              <p>
                Account data comes from the membership/commerce backend, not Views, so this is a Twig
                partial given <C>{'{{ caption }}'}</C>, <C>{'{{ columns }}'}</C>, and <C>{'{{ rows }}'}</C>.
                Two pages (Giving, Payment) pass an empty column title for a trailing actions column. That
                renders a header cell with no text, so give it a visually hidden label such as
                &ldquo;Actions&rdquo;.
              </p>
            </DevNote>
            <SourceList
              title="Canonical"
              items={[{ path: 'src/components/ui/AccountCard.tsx', note: 'DataTable and Td. Used by AccountOrders, AccountGiving, AccountPayment.' }]}
            />

            <h3 className="font-headline text-2xl text-navy-bolder mt-6">Spec table: Product Details</h3>
            <Lead>
              Label/value pairs for a book (ISBN, publisher, date, series, pages, dimensions), each label
              led by a Font Awesome icon. Striped, but in a warm off-white starting on the first row, and
              with no frame. It sits under the &ldquo;Product Details&rdquo; disclosure, whose header is an
              accordion row (see <Link to="/design-system/accordions" className="text-link">Accordions</Link>).
            </Lead>
            <LiveMarkup label="Book product page" previewClassName="p-0 bg-white" defaultOpen={false}>
              <BookProductDetails book={aiWarfightingBook} />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Table', classes: 'w-full border-collapse', note: 'No frame, caption, or min-width.' },
                { part: 'Row', classes: 'bg-[#f9f9f7]  /  bg-white', note: 'The stripe starts on the first row, the opposite of DonorTable. #f9f9f7 has no token (nearest tan-subtlest #F7F7F2).' },
                { part: 'Label cell', classes: 'py-3.5 px-4 w-[280px] lg:w-[340px]  ›  flex items-center gap-3', note: 'A <td>. It should be <th scope="row">.' },
                { part: 'Icon', classes: 'fa-solid {icon} text-[15px] text-neutral-subtle w-5 text-center flex-shrink-0', note: 'A fixed 20px box, so the labels align. aria-hidden.' },
                { part: 'Label', classes: 'font-body font-semibold text-sm text-navy-bolder' },
                { part: 'Value cell', classes: 'py-3.5 px-4  ›  span: font-body text-sm text-neutral-subtle  |  a: font-body text-sm text-link', note: 'Publisher and series are links.' },
              ]}
            />
            <DevNote>
              <p>
                These are Book fields rendered in a fixed order: <C>{'{{ isbn }}'}</C>, <C>{'{{ publisher }}'}</C>,{' '}
                <C>{'{{ publication_date }}'}</C>, <C>{'{{ series }}'}</C> (optional, linked),{' '}
                <C>{'{{ page_count }}'}</C>, <C>{'{{ dimensions }}'}</C>. Semantically this is a description
                list. Either keep the table and make the label cells <C>&lt;th scope="row"&gt;</C>, or use a{' '}
                <C>&lt;dl&gt;</C> with the same row classes. The disclosure needs the accordion behavior.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/sections/BookProductDetails.tsx' }]} />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/BookProductOverview.tsx', note: 'the same table in the overview’s right column, tightened: py-3 px-3, label cell w-[140px], icon text-[13px] w-4, gap-2.5. Make it one partial with a compact modifier.' },
              ]}
            />

            <h3 className="font-headline text-2xl text-navy-bolder mt-6">Comparison table: membership benefits</h3>
            <Lead>
              The four membership levels compared feature by feature. It has a navy header with each
              plan&rsquo;s price, a gold-tinted recommended column (Full), grouped rows under gray group
              headings, and a blue check or a dash per cell.
            </Lead>
            <LiveMarkup label="Membership page" previewClassName="p-0 bg-white" defaultOpen={false}>
              <MembershipComparisonTable />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Frame', classes: 'border border-navy-bolder overflow-x-auto', note: 'A navy frame, unlike the border-light of the striped table.' },
                { part: 'Table', classes: 'w-full border-collapse', note: 'No min-width, so on a phone the five columns squeeze instead of scrolling. Add min-w-[640px].' },
                { part: 'Header row', classes: 'bg-navy-boldest', note: 'The first th is empty and sized w-[52%]. Plan columns are w-[12%] / w-[9%] / w-[14%] / w-[13%].' },
                { part: 'Plan header', classes: 'border-b border-l border-navy-bolder py-3 px-2  ›  name: font-headline text-xl text-white text-center leading-[1.2]  ·  price: font-body font-bold text-base text-[#ffec99] text-center', note: '#ffec99 = gold-dark.' },
                { part: 'Recommended header', classes: 'bg-[#ffec99] … name: text-navy-bolder  ·  price: text-navy-subtle', note: 'The Full column is inverted onto gold-dark.' },
                { part: 'Group row', classes: 'tr: border-b border-[#c4c9d4]  ›  td colSpan=5: bg-[#f4f4f6] px-4 py-4  ›  span: font-headline text-xl text-navy-bolder', note: 'neutral-subtler rule on a neutral-subtlest ground.' },
                { part: 'Feature cell', classes: 'px-3.5 py-2 font-body text-base text-navy-bolder' },
                { part: 'Value cell', classes: 'px-4 py-3 text-center align-middle', note: 'Adds bg-[#ffec99] in the Full column. A check is a 24px stroked SVG in text-[#0466c8]. No is a “—” in font-body text-base text-neutral-subtle.' },
              ]}
            />
            <DevNote>
              <p>
                Content is editorial. Use a paragraph type with plan columns and feature rows, or a simple
                table field, rendered by a template that knows which column is recommended. Accessibility
                fixes the prototype lacks: <C>scope="col"</C> on the plan headers; group headings as{' '}
                <C>&lt;th colspan="5" scope="colgroup"&gt;</C>, or one <C>&lt;tbody&gt;</C> per group with a
                row header; feature labels as <C>&lt;th scope="row"&gt;</C>; and a text alternative for each
                check and dash (<C>&lt;span class="sr-only"&gt;Included&lt;/span&gt;</C> /{' '}
                &ldquo;Not included&rdquo;). Today a screen reader hears empty cells and &ldquo;dash&rdquo;.
                Give the empty corner header a hidden label (&ldquo;Benefit&rdquo;).
              </p>
            </DevNote>
            <SourceList title="Canonical (one-off)" items={[{ path: 'src/sections/MembershipComparisonTable.tsx' }]} />
          </div>
        </DocSection>

        {/* ─────────────────────────────────────────────────────────────── */}
        <DocSection title="People roster">
          <div className="flex flex-col gap-8">
            <Lead>
              The leadership roster is a grid of circular headshots in a tan ring, each with a name and
              titles. The name link is stretched over the whole tile, so hovering anywhere sweeps the
              name&rsquo;s underline and zooms the photo. A missing headshot shows the USNI watermark
              instead, without the resting zoom.
            </Lead>
            <LiveMarkup label="Executive staff (first four)" previewClassName="p-0 bg-white">
              <LeadershipRoster id="executive-staff-demo" title="Executive Staff" people={executiveStaff.slice(0, 4)} />
            </LiveMarkup>
            <ClassTable
              rows={[
                { part: 'Section', classes: 'py-16 lg:py-20 scroll-mt-[150px] bg-white', note: 'Or bg-[#ebf4ff] (the light-blue band, no token). scroll-mt clears the sticky header and the jump-link bar.' },
                { part: 'Heading', classes: 'font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1] mb-10 lg:mb-12', note: 'The section is aria-labelledby this heading’s id.' },
                { part: 'Grid', classes: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-10', note: 'A <ul>. 2 / 3 / 4 across.' },
                { part: 'Tile', classes: 'group relative flex flex-col items-center text-center gap-4', note: 'relative anchors the stretched link.' },
                {
                  part: 'Headshot ring',
                  classes: 'w-[140px] h-[140px] lg:w-[168px] lg:h-[168px] rounded-full overflow-hidden border-[6px] border-tan flex-shrink-0 bg-white',
                  note: 'bg-tan-subtlest for the placeholder. One of the few rounded shapes on the site, carried over from the current site.',
                },
                {
                  part: 'Headshot',
                  classes: 'w-full h-full object-cover scale-[1.08] group-hover:scale-[1.18] transition-transform duration-300 ease-out',
                  note: 'The resting 1.08 scale hides the anti-aliased edge of the pre-cropped circle. The placeholder uses group-hover:scale-[1.06] with no resting scale and is aria-hidden with alt="".',
                },
                { part: 'Name', classes: 'font-headline text-lg lg:text-xl leading-[1.2]  ›  a: link-underline-hover text-navy-bolder hover:text-navy-bright transition-colors after:absolute after:inset-0', note: 'The ::after pseudo-element covers the tile, so the whole tile is the hit area.' },
                { part: 'Title line', classes: 'font-body font-bold text-sm text-neutral-subtle leading-snug', note: 'One <p> per role or committee.' },
                { part: 'Subgroup', classes: 'mt-14 lg:mt-16 pt-10 lg:pt-12 border-t border-navy-subtle  ›  h3: font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.15] mb-10', note: 'Optional nested roster (board liaisons), with an optional note in font-body text-sm text-neutral-subtle leading-relaxed mt-10 max-w-[900px].' },
              ]}
            />
            <DevNote>
              <p>
                A View of Person nodes filtered by group (executive staff, directors, trustees, editorial
                board), sorted by weight, rendered as an unformatted list into the <C>&lt;ul&gt;</C>. Fields:{' '}
                <C>{'{{ url }}'}</C>, <C>{'{{ name }}'}</C>, <C>{'{{ headshot }}'}</C> (a square image style,
                pre-cropped to the circle, with the watermark fallback when empty), and{' '}
                <C>{'{{ titles }}'}</C> (multi-value). No JavaScript. The stretched link keeps one link per
                person while the whole tile stays clickable. Do not also wrap the image in a link.
              </p>
            </DevNote>
            <SourceList title="Canonical" items={[{ path: 'src/sections/LeadershipRoster.tsx' }]} />
            <SourceList
              title="Drift"
              tone="drift"
              items={[
                { path: 'src/sections/AboutStrategicPlanForeword.tsx', note: 'the foreword’s signatories. The same tile copied inline, at 150/190px, laid out as a column beside the text rather than a grid.' },
              ]}
            />
            <CodeBlock code={`import LeadershipRoster from '@/sections/LeadershipRoster'
import { executiveStaff } from '@/data/leadership'

<LeadershipRoster id="executive-staff" title="Executive Staff" people={executiveStaff} />`} />
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
