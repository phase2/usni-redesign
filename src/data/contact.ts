/**
 * Contact information for the contact hub and the department contact pages.
 *
 * Transcribed from the live site's contact pages, which the redesign splits
 * between a short hub (/contact) and pages that live in their own sections:
 *   /about-us/contact-us    → /contact (form, visiting directions)
 *   /media-inquiries        → /contact#media
 *   /donate/contact-us      → /giving/contact
 *   /press/contact-us       → /books/contact
 *   /archives/contact-us    → /archives/research-requests
 *   /advertise-us           → /advertise
 * Member Services, which the live site only reaches through deep links into
 * the general page, gets a page and form of its own at /membership/contact.
 *
 * Corrections to the live copy:
 * - Several mailto links send to a different address than they display (Amanda
 *   Ojeda, Jessica Sparks, Ashley Baird, Megan Kellenberger, Claire Noble);
 *   each now mails the address it shows.
 * - Schuyler Tose's number reads "(410) 295-410-1061"; it is given here as
 *   (410) 295-1061.
 */

export interface ContactPerson {
  name: string
  role: string
  email?: string
  phone?: string
  /** Leadership profile, where the person has one. */
  profileHref?: string
  /** Headshot, or the watermark stand-in where we have none. */
  image?: string
}

export interface ContactGroup {
  title: string
  people: ContactPerson[]
}

export const telHref = (n: string) => `tel:${n.replace(/[^0-9]/g, '')}`

/** Institute-wide details, as published in the site footer. */
export const generalContact = {
  address: ['U.S. Naval Institute', '291 Wood Road', 'Annapolis, MD 21402'],
  tollFree: '1-800-233-8764',
  local: '410-268-6110',
  fax: '410-571-1703',
  customerEmail: 'customer@usni.org',
  hours: 'Monday–Friday, 8:00 a.m. – 4:30 p.m. Eastern',
}

/* ── Contact hub ─────────────────────────────────────────────────────────── */

/** A team with a page of its own, as the hub's "Find the right team" cards. */
export interface ContactRoute {
  title: string
  summary: string
  href: string
  cta: string
}

export const contactRoutes: ContactRoute[] = [
  {
    title: 'Member Services',
    summary: 'Joining, renewing, magazine delivery, billing, and your account.',
    href: '/membership/contact',
    cta: 'Contact Member Services',
  },
  {
    title: 'Editorial Staff',
    summary: 'The editors of Proceedings and Naval History, and how to submit an article.',
    href: '/about/editorial-staff',
    cta: 'See the masthead',
  },
  {
    title: 'Naval Institute Press',
    summary: 'Review copies, author events, trade orders, and rights and permissions.',
    href: '/books/contact',
    cta: 'Contact the Press',
  },
  {
    title: 'Archives Research Requests',
    summary: 'Library research, copies of past articles, photos, and on-site visits.',
    href: '/archives/research-requests',
    cta: 'Request research',
  },
  {
    title: 'Naval Institute Foundation',
    summary: 'Donations, gifts of stock, planned giving, and corporate sponsorship.',
    href: '/giving/contact',
    cta: 'Contact the Foundation',
  },
  {
    title: 'Advertising',
    summary: 'The media kit, audience, and our advertising sales team.',
    href: '/advertise',
    cta: 'Advertise with us',
  },
]

/**
 * Options on the hub's Contact Type dropdown. The live form offers only Book
 * Returns and Customer Support. Types another team handles stay selectable, so
 * a reader who picks one is pointed to that team rather than turned away.
 */
export interface ContactType {
  label: string
  /** Set when another team has its own page for this. */
  routeTo?: { team: string; href: string }
}

export const contactTypes: ContactType[] = [
  { label: 'Order or shipping question' },
  { label: 'Book return' },
  { label: 'Website or sign-in help' },
  { label: 'Events' },
  { label: 'Media inquiry' },
  { label: 'Website feedback' },
  { label: 'Something else' },
]

export const routedContactTypes: ContactType[] = [
  { label: 'Membership, renewal, or magazine delivery', routeTo: { team: 'Member Services', href: '/membership/contact' } },
  { label: 'Submitting an article', routeTo: { team: 'the editorial staff', href: '/about/editorial-staff' } },
  { label: 'Donation or gift', routeTo: { team: 'the Naval Institute Foundation', href: '/giving/contact' } },
  { label: 'Research or archive request', routeTo: { team: 'the Archives', href: '/archives/research-requests' } },
  { label: 'Advertising', routeTo: { team: 'Advertising', href: '/advertise' } },
]

/** /media-inquiries, folded into the hub. */
export const mediaContact = {
  blurb:
    'The U.S. Naval Institute can quickly provide leading experts on issues relating to national security, naval affairs, global sea power, and naval history.',
  team: 'Communications Team',
  email: 'media@usni.org',
  phone: '(410) 295-1026',
}

/* ── Member Services ─────────────────────────────────────────────────────── */

export const memberServices = {
  email: 'member@usni.org',
  tollFree: '1-800-233-8764',
  local: '410-268-6110',
  hours: 'Monday–Friday, 8:00 a.m. – 4:30 p.m. Eastern',
}

/**
 * The member form asks first whether the reader is a member, so a prospective
 * member's question (a lead) and a member's support request arrive tagged and
 * can go to different queues.
 */
export const memberTopics = [
  'Renewing my membership',
  'Magazine delivery',
  'Updating my address or contact details',
  'Billing or payment',
  'Signing in or my online account',
  'Gift membership I gave or received',
  'Changing or canceling my membership',
  'Something else',
]

export const prospectTopics = [
  'Choosing a membership',
  'Student, military, or group rates',
  'Giving a membership as a gift',
  'What membership includes',
  'Something else',
]

/**
 * The Member Services page's quick links: joining for a prospective member,
 * then the self-service pages that answer the most common member requests
 * without a message.
 */
export const memberSelfService = [
  { label: 'Join the Naval Institute', href: '/membership/join' },
  { label: 'Renew your membership', href: '/login' },
  { label: 'Update your address', href: '/account/addresses' },
  { label: 'Manage subscriptions', href: '/account/subscriptions' },
  { label: 'Check an order', href: '/account/orders' },
  { label: 'Membership FAQ', href: '/faq#membership' },
]

/* ── Naval Institute Foundation (giving) ─────────────────────────────────── */

import imgLauraMccullough from '@/assets/images/team/mccullough_laura.jpg'
import imgAmandaOjeda from '@/assets/images/team/amanda-ojeda.jpeg'
/*
 * Stand-in for a staff member without a headshot — the same watermark the
 * leadership roster uses. Imported straight from assets rather than through
 * `leadership.ts`, which eagerly imports a hundred portraits and would drag all
 * of them into the Giving page's bundle.
 */
import imgWatermark from '@/assets/images/new-usni-default-watermark.png'

/** True for anyone rendering the watermark rather than a real portrait. */
export const CONTACT_PLACEHOLDER_IMAGE = imgWatermark

export const foundationContact = {
  blurb:
    'The Naval Institute Foundation raises the funds behind the Institute’s educational and preservation work — the essay contests, the oral histories, the photo archive, and the forum itself.',
  address: ['Naval Institute Foundation', '291 Wood Road', 'Annapolis, MD 21402'],
  email: 'foundation@usni.org',
  /** The Foundation office line its FAQ answers give. */
  phone: '410-295-1054',
  tollFree: '1-800-233-8764',
  local: '410-268-6110',
  fax: '410-295-1050',
}

export const foundationStaff: ContactPerson[] = [
  { name: 'Laura McCullough', role: 'Chief Development Officer', phone: '(814) 341-1707', email: 'lmccullough@usni.org', image: imgLauraMccullough, profileHref: '/about/leadership/laura-mccullough' },
  { name: 'Amanda Ojeda', role: 'Development and Grant Manager', phone: '(410) 295-1062', email: 'aojeda@usni.org', image: imgAmandaOjeda },
  { name: 'Schuyler Tose', role: 'Prospect and Database Coordinator', phone: '(410) 295-1061', email: 'stose@usni.org', image: imgWatermark },
]

/* ── Naval Institute Press ───────────────────────────────────────────────── */

export const pressContact = {
  address: ['Naval Institute Press', '291 Wood Road', 'Annapolis, Maryland 21402'],
  phone: '410-295-1037',
  fax: '410-295-1084',
  social: [
    { label: 'X (Twitter)', href: 'https://twitter.com/USNIBooks', icon: 'fa-brands fa-x-twitter' },
    { label: 'Facebook', href: 'https://www.facebook.com/NavalInstitute/', icon: 'fa-brands fa-facebook-f' },
    { label: 'Instagram', href: 'https://www.instagram.com/navalinstitute/', icon: 'fa-brands fa-instagram' },
  ],
}

export const pressGroups: ContactGroup[] = [
  {
    title: 'Administration',
    people: [
      { name: 'Adam Kane', role: 'Press Director', email: 'akane@usni.org', profileHref: '/about/leadership/adam-kane' },
      { name: 'Claire Noble', role: 'Deputy Press Director', email: 'cnoble@usni.org' },
    ],
  },
  {
    title: 'Editorial',
    people: [
      { name: 'Pat Carlin', role: 'Senior Acquisitions Editor', email: 'pcarlin@usni.org' },
      { name: 'Steve Catalano', role: 'Senior Acquisitions Editor', email: 'scatalano@usni.org' },
      { name: 'Susan Todd Brook', role: 'Senior Acquisitions Editor / Subsidiary Rights', email: 'sbrook@usni.org' },
      { name: 'Jessica Sparks', role: 'Assistant Editor', email: 'jsparks@usni.org' },
    ],
  },
  {
    title: 'Production',
    people: [
      { name: 'Susan Corrado', role: 'Managing Editor', email: 'scorrado@usni.org' },
      { name: 'Brennan Knight', role: 'Production Editor', email: 'bknight@usni.org' },
      { name: 'Ashley Baird', role: 'Senior Production Editor', email: 'abaird@usni.org' },
    ],
  },
  {
    title: 'Sales and Marketing',
    people: [
      { name: 'Claire Noble', role: 'Deputy Press Director / Sales, Marketing & Publicity', email: 'cnoble@usni.org' },
      { name: 'Jack Russell', role: 'Sales and Digital Content Marketing Manager', email: 'jrussell@usni.org' },
      { name: 'Megan Kellenberger', role: 'Marketing Coordinator', email: 'mkellenberger@usni.org' },
    ],
  },
  {
    title: 'Rights and Permissions',
    people: [
      { name: 'Susan Todd Brook', role: 'Subsidiary Rights Manager', email: 'sbrook@usni.org' },
    ],
  },
]

/* ── Archives research requests ──────────────────────────────────────────── */

export const archivesContact = {
  researchEmail: 'research@usni.org',
  photoEmail: 'photos@usni.org',
  photoSite: 'https://photos.usni.org',
  customerEmail: 'customer@usni.org',
  memberEmail: 'member@usni.org',
  libraryPhone: '(410) 295-1022',
}

/* ── Advertising ─────────────────────────────────────────────────────────── */

export const advertisingContact = {
  name: 'Lewis Duncan',
  role: 'Director of Corporate Strategic Partnerships & Advertising',
  email: 'lduncan@usni.org',
  phone: '410-295-1041',
  mediaKitHref: 'https://www.scribd.com/document/940190892/2026-Media-Kit',
  termsHref: 'https://www.usni.org/us-naval-institute-standard-terms-and-conditions-advertising-services',
}

/* ── Visiting ────────────────────────────────────────────────────────────── */

export const visiting = {
  intro:
    'The Naval Institute’s executive and editorial offices are in Beach Hall, on the grounds of the U.S. Naval Academy in Annapolis, Maryland.',
  gps: '291 Wood Road, Annapolis, MD 21402',
  directionsTitle: 'Driving directions from Route 50',
  directions: [
    'Take Exit 24, Rowe Boulevard.',
    'Cross the bridge.',
    'Turn left onto Taylor Avenue.',
    'Turn right onto Route 450.',
    'Turn right onto King George Street.',
    'Arrive at USNA Gate #1 guard station.',
  ],
  passSteps: [
    'Without a current military ID and Department of Defense decals on your vehicle, you must obtain prior authorization from a Naval Institute representative at least ten days before your visit.',
    'The Pass & ID office is ahead on the right, with parking to your right.',
    'Bring your driver’s license, proof of insurance, and vehicle registration. You will be issued a visitor’s pass.',
    'Continue to Beach Hall on Hospital Point.',
  ],
  securityNote:
    'Security restrictions change with threat conditions and can make entry to the Naval Academy difficult without proper identification. Call the Naval Academy at 410-293-1000, option 5, before you travel.',
  academyPhone: '410-293-1000',
  securityHref: 'https://www.usna.edu/SecuInfoPers/FAQS.htm',
}
