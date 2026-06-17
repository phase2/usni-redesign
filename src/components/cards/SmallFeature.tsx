import type { Article } from '@/types'

interface SmallFeatureProps {
  article: Article
  showImage?: boolean
  className?: string
  aspectRatio?: string
}

export default function SmallFeature({ article, showImage = true, className = '', aspectRatio }: SmallFeatureProps) {
  return (
    <article className={`flex flex-col gap-3 ${className}`}>
      {showImage && article.image && (
        <a href={article.href} className={`block overflow-hidden ${aspectRatio ?? 'aspect-[4/3]'} bg-neutral-subtlest flex-shrink-0`}>
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]">
          {article.category}
        </p>
        <h3 className="font-headline text-[20px] text-[#1d2535] leading-[1.2]">
          <a href={article.href} className="article-link hover:text-navy-subtle">
            {article.headline}
          </a>
        </h3>
        <p className="font-body text-[16px] text-neutral-subtle">
          {article.date}{article.author ? ` | by ${article.author}` : ''}
        </p>
      </div>
    </article>
  )
}
