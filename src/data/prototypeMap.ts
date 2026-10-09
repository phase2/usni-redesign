/**
 * Every component sheet and prototype page, grouped for wayfinding.
 *
 * One list feeds two views: the floating prototype navigator pinned to the
 * bottom-left corner of every page (PrototypeNav), and the table of contents at
 * /toc (TableOfContents). Keeping them on one source means a page
 * added here appears in both, and neither can drift from the other.
 *
 * The design system's component sheets come first; prototype pages follow,
 * grouped by information-architecture bucket in the order the main navigation
 * presents them (see `navItems` in homepage.ts), with the site-wide pages that
 * sit outside it first and the account section last.
 *
 * Deliberately left out:
 * - /design-system/preview/* — bare Header/Footer renders that exist only to be
 *   iframed by the Navigation sheet.
 * - /account/next-gen — an exploration kept unlinked so it reads as such
 *   (see the note on its route in App.tsx).
 * - The four annual-society redirects, which only forward to /annual.
 *
 * When adding a route to App.tsx, add it here too.
 */

export interface PrototypeLink {
  label: string
  /**
   * Omit for a label that only groups the pages under it (e.g. Proceedings'
   * three sample articles, which have no index page of their own).
   */
  href?: string
  /** Short qualifier shown beside the label, e.g. a flow step or status. */
  note?: string
  /** Pages that sit under this one, listed indented beneath it. */
  children?: PrototypeLink[]
}

export interface PrototypeGroup {
  /** Stable anchor for the table of contents. */
  id: string
  title: string
  links: PrototypeLink[]
}

export interface PrototypeSection {
  id: string
  title: string
  groups: PrototypeGroup[]
}

export const designSystemSection: PrototypeSection = {
  id: 'design-system',
  title: 'Design System',
  groups: [
    {
      id: 'foundations',
      title: 'Foundations',
      links: [
        { label: 'Style Guide', href: '/design-system/style-guide' },
        { label: 'Design Tokens', href: '/design-system/tokens' },
        { label: 'Utility Classes', href: '/design-system/utilities' },
        { label: 'Iconography & Imagery', href: '/design-system/iconography' },
      ],
    },
    {
      id: 'components',
      title: 'Components',
      links: [
        { label: 'Buttons & CTAs', href: '/design-system/buttons' },
        { label: 'Cards', href: '/design-system/cards' },
        { label: 'Alerts', href: '/design-system/alerts' },
        { label: 'Forms & Inputs', href: '/design-system/forms' },
        { label: 'Modals & Overlays', href: '/design-system/overlays' },
        { label: 'Navigation', href: '/design-system/navigation' },
        { label: 'Lists, Tables & Pagination', href: '/design-system/lists' },
        { label: 'Article & Media', href: '/design-system/media' },
        { label: 'Commerce & Checkout', href: '/design-system/commerce' },
        { label: 'Account', href: '/design-system/account' },
      ],
    },
    {
      id: 'patterns',
      title: 'Page Patterns',
      links: [
        { label: 'Heroes & Page Headers', href: '/design-system/heroes' },
        { label: 'Sections & Layout', href: '/design-system/sections' },
        { label: 'Accordions & Disclosure', href: '/design-system/accordions' },
        { label: 'Billboards & Promos', href: '/design-system/billboards' },
      ],
    },
  ],
}

export const prototypeSection: PrototypeSection = {
  id: 'pages',
  title: 'Prototype Pages',
  groups: [
    {
      id: 'site-wide',
      title: 'Site-wide',
      links: [
        { label: 'Homepage', href: '/' },
        { label: 'Search Results', href: '/search?q=navy' },
        { label: 'Events', href: '/events', children: [{ label: 'Past Events', href: '/events/past' }] },
        {
          label: 'Archives',
          href: '/archives',
          children: [
            {
              label: 'Oral Histories',
              href: '/archives/oral-histories',
              children: [
                { label: 'About the Program', href: '/archives/oral-histories/about' },
                { label: 'Order Oral Histories', href: '/archives/oral-histories/place-order' },
                { label: 'Charles Adair', href: '/archives/oral-histories/adair-charles' },
                { label: 'George W. Anderson Jr.', href: '/archives/oral-histories/anderson-george', note: 'Two volumes, audio excerpt' },
                { label: 'Walter C. W. Ansel', href: '/archives/oral-histories/ansel-walter', note: 'Audio excerpt' },
                { label: 'Jesse Arbor', href: '/archives/oral-histories/arbor-jesse' },
              ],
            },
          ],
        },
        { label: 'Contact USNI', href: '/contact' },
        { label: 'Login / Register', href: '/login' },
        { label: 'Newsletter Sign-up', href: '/newsletter', note: 'Unlinked on the site' },
        { label: 'Page Not Found', href: '/404', note: '404' },
      ],
    },
    {
      id: 'membership',
      title: 'Membership',
      links: [
        { label: 'Membership', href: '/membership' },
        {
          label: 'Join',
          href: '/membership/join',
          children: [
            { label: 'Magazine Upsell', href: '/membership/magazine-upsell', note: 'Step 2' },
            { label: 'Cart', href: '/membership/cart', note: 'Step 3' },
            { label: 'Checkout', href: '/membership/checkout', note: 'Step 4' },
            { label: 'Confirmation', href: '/membership/confirmation', note: 'Step 5' },
          ],
        },
      ],
    },
    {
      id: 'proceedings',
      title: 'Proceedings',
      links: [
        { label: 'Proceedings', href: '/proceedings' },
        { label: 'Current Issue', href: '/proceedings/apr-2026', note: 'April 2026' },
        { label: 'All Issues', href: '/proceedings/all-issues' },
        {
          label: 'Sample Articles',
          children: [
            { label: 'Three MEFs Won’t Be Enough', href: '/proceedings/three-mefs' },
            { label: 'Fortifying the Digital Watch', href: '/proceedings/fortifying-digital-watch' },
            {
              label: 'Get Real about How Naval Aviation Got Better',
              href: '/proceedings/naval-aviation-got-better',
            },
          ],
        },
        { label: 'Proceedings Podcast', href: '/proceedings/podcast' },
        { label: 'American Sea Power Project', href: '/proceedings/sea-power-project' },
        { label: 'Submission Guidelines', href: '/proceedings/submissions' },
        { label: 'Contact Proceedings', href: '/proceedings/contact' },
      ],
    },
    {
      id: 'essay-contests',
      title: 'Essay Contests',
      links: [
        { label: 'Essay Contests', href: '/essay-contests' },
        { label: 'General Prize Essay Contest', href: '/essay-contests/general-prize' },
        { label: 'Leadership Essay Contest', href: '/essay-contests/leadership' },
        { label: 'Naval and Maritime Photo Contest', href: '/essay-contests/naval-maritime-photo' },
        { label: 'Submit an Entry', href: '/essay-contests/submit' },
        { label: 'Contest Archive', href: '/essay-contests/archive' },
      ],
    },
    {
      id: 'naval-history',
      title: 'Naval History',
      links: [
        { label: 'Naval History', href: '/naval-history' },
        { label: 'Current Issue', href: '/naval-history/aug-2026', note: 'August 2026' },
        { label: 'All Issues', href: '/naval-history/all-issues' },
        { label: 'Article: Mitscher at Midway', href: '/naval-history/mitscher-at-midway' },
        {
          label: 'Subscribe',
          href: '/naval-history/subscribe',
          children: [
            { label: 'Membership Upsell', href: '/naval-history/subscribe/membership-upsell', note: 'Step 2' },
            { label: 'Cart', href: '/naval-history/subscribe/cart', note: 'Step 3' },
            { label: 'Checkout', href: '/naval-history/subscribe/checkout', note: 'Step 4' },
            { label: 'Confirmation', href: '/naval-history/subscribe/confirmation', note: 'Step 5' },
          ],
        },
      ],
    },
    {
      id: 'books',
      title: 'Books & Press',
      links: [
        { label: 'Books & Press', href: '/books' },
        { label: 'Books', href: '/books/collection', note: 'Full collection' },
        { label: 'Book Product Page', href: '/books/ai-warfighting', note: 'AI Warfighting' },
        { label: 'New Releases', href: '/books/new-releases' },
        {
          label: 'Professional Military Education',
          href: '/books/professional-military-education',
          children: [
            { label: 'Military Reading Lists', href: '/books/military-reading-lists' },
            { label: 'Blue and Gold Professional Series', href: '/books/series/blue-and-gold' },
            { label: 'Scarlet and Gold Professional Series', href: '/books/series/scarlet-and-gold' },
            {
              label: 'Studies in Marine Corps History and Amphibious Warfare',
              href: '/books/series/marine-corps-history',
            },
            { label: 'The History of Military Aviation Series', href: '/books/series/military-aviation' },
            { label: 'Transforming War Series', href: '/books/series/transforming-war' },
            { label: 'Studies in Naval History and Sea Power', href: '/books/series/naval-history-sea-power' },
            { label: 'Essentials of Strategy Series', href: '/books/series/essentials-of-strategy' },
            {
              label: 'The U.S. President as Commander-in-Chief',
              href: '/books/series/president-commander-in-chief',
            },
            { label: 'War on Film', href: '/books/series/war-on-film' },
          ],
        },
        { label: 'Digital Editions', href: '/books/digital-editions' },
        {
          label: 'About the Press',
          href: '/books/about',
          children: [
            { label: 'Examination Requests', href: '/books/about/examination-requests' },
            { label: 'Writing for the Naval Institute Press', href: '/books/about/writing' },
            { label: 'Artificial Intelligence at Naval Institute Press', href: '/books/about/ai' },
          ],
        },
        {
          label: 'Cart',
          href: '/books/cart',
          children: [
            { label: 'Checkout', href: '/books/checkout' },
            { label: 'Confirmation', href: '/books/confirmation' },
          ],
        },
      ],
    },
    {
      id: 'about',
      title: 'About',
      links: [
        { label: 'About USNI', href: '/about' },
        { label: 'History', href: '/about/history' },
        { label: 'Strategic Plan', href: '/about/strategic-plan' },
        { label: 'State of the Institute', href: '/about/state-of-the-institute' },
        { label: 'Leadership & Staff', href: '/about/leadership' },
      ],
    },
    {
      id: 'giving',
      title: 'Giving',
      links: [
        { label: 'Giving', href: '/giving' },
        { label: 'Giving Opportunities', href: '/giving/opportunities' },
        { label: 'Sponsor Student Memberships', href: '/giving/student-memberships' },
        {
          label: 'Donor Recognition',
          href: '/giving/donor-recognition',
          children: [
            { label: 'Annual Recognition Societies', href: '/giving/donor-recognition/annual' },
            { label: 'Lifetime Giving Societies', href: '/giving/donor-recognition/lifetime' },
            {
              label: 'President Theodore Roosevelt Great White Fleet Society',
              href: '/giving/donor-recognition/lifetime/president-theodore-roosevelt-great-white-fleet-society',
            },
            {
              label: 'Rear Admiral John L. Worden Ironclad Society',
              href: '/giving/donor-recognition/lifetime/rear-admiral-john-l-worden-ironclad-society',
            },
            {
              label: 'Admiral Arleigh A. “31-Knot” Burke Society',
              href: '/giving/donor-recognition/lifetime/admiral-arleigh-burke-society',
            },
            {
              label: 'General John A. Lejeune Society',
              href: '/giving/donor-recognition/lifetime/general-john-lejeune-society',
            },
            {
              label: 'Captain Joshua James Society',
              href: '/giving/donor-recognition/lifetime/captain-joshua-james-society',
            },
            { label: 'Planned Giving Societies', href: '/giving/donor-recognition/planned' },
          ],
        },
        { label: 'Corporate Partners', href: '/giving/corporate' },
        { label: 'Jack C. Taylor Conference Center', href: '/giving/taylor-conference-center' },
        {
          label: 'Donate',
          href: '/giving/donate',
          children: [
            { label: 'Cart', href: '/giving/donate/cart', note: 'Step 2' },
            { label: 'Checkout', href: '/giving/donate/checkout', note: 'Step 3' },
            { label: 'Confirmation', href: '/giving/donate/confirmation', note: 'Step 4' },
          ],
        },
      ],
    },
    {
      id: 'account',
      title: 'My Account',
      links: [
        { label: 'Account Dashboard', href: '/account' },
        { label: 'Profile', href: '/account/profile' },
        { label: 'Addresses', href: '/account/addresses' },
        { label: 'Payment Methods', href: '/account/payment' },
        { label: 'Orders', href: '/account/orders' },
        { label: 'Subscriptions', href: '/account/subscriptions' },
        { label: 'Wishlist', href: '/account/wishlist' },
        { label: 'Giving History', href: '/account/giving', note: 'Future phase' },
        { label: 'Saved Articles', href: '/account/saved', note: 'Future phase' },
      ],
    },
  ],
}

export const prototypeMap: PrototypeSection[] = [designSystemSection, prototypeSection]

/** Every href in a link tree, parents first — used to find the current page's group. */
export function flattenLinks(links: PrototypeLink[]): PrototypeLink[] {
  return links.flatMap((link) => [link, ...flattenLinks(link.children ?? [])])
}
