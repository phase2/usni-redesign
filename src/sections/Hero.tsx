import { ButtonLink } from '@/components/ui/Button'
import heroImage from '@/assets/images/homepage-hero-image.jpg'

export default function Hero() {
  return (
    <section
      className="relative w-full bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Navy content panel — bleeds to viewport left edge, no container constraint */}
      <div
        className="relative z-10 bg-navy-boldest flex flex-col justify-center gap-8
                   w-full lg:w-1/2 xl:w-[49%]
                   py-16 lg:py-20
                   pr-8 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.5rem, 6.5vw, 7rem)' }}
      >
        {/* Eyebrow */}
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-light-blue">
          U.S. Naval Institute
        </p>

        {/* Headline + body */}
        <div className="flex flex-col gap-6">
          <h1 className="font-headline text-5xl lg:text-6xl xl:text-[64px] text-white leading-[1.1]">
            An Independent Forum for Those Who Dare to Think Seriously About Sea Power
          </h1>
          <p className="font-body text-lg lg:text-xl text-neutral-subtlest leading-relaxed">
            For more than 150 years, the Naval Institute has provided the open forum where naval
            professionals read, think, speak, and write — advancing the professional, literary, and
            scientific understanding of sea power and global security.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 items-center">
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
