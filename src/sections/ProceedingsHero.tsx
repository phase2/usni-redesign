import proceedingsLogo from '@/assets/images/Proceedings_logo_white.png'

export default function ProceedingsHero() {
  return (
    <section
      className="flex flex-col items-center justify-center py-12 lg:py-20"
      style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}
    >
      <img
        src={proceedingsLogo}
        alt="Proceedings — U.S. Naval Institute"
        className="h-[58px] w-auto object-contain mb-8"
      />
      <p className="font-body text-white text-center text-lg leading-[1.4] max-w-[764px] px-6">
        Our flagship publication since 1874, Proceedings is the independent forum where military professionals, scholars, and strategists debate the most consequential issues facing naval and maritime defense. Every issue delivers peer-reviewed analysis, firsthand perspective, and bold argument.
      </p>
    </section>
  )
}
