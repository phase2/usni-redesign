/**
 * The editorial staff of Proceedings and Naval History, as one masthead.
 *
 * The live site keeps two directories, /proceedings-magazine/contact-us (15
 * people) and /naval-history-magazine/contact-us, and nearly everyone on the
 * second is on the first, often under a different title. Here each person
 * appears once, with a title per magazine, and `mastheads` records which live
 * directory listed them so either magazine's staff can be shown on its own.
 *
 * Corrections to the live copy: the Naval History directory mails Bill Hamblet
 * at Bill Bray's address (bbray@); he is given his own (bhamblet@).
 */

export type Magazine = 'proceedings' | 'naval-history'

export const magazineNames: Record<Magazine, string> = {
  proceedings: 'Proceedings',
  'naval-history': 'Naval History',
}

export interface StaffRole {
  title: string
  /**
   * The magazines the title applies to. Empty for an Institute title (CEO and
   * Publisher), which is shown without a magazine.
   */
  magazines: Magazine[]
}

export interface StaffMember {
  name: string
  roles: StaffRole[]
  email?: string
  /** Leadership profile, where the person has one. */
  profileHref?: string
  /** The magazine directories that list this person on the live site. */
  mastheads: Magazine[]
}

export interface StaffGroup {
  id: string
  title: string
  people: StaffMember[]
}

const BOTH: Magazine[] = ['proceedings', 'naval-history']

export const editorialStaff: StaffGroup[] = [
  {
    id: 'leadership',
    title: 'Leadership',
    people: [
      {
        name: 'RADM Raymond A. Spicer, USN (Ret.)',
        roles: [{ title: 'CEO and Publisher', magazines: [] }],
        profileHref: '/about/leadership/radm-ray-spicer-usn-ret',
        mastheads: ['naval-history'],
      },
      {
        name: 'James Stavridis',
        roles: [{ title: 'Chair', magazines: ['proceedings'] }],
        mastheads: ['proceedings'],
      },
      {
        name: 'Bill Hamblet',
        roles: [
          { title: 'Editor-in-Chief', magazines: ['proceedings'] },
          { title: 'Executive Vice President, Periodicals', magazines: [] },
        ],
        email: 'bhamblet@usni.org',
        profileHref: '/about/leadership/capt-bill-hamblet-usn-ret',
        mastheads: BOTH,
      },
      {
        name: 'Bill Bray',
        roles: [{ title: 'Deputy Editor-in-Chief', magazines: ['proceedings'] }],
        email: 'bbray@usni.org',
        mastheads: BOTH,
      },
      {
        name: 'Emily Abdow',
        roles: [{ title: 'Editor-in-Chief', magazines: ['naval-history'] }],
        email: 'eabdow@usni.org',
        mastheads: BOTH,
      },
    ],
  },
  {
    id: 'editors',
    title: 'Editors',
    people: [
      {
        name: "Brian O'Rourke",
        roles: [{ title: 'Managing Editor', magazines: ['proceedings'] }],
        email: 'borourke@usni.org',
        mastheads: ['proceedings'],
      },
      {
        name: 'Julie Olver',
        roles: [
          { title: 'Managing Editor', magazines: ['naval-history'] },
          { title: 'Senior Editor', magazines: ['proceedings'] },
        ],
        email: 'jolver@usni.org',
        mastheads: BOTH,
      },
      {
        name: 'Jennifer Pompi',
        roles: [
          { title: 'Senior Editor', magazines: ['naval-history'] },
          { title: 'Editor and Book Review Editor', magazines: ['proceedings'] },
        ],
        email: 'jpompi@usni.org',
        mastheads: BOTH,
      },
      {
        name: 'Joel Weickgenant',
        roles: [{ title: 'Editor', magazines: BOTH }],
        email: 'jweickgenant@usni.org',
        mastheads: BOTH,
      },
      {
        name: 'Iris Noth',
        roles: [{ title: 'Editor', magazines: ['proceedings'] }],
        email: 'inoth@usni.org',
        mastheads: ['proceedings'],
      },
      {
        name: 'Liese Doherty',
        roles: [{ title: 'Editorial Project Coordinator', magazines: BOTH }],
        email: 'ldoherty@usni.org',
        mastheads: BOTH,
      },
    ],
  },
  {
    id: 'design-and-digital',
    title: 'Design and Digital',
    people: [
      {
        name: 'Karen Eskew',
        roles: [{ title: 'Design Director', magazines: BOTH }],
        email: 'keskew@usni.org',
        mastheads: BOTH,
      },
      {
        name: 'Candace Daniels',
        roles: [{ title: 'Graphic Artist', magazines: BOTH }],
        email: 'cdaniels@usni.org',
        mastheads: BOTH,
      },
      {
        name: 'Heather Legg',
        roles: [
          { title: 'Director of Digital Strategy', magazines: ['proceedings'] },
          { title: 'Digital Content Manager', magazines: ['naval-history'] },
        ],
        email: 'hlegg@usni.org',
        mastheads: BOTH,
      },
      {
        name: 'Moon Pich',
        roles: [{ title: 'Video Content Editor', magazines: ['proceedings'] }],
        email: 'mpich@usni.org',
        mastheads: ['proceedings'],
      },
    ],
  },
  {
    id: 'contributing-editors',
    title: 'Contributing Editors',
    people: [
      {
        name: 'CAPT Dave Adams, USN (Ret.)',
        roles: [{ title: 'Contributing Editor', magazines: ['proceedings'] }],
        mastheads: ['proceedings'],
      },
      {
        name: 'LCDR Thomas J. Cutler, USN (Ret.)',
        roles: [{ title: 'Contributing Editor', magazines: ['naval-history'] }],
        email: 'tcutler@usni.org',
        mastheads: ['naval-history'],
      },
      {
        name: 'Richard G. Latture',
        roles: [{ title: 'Contributing Editor', magazines: ['naval-history'] }],
        mastheads: ['naval-history'],
      },
      {
        name: 'Eric Mills',
        roles: [{ title: 'Contributing Editor', magazines: ['naval-history'] }],
        mastheads: ['naval-history'],
      },
      {
        name: 'Paul Stillwell',
        roles: [{ title: 'Contributing Editor', magazines: ['naval-history'] }],
        mastheads: ['naval-history'],
      },
    ],
  },
]
