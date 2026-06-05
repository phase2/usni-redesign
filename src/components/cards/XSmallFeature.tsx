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
        <p className="font-body font-semibold text-xs uppercase tracking-widest text-navy-subtle">
          {article.category}
        </p>
        <a href={article.href}>
          <h4 className="font-body font-bold text-sm text-navy-bolder leading-snug hover:text-navy-subtle transition-colors">
            {article.headline}
          </h4>
        </a>
        <p className="font-body text-xs text-neutral-subtle">{article.date}</p>
      </div>

      {/* Thumbnail — right side */}
      {article.image && (
        <a href={article.href} className="flex-shrink-0 w-16 h-16 overflow-hidden bg-neutral-subtlest">
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
