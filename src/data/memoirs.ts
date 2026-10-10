/**
 * Naval Institute Memoir Collection — /archives/memoirs.
 *
 * Transcribed from the live listing (test-usni3.pantheonsite.io/archives/memoirs,
 * captured 9 October 2026): all 50 entries across its six pages, in the live
 * order, with each card's title, name, engagement, teaser, and portrait.
 * Generated from that capture rather than typed. Fields:
 * - `name` is the name the card shows under the title. `lastName` is the
 *   memoir page's own last-name field, which the live Last Name filter
 *   searches; it is kept as entered ("poole", "Perola" for Parola), since that
 *   is what a search on the live site matches against.
 * - `timeframe` is the memoir page's Timeframe, free text ("1966-2011", "26
 *   and 27 May 1981", "World War II Years"). The Year filter reads the years
 *   out of it; see `memoirCoversYear`.
 * - `summary` is the live teaser, which the site cuts at about 250
 *   characters; its trailing "..." is kept.
 * - `image` is the portrait. Twenty entries use the live site's generic
 *   silhouette instead; they have none here, and the card shows a placeholder.
 *
 * The live search form also offers Ship Types and Year fields, but no memoir
 * carries a ship type, and none has a year field of its own, so on the live
 * site both return nothing. Ship Types is left out here; Year is answered
 * from the timeframe instead.
 *
 * NOTE for USNI — worth fixing at source: Candyce S. Henry's teaser reads
 * "with o ne of the first"; Gene J. Parola's last-name field reads "Perola"
 * and Edward K. Poole's "poole"; and Sailor's Letters to Mom has no
 * timeframe.
 *
 * Memoir pages (/archives/memoirs/<slug>) are not built in the prototype;
 * cards link to where they would live.
 */

const images = import.meta.glob('../assets/images/memoirs/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

/** Resolve a memoir's portrait filename to its bundled URL. */
export function memoirImage(file?: string): string | undefined {
  return file ? images[`../assets/images/memoirs/${file}`] : undefined
}

export interface Memoir {
  slug: string
  title: string
  name: string
  lastName: string
  engagement: string
  timeframe?: string
  summary: string
  image?: string
  imageAlt?: string
}

export const memoirHref = (m: Memoir) => `/archives/memoirs/${m.slug}`

/**
 * Whether a memoir's timeframe takes in a year. A single year matches itself;
 * two or more make a span from the first to the last; a decade ("1990's")
 * runs to its ninth year. Timeframes with no year in them match nothing.
 */
export function memoirCoversYear(m: Memoir, year: number): boolean {
  const found = [...(m.timeframe ?? '').matchAll(/(\d{4})('?s)?/g)]
  if (found.length === 0) return false
  const start = Number(found[0][1])
  const last = found[found.length - 1]
  const end = Number(last[1]) + (last[2] ? 9 : 0)
  return year >= start && year <= end
}

export const memoirs: Memoir[] = [
  {
    slug: 'us-navypost-military-career-capt-robert-duncan',
    title: 'The U.S. Navy/Post-Military Career of Capt. Robert Duncan',
    name: 'Robert N. Duncan',
    lastName: 'Duncan',
    engagement: 'Vietnam War',
    timeframe: '1966-2011',
    summary: 'The following is a chronological review of Capt. Robert Duncan\'s 30+ years of active duty in the U.S. Navy and nearly 15 years of post-military service as a defense contractor.',
    image: 'robert-duncan-0.jpg',
    imageAlt: 'Captain Robert Duncan',
  },
  {
    slug: 'storm-sea-captain-richard-reass-usn',
    title: 'Storm From the Sea: Captain Richard Reass, USN',
    name: 'Richard Reass',
    lastName: 'Reass',
    engagement: 'First Gulf War',
    timeframe: '1991',
    summary: 'In 1991, the Roland Company collaborated with the U.S. Naval Institute in producing the documentary film "Storm From the Sea," which featured extensive interviews with many of the key players in Operation Desert Storm. It was the first truly inside...',
  },
  {
    slug: 'storm-sea-vice-admiral-francis-r-donovan',
    title: 'Storm From the Sea: Vice Admiral Francis R. Donovan',
    name: 'Francis R. Donovan',
    lastName: 'Donovan',
    engagement: 'First Gulf War',
    timeframe: '1990-1991',
    summary: 'In 1991, the Roland Company collaborated with the U.S. Naval Institute in producing the documentary film “Storm From the Sea,” which featured extensive interviews with many of the key players in Operation Desert Shield/Operation Desert Storm. It was the first...',
  },
  {
    slug: 'storm-sea-rear-admiral-william-m-fogarty',
    title: 'Storm From the Sea: Rear Admiral William M. Fogarty',
    name: 'William M. Fogarty',
    lastName: 'Fogarty',
    engagement: 'First Gulf War',
    timeframe: '1990-1991',
    summary: 'In 1991, the Roland Company collaborated with the U.S. Naval Institute in producing the documentary film “Storm From the Sea,” which featured extensive interviews with many of the key players in Operation Desert Shield/Operation Desert Storm. It was the first...',
  },
  {
    slug: 'storm-sea-vice-admiral-henry-h-mauz-jr-usn',
    title: 'Storm From the Sea: Vice Admiral Henry H. Mauz Jr., USN',
    name: 'Henry H. Mauz',
    lastName: 'Mauz',
    engagement: 'First Gulf War',
    timeframe: '1990-1991',
    summary: 'In 1991, the Roland Company collaborated with the U.S. Naval Institute in producing the documentary film “Storm From the Sea,” which featured extensive interviews with many of the key players in Operation Desert Storm. It was the first truly inside...',
  },
  {
    slug: 'cult-pain',
    title: 'The Cult of Pain',
    name: 'Sean Thomas Coughlin',
    lastName: 'Coughlin',
    engagement: 'Cold War',
    timeframe: '1980\'s - 1990\'s',
    summary: 'The 1980’s and the early 1990’s were a rich and successful time in American Rowing history. US National and Olympic Team coaches like Stan Bergman, Rick Clothier, Steve Gladstone, Rusty Jablonic, Larry Gluckman, Kris Korzeniowski, Ted Nash, Harry Parker, and...',
    image: '31-0.jpg',
    imageAlt: 'Sean Thomas Coughlin',
  },
  {
    slug: 'fighting-fire-midnight-aboard-uss-nimitz-may-1981',
    title: 'Fighting a Fire At Midnight Aboard USS Nimitz in May 1981',
    name: 'David A. Hill',
    lastName: 'Hill',
    engagement: 'Cold War',
    timeframe: '26 and 27 May 1981',
    summary: 'This memoir is about a specific event, and to set the stage for this one night in May 1981 when USS Nimitz CVN-68 and her crew fought for our survival against a fire that raged following an aircraft landing accident...',
    image: 'mm1-hill.jpg',
    imageAlt: 'David Hill, LCDR USN',
  },
  {
    slug: 'one-first-female-line-officers-serving-navy',
    title: 'One of the First Female Line Officers Serving in the Navy',
    name: 'Candyce S. Henry',
    lastName: 'Henry',
    engagement: 'Cold War',
    timeframe: '1973-1978',
    summary: 'Based on interviews conducted by the author, Thomas Wildenberg, with o ne of the first female line officers serving in the Navy, Lt. Candyce S. Henry, USN (ret.).',
    image: 'ensignmallenacker.jpg',
    imageAlt: 'Ensign Mallenacker',
  },
  {
    slug: 'memoir-naval-service-lt-robert-b-stout',
    title: 'Memoir of Naval Service - Lt. Robert B. Stout',
    name: 'Robert B. Stout',
    lastName: 'Stout',
    engagement: 'Cold War',
    timeframe: '1968-1980',
    summary: 'In this memoir, Lieutenant Robert Stout recalls his time spent in the Navy. From boot camp, OCS, then on to Naval Communications Stations Honolulu as a communications officer.',
  },
  {
    slug: 'vietnam-memories-longest-trip',
    title: 'Vietnam Memories, Longest Trip',
    name: 'Larry Glenn Parker',
    lastName: 'Parker',
    engagement: 'Vietnam War',
    timeframe: '1970',
    summary: 'Prior to my career in the Navy, I served in the Army. This memoir is from that time, and is in response to a question regarding the longest trip I ever took.',
    image: 'vn1970-2.jpg',
    imageAlt: 'Larry Glenn Parker',
  },
  {
    slug: 'vietnam-memories-camping',
    title: 'Vietnam Memories, Camping',
    name: 'Larry Glenn Parker',
    lastName: 'Parker',
    engagement: 'Vietnam War',
    timeframe: '1970',
    summary: 'Prior to my career in the Navy, I served in the Army. This memoir is from that time, and is in response to a question regarding my most memorable camping trip.',
    image: 'lgp-2.jpg',
    imageAlt: 'Larry Glenn Parker',
  },
  {
    slug: 'coastie-life',
    title: 'A \'Coastie\' for Life',
    name: 'Stephen E. Goldhammer',
    lastName: 'Goldhammer',
    engagement: 'Uncategorized',
    timeframe: '1945-2021',
    summary: 'The Coast Guard’s motto is Semper Paratus – Latin for Always Ready. It’s also been described as ‘the shallow water Navy’ and ‘the hard nucleus that the Navy forms around in time of war.’ I always tell people that I’ve...',
    image: 'img-3548.jpg',
    imageAlt: 'CAPT (Ret.) Stephen Goldhammer, USCG, and his grandson, Luke Belmont, 5, at the Udvar-Hazy National Air and Space Museum in October, 2016 in front of Coast Guard HH-52A 1426.',
  },
  {
    slug: 'funeral-gioia-sannitica',
    title: 'The Funeral at Gioia Sannitica',
    name: 'LtCol. David G. Henderson, USMC (RET.)',
    lastName: 'Henderson',
    engagement: 'Vietnam War',
    timeframe: 'June 1969',
    summary: 'The Funeral at Gioia Sannitica, by David Henderson, covers the funeral of an Italian-American service member killed during the Vietnam War. His body returned to Italy rather than the United States - the first time in Marine Corps history that...',
    image: 'img.jpg',
    imageAlt: 'Dave Henderson',
  },
  {
    slug: 'my-vietnam-war-memoir',
    title: 'My Vietnam War Memoir',
    name: 'Peter M. Swartz',
    lastName: 'Swartz',
    engagement: 'Vietnam War',
    timeframe: '1969-1971',
    summary: 'Captain Swartz served for over 27 years as a U.S. Navy officer, primarily as a specialist in strategy, plans, and policy. Early in his career, at Naval Amphibious School, Coronado, he helped train Navy personnel heading to advisory and other...',
    image: 'peter-swartz-in-vietnam.jpg',
    imageAlt: 'CAPT. Peter M. Swartz, USN (Ret.) in Vietnam',
  },
  {
    slug: 'foul-weather-jacket',
    title: 'The Foul Weather Jacket',
    name: 'Nolan Nelson',
    lastName: 'Nelson',
    engagement: 'Vietnam War',
    timeframe: '1968-1972',
    summary: 'This essay describes through these patches my active duty of three and one half years on amphibious ships in Vietnam and San Diego. I served as an officer in the Navy from 1968 to 1972. My longest assignment on active...',
    image: 'nolan-nelson.jpg',
    imageAlt: 'Nolan Nelson',
  },
  {
    slug: 'memoirs-col-william-d-hubbard-usmc-ret',
    title: 'THE MEMOIRS OF COL. WILLIAM D. HUBBARD USMC (RET)',
    name: 'William D. Hubbard',
    lastName: 'Hubbard',
    engagement: 'Vietnam War',
    timeframe: '1950-1980',
    summary: 'William D. “Bill” Hubbard served as an infantry officer in the Marine Corps from 1953 to 1979. The principal focus of Bill’s memoirs is his time in Vietnam during 1965 and 1966. There, after arranging for a transfer to a...',
    image: 'william-hubbard.jpg',
    imageAlt: 'Col. William "Bill" D. Hubbard, USMC (Ret.)',
  },
  {
    slug: 'cossack-tale',
    title: 'A Cossack Tale',
    name: 'Richard Evert',
    lastName: 'Evert',
    engagement: 'Vietnam War',
    timeframe: '1950-1970',
    summary: '"A Cossack Tale" delves into the narrator\'s journey from childhood to a distinguished military career, emphasizing the challenges and transformations of his time at the United States Naval Academy (USNA). Inducted in 1964 during the height of the Cold War...',
    image: 'f-8-pilot-shot-0.png',
    imageAlt: 'Richard Evert with F8',
  },
  {
    slug: 'tad-trip-greenland',
    title: 'A TAD Trip to Greenland',
    name: 'Charles John McVey',
    lastName: 'McVey',
    engagement: 'Cold War',
    timeframe: '1964',
    summary: 'In this memoir, LCDR Charles J. McVey recounts a temporary duty (TAD) trip to Greenland in the spring of 1964 while serving with the Military Sea Transportation Service (MSTS) in Washington, D.C. As part of a staff delegation accompanying Vice...',
  },
  {
    slug: 'boilers-battles-and-bureaucracy',
    title: '“Boilers, Battles, and Bureaucracy”',
    name: 'George Davis VanArsdale',
    lastName: 'VanArsdale',
    engagement: 'Cold War',
    timeframe: '1957-1981',
    summary: 'The memoir of George Davis VanArsdale, LCDR USNR (Ret.), offers a detailed, candid, and often humorous account of his naval career from his entry into Cornell’s NROTC in the late 1950s through his decades of service in both active and...',
    image: 'george-vanarsdale.jpg',
    imageAlt: 'George Davis VanArsdale',
  },
  {
    slug: 'edward-k-poole-memoir-collection',
    title: 'Edward K. Poole - Memoir Collection',
    name: 'Edward K. Poole',
    lastName: 'poole',
    engagement: 'Vietnam War',
    timeframe: '1962',
    summary: 'This Memoir is a collection of short stories, by Edward Poole, about his time in the Navy as a doctor. Edward Poole would later retire as a Lt. Commander. 1. Intestinal Distress and Me 2. Two Highlighting Tales 3. I...',
    image: 'ekpoole.jpg',
    imageAlt: 'Edward K. Poole',
  },
  {
    slug: 'submarine-doctors',
    title: 'Submarine Doctors',
    name: 'J. Richard Briggs',
    lastName: 'Briggs, M.D.',
    engagement: 'Vietnam War',
    timeframe: '1960',
    summary: 'The first nuclear-powered submarine, Nautilus SSN 571, had just returned from her shakedown cruise in 1956 and the boat was found to be uninhabitable. The equipment that controlled the atmosphere within the boat was faulty and although much research had...',
  },
  {
    slug: 'cold-war-submariner-memoirs-vice-admiral-frank-d-mcmullen-jr',
    title: 'Cold War Submariner: The Memoirs of Vice Admiral Frank D. McMullen, Jr.',
    name: 'Vice Admiral Frank D. McMullen, Jr.',
    lastName: 'McMullen',
    engagement: 'Cold War',
    timeframe: '1945-1980',
    summary: 'Frank D. McMullen, Jr. graduated from the U.S. Naval Academy in 1946 and, during his 33 years in the U.S. Navy, served principally in diesel and nuclear powered submarines. As a junior officer, he was consistently ranked first among his...',
    image: 'frank-mcmullen-as-a-radm.jpg',
    imageAlt: 'RAdm. Frank D. McMullen Jr.',
  },
  {
    slug: 'adventures-uss-bonita-ssk-3',
    title: 'Adventures on USS Bonita (SSK-3)',
    name: 'William C. Green',
    lastName: 'Green',
    engagement: 'Cold War',
    timeframe: '1958-1960',
    summary: 'Adventures on USS Bonita (SSK-3) Captain Green graduated from the University of Southern California’s NROTC program in 1952 and was immediately assigned to the cruiser USS Helena (CA-75) in Korean waters. Next came duty in various submarines, culminating in command...',
    image: 'william-green.jpg',
    imageAlt: 'Captain William Green',
  },
  {
    slug: 'john-jack-bemenderfer-naval-career-1958-1978',
    title: 'John (Jack) Bemenderfer, Naval Career 1958-1978',
    name: 'John (Jack) Alan Bemenderfer',
    lastName: 'Bemenderfer',
    engagement: 'Cold War',
    timeframe: '1958-1978',
    summary: 'The Naval Career of Chief Warrant Officer (CWO3) John (Jack) Alan Bemenderfer, USN (Ret.) 1958-1978.',
    image: 'jack-as-6wo-2-1970.jpg',
    imageAlt: 'Jack Bemenderfer,1970',
  },
  {
    slug: 'fleet-sonar-school-san-diego',
    title: 'Fleet Sonar School San Diego',
    name: 'William C. Green',
    lastName: 'Green',
    engagement: 'Cold War',
    timeframe: '1952-1960',
    summary: 'Fleet Sonar School San Diego Captain Green graduated from the University of Southern California’s NROTC program in 1952 and was immediately assigned to the cruiser USS Helena (CA-75) in Korean waters. Next came duty in various submarines, culminating in command...',
    image: 'william-green.jpg',
    imageAlt: 'Captain William Green',
  },
  {
    slug: 'operation-hardtack-teak-and-orange-nuclear-tests',
    title: 'Operation Hardtack (Teak and Orange), Nuclear Tests',
    name: 'Robert C. Vance',
    lastName: 'Vance',
    engagement: 'Cold War',
    timeframe: '1957-1959',
    summary: 'Operation Hardtack I was a series of 35 nuclear tests conducted by the United States from April 28 to August 18 in 1958 at the Pacific Proving Grounds. At the time of testing, the Operation Hardtack I test series included...',
    image: 'bud-as-full-lieutenant.jpg',
    imageAlt: 'LT. Robert C. Vance',
  },
  {
    slug: 'admiral-rickover-personal-memoir',
    title: 'Admiral Rickover, A Personal Memoir',
    name: 'Admiral Hyman George Rickover',
    lastName: 'Rickover',
    engagement: 'Cold War',
    timeframe: '1948 - 1986',
    summary: 'Admiral Hyman George Rickover , the “Father of the Nuclear Navy”, was a career officer in the United States Navy, having graduated from the U.S. Naval Academy in Annapolis in 1922. In the early part of his career, he served...',
    image: 'us-mdanusni-204015008.jpg',
    imageAlt: 'Port bow view of the USS Nautilus (SSN-571) underway while performing sea trials in the Atlantic.',
  },
  {
    slug: 'service-board-uss-talbot-county-lst-1153-1956-1958',
    title: 'Service on Board the USS Talbot County (LST-1153), 1956-1958',
    name: 'Frederick E. Lewis',
    lastName: 'Lewis',
    engagement: 'Vietnam War',
    timeframe: '1956-1958',
    summary: 'Frederick E. Lewis joined the reserves during high school, on his 17th birthday, embarking on a naval career spanning decades. In this excerpt from his larger memoir still in progress, he describes service on board the USS Talbot County (LST-1153)...',
  },
  {
    slug: 'my-affair-esther',
    title: 'My Affair with Esther',
    name: 'William C. Green',
    lastName: 'Green',
    engagement: 'Cold War',
    timeframe: '1952-1960',
    summary: 'My Affair with Esther Captain Green graduated from the University of Southern California’s NROTC program in 1952 and was immediately assigned to the cruiser USS Helena (CA-75) in Korean waters. Next came duty in various submarines, culminating in command of...',
    image: 'william-green.jpg',
    imageAlt: 'Captain William Green',
  },
  {
    slug: 'hunters-point-shipyard-san-francisco',
    title: 'Hunters Point Shipyard, San Francisco',
    name: 'William C. Green',
    lastName: 'Green',
    engagement: 'Cold War',
    timeframe: '1952-1960',
    summary: 'Hunters Point Shipyard, San Francisco Captain Green graduated from the University of Southern California’s NROTC program in 1952 and was immediately assigned to the cruiser USS Helena (CA-75) in Korean waters. Next came duty in various submarines, culminating in command...',
    image: 'william-green.jpg',
    imageAlt: 'Captain William Green',
  },
  {
    slug: 'time-aboard-uss-sea-fox',
    title: 'Time Aboard USS Sea Fox',
    name: 'William C. Green',
    lastName: 'Green',
    engagement: 'Korean War',
    timeframe: '1956-1958',
    summary: 'Time Aboard USS Sea Fox, 1956-1958 Captain Green graduated from the University of Southern California’s NROTC program in 1952 and was immediately assigned to the cruiser USS Helena (CA-75) in Korean waters. Next came duty in various submarines, culminating in...',
    image: 'william-green.jpg',
    imageAlt: 'Captain William Green',
  },
  {
    slug: 'pearl-harbor-secret',
    title: 'A Pearl Harbor Secret',
    name: 'Gene J. Parola',
    lastName: 'Perola',
    engagement: 'Korean War',
    timeframe: '1952-1955',
    summary: 'Pearl Harbor Naval Base in Hawaii is a pretty well known tourist destination now, in addition to its task of ‘projecting power in the Pacific’. It attracts an equal number of both American and Japanese tourists to this site of...',
    image: 'geneparola.png',
    imageAlt: 'Gene Parola',
  },
  {
    slug: 'prelude-korean-war',
    title: 'Prelude - The Korean War',
    name: 'William C. Green',
    lastName: 'Green',
    engagement: 'Korean War',
    timeframe: '1950-1953',
    summary: 'Prelude - The Korean War Captain Green graduated from the University of Southern California’s NROTC program in 1952 and was immediately assigned to the cruiser USS Helena (CA-75) in Korean waters. Next came duty in various submarines, culminating in command...',
    image: 'william-green.jpg',
    imageAlt: 'Captain William Green',
  },
  {
    slug: 'hals-navy',
    title: 'Hal\'s Navy',
    name: 'Harold H. Sacks',
    lastName: 'Sacks',
    engagement: 'Vietnam War',
    timeframe: '1952-1972',
    summary: 'Commander Sacks\' memoir covers the breadth of his 20-year naval career, beginning with his experiences at Officer Candidate School in 1952, through the Korean War, the Vietnam War, to his retirement in 1972.',
  },
  {
    slug: 'arriving-aboard-uss-helena-ca75',
    title: 'Arriving Aboard USS Helena (CA75)',
    name: 'William C. Green',
    lastName: 'Green',
    engagement: 'Korean War',
    timeframe: '1952-1954',
    summary: 'Arriving Aboard USS Helena (CA75) Captain Green graduated from the University of Southern California’s NROTC program in 1952 and was immediately assigned to the cruiser USS Helena (CA-75) in Korean waters. Next came duty in various submarines, culminating in command...',
    image: 'william-green.jpg',
    imageAlt: 'Captain William Green',
  },
  {
    slug: 'officers-story-political-military-journey',
    title: 'An Officer\'s Story: A Political-Military Journey',
    name: 'Steve F. Kime',
    lastName: 'Kime',
    engagement: 'World War I',
    timeframe: '20th Century',
    summary: 'This memoir is an intellectual journey. It is based in the fundamental middle-American values and opinions, good and bad, of the "happy Days" of the Fifties. These values and opinions are dragged kicking and screaming through a rich and varied...',
  },
  {
    slug: 'last-year-world-war-ii-pacific-1945',
    title: 'The Last Year of World War II in the Pacific--1945',
    name: 'Donald C. McKinlay',
    lastName: 'McKinlay',
    engagement: 'World War II',
    timeframe: '1945',
    summary: 'Donald McKinlay was sworn in as an ensign in the U.S. Navy in the wake of Pearl Harbor. The "Preamble" to his memoir covers his early naval experiences in the first year of U.S. involvement in World War II, then...',
  },
  {
    slug: 'world-war-ii-reminiscences-emile-f-domning',
    title: 'WORLD WAR II REMINISCENCES OF EMILE F. DOMNING',
    name: 'Emile Frederick Domning',
    lastName: 'Domning',
    engagement: 'World War II',
    timeframe: '1943-1945',
    summary: 'This memoir is a transcript of audio tapes made in 1976, 1984, 1987, 1995, 1997, 1998, 2000, 2001, 2002, and 2004, which were recorded, transcribed, and edited by Daryl Domning. "ADB" denotes information supplied by Alice Domning Burnham. Material in...',
    image: 'emile-f-domning.jpg',
    imageAlt: 'Emile F. Domning',
  },
  {
    slug: 'memoir-radioman-first-class-ralph-m-servadio-uscg',
    title: 'The Memoir of Radioman First Class Ralph M. Servadio, USCG',
    name: 'Ralph M. Servadio',
    lastName: 'Servadio',
    engagement: 'World War II',
    timeframe: '1943',
    summary: 'Radioman First Class (RM1) Ralph M. Servadio served as a radio operator during World War II in a covert Coast Guard operation to intercept clandestine Nazi radio messages in South America. His memoir describes his path from boot camp to...',
  },
  {
    slug: 'samuel-eliot-morison-looks-back-world-war-ii',
    title: 'Samuel Eliot Morison Looks Back on World War II',
    name: 'Samuel Eliot Morison',
    lastName: 'Morison',
    engagement: 'World War II',
    timeframe: 'World War II Years',
    summary: 'Samuel Eliot Morison, the dean of American maritime and naval history, is most renowned and revered for his epic 15-volume magnum opus “History of United States Naval Operations in World War II.” He wrote several other massively popular and influential...',
  },
  {
    slug: 'love-letters-sailor-pacific-part-2',
    title: 'Love Letters From a Sailor in the Pacific, Part 2',
    name: 'Maurice Emanuel',
    lastName: 'Emanuel',
    engagement: 'World War II',
    timeframe: '1941',
    summary: 'When Gary Emanuel\'s mother Jeanette passed away in 2016, among her effects were found 60 love letters from her then-future husband Maurice, a U.S. Navy sailor stationed at Pearl Harbor in 1941. "The letters clearly demonstrate that my father was...',
    image: 'navy-seaman-dad-0.jpg',
    imageAlt: 'Navy Seaman Maurice Emanuel',
  },
  {
    slug: 'love-letters-sailor-pacific-part-1',
    title: 'Love Letters From a Sailor in the Pacific, Part 1',
    name: 'Maurice Emanuel',
    lastName: 'Emanuel',
    engagement: 'World War II',
    timeframe: '1941',
    summary: 'When Gary Emanuel\'s mother Jeanette passed away in 2016, among her effects were found 60 love letters from her then-future husband Maurice, a U.S. Navy sailor stationed at Pearl Harbor in 1941. "The letters clearly demonstrate that my father was...',
    image: 'navy-seaman-dad-0.jpg',
    imageAlt: 'Navy Seaman Maurice Emanuel',
  },
  {
    slug: 'early-years-naval-aviation-remembered',
    title: 'The Early Years of Naval Aviation Remembered',
    name: 'Knefler McGinnis',
    lastName: 'McGinnis',
    engagement: 'World War II',
    timeframe: '1941',
    summary: 'An eventful career spanning the early years of naval aviation comes to life in this reminiscence by Captain Knefler McGinnis. In January 1934, as a lieutenant commander, he led six Consolidated P2Y-1s on a nonstop flight from San Francisco to...',
  },
  {
    slug: 'general-genda-remembers-pearl-harbor',
    title: 'General Genda Remembers Pearl Harbor',
    name: 'Minoru Genda',
    lastName: 'Genda',
    engagement: 'World War II',
    timeframe: 'December 7th, 1941',
    summary: 'On 3 March 1969, the U.S. Naval Institute made history (and generated no small degree of controversy) when it hosted a talk by retired Japanese General Minoru Genda, a “mastermind of the Pearl Harbor attack,” at the U.S. Naval Academy...',
  },
  {
    slug: 'memoir-captain-albert-j-pelletier-usn-ret',
    title: 'Memoir of Captain Albert J. Pelletier, USN (Ret.)',
    name: 'Albert J. Pelletier Jr.',
    lastName: 'Pelletier Jr.',
    engagement: 'World War I',
    timeframe: '1932',
    summary: 'Captain Albert Joseph Pelletier Jr. (1914-1999) served in the U.S. Navy from 1932 to 1968 and is most well remembered for his cryptography work during World War II and postwar communications intelligence (COMINT) activities. In the book "U.S. Navy Codebreakers,"...',
  },
  {
    slug: 'naval-aviation-training-early-days',
    title: 'Naval Aviation Training in the Early Days',
    name: 'Alfred K. Warren Jr.',
    lastName: 'Warren Jr.',
    engagement: 'World War I',
    timeframe: '1918',
    summary: 'The wild and woolly pioneering days of naval aviation, and the formative years of the nascent Naval Air Station San Diego, are recalled in this colorful account by Alfred K. Warren Jr. It is from a never-before-published series of interviews...',
  },
  {
    slug: 'world-war-i-reminiscences-naval-aviation-pilot-joseph-c-cline',
    title: 'World War I Reminiscences of Naval Aviation Pilot Joseph C. Cline',
    name: 'Joseph C. Cline',
    lastName: 'Cline',
    engagement: 'World War I',
    timeframe: '1917',
    summary: 'The life of a U.S. Naval Aviation Pilot serving in France in World War I is vividly recounted in this recollection by Joseph C. Cline. It is from a never-before-published series of interviews with early naval aviators conducted by the...',
  },
  {
    slug: 'heart-sailor',
    title: 'Heart of a Sailor',
    name: 'Richard Peres',
    lastName: 'Peres',
    engagement: 'World War II',
    timeframe: '1883-1957',
    summary: 'Heart of a Sailor: The Murry Wolffe Story by Richard Peres chronicles the remarkable life of Lt. Commander Murry Wolffe, a Jewish-American sailor who escaped the poverty of New York’s Lower East Side by enlisting in the U.S. Navy at...',
    image: 'img20250502-17101311.jpg',
    imageAlt: 'Murry Wolffe',
  },
  {
    slug: 'personal-reminiscences-surgeon-us-navy-1875-1913',
    title: 'Personal Reminiscences of a Surgeon in the U.S. Navy, 1875-1913',
    name: 'Charles Thomas Hibbett',
    lastName: 'Hibbett',
    engagement: 'Spanish-American War',
    timeframe: '1875-1913',
    summary: 'This is the never-before-seen memoir of the U.S. Navy surgeon Charles Thomas Hibbett (1851-1930), who served from 1875 to 1913. Though this was ostensibly written for his daughter Alice, about age 23 at the time, Dr. Hibbett occasionally addresses "the...',
  },
  {
    slug: 'sailors-letters-mom-1930-1943',
    title: 'A Sailor’s Letters to Mom, 1930–1943',
    name: 'Raymond Cornelius Malley',
    lastName: 'Malley',
    engagement: 'World War II',
    summary: 'On a warm, muggy and rainy day in July 2012, the Malley Family had a reunion at the Montgomery, New York, Firehouse with about 55 family and friends in attendance. It seems the younger generation of Malleys has an interest...',
  },
]
