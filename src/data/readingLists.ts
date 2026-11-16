/**
 * Military reading lists — the service chiefs' professional reading programs,
 * and which Naval Institute Press titles appear on each.
 *
 * The live page (/press/military-reading-lists) is a stack of nine hand-edited
 * promo blocks. Four of the nine carry no Press titles at all ("None listed at
 * this time"), and two of them — Blue & Gold and Scarlet & Gold — simply repeat
 * the bibliographies that already live on their own series pages. The redesign
 * splits those into three groups so the page leads with the lists that actually
 * carry Press books:
 *
 *   1. `serviceLists` — a list with Press titles on it, rendered in full.
 *   2. `crossLinkedSeries` — the Press's own professional libraries, shown as a
 *      cross-link to the series page rather than a second copy of the list.
 *   3. `emptyLists` — a list with no Press titles yet, collapsed into a compact
 *      row of outbound links instead of nine-tenths of a page of empty section.
 *
 * Every external CTA below is transcribed from the live page. Several could not
 * be verified — see `project-references/books-press-collections-link-audit.md`;
 * the .mil hosts block automated requests, and some of the quoted copy is
 * visibly out of date.
 */

import type { CollectionTitle } from './bookCollections'
import { UNAVAILABLE } from './bookCollections'

export interface ReadingList {
  /** Anchor id, used by the page's jump-link nav. */
  id: string
  name: string
  /** Short label for the jump nav. */
  navLabel: string
  /** Which service or command owns the list. */
  service: string
  intro: string[]
  /** Attribution for a quoted introduction, e.g. a signed CSAF letter. */
  attribution?: { name: string; title: string[] }
  /**
   * The Press titles on the list, as one flat set. The Commandant's list
   * divides its picks into four categories on the source site; the redesign
   * shows one grid per list and does not carry that grouping.
   */
  titles: CollectionTitle[]
  cta?: { label: string; href: string }
}

/* ── Lists carrying Naval Institute Press titles ────────────────────────────── */

export const serviceLists: ReadingList[] = [
  {
    id: 'cno',
    name: 'CNO’s Professional Reading Library',
    navLabel: 'Navy (CNO)',
    service: 'U.S. Navy',
    intro: [
      'The Chief of Naval Operations’ Professional Reading Library supports the professional development of every sailor, from recruit to flag officer.',
    ],
    titles: [
          {
            title: 'War Transformed',
            byline: 'By Mick Ryan',
            slug: 'war-transformed',
            href: '/press/books/war-transformed',
            format: 'Hardcover',
            price: 39.95,
            memberPrice: 31.96,
          },
          {
            title: 'Learning War',
            subtitle: 'The Evolution of Fighting Doctrine in the U.S. Navy, 1898–1945',
            byline: 'By Trent Hone',
            slug: 'learning-war-0',
            href: '/press/books/learning-war',
            format: 'Softcover',
            price: 34.95,
            memberPrice: 27.96,
          },
          {
            title: 'China as a Twenty-First Century Naval Power',
            byline: 'By Michael A. McDevitt',
            slug: 'china-twenty-first-century-naval-power',
            href: '/press/books/china-as-a-twenty-first-century-naval-power',
            format: 'Softcover',
            price: 37.95,
            memberPrice: 30.36,
          },
          {
            title: 'Red Star Over the Pacific, Second Edition',
            availability: UNAVAILABLE,
          },
          {
            title: 'The Bluejacket’s Manual, 26th Edition',
            byline: 'By Thomas J. Cutler, Mark T. Hacala, and Paul A. Kingsbury',
            slug: 'bluejackets-manual-26th-edition-0',
            href: '/press/books/bluejackets-manual-26th-edition',
            format: 'Hardcover',
            price: 45.0,
            memberPrice: 36.0,
          },
          {
            title: 'The Chief Petty Officer’s Guide, 2nd Edition',
            byline: 'By FLTCM Paul A. Kingsbury, USN',
            slug: 'chief-petty-officers-guide-2nd-edition',
            href: '/press/books/chief-petty-officers-guide-2nd-edition',
            format: 'Hardcover',
            price: 41.95,
            memberPrice: 33.56,
          },
          {
            title: 'Command at Sea, 7th Edition',
            byline: 'By ADM James Stavridis, USN (Ret.) and RADM Robert Girrier, USN (Ret.)',
            slug: 'command-sea-7th-edition',
            href: '/press/books/command-at-sea-7th-edition',
            format: 'Hardcover',
            price: 49.95,
            memberPrice: 29.97,
          },
          {
            title: 'Developing the Naval Mind',
            byline: 'By Benjamin F. Armstrong and John Freymann',
            slug: 'developing-naval-mind',
            href: '/press/books/developing-the-naval-mind',
            format: 'Hardcover',
            price: 26.95,
            memberPrice: 21.56,
          },
          {
            title: 'Dictionary of Modern Strategy and Tactics',
            byline: 'By Michael Keane',
            availability: UNAVAILABLE,
          },
          {
            title: 'Dictionary of Naval Abbreviations',
            byline: 'By Deborah W. Cutler and Thomas J. Cutler',
            availability: UNAVAILABLE,
          },
          {
            title: 'Division Officer’s Guide, 12th Edition',
            byline: 'By ADM James Stavridis, USN (Ret.) and RADM Robert Girrier, USN (Ret.)',
            slug: 'division-officers-guide-12th-edition',
            href: '/press/books/division-officers-guide-12th-edition',
            format: 'Hardcover',
            price: 38.95,
            memberPrice: 31.16,
          },
    ],
    cta: {
      label: 'View the CNO’s Professional Reading Library',
      href: 'https://www.navy.mil/CNO-Professional-Reading-Library/',
    },
  },
  {
    id: 'commandant',
    name: '2026 Marine Corps Commandant’s Professional Reading Program',
    navLabel: 'Marine Corps',
    service: 'U.S. Marine Corps',
    intro: [
      'The Commandant’s Professional Reading Program, established in 1989, is a cornerstone of Marine professional development. It challenges every Marine to think critically, act ethically, and cultivate the intellectual readiness required to lead in a rapidly changing world. The program deepens understanding of war, leadership, and decision-making, while strengthening the shared identity that binds Marines across generations.',
      'The FY26 Commandant’s Professional Reading List (CPRL) has been refined in preparation for the Corps’ 250th anniversary, aligning with the Commandant’s guidance to honor our heritage while preparing for the future fight. The updated list incorporates Semper Fidelis: 250 Years of U.S. Marine Corps Honor, Courage, and Commitment — a flagship publication from Marine Corps University’s History Division that serves as a centerpiece for 250th-anniversary communications and reflection.',
      'The Commandant’s Choice for FY26, Once an Eagle by Anton Myrer, has been reaffirmed as a timeless study in leadership and character. Its inclusion underscores the Commandant’s emphasis on integrity, moral courage, and the enduring responsibilities of command.',
    ],
    titles: [
      {
        title: 'First to Fight',
        byline: 'By Victor H. Krulak',
        slug: 'first-fight',
        href: '/press/books/first-to-fight',
        format: 'Softcover',
        price: 25.95,
        memberPrice: 20.76,
      },
      {
        title: 'How the Few Became the Proud',
        subtitle: 'Crafting the Marine Corps Mystique, 1874–1918',
        byline: 'By Heather P. Venable',
        slug: 'how-few-became-proud',
        href: '/press/books/how-the-few-became-the-proud',
        format: 'Softcover',
        price: 39.95,
        memberPrice: 31.96,
      },
      {
        title: 'Lejeune',
        byline: 'By Merrill L. Bartlett',
        slug: 'lejeune',
        href: '/press/books/lejeune',
        format: 'Softcover',
        price: 7.18,
      },
      {
        title: 'Delivering Destruction',
        subtitle: 'American Firepower and Amphibious Assault from Tarawa to Iwo Jima',
        byline: 'By Chris K. Hemler',
        slug: 'delivering-destruction',
        href: '/press/books/delivering-destruction',
        format: 'Hardcover',
        price: 34.95,
        memberPrice: 20.97,
      },
      {
        title: 'Learning War',
        subtitle: 'The Evolution of Fighting Doctrine in the U.S. Navy, 1898–1945',
        byline: 'By Trent Hone',
        slug: 'learning-war-0',
        href: '/press/books/learning-war',
        format: 'Softcover',
        price: 34.95,
        memberPrice: 27.96,
      },
      {
        title: 'Fleet Tactics and Naval Operations, Third Edition',
        byline:
          'By CAPT Wayne P. Hughes Jr., USN (Ret.) and RADM Robert P. Girrier, USN (Ret.)',
        slug: 'fleet-tactics-and-naval-operations-third-edition',
        href: '/press/books/fleet-tactics-and-naval-operations-3rd-edition',
        format: 'Hardcover',
        price: 59.95,
        memberPrice: 47.96,
      },
    ],
    cta: {
      label: 'View the Commandant’s Professional Reading List',
      href: 'https://grc-usmcu.libguides.com/cmc-reading-list/about',
    },
  },
  {
    id: 'space-force',
    name: 'NSSI Space Professional Reading List',
    navLabel: 'Space Force',
    service: 'U.S. Space Force',
    intro: [
      'The National Security Space Institute’s Space Professional Reading List is recommended reading for U.S. Department of Defense and international partner space professionals. According to NSSI, these works provide a launching point for expanding existing knowledge, developing professional skills, and challenging conventional thinking about the profession. The recommended reading also introduces students and space professionals to the insights of NSSI educators and their recommendations for lifelong learning.',
      '“For the past 15 years the National Security Space Institute has released a Space Professional Reading List, designed to challenge Space Professionals to think critically about their profession. The 2024 list continues that theme, but I believe it’s the most dynamic, thought-provoking ever. From irregular warfare to great power competition, from doctrine to theory, and from commercial space to Sun Tzu, there’s something here for everyone. As the NSSI’s motto states, ‘Victory Begins In the Mind.’ I encourage readers to delve into these suggested readings and plant those seeds of victory.”',
    ],
    attribution: {
      name: 'Col. Kenneth Klock, U.S. Space Force',
      title: ['Commandant, National Security Space Institute'],
    },
    titles: [
          {
            title: 'Sun Tzu in Space',
            byline: 'By Gregory D. Miller',
            slug: 'sun-tzu-space',
            href: '/press/books/sun-tzu-in-space',
            format: 'Hardcover',
            price: 34.95,
            memberPrice: 27.96,
          },
          {
            title: 'Fight for the Final Frontier',
            byline: 'By John Jordan Klein',
            slug: 'fight-final-frontier',
            href: '/press/books/fight-for-the-final-frontier',
            format: 'Hardcover',
            price: 34.95,
            memberPrice: 20.97,
          },
    ],
    cta: {
      label: 'View the 2024 Space Professional Reading List',
      href: 'https://www.starcom.spaceforce.mil/News/Article-Display/Article/3664037/nssi-releases-annual-space-professional-reading-list/',
    },
  },
]

/* ── The Press's own professional libraries ─────────────────────────────────── */

export interface CrossLinkedSeries {
  /** Matches a `BookCollection.slug` in bookCollections.ts. */
  seriesSlug: string
  name: string
  blurb: string
}

/**
 * Shown on the reading-lists page as a pointer to the series page, not as a
 * second copy of the bibliography. The live page repeats all 24 Blue & Gold
 * titles and all 4 Scarlet & Gold titles here, which is a second list to keep
 * in sync for no reader benefit.
 */
export const crossLinkedSeries: CrossLinkedSeries[] = [
  {
    seriesSlug: 'blue-and-gold',
    name: 'Blue & Gold Professional Library',
    blurb:
      'Specialized books published by the Naval Institute Press for over 100 years, prepared and updated by naval professionals. Titles such as Division Officer’s Guide, Command at Sea, and Naval Shiphandler’s Guide have long been recognized in the fleet as essential guides for virtually all ranks across the three sea services.',
  },
  {
    seriesSlug: 'scarlet-and-gold',
    name: 'Scarlet & Gold Professional Library',
    blurb:
      'Marines of all ranks have depended on this series for their professional development. Like their Blue & Gold counterpart, titles such as The Marine Officer’s Guide and the Handbook for Marine NCOs have been prepared by professionals for today’s Marines.',
  },
]

/* ── Lists with no Press titles yet ─────────────────────────────────────────── */

export interface EmptyReadingList {
  name: string
  service: string
  blurb: string
  cta: { label: string; href: string }
  /** Set when the live page's copy is visibly out of date. */
  staleNote?: string
}

export const emptyLists: EmptyReadingList[] = [
  {
    name: 'Coast Guard Leadership Development List',
    service: 'U.S. Coast Guard',
    blurb:
      'An annual collection of recommendations from across the service to support continuous professional and leadership development, going beyond a traditional reading list to include material to read, listen to, and watch.',
    cta: {
      label: 'View the Coast Guard list',
      href: 'https://www.dcms.uscg.mil/Our-Organization/Assistant-Commandant-for-Human-Resources-CG-1/Civilian-Human-Resources-Diversity-and-Leadership-Directorate-CG-12/Office-of-Leadership-CG-128/Reading-List/',
    },
    staleNote: 'Live page still describes the 2022 edition.',
  },
  {
    name: 'Air Force Chief of Staff’s Leadership Library',
    service: 'U.S. Air Force',
    blurb:
      'A fluid set of media personally explored by the Chief of Staff, changing and evolving as new ideas are published, recorded, and debated, intended to spark conversation among Airmen.',
    cta: {
      label: 'View the CSAF Leadership Library',
      href: 'https://www.af.mil/About-Us/CSAF-Leadership-Library/',
    },
    staleNote:
      'Live page quotes Gen. Charles Q. Brown, Jr. as Chief of Staff — a post he left in 2023.',
  },
  {
    name: 'U.S. Army Chief of Staff’s Professional Reading List',
    service: 'U.S. Army',
    blurb:
      'Compiled for leaders and treated by the Chief of Staff of the Army as a pillar of leadership development, with titles chosen to provoke critical thinking about professional soldiering and the unique role of land power.',
    cta: {
      label: 'View the Army list',
      href: 'https://www.army.mil/leaders/csa/readinglist/',
    },
  },
  {
    name: 'Chairman of the Joint Chiefs of Staff Professional Reading List',
    service: 'Joint Force',
    blurb:
      'Selected to capture the values and ethos of the military profession, promote innovative thinking about the operational realities of an uncertain future, and provide insight into the foundations of the service cultures.',
    cta: {
      label: 'View the Chairman’s list',
      href: 'https://amedd.libguides.com/c.php?g=566155&p=3905794',
    },
  },
]

/** Jump-nav labels, in page order. */
export const readingListsNav = [
  ...serviceLists.map((l) => ({ label: l.navLabel, href: `#${l.id}` })),
  { label: 'Press libraries', href: '#press-libraries' },
  { label: 'Other service lists', href: '#other-lists' },
]
