import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import { ButtonLink } from '@/components/ui/Button'
import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import PageHero from '@/sections/PageHero'
import { STORE_URL, ShipsStoreContent } from '@/sections/ShipsStoreSections'
import heroImage from '@/assets/images/ships-store/ships-store-hero.jpg'

/**
 * The Ship's Store landing — where the header's Ship's Store utility link, the
 * footer, and the Books & Press billboard all lead. The store runs on its
 * operator's site, so this page explains it and hands off: what is for sale,
 * the member discount, how ordering works, and whom to ask — in the live
 * page's order, as one reading column.
 *
 * The hero is the live page's banner in the shared photo/navy-panel header,
 * with the "Members Save 20%" subtitle folded into the description.
 */
export default function ShipsStore() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <PageHero
          title="U.S. Naval Institute’s Ship’s Store"
          description="T-shirts, hoodies, hats, notebooks, and more to show your Naval Institute pride. Members save 20% on every order."
          image={heroImage}
          imageAlt="Two sailors and a Marine in dress uniforms stand at a ship's rail, looking out at a destroyer moored across the harbor."
          breadcrumb={
            <Breadcrumb
              trail={[{ label: 'Home', href: '/' }]}
              current="Ship’s Store"
              tone="dark"
              className="pb-4 border-b border-white/25"
            />
          }
        >
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
            <ButtonLink href={STORE_URL} variant="primary" size="md" target="_blank" rel="noopener noreferrer">
              Shop the store
              <ExternalLinkIcon size="1.1em" />
              <span className="sr-only">(opens in a new tab)</span>
            </ButtonLink>
            <ButtonLink href="/membership/join" variant="outline" size="md">
              Join and save 20%
            </ButtonLink>
          </div>
        </PageHero>

        <ShipsStoreContent />
      </main>
      <Footer />
    </div>
  )
}
