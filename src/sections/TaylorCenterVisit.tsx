import conferenceCenterImage from '@/assets/images/jackctaylorcenter-extended.jpg'
import PhotoCta from '@/components/ui/PhotoCta'
import { JCTCC_URL } from '@/sections/TaylorCenterAbout'

/**
 * The hand-off to the Center's own site, closing the page.
 *
 * Same photo CTA as the conference center features on the Giving and Events
 * landings, so the three read as one family. It is the page's single outbound
 * booking call; the giving calls sit above it.
 */
export default function TaylorCenterVisit() {
  return (
    <PhotoCta
      image={conferenceCenterImage}
      cardSide="left"
      heading="Plan your event at the Center"
      body={<>Spaces, capacities, in-house AV, approved vendors, frequently asked questions, and the booking form all live on the Center&rsquo;s own site.</>}
      primary={{ label: 'Visit the conference center website', href: JCTCC_URL, external: true }}
    />
  )
}
