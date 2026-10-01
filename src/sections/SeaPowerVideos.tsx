import ArticleVideo from '@/components/ui/ArticleVideo'
import { seaPowerImage, type SeaPowerVideo } from '@/data/seaPowerProject'

interface SeaPowerVideosProps {
  /** Section anchor, for the page's jump-link navigation. */
  id: string
  heading: string
  description?: string
  videos: SeaPowerVideo[]
  background?: 'white' | 'subtle'
  /**
   * Show each video's title as an H3 headline above it. On for the authors'
   * remarks, where the title is what tells three players apart; off for the
   * single event recording, where it only repeated the heading above.
   */
  headlines?: boolean
}

/**
 * The page's two video blocks: the recorded project events, and the authors'
 * remarks on their own articles.
 *
 * Both render `ArticleVideo`, so nothing here loads YouTube's player or its
 * cookies until someone presses play — worth more on this page than on an
 * article, since the remarks block would otherwise put three players on one
 * screen. Each poster is the opening art of the article the video accompanies.
 *
 * A single video gets a reading-width player rather than a full-bleed one; more
 * than one lays out three across, as the live page does.
 */
export default function SeaPowerVideos({
  id,
  heading,
  description,
  videos,
  background = 'subtle',
  headlines = true,
}: SeaPowerVideosProps) {
  const single = videos.length === 1

  return (
    <section
      id={id}
      className={`py-12 lg:py-16 scroll-mt-32 ${
        background === 'subtle' ? 'bg-surface-subtle' : 'bg-white'
      }`}
    >
      <div className="container-site">
        <div className="pb-4 border-b-2 border-[#0466C8]">
          <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]">
            {heading}
          </h2>
        </div>

        {description && (
          <p className="font-body text-base text-neutral-bold leading-[1.7] max-w-[780px] mt-6">
            {description}
          </p>
        )}

        <div
          className={
            single
              ? 'mt-8 max-w-[880px]'
              : 'mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10'
          }
        >
          {videos.map((video) => (
            <div key={video.youtubeId} className="flex flex-col gap-4">
              {/* flex-1: a headline that wraps to two lines takes up the
                  slack, so the players stay level across the row */}
              {headlines && (
                <h3 className="flex-1 font-headline text-[22px] lg:text-[24px] text-navy-bolder leading-[1.2]">
                  {video.title}
                </h3>
              )}
              <ArticleVideo
                youtubeId={video.youtubeId}
                poster={seaPowerImage(video.poster) ?? ''}
                posterAlt={video.posterAlt}
                title={video.title}
                className=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
