import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutSubNav from '@/sections/AboutSubNav'
import AboutPageHero from '@/sections/AboutPageHero'
import LeadershipBioBody from '@/sections/LeadershipBioBody'
import AdUnit from '@/components/ui/AdUnit'
import NotFound from '@/pages/NotFound'
import { leadershipBio } from '@/data/leadershipBios'

/**
 * A leadership bio. Only the Executive Staff in `leadershipBios.ts` have one so
 * far; any other roster link falls through to the 404, as it always has.
 *
 * The name and title move out of the live page's body into the About hero,
 * under a Leadership & Staff crumb, with the leaderboard ad beneath it as on
 * the site's other interior pages.
 */
export default function AboutLeadershipBio() {
  const { slug = '' } = useParams()
  const bio = leadershipBio(slug)
  if (!bio) return <NotFound />

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <AboutSubNav />
        <AboutPageHero
          title={bio.name}
          subtitle={<span dangerouslySetInnerHTML={{ __html: bio.roleHtml }} />}
          breadcrumbLabel={bio.name}
          parent={{ label: 'Leadership & Staff', href: '/about/leadership' }}
        />
        <AdUnit />
        <LeadershipBioBody bio={bio} />
      </main>
      <Footer />
    </div>
  )
}
