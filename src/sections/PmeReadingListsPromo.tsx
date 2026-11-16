import readingListsImg from '@/assets/images/military-reading-lists-feature.webp'

function ArrowIcon() {
  return (
    <svg
      className="w-3 h-3 flex-shrink-0"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  )
}

/**
 * Pointer from the PME hub to the military reading lists.
 *
 * The contained billboard treatment used by BooksBillboards and
 * EssayContestsArchiveTeaser: a navy block inside `container-site` with a thin
 * rule inset by the block's own padding, and a photo half beside it. Replaces a
 * full-bleed navy band that also listed all seven services — that list was a
 * second table of contents for the page this CTA already goes to.
 */
export default function PmeReadingListsPromo() {
  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="container-site">
        <div className="bg-navy-bolder flex flex-col lg:flex-row w-full">
          <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
            <img
              src={readingListsImg}
              alt="A Marine reads a paperback copy of With the Old Breed in a ship's compartment"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex items-center p-6 lg:p-12">
            <div className="border border-navy-bold w-full flex flex-col gap-4 px-6 py-10 lg:px-12 lg:py-16">
              <h2 className="font-headline text-[32px] lg:text-[48px] text-white leading-[1.1]">
                Where Press books are required reading
              </h2>
              <p className="font-body text-lg lg:text-xl text-white/90 leading-[1.4]">
                Naval Institute Press titles appear across the services’ professional
                reading programs — from the CNO’s Professional Reading Library to the
                Commandant’s list.
              </p>
              <div className="pt-3">
                <a
                  href="/press/military-reading-lists"
                  className="inline-flex items-center gap-2 self-start bg-gold text-navy-boldest font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-gold-dark transition-colors"
                >
                  View the Military Reading Lists
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
