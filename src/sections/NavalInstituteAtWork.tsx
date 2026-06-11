import PlainCard from '@/components/cards/PlainCard'
import { navInstituteAtWorkCards } from '@/data/homepage'

export default function NavalInstituteAtWork() {
  return (
    <section className="bg-surface-subtle py-16 lg:py-20">
      <div className="container-site">
        {/* Section header */}
        <div className="eyebrow-headline items-center text-center mb-12">
          <p className="eyebrow">Publishing, Reporting, Educating, and Convening</p>
          <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder">
            The Naval Institute at work
          </h2>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {navInstituteAtWorkCards.map((card) => (
            <PlainCard key={card.href} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
