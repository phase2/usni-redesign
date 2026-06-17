import { ButtonLink } from '@/components/ui/Button'
import { NavyButtonLink } from '@/components/ui/Button'
import heroImage from '@/assets/images/membership-hero.png'

export default function MembershipHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center lg:py-24"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
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
          <p className="eyebrow">Membership</p>
          <div className="flex flex-col gap-4 lg:gap-6">
            <h1 className="font-headline text-[32px] lg:text-5xl xl:text-[64px] text-navy-bolder leading-[1.1]">
              Join the independent forum for sea power
            </h1>
            <p className="font-body text-[18px] lg:text-xl text-neutral-subtle leading-relaxed">
              150 years of advancing the naval profession – through print, debate, and digital access.
              Choose the membership that fits your commitment.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 lg:items-center">
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
