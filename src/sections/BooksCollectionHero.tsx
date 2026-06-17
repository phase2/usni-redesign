import BookSearchBar from '@/components/ui/BookSearchBar'

export default function BooksCollectionHero() {
  return (
    <section className="bg-[#ebf4ff] pt-12 pb-14">
      <div className="container-site flex flex-col gap-6">

        {/* Breadcrumb */}
        <div className="border-b border-[#C2DDFF] pb-4 flex items-center gap-2 text-sm">
          <a href="/" className="font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors">Home</a>
          <span className="text-neutral-subtle">/</span>
          <a href="/books" className="font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors">Books &amp; Press</a>
          <span className="text-neutral-subtle">/</span>
          <span className="font-body italic text-neutral-subtle">All Books</span>
        </div>

        {/* Title + search row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-10">
          <h1 className="font-headline text-[32px] lg:text-[48px] xl:text-[64px] text-navy-bolder leading-[1.1] flex-shrink-0">
            All Books
          </h1>
          <div className="w-full lg:max-w-[520px] lg:pb-1">
            <BookSearchBar />
          </div>
        </div>

      </div>
    </section>
  )
}
