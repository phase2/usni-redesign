import type { Article } from '@/types'

interface SmallFeatureProps {
  article: Article
  showImage?: boolean
  className?: string
}

export default function SmallFeature({ article, showImage = true, className = '' }: SmallFeatureProps) {
  return (
    <article className={`flex flex-col gap-3 ${className}`}>
      {showImage && article.image && (
        <a href={article.href} className="block overflow-hidden aspect-[4/3] bg-neutral-subtlest flex-shrink-0">
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-body font-medium text-xs uppercase tracking-widest text-navy-subtle">
          {article.category}
        </p>
        <a href={article.href}>
          <h3 className="font-headline text-lg lg:text-xl text-navy-bolder leading-tight hover:text-navy-subtle transition-colors">
            {article.headline}
          </h3>
        </a>
        <p className="font-body text-xs text-navy/60">{article.date}</p>
      </div>
    </article>
  )
}
