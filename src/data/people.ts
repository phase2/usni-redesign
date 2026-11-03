import { newReleases, type Book } from '@/data/books'
import { collectionCover } from '@/data/bookCollections'
import type { Article } from '@/types'
import friedmanPhoto from '@/assets/images/people/norman-friedman.jpg'

/**
 * Person pages, at /people/:slug — the site's author bios.
 *
 * Transcribed from the live test site (test-usni3.pantheonsite.io/people/<slug>
 * and each linked /press/books product page). The live page lists "Articles by"
 * and "Books by" in Drupal views that stop at 12 and 6 items with no pager; here
 * every book the catalog credits to the person is listed, newest first. Any
 * other slug falls through to the 404.
 *
 * Softcover maps to the prototype's `Paperback`. A title with no member
 * discount on the live site carries its list price as `price`, so `BookPrice`
 * shows one figure. Book and article hrefs are the live paths; only AI
 * Warfighting has a product page in the prototype.
 */
export interface Person {
  slug: string
  name: string
  /** Paragraphs. */
  bio: string[]
  photo?: string
  photoAlt?: string
  books: Book[]
  articles: Article[]
}

/* Article teaser art, bundled from the folder by file name. */
const images = import.meta.glob('../assets/images/people/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function personImage(file: string): string | undefined {
  return Object.entries(images).find(([path]) => path.endsWith(`/${file}`))?.[1]
}

const aiWarfighting = newReleases.find((b) => b.id === 'new-ai-warfighting')!

/* ── Norman Friedman & Samuel Morison (generated from the test site) ──────── */

const normanBooks: Book[] = [
  { id: 'british-aircraft-carrier-0', title: 'The British Aircraft Carrier: The Cold War and Beyond', author: 'Norman Friedman', format: 'Hardcover', price: 57.00, originalPrice: 95.00, image: collectionCover('british-aircraft-carrier-0') ?? '', href: '/books/british-aircraft-carrier-0' }, // November 10, 2026
  { id: 'cold-war-anti-submarine-warfare', title: 'Cold War Anti-Submarine Warfare', author: 'Norman Friedman', format: 'Hardcover', price: 75.00, originalPrice: 125.00, image: collectionCover('cold-war-anti-submarine-warfare') ?? '', href: '/books/cold-war-anti-submarine-warfare' }, // August 12, 2025
  { id: 'british-aircraft-carrier', title: 'The British Aircraft Carrier: In Two World Wars', author: 'Norman Friedman', format: 'Hardcover', price: 51.00, originalPrice: 85.00, image: collectionCover('british-aircraft-carrier') ?? '', href: '/books/british-aircraft-carrier' }, // June 24, 2025
  { id: 'us-submarines-1945-revised-edition', title: 'U.S. Submarines since 1945, Revised Edition', author: 'Norman Friedman; Illustrated by James L. Christley', format: 'Hardcover', price: 69.00, originalPrice: 115.00, image: collectionCover('us-submarines-1945-revised-edition') ?? '', href: '/books/us-submarines-1945-revised-edition' }, // October 15, 2023
  { id: 'british-coastal-forces', title: 'British Coastal Forces', author: 'Norman Friedman', format: 'Hardcover', price: 80.00, originalPrice: 100.00, image: collectionCover('british-coastal-forces') ?? '', href: '/books/british-coastal-forces' }, // June 15, 2023
  { id: 'us-aircraft-carriers-revised-edition', title: 'U.S. Aircraft Carriers, Revised Edition', author: 'Norman Friedman; Ship Plans by A. D. Baker III', format: 'Hardcover', price: 78.00, originalPrice: 130.00, image: collectionCover('us-aircraft-carriers-revised-edition') ?? '', href: '/books/us-aircraft-carriers-revised-edition' }, // November 15, 2022
  { id: 'british-cruisers-0', title: 'British Cruisers', author: 'Norman Friedman', format: 'Paperback', price: 22.38, originalPrice: 22.38, image: collectionCover('british-cruisers-0') ?? '', href: '/books/british-cruisers-0' }, // May 15, 2022
  { id: 'us-navy-attack-aircraft-1920-2020', title: 'U.S. Navy Attack Aircraft, 1920-2020', author: 'Norman Friedman', format: 'Hardcover', price: 100.00, originalPrice: 125.00, image: collectionCover('us-navy-attack-aircraft-1920-2020') ?? '', href: '/books/us-navy-attack-aircraft-1920-2020' }, // May 15, 2022
  { id: 'us-cruisers-1', title: 'U.S. Cruisers', author: 'Norman Friedman; Ship plans by A. D. Baker and Alan Raven', format: 'Hardcover', price: 84.00, originalPrice: 105.00, image: collectionCover('us-cruisers-1') ?? '', href: '/books/us-cruisers-1' }, // November 15, 2021
  { id: 'us-battleships-0', title: 'U.S. Battleships', author: 'Norman Friedman; Ship plans by A. D. Baker and Alan Raven', format: 'Hardcover', price: 84.00, originalPrice: 105.00, image: collectionCover('us-battleships-0') ?? '', href: '/books/us-battleships-0' }, // October 15, 2021
  { id: 'british-submarines-cold-war-era', title: 'British Submarines in the Cold War Era', author: 'Norman Friedman', format: 'Hardcover', price: 54.00, originalPrice: 90.00, image: collectionCover('british-submarines-cold-war-era') ?? '', href: '/books/british-submarines-cold-war-era' }, // September 15, 2021
  { id: 'us-destroyers-revised-edition', title: 'U.S. Destroyers, Revised Edition', author: 'Norman Friedman; Ship plans by A. D. Baker III', format: 'Hardcover', price: 84.00, originalPrice: 105.00, image: collectionCover('us-destroyers-revised-edition') ?? '', href: '/books/us-destroyers-revised-edition' }, // August 15, 2021
  { id: 'us-submarines-through-1945-0', title: 'U.S. Submarines Through 1945', author: 'Norman Friedman', format: 'Hardcover', price: 60.00, originalPrice: 75.00, image: collectionCover('us-submarines-through-1945-0') ?? '', href: '/books/us-submarines-through-1945-0' }, // August 15, 2021
  { id: 'british-naval-weapons-world-war-two-1', title: 'British Naval Weapons of World War Two', author: 'Norman Friedman', format: 'Hardcover', price: 25.58, originalPrice: 25.58, image: collectionCover('british-naval-weapons-world-war-two-1') ?? '', href: '/books/british-naval-weapons-world-war-two-1' }, // August 15, 2020
  { id: 'fifty-year-war', title: 'Fifty-Year War', author: 'Norman Friedman', format: 'Paperback', price: 9.58, originalPrice: 9.58, image: collectionCover('fifty-year-war') ?? '', href: '/books/fifty-year-war' }, // March 7, 2007
  { id: 'naval-institute-guide-world-naval-weapon-system', title: 'Naval Institute Guide to World Naval Weapon System', author: 'Norman Friedman', format: 'Hardcover', price: 112.00, originalPrice: 112.00, image: collectionCover('naval-institute-guide-world-naval-weapon-system') ?? '', href: '/books/naval-institute-guide-world-naval-weapon-system' }, // May 15, 2006
]

const normanArticles: Article[] = [
  { id: 'norman-friedman-1', category: 'Naval History', headline: 'Strategic Submarines and the Cold War End Game', excerpt: 'A renowned authority offers an insightful look at the dueling strategies for deploying ballistic-missile submarines during the decades-long U.S.-Soviet naval standoff.', author: 'Norman Friedman', date: 'August 2025', image: personImage('friedman-nh-julaug-25-1-hero.jpg'), imageAlt: 'Walter H. Bollendonk’s 1961 painting Polaris Underwater Firing depicts the submarine launch of a ballistic missile. Polaris and its successors became a Soviet nightmare—and a major driver in Soviet naval development.', href: '/magazines/naval-history/2025/august/strategic-submarines-and-cold-war-end-game' },
  { id: 'norman-friedman-2', category: 'Naval History', headline: 'The Super Submarine: USS Albacore', excerpt: 'The USS Albacore (AGSS-569) is remembered as the prototype for the hull form of fast, maneuverable submarines. But her story is much more complex than that.', author: 'Norman Friedman', date: 'February 2023', image: personImage('arms-nh-nd-22-2-hero.jpg'), imageAlt: 'The Albacore under way', href: '/magazines/naval-history-magazine/2023/february/super-submarine-uss-albacore' },
  { id: 'norman-friedman-3', category: 'Naval History', headline: 'The Double Turret', excerpt: 'When the United States began building battleships in about 1890, it adopted—uniquely among the world’s battleship navies—two-story turrets for some them.', author: 'Norman Friedman', date: 'October 2022', image: personImage('arms-nh-so-22-hero.jpg'), imageAlt: 'Kearsarge', href: '/magazines/naval-history-magazine/2022/october/double-turret' },
  { id: 'norman-friedman-4', category: 'Naval History', headline: 'Evolution of a Ship-Sinker', excerpt: 'The Mk 13 torpedo emerged as a devastating weapon responsible for sinking a Japanese superbattleship at the Battle of Leyte Gulf and another one off Okinawa.', author: 'Norman Friedman, Author of U.S. Navy Attack Aircraft, 1920–2020 (Naval Institute Press, 2022)', date: 'August 2022', image: personImage('arms-nh-ja-22-1.jpg'), imageAlt: 'Ordnancemen on board the USS San Jacinto (CVL-30) ', href: '/magazines/naval-history-magazine/2022/august/evolution-ship-sinker' },
  { id: 'norman-friedman-5', category: 'Proceedings', headline: 'American Sea Power Project: Geography Plays an Ocean-Sized Role', excerpt: 'The sea still shapes what navies can do.', author: 'Norman Friedman', date: 'June 2022', image: personImage('aspp-pro-6-22-1.jpg'), imageAlt: 'ship', href: '/magazines/proceedings/2022/june/american-sea-power-project-geography-plays-ocean-sized-role' },
  { id: 'norman-friedman-6', category: 'Proceedings', headline: 'Australia and Nuclear-Powered Submarines', excerpt: 'AUKUS is intended to enhance the alliance among Australia, the United States, and the United Kingdom.', author: 'Norman Friedman', date: 'November 2021', image: personImage('wnd-pro-11-21-1.jpg'), imageAlt: 'submarines', href: '/magazines/proceedings/2021/november/australia-and-nuclear-powered-submarines' },
  { id: 'norman-friedman-7', category: 'Proceedings', headline: 'Nothing Illusory about Command of the Seas', excerpt: 'An article in the June Proceedings misinterprets both Alfred Thayer Mahan and the wider issue of how sea power can or should affect events on land.', author: 'Norman Friedman', date: 'August 2021', image: personImage('ic-friedman-pro-8-21-hero.jpg'), imageAlt: 'submarine', href: '/magazines/proceedings/2021/august/nothing-illusory-about-command-seas' },
  { id: 'norman-friedman-8', category: 'Proceedings', headline: 'A Credible Deterrent to Chinese Cyber Attacks', excerpt: 'To deter China in the cyber domain, the United States should target the information technology network that enables Beijing’s social credit system.', author: 'Norman Friedman', date: 'June 2021', image: personImage('friedman-online.jpg'), imageAlt: 'Chinese citizens', href: '/magazines/proceedings/2021/june/credible-deterrent-chinese-cyber-attacks' },
  { id: 'norman-friedman-9', category: 'Naval History', headline: 'Debacle at Bahía de Cochinos', excerpt: 'Herein, through a naval lens, a 60-year look back at the calamitous Bay of Pigs invasion of April 1961.', author: 'Norman Friedman', date: 'April 2021', image: personImage('friedman-nh-ma-21-opener.jpg'), imageAlt: 'Cuban troops lead away a captive CIA officer (left) after the disastrous amphibious landing attempt at the Bay of Pigs.  The decision to hold off on air support, and the failure to make fuller use of the offshore U.S. fleet, sealed the undertaking’s doom.', href: '/magazines/naval-history-magazine/2021/april/debacle-bahia-de-cochinos' },
  { id: 'norman-friedman-10', category: 'Naval History', headline: 'Spiral Development of the Standard Missile', excerpt: 'Given the speed of technological change, it is remarkable that the U.S. Navy has been using versions of the Standard Missile and its predecessors for 60-some years.', author: 'Norman Friedman', date: 'April 2020', image: personImage('arms-nh-ma-20-1.jpg'), imageAlt: 'extended-range RIM-2 Terrier', href: '/magazines/naval-history-magazine/2020/april/spiral-development-standard-missile' },
  { id: 'norman-friedman-11', category: 'Proceedings', headline: 'Learning to Fight a Cyber War', excerpt: 'The technology that allows us to create and wield cyber weapons for collaborative gaming can also serve as a tool to learn how to fight a new kind of war.', author: 'Norman Friedman', date: 'February 2020', image: personImage('wnd-pro-2-20-2.jpg'), imageAlt: 'Naval War College game', href: '/magazines/proceedings/2020/february/learning-fight-cyber-war' },
  { id: 'norman-friedman-12', category: 'Proceedings', headline: 'The Case for Killing Soleimani—A Lesson in Deterrence', excerpt: 'Targeting the leader of Iran\'s paramilitary force was a preventative measure to deter future aggression against the United States.', author: 'Norman Friedman', date: 'January 2020', image: personImage('soleimani-mourners.jpg'), imageAlt: 'Iranian mourners pay tribute to Qasem Soleimani in Tehran', href: '/magazines/proceedings/2020/january/case-killing-soleimani-lesson-deterrence' },
]

const samuelBooks: Book[] = [
  { id: 'history-us-naval-operations-world-war-ii', title: 'History Of U.S. Naval Operations In World War II', author: 'Samuel Eliot Morison', format: 'Paperback', price: 313.60, originalPrice: 392.00, image: collectionCover('history-us-naval-operations-world-war-ii') ?? '', href: '/books/history-us-naval-operations-world-war-ii' }, // July 15, 2016
  { id: 'liberation-philippines-luzon-mindanao-visayas-1944-1945', title: 'The Liberation of Philippines: Luzon, Mindanao, The Visayas, 1944-1945', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('liberation-philippines-luzon-mindanao-visayas-1944-1945') ?? '', href: '/books/liberation-philippines-luzon-mindanao-visayas-1944-1945' }, // March 15, 2012
  { id: 'victory-pacific-1945', title: 'Victory in the Pacific, 1945', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('victory-pacific-1945') ?? '', href: '/books/victory-pacific-1945' }, // March 15, 2012
  { id: 'invasion-france-and-germany-1944-1945', title: 'The Invasion of France and Germany, 1944-1945', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('invasion-france-and-germany-1944-1945') ?? '', href: '/books/invasion-france-and-germany-1944-1945' }, // October 15, 2011
  { id: 'leyte-june-1944-january-1945', title: 'Leyte, June 1944-January 1945', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('leyte-june-1944-january-1945') ?? '', href: '/books/leyte-june-1944-january-1945' }, // October 15, 2011
  { id: 'atlantic-battle-won-may-1943-may-1945', title: 'The Atlantic Battle Won, May 1943-May 1945', author: 'Samuel Eliot Morison', format: 'Paperback', price: 8.38, originalPrice: 8.38, image: collectionCover('atlantic-battle-won-may-1943-may-1945') ?? '', href: '/books/atlantic-battle-won-may-1943-may-1945' }, // September 15, 2011
  { id: 'aleutians-gilberts-and-marshalls-june-1941-april-1944', title: 'Aleutians, Gilberts and Marshalls, June 1941-April 1944', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('aleutians-gilberts-and-marshalls-june-1941-april-1944') ?? '', href: '/books/aleutians-gilberts-and-marshalls-june-1941-april-1944' }, // February 14, 2011
  { id: 'new-guinea-and-marianas-march-1944-august-1944', title: 'New Guinea and the Marianas, March 1944-August 1944', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('new-guinea-and-marianas-march-1944-august-1944') ?? '', href: '/books/new-guinea-and-marianas-march-1944-august-1944' }, // February 14, 2011
  { id: 'sicily-salerno-anzio-june-1943-june-1944', title: 'Sicily-Salerno-Anzio, June 1943-June 1944', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('sicily-salerno-anzio-june-1943-june-1944') ?? '', href: '/books/sicily-salerno-anzio-june-1943-june-1944' }, // February 14, 2011
  { id: 'breaking-bismarcks-barrier-22-july-1942-1-may-1944', title: 'Breaking the Bismarcks Barrier, 22 July 1942-1 May 1944', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('breaking-bismarcks-barrier-22-july-1942-1-may-1944') ?? '', href: '/books/breaking-bismarcks-barrier-22-july-1942-1-may-1944' }, // November 1, 2010
  { id: 'coral-sea-midway-and-submarine-actions-may-1942-august-1942', title: 'Coral Sea, Midway and Submarine Actions, May 1942-August 1942', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('coral-sea-midway-and-submarine-actions-may-1942-august-1942') ?? '', href: '/books/coral-sea-midway-and-submarine-actions-may-1942-august-1942' }, // November 1, 2010
  { id: 'struggle-guadalcanal-august-1942-february-1943', title: 'The Struggle for Guadalcanal, August 1942-February 1943', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('struggle-guadalcanal-august-1942-february-1943') ?? '', href: '/books/struggle-guadalcanal-august-1942-february-1943' }, // November 1, 2010
  { id: 'rising-sun-pacific-1931-april-1942', title: 'The Rising Sun in Pacific, 1931-April 1942', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('rising-sun-pacific-1931-april-1942') ?? '', href: '/books/rising-sun-pacific-1931-april-1942' }, // March 15, 2010
  { id: 'battle-atlantic-september-1939-1943', title: 'The Battle of the Atlantic, September 1939-1943', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('battle-atlantic-september-1939-1943') ?? '', href: '/books/battle-atlantic-september-1939-1943' }, // March 1, 2010
  { id: 'operations-north-african-waters-october-1942-june-1943', title: 'Operations in North African Waters, October 1942-June 1943', author: 'Samuel Eliot Morison', format: 'Paperback', price: 22.36, originalPrice: 27.95, image: collectionCover('operations-north-african-waters-october-1942-june-1943') ?? '', href: '/books/operations-north-african-waters-october-1942-june-1943' }, // March 1, 2010
  { id: 'two-ocean-war', title: 'The Two-Ocean War', author: 'Samuel Eliot Morison', format: 'Paperback', price: 25.56, originalPrice: 31.95, image: collectionCover('two-ocean-war') ?? '', href: '/books/two-ocean-war' }, // March 1, 2007
]

const samuelArticles: Article[] = [
  { id: 'samuel-morison-1', category: 'Proceedings', headline: 'The Battle of Surigao Strait*', excerpt: 'At fifteen minutes after noon on October 24, 1944, Vice Admiral Kinkaid alerted every combatant and merchant ship under his command to prepare for a night engagement. He correctly estimated ...', author: 'Rear Admiral Samuel E. Morison, USNR (Ret.)', date: 'December 1958', href: '/magazines/proceedings/1958/december/battle-surigao-strait' },
  { id: 'samuel-morison-2', category: 'Proceedings', headline: 'Plymouth Colony Beachhead', excerpt: 'The landing of the Pilgrim Fathers on Plymouth Rock is perhaps the best known event of American history. It has been the theme of so much purple prose, so many ...', author: 'Rear Admiral S. E. Morison, U. S. Naval Reserve (Retired)', date: 'December 1954', href: '/magazines/proceedings/1954/december/plymouth-colony-beachhead' },
]

export const people: Record<string, Person> = {
  'matthew-moellering': {
    slug: 'matthew-moellering',
    name: 'Matthew Moellering',
    bio: [
      `Major Matthew Moellering currently serves as the AI Director for U.S. Army Special Operations Command where he is responsible for integrating AI products for the warfighter. His service includes deployments to the Middle East and Afghanistan as an Infantry Platoon Leader and as a Special Forces Operational Detachment Alpha Commander. Matt earned his master’s degree from Carnegie Mellon University as a member of the second cohort of Army AI Scholars.`,
    ],
    books: [aiWarfighting],
    articles: [],
  },
  'genna-moellering': {
    slug: 'genna-moellering',
    name: 'Genna Moellering',
    bio: [
      `Genna Moellering graduated from the United States Military Academy in 2016 and served for five years as a Military Intelligence Officer. Her service includes a deployment to Afghanistan in support of Operation Freedom’s Sentinel. She holds a master’s degree in Public Policy Management—Data Analytics from Carnegie Mellon University.`,
    ],
    books: [aiWarfighting],
    articles: [],
  },
  'norman-friedman': {
    slug: 'norman-friedman',
    name: 'Norman Friedman',
    bio: [
      `Norman Friedman is a prominent defense analyst and historian specializing in the intersection between policy, strategy, and technology, mainly in a naval context. He has published more than forty books. He is the recipient of numerous awards, including the Commodore Dudley W. Knox medal by the Naval Historical Foundation, the Samuel Eliot Morrison award by the Naval Order of the United States, the Westminster Prize awarded by the Royal United Service Institute, and the Anderson Medal of the British Society for Nautical Research. He has twice received the John Lyman Award from the North American Society for Oceanic History. He lives in New York.`,
    ],
    photo: friedmanPhoto,
    photoAlt: 'Norman Friedman',
    books: normanBooks,
    articles: normanArticles,
  },
  'samuel-morison': {
    slug: 'samuel-morison',
    name: 'Samuel Morison',
    bio: [
      `Well known in naval circles for his Maritime History of Massachusetts and for his biographies of Columbus (Admiral of the Ocean Sea) and John Paul Jones (A Sailor’s Biography), Admiral Morison’s most famous achievement was his multi-volume History of U.S. Naval Operations in World War II, made possible by President Roosevelt’s commissioning him as a lieutenant commander and giving him carte blanche access to the events as they were happening during the war. Morison was later named the Jonathan Trumbull Professor of American History at Harvard University and ultimately retired as a rear admiral in 1951. He was the recipient of two Pulitzer Prizes, two Bancroft Prizes, and the Presidential Medal of Freedom.`,
    ],
    books: samuelBooks,
    articles: samuelArticles,
  },
}

export function person(slug: string): Person | undefined {
  return people[slug]
}

/** Where a person's bio page lives. */
export function personHref(slug: string): string {
  return `/people/${slug}`
}
