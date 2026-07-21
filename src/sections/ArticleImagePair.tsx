interface ArticleImagePairProps {
  images: { src: string; alt: string }[]
  caption: React.ReactNode
  photoCredit?: string
}

export default function ArticleImagePair({ images, caption, photoCredit }: ArticleImagePairProps) {
  return (
    <figure>
      <div className="grid grid-cols-2 gap-3">
        {images.map((img, i) => (
          <div key={i} className="aspect-[4/3] overflow-hidden bg-neutral-subtlest">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <figcaption className="mt-3 font-body text-sm text-neutral-subtle leading-relaxed">
        {caption}
        {photoCredit && <span className="block text-neutral-subtle/60 mt-0.5">Photo Credit: {photoCredit}</span>}
      </figcaption>
    </figure>
  )
}
