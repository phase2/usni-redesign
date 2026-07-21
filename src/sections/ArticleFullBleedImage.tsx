interface ArticleFullBleedImageProps {
  src: string
  alt: string
  caption?: string
  photoCredit?: string
  aspect?: string
  /** When true, the image bleeds edge-to-edge across the full viewport width. */
  bleed?: boolean
}

export default function ArticleFullBleedImage({
  src,
  alt,
  caption,
  photoCredit,
  aspect = 'aspect-[16/9]',
  bleed = false,
}: ArticleFullBleedImageProps) {
  if (bleed) {
    return (
      <figure className="relative left-1/2 -translate-x-1/2 w-screen xl:clear-right">
        <div className={`${aspect} overflow-hidden bg-neutral-subtlest`}>
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        </div>
        {(caption || photoCredit) && (
          <figcaption className="max-w-[1090px] mx-auto px-4 lg:px-8 mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
            {caption}
            {photoCredit && <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: {photoCredit}</span>}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="max-w-[1180px] mx-auto px-4 lg:px-8 xl:clear-right">
      <div className={`${aspect} overflow-hidden bg-neutral-subtlest`}>
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </div>
      {(caption || photoCredit) && (
        <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
          {caption}
          {photoCredit && <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: {photoCredit}</span>}
        </figcaption>
      )}
    </figure>
  )
}
