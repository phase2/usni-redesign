import ctaImg from '@/assets/images/Russell-NH-5-26-1 Hero.webp'

export default function NavalHistoryMembershipCTA() {
  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${ctaImg})`, minHeight: '480px' }}
    >
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      <div className="relative container-site h-full flex items-center justify-end min-h-[480px]">
        <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[560px] my-20">
          <div className="eyebrow-headline mb-4">
            <p className="eyebrow">Subscribe to Naval History</p>
            <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">
              History lives in every issue.
            </h2>
          </div>
          <p className="font-body text-base text-neutral-subtle leading-relaxed mb-6">
            Naval History delivers authoritative, deeply researched stories six times a year — battles won and lost, leaders who shaped navies, and the technology that changed warfare at sea. USNI members save 28% on every subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/membership/magazine-upsell?plan=full&term=1&region=us&price=75"
              className="inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-6 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
            >
              Subscribe now →
            </a>
            <a
              href="/membership/join"
              className="inline-flex items-center justify-center gap-2 bg-white text-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-6 py-3.5 border border-navy-bolder hover:bg-neutral-subtlest transition-colors"
            >
              Become a member
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
