import { ButtonLink } from '@/components/ui/Button'
import { NavyButtonLink } from '@/components/ui/Button'
import heroImage from '@/assets/images/membership-hero.png'

export default function MembershipHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center py-24"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div
        className="relative z-10 bg-white flex flex-col justify-center gap-8
                   w-full lg:w-1/2 xl:w-[49%] max-w-[900px]
                   py-16 lg:py-20
                   pr-8 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.5rem, 6.5vw, 7rem)' }}
      >
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
          Membership
        </p>

        <div className="flex flex-col gap-6">
          <h1 className="font-headline text-5xl lg:text-6xl xl:text-[64px] text-navy-bolder leading-[1.1]">
            Join the independent forum for sea power
          </h1>
          <p className="font-body text-lg lg:text-xl text-neutral-subtle leading-relaxed">
            150 years of advancing the naval profession – through print, debate, and digital access.
            Choose the membership that fits your commitment.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 items-center">
          <NavyButtonLink href="/membership/join">
            Join USNI today
          </NavyButtonLink>
          <ButtonLink href="/membership/renew" variant="outline-dark" size="md">
            Renew existing membership
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
