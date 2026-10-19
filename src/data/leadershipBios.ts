import imgSpicer from '@/assets/images/leadership/bios/radm-ray-spicer-usn-ret.jpg'
import imgColenso from '@/assets/images/leadership/bios/rob-colenso.jpg'
import imgHamblet from '@/assets/images/leadership/bios/capt-bill-hamblet-usn-ret.jpg'
import imgParreco from '@/assets/images/leadership/bios/april-parreco.jpg'
import imgMcCullough from '@/assets/images/leadership/bios/laura-mccullough.jpg'
import imgKane from '@/assets/images/leadership/bios/adam-kane.jpg'
import imgWallen from '@/assets/images/leadership/bios/chip-wallen.jpg'

/**
 * Executive Staff bio pages, transcribed from the live site's
 * /about-us/executive-staff/<slug> pages (Adam Kane's lives at the site root,
 * /adam-kane, on the live site; here it sits with the others).
 *
 * The live pages repeat the name, title and an "Executive Staff" kicker as
 * headings inside the body. Those move to the page hero, so `html` is the
 * bio paragraphs alone. Both `roleHtml` and `html` are trusted markup we
 * transcribed, rendered with the `.rich-text` house styles.
 *
 * Photos are the live pages' full rectangular headshots, not the circle crops
 * the roster uses.
 */
export interface LeadershipBio {
  /** Matches the roster's `/about/leadership/<slug>` href. */
  slug: string
  name: string
  roleHtml: string
  photo: string
  photoAlt: string
  html: string
}

export const leadershipBios: LeadershipBio[] = [
  {
    slug: 'radm-ray-spicer-usn-ret',
    name: 'RADM Raymond A. Spicer, USN (Ret.)',
    roleHtml: 'Chief Executive Officer and Publisher',
    photo: imgSpicer,
    photoAlt: 'RADM Raymond A. Spicer, USN (Ret.)',
    html: `
      <p>Retired Navy Rear Admiral Ray Spicer is the CEO and Publisher of the U.S. Naval Institute. He previously served as an executive at IBM, most recently having led IBM Federal’s Defense and Intelligence Technology Sales team, responsible for providing IBM products and support to the Defense and Intelligence Community.</p>
      <p>Prior to joining IBM in 2015, Spicer was the director of Kestrel Programs for the Intelligence Systems Group at Boeing Defense, Space &amp; Security. His leadership of diverse engineering, analytic and management teams ensured the continued, successful delivery of Kestrel Programs’ products and services to a variety of government, commercial and international customers.</p>
      <p>Spicer completed a successful career in the U.S. Navy in 2010, with extensive leadership experience in assignments including command at sea of the destroyer USS <em>Mitscher</em> (DDG-57), Destroyer Squadron Seven and Carrier Strike Group Twelve embarked in USS <em>Enterprise</em> (CVN-65). During his time at sea, he completed eight deployments, including combat operations in Iraq and Afghanistan.</p>
      <p>Ashore, he served in numerous key major staff assignments on the Pacific and Atlantic Fleet staffs, as Officer in Charge of the Aegis Combat System Engineering Development Site in Moorestown, NJ, and on the Chief of Naval Operations (CNO) staff in the Pentagon, most significantly as the Deputy Director of Surface Warfare, and Assistant Deputy Chief of Naval Operations for Operations, Plans and Strategy. He also served as Deputy Assistant to the President and Director of the White House Military Office where he maintained responsibility for all military assets supporting the White House and Continuity of Government, including Air Force One, Marine One, Camp David, the White House Communications Agency, and the White House Medical Unit.</p>
      <p>Spicer is a 1979 graduate of the United States Naval Academy.</p>
    `,
  },
  {
    slug: 'rob-colenso',
    name: 'Rob Colenso',
    roleHtml: 'Chief Experience Officer (CXO)',
    photo: imgColenso,
    photoAlt: 'Rob Colenso',
    html: `
      <p>As Chief Experience Officer, Rob leads digital strategy, marketing, customer experience and audience development for the U.S. Naval Institute. Prior to joining the Institute, Rob spent nearly two decades in technology and marketing leadership roles in start-up, mid-market, and Fortune 100 organizations, specializing in product management and user experience strategy. His experience spans industries including SaaS software development, health communications, e-learning, retail e-commerce, financial services, and media.</p>
      <p>Before moving into digital strategy and marketing, Rob spent 10 years as a reporter and editor, primarily covering military affairs and national security policy for publications including Navy Times and Marine Corps Times. He led award-winning digital multimedia and investigative journalism projects, covered the Sept. 11 terrorist attacks, and deployed journalists to report on military operations in Iraq, Afghanistan, Haiti, and beyond.</p>
      <p>At the start of his career, Rob served four years as an enlisted Marine Corps public affairs specialist. He holds a bachelor’s degree in communications from University of Maryland Global Campus, a specialization in design thinking and innovation from University of Virginia Darden Executive Education, and specializations in graphic design and UX/UI design from California Institute of the Arts.</p>
    `,
  },
  {
    slug: 'capt-bill-hamblet-usn-ret',
    name: 'CAPT Bill Hamblet, USN (Ret.)',
    roleHtml: 'Executive Vice President for Periodicals and Editor-in-Chief, <em>Proceedings</em>',
    photo: imgHamblet,
    photoAlt: 'CAPT Bill Hamblet, USN (Ret.)',
    html: `
      <p>Bill Hamblet is the EVP for Periodicals and Editor-in-Chief of <em>Proceedings</em>. Published continuously since 1874, <em>Proceedings</em> is the flagship publication of the U.S. Naval Institute.</p>
      <p>Bill joined the Institute staff in September 2016, working first as deputy editor-in-chief for <em>Proceedings</em>.</p>
      <p>A retired Navy captain with nearly 30 years of service as an intelligence officer, Bill graduated from the U.S. Naval Academy with a major in political science in 1987. He earned a Master’s Degree in national resource strategy from the Eisenhower School at the National Defense University in 2013. He served as the intelligence officer with an FA-18 squadron, a Navy SEAL Team, a Carrier Air Wing, and a Carrier Strike Group. His shore tours included the Office of Naval Intelligence, the Joint Staff (J-2) in the Pentagon from 1999–2002, Naval Attache to Russia from 2004–2006, head of the China Division at the Joint Intelligence Operations Center in the Pacific, and deputy division chief for Middle East strategy at the National Counterterrorism Center from 2013–2016. Bill was in the Pentagon on 9/11/2001 and helped lead the initial intelligence response team in the immediate aftermath of the terrorist attacks.</p>
      <p>Bill started writing for <em>Proceedings</em> as a lieutenant on active duty. He served on the Naval Institute Board of Control and Editorial Board from 1993–1997. He continued to write throughout his career.</p>
    `,
  },
  {
    slug: 'april-parreco',
    name: 'April Parreco',
    roleHtml: 'Executive Vice President, Conferences and Events',
    photo: imgParreco,
    photoAlt: 'April Parreco on the terrace of the U.S. Naval Institute',
    html: `
      <p>April Parreco leads the planning and management of conferences and special events at the U.S. Naval Institute. The annual conferences and events at the Naval Institute provide a platform to discuss timely sea power and national defense issues with our members and supporters, military, government, thought leaders and the general public in an independent and non-partisan public setting.</p>
      <p>Prior to joining the team at the U.S. Naval Institute, April worked at the Smithsonian National Postal Museum as the Director of External Affairs where she oversaw and led fundraising, membership and special events.</p>
      <p>April is a graduate of Mount Saint Mary’s University with degrees in International Relations and Spanish.</p>
    `,
  },
  {
    slug: 'laura-mccullough',
    name: 'Laura McCullough',
    roleHtml: 'Chief Development Officer',
    photo: imgMcCullough,
    photoAlt: 'Laura McCullough',
    html: `
      <p>Laura McCullough leads the fundraising efforts for the U.S. Naval Institute Foundation, advancing philanthropic support for USNI’s mission and programs. She brings more than 20 years of experience in nonprofit development and has held senior fundraising leadership roles at Mount St. Mary’s University, The Community Foundation of Frederick County, and Frostburg State University.</p>
      <p>A Certified Fund Raising Executive (CFRE), Laura is known for building strong donor relationships, securing transformational gifts, and aligning philanthropy with institutional priorities. She is a proud graduate of The Pennsylvania State University and has completed significant graduate-level coursework at the University of Maryland Global Campus.</p>
      <p>As the daughter of a retired U.S. Navy servicemember, Laura has a deep personal connection to the naval profession and the importance of preserving its history, thought leadership, and future readiness. She lives in Maryland with her husband and four children.</p>
    `,
  },
  {
    slug: 'adam-kane',
    name: 'Adam Kane',
    roleHtml: 'Director, Naval Institute Press',
    photo: imgKane,
    photoAlt: 'Adam Kane',
    html: `
      <p>Adam rejoined the Naval Institute staff in January 2020 when he was named Director. With more than a decade of publishing experience, Adam sets the strategic direction of the Press and its acquisitions programs.</p>
    `,
  },
  {
    slug: 'chip-wallen',
    name: 'Chip Wallen',
    roleHtml: 'Chief Financial Officer',
    photo: imgWallen,
    photoAlt: 'Chip Wallen',
    html: `
      <p>Chip Wallen is the Chief Financial Officer for the United States Naval Institute and the Naval Institute Foundation. Chip joined in 2017 and oversees the financial, human resource, and facility responsibilities for both entities.</p>
      <p>Previously Chip’s experience included senior financial roles with several DC publishing concerns including Congressional Quarterly, Roll Call, Legal Times, and Bulletin Intelligence.</p>
      <p>Chip is a graduate of the University of Virginia and has an MBA from William &amp; Mary and has a son who graduated in the class of 2019 from the Naval Academy.</p>
    `,
  },
]

export function leadershipBio(slug: string): LeadershipBio | undefined {
  return leadershipBios.find((b) => b.slug === slug)
}
