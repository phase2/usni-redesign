import imgWarfare from '@/assets/images/books/warfare-beneath-the-waves.jpg'
import imgTraining from '@/assets/images/books/training-for-victory.jpg'
import imgMelting from '@/assets/images/books/the-melting-point.jpg'
import imgSpaceForce from '@/assets/images/books/standing-up-space-force.jpg'
import imgSpyPlanes from '@/assets/images/books/spy-planes-intruders.webp'
import imgSeaPower from '@/assets/images/books/sea-power-american-interest.jpg'
import imgRush from '@/assets/images/books/rush-to-disaster.webp'
import imgAegis from '@/assets/images/books/origins-of-aegis.webp'
import imgMarines from '@/assets/images/books/marines-history-book.jpg'
import imgJapanese from '@/assets/images/books/japanese-submarines-WWTwo.jpg'
import imgGreyhounds from '@/assets/images/books/greyhounds-of-the-pacific.jpg'
import imgFastShip from '@/assets/images/books/give-me-a-fast-ship.jpg'
import imgAdmirals from '@/assets/images/books/admirals-bookshelf.jpg'
import imgColdWar from '@/assets/images/books/cold-war-storm.jpg'
import imgBattleship from '@/assets/images/books/battleship-diplomat.jpg'
import imgCareer from '@/assets/images/books/career-compass.jpg'
import imgAirpower from '@/assets/images/books/american-airpower.webp'
import imgFalcons from '@/assets/images/books/fighting-falcons.jpg'
import imgCyber from '@/assets/images/books/cyber-warfare-and-navies.jpg'
import imgAI from '@/assets/images/books/ai-warfighting.jpg'

export interface Book {
  id: string
  title: string
  author: string
  format: string
  price: number
  originalPrice: number
  image: string
  href: string
}

export const newReleases: Book[] = [
  { id: 'nr1', title: 'Warfare Beneath the Waves', author: 'Axel Niestle', format: 'Hardcover', price: 29.95, originalPrice: 39.95, image: imgWarfare, href: '/books/warfare-beneath-the-waves' },
  { id: 'nr2', title: 'Training for Victory', author: 'Frank R. Donche', format: 'Hardcover', price: 34.95, originalPrice: 44.95, image: imgTraining, href: '/books/training-for-victory' },
  { id: 'nr3', title: 'The Melting Point', author: 'Forrest L. Marion', format: 'Hardcover', price: 32.95, originalPrice: 42.95, image: imgMelting, href: '/books/the-melting-point' },
  { id: 'nr4', title: 'Standing Up the Space Force', author: 'Multiple Authors', format: 'Paperback', price: 24.95, originalPrice: 32.95, image: imgSpaceForce, href: '/books/standing-up-space-force' },
  { id: 'nr5', title: 'Intruders, and Wild Weasels', author: 'Thomas Wildenberg', format: 'Hardcover', price: 36.95, originalPrice: 46.95, image: imgSpyPlanes, href: '/books/intruders-wild-weasels' },
  { id: 'nr6', title: 'Sea Power and the American Interest', author: 'John Fass Morton', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgSeaPower, href: '/books/sea-power-american-interest' },
  { id: 'nr7', title: "The Admiral's Bookshelf", author: 'James Stavridis', format: 'Hardcover', price: 28.95, originalPrice: 36.95, image: imgAdmirals, href: '/books/admirals-bookshelf' },
  { id: 'nr8', title: 'Cold War Storm', author: 'Multiple Authors', format: 'Paperback', price: 21.95, originalPrice: 28.95, image: imgColdWar, href: '/books/cold-war-storm' },
  { id: 'nr9', title: 'AI Warfighting', author: 'Multiple Authors', format: 'Hardcover', price: 38.95, originalPrice: 48.95, image: imgAI, href: '/books/ai-warfighting' },
  { id: 'nr10', title: 'Cyber Warfare and Navies', author: 'Multiple Authors', format: 'Paperback', price: 26.95, originalPrice: 34.95, image: imgCyber, href: '/books/cyber-warfare-navies' },
]

export const bestSellers: Book[] = [
  { id: 'bs1', title: 'Rush to Disaster', author: 'James D. Hornfischer', format: 'Paperback', price: 19.95, originalPrice: 26.95, image: imgRush, href: '/books/rush-to-disaster' },
  { id: 'bs2', title: 'The Origins of Aegis', author: 'Thomas Wildenberg', format: 'Hardcover', price: 34.95, originalPrice: 44.95, image: imgAegis, href: '/books/origins-of-aegis' },
  { id: 'bs3', title: 'United States Marines: A History', author: 'Multiple Authors', format: 'Hardcover', price: 39.95, originalPrice: 49.95, image: imgMarines, href: '/books/marines-history' },
  { id: 'bs4', title: "Japanese Submarines in World War Two", author: 'Terry C. Treadwell', format: 'Paperback', price: 22.95, originalPrice: 29.95, image: imgJapanese, href: '/books/japanese-submarines' },
  { id: 'bs5', title: 'Greyhounds of the Pacific', author: 'Multiple Authors', format: 'Hardcover', price: 32.95, originalPrice: 42.95, image: imgGreyhounds, href: '/books/greyhounds-pacific' },
  { id: 'bs6', title: 'Give Me a Fast Ship', author: 'Tim McGrath', format: 'Paperback', price: 18.95, originalPrice: 24.95, image: imgFastShip, href: '/books/give-me-fast-ship' },
  { id: 'bs7', title: 'Battleship Diplomat', author: 'Nancy Snow', format: 'Hardcover', price: 31.95, originalPrice: 41.95, image: imgBattleship, href: '/books/battleship-diplomat' },
  { id: 'bs8', title: 'Career Compass', author: 'Douglas H. Raugh Jr.', format: 'Paperback', price: 17.95, originalPrice: 22.95, image: imgCareer, href: '/books/career-compass' },
  { id: 'bs9', title: 'American Airpower', author: 'Peter F. Owen', format: 'Hardcover', price: 36.95, originalPrice: 46.95, image: imgAirpower, href: '/books/american-airpower' },
  { id: 'bs10', title: 'Fighting Falcons', author: 'Multiple Authors', format: 'Paperback', price: 23.95, originalPrice: 30.95, image: imgFalcons, href: '/books/fighting-falcons' },
]

export const heroGridBooks = [
  imgWarfare, imgTraining, imgMelting, imgSpaceForce, imgSpyPlanes, imgSeaPower, imgRush, imgAegis,
  imgMarines, imgJapanese, imgGreyhounds, imgFastShip, imgAdmirals, imgColdWar, imgBattleship, imgCareer,
  imgAirpower, imgFalcons, imgCyber, imgAI,
]

export const topSubjects = [
  { label: 'Age of Sail', href: '/books/age-of-sail' },
  { label: 'Aviation & Space', href: '/books/aviation-space' },
  { label: 'Civil War', href: '/books/civil-war' },
  { label: 'Iraq & Afghanistan', href: '/books/iraq-afghanistan' },
  { label: 'McMullen Naval History Symposium', href: '/books/mcmullen-symposium' },
  { label: 'Navy Reading', href: '/books/navy-reading' },
  { label: 'Pearl Harbor', href: '/books/pearl-harbor' },
  { label: 'Political Science', href: '/books/political-science' },
  { label: 'U.S. Air Force', href: '/books/us-air-force' },
  { label: 'World War II', href: '/books/world-war-ii' },
]
