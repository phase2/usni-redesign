import { useState } from 'react'

const presetAmounts = [25, 50, 100, 250]

function DocIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 text-navy-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default function DonateForm() {
  const [frequency, setFrequency] = useState<'one-time' | 'monthly'>('one-time')
  const [selected, setSelected] = useState<number | null>(null)
  const [custom, setCustom] = useState('')

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container-site">

        {/* Heading */}
        <h2 className="font-headline text-3xl lg:text-4xl xl:text-5xl text-navy-bolder text-center mb-10">
          Select your donation amount
        </h2>

        {/* One-Time / Monthly toggle */}
        <div className="flex border border-navy-bolder mb-8">
          <button
            onClick={() => setFrequency('one-time')}
            className={`flex-1 py-5 font-body font-bold text-lg transition-colors
              ${frequency === 'one-time'
                ? 'bg-navy-bolder text-white'
                : 'bg-white text-navy-subtle hover:bg-surface-subtle'}`}
          >
            One-Time
          </button>
          <button
            onClick={() => setFrequency('monthly')}
            className={`flex-1 py-5 font-body font-bold text-lg border-l border-navy-bolder transition-colors
              ${frequency === 'monthly'
                ? 'bg-navy-bolder text-white'
                : 'bg-white text-navy-subtle hover:bg-surface-subtle'}`}
          >
            Monthly
          </button>
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
                onClick={() => { setSelected(amount); setCustom('') }}
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
              onClick={() => setSelected(-1)}
              className="flex items-center justify-between w-full bg-navy-bolder text-white font-body font-bold text-sm px-4 py-3 hover:bg-navy transition-colors mt-auto"
            >
              Select Amount
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Pledge note */}
        <p className="font-body text-base text-navy-bolder leading-relaxed mb-8 max-w-[700px]">
          If you would like to make a payment toward an existing pledge, please contact Amanda Ojeda at{' '}
          <a href="tel:4102951062" className="text-navy-subtle underline hover:text-navy">(410) 295-1062</a>
          {' '}so we can ensure your contribution is properly credited. The online donation portal does not process pledge payments.
        </p>

        {/* Disclaimer */}
        <div className="border-t border-border-light pt-6 flex flex-col gap-4 max-w-[1312px]">
          <p className="font-body text-sm text-neutral-subtle leading-relaxed">
            The Naval Institute is a private, not-for-profit educational institution. It receives no government funding.
            Classified by the IRS as a 501(c)(3), the Institute operates from revenues generated by book sales, membership
            dues, from tax-deductible gifts made to the Naval Institute Foundation. The Naval Institute Foundation gratefully
            accepts gifts or multi-year pledges via cash, check, credit card, or appreciated stock. See the Ways To Give
            page for more information.
          </p>
          <p className="font-body text-sm text-neutral-subtle leading-relaxed">
            Leadership Circle recognizes gifts of $1,000 or more within a calendar year. It is the first of the Naval
            Institute's premier gift-recognition societies and provides donors with special courtesies and benefits. See the
            Donor Recognition page for more information.
          </p>
          <p className="font-body text-sm text-neutral-subtle leading-relaxed">
            For additional information or questions, please call Amanda Ojeda at{' '}
            <a href="tel:4102951062" className="text-navy-subtle hover:text-navy">(410) 295-1062</a>
            {' '}or{' '}
            <a href="mailto:foundation@usni.org" className="text-navy-subtle hover:text-navy">e-mail</a>
            {' '}her.
          </p>
          <a
            href="/giving/mandated-disclosure"
            className="inline-flex items-center gap-2 font-body font-semibold text-sm text-navy-subtle hover:text-navy transition-colors"
          >
            <DocIcon />
            Mandated Disclosure for Charitable Organizations
          </a>
        </div>

      </div>
    </section>
  )
}
