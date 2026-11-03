import { useParams, useSearchParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import SectionHeader from '@/components/ui/SectionHeader'
import BookGridCard from '@/components/cards/BookGridCard'
import BookRowCard from '@/components/cards/BookRowCard'
import NotFound from '@/pages/NotFound'
import { person } from '@/data/people'

function Bio({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div className="max-w-[760px] flex flex-col gap-5">
      {paragraphs.map((para, i) => (
        <p key={i} className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]">
          {para}
        </p>
      ))}
    </div>
  )
}

/**
 * A person (author) bio, at /people/:slug.
 *
 * The live page is a title, the bio, and a "Books by …" grid. Here it takes the
 * standard interior layout: the light-blue `PageHero`, the leaderboard ad right
 * under it, then the bio in the left-pinned reading column with the books in a
 * tan rail to its right (stacked under the bio below `lg`), each book a
 * cover-left row.
 */
export default function PersonPage() {
  const { slug = '' } = useParams()
  const [searchParams] = useSearchParams()
  // Layout trial: books in a right rail beside the bio by default; `?layout=stacked`
  // keeps the earlier full-width grid under the bio for comparison.
  const stacked = searchParams.get('layout') === 'stacked'
  const p = person(slug)
  if (!p) return <NotFound />

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PageHero
          title={p.name}
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Books & Press', href: '/books' },
              ]}
              current={p.name}
              className="border-b border-[#C2DDFF] pb-4"
            />
          }
        />

        <AdUnit />

        {stacked ? (
          <>
            <section className="bg-white pt-4 pb-12 lg:pb-16">
              <div className="container-site">
                <Bio paragraphs={p.bio} />
              </div>
            </section>

            {p.books.length > 0 && (
              <section id="books" className="bg-white pb-16 lg:pb-20 scroll-mt-8">
                <div className="container-site">
                  <SectionHeader headline={`Books by ${p.name}`} className="mb-10" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-5 gap-y-10">
                    {p.books.map((book) => (
                      <BookGridCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="bg-white pt-4 pb-16 lg:pb-20">
            <div className="container-site">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] xl:grid-cols-[minmax(0,1fr)_440px] gap-12 lg:gap-16 items-start">
                <Bio paragraphs={p.bio} />

                {p.books.length > 0 && (
                  <aside
                    id="books"
                    aria-labelledby="books-heading"
                    className="scroll-mt-8 bg-tan-subtlest p-6 lg:p-8"
                  >
                    <h2 id="books-heading" className="font-headline text-2xl lg:text-[28px] text-navy-bolder leading-[1.2] mb-6">
                      Books by {p.name}
                    </h2>
                    <div className="flex flex-col gap-8">
                      {p.books.map((book) => (
                        <BookRowCard key={book.id} book={book} />
                      ))}
                    </div>
                  </aside>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
