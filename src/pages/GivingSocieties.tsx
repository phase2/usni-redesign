import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PlainCard from '@/components/cards/PlainCard'
import PageHero from '@/sections/PageHero'
import GivingSubNav from '@/sections/GivingSubNav'
import { givingImage, givingSocietiesLanding } from '@/data/givingSocieties'

/**
 * Giving Societies — the hub over the three recognition society pages.
 *
 * The live equivalent (/donate/donor-recognition) is three callout blocks and
 * nothing else, one per society type. Those are `PlainCard`s here, the same
 * headline / body / full-width navy CTA treatment the About and homepage
 * wayfinding grids already use, so the section front introduces no new card.
 */
export default function GivingSocieties() {
  const { title, description, heroImage, heroImageAlt, cards } = givingSocietiesLanding

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <GivingSubNav />

        <PageHero
          title={title}
          description={description}
          image={givingImage(heroImage)}
          imageAlt={heroImageAlt}
          breadcrumb={
            <Breadcrumb
              trail={[
                { label: 'Home', href: '/' },
                { label: 'Giving', href: '/giving' },
              ]}
              current="Giving Societies"
              tone="dark"
              className="pb-4 border-b border-white/25"
            />
          }
        />

        <section className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {cards.map((card) => (
                <PlainCard key={card.href} {...card} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
