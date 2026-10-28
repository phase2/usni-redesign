import imgGeneralPrize from '@/assets/images/essay-contest-general-prize-2026.webp'
import imgLeadership from '@/assets/images/essay-contest-leadership-2026.webp'
import imgPhotoContest from '@/assets/images/essay-contest-photo-2026.jpg'
import { pastEssayContests } from './essayContestsPast'

/**
 * Essay contest content, transcribed from the current usni.org essay contest
 * pages. The live pages present everything — deadline, word limit, prizes,
 * eligibility — as undifferentiated prose partway down a long page, so the
 * shape here deliberately pulls the decision-making facts (deadline, word
 * limit, top prize, who may enter) out of the body copy and into named fields
 * the templates can surface up front.
 */

export type ContestStatus = 'open' | 'closing-soon' | 'closed'

export interface EssayContestPrize {
  place: string
  amount: string
}

export interface EssayContestWinner {
  prize: string
  title: string
  name: string
  /** The winning essay as published, where the live page links it. */
  href?: string
}

/** One year's winners for a contest (or one division of it). */
export interface EssayContestWinnerGroup {
  label: string
  funding?: string
  winners: EssayContestWinner[]
}

/**
 * A titled run of body content. Rendered in field order: paragraphs, then the
 * bullet lead-in and bullets, then any closing paragraphs — so a block whose
 * point is its list (judging criteria) can still end on a note.
 */
export interface EssayContestBlock {
  heading: string
  paragraphs?: string[]
  bulletsLead?: string
  bullets?: string[]
  closingParagraphs?: string[]
}

export interface EssayContestContact {
  label: string
  value: string
  href?: string
}

export interface EssayContest {
  slug: string
  year: string
  /** Full contest name, without the year. */
  title: string
  /** Division qualifier for multi-track contests, e.g. "Midshipmen and Cadets". */
  division?: string
  /** Compact label for sub-nav and breadcrumbs. */
  navLabel: string
  href: string
  image: string
  imageAlt: string
  /** Wide banner art. When set, the page uses the large split photo hero. */
  heroImage?: string
  heroImageAlt?: string
  /**
   * Which side the hero's navy panel sits on. Defaults to the right; set it per
   * contest where the banner's subject would otherwise end up behind the panel.
   */
  heroPanelSide?: 'left' | 'right'
  status: ContestStatus
  /** One-sentence pitch used on cards and in the hero. */
  summary: string
  /** Optional scene-setting paragraphs above "The Challenge". */
  intro?: string[]
  deadline: string
  /** ISO form, for sorting and for <time dateTime>. */
  deadlineISO: string
  /** Absent on contests that don't take essays, e.g. the photo contest. */
  wordLimit?: string
  /** Numeric form of wordLimit, so the submission form can validate against it. */
  wordLimitMax?: number
  /**
   * Stands in for the word-limit stat on contests that have none, so the cards
   * and the entry sidebar keep three comparable facts across every contest.
   */
  entryStat?: { label: string; shortLabel: string; value: string }
  /** The live site's submission endpoint, quoted in the guidelines copy. */
  submitUrl: string
  /**
   * What the entrant uploads. Drives the shared submission form: an essay entry
   * asks for a word count and a Word document, a photo entry for image files.
   * Defaults to 'essay'.
   */
  entryKind?: 'essay' | 'photo'
  /** Entry CTA wording, where "Submit Your Essay" doesn't fit. */
  submitLabel?: string
  eligibility: string[]
  /** Heading over `challenge`, where "The Challenge" doesn't fit the contest. */
  challengeHeading?: string
  challenge: {
    paragraphs: string[]
    bulletsLead?: string
    bullets?: string[]
  }
  submissionGuidelines: string[]
  prizes: EssayContestPrize[]
  /** Non-cash awards and publication commitments. */
  prizeExtras?: string[]
  blocks: EssayContestBlock[]
  fundedBy?: string[]
  /** The live pages vary between "Funded by" and "Supported by". */
  fundedByLabel?: string
  contacts?: EssayContestContact[]
  previousWinners?: EssayContestWinnerGroup[]
  /** A closed edition's own winners — the live page's Selected Submissions. */
  winners?: EssayContestWinner[]
}

/** Every contest takes entries through the shared form on this site. */
export function isPhotoEntry(contest: EssayContest): boolean {
  return contest.entryKind === 'photo'
}

/** The open edition of a closed contest's series, if one is running now. */
export function currentEdition(contest: EssayContest): EssayContest | undefined {
  return essayContests.find((c) => c.title === contest.title && c.status !== 'closed')
}

// ── Contests ────────────────────────────────────────────────────────────────

/**
 * The contests open for entry right now, transcribed from their live pages
 * (captured 13 August 2026). Contests whose deadlines have passed come off this
 * list — their editions stay reachable through `essayContestSeries` and the
 * archive, so a closed contest is history rather than a dead card here.
 */
export const essayContests: EssayContest[] = [
  {
    slug: 'general-prize',
    year: '2026',
    title: 'General Prize Essay Contest',
    navLabel: 'General Prize',
    href: '/essay-contests/general-prize',
    image: imgGeneralPrize,
    imageAlt: 'A sailor turning a helicopter rotor blade on a flight deck in heavy haze',
    heroImage: imgGeneralPrize,
    heroImageAlt: 'A sailor turning a helicopter rotor blade on a flight deck in heavy haze',
    status: 'open',
    summary:
      'The Sea Services are rethinking how to address strategic, operational, and tactical challenges and the way in which they will fight.',
    deadline: '31 October 2026',
    deadlineISO: '2026-10-31',
    wordLimit: '3,000 words',
    wordLimitMax: 3000,
    submitUrl: 'https://www.usni.org/genessay',
    eligibility: [
      'Open to all contributors — active-duty military, reservists, veterans, and civilians.',
    ],
    challenge: {
      paragraphs: [
        'The Sea Services are rethinking how to address strategic, operational, and tactical challenges and the way in which they will fight.',
      ],
      bulletsLead:
        'Essays may address any topic that bears on the missions or capabilities of the Navy, Marine Corps, or Coast Guard. Some issues to consider could include:',
      bullets: [
        'How are new technologies, including robotic and autonomous systems, AI, and directed energy weapons, changing the character of war and how can the Sea Services adapt faster than adversaries?',
        'How can the Sea Services quickly and more affordably develop, procure, and field needed capabilities?',
        'How can the United States and its allies deter China and/or Russia from coercive action?',
        'What should the U.S. nuclear posture and strategy be to deter competitors along the continuum of conflict?',
        'What reforms in education and training would advance the services?',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 3,000 words, excluding footnotes, endnotes, and sources. Include word count on the title page of the essay.',
      'Essays are judged in the blind. Do not include author name(s) on the title page or within the essay.',
      'Submit essay as a Word document at usni.org/genessay no later than 31 October 2026.',
      'Essays must be original and not published (online or in print) or being considered for publication elsewhere.',
    ],
    prizes: [
      { place: 'First Prize', amount: '$6,000' },
      { place: 'Second Prize', amount: '$3,000' },
      { place: 'Third Prize', amount: '$2,000' },
    ],
    blocks: [
      {
        heading: 'Selection Process',
        paragraphs: [
          'Proceedings staff members will evaluate every essay and screen the top essays to the Naval Institute’s Editorial Board composed of serving Sea Service professionals.',
        ],
      },
      {
        heading: 'Announcement of the Winners',
        paragraphs: [
          'The winning essays will be published in Proceedings and on the Naval Institute website. The winners will be recognized at a future Naval Institute event.',
        ],
      },
    ],
    fundedBy: ['Andrew and Barbara Taylor'],
  },

  {
    slug: 'leadership',
    year: '2026',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/leadership',
    image: imgLeadership,
    imageAlt: 'Two student naval aviators walking a flight line past parked training aircraft',
    heroImage: imgLeadership,
    heroImageAlt: 'Two student naval aviators walking a flight line past parked training aircraft',
    // The two aviators sit right of centre — a right-hand panel would cover them.
    heroPanelSide: 'left',
    status: 'open',
    summary:
      'Leadership and character in the U.S. Sea Services, from the perspective of tomorrow’s leaders — the junior officer’s view.',
    deadline: '30 November 2026',
    deadlineISO: '2026-11-30',
    wordLimit: '2,000 words',
    wordLimitMax: 2000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [
      'Junior officers (O-4 and below) from the U.S. Navy, Marine Corps, and Coast Guard.',
    ],
    challenge: {
      paragraphs: [
        'The Leadership Essay Contest focuses on the roles of leadership and character in the U.S. Sea Services from the perspective of tomorrow’s leaders. Junior officers (O-4 and below) from the U.S. Navy, Marine Corps, and Coast Guard are eligible to participate.',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 2,000 words maximum (excludes endnotes/resources).',
      'Include word count on title page of essay, but do not include author name(s) on the title page or within the essay.',
      'Essays are judged in the blind.',
      'Submit essay as a Word document at usni.org/leadershipessay by 30 November 2026.',
      'Essay must be original and not previously published (online or in print) or being considered for publication elsewhere.',
    ],
    prizes: [
      { place: 'First Prize', amount: '$5,000' },
      { place: 'Second Prize', amount: '$2,500' },
      { place: 'Third Prize', amount: '$1,500' },
    ],
    blocks: [
      {
        heading: 'Selection Process',
        paragraphs: [
          'The Proceedings staff members will evaluate every essay and screen the top essays to a special Essay Selection Committee of at least six members who will include two members of the Naval Institute’s Editorial Board and four subject matter experts.',
        ],
      },
      {
        heading: 'Announcement of the Winners',
        paragraphs: ['Winners will be published in print or online in future editions of Proceedings.'],
      },
    ],
    fundedBy: ['Drs. Jack and Jennifer London Charitable Foundation'],
    fundedByLabel: 'Supported by',
  },

  {
    slug: 'naval-maritime-photo',
    year: '2026',
    title: 'Naval and Maritime Photo Contest',
    navLabel: 'Photo Contest',
    href: '/essay-contests/naval-maritime-photo',
    image: imgPhotoContest,
    imageAlt: 'An overhead view of an icebreaker cutting a channel through broken sea ice',
    heroImage: imgPhotoContest,
    heroImageAlt: 'An overhead view of an icebreaker cutting a channel through broken sea ice',
    // The ship sits right of centre, where a right-hand panel would clip it.
    heroPanelSide: 'left',
    status: 'open',
    summary:
      'Photography has enhanced the pages of Proceedings, bringing the written word to life, for nearly 100 years.',
    deadline: '30 September 2026',
    deadlineISO: '2026-09-30',
    // Photographs, not prose — this stands in for the word-limit stat.
    entryStat: { label: 'Entries', shortLabel: 'Entries', value: '5 max' },
    submitUrl: 'https://get.usni.org/2026_nam_photo_contest-4',
    entryKind: 'photo',
    submitLabel: 'Submit Your Photos',
    eligibility: [
      'All amateur and professional photographers.',
      'Any individual, military or civilian, is eligible to enter.',
    ],
    // Photographs, not an argument — "The Challenge" would misdescribe it.
    challengeHeading: 'About the Contest',
    challenge: {
      paragraphs: [
        'Photography has enhanced the pages of Proceedings, bringing the written word to life, for nearly 100 years. Again this year, the Naval Institute invites naval photographers to enter their best images in the Naval and Maritime Photo Contest. The requirements are simple: photographs can cover any subject and should pertain to the Navy, Marine Corps, Coast Guard, Merchant Marine, or the sea itself. Any individual, military or civilian, is eligible to enter.',
        'Cash prizes are offered for the first-, second-, and third-prize winners, but the Naval Institute thanks all those who submit to the contest. As one of the first contest prize winners wrote, “Believe it or not, individual recognition means more to Navy photographers than does money.”',
      ],
    },
    submissionGuidelines: [
      'Subject: all naval or maritime imagery not previously published (exception: Defense Visual Information Distribution Service [DVIDS]).',
      'High-resolution digital photo, with no AI or photo manipulation except color enhancement and cropping.',
      'Minimum of 300 dpi preferred, tiff or jpg.',
      'Maximum of five submissions per person.',
      'To submit entries visit get.usni.org/2026_nam_photo_contest-4 no later than 30 September 2026.',
    ],
    prizes: [
      { place: 'First Prize', amount: '$500' },
      { place: 'Second Prize', amount: '$250' },
      { place: 'Third Prize', amount: '$100' },
    ],
    prizeExtras: [
      'Each cash prize comes with a U.S. Naval Institute membership.',
      'The winning and runner-up photos will be featured in Proceedings and on usni.org.',
    ],
    blocks: [],
  },
]

/** Open contests first, then the closed editions kept as past-contest samples. */
export function getContest(slug: string): EssayContest {
  const contest = [...essayContests, ...pastEssayContests].find((c) => c.slug === slug)
  if (!contest) throw new Error(`Unknown essay contest slug: ${slug}`)
  return contest
}

/** Full contest name including division, e.g. "CNO Naval History Essay Contest — Rising Historian". */
export function contestFullTitle(contest: EssayContest): string {
  return contest.division ? `${contest.title} — ${contest.division}` : contest.title
}

/**
 * Where a contest's entry CTA goes. Every contest — photo contest included —
 * uses the shared submission form; one page serves them all via this query
 * param. `submitUrl` is the live site's endpoint, kept only for the transcribed
 * guidelines copy that quotes it.
 */
export function essaySubmitPath(contest: EssayContest): string {
  return `/essay-contests/submit?contest=${contest.slug}`
}

/** The third comparable fact on cards and in the entry sidebar. */
export function contestEntryStat(contest: EssayContest): {
  label: string
  shortLabel: string
  value: string
} {
  if (contest.entryStat) return contest.entryStat
  return { label: 'Word limit', shortLabel: 'Length', value: contest.wordLimit ?? '—' }
}

/**
 * Archive listing pre-filtered to one contest's series. A contest's `title`
 * matches its series name in `essayContestSeries`, so the title doubles as the
 * filter term.
 */
export function contestArchivePath(contest: EssayContest): string {
  return `/essay-contests/archive?q=${encodeURIComponent(contest.title)}`
}

/** The archive series matching a contest, for edition counts and year spans. */
export function seriesForContest(contest: EssayContest): EssayContestSeries | undefined {
  return essayContestSeries.find((s) => s.name === contest.title)
}

// ── Landing-page supporting content ─────────────────────────────────────────

export const essayContestsIntro = {
  origin:
    'On 13 June 1878, with Commander Alfred Thayer Mahan as acting Chair, the Naval Institute adopted rules for the first essay contest — the General Prize Essay Contest. This contest continues to this day.',
  count: 'Currently, the Naval Institute sponsors 14 essay contests a year.',
  commitment:
    'The bottom line in all these essay contests is the Naval Institute remains committed to those authors who dare to write to advance the naval profession.',
  note:
    'All the essay contests include publication of the winning essays in Proceedings or Naval History magazine, recognition of the winners at a public event, and cash prizes. See each contest page for specific details — eligibility, word length, and deadlines.',
}

/** The "About" page narrative, transcribed from /essay-contests/about. */
export const essayContestsHistory: string[] = [
  'Almost from the earliest days of the Naval Institute, its essay contests have been one of its most important functions. The idea of having such an event was first proposed by Lieutenant Commander Allan D. Brown, USN, at the 9 May 1878 meeting of the Naval Institute. The Chair at the time, Commander Alfred Thayer Mahan, USN, Vice President of the Naval Institute, appointed as chairman of a committee Commander William T. Sampson, USN, to prepare a prize to be offered to the author of a paper deemed the best out of those submitted.',
  'An essay contest on professional subjects for American naval officers clearly was indicated, but for a young and struggling organization with a total membership of only 250, it was a bold project to undertake. On 13 June 1878, with Commander Mahan again “in the Chair,” Commander Sampson delivered the report of his committee, which was adopted without change. The rules for the essay contest were adopted by resolution “without reference to the Constitution.”',
  'This action created the Naval Institute’s Prize Essay Contest. In 1948, the name changed to the General Prize Essay Contest. For the period of 1985–2007 the name changed to the Arleigh Burke Essay Contest to honor World War II hero and Cold War Navy CNO and Naval Institute President Admiral Arleigh Burke. From 2008–2013, the Naval Institute awarded General Prizes, but these went to authors of Proceedings articles judged as the best in a calendar year.',
  'In 2014, the General Prize Essay Contest came back as generally envisioned by the Naval Institute’s founding fathers. Currently, the Naval Institute sponsors 14 essay contests a year.',
]


/**
 * Every contest series the Institute has run, as listed on the current landing
 * page. Each is a series hub on usni.org listing that contest's yearly
 * editions — `editions` and `years` are those counts, read off the hubs.
 *
 * The live hubs render every edition on one unpaginated page (the General Prize
 * hub is 110 rows), which is why the archive here is a paged results listing.
 */
export interface EssayContestSeries {
  name: string
  slug: string
  /** Number of yearly editions listed on the series hub. */
  editions: number
  /** Year span of those editions, e.g. "2019–2026". Empty when undetermined. */
  years: string
}

export const essayContestSeries: EssayContestSeries[] = [
  { name: 'Anchoring Sea Enterprise Essay Contest', slug: 'anchoring-sea-enterprise-essay-contest', editions: 2, years: '2003–2006' },
  { name: 'CNO Naval History Essay Contest', slug: 'cno-naval-history-essay-contest', editions: 9, years: '2017–2026' },
  { name: 'Coast Guard Essay Contest', slug: 'coast-guard-essay-contest', editions: 8, years: '2019–2026' },
  { name: 'Commander William Earl Fannin Class of 1945 Capstone Essay Contest', slug: 'commander-william-earl-fannin-class-1945-capstone-essay-contest', editions: 12, years: '2011–2025' },
  { name: 'Cutting Edge of Technology Essay Contest', slug: 'cutting-edge-technology-essay-contest', editions: 1, years: '1988' },
  { name: 'Cyber Essay Contest', slug: 'cyber-essay-contest', editions: 3, years: '2016–2018' },
  { name: 'Diversity & Inclusion', slug: 'diversity-inclusion', editions: 4, years: '2021–2024' },
  { name: 'Education and Training Essay Contest', slug: 'education-and-training-essay-contest', editions: 0, years: '' },
  { name: 'Emerging & Disruptive Technologies Essay Contest', slug: 'emerging-disruptive-technologies-essay-contest', editions: 6, years: '2016–2021' },
  { name: 'Enlisted Prize Essay Contest', slug: 'enlisted-prize-essay-contest', editions: 8, years: '2019–2026' },
  { name: 'Faces of the Naval Academy Essay Contest', slug: 'faces-naval-academy-essay-contest', editions: 1, years: '1995' },
  { name: 'Fiction Essay Contest', slug: 'fiction-essay-contest', editions: 3, years: '2020–2022' },
  { name: 'General Prize Essay Contest', slug: 'general-prize-essay-contest', editions: 110, years: '1913–2025' },
  { name: 'Global Defense Burden Essay Contest', slug: 'global-defense-burden-essay-contest', editions: 2, years: '2013–2014' },
  { name: 'Information Dominance Essay Contest', slug: 'information-dominance-essay-contest', editions: 2, years: '2014–2015' },
  { name: 'Information Warfare Essay Contest', slug: 'information-warfare-essay-contest', editions: 4, years: '2020–2023' },
  { name: 'Innovation and Risk Essay Contest', slug: 'innovation-and-risk-essay-contest', editions: 1, years: '2015' },
  { name: 'Innovation for Sea Power Essay Contest', slug: 'innovation-sea-power-essay-contest', editions: 1, years: '2025' },
  { name: 'International Navies Essay Contest', slug: 'international-navies-essay-contest', editions: 0, years: '' },
  { name: 'Leadership Essay Contest', slug: 'leadership-essay-contest', editions: 13, years: '2013–2025' },
  { name: 'Lieutenant General John A. Lejeune Writing Award', slug: 'lieutenant-general-john-lejeune-writing-award', editions: 7, years: '2019–2025' },
  { name: 'Marine Corps Essay Contest', slug: 'marine-corps-essay-contest', editions: 8, years: '2019–2026' },
  { name: 'Midshipmen and Cadets Essay Contest', slug: 'midshipmen-and-cadets-essay-contest', editions: 4, years: '2019–2022' },
  { name: 'Naval and Maritime Photo Contest', slug: 'naval-and-maritime-photo-contest', editions: 5, years: '2020–2025' },
  { name: 'Naval Aviation Essay Contest', slug: 'naval-aviation-essay-contest', editions: 1, years: '1986' },
  { name: 'Naval History Essay Contest', slug: 'naval-history-essay-contest', editions: 5, years: '2014–2018' },
  { name: 'Naval Intelligence Essay Contest', slug: 'naval-intelligence-essay-contest', editions: 7, years: '2019–2025' },
  { name: 'Naval Mine Warfare Essay Contest', slug: 'naval-mine-warfare-essay-contest', editions: 14, years: '2013–2026' },
  { name: 'Naval Reserve Essay Contest', slug: 'naval-reserve-essay-contest', editions: 1, years: '1990' },
  { name: 'NPS Foundation/U.S. Naval Institute Annual Essay Contest Award', slug: 'nps-foundationus-naval-institute-annual-essay-contest-award', editions: 8, years: '2019–2026' },
  { name: 'Reserve Forces Essay Contest', slug: 'reserve-forces-essay-contest', editions: 1, years: '1984' },
  { name: 'Robotics Essay Contest', slug: 'robotics-essay-contest', editions: 1, years: '2010' },
  { name: 'Submarine and Antisubmarine Warfare Essay Contest', slug: 'submarine-and-antisubmarine-warfare-essay-contest', editions: 1, years: '1987' },
  { name: 'The Future of Naval Warfare Essay Contest', slug: 'future-naval-warfare-essay-contest', editions: 2, years: '2023–2024' },
  { name: 'The Principles of War Essay Contest', slug: 'principles-war-essay-contest', editions: 1, years: '2005' },
  { name: 'U.S. Naval Institute/U.S. Naval War College Non-Resident Essay Contest', slug: 'us-naval-instituteus-naval-war-college-non-resident-essay-contest', editions: 2, years: '2025–2026' },
  { name: 'Unmanned Maritime Systems Essay Contest', slug: 'unmanned-maritime-systems-essay-contest', editions: 1, years: '' },
  { name: 'Warfighting Essay Contest', slug: 'warfighting-essay-contest', editions: 0, years: '' },
]
