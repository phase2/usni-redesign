import heroImage from '@/assets/images/dontate-hero.jpg'

export default function JoinHero() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
          height: 'clamp(480px, 55vw, 780px)',
        }}
        aria-hidden="true"
      />

      {/* White content box — centered, overlaps bottom of image */}
      <div className="relative z-10 flex justify-center" style={{ marginTop: 'clamp(-260px, -22vw, -380px)' }}>
        <div className="bg-white text-center px-16 py-16 w-full max-w-[938px] mx-4 lg:mx-8">
          <p className="font-body font-medium text-[18px] uppercase tracking-[0.06em] text-[#0466c8] mb-2">
            Membership
          </p>

          <div className="flex flex-col gap-6 pt-2 pb-3">
            <h1 className="font-headline text-5xl lg:text-[64px] text-navy-bolder leading-[1.1]">
              Join the Naval Institute Today
            </h1>
            <p className="font-body text-xl lg:text-2xl text-neutral-subtle leading-[1.4] max-w-[810px] mx-auto">
              Support the world's leading independent forum for sea power. Your membership funds open debate,
              acclaimed publications, and 150+ years of naval heritage — connecting you to the Sea Services
              like nothing else.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
