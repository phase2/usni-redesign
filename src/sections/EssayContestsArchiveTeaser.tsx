import archiveCtaImg from '@/assets/images/Naval Intel EC hero_2025.jpg'
import SplitBillboard from '@/components/ui/SplitBillboard'

/** Pointer from the landing page to the archive listing, in the navy split billboard. */
export default function EssayContestsArchiveTeaser() {
  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="container-site">
        <SplitBillboard
          theme="navy"
          imagePosition="left"
          image={{ src: archiveCtaImg, alt: 'A sailor photographs flight operations from the deck of an aircraft carrier' }}
          heading="Looking for a past contest?"
          body="The archive covers more than 260 yearly editions dating back to 1913."
          primary={{ label: 'Browse the Archive', href: '/essay-contests/archive' }}
        />
      </div>
    </section>
  )
}
