import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import PageHero from '@/sections/PageHero'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import BookGridCard from '@/components/cards/BookGridCard'
import SmallFeature from '@/components/cards/SmallFeature'
import NotFound from '@/pages/NotFound'
import { person } from '@/data/people'

/**
 * A person (author) bio, at /people/:slug.
 *
 * Standard interior layout, stacked: the light-blue `PageHero`, the leaderboard
 * ad right under it, then the bio — with the headshot to its right when there is
 * one, as on the leadership bios — then every book on a tan band, then the
 * article grid on white. The live page puts articles first and caps books at
 * six; here books lead and all of them are listed. Sections with nothing to
 * show are left out. Section headlines use SectionHeader's type scale without
 * its top rule.
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

        {/* Bio — same text/photo split as LeadershipBioBody: the text leads in
            its reading column and the photo takes its own column from `md` up,
            stacking above the text below it. */}
        <section className="bg-white pt-4 pb-14 lg:pb-20">
          <div className="container-site">
            <div
              className={
                p.photo
                  ? 'flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,1fr)_240px] lg:grid-cols-[minmax(0,1fr)_320px] md:gap-12 lg:gap-16 md:items-start'
                  : ''
              }
            >
              <div className="max-w-[760px] flex flex-col gap-5 order-2 md:order-1">
                {p.bio.map((para, i) => (
                  <p key={i} className="font-body text-base lg:text-[17px] text-neutral-subtle leading-[1.75]">
                    {para}
                  </p>
                ))}
              </div>
              {p.photo && (
                <figure className="order-1 md:order-2 w-full max-w-[240px] md:max-w-none">
                  <img
                    src={p.photo}
                    alt={p.photoAlt ?? p.name}
                    className="w-full aspect-[4/5] object-cover object-top bg-neutral-subtlest"
                  />
                </figure>
              )}
            </div>
          </div>
        </section>

        {p.books.length > 0 && (
          <section id="books" className="bg-tan-subtlest py-14 lg:py-20 scroll-mt-8">
            <div className="container-site">
              <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1] mb-10">
                Books by {p.name}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-x-5 gap-y-10">
                {p.books.map((book) => (
                  <BookGridCard key={book.id} book={book} />
                ))}
              </div>
            </div>
          </section>
        )}

        {p.articles.length > 0 && (
          <section id="articles" className="bg-white py-14 lg:py-20 scroll-mt-8">
            <div className="container-site">
              <h2 className="font-headline text-4xl lg:text-5xl text-navy-bolder leading-[1.1] mb-10">
                Articles by {p.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {p.articles.map((article) => (
                  <SmallFeature key={article.id} article={article} aspectRatio="aspect-[5/3]" showExcerpt />
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
