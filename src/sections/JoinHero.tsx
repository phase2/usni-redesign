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

      {/* White content card — centered, overlaps bottom of image */}
      <div className="relative z-10 flex justify-center" style={{ marginTop: 'clamp(-200px, -18vw, -300px)' }}>
        <div className="bg-white text-center px-12 lg:px-20 py-12 lg:py-16 w-full max-w-[860px] mx-4 lg:mx-8">
          <p className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-navy-subtle mb-4">
            Membership
          </p>
          <h1 className="font-headline text-4xl lg:text-5xl xl:text-[56px] text-navy-bolder leading-[1.1] mb-6">
            Join the Naval Institute Today
          </h1>
          <p className="font-body text-base lg:text-lg text-neutral-subtle leading-relaxed max-w-[620px] mx-auto">
            Join the U.S. Naval Institute and add your voice to strengthen the naval profession.
            Dare to make a difference.
          </p>
        </div>
      </div>
    </section>
  )
}
