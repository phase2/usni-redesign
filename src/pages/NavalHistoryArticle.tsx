import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import NavalHistorySubNav from '@/sections/NavalHistorySubNav'
import ArticleHeader from '@/sections/ArticleHeader'
import MitscherArticleBody from '@/sections/MitscherArticleBody'
import AdUnit from '@/components/ui/AdUnit'
import heroImg from '@/assets/images/naval-history-articles/Russell-NH-5-26-1 Hero.jpg'
import ArticleMeterBanner from '@/components/ui/ArticleMeterBanner'

export default function NavalHistoryArticle() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <NavalHistorySubNav />
      <main className="flex-1">
        <ArticleHeader
          title="Mitscher at Midway"
          deck="Sixty years of scholarship has yielded no consensus on whether Captain Marc Mitscher's decisions aboard USS Hornet determined — or cost — America's greatest naval victory."
          date="June 2026"
          magazineName="Naval History Magazine"
          author="James D. Russell"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Naval History', href: '/naval-history' },
            { label: 'June 2026', href: '/naval-history/jun-2026' },
            { label: 'Mitscher at Midway' },
          ]}
        />

        {/* Hero image */}
        <section className="bg-white pb-0">
          <div className="container-site">
            <figure>
              <div className="aspect-[16/7] overflow-hidden bg-neutral-subtlest">
                <img
                  src={heroImg}
                  alt="Carrier aircraft being prepared for launch on the flight deck before the Battle of Midway"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="mt-3 pb-2">
                <p className="font-body text-xs text-neutral-subtle leading-relaxed">
                  Deck crews spot aircraft for launch aboard a U.S. carrier in the Pacific, 1942. The coordination of dive bombers, torpedo planes, and fighters — a challenge never fully solved at Midway — shaped the course of the engagement.
                </p>
                <p className="font-body text-xs text-neutral-subtle/70 mt-1">
                  Painting by Craig Kodera / U.S. Naval Institute
                </p>
              </figcaption>
            </figure>
          </div>
        </section>

        <MitscherArticleBody />
        <AdUnit size="rectangle" />
      </main>
      <Footer />
      <ArticleMeterBanner magazine="Naval History" />
    </div>
  )
}
