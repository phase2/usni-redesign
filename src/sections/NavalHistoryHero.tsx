import nhLogo from '@/assets/images/Naval_History_logo_white_500px.webp'

export default function NavalHistoryHero() {
  return (
    <section
      className="flex flex-col items-center justify-center py-12 lg:py-20"
      style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}
    >
      <img
        src={nhLogo}
        alt="Naval History — U.S. Naval Institute"
        className="h-[58px] w-auto object-contain mb-8"
      />
      <p className="font-body text-white text-center text-lg leading-[1.4] max-w-[764px] px-6">
        The world's most authoritative and engaging periodical for readers interested in nautical heritage. Published six times a year, Naval History brings the past to life through firsthand accounts, bold scholarship, and stunning imagery.
      </p>
    </section>
  )
}
