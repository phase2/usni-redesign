/**
 * Data for the next-gen account dashboard (`/account/next-gen`).
 *
 * Two features were cut from the shipped dashboard and are restored there:
 * donation progress, and the "what your membership includes" block that turns
 * entitlements into an upgrade path. Both need figures the shipped mock data
 * cannot supply, so they live here rather than in `data/account.ts`:
 *
 *  - The recognition ladder is real (four annual societies, live thresholds)
 *    but had no machine-readable form — `givingSocietyDonors.ts` states the
 *    bands only in prose, inside each society's description.
 *  - `givingTotals.yearToDate` is legitimately $0: the member's last gift was
 *    December 2025, and the shipped dashboard is correct to show an empty bar.
 *    A progress meter demonstrated at 0% shows nothing, so this file layers two
 *    2026 gifts onto the shared record and recomputes the totals from them.
 *
 * Nothing here mutates `data/account.ts`, so the shipped dashboard, giving
 * history, and receipts pages are untouched.
 */

import { entitlements, giving, givingTotals, membership, type GiftRecord } from '@/data/account'
import { annualSocieties, societyCourtesies } from '@/data/givingSocietyDonors'

// ─── Donation progress ────────────────────────────────────────────────────────

/** Gifts added for the demo, newest first. Same shape as the shared records. */
const gifts2026: GiftRecord[] = [
  {
    receipt: 'NIF-2026-402188',
    givenOn: 'June 4, 2026',
    designation: 'Naval History Magazine Fund',
    amount: 350,
    frequency: 'One-time',
    anonymous: false,
  },
  {
    receipt: 'NIF-2026-352017',
    givenOn: 'February 11, 2026',
    designation: 'Most Needed',
    amount: 250,
    frequency: 'One-time',
    anonymous: false,
  },
]

export const nextGenGiving: GiftRecord[] = [...gifts2026, ...giving]

const yearToDate = gifts2026.reduce((sum, g) => sum + g.amount, 0)

export const nextGenGivingTotals = {
  calendarYear: givingTotals.calendarYear,
  yearToDate,
  lifetime: givingTotals.lifetime + yearToDate,
  giftCount: nextGenGiving.length,
}

export interface RecognitionTier {
  /** Key into `annualSocieties`, and the anchor on the recognition page. */
  slug: keyof typeof annualSocieties
  /** Lower bound of the annual band, in dollars. */
  threshold: number
}

/**
 * The four annual recognition societies, lowest band first. Titles are read
 * from `annualSocieties` so a rename on the Giving pages carries through here;
 * only the numeric bands are restated, because prose is all the source has.
 */
const TIER_BANDS: RecognitionTier[] = [
  { slug: 'leadership-circle', threshold: 1000 },
  { slug: '1873-society', threshold: 5000 },
  { slug: 'stephen-b-luce-society', threshold: 10000 },
  { slug: 'alfred-thayer-mahan-society', threshold: 25000 },
]

export const recognitionLadder = TIER_BANDS.map(tier => ({
  ...tier,
  name: annualSocieties[tier.slug].title,
  href: `/giving/donor-recognition/annual#${tier.slug}`,
}))

export type LadderTier = (typeof recognitionLadder)[number]

/** The lowest tier the member has not yet reached this calendar year. */
export const nextTier: LadderTier | undefined = recognitionLadder.find(
  t => nextGenGivingTotals.yearToDate < t.threshold,
)

/** The highest tier already reached, if any — drives the "you are in" badge. */
export const currentTier: LadderTier | undefined = [...recognitionLadder]
  .reverse()
  .find(t => nextGenGivingTotals.yearToDate >= t.threshold)

export const amountToNextTier = nextTier
  ? nextTier.threshold - nextGenGivingTotals.yearToDate
  : 0

/**
 * Months left in the calendar year as of the prototype's fixed present,
 * 21 September 2026 — October, November, December. Hard-coded rather than
 * derived from `Date.now()` because every other date in the account mock is a
 * fixed string, and a live clock would make the monthly suggestion drift away
 * from the gift dates beside it.
 */
export const monthsLeftInYear = 3

/** Recurring gift that would close the gap before 31 December. */
export const monthlySuggestion = Math.ceil(amountToNextTier / monthsLeftInYear / 5) * 5

/** Identical on all four society pages, so the ladder reuses the shared list. */
export const tierCourtesies = societyCourtesies

// ─── What your membership includes ────────────────────────────────────────────

export const activeEntitlements = entitlements.filter(e => e.active)
export const inactiveEntitlements = entitlements.filter(e => !e.active)

export interface MemberPerk {
  label: string
  detail: string
  icon: string
  href: string
  /** Link text — each perk points at the place the discount is actually spent. */
  cta: string
}

/**
 * The discounts a membership carries. The shipped dashboard showed entitlements
 * (what you can read) but never these (what you can spend), which is the half
 * of "what your membership includes" that earns the Institute money. Wording
 * matches the join page's feature lists so the two cannot disagree.
 */
export const memberPerks: MemberPerk[] = [
  {
    label: 'Up to 40% off Naval Institute Press',
    detail: 'Member pricing shows automatically at checkout.',
    icon: 'fa-book',
    href: '/books',
    cta: 'Browse the catalog',
  },
  {
    label: "20% off the Ship's Store",
    detail: 'Year-round, on any purchase, with your member code.',
    icon: 'fa-anchor',
    href: '/membership',
    cta: 'See member benefits',
  },
  {
    label: 'Free USNI conference invitations',
    detail: 'Plus discounted access to WEST.',
    icon: 'fa-calendar-days',
    href: '/events',
    cta: 'See what’s scheduled',
  },
  {
    label: 'Sea Scroll, members only',
    detail: 'The weekly USNI News briefing.',
    icon: 'fa-envelope',
    href: '/newsletter',
    cta: 'Manage newsletters',
  },
]

export interface UpgradeOffer {
  id: string
  name: string
  price: string
  priceNote: string
  pitch: string
  bullets: string[]
  ctaLabel: string
  ctaHref: string
}

/** Life-member extras, as the join page words them. */
const lifeExtras = [
  'A Naval Institute fleece pullover, cap, patch, and lapel pin',
  'A Life Member certificate and Naval Institute decals',
  'No renewal notice, ever again',
]

export const lifeUpgrade: UpgradeOffer = {
  id: 'full-life',
  name: 'Full Life membership',
  price: '$1,873',
  priceNote: 'one time',
  pitch:
    'Everything on your Full Membership, for life — print Proceedings, the archive, and every member discount.',
  bullets: lifeExtras,
  ctaLabel: 'Upgrade to Full Life',
  ctaHref: '/membership/join',
}

/**
 * Years of dues the life price covers at the member's current rate. The pitch
 * is honest arithmetic rather than a claim about savings: it says how long the
 * one-time price runs, and lets the member decide.
 */
export const lifeBreakEvenYears = Math.round(1873 / membership.price)
