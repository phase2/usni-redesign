import type { EssayContest } from './essayContests'

/**
 * Closed contest editions with a page of their own — the Leadership Essay
 * Contest, 2017–2025, as samples of the past-contest template. Transcribed from
 * the live pages (test-usni3.pantheonsite.io, captured 27 October 2026); the
 * deadlines and summaries are the archive teasers' (`essayArchive.ts`).
 *
 * A past edition keeps its call for entries as it ran, in the same fields as
 * an open contest, plus `winners`: the live page's "Selected Submissions"
 * table. The call varied over the years — 2017–2019 have their own headings
 * (Word Length, Prior Publication, The Reward…), carried as `blocks`, with the
 * prize figures pulled into `prizes` and The Reward's other lines into
 * `prizeExtras`. None has a separate Eligibility list.
 *
 * Winning essays link to their Proceedings articles on usni.org. The live 2024
 * table misspells its first prize "Cluelessnesss"; corrected.
 */

const images = import.meta.glob('../assets/images/essay-contests-past/leadership-*.jpg', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

function image(year: string): string {
  return images[`../assets/images/essay-contests-past/leadership-${year}.jpg`]
}

export const pastEssayContests: EssayContest[] = [
  {
    slug: 'leadership-2025',
    year: '2025',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2025/2025-leadership-essay-contest',
    image: image('2025'),
    imageAlt: 'A naval aviator in a flight suit buckles his survival vest in a ready room lined with flight helmets.',
    heroImage: image('2025'),
    heroImageAlt: 'A naval aviator in a flight suit buckles his survival vest in a ready room lined with flight helmets.',
    status: 'closed',
    summary: 'Leadership in the Sea Services: The Junior Officer’s Perspective',
    deadline: '30 November 2025',
    deadlineISO: '2025-11-30',
    wordLimit: '2,000 words',
    wordLimitMax: 2000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'The Leadership Essay Contest focuses on the roles of leadership and character in the U.S. Sea Services from the perspective of tomorrow’s leaders. Junior officers (LCDR/Major and below) from the U.S. Navy, Marine Corps, and Coast Guard are eligible to participate.',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 2,000 words maximum (excludes endnotes/resources).',
      'Include word count on title page of essay, but do not include author name(s) on title page or within the essay.',
      'Essays are judged in the blind.',
      'Submit essay as a Word document at www.usni.org/leadershipessay by 30 November 2025.',
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
        paragraphs: [
          'Winners will be published in future issues of Proceedings.',
        ],
      },
    ],
    fundedBy: ['Drs. Jack and Jennifer London Charitable Foundation'],
    fundedByLabel: 'Supported by',
  },
  {
    slug: 'leadership-2024',
    year: '2024',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2024/2024-leadership-essay-contest',
    image: image('2024'),
    imageAlt: 'A sailor in a ball cap stands watch on a darkened bridge, looking out to sea.',
    heroImage: image('2024'),
    heroImageAlt: 'A sailor in a ball cap stands watch on a darkened bridge, looking out to sea.',
    status: 'closed',
    summary: 'Leadership in the Sea Services: The Junior Officers’ Perspective',
    deadline: '30 November 2024',
    deadlineISO: '2024-11-30',
    wordLimit: '2,000 words',
    wordLimitMax: 2000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'The Leadership Essay Contest focuses on the roles of leadership and character in the U.S. Sea Services from the perspective of tomorrow’s leaders. Junior officers (LCDR/Major and below) from the U.S. Navy, Marine Corps, and Coast Guard are eligible to participate.',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 2,000 words maximum (excludes endnotes/resources).',
      'Include word count on title page of essay, but do not include author name(s) on title page or within the essay.',
      'Essays are judged in the blind.',
      'Submit essay as a Word document at www.usni.org/leadershipessay by 30 November 2024.',
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
        paragraphs: [
          'Winners will be published in a future issue of Proceedings.',
        ],
      },
    ],
    fundedBy: ['Drs. Jack and Jennifer London Charitable Foundation'],
    fundedByLabel: 'Supported by',
    winners: [
      { prize: 'First Prize', title: 'Division Officers Can Conquer Cluelessness', name: 'Lieutenant (Junior Grade) Ezra Haddock, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2025/may/division-officers-can-conquer-cluelessness' },
      { prize: 'Second Prize', title: 'Building Resilience', name: 'Lieutenant Leah Gordon, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2025/june/building-resilience' },
      { prize: 'Third Prize', title: 'Invest in People, Not Perfection', name: 'Lieutenant Logan Barber, U.S. Navy Reserve', href: 'https://www.usni.org/magazines/proceedings/2025/july/invest-people-not-perfection' },
    ],
  },
  {
    slug: 'leadership-2023',
    year: '2023',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2023/2023-leadership-essay-contest',
    image: image('2023'),
    imageAlt: 'A naval officer in service dress blues and combination cover, another officer behind her.',
    heroImage: image('2023'),
    heroImageAlt: 'A naval officer in service dress blues and combination cover, another officer behind her.',
    status: 'closed',
    summary: 'Leadership in the Sea Services: The Junior Officers’ Perspective',
    deadline: '30 November 2023',
    deadlineISO: '2023-11-30',
    wordLimit: '2,000 words',
    wordLimitMax: 2000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'The Leadership Essay Contest focuses on the roles of leadership and character in the U.S. Sea Services from the perspective of tomorrow’s leaders. Junior officers (LCDR/Major and below) from the U.S. Navy, Marine Corps, and Coast Guard are eligible to participate.',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 2,000 words maximum (excludes endnotes/resources)',
      'Include word count on title page of the essay.',
      'Essays are judged in the blind. Do not include author name(s) on title page or within the essay.',
      'Submit essay as a Word document at www.usni.org/leadershipessay by 30 November 2023.',
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
        paragraphs: [
          'Winners will be published in a future issue of Proceedings.',
        ],
      },
    ],
    fundedBy: ['Drs. Jack and Jennifer London Charitable Fund'],
    fundedByLabel: 'Supported by',
    winners: [
      { prize: 'First Prize', title: 'Follow Your Gut?', name: 'Lieutenant Matthew Nagle, U.S. Coast Guard', href: 'https://www.usni.org/magazines/proceedings/2024/may/follow-your-gut' },
      { prize: 'Second Prize', title: 'Don’t Run Faster Than Your Crew', name: 'Lieutenant Nick D. Jabs, U.S. Coast Guard', href: 'https://www.usni.org/magazines/proceedings/2024/june/dont-run-faster-your-crew' },
      { prize: 'Third Prize', title: 'Empower the Midlevel Leader', name: 'Lieutenant Commander Drew Stafford, U.S. Coast Guard', href: 'https://www.usni.org/magazines/proceedings/2024/july/empower-midlevel-leader' },
    ],
  },
  {
    slug: 'leadership-2022',
    year: '2022',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2022/2022-leadership-essay-contest',
    image: image('2022'),
    imageAlt: 'A naval aviator in a flight jacket speaks at a microphone.',
    heroImage: image('2022'),
    heroImageAlt: 'A naval aviator in a flight jacket speaks at a microphone.',
    heroPanelSide: 'left',
    status: 'closed',
    summary: 'Leadership in the Sea Services: The Junior Officers’ Perspective',
    deadline: '30 November 2022',
    deadlineISO: '2022-11-30',
    wordLimit: '2,000 words',
    wordLimitMax: 2000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'The Leadership Essay Contest focuses on the roles of leadership and character in the U.S. Sea Services from the perspective of tomorrow’s leaders. Junior officers (LCDR/Major and below) from the U.S. Navy, Marine Corps, and Coast Guard are eligible to participate.',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 2,000 words maximum, excluding end notes and sources.',
      'Include word count on title page of the essay.',
      'Essays are judged in the blind. Do not include author name(s) on title page or within the essay.',
      'Submit essay as a Word document at www.usni.org/leadershipessay by 30 November 2022.',
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
        paragraphs: [
          'Winners will be published in a future issue of Proceedings.',
        ],
      },
    ],
    fundedBy: ['Dr. Jennifer London in Honor of Dr. Jack London'],
    fundedByLabel: 'Sponsored by',
    winners: [
      { prize: 'First Prize', title: 'Why We Need Junior Officers', name: 'Lieutenant Christopher Knight, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2023/may/why-we-need-junior-officers' },
      { prize: 'Second Prize', title: 'Leadership, Not Liker-Ship, Starts with Authenticity', name: 'Lieutenants Andrew Ray and Kelsey Gray, U.S. Coast Guard', href: 'https://www.usni.org/magazines/proceedings/2023/june/leadership-not-liker-ship-starts-authenticity' },
      { prize: 'Third Prize', title: 'Aides Are More Than Bag Carriers', name: 'Major Lauren Serrano, U.S. Marine Corps', href: 'https://www.usni.org/magazines/proceedings/2023/july/aides-are-more-bag-carriers-0' },
    ],
  },
  {
    slug: 'leadership-2021',
    year: '2021',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2021/2021-leadership-essay-contest',
    image: image('2021'),
    imageAlt: 'An officer in a flight suit speaks into a radio handset on a ship’s bridge.',
    heroImage: image('2021'),
    heroImageAlt: 'An officer in a flight suit speaks into a radio handset on a ship’s bridge.',
    heroPanelSide: 'left',
    status: 'closed',
    summary: 'Leadership in the Sea Services: The Junior Officers’ Perspective',
    deadline: '30 November 2021',
    deadlineISO: '2021-11-30',
    wordLimit: '2,000 words',
    wordLimitMax: 2000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'The Leadership Essay Contest focuses on the roles of leadership and character in the U.S. Sea Services from the perspective of tomorrow’s leaders. Junior officers (LCDR/Major and below)from the U.S. Navy, Marine Corps, and Coast Guard are eligible to participate.',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 2,000 words maximum, excluding end notes and sources.',
      'Include word count on title page of the essay.',
      'Essays are judged in the blind. Do not include author name(s) on title page or within the essay.',
      'Submit essay as a Word document at www.usni.org/leadershipessay by 30 November 2021.',
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
        paragraphs: [
          'Winners will be published in a future issue of Proceedings.',
        ],
      },
    ],
    fundedBy: ['Dr. J. Phillip London'],
    fundedByLabel: 'Sponsored by',
    winners: [
      { prize: 'First Prize', title: 'Leading Through Defeat', name: 'Major Brian Kerg, U.S. Marine Corps', href: 'https://www.usni.org/magazines/proceedings/2022/april/leading-through-defeat' },
      { prize: 'Second Prize', title: 'Eliminate Toxic Leadership', name: 'Lieutenant Commander Courtney Callaghan, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2022/may/eliminate-toxic-leadership' },
      { prize: 'Third Prize', title: 'Trust Starts on the Deckplates', name: 'Lieutenant Commander Brian M. Harrington, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2022/june/trust-starts-deckplates' },
    ],
  },
  {
    slug: 'leadership-2020',
    year: '2020',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2020/2020-leadership-essay-contest',
    image: image('2020'),
    imageAlt: 'Three sailors on a ship’s bridge scan the horizon, two of them through binoculars.',
    heroImage: image('2020'),
    heroImageAlt: 'Three sailors on a ship’s bridge scan the horizon, two of them through binoculars.',
    status: 'closed',
    summary: 'Leadership in the Sea Services: The Junior Officers’ Perspective',
    deadline: '15 November 2020',
    deadlineISO: '2020-11-15',
    wordLimit: '2,000 words',
    wordLimitMax: 2000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'The Leadership Essay Contest focuses on the roles of leadership and character in the U.S. Sea Services from the perspective of tomorrow’s leaders. Junior officers (LCDR/Major and below)from the U.S. Navy, Marine Corps, and Coast Guard are eligible to participate.',
      ],
    },
    submissionGuidelines: [
      'Essays must be no more than 2,000 words maximum, excluding end notes and sources.',
      'Include word count on title page of the essay.',
      'Essays are judged in the blind. Do not include your name on the title page or in the body of the essay.',
      'Submit essay as a Word document at www.usni.org/leadershipessay by 15 November 2020.',
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
          'The Proceedings staff members will evaluate every essay and screen the top essays to a special Essay Selection Committee of at least six members who will include two members of the Naval Institute’s Editorial Board and four subject experts.',
        ],
      },
      {
        heading: 'Announcement of the Winners',
        paragraphs: [
          'Winners will be published in a future issue of Proceedings.',
        ],
      },
    ],
    fundedBy: ['Dr. J. Phillip London and CACI International'],
    fundedByLabel: 'Sponsored by',
    winners: [
      { prize: 'First Prize', title: 'Presume the Best, Get the Best', name: 'Lieutenant Jeff Zeberlein, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2021/march/presume-best-get-best' },
      { prize: 'Second Prize', title: '’Put the Enemy on the Bottom’', name: 'Lieutenant James VandenPlas Jr., U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2021/april/put-enemy-bottom' },
      { prize: 'Third Prize', title: 'Cultivate an Age of Sail Culture', name: 'First Lieutenant Andrew S. Benn, U.S. Marine Corps', href: 'https://www.usni.org/magazines/proceedings/2021/may/cultivate-age-sail-culture' },
    ],
  },
  {
    slug: 'leadership-2019',
    year: '2019',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2019/2019-leadership-essay-contest',
    image: image('2019'),
    imageAlt: 'Two Marines in combat gear, one signaling with a gloved hand.',
    heroImage: image('2019'),
    heroImageAlt: 'Two Marines in combat gear, one signaling with a gloved hand.',
    status: 'closed',
    summary: 'The Challenge: The 2019 Leadership Essay Contest focuses on the roles of leadership and character in America’s Sea Services.',
    deadline: '18 November 2019',
    deadlineISO: '2019-11-18',
    wordLimit: '2,250 words',
    wordLimitMax: 2250,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'Leadership in the Sea Services: The Junior Officers’ Perspective',
        'The 2019 Leadership Essay Contest focuses on the roles of leadership and character in America’s Sea Services.',
      ],
    },
    submissionGuidelines: [
      'Include word count on title page of essay but do not include your name on title page or within the essay.',
      'Provide separate attachment to include biography and complete contact information -- i.e., work, home, and cell phone numbers; and home mailing address.',
    ],
    prizes: [
      { place: 'First Prize', amount: '$5,000' },
      { place: 'Second Prize', amount: '$2,500' },
      { place: 'Third Prize', amount: '$1,500' },
    ],
    blocks: [
      {
        heading: 'Eligibility',
        paragraphs: [
          'Junior officers (LCDR/Major and below) from the U.S. Navy, U.S. Marine Corps, and U.S. Coast Guard are eligible to take part in the essay contest.',
        ],
      },
      {
        heading: 'Length',
        bullets: [
          '2,250 words maximum (excludes footnotes/endnotes/sources).',
        ],
      },
      {
        heading: 'Prior Publication',
        paragraphs: [
          'Essays must be original, not been previously published (online or in print) or being considered for publication elsewhere.',
        ],
      },
      {
        heading: 'Selection Process',
        paragraphs: [
          'The Proceedings staff members will evaluate every essay and screen the top essays to a special Essay Selection Committee of at least six members who will include two member’s of the Naval Institute’s Editorial Board and four subject experts. All essays will be judged in the blind -- i.e., the Proceedings staff members and judges will not know the authors of the essays.',
        ],
      },
      {
        heading: 'Announcement of the Winners',
        paragraphs: [
          'Winners will be announced in the January 2020 Proceedings.',
        ],
      },
    ],
    fundedBy: ['Dr. J. Phillip London and CACI International'],
    fundedByLabel: 'Sponsored by',
    winners: [
      { prize: 'First Prize', title: 'Good Leaders Encourage Failure', name: 'Lieutenant Commander James E. Brokaw, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2020/february/good-leaders-encourage-failure' },
      { prize: 'Second Prize', title: 'Humility is for Leaders', name: 'Lieutenant Commander Steven R. Moffitt, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2020/march/humility-leaders' },
      { prize: 'Third Prize', title: 'Don’t Just ’Shut Up and Row’', name: 'Major Brian Kerg, U.S. Marine Corps', href: 'https://www.usni.org/magazines/proceedings/2020/april/dont-just-shut-and-row' },
    ],
  },
  {
    slug: 'leadership-2018',
    year: '2018',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2018/2018-leadership-essay-contest',
    image: image('2018'),
    imageAlt: 'A Marine in camouflage utilities salutes in front of a formation.',
    heroImage: image('2018'),
    heroImageAlt: 'A Marine in camouflage utilities salutes in front of a formation.',
    status: 'closed',
    summary: 'The 2018 Leadership Essay Contest focuses on the roles of leadership and character in America’s Sea Services.',
    deadline: '31 October 2018',
    deadlineISO: '2018-10-31',
    wordLimit: '2,250 words',
    wordLimitMax: 2250,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'Leadership in the Sea Services: The Junior Officers’ Perspective',
        'The 2018 Leadership Essay Contest focuses on the roles of leadership and character in America’s Sea Services. Junior officers (LCDR/Major and below) from the U.S. Navy, U.S. Marine Corps, and U.S. Coast Guard will be eligible to take part in the essay contest.',
      ],
    },
    submissionGuidelines: [
      'Word count: 2,250 words maximum (excludes endnotes/resources)',
      'Include word count on title page of essay but do not include your name on title page or within the essay.',
      'Note: Your essay must be original, not been previously published (online or in print) or being considered for publication elsewhere.',
    ],
    prizes: [
      { place: 'First Prize', amount: '$5,000' },
      { place: 'Second Prize', amount: '$2,500' },
      { place: 'Third Prize', amount: '$1,500' },
    ],
    prizeExtras: [
      'Some entrants will be awarded a one-year membership in the U.S. Naval Institute.',
    ],
    blocks: [
      {
        heading: 'Winners',
        paragraphs: [
          'Winners will be announced in the January 2019 Proceedings.',
        ],
      },
    ],
    fundedBy: ['Dr. J. Phillip London and CACI International'],
    fundedByLabel: 'A U.S. Naval Institute Program in Partnership with',
    winners: [
      { prize: 'First Prize', title: 'Correct the Navy’s Character Problem', name: 'Lieutenant Commander James J. “Jake” Moore and Lieutenant Commander Michael Silver, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2019/february/correct-navys-character-problem' },
      { prize: 'Second Prize', title: 'Leaders Must Bridge The Digital Divide', name: 'Major Nick Brunetti-Lihach, U.S. Marine Corps', href: 'https://www.usni.org/magazines/proceedings/2019/march/leaders-must-bridge-digital-divide' },
      { prize: 'Third Prize', title: 'Leading Through Unforgiving Seas', name: 'Lieutenant Commander Steven Baldovsky, U.S. Coast Guard', href: 'https://www.usni.org/magazines/proceedings/2019/april/leading-through-unforgiving-seas' },
    ],
  },
  {
    slug: 'leadership-2017',
    year: '2017',
    title: 'Leadership Essay Contest',
    navLabel: 'Leadership',
    href: '/essay-contests/2017/2017-leadership-essay-contest',
    image: image('2017'),
    imageAlt: 'Sailors in uniform crowd the forecastle of the cruiser USS Gettysburg (CG 64) for a command photo.',
    heroImage: image('2017'),
    heroImageAlt: 'Sailors in uniform crowd the forecastle of the cruiser USS Gettysburg (CG 64) for a command photo.',
    status: 'closed',
    summary: 'The 2017 Leadership Essay Contest focuses on the roles of leadership and character in America’s Sea Services.',
    deadline: '30 September 2017',
    deadlineISO: '2017-09-30',
    wordLimit: '3,000 words',
    wordLimitMax: 3000,
    submitUrl: 'https://www.usni.org/leadershipessay',
    eligibility: [],
    challenge: {
      paragraphs: [
        'Leadership in the Sea Services: The Junior Officers’ Perspective',
        'The 2017 Leadership Essay Contest focuses on the roles of leadership and character in America’s Sea Services. All prize winners receive one-year memberships in the U.S. Naval Institute.',
      ],
    },
    submissionGuidelines: [],
    prizes: [
      { place: 'First Prize', amount: '$5,000' },
      { place: 'Second Prize', amount: '$2,500' },
      { place: 'Third Prize', amount: '$1,500' },
    ],
    blocks: [
      {
        heading: 'Eligibility and Submission',
        paragraphs: [
          'Only junior officers, O–4 (LCDR/MAJ) and below, from the U.S. Navy, U.S. Marine Corps, and U.S. Coast Guard will be eligible to take part in the essay contest.',
        ],
      },
      {
        heading: 'Word Length',
        paragraphs: [
          '3,000 words maximum',
        ],
      },
      {
        heading: 'Winners',
        paragraphs: [
          'Winners will be announced in the December 2017 Proceedings.',
        ],
      },
    ],
    fundedBy: ['Dr. J. Phillip London and CACI International'],
    fundedByLabel: 'A U.S. Naval Institute Program in Partnership with',
    winners: [
      { prize: 'First Prize', title: 'We Crafted a Charter', name: 'Lieutenant Commander Matthew Brown, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2017/december/leadership-forum-we-crafted-charter' },
      { prize: 'Second Prize', title: 'Check Your Ego At The Hatch', name: 'Lieutenant Commander Luke Kelvington, U.S. Navy', href: 'https://www.usni.org/magazines/proceedings/2018/january/check-your-ego-hatch' },
      { prize: 'Third Prize', title: 'Great Leaders Are Taught, Not Born', name: 'Ensign Timothy Sargent, U.S. Coast Guard', href: 'https://www.usni.org/magazines/proceedings/2018/february/leadership-forum-great-leaders-are-taught-not-born' },
    ],
  },
]
