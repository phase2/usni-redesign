import { ButtonLink, NavyButtonLink } from '@/components/ui/Button'
import heroImage from '@/assets/images/8587-09-158.jpg'

/**
 * Events landing hero — the white split-panel treatment from the membership
 * landing page, so the two section fronts read as siblings.
 */
export default function EventsHero() {
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

      <div
        className="relative z-10 bg-white flex flex-col justify-center gap-6 lg:gap-8
                   w-full lg:w-1/2 xl:w-[49%] max-w-[900px]
                   py-10 lg:py-16 xl:py-20
                   pr-5 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.25rem, 6.5vw, 7rem)' }}
      >
        <div className="flex flex-col gap-4 lg:gap-6">
          <h1 className="font-headline text-[32px] lg:text-5xl xl:text-[64px] text-navy-bolder leading-[1.1]">
            Conferences &amp; Events
          </h1>
          <p className="font-body text-[18px] lg:text-xl text-neutral-subtle leading-relaxed">
            The U.S. Naval Institute hosts a variety of events supporting an open forum to debate
            key issues in the Sea Services. Learn more, register to attend, or watch online.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
          <NavyButtonLink href="/events/all">See all events</NavyButtonLink>
          <ButtonLink
            href="https://www.jackctaylorconferencecenter.org/"
            variant="outline-dark"
            size="md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Host an event
            <i
              className="fa-solid fa-arrow-up-right-from-square text-xs"
              aria-hidden="true"
            />
            <span className="sr-only">(opens in a new tab)</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
