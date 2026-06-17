import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const AGE_RANGES = ['Under 18', '18–24', '25–34', '35–44', '45–54', '55–64', '65 or older']
const SALUTATIONS = ['Mr.', 'Mrs.', 'Ms.', 'Miss', 'Dr.', 'Prof.', 'Adm.', 'CAPT', 'CDR', 'LCDR', 'MAJ', 'COL', 'GEN']
const SUFFIXES = ['Jr.', 'Sr.', 'II', 'III', 'IV', 'Ret.', 'USMC', 'USN', 'USAF', 'USA']
const COUNTRIES = [
  'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France',
  'Japan', 'South Korea', 'Italy', 'Spain', 'Netherlands', 'New Zealand',
  'Poland', 'Norway', 'Denmark', 'Sweden', 'Finland', 'Israel', 'India', 'Other',
]

const INTERESTS = [
  {
    id: 'usni-news',
    name: 'USNI News',
    frequency: 'Daily',
    description: 'Breaking defense and naval news from our award-winning journalism team.',
    icon: 'fa-newspaper',
    accent: '#023E7D',
  },
  {
    id: 'proceedings',
    name: 'Proceedings',
    frequency: 'Monthly',
    description: 'New articles and highlights from the flagship professional naval journal.',
    icon: 'fa-anchor',
    accent: '#0B3D8F',
  },
  {
    id: 'naval-history',
    name: 'Naval History',
    frequency: 'Bimonthly',
    description: 'Stories exploring the rich heritage of the sea services since 1873.',
    icon: 'fa-ship',
    accent: '#7B4F2E',
  },
  {
    id: 'books-press',
    name: 'Books & Press',
    frequency: 'Regularly',
    description: 'New releases, author events, and offers from Naval Institute Press.',
    icon: 'fa-book-open',
    accent: '#1A5C3A',
  },
  {
    id: 'member-updates',
    name: 'Member Updates',
    frequency: 'Monthly',
    description: 'Membership news, exclusive benefits, and Institute announcements.',
    icon: 'fa-id-card',
    accent: '#4A1E8B',
  },
  {
    id: 'events',
    name: 'Events',
    frequency: 'As scheduled',
    description: 'USNI forums, symposia, and conferences throughout the year.',
    icon: 'fa-calendar-days',
    accent: '#B5451B',
  },
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

const inputCls = 'w-full font-body text-sm text-navy-bolder border border-[#94A3B8] px-3 py-2.5 outline-none focus:border-2 focus:border-[#023E7D] bg-white placeholder:text-neutral-subtle transition-colors'
const labelCls = 'block font-body font-semibold text-xs text-navy-bolder uppercase tracking-[0.06em] mb-1.5'

export default function NewsletterJoin() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [interests, setInterests] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)

  const set = (field: keyof FormState, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const toggleInterest = (id: string) =>
    setInterests(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">

        {/* Hero */}
        <div style={{ background: 'radial-gradient(ellipse at 50% 0%, #023E7D 0%, #012B61 50%, #001845 100%)' }}>
          <div className="container-site py-14 lg:py-20">
            <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-[#A8C8F0] mb-3">
              Naval Institute Press
            </p>
            <h1 className="font-headline text-4xl lg:text-5xl text-white not-italic leading-[1.1] mb-4">
              Subscribe to Our Newsletter
            </h1>
            <p className="font-body text-lg text-white/75 leading-relaxed max-w-[560px]">
              Get updates on new releases, author events, and exclusive member content.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white py-12 lg:py-16">
          <div className="container-site">
            <div className="max-w-[640px] mx-auto">

              {submitted ? (
                <div className="flex flex-col items-start gap-5 py-8">
                  <div className="w-14 h-14 rounded-full bg-[#ebf4ff] flex items-center justify-center">
                    <svg className="w-7 h-7 text-[#023E7D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-headline text-2xl text-navy-bolder">You're subscribed!</p>
                    <p className="font-body text-base text-neutral-subtle mt-1">
                      Thanks for signing up, {form.firstName || 'there'}. Check your inbox for a confirmation email.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">

                  {/* Email */}
                  <div>
                    <label htmlFor="nl-email" className={labelCls}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nl-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="your@email.com"
                      className={inputCls}
                    />
                  </div>

                  {/* Interests */}
                  <div>
                    <p className={labelCls}>Interests</p>
                    <p className="font-body text-xs text-neutral-subtle mb-3 -mt-1">
                      Select the newsletters you'd like to receive.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                      {INTERESTS.map(item => {
                        const selected = interests.has(item.id)
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => toggleInterest(item.id)}
                            className={`relative text-left border p-4 transition-colors ${
                              selected
                                ? 'border-[#023E7D] bg-[#EBF4FF]'
                                : 'border-[#C4C9D4] bg-white hover:border-[#023E7D] hover:bg-[#F5F8FF]'
                            }`}
                          >
                            <div
                              className="w-9 h-9 flex items-center justify-center mb-3 flex-shrink-0"
                              style={{ backgroundColor: item.accent }}
                            >
                              <i className={`fa-solid ${item.icon} text-white text-sm`} aria-hidden="true" />
                            </div>
                            <p className="font-body font-semibold text-[10px] uppercase tracking-widest text-neutral-subtle mb-0.5">
                              {item.frequency}
                            </p>
                            <p className="font-body font-bold text-sm text-navy-bolder leading-snug mb-1">
                              {item.name}
                            </p>
                            <p className="font-body text-xs text-neutral-subtle leading-relaxed">
                              {item.description}
                            </p>
                            <div className={`absolute top-3 right-3 w-6 h-6 flex items-center justify-center border transition-colors ${
                              selected
                                ? 'bg-[#023E7D] border-[#023E7D] text-white'
                                : 'bg-white border-[#94A3B8] text-neutral-subtle'
                            }`}>
                              {selected
                                ? <i className="fa-solid fa-check text-[10px]" aria-hidden="true" />
                                : <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
                              }
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* First name */}
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

                  {/* Last name */}
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

                  {/* Salutation */}
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

                  {/* Suffix */}
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

                  {/* Title */}
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

                  {/* Age Range */}
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

                  {/* Country */}
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
                          <span className="font-body text-sm text-navy-bolder">
                            {fmt === 'html' ? 'HTML' : 'Text'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-1 pb-4">
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-2 bg-gold text-navy-bolder
                                 font-body font-bold text-base tracking-[-0.3px] px-6 py-4
                                 hover:bg-gold-dark transition-colors w-full lg:w-auto lg:min-w-[240px]"
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

      </main>
      <Footer />
    </div>
  )
}
