import SectionSubNav from '@/components/layout/SectionSubNav'

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
    label: 'Taylor Conference Center',
    // Seven tabs on one row, and this was the longest by half. The dropdown
    // still spells it out.
    shortLabel: 'JCTCC',
    href: '/giving/taylor-conference-center',
  },
  { label: 'Donate', href: '/giving/donate' },
  { label: 'Contact the Foundation', href: '/contact#foundation' },
]

export default function GivingSubNav() {
  return <SectionSubNav label="Giving" items={items} />
}
