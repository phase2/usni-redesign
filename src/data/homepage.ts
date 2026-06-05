import type { Article, NavItem, PlainCardData } from '@/types'

import imgCarrierGeorge from '@/assets/images/usni-news-Carrier-USS-George.png'
import imgAmphibSanAntonio from '@/assets/images/usni-news-Amphib-USS-San-Antonio.png'
import imgArticleFeatureCenter from '@/assets/images/usni-news-article-feature-center.png'
import imgMiddleEastShipping from '@/assets/images/usni-news-Middle-East-Shipping.png'
import imgAmphibsBougainville from '@/assets/images/usni-news-amphibs-bougainville.png'
import imgProgramTrain700 from '@/assets/images/usni-news-Program-Has-Helped-Train-700.png'

// Proceedings
import imgProceedingsCover from '@/assets/images/proceedings-cover-april26.png'
import imgProcHallmarkRussia from '@/assets/images/proceedings-hallmark-russia.png'
import imgProcMaritimeDominance from '@/assets/images/proceedings-maritime-dominance.png'
import imgProcConfrontingCyber from '@/assets/images/proceedings-confronting-cyber-threats.png'
import imgProcWhatChina from '@/assets/images/proceedings-what-china-can-learn.png'

// Naval History
import imgNHCover from '@/assets/images/naval-history-magazine-april26.png'
import imgNHOnOurScope from '@/assets/images/nh-on-our-scope.png'
import imgNHShipwrecks from '@/assets/images/nh-holy-grail-shipwrecks.png'
import imgNHArizona from '@/assets/images/nh-uss-arizona.png'
import imgNHClashFleets from '@/assets/images/nh-clash-fleets-south-china-sea.png'

export const archivesDropdown: NavItem[] = [
  { label: 'Oral Histories', href: '/archive/oral-histories' },
  { label: 'Memoirs', href: '/archive/memoirs' },
  { label: 'Photos', href: '/archive/photos' },
  { label: 'Contact the Archives', href: '/archive/contact' },
]

export const navItems: NavItem[] = [
  {
    label: 'Membership',
    href: '/membership',
    children: [
      { label: 'Overview', href: '/membership' },
      { label: 'Plans & Pricing', href: '/membership/join' },
      { label: 'Renew', href: '/membership/renew' },
      { label: 'Contact Member Services', href: '/membership/contact' },
      { label: 'Join', href: '/membership/join' },
    ],
    megaCta: {
      headline: 'Join the U.S. Naval Institute',
      body: 'Engage in a community of concerned citizens that care about national defense and global security.',
      ctaLabel: 'Become a member today',
      ctaHref: '/membership/join',
    },
  },
  { label: 'USNI News', href: '/news' },
  {
    label: 'Proceedings',
    href: '/proceedings',
    children: [
      { label: 'Browse Proceedings', href: '/proceedings' },
      { label: 'Current Issue', href: '/proceedings/current' },
      { label: 'All Issues', href: '/proceedings/all-issues' },
      { label: 'Proceedings Podcast', href: '/proceedings/podcast' },
      { label: 'Essay Contests', href: '/essay-contests' },
      { label: 'American Sea Power Project', href: '/proceedings/sea-power-project' },
      { label: 'Submission Guidelines', href: '/proceedings/submissions' },
      { label: 'Contact Proceedings', href: '/proceedings/contact' },
      { label: 'Subscribe', href: '/membership/join' },
    ],
    megaCta: {
      headline: 'Read Proceedings Magazine',
      body: 'The flagship journal of the U.S. Naval Institute since 1874 — the leading forum for debate on maritime strategy and naval affairs.',
      ctaLabel: 'Subscribe today',
      ctaHref: '/membership/join',
    },
  },
  {
    label: 'Naval History',
    href: '/naval-history',
    children: [
      { label: 'Browse Naval History', href: '/naval-history' },
      { label: 'Current Issue', href: '/naval-history/current' },
      { label: 'All Issues', href: '/naval-history/all-issues' },
      { label: 'Essay Contests', href: '/essay-contests' },
      { label: 'Submission Guidelines', href: '/naval-history/submissions' },
      { label: 'Contact Naval History', href: '/naval-history/contact' },
      { label: 'Subscribe', href: '/membership/join' },
    ],
    megaCta: {
      headline: 'Explore Naval History Magazine',
      body: 'Connecting the remarkable stories of the U.S. Navy\'s past to present challenges in maritime affairs.',
      ctaLabel: 'Subscribe today',
      ctaHref: '/membership/join',
    },
  },
  {
    label: 'Books & Press',
    href: '/books',
    alignRight: true,
    children: [
      { label: 'Books', href: '/books' },
      { label: 'New Releases', href: '/books/new-releases' },
      { label: 'Author Events', href: '/books/author-events' },
      { label: 'Professional Military Education', href: '/books/pme' },
      { label: 'Oral Histories', href: '/archive/oral-histories' },
      { label: 'About the Press', href: '/books/about' },
      { label: 'Contact the Press', href: '/books/contact' },
    ],
    megaCta: {
      headline: 'Discover Naval Institute Press',
      body: 'Over 1,000 titles in naval history, strategy, technology, and memoir. The foremost publisher of naval literature.',
      ctaLabel: 'Browse all books',
      ctaHref: '/books',
    },
  },
  {
    label: 'About',
    href: '/about',
    alignRight: true,
    children: [
      { label: 'Overview', href: '/about' },
      { label: 'Mission & Vision', href: '/about/mission' },
      { label: 'History', href: '/about/history' },
      { label: 'Strategic Plan', href: '/about/strategic-plan' },
      { label: 'State of the Institution', href: '/about/state-of-institution' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Taylor Conference Center', href: '/about/taylor-conference-center' },
      { label: 'Media Inquiries', href: '/about/media' },
      { label: 'Contact USNI', href: '/about/contact' },
    ],
    megaCta: {
      headline: '150+ Years of Independent Thought',
      body: 'The Naval Institute has served as the open forum for those who dare to think seriously about sea power since 1873.',
      ctaLabel: 'Our story',
      ctaHref: '/about',
    },
  },
  {
    label: 'Giving',
    href: '/giving',
    alignRight: true,
    children: [
      { label: 'Overview', href: '/giving' },
      { label: 'About the Naval Institute Foundation', href: '/giving/foundation' },
      { label: 'Ways to Give', href: '/giving/ways-to-give' },
      { label: 'Giving Opportunities', href: '/giving/opportunities' },
      { label: 'Leadership & Staff', href: '/giving/leadership' },
      { label: 'Recognition Societies', href: '/giving/recognition' },
      { label: 'Corporate', href: '/giving/corporate' },
      { label: 'Contact the Foundation', href: '/giving/contact' },
      { label: 'Donate Today', href: '/giving/donate' },
    ],
    megaCta: {
      headline: 'Support the Open Forum',
      body: 'Your gift helps fund independent naval debate, preserve maritime heritage, and educate the next generation of naval professionals.',
      ctaLabel: 'Donate today',
      ctaHref: '/giving/donate',
    },
  },
]

export const navInstituteAtWorkCards: PlainCardData[] = [
  {
    headline: 'Proceedings & Naval History',
    body: 'Our flagship journals, published since 1874. Analysis, history, and debate from leading naval thinkers.',
    cta: 'Explore Publications',
    href: '/proceedings',
  },
  {
    headline: 'Daily Breaking News',
    body: 'The latest news, analysis, and photography covering the U.S. military and global defense from USNI News.',
    cta: 'Visit USNI News',
    href: '/news',
  },
  {
    headline: 'Naval Institute Press',
    body: 'Over 1,000 titles in naval history, strategy, technology, and memoirs. The foremost naval publisher.',
    cta: 'Browse Books',
    href: '/books',
  },
  {
    headline: 'Conferences & Events',
    body: 'WEST, SNA, and other premier forums where naval professionals convene and debate strategy.',
    cta: 'View Events',
    href: '/events',
  },
]

export const latestNewsArticles: Article[] = [
  {
    id: '1',
    category: 'USNI News',
    headline: 'USS Bougainville (LHA 8) Nears Completion at Huntington Ingalls Shipyard',
    date: 'April 28, 2025',
    image: imgAmphibsBougainville,
    imageAlt: 'USS Bougainville amphibious assault ship under construction',
    href: '/news/uss-bougainville-construction',
  },
  {
    id: '2',
    category: 'USNI News',
    headline: 'USS San Antonio (LPD 17) Amphibious Ready Group Completes Exercise in Pacific',
    date: 'April 26, 2025',
    image: imgAmphibSanAntonio,
    imageAlt: 'Sailors aboard USS San Antonio',
    href: '/news/san-antonio-pacific-exercise',
  },
  {
    id: '3',
    category: 'USNI News',
    headline: 'U.S. Missiles Deploy Near Taiwan During Balikatan Exercise, Chinese Action Group Operates Nearby',
    date: 'April 22, 2025',
    image: imgArticleFeatureCenter,
    imageAlt: 'HIMARS missile system deployed near C-130',
    href: '/news/taiwan-balikatan-exercise',
  },
  {
    id: 'mp1',
    category: 'USNI News',
    headline: 'Navy Program Has Helped Train 700 Partner Nation Sailors in Indo-Pacific',
    date: 'April 23, 2025',
    image: imgProgramTrain700,
    imageAlt: 'Ship launch ceremony',
    href: '/news/navy-program-train-700-sailors',
  },
  {
    id: 'mp2',
    category: 'USNI News',
    headline: 'USS George Washington (CVN 73) Carrier Strike Group Departs for Scheduled Deployment',
    date: 'April 24, 2025',
    image: imgCarrierGeorge,
    imageAlt: 'F/A-18 launching from USS George Washington',
    href: '/news/george-washington-deployment',
  },
  {
    id: 'mp3',
    category: 'USNI News',
    headline: 'Middle East Shipping Lanes Remain Under Threat as Houthi Attacks Continue',
    date: 'April 25, 2025',
    image: imgMiddleEastShipping,
    imageAlt: 'Container ship in Middle East shipping lane',
    href: '/news/middle-east-shipping-threat',
  },
  {
    id: 'mp4',
    category: 'USNI News',
    headline: 'Pentagon Budget Cuts Raise Questions About Pacific Readiness',
    date: 'April 21, 2025',
    href: '/news/pentagon-budget-pacific',
  },
]

export const proceedingsArticles: Article[] = [
  {
    id: 'p1',
    category: 'Article Tag',
    headline: "The Hallmarks of Russia's Hybrid War",
    date: 'April 2026',
    author: 'Sean Wiswesser',
    image: imgProcHallmarkRussia,
    imageAlt: "Senior officials at a conference on Russia's hybrid warfare",
    href: '/proceedings/hallmarks-russia-hybrid-war',
  },
  {
    id: 'p2',
    category: 'Article Tag',
    headline: 'Maritime Dominance Must Include the U.S. Coast Guard',
    date: 'April 2026',
    author: 'Bruce Stubbs',
    image: imgProcMaritimeDominance,
    imageAlt: 'U.S. Coast Guard cutter operating with Navy vessels',
    href: '/proceedings/maritime-dominance-coast-guard',
  },
  {
    id: 'p3',
    category: 'Article Tag',
    headline: 'Confronting Cyber Threats to Defend the Homeland',
    date: 'April 2026',
    author: 'Major Sharon Rollins, U.S. Marine Corps',
    image: imgProcConfrontingCyber,
    imageAlt: 'Military cyber operator at a command console',
    href: '/proceedings/confronting-cyber-threats',
  },
  {
    id: 'p4',
    category: 'Article Tag',
    headline: "What China Can Learn from Washington's Caribbean Model",
    date: 'April 2026',
    author: 'Lt. P. J. Greenbaum, U.S. Navy',
    image: imgProcWhatChina,
    imageAlt: 'Amphibious forces operating in the Caribbean',
    href: '/proceedings/china-caribbean-model',
  },
]

export const proceedingsCoverImage = imgProceedingsCover

export const navalHistoryArticles: Article[] = [
  {
    id: 'nh1',
    category: 'On Our Scope',
    headline: 'On Our Scope',
    date: 'April 2026',
    image: imgNHOnOurScope,
    imageAlt: 'Naval officer looking through binoculars on a ship',
    href: '/naval-history/on-our-scope',
  },
  {
    id: 'nh2',
    category: 'Naval History News',
    headline: "Recovery of the 'Holy Grail of Shipwrecks' Begins amid Decades-Long Legal Battle",
    date: 'April 2026',
    image: imgNHShipwrecks,
    imageAlt: 'Historic naval battle painting of tall ships',
    href: '/naval-history/holy-grail-shipwrecks',
  },
  {
    id: 'nh3',
    category: 'Naval History News',
    headline: 'More Than 100 Tons of Concrete Removed from the USS Arizona',
    date: 'April 2026',
    image: imgNHArizona,
    imageAlt: 'Workers removing concrete from the USS Arizona memorial',
    href: '/naval-history/uss-arizona-concrete',
  },
  {
    id: 'nh4',
    category: 'Classic Sea Fights',
    headline: 'Clash of Fleets in the South China Sea',
    date: 'April 2026',
    author: 'Cadet Brandon H. Tran, U.S. Military Academy',
    image: imgNHClashFleets,
    imageAlt: 'Naval battle painting in the South China Sea',
    href: '/naval-history/clash-fleets-south-china-sea',
  },
]

export const navalHistoryCoverImage = imgNHCover
