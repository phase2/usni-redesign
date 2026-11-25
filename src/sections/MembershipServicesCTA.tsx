import bgImage from '@/assets/images/corporate-opportunities.webp'
import PhotoCta from '@/components/ui/PhotoCta'

export default function MembershipServicesCTA() {
  return (
    <PhotoCta
      image={bgImage}
      cardSide="right"
      theme="navy"
      eyebrow="Have additional questions?"
      heading="Our membership services team is here to assist you."
      body="Whether you have questions about joining, your current membership, gift memberships, or publication subscriptions, our team is ready to help you find the right path."
      primary={{ label: 'Contact us for assistance', href: '/membership/contact' }}
      secondary={{ label: 'View FAQ', href: '/faq#membership' }}
    />
  )
}
