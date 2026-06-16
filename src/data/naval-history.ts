import type { Article } from '@/types'

import imgOnOurScope    from '@/assets/images/nh-on-our-scope.png'
import imgShipwrecks    from '@/assets/images/nh-holy-grail-shipwrecks.png'
import imgArizona       from '@/assets/images/nh-uss-arizona.png'
import imgClashFleets   from '@/assets/images/nh-clash-fleets-south-china-sea.png'

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
    category: 'Naval History News',
    headline: "Recovery of the 'Holy Grail of Shipwrecks' Begins amid Decades-Long Legal Battle",
    excerpt: 'After years of litigation over the rights to its contents, crews have finally begun work to salvage the legendary vessel.',
    date: 'April 2026',
    image: imgShipwrecks,
    imageAlt: 'Historic naval battle painting of tall ships',
    href: '/naval-history/holy-grail-shipwrecks',
  },
  {
    id: 'nh-f2',
    category: 'Naval History News',
    headline: 'More Than 100 Tons of Concrete Removed from the USS Arizona',
    excerpt: 'Preservation work at the Pearl Harbor memorial enters a new phase as crews clear decades of accretion from the iconic wreck.',
    date: 'April 2026',
    image: imgArizona,
    imageAlt: 'Workers removing concrete from the USS Arizona memorial',
    href: '/naval-history/uss-arizona-concrete',
  },
]

export const featuredArticleCenter: Article = {
  id: 'nh-f3',
  category: 'Classic Sea Fights',
  headline: 'Clash of Fleets in the South China Sea',
  excerpt: 'A historical analysis of great naval encounters that shaped control of the Indo-Pacific, with lessons that resonate for today\'s maritime strategists.',
  date: 'April 2026',
  author: 'Cadet Brandon H. Tran, U.S. Military Academy',
  image: imgClashFleets,
  imageAlt: 'Naval battle painting in the South China Sea',
  href: '/naval-history/clash-fleets-south-china-sea',
}

export const featuredArticlesRight: Article[] = [
  {
    id: 'nh-f4',
    category: 'On Our Scope',
    headline: 'On Our Scope',
    excerpt: 'The editors of Naval History reflect on the stories and themes shaping this issue, from forgotten battles to emerging scholarship.',
    date: 'April 2026',
    image: imgOnOurScope,
    imageAlt: 'Naval officer looking through binoculars on a ship',
    href: '/naval-history/on-our-scope',
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
