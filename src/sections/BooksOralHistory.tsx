import oralHistoryImg from '@/assets/images/org-membership-billboard.jpg'

export default function BooksOralHistory() {
  return (
    <section className="w-full overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[480px]">

        {/* Left: content panel */}
        <div className="bg-navy-bolder flex-1 flex items-center">
          <div className="px-10 lg:px-16 py-14 max-w-[560px]">
            <p className="font-body font-semibold text-xs uppercase tracking-widest text-white/60 mb-2">
              From the Archives
            </p>
            <h2 className="font-headline text-3xl lg:text-4xl xl:text-[44px] text-white leading-[1.1] mb-5">
              The U.S. Naval Institute Oral History Program
            </h2>
            <p className="font-body text-base text-white/75 leading-relaxed mb-8">
              Oral histories offer a richer understanding of naval history through candid
              recollections and explanations rarely entered into contemporary records.
            </p>
            <a
              href="/books/oral-histories"
              className="inline-flex items-center gap-2 bg-gold text-navy-boldest font-body font-bold text-sm tracking-[-0.2px] px-6 py-3.5 hover:bg-gold-dark transition-colors"
            >
              View the Oral Histories archive
            </a>
          </div>
        </div>

        {/* Right: photo */}
        <div className="hidden lg:block flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${oralHistoryImg})` }} aria-hidden="true" />

      </div>
    </section>
  )
}
