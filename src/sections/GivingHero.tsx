import heroImage from '@/assets/images/demo-hero/giving-hero-feature.png'
import { ButtonLink } from '@/components/ui/Button'

export default function GivingHero() {
  return (
    <section className="flex min-h-[560px] lg:min-h-[640px]">
      {/* Left — photo */}
      <div className="hidden lg:block w-1/2 overflow-hidden">
        <img
          src={heroImage}
          alt="U.S. Naval Institute Foundation supporters"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Right — navy panel */}
      <div className="w-full lg:w-1/2 bg-navy-boldest flex items-center">
        <div className="px-10 lg:px-16 xl:px-20 py-16 max-w-[660px]">
          <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-light-blue mb-4">
            Donate
          </p>
          <h1 className="font-headline text-4xl lg:text-5xl xl:text-[54px] text-white leading-[1.1] mb-6">
            Support the Naval Institute Foundation
          </h1>
          <p className="font-body text-base lg:text-lg text-white/80 leading-relaxed mb-8">
            We utilize donations from members and other generous donors, along with contributions
            from corporations and foundations, to enrich the offerings, accessibility, and
            preservation of a great national treasure: the Naval Institute.
          </p>
          <ButtonLink href="/giving/donate" variant="primary" size="md">
            Donate Today
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
