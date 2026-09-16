/**
 * Mock member account data.
 *
 * The live Drupal account reads membership status from Salesforce and currently
 * degrades to "temporarily unavailable" — see
 * `project-references/account-section-audit.md`. This file is what the redesign
 * shows when that data *is* available; the fallback state is still rendered from
 * `membership.statusAvailable === false`.
 */

import { allBooks, type Book } from '@/data/books'

export interface Entitlement {
  label: string
  detail: string
  /** Maps to the Drupal role that grants it, for the integration team. */
  role: string
  active: boolean
}

export interface Membership {
  memberNumber: string
  plan: string
  term: string
  joinedOn: string
  renewsOn: string
  price: number
  autoRenew: boolean
  isLifetime: boolean
  /** False reproduces the live site's Salesforce-unavailable state. */
  statusAvailable: boolean
}

export interface OrderRecord {
  number: string
  placedOn: string
  items: string
  total: number
  state: 'Completed' | 'Processing' | 'Shipped' | 'Refunded'
  kind: 'membership' | 'books' | 'subscription' | 'donation'
  /** Where the receipt lives, when the prototype has one to show. */
  receiptHref?: string
}

export interface SubscriptionRecord {
  title: string
  format: string
  term: string
  renewsOn: string
  price: number
  autoRenew: boolean
  nextIssue: string
}

export interface GiftRecord {
  receipt: string
  givenOn: string
  designation: string
  amount: number
  frequency: 'One-time' | 'Monthly'
  anonymous: boolean
  receiptHref?: string
}

export interface SavedArticle {
  title: string
  publication: string
  issue: string
  savedOn: string
  href: string
}

export interface WishlistItem {
  /** Resolved from the Press catalogue rather than restated, so a price or
      cover change in one place doesn't leave the wishlist quoting stale copy. */
  book: Book
  addedOn: string
}

export interface AddressRecord {
  label: string
  isDefault: boolean
  name: string
  lines: string[]
  city: string
  state: string
  zip: string
  country: string
}

export interface PaymentMethodRecord {
  brand: string
  last4: string
  expires: string
  isDefault: boolean
  usedFor: string[]
}

export const member = {
  salutation: 'Mr.',
  firstName: 'Matt',
  lastName: 'Curtin',
  email: 'member@example.com',
  phone: '(410) 268-6110',
  acceptsTexts: false,
  // These three have to be a combination the Profile form can actually
  // represent: 'Veteran' matched no militaryStatuses option, so that select
  // rendered empty. 'Retired' also squares with the Service guidance — retired
  // members pick their branch, while veterans pick Civilian and name the branch
  // under Military status.
  service: 'U.S. Navy',
  militaryStatus: 'Retired',
  // Spelled out, not abbreviated: it has to match an option in ranksForService().
  rank: 'Lieutenant Commander',
  suffix: '',
  graduationYear: '2004',
  memberSince: 'March 2019',
}

export const membership: Membership = {
  memberNumber: '10012345',
  plan: 'Full Membership',
  term: '1 year',
  joinedOn: 'March 14, 2019',
  renewsOn: 'March 14, 2027',
  price: 75,
  autoRenew: true,
  isLifetime: false,
  statusAvailable: true,
}

/**
 * Derived from the member-facing roles the live site uses to gate access:
 * online_member, proceedings_subscriber, naval_history_subscriber,
 * combat_fleets_subscriber. Administrative roles are deliberately absent —
 * this list is what a member's dues buy, not what an operator can do.
 */
export const entitlements: Entitlement[] = [
  { label: 'Proceedings', detail: 'Print and digital, plus the full archive', role: 'proceedings_subscriber', active: true },
  { label: 'Naval History', detail: 'Digital access; print available as an add-on', role: 'naval_history_subscriber', active: true },
  { label: 'Digital archive', detail: 'Every issue back to 1874', role: 'online_member', active: true },
  { label: 'Combat Fleets', detail: 'Reference database — not on your plan', role: 'combat_fleets_subscriber', active: false },
]

export const orders: OrderRecord[] = [
  {
    number: 'USNI-2026-408215',
    placedOn: 'March 14, 2026',
    items: 'Full Membership, 1 year · Naval History Magazine, 1 year',
    total: 107,
    state: 'Completed',
    kind: 'membership',
    receiptHref: '/membership/confirmation?plan=full&term=1&price=75&magTerm=1&magPrice=32&order=USNI-2026-408215&email=member%40example.com&name=Matt&card=4242',
  },
  {
    number: 'USNI-2026-391044',
    placedOn: 'February 2, 2026',
    items: 'AI Warfighting (hardcover) · Warfare Beneath the Waves',
    total: 68.90,
    state: 'Shipped',
    kind: 'books',
  },
  {
    number: 'NIF-2025-317604',
    placedOn: 'December 18, 2025',
    items: 'Gift — Oral History Program',
    total: 500,
    state: 'Completed',
    kind: 'donation',
    receiptHref: '/giving/donate/confirmation?amount=500&frequency=one-time&priorities=historic-preservation&order=NIF-2025-317604&email=member%40example.com&name=Matt&card=4242',
  },
  {
    number: 'USNI-2025-288117',
    placedOn: 'August 9, 2025',
    items: 'Standing Up the Space Force',
    total: 24.95,
    state: 'Completed',
    kind: 'books',
  },
  {
    number: 'USNI-2025-201338',
    placedOn: 'March 14, 2025',
    items: 'Full Membership, 1 year',
    total: 75,
    state: 'Completed',
    kind: 'membership',
  },
]

export const subscriptions: SubscriptionRecord[] = [
  {
    title: 'Proceedings',
    format: 'Print + digital',
    term: '1 year',
    renewsOn: 'March 14, 2027',
    price: 0,
    autoRenew: true,
    nextIssue: 'September 2026',
  },
  {
    title: 'Naval History',
    format: 'Print + digital',
    term: '1 year',
    renewsOn: 'March 14, 2027',
    price: 32,
    autoRenew: true,
    nextIssue: 'October 2026',
  },
]

export const giving: GiftRecord[] = [
  {
    receipt: 'NIF-2025-317604',
    givenOn: 'December 18, 2025',
    designation: 'Oral History Program',
    amount: 500,
    frequency: 'One-time',
    anonymous: false,
    receiptHref: '/giving/donate/confirmation?amount=500&frequency=one-time&priorities=historic-preservation&order=NIF-2025-317604&email=member%40example.com&name=Matt&card=4242',
  },
  {
    receipt: 'NIF-2025-284910',
    givenOn: 'June 30, 2025',
    designation: 'Most Needed',
    amount: 250,
    frequency: 'One-time',
    anonymous: true,
  },
  {
    receipt: 'NIF-2024-197455',
    givenOn: 'December 29, 2024',
    designation: 'Photo Archives',
    amount: 100,
    frequency: 'One-time',
    anonymous: false,
  },
]

export const givingTotals = {
  calendarYear: 2026,
  yearToDate: 0,
  lifetime: 850,
  leadershipCircleThreshold: 1000,
}

export const savedArticles: SavedArticle[] = [
  {
    title: 'Three MEFs Won’t Be Enough',
    publication: 'Proceedings',
    issue: 'April 2026',
    savedOn: 'August 11, 2026',
    href: '/proceedings/three-mefs',
  },
  {
    title: 'Fortifying the Digital Watch',
    publication: 'Proceedings',
    issue: 'April 2026',
    savedOn: 'July 28, 2026',
    href: '/proceedings/fortifying-digital-watch',
  },
  {
    title: 'Mitscher at Midway',
    publication: 'Naval History',
    issue: 'June 2026',
    savedOn: 'July 3, 2026',
    href: '/naval-history/mitscher-at-midway',
  },
]

/**
 * Books saved from the Press catalogue. The product page has offered an "Add to
 * Wishlist" control all along with nowhere for it to land; this is that list.
 */
const wishlistSeed: { id: string; addedOn: string }[] = [
  { id: 'nr9',  addedOn: 'August 18, 2026' },
  { id: 'ex3',  addedOn: 'August 4, 2026' },
  { id: 'bs1',  addedOn: 'July 22, 2026' },
  { id: 'nr2',  addedOn: 'June 30, 2026' },
  { id: 'bs8',  addedOn: 'May 12, 2026' },
]

export const wishlist: WishlistItem[] = wishlistSeed.flatMap(entry => {
  const book = allBooks.find(b => b.id === entry.id)
  return book ? [{ book, addedOn: entry.addedOn }] : []
})

export const addresses: AddressRecord[] = [
  {
    label: 'Home',
    isDefault: true,
    name: 'Matt Curtin',
    lines: ['401 South Bouldin Street'],
    city: 'Baltimore',
    state: 'Maryland',
    zip: '21224',
    country: 'United States',
  },
  {
    label: 'Office',
    isDefault: false,
    name: 'Matt Curtin',
    lines: ['291 Wood Road', 'Beach Hall'],
    city: 'Annapolis',
    state: 'Maryland',
    zip: '21402',
    country: 'United States',
  },
]

export const paymentMethods: PaymentMethodRecord[] = [
  { brand: 'Visa', last4: '4242', expires: '04 / 2029', isDefault: true, usedFor: ['Membership auto-renew', 'Naval History auto-renew'] },
  { brand: 'Mastercard', last4: '8891', expires: '11 / 2027', isDefault: false, usedFor: [] },
]

/** Mirrors the six interests on /newsletter so preferences can be revisited. */
export const newsletterInterests = [
  { id: 'usni-news', name: 'USNI News', frequency: 'Daily', subscribed: true },
  { id: 'proceedings', name: 'Proceedings', frequency: 'Monthly', subscribed: true },
  { id: 'naval-history', name: 'Naval History', frequency: 'Bimonthly', subscribed: true },
  { id: 'books-press', name: 'Books & Press', frequency: 'Regularly', subscribed: false },
  { id: 'member-updates', name: 'Member Updates', frequency: 'Monthly', subscribed: true },
  { id: 'events', name: 'Events', frequency: 'As scheduled', subscribed: false },
]

export const mailPreferences = [
  { id: 'print-renewal', label: 'Renewal notices by mail', detail: 'In addition to email reminders.', enabled: true },
  { id: 'print-catalog', label: 'Naval Institute Press catalog', detail: 'Two mailings a year.', enabled: true },
  { id: 'print-appeals', label: 'Foundation appeals by mail', detail: 'Year-end and spring giving appeals.', enabled: false },
]

export interface MemberUpdate {
  id: string
  title: string
  /** Publication date, already formatted for display. */
  date: string
  /** One-line dek shown in the notifications list. */
  blurb: string
  /** Unread on first load — drives the bell's badge count. */
  unread: boolean
  body: string[]
  promo?: { code: string; note: string }
  cta?: { label: string; href: string }
  footnote?: string
}

/**
 * The Member Updates feed. On the live site this is a promotional river that
 * takes the whole account landing page; here it moves into the account hero as
 * a notification bell, so a member's own records lead instead.
 *
 * Content mirrors the live /user/member-updates nodes.
 */
export const memberUpdates: MemberUpdate[] = [
  {
    id: 'summer-membership-sale-extended',
    title: 'Our Summer Membership Sale — Extended!',
    date: '4 August 2026',
    blurb: 'One more month to take advantage of our biggest membership sale of the year.',
    unread: true,
    body: [
      'In response to overwhelming demand, we’ve decided to extend our America 250th membership promotion to 11:59pm ET, 31 August 2026. That means you have one more month to take advantage of our biggest membership sale of the year.',
      'Now’s the time to get $25 off when you renew your current membership — or give a gift of membership to someone in your life who’s interested in sea power.',
    ],
    promo: { code: 'USA250', note: 'Use this code at checkout to take $25 off.' },
    cta: { label: 'Renew or gift membership', href: '/membership/join' },
    footnote:
      'Discount not valid for Student or Life tiers. To renew a Naval History membership, reach out to Member Services at member@usni.org or call 1-800-233-8764 to access your discount.',
  },
  {
    id: 'members-get-20-ships-store',
    title: 'Members Get 20% Off Our Ship’s Store',
    date: '22 July 2026',
    blurb: 'The Ship’s Store is now open to everyone — members save 20% year-round.',
    unread: true,
    body: [
      'Our Naval Institute Ship’s Store is now open to everyone.',
      'Members — don’t forget that you get 20% off any purchase in our Ship’s Store year-round. Just use your member code at checkout.',
      'A few tips for using the store: you will need to make an account on the store site to purchase, as it is managed outside of usni.org. When filling out your shipping address, use the autofill dropdown when it appears, and select your state from the dropdown rather than typing it. All items are made to order and ship in about four weeks.',
    ],
    promo: { code: 'WORDEN20', note: 'Get 20% off any purchase, year-round.' },
    cta: { label: 'Browse our store', href: '/ships-store' },
    footnote:
      'Problem with your order or navigating the site? Contact our partner Marco Promotions directly at stores@marcopromos.com.',
  },
  {
    id: 'save-and-celebrate-250-year-legacy',
    title: 'Save and Celebrate America’s 250-Year Legacy',
    date: '26 June 2026',
    blurb: 'America turns 250 next month. Honor the milestone by renewing your commitment.',
    unread: true,
    body: [
      'America turns 250 next month. Honor this milestone anniversary by renewing your commitment to the Naval Institute.',
      'Get $25 off your membership now through 31 July 2026. Not up for renewal yet? Gift a membership to a family member or friend instead.',
    ],
    promo: { code: 'USA250', note: 'Use this code at checkout to take $25 off.' },
    cta: { label: 'Renew or gift membership', href: '/membership/join' },
    footnote:
      'Discount not valid for Student or Life tiers. To renew a Naval History membership, reach out to Member Services at member@usni.org or call 1-800-233-8764 to access your discount.',
  },
  {
    id: '250th-sale-extended',
    title: 'Our 250th Sale Has Been Extended',
    date: '6 November 2025',
    blurb: '$25 off membership and $20 off Naval History subscriptions through the end of the year.',
    unread: false,
    body: [
      'The U.S. Naval Institute recognizes that many in our community have been impacted by the recent government shutdown. In response, we are extending our 250th sale into the holiday season. You can now get $25 off membership and $20 off Naval History subscriptions until 11:59pm ET on 31 December 2025.',
      'Save $25 on new, renewed, and gift memberships with code CELEBRATE250. Membership benefits include the monthly Proceedings magazine, up to 40% off Naval Institute Press books, a subscription to our member-exclusive USNI News: Sea Scroll weekly newsletter, and 20% off items in our Ship’s Store year-round.',
      'Save $20 on Naval History magazine subscriptions with code HISTORY250. Note that your membership discount and the 250th discount cannot be used together — you must choose one or the other.',
    ],
    promo: { code: 'CELEBRATE250', note: 'Save $25 on new, renewed, and gift memberships.' },
    cta: { label: 'Join or renew', href: '/membership/join' },
    footnote:
      'Membership discount not valid for Student or Life tiers. The Naval History discount is not valid for the 1-year digital tier.',
  },
  {
    id: 'proceedings-digital-archive-live',
    title: 'Proceedings Digital Magazine Archive Now Live',
    date: '12 August 2025',
    blurb: 'Our full archive of flippable Proceedings magazine PDFs is now in one place.',
    unread: false,
    body: [
      'Our Proceedings digital archive is now live. It’s easier than ever to reach our full archive of flippable magazine PDFs in one place.',
      'Just log into your account and go to the Proceedings digital edition archive to browse the full library, dating back to the very first issue.',
      'This digital version retains the magazine’s original print format as a flippable PDF. You can page through the print edition, zoom in and out on text, search keywords, and jump to the articles you want to read from the table of contents.',
    ],
    cta: { label: 'Browse the archive', href: '/proceedings/all-issues' },
  },
]
