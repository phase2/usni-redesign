import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'

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

export default function Iconography() {
  return (
    <DesignSystemLayout breadcrumb="Iconography & Imagery">
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle mb-3">
          Foundations
        </p>
        <h1 className="font-headline text-5xl text-navy-bolder leading-[1.1] mb-4">Iconography &amp; Imagery</h1>
        <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-2xl">
          There's no custom icon component — every icon is a Font Awesome glyph loaded via CDN kit, or a
          hand-drawn inline SVG for a handful of one-off UI marks. This page documents both, plus the image
          treatment conventions used across cards and heroes.
        </p>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
        <DocSection title="Icons — Font Awesome">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            Loaded globally via a kit script in <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">index.html</code>,
            so any <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">{'<i>'}</code> tag with the
            right classes renders — no per-icon import needed. Always pair with{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">aria-hidden="true"</code> since
            these are decorative next to visible text, or add an{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">aria-label</code> on the parent
            control when the icon is the only content (e.g. an icon-only button).
          </p>

          <DocLabel>UI &amp; Interaction</DocLabel>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
            {UI_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} />)}
          </div>

          <DocLabel>Actions</DocLabel>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2 mb-8">
            {ACTION_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} />)}
          </div>

          <DocLabel>Content &amp; Ratings</DocLabel>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
            {CONTENT_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} />)}
          </div>

          <DocLabel>Brand / Social</DocLabel>
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-6 gap-2 mb-8">
            {BRAND_ICONS.map((icon) => <IconSwatch key={icon} icon={icon} prefix="fa-brands" />)}
          </div>

          <CodeBlock code={`<i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
<i className="fa-brands fa-linkedin-in" aria-hidden="true" />
<i className="fa-regular fa-heart" aria-hidden="true" />`} />
        </DocSection>

        <DocSection title="Icons — Inline SVG">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A small set of icons are hand-drawn as inline SVGs instead of Font Awesome — mainly modal close
            buttons, form chevrons, and the newsletter mail/checkmark glyphs — anywhere a precise stroke weight
            or a guaranteed no-network-dependency icon matters more than convenience.
          </p>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
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
        </DocSection>

        <DocSection title="Image Treatment">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            Images sit in a fixed-aspect container with <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">object-cover</code>,
            a <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">bg-neutral-subtlest</code> placeholder
            behind them while loading, and a <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">hover:scale-105</code> zoom
            on linked card images.
          </p>

          <DocLabel>Common aspect ratios</DocLabel>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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

          <CodeBlock code={`<a href={article.href} className="block overflow-hidden aspect-[4/3] bg-neutral-subtlest">
  <img
    src={article.image}
    alt={article.imageAlt ?? article.headline}
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
  />
</a>`} />
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
