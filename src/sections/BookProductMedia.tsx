import ExternalLinkIcon from '@/components/ui/ExternalLinkIcon'
import type { BookMediaItem } from '@/data/bookProductData'

interface Props {
  items: BookMediaItem[]
}

/**
 * Press mentions — interviews, excerpts, op-eds. The live page's "More Info"
 * block, set as a two-column list of outbound links: what and where, the date,
 * then the headline with any dek and byline under it.
 */
export default function BookProductMedia({ items }: Props) {
  return (
    <section className="bg-white pb-12 lg:pb-16">
      <div className="container-site">
        <h2 className="font-headline text-2xl lg:text-3xl text-navy-bolder mb-8">
          In the Media
        </h2>
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 border-t border-[#e4e7ec]">
          {items.map((item) => (
            <li key={item.href} className="border-b border-[#e4e7ec] py-6 flex flex-col gap-2">
              <p className="font-body text-[14px] uppercase tracking-[0.5px] text-[#0466C8]">
                {item.kind} <span className="text-neutral-subtle normal-case tracking-normal">· {item.date}</span>
              </p>
              <h3 className="font-headline text-[20px] text-navy-bolder leading-[1.25]">
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="article-link hover:text-navy-subtle"
                >
                  {item.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>{' '}
                <ExternalLinkIcon className="relative -top-px text-neutral-subtle" />
              </h3>
              {item.dek && (
                <p className="font-body text-[15px] text-neutral-bold leading-[1.55]">{item.dek}</p>
              )}
              {item.byline && (
                <p className="font-body text-sm text-neutral-subtle">By {item.byline}</p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
