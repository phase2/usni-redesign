/**
 * SoundCloud embed for a podcast episode — shared by the podcast listing and
 * each episode's page. The player's accent is set to navy-bolder (#023e7d).
 */
export default function SoundCloudPlayer({
  trackId,
  title,
  className = '',
}: {
  trackId: number
  title: string
  className?: string
}) {
  const src =
    'https://w.soundcloud.com/player/?url=' +
    encodeURIComponent(`https://api.soundcloud.com/tracks/${trackId}`) +
    '&color=%23023e7d&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=true'
  return (
    <iframe
      title={`SoundCloud player: ${title}`}
      width="100%"
      height="166"
      scrolling="no"
      frameBorder="no"
      loading="lazy"
      allow="autoplay"
      src={src}
      className={className}
    />
  )
}
