import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { memberUpdates, type MemberUpdate } from '@/data/account'

/**
 * Member Updates as a notification bell in the account hero.
 *
 * The live site gives this promotional feed the whole account landing page.
 * Here it collapses to a bell with an unread count: the dropdown lists every
 * update, and opening one reads it in the site's standard modal — so promos
 * stay reachable without displacing the member's own records.
 */

function PromoCode({ code, note }: { code: string; note: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-tan-subtlest border-l-4 border-gold px-5 py-4">
      <span className="font-body font-bold text-[13px] uppercase tracking-[0.08em] text-neutral-subtle">
        Code
      </span>
      <span className="font-body font-bold text-[20px] tracking-[0.06em] text-navy-bolder">{code}</span>
      <span className="font-body text-[14px] text-neutral-subtle leading-snug">{note}</span>
    </div>
  )
}

function UpdateModal({ update, onClose }: { update: MemberUpdate; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-update-title"
    >
      {/* Same backdrop as the card and gallery modals. */}
      <div className="absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      <div className="relative z-10 bg-white w-full max-w-[640px] max-h-[86vh] overflow-y-auto shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-white text-navy-bolder border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>

        <div className="px-7 lg:px-9 pt-8 pb-9 flex flex-col gap-5">
          <div className="flex flex-col gap-2 pr-12">
            <p className="font-body font-medium text-[11px] uppercase tracking-[0.08em] text-[#c1121f]">
              Member Update
            </p>
            <h2 id="member-update-title" className="font-headline text-[28px] lg:text-[32px] text-navy-bolder leading-[1.15]">
              {update.title}
            </h2>
            <p className="font-body text-[13px] text-neutral-subtle">{update.date}</p>
          </div>

          {update.body.map(para => (
            <p key={para.slice(0, 40)} className="font-body text-[16px] text-neutral-subtle leading-relaxed">
              {para}
            </p>
          ))}

          {update.promo && <PromoCode code={update.promo.code} note={update.promo.note} />}

          {update.cta && (
            <div>
              <Link
                to={update.cta.href}
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 bg-navy-bolder text-white
                           font-body font-bold text-[15px] px-6 py-3.5 border border-navy-bolder
                           hover:bg-navy-bright hover:border-navy-bright transition-colors"
              >
                {update.cta.label}
                <i className="fa-solid fa-arrow-right text-[12px]" aria-hidden="true" />
              </Link>
            </div>
          )}

          {update.footnote && (
            <p className="font-body text-[13px] text-neutral-subtle leading-relaxed border-t border-[#e2e8f0] pt-4">
              {update.footnote}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function AccountNotifications() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<MemberUpdate | null>(null)
  const [read, setRead] = useState<string[]>(() => memberUpdates.filter(u => !u.unread).map(u => u.id))
  const [dismissed, setDismissed] = useState<string[]>([])
  const wrapRef = useRef<HTMLDivElement>(null)

  const visible = memberUpdates.filter(u => !dismissed.includes(u.id))
  const unreadCount = visible.filter(u => !read.includes(u.id)).length

  // Clicking anywhere outside the bell or its panel dismisses the dropdown.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const openUpdate = useCallback((update: MemberUpdate) => {
    setRead(prev => (prev.includes(update.id) ? prev : [...prev, update.id]))
    setActive(update)
    setOpen(false)
  }, [])

  const dismiss = useCallback((id: string) => {
    setDismissed(prev => (prev.includes(id) ? prev : [...prev, id]))
  }, [])

  const dismissAll = useCallback(() => {
    setDismissed(memberUpdates.map(u => u.id))
  }, [])

  return (
    /* ml-auto keeps the bell on the container's right edge even when the hero
       wraps it onto its own row — the panel anchors to that edge. */
    <div ref={wrapRef} className="relative flex-shrink-0 ml-auto">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`relative flex items-center gap-4 border px-4 py-3 font-body font-bold text-[15px] transition-colors ${
          open
            ? 'bg-navy-bolder border-navy-bolder text-white'
            : 'bg-white border-[#c4c9d4] text-navy-bolder hover:border-navy-bright hover:text-navy-bright'
        }`}
      >
        <span className="relative flex items-center">
          <i className="fa-solid fa-bell text-[17px]" aria-hidden="true" />
          {unreadCount > 0 && (
            <span
              className="absolute -top-2 -right-2.5 min-w-[19px] h-[19px] px-1 rounded-full bg-[#c1121f]
                         flex items-center justify-center font-body font-bold text-[11px] text-white leading-none"
            >
              {unreadCount}
            </span>
          )}
        </span>
        Member updates
        <i
          className={`fa-solid fa-chevron-down text-[11px] transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
        <span className="sr-only">
          {unreadCount > 0 ? `, ${unreadCount} unread` : ', none unread'}
        </span>
      </button>

      {open && (
        <div
          data-notif-panel
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-[min(420px,calc(100vw-2.5rem))]
                     bg-white border border-[#c4c9d4] shadow-xl"
        >
          <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[#e2e8f0] bg-[#f8fafd]">
            <div className="flex items-baseline gap-2.5 min-w-0">
              <h3 className="font-headline text-[19px] text-navy-bolder leading-tight">Member updates</h3>
              {unreadCount > 0 && (
                <p className="font-body text-[13px] text-neutral-subtle flex-shrink-0">
                  {unreadCount} new
                </p>
              )}
            </div>
            {visible.length > 0 && (
              <button
                type="button"
                onClick={dismissAll}
                className="font-body font-semibold text-[13px] text-link flex-shrink-0"
              >
                Dismiss all
              </button>
            )}
          </div>

          {visible.length === 0 ? (
            <div className="flex flex-col items-center text-center gap-2 px-6 py-9">
              <span className="w-10 h-10 bg-[#ebf4ff] flex items-center justify-center" aria-hidden="true">
                <i className="fa-solid fa-check text-[16px] text-[#023e7d]" />
              </span>
              <p className="font-body font-bold text-[15px] text-navy-bolder">You're all caught up</p>
              <p className="font-body text-[13px] text-neutral-subtle leading-relaxed">
                New updates will appear here as they are published.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col max-h-[min(60vh,460px)] overflow-y-auto">
              {visible.map(update => {
                const isUnread = !read.includes(update.id)
                return (
                  /* Row is a flex container rather than one big button: the
                     dismiss control is a second button, and a button cannot
                     nest inside another. Hover and the read tint move up here
                     so both children share them. */
                  <li
                    key={update.id}
                    className={`border-b border-[#e8eaed] last:border-b-0 flex items-stretch transition-colors
                      hover:bg-[#ebf4ff] ${isUnread ? 'bg-white' : 'bg-[#fbfcfe]'}`}
                  >
                    <button
                      type="button"
                      onClick={() => openUpdate(update)}
                      className="flex-1 min-w-0 text-left pl-5 pr-2 py-4 flex gap-3"
                    >
                      <span
                        className={`flex-shrink-0 w-2 h-2 rounded-full mt-[7px] ${
                          isUnread ? 'bg-[#c1121f]' : 'bg-transparent'
                        }`}
                        aria-hidden="true"
                      />
                      <span className="min-w-0 flex flex-col gap-1">
                        <span
                          className={`font-body text-[15px] leading-snug ${
                            isUnread ? 'font-bold text-navy-bolder' : 'font-semibold text-neutral-subtle'
                          }`}
                        >
                          {update.title}
                        </span>
                        <span className="font-body text-[13px] text-neutral-subtle leading-snug">
                          {update.blurb}
                        </span>
                        {/* Date and the New pill share the last line, so a long
                            title never pushes the pill onto a row of its own. */}
                        <span className="flex items-center gap-2 mt-0.5">
                          <span className="font-body text-[12px] text-[#8a91a1]">{update.date}</span>
                          {isUnread && (
                            <span className="font-body font-bold text-[10px] uppercase tracking-[0.08em] text-[#c1121f] border border-[#f0b7bc] bg-[#fdf0f1] px-1.5 py-0.5 leading-none">
                              New
                            </span>
                          )}
                        </span>
                      </span>
                    </button>

                    {/* Always rendered, not hover-revealed: the panel is
                        reachable by keyboard and touch, where hover never
                        fires. */}
                    <button
                      type="button"
                      onClick={() => dismiss(update.id)}
                      aria-label={`Dismiss ${update.title}`}
                      title="Dismiss"
                      className="flex-shrink-0 flex items-start justify-center w-11 pt-4 pb-4
                                 text-[#8a91a1] hover:text-[#c1121f] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 mt-1" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M2.5 2.5l9 9M11.5 2.5l-9 9" />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      )}

      {active && <UpdateModal update={active} onClose={() => setActive(null)} />}
    </div>
  )
}
