/**
 * Oral history detail pages: /archives/oral-histories/<slug>.
 *
 * Transcribed from the live Drupal pages (test-usni3.pantheonsite.io,
 * /press/oral-histories/<slug>, captured 9 October 2026) for the first four
 * entries in the catalogue. Everything the card already carries (title,
 * subtitle, dates, portrait thumbnail) comes from `oralHistories.ts`, looked up
 * by the same slug; this file holds what only the detail page shows.
 *
 * - `displayName` is the subject's name in reading order. The catalogue sorts
 *   surname-first, which suits a list but not the headline of a page about one
 *   person.
 * - `body` is the live biography, as HTML so ship names keep their italics.
 * - `volumes` is the live "About this Volume" sub-section, heading and copy
 *   word for word, as the pages are being migrated 1:1. `indexPdf` points at
 *   the production copy of the live index PDF (the same /sites/default/files
 *   path).
 * - `excerpt` is the audio clip some entries carry: a SoundCloud track, an
 *   illustration, and the transcript of the clip.
 * - `orderHref` is the live "Order Oral History" Amazon link, with its search
 *   tracking parameters dropped.
 *
 * NOTE for USNI — copy fixed from the live source, worth fixing there: Ansel's
 * excerpt introduction calls him "Read Admiral", and the alt text on its
 * image reads "Annapolls First Classman Cover" (it is the book's title page,
 * not its cover); Anderson's transcript has "As a matter or fact"; and
 * Arbor's biography has "one of the the others".
 */

import adairPortrait from '@/assets/images/oral-histories/detail/adair-charles.jpg'
import andersonPortrait from '@/assets/images/oral-histories/detail/anderson-george.jpg'
import anselPortrait from '@/assets/images/oral-histories/detail/ansel-walter.jpg'
import arborPortrait from '@/assets/images/oral-histories/detail/arbor-jesse.jpg'
import anselCover from '@/assets/images/oral-histories/detail/ansel-annapolis-first-classman.jpg'
import cubanMissileCrisis from '@/assets/images/JFKWHP-ST-A26-25-62_0.jpg'

export interface OralHistoryVolume {
  /** The live sub-section heading: "About this Volume", "About Volume I". */
  heading: string
  /** The live sub-section copy, word for word. */
  text: string
  /** The volume index PDF. */
  indexPdf?: string
}

export interface TranscriptLine {
  speaker: string
  /** HTML — the transcripts italicise book titles. */
  text: string
}

export interface OralHistoryExcerpt {
  title: string
  intro: string
  soundcloudTrackId: number
  /** `caption` is HTML; `portrait` sets a tall image narrower beside the text. */
  image: { src: string; alt: string; caption?: string; portrait?: boolean }
  transcript: TranscriptLine[]
}

export interface OralHistoryDetail {
  slug: string
  displayName: string
  portrait: string
  portraitAlt: string
  body: string[]
  orderHref: string
  volumes: OralHistoryVolume[]
  excerpt?: OralHistoryExcerpt
}

const FILES = 'https://www.usni.org/sites/default/files'

export const oralHistoryDetails: OralHistoryDetail[] = [
  {
    slug: 'adair-charles',
    displayName: 'Charles Adair',
    portrait: adairPortrait,
    portraitAlt: 'Charles Adair in khakis on the deck of a ship, holding binoculars',
    body: [
      'Admiral Adair graduated from the Naval Academy in the class of 1926. Following assignments on board the USS <em>Mississippi</em> (BB-41), USS <em>Toucey</em> (DD-282), USS <em>Blakeley</em> (DD-150), and USS <em>Patoka</em> (AO-9), he studied communications at the Naval Postgraduate School. From 1935 to 1938 he served as radio officer on the staffs of Destroyer Squadrons Six and 14. After a staff assignment at the Naval Academy, he reported as flag lieutenant to Admiral Thomas Hart, Commander in Chief Asiatic Fleet, and was in that job when World War II broke out. He moved to Corregidor and then escaped to the Dutch East Indies as senior man on board the schooner <em>Lanikai</em>, sailing by night and hiding by day. From 1943 to 1945 he took part in the planning and execution of every major amphibious operation in the Southwest Pacific Area while serving on the staff of Rear Admiral Daniel Barbey, Commander Seventh Amphibious Force. After duty in OpNav and BuPers, he commanded attack cargo ship <em>Marquette</em>, served on the CinCPacFlt staff, and then in the office of the Comptroller of the Navy, William Franke. He retired in 1956.',
    ],
    orderHref: 'https://www.amazon.com/dp/168269058X',
    volumes: [
      {
        heading: 'About this Volume',
        text: 'Based on ten interviews conducted by John T. Mason, Jr., from February 1975 through April 1975. The volume contains 646 pages of interview transcript plus an index and appendices. The transcript is copyright 1977 by the U.S. Naval Institute; the interviewee has placed no restrictions on its use.',
      },
    ],
  },
  {
    slug: 'anderson-george',
    displayName: 'George W. Anderson Jr.',
    portrait: andersonPortrait,
    portraitAlt: 'Admiral George W. Anderson Jr. in dress uniform and cap, beside a flag',
    body: [
      'This oral history traces the early career of a future Chief of Naval Operations from Naval Academy graduation in 1927 through command of Carrier Division Six in the Mediterranean in 1958–59. Along the way, he discusses flight training, aviation duty in light cruisers and patrol planes, and service in aircraft carriers, including putting the USS <em>Yorktown</em> (CV-10) into commission under Captain “Jocko” Clark. Admiral Anderson held a number of important planning jobs ashore, including with the Bureau of Aeronautics, the AirPac staff under John Towers, and CominCh staff. He commanded the carriers USS <em>Mindoro</em> (CVE-120) and <em>Franklin D. Roosevelt</em> (CVB-42). In the early 1950s, he was on the Sixth Fleet staff, helped establish the NATO command in Europe, and was essentially chief of staff to Admiral Arthur Radford as Chairman of the JCS. As a flag officer, he was Commander Formosa Patrol Force before taking command of CarDiv Six.',
      'The concluding volume of this memoir deals with Admiral Anderson’s command of the Sixth Fleet from 1959 to 1961, his stormy tenure as Chief of Naval Operations from 1961 to 1963, his tour as U.S. Ambassador to Portugal from 1963 to 1966, and his activities since retirement from government service. In describing his time as fleet commander, Admiral Anderson tells of the fleet’s combat capabilities and role as a goodwill ambassador for the nation. When he became CNO during the administration of President John F. Kennedy, Admiral Anderson had good relations with Secretary of the Navy John Connally. Admiral Anderson is much less kind in discussing SecNav Fred Korth and SecDef Robert McNamara. The admiral tells of the 1962 Cuban Missile Crisis and his widely publicized disagreements with civilian authority over the Tactical Fighter Experimental (TFX) fighter program that later became the F-111 Aardvark. The memoir also tells of his removal in 1963, when he was not reappointed CNO. He went instead to serve in Portugal. He tells of his dealings with the Portuguese government and with various offices within the U.S. State Department. Following his retirement from active government service, Admiral Anderson served on several corporate boards and was a member of the President’s Foreign Intelligence Advisory Board in the Nixon administration.',
    ],
    // Both volumes, in paperback and hardcover — a search across their four ISBNs.
    orderHref:
      'https://www.amazon.com/s?i=stripbooks&rh=p_66%3A+9781682474020%7C+9781682690253%7C+9781682690260%7C9781682474013&s=relevanceexprank&unfiltered=1',
    volumes: [
      {
        heading: 'About Volume I',
        text: 'Based on eight interviews conducted by John T. Mason Jr. from June through November 1980, the volume contains 376 pages of interview transcript plus an index. The transcript is copyright 1983 by the U.S. Naval Institute; the restrictions originally placed on the transcript by the interviewee have since been removed.',
        indexPdf: `${FILES}/2018-05/Anderson%2C%20George%20W.%20--%20Vol.%20I%20Index_1.pdf`,
      },
      {
        heading: 'About Volume II',
        text: 'Based on eight interviews conducted by John T. Mason Jr. from December 1980 through April 1981. The volume contains 353 pages of interview transcript plus an index and appendices. The transcript is copyright 1983 by the U.S. Naval Institute; the restrictions originally placed on the transcript by the interviewee have since been removed.',
        indexPdf: `${FILES}/2018-05/Anderson%2C%20George%20W.%20--%20Vol.%20II%20Index_1.pdf`,
      },
    ],
    excerpt: {
      title: 'On the Cuban Missile Crisis',
      intro:
        'In this clip from his 12th interview with Dr. John T. Mason Jr. at his residence at the Watergate Apartments, Washington, D.C., in January 1981, Admiral Anderson speaks of the time immediately following the Bay of Pigs Invasion and the ramp-up to the Cuban Missile Crisis.',
      soundcloudTrackId: 265869008,
      image: {
        src: cubanMissileCrisis,
        alt: 'President Kennedy seated at a table with his advisors',
        caption: 'President John F. Kennedy and his advisors during the Cuban Missile Crisis.',
      },
      transcript: [
        {
          speaker: 'Admiral Anderson',
          text: 'When I came back to Washington, it was quite apparent that the United States as a whole and the navy in particular was very disappointed with the outcome of the Bay of Pigs. It had been a matter of continuing concern, and I personally sensed that there was a very high manifestation of the competitiveness of President Kennedy and Bobby Kennedy to make up for what had gone on.',
        },
        {
          speaker: 'Admiral Anderson',
          text: 'As a matter of fact, as soon as I became a member of the Joint Chiefs of Staff, it was clear that there was a weekly meeting at the higher political State Department policy level as to what could be done to redress the situation. Indeed, solicitations were being made quietly as to any idea that could be offered to provoke Cuba into giving the United States an excuse to take appropriate action. These meetings continued, and then along in the month of September there came an increasing number of reports voiced particularly by Senator Kenneth Keating of New York about the buildup of Russian forces in Cuba, including missiles.',
        },
      ],
    },
  },
  {
    slug: 'ansel-walter',
    displayName: 'Walter C. W. Ansel',
    portrait: anselPortrait,
    portraitAlt: 'Walter C. W. Ansel in profile, wearing a jacket',
    body: [
      'A 1918 graduate of the Naval Academy, Admiral Ansel served on convoy escort duty in the closing months of World War I. He had a variety of duties in the interwar years, including study of amphibious warfare, service on board the cruiser USS <em>Milwaukee</em> (CL-5) and at the Naval Academy, and command of the destroyer USS <em>Bulmer</em> (DD-222) and Destroyer Division 14. During a tour in the War Plans Division of OpNav just prior to World War II, Ansel observed the poor state of U.S. Navy war planning. He was first CO of the oiler USS <em>Winooski</em> (AO-38), then had staff duty for the planning of the invasions of North Africa, Sicily, and Southern France. In 1944–45, he commanded the light cruiser USS <em>Philadelphia</em> (CL-41), including support duty in the Mediterranean. After postwar staff duty in the support force off Japan, he was on a SecNav Board and then served 1947–49 as subchief of the U.S. naval mission to Brazil. Rear Admiral Ansel retired in 1949.',
    ],
    orderHref: 'https://www.amazon.com/dp/1682690571',
    volumes: [
      {
        heading: 'About this Volume',
        text: 'Based on seven interviews conducted by Dr. John T. Mason Jr. from September 1970 through December 1980, the volume contains 249 pages of interview transcript plus an index and appendices. The transcript is copyright 1972 by the U.S. Naval Institute; the restrictions originally placed on the transcript by the interviewee have since been removed.',
        indexPdf: `${FILES}/2018-05/Ansel%20Walter%20-%20Index%20%281%29.pdf`,
      },
    ],
    excerpt: {
      title: 'On Edward L. Beach Sr. and “An Annapolis Plebe”',
      intro:
        'In this excerpt from his oral history, Rear Admiral Ansel tells of how he was profoundly influenced to attend the Naval Academy and pursue a naval career by the writings of Captain Edward L. Beach Sr. — who, along with his son and namesake, is whom the Naval Institute’s headquarters, Beach Hall, is named after. Both Captain Beach Sr. and son Ned Beach were inextricably linked to the Institute throughout its history, and both embodied the Naval Institute ideal encoded in its insignia: the pen and the sword.',
      soundcloudTrackId: 301210528,
      image: {
        src: anselCover,
        alt: 'Title page of An Annapolis First Classman, by Lt. Com. Edward L. Beach, U.S. Navy, with an illustration of a sailing ship',
        caption:
          'The title page of <em>An Annapolis First Classman</em> (1910), the fourth of Beach’s books following Robert Drake through the Academy.',
        portrait: true,
      },
      transcript: [
        {
          speaker: 'Dr. Mason',
          text: 'Why were you interested in the Navy, coming from a Middle Western community?',
        },
        {
          speaker: 'Admiral Ansel',
          text: 'My father once made plans to try for the Naval Academy with a friend of his named Dan Denny, but at that time he lost his own father so he had to stay home and take care of his mother and the family. Outside of that, I read Captain Beach’s books starting with <em>An Annapolis Plebe</em>.',
        },
        { speaker: 'Dr. Mason', text: 'That’s Ned Beach’s father?' },
        {
          speaker: 'Admiral Ansel',
          text: 'Yes. I met him later, out on the West Coast. He lived in Palo Alto. Told him about reading all of the books about Robert Drake, the hero, who carried on from being a plebe. The first thing he did was to win the Army and Navy baseball game before he was a midshipman! He was a mere “Function.” What he had in his right arm was a cannonball pitch. Robert went through the Academy, a book for each year, and finally graduated. He wasn’t among the stars, but he was solvent. His final coup after commissioning was to shoot himself, instead of a torpedo, out of a submarine torpedo tube during a fleet exercise. As he came up out of the water he hailed his target, clambered aboard and announced to the battleship’s captain that he was sunk. Well, that was a great encouragement to seek entrance to the Navy…',
        },
        {
          speaker: 'Dr. Mason',
          text: 'It was great propaganda for the Naval Academy, wasn’t it, to have this series of books?',
        },
        {
          speaker: 'Admiral Ansel',
          text: 'Propaganda or what, there are several other kinds of books — <em>Buck Jones at Annapolis</em> by Winston Churchill and three or four others — but the Beach series was the one that I hit first. I read them all.',
        },
      ],
    },
  },
  {
    slug: 'arbor-jesse',
    displayName: 'Jesse Arbor',
    portrait: arborPortrait,
    portraitAlt: 'Jesse Arbor in Navy officer’s uniform and cap',
    body: [
      'Arbor was born in Cotton Plant, Arkansas, in 1914, one of 12 children. After the U.S. entry into World War II, he enlisted in the Navy in 1942 — shortly before he would have been drafted into the Army. He went through recruit training at the all-black Camp Robert Smalls, part of the large naval training station complex at Great Lakes, Illinois. As a sailor, Arbor advanced to quartermaster second class, involved with navigation, log keeping, and visual signaling; he was among the first blacks rated in that specialty.',
      'Initially stationed in the Boston area, where he served on boat coastal minesweepers, Arbor took an advanced navigation course in a Navy facility at Harvard University. In 1943 his life changed dramatically when he was ordered to report back to Camp Robert Smalls to take part in the Navy’s first officer training course for African-Americans.',
      'Of the approximately 100,000 black sailors then in the Navy, Arbor and 15 other men were chosen to begin the training in January 1944. While three of the participants would remain as enlisted men, Arbor and the rest who were commissioned would become known collectively as the “Golden Thirteen.” Arbor and one of the others were the first two black naval officers to be assigned overseas.',
      'In the years after the war, Arbor aided Navy recruiting of minorities and met with later generations of black naval officers. He summed up his achievements by saying of the Golden Thirteen, “Having been one of the guinea pigs, I’m glad I had the endurance and fortitude to withstand the challenges we faced . . . The black officers today express their appreciation when they see us.” Mr. Arbor passed away in 2000.',
    ],
    orderHref: 'https://www.amazon.com/dp/168269996X',
    volumes: [
      {
        heading: 'About this Volume',
        text: 'Based on two interviews conducted by Paul Stillwell on 9 October 1986 and 20 July 1988, the volume contains 161 pages of interview transcript plus an index. The transcript is copyright 2018 by the U.S. Naval Institute; the interviewee placed no restrictions on its use.',
        indexPdf: `${FILES}/2018-08/Arbor%2C%20Jesse%20%E2%80%93%20Member%20of%20the%20Golden%20Thirteen%20-%20Index.pdf`,
      },
    ],
  },
]

export const oralHistoryDetail = (slug: string) => oralHistoryDetails.find((d) => d.slug === slug)
