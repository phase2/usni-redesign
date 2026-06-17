import type { Article } from '@/types'

import imgOnOurScope    from '@/assets/images/nh-on-our-scope.png'
import imgShipwrecks    from '@/assets/images/nh-holy-grail-shipwrecks.png'
import imgArizona       from '@/assets/images/nh-uss-arizona.png'
import imgClashFleets   from '@/assets/images/nh-clash-fleets-south-china-sea.png'
import imgMitscher      from '@/assets/images/naval-history-articles/Russell-NH-5-26-1 Hero.jpg'
import imgRochefort     from '@/assets/images/naval-history-articles/Justice for Joe Rochefort.jpg'
import imgMarianas      from '@/assets/images/naval-history-articles/Friendly Fire Over the Marianas.webp'
import imgUC5           from '@/assets/images/naval-history-articles/The Ill-Fated UC-5 .jpg'
import imgAviator       from '@/assets/images/naval-history-articles/At 100 Years Old, a Korean War Aviator Receives a Long-Overdue Medal of Honor.webp'

import imgCvrMJ26  from '@/assets/images/nh-magazine-covers/NH_Cvr_MJ26.webp'
import imgCvrMA26  from '@/assets/images/nh-magazine-covers/NH_Cvr_MA26.webp'
import imgCvrJF26  from '@/assets/images/nh-magazine-covers/NH_Cvr_JF26_FNL.webp'
import imgCvrND25  from '@/assets/images/nh-magazine-covers/NH_Cvr_ND25_noUPC_0.webp'
import imgCvrSO25  from '@/assets/images/nh-magazine-covers/NH_CvrSO25_noUPC.webp'
import imgCvrJA25  from '@/assets/images/nh-magazine-covers/NH_Cvr JA25.webp'
import imgCvrMJ25  from '@/assets/images/nh-magazine-covers/NH_Cvr MJ25.webp'
import imgCvrMA25  from '@/assets/images/nh-magazine-covers/NH_Cvr MA25.jpg'

// Featured articles — top of landing page
export const featuredArticlesLeft: Article[] = [
  {
    id: 'nh-f1',
    category: 'NH Featured Article',
    headline: 'Justice for Joe Rochefort',
    excerpt: 'For more than four decades, former colleagues fought for proper recognition of the unsung codebreaking hero of Midway.',
    author: 'Ed Offley',
    image: imgRochefort,
    imageAlt: 'Joe Rochefort, codebreaking hero of the Battle of Midway',
    href: '/naval-history/justice-for-joe-rochefort',
  },
  {
    id: 'nh-f2',
    category: 'NH Featured Article',
    headline: 'At 100 Years Old, a Korean War Aviator Receives a Long-Overdue Medal of Honor',
    excerpt: 'Williams becomes the oldest person to receive the highest military decoration.',
    date: 'June 2026',
    image: imgAviator,
    imageAlt: 'Korean War aviator receiving the Medal of Honor at 100 years old',
    href: '/naval-history/korean-war-aviator-medal-of-honor',
  },
]

export const featuredArticleCenter: Article = {
  id: 'nh-f3',
  category: 'Battle of Midway',
  headline: 'Mitscher at Midway: The Controversy and Continuing Debate',
  excerpt: 'Sixty years of scholarship has yielded no consensus on whether Captain Marc Mitscher\'s decisions aboard USS Hornet determined — or cost — America\'s greatest naval victory.',
  date: 'June 2026',
  author: 'James D. Russell',
  image: imgMitscher,
  imageAlt: 'Carrier aircraft being prepared for launch on USS Hornet flight deck before Midway',
  href: '/naval-history/mitscher-at-midway',
}

export const featuredArticlesRight: Article[] = [
  {
    id: 'nh-f4',
    category: 'NH Featured Article',
    headline: 'Friendly Fire Over the Marianas',
    excerpt: 'In the summer of 1944, tragedy strikes thrice for Patrol Squadron 16 in this tale of mixed signals and malfunctioning equipment.',
    author: 'Colonel Geoffrey Anthony, U.S. Marine Corps (Retired)',
    image: imgMarianas,
    imageAlt: 'Patrol aircraft over the Marianas in 1944',
    href: '/naval-history/friendly-fire-over-the-marianas',
  },
  {
    id: 'nh-f5',
    category: 'NH Featured Article',
    headline: 'The Ill-Fated UC-5',
    excerpt: 'The brief, yet lethal career of the first German submarine minelayer to penetrate the English Channel during World War I.',
    author: 'Thomas Wildenberg',
    image: imgUC5,
    imageAlt: 'German submarine UC-5, the first minelayer to penetrate the English Channel',
    href: '/naval-history/the-ill-fated-uc-5',
  },
]

// Latest issue articles — two columns
export const latestIssueCol1: Article[] = [
  {
    id: 'nh-l1',
    category: 'Naval History News',
    headline: "Recovery of the 'Holy Grail of Shipwrecks' Begins amid Decades-Long Legal Battle",
    date: 'April 2026',
    image: imgShipwrecks,
    imageAlt: 'Historic naval battle painting of tall ships',
    href: '/naval-history/holy-grail-shipwrecks',
  },
  {
    id: 'nh-l2',
    category: 'Naval History News',
    headline: 'More Than 100 Tons of Concrete Removed from the USS Arizona',
    date: 'April 2026',
    image: imgArizona,
    imageAlt: 'Workers removing concrete from the USS Arizona memorial',
    href: '/naval-history/uss-arizona-concrete',
  },
]

export const latestIssueCol2: Article[] = [
  {
    id: 'nh-l3',
    category: 'Classic Sea Fights',
    headline: 'Clash of Fleets in the South China Sea',
    date: 'April 2026',
    author: 'Cadet Brandon H. Tran, U.S. Military Academy',
    image: imgClashFleets,
    imageAlt: 'Naval battle painting in the South China Sea',
    href: '/naval-history/clash-fleets-south-china-sea',
  },
  {
    id: 'nh-l4',
    category: 'On Our Scope',
    headline: 'On Our Scope',
    date: 'April 2026',
    image: imgOnOurScope,
    imageAlt: 'Naval officer looking through binoculars on a ship',
    href: '/naval-history/on-our-scope',
  },
]

// Magazine archive
export const magazineIssues = [
  { month: 'May/Jun 2026', vol: 'Vol. 40, No. 3', cover: imgCvrMJ26, href: '/naval-history/may-jun-2026' },
  { month: 'Mar/Apr 2026', vol: 'Vol. 40, No. 2', cover: imgCvrMA26, href: '/naval-history/mar-apr-2026' },
  { month: 'Jan/Feb 2026', vol: 'Vol. 40, No. 1', cover: imgCvrJF26, href: '/naval-history/jan-feb-2026' },
  { month: 'Nov/Dec 2025', vol: 'Vol. 39, No. 6', cover: imgCvrND25, href: '/naval-history/nov-dec-2025' },
  { month: 'Sep/Oct 2025', vol: 'Vol. 39, No. 5', cover: imgCvrSO25, href: '/naval-history/sep-oct-2025' },
  { month: 'Jul/Aug 2025', vol: 'Vol. 39, No. 4', cover: imgCvrJA25, href: '/naval-history/jul-aug-2025' },
  { month: 'May/Jun 2025', vol: 'Vol. 39, No. 3', cover: imgCvrMJ25, href: '/naval-history/may-jun-2025' },
  { month: 'Mar/Apr 2025', vol: 'Vol. 39, No. 2', cover: imgCvrMA25, href: '/naval-history/mar-apr-2025' },
]
