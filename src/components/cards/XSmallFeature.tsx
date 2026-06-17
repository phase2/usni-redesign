import type { Article } from '@/types'

interface XSmallFeatureProps {
  article: Article
  className?: string
}

export default function XSmallFeature({ article, className = '' }: XSmallFeatureProps) {
  return (
    <article className={`flex items-start gap-3 py-4 ${className}`}>
      {/* Text — left side */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <p className="font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]">
          {article.category}
        </p>
        <h4 className="font-headline text-[20px] text-[#1d2535] leading-[1.2]">
          <a href={article.href} className="article-link hover:text-navy-subtle">
            {article.headline}
          </a>
        </h4>
        <p className="font-body text-[16px] text-neutral-subtle">{article.date}</p>
      </div>

      {/* Thumbnail — right side */}
      {article.image && (
        <a href={article.href} className="flex-shrink-0 w-20 h-20 overflow-hidden bg-neutral-subtlest">
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover"
          />
        </a>
      )}
    </article>
  )
}
