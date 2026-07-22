import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'

interface Section {
  title: string
  description: string
  href?: string
}

const sections: Section[] = [
  {
    title: 'Style Guide',
    description: 'Base colors, typography, and core component treatments in one snapshot view.',
    href: '/design-system/style-guide',
  },
  {
    title: 'Buttons & CTAs',
    description: 'Primary, outline, and link button treatments across light and dark backgrounds.',
    href: '/design-system/buttons',
  },
  {
    title: 'Cards',
    description: 'Feature cards, plain cards, and article teasers used to surface content.',
    href: '/design-system/cards',
  },
  {
    title: 'Forms & Inputs',
    description: 'Search, newsletter, and checkout form patterns.',
    href: '/design-system/forms',
  },
  {
    title: 'Navigation',
    description: 'Header, mega-menu, and footer structure.',
    href: '/design-system/navigation',
  },
  {
    title: 'Iconography & Imagery',
    description: 'Icon usage and photography treatment guidelines.',
    href: '/design-system/iconography',
  },
]

export default function DesignSystemHome() {
  return (
    <DesignSystemLayout>
      <div className="max-w-container mx-auto px-6 lg:px-8 pt-20 pb-16 text-center flex flex-col items-center">
        <img src="/usni-logo-full.svg" alt="U.S. Naval Institute" className="h-16 w-auto mb-8" />
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle mb-3">
          USNI.org Redesign
        </p>
        <h1 className="font-headline text-5xl lg:text-6xl text-navy-bolder leading-[1.1] mb-5">
          Design System
        </h1>
        <p className="font-body text-xs uppercase tracking-[0.08em] text-neutral-subtle mt-6">
          Last updated July 2026 · v0.1
        </p>
      </div>

      <div className="max-w-container mx-auto px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) =>
            section.href ? (
              <Link
                key={section.title}
                to={section.href}
                className="group flex flex-col border border-border-light bg-white p-8 hover:border-navy-bolder transition-colors"
              >
                <h2 className="font-headline text-2xl text-navy-bolder leading-[1.1] mb-3">
                  {section.title}
                </h2>
                <p className="font-body text-sm text-neutral-subtle leading-relaxed flex-1">
                  {section.description}
                </p>
                <span className="font-body font-bold text-sm text-navy-subtle mt-6 inline-flex items-center gap-2">
                  View section
                  <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            ) : (
              <div
                key={section.title}
                className="flex flex-col border border-border-light bg-white/60 p-8 opacity-60"
              >
                <h2 className="font-headline text-2xl text-navy-bolder leading-[1.1] mb-3">
                  {section.title}
                </h2>
                <p className="font-body text-sm text-neutral-subtle leading-relaxed flex-1">
                  {section.description}
                </p>
                <span className="font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mt-6 inline-flex items-center w-fit border border-border-light px-2.5 py-1">
                  Coming soon
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </DesignSystemLayout>
  )
}
