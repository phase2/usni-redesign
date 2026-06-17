import heroImage from '@/assets/images/dontate-hero.jpg'

export default function DonateHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image — fluid height; on mobile stays tall enough to show above the card */}
      <div
        className="w-full bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          height: 'clamp(320px, 40vw, 580px)',
        }}
        aria-hidden="true"
      />

      {/* White card — on mobile: minimal overlap so image is visible; on desktop: deep overlap */}
      <div
        className="relative z-10 flex justify-center"
        style={{ marginTop: 'clamp(-200px, calc(-28vw + 110px), 0px)' }}
      >
        <div className="bg-white text-center px-6 sm:px-12 lg:px-20 py-10 lg:py-16 w-full max-w-[860px] mx-4 lg:mx-8">
          <div className="eyebrow-headline items-center">
            <p className="eyebrow">Support the Mission</p>
            <h1 className="font-headline text-[32px] lg:text-4xl xl:text-[56px] text-navy-bolder leading-[1.1]">
              Make a Gift to the Naval Institute Today
            </h1>
          </div>
          <p className="font-body text-[18px] lg:text-lg text-neutral-subtle leading-relaxed max-w-[620px] mx-auto mt-5 lg:mt-6">
            Your donation in support of the U.S. Naval Institute will help underwrite the open,
            independent, nonpartisan forum that gives voice to all who seek the finest Navy,
            Marine Corps, and Coast Guard as well as safeguard and share the history of the
            Sea Services.
          </p>
        </div>
      </div>
    </section>
  )
}
