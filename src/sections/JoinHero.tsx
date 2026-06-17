import heroImage from '@/assets/images/membership-join-hero.jpg'

export default function JoinHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          height: 'clamp(320px, 40vw, 580px)',
        }}
        aria-hidden="true"
      />

      {/* White card — on mobile: minimal overlap; on desktop: deep overlap */}
      <div
        className="relative z-10 flex justify-center"
        style={{ marginTop: 'clamp(-200px, calc(-28vw + 110px), 0px)' }}
      >
        <div className="bg-white text-center px-6 sm:px-12 lg:px-20 py-10 lg:py-16 w-full max-w-[860px] mx-4 lg:mx-8">
          <div className="eyebrow-headline items-center">
            <p className="eyebrow">Membership</p>
            <h1 className="font-headline text-[32px] lg:text-4xl xl:text-[56px] text-navy-bolder leading-[1.1]">
              Join the Naval Institute Today
            </h1>
          </div>
          <p className="font-body text-[18px] lg:text-lg text-neutral-subtle leading-relaxed max-w-[620px] mx-auto mt-5 lg:mt-6">
            Join the U.S. Naval Institute and add your voice to strengthen the naval profession.
            Dare to make a difference.
          </p>
        </div>
      </div>
    </section>
  )
}
