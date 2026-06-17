import type { Article } from '@/types'

interface LargeFeatureProps {
  article: Article
  className?: string
}

export default function LargeFeature({ article, className = '' }: LargeFeatureProps) {
  return (
    <article className={`flex flex-col gap-4 ${className}`}>
      {article.image && (
        <a href={article.href} className="block overflow-hidden aspect-[4/3] bg-neutral-subtlest flex-shrink-0">
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      )}
      <div className="flex flex-col gap-3">
        <p className="font-body font-normal text-[14px] uppercase tracking-[0.5px] text-[#0466C8]">
          {article.category}
        </p>
        <h3 className="font-headline text-2xl lg:text-3xl text-navy-bolder leading-[1.1]">
          <a href={article.href} className="article-link hover:text-navy-subtle">
            {article.headline}
          </a>
        </h3>
        {article.excerpt && (
          <p className="font-body text-sm text-neutral-subtle leading-relaxed line-clamp-3">{article.excerpt}</p>
        )}
        <p className="font-body text-xs text-neutral-subtle">{article.date}</p>
      </div>
    </article>
  )
}
