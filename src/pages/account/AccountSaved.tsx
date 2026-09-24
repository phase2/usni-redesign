import { useState } from 'react'
import { Link } from 'react-router-dom'
import AccountLayout, { ACCOUNT_NAV_NEXT_GEN } from '@/components/layout/AccountLayout'
import { AccountCard, EmptyState } from '@/components/ui/AccountCard'
import { savedArticles } from '@/data/account'

/**
 * Saved articles — the live site's "My Bookmarks", which is currently an empty
 * heading. For a metered publisher this is a primary reason the account exists.
 */
export default function AccountSaved() {
  const [items, setItems] = useState(savedArticles)

  return (
    <AccountLayout
      title="Saved articles"
      lede="Articles you've bookmarked. Saved reading doesn't count against the free-article meter."
      /* A parked page, so it carries the full menu rather than the shipped one
         that omits it — otherwise arriving here from the next-gen dashboard
         drops the link you just followed. */
      nav={ACCOUNT_NAV_NEXT_GEN}
    >
      <AccountCard>
        {items.length === 0 ? (
          <EmptyState
            icon="fa-bookmark"
            title="Nothing saved yet"
            action={
              <Link
                to="/proceedings"
                className="inline-flex items-center justify-center bg-navy-bolder text-white font-body font-bold text-[15px] px-5 py-3 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors"
              >
                Browse Proceedings
              </Link>
            }
          >
            Use the bookmark control on any article to keep it here.
          </EmptyState>
        ) : (
          <ul className="flex flex-col">
            {items.map(a => (
              <li
                key={a.href}
                className="flex flex-wrap items-start justify-between gap-4 py-4 border-b border-[#e8eaed] last:border-b-0 last:pb-0 first:pt-0"
              >
                <div className="min-w-0">
                  <p className="font-body font-medium text-[11px] uppercase tracking-[0.08em] text-[#023e7d] mb-1">
                    {a.publication} · {a.issue}
                  </p>
                  <Link
                    to={a.href}
                    className="link-underline-hover font-headline text-[21px] text-navy-bolder leading-snug hover:text-navy-bright transition-colors"
                  >
                    {a.title}
                  </Link>
                  <p className="font-body text-[13px] text-neutral-subtle mt-1">Saved {a.savedOn}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setItems(items.filter(i => i.href !== a.href))}
                  className="flex items-center gap-1.5 font-body font-semibold text-[14px] text-[#c1121f] hover:underline flex-shrink-0"
                >
                  <i className="fa-solid fa-xmark text-[12px]" aria-hidden="true" />
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </AccountCard>
    </AccountLayout>
  )
}
