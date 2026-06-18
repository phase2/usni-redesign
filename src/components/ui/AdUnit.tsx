/**
 * Ad placement placeholder. Replace inner content with ad-network tags (GPT, etc.) at build time.
 * size="leaderboard" — 728×90 / full-width banner, used between page sections
 * size="rectangle"  — 300×250 equivalent, used inline within article content
 */

interface AdUnitProps {
  size?: 'leaderboard' | 'rectangle'
  className?: string
}

export default function AdUnit({ size = 'leaderboard', className = '' }: AdUnitProps) {
  const isLeaderboard = size === 'leaderboard'

  return (
    <div className={`w-full flex flex-col items-center ${isLeaderboard ? 'py-6 lg:py-8' : 'py-4'} ${className}`}>
      <p className="font-body text-[10px] font-medium uppercase tracking-[0.12em] text-neutral-subtle/60 mb-1.5 self-center">
        Advertisement
      </p>
      <div
        className={`bg-neutral-subtlest border border-neutral-subtle/20 flex items-center justify-center w-full ${
          isLeaderboard
            ? 'h-[90px] max-w-[728px]'
            : 'h-[250px] max-w-[300px]'
        }`}
      >
        <span className="font-body text-xs text-neutral-subtle/40 select-none">
          {isLeaderboard ? '728 × 90' : '300 × 250'}
        </span>
      </div>
    </div>
  )
}
