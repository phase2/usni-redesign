import { useState } from 'react'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import BreakpointLabel from '@/components/design-system/BreakpointLabel'
import PreviewFrame from '@/components/design-system/PreviewFrame'
import { Button } from '@/components/ui/Button'
import ArticleMeterBanner from '@/components/ui/ArticleMeterBanner'

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
                width={1280}
                title="Header — desktop default"
                className="border border-border-light"
              />
            </div>
            <div>
              <DocLabel className="mb-2">Mega-menu open (Membership)</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header?previewNavOpen=Membership"
                width={1280}
                title="Header — desktop mega-menu open"
                className="border border-border-light"
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
                title="Header — mobile default"
                className="border border-border-light"
              />
            </div>
            <div>
              <DocLabel className="mb-2">Off-canvas menu open</DocLabel>
              <PreviewFrame
                src="/design-system/preview/header?previewMobileOpen=1"
                width={375}
                height={640}
                title="Header — mobile menu open"
                className="border border-border-light"
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
              width={1280}
              title="Footer — desktop"
              className="border border-border-light"
            />
          </div>

          <BreakpointLabel device="mobile">Mobile — Maximum: 1023px</BreakpointLabel>
          <PreviewFrame
            src="/design-system/preview/footer"
            width={375}
            title="Footer — mobile"
            className="border border-border-light"
          />
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
