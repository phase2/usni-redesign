import type { Article, NavItem, PlainCardData } from '@/types'
import img250YearCelebration from '@/assets/images/250-year-celebration.png'
import imgFortifyingHero from '@/assets/images/Nelson-PRO-4-26-Hero.jpg'
import imgMitscherHero from '@/assets/images/naval-history-articles/Russell-NH-5-26-1 Hero.jpg'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'
import imgOurHistory from '@/assets/images/our-histroy-feature-image.png'
import imgGivingHero from '@/assets/images/demo-hero/giving-hero-feature.png'

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
      headline: 'Celebrate 250 Years of American Valor',
      body: 'Join the U.S. Naval Institute at 25% off and connect with the community that has championed sea power since 1873.',
      ctaLabel: 'Join Today',
      ctaHref: '/membership/join',
      image: img250YearCelebration,
      imageAlt: '250th Anniversary of American Independence celebration',
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
      eyebrow: 'Featured Article',
      headline: 'Fortifying the Digital Watch',
      body: 'As adversaries target naval networks before the first shot is fired, fleet cyber readiness demands the same rigor as engineering and damage control.',
      ctaLabel: 'Read the Article',
      ctaHref: '/proceedings/fortifying-digital-watch',
      image: imgFortifyingHero,
      imageAlt: 'Fortifying the Digital Watch — Proceedings April 2026',
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
      eyebrow: 'Featured Article',
      headline: 'Mitscher at Midway',
      body: 'Sixty years of scholarship has yielded no consensus on whether Captain Marc Mitscher\'s decisions aboard USS Hornet determined — or cost — America\'s greatest naval victory.',
      ctaLabel: 'Read the Article',
      ctaHref: '/naval-history/mitscher-at-midway',
      image: imgMitscherHero,
      imageAlt: 'Mitscher at Midway — Naval History Magazine',
    },
  },
  {
    label: 'Books & Press',
    href: '/books',
    alignRight: true,
    children: [
      { label: 'Books', href: '/books/collection' },
      { label: 'New Releases', href: '/books/new-releases' },
      { label: 'Author Events', href: '/books/author-events' },
      { label: 'Professional Military Education', href: '/books/pme' },
      { label: 'Oral Histories', href: '/archive/oral-histories' },
      { label: 'About the Press', href: '/books/about' },
      { label: 'Contact the Press', href: '/books/contact' },
    ],
    megaCta: {
      eyebrow: 'Featured New Release',
      headline: 'AI Warfighting',
      body: 'A timely collection exploring how artificial intelligence is reshaping naval tactics, fleet operations, and the future of maritime conflict.',
      ctaLabel: 'View Book',
      ctaHref: '/books/ai-warfighting',
      image: imgAIWarfighting,
      imageAlt: 'AI Warfighting — Naval Institute Press',
      imageLayout: 'side',
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
      ctaLabel: 'Discover our story',
      ctaHref: '/about',
      image: imgOurHistory,
      imageAlt: 'Our History — U.S. Naval Institute',
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
      image: imgGivingHero,
      imageAlt: 'Support the Naval Institute Foundation',
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
    category: 'Industry',
    headline: 'Amphibs Bougainville, Fallujah Deliveries Are Pushed Another Year',
    date: 'April 27, 2026 5:38 PM',
    image: imgAmphibsBougainville,
    imageAlt: 'USS Bougainville amphibious assault ship under construction',
    href: '/news/uss-bougainville-construction',
  },
  {
    id: '2',
    category: 'Industry',
    headline: 'Amphib USS San Antonio Returns from Southern Command After More Than 8-month Deployment',
    date: 'April 28, 2026 6:28 PM',
    image: imgAmphibSanAntonio,
    imageAlt: 'Sailors aboard USS San Antonio',
    href: '/news/san-antonio-pacific-exercise',
  },
  {
    id: '3',
    category: 'China',
    headline: 'U.S. Missiles Deploy Near Taiwan During Balikatan Exercise, Chinese Action Group Operates Nearby',
    date: 'April 28, 2026 12:19 PM',
    image: imgArticleFeatureCenter,
    imageAlt: 'HIMARS missile system deployed near C-130',
    href: '/news/taiwan-balikatan-exercise',
  },
  {
    id: 'mp1',
    category: 'Industry',
    headline: 'Program Has Helped Train 700 RNs for Life in the ER Fast Lane',
    date: 'April 24, 2026 6:02 PM',
    image: imgProgramTrain700,
    imageAlt: 'Ship launch ceremony',
    href: '/news/navy-program-train-700-sailors',
  },
  {
    id: 'mp2',
    category: 'Aviation',
    headline: 'Carrier USS George H.W. Bush Now in U.S. Central Command After Traveling Around Africa',
    date: 'April 23, 2026 6:11 PM',
    image: imgCarrierGeorge,
    imageAlt: 'F/A-18 launching from USS George Washington',
    href: '/news/george-washington-deployment',
  },
  {
    id: 'mp3',
    category: 'Foreign Forces',
    headline: "Middle East Shipping 'Paralyzed' by Dueling U.S., Iranian Blockades, Analysts Say",
    date: 'March 3, 2026',
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
