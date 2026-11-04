import { useParams } from 'react-router-dom'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProceedingsSubNav from '@/sections/ProceedingsSubNav'
import ProceedingsPodcastEpisodeDetail from '@/sections/ProceedingsPodcastEpisodeDetail'
import NotFound from '@/pages/NotFound'
import { episodeBySlug } from '@/data/podcastEpisodes'

/** A single Proceedings Podcast episode. Unknown slugs fall through to the 404. */
export default function ProceedingsPodcastEpisode() {
  const { slug = '' } = useParams()
  const episode = episodeBySlug(slug)
  if (!episode) return <NotFound />

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ProceedingsSubNav />
        <ProceedingsPodcastEpisodeDetail key={slug} episode={episode} />
      </main>
      <Footer />
    </div>
  )
}
