import type { ReactNode } from 'react'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'

export interface BillboardAction {
  label: string
  href: string
  /** Leaves the site: opens in a new tab and swaps the arrow for the external-link marker. */
  external?: boolean
}

interface SplitBillboardProps {
  /** Navy for a page's strongest call to action, tan for a secondary offer. */
  theme: 'navy' | 'tan'
  /** Which half the photograph takes from `lg` up. Stacked, it always leads. */
  imagePosition: 'left' | 'right'
  image: { src: string; alt: string }
  /** Laid over the photograph, e.g. the sponsored-content logo badge. */
  imageOverlay?: ReactNode
  eyebrow?: string
  heading: ReactNode
  /** Set from where the block sits: h2 standing alone in a page, h3 under a section heading. */
  headingLevel?: 'h2' | 'h3'
  body: ReactNode
  /** Short bold lines after the lead, such as an event's date and venue. */
  details?: ReactNode[]
  primary: BillboardAction
  /** An outline button beside the primary one. */
  secondary?: BillboardAction
}

const themes = {
  navy: {
    block: 'bg-navy-bolder',
    rule: 'border-navy-bold',
    eyebrow: 'text-[#e0e0cc]',
    heading: 'text-white',
    body: 'text-white/90',
    detail: 'text-white',
    primary: 'primary',
    secondary: 'outline',
  },
  tan: {
    block: 'bg-tan-subtlest',
    rule: 'border-tan-subtle',
    eyebrow: 'text-navy-bright',
    heading: 'text-navy-bolder',
    body: 'text-neutral-subtle',
    detail: 'text-navy-bolder',
    primary: 'navy',
    secondary: 'outline-dark',
  },
} as const

function ArrowIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  )
}

function Action({ action, variant }: { action: BillboardAction; variant: 'primary' | 'navy' | 'outline' | 'outline-dark' }) {
  return (
    <ButtonLink
      href={action.href}
      variant={variant}
      size="lg"
      {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {action.label}
      {action.external ? (
        <>
          <ExternalLinkIcon size="1em" />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : (
        <ArrowIcon />
      )}
    </ButtonLink>
  )
}

/**
 * The split billboard: a 50/50 block with a colour panel on one half and a
 * photograph filling the other. Inside the panel, an inset frame holds the
 * eyebrow, a 36px headline, a lead, optional bold detail lines, and one or two
 * buttons, each with an arrow.
 *
 * Every 50/50 feature in the prototype renders through this, so the headline
 * size, the buttons, and the spacing cannot drift between pages. It has no
 * section or container of its own; the page supplies them.
 */
export default function SplitBillboard({
  theme,
  imagePosition,
  image,
  imageOverlay,
  eyebrow,
  heading,
  headingLevel = 'h2',
  body,
  details,
  primary,
  secondary,
}: SplitBillboardProps) {
  const t = themes[theme]
  const Heading = headingLevel

  const photo = (
    <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
      <img src={image.src} alt={image.alt} className="absolute inset-0 w-full h-full object-cover" />
      {imageOverlay}
    </div>
  )

  const panel = (
    <div className="flex-1 flex items-center p-6 lg:p-12">
      <div className={`border ${t.rule} flex flex-col gap-4 px-6 py-10 lg:px-12 lg:py-16 w-full`}>
        <div className="flex flex-col gap-2">
          {eyebrow && (
            <p className={`font-body font-medium text-sm uppercase tracking-[0.05em] ${t.eyebrow}`}>{eyebrow}</p>
          )}
          <Heading className={`font-headline text-[30px] lg:text-[36px] leading-[1.1] ${t.heading}`}>{heading}</Heading>
        </div>
        {details && details.length > 0 && (
          <div className={`flex flex-col gap-1 font-body font-bold text-base ${t.detail}`}>
            {details.map((d, i) => <p key={i}>{d}</p>)}
          </div>
        )}
        <div className={`font-body text-lg leading-[1.5] ${t.body}`}>{body}</div>
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-start gap-3 pt-3">
          <Action action={primary} variant={t.primary} />
          {secondary && <Action action={secondary} variant={t.secondary} />}
        </div>
      </div>
    </div>
  )

  /* The photo leads when the block stacks. Image-right keeps it second in the
     source and reverses the column, so the DOM order never has to change. */
  return imagePosition === 'left' ? (
    <div className={`${t.block} flex flex-col lg:flex-row w-full`}>
      {photo}
      {panel}
    </div>
  ) : (
    <div className={`${t.block} flex flex-col-reverse lg:flex-row w-full`}>
      {panel}
      {photo}
    </div>
  )
}
