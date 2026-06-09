import type { Article } from '@/types'

import imgHallmarkRussia from '@/assets/images/proceedings-hallmark-russia.png'
import imgMaritimeDominance from '@/assets/images/proceedings-maritime-dominance.png'
import imgCyberThreats from '@/assets/images/proceedings-confronting-cyber-threats.png'
import imgWhatChina from '@/assets/images/proceedings-what-china-can-learn.png'
import imgDigitalWatch from '@/assets/images/proceedings-fortifying-digital-watch.png'
import imgShattering from '@/assets/images/proceedings-shattering-lodgement-standoff.png'
import imgNeptune from '@/assets/images/proceedings-sharpening-neptune.png'
import imgPrepareMarineCorps from '@/assets/images/proceedings-prepare-marine-corps.png'
import imgFloridaFlotilla from '@/assets/images/proceedings-The Florida Flotilla Affair.png'
import imgIranHormuz from '@/assets/images/proceedings - A Deal that Allows Iran Any Control of the Strait of Hormuz Is a Terrible Idea.png'
import imgIranianIslands from '@/assets/images/proceedings - Seizing Iranian Offshore Islands- High Risk, Low Payoff.png'
import imgSupplyChains from '@/assets/images/procedings - The Navy Must Build Resilient Supply Chains Now.png'
import imgShipbuilding from '@/assets/images/proceedings - Three Shipbuilding Failures and a Future.png'
import imgOldBooks from '@/assets/images/proceedings - Old Books Bring Forth New Ideas.png'
import imgThreeMEFs from "@/assets/images/Three MEFs Wont Be Enough.png"
import imgAprCover from '@/assets/images/proceedings-magazine-april-cover.png'
import imgMarCover from '@/assets/images/proceedings-magazine-march-cover.png'
import imgFebCover from '@/assets/images/proceedings-magazine-feb-cover.png'
import imgJanCover from '@/assets/images/proceedings-magazine-jan26-cover.png'
import imgDecCover from '@/assets/images/proceedings-magazine-dec25-cover.png'
import imgNovCover from '@/assets/images/proceedings-magazine-nov25-cover.png'
import imgOctCover from '@/assets/images/proceedings-magazine-oct25-cover.png'
import imgSeptCover from '@/assets/images/proceedings-magazine-sept25-cover.png'

// Featured articles for the top news grid (April 2026)
export const featuredArticlesLeft: Article[] = [
  {
    id: 'pa1',
    category: 'Featured Article',
    headline: 'Fortifying the Digital Watch',
    date: 'April 2026',
    author: 'Multiple Authors',
    image: imgDigitalWatch,
    href: '/proceedings/fortifying-digital-watch',
  },
  {
    id: 'pa2',
    category: 'Featured Article',
    headline: "Shattering the Lodgment: Standoff Area-Effect Fires for Taiwan's Defense",
    date: 'April 2026',
    author: 'Captain Zane Tremmel, U.S. Marine Corps',
    image: imgShattering,
    href: '/proceedings/shattering-lodgment',
  },
]

export const featuredArticleCenter: Article = {
  id: 'pa3',
  category: 'Featured Article',
  headline: "Three MEFs Won't Be Enough",
  date: 'April 2026',
  author: 'Corporal Richard Sweeney III, U.S. Marine Corps Reserve',
  image: imgThreeMEFs,
  href: '/proceedings/three-mefs',

}

export const featuredArticlesRight: Article[] = [
  {
    id: 'pa4',
    category: 'Featured Article',
    headline: "Sharpening Neptune's Trident: How the Navy Can Navigate the Fourth Industrial Revolution",
    date: 'April 2026',
    author: 'Multiple Authors',
    image: imgNeptune,
    href: '/proceedings/neptunes-trident',
  },
  {
    id: 'pa5',
    category: 'Featured Article',
    headline: 'Prepare the Marine Corps for a Protracted War',
    date: 'April 2026',
    image: imgPrepareMarineCorps,
    href: '/proceedings/prepare-marine-corps',
  },
]

// Latest issue (April 2026) articles — left column
export const latestIssueCol1: Article[] = [
  {
    id: 'li1',
    category: 'Article',
    headline: "The Hallmarks of Russia's Hybrid War",
    date: 'April 2026',
    author: 'Sean Wiswesser',
    image: imgHallmarkRussia,
    href: '/proceedings/hallmarks-russia-hybrid-war',
  },
  {
    id: 'li2',
    category: 'Article',
    headline: 'Maritime Dominance Must Include the U.S. Coast Guard',
    date: 'April 2026',
    author: 'Bruce Stubbs',
    image: imgMaritimeDominance,
    href: '/proceedings/maritime-dominance-coast-guard',
  },
  {
    id: 'li3',
    category: 'Featured Article',
    headline: 'The Florida Flotilla Affair: A Skirmish in the Information War',
    date: 'April 2026',
    image: imgFloridaFlotilla,
    href: '/proceedings/florida-flotilla-affair',
  },
  {
    id: 'li4',
    category: 'Commentary',
    headline: 'A Deal that Allows Iran Any Control of the Strait of Hormuz Is a Terrible Idea',
    date: 'April 2026',
    author: 'Captain Matt Dolan, U.S. Navy (Retired)',
    image: imgIranHormuz,
    href: '/proceedings/iran-strait-hormuz',
  },
  {
    id: 'li5',
    category: 'Commentary',
    headline: 'Seizing Iranian Offshore Islands: High Risk, Low Payoff',
    date: 'April 2026',
    author: 'Brandon Carr',
    image: imgIranianIslands,
    href: '/proceedings/iranian-offshore-islands',
  },
]

// Latest issue (April 2026) articles — right column
export const latestIssueCol2: Article[] = [
  {
    id: 'li6',
    category: 'Article',
    headline: 'Confronting Cyber Threats to Defend the Homeland',
    date: 'April 2026',
    author: 'Major Sharon Rollins, U.S. Marine Corps',
    image: imgCyberThreats,
    href: '/proceedings/confronting-cyber-threats',
  },
  {
    id: 'li7',
    category: 'Article',
    headline: "What China Can Learn from Washington's Caribbean Model",
    date: 'April 2026',
    author: 'Lieutenant P. J. Greenbaum, U.S. Navy',
    image: imgWhatChina,
    href: '/proceedings/china-caribbean-model',
  },
  {
    id: 'li8',
    category: 'Featured Article',
    headline: 'The Navy Must Build Resilient Supply Chains Now',
    date: 'April 2026',
    author: 'Vice Admiral John G. Morgan, Jr. U.S. Navy (Retired)',
    image: imgSupplyChains,
    href: '/proceedings/resilient-supply-chains',
  },
  {
    id: 'li9',
    category: 'Featured Article',
    headline: 'Three Shipbuilding Failures and a Future',
    date: 'April 2026',
    author: 'Captain Kevin Eyer, U.S. Navy (Retired)',
    image: imgShipbuilding,
    href: '/proceedings/shipbuilding-failures',
  },
  {
    id: 'li10',
    category: 'Featured Article',
    headline: 'Old Books Bring Forth New Ideas',
    date: 'April 2026',
    author: 'Major Michael Hanson, U.S. Marine Corps',
    image: imgOldBooks,
    href: '/proceedings/old-books-new-ideas',
  },
]

export interface MagazineIssue {
  month: string
  vol: string
  cover: string
  href: string
}

export const magazineIssues: MagazineIssue[] = [
  { month: 'April 2026', vol: 'Vol. 152/4/1,478', cover: imgAprCover, href: '/proceedings/apr-2026' },
  { month: 'March 2026', vol: 'Vol. 152/3/1,477', cover: imgMarCover, href: '/proceedings/mar-2026' },
  { month: 'February 2026', vol: 'Vol. 152/2/1,476', cover: imgFebCover, href: '/proceedings/feb-2026' },
  { month: 'January 2026', vol: 'Vol. 152/1/1,475', cover: imgJanCover, href: '/proceedings/jan-2026' },
  { month: 'December 2025', vol: 'Vol. 151/12/1,474', cover: imgDecCover, href: '/proceedings/dec-2025' },
  { month: 'November 2025', vol: 'Vol. 151/11/1,473', cover: imgNovCover, href: '/proceedings/nov-2025' },
  { month: 'October 2025', vol: 'Vol. 151/10/1,472', cover: imgOctCover, href: '/proceedings/oct-2025' },
  { month: 'September 2025', vol: 'Vol. 151/9/1,471', cover: imgSeptCover, href: '/proceedings/sep-2025' },
]
