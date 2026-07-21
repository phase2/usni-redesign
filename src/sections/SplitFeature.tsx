import membershipImage from '@/assets/images/membership-bottom-cta-wide.png'

export default function SplitFeature() {
  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${membershipImage})`, minHeight: '480px' }}
    >
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      {/* Content card — right side */}
      <div className="relative container-site h-full flex items-center justify-end min-h-[480px]">
        <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] my-12">
          <div className="eyebrow-headline mb-4">
            <p className="eyebrow">Join USNI</p>
            <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1]">
              Join 50,000+ Naval Professionals Worldwide
            </h2>
          </div>
          <p className="font-body text-base text-neutral-subtle leading-relaxed mb-6">
            Access Proceedings and Naval History, discounts on Press titles, and become part of the forum that shapes maritime thinking.
          </p>
          <a
            href="/membership/join"
            className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
          >
            Become a member
          </a>
        </div>
      </div>
    </section>
  )
}
