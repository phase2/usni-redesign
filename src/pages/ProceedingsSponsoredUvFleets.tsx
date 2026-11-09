import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ArticleHeader from '@/sections/ArticleHeader'
import ArticleHeroImage from '@/sections/ArticleHeroImage'
import UvFleetsArticleBody from '@/sections/UvFleetsArticleBody'
import ArticleRelated from '@/sections/ArticleRelated'
import { ArticleSponsorBanner } from '@/sections/ArticleSponsorCredit'
import heroImg from '@/assets/images/proceedings-articles/sponsored/uv-fleets-hero.jpg'
import sponsorLogo from '@/assets/images/proceedings-articles/sponsored/booz-allen-wordmark-stacked.png'

const SPONSOR = { name: 'Booz Allen', logo: sponsorLogo }

/**
 * A sponsored Proceedings article, linked from the landing page's sponsored
 * billboard.
 *
 * The sponsor is credited twice (see ArticleSponsorCredit): a tan "Sponsored
 * Content" banner with the sponsor's name in place of the leaderboard ad, and
 * a tan block with the sponsor's logo at the head of the ad rail. The hero
 * photograph runs as it does on any other article.
 * Sponsored content is open to everyone, so the page carries no article meter.
 *
 * The deck is the live page's meta description; the live page shows none.
 */
export default function ProceedingsSponsoredUvFleets() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <ProceedingsSubNav />
      <main className="flex-1">
        <ArticleHeader
          title="Updating UV Fleets at Scale Quickly and Securely"
          deck="By combining emerging technologies with current naval capabilities, the Navy can rapidly and securely update massive UV fleets."
          date="August 2026"
          magazineName="Proceedings Magazine"
          author="Randy Yamada, Ph.D., and Vice Admiral Roy Kitchener, U.S. Navy (Retired)"
          readTime="4 min read"
          banner={<ArticleSponsorBanner {...SPONSOR} />}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Proceedings', href: '/proceedings' },
            { label: 'Sponsored Content', href: '/proceedings/sponsored' },
            { label: 'Updating UV Fleets at Scale Quickly and Securely' },
          ]}
        />
        <ArticleHeroImage
          src={heroImg}
          alt="An unmanned surface vessel with a radar and antenna mast speeds across choppy water, throwing spray."
          caption="The appearance of U.S. Department of War (DoW) visual information does not imply or constitute DoW endorsement."
          photoCredit="U.S. Navy (Devin M. Langer)"
        />
        <UvFleetsArticleBody sponsor={SPONSOR} />
        <ArticleRelated />
      </main>
      <Footer />
    </div>
  )
}
