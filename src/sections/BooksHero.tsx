import heroBg from '@/assets/images/books/custom-bookstore-hero.png'
import BookSearchBar from '@/components/ui/BookSearchBar'

export default function BooksHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center py-20"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Left-aligned white card — matches MembershipHero layout */}
      <div
        className="relative z-10 bg-white flex flex-col justify-center gap-8
                   w-full lg:w-1/2 xl:w-[49%] max-w-[860px]
                   py-14 lg:py-20
                   pr-8 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.5rem, 6.5vw, 7rem)' }}
      >
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
          Naval Institute Press
        </p>

        <div className="flex flex-col gap-5">
          <h1 className="font-headline text-5xl lg:text-[64px] text-navy-bolder leading-[1.05]">
            Books &amp; Press
          </h1>
          <p className="font-body text-lg text-neutral-subtle leading-relaxed">
            Founded in 1898, the Naval Institute Press publishes essential military
            and naval titles — from foundational Sea Service guides to New York Times
            bestselling fiction.
          </p>
        </div>

        <BookSearchBar />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/books/collection"
            className="flex-1 flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 hover:bg-navy transition-colors"
          >
            Browse full collection
          </a>
          <a
            href="/books/about"
            className="flex-1 flex items-center justify-center border border-navy-bolder text-navy-bolder font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 hover:bg-surface-subtle transition-colors"
          >
            Learn more about the Press
          </a>
        </div>
      </div>
    </section>
  )
}
