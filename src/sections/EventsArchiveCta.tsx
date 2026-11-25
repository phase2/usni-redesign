import archiveCtaImg from '@/assets/images/6995965.jpg'
import SplitBillboard from '@/components/ui/SplitBillboard'

/** Pointer from the landing page to the past-events archive, in the navy split billboard. */
export default function EventsArchiveCta() {
  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="container-site">
        <SplitBillboard
          theme="navy"
          imagePosition="left"
          image={{ src: archiveCtaImg, alt: 'A Coast Guard officer and a Marine officer shaking hands at a waterfront event' }}
          heading="Looking for past events?"
          body="Browse the panels, keynotes, and debates from past conferences and member events."
          primary={{ label: 'Browse past events', href: '/events/past' }}
        />
      </div>
    </section>
  )
}
