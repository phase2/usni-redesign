import imgHistoryConference from '@/assets/images/events/history-conference-2026.jpg'
import imgLifeOfCourage from '@/assets/images/events/life-of-courage-2026.jpg'
import imgWest2027 from '@/assets/images/events/west-2027.jpg'
import imgWatermark from '@/assets/images/new-usni-default-watermark.png'

/**
 * Stand-in for events with no artwork of their own: the tan crossed-swords
 * watermark the leadership roster uses for people without a headshot. The
 * artwork carries its own margin on a #F7F7F2 field, so it fills a 16:10 or
 * 16:9 card frame with the mark centred.
 */
export const PLACEHOLDER_EVENT_IMAGE = imgWatermark

export interface UsniEvent {
  id: string
  /** Badge label, as on the current site. */
  kind: 'Conference' | 'Event' | 'Panel Discussion'
  title: string
  /** City and state, shown beside the pin. */
  location: string
  /** Human-readable date line, e.g. "Wednesday, 4 November 2026". */
  date: string
  /** Sort key. Start date for multi-day events. */
  startsOn: string
  /** Time range, where the current site publishes one. */
  time?: string
  /** Venue and street address lines. */
  venue?: string[]
  summary: string
  href: string
  image: string
  imageAlt: string
}

/**
 * Upcoming events, in date order — the first is the one the landing page
 * highlights. Copy and images come from the current site's event pages.
 */
export const upcomingEvents: UsniEvent[] = [
  {
    id: 'history-conference-2026',
    kind: 'Conference',
    title: 'Why Wars Come Faster Than We Expect—and What Readiness Really Requires',
    location: 'Annapolis, MD',
    date: 'Wednesday, 4 November 2026',
    startsOn: '2026-11-04',
    time: '8:40 am – 3:40 pm',
    venue: ['Jack C. Taylor Conference Center', 'Annapolis, MD'],
    summary:
      'History repeatedly shows that wars arrive faster than nations expect. The 2026 History Conference examines why that pattern endures and what genuine readiness requires.',
    href: '/events/why-wars-come-faster-we-expect-and-what-readiness-really-requires',
    image: imgHistoryConference,
    imageAlt: 'A guided-missile destroyer launching a missile at sea',
  },
  {
    id: 'life-of-courage-2026',
    kind: 'Panel Discussion',
    title: 'Life of Courage',
    location: 'Annapolis, MD',
    date: 'Tuesday, 10 November 2026',
    startsOn: '2026-11-10',
    time: '10:30 AM – 12:00 PM ET',
    venue: ['Jack C. Taylor Conference Center', 'Annapolis, MD'],
    summary:
      'Bruce McCandless III discusses Iron and Fire, the Pacific War story of his grandfather, destroyer captain and Medal of Honor recipient Admiral Bruce McCandless.',
    href: '/events/life-courage',
    image: imgLifeOfCourage,
    imageAlt: 'A painting of a burning warship under fire at night in the Pacific',
  },
  {
    id: 'defense-forum-washington-2026',
    kind: 'Conference',
    title: 'Defense Forum Washington 2026',
    location: 'Washington, DC',
    date: 'Wednesday, 9 December 2026',
    startsOn: '2026-12-09',
    time: '12:30 PM – 5:00 PM',
    venue: ['International Spy Museum', '700 L’Enfant Plaza SW', 'Washington, DC 20024'],
    summary: 'Check back for details and registration information.',
    href: '/events/defense-forum-washington-2026',
    image: PLACEHOLDER_EVENT_IMAGE,
    imageAlt: '',
  },
  {
    id: 'west-2027',
    kind: 'Conference',
    title: 'WEST 2027',
    location: 'San Diego, CA',
    date: '16 Feb – 18 Feb 2027',
    startsOn: '2027-02-16',
    venue: ['San Diego Convention Center', 'San Diego, CA'],
    summary:
      'The U.S. Naval Institute and AFCEA International will host the 37th annual WEST Conference from 16–18 February. Attendees will hear from senior DoD and DHS officials in panel and keynote discussions while exploring the latest platforms, leading-edge technologies, and state-of-the-art networking capabilities that support the Sea Services’ operations.',
    href: '/events/west-2027',
    image: imgWest2027,
    imageAlt: 'WEST 2027 conference banner — San Diego Convention Center, February 16–18, 2027',
  },
  {
    id: 'us-naval-institute-member-event',
    kind: 'Event',
    title: 'U.S. Naval Institute Member Event',
    location: 'San Diego, CA',
    date: 'Wednesday, 17 February 2027',
    startsOn: '2027-02-17',
    venue: ['The Ultimate Skybox', 'San Diego, CA'],
    summary:
      'The Member Event will be held at The Ultimate Skybox, a rooftop venue located in downtown San Diego with breathtaking views of the city and Petco Park.',
    href: '/events/us-naval-institute-member-event',
    image: PLACEHOLDER_EVENT_IMAGE,
    imageAlt: '',
  },
]
