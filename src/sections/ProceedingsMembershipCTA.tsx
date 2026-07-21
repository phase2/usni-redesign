import splitFeatureImg from '@/assets/images/Russell-NH-5-26-1 Hero.webp'

export default function ProceedingsMembershipCTA() {
  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${splitFeatureImg})`, minHeight: '480px' }}
    >
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      <div className="relative container-site h-full flex items-center justify-end min-h-[480px]">
        <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[560px] my-20">
          <div className="eyebrow-headline mb-4">
            <p className="eyebrow">Join USNI & Subscribe</p>
            <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1]">
              Proceedings goes deeper. So should you.
            </h2>
          </div>
          <p className="font-body text-base text-neutral-subtle leading-relaxed mb-6">
            A USNI membership gives you full access to every issue of Proceedings — plus the complete digital archive stretching back to 1874, member pricing on Naval Institute Press titles, and a community of the most serious minds in maritime defense. For less than a dollar a week, you're part of the conversation that matters.
          </p>
          <a
            href="/membership/join"
            className="inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-6 py-3.5 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
          >
            Start your membership →
          </a>
        </div>
      </div>
    </section>
  )
}
