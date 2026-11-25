import conferenceCenterImage from '@/assets/images/jackctaylorcenter-extended.jpg'
import PhotoCta from '@/components/ui/PhotoCta'
import { JCTCC_URL } from '@/sections/TaylorCenterAbout'

/**
 * The Taylor Center, closing the Giving landing.
 *
 * One button, to the Center's own site. It used to lead to the Center's page in
 * this section, with a second "Host an event" button going off-site; that page
 * is archived, so both would now go to the same place.
 */
export default function GivingConferenceCenter() {
  return (
    <PhotoCta
      image={conferenceCenterImage}
      cardSide="left"
      eyebrow="Hosting Inspiring Events"
      heading="The Jack C. Taylor Conference Center"
      body="The Jack C. Taylor Conference Center is a Temporary Secure Working Area capable of hosting classified presentations and discussions up to the TS/SCI level. We look forward to hosting your next conference, lecture, workshop, meeting, or professional gathering."
      primary={{ label: 'About the Center', href: JCTCC_URL, external: true }}
    />
  )
}
