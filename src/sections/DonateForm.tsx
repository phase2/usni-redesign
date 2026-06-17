import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const presetAmounts = [25, 50, 100, 250]


export default function DonateForm() {
  const navigate = useNavigate()
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time')
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState('')

  const goToCart = (amount: number) => {
    navigate(`/giving/donate/cart?amount=${amount}&frequency=${frequency}`)
  }

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container-site">

        {/* Heading */}
        <h2 className="font-headline text-3xl lg:text-4xl xl:text-5xl text-navy-bolder leading-[1.1] text-center mb-10">
          Select your donation amount
        </h2>

        {/* One-Time / Monthly toggle */}
        <div className="flex mb-8">
          {(['one-time', 'monthly'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFrequency(f)}
              className={`relative group flex-1 py-4 font-body font-bold text-[17px] transition-colors ${
                frequency === f
                  ? 'bg-[#cde4f8] text-[#1d2535]'
                  : 'bg-[#ebf4ff] text-[#1d2535] hover:text-[#023e7d]'
              }`}
            >
              {f === 'one-time' ? 'One-Time' : 'Monthly'}
              <span className={`absolute bottom-0 left-0 right-0 h-[3px] ${frequency === f ? 'bg-[#023e7d]' : 'bg-[#c4c9d4]'}`} />
              {frequency !== f && (
                <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#0466c8] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out" />
              )}
            </button>
          ))}
        </div>

        {/* Amount cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
          {presetAmounts.map((amount) => (
            <div
              key={amount}
              className={`border p-5 flex flex-col gap-6 transition-colors
                ${selected === amount ? 'border-navy-bolder bg-surface-subtle' : 'border-border-light'}`}
            >
              <p className="font-headline text-3xl text-navy-subtle">${amount}</p>
              <button
                onClick={() => goToCart(amount)}
                className="flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy transition-colors"
              >
                Select Amount
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}

          {/* Custom amount */}
          <div className={`border p-5 flex flex-col gap-3 transition-colors col-span-2 lg:col-span-1
            ${selected === -1 ? 'border-navy-bolder bg-surface-subtle' : 'border-border-light'}`}
          >
            <div>
              <label className="font-body font-semibold text-sm text-navy-bolder block mb-1">
                Custom Amount
              </label>
              <div className="flex items-center border border-border-light bg-white px-3 py-2">
                <span className="font-body text-neutral-subtle mr-1">$</span>
                <input
                  type="number"
                  min="1"
                  placeholder="___"
                  value={custom}
                  onChange={(e) => { setCustom(e.target.value); setSelected(-1) }}
                  className="flex-1 font-body text-navy-bolder text-base outline-none w-full"
                />
              </div>
            </div>
            <button
              onClick={() => { if (custom) goToCart(Number(custom)) }}
              disabled={!custom}
              className="flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy transition-colors mt-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Select Amount
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Pledge note */}
        <p className="font-body text-base text-navy-bolder leading-relaxed max-w-[700px]">
          If you would like to make a payment toward an existing pledge, please contact Amanda Ojeda at{' '}
          <a href="tel:4102951062" className="text-navy-subtle underline hover:text-navy">(410) 295-1062</a>
          {' '}so we can ensure your contribution is properly credited. The online donation portal does not process pledge payments.
        </p>

      </div>
    </section>
  )
}
