import eventImage from '@/assets/images/upcoming-event-teaser.jpg'
import SplitBillboard from '@/components/ui/SplitBillboard'

/**
 * The homepage's upcoming featured event, in the tan split billboard with the
 * photo on the right, as on the staging site.
 */
export default function FeaturedEvent() {
  return (
    <section className="pt-16 lg:pt-20 bg-white">
      <div className="container-site">
        <SplitBillboard
          theme="tan"
          imagePosition="right"
          image={{ src: eventImage, alt: 'Maritime Security Dialogue panel discussion' }}
          eyebrow="Upcoming Featured Event"
          heading="Maritime Security Dialogue"
          details={['Thursday, 18 June 2026', 'Center for Strategic and Inter, Washington D.C.']}
          body="The series brings together the U.S. Naval Institute and CSIS, two of the nation's most respected non-partisan institutions."
          primary={{ label: 'Register for event', href: '/events/maritime-security-dialogue' }}
          secondary={{ label: 'View Event Details', href: '/events/maritime-security-dialogue' }}
        />
      </div>
    </section>
  )
}
