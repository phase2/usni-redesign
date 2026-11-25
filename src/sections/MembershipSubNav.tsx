import SectionSubNav from '@/components/layout/SectionSubNav'

/**
 * Membership section navigation.
 *
 * The section's browsing pages only. The join flow after the Join page
 * (magazine upsell, cart, checkout, confirmation) leaves it off, as the other
 * carts and checkouts do, so the bar never offers a way out mid-purchase.
 *
 * The mega menu's Renew item is not repeated here: it goes to sign-in, not a
 * membership page.
 */
const items = [
  { label: 'Overview', href: '/membership', exact: true },
  // Join is the tab for /membership/join. Plans & Pricing jumps down that page
  // to the tier-by-tier comparison table; a hash href never matches the
  // pathname, so the two are not both underlined there.
  { label: 'Plans & Pricing', href: '/membership/join#compare' },
  { label: 'Sponsored Student Membership', href: '/sponsored-student-membership' },
  { label: 'Contact Member Services', href: '/membership/contact' },
  { label: 'Join', href: '/membership/join' },
]

export default function MembershipSubNav() {
  return <SectionSubNav label="Membership" items={items} />
}
