import { useState } from 'react'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import Breadcrumb from '@/components/ui/Breadcrumb'
import SectionSubNav from '@/components/layout/SectionSubNav'
import TabNav, { panelId, tabId } from '@/components/ui/TabNav'
import BreakpointLabel from '@/components/design-system/BreakpointLabel'
import PreviewFrame from '@/components/design-system/PreviewFrame'
import { Button } from '@/components/ui/Button'
import ArticleMeterBanner from '@/components/ui/ArticleMeterBanner'
import ArticlePaywall from '@/components/ui/ArticlePaywall'

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

export default function Navigation() {
  const [meterVisible, setMeterVisible] = useState(false)

  return (
    <DesignSystemLayout breadcrumb="Navigation">
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle mb-3">
          Site Chrome
        </p>
        <h1 className="font-headline text-5xl text-navy-bolder leading-[1.1] mb-4">Navigation</h1>
        <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-2xl">
          The header, footer, and global overlays that wrap every page. Each sample below is the real,
          live component — embedded in an isolated preview frame so its own responsive breakpoints render
          correctly regardless of your window size, with interaction disabled so it can't be clicked or
          scrolled from here.
        </p>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
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
          </ul>

          <BreakpointLabel device="desktop">Desktop — Minimum: 1024px</BreakpointLabel>
          <div className="flex flex-col gap-8 mb-10">
            <div>
              <DocLabel className="mb-2">Default</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header"
                width={1200}
                height={157}
                title="Header — desktop default"
                className="border border-border-light bg-white p-6"
              />
            </div>
            <div>
              <DocLabel className="mb-2">Mega-menu open (Membership)</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header?previewNavOpen=Membership"
                width={1200}
                height={673}
                title="Header — desktop mega-menu open"
                className="border border-border-light bg-white p-6"
              />
            </div>
          </div>

          <BreakpointLabel device="mobile">Mobile — Maximum: 1023px</BreakpointLabel>
          <div className="flex flex-col gap-8">
            <div>
              <DocLabel className="mb-2">Default</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header"
                width={375}
                height={81}
                title="Header — mobile default"
                className="border border-border-light bg-white p-6"
              />
            </div>
            <div>
              <DocLabel className="mb-2">Off-canvas menu open</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header?previewMobileOpen=1"
                width={375}
                height={640}
                title="Header — mobile menu open"
                className="border border-border-light bg-white p-6"
              />
            </div>
          </div>
        </DocSection>

        <DocSection title="Footer">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-8 max-w-2xl">
            Logo and contact info, two link columns, and a newsletter signup card sit side by side on
            desktop. Below <code className="font-mono text-xs bg-neutral-subtlest px-1 py-0.5">lg</code>,
            they stack vertically; the bottom bar (copyright, legal links, social icons) stacks below{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1 py-0.5">sm</code>.
          </p>

          <BreakpointLabel device="desktop">Desktop — Minimum: 1024px</BreakpointLabel>
          <div className="mb-10">
            <PreviewFrame
              src="/design-system/preview/footer"
              width={1200}
              height={725}
              title="Footer — desktop"
              className="border border-border-light bg-white p-6"
            />
          </div>

          <BreakpointLabel device="mobile">Mobile — Maximum: 1023px</BreakpointLabel>
          <PreviewFrame
            src="/design-system/preview/footer"
            width={375}
            height={1714}
            title="Footer — mobile"
            className="border border-border-light bg-white p-6"
          />
        </DocSection>

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

          <DocLabel>Desktop</DocLabel>
          <div className="border border-border-light mb-6 overflow-x-auto">
            <SectionSubNav
              label="Giving"
              items={[
                { label: 'Overview', href: '/giving', exact: true },
                { label: 'Donor Recognition', href: '/giving/societies' },
                { label: 'Corporate Partners', href: '/giving/corporate' },
                { label: 'Donate', href: '/giving/donate' },
                { label: 'Contact the Foundation', href: '/contact#foundation' },
              ]}
            />
          </div>

          <CodeBlock code={`import SectionSubNav from '@/components/layout/SectionSubNav'

<SectionSubNav
  label="Giving"
  items={[
    { label: 'Overview', href: '/giving', exact: true },
    { label: 'Donor Recognition', href: '/giving/societies' },
    { label: 'Photos', href: 'https://photos.usni.org', external: true },
  ]}
/>`} />
          <div className="mt-6">
            <PropsTable
              rows={[
                { name: 'label', type: 'string', description: "Required. The section's name — labels the mobile toggle and both nav landmarks." },
                { name: 'items', type: 'SectionNavItem[]', description: 'Required. Each item takes label and href.' },
                { name: 'items[].exact', type: 'boolean', default: 'false', description: "Match the path exactly. Needed on a landing tab whose href is a prefix of every sibling page." },
                { name: 'items[].matchPrefix', type: 'string', description: "Stay active across pages under this prefix, when they don't sit beneath the item's own href." },
                { name: 'items[].external', type: 'boolean', default: 'false', description: 'Opens in a new tab and gets the external-link marker.' },
              ]}
            />
          </div>
        </DocSection>

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

          <DocLabel>Live</DocLabel>
          <div className="border border-border-light bg-surface-subtle p-8 mb-6">
            <TabNavDemo />
          </div>

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
          <div className="mt-6">
            <PropsTable
              rows={[
                { name: 'tabs', type: 'TabItem[]', description: 'Required. Each takes an id (stable key, and the basis of the tab/panel element ids) and a label.' },
                { name: 'activeId', type: 'string', description: "Required. The selected tab's id — the component is controlled." },
                { name: 'onChange', type: '(id: string) => void', description: 'Required. Called with the newly selected id, by click or arrow key.' },
                { name: 'label', type: 'string', description: 'Required. Accessible name for the tab list, e.g. "Donor listing by year".' },
                { name: 'className', type: 'string', description: 'Extra layout classes on the bar, typically a margin.' },
              ]}
            />
          </div>
        </DocSection>

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

          <DocLabel>Full trail (sm and up)</DocLabel>
          <div className="border border-border-light bg-[#ebf4ff] p-6 mb-6">
            <Breadcrumb
              trail={[
                { label: 'Home', href: '#' },
                { label: 'Books & Press', href: '#' },
              ]}
              current="Studies in Marine Corps History and Amphibious Warfare"
            />
          </div>

          <DocLabel>On a dark panel</DocLabel>
          <div className="border border-border-light bg-navy-boldest p-6 mb-6">
            <Breadcrumb
              trail={[
                { label: 'Home', href: '#' },
                { label: 'Proceedings', href: '#' },
              ]}
              current="April 2026 Issue"
              tone="dark"
              homeIcon
            />
          </div>

          <CodeBlock code={`import Breadcrumb from '@/components/ui/Breadcrumb'

<Breadcrumb
  trail={[
    { label: 'Home', href: '/' },
    { label: 'Books & Press', href: '/books' },
  ]}
  current="New Releases"
  className="pb-4 border-b border-[#C2DDFF]"
/>`} />

          <div className="mt-6">
            <PropsTable
              rows={[
                { name: 'trail', type: 'Crumb[]', description: 'Ancestors, outermost first. The last one is what the mobile back-link points at.' },
                { name: 'current', type: 'string', description: 'The page being viewed. Rendered as text, never a link.' },
                { name: 'tone', type: "'light' | 'dark'", default: "'light'", description: 'Use dark on a navy panel or over a photo.' },
                { name: 'homeIcon', type: 'boolean', default: 'false', description: 'House glyph beside the first crumb.' },
                { name: 'className', type: 'string', description: 'Wrapper layout — the dividing rule and its padding live here.' },
              ]}
            />
          </div>
        </DocSection>

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
        </DocSection>

        <DocSection title="Article Paywall">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            An in-article block shown in place of restricted content once a visitor has used all their
            free articles — the article body fades out above it. Photo background with a navy scrim,
            membership CTA, and sign-in link. Live on{' '}
            <a href="/proceedings/three-mefs" className="text-navy-subtle underline">/proceedings/three-mefs</a>.
          </p>
          <div className="border border-border-light bg-white p-8 max-w-[864px]">
            <ArticlePaywall />
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
