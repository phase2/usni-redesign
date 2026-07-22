interface ArticleAudioPlayerProps {
  /** Full Instaread player URL for this specific article (the `src` from the vendor's embed snippet). */
  src: string
}

// Real Instaread embed — third-party player, not stylable beyond this wrapper's border treatment.
function iframeHtml(src: string) {
  return `<iframe id="instaread_iframe" class="instaread-iframe" name="instaread_playlist" seamless="" width="100%" height="100%" scrolling="no" horizontalscrolling="no" verticalscrolling="no" frameborder="0" marginwidth="0" marginheight="0" mozallowfullscreen="" webkitallowfullscreen="" allowfullscreen="" loading="lazy" title="Audio Article " allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" style="display: block;" src="${src}"></iframe>`
}

export default function ArticleAudioPlayer({ src }: ArticleAudioPlayerProps) {
  return (
    <div className="border-l-4 border-[#023e7d]">
      <div className="bg-white border border-[#023e7d] border-l-0 p-4 h-36">
        <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: iframeHtml(src) }} />
      </div>
    </div>
  )
}
