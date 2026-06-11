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
  role: string
  bio: string
}

export interface BookFormat {
  label: string
  price: number
  originalPrice: number
  isbn: string
  inStock: boolean
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
  dimensions: string
  series?: { label: string; seriesName: string; href: string }
  overview: string[]
  categories: { label: string; href: string }[]
}

export const aiWarfightingBook: BookProductData = {
  id: 'ai-warfighting',
  title: 'AI Warfighting',
  subtitle: 'Autonomous Weapons and the Future of Naval Conflict',
  authors: [
    {
      name: 'Captain James T. Morrison, USN (Ret.)',
      role: 'Former Director, Naval AI Integration, Office of the Chief of Naval Operations',
      bio: `Captain James T. Morrison served 28 years in the United States Navy, culminating as Director of Naval AI Integration in the Office of the Chief of Naval Operations. During his career he commanded destroyer USS Gridley (DDG-101) and served as fleet robotics program manager at NAVSEA. He holds advanced degrees in computer science from MIT and strategic intelligence from the National Intelligence University. Morrison is a senior fellow at the Center for Strategic and Budgetary Assessments and a frequent contributor to Proceedings and Joint Force Quarterly.`,
    },
    {
      name: 'Dr. Sarah K. Chen',
      role: 'Senior Research Scientist, Institute for Defense Analyses',
      bio: `Dr. Sarah K. Chen is a senior research scientist at the Institute for Defense Analyses, where she leads the Autonomous Systems and AI research group. A former DARPA program manager, she directed the Collaborative Operations in Denied Environments (CODE) program. Dr. Chen holds a Ph.D. in robotics from Carnegie Mellon University and has testified before the Senate Armed Services Committee on autonomous weapons policy. Her previous book, Machine Judgment, was selected for the CNO's Professional Reading Program.`,
    },
  ],
  formats: [
    { label: 'Hardcover', price: 38.95, originalPrice: 48.95, isbn: '9781682477892', inStock: true },
    { label: 'Paperback', price: 24.95, originalPrice: 32.95, isbn: '9781682477908', inStock: true },
    { label: 'eBook', price: 14.99, originalPrice: 19.99, isbn: '9781682477915', inStock: true },
  ],
  coverImage: imgAI,
  publishDate: 'March 15, 2025',
  publisher: 'Naval Institute Press',
  pageCount: 312,
  dimensions: '6.12(w) × 9.25(h) × 1.0(d)',
  series: {
    label: 'AUSA Series',
    seriesName: 'Association of the United States Army',
    href: '/books/series/ausa',
  },
  overview: [
    `AI Warfighting argues that the United States is entering a third revolution in military affairs — one driven not by nuclear weapons or precision munitions, but by artificial intelligence and autonomous systems. Drawing on classified wargames, operational simulations, and interviews with warfighters across the services, the authors build an urgent case that the joint force's bureaucratic culture and acquisition system are structuring the Navy for defeat in a conflict that will be decided in milliseconds, not months.`,
    `The book opens with a stark assessment of the People's Liberation Army Navy's autonomous capabilities, detailing how China has leveraged a decade of unrestricted AI investment to field systems the U.S. Navy cannot yet match. The authors are unsparing: current acquisition timelines mean the Navy will not close the gap through conventional procurement. The path forward, they argue, requires a fundamental reorientation around software-defined warfare — ships and aircraft that update their combat logic the way smartphones update their apps.`,
    `Central to the book is a new framework the authors call Distributed Machine Combat — a concept for networking autonomous surface, subsurface, and aerial vehicles into self-organizing swarms that overwhelm adversary defenses through mass, surprise, and adaptive behavior rather than platform sophistication. The framework is grounded in documented experiments from Trident Warrior, RIMPAC, and classified Pacific exercises.`,
    `Morrison and Chen also tackle the hardest problem in autonomous warfare: the law of armed conflict. They provide a rigorous, practically minded treatment of the human-machine teaming requirements imposed by DoD Directive 3000.09, arguing that meaningful human control and tactical speed are not inherently incompatible — but that achieving both demands deliberate system design and new training paradigms for sailors and officers.`,
    `The final section offers a reform agenda: a legislative roadmap for Congressional action, a proposed reorganization of PEO Unmanned and Small Combatants, and a model for accelerating AI talent pipelines through expanded partnerships with commercial technology firms. AI Warfighting is essential reading for anyone who wants to understand — and shape — the future of naval power.`,
  ],
  categories: [
    { label: 'AI & Technology', href: '/books/ai-technology' },
    { label: 'Naval Strategy', href: '/books/naval-strategy' },
    { label: 'Military Science', href: '/books/military-science' },
    { label: 'Autonomous Systems', href: '/books/autonomous-systems' },
    { label: 'Policy & National Security', href: '/books/policy-national-security' },
  ],
}

// AUSA series — 15 titles across 3 carousel pages
// Cover images are placeholders until final assets are supplied
export const ausaSeriesBooks: Book[] = [
  { id: 'ausa-01', title: 'Chief of Staff, Vol. 1', author: 'Edited by Maj. Gen. David T. Zabecki, AUS (Ret.)', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgAdmirals, href: '/books/chief-of-staff-vol-1' },
  { id: 'ausa-02', title: 'Adopting Mission Command', author: 'Donald E. Vandergriff', format: 'Paperback', price: 24.95, originalPrice: 32.95, image: imgMarines, href: '/books/adopting-mission-command' },
  { id: 'ausa-03', title: 'AI Warfighting', author: 'Matthew Moellering and Genna Moellering', format: 'Paperback', price: 24.95, originalPrice: 32.95, image: imgAI, href: '/books/ai-warfighting' },
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
