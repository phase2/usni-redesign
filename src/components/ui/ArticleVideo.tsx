import { useState } from 'react'

/**
 * Click-to-play video embed.
 *
 * A poster image with a play overlay stands in until the reader clicks, at which
 * point the YouTube iframe is inserted with autoplay. Deferring the iframe keeps
 * YouTube's player script — and its cookies — off the page for anyone who never
 * presses play, and keeps the article's initial payload down.
 */
export default function ArticleVideo({
  youtubeId,
  poster,
  posterAlt,
  title,
  caption,
  className = 'my-10',
}: {
  /** The v= / youtu.be id, not a full URL. */
  youtubeId: string
  poster: string
  posterAlt: string
  /** Accessible name for the iframe and the play button. */
  title: string
  caption?: string
  /**
   * Layout for the figure. Defaults to the article body's vertical rhythm;
   * pass your own when the player is a grid cell rather than a break in a
   * reading column, where that margin fights the grid's own gap.
   */
  className?: string
}) {
  const [playing, setPlaying] = useState(false)

  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="relative w-full aspect-video bg-navy-boldest overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 w-full h-full cursor-pointer"
          >
            <img src={poster} alt={posterAlt} className="absolute inset-0 w-full h-full object-cover" />

            {/* Scrim keeps the button legible over a busy frame */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-navy-boldest/25 group-hover:bg-navy-boldest/35 transition-colors duration-300"
            />

            {/* Play control — grows and turns gold on hover */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                         flex items-center justify-center w-20 h-20 lg:w-24 lg:h-24
                         bg-white/95 text-navy-bolder shadow-[0_6px_24px_rgba(0,18,51,0.35)]
                         transition-all duration-300 ease-out
                         group-hover:scale-125 group-hover:bg-gold
                         group-focus-visible:scale-125 group-focus-visible:bg-gold"
            >
              {/* Nudged right so the triangle's visual mass sits centred */}
              <svg className="w-8 h-8 lg:w-9 lg:h-9 ml-1" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {caption && (
        <figcaption className="font-body text-[15px] text-neutral-subtle leading-[1.55] border-l-2 border-[#0466c8] pl-4">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
