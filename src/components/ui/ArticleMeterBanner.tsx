import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ArticleMeterBannerProps {
  /** Magazine name used in the metering copy, e.g. "Proceedings" or "Naval History" */
  magazine?: string
  articlesRead?: number
  articlesLimit?: number
}

/**
 * Bottom-fixed metering banner shown on article pages (Foreign Affairs-style:
 * a floating card inset from the screen edges, with Sign in / Join CTAs).
 * Dismissible for the session via the close button.
 */
export default function ArticleMeterBanner({
  magazine = 'Proceedings',
  articlesRead = 2,
  articlesLimit = 3,
}: ArticleMeterBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="fixed bottom-4 inset-x-4 lg:inset-x-9 z-50" role="dialog" aria-label="Membership offer">
      <div className="relative bg-navy-bolder shadow-[0_0_25px_rgba(0,18,51,0.35)] px-6 py-5 lg:px-10 lg:py-6">
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => setDismissed(true)}
          className="absolute top-3 right-3 lg:top-4 lg:right-4 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white transition-colors"
        >
          <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
        </button>

        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 pr-8">
          <div className="flex-1 min-w-0 space-y-1.5">
            <p className="font-headline text-[20px] lg:text-[24px] text-white leading-[1.25]">
              You've read {articlesRead} out of {articlesLimit} free articles of {magazine} this month.
            </p>
            <p className="font-body text-[14px] lg:text-[15px] text-white/85 leading-[1.5]">
              Non-members can read {articlesLimit} free {magazine} articles per month.{' '}
              <Link to="/membership/join" className="text-light-blue font-bold underline">
                Join now
              </Link>{' '}
              and never hit a limit.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/login"
              className="font-body font-bold text-base text-white border border-white/50 px-6 py-2.5 hover:bg-white hover:text-navy-bolder transition-colors whitespace-nowrap"
            >
              Sign in
            </Link>
            <Link
              to="/membership/join"
              className="font-body font-bold text-base bg-gold text-navy-bolder px-6 py-2.5 hover:bg-gold-dark transition-colors whitespace-nowrap"
            >
              Join to subscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
