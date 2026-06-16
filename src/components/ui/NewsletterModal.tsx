import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65 or older']
const SALUTATIONS = ['Mr.', 'Mrs.', 'Ms.', 'Miss', 'Dr.', 'Prof.', 'Adm.', 'CAPT', 'CDR', 'LCDR', 'MAJ', 'COL', 'GEN']
const SUFFIXES = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'Ret.', 'USMC', 'USN', 'USAF', 'USA']
const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
  'Japan', 'South Korea', 'Italy', 'Spain', 'Netherlands', 'New Zealand',
  'Poland', 'Norway', 'Denmark', 'Sweden', 'Finland', 'Israel', 'India', 'Other',
]

interface FormState {
  email: string
  firstName: string
  lastName: string
  salutation: string
  suffix: string
  title: string
  ageRange: string
  country: string
  emailFormat: 'html' | 'text'
}

const EMPTY: FormState = {
  email: '', firstName: '', lastName: '', salutation: '',
  suffix: '', title: '', ageRange: '', country: '',
  emailFormat: 'html',
}

interface NewsletterModalProps {
  open: boolean
  onClose: () => void
}

export default function NewsletterModal({ open, onClose }: NewsletterModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [submitted, setSubmitted] = useState(false)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Focus first input when opened, close on Escape
  useEffect(() => {
    if (!open) return
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    setTimeout(() => firstInputRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  // Reset on close
  useEffect(() => {
    if (!open) { setForm(EMPTY); setSubmitted(false) }
  }, [open])

  if (!open) return null

  const set = (field: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputCls = 'w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-2 focus:border-[#023E7D] bg-white placeholder:text-neutral-subtle transition-colors'
  const labelCls = 'block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5'

  const modal = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-navy-boldest/75"
      aria-modal="true"
      role="dialog"
      aria-labelledby="newsletter-modal-title"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white w-full max-w-[680px] shadow-2xl flex flex-col max-h-[90vh]">

        {/* Header */}
        <div
          className="relative px-8 pt-8 pb-7 flex-shrink-0"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, #023E7D 0%, #012B61 50%, #001845 100%)' }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close newsletter signup"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
          <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-light-blue mb-2">
            Naval Institute Press
          </p>
          <h2
            id="newsletter-modal-title"
            className="font-headline text-3xl lg:text-4xl text-white not-italic leading-tight"
          >
            Subscribe to Our Newsletter
          </h2>
          <p className="font-body text-base text-white/75 mt-2 leading-relaxed">
            Get updates on new releases, author events, and exclusive member content.
          </p>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1">
          {submitted ? (
            <div className="flex flex-col items-center justify-center gap-5 py-16 px-8 text-center">
              <div className="w-14 h-14 rounded-full bg-[#ebf4ff] flex items-center justify-center">
                <svg className="w-7 h-7 text-[#023E7D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-headline text-2xl text-navy-bolder">You're subscribed!</p>
                <p className="font-body text-sm text-neutral-subtle mt-1">
                  Thanks for signing up, {form.firstName || 'there'}. Check your inbox for a confirmation.
                </p>
              </div>
              <button
                onClick={onClose}
                className="font-body font-bold text-sm text-[#023E7D] underline hover:text-navy-bolder transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="px-8 py-7 flex flex-col gap-5">

              {/* Email — full width */}
              <div>
                <label htmlFor="nl-email" className={labelCls}>
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  id="nl-email"
                  type="email"
                  required
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  placeholder="your@email.com"
                  className={inputCls}
                />
              </div>

              {/* First + Last name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nl-first" className={labelCls}>First Name</label>
                  <input
                    id="nl-first"
                    type="text"
                    value={form.firstName}
                    onChange={e => set('firstName', e.target.value)}
                    placeholder="First"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="nl-last" className={labelCls}>Last Name</label>
                  <input
                    id="nl-last"
                    type="text"
                    value={form.lastName}
                    onChange={e => set('lastName', e.target.value)}
                    placeholder="Last"
                    className={inputCls}
                  />
                </div>
              </div>

              {/* Salutation + Suffix */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nl-salutation" className={labelCls}>Salutation</label>
                  <select
                    id="nl-salutation"
                    value={form.salutation}
                    onChange={e => set('salutation', e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select…</option>
                    {SALUTATIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="nl-suffix" className={labelCls}>Suffix</label>
                  <select
                    id="nl-suffix"
                    value={form.suffix}
                    onChange={e => set('suffix', e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select…</option>
                    {SUFFIXES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              {/* Title + Age Range */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nl-title" className={labelCls}>Title</label>
                  <input
                    id="nl-title"
                    type="text"
                    value={form.title}
                    onChange={e => set('title', e.target.value)}
                    placeholder="e.g. Director, Captain"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="nl-age" className={labelCls}>Age Range</label>
                  <select
                    id="nl-age"
                    value={form.ageRange}
                    onChange={e => set('ageRange', e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Select…</option>
                    {AGE_RANGES.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                </div>
              </div>

              {/* Country — full width */}
              <div>
                <label htmlFor="nl-country" className={labelCls}>Country</label>
                <select
                  id="nl-country"
                  value={form.country}
                  onChange={e => set('country', e.target.value)}
                  className={inputCls}
                >
                  <option value="">Select a country…</option>
                  {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Email Format */}
              <div>
                <p className={labelCls}>Email Format</p>
                <div className="flex items-center gap-6 mt-0.5">
                  {(['html', 'text'] as const).map(fmt => (
                    <label key={fmt} className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="emailFormat"
                        value={fmt}
                        checked={form.emailFormat === fmt}
                        onChange={() => set('emailFormat', fmt)}
                        className="w-4 h-4 accent-navy-bolder"
                      />
                      <span className="font-body text-sm text-navy-bolder capitalize">{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="pt-1 pb-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gold text-navy-bolder
                             font-body font-bold text-base tracking-[-0.3px] px-6 py-4
                             hover:bg-[#FFE566] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  Subscribe
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
