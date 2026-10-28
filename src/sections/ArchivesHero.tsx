import { ButtonLink, NavyButtonLink } from '@/components/ui/Button'
import heroImage from '@/assets/images/archives-hero-banner.png'

/**
 * Light hero, matching MembershipHero: a full-bleed photograph with a white
 * content panel over its left half. Replaces the split navy panel this page
 * used, so the interior landing pages open the same way.
 */
export default function ArchivesHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center lg:py-24"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      {/* Mobile: the photograph stacks above the panel rather than sitting behind it */}
      <img
        src={heroImage}
        alt=""
        aria-hidden="true"
        className="lg:hidden w-full aspect-[4/3] object-cover object-center"
      />

      <div
        className="relative z-10 bg-white flex flex-col justify-center gap-6 lg:gap-8
                   w-full lg:w-1/2 xl:w-[49%] max-w-[900px]
                   py-10 lg:py-16 xl:py-20
                   pr-5 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.25rem, 6.5vw, 7rem)' }}
      >
        <div className="eyebrow-headline">
          <p className="eyebrow">Archives</p>
          <div className="flex flex-col gap-4 lg:gap-6">
            <h1 className="font-headline text-[32px] lg:text-5xl xl:text-[64px] text-navy-bolder leading-[1.1]">
              About the Archives
            </h1>
            <p className="font-body text-[18px] lg:text-xl text-neutral-subtle leading-relaxed">
              The Naval Institute Archives preserves the institutional memory of the U.S. Naval
              Institute and the sea services — oral histories, photographic collections,
              unpublished memoirs, manuscripts, and records spanning 150 years of naval history.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
          <NavyButtonLink href="/archives/oral-histories">
            Browse Collections
          </NavyButtonLink>
          <ButtonLink href="/archives/research-requests" variant="outline-dark" size="md">
            Request Research
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
