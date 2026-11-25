import ctaImg from '@/assets/images/Russell-NH-5-26-1 Hero.webp'
import PhotoCta from '@/components/ui/PhotoCta'

export default function NavalHistoryMembershipCTA() {
  return (
    <PhotoCta
      image={ctaImg}
      cardSide="right"
      eyebrow="Subscribe to Naval History"
      heading="History lives in every issue."
      body="Naval History delivers authoritative, deeply researched stories six times a year — battles won and lost, leaders who shaped navies, and the technology that changed warfare at sea. USNI members save 28% on every subscription."
      primary={{ label: 'Subscribe now', href: '/membership/magazine-upsell?plan=full&term=1&region=us&price=75' }}
      secondary={{ label: 'Become a member', href: '/membership/join' }}
    />
  )
}
