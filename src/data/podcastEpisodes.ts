/**
 * Proceedings Podcast episodes, newest first — the archive the podcast page
 * pages through and site search indexes.
 */

export interface Episode {
  title: string
  date: string
  year: number
  description: string
  /** Real SoundCloud track ID from soundcloud.com/naval-institute */
  trackId: number
  /** Naval History Podcast episodes (distinct show art comes through the embed) */
  navalHistory?: boolean
}

export const episodes: Episode[] = [
  {
    title: 'EP. 510: News Update—Navy Budget, Shipbuilding, and Operation Epic Fury',
    date: '31 July 2026',
    year: 2026,
    description:
      "Bill Hamblet, Sam LaGrone, and Brian O'Rourke talk about the Navy's budget, shipbuilding, Operation Epic Fury, and recruiting and retention.",
    trackId: 2372873876,
  },
  {
    title: "EP. 509: Razor's Edge: New Shaving Policy Could Cost the Navy Sailors",
    date: '24 July 2026',
    year: 2026,
    description:
      "Host Bill Hamblet interviews John Cordle about the Navy's new shaving policy and its potential impact on sailors affected by pseudofolliculitis barbae (PFB). They discuss the medical condition, readiness, retention, leadership, and whether changes to grooming standards could unintentionally affect recruiting, careers, and the fleet's overall effectiveness.",
    trackId: 2367305228,
  },
  {
    title: 'EP. 508: Lessons from F-35 Accidents and Naval Aviation Safety',
    date: '15 July 2026',
    year: 2026,
    description:
      'Host Bill Hamblet sits down with Captain Robert Niewoehner, U.S. Navy (Retired), and Jefferson D. Grubb, head of the Operations Research Division at the Naval Safety Command, to examine lessons from recent F-35 mishaps, the evolution of naval aviation safety, and how institutional learning can help build a safer, stronger fleet.',
    trackId: 2361298835,
  },
  {
    title: 'Patriots for Hire? The Privateers of 1776',
    date: '09 July 2026',
    year: 2026,
    description:
      'This episode explores the story of the privateer Oliver Cromwell, Captain Joseph Lee, and the high-risk business of Revolutionary War privateering.',
    trackId: 2356336499,
    navalHistory: true,
  },
  {
    title: 'EP. 507: The Future of Navy Recruiting and Retention with the Hon. Ben Kohlmann, ASN M&RA',
    date: '09 July 2026',
    year: 2026,
    description:
      'Host Bill Hamblet talks with the Honorable Ben Kohlmann, Assistant Secretary of the Navy for Manpower and Reserve Affairs, about the future of the fleet.',
    trackId: 2356349657,
  },
  {
    title: 'EP. 506: The Stoic Anchor: Resilience, Readiness, and the Future of Naval Leadership',
    date: '02 July 2026',
    year: 2026,
    description:
      'A new voluntary program at the U.S. Naval Academy is using Stoic philosophy to help midshipmen build resilience, moral clarity, and inner discipline during Plebe Summer.',
    trackId: 2352153617,
  },
  {
    title: 'Naval History Podcast: Requiem for a Flyer',
    date: '02 July 2026',
    year: 2026,
    description:
      'Naval History Editor-in-Chief Emily Abdow brings a first-person account from the pages of Naval History to life.',
    trackId: 2355080069,
    navalHistory: true,
  },
  {
    title: 'EP. 505: When “Figure It Out” Becomes Bad Leadership',
    date: '01 July 2026',
    year: 2026,
    description:
      'For generations, “A Message to Garcia” has been used to celebrate initiative and getting the job done. But Captain Jonathan Corbin, U.S. Marine Corps, argues that “figure it out” leadership can go too far. This episode explores why true decentralized command requires clear intent, useful context, and a culture where smart questions are encouraged—not punished.',
    trackId: 2351328233,
  },
  {
    title: "Naval History Podcast: Midway's Unsung Hero: The Long Fight to Honor Codebreaker Joe Rochefort",
    date: '02 July 2026',
    year: 2026,
    description:
      'Host Emily Abdow talks to author Ed Offley about his article on the quest to award the unsung codebreaking hero of the Battle of Midway, Commander Joe Rochefort, the Distinguished Service Medal.',
    trackId: 2352148463,
    navalHistory: true,
  },
  {
    title: 'EP. 504: Why Wargames Get Cyber Wrong',
    date: '22 June 2026',
    year: 2026,
    description:
      'In this episode, Lieutenant Mary Racicot, U.S. Navy, joins the Proceedings Podcast to discuss why joint wargames may be training commanders to misunderstand cyber operations.',
    trackId: 2344159646,
  },
]
