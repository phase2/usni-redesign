/**
 * Book collections — the shared content model behind every Books & Press
 * "collection" page: the imprint's named series, the Blue & Gold / Scarlet &
 * Gold professional libraries, and the military reading lists.
 *
 * These pages are all the same shape on the live site: a block of custom
 * WYSIWIG introduction copy followed by a bibliography of the titles in the
 * collection. The redesign turns that shape into one template
 * (`CollectionIntro` + `CollectionTitlesGrid`, composed by `BookCollectionPage`)
 * so the Press can stand up a new collection — a promotional set like "Books
 * About Submarines", or an evergreen one like a Commandant's Reading List — by
 * adding an entry here rather than hand-building another page.
 *
 * Copy, titles, prices, formats, and cover art are transcribed from the live
 * Drupal site (test-usni3.pantheonsite.io) as of September 2026. Titles the
 * live site lists without a product link are carried here with no `href`; see
 * `project-references/books-press-collections-link-audit.md` for the full
 * list, plus the links that are outright broken and need content fixes before
 * go-live.
 */

/* ── Cover art ──────────────────────────────────────────────────────────────── */

/*
 * Eager glob rather than ~70 named imports. The folder holds nothing but
 * collection covers, so bundling all of it is exactly what we want — every
 * cover in it is rendered by one of these pages.
 */
const covers = import.meta.glob('../assets/images/books/series/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** Resolve a product slug to its bundled cover URL, if we have the art. */
export function collectionCover(slug?: string): string | undefined {
  if (!slug) return undefined
  const match = Object.entries(covers).find(([path]) => {
    const file = path.slice(path.lastIndexOf('/') + 1)
    return file.slice(0, file.lastIndexOf('.')) === slug
  })
  return match?.[1]
}

/* ── Types ──────────────────────────────────────────────────────────────────── */

export interface CollectionTitle {
  /** Title as the Press lists it, without the subtitle. */
  title: string
  /** Everything after the colon, where the Press carries one. */
  subtitle?: string
  /** Byline as printed on the product page. */
  byline?: string
  /**
   * Product page route. Omitted for a title the Press lists in the collection
   * but has no product page for — the grid renders those as a reference entry
   * with no purchase affordance.
   */
  href?: string
  /** Product slug, used to find the cover art. */
  slug?: string
  format?: string
  price?: number
  memberPrice?: number
  /**
   * Replaces the price line when a title cannot be bought from the Press —
   * either a retailer note the Press already publishes, or the default
   * unavailable state.
   */
  availability?: string
}

export interface CollectionEditor {
  name: string
  /** Affiliation and post, as the Press states it. */
  role: string
  bio: string
  /** Proposals and inquiries address. */
  email?: string
}

export interface BookCollection {
  /** Route segment: /press/series/<slug>, or a top-level page's own path. */
  slug: string
  /** Full name, used as the page title. */
  name: string
  /** Shortened name for cards and cross-links. */
  shortName: string
  /** One line for teaser cards and the PME hub grid. */
  summary: string
  hero: {
    variant: 'light' | 'image'
    /** Bundled image URL. Required when variant is 'image'. */
    image?: string
    imageAlt?: string
    /**
     * CSS background-position for the photo hero. The navy panel covers the
     * right half of the frame, so a subject that would fall under it needs the
     * crop pulled left. Defaults to 'center'.
     */
    imagePosition?: string
    /** Credit for the hero photograph. The hero prefixes "Photo Credit:". */
    credit?: string
  }
  /** Series brand lockup. Shown in a white plate right of the hero copy. */
  mark?: { image: string; alt: string }
  /** Heading over the introduction copy. Defaults to "About the Series". */
  aboutHeading?: string
  /** Introduction paragraphs. Plain text; rendered as a prose column. */
  about: string[]
  editor?: CollectionEditor
  /**
   * Contact for a collection with no named series editor — the in-house
   * libraries. `note` is the affiliation line under the name in the rail card.
   */
  contact?: { name: string; email: string; note?: string }
  /** Heading over the bibliography. Defaults to "Titles in the Series". */
  titlesHeading?: string
  titles: CollectionTitle[]
}

/** Default note for a listed title with no product page. */
export const UNAVAILABLE = 'Not available to order online'

/* ── Series ─────────────────────────────────────────────────────────────────── */

import markBlueGold from '../assets/images/books/series-marks/blue-and-gold.png'
import markScarletGold from '../assets/images/books/series-marks/scarlet-and-gold.png'
import markMarineCorps from '../assets/images/books/series-marks/marine-corps-history.jpg'
import heroWarOnFilm from '../assets/images/run-silent-run-deep-movie-hero.png'
// Midshipmen and Marine Corps SNCOs at an assembly. Source file as supplied:
// 55423286094_70fdfe815a_k.jpg
import heroPme from '../assets/images/books/pme-hero.jpg'

export const blueAndGold: BookCollection = {
  slug: 'blue-and-gold',
  name: 'Blue and Gold Professional Series',
  shortName: 'Blue & Gold',
  summary:
    'The Navy’s professional library — the guides, manuals, and references that sailors of every rank have relied on for more than a century.',
  hero: { variant: 'light' },
  mark: { image: markBlueGold, alt: 'Blue & Gold Professional Series' },
  aboutHeading: 'About the Series',
  about: [
    'For more than 100 years, U.S. Navy professionals have counted on specialized books published by the Naval Institute Press to prepare them for their responsibilities as they advance in their careers and to serve as ready references and refreshers when needed. From the days of coal-fired battleships to the era of unmanned aerial vehicles and laser weaponry, such perennials as The Bluejacket’s Manual and the Watch Officer’s Guide have guided generations of sailors through the complex challenges of naval service.',
    'As these books are updated and new ones are added to the list, they will carry the distinctive mark of the Blue & Gold Professional Library series to remind and reassure their users that they have been prepared by naval professionals and meet the exacting standards that sailors have long expected from the U.S. Naval Institute.',
  ],
  contact: {
    name: 'Steve Catalano',
    email: 'scatalano@usni.org',
    note: 'Naval Institute Press',
  },
  titles: [
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
      title: 'Chief Petty Officer’s Guide, 2nd Edition',
      byline: 'By FLTCM Paul A. Kingsbury, USN',
      slug: 'chief-petty-officers-guide-2nd-edition',
      href: '/press/books/chief-petty-officers-guide-2nd-edition',
      format: 'Hardcover',
      price: 41.95,
      memberPrice: 33.56,
    },
    {
      title: 'The Citizen’s Guide to the U.S. Navy',
      byline: 'By Thomas J. Cutler',
      availability: UNAVAILABLE,
    },
    {
      title: 'Command at Sea, 7th Edition',
      byline:
        'By ADM James Stavridis, USN (Ret.), RADM Robert Girrier, USN (Ret.), and RADM Fred Kacher, USN',
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
      title: 'Dictionary of Naval Abbreviations, Fourth Edition',
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
    {
      title: 'Dutton’s Nautical Navigation, 15th Edition',
      byline: 'By Thomas J. Cutler',
      slug: 'duttons-nautical-navigation-15th-edition',
      href: '/press/books/duttons-nautical-navigation-15th-edition',
      format: 'Hardcover',
      price: 66.95,
      memberPrice: 53.56,
    },
    {
      title: 'Farwell’s Rules of the Nautical Road, 9th Edition',
      byline: 'By Craig Allen, Sr. and Craig Allen, Jr.',
      slug: 'farwells-rules-nautical-road-ninth-edition',
      href: '/press/books/farwells-rules-of-the-nautical-road-9th-edition',
      format: 'Hardcover',
      price: 74.95,
      memberPrice: 59.96,
    },
    {
      title: 'Fighting the Fleet',
      subtitle: 'Operational Art and Modern Fleet Combat',
      byline: 'By Jeffrey R. Cares and Anthony Cowden',
      slug: 'fighting-fleet',
      href: '/press/books/fighting-the-fleet',
      format: 'Softcover',
      price: 24.95,
      memberPrice: 19.96,
    },
    {
      title: 'Fleet Tactics and Naval Operations, 3rd Edition',
      byline:
        'By CAPT Wayne P. Hughes Jr., USN (Ret.) and RADM Robert P. Girrier, USN (Ret.)',
      slug: 'fleet-tactics-and-naval-operations-third-edition',
      href: '/press/books/fleet-tactics-and-naval-operations-3rd-edition',
      format: 'Hardcover',
      price: 59.95,
      memberPrice: 47.96,
    },
    {
      title: 'General Naval Tactics',
      subtitle: 'Theory and Practice',
      byline: 'By Milan Vego',
      slug: 'general-naval-tactics',
      href: '/press/books/general-naval-tactics',
      format: 'Hardcover',
      price: 59.95,
      memberPrice: 47.96,
    },
    {
      title: 'International Law for Seagoing Officers, 7th Edition',
      byline: 'By Craig H. Allen Sr.',
      slug: 'international-law-seagoing-officers-7th-edition',
      href: '/press/books/international-law-for-seagoing-officers-7th-edition',
      format: 'Hardcover',
      price: 150.0,
      memberPrice: 120.0,
    },
    {
      title: 'Naval Ceremonies, Customs, and Traditions, 6th Edition',
      byline: 'By Richard Camp',
      slug: 'naval-ceremonies-customs-and-traditions-6th-edition',
      href: '/press/books/naval-ceremonies-customs-and-traditions-6th-edition',
      format: 'Softcover',
      price: 34.95,
      memberPrice: 27.96,
    },
    {
      title: 'Naval Innovation for the 21st Century',
      subtitle: 'The Office of Naval Research Since the End of the Cold War',
      byline: 'By Robert Buderi',
      availability: UNAVAILABLE,
    },
    {
      title: 'The Naval Institute Guide to Naval Writing, 3rd Edition',
      byline: 'By Robert Shenk',
      availability: UNAVAILABLE,
    },
    {
      title: 'Naval Law, 4th Edition',
      subtitle: 'Justice and Procedure in the Sea Services',
      byline: 'By Brent G. Filbert, John Baker, and Mark Jamison',
      slug: 'naval-law-4th-edition',
      href: '/press/books/naval-law-4th-edition',
      format: 'Hardcover',
      price: 75.0,
      memberPrice: 45.0,
    },
    {
      title: 'Naval Officer’s Guide to the Pentagon',
      byline: 'By RDML Fred W. Kacher, USN, and LCDR Douglas A. Robb, USN',
      slug: 'naval-officers-guide-pentagon',
      href: '/press/books/naval-officers-guide-to-the-pentagon',
      format: 'Hardcover',
      price: 10.18,
    },
    {
      title: 'The Naval Officer’s Guide, 13th Edition',
      byline: 'By CDR Lesa McComas, USN (Ret.) and CDR J.D. Kristenson, USN',
      availability: UNAVAILABLE,
    },
    {
      title: 'Naval Shiphandler’s Guide',
      byline: 'By CAPT James A. Barber Jr., USN (Ret.)',
      slug: 'naval-shiphandlers-guide',
      href: '/press/books/naval-shiphandlers-guide',
      format: 'Hardcover',
      price: 62.95,
      memberPrice: 50.36,
    },
    {
      title: 'NavCivGuide',
      subtitle: 'A Handbook for Civilians in the United States Navy',
      byline: 'By Thomas J. Cutler',
      availability: UNAVAILABLE,
    },
    {
      title: 'Navy Staff Officer’s Guide',
      subtitle: 'Leading with Impact from Squadron to OPNAV',
      byline: 'By CAPT Dale C. Rielage, USN (Ret.)',
      slug: 'navy-staff-officers-guide',
      href: '/press/books/navy-staff-officers-guide',
      format: 'Hardcover',
      price: 11.98,
    },
    {
      title: 'Newly Commissioned Naval Officer’s Guide, 2nd Edition',
      byline: 'By RDML Fred W. Kacher, USN',
      slug: 'newly-commissioned-naval-officers-guide-2nd-edition',
      href: '/press/books/newly-commissioned-naval-officers-guide-2nd-edition',
      format: 'Softcover',
      price: 33.95,
      memberPrice: 27.16,
    },
    {
      title: 'Operations Officer’s Guide',
      byline: 'By CDR John R. H. Callaway, USN',
      availability: UNAVAILABLE,
    },
    {
      title: 'Petty Officer’s Guide',
      byline: 'By FLTCM Paul A. Kingsbury, USN (Ret.) and YN1 Daniel Richard, USN',
      slug: 'petty-officers-guide',
      href: '/press/books/petty-officers-guide',
      format: 'Hardcover',
      price: 11.98,
    },
    {
      title: 'Principles of Naval Engineering',
      byline: 'Edited by Mathew A. Carr',
      availability: UNAVAILABLE,
    },
    {
      title: 'Principles of Naval Weapons Systems, 2nd Edition',
      byline: 'By Craig Payne',
      slug: 'principles-naval-weapons-systems-1',
      href: '/press/books/principles-of-naval-weapons-systems-2nd-edition',
      format: 'Hardcover',
      price: 85.0,
      memberPrice: 68.0,
    },
    {
      title: 'A Sailor’s History of the U.S. Navy',
      byline: 'By Thomas J. Cutler',
      availability: UNAVAILABLE,
    },
    {
      title: 'Saltwater Leadership, 2nd Edition',
      subtitle: 'A Primer on Leadership for the Junior Sea-Service Officer',
      byline: 'By RADM Robert Wray Jr., USN (Ret.)',
      slug: 'saltwater-leadership-second-edition',
      href: '/press/books/saltwater-leadership-2nd-edition',
      format: 'Softcover',
      price: 26.95,
      memberPrice: 16.17,
    },
    {
      title: 'Surface Warfare Officer’s Department Head Guide',
      byline:
        'By RADM Fred Kacher, USN, CAPT Joseph A. Gagliano, USN, and CDR Samantha A. O’Neil, USN',
      slug: 'surface-warfare-officers-department-head-guide',
      href: '/press/books/surface-warfare-officers-department-head-guide',
      format: 'Hardcover',
      price: 34.95,
      memberPrice: 27.96,
    },
    {
      title: 'Watch Officer’s Guide, 16th Edition',
      byline: 'By ADM James Stavridis, USN (Ret.) and RADM Robert P. Girrier, USN (Ret.)',
      slug: 'watch-officers-guide-16th-edition',
      href: '/press/books/watch-officers-guide-16th-edition',
      format: 'Hardcover',
      price: 39.95,
      memberPrice: 31.96,
    },
  ],
}

export const scarletAndGold: BookCollection = {
  slug: 'scarlet-and-gold',
  name: 'Scarlet and Gold Professional Series',
  shortName: 'Scarlet & Gold',
  summary:
    'The Marine Corps counterpart to Blue & Gold — guides and references prepared by Marines, for Marines of every rank.',
  hero: { variant: 'light' },
  mark: { image: markScarletGold, alt: 'Scarlet & Gold Professional Series' },
  aboutHeading: 'About the Series',
  about: [
    'Marines of all ranks have depended on books in this series for their professional development. Like their Blue & Gold counterpart, Scarlet & Gold series books such as The Marine Officer’s Guide and the Handbook for Marine NCOs have been prepared by professionals for today’s Marines.',
  ],
  contact: {
    name: 'Steve Catalano',
    email: 'scatalano@usni.org',
    note: 'Naval Institute Press',
  },
  titles: [
    {
      title: 'Handbook for Marine NCOs, 5th Edition',
      byline: 'By Lt. Col. Kenneth W. Estes, USMC (Ret.)',
      slug: 'handbook-marine-ncos-5th-edition',
      href: '/press/books/handbook-for-marine-ncos-5th-edition',
      format: 'Hardcover',
      price: 38.95,
      memberPrice: 31.16,
    },
    {
      title: 'Marine Maxims',
      subtitle: 'Turning Leadership Principles into Practice',
      byline: 'By Col. Thomas J. Gordon, USMC (Ret.)',
      slug: 'marine-maxims',
      href: '/press/books/marine-maxims',
      format: 'Hardcover',
      price: 33.95,
      memberPrice: 27.16,
    },
    {
      title: 'The Marine Officer’s Guide, 9th Edition',
      byline: 'By Colonel Christian N. Haliday, USMC (Ret.)',
      slug: 'marine-officers-guide-9th-edition',
      href: '/press/books/marine-officers-guide-9th-edition',
      format: 'Hardcover',
      price: 46.0,
      memberPrice: 27.6,
    },
    {
      title: 'On the Corps',
      subtitle:
        'USMC Wisdom from the Pages of Leatherneck, Marine Corps Gazette, and Proceedings',
      byline: 'By Lt. Col. Charles P. Neimeyer, USMC (Ret.)',
      availability: UNAVAILABLE,
    },
  ],
}

export const marineCorpsHistory: BookCollection = {
  slug: 'marine-corps-history',
  name: 'Studies in Marine Corps History and Amphibious Warfare',
  shortName: 'Marine Corps History & Amphibious Warfare',
  summary:
    'Original scholarship on the Marine Corps and amphibious warfare — battles, leaders, doctrine, technology, and culture.',
  hero: { variant: 'light' },
  mark: {
    image: markMarineCorps,
    alt: 'Studies in Marine Corps History and Amphibious Warfare — William A. Taylor, Series Editor',
  },
  about: [
    'This series advances understanding of Marine Corps history and amphibious warfare by publishing original scholarship across a broad spectrum of innovative studies. The series analyzes an extensive array of vital aspects of the Marine Corps, amphibious warfare, and their collective role in global security, including battles, leaders, strategy, operations, tactics, doctrine, technology, personnel, organization, and culture.',
    'Incorporating both historical and contemporary perspectives, this series publishes important literature about the Marine Corps and significant works relevant to amphibious warfare that span the globe, feature diverse methodologies, and reach general audiences. As a result, the series provides a professional home, central venue, and premier destination for the best and newest research on Marine Corps history and amphibious warfare.',
  ],
  editor: {
    name: 'William A. Taylor',
    role:
      'Lee Drain Endowed University Professor of Global Security Studies and Department Chair, Angelo State University',
    bio: 'A graduate of the U.S. Naval Academy, William A. Taylor holds an MA in history from the University of Maryland, an MA in National Security Studies from Georgetown University, and MPhil and PhD degrees in history from George Washington University. He is the author or editor of seven books, including Peace, War, and Partnership: Congress and the Military since World War II (2023); The All-Volunteer Force: Fifty Years of Service (2023); and The Advent of the All-Volunteer Force: Protecting Free Society (2023). His work has won multiple national awards, honors, and prizes, including the Association for Documentary Editing Sharon Ritenour Stevens Prize in 2021, selection as required reading for every first-year cadet at the U.S. Military Academy at West Point in 2020, and the Crader Family Book Prize Honorable Mention in 2015.',
    email: 'william.taylor@angelo.edu',
  },
  titles: [
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
      title: 'Fighting Falcons',
      subtitle: 'The Campaigns of VMF-221 in the Pacific',
      byline: 'By Peter F. Owen',
      slug: 'fighting-falcons',
      href: '/press/books/fighting-falcons',
      format: 'Hardcover',
      price: 39.95,
      memberPrice: 23.97,
    },
    {
      title: 'Marine Defense Battalions in World War II',
      subtitle: 'From Wake Island to Guadalcanal',
      byline: 'By Marshall K. Snyder',
      slug: 'marine-defense-battalions-world-war-ii',
      href: '/press/books/marine-defense-battalions-in-world-war-ii',
      format: 'Hardcover',
      price: 49.95,
      memberPrice: 29.97,
    },
  ],
}

export const militaryAviation: BookCollection = {
  slug: 'military-aviation',
  name: 'The History of Military Aviation Series',
  shortName: 'History of Military Aviation',
  summary:
    'Airpower history in its widest sense — air superiority, strategic attack, ISR, airlift, close-air support, and the terrestrial operations that make them work.',
  hero: { variant: 'light' },
  about: [
    'This series is designed to explore previously ignored facets of the history of airpower. It includes a wide variety of disciplinary approaches, scholarly perspectives, and argumentative styles. Its fundamental goal is to analyze the past, present, and potential future utility of airpower and to enhance our understanding of the changing roles played by aerial assets in the formulation and execution of national military strategies. It encompasses the incredibly diverse roles played by airpower, which include but are not limited to efforts to achieve air superiority; strategic attack; intelligence, surveillance, and reconnaissance missions; airlift operations; close-air support; and more. Of course, airpower does not exist in a vacuum. There are myriad terrestrial support operations required to make airpower functional, and examinations of these missions is also a goal of this series.',
    'In less than a century, airpower developed from flights measured in minutes to the ability to circumnavigate the globe without landing. Airpower has become the military tool of choice for rapid responses to enemy activity, the primary deterrent to aggression by peer competitors, and a key enabler to military missions on the land and sea. This series provides an opportunity to examine many of the key issues associated with its usage in the past and present, and to influence its development for the future.',
  ],
  editor: {
    name: 'Dr. Paul J. Springer',
    role:
      'Professor of Comparative Military Studies, Department of Airpower, Air Command and Staff College, Maxwell Air Force Base',
    bio: 'Dr. Paul J. Springer holds a PhD in military history from Texas A&M University. He is the author or editor of more than a dozen books, including America’s Captives: Treatment of POWs from the Revolutionary War to the War on Terror; Military Robots and Drones: A Reference Handbook; Transforming Civil War Prisons: Lincoln, Lieber, and the Laws of War; Cyber Warfare: A Reference Handbook; and Outsourcing War to Machines: The Military Robotics Revolution. In addition, he has published hundreds of shorter pieces on subjects including military history, terrorism, strategy, technology, and military robotics. Dr. Springer is a Senior Fellow of the Foreign Policy Research Institute, and the series editor for both the History of Military Aviation and Transforming War series. He is currently completing a collective biography of the West Point Class of 1829.',
    email: 'paul.springer@us.af.mil',
  },
  titles: [
    {
      title: 'Airpower Applied',
      subtitle: 'U.S., NATO, and Israeli Combat Experience',
      byline: 'Edited by John Andreas Olsen',
      slug: 'airpower-applied',
      href: '/press/books/airpower-applied',
      format: 'Softcover',
      price: 46.95,
      memberPrice: 37.56,
    },
    {
      title: 'Airpower in the War against ISIS',
      byline: 'By Benjamin S. Lambeth',
      slug: 'airpower-war-against-isis',
      href: '/press/books/airpower-in-the-war-against-isis',
      format: 'Hardcover',
      price: 59.0,
      memberPrice: 47.2,
    },
    {
      title: 'Airpower over Gallipoli, 1915–1916',
      byline: 'By Sterling Michael Pavelec',
      slug: 'airpower-over-gallipoli-1915-1916',
      href: '/press/books/airpower-over-gallipoli-1915-1916',
      format: 'Hardcover',
      price: 44.0,
      memberPrice: 35.2,
    },
    {
      title: 'Airpower Pioneers',
      subtitle: 'From Billy Mitchell to Dave Deptula',
      byline: 'Edited by John Andreas Olsen',
      slug: 'airpower-pioneers',
      href: '/press/books/airpower-pioneers',
      format: 'Hardcover',
      price: 49.95,
      memberPrice: 39.96,
    },
    {
      title: 'Airpower Reborn',
      subtitle: 'The Strategic Concepts of John Warden and John Boyd',
      byline: 'Edited by John Andreas Olsen',
      slug: 'airpower-reborn',
      href: '/press/books/airpower-reborn',
      format: 'Softcover',
      price: 37.95,
      memberPrice: 30.36,
    },
    {
      title: 'At the Dawn of Airpower',
      subtitle:
        'The U.S. Army, Navy, and Marine Corps’ Approach to the Military Airplane, 1907–1917',
      byline: 'By Laurence M. Burke II',
      slug: 'dawn-airpower',
      href: '/press/books/at-the-dawn-of-airpower',
      format: 'Hardcover',
      price: 19.98,
    },
    {
      title: 'Beyond the Beach',
      subtitle: 'The Allied Air War against France',
      byline: 'By Stephen Alan Bourque',
      slug: 'beyond-beach',
      href: '/press/books/beyond-the-beach',
      format: 'Hardcover',
      price: 11.68,
    },
    {
      title: 'The Bridge to Airpower',
      subtitle:
        'Logistics Support for Royal Flying Corps Operations on the Western Front, 1914–18',
      availability: 'eBook only — available from Amazon and other online retailers',
    },
    {
      title: 'Flight Risk',
      subtitle: 'The Coalition’s Air Advisory Mission in Afghanistan, 2005–2015',
      availability: UNAVAILABLE,
    },
    {
      title: 'From Kites to Cold War',
      subtitle: 'The Evolution of Manned Airborne Reconnaissance',
      availability: UNAVAILABLE,
    },
    {
      title: '“The Man Who Took the Rap”',
      subtitle: 'Sir Robert Brooke-Popham and the Fall of Singapore',
      availability: UNAVAILABLE,
    },
    {
      title: 'The Origins of American Strategic Bombing Theory',
      availability: UNAVAILABLE,
    },
    {
      title: 'Rear Admiral Herbert V. Wiley',
      subtitle: 'A Career in Airships and Battleships',
      availability: UNAVAILABLE,
    },
    {
      title: 'Rise of the War Machines',
      subtitle: 'The Birth of Precision Bombing in World War II',
      byline: 'By Raymond P. O’Mara',
      slug: 'rise-war-machines',
      href: '/press/books/rise-of-the-war-machines',
      format: 'Hardcover',
      price: 19.98,
    },
    {
      title: 'Selling Schweinfurt',
      subtitle:
        'Targeting, Assessment, and Marketing in the Air Campaign against German Industry',
      byline: 'By Brian D. Vlaun',
      slug: 'selling-schweinfurt-0',
      href: '/press/books/selling-schweinfurt',
      format: 'Hardcover',
      price: 19.6,
    },
    {
      title: 'To Rule the Skies',
      subtitle:
        'General Thomas S. Power and the Rise of Strategic Air Command in the Cold War',
      byline: 'By Brent D. Ziarnick',
      slug: 'rule-skies',
      href: '/press/books/to-rule-the-skies',
      format: 'Hardcover',
      price: 16.78,
    },
    {
      title: 'Winning Armageddon',
      subtitle: 'Curtis LeMay and Strategic Air Command, 1948–1957',
      byline: 'By Trevor Albertson',
      slug: 'winning-armageddon',
      href: '/press/books/winning-armageddon',
      format: 'Hardcover',
      price: 13.2,
    },
  ],
}

export const transformingWar: BookCollection = {
  slug: 'transforming-war',
  name: 'Transforming War Series',
  shortName: 'Transforming War',
  summary:
    'The fundamental transformations in warfare — revolutions in military affairs, and the ideas, devices, and doctrines that permanently changed how wars are fought.',
  hero: { variant: 'light' },
  about: [
    'To ensure success, the conduct of war requires rapid and effective adaptation to changing circumstances. While every conflict involves a degree of flexibility and innovation, there are certain changes that have occurred throughout history that stand out because they fundamentally altered the conduct of warfare. The most prominent of these changes have been labeled “Revolutions in Military Affairs” (RMAs). These so-called revolutions include technological innovations as well as entirely new approaches to strategy. Revolutionary ideas in military theory, doctrine, and operations have also permanently changed the methods, means, and objectives of warfare.',
    'This series examines fundamental transformations that have occurred in warfare. It places particular emphasis upon RMAs to examine how the development of a new idea or device can alter not only the conduct of wars but their effect upon participants, supporters, and uninvolved parties. The unifying concept of the series is not geographical or temporal; rather, it is the notion of change in conflict and its subsequent impact. This has allowed the incorporation of a wide variety of scholars, approaches, disciplines, and conclusions to be brought under the umbrella of the series. The works include biographies, examinations of transformative events, and analyses of key technological innovations that provide a greater understanding of how and why modern conflict is carried out, and how it may change the battlefields of the future.',
  ],
  editor: {
    name: 'Dr. Paul J. Springer',
    role:
      'Professor of Comparative Military Studies, Department of Airpower, Air Command and Staff College, Maxwell Air Force Base',
    bio: 'Dr. Paul J. Springer holds a PhD in military history from Texas A&M University. He is the author or editor of more than a dozen books, including America’s Captives: Treatment of POWs from the Revolutionary War to the War on Terror; Military Robots and Drones: A Reference Handbook; Transforming Civil War Prisons: Lincoln, Lieber, and the Laws of War; Cyber Warfare: A Reference Handbook; and Outsourcing War to Machines: The Military Robotics Revolution. In addition, he has published hundreds of shorter pieces on subjects including military history, terrorism, strategy, technology, and military robotics. Dr. Springer is a Senior Fellow of the Foreign Policy Research Institute, and the series editor for both the History of Military Aviation and Transforming War series. He is currently completing a collective biography of the West Point Class of 1829.',
    email: 'paul.springer@us.af.mil',
  },
  titles: [
    {
      title: 'Always at War',
      subtitle: 'Organizational Culture in Strategic Air Command, 1946–62',
      byline: 'By Melvin G. Deaile',
      slug: 'always-war',
      href: '/press/books/always-at-war',
      format: 'Hardcover',
      price: 11.98,
    },
    {
      title: 'An Untaken Road',
      subtitle: 'Strategy, Technology, and the Mobile Intercontinental Ballistic Missile',
      availability: 'Print on demand — available from Amazon and other online retailers',
    },
    {
      title: 'Assured Destruction',
      subtitle: 'Building the Ballistic Missile Culture of the U.S. Air Force',
      byline: 'By David W. Bath',
      slug: 'assured-destruction',
      href: '/press/books/assured-destruction',
      format: 'Hardcover',
      price: 16.78,
    },
    {
      title: 'Blood Money',
      subtitle: 'How Criminals, Militias, Rebels, and Warlords Finance Violence',
      byline: 'By Margaret D. Sankey',
      slug: 'blood-money',
      href: '/press/books/blood-money',
      format: 'Hardcover',
      price: 15.98,
    },
    {
      title: 'Cassandra in Oz',
      subtitle: 'Counterinsurgency and Future War',
      byline: 'By Conrad C. Crane',
      slug: 'cassandra-oz-0',
      href: '/press/books/cassandra-in-oz',
      format: 'Softcover',
      price: 37.95,
      memberPrice: 30.36,
    },
    {
      title: 'Cyberspace in Peace and War, Second Edition',
      byline: 'By Martin C. Libicki',
      slug: 'cyberspace-peace-and-war-second-edition',
      href: '/press/books/cyberspace-in-peace-and-war-2nd-edition',
      format: 'Hardcover',
      price: 24.8,
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
      title: 'Limiting Risk in America’s Wars',
      subtitle: 'Airpower, Asymmetrics, and a New Strategic Paradigm',
      availability: UNAVAILABLE,
    },
    {
      title: 'Mars Adapting',
      subtitle: 'Military Change during War',
      byline: 'By Frank G. Hoffman',
      slug: 'mars-adapting',
      href: '/press/books/mars-adapting',
      format: 'Hardcover',
      price: 41.95,
      memberPrice: 33.56,
    },
    {
      title: 'The Other Space Race',
      subtitle: 'Eisenhower and the Quest for Aerospace Security',
      availability: UNAVAILABLE,
    },
    {
      title: 'Standing Up Space Force',
      subtitle: 'The Road to the Nation’s Sixth Armed Service',
      byline: 'By Forrest L. Marion',
      slug: 'standing-space-force',
      href: '/press/books/standing-up-space-force',
      format: 'Hardcover',
      price: 39.95,
      memberPrice: 23.97,
    },
    {
      title: 'Strategy',
      subtitle: 'Context and Adaptation from Archidamus to Airpower',
      byline: 'Edited by Richard J. Bailey Jr., James W. Forsyth Jr., and Mark O. Yeisley',
      slug: 'strategy',
      href: '/press/books/strategy-context-and-adaptation',
      format: 'Hardcover',
      price: 13.18,
    },
  ],
}

export const navalHistorySeaPower: BookCollection = {
  slug: 'naval-history-sea-power',
  name: 'Studies in Naval History and Sea Power',
  shortName: 'Naval History & Sea Power',
  summary:
    'New scholarship on navies and naval affairs, from the ancient world to today’s navies and coast guards.',
  hero: { variant: 'light' },
  about: [
    'Studies in Naval History and Sea Power advances our understanding of sea power and its role in global security by publishing significant new scholarship on navies and naval affairs. The series presents specialists in naval history, as well as students of sea power, with works that cover the role of the world’s naval powers, from the ancient world to the navies and coast guards of today.',
    'The works in Studies in Naval History and Sea Power examine all aspects of navies and conflict at sea, including naval operations, strategy, and tactics, as well as the intersections of sea power and diplomacy, navies and technology, sea services and civilian societies, and the financing and administration of seagoing military forces.',
  ],
  editor: {
    name: 'Evan Wilson',
    role:
      'Associate Professor, Hattendorf Historical Center, U.S. Naval War College, Newport, Rhode Island',
    bio: 'A recipient of the Sir Julian Corbett Prize in Modern Naval History, Evan Wilson researches the naval history of Britain and other countries from the eighteenth to the twentieth centuries. He is the author or editor of seven books, most recently Planning for War at Sea: 400 Years of Great Power Competition (Naval Institute, 2025), which he edited with Paul Kennedy. Before coming to Newport, he was the Caird Senior Research Fellow at the National Maritime Museum (UK) and the Associate Director of International Security Studies at Yale University. He holds degrees from Yale, Cambridge, and Oxford.',
    email: 'evan.wilson@usnwc.edu',
  },
  titles: [
    {
      title: 'A Ceaseless Watch',
      subtitle: 'Australia’s Third-Party Naval Defense, 1919–1942',
      byline: 'By Angus Britts',
      slug: 'ceaseless-watch',
      href: '/press/books/a-ceaseless-watch',
      format: 'Hardcover',
      price: 56.95,
      memberPrice: 45.56,
    },
    {
      title: 'Admiral John S. McCain and the Triumph of Naval Air Power',
      availability: UNAVAILABLE,
    },
    {
      title: 'Churchill’s Phoney War',
      subtitle: 'A Study in Folly and Frustration',
      availability: UNAVAILABLE,
    },
    {
      title: 'COSSAC',
      subtitle: 'Lt. Gen. Sir Frederick Morgan and the Genesis of Operation OVERLORD',
      byline: 'By Stephen C. Kepher',
      slug: 'cossac',
      href: '/press/books/cossac',
      format: 'Hardcover',
      price: 17.6,
    },
    {
      title: 'The Emergence of American Amphibious Warfare, 1898–1945',
      byline: 'By David S. Nasca',
      slug: 'emergence-american-amphibious-warfare-1898-1945',
      href: '/press/books/the-emergence-of-american-amphibious-warfare',
      format: 'Hardcover',
      price: 44.0,
      memberPrice: 35.2,
    },
    {
      title: 'The Fall and Rise of French Sea Power',
      subtitle: 'France’s Quest for an Independent Naval Policy, 1940–1963',
      byline: 'By Hugues Canuel',
      slug: 'fall-and-rise-french-sea-power',
      href: '/press/books/the-fall-and-rise-of-french-sea-power',
      format: 'Hardcover',
      price: 56.95,
      memberPrice: 45.56,
    },
    {
      title: 'Genesis of the Grand Fleet',
      subtitle: 'The Admiralty, Germany, and the Home Fleet, 1896–1914',
      byline: 'By Christopher M. Buckey',
      slug: 'genesis-grand-fleet',
      href: '/press/books/genesis-of-the-grand-fleet',
      format: 'Hardcover',
      price: 57.0,
      memberPrice: 45.6,
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
      title: 'Mahan, Corbett, and the Foundations of Naval Strategic Thought',
      byline: 'By Kevin D. McCranie',
      slug: 'mahan-corbett-and-foundations-naval-strategic-thought',
      href: '/press/books/mahan-corbett-and-the-foundations-of-naval-strategic-thought',
      format: 'Hardcover',
      price: 17.98,
    },
    {
      title: 'Progressives in Navy Blue',
      subtitle:
        'Maritime Strategy, American Empire, and the Transformation of U.S. Naval Identity, 1873–1898',
      availability: UNAVAILABLE,
    },
    {
      title: 'U-Boat Commander Oskar Kusch',
      subtitle: 'Anatomy of a Nazi-Era Betrayal and Judicial Murder',
      byline: 'By Eric C. Rust',
      slug: 'u-boat-commander-oskar-kusch',
      href: '/press/books/u-boat-commander-oskar-kusch',
      format: 'Hardcover',
      price: 19.6,
    },
    {
      title: 'Victory without Peace',
      subtitle: 'The United States Navy in European Waters, 1919–1924',
      availability: UNAVAILABLE,
    },
    {
      title: 'Warship Builders',
      subtitle: 'An Industrial History of U.S. Naval Shipbuilding, 1922–1945',
      byline: 'By Thomas Heinrich',
      slug: 'warship-builders',
      href: '/press/books/warship-builders',
      format: 'Hardcover',
      price: 43.95,
      memberPrice: 35.16,
    },
  ],
}

export const essentialsOfStrategy: BookCollection = {
  slug: 'essentials-of-strategy',
  name: 'Essentials of Strategy Series',
  shortName: 'Essentials of Strategy',
  summary:
    'Short works on the strategies of belligerents and competing powers, written to build broad strategic literacy.',
  hero: { variant: 'light' },
  about: [
    'The volumes in Essentials of Strategy cover wars, conflicts, and battles through the prism of strategy. Aiming to develop a broad strategic literacy, this series will offer short works on the strategies employed by belligerents and competing powers. So widely employed but little defined, strategy requires additional study from contemporary scholars and historians, with an emphasis on lessons gleaned for modern practitioners, and revelations revealed for contemporary readers.',
  ],
  editor: {
    name: 'Michael F. Pavković, PhD',
    role:
      'Vice Admiral William Ledyard Rodgers Professor in Naval History, Strategy and Policy Department, U.S. Naval War College',
    bio: 'Michael F. Pavković previously chaired the Strategy and Policy Department at the U.S. Naval War College. He received his BA in history and classics from Pennsylvania State University and his PhD in history from the University of Hawai‘i at Mānoa. He has presented papers at national and international conferences and has published a number of articles, book chapters, and reviews on topics relating to ancient, early modern, and Napoleonic military history. He is co-author of What is Military History? (Polity Press, 3rd edition, 2017), and is currently writing a book on sea power in the ancient world.',
    email: 'michael.pavkovic@usnwc.edu',
  },
  titles: [
    {
      title: 'Strategy in Crisis',
      subtitle: 'The Pacific War, 1937–1945',
      byline: 'By John T. Kuehn',
      slug: 'strategy-crisis',
      href: '/press/books/strategy-in-crisis',
      format: 'Hardcover',
      price: 29.95,
      memberPrice: 17.97,
    },
  ],
}

export const presidentCommanderInChief: BookCollection = {
  slug: 'president-commander-in-chief',
  name: 'The U.S. President as Commander-in-Chief',
  shortName: 'The President as Commander-in-Chief',
  summary:
    'How presidents have led in wartime — strategy, civil-military relations, and their dealings with senior military leadership.',
  hero: { variant: 'light' },
  about: [
    'This series examines the role of the U.S. President as Commander in Chief (CinC) of the nation’s armed forces. Specific topics will include how presidents led in wartime (if they did); how they formulated strategy; how they engaged with senior military leadership; how their policy planning influenced their leadership and actions; how previous military experience (if any) informed their work as CinC; how they shaped the armed forces; and how they conducted military actions.',
    'Of particular importance for each volume in the series will be a President’s civil-military relations, approach to military organization and training, and interactions with senior military leaders. Historians, political scientists, policy professionals, and politically informed audiences will find these volumes instructive and engaging.',
  ],
  editor: {
    name: 'Margaret Tseng',
    role: 'Series Editor, Marymount University',
    bio: 'Margaret Tseng serves as series editor for The U.S. President as Commander-in-Chief. Inquiries and proposals for the series should be sent to her directly.',
    email: 'mtseng@marymount.edu',
  },
  titles: [
    {
      title: 'Woodrow Wilson’s Wars',
      subtitle: 'The Making of America’s First Modern Commander-in-Chief',
      byline: 'By Mark E. Benbow',
      slug: 'woodrow-wilsons-wars',
      href: '/press/books/woodrow-wilsons-wars',
      format: 'Hardcover',
      price: 17.98,
    },
  ],
}

export const warOnFilm: BookCollection = {
  slug: 'war-on-film',
  name: 'War on Film',
  shortName: 'War on Film',
  summary:
    'War and military-related film — how movies interpret events, express contemporary attitudes, and shape public memory of conflict.',
  hero: {
    variant: 'image',
    image: heroWarOnFilm,
    imageAlt:
      'Two submarine officers face each other across a periscope in a black-and-white film still',
    /* The navy panel takes the right half of the frame and both actors sit in
       the left half of the still, so the crop is held hard left: that keeps
       Gable's head whole in the visible photo area and brings the periscope and
       the near edge of Lancaster's face up to the panel. A centre crop clips
       Gable at the left edge instead. */
    imagePosition: 'left center',
    credit: '© 1958 United Artists Corporation',
  },
  about: [
    'War on Film is a book series devoted to the study of war and military-related films. Since its earliest days, film has been one of the most powerful forms of storytelling, and war has remained one of its most enduring subjects. From stark depictions of combat to coming home — and even comedic portrayals of military life — the series examines films that both reflect real experiences and shape how audiences understand and remember conflict.',
    'The series explores this intersection of history and cinema, examining how films interpret events, express contemporary attitudes, and influence public memory.',
  ],
  editor: {
    name: 'William Thomas Allison',
    role: 'Professor of History, Georgia Southern University',
    bio: 'William Thomas Allison earned his PhD from Bowling Green State University in 1995 and has held visiting positions at the Air War College and the USAF School for Advanced Air and Space Studies. He also served as the Gen. Harold K. Johnson Visiting Chair in Military History at the U.S. Army War College. Allison is the author of The Gulf War, My Lai: An American Atrocity in the Vietnam War, and Military Justice in Vietnam: The Rule of Law in an American War, among others. He is a Fellow of the Royal Historical Society and co-hosts the podcast Military Historians Are People, Too.',
    email: 'billallison@georgiasouthern.edu',
  },
  titles: [],
}

/* ── Registry ───────────────────────────────────────────────────────────────── */

/**
 * Every series page, in the order the Books & Press section menu lists them.
 * Routed at /press/series/<slug> — see `App.tsx`.
 */
export const bookSeries: BookCollection[] = [
  scarletAndGold,
  blueAndGold,
  marineCorpsHistory,
  militaryAviation,
  presidentCommanderInChief,
  transformingWar,
  navalHistorySeaPower,
  essentialsOfStrategy,
  warOnFilm,
]

export function seriesBySlug(slug: string): BookCollection | undefined {
  return bookSeries.find((s) => s.slug === slug)
}

/** Route for a series page. */
export function seriesHref(slug: string): string {
  return `/press/series/${slug}`
}

/** Titles in a collection that can actually be bought here. */
export function purchasableTitles(collection: BookCollection): CollectionTitle[] {
  return collection.titles.filter((t) => t.href)
}

/**
 * Look titles up by product slug across every series, preserving the order the
 * slugs were given in. Lets a page name a set of books without transcribing
 * them a second time.
 */
export function titlesBySlugs(slugs: string[]): CollectionTitle[] {
  const index = new Map<string, CollectionTitle>()
  for (const series of bookSeries) {
    for (const title of series.titles) {
      if (title.slug && !index.has(title.slug)) index.set(title.slug, title)
    }
  }
  return slugs
    .map((slug) => index.get(slug))
    .filter((t): t is CollectionTitle => Boolean(t))
}

/* ── Professional Military Education hub ────────────────────────────────────── */

export const pmeHero = heroPme

/**
 * Covers shown beside the PME introduction.
 *
 * Deliberately the titles the introduction itself names — the Bluejacket's
 * Manual and the watch, command, and NCO guides it cites, then the war-college
 * titles from its second paragraph. The live page carries a pre-rendered banner
 * of six 3D covers instead, two of which have no product page to link to and
 * three of which the copy never mentions; picking the set from the copy means
 * every cover both resolves and earns its place.
 */
export const pmeFeaturedSlugs = [
  'bluejackets-manual-26th-edition-0',
  'watch-officers-guide-16th-edition',
  'command-sea-7th-edition',
  'handbook-marine-ncos-5th-edition',
  'fleet-tactics-and-naval-operations-third-edition',
  'airpower-applied',
]
