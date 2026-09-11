/**
 * The Giving section's sub-pages: the three donor recognition societies and
 * the corporate partnerships page.
 *
 * Transcribed from /donate/donor-recognition, /donate/annual-recognition-societies,
 * /donate/lifetime-giving-societies, /donate/planned-giving-societies, and
 * /donate/corporate-opportunities on the live Drupal site
 * (test-usni3.pantheonsite.io, captured 10 September 2026).
 *
 * All four detail pages are the same Drupal shape — a banner hero, optional
 * introduction, then a run of "promo" blocks, each a 1200x400 banner over a
 * heading, a paragraph, and sometimes a button. That is why one page template
 * (`GivingSubPage`) renders all four from these records rather than four
 * near-identical page files.
 *
 * The four annual societies link to their own pages (`GivingSocietyPage`, from
 * `givingSocietyDonors.ts`), which carry donor courtesies and a year-tabbed
 * listing. The five lifetime societies have only a listing, so they are
 * entries in `givingSubPages` below with a `donorList` and no promos — the same
 * template, no extra page code. The planned society's listing lives on the
 * planned giving page itself, which absorbed both of its children.
 *
 * `image` is a filename in `assets/images/giving-societies/`, resolved through
 * the glob in `givingImage()`.
 */

const images = import.meta.glob('../assets/images/giving-societies/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** Resolve a record's `image` filename to a bundled asset URL. */
export function givingImage(name: string): string | undefined {
  return images[`../assets/images/giving-societies/${name}`]
}

/** One promo block: a wide banner over a heading, a paragraph, and a link. */
export interface GivingPromo {
  title: string
  body: string
  image: string
  imageAlt: string
  ctaLabel?: string
  ctaHref?: string
}

export interface GivingSubPage {
  title: string
  /** Hero deck. All three society pages share the live site's wording. */
  description?: string
  /**
   * Banner art, which selects the photo hero. Only a section front carries one:
   * Corporate Partners and the Donor Recognition landing sit directly in the
   * section nav, while the three society pages below the landing take the
   * site's default light-blue interior header, as every other interior page in
   * Proceedings, Naval History, and Books & Press does.
   */
  heroImage?: string
  heroImageAlt?: string
  /** Trailing breadcrumb crumb, and the page's parent trail. */
  breadcrumbLabel: string
  breadcrumbParent?: { label: string; href: string }
  /** Heading over the introduction, where the page needs one. */
  introHeading?: string
  /** Body copy above the promo blocks. */
  intro?: string[]
  /** Jump link under the introduction, to a section further down the page. */
  introLink?: { label: string; href: string }
  contact?: { name: string; role: string; email: string; phone: string }
  promosHeading?: string
  promosIntro?: string
  promos: GivingPromo[]
  /** Prose sections under the blocks, each its own heading. */
  sections?: { id?: string; heading: string; blocks: GivingBodyBlock[] }[]
  /** A single undated honour roll, where the society has one. */
  donorList?: { heading: string; donors: string[] }
}

/** A paragraph or a sub-heading inside a prose section. */
export interface GivingBodyBlock {
  type: 'p' | 'h3'
  text: string
}

/** Shared across the three society pages, exactly as the live heroes carry it. */
const societiesDeck =
  'We are grateful to all our members and donors who give to the Naval Institute. Annual and lifetime giving societies have been established to recognize and honor donors who contribute philanthropically to the Naval Institute.'

const societiesParent = { label: 'Donor Recognition', href: '/giving/donor-recognition' }

export const givingSubPages: Record<string, GivingSubPage> = {
  annual: {
    title: 'Annual Recognition Societies',
    description: societiesDeck,
    breadcrumbLabel: 'Annual Recognition Societies',
    breadcrumbParent: societiesParent,
    promos: [
      {
        title: 'Alfred Thayer Mahan Society',
        body: 'Annual recognition society for individuals who contribute $25,000 or more within a calendar year.',
        image: 'mahan-society.jpg',
        imageAlt: 'Alfred Thayer Mahan Society',
        ctaLabel: 'View donor courtesies and donor listing',
        ctaHref: '/giving/donor-recognition/annual/alfred-thayer-mahan-society',
      },
      {
        title: 'Stephen B. Luce Society',
        body: 'Annual recognition society for individuals who contribute $10,000 – $24,999 within a calendar year.',
        image: 'luce-society.jpg',
        imageAlt: 'Stephen B. Luce Society',
        ctaLabel: 'View donor courtesies and donor listing',
        ctaHref: '/giving/donor-recognition/annual/stephen-b-luce-society',
      },
      {
        title: '1873 Society',
        body: 'Annual recognition society for individuals who contribute $5,000 – $9,999 within a calendar year.',
        image: '1873-society.jpg',
        imageAlt: '1873 Society',
        ctaLabel: 'View donor courtesies and donor listing',
        ctaHref: '/giving/donor-recognition/annual/1873-society',
      },
      {
        title: 'Leadership Circle',
        body: 'Annual recognition society for individuals who contribute $1,000 – $4,999 within a calendar year.',
        image: 'leadership-circle.jpg',
        imageAlt: 'Leadership Circle',
        ctaLabel: 'View donor courtesies and donor listing',
        ctaHref: '/giving/donor-recognition/annual/leadership-circle',
      },
    ],
  },

  lifetime: {
    title: 'Lifetime Giving Societies',
    description: societiesDeck,
    breadcrumbLabel: 'Lifetime Giving Societies',
    breadcrumbParent: societiesParent,
    promos: [
      {
        title: 'President Theodore Roosevelt Great White Fleet Society',
        body: 'Lifetime recognition society for gifts totaling $5 million or more.',
        image: 'great-white-fleet-society.jpg',
        imageAlt: 'Great White Fleet Society',
        ctaLabel: 'View donor listing',
        ctaHref:
          '/giving/donor-recognition/lifetime/president-theodore-roosevelt-great-white-fleet-society',
      },
      {
        title: 'Rear Admiral John L. Worden Ironclad Society',
        body: 'Lifetime recognition society for gifts totaling $1 million – $4.999 million.',
        image: 'worden-society.jpg',
        imageAlt: 'Worden Society',
        ctaLabel: 'View donor listing',
        ctaHref: '/giving/donor-recognition/lifetime/rear-admiral-john-l-worden-ironclad-society',
      },
      {
        title: 'Admiral Arleigh A. “31-Knot” Burke Society',
        body: 'Lifetime recognition society for gifts totaling $500,000 – $999,999.',
        image: 'burke-society.jpg',
        imageAlt: 'Burke Society',
        ctaLabel: 'View donor listing',
        ctaHref: '/giving/donor-recognition/lifetime/admiral-arleigh-burke-society',
      },
      {
        title: 'General John A. Lejeune Society',
        body: 'Lifetime recognition society for gifts totaling $100,000 – $499,999.',
        image: 'lejeune-society.jpg',
        imageAlt: 'Lejeune Society',
        ctaLabel: 'View donor listing',
        ctaHref: '/giving/donor-recognition/lifetime/general-john-lejeune-society',
      },
      {
        title: 'Captain Joshua James Society',
        body: 'Lifetime recognition society for gifts totaling $25,000 – $99,999.',
        image: 'james-society.jpg',
        imageAlt: 'James Society',
        ctaLabel: 'View donor listing',
        ctaHref: '/giving/donor-recognition/lifetime/captain-joshua-james-society',
      },
    ],
  },

  planned: {
    title: 'Planned Giving Societies',
    description: societiesDeck,
    breadcrumbLabel: 'Planned Giving Societies',
    breadcrumbParent: societiesParent,
    /*
     * The Quill and Sword Society is the only planned giving society, so it is
     * the page's introduction rather than one card in a grid of one. The live
     * page's banner for it is the USNI seal on a plate — a mark, not a
     * photograph, and it carried no information the heading does not.
     */
    introHeading: 'Quill and Sword Society',
    intro: [
      'This society recognizes all individuals who make a planned gift to benefit the Naval Institute. Becoming a member is as simple as establishing a planned gift — a bequest in a will, a charitable gift annuity, a trust, or other deferred gift — to benefit the U.S. Naval Institute.',
    ],
    introLink: {
      label: 'Information about making a planned gift',
      href: '#planned-gift-info',
    },
    promos: [],
    /*
     * Absorbed from /donate/planned-giving-societies/quill-and-sword-society,
     * which the live page reaches through the asterisk footnote. The society
     * has one page's worth of content between them, so it reads as one page.
     */
    sections: [
      {
        id: 'planned-gift-info',
        heading: 'Information About Making a Planned Gift',
        blocks: [
          { type: 'p', text: 'A deferred gift could improve your tax situation now and provide much-needed support to the Naval Institute later, allowing your generosity to benefit others for years to come. The Naval Institute Foundation gratefully accepts bequests, trusts, or other legal forms of planned giving. The State of Maryland has certified the Foundation to administer these financial vehicles.' },
          { type: 'p', text: 'Because charitable giving can have important tax and estate-planning implications, a donor should consult with his attorney, investment advisor, or financial planner before deciding on the nature and size of any deferred gift.' },
          { type: 'p', text: 'The following sample inclusion clauses should be reviewed with your attorney and with regard to your state of residence:' },
          { type: 'h3', text: 'General Purposes Bequest:' },
          { type: 'p', text: 'I hereby give, devise, and bequest (__________ dollars) or (__________ percent of the residue of my estate) to the Naval Institute Foundation, 291 Wood Road, Annapolis, Maryland 21402, for its general purposes.' },
          { type: 'h3', text: 'Specific Purpose Bequest:' },
          { type: 'p', text: 'I hereby give, devise, and bequest (__________ dollars) or (__________ percent of the residue of my estate) to the Naval Institute Foundation, 291 Wood Road, Annapolis, Maryland 21402, to be used only for the following purpose: (state the purpose). If, in the future, it is the opinion of the Board of Directors of the United States Naval Institute that this bequest cannot be usefully applied to such purpose, the Naval Institute may use the same for any purpose that will most nearly accomplish my wishes.' },
          { type: 'h3', text: 'Distribution from Trust:' },
          { type: 'p', text: 'I direct that upon termination of the trust, the Trustee shall distribute (__________ dollars) or (__________ percent of the dissolved trust) to the Naval Institute Foundation, 291 Wood Road, Annapolis, Maryland 21402, for its general purposes.' },
        ],
      },
    ],
    /* Absorbed from /quill-and-sword-society, which the live page links to as
       "View Donor Listing". One undated list, so no year tabs. */
    donorList: {
      heading: 'Donor Listing',
      donors: [
        'LCDR James G. B. Allardice, USCGR',
        'Oliver Ames',
        'ADM Stanley R. Arthur, USN (Ret.)',
        'CAPT Robert M. Barr, USN (Ret.)',
        'Ingrid S. Beach',
        'Rodney B. Benson',
        'Richard G. Bickel, Jr.',
        'Marty J. Bollinger',
        'Carroll C. Brooks',
        'Charles Browne',
        'Charles Burhan',
        'Sheryl Caudry',
        'Jonathan Cohen',
        'Hon. Gordon R. England',
        'LCDR Richard T. Jones, USN (Ret.)',
        'Dr. Joel L. Levine',
        'Hon. Ellen Lord',
        'CAPT Sally C. McElwreath, USN (Ret.)',
        'CAPT Andrew McKane, USN (Ret.)',
        'David A. Moore',
        'David H. Parks',
        'Jack A. Petersen',
        'Conrad B. Richter',
        'Dr. John V. Scholes',
        'MCPO Richard B. Smith, USN (Ret.)',
        'CAPT Edward A. Studzinski, USN (Ret.)',
        'CDR Albert W. Thews, USN',
        'CAPT David Tuma, USN (Ret.)',
        'Steve Waters',
        'CAPT Ronald W. Wetmore, USN (Ret.)',
        'Thomas Wildenberg',
        'MGEN Thomas L. Wilkerson, USMC (Ret.)',
      ],
    },
  },

  corporate: {
    title: 'Corporate Partners',
    breadcrumbLabel: 'Corporate Partners',
    /*
     * Not on the live page, which opens straight into body copy. Added because
     * the paragraph below it is entirely an argument for partnering, and an
     * unlabelled block of prose under a bare page title gives a reader nothing
     * to scan.
     */
    introHeading: 'Why Partner with the Naval Institute',
    intro: [
      'The Naval Institute is a preeminent thought leader with a widely recognized brand. Its media — print and electronic — and conferences play a major role in debates on all naval issues. Corporations that partner with the Naval Institute will show they intend to play a constructive role in the open forum, encouraging and learning from those differing views, demonstrate their commitment to cost-effective, secure solutions for the Navy and Marine Corps, and illustrate their commitment to Sailors and Marines of all ranks.',
    ],
    contact: {
      name: 'Lewis Duncan',
      role: 'Director of Corporate Strategic Partnerships & Advertising',
      email: 'lduncan@usni.org',
      phone: '410-295-1041',
    },
    promosHeading: 'Corporate Philanthropic Involvement',
    promosIntro:
      'The Naval Institute has developed and cultivated a variety of mutually beneficial relationships with corporations over the years. Corporations provide philanthropic support to a myriad of programs including:',
    promos: [
      {
        title: 'Bring the Independent Forum to Life: Conferences and Events',
        body: 'Naval Institute professional conferences bring together preeminent military and civilian leaders, historians and policy-makers to discuss challenges to the naval services and to the Nation. These popular events provide the opportunity for sponsors to position themselves as dedicated supporters of the Navy, Marine Corps, and Coast Guard, and illustrates that the sponsor intends to play a constructive role in timely debate by fostering informed discussion of important naval issues. The Naval Institute also hosts a number of member receptions and special events around the country, giving sponsors other avenues to demonstrate their support for the Sea Services. Underwriting conferences and events provides the sponsor with recognition opportunities in print and online as well as on-site.',
        image: 'corporate-conferences.jpg',
        imageAlt: 'Naval Institute conference attendees',
      },
      {
        title: 'Encourage the Dare Factor: Essay Contests',
        body: 'Essay Contests have been part of the Naval Institute’s fabric since 13 June 1878. On that date, with Commander Alfred Thayer Mahan serving as the chair and vice president of the Naval Institute, Commander William T. Sampson delivered his committee’s proposed rules for the Prize Essay Contest. The proposal was adopted without change, creating the Naval Institute’s first essay contest — now the General Prize Essay Contest. Naval Institute writing competitions have delivered daring, innovative, and stimulating thought — often from contributors who might not previously have seen themselves as writers. And fully 75% of contest entrants are active-duty military professionals. Currently, the Naval Institute sponsors essay contests ranging from the CNO Naval History Essay Contest to the Marine Corps Essay Contest to the Midshipman and Cadet Essay Contest. The bottom line in all these contests is the Institute’s commitment to finding and publishing the best ideas and authors who dare to write to advance the naval profession. With support, the Institute will expand the scope of its essay contests to address critical components of naval warfare and issues specific to each service.',
        image: 'corporate-essay-contests.jpg',
        imageAlt: 'Naval Institute essay contest',
      },
    ],
  },

  /* ── The five lifetime societies: a donor listing each ──────────────────── */

  'president-theodore-roosevelt-great-white-fleet-society': {
    title: 'President Theodore Roosevelt Great White Fleet Society',
    description: 'Lifetime recognition society for gifts totaling $5 million or more.',
    breadcrumbLabel: 'President Theodore Roosevelt Great White Fleet Society',
    breadcrumbParent: { label: 'Lifetime Giving Societies', href: '/giving/donor-recognition/lifetime' },
    promos: [],
    donorList: {
      heading: 'Donor Listing',
      donors: [
        'Crawford Taylor Foundation',
        'John J. Schiff Family',
        'Andrew C. Taylor and Barbara B. Taylor',
      ],
    },
  },
  'rear-admiral-john-l-worden-ironclad-society': {
    title: 'Rear Admiral John L. Worden Ironclad Society',
    description: 'Lifetime recognition society for gifts totaling $1 million – $4.999 million.',
    breadcrumbLabel: 'Rear Admiral John L. Worden Ironclad Society',
    breadcrumbParent: { label: 'Lifetime Giving Societies', href: '/giving/donor-recognition/lifetime' },
    promos: [],
    donorList: {
      heading: 'Donor Listing',
      donors: [
        'CDR Robert C. and Marjorie N. Austin*',
        'Bloomberg Philanthropies',
        'Hon. Gordon R. England',
        'William S. Hasler*',
        'Stanley S. Hubbard',
        'Huntington Ingalls Industries',
        'CAPT H. F. Lenfest, USNR (Ret.)*',
        'Lockheed Martin Corporation',
        'David and Barbara Parks',
        'Pritzker Military Foundation',
        'Jack C. Taylor*',
        'USAA',
        'William M. Wood Foundation',
      ],
    },
  },
  'admiral-arleigh-burke-society': {
    title: 'Admiral Arleigh A. “31-Knot” Burke Society',
    description: 'Lifetime recognition society for gifts totaling $500,000 – $999,999.',
    breadcrumbLabel: 'Admiral Arleigh A. “31-Knot” Burke Society',
    breadcrumbParent: { label: 'Lifetime Giving Societies', href: '/giving/donor-recognition/lifetime' },
    promos: [],
    donorList: {
      heading: 'Donor Listing',
      donors: [
        'Boeing Defense Group',
        'CAPT Roger E. Ekman, USN (Ret.)*',
        'Thomas J. Furlong',
        'General Dynamics Corporation',
        'CAPT Harry W. Konkel, USN (Ret.)*',
        'Leidos Security - One Team',
        'Drs. Jack* and Jennifer London Charitable Fund',
        'McCormick Tribune Foundation',
        'Naval Historical Foundation',
        'Northrop Grumman',
        'Frederick W. Smith',
        'O. Jay Tomson',
        'Sandra and Stephen M. Waters',
        'Michael M. Wiseman, Esq.',
      ],
    },
  },
  'general-john-lejeune-society': {
    title: 'General John A. Lejeune Society',
    description: 'Lifetime recognition society for gifts totaling $100,000 – $499,999.',
    breadcrumbLabel: 'General John A. Lejeune Society',
    breadcrumbParent: { label: 'Lifetime Giving Societies', href: '/giving/donor-recognition/lifetime' },
    promos: [],
    donorList: {
      heading: 'Donor Listing',
      donors: [
        'Ahmanson Foundation',
        'BAE Systems North America',
        'CAPT Dan Bashore, USNR (Ret.)*',
        'Battelle Memorial Institute',
        'David and Kitty Beecken',
        'Martin J. Bollinger',
        'Booz Allen Hamilton',
        'Breidenthal-Snyder Foundation',
        'CDR Donald P. Brennan, USN (Ret.)',
        'The Brennan Family Foundation',
        'Carroll C. Brooks',
        'CACI, Inc.',
        'LT Alfred M. Cady III, USN (Ret.)',
        'RADM Joseph F. Callo and Captain Sally McElwreath',
        'Carnegie Corporation of New York',
        'VADM Peter Daly, USN (Ret.), and Jane Daly',
        'VADM Dirk and Terry Debbink, USNR (Ret.)',
        'EDS',
        'ADM James O. Ellis, Jr., USN (Ret.)',
        'Erna G. Ericson*',
        'Mr. J. Christopher Flowers',
        'CDR Gregory E. Glaros, USN (Ret.)',
        'SGM Charles W. Godwin, USA (Ret.)*',
        'CAPT David J. Gray, USN (Ret.)*',
        'Frank M. Gren',
        'Greystone Foundation',
        'LCDR William W. Gubbins, USN (Ret.)*',
        'Mark Herrmann*',
        'Hewlett Packard Enterprise',
        'Mrs. William D. Houser',
        'Integrated Coast Guard Systems, LLC',
        'Mark W. Johnson',
        'Kenneth O. Klepper',
        'H. Kirke Lathrop',
        'Clarence G. Leggett*',
        'Leonardo DRS',
        'Hon. Ellen Lord',
        'Mario Family Foundation',
        'Hon. Robert C. McCormack',
        'Rosa Laird McDonald, CBE*',
        'McDonnell Douglas',
        'SGT Edward S. Miller, USA (Ret.)',
        'MITRE Corp',
        'Dirk P. Mosis III',
        'Navy Federal Credit Union',
        'Otto Haas Charitable Trust',
        'Gen Peter Pace, USMC (Ret.)',
        'Philadelphia Foundation',
        'LCDR Jason M. Pilalas, USN (Ret.)*',
        'CAPT William R. Porter, USN (Ret.)*',
        'J.D. Power III*',
        'Raytheon Company',
        'Marti Tomson Rodamaker',
        'Stanley Ross',
        'Michael Salvato',
        'Smith Richardson Foundation Inc',
        'COL Willard B. Snyder, USAR (Ret.)',
        'ADM James G. Stavridis, USN (Ret.)',
        'CAPT Edward A. Studzinski, USN (Ret.)',
        'Textron Systems',
        'United Defense, L.P.',
        'USNA Class of 1945 Foundation',
        'Michael J. Wallace',
        'CDR James A. Woodruff, Jr., USN (Ret.)*',
      ],
    },
  },
  'captain-joshua-james-society': {
    title: 'Captain Joshua James Society',
    description: 'Lifetime recognition society for gifts totaling $25,000 – $99,999.',
    breadcrumbLabel: 'Captain Joshua James Society',
    breadcrumbParent: { label: 'Lifetime Giving Societies', href: '/giving/donor-recognition/lifetime' },
    promos: [],
    donorList: {
      heading: 'Donor Listing',
      donors: [
        'Gen John Rutherford Allen, USMC (Ret.)',
        'RADM Fred Ames, USCG (Ret.)',
        'ADM Stanley R. Arthur, USN (Ret.)',
        'Robert C. Bellas, Jr.',
        'Thomas E. Berk',
        'Philip M. Bilden',
        'VADM John M. Bird, USN (Ret.)',
        'MajGen Charles F. Bolden, Jr., USMC (Ret.)',
        'Jack O. Bovender, Jr.',
        'RADM Daniel R. Bowler, USN (Ret.)',
        'Brett Bozeman',
        'Pamela Braden',
        'W. P. Brewster',
        'British Aerospace Defence',
        'John J. Brogan*',
        'James E. Burke',
        'Carl & Lily Pforzheimer Foundation',
        'John K. Castle',
        'Paul R. Chanin*',
        'Paul R. Charron',
        'The Cincinnati Insurance Company',
        'CNA Corporation',
        'RADM Jay M. Cohen, USN (Ret.)',
        'Jonathan L. Cohen',
        'Patrick S. Cole',
        'Conrad N. Hilton Foundation',
        'Lammot Copeland, Jr.',
        'PO3 Susan Curtin, USCGR (Ret.)',
        'LTJG Thomas C. Deas, Jr., USN (Ret.)',
        'Lawrence T. Di Rita',
        'Christian T. Doerr*',
        'VADM Robert F. Dunn, USN (Ret.)*',
        'E. Rhoda Shaten Charitable Foundation',
        'EADS North America',
        'Eastman Kodak Company',
        'Peter M. Edmondo*',
        'RADM Mark T. Emerson, USN (Ret.)',
        'Energy Focus, Inc',
        'ADM Thomas B. Fargo, USN (Ret.)',
        'Friends of the National WWII Memorial',
        'John H. Fullmer',
        'General Atomics Aeronautical',
        'General Dynamics Information Technology',
        'Norman P. Goldblum*',
        'Robert G. Gordon*',
        'CPO Henry F. Gottstein, USNR*',
        'Alan C. Goudy',
        'ADM Jonathan W. Greenert, USN (Ret.)',
        'LtGen Wallace C. Gregson, USMC (Ret.)',
        'Haas Charitable Trust',
        'Hackney Foundation',
        'Kent Halvorsen*',
        'William Hannigan',
        'Robert E. Hanrahan, Jr.',
        'CAPT Karl M. Hasslinger, USN (Ret.)',
        'Admiral Thomas B. Hayward, USN (Ret.)*',
        'William Hecker*',
        'Dorothy R. Herrmann*',
        'A. Ralph Hibbard*',
        'Hughes Aircraft Company',
        'CAPT Walter C. Hulon, USN (Ret.)',
        'Humana Military Healthcare Services',
        'Hon. Paul R. Ignatius',
        'Mel Immergut',
        'J. Ira and Nicki Harris Foundation',
        'James W. and Anne H.S. Nethercott Charitable Gift Fund',
        'RADM David A. Janes, USNR (Ret.)*',
        'Hon. Frank R. Jimenez',
        'RADM Gustave N. Johansen, USN (Ret.)*',
        'ADM Jay L. Johnson, USN (Ret.)',
        'LCDR Paul G. Johnson, USN (Ret.)',
        'Max R. Johnson, MD',
        'Howard J. Kestenberg',
        'Dr. Henri Keyzer-Andre*',
        'L3 Harris Technologies',
        'CAPT Lloyd G. LeCain, USNR (Ret.)',
        'Hon. John F. Lehman',
        'Maj Richard B. Lieb, USMCR (Ret.)*',
        'William R. Loomis, Jr.',
        'RADM Thomas C. Lynch, USN (Ret.)',
        'Maersk Line, Ltd',
        'CAPT Martin J. Mahon, USNR',
        'RDML Michael K. Mahon, USN (Ret.)',
        'John Majoras',
        'ManTech International',
        'ADM Henry H. Mauz, Jr., USN (Ret.)',
        'CDR Corbin A. McNeill, USN (Ret.)',
        'Merrill Lynch',
        'LCDR Christopher P. Michel, USNR',
        'ADM Richard W. Mies, USN (Ret.)',
        'Patrick J. Moran, Esq.',
        'T. Truxtun Morrison',
        'John Morton III',
        'CWO2 Emilio P. Muras, USN (Ret.)*',
        'Joseph M. Murphy',
        'Bonnie Musser',
        'Naval Intelligence Professionals',
        'Navy Mutual Aid Association',
        'Neuberger Berman Foundation',
        'Northrop Grumman Newport News Shipbuilding',
        'Hon. Sean O\'Keefe',
        'Paul X. O’Neill*',
        'CDR M. Lee Parsons, USN (Ret.)',
        'RADM Kendell Pease, USN (Ret.)',
        'Emmett A. Pedley*',
        'Pennzoil Company',
        'C. Michael Petters',
        'Polk Family Charitable Fund',
        'COL (IL) Jennifer N. Pritzker, IL ARNG (Ret.)',
        'R. R. Donnelley & Sons Co.',
        'CDR William A. Read, Jr., USNR (Ret.)*',
        'ADM J.P. Reason, USN (Ret.)',
        'CAPT Earl F. Rippee, USNR (Ret.)*',
        'CDR Richard M. Rosenberg, USNR (Ret.)*',
        'Robert and Nina Rosenthal',
        'Hon. Donald and Joyce Rumsfeld',
        'VADM James A. Sagerholm, USN (Ret.)*',
        'Gregory M. Salyards',
        'Dr. Robert W. Selle*',
        'CDR Guy Snodgrass, USN (Ret.)',
        'Starr Foundation',
        'Gerald D. Sullivan',
        'Richard J. Szumiel*',
        'TASC',
        'Joseph K. Taussig III',
        'Betty C. Taussig*',
        'LT Allan R. Tessler, USN (Ret.)',
        'Textron Systems',
        'VADM Howard B. Thorsen, USCG (Ret.)',
        'LT James W. Todd, USNR (Ret.)*',
        'TriWest',
        'Byron D. Trott',
        'USNA Class of 1942',
        'Vought Aircraft',
        'RADM Sidney A. Wallace, USCG (Ret.)',
        'Ali Wambold and Monica Gerard-Sharp Wambold',
        'Kent E. Warhol',
        'Rollin M. Warner, Jr.',
        'Everett P. Weaver*',
        'Randall Weisenburger',
        'Lewis M. Weston*',
        'CAPT Ronald W. Wetmore, USN (Ret.)',
        'MajGen Thomas L. Wilkerson, USMC (Ret.)',
        'William Penn Foundation',
        'Gordon L. Williams*',
        'VADM Melvin G. Williams, Jr., USN (Ret.)',
        'ADM James Winnefeld, Jr., USN (Ret.)',
        'Dr. John Durfee Winslow*',
        'Robert U. Enrione and Jacqueline Wolf-Enrione*',
        'Hon. Robert O. Work',
      ],
    },
  },
}

/* ── Donor Recognition landing ──────────────────────────────────────────────── */

export const givingSocietiesLanding = {
  title: 'Donor Recognition',
  description: societiesDeck,
  /*
   * The section front gets the colour guard rather than the ship the three
   * detail pages share: this page is about recognition, and a ceremony reads
   * that way where a hull does not. The marching rank runs left to centre, so
   * the hero's right-hand panel covers only the distant end of the line.
   */
  heroImage: 'societies-recognition-hero.jpg',
  heroImageAlt:
    'A U.S. Navy colour guard marching with the state and territorial flags',
  cards: [
    {
      headline: 'Annual Recognition Societies',
      body: 'Recognition societies for individuals who contribute more than $1,000 in a given calendar year.',
      cta: 'View Annual Recognition Societies',
      href: '/giving/donor-recognition/annual',
    },
    {
      headline: 'Lifetime Giving Societies',
      body: 'Lifetime giving societies recognize and honor donors who have contributed $25,000 or more to the Naval Institute.',
      cta: 'View Lifetime Giving Societies',
      href: '/giving/donor-recognition/lifetime',
    },
    {
      headline: 'Planned Giving Societies',
      body: 'Planned giving societies recognize all individuals who make a planned gift to benefit the Naval Institute.',
      cta: 'View Planned Giving Societies',
      href: '/giving/donor-recognition/planned',
    },
  ],
}
