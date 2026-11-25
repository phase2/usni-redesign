import conferenceCenterImage from '@/assets/images/jackctaylorcenter-extended.jpg'
import PhotoCta from '@/components/ui/PhotoCta'
import { JCTCC_URL } from '@/sections/TaylorCenterAbout'

/**
 * The Taylor Center as a venue — same treatment as the conference center
 * feature closing the Giving landing page, pointed at hosting rather than
 * giving.
 */
export default function EventsConferenceCenter() {
  return (
    <PhotoCta
      image={conferenceCenterImage}
      cardSide="left"
      eyebrow="Hosting Inspiring Events"
      heading="The Jack C. Taylor Conference Center"
      body="The Jack C. Taylor Conference Center is a unique and sophisticated venue for your next conference, lecture, workshop, meeting, reception, or special event."
      primary={{ label: 'Host an event', href: JCTCC_URL, external: true }}
    />
  )
}
