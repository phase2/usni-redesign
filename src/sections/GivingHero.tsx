import heroImage from '@/assets/images/demo-hero/giving-hero-feature.png'
import { ButtonLink } from '@/components/ui/Button'

export default function GivingHero() {
  return (
    <section className="flex flex-col lg:flex-row lg:min-h-[640px]">
      {/* Photo — stacks above on mobile, left half on desktop */}
      <div className="w-full aspect-[4/3] lg:aspect-auto lg:w-1/2 overflow-hidden">
        <img
          src={heroImage}
          alt="U.S. Naval Institute Foundation supporters"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Navy panel */}
      <div className="w-full lg:w-1/2 bg-navy-boldest flex items-center">
        <div className="px-5 sm:px-10 lg:px-16 xl:px-20 py-10 lg:py-16 max-w-[660px] flex flex-col gap-6 lg:gap-8">
          <div className="eyebrow-headline">
            <p className="eyebrow text-light-blue">Donate</p>
            <div className="flex flex-col gap-4 lg:gap-6">
              <h1 className="font-headline text-[32px] lg:text-4xl xl:text-[54px] text-white leading-[1.1]">
                Support the Naval Institute Foundation
              </h1>
              <p className="font-body text-[18px] lg:text-lg text-white/80 leading-relaxed">
                We utilize donations from members and other generous donors, along with contributions
                from corporations and foundations, to enrich the offerings, accessibility, and
                preservation of a great national treasure: the Naval Institute.
              </p>
            </div>
          </div>
          <ButtonLink href="/giving/donate" variant="primary" size="md" className="justify-center lg:w-auto w-full">
            Donate Today
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
