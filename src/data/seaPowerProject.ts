/**
 * The American Sea Power Project — the Naval Institute's multi-year thought
 * leadership series in Proceedings.
 *
 * Transcribed from /american-sea-power-project on the live Drupal site
 * (test-usni3.pantheonsite.io, captured 10 September 2026): the hero copy, the
 * three phase introductions, all 49 phase articles, the two video blocks, the
 * editors' additional-reading picks, and the five recommended Press titles.
 *
 * `href` on each article is the live-site path it points at today. The
 * prototype has no page for any of them, so these behave the way the essay
 * contest archive's teasers do — the record keeps its real target for whoever
 * wires the routes up later, rather than inventing a stand-in.
 *
 * `image` is a filename in `assets/images/sea-power-project/`, resolved through
 * the glob in `seaPowerImage()` rather than 57 individual imports — the same
 * arrangement `essayArchive.ts` uses. The folder holds nothing but this page's
 * art, so bundling all of it is exactly what we want.
 *
 * The five book covers are NOT here: they live in `assets/images/books/series/`
 * named by product slug, so `CollectionTitleCard` finds them through the
 * existing `collectionCover()` lookup and this page reuses the Books & Press
 * bibliography grid unchanged.
 */

import type { Article } from '@/types'
import { UNAVAILABLE, type CollectionTitle } from '@/data/bookCollections'

/** An `Article` whose `image` is a filename to resolve, not a bundled URL. */
export type SeaPowerArticle = Omit<Article, 'image'> & { image?: string }

const images = import.meta.glob('../assets/images/sea-power-project/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** Resolve an entry's `image` filename to a bundled asset URL. */
export function seaPowerImage(name?: string): string | undefined {
  if (!name) return undefined
  return images[`../assets/images/sea-power-project/${name}`]
}

/** Article records with their art already resolved, ready for a card. */
export function withImages(articles: SeaPowerArticle[]): Article[] {
  return articles.map((a) => ({ ...a, image: seaPowerImage(a.image) }))
}

/* ── Hero ───────────────────────────────────────────────────────────────────── */

export const seaPowerHero = {
  eyebrow: 'Proceedings',
  title: 'The American Sea Power Project',
  description:
    'The Naval Institute American Sea Power Project hopes to inform strategy, planning, and procurement within the Sea Services and the government and build public support for the continued role of maritime power for the United States.',
}

export const seaPowerIntro = {
  title: 'The American Sea Power Project Series',
  body: 'The end of the Cold War brought an end to the urgent need for in-depth thinking about maritime strategy. During the past three decades, naval planning and force structure were guided more by budgets, technology, and land operations than by any meaningful maritime strategy. With the return of great power competition, however, there is a need to get back to strategic thinking about what it means for the United States to be a maritime nation and how naval power underpins national power. The American Sea Power Project embodies Naval Institute thought leadership on these vital topics. A number of noted experts have committed to writing for the project, and we hope it will stir a vital debate within the Sea Services and among political leaders, and arouse a new national understanding of the importance of naval power to national security.',
}

/* ── Section introductions ──────────────────────────────────────────────────── */

export const phaseOneIntro = {
  title: 'Phase I Articles from Proceedings',
  description: 'Phase I of the American Sea Power Project focuses on the "ends" of strategy.',
}

export const phaseTwoIntro = {
  title: 'Phase II Articles from Proceedings',
  description: 'Phase II of the Project focuses on "ways" and "means."',
}

export const phaseThreeIntro = {
  title: 'Phase III Articles from Proceedings',
  description:
    'This final phase kicks off with a scenario describing a potential conflict with China over Taiwan. The articles that follow explore five domains of naval warfare and how they would contribute to the fight, their strengths and weaknesses, and what might be done to better prepare.',
}

export const additionalReadingIntro = {
  title: 'Additional Reading on Strategy',
  description:
    'Proceedings has been publishing outstanding articles on maritime strategy since its inception. The editors recommend these.',
}

/* ── Videos ─────────────────────────────────────────────────────────────────── */

export interface SeaPowerVideo {
  /** The v= id, not a full URL. */
  youtubeId: string
  title: string
  /** Poster art filename in `assets/images/sea-power-project/`. */
  poster: string
  posterAlt: string
}

export const eventsIntro = {
  title: 'The American Sea Power Project Events',
  description:
    'Events, both in-person and virtual, are part of the Project—to bring ideas from the "page to the stage."',
}

export const eventVideos: SeaPowerVideo[] = [
  {
    youtubeId: 'GLo2uLYoStc',
    title: 'American Sea Power Project Virtual Event — 22 April 2021',
    poster: 'sea-power-hero-banner.jpg',
    posterAlt: 'A U.S. Navy destroyer under way at sunset',
  },
]

/**
 * Author interviews. Each is captioned with the article it accompanies, and
 * borrows that article's opening art as its poster frame.
 */
export const remarksVideos: SeaPowerVideo[] = [
  {
    youtubeId: 'cRjoq8jmtaw',
    title: 'The American Sea Power Project',
    poster: 'amerseapower-pro-1-21-1-opener.jpg',
    posterAlt: 'The USS Ronald Reagan (CVN-76) and the USS Antietam (CG-54).',
  },
  {
    youtubeId: 'gsGz1y_W1AE',
    title: 'Great Responsibility Demands a Great Navy',
    poster: 'asp-pro-2-21-1-opener.jpg',
    posterAlt:
      'U.S. and British warships in Sagami Bay, Japan, in the final days of World War II. Naval Institute Photo Archive.',
  },
  {
    youtubeId: 'yC6o2Qcseas',
    title: 'What Is a Navy For?',
    poster: 'asp-pro-4-21-1.jpg',
    posterAlt: 'USS Martin H. Ray',
  },
]

/* ── Notable books ──────────────────────────────────────────────────────────── */

/*
 * The live page shows five covers and nothing else. Titles and bylines here are
 * taken from each product page on the test site so the grid has something to
 * read; the two the Press has unpublished (403 on both) carry no byline and no
 * product link, which is the same reference-entry state the Books & Press
 * collections already render for a title that can't be bought.
 */
export const notableBooks: CollectionTitle[] = [
  {
    title: 'Mahan on Naval Strategy',
    subtitle: 'Selections from the Writings of Rear Admiral Alfred Thayer Mahan',
    byline: 'By Rear Adm. Alfred Thayer Mahan, USN; Introduction by John B. Hattendorf',
    slug: 'mahan-naval-strategy',
    href: '/press/books/mahan-naval-strategy',
  },
  {
    title: 'A Brief Guide to Maritime Strategy',
    byline: 'By James R. Holmes',
    slug: 'brief-guide-maritime-strategy',
    href: '/press/books/brief-guide-maritime-strategy',
  },
  {
    title: '21st Century Mahan',
    slug: '21st-century-mahan',
    availability: UNAVAILABLE,
  },
  {
    title: 'Red Star Over the Pacific, Second Edition',
    slug: 'red-star-over-pacific-second-edition',
    availability: UNAVAILABLE,
  },
  {
    title: 'The Neptune Factor',
    subtitle: 'Alfred Thayer Mahan and the Concept of Sea Power',
    byline: 'By Nicholas A. Lambert; Foreword by Adm. James Stavridis, USN (Ret.)',
    slug: 'neptune-factor',
    href: '/press/books/neptune-factor',
  },
]

/* ── Articles ───────────────────────────────────────────────────────────────── */

export const phaseOneArticles: SeaPowerArticle[] = [
  {
    id: 'the-american-sea-power-project',
    category: 'The American Sea Power Project',
    headline: 'The American Sea Power Project',
    author: 'Commander Paul S. Giarra and Captain Gerard D. Roncolato, U.S. Navy (Retired)',
    date: 'January 2021',
    excerpt: 'A new series encourages vigorous debate on the future of the Navy.',
    image: 'amerseapower-pro-1-21-1-opener.jpg',
    imageAlt: 'The USS Ronald Reagan (CVN-76) and the USS Antietam (CG-54).',
    href: '/magazines/proceedings/2021/january/american-sea-power-project',
  },
  {
    id: 'great-responsibility-demands-a-great-navy',
    category: 'The American Sea Power Project',
    headline: 'Great Responsibility Demands a Great Navy',
    author: 'James Holmes',
    date: 'February 2021',
    excerpt: 'The United States must build a naval force capable of managing its global responsibilities.',
    image: 'asp-pro-2-21-1-opener.jpg',
    imageAlt: 'U.S. and British warships in Sagami Bay, Japan, in the final days of World War II. Naval Institute Photo Archive.',
    href: '/magazines/proceedings/2021/february/great-responsibility-demands-great-navy',
  },
  {
    id: 'what-is-a-navy-for',
    category: 'The American Sea Power Project',
    headline: 'What Is a Navy For?',
    author: 'Nicholas A. Lambert',
    date: 'April 2021',
    excerpt: 'Strategic purpose is not the same thing as operational necessities.',
    image: 'asp-pro-4-21-1.jpg',
    imageAlt: 'USS Martin H. Ray',
    href: '/magazines/proceedings/2021/april/what-navy',
  },
  {
    id: 'the-u-s-role-on-the-global-stage',
    category: 'The American Sea Power Project',
    headline: 'The U.S. Role on the Global Stage',
    author: 'Seth Cropsey',
    date: 'May 2021',
    excerpt: 'A powerful United States is important to the success of like-minded democracies.',
    image: 'asp-pro-5-21-1-opener.jpg',
    imageAlt: 'Ships',
    href: '/magazines/proceedings/2021/may/us-role-global-stage',
  },
  {
    id: 'classic-works-on-sea-power-have-enduring-value',
    category: 'The American Sea Power Project',
    headline: 'Classic Works on Sea Power Have Enduring Value',
    author: 'John H. Maurer',
    date: 'June 2021',
    excerpt: 'The ideas of Mahan and Corbett remain relevant in the 21st century.',
    image: 'asp-pro-6-21-1-opener.jpg',
    imageAlt: 'Officers',
    href: '/magazines/proceedings/2021/june/classic-works-sea-power-have-enduring-value',
  },
  {
    id: 'strategic-failures-are-often-failures-of-imagination',
    category: 'The American Sea Power Project',
    headline: 'Strategic Failures Are Often Failures of Imagination',
    author: 'Kori Schake',
    date: 'July 2021',
    excerpt: 'The Washington Naval Treaties had different effects on interwar innovation in Britain, Japan, and the United States.',
    image: 'schake-pro-7-21-1-hero.jpg',
    imageAlt: 'Ships at Gallipoli',
    href: '/magazines/proceedings/2021/july/strategic-failures-are-often-failures-imagination',
  },
  {
    id: 'maritime-solutions-to-continental-conundrums',
    category: 'The American Sea Power Project',
    headline: 'Maritime Solutions to Continental Conundrums',
    author: 'S. C. M. Paine',
    date: 'August 2021',
    excerpt: 'A maritime global order gives navies an enormous peacetime role.',
    image: 'aspp-pro-8-21-1.jpg',
    imageAlt: 'Cargo Ship',
    href: '/magazines/proceedings/2021/august/maritime-solutions-continental-conundrums',
  },
  {
    id: 'american-naval-dominance-is-not-a-birthright',
    category: 'The American Sea Power Project',
    headline: 'American Naval Dominance Is Not a Birthright',
    author: 'Commander Benjamin Armstrong, U.S. Navy',
    date: 'September 2021',
    excerpt: 'The strength of the nation’s Navy is dependent on its relationship with the American people.',
    image: 'aspp-pro-9-21-1.jpg',
    imageAlt: 'FDR',
    href: '/magazines/proceedings/2021/september/american-naval-dominance-not-birthright',
  },
  {
    id: 'what-s-at-stake-in-the-indo-pacific',
    category: 'The American Sea Power Project',
    headline: 'What’s at Stake in the Indo-Pacific',
    author: 'Aaron L. Friedberg',
    date: 'October 2021',
    excerpt: 'U.S. choices at sea also will affect what happens on land.',
    image: 'aspp-pro-10-21-1.jpg',
    imageAlt: 'Infrastructure',
    href: '/magazines/proceedings/2021/october/whats-stake-indo-pacific',
  },
  {
    id: 'sea-control-and-command-of-the-sea-remain-essential',
    category: 'The American Sea Power Project',
    headline: 'Sea Control and Command of the Sea Remain Essential',
    author: 'Trent Hone',
    date: 'November 2021',
    excerpt: 'Command of the sea is taken for granted. This is a grave miscalculation.',
    image: 'aspp-hone-pro-11-21-1.jpg',
    imageAlt: 'asp hero 11-21',
    href: '/magazines/proceedings/2021/november/sea-control-and-command-sea-remain-essential',
  },
  {
    id: 'a-slavish-devotion-to-forward-presence-has-nearly-broken-the',
    category: 'The American Sea Power Project',
    headline: 'A Slavish Devotion to Forward Presence Has Nearly Broken the U.S. Navy',
    author: 'The Honorable Robert O. Work',
    date: 'December 2021',
    excerpt: 'The forward presence mission is taking a toll on the fleet and the force.',
    image: 'aspp-work-pro-12-21-1.jpg',
    imageAlt: 'aircraft carriers',
    href: '/magazines/proceedings/2021/december/slavish-devotion-forward-presence-has-nearly-broken-us-navy',
  },
  {
    id: 'think-differently-about-naval-presence',
    category: 'The American Sea Power Project',
    headline: 'Think Differently about Naval Presence',
    author: 'Captain Robert C. Rubel, U.S. Navy (Retired)',
    date: 'December 2021',
    excerpt: 'Forward deployment must be managed on a global basis.',
    image: 'rubel-pro-12-21-1-hero.jpg',
    imageAlt: 'Map',
    href: '/magazines/proceedings/2021/december/think-differently-about-naval-presence',
  },
  {
    id: 'getting-back-on-top-how-to-rebuild-the-navy',
    category: 'The American Sea Power Project',
    headline: 'Getting Back On Top: How to Rebuild the Navy',
    author: 'The Honorable John F. Lehman',
    date: 'January 2022',
    excerpt: 'The Navy faces challenges similar to those in the late 1970s, and it should look to that era as it begins to rebuild.',
    image: 'aspp-pro-1-22-1.jpg',
    imageAlt: 'ASPP Jan21 Hero',
    href: '/magazines/proceedings/2022/january/getting-back-top-how-rebuild-navy',
  },
  {
    id: 'forward-naval-presence-a-political-not-military-leadership-p',
    category: 'The American Sea Power Project',
    headline: 'Forward Naval Presence: A Political, Not Military, Leadership Problem',
    author: 'Admiral James G. Foggo, U.S. Navy (Retired)',
    date: 'January 2022',
    excerpt: 'Forward naval presence is a great strength when managed and resourced correctly, but political leaders must moderate the demand signal.',
    image: '220102-n-un585-2190.jpg',
    imageAlt: 'USS Ross Rota, Spain',
    href: '/magazines/proceedings/2022/january/forward-naval-presence-political-not-military-leadership-problem',
  },
  {
    id: 'a-maritime-strategy-to-deal-with-china',
    category: 'The American Sea Power Project',
    headline: 'A Maritime Strategy to Deal with China',
    author: 'Thomas G. Mahnken',
    date: 'February 2022',
    excerpt: 'A combination of inside and outside forces could deter Chinese aggression.',
    image: 'aspp-pro-2-22-1-0.jpg',
    imageAlt: 'hero image aspp feb 2022',
    href: '/magazines/proceedings/2022/february/maritime-strategy-deal-china',
  },
]

export const phaseTwoArticles: SeaPowerArticle[] = [
  {
    id: 'from-ends-to-ways-of-naval-strategy',
    category: 'The American Sea Power Project',
    headline: 'From ‘Ends’ to ‘Ways’ of Naval Strategy',
    author: 'Commander Paul Giarra, Captain Gerry Roncolato, and Captain Bill Hamblet, U.S. Navy (Retired)',
    date: 'April 2022',
    excerpt: 'After a dozen articles on the “ends” of strategy, the project transitions to the “ways.”',
    image: 'aspp-pro-4-22-1-hero.jpg',
    imageAlt: 'aircraft carriers',
    href: '/magazines/proceedings/2022/april/ends-ways-naval-strategy',
  },
  {
    id: 'the-character-of-war-is-constantly-changing',
    category: 'The American Sea Power Project',
    headline: 'The Character of War Is Constantly Changing',
    author: 'Captain Gerard Roncolato, U.S. Navy (Retired)',
    date: 'May 2022',
    excerpt: 'Organizations and people who can rapidly and effectively adapt are more likely to prevail.',
    image: 'aspp-pro-5-22-hero.jpg',
    imageAlt: 'aircraft carrier',
    href: '/magazines/proceedings/2022/may/character-war-constantly-changing',
  },
  {
    id: 'american-sea-power-project-geography-plays-an-ocean-sized-ro',
    category: 'The American Sea Power Project',
    headline: 'American Sea Power Project: Geography Plays an Ocean-Sized Role',
    author: 'Norman Friedman',
    date: 'June 2022',
    excerpt: 'The sea still shapes what navies can do.',
    image: 'aspp-pro-6-22-1.jpg',
    imageAlt: 'ship',
    href: '/magazines/proceedings/2022/june/american-sea-power-project-geography-plays-ocean-sized-role',
  },
  {
    id: 'american-sea-power-project-alliances-and-coalitions-are-esse',
    category: 'The American Sea Power Project',
    headline: 'American Sea Power Project: Alliances and Coalitions Are Essential',
    author: 'Tom Hone',
    date: 'July 2022',
    excerpt: 'U.S. sea power has always hinged on the nation’s ability to build and maintain partnerships.',
    image: 'aspp-hone-pro-7-22-1-hero.jpg',
    imageAlt: 'aviation handler directs the pilot of a French Rafale F-3R on the flight deck',
    href: '/magazines/proceedings/2022/july/american-sea-power-project-alliances-and-coalitions-are-essential',
  },
  {
    id: 'innovation-people-are-more-important-than-technology',
    category: 'The American Sea Power Project',
    headline: 'Innovation: People Are More Important than Technology',
    author: 'General Anthony Zinni, U.S. Marine Corps (Retired), Mie Augier, and Major Sean F. X. Barrett, U.S. Marine Corps',
    date: 'August 2022',
    excerpt: 'Innovation is an important part of national security, but people are key.',
    image: 'aspp-pro-8-22-hero.jpg',
    imageAlt: 'marine',
    href: '/magazines/proceedings/2022/august/innovation-people-are-more-important-technology',
  },
  {
    id: 'cyber-warfare-is-a-navy-mission',
    category: 'The American Sea Power Project',
    headline: 'Cyber Warfare Is a Navy Mission',
    author: 'Lieutenant Commander Tyson B. Meadors, U.S. Navy',
    date: 'September 2022',
    excerpt: 'The Navy needs a specialized cyber force to protect maritime commerce.',
    image: 'aspp-pro-9-22-1-hero.jpg',
    imageAlt: 'guided-missile destroyer Chung-Hoon (DDG-93)',
    href: '/magazines/proceedings/2022/september/cyber-warfare-navy-mission',
  },
  {
    id: 'intellectual-readiness-is-vital-to-sea-power',
    category: 'The American Sea Power Project',
    headline: 'Intellectual Readiness Is Vital to Sea Power',
    author: 'Trent Hone and Lieutenant Eric Vorm, U.S. Navy',
    date: 'October 2022',
    excerpt: 'Navy officers and sailors will need mental agility to succeed in future conflicts.',
    image: 'aspp-pro-10-22-1.jpg',
    imageAlt: 'officer',
    href: '/magazines/proceedings/2022/october/intellectual-readiness-vital-sea-power',
  },
  {
    id: 'how-to-rebalance-the-navy-s-strategic-culture',
    category: 'The American Sea Power Project',
    headline: 'How to Rebalance the Navy’s Strategic Culture',
    author: 'Captain Scott Mobley, U.S. Navy (Retired)',
    date: 'November 2022',
    excerpt: 'The service is most effective when operational, technological, and strategic influences are in balance.',
    image: 'aspp-pro-11-22-hero.jpg',
    imageAlt: 'Naval War College',
    href: '/magazines/proceedings/2022/november/how-rebalance-navys-strategic-culture',
  },
  {
    id: 'cyber-power-is-a-key-element-of-sea-power',
    category: 'The American Sea Power Project',
    headline: 'Cyber Power Is a Key Element of Sea Power',
    author: 'Commander Robert “Jake” Bebber, U.S. Navy',
    date: 'December 2022',
    excerpt: 'The skillful use of U.S. cyber power will be required to fight and win.',
    image: 'aspp-pro-12-22-1-hero.jpg',
    imageAlt: 'ships',
    href: '/magazines/proceedings/2022/december/cyber-power-key-element-sea-power',
  },
  {
    id: 'bigger-fleets-win',
    category: 'The American Sea Power Project',
    headline: 'Bigger Fleets Win',
    author: 'Captain Sam J. Tangredi, U.S. Navy (Retired)',
    date: 'January 2023',
    excerpt: 'In naval warfare, the side with the most ships almost always wins.',
    image: 'aspp-pro-1-23-hero-0.jpg',
    imageAlt: 'ASPP Hero J23',
    href: '/magazines/proceedings/2023/january/bigger-fleets-win',
  },
  {
    id: 'a-strategy-of-denial-for-the-western-pacific',
    category: 'The American Sea Power Project',
    headline: 'A Strategy of Denial for the Western Pacific',
    author: 'Elbridge Colby',
    date: 'March 2023',
    excerpt: 'The Sea Services will play a central role in denying China hegemony over Asia.',
    image: 'aspp-pro-3-23-1-hero.jpg',
    imageAlt: 'map, china',
    href: '/magazines/proceedings/2023/march/strategy-denial-western-pacific',
  },
  {
    id: 'sea-power-and-the-operational-level-of-war-linking-means-wit',
    category: 'The American Sea Power Project',
    headline: 'Sea Power and the Operational Level of War: Linking Means with Ends',
    author: 'Captain Jeffrey E. Kline, U.S. Navy (Retired)',
    date: 'April 2023',
    excerpt: 'A fleet’s composition and size determine its employment and impact.',
    image: 'aspp-pro-4-23-1-hero.jpg',
    imageAlt: 'marines',
    href: '/magazines/proceedings/2023/april/sea-power-and-operational-level-war-linking-means-ends',
  },
  {
    id: 'time-to-recalibrate-the-navy-needs-tactical-nuclear-weapons-',
    category: 'The American Sea Power Project',
    headline: 'Time to Recalibrate: The Navy Needs Tactical Nuclear Weapons . . . Again',
    author: 'Commander Paul S. Giarra, U.S. Navy (Retired)',
    date: 'July 2023',
    excerpt: 'Recent actions by Russia, China, and North Korea point to an urgent need to bring tactical nuclear weapons back to the fleet.',
    image: 'aspp-pro-7-23-1-hero.jpg',
    imageAlt: 'A 1962 test of a U.S. Navy nuclear antisubmarine rocket.',
    href: '/magazines/proceedings/2023/july/time-recalibrate-navy-needs-tactical-nuclear-weapons-again',
  },
  {
    id: 'the-avf-is-at-a-crossroad',
    category: 'The American Sea Power Project',
    headline: 'The AVF Is at a Crossroad',
    author: 'Captain Eric Schuck, U.S. Navy Reserve',
    date: 'August 2023',
    excerpt: 'Rising personnel costs are on a collision course with the Navy’s ambitious shipbuilding goals.',
    image: 'aspp-shuck-pro-aug23-1-hero.jpg',
    imageAlt: 'midshipmen',
    href: '/magazines/proceedings/2023/august/avf-crossroad',
  },
  {
    id: 'planning-for-the-next-war-must-be-a-mixture-of-art-science',
    category: 'The American Sea Power Project',
    headline: 'Planning for the Next War Must Be a Mixture of Art & Science',
    author: 'Rear Admiral Patrick Piercey, U.S. Navy (Retired)',
    date: 'September 2023',
    excerpt: 'Success in a future peer-level fight will depend on understanding commander’s intent and the art of warfare.',
    image: 'aspp-pro-9-23-hero.jpg',
    imageAlt: 'Wargaming',
    href: '/magazines/proceedings/2023/september/planning-next-war-must-be-mixture-art-science',
  },
]

export const phaseThreeArticles: SeaPowerArticle[] = [
  {
    id: 'the-war-of-2026-phase-iii-scenario',
    category: 'The American Sea Power Project',
    headline: 'The War of 2026: Phase III Scenario',
    author: 'Commander Paul Giarra and Captains Bill Hamblet and Gerard Roncolato, U.S. Navy (Retired)',
    date: 'December 2023',
    excerpt: 'This final phase kicks off with a scenario describing a potential conflict with China over Taiwan.',
    image: 'aspp-scenario-pro-12-23-1-hero.jpg',
    imageAlt: 'A Chinese destroyer and amphibious assault vehicles fire on Taiwan in the opening assault of the War of 2026.',
    href: '/magazines/proceedings/2023/december/war-2026-phase-iii-scenario',
  },
  {
    id: 'put-iii-mef-in-a-fighting-stance',
    category: 'The American Sea Power Project',
    headline: 'Put III MEF in a Fighting Stance',
    author: 'Lieutenant Colonel Brian Kerg, U.S. Marine Corps',
    date: 'December 2023',
    excerpt: 'The American Sea Power Project’s “War in 2026” from the stand-in force’s perspective.',
    image: 'aspp-kerg-pro-12-23-1-hero.jpg',
    imageAlt: 'A Marine assigned to 3d Marine Division under the unit deployment program during live-fire maneuver drills on Camp Schwab, Okinawa, Japan.',
    href: '/magazines/proceedings/2023/december/put-iii-mef-fighting-stance',
  },
  {
    id: 'it-all-comes-down-to-sea-control',
    category: 'The American Sea Power Project',
    headline: 'It All Comes Down to Sea Control',
    author: 'Captain Scott Tait, U.S. Navy (Retired), and Commander Anthony LaVopa, U.S. Navy',
    date: 'December 2023',
    excerpt: 'Winning the surface fight in this scenario would require first rolling back the Chinese Navy’s sea control from east to west, and then going on the offensive.',
    image: 'aspp-tait-pro-12-23-1-hero.jpg',
    imageAlt: 'An artist rendering of the USS Zumwalt (DDG-1000) firing the Conventional Prompt Strike long-range hypersonic missile.',
    href: '/magazines/proceedings/2023/december/it-all-comes-down-sea-control',
  },
  {
    id: 'you-can-t-win-without-more-submarines',
    category: 'The American Sea Power Project',
    headline: 'You Can’t Win Without (More) Submarines',
    author: 'Captain William Toti, U.S. Navy (Retired)',
    date: 'December 2023',
    excerpt: 'Submarines were one of the few forces that could penetrate denied areas inside the exclusion zone declared by China',
    image: 'aspp-toti-pro-12-23-1-hero.jpg',
    imageAlt: 'A Los Angeles–class submarine at periscope depth in the western Pacific.',
    href: '/magazines/proceedings/2023/december/you-cant-win-without-more-submarines',
  },
  {
    id: 'mine-warfare-could-be-key',
    category: 'The American Sea Power Project',
    headline: 'Mine Warfare Could Be Key',
    author: 'Admiral James A. Winnefeld Jr., U.S. Navy (Retired)',
    date: 'December 2023',
    excerpt: 'Mines are perhaps the most pernicious and frustrating obstacle a ground or maritime force can face.',
    image: 'aspp-winnefeld-pro-12-23-1-hero.jpg',
    imageAlt: 'explosion',
    href: '/magazines/proceedings/2023/december/mine-warfare-could-be-key',
  },
  {
    id: 'strike-warfare-s-inventory-problem',
    category: 'The American Sea Power Project',
    headline: 'Strike Warfare’s Inventory Problem',
    author: 'Commander Graham Scarbro, U.S. Navy',
    date: 'December 2023',
    excerpt: 'Not enough aircraft, ammunition, and aviators presents risks the Navy will have to face in the War of 2026 scenario.',
    image: 'aspp-scarbro-pro-12-23-1-hero.jpg',
    imageAlt: 'EA-18G Growlers from Electronic Attack Squadron (VAQ) 209 simultaneously fire two AGM-88 high-speed antiradiation missiles during a training exercise near Guam. The AGM-88 is the Navy’s sole antiradiation strike missile, and relatively short ranged considering the threat in the 2026 scenario.',
    href: '/magazines/proceedings/2023/december/strike-warfares-inventory-problem',
  },
  {
    id: 'wartime-command-control',
    category: 'The American Sea Power Project',
    headline: 'Wartime Command & Control',
    author: 'Admiral Scott Swift, U.S. Navy (Retired)',
    date: 'January 2024',
    excerpt: 'Command and control would require rethinking—with mission command as a central tenet.',
    image: 'aspp-swift-pro-1-24-hero.jpg',
    imageAlt: 'To prevail in this scenario, senior commanders will need to delegate to the maximum extent possible, rely on mission command, and update their commander’s intent often.',
    href: '/magazines/proceedings/2024/january/wartime-command-control',
  },
  {
    id: 'the-challenge-of-joint-space-operations',
    category: 'The American Sea Power Project',
    headline: 'The Challenge of Joint Space Operations',
    author: 'Vice Admiral Brian Brown, U.S. Navy (Retired)',
    date: 'January 2024',
    excerpt: 'Space operations would be key. U.S. forces must be prepared.',
    image: 'aspp-brown-pro-1-24-hero.jpg',
    imageAlt: 'Space will be a key enabler in a future fight over Taiwan, and the United States must take advantage of relationships, technology, and partnerships to make its space systems more resilient for this fight.',
    href: '/magazines/proceedings/2024/january/challenge-joint-space-operations',
  },
  {
    id: 'space-cybersecurity-achilles-heel',
    category: 'The American Sea Power Project',
    headline: 'Space Cybersecurity: Achilles Heel',
    author: 'Admiral Sandy Winnefeld, U.S. Navy (Retired) and General Ellen Pawlikowski, U.S. Air Force (Retired)',
    date: 'January 2024',
    excerpt: 'The nation needs more sophisticated requirements for cybersecurity in space to prevail in the 2026 scenario.',
    image: 'aspp-brown-pro-1-24-sb-1.jpg',
    imageAlt: 'Winnefeld sidebar ASPP J24 Hero',
    href: '/magazines/proceedings/2024/january/space-cybersecurity-achilles-heel',
  },
  {
    id: 'air-and-missile-defense-in-the-western-pacific',
    category: 'The American Sea Power Project',
    headline: 'Air and Missile Defense in the Western Pacific',
    author: 'Captain Scott Smith, U.S. Navy (Retired)',
    date: 'January 2024',
    excerpt: 'Countering China’s missile offensive in a war over Taiwan will be a critical—and joint—effort.',
    image: 'aspp-smith-pro-1-24-hero.jpg',
    imageAlt: 'The USS Carl Levin (DDG-120) launches a Standard Missile-3 interceptor.',
    href: '/magazines/proceedings/2024/january/air-and-missile-defense-western-pacific',
  },
  {
    id: 'tighten-the-belt-and-cut-the-roads',
    category: 'The American Sea Power Project',
    headline: 'Tighten the Belt and Cut the Roads',
    author: 'Captain Tom Clarity, U.S. Navy',
    date: 'January 2024',
    excerpt: 'To win, recognize that restoring Taiwan’s autonomy is far more achievable than preserving it.',
    image: 'aspp-clarity-pro-1-24-hero.jpg',
    imageAlt: 'A line of Chinese trucks stuck in a traffic jam on a narrow mountain road in the Himalayas.',
    href: '/magazines/proceedings/2024/january/tighten-belt-and-cut-roads',
  },
  {
    id: 'the-navy-is-not-ready-for-the-information-war-of-2026',
    category: 'The American Sea Power Project',
    headline: 'The Navy Is Not Ready for the Information War of 2026',
    author: 'Vice Admiral T. J. White and Rear Admiral Danelle Barrett, U.S. Navy (Retired), and Commander Jake Bebber, U.S. Navy',
    date: 'February 2024',
    excerpt: 'The Navy has not adequately planned for the intersection of the cyber and maritime domains in war.',
    image: 'aspp-white-pro-2-24-1-hero.jpg',
    imageAlt: 'Sailors in the combat information center of the Arleigh Burke–class guided-missile destroyer USS Higgins (DDG-76) operating in the Philippine Sea.',
    href: '/magazines/proceedings/2024/february/navy-not-ready-information-war-2026',
  },
  {
    id: 'naval-special-warfare-will-have-to-fight-differently',
    category: 'The American Sea Power Project',
    headline: 'Naval Special Warfare Will Have to Fight Differently',
    author: 'Seth Cropsey',
    date: 'February 2024',
    excerpt: 'NSW could be decisive in a Eurasian war if employed with coherent strategic skill.',
    image: 'aspp-cropsey-pro-2-24-1-hero.jpg',
    imageAlt: 'Members of a West Coast–based Naval Special Warfare command set security during an exercise.',
    href: '/magazines/proceedings/2024/february/naval-special-warfare-will-have-fight-differently',
  },
  {
    id: 'to-upgun-seapower-in-the-indo-pacific-you-need-an-army',
    category: 'The American Sea Power Project',
    headline: 'To Upgun Seapower in the Indo-Pacific, You Need an Army',
    author: 'General Charles Flynn and Lieutenant Colonel Tim Devine, U.S. Army',
    date: 'February 2024',
    excerpt: 'From logistics to communications to air defenses, the Army can bring a lot to the fight.',
    image: 'aspp-flynn-pro-2-24-1-hero.jpg',
    imageAlt: 'The Army’s new mobile mid-range capability system can launch Tomahawk antiship and land-attack cruise missiles.',
    href: '/magazines/proceedings/2024/february/upgun-seapower-indo-pacific-you-need-army',
  },
  {
    id: 'logistics-wins-and-loses-wars',
    category: 'The American Sea Power Project',
    headline: 'Logistics Wins (and Loses) Wars',
    author: 'Salvatore R. Mercogliano',
    date: 'February 2024',
    excerpt: 'The United States needs a more nimble and capable afloat prepositioning force to win a potential conflict in the Pacific.',
    image: 'aspp-mercogliano-pro-2-24-1-hero.jpg',
    imageAlt: 'The SS Capella (T-AKR-293) and Algol (T-AKR-287), fast sealift ships of the Ready Reserve Force, wait moored in Alameda, California. Of the many issues the U.S. Navy would face in a conflict in the western Pacific, shortfalls in logistics—sealift in particular—could be the most significant.',
    href: '/magazines/proceedings/2024/february/logistics-wins-and-loses-wars',
  },
  {
    id: 'the-navy-needs-a-lot-more-logistics-or-a-different-strategy',
    category: 'The American Sea Power Project',
    headline: 'The Navy Needs a Lot More Logistics, or a Different Strategy',
    author: 'Captain Gerard Roncolato, U.S. Navy (Retired)',
    date: 'May 2024',
    excerpt: 'The U.S. Navy\'s logistics force is not sized to meet the demands of great power war.',
    image: 'ronco-opener.jpg',
    imageAlt: 'Underway replenishment',
    href: '/magazines/proceedings/2024/may/navy-needs-lot-more-logistics-or-different-strategy',
  },
  {
    id: 'no-one-should-think-the-war-will-be-short',
    category: 'The American Sea Power Project',
    headline: 'No One Should Think the War Will Be Short',
    author: 'Commander Justin Cobb, U.S. Navy',
    date: 'September 2024',
    excerpt: 'The Future of Naval Warfare Essay Contest—First Prize. The idea of a protracted war over Taiwan could deter China.',
    image: 'cobb-pro-9-24-1-hero.jpg',
    imageAlt: 'Republic of China Armed Forces M60 tanks fire during an exercise.',
    href: '/magazines/proceedings/2024/september/no-one-should-think-war-will-be-short',
  },
  {
    id: 'diplomacy-for-better-stand-in-force-access-in-japan',
    category: 'The American Sea Power Project',
    headline: 'Diplomacy for Better Stand-In Force Access in Japan',
    author: 'Lieutenant Colonel Daniel Hough, U.S. Marine Corps',
    date: 'September 2024',
    excerpt: 'The Future of Naval Warfare Essay Contest—Second Prize. Changes to Japan’s legal framework could shorten the approval process to allow U.S. forces to support the nation’s defense.',
    image: 'hough-pro-9-24-1-hero.jpg',
    imageAlt: 'U.S. Navy (Alexander Kubitza)',
    href: '/magazines/proceedings/2024/september/diplomacy-better-stand-force-access-japan',
  },
  {
    id: 'prize-law-can-help-the-united-states-win-the-war-of-2026',
    category: 'The American Sea Power Project',
    headline: 'Prize Law Can Help the United States Win the War of 2026',
    author: 'Major Ryan Ratcliffe, U.S. Marine Corps',
    date: 'September 2024',
    excerpt: 'The Future of Naval Warfare Essay Contest—Third Prize. Seizing Chinese-affiliated vessels and redeploying them could aid U.S. victory.',
    image: 'ratcliffe-pro-9-24-1a-b-hero.jpg',
    imageAlt: 'The bulk carrier Stamford Pioneer, sailing under a Hong King, China, flag. In a War of 2026–like scenario, seizing merchant shipping may be a way for the United States to increase its sealift capacity without building more ships.',
    href: '/magazines/proceedings/2024/september/prize-law-can-help-united-states-win-war-2026',
  },
]

export const additionalReading: SeaPowerArticle[] = [
  {
    id: 'mahan-as-geoeconomic-strategist',
    category: 'Special',
    headline: 'Mahan as Geoeconomic Strategist',
    author: 'Colonel Walter M. Hudson, U.S. Army (Retired)',
    date: 'January 2024',
    excerpt: 'Mahan sets forth examples of what may today be called the larger economic, cultural, and technological ecosystem required for control of the seas.',
    image: 'speial-hudson-pro-1-24-hero.jpg',
    imageAlt: 'Mahan thought a Central American canal would reorient the commercial epicenter of the globe, shifting it from Great Britain to the United States. But control of the canal would depend on sea power.',
    href: '/magazines/proceedings/2024/january/mahan-geoeconomic-strategist',
  },
  {
    id: 'the-maritime-strategy',
    category: 'Article',
    headline: 'The Maritime Strategy',
    author: 'Admiral James D. Watkins, U. S. Navy',
    date: 'January 1986',
    excerpt: 'The goal of the overall Maritime Strategy is to use maritime power, in combination with the efforts of our sister services and forces of our allies, to bring about war ...',
    image: 'us-mdanusni-164045001.jpg',
    imageAlt: 'Safari 85',
    href: '/magazines/proceedings/1986/january-supplement/maritime-strategy-0',
  },
  {
    id: 'the-future-of-u-s-sea-power',
    category: 'Article',
    headline: 'The Future of U. S. Sea Power',
    author: 'Admiral Thomas B. Hayward, U. S. Navy',
    date: 'May 1979',
    excerpt: 'I would like to lead off with a broad examination of the responsibilities facing the Navy, in order to provide a baseline from which we might judge the adequacy of ...',
    image: 'us-mdanusni-062086015.jpg',
    imageAlt: 'Hayward, Thomas B.',
    href: '/magazines/proceedings/1979/may/future-u-s-sea-power',
  },
  {
    id: 'national-policy-and-the-transoceanic-navy',
    category: 'Article',
    headline: 'National Policy and the Transoceanic Navy',
    author: 'Samuel P. Huntington',
    date: 'May 1954',
    excerpt: 'The fundamental element of a military service is its purpose or role in implementing national policy. The statement of this role may be called the strategic concept of the service ...',
    image: 'us-mdanusni-098002005.jpg',
    imageAlt: 'Replenishment at Sea',
    href: '/magazines/proceedings/1954/may/national-policy-and-transoceanic-navy',
  },
  {
    id: 'exercise-of-command-excess-of-detail-in-orders-and-instructi',
    category: 'Commentary',
    headline: 'Exercise of Command—Excess of Detail in Orders and Instructions.',
    date: 'September 2026',
    excerpt: 'This 1941 letter from Fleet Admiral Ernest King remains relevant to the great power competition.',
    image: 'nh-109841.jpg',
    imageAlt: 'ADM King',
    href: '/american-sea-power-project/exercise-command-excess-detail-orders-and-instructions',
  },
  {
    id: 'a-naval-memo-of-grand-strategic-importance',
    category: 'Commentary',
    headline: 'A Naval Memo of Grand Strategic Importance',
    author: 'Captain Gerard D. Roncolato, U.S. Navy (Retired)',
    date: 'May 2021',
    excerpt: 'In 1940, Chief of Naval Operations Admiral Harold Stark wrote a strategic memorandum to Secretary of the Navy Frank Knox outlining the challenges ahead.',
    image: 'screen-shot-2021-04-30-at-11-16-07-am.png',
    imageAlt: 'CNO Harold Stark\'s famous 1940 "Dog Memo"',
    href: '/magazines/proceedings/2021/may/naval-memo-grand-strategic-importance',
  },
  {
    id: 'the-realism-of-sea-power',
    category: 'Article',
    headline: 'The Realism Of Sea Power',
    author: 'Captain C. C. Gill, U. S. Navy',
    date: 'September 1933',
    excerpt: 'In the last decade there has been evi­denced in the United States a drifting away from the realism of sea power. Certain heresies have arisen. We have heard said that ...',
    image: 'us-mdanusni-151031022-0.jpg',
    imageAlt: 'Fleet Problem IX',
    href: '/magazines/proceedings/1933/september/realism-sea-power',
  },
  {
    id: 'the-next-taiwan-crisis-will-almost-certainly-involve-nuclear',
    category: 'Featured Article',
    headline: 'The Next Taiwan Crisis Will (Almost) Certainly Involve Nuclear Threats',
    author: 'the Honorable James H. Anderson',
    date: 'March 2024',
    excerpt: 'General Prize Essay Contest—Second Prize. Sponsored by Andrew and Barbara Taylor. China might leverage nuclear threats in a Taiwan invasion; the United States must prepare now to deter them.',
    image: 'anderson-pro-mar24-1-hero.jpg',
    imageAlt: 'The rocket force of the Eastern Theater Command of the Chinese People’s Liberation Army conducting operations during the April 2023 military exercises around Taiwan. China’s growing nuclear arsenal increases the likelihood of a nuclear dimension to any future Taiwan scenario.',
    href: '/magazines/proceedings/2024/march/next-taiwan-crisis-will-almost-certainly-involve-nuclear-threats',
  },
]
