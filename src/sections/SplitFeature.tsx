import membershipImage from '@/assets/images/membership-bottom-cta-wide.png'
import PhotoCta from '@/components/ui/PhotoCta'

export default function SplitFeature() {
  return (
    <PhotoCta
      image={membershipImage}
      cardSide="right"
      eyebrow="Join USNI"
      heading="Join 50,000+ Naval Professionals Worldwide"
      body="Access Proceedings and Naval History, discounts on Press titles, and become part of the forum that shapes maritime thinking."
      primary={{ label: 'Become a member', href: '/membership/join' }}
    />
  )
}
