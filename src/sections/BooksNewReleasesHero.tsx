export default function BooksNewReleasesHero() {
  return (
    <section className="bg-[#ebf4ff] pt-12 pb-14">
      <div className="container-site flex flex-col gap-6">

        {/* Breadcrumb */}
        <div className="border-b border-[#C2DDFF] pb-4 flex items-center gap-2 text-sm">
          <a href="/" className="font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors">Home</a>
          <span className="text-neutral-subtle">/</span>
          <a href="/books" className="font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors">Books &amp; Press</a>
          <span className="text-neutral-subtle">/</span>
          <span className="font-body italic text-neutral-subtle">New Releases</span>
        </div>

        {/* Title + CTA row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
          <h1 className="font-headline text-[32px] lg:text-[48px] xl:text-[64px] text-navy-bolder leading-[1.1] flex-shrink-0">
            New Releases
          </h1>
          <div className="lg:pb-2 flex-shrink-0">
            <a
              href="/books/collection"
              className="inline-flex items-center gap-2.5 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.2px] px-6 py-4 hover:bg-navy-bright transition-colors"
            >
              Browse all books
              <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
