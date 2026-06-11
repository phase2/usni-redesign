import heroImage from '@/assets/images/dontate-hero.jpg'

export default function DonateHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="w-full bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          height: 'clamp(320px, 40vw, 580px)',
        }}
        aria-hidden="true"
      />

      {/* White content card — centered, overlaps bottom of image */}
      <div className="relative z-10 flex justify-center" style={{ marginTop: 'clamp(-200px, -18vw, -300px)' }}>
        <div className="bg-white text-center px-12 lg:px-20 py-12 lg:py-16 w-full max-w-[860px] mx-4 lg:mx-8">
          <div className="eyebrow-headline items-center">
            <p className="eyebrow">Support the Mission</p>
            <h1 className="font-headline text-4xl lg:text-5xl xl:text-[56px] text-navy-bolder leading-[1.1]">
              Make a Gift to the Naval Institute Today
            </h1>
          </div>
          <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed max-w-[620px] mx-auto mt-6">
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
