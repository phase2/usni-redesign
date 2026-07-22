import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import DocSection from '@/components/design-system/DocSection'
import { Button, ButtonLink, NavyButtonLink } from '@/components/ui/Button'
import ButtonLinkCTA from '@/components/ui/ButtonLinkCTA'
import Eyebrow from '@/components/ui/Eyebrow'
import SectionHeader from '@/components/ui/SectionHeader'
import PlainCard from '@/components/cards/PlainCard'
import SmallFeature from '@/components/cards/SmallFeature'
import LargeFeature from '@/components/cards/LargeFeature'
import XSmallFeature from '@/components/cards/XSmallFeature'
import type { Article } from '@/types'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'

interface Swatch {
  name: string
  className: string
  hex: string
  usage: string
  dark?: boolean
}

const navySwatches: Swatch[] = [
  { name: 'navy-boldest', className: 'bg-navy-boldest', hex: '#001233', usage: 'Hero background, darkest panels', dark: true },
  { name: 'navy-bolder', className: 'bg-navy-bolder', hex: '#001845', usage: 'Primary text, buttons, headings', dark: true },
  { name: 'navy-bold', className: 'bg-navy-bold', hex: '#002B5C', usage: 'Mid-dark navy', dark: true },
  { name: 'navy (DEFAULT)', className: 'bg-navy', hex: '#012A74', usage: 'Body text, secondary elements', dark: true },
  { name: 'navy-subtle', className: 'bg-navy-subtle', hex: '#023E7D', usage: 'Eyebrows, links, nav text', dark: true },
  { name: 'navy-subtler', className: 'bg-navy-subtler', hex: '#2B5496', usage: 'Lightest navy tint', dark: true },
  { name: 'navy-bright', className: 'bg-navy-bright', hex: '#0466C8', usage: 'Hover state for solid dark-blue buttons', dark: true },
]

const goldSwatches: Swatch[] = [
  { name: 'gold (DEFAULT)', className: 'bg-gold', hex: '#FFD000', usage: 'Primary CTA button background' },
  { name: 'gold-subtle', className: 'bg-gold-subtle', hex: '#FFC425', usage: 'Footer divider accent' },
  { name: 'gold-dark', className: 'bg-gold-dark', hex: '#FFEC99', usage: 'Lightest gold tint (naming is legacy)' },
]

const tanSwatches: Swatch[] = [
  { name: 'tan (DEFAULT)', className: 'bg-tan', hex: '#C5C19D', usage: 'Footer nav accent underlines' },
  { name: 'tan-subtle', className: 'bg-tan-subtle', hex: '#D9D7BF', usage: 'Mid tan' },
  { name: 'tan-subtlest', className: 'bg-tan-subtlest', hex: '#F7F7F2', usage: 'Footer nav category headings' },
]

const neutralSwatches: Swatch[] = [
  { name: 'neutral-white', className: 'bg-neutral-white border border-border-light', hex: '#FFFFFF', usage: 'Page and card background' },
  { name: 'neutral-subtlest', className: 'bg-neutral-subtlest', hex: '#F4F4F6', usage: 'Section bg, image placeholders' },
  { name: 'neutral-subtler', className: 'bg-neutral-subtler', hex: '#C4C9D4', usage: 'Subtle dividers, disabled state' },
  { name: 'neutral-subtle', className: 'bg-neutral-subtle', hex: '#4E576A', usage: 'Secondary / muted text', dark: true },
  { name: 'neutral-bold', className: 'bg-neutral-bold', hex: '#33415C', usage: 'Bold neutral accent', dark: true },
  { name: 'text-primary / neutral-bolder', className: 'bg-text-primary', hex: '#1D2535', usage: 'Base body & headline text color', dark: true },
  { name: 'neutral-boldest', className: 'bg-neutral-boldest', hex: '#0E121A', usage: 'Highest-contrast neutral', dark: true },
]

const utilitySwatches: Swatch[] = [
  { name: 'light-blue', className: 'bg-light-blue', hex: '#C2DDFF', usage: 'Hero eyebrow text on dark bg' },
  { name: 'surface-subtle', className: 'bg-surface-subtle', hex: '#EEF2FF', usage: 'Light blue-tinted section bg' },
  { name: 'border-light', className: 'bg-border-light', hex: '#E2E8F0', usage: 'Card borders, dividers' },
]

function SwatchGroup({ title, swatches }: { title: string; swatches: Swatch[] }) {
  return (
    <div>
      <h3 className="font-body font-bold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {swatches.map((s) => (
          <div key={s.name} className="border border-border-light bg-white">
            <div className={`h-20 ${s.className}`} />
            <div className="p-3">
              <p className="font-body font-bold text-sm text-navy-bolder">{s.name}</p>
              <p className="font-body text-xs text-neutral-subtle uppercase mb-1">{s.hex}</p>
              <p className="font-body text-xs text-neutral-subtle leading-snug">{s.usage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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

const demoPlainCard = {
  headline: 'Become a Member',
  body: 'Join the U.S. Naval Institute and support an independent forum for those who dare to think seriously about sea power.',
  cta: 'Join Today',
  href: '#',
}

export default function StyleGuide() {
  return (
    <DesignSystemLayout breadcrumb="Style Guide">
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-12 pb-8">
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle mb-3">
          Foundations
        </p>
        <h1 className="font-headline text-5xl text-navy-bolder leading-[1.1] mb-4">Style Guide</h1>
        <p className="font-body text-base text-neutral-subtle leading-relaxed max-w-2xl">
          Base colors, typography, and core component treatments used across USNI.org.
        </p>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
        <DocSection title="Color Palette">
          <div className="flex flex-col gap-10">
            <SwatchGroup title="Navy" swatches={navySwatches} />
            <SwatchGroup title="Gold" swatches={goldSwatches} />
            <SwatchGroup title="Tan" swatches={tanSwatches} />
            <SwatchGroup title="Neutral" swatches={neutralSwatches} />
            <SwatchGroup title="Utility" swatches={utilitySwatches} />
          </div>
        </DocSection>

        <DocSection title="Typography">
          <div className="flex flex-col gap-10">
            <div>
              <h3 className="font-body font-bold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-4">
                Headline — DM Serif Text
              </h3>
              <div className="border border-border-light bg-white p-8 flex flex-col gap-6">
                <div>
                  <p className="font-headline text-6xl text-navy-bolder leading-[1.1]">Display / H1</p>
                  <p className="font-body text-xs text-neutral-subtle mt-2">text-5xl / text-6xl · leading-[1.1]</p>
                </div>
                <div>
                  <p className="font-headline text-4xl text-navy-bolder leading-[1.1]">Section Headline / H2</p>
                  <p className="font-body text-xs text-neutral-subtle mt-2">text-4xl / lg:text-5xl · leading-[1.1]</p>
                </div>
                <div>
                  <p className="font-headline text-2xl text-navy-bolder leading-[1.1]">Card Headline / H3</p>
                  <p className="font-body text-xs text-neutral-subtle mt-2">text-2xl / lg:text-3xl · leading-[1.1]</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-body font-bold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-4">
                Body — Inter
              </h3>
              <div className="border border-border-light bg-white p-8 flex flex-col gap-4">
                <p className="font-body font-normal text-base text-navy-bolder">
                  Regular 400 — The Independent Forum for Those Who Dare to Think Seriously About Sea Power.
                </p>
                <p className="font-body font-medium text-base text-navy-bolder">
                  Medium 500 — The Independent Forum for Those Who Dare to Think Seriously About Sea Power.
                </p>
                <p className="font-body font-bold text-base text-navy-bolder">
                  Bold 700 — The Independent Forum for Those Who Dare to Think Seriously About Sea Power.
                </p>
                <p className="font-body font-extrabold text-base text-navy-bolder">
                  Extrabold 800 — The Independent Forum for Those Who Dare to Think Seriously About Sea Power.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-body font-bold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-4">
                Eyebrow
              </h3>
              <div className="border border-border-light bg-white p-8 flex flex-col gap-4">
                <Eyebrow>Proceedings Magazine</Eyebrow>
                <div className="bg-navy-bolder p-4 w-fit">
                  <Eyebrow light>Naval History Magazine</Eyebrow>
                </div>
                <p className="font-body text-xs text-neutral-subtle">
                  font-body font-medium text-sm uppercase tracking-[0.08em] — navy-subtle on light, light-blue on dark
                </p>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection title="Buttons & CTAs">
          <Link to="/design-system/buttons" className="font-body font-bold text-sm text-navy-subtle hover:text-navy-bolder inline-block mb-6">
            View full documentation →
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-border-light bg-white p-8">
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-6">
                On Light Background
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="outline-dark">Outline Dark</Button>
                <Button variant="link">Link Button</Button>
                <NavyButtonLink href="#">Navy Button</NavyButtonLink>
              </div>
              <div className="mt-6">
                <ButtonLinkCTA href="#">Learn More</ButtonLinkCTA>
              </div>
            </div>
            <div className="border border-border-light bg-navy-bolder p-8">
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-light-blue mb-6">
                On Dark Background
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="outline">Outline</Button>
                <ButtonLink variant="outline" href="#">Outline Link</ButtonLink>
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection title="Cards">
          <Link to="/design-system/cards" className="font-body font-bold text-sm text-navy-subtle hover:text-navy-bolder inline-block mb-6">
            View full documentation →
          </Link>
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-4">
                Plain Card
              </p>
              <div className="max-w-sm">
                <PlainCard {...demoPlainCard} />
              </div>
            </div>
            <div>
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-4">
                Large Feature
              </p>
              <div className="max-w-sm">
                <LargeFeature article={demoArticle} />
              </div>
            </div>
            <div>
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-4">
                Small Feature
              </p>
              <div className="max-w-sm">
                <SmallFeature article={demoArticle} />
              </div>
            </div>
            <div>
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-4">
                XSmall Feature
              </p>
              <div className="max-w-md border-t border-border-light">
                <XSmallFeature article={demoArticle} />
              </div>
            </div>
          </div>
        </DocSection>

        <DocSection title="Section Header">
          <div className="flex flex-col gap-10">
            <div className="border border-border-light bg-white p-8">
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-6">
                Default (left-aligned, with CTA)
              </p>
              <SectionHeader
                eyebrow="Naval History"
                headline="Stories of Naval Heritage"
                description="Explore firsthand accounts and expert analysis spanning the history of naval and maritime affairs."
                ctaLabel="View All Articles"
                ctaHref="#"
              />
            </div>
            <div className="border border-border-light bg-white p-8">
              <p className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-6">
                Centered
              </p>
              <SectionHeader eyebrow="Membership" headline="Join the Naval Institute" centered />
            </div>
          </div>
        </DocSection>
      </div>
    </DesignSystemLayout>
  )
}
