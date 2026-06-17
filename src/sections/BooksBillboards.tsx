import oralHistoryImg from '@/assets/images/oral-history-50-feature.png'
import shipsStoreImg from '@/assets/images/ships-store-50-feature.png'

function ArrowIcon() {
  return (
    <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6h8M6 2l4 4-4 4" />
    </svg>
  )
}

export default function BooksBillboards() {
  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="container-site flex flex-col gap-8">

        {/* Oral History — navy left / photo right (matches NavalHistoryBillboard pattern) */}
        <div className="bg-navy-bolder flex flex-col lg:flex-row w-full">
          <div className="flex-1 flex items-center p-12">
            <div className="border border-navy-bold flex flex-col gap-4 px-12 py-16 w-full">
              <div className="flex flex-col gap-2">
                <p className="font-body font-medium text-sm uppercase tracking-[0.05em] text-[#e0e0cc]">
                  From the Archives
                </p>
                <h3 className="font-headline text-[48px] text-white leading-[1.1]">
                  The U.S. Naval Institute Oral History Program
                </h3>
              </div>
              <p className="font-body text-xl text-white/90 leading-[1.4]">
                Oral histories offer a richer understanding of naval history through candid
                recollections and explanations rarely entered into contemporary records.
              </p>
              <div className="pt-3">
                <a
                  href="/books/oral-histories"
                  className="inline-flex items-center gap-2 bg-gold text-navy-boldest font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-gold-dark transition-colors"
                >
                  View the Oral Histories archive
                  <ArrowIcon />
                </a>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
            <img
              src={oralHistoryImg}
              alt="U.S. Naval Institute Oral History Program"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Ship's Store — photo left / tan card right (matches OrgMembershipBillboard pattern) */}
        <div className="bg-tan-subtlest flex flex-col lg:flex-row w-full">
          <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
            <img
              src={shipsStoreImg}
              alt="USNI Ship's Store"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex items-center p-12">
            <div className="border border-tan-subtle flex flex-col gap-4 px-12 py-16 w-full">
              <div className="flex flex-col gap-2">
                <p className="font-body font-medium text-sm uppercase tracking-[0.05em] text-[#0466c8]">
                  USNI Store
                </p>
                <h3 className="font-headline text-[48px] text-navy-bolder leading-[1.1]">
                  Shop Our Ship's Store
                </h3>
              </div>
              <p className="font-body text-xl text-neutral-subtle leading-[1.4]">
                Show your U.S. Naval Institute pride wherever you go with a selection of
                t-shirts, hoodies, hats, notebooks, and more in our Ship's Store.
              </p>
              <p className="font-body font-bold text-base text-navy-bolder">
                Members get 20% off all orders year-round.
              </p>
              <div className="pt-3">
                <a
                  href="/ships-store"
                  className="inline-flex items-center gap-2 bg-navy-bold text-white font-body font-bold text-base tracking-[-0.5px] px-6 py-4 border border-navy-bold hover:bg-navy transition-colors"
                >
                  Shop now
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
