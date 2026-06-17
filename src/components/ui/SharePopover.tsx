import { useState, useEffect, useRef } from 'react'

interface SharePopoverProps {
  title?: string
  /** Defaults to window.location.href at click time */
  url?: string
}

const PLATFORMS = [
  {
    label: 'Facebook',
    icon: 'fa-brands fa-facebook-f',
    href: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: 'X (Twitter)',
    icon: 'fa-brands fa-x-twitter',
    href: (url: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    label: 'LinkedIn',
    icon: 'fa-brands fa-linkedin-in',
    href: (url: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: 'Bluesky',
    icon: 'fa-brands fa-bluesky',
    href: (url: string) => `https://bsky.app/intent/compose?text=${encodeURIComponent(url)}`,
  },
]

export default function SharePopover({ title, url }: SharePopoverProps) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    const onMouse = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onMouse)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onMouse)
    }
  }, [open])

  const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback: select a temp input
    }
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(title ?? 'Article from USNI')
    const body = encodeURIComponent(shareUrl)
    window.location.href = `mailto:?subject=${subject}&body=${body}`
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="inline-flex items-center gap-2 border border-navy-bolder text-navy-bolder font-body font-bold text-sm px-5 py-3 hover:bg-[#EBF4FF] transition-colors"
      >
        Share
        <i className="fa-solid fa-arrow-up-from-bracket text-xs" aria-hidden="true" />
      </button>

      {open && (
        <div
          role="dialog"
          aria-label="Share this article"
          className="absolute right-0 top-full mt-3 w-64 bg-white border border-[#c4c9d4] shadow-xl z-50"
        >
          {/* Caret */}
          <div className="absolute -top-[9px] right-5 w-4 h-[9px] overflow-hidden pointer-events-none">
            <div className="w-3 h-3 bg-white border-l border-t border-[#c4c9d4] rotate-45 translate-y-[5px] mx-auto" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#e8eaed]">
            <span className="font-body font-bold text-xs uppercase tracking-[0.1em] text-[#1d2535]">
              Share on:
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="text-neutral-subtle hover:text-navy-bolder transition-colors"
            >
              <i className="fa-solid fa-xmark text-base" aria-hidden="true" />
            </button>
          </div>

          {/* Platform rows */}
          <div className="divide-y divide-[#e8eaed]">
            {PLATFORMS.map(({ label, icon, href }) => (
              <a
                key={label}
                href={href(shareUrl)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3.5 px-5 py-3.5 font-body text-[15px] text-[#1d2535] hover:bg-[#f4f6f8] transition-colors"
              >
                <span className="w-8 h-8 rounded-full border border-[#c4c9d4] flex items-center justify-center flex-shrink-0">
                  <i className={`${icon} text-sm text-[#1d2535]`} aria-hidden="true" />
                </span>
                {label}
              </a>
            ))}

            {/* Copy link */}
            <button
              type="button"
              onClick={handleCopy}
              className="flex items-center gap-3.5 px-5 py-3.5 font-body text-[15px] text-[#1d2535] hover:bg-[#f4f6f8] transition-colors w-full text-left"
            >
              <span className="w-8 h-8 rounded-full border border-[#c4c9d4] flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-link text-sm text-[#1d2535]" aria-hidden="true" />
              </span>
              {copied ? 'Copied!' : 'Copy link'}
            </button>

            {/* Email */}
            <button
              type="button"
              onClick={handleEmail}
              className="flex items-center gap-3.5 px-5 py-3.5 font-body text-[15px] text-[#1d2535] hover:bg-[#f4f6f8] transition-colors w-full text-left"
            >
              <span className="w-8 h-8 rounded-full border border-[#c4c9d4] flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-envelope text-sm text-[#1d2535]" aria-hidden="true" />
              </span>
              Email
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
