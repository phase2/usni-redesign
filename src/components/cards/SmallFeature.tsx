import type { Article } from '@/types'

interface SmallFeatureProps {
  article: Article
  showImage?: boolean
  className?: string
  aspectRatio?: string
  /**
   * Render the article's one-line dek under the headline.
   *
   * Opt-in rather than "show it whenever the record has one": most records the
   * card is already given carry an `excerpt` for other layouts, so rendering it
   * by default would grow every existing use of this card.
   */
  showExcerpt?: boolean
}

export default function SmallFeature({
  article,
  showImage = true,
  className = '',
  aspectRatio,
  showExcerpt = false,
}: SmallFeatureProps) {
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
        {article.category && (
          <p className="font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]">
            {article.category}
          </p>
        )}
        <h3 className="font-headline text-[20px] text-[#1d2535] leading-[1.2]">
          <a href={article.href} className="article-link hover:text-navy-subtle">
            {article.headline}
          </a>
        </h3>
        <p className="font-body text-[16px] text-neutral-subtle">
          {article.date}{article.author ? ` | by ${article.author}` : ''}
        </p>
        {showExcerpt && article.excerpt && (
          <p className="font-body text-[15px] text-neutral-bold leading-[1.55]">
            {article.excerpt}
          </p>
        )}
      </div>
    </article>
  )
}
