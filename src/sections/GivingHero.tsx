import heroImage from '@/assets/images/giving-hero-flipped-extended.png'
import { ButtonLink } from '@/components/ui/Button'

export default function GivingHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center lg:py-20"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Mobile-only: image stacks above the content panel */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="lg:hidden w-full aspect-[4/3] object-cover object-center"
      />

      {/* Navy content panel — pushed to the right */}
      <div className="relative z-10 flex lg:justify-end">
        <div
          className="bg-navy-boldest flex flex-col justify-center gap-6 lg:gap-8
                     w-full lg:w-1/2 xl:w-[49%] max-w-[900px]
                     py-10 lg:py-16 xl:py-20
                     pl-5 lg:pl-14"
          style={{ paddingRight: 'clamp(1.25rem, 6.5vw, 7rem)' }}
        >
          <div className="eyebrow-headline">
            <p className="eyebrow text-light-blue">Donate</p>
            <div className="flex flex-col gap-4 lg:gap-6">
              <h1 className="font-headline text-[32px] lg:text-5xl xl:text-[54px] text-white leading-[1.1]">
                Support the Naval Institute Foundation
              </h1>
              <p className="font-body text-[18px] lg:text-xl text-neutral-subtlest leading-relaxed">
                We utilize donations from members and other generous donors, along with contributions
                from corporations and foundations, to enrich the offerings, accessibility, and
                preservation of a great national treasure: the Naval Institute.
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
            <ButtonLink href="/giving/donate" variant="primary" size="md">
              Donate Today
            </ButtonLink>
            <ButtonLink href="/giving/contact" variant="outline" size="md">
              Contact the Foundation
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
