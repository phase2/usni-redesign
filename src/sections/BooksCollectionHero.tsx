import { useSearchParams } from 'react-router-dom'
import BookSearchBar from '@/components/ui/BookSearchBar'
import Breadcrumb from '@/components/ui/Breadcrumb'

export default function BooksCollectionHero() {
  const [params] = useSearchParams()
  const q = params.get('q') ?? ''

  return (
    <section className="bg-[#ebf4ff] pt-12 pb-14">
      <div className="container-site flex flex-col gap-6">

        {/* Breadcrumb */}
        <Breadcrumb
          trail={[
            { label: 'Home', href: '/' },
            { label: 'Books & Press', href: '/books' },
          ]}
          current="All Books"
          className="border-b border-[#C2DDFF] pb-4"
        />

        <h1 className="font-headline text-[32px] lg:text-[64px] text-navy-bolder leading-[1.1]">
          All Books
        </h1>

        {/* Full width under the title, as on site search. Keyed on the
            keyword so Back/Forward refill the box with what was searched. */}
        <BookSearchBar key={q} size="large" initialQuery={q} />

      </div>
    </section>
  )
}
