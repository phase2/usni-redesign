/**
 * Contact information for the consolidated Contact USNI page.
 *
 * Transcribed from four standalone pages on the current site:
 *   /about-us/contact-us     — visiting directions, general contact form
 *   /membership/contact-us   — the same visiting directions, nothing else
 *   /donate/contact-us       — Naval Institute Foundation staff and addresses
 *   /press/contact-us        — Naval Institute Press staff by department
 *   /archives/contact-us     — research and photo-archive inquiries
 *
 * The About and Membership pages carried identical directions blocks, which is
 * part of why merging them is worth doing.
 */

export interface ContactPerson {
  name: string
  role: string
  email?: string
  phone?: string
  /** Headshot, or the watermark stand-in where we have none. */
  image?: string
}

export interface ContactGroup {
  title: string
  people: ContactPerson[]
}

/** Institute-wide details, as published in the site footer. */
export const generalContact = {
  address: ['U.S. Naval Institute', '291 Wood Road', 'Annapolis, MD 21402'],
  tollFree: '1-800-233-8764',
  local: '410-268-6110',
  fax: '410-571-1703',
  customerEmail: 'customer@usni.org',
  memberEmail: 'member@usni.org',
}

export const memberServices = {
  blurb:
    'Questions about joining, renewing, gift memberships, magazine delivery, or your account. Member services can also look up your member number and fix a lapsed subscription.',
  email: 'member@usni.org',
  tollFree: '1-800-233-8764',
  local: '410-268-6110',
  hours: 'Monday–Friday, 8:00 a.m. – 4:30 p.m. Eastern',
}

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
  phone: '410-295-1054',
  fax: '410-295-1050',
  tollFree: '1-800-233-8764',
  local: '410-268-6110',
}

export const foundationStaff: ContactPerson[] = [
  { name: 'Laura McCullough', role: 'Chief Development Officer', phone: '(814) 341-1707', email: 'lmccullough@usni.org', image: imgLauraMccullough },
  { name: 'Rebecca Lee', role: 'Director of Annual Giving', phone: '(410) 295-1056', email: 'rlee@usni.org', image: imgWatermark },
  { name: 'Amanda Ojeda', role: 'Development and Grant Manager', phone: '(410) 295-1062', email: 'aojeda@usni.org', image: imgAmandaOjeda },
  { name: 'Schuyler Tose', role: 'Prospect and Database Coordinator', phone: '(410) 295-1035', email: 'stose@usni.org', image: imgWatermark },
]

/* ── Naval Institute Press ───────────────────────────────────────────────── */

export const pressContact = {
  address: ['Naval Institute Press', '291 Wood Road', 'Annapolis, Maryland 21402'],
  phone: '410-295-1037',
  fax: '410-295-1084',
  tradeEmail: 'trade@usni.org',
  salesEmail: 'cnoble@usni.org',
}

export const pressNotes = [
  {
    title: 'Review copies, events, and author interviews',
    body: 'Contact Claire Noble, Sales and Marketing Director, at cnoble@usni.org.',
  },
  {
    title: 'Orders — members and consumers',
    body: 'Orders may be placed on the Naval Institute website. For additional help with an order, contact customer service.',
  },
  {
    title: 'Orders — trade retail and wholesale',
    body: 'Orders and inquiries can be sent to trade@usni.org or jrussell@usni.org.',
  },
  {
    title: 'Writing for the Press',
    body: 'For manuscript submissions, see the Press submission guidelines before getting in touch.',
  },
]

export const pressGroups: ContactGroup[] = [
  {
    title: 'Administration',
    people: [
      { name: 'Adam Kane', role: 'Press Director', email: 'akane@usni.org' },
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
      { name: 'Ashley Baird', role: 'Senior Production Editor', email: 'abaird@usni.org' },
      { name: 'Brennan Knight', role: 'Production Editor', email: 'bknight@usni.org' },
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

/* ── Archives ────────────────────────────────────────────────────────────── */

export const archivesContact = {
  blurb:
    'The Archives is open to the public, and visitors are welcome to conduct research on site in Beach Hall. Library staff also handle research requests remotely for those who cannot visit.',
  researchEmail: 'research@usni.org',
  photoEmail: 'photos@usni.org',
  photoSite: 'https://photos.usni.org',
  libraryPhone: '(410) 295-1022',
  turnaround:
    'Simple requests are normally answered within 24 to 48 hours. Detailed requests take longer, depending on what they involve.',
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
    'Without a current military ID and Department of Defense decals on your vehicle, you must obtain authorization before entering the Naval Academy.',
    'The Pass & ID office is ahead on the right, with parking to your right.',
    'Bring your driver’s licence, proof of insurance, and vehicle registration. You will be issued a visitor’s pass.',
    'Continue to Beach Hall on Hospital Point.',
  ],
  securityNote:
    'Security restrictions change with threat conditions and can make entry to the Naval Academy difficult without proper identification. Call the Naval Academy visitor line at 410-293-1000 before you travel.',
  academyPhone: '410-293-1000',
}

/** Options on the general contact form, as published today. */
export const contactTypes = ['Book Returns', 'Customer Support']
