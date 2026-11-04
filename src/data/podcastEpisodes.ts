/**
 * Proceedings Podcast episodes, newest first — the archive the podcast page
 * pages through, each episode's own page renders, and site search indexes.
 *
 * Copy follows the live listing and episode pages at
 * /magazines/proceedings/the-proceedings-podcast (pulled 4 November 2026).
 * The live listing is not strictly date-ordered; this list is.
 */

export interface Episode {
  /** The live site's path alias, so prototype URLs match production. */
  slug: string
  title: string
  date: string
  year: number
  /** The listing teaser. Optional: EP. 511 has none on the live site. */
  description?: string
  /**
   * The full write-up on the episode's own page, one string per paragraph.
   * Falls back to `description` when the page carries no more than the teaser.
   */
  body?: string[]
  /** The article an episode discusses, linked under its write-up. */
  articleUrl?: string
  /** Real SoundCloud track ID from soundcloud.com/naval-institute */
  trackId: number
  /** Naval History Podcast episodes (distinct show art comes through the embed) */
  navalHistory?: boolean
}

export const episodes: Episode[] = [
  {
    slug: 'ep-512-behind-every-sortie-air-boss-naval-aviation',
    title: 'EP. 512: Behind Every Sortie: The Air Boss on Naval Aviation Maintenance',
    date: '28 August 2026',
    year: 2026,
    description:
      'Host Bill Hamblet is joined by the Air Boss—Vice Admiral Doug Verissimo, Commander, Naval Air Forces and Commander, Naval Air Forces Pacific.',
    body: [
      'Host Bill Hamblet is joined by the Air Boss—Vice Admiral Doug Verissimo, Commander, Naval Air Forces and Commander, Naval Air Forces Pacific. As the U.S. Navy’s top aviator, Verissimo is in charge of keeping the Navy’s carriers and aircraft combat ready. Join us as they discuss maintenance challenges at a time of unprecedented demand.',
    ],
    trackId: 2390513406,
  },
  {
    slug: 'eagle-nazi-ship-americas-tall-ship',
    title: 'The Eagle: From a Nazi Ship to America’s Tall Ship',
    date: '27 August 2026',
    year: 2026,
    description:
      'Host Emily Abdow talks with Will Sofrin about the history of Coast Guard cutter Eagle—from her origins as a Nazi training ship to her second life as America’s tall ship, including diplomatic missions, milestone anniversaries, and visits from celebrities.',
    trackId: 2389854903,
    navalHistory: true,
  },
  {
    slug: 'ep-511-iran-war-redux-how-does-thing-end',
    title: 'EP. 511: Iran War Redux: How Does This Thing End?',
    date: '10 August 2026',
    year: 2026,
    trackId: 2379000221,
  },
  {
    slug: 'legacy-under-sail-celebrating-sail250-captain',
    title: 'A Legacy Under Sail: Celebrating SAIL250 with Captain Kristopher Ensley, U.S. Coast Guard',
    date: '07 August 2026',
    year: 2026,
    description:
      'Host Emily Abdow sits down with Capt. Kristopher Ensley, commanding officer of USCGC Eagle (WIX-327), and Cadet First Class Finley Rauscher to explore the Eagle’s remarkable history, the timeless value of sail training, and the unforgettable experience of participating in SAIL250 events up and down the East Coast.',
    body: [
      'Host Emily Abdow sits down with Capt. Kristopher Ensley, commanding officer of USCGC Eagle (WIX-327), and Cadet First Class Finley Rauscher to explore the Eagle’s remarkable history, the timeless value of sail training, and the unforgettable experience of participating in SAIL250 events up and down the East Coast. Discover how a ship built nearly a century ago continues to prepare the Coast Guard’s future leaders while serving as one of America’s most recognizable maritime ambassadors.',
    ],
    trackId: 2377578878,
    navalHistory: true,
  },
  {
    slug: 'ep-510-news-update-navy-budget-shipbuilding-and',
    title: 'EP. 510: News Update—Navy Budget, Shipbuilding, and Operation Epic Fury',
    date: '31 July 2026',
    year: 2026,
    description:
      'Bill Hamblet, Sam LaGrone, and Brian O’Rourke talk about the Navy’s budget, shipbuilding, Operation Epic Fury, and recruiting and retention.',
    trackId: 2372873876,
  },
  {
    slug: 'ep-509-razors-edge-new-shaving-policy-could-cost-navy',
    title: 'EP. 509: Razor’s Edge: New Shaving Policy Could Cost the Navy Sailors',
    date: '24 July 2026',
    year: 2026,
    description:
      'Host Bill Hamblet interviews John Cordle about the Navy’s new shaving policy and its potential impact on sailors affected by pseudofolliculitis barbae (PFB). They discuss the medical condition, readiness, retention, leadership, and whether changes to grooming standards could unintentionally affect recruiting, careers, and the fleet’s overall effectiveness.',
    trackId: 2367305228,
  },
  {
    slug: 'ep-508-lessons-f-35-accidents-and-naval-aviation',
    title: 'EP. 508: Lessons from F-35 Accidents and Naval Aviation Safety',
    date: '15 July 2026',
    year: 2026,
    description:
      'Host Bill Hamblet sits down with Captain Robert Niewoehner, U.S. Navy (Retired), and Jefferson D. Grubb, head of the Operations Research Division at the Naval Safety Command, to examine lessons from recent F-35 mishaps, the evolution of naval aviation safety, and how institutional learning can help build a safer, stronger fleet.',
    trackId: 2361298835,
  },
  {
    slug: 'patriots-hire-privateers-1776',
    title: 'Patriots for Hire? The Privateers of 1776',
    date: '09 July 2026',
    year: 2026,
    description:
      'This episode explores the story of the privateer Oliver Cromwell, Captain Joseph Lee, and the high-risk business of Revolutionary War privateering.',
    body: [
      'During the American Revolution, privateers prowled the Atlantic in search of British prizes—serving the Patriot cause while generating enormous profits for their investors. This episode explores the story of the privateer Oliver Cromwell, Captain Joseph Lee, and the high-risk business of Revolutionary War privateering. Was it a fight for independence, a business opportunity, or both?',
    ],
    articleUrl: 'https://www.usni.org/magazines/naval-history/2026/august/patriotism-or-profit',
    trackId: 2356336499,
    navalHistory: true,
  },
  {
    slug: 'ep-507-future-navy-recruiting-and-retention-hon-ben',
    title: 'EP. 507: The Future of Navy Recruiting and Retention with the Hon. Ben Kohlmann, ASN M&RA',
    date: '09 July 2026',
    year: 2026,
    description:
      'Host Bill Hamblet talks with the Honorable Ben Kohlmann, Assistant Secretary of the Navy for Manpower and Reserve Affairs, about the future of the fleet.',
    trackId: 2356349657,
  },
  {
    slug: 'ep-506-stoic-anchor-resilience-readiness-and-future',
    title: 'EP. 506: The Stoic Anchor: Resilience, Readiness, and the Future of Naval Leadership',
    date: '02 July 2026',
    year: 2026,
    description:
      'A new voluntary program at the U.S. Naval Academy is using Stoic philosophy to help midshipmen build resilience, moral clarity, and inner discipline during Plebe Summer.',
    body: [
      'A new voluntary program at the U.S. Naval Academy is using Stoic philosophy to help midshipmen build resilience, moral clarity, and inner discipline during Plebe Summer. In this episode, we discuss how ancient ideas from Marcus Aurelius, Seneca, Epictetus, and Vice Admiral James Stockdale are being applied to modern military leadership—and why spiritual readiness may need to evolve for an increasingly diverse and less religious force.',
    ],
    articleUrl:
      'https://www.usni.org/magazines/proceedings/2026/june/stoic-anchor-expanding-spiritual-readiness-us-naval-academy',
    trackId: 2352153617,
  },
  {
    slug: 'naval-history-podcast-requiem-flyer',
    title: 'Naval History Podcast: Requiem for a Flyer',
    date: '02 July 2026',
    year: 2026,
    description:
      'Naval History Editor-in-Chief Emily Abdow brings a first-person account from the pages of Naval History to life.',
    trackId: 2355080069,
    navalHistory: true,
  },
  {
    slug: 'naval-history-podcast-midways-unsung-hero-long-fight',
    title: 'Naval History Podcast: Midway’s Unsung Hero: The Long Fight to Honor Codebreaker Joe Rochefort',
    date: '02 July 2026',
    year: 2026,
    description:
      'Host Emily Abdow talks to author Ed Offley about his article on the quest to award the unsung codebreaking hero of the Battle of Midway, Commander Joe Rochefort, the Distinguished Service Medal.',
    trackId: 2352148463,
    navalHistory: true,
  },
  {
    slug: 'ep-505-when-figure-it-out-becomes-bad-leadership',
    title: 'EP. 505: When “Figure It Out” Becomes Bad Leadership',
    date: '01 July 2026',
    year: 2026,
    description:
      'For generations, “A Message to Garcia” has been used to celebrate initiative and getting the job done. But Captain Jonathan Corbin, U.S. Marine Corps, argues that “figure it out” leadership can go too far. This episode explores why true decentralized command requires clear intent, useful context, and a culture where smart questions are encouraged—not punished.',
    trackId: 2351328233,
  },
  {
    slug: 'ep-504-why-wargames-get-cyber-wrong',
    title: 'EP. 504: Why Wargames Get Cyber Wrong',
    date: '22 June 2026',
    year: 2026,
    description:
      'In this episode, Lieutenant Mary Racicot, U.S. Navy, joins the Proceedings Podcast to discuss why joint wargames may be training commanders to misunderstand cyber operations.',
    trackId: 2344159646,
  },
]

export const episodeHref = (episode: Episode) => `/proceedings/podcast/${episode.slug}`

export const episodeBySlug = (slug: string) => episodes.find((ep) => ep.slug === slug)
