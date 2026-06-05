import type { Article } from '@/types'

interface XSmallFeatureProps {
  article: Article
  className?: string
}

export default function XSmallFeature({ article, className = '' }: XSmallFeatureProps) {
  return (
    <article className={`flex flex-col gap-1.5 py-4 ${className}`}>
      <p className="font-body font-medium text-xs uppercase tracking-widest text-navy-subtle">
        {article.category}
      </p>
      <a href={article.href}>
        <h4 className="font-headline text-base text-navy-bolder leading-snug hover:text-navy-subtle transition-colors">
          {article.headline}
        </h4>
      </a>
      <p className="font-body text-xs text-navy/60">{article.date}</p>
    </article>
  )
}
