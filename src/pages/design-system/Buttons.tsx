import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocSection from '@/components/design-system/DocSection'
import DocLabel from '@/components/design-system/DocLabel'
import CodeBlock from '@/components/design-system/CodeBlock'
import PropsTable from '@/components/design-system/PropsTable'
import { Button, ButtonLink, NavyButtonLink } from '@/components/ui/Button'
import ButtonLinkCTA from '@/components/ui/ButtonLinkCTA'
import SharePopover from '@/components/ui/SharePopover'

const VARIANTS = ['primary', 'outline', 'outline-dark', 'link'] as const
const SIZES = ['sm', 'md', 'lg'] as const

export default function Buttons() {
  return (
    <DesignSystemLayout breadcrumb="Buttons & CTAs">
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle mb-3">
          Components
        </p>
        <h1 className="font-headline text-5xl text-navy-bolder leading-[1.1] mb-4">Buttons &amp; CTAs</h1>
        <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-2xl">
          Four button-family components cover every call-to-action treatment on USNI.org:
          a shared <code className="font-mono text-sm">Button</code>/<code className="font-mono text-sm">ButtonLink</code> pair,
          a solid navy link, an arrow-badge CTA link, and a share popover trigger.
        </p>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
        <DocSection title="Button / ButtonLink">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-8 max-w-2xl">
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">Button</code> renders a{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">{'<button>'}</code>;{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">ButtonLink</code> renders an{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">{'<a>'}</code> with an identical class
            recipe. Both accept the same <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">variant</code>,{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">size</code>, and{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">fullWidth</code> props.
          </p>

          <DocLabel>Variants — on light background</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-8 flex flex-wrap items-center gap-4">
            {VARIANTS.filter(v => v !== 'outline').map((variant) => (
              <Button key={variant} variant={variant}>{variant}</Button>
            ))}
          </div>

          <DocLabel>Variants — on dark background</DocLabel>
          <div className="border border-border-light bg-navy-bolder p-8 mb-8 flex flex-wrap items-center gap-4">
            <Button variant="primary">primary</Button>
            <Button variant="outline">outline</Button>
          </div>
          <p className="font-body text-xs text-neutral-subtle mb-8 -mt-4">
            <code className="font-mono">outline</code> uses a white border/text and only reads correctly on a dark or
            image background. <code className="font-mono">outline-dark</code> is its light-background counterpart.
          </p>

          <DocLabel>Sizes</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-8 flex flex-wrap items-center gap-4">
            {SIZES.map((size) => (
              <Button key={size} variant="primary" size={size}>Size {size}</Button>
            ))}
          </div>

          <DocLabel>States</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-8 flex flex-wrap items-center gap-4">
            <Button variant="primary">Default</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="outline-dark" disabled>Disabled Outline</Button>
          </div>

          <DocLabel>Full width</DocLabel>
          <div className="border border-border-light bg-white p-8 mb-8 max-w-sm">
            <Button variant="primary" fullWidth>Full Width Button</Button>
          </div>

          <PropsTable
            rows={[
              { name: 'variant', type: "'primary' | 'outline' | 'outline-dark' | 'link'", default: "'primary'", description: 'Visual treatment. outline is for dark/image backgrounds; outline-dark is for light backgrounds.' },
              { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Padding and font size.' },
              { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Stretches the button to 100% of its container.' },
              { name: 'href', type: 'string', description: 'ButtonLink only — required, renders an <a> instead of a <button>.' },
            ]}
          />

          <div className="mt-6">
            <CodeBlock code={`import { Button, ButtonLink } from '@/components/ui/Button'

<Button variant="primary" size="md">Join Today</Button>
<ButtonLink variant="outline-dark" href="/membership">Learn More</ButtonLink>`} />
          </div>
        </DocSection>

        <DocSection title="Navy Button Link">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A solid navy CTA link used for secondary actions inside cards and content blocks — distinct from the
            gold <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">Button</code>{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">primary</code> variant, which is
            reserved for the highest-priority action on a page (e.g. Join / Subscribe).
          </p>
          <div className="border border-border-light bg-white p-8 mb-6 max-w-sm">
            <NavyButtonLink href="#">View All Articles</NavyButtonLink>
          </div>
          <CodeBlock code={`import { NavyButtonLink } from '@/components/ui/Button'

<NavyButtonLink href="/proceedings">View All Articles</NavyButtonLink>`} />
        </DocSection>

        <DocSection title="Arrow-Badge CTA (ButtonLinkCTA)">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A text link with a blue arrow badge and an animated underline on hover. Used in{' '}
            <code className="font-mono text-xs bg-neutral-subtlest px-1.5 py-0.5">SectionHeader</code> and
            wherever a lighter-weight "read more" affordance fits better than a boxed button.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6">
            <ButtonLinkCTA href="#">Explore the Archives</ButtonLinkCTA>
          </div>
          <CodeBlock code={`import ButtonLinkCTA from '@/components/ui/ButtonLinkCTA'

<ButtonLinkCTA href="/archives">Explore the Archives</ButtonLinkCTA>`} />
        </DocSection>

        <DocSection title="Share Popover">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-6 max-w-2xl">
            A button that opens a small popover with social share links, copy-link, and email — used on article
            pages. Click the button below to try it live.
          </p>
          <div className="border border-border-light bg-white p-8 mb-6 flex justify-start">
            <SharePopover title="AI Warfighting: The Next Generation of Naval Strategy" url="https://usni.org" />
          </div>
          <CodeBlock code={`import SharePopover from '@/components/ui/SharePopover'

<SharePopover title={article.headline} url={articleUrl} />`} />
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
