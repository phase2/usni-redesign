import backgroundImage from '@/assets/images/giving-hero-flipped-extended.png'
import PhotoCta from '@/components/ui/PhotoCta'

/**
 * Closing call to action, carrying the mission-and-vision page's last line —
 * "Raise your voice and get involved in this crucial mission."
 */
export default function AboutGetInvolved() {
  return (
    <PhotoCta
      image={backgroundImage}
      cardSide="right"
      eyebrow="Get Involved"
      heading="Raise your voice in this crucial mission"
      body="The forum only works because people take part in it. Join as a member, or support the Institute with a gift."
      primary={{ label: 'Become a member', href: '/membership/join' }}
      secondary={{ label: 'Support the Institute', href: '/giving/donate' }}
    />
  )
}
