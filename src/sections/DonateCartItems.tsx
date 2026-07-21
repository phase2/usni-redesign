import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useCart } from '@/context/CartContext'

const PRIORITY_OPTIONS = [
  { id: 'usni-news',         label: 'USNI News' },
  { id: 'proceedings',       label: 'Proceedings Magazine' },
  { id: 'sponsored-student', label: 'Sponsored Student Program' },
  { id: 'naval-history',     label: 'Naval History' },
  { id: 'oral-history',      label: 'Oral History Program' },
  { id: 'photo-archives',    label: 'Photo Archives' },
  { id: 'taylor-center',     label: 'Jack C. Taylor Conference Center Maintenance & Technology Fund' },
]

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative flex-shrink-0 w-[52px] h-7 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#023e7d]/40 ${
        on ? 'bg-[#023e7d]' : 'bg-[#c4c9d4]'
      }`}
    >
      <span
        className={`absolute top-[3px] w-[22px] h-[22px] rounded-full bg-white shadow transition-transform duration-200 flex items-center justify-center ${
          on ? 'translate-x-[27px]' : 'translate-x-[3px]'
        }`}
      >
        {!on && (
          <svg className="w-2.5 h-2.5 text-[#999fad]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
            <path d="M2 2l6 6M8 2L2 8" />
          </svg>
        )}
        {on && (
          <svg className="w-2.5 h-2.5 text-[#023e7d]" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1.5 5l3 3 4-4" />
          </svg>
        )}
      </span>
    </button>
  )
}


export default function DonateCartItems() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { setCartCount } = useCart()

  const amount    = searchParams.get('amount')    ?? '100'
  const frequency = searchParams.get('frequency') ?? 'one-time'

  const amountNum      = Number(amount)
  const frequencyLabel = frequency === 'monthly' ? 'Monthly' : 'One-Time'

  const [removed, setRemoved]               = useState(false)
  const [useWhereNeeded, setUseWhereNeeded] = useState(true)
  const [priorities, setPriorities]         = useState<Set<string>>(new Set())
  const [isAnonymous, setIsAnonymous]       = useState(false)
  const [sendMessage, setSendMessage]       = useState(false)
  const [message, setMessage]               = useState('')

  useEffect(() => {
    setCartCount(removed ? 0 : 1)
  }, [removed, setCartCount])

  const togglePriority = (id: string) => {
    setPriorities(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
        setUseWhereNeeded(false)
      }
      return next
    })
  }

  const handleCheckout = () => {
    const params = new URLSearchParams({ amount, frequency })
    if (!useWhereNeeded && priorities.size > 0) {
      params.set('priorities', Array.from(priorities).join(','))
    }
    if (isAnonymous) params.set('anonymous', 'true')
    navigate(`/giving/donate/checkout?${params.toString()}`)
  }

  if (removed) {
    return (
      <section className="bg-white py-16">
        <div className="container-site flex flex-col gap-8">
          <div className="border-b border-[#0466c8] pb-6">
            <h2 className="font-headline text-[56px] text-[#1d2535] leading-[1.1]">Cart items</h2>
          </div>
          <p className="font-body text-[20px] text-[#4e576a]">Your cart is empty.</p>
          <div className="border-t border-[#999fad] pt-8">
            <button
              type="button"
              onClick={() => navigate('/giving/donate')}
              className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-[#f0f4f8] transition-colors"
            >
              <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 6H2M6 2L2 6l4 4" />
              </svg>
              Back to Donate
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white py-16">
      <div className="container-site flex flex-col gap-8">

        {/* Alert banner */}
        <div className="bg-[#fefde8] border-l-4 border-[#ffaa00] px-8 py-6 flex flex-col gap-3">
          <h2 className="font-headline text-[28px] text-[#1d2535] leading-[1.2]">Review your donation</h2>
          <p className="font-body text-[16px] text-[#1d2535] leading-[1.5]">
            Thank you for supporting the U.S. Naval Institute! You can adjust your donation amount or frequency
            below before proceeding to checkout. If you have any questions, please{' '}
            <a href="/giving/contact" className="text-[#023e7d] underline underline-offset-2 hover:text-[#001845] transition-colors">
              contact us
            </a>.
          </p>
        </div>

        {/* Cart items heading */}
        <div className="border-b border-[#c4c9d4] pb-6">
          <h2 className="font-headline text-[40px] text-[#1d2535] leading-[1.1]">Cart items</h2>
        </div>

        {/* Gift item */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-headline text-[26px] text-[#023e7d] leading-[1.2]">Gift to the U.S. Naval Institute</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <p className="font-body text-[17px] text-[#1d2535]">
                <span className="font-bold">Frequency:</span> {frequencyLabel}
              </p>
              <div className="w-px h-5 bg-[#c4c9d4]" aria-hidden />
              <p className="font-body text-[17px] text-[#1d2535]">
                <span className="font-bold">Amount:</span> ${amountNum.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 pt-1">
            <button
              type="button"
              onClick={() => navigate('/giving/donate')}
              className="flex items-center gap-1.5 border border-[#002b5c] text-[#002b5c] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#f0f4f8] transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Edit
            </button>
            <button
              type="button"
              onClick={() => setRemoved(true)}
              className="flex items-center gap-1.5 border border-[#c1121f] text-[#c1121f] font-body font-bold text-[13px] px-4 py-2 hover:bg-[#fff5f5] transition-colors"
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
              Remove
            </button>
          </div>
        </div>

        {/* Investment priorities */}
        <div className="bg-[#f4f5f7] border border-[#e0e2e7] p-6 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h3 className="font-body font-bold text-[18px] text-[#1d2535]">Select investment priorities</h3>
            <p className="font-body text-[14px] text-[#4e576a] leading-[1.5]">
              Select where your donation will be used. If more than one priority is selected, your donation will be split evenly between the selections.
            </p>
          </div>

          {/* "Use where most needed" — full-width row */}
          <div className="flex items-center gap-3">
            <Toggle on={useWhereNeeded} onToggle={() => setUseWhereNeeded(v => !v)} />
            <span className="font-body font-bold text-[15px] text-[#1d2535]">Use my Gift where it is Most Needed</span>
          </div>

          {/* Other priorities — 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {PRIORITY_OPTIONS.map(opt => (
              <div key={opt.id} className="flex items-center gap-3">
                <Toggle on={priorities.has(opt.id)} onToggle={() => togglePriority(opt.id)} />
                <span className="font-body text-[14px] text-[#1d2535] leading-snug">{opt.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Send a message */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={sendMessage}
              onChange={e => setSendMessage(e.target.checked)}
              className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
            />
            <span className="font-body text-[16px] text-[#1d2535]">Send a message with my donation</span>
          </label>
          {sendMessage && (
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="Write a message to accompany your gift…"
              rows={4}
              className="w-full border border-[#4e576a] bg-white px-4 py-3 font-body text-[16px] text-[#4e576a] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#023e7d]/30 focus:border-[#023e7d] rounded-none resize-none"
            />
          )}
        </div>

        {/* Anonymous gift */}
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={e => setIsAnonymous(e.target.checked)}
            className="w-5 h-5 accent-[#023e7d] cursor-pointer flex-shrink-0"
          />
          <span className="font-body text-[16px] text-[#1d2535]">I wish my gift to remain anonymous</span>
        </label>

        {/* Navigation */}
        <div className="border-t border-[#999fad] pt-8 flex flex-wrap items-center justify-between gap-4 sm:gap-8">
          <button
            type="button"
            onClick={() => navigate('/giving/donate')}
            className="flex items-center gap-2 border border-[#002b5c] text-[#001845] font-body font-extrabold text-[20px] py-4 px-8 hover:bg-[#f0f4f8] transition-colors"
          >
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 6H2M6 2L2 6l4 4" />
            </svg>
            Back to Donate
          </button>
          <button
            type="button"
            onClick={handleCheckout}
            className="flex items-center gap-2 bg-[#002b5c] text-white font-body font-extrabold text-[20px] py-4 px-8 hover:bg-navy-bright transition-colors"
          >
            Continue to Checkout
            <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h8M6 2l4 4-4 4" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  )
}
