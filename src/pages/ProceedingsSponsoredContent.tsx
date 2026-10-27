import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/ui/Breadcrumb'
import AdUnit from '@/components/ui/AdUnit'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ProceedingsIssueArticles from '@/sections/ProceedingsIssueArticles'
import ProceedingsMembershipCTA from '@/sections/ProceedingsMembershipCTA'
import { sponsoredArticles } from '@/data/proceedingsSponsored'

/**
 * Sponsored Content — every sponsored Proceedings article, newest first. The
 * live site's /sponsored-content; here it sits under Proceedings, where the
 * landing's sponsored billboard and each sponsored article link to it.
 *
 * It is the issue table of contents' listing, grid and list views alike, with
 * the sponsor as each card's eyebrow (as on the article itself) and the date
 * shown in both views, since the list spans six years of issues.
 */

const PAGE_SIZE = 12

const articles = sponsoredArticles.map(({ sponsor, ...article }) => ({
  ...article,
  category: `Sponsored by ${sponsor}`,
}))

export default function ProceedingsSponsoredContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ProceedingsSubNav />

        {/* The issue hero's dark band, without a cover */}
        <section style={{ background: 'linear-gradient(to bottom, #1d2535, #0e121a)' }}>
          <div className="container-site py-10 lg:py-16">
            <div className="max-w-[860px] flex flex-col gap-4">
              <div className="pb-4 border-b border-[#C2DDFF]">
                <Breadcrumb
                  trail={[
                    { label: 'Home', href: '/' },
                    { label: 'Proceedings', href: '/proceedings' },
                  ]}
                  current="Sponsored Content"
                  tone="dark"
                  homeIcon
                />
              </div>

              <h1 className="font-headline text-[32px] lg:text-[56px] xl:text-[64px] text-white leading-[1.1]">
                Sponsored Content
              </h1>
            </div>
          </div>
        </section>

        <AdUnit />

        <ProceedingsIssueArticles
          articles={articles}
          summary={`${articles.length} sponsored articles`}
          pageSize={PAGE_SIZE}
          paginationLabel="Sponsored content pagination"
          showDate
          clampExcerpts
        />

        <ProceedingsMembershipCTA />
      </main>
      <Footer />
    </div>
  )
}
