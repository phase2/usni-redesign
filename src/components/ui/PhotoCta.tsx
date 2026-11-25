import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

export interface PhotoCtaAction {
  label: string
  href: string
  /** Leaves the site: opens in a new tab and carries the external-link marker. */
  external?: boolean
}

interface PhotoCtaProps {
  /** Decorative only: a CSS background has no alt text, so the card must say everything. */
  image: string
  /** Which side of the container the card sits on from `md` up. */
  cardSide: 'left' | 'right'
  /** White for most pages; navy where the card needs to stand out from a pale photo. */
  theme?: 'white' | 'navy'
  eyebrow?: string
  heading: ReactNode
  body: ReactNode
  primary: PhotoCtaAction
  /** An outline button beside the primary one. */
  secondary?: PhotoCtaAction
}

const themes = {
  white: {
    card: 'bg-white',
    eyebrow: '',
    heading: 'text-navy-bolder',
    body: 'text-neutral-subtle',
    primary: 'navy',
    secondary: 'outline-dark',
  },
  navy: {
    card: 'bg-navy-boldest',
    eyebrow: 'text-light-blue',
    heading: 'text-white',
    body: 'text-neutral-subtlest',
    primary: 'primary',
    secondary: 'outline',
  },
} as const

function Action({ action, variant }: { action: PhotoCtaAction; variant: 'primary' | 'navy' | 'outline' | 'outline-dark' }) {
  return (
    <ButtonLink
      href={action.href}
      variant={variant}
      size="md"
      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {action.label}
      {action.external && (
        <>
          <ExternalLinkIcon size="1.1em" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </ButtonLink>
  )
}

/**
 * The photo CTA: a full-bleed photograph under a 20% navy wash, with a card
 * floating over it holding an eyebrow, a 36px headline (24px on a phone), a
 * paragraph, and one or two buttons. The card keeps 32px of padding at every
 * width so the headline does not wrap into a narrow column. It closes a
 * page with a single next step.
 *
 * Every photo-and-card block in the prototype renders through this, so the
 * headline size, card width, and buttons cannot drift between pages. It is a
 * full section on its own.
 */
export default function PhotoCta({
  image,
  cardSide,
  theme = 'white',
  eyebrow,
  heading,
  body,
  primary,
  secondary,
}: PhotoCtaProps) {
  const t = themes[theme]

  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${image})`, minHeight: '480px' }}
    >
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      <div className={`relative container-site h-full flex items-center min-h-[480px] ${cardSide === 'right' ? 'justify-end' : ''}`}>
        <div className={`${t.card} p-8 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] my-12`}>
          <div className="eyebrow-headline mb-4">
            {eyebrow && <p className={`eyebrow ${t.eyebrow}`}>{eyebrow}</p>}
            <h2 className={`font-headline text-2xl md:text-4xl leading-[1.1] ${t.heading}`}>{heading}</h2>
          </div>
          <div className={`font-body text-base leading-relaxed mb-6 ${t.body}`}>{body}</div>
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-3">
            <Action action={primary} variant={t.primary} />
            {secondary && <Action action={secondary} variant={t.secondary} />}
          </div>
        </div>
      </div>
    </section>
  )
}
