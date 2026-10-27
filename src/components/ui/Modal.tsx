import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

/**
 * Modal shell — backdrop, panel, close control, Escape, scroll lock.
 *
 * The site had three hand-rolled copies of this chrome (CreditCardModal, the
 * gallery lightbox, the member-update reader) and they had already drifted on
 * z-index and close-button treatment. New modals build on this one.
 *
 * The panel is a column: a scrolling region holding the optional `media`, the
 * heading, and the body, then an optional `footer` pinned beneath it. A
 * footer's actions therefore stay on screen however long the body runs, and a
 * white fade along the scrolling region's bottom edge says there is more above
 * them. The fade shows only while there is more to scroll to, so a short body
 * never looks cut off.
 */
export default function Modal({
  open,
  onClose,
  title,
  children,
  media,
  footer,
  maxWidth = '560px',
}: {
  open: boolean
  onClose: () => void
  /** Accessible name, rendered as the panel heading. */
  title: string
  children: ReactNode
  /** Full-bleed content above the heading — a banner image. Scrolls with the body. */
  media?: ReactNode
  /** Pinned below the scrolling body, for actions that must stay in reach. */
  footer?: ReactNode
  maxWidth?: string
}) {
  const headingId = useId()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [moreBelow, setMoreBelow] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    // Move focus into the dialog so the keyboard lands somewhere sensible. The
    // scrolling region takes it, so the arrow keys and Page Down scroll the body.
    scrollRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  useEffect(() => {
    const el = scrollRef.current
    if (!open || !el) return
    const update = () => setMoreBelow(el.scrollHeight - el.scrollTop - el.clientHeight > 1)
    update()
    el.addEventListener('scroll', update, { passive: true })
    // The region resizing (the viewport) and its content resizing (a banner
    // image arriving) both change whether there is more to scroll to.
    const observer = new ResizeObserver(update)
    observer.observe(el)
    Array.from(el.children).forEach((child) => observer.observe(child))
    return () => {
      el.removeEventListener('scroll', update)
      observer.disconnect()
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
    >
      <div className="absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div
        style={{ maxWidth }}
        className="relative z-10 bg-white w-full max-h-[88vh] flex flex-col shadow-2xl"
      >
        {/* First in the tab order, and above the scrolling region, which it
            overlaps and which would otherwise paint over it. */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-navy-subtle text-white hover:bg-navy-bright transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>

        <div className="relative min-h-0 flex flex-col">
          <div ref={scrollRef} tabIndex={-1} className="min-h-0 overflow-y-auto outline-none">
            {media}
            <div className="px-7 lg:px-8 pt-8 pb-8 flex flex-col gap-6">
              <h2 id={headingId} className="font-headline text-[28px] text-[#1d2535] leading-[1.2] pr-12">
                {title}
              </h2>
              {children}
            </div>
          </div>

          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent transition-opacity duration-200 ${moreBelow ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>

        {footer && (
          <div className="flex-shrink-0 px-7 lg:px-8 py-5 border-t border-border-light">
            {footer}
          </div>
        )}

      </div>
    </div>
  )
}
