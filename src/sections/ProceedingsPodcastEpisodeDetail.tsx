import proceedingsArt from '@/assets/images/proceedings-podcast-taller.jpg'
import navalHistoryArt from '@/assets/images/nh-podcast-thumb.png'
import Breadcrumb from '@/components/ui/Breadcrumb'
import PodcastListenBadges from '@/components/ui/PodcastListenBadges'
import SoundCloudPlayer from '@/components/ui/SoundCloudPlayer'
import { ButtonLink } from '@/components/ui/Button'
import { EpisodeCard } from '@/sections/ProceedingsPodcastEpisodes'
import { episodes, type Episode } from '@/data/podcastEpisodes'

const PODCAST_HREF = '/proceedings/podcast'

/**
 * A single podcast episode, at /proceedings/podcast/:slug. The live page
 * (/magazines/proceedings/the-proceedings-podcast/<slug>) is bare: title,
 * date, write-up, SoundCloud player, and an "All Episodes" button. This keeps
 * all of that and gives it the landing page's hero, so an episode reads as
 * part of the show, plus a short run of recent episodes to keep listening.
 */
export default function ProceedingsPodcastEpisodeDetail({ episode }: { episode: Episode }) {
  const show = episode.navalHistory ? 'Naval History Podcast' : 'Proceedings Podcast'
  const body = episode.body ?? (episode.description ? [episode.description] : [])
  const more = episodes.filter((ep) => ep.slug !== episode.slug).slice(0, 3)

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-[#ebf4ff] pt-10 lg:pt-12 pb-12 lg:pb-16">
        <div className="container-site">
          <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 xl:gap-16">
            <div className="flex-1 min-w-0 flex flex-col gap-4">
              <div className="pb-4 border-b border-[#C2DDFF]">
                <Breadcrumb
                  trail={[
                    { label: 'Home', href: '/' },
                    { label: 'Proceedings', href: '/proceedings' },
                    { label: 'The Proceedings Podcast', href: PODCAST_HREF },
                  ]}
                  current={episode.title}
                  homeIcon
                />
              </div>

              <div className="eyebrow-headline">
                <p className="eyebrow text-navy-subtle">{show}</p>
                <h1 className="font-headline text-[32px] lg:text-5xl xl:text-[54px] text-navy-bolder leading-[1.1] text-pretty">
                  {episode.title}
                </h1>
              </div>

              <p className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-neutral-subtle">
                {episode.date}
              </p>

              <PodcastListenBadges className="pt-2" />
            </div>

            {/* Show art — stacks below on mobile, right column on desktop. Kept
                narrower than the landing hero's: the Naval History art is only
                290px wide. */}
            <div className="w-full max-w-[200px] lg:max-w-none lg:w-[240px] lg:flex-shrink-0 lg:self-center">
              <img
                src={episode.navalHistory ? navalHistoryArt : proceedingsArt}
                alt={`${show} cover art`}
                className="w-full shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Write-up + player ── */}
      <section className="bg-white py-12 lg:py-16">
        <div className="container-site max-w-[860px]">
          {body.length > 0 && (
            <div className="font-body text-base lg:text-lg text-[#1d2535] leading-relaxed space-y-5">
              {body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          )}

          {episode.articleUrl && (
            <p className="font-body text-base lg:text-lg mt-5">
              <a href={episode.articleUrl} className="text-link">
                Read the article
              </a>
            </p>
          )}

          <SoundCloudPlayer
            trackId={episode.trackId}
            title={episode.title}
            className={body.length > 0 || episode.articleUrl ? 'mt-8' : ''}
          />

          <div className="mt-10">
            <ButtonLink href={PODCAST_HREF} variant="outline-dark">
              All Episodes
            </ButtonLink>
          </div>
        </div>
      </section>

      {/* ── More episodes ── */}
      <section className="bg-neutral-subtlest py-12 lg:py-16">
        <div className="container-site max-w-[860px]">
          <h2 className="font-headline text-[32px] lg:text-[40px] text-[#060a0a] leading-[1.1]">
            More Episodes
          </h2>
          <div className="bg-[#C2DDFF] h-px w-full mt-6" />
          <div className="divide-y divide-[#d5dbe3]">
            {more.map((ep) => (
              <EpisodeCard key={ep.slug} episode={ep} showPlayer={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
