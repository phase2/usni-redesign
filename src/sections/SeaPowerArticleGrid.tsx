import SmallFeature from '@/components/cards/SmallFeature'
import { withImages, type SeaPowerArticle } from '@/data/seaPowerProject'

interface SeaPowerArticleGridProps {
  /** Section anchor, for the page's jump-link navigation. */
  id: string
  heading: string
  /** The phase's framing sentence, from the live page. */
  description?: string
  articles: SeaPowerArticle[]
  background?: 'white' | 'subtle'
}

/**
 * One block of the American Sea Power Project reading list: a heading, the
 * phase's framing sentence, and every article in it as a card.
 *
 * A grid, not a carousel or a "see more" cut — the page is a bibliography of a
 * five-year series, and the whole list is the point. The live page runs all
 * forty-nine phase articles out in full for the same reason.
 *
 * The section header deliberately matches `CollectionTitlesGrid`, which renders
 * the recommended books at the foot of this same page, so the six blocks read as
 * one rhythm rather than two competing ones.
 */
export default function SeaPowerArticleGrid({
  id,
  heading,
  description,
  articles,
  background = 'white',
}: SeaPowerArticleGridProps) {
  if (articles.length === 0) return null

  /*
   * Drop the card eyebrow when every card in the block carries the same one.
   * The three phase blocks are all ribboned "The American Sea Power Project" on
   * the live site — a label that never varies inside a block, on a page named
   * after it, is forty-nine repetitions of the heading the reader just passed.
   * Additional Reading mixes Article / Commentary / Special / Featured Article,
   * so that block keeps its labels and is why this is a test rather than a flag.
   */
  const labels = new Set(articles.map((a) => a.category))
  const cards = withImages(articles).map((a) =>
    labels.size === 1 ? { ...a, category: '' } : a,
  )

  return (
    <section
      id={id}
      className={`py-12 lg:py-16 scroll-mt-32 ${
        background === 'subtle' ? 'bg-surface-subtle' : 'bg-white'
      }`}
    >
      <div className="container-site">
        <div className="pb-4 border-b-2 border-[#0466C8]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-6">
            <h2 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15]">
              {heading}
            </h2>
            <p className="font-body text-sm text-neutral-subtle whitespace-nowrap flex-shrink-0 pb-1">
              {articles.length} articles
            </p>
          </div>
        </div>

        {description && (
          <p className="font-body text-base text-neutral-bold leading-[1.7] max-w-[780px] mt-6">
            {description}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mt-8">
          {cards.map((article) => (
            <SmallFeature
              key={article.id}
              article={article}
              showExcerpt
              aspectRatio="aspect-[16/10]"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
