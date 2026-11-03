import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import SectionHeader from '@/components/ui/SectionHeader'
import BookGridCard from '@/components/cards/BookGridCard'
import NotFound from '@/pages/NotFound'
import { person } from '@/data/people'

/**
 * A person (author) bio, at /people/:slug.
 *
 * The live page is a title, the bio, and a "Books by …" grid. Here it takes the
 * standard interior layout: the light-blue `PageHero`, the leaderboard ad right
 * under it, the bio in the left-pinned reading column (it shares the page with a
 * card grid), then the books under a ruled section header.
 */
export default function PersonPage() {
  const { slug = '' } = useParams()
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

        <section className="bg-white pt-4 pb-12 lg:pb-16">
          <div className="container-site">
            <div className="max-w-[760px] flex flex-col gap-5">
              {p.bio.map((para, i) => (
                <p key={i} className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]">
                  {para}
                </p>
              ))}
            </div>
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
      </main>
      <Footer />
    </div>
  )
}
