import oralHistoryImg from '@/assets/images/oral-history-50-feature.png'
import shipsStoreImg from '@/assets/images/ships-store-50-feature.png'
import SplitBillboard from '@/components/ui/SplitBillboard'

export default function BooksBillboards() {
  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="container-site flex flex-col gap-8">
        <SplitBillboard
          theme="navy"
          imagePosition="right"
          image={{ src: oralHistoryImg, alt: 'U.S. Naval Institute Oral History Program' }}
          eyebrow="From the Archives"
          heading="The U.S. Naval Institute Oral History Program"
          headingLevel="h3"
          body="Oral histories offer a richer understanding of naval history through candid recollections and explanations rarely entered into contemporary records."
          primary={{ label: 'View the Oral Histories archive', href: '/archives/oral-histories' }}
        />

        <SplitBillboard
          theme="tan"
          imagePosition="left"
          image={{ src: shipsStoreImg, alt: "USNI Ship's Store" }}
          eyebrow="USNI Store"
          heading="Shop Our Ship's Store"
          headingLevel="h3"
          body={
            <>
              <p>
                Show your U.S. Naval Institute pride wherever you go with a selection of t-shirts, hoodies, hats,
                notebooks, and more in our Ship's Store.
              </p>
              <p className="mt-3 font-bold text-base text-navy-bolder">Members get 20% off all orders year-round.</p>
            </>
          }
          primary={{ label: 'Shop now', href: '/ships-store' }}
        />
      </div>
    </section>
  )
}
