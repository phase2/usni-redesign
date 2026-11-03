import imgAI from '@/assets/images/books/ai-warfighting.jpg'
import imgMelting from '@/assets/images/books/the-melting-point.jpg'
import imgAdmirals from '@/assets/images/books/admirals-bookshelf.jpg'
import imgBattleship from '@/assets/images/books/battleship-diplomat.jpg'
import imgMarines from '@/assets/images/books/marines-history-book.jpg'
import imgChina from '@/assets/images/books/countering-china-great-game.webp'
import imgCareer from '@/assets/images/books/career-compass.jpg'
import imgWarfare from '@/assets/images/books/warfare-beneath-the-waves.jpg'
import imgGamble from '@/assets/images/books/gamble-in-the-coral.jpg'
import imgDestroyers from '@/assets/images/books/destroyers-at-war.webp'
import imgColdWar from '@/assets/images/books/cold-war-storm.jpg'
import imgSpyPlanes from '@/assets/images/books/spy-planes-intruders.webp'
import imgTraining from '@/assets/images/books/training-for-victory.jpg'
import imgJapanese from '@/assets/images/books/japanese-submarines-WWTwo.jpg'
import imgGreyhounds from '@/assets/images/books/greyhounds-of-the-pacific.jpg'
import imgSpaceForce from '@/assets/images/books/standing-up-space-force.jpg'
import logoBarnesNoble from '@/assets/images/retailers/barnesnoble.png'
import logoAmazon from '@/assets/images/retailers/amazon.png'
import logoGooglePlay from '@/assets/images/retailers/Google_Play_Store_badge_EN.svg'
import logoIBooks from '@/assets/images/retailers/ibooks.png'
import type { Book } from '@/data/books'
import { person } from '@/data/people'

export interface BookAuthor {
  /** Person page slug; links the byline and bio buttons to /people/:slug. */
  slug?: string
  name: string
  /** Optional title line under the name; the live listing shows bios only. */
  role?: string
  bio: string
}

export interface BookFormat {
  label: string
  /** Member price. */
  price: number
  /** List price. */
  originalPrice: number
  isbn: string
  isbn10?: string
  inStock: boolean
}

export interface BookReview {
  /** Inline `*italics*` mark book titles. */
  quote: string
  attribution: string
}

/** A press mention: an interview, excerpt, or op-ed elsewhere. */
export interface BookMediaItem {
  /** What it is and where, e.g. "Excerpt · The Atlantic". */
  kind: string
  date: string
  title: string
  href: string
  dek?: string
  byline?: string
}

export interface BookProductData {
  id: string
  title: string
  subtitle: string
  authors: BookAuthor[]
  formats: BookFormat[]
  coverImage: string
  publishDate: string
  publisher: string
  pageCount: number
  illustrations?: string
  dimensions: string
  weight?: string
  /** Customer rating. Omitted for titles without reviews, so no stars render. */
  rating?: { value: number; count: number }
  series?: { label: string; seriesName: string; href: string }
  /** Inline `*italics*` mark book titles. */
  overview: string[]
  /** Set the first overview paragraph as a bold lead, as the live copy does. */
  overviewLead?: boolean
  /** Credits after the authors in the byline, e.g. a foreword. */
  bylineSuffix?: string
  media?: BookMediaItem[]
  /** Outside stores that sell the eBook. The Press itself does not. */
  /** Retailer logos: the live theme's 421×140 PNGs, plus Google's official
   *  Play Store badge SVG (180×53) in place of the theme's Google Play PNG. */
  ebookRetailers?: {
    label: string
    href: string
    logo: string
  }[]
  reviews?: BookReview[]
  /** The live site's "Subject" links. */
  categories: { label: string; href: string }[]
}

export interface BookDetailRow {
  icon: string
  label: string
  value: string
  href?: string
}

/** Shared by the inline details table and the accordion variant. */
export function bookDetailRows(book: BookProductData): BookDetailRow[] {
  const multi = book.formats.length > 1
  // Each binding has its own ISBN, so with more than one the row names them.
  const isbn = (key: 'isbn' | 'isbn10') =>
    book.formats
      .filter((f) => f[key])
      .map((f) => (multi ? `${f[key]} (${f.label})` : f[key]!))
      .join(' · ')
  const isbn10 = isbn('isbn10')
  return [
    { icon: 'fa-book', label: 'Format', value: book.formats.map((f) => f.label).join(', ') },
    { icon: 'fa-barcode', label: 'ISBN-13', value: isbn('isbn') },
    ...(isbn10 ? [{ icon: 'fa-barcode', label: 'ISBN-10', value: isbn10 }] : []),
    { icon: 'fa-building', label: 'Publisher', value: book.publisher, href: '/books/about' },
    { icon: 'fa-calendar-days', label: 'Published', value: book.publishDate },
    ...(book.series
      ? [{ icon: 'fa-layer-group', label: 'Series', value: book.series.seriesName, href: book.series.href }]
      : []),
    { icon: 'fa-file-lines', label: 'Pages', value: `${book.pageCount} pages` },
    ...(book.illustrations ? [{ icon: 'fa-chart-simple', label: 'Illustrations', value: book.illustrations }] : []),
    { icon: 'fa-ruler-combined', label: 'Dimensions', value: book.dimensions },
    ...(book.weight ? [{ icon: 'fa-weight-hanging', label: 'Weight', value: book.weight }] : []),
  ]
}

/**
 * A book author whose bio comes from their person page. `bylineName` overrides
 * the page title where the book credits a fuller name (rank, initials).
 */
function authorFromPerson(slug: string, bylineName?: string): BookAuthor {
  const p = person(slug)
  if (!p) throw new Error(`No person page for "${slug}"`)
  return { slug, name: bylineName ?? p.name, bio: p.bio.join(' ') }
}

// Transcribed from the live listing (project-references/current-website-screenshots/
// AI-Warfighting-U-S-Naval-Institute-11-02-2026_02_52_PM.png). The live site has no
// ISBN-10 for this title, so none is shown.
export const aiWarfightingBook: BookProductData = {
  id: 'ai-warfighting',
  title: 'AI Warfighting',
  subtitle: 'Transforming Combat Operations for the Digital Age',
  authors: [authorFromPerson('matthew-moellering'), authorFromPerson('genna-moellering')],
  formats: [
    { label: 'Hardcover', price: 26.97, originalPrice: 44.95, isbn: '9798899190377', inStock: true },
  ],
  coverImage: imgAI,
  publishDate: 'April 20, 2027',
  publisher: 'Naval Institute Press',
  pageCount: 370,
  illustrations: '24 figures',
  dimensions: '9 × 6 × 1 in',
  weight: '24 oz',
  // Placeholder: the live title has no ratings. Kept to show the rating's
  // styling and placement in the redesign.
  rating: { value: 4.5, count: 34 },
  series: {
    label: 'AUSA Series',
    seriesName: 'Association of the United States Army',
    href: '/books/series/ausa',
  },
  overviewLead: true,
  overview: [
    `*AI Warfighting* argues that the side that wins future wars won’t be the one with the most advanced weapons, but the one that can update, adapt, and fight at the speed of software—and shows how militaries must reorganize now to do exactly that. Drawing on real-world combat experience and lessons from Ukraine, it stands apart from other AI-and-war titles by offering a clear, practical framework for commanders and leaders who need to integrate AI into operations today, not theorize about it tomorrow.`,
    `Artificial Intelligence (AI) is revolutionizing warfare and reshaping battlefields faster than military leaders can adapt. From Ukraine to the Middle East, AI-powered drones and software-driven weapon systems are outperforming traditional tools, demonstrating that the future of combat lies in technology. *AI Warfighting* is the first book to offer a practical framework for navigating this new era of AI-enabled warfare.`,
    `Written by warfighters with deep technology expertise, *AI Warfighting* introduces DevWarOps, a groundbreaking methodology inspired by the tech industry’s DevOps revolution. Just as DevOps transformed software development through collaboration, automation, and continuous improvement, DevWarOps unites software, data, and combat operations into a single, agile system. This framework reimagines military operations for a world where software defines battlefield advantage.`,
    `Divided into five parts, the book offers clear, actionable guidance for integrating AI into modern military operations. It shows how software development now shapes the OODA (Observe, Orient, Decide, Act) Loop, making data the lifeblood of warfare, reframing weapons as software systems, expanding the cyber battlefield across all domains, and demanding continuous adaptation so commanders can fight and evolve at the speed of technology.`,
    `Drawing on real-world lessons from Ukraine, Gaza, and the Middle East, *AI Warfighting* bridges theory and practice to show how AI can be deployed effectively on today’s battlefields. Aimed at commanders, policymakers, and defense innovators, it challenges outdated 20th-century processes and delivers a practical framework for turning constant technological change—where weapons are increasingly software platforms—into lasting military advantage, making it both an essential guide and a call to action for the future of warfighting.`,
  ],
  reviews: [
    {
      quote: `Every reformation begins when the people closest to the work stop waiting for permission from the cathedral. *AI Warfighting* is that document for the force. The Moellerings don’t ask the Pentagon to fix itself; they tell the captain, the chief, and the sergeant how to fight the tech stack, own their data, and ship capability at the speed of war. This is how the Defense Reformation actually happens: not in a memo from above, but in a thousand formations that refuse to be obsolete.`,
      attribution: 'Shyam Sankar, CTO of Palantir and co-author of *Mobilize: How to Reboot the American Industrial Base and Stop World War III*',
    },
    {
      quote: `The decisive contest in future war will likely be fought—and won or lost—inside the technological OODA loop. In *AI Warfighting*, the Moellerings make a powerful case that software development, data architecture, cyber defense, and organizational design are no longer support functions—they are central acts of command. Thoughtful and brilliantly argued, their fascinating book provides a framework for thinking and fighting in the digital age.`,
      attribution: 'Gen. Stan McChrystal, U.S. Army (Ret.), CEO of the leadership consulting firm McChrystal Group',
    },
  ],
  categories: [
    { label: 'Weapons', href: '/books/collection' },
    { label: 'Strategy', href: '/books/collection' },
    { label: 'Association of the U.S. Army (AUSA)', href: '/books/series/ausa' },
    { label: 'Spring 2027 Catalog', href: '/books/collection' },
  ],
}

// Transcribed from the live product page (test-usni3.pantheonsite.io/press/books/
// melting-point), including the softcover variation the page loads on demand.
// Softcover is labeled Paperback, the prototype's binding vocabulary. Subjects
// are reordered so the breadcrumb leads with a subject, not the catalog.
export const meltingPointBook: BookProductData = {
  id: 'melting-point',
  title: 'The Melting Point',
  subtitle: 'High Command and War in the 21st Century',
  authors: [authorFromPerson('kenneth-mckenzie', 'Gen. Kenneth F. McKenzie Jr., USMC (Ret.)')],
  bylineSuffix: 'Foreword by Gen. James Mattis, USMC (Ret.) and 26th Secretary of Defense',
  formats: [
    { label: 'Hardcover', price: 20.97, originalPrice: 34.95, isbn: '9781682474495', isbn10: '1682474496', inStock: true },
    { label: 'Paperback', price: 17.97, originalPrice: 29.95, isbn: '9798892411202', inStock: true },
  ],
  coverImage: imgMelting,
  publishDate: 'May 28, 2024',
  publisher: 'Naval Institute Press',
  pageCount: 360,
  illustrations: '8 maps; 20 b/w photos',
  dimensions: '9 × 6 × 1 in',
  weight: '22 oz',
  overview: [
    `As the Commander of U.S. Central Command, General Frank McKenzie oversaw some of the most important — and controversial operations in modern U.S. military history. He had direct operational responsibility for the strikes on Qassem Soleimani and two successive leaders of ISIS, the many months of deterrence operations against Iran and its proxies, and the methodical drawdown in Iraq. He directed the noncombatant evacuation operation in Afghanistan, and our final withdrawal from that tortured country.`,
    `*The Melting Point* has three themes. The first one is the importance of the primacy of civilian control of the military. It has become a widely perceived truth that this control has been eroded over the past few years. General McKenzie doesn’t believe that to be the case, and he speaks with some authority on the matter arguing that the civ-mil relationship isn’t perfect or frictionless, but it doesn’t have to be, and probably shouldn’t be. It is, however, more durable than many believe, and is supported and embraced by the military to a degree that some critics do not choose to recognize.`,
    `The second theme is the uniqueness of being a combatant commander. Combatant commanders participate in the development of policy, although as junior partners. They are also responsible for the execution of policy once civilian leaders have formulated their decision, a unique position, and very different than the role of a service chief, or even the Chairman of the Joint Chiefs of Staff. None of these officers are in the chain of command, and they have no ultimate, mortal responsibility or authority for execution. Only the combatant commander stands astride the boundary of decision-making and execution.`,
    `Finally, the third theme that McKenzie argues is that leaders matter, and the decisions they make have a profound effect on what happens on the battlefield. McKenzie provides an honest assessment of his time in command—describing decisions that were sound, as well as some outcomes he wishes were different. He offers a vivid portrait of leadership in action in one of the most volatile regions of the world.`,
  ],
  reviews: [
    {
      quote: `If we didn’t have a leatherneck warrior-scholar like Frank McKenzie, we would have to invent one. Through the lens of his last twenty years of military service Frank brings us to a realization of the complexities of a senior officer’s life. From the sausage-making of defense policy to the gut-wrenching decisions that affect young service members’ lives, General McKenzie bares it all. Unsparing in his observations, even when it affects himself negatively, he makes clear to us the understanding that life as a combatant commander is one of constant second guessing, no spare time, and a constant lack of perfect knowledge. He lived with terrorism and terrorists and was the decision maker for the notable elimination of several of the most bloody minded of these miscreants. General McKenzie makes it clear that, notwithstanding the improvements in intelligence and communication, a commander needs today what military leaders have always relied upon—experience, trust in subordinates, and a gut instinct. Thank God General McKenzie was there for us at a most perilous time for this nation and followed his gut.`,
      attribution: `Ambassador Richard Armitage, former Deputy Secretary of State and Assistant Secretary of Defense for International Security Affairs`,
    },
    {
      quote: `General Frank McKenzie led U.S. Central Command during one of the most critical, volatile times in recent military history. *The Melting Point* tells the extraordinary story of his tenure in an utterly compelling, even gripping way. This book’s candor and sophistication brings the reader into the room as difficult, dangerous, and consequential decisions are made. McKenzie’s insights and lessons form a master class in leadership, military and otherwise. This is an important, wonderfully written account by a key actor in recent global history.`,
      attribution: `Richard Fontaine, Chief Executive Officer, Center for a New American Security`,
    },
    {
      quote: `*The Melting Point* is neither the first nor the last memoir about the U.S. wars in Iraq and Afghanistan, but it is one of the most candid and insightful accounts from a seasoned U.S. military commander. This is a must-read book for anyone who wants to ensure we learn the hard lessons of this chapter in our history.`,
      attribution: `Michele Flournoy, former Undersecretary of Defense for Policy`,
    },
    {
      quote: `General Frank McKenzie is one of the most thoughtful, competent, and experienced leaders of his generation. In *The Melting Point*, he shares insightful and invaluable lessons about the Central Command Region and command at the strategic level. He writes with candor, clarity, and informed analysis. A must-read for senior military leaders, those interested in the region, and anyone seeking insight into national security decision making.`,
      attribution: `Gen. Joseph Dunford, USMC (Ret.) former Chairman of the Joint Chiefs of Staff, Commandant of the Marine Corps, and Commander in Afghanistan`,
    },
    {
      quote: `General McKenzie’s *The Melting Point* is a riveting and clear-eyed account of U.S. military engagement in the Middle East and Afghanistan between 2019 and 2022. It is a must-read for anyone interested in understanding the dynamics of the Middle East, the contest between the U.S. and Iran; the U.S. and ISIS, Al-Qaeda, and the Taliban; and the general calculations of U.S. power. Gen. McKenzie’s book follows in the tradition of other military leaders who have shared their experiences, a tradition that stretches all the way back to Roman times. It is a tribute to the values of an open society, and a tribute to General McKenzie, who is a strong believer in civilian control of the military, that a top general shares his experience not only with civilian leaders, but with the general public that is the ultimate authority in a democratic society.`,
      attribution: `Dr. Paul Salem, President and CEO, Middle East Institute`,
    },
    {
      quote: `General Frank McKenzie USMC is the embodiment of the meritocracy that is the U.S. Armed Forces, an institution like no other in the United States. Over four decades General McKenzie commanded at every level and served in ever more demanding staff assignments as well—in peacetime and in combat. Through his many years of service, he achieved the leadership, thinking, staff and decision-making skills that are common in our military men and women, and an understanding that war is indeed a political act and one that should be used in most instances as a last resort. He also came to understand, as all senior officers eventually come to understand, that what drives decisions on one side of the Potomac River is oftentimes vastly different than what takes place on the northern side of that river. The filters used to view issues are not even understood by most in the military. There are endless lessons to be gleaned from this superb work, and it is well worth the read and study by policy makers on both sides of the river.`,
      attribution: `Gen. John Kelly, USMC (Ret.), former Commander U.S. Southern Command, Secretary of Homeland Security, and Chief of Staff to the President`,
    },
    {
      quote: `A superb, exceedingly forthright, and very compelling reflection by an exceptional military leader who strived to accomplish tough missions in hard places against determined enemies – as wavering support in Washington repeatedly undermined the effort on the ground. A must-read for political and military leaders – and a very instructive chronicle for all Americans as we assess our important role in the world.`,
      attribution: `Gen. David Petraeus, USA (Ret.), former Commander of the Surge in Iraq, US Central Command, and Coalition Forces in Afghanistan, former Director of the CIA, co-author of *Conflict: The Evolution of Warfare from 1945 to Ukraine*`,
    },
    {
      quote: `*The Melting Point* is the spiritual successor to *Into the Storm* and *Battle Ready* for how it places the reader into the mind of a senior military leader and offers greater understanding of the role of the military and what it can do. It is a welcome contribution of supreme relevance and will be of use to policymakers, military leaders, and historians... a deeply relevant and important book in understanding contemporary national security policy and US relations with the nations that fall under CENTCOM’s remit.`,
      attribution: `The Cipher Brief`,
    },
    {
      quote: `A fascinating read. Both on Middle East politics and one heck of a daring assassination. Very gripping!`,
      attribution: `Elizabeth Vargas, News Nation`,
    },
    {
      quote: `*The Melting Point* offers a gripping and insightful exploration into the intricate dynamics of global military strategy and leadership. As a former commander of U.S. Central Command, Gen McKenzie brings a wealth of experience and a keen analytical eye to the complex interplay of political, military, and cultural forces shaping modern conflicts. *The Melting Point* is a valuable resource for military professionals and civilian readers interested in global security issues. One of the key strengths of the book is Gen McKenzie’s ability to present complex military concepts in a practical and accessible manner. His clear and engaging writing style, coupled with real-life examples, not only adds authenticity and depth to his arguments but also underscores the book’s real-world relevance. This makes the book a valuable resource for both experts and general readers seeking a deeper understanding of contemporary military strategy and leadership. McKenzie’s insights into leadership are also very compelling. *The Melting Point* is not only a significant contribution to military studies but also a book that has the potential to broaden readers’ perspectives on global security challenges—a worthwhile read for anyone seeking a deeper understanding of these challenges’ multifaceted nature.`,
      attribution: `National Security Institute`,
    },
    {
      quote: `In his book, recently retired General Kenneth F. McKenzie gives us a unique glimpse into a world of history, strategy, and national decision-making from the singular perspective of a combatant commander. There are many useful insights on history, strategy, leadership, military culture, and even introspection to take from *The Melting Point*.`,
      attribution: `*The National Interest*`,
    },
    {
      quote: `It's a richly detailed, highly readable, no-punches-pulled account of his three years as combatant commander at CENTCOM...`,
      attribution: `Colette Bancroft, Book Review Editor, *Tampa Times*`,
    },
    {
      quote: `Clausewitz’s quote—"War is not a mere act of policy but a true political instrument, a continuation of political activity by other means”—is certainly true in the 21st century, and nowhere truer than the Middle East. Conflict has raged across the region for almost the last quarter century, and no one has had more of an eyewitness view than the author of this new book—part memoir, part history, part strategic analysis with a little leadership thrown in for good measure.`,
      attribution: `New York Journal of Books`,
    },
    {
      quote: `After three grueling years as the commander of CENTCOM and 42 years of service, General Kenneth F. McKenzie Jr. refused to rest in his retirement. Instead, he wrote a valuable book for military professionals, Middle East scholars, and civil-military relations experts. McKenzie presents an honest, often critical, assessment of military and policy leaders, including himself.... McKenzie’s valuable advice to future strategic military leaders should be required reading at senior levels of professional military education. Military advice matters because it is rooted in experience, judgment, and the practice of war.`,
      attribution: `*Parameters*`,
    },
    {
      quote: `The author, a Marine Corps general, was the commander of U.S. forces in the Middle East, a theater-level combatant commander during periods of high tension with Iran and the U.S. withdrawal from Afghanistan. He gives his perspective of high-level decision-making during crises, most notably the elimination of Iranian Quds-force commander Soleimani and the U.S. exit from Afghanistan. He points out the durability of U.S. civilian-military relations and the uniqueness of the combatant commander’s responsibilities. His discussion of the execution of policy decisions during his tenure as commander, U.S. Central Command, is a must-read for anyone interested in the long wars of the early 21st century.`,
      attribution: `*Seapower*`,
    },
    {
      quote: `While most generals’ memoirs are poorly crafted and self-serving, readers will find that Melting Point is an invaluable and smartly written book. McKenzie looks back at his time as Commander, U.S. Central Command during several Middle East conflicts with an emphasis on the campaign in Afghanistan. Melting Point contains insights on the endgame in Kabul for those trying to understand how that war unraveled. Any professional who aspires to higher command or expects to provide strategic and operational staff support to a senior commander will benefit from a study of this work.`,
      attribution: `War on the Rocks`,
    },
    {
      quote: `General McKenzie’s recollections of events in CENTCOM and his ability to place them within the broader strategic context allows readers to effectively place the events on the global stage without losing focus on their regional importance.`,
      attribution: `H-Net`,
    },
  ],
  // "More Info" on the live page. Its all-caps headlines are set in title case.
  media: [
    {
      kind: 'Interview · Michael Smerconish, POTUS and Book Club',
      date: 'June 5, 2024',
      title: 'Book Club with Michael Smerconish',
      dek: 'Interview starts at 2:04.',
      href: 'https://www.smerconish.com/podcasts/book-club-with-michael-smerconish/',
    },
    {
      kind: 'Excerpt · The National Interest',
      date: 'June 2, 2024',
      title: 'The Melting Point: High Command and War in the 21st Century',
      byline: 'Kenneth F. McKenzie Jr.',
      href: 'https://nationalinterest.org/feature/melting-point-high-command-and-war-21st-century-211191',
    },
    {
      kind: 'Excerpt · The Atlantic',
      date: 'May 24, 2024',
      title: 'I Carried Out the Strike That Killed Soleimani. America Doesn’t Understand the Lesson of His Death.',
      dek: 'Inside the decision to assassinate Iran’s ruthless general',
      byline: 'Kenneth F. McKenzie Jr.',
      href: 'https://www.theatlantic.com/ideas/archive/2024/05/qassem-soleimani-iran-middle-east/678472/',
    },
    {
      kind: 'Op-Ed · The New York Times',
      date: 'February 14, 2024',
      title: 'It’s Not Time for Our Troops to Leave the Middle East',
      byline: 'Kenneth F. McKenzie Jr.',
      href: 'https://www.nytimes.com/2024/02/14/opinion/us-troops-syria-iraq-withdraw.html',
    },
    {
      kind: 'Op-Ed · The Wall Street Journal',
      date: 'January 4, 2024',
      title: 'Lesson of the Strike That Killed Soleimani',
      dek: 'The Iranians are rational. They can be deterred if the U.S. has the will to use force when necessary',
      byline: 'Kenneth F. McKenzie Jr.',
      href: 'https://www.wsj.com/articles/lesson-of-the-soleimani-strike-quds-iran-deterrence-war-gaza-attacks-on-americans-5c9bbfa1',
    },
  ],
  ebookRetailers: [
    { label: 'Barnes & Noble', href: 'https://www.barnesandnoble.com/w/the-melting-point-kenneth-f-mckenzie/1144249793?ean=9781682474495', logo: logoBarnesNoble },
    { label: 'Amazon Kindle', href: 'https://www.amazon.com/Melting-Point-High-Command-Century-ebook/dp/B0CLNFQ656', logo: logoAmazon },
    { label: 'Google Play', href: 'https://play.google.com/store/books/details/Kenneth_F_McKenzie_The_Melting_Point?id=VfPeEAAAQBAJ', logo: logoGooglePlay },
    { label: 'Apple Books', href: 'https://books.apple.com/us/book/the-melting-point/id6470289648', logo: logoIBooks },
  ],
  categories: [
    { label: 'Iraq & Afghanistan', href: '/books/collection' },
    { label: 'U.S. Marine Corps', href: '/books/collection' },
    { label: 'Biography & Memoirs', href: '/books/collection' },
    { label: 'Spring 2024 Catalog', href: '/books/collection' },
  ],
}

// AUSA series — 15 titles across 3 carousel pages
// Cover images are placeholders until final assets are supplied
export const ausaSeriesBooks: Book[] = [
  { id: 'ausa-01', title: 'Chief of Staff, Vol. 1', author: 'Edited by Maj. Gen. David T. Zabecki, AUS (Ret.)', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgAdmirals, href: '/books/chief-of-staff-vol-1' },
  { id: 'ausa-02', title: 'Adopting Mission Command', author: 'Donald E. Vandergriff', format: 'Paperback', price: 24.95, originalPrice: 32.95, image: imgMarines, href: '/books/adopting-mission-command' },
  { id: 'ausa-03', title: 'AI Warfighting', author: 'Matthew Moellering and Genna Moellering', format: 'Hardcover', price: 26.97, originalPrice: 44.95, image: imgAI, href: '/books/ai-warfighting' },
  { id: 'ausa-04', title: 'Arming East Asia', author: 'Eric Setzekorn', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgChina, href: '/books/arming-east-asia' },
  { id: 'ausa-05', title: 'Bipolar General', author: 'Maj. Gen. Gregg F. Martin, USA (Ret.)', format: 'Hardcover', price: 28.95, originalPrice: 36.95, image: imgCareer, href: '/books/bipolar-general' },
  { id: 'ausa-06', title: 'Black Ops Vietnam', author: 'Robert M. Gillespie', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgWarfare, href: '/books/black-ops-vietnam' },
  { id: 'ausa-07', title: 'Chief of Staff, Vol. 2', author: 'Edited by Maj. Gen. David T. Zabecki, AUS (Ret.)', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgBattleship, href: '/books/chief-of-staff-vol-2' },
  { id: 'ausa-08', title: 'Decision at Strasbourg', author: 'David P. Colley', format: 'Paperback', price: 21.95, originalPrice: 28.95, image: imgGamble, href: '/books/decision-at-strasbourg' },
  { id: 'ausa-09', title: 'Elite Souls', author: 'Raymond James Raymond', format: 'Hardcover', price: 27.95, originalPrice: 35.95, image: imgDestroyers, href: '/books/elite-souls' },
  { id: 'ausa-10', title: 'In Final Defense of the Reich', author: 'Stephen M. Rusiecki', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgColdWar, href: '/books/in-final-defense-of-the-reich' },
  { id: 'ausa-11', title: 'In the Gray Area', author: 'Lt. Col. Seth W. B. Folsom, USMC', format: 'Paperback', price: 21.95, originalPrice: 28.95, image: imgSpyPlanes, href: '/books/in-the-gray-area' },
  { id: 'ausa-12', title: 'Leadership in Dangerous Situations, Second Edition', author: 'Edited by Patrick J. Sweeney et al.', format: 'Paperback', price: 24.95, originalPrice: 32.95, image: imgTraining, href: '/books/leadership-in-dangerous-situations' },
  { id: 'ausa-13', title: 'Lost Battalion of Tet', author: 'Charles A. Krohn', format: 'Paperback', price: 19.95, originalPrice: 26.95, image: imgJapanese, href: '/books/lost-battalion-of-tet' },
  { id: 'ausa-14', title: 'Soldiers on the Beaches', author: 'James A. Villanueva', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgGreyhounds, href: '/books/soldiers-on-the-beaches' },
  { id: 'ausa-15', title: 'When the Warrior Returns', author: 'Edited by Nathan D. Ainspan and Walter Penk', format: 'Paperback', price: 21.95, originalPrice: 28.95, image: imgSpaceForce, href: '/books/when-the-warrior-returns' },
]

/** The carousel titles for a book's series, if the prototype has them. */
export function seriesBooksFor(book: BookProductData): Book[] {
  return book.series?.href === '/books/series/ausa' ? ausaSeriesBooks : []
}
