import { ButtonLink } from '@/components/ui/Button'
import heroImage from '@/assets/images/homepage-hero-image.jpg'

export default function Hero() {
  return (
    <section
      className="relative w-full bg-cover bg-center lg:py-24"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Mobile-only: image stacks above the content panel */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="lg:hidden w-full aspect-[4/3] object-cover object-center"
      />

      {/* Navy content panel */}
      <div
        className="relative z-10 bg-navy-boldest flex flex-col justify-center gap-6 lg:gap-8
                   w-full lg:w-1/2 xl:w-[49%] max-w-[900px]
                   py-10 lg:py-16 xl:py-20
                   pr-5 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.25rem, 6.5vw, 7rem)' }}
      >
        <div className="eyebrow-headline">
          <p className="eyebrow text-light-blue">
            U.S. Naval Institute
          </p>
          <div className="flex flex-col gap-4 lg:gap-6">
            <h1 className="font-headline text-[32px] lg:text-5xl xl:text-[64px] text-white leading-[1.1]">
              An Independent Forum for Those Who Dare to Think Seriously About Sea Power
            </h1>
            <p className="font-body text-[18px] lg:text-xl text-neutral-subtlest leading-relaxed">
              For more than 150 years, the Naval Institute has provided the open forum where naval
              professionals read, think, speak, and write — advancing the professional, literary, and
              scientific understanding of sea power and global security.
            </p>
          </div>
        </div>

        {/* CTAs — stacked full-width on mobile, inline on desktop */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
          <ButtonLink href="/about" variant="primary" size="md">
            Learn more about our mission
          </ButtonLink>
          <ButtonLink href="/giving/donate" variant="outline" size="md">
            Support our mission
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
