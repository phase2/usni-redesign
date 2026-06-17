import { featuredArticlesLeft, latestIssueCol1, latestIssueCol2 } from '@/data/proceedings'
import ButtonLinkCTA from '@/components/ui/ButtonLinkCTA'

const relatedArticles = [
  featuredArticlesLeft[0],   // Fortifying the Digital Watch
  latestIssueCol1[0],        // The Hallmarks of Russia's Hybrid War
  latestIssueCol2[0],        // Confronting Cyber Threats
]

interface RelatedArticleCardProps {
  article: (typeof relatedArticles)[0]
}

function RelatedArticleCard({ article }: RelatedArticleCardProps) {
  return (
    <article className="flex flex-col gap-3">
      {article.image && (
        <a href={article.href} className="block overflow-hidden aspect-[16/10] bg-neutral-subtlest flex-shrink-0">
          <img
            src={article.image}
            alt={article.imageAlt ?? article.headline}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </a>
      )}
      <div className="flex flex-col gap-2">
        <p className="font-body font-semibold text-xs uppercase tracking-widest text-navy-subtle">
          {article.category}
        </p>
        <h3 className="font-headline text-lg lg:text-xl text-navy-bolder leading-[1.1]">
          <a href={article.href} className="article-link hover:text-navy-subtle">
            {article.headline}
          </a>
        </h3>
        <p className="font-body text-xs text-neutral-subtle">
          {article.date}{article.author ? ` | by ${article.author}` : ''}
        </p>
      </div>
    </article>
  )
}

export default function ArticleRelated() {
  return (
    <section className="pt-12 pb-20" style={{ backgroundColor: '#EBF4FF' }}>
      <div className="container-site">

        {/* Section header */}
        <div className="border-t border-navy-bolder pt-6 mb-8 flex items-center justify-between">
          <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder">Related Articles</h2>
          <ButtonLinkCTA href="/proceedings/apr-2026">See all articles</ButtonLinkCTA>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {relatedArticles.map((article) => (
            article && <RelatedArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  )
}
