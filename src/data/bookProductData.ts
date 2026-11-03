import imgAI from '@/assets/images/books/ai-warfighting.jpg'
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
import type { Book } from '@/data/books'

export interface BookAuthor {
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
  inStock: boolean
}

export interface BookReview {
  /** Inline `*italics*` mark book titles. */
  quote: string
  attribution: string
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
  /** First paragraph is the lead. Inline `*italics*` mark book titles. */
  overview: string[]
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
  const format = book.formats[0]
  return [
    { icon: 'fa-book', label: 'Format', value: book.formats.map((f) => f.label).join(', ') },
    { icon: 'fa-barcode', label: 'ISBN-13', value: format.isbn },
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

// Transcribed from the live listing (project-references/current-website-screenshots/
// AI-Warfighting-U-S-Naval-Institute-11-02-2026_02_52_PM.png). The live site has no
// ISBN-10 for this title, so none is shown.
export const aiWarfightingBook: BookProductData = {
  id: 'ai-warfighting',
  title: 'AI Warfighting',
  subtitle: 'Transforming Combat Operations for the Digital Age',
  authors: [
    {
      name: 'Matthew Moellering',
      bio: `Major Matthew Moellering currently serves as the AI Director for U.S. Army Special Operations Command where he is responsible for integrating AI products for the warfighter. His service includes deployments to the Middle East and Afghanistan as an Infantry Platoon Leader and as a Special Forces Operational Detachment Alpha Commander. Matt earned his master’s degree from Carnegie Mellon University as a member of the second cohort of Army AI Scholars.`,
    },
    {
      name: 'Genna Moellering',
      bio: `Genna Moellering graduated from the United States Military Academy in 2016 and served for five years as a Military Intelligence Officer. Her service includes a deployment to Afghanistan in support of Operation Freedom’s Sentinel. She holds a master’s degree in Public Policy Management—Data Analytics from Carnegie Mellon University.`,
    },
  ],
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
