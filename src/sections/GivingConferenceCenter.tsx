import conferenceCenterImage from '@/assets/images/jackctaylorcenter-extended.jpg'

export default function GivingConferenceCenter() {
  return (
    <section
      className="relative w-full bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${conferenceCenterImage})`, minHeight: '520px' }}
    >
      <div className="absolute inset-0 bg-navy-boldest/20" aria-hidden="true" />

      {/* White card — left side */}
      <div className="relative container-site h-full flex items-center min-h-[520px]">
        <div className="bg-white p-8 lg:p-12 w-full max-w-full md:max-w-[480px] lg:max-w-[520px] my-12">
          <p className="font-body font-medium text-xs uppercase tracking-widest text-navy-subtle mb-3">
            Hosting Inspiring Events
          </p>
          <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-tight mb-4">
            The Jack C. Taylor Conference Center
          </h2>
          <p className="font-body text-base text-neutral-subtle leading-relaxed mb-6">
            The Jack C. Taylor Conference Center is a Temporary Secure Working Area capable of
            hosting classified presentations and discussions up to the TS/SCI level. We look
            forward to hosting your next conference, lecture, workshop, meeting, or professional
            gathering.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/giving/donate"
              className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 hover:bg-navy transition-colors"
            >
              Donate to the Center
            </a>
            <a
              href="/conference-center"
              className="inline-flex items-center justify-center bg-transparent text-navy-bolder border border-navy-bolder font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 hover:bg-navy-bolder hover:text-white transition-colors"
            >
              Visit the Center Website
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
