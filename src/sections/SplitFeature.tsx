import storeImage from '@/assets/images/store-callout-bottom.png'

export default function SplitFeature() {
  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${storeImage})`, minHeight: '480px' }}
    >
      {/* Subtle overlay to preserve readability of content card */}
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      {/* Content card — right side */}
      <div className="relative container-site h-full flex items-center justify-end min-h-[480px]">
        <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] my-12">
          <div className="eyebrow-headline mb-4">
            <p className="eyebrow">USNI Store</p>
            <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-tight">
              Shop Our Ship's Store
            </h2>
          </div>
          <p className="font-body text-base text-neutral-subtle leading-relaxed mb-1.5">
            Show your U.S. Naval Institute pride wherever you go with a selection of t-shirts, hoodies,
            hats, notebooks, and more in our Ship's Store.
          </p>
          <p className="font-body font-bold text-sm text-navy-bolder mb-6">
            Members get 20% off all orders year-round
          </p>
          <a
            href="/ships-store"
            className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy transition-colors"
          >
            Shop USNI Products
          </a>
        </div>
      </div>
    </section>
  )
}
