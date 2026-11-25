import navalHistoryImg from '@/assets/images/naval-history-billboard.jpg'
import orgMembershipImg from '@/assets/images/org-membership-billboard.jpg'
import SplitBillboard from '@/components/ui/SplitBillboard'

export function NavalHistoryBillboard() {
  return (
    <SplitBillboard
      theme="navy"
      imagePosition="right"
      image={{ src: navalHistoryImg, alt: 'Naval History magazine cover' }}
      eyebrow="Naval History"
      heading="Subscribe to Naval History"
      headingLevel="h3"
      body="The world's most authoritative and engaging periodical for readers interested in our nautical heritage. Available as an add-on with your membership."
      primary={{ label: 'Learn more about Naval History', href: '/naval-history/subscribe' }}
    />
  )
}

export function OrgMembershipBillboard() {
  return (
    <SplitBillboard
      theme="tan"
      imagePosition="left"
      image={{ src: orgMembershipImg, alt: 'Sailors watching the horizon at sea' }}
      eyebrow="More Ways to Join"
      heading="Organizational Membership"
      headingLevel="h3"
      body="Libraries and offices can receive Proceedings magazine. Other membership benefits do not apply."
      primary={{ label: 'Contact member services', href: '/membership/contact' }}
    />
  )
}
