import heroBg from '@/assets/images/books/custom-bookstore-hero.png'
import BookSearchBar from '@/components/ui/BookSearchBar'

export default function BooksHero() {
  return (
    <section
      className="relative w-full bg-cover bg-center lg:py-20"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        className="lg:hidden w-full aspect-[4/3] object-cover object-center"
      />

      <div
        className="relative z-10 bg-white flex flex-col justify-center gap-6 lg:gap-8
                   w-full lg:w-1/2 xl:w-[49%] max-w-[860px]
                   py-10 lg:py-14 xl:py-20
                   pr-5 lg:pr-14"
        style={{ paddingLeft: 'clamp(1.25rem, 6.5vw, 7rem)' }}
      >
        <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-navy-subtle">
          Naval Institute Press
        </p>

        <div className="flex flex-col gap-4 lg:gap-5">
          <h1 className="font-headline text-[32px] lg:text-5xl lg:text-[64px] text-navy-bolder leading-[1.1]">
            Books &amp; Press
          </h1>
          <p className="font-body text-[18px] text-neutral-subtle leading-relaxed">
            Founded in 1898, the Naval Institute Press publishes essential military
            and naval titles — from foundational Sea Service guides to New York Times
            bestselling fiction.
          </p>
        </div>

        <BookSearchBar />

        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
          <a
            href="/books/collection"
            className="flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 hover:bg-navy transition-colors"
          >
            Browse full collection
          </a>
          <a
            href="/books/about"
            className="flex items-center justify-center border border-navy-bolder text-navy-bolder font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 hover:bg-surface-subtle transition-colors"
          >
            Learn more about the Press
          </a>
        </div>
      </div>
    </section>
  )
}
