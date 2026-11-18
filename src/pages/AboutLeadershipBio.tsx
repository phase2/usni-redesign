import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AboutSubNav from '@/sections/AboutSubNav'
import AboutPageHero from '@/sections/AboutPageHero'
import LeadershipBioBody from '@/sections/LeadershipBioBody'
import LeadershipBioBodyColumns from '@/sections/LeadershipBioBodyColumns'
import AdUnit from '@/components/ui/AdUnit'
import NotFound from '@/pages/NotFound'
import { leadershipBio } from '@/data/leadershipBios'

/**
 * A leadership bio. Only the Executive Staff in `leadershipBios.ts` have one so
 * far; any other roster link falls through to the 404, as it always has.
 *
 * As on the live page, the About hero carries the name alone, under a
 * Leadership & Staff crumb, with the leaderboard ad beneath it as on the
 * site's other interior pages; the body repeats the name and title above
 * the bio (LeadershipBioBody).
 *
 * `layout="photo-column"` is the archived earlier composition, kept for a
 * later phase of these pages: the title sits in the hero under the name, and
 * the body is the bio alone with the photo in its own column beside it.
 */
export default function AboutLeadershipBio({
  layout = 'float',
}: {
  layout?: 'float' | 'photo-column'
}) {
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
          // The live bio's hero is the name alone, with the name and title
          // repeated in the body; the archived layout keeps the title here
          subtitle={
            layout === 'photo-column'
              ? <span dangerouslySetInnerHTML={{ __html: bio.roleHtml }} />
              : undefined
          }
          breadcrumbLabel={bio.name}
          parent={{ label: 'Leadership & Staff', href: '/about/leadership' }}
        />
        <AdUnit />
        {layout === 'photo-column'
          ? <LeadershipBioBodyColumns bio={bio} />
          : <LeadershipBioBody bio={bio} />}
      </main>
      <Footer />
    </div>
  )
}
