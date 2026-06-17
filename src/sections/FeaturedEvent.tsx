import eventImage from '@/assets/images/upcoming-event-teaser.jpg'

export default function FeaturedEvent() {
  return (
    <section className="pt-16 lg:pt-20 bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Content */}
          <div>
            <p className="font-body font-medium text-sm uppercase tracking-[1.5px] text-[#0466c8] mb-3">
              Upcoming Featured Event
            </p>
            <h2 className="font-headline text-[36px] lg:text-[44px] text-navy-bolder leading-[1.1] mb-5">
              Maritime Security Dialogue
            </h2>
            <p className="font-body font-bold text-base text-navy-bolder mb-1">
              Thursday, 18 June 2026
            </p>
            <p className="font-body font-bold text-base text-navy-bolder mb-5">
              Center for Strategic and Inter, Washington D.C.
            </p>
            <p className="font-body text-base text-neutral-subtle leading-relaxed mb-8">
              The series brings together the U.S. Naval Institute and CSIS, two of the nation's most respected non-partisan institutions.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/events/maritime-security-dialogue"
                className="inline-flex items-center justify-center bg-gold text-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 hover:bg-gold-dark transition-colors"
              >
                Register for event
              </a>
              <a
                href="/events/maritime-security-dialogue"
                className="inline-flex items-center justify-center bg-transparent text-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy-subtlest transition-colors"
              >
                View Event Details
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden">
            <img
              src={eventImage}
              alt="Maritime Security Dialogue panel discussion"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
