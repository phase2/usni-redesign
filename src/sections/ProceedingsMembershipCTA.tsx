import splitFeatureImg from '@/assets/images/Russell-NH-5-26-1 Hero.webp'
import PhotoCta from '@/components/ui/PhotoCta'

export default function ProceedingsMembershipCTA() {
  return (
    <PhotoCta
      image={splitFeatureImg}
      cardSide="right"
      eyebrow="Join USNI & Subscribe"
      heading="Proceedings goes deeper. So should you."
      body="A USNI membership gives you full access to every issue of Proceedings — plus the complete digital archive stretching back to 1874, member pricing on Naval Institute Press titles, and a community of the most serious minds in maritime defense. For less than a dollar a week, you're part of the conversation that matters."
      primary={{ label: 'Start your membership', href: '/membership/join' }}
    />
  )
}
