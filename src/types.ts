export interface Article {
  id: string
  category: string
  headline: string
  excerpt?: string
  author?: string
  date: string
  image?: string
  imageAlt?: string
  href: string
}

export interface MegaMenuCTA {
  headline: string
  body: string
  ctaLabel: string
  ctaHref: string
}

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
  megaCta?: MegaMenuCTA
  alignRight?: boolean
}

export interface PlainCardData {
  headline: string
  body: string
  cta: string
  href: string
}
