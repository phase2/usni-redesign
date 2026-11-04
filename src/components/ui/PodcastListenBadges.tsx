import appleBadge from '@/assets/images/apple-podcasts-badge.svg'
import spotifyBadge from '@/assets/images/listen-on-spotify-badge.png'
import googleBadge from '@/assets/images/google-podcasts-badge.webp'

/**
 * Official platform badges, replacing the hand-built pill buttons that used
 * Font Awesome brand glyphs. Each platform supplies artwork with its own
 * lock-up, so these are scaled to a common height rather than restyled —
 * which is also what the platforms' brand guidelines require.
 *
 * Shared by the podcast landing hero and each episode's hero.
 *
 * TODO: point href at the real show URLs.
 */
const listenLinks = [
  { label: 'Listen on Apple Podcasts', src: appleBadge, href: '#' },
  { label: 'Listen on Spotify', src: spotifyBadge, href: '#' },
  { label: 'Listen on Google Podcasts', src: googleBadge, href: '#' },
]

export default function PodcastListenBadges({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <p className="font-body font-semibold text-sm uppercase tracking-[0.08em] text-[#023e7d]">
        Ways to Listen
      </p>
      {/* Scaled to one height; each badge keeps its own aspect ratio.
          Hover lifts the badge rather than fading it — the platforms'
          brand guidelines don't allow altering the artwork itself. */}
      <div className="flex flex-wrap items-center gap-3.5">
        {listenLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="inline-block will-change-transform transition-transform duration-200 ease-out
              hover:-translate-y-1 focus-visible:-translate-y-1"
          >
            <img src={link.src} alt={link.label} className="h-12 w-auto block" loading="lazy" />
          </a>
        ))}
      </div>
    </div>
  )
}
