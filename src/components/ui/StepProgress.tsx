/**
 * Numbered progress tracker for a multi-step form — circles on a connecting
 * rule, labels underneath.
 *
 * Built for Submit a Memoir, whose live webform shows the same four-step
 * tracker. Steps before `current` read as done (navy, with a check), the
 * current one is the bright blue the site uses for focus, and the rest are
 * outlined. `current` may equal `steps.length - 1` for a final "Complete" step,
 * which then shows as current with everything before it checked.
 */
export default function StepProgress({
  steps,
  current,
  className = '',
}: {
  steps: string[]
  /** Zero-based index of the active step. */
  current: number
  className?: string
}) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol className="grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
        {steps.map((label, i) => {
          const done = i < current
          const active = i === current
          return (
            <li
              key={label}
              aria-current={active ? 'step' : undefined}
              className="relative flex flex-col items-center gap-2.5 text-center"
            >
              {/* Rule to the next step, centre to centre; navy once this step is done */}
              {i < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={`absolute top-4 left-1/2 w-full h-0.5 ${done ? 'bg-navy-bolder' : 'bg-[#c4c9d4]'}`}
                />
              )}
              <span
                aria-hidden="true"
                className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-body font-bold text-sm
                  ${done
                    ? 'bg-navy-bolder text-white'
                    : active
                      ? 'bg-[#0466c8] text-white shadow-[0_0_0_4px_rgba(4,102,200,0.18)]'
                      : 'bg-white text-neutral-subtle border-2 border-[#c4c9d4]'
                  }`}
              >
                {done ? <i className="fa-solid fa-check text-xs" /> : i + 1}
              </span>
              <span
                className={`font-body text-xs sm:text-sm leading-tight
                  ${active ? 'font-bold text-navy-bolder' : done ? 'font-semibold text-navy-bolder' : 'text-neutral-subtle'}`}
              >
                {done && <span className="sr-only">Completed: </span>}
                {label}
              </span>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
