/**
 * Event detail pages, transcribed from the current site's /events/<slug> pages.
 *
 * Title, date and city come from the event's listing record — upcomingEvents
 * in events.ts or pastEvents.ts — keyed by its href, so they're never typed
 * twice. This file carries what only the detail page shows: the hero's second
 * line, the time and venue where the record lacks them, the registration link,
 * and the body copy.
 *
 * Samples so far: the three America's First Aircraft Carrier talks, showing
 * how the migrated author events read, and two upcoming events, the 2026
 * History Conference and Life of Courage. Every other event card still falls through to the 404.
 *
 * Past events leave out the live Register and Purchase Tickets buttons — the
 * page says the event has passed instead. Date, time and location always sit
 * in the page's labelled fields, so where the live body repeats them it is
 * trimmed. `html` is trusted markup we transcribed, rendered with the
 * `.rich-text` house styles; the copy is as published, minus empty
 * paragraphs and stray non-breaking spaces, and left-aligned.
 */
export interface EventDetail {
  slug: string
  /** The live hero's second line, when it's a theme or tagline. */
  subtitle?: string
  /**
   * Start time. The live pages often put this in the hero's second line
   * instead; when that line is only a time, it belongs here, so it reads with
   * the date rather than as a headline.
   */
  time?: string
  /** Venue name and address lines, in the live hero's order. */
  venue?: string[]
  /** Registration link, for an upcoming event. */
  cta?: { label: string; href: string }
  /**
   * Use the full-width photo hero with a white panel, on the event's own
   * listing image, instead of the light-blue band. `panelSide` puts the panel
   * opposite the photo's subject; `focus` keeps the subject in frame when the
   * artwork is a wide banner.
   */
  photoHero?: { panelSide: 'left' | 'right'; focus?: 'left' | 'center' | 'right' }
  html: string
}

export const eventDetails: EventDetail[] = [
  {
    slug: 'historian-talk-americas-first-aircraft-carrier',
    subtitle: 'USS Langley',
    venue: ['National Museum of the USN', '736 Sicard Street Southeast', 'Washington, DC 20374'],
    html: `
      <p><strong>Friday, December 13</strong></p>
      <p><strong>Noon–1 pm</strong></p>
      <p><strong>Presentation by David F. Winkler, Ph.D.</strong> on <em>key personalities</em> who made USS <em>Langley</em> (CV-1) a reality at the US Navy Museum at the Washington Navy Yard.</p>
      <p>Sale/Book signing for <em><a href="https://www.usni.org/press/books/americas-first-aircraft-carrier">America’s First Aircraft Carrier</a></em> to follow presentation.</p>
    `,
  },
  {
    slug: 'americas-first-aircraft-carrier-discussionsigning',
    time: '4 PM',
    venue: ['Pax River Naval Air Museum', '22156 Three Notch Rd', 'Lexington Park, MD 20653'],
    html: `
      <p>Join the Pax River Naval Air Museum on Wednesday, November 13, 2024 at 4 p.m. for an engaging talk by Dr. David Winkler, PhD, CDR (USN, Ret). Dr. Winkler will discuss his book, <a href="https://www.usni.org/press/books/americas-first-aircraft-carrier"><em>America’s First Aircraft Carrier; USS Langley and the Dawn of US Naval Aviation</em></a>, highlighting the pivotal role of the USS Langley in transforming naval aviation. With decades of experience as a naval historian and educator, Dr. Winkler will provide unique insights into the ship’s history and its influence on naval strategy. This event promises a fascinating look at a key chapter in maritime history.</p>
      <p>Books will also be available for purchase. Regular museum admission prices apply.</p>
    `,
  },
  {
    slug: 'americas-first-aircraft-carrier-lecture-dr-david-winkler',
    time: '3:00 PM',
    venue: ['St. Peter’s Chapel', '1181 Walnut Ave', 'Mare Island, CA 94592'],
    html: `
      <p>Join the the Mare Island Historic Park Foundation for a captivating afternoon with Dr. David Winkler, renowned naval historian and retired Commander of the U.S. Navy, for a captivating discussion on his latest book, “America’s First Aircraft Carrier: USS Langley,” published by the Naval Institute Press. Dr. Winkler will delve into the pivotal role of the USS Langley in the development of U.S. naval aviation and its impact on naval warfare. Mark your calendars and prepare for an unforgettable journey through time!</p>
      <p>Dr. David Winkler brings a wealth of knowledge from his extensive career as a naval historian. With over 25 years as the staff historian at the Naval Historical Foundation and roles with the National Maritime Historical Society and Naval War College, his contributions to naval history are profound. Dr. Winkler’s academic background includes a Ph.D. in history from American University and numerous publications, including “Cold War at Sea” and “Amirs, Admirals, and Desert Sailors.”</p>
      <p>This event is a unique opportunity to gain deep insights into the history of American naval aviation and the pioneering efforts that shaped modern naval warfare. Don’t miss this chance to learn from one of the foremost experts in the field.</p>
      <p><strong>Tickets are limited! Purchase your tickets today.</strong></p>
      <ul>
        <li>Advanced Tickets: $15</li>
        <li>Mare Island Historic Park Foundation members receive a $5 discount</li>
        <li>Tickets at the door: $20</li>
      </ul>
    `,
  },
]

export const upcomingEventDetails: EventDetail[] = [
  {
    slug: 'why-wars-come-faster-we-expect-and-what-readiness-really-requires',
    photoHero: { panelSide: 'left' },
    venue: ['U.S. Naval Institute', 'Jack C. Taylor Conference Center', '291 Wood Road', 'Annapolis, MD 21402'],
    cta: { label: 'More Information and Registration', href: 'https://cvent.me/NZR8y8' },
    html: `
      <p>History repeatedly shows that wars arrive faster than nations expect. Warning signs are recognized, yet preparation is delayed, assumptions go unchallenged, and the time available to act proves far shorter than anticipated.</p>
      <p>Through the lens of applied history, the U.S. Naval Institute’s 2026 History Conference will examine why this pattern endures and what genuine readiness requires—not only ships, aircraft, and weapons, but also strategic thinking, institutional learning, industrial capacity, and leaders prepared to act before crisis makes the need undeniable.</p>
      <p>Thank you to the William M. Wood Foundation and John and Debbie Majoras for their generous support.</p>
    `,
  },
  {
    slug: 'life-courage',
    subtitle: 'Bruce McCandless and the Pacific War',
    photoHero: { panelSide: 'right', focus: 'left' },
    venue: ['U.S. Naval Institute', 'Jack C. Taylor Conference Center', '291 Wood Road', 'Annapolis, MD 21402'],
    cta: { label: 'Register', href: 'https://cvent.me/NAGXqx' },
    html: `
      <p>Join the U.S. Naval Institute on 10 November 2026 at 10:30 AM ET at the <a href="https://www.jackctaylorconferencecenter.org/about/">Jack C. Taylor Conference Center</a>, in Annapolis, MD for a look inside the new book <a href="https://www.usni.org/press/books/iron-and-fire"><em>Iron and Fire: The Pacific War Story of Destroyer Captain Bruce McCandless</em></a> with Bruce McCandless III as he recounts his grandfather’s—Admiral Bruce McCandless—wartime experiences across the Pacific.</p>
      <p>Lieutenant Bruce McCandless was at Pearl Harbor on December 7, 1941, fought aboard the heavy cruiser USS <em>San Francisco</em> (CA 38) through the brutal Guadalcanal campaign. Later promoted to captain, he commanded the destroyer USS <em>Gregory</em> (DD 802) during the final drive across the Pacific. Late in life, retiring as an admiral, he dictated his wartime memories to his daughter Sue; the manuscript was then set aside for many years. <em>Iron and Fire</em> draws on family letters, photographs, shipmates’ recollections, and stories passed down through generations to share his story.</p>
      <p><strong>Registration and other Information:</strong></p>
      <p><em><strong>All in-person guests must register by 25 September 2026. Due to the requirements of the U.S. Naval Academy and the timing of this event, in person attendance is only open to U.S. citizens.</strong></em></p>
      <p>The conference will take place at the U.S. Naval Institute’s Jack C. Taylor Conference Center, which is located on the grounds of the U.S. Naval Academy.</p>
      <p>A limited amount of parking is available at the Jack C. Taylor Conference Center.</p>
      <p>We welcome our audience in-person and via live-stream on the <a href="https://youtube.com/live/73VGllr4ZMA?feature=share">U.S. Naval Institute’s YouTube Channel</a>.</p>
      <hr>
      <p><strong>Bruce McCandless:</strong><br>RADM Bruce McCandless, USN (Ret.) was a career U.S. Navy officer and Medal of Honor recipient. Commissioned in 1932, he served aboard two cruisers and destroyers before assignment to USS <em>San Francisco</em> in 1939. He later commanded USS <em>Gregory</em>. He retired in 1952 and is buried at the Naval Academy Cemetery in Annapolis, MD.</p>
      <p><strong>Bruce McCandless III:</strong><br>Bruce McCandless III graduated from the Plan II Honors Program at the University of Texas at Austin. He went on to earn an M.A. from Reading University in England and a J.D. from the University of Texas School of Law. He is the author of the memoir <em>Wonders All Around</em> and—with space journalist Emily Carney—<em>Star Bound: A Beginner’s Guide to the American Space Program, From Goddard’s Rockets to Goldilocks Planets and Everything in Between</em>.</p>
      <p><strong>Moderator: Emily Abdow</strong><br>Emily is the Editor-in-Chief of <a href="/naval-history"><em>Naval History</em></a> magazine at the U.S. Naval Institute. She previously spent five years as a writer and editor at Naval History and Heritage Command, where she authored a monograph on the Boxer Rebellion.</p>
      <p><strong>Historian: Trent Hone</strong><br>Trent Hone is the Marine Corps University Foundation Chair of Strategic Studies at Marine Corps University in Quantico, Virginia, and Vice President of Technology and Product Innovation with ICF International in Reston, Virginia. He is an award-winning historian and a leader in the application of complexity science to organizational design. Mr. Hone’s work focuses on strategy, organizational learning, doctrinal innovation, and operational effectiveness. He is the author of <a href="https://www.usni.org/press/books/learning-war-0"><em>Learning War</em></a>, <a href="https://www.usni.org/press/books/mastering-art-command"><em>Mastering the Art of Command</em></a>, the upcoming book <a href="https://www.usni.org/press/books/seizing-offensive"><em>Seizing the Offensive: Fleet Admiral Ernest J. King and the Naval Strategy That Won World War II</em></a>.</p>
      <hr>
      <p>This event will take place at the U.S. Naval Institute’s Jack C. Taylor Conference Center, which is located on the grounds of the U.S. Naval Academy. All guests must register in advance. Directions and parking information will be shared with you closer to the event date.</p>
      <p><strong>AGENDA</strong><br>10:30 AM–11:30 AM (ET)<br>Welcome Remarks by RADM Raymond A. Spicer, USN (Ret.), CEO and Publisher, U.S. Naval Institute<br>Book Discussion<br>Audience Q&amp;A</p>
      <p>11:30 AM–12:00 PM<br>Book Signing in the Grand Foyer</p>
    `,
  },
]

export function eventDetail(slug: string): EventDetail | undefined {
  return [...eventDetails, ...upcomingEventDetails].find((d) => d.slug === slug)
}
