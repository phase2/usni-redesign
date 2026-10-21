import SectionSubNav from '@/components/layout/SectionSubNav'
import { JCTCC_URL } from '@/sections/TaylorCenterAbout'

/**
 * Giving section navigation.
 *
 * Page-based only. The live site's secondary menu also lists Ways to Give and
 * Giving Opportunities as their own pages; in the redesign both are sections of
 * the Giving landing page, already reachable from `GivingJumpNav`, so putting
 * them here as well would give the same content two competing navigations.
 */
const items = [
  { label: 'Overview', href: '/giving', exact: true },
  { label: 'Giving Opportunities', href: '/giving/opportunities' },
  { label: 'Donor Recognition', href: '/giving/donor-recognition' },
  { label: 'Corporate Partners', href: '/giving/corporate' },
  {
    // The centre is named for Jack C. Taylor, so it is either the full name or
    // the initialism — never "Taylor Conference Center", which reads as though
    // Taylor were the place rather than the man.
    label: 'Jack C. Taylor Conference Center',
    // Seven tabs on one row, and this is the longest by some margin. The mobile
    // dropdown is a vertical list and still spells it out.
    shortLabel: 'JCTCC',
    // The Center's page here is archived; the tab goes to its own site.
    href: JCTCC_URL,
    external: true,
  },
  { label: 'Donate', href: '/giving/donate' },
  { label: 'Contact the Foundation', href: '/contact#foundation' },
]

export default function GivingSubNav() {
  return <SectionSubNav label="Giving" items={items} />
}
