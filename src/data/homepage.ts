import type { Article, NavItem, PlainCardData } from '@/types'
import img250YearCelebration from '@/assets/images/250-year-celebration.png'
import imgGrubbHero from '@/assets/images/proceedings-articles/grubb/crash-onboard.jpg'
import imgMitscherHero from '@/assets/images/naval-history-articles/Russell-NH-5-26-1 Hero.jpg'
import imgAIWarfighting from '@/assets/images/books/ai-warfighting.jpg'
import imgOurHistory from '@/assets/images/our-histroy-feature-image.png'
import imgGivingHero from '@/assets/images/demo-hero/giving-hero-feature.png'

import imgNewsRoosevelt from '@/assets/images/usni-news-theodore-roosevelt-singapore.jpg'
import imgNewsOkinawa from '@/assets/images/usni-news-okinawa-curfew.jpg'
import imgNewsPulse from '@/assets/images/usni-news-western-pacific-pulse.jpg'
import imgNewsNampho from '@/assets/images/usni-news-nampho-shipyard.jpg'
import imgNewsUsmcFlag from '@/assets/images/usni-news-usmc-flag.svg'

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
  { label: 'About the Archives', href: '/archives' },
  { label: 'Oral Histories', href: '/archives/oral-histories' },
  { label: 'Memoirs', href: '/archives/memoirs' },
  { label: 'Photos', href: 'https://photos.usni.org', external: true },
  { label: 'Research Requests', href: '/archives/research-requests' },
]

export const navItems: NavItem[] = [
  {
    label: 'Membership',
    href: '/membership',
    children: [
      { label: 'Overview', href: '/membership' },
      { label: 'Plans & Pricing', href: '/membership/join' },
      { label: 'Renew', href: '/login' },
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
      { label: 'Current Issue', href: '/proceedings/apr-2026' },
      { label: 'All Issues', href: '/proceedings/all-issues' },
      { label: 'Proceedings Podcast', href: '/proceedings/podcast' },
      { label: 'Essay Contests', href: '/essay-contests' },
      { label: 'American Sea Power Project', href: '/proceedings/sea-power-project' },
      { label: 'Submission Guidelines', href: '/proceedings/submit' },
      { label: 'Proceedings Editorial Staff', href: '/about/editorial-staff?magazine=proceedings' },
      { label: 'Get Proceedings', href: '/membership/join' },
    ],
    megaCta: {
      eyebrow: 'Featured Article',
      headline: 'Get Real about How Naval Aviation Got Better',
      body: "Safety doesn't come from magic bullets, but from organizational learning.",
      ctaLabel: 'Read the Article',
      ctaHref: '/proceedings/naval-aviation-got-better',
      image: imgGrubbHero,
      imageAlt: 'Get Real about How Naval Aviation Got Better — Proceedings July 2026',
    },
  },
  {
    label: 'Naval History',
    href: '/naval-history',
    children: [
      { label: 'Browse Naval History', href: '/naval-history' },
      { label: 'Current Issue', href: '/naval-history/aug-2026' },
      { label: 'All Issues', href: '/naval-history/all-issues' },
      { label: 'Essay Contests', href: '/essay-contests' },
      { label: 'Submission Guidelines', href: '/naval-history/submit' },
      { label: 'Naval History Editorial Staff', href: '/about/editorial-staff?magazine=naval-history' },
      { label: 'Subscribe', href: '/naval-history/subscribe' },
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
      { label: 'Professional Military Education', href: '/books/professional-military-education' },
      { label: 'Military Reading Lists', href: '/books/military-reading-lists' },
      { label: 'Oral Histories', href: '/archives/oral-histories' },
      { label: 'Digital Editions', href: '/books/digital-editions' },
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
      { label: 'History', href: '/about/history' },
      { label: 'Strategic Plan', href: '/about/strategic-plan' },
      { label: 'State of the Institute', href: '/about/state-of-the-institute' },
      { label: 'Leadership', href: '/about/leadership' },
      { label: 'Editorial Staff', href: '/about/editorial-staff' },
      { label: 'Advertise With Us', href: '/advertise' },
      { label: 'Contact USNI', href: '/contact' },
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
      // Ways to Give is a section of the Giving landing page in the redesign.
      { label: 'Ways to Give', href: '/giving#ways-to-give' },
      { label: 'Giving Opportunities', href: '/giving/opportunities' },
      { label: 'Leadership & Staff', href: '/about/leadership#foundation-trustees' },
      { label: 'Donor Recognition', href: '/giving/donor-recognition' },
      { label: 'Corporate Partners', href: '/giving/corporate' },
      // The Center's page in Giving is archived; this goes to its own site.
      {
        label: 'Jack C. Taylor Conference Center',
        href: 'https://www.jackctaylorconferencecenter.org/',
        external: true,
      },
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

/**
 * The homepage's USNI News grid: the five latest stories from
 * https://news.usni.org/latest (captured 6 November 2026). USNI News is its
 * own WordPress site, so each card links to the story there.
 *
 * Order is the grid's: the lead story (the newest) runs large in the center,
 * then two on the left and two on the right, newest first. The category is
 * the story's most specific USNI News category, not the catch-all "News &
 * Analysis". Alt text is written from each photo's caption.
 */
export const latestNewsArticles: Article[] = [
  {
    id: 'n1',
    category: 'U.S. Marine Corps',
    headline: 'III MEF Extends Curfew for Junior Members in Okinawa Following Murder Indictment',
    date: 'November 6, 2026 2:10 PM',
    image: imgNewsOkinawa,
    imageAlt: 'U.S. service members and Okinawa police officers on a joint patrol along Koza Gate Street in Okinawa City.',
    href: 'https://news.usni.org/2026/11/06/iii-mef-extends-curfew-for-junior-members-in-okinawa-following-murder-indictment',
  },
  {
    id: 'n2',
    category: 'Western Pacific Pulse',
    headline: 'USNI News Western Pacific Pulse: Nov. 6, 2026',
    date: 'November 6, 2026 1:35 PM',
    image: imgNewsPulse,
    imageAlt: 'Map of the Western Pacific from Japan to Singapore, with colored markers showing where naval forces are operating.',
    href: 'https://news.usni.org/2026/11/06/usni-news-western-pacific-pulse-nov-6-2026',
  },
  {
    id: 'n3',
    category: 'U.S. Navy',
    headline: 'Theodore Roosevelt Carrier Strike Group Pulls Into Singapore',
    date: 'November 6, 2026 9:04 AM',
    image: imgNewsRoosevelt,
    imageAlt: 'The aircraft carrier USS Theodore Roosevelt (CVN-71) under way in the Pacific Ocean.',
    href: 'https://news.usni.org/2026/11/06/theodore-roosevelt-carrier-strike-group-pulls-into-singapore',
  },
  {
    id: 'n4',
    category: 'Foreign Forces',
    headline: 'North Korean Leader Inspects New Warship Under Construction at Nampho Shipyard',
    date: 'November 5, 2026 5:02 PM',
    image: imgNewsNampho,
    imageAlt: 'North Korean leader Kim Jong Un inspects a new warship at Nampho Shipyard.',
    href: 'https://news.usni.org/2026/11/05/north-korean-leader-inspects-new-warship-under-construction-at-nampho-shipyard',
  },
  {
    id: 'n5',
    category: 'U.S. Marine Corps',
    headline: 'Marines Identify Member Who Died After Fast-rope Training in Japan',
    date: 'November 5, 2026 2:52 PM',
    image: imgNewsUsmcFlag,
    imageAlt: 'The flag of the U.S. Marine Corps.',
    href: 'https://news.usni.org/2026/11/05/marines-identify-member-who-died-after-fast-rope-training-in-japan',
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
