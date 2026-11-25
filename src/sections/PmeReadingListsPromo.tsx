import readingListsImg from '@/assets/images/military-reading-lists-feature.webp'
import SplitBillboard from '@/components/ui/SplitBillboard'

/**
 * Pointer from the PME hub to the military reading lists, in the navy split
 * billboard. Replaces a full-bleed navy band that also listed all seven
 * services — that list was a second table of contents for the page this CTA
 * already goes to.
 */
export default function PmeReadingListsPromo() {
  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="container-site">
        <SplitBillboard
          theme="navy"
          imagePosition="left"
          image={{ src: readingListsImg, alt: "A Marine reads a paperback copy of With the Old Breed in a ship's compartment" }}
          heading="Where Press books are required reading"
          body="Naval Institute Press titles appear across the services’ professional reading programs — from the CNO’s Professional Reading Library to the Commandant’s list."
          primary={{ label: 'View the Military Reading Lists', href: '/press/military-reading-lists' }}
        />
      </div>
    </section>
  )
}
