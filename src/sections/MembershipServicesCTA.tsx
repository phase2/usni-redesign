import bgImage from '@/assets/images/jackctaylorcenter-extended.jpg'

export default function MembershipServicesCTA() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
        aria-hidden="true"
      />

      {/* Content card — right side */}
      <div className="relative container-site h-full flex items-center justify-end min-h-[480px]">
        <div className="bg-navy-boldest p-8 lg:p-12 w-full max-w-full md:max-w-[520px] my-12">
          <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-light-blue mb-3">
            Have additional questions?
          </p>
          <h2 className="font-headline text-3xl lg:text-4xl text-white leading-tight mb-4">
            Our membership services team is here to assist you.
          </h2>
          <p className="font-body text-base text-neutral-subtlest leading-relaxed mb-6">
            Whether you have questions about joining, your current membership, gift memberships, or
            publication subscriptions, our team is ready to help you find the right path.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/membership/contact"
              className="inline-flex items-center justify-center bg-gold text-navy-bolder
                         font-body font-bold text-base tracking-[-0.3px]
                         px-5 py-3.5 hover:bg-gold-dark transition-colors"
            >
              Contact us for assistance
            </a>
            <a
              href="/membership/faq"
              className="inline-flex items-center justify-center bg-transparent text-white
                         border border-white font-body font-bold text-base tracking-[-0.3px]
                         px-5 py-3.5 hover:bg-white/10 transition-colors"
            >
              View FAQ
            </a>
          </div>
        </div>
      </div>

    </section>
  )
}
