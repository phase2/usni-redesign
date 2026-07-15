import { useState, useRef, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/Button'

const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
const YEARS = Array.from({ length: 12 }, (_, i) => String(2025 + i))

function InlineSelect({
  placeholder, options, value, onChange, className = '',
}: {
  placeholder: string; options: string[]; value: string; onChange: (v: string) => void; className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none bg-white border border-[#4e576a] px-3 py-3 pr-8 font-body text-[16px] text-[#4e576a] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] min-h-[44px] rounded-none"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
        <svg className="w-3 h-3 text-[#33415c]" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 3l5 5 5-5" />
        </svg>
      </div>
    </div>
  )
}

interface CreditCardModalProps {
  open: boolean
  onClose: () => void
  onSuccess: (last4: string) => void
}

export default function CreditCardModal({ open, onClose, onSuccess }: CreditCardModalProps) {
  const [cardGroups, setCardGroups] = useState(['', '', '', ''])
  const cardRef0 = useRef<HTMLInputElement>(null)
  const cardRef1 = useRef<HTMLInputElement>(null)
  const cardRef2 = useRef<HTMLInputElement>(null)
  const cardRef3 = useRef<HTMLInputElement>(null)
  const cardRefs = [cardRef0, cardRef1, cardRef2, cardRef3]

  const [expiryMonth, setExpiryMonth] = useState('')
  const [expiryYear, setExpiryYear] = useState('')
  const [cardCode, setCardCode] = useState('')

  const handleCardGroup = (idx: number) => (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 4)
    setCardGroups(prev => { const next = [...prev]; next[idx] = digits; return next })
    if (digits.length === 4 && idx < 3) cardRefs[idx + 1].current?.focus()
  }

  const handleKey = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() },
    [onClose]
  )

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, handleKey])

  useEffect(() => {
    if (!open) {
      setCardGroups(['', '', '', ''])
      setExpiryMonth('')
      setExpiryYear('')
      setCardCode('')
    }
  }, [open])

  if (!open) return null

  const isValid = cardGroups.every(g => g.length === 4) && expiryMonth !== '' && expiryYear !== '' && cardCode.length >= 3

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    onSuccess(cardGroups[3])
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="credit-card-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Modal card */}
      <div className="relative bg-white w-full max-w-[560px] shadow-2xl z-10">
        <button
          className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 bg-navy-subtle text-white hover:bg-navy transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        </button>

        <form onSubmit={handleSubmit} noValidate className="px-8 pt-8 pb-8 flex flex-col gap-6">
          <h2 id="credit-card-modal-title" className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">
            Pay with Credit Card
          </h2>

          {/* Card number */}
          <div className="flex flex-col gap-1.5">
            <label className="font-body font-bold text-[14px] text-[#1d2535]">
              Card Number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              {cardGroups.map((grp, i) => (
                <div key={i} className="flex items-center gap-2 flex-1">
                  <input
                    ref={cardRefs[i]}
                    type="text"
                    inputMode="numeric"
                    placeholder="0000"
                    maxLength={4}
                    value={grp}
                    onChange={e => handleCardGroup(i)(e.target.value)}
                    className="w-full min-w-0 border border-[#4e576a] bg-white px-2 py-3 font-body text-[16px] text-[#1d2535] text-center placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none min-h-[44px] tracking-widest"
                  />
                  {i < 3 && <span className="font-body text-[18px] text-[#4e576a] select-none leading-none flex-shrink-0">–</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Expiry + Card Code */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1.5 flex-[2]">
              <label className="font-body font-bold text-[14px] text-[#1d2535]">
                Exp. Date <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <InlineSelect placeholder="Month" options={MONTHS} value={expiryMonth} onChange={setExpiryMonth} className="flex-1" />
                <InlineSelect placeholder="Year" options={YEARS} value={expiryYear} onChange={setExpiryYear} className="flex-1" />
              </div>
            </div>
            <div className="flex flex-col gap-1.5 flex-1">
              <label className="font-body font-bold text-[14px] text-[#1d2535]">
                Card Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="•••"
                maxLength={4}
                value={cardCode}
                onChange={e => setCardCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                className="w-full border border-[#4e576a] bg-white px-4 py-3 font-body text-[16px] text-[#1d2535] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none min-h-[44px]"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" fullWidth disabled={!isValid}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}
