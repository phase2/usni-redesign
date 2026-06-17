import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import membershipHero from '@/assets/images/membership-hero.png'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // auth wired up at integration time
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 bg-white">

        {/* ── Two-column sign-in section ── */}
        <section className="py-16 lg:py-24">
          <div className="container-site">
            <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-16 xl:gap-24">

              {/* Left — welcome content */}
              <div className="flex-1 min-w-0 flex flex-col gap-8">
                <h1 className="font-headline text-5xl lg:text-[56px] text-navy-bolder leading-[1.05]">
                  Welcome to the U.S. Naval Institute website.
                </h1>

                <p className="font-body text-[18px] text-neutral-subtle leading-[1.6]">
                  If this is your first time logging into our site, please use the{' '}
                  <a
                    href="/create-password"
                    className="text-navy-subtle underline underline-offset-2 hover:text-navy-bolder transition-colors"
                  >
                    Create/Change Password
                  </a>{' '}
                  page to have a one-time login link sent to the email address associated with your account. Using this link will allow you to set a new password for your account.
                </p>

                {/* Alert block */}
                <div className="bg-[#fff8d6] border-l-4 border-[#ffaa00] px-8 py-6 flex flex-col gap-2">
                  <h3 className="font-headline text-[22px] text-[#1d2535] leading-[1.1]">
                    Need additional assistance?
                  </h3>
                  <p className="font-body text-[18px] text-[#1d2535] leading-[1.6]">
                    If you are unsure what email address is associated with your account profile, please contact Member Services at{' '}
                    <a
                      href="mailto:member@usni.org"
                      className="text-navy-subtle underline underline-offset-2 hover:text-navy-bolder transition-colors"
                    >
                      member@usni.org
                    </a>{' '}
                    or by calling 1-800-233-8764.
                  </p>
                </div>
              </div>

              {/* Right — login card */}
              <div className="w-full lg:w-[440px] flex-none">
                <div className="bg-white border-2 border-[#023e7d] p-8 lg:p-10">
                  <h2 className="font-headline text-[32px] text-navy-bolder leading-[1.1] mb-7">
                    Member Sign in
                  </h2>

                  <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="email"
                        className="font-body text-sm font-semibold text-navy-bolder"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-[#c4c9d4] px-3.5 py-3 font-body text-sm text-navy-bolder placeholder:text-neutral-subtle/60 focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                        placeholder="you@example.com"
                      />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="font-body text-sm font-semibold text-navy-bolder"
                        >
                          Password
                        </label>
                        <a
                          href="/forgot-password"
                          className="font-body text-sm text-navy-subtle underline underline-offset-2 hover:text-navy-bolder transition-colors"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-[#c4c9d4] px-3.5 py-3 font-body text-sm text-navy-bolder focus:outline-none focus:ring-2 focus:ring-[#0466c8] focus:border-transparent"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-navy-bolder text-white font-body font-bold text-base py-4 hover:bg-navy-bold transition-colors mt-1"
                    >
                      Sign in
                    </button>

                  </form>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Join CTA — contained 50/50 block ── */}
        <section className="py-16 lg:py-20">
          <div className="container-site">
            <div className="flex flex-col lg:flex-row w-full bg-navy-bolder overflow-hidden">

              {/* Left — content */}
              <div className="flex-1 flex items-center p-10 lg:p-12">
                <div className="border border-navy-bold flex flex-col gap-5 px-10 py-14 w-full">
                  <p className="font-body font-medium text-sm uppercase tracking-[0.05em] text-white/60">
                    Not yet a member?
                  </p>
                  <h2 className="font-headline text-[42px] lg:text-[48px] text-white leading-[1.1]">
                    Join the U.S. Naval Institute
                  </h2>
                  <p className="font-body text-[18px] text-white/80 leading-[1.5]">
                    Membership gives you full access to Proceedings, Naval History, the complete digital archive, and a community of the most serious minds in maritime defense.
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2">
                    <a
                      href="/membership/join"
                      className="inline-flex items-center gap-2 bg-gold text-navy-bolder font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-gold-dark transition-colors"
                    >
                      Join today
                      <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 6h8M6 2l4 4-4 4" />
                      </svg>
                    </a>
                    <a
                      href="/membership"
                      className="inline-flex items-center gap-2 bg-transparent text-white font-body font-bold text-base px-6 py-4 border border-white/40 hover:bg-white/10 transition-colors"
                    >
                      Learn about membership
                    </a>
                  </div>
                </div>
              </div>

              {/* Right — image */}
              <div className="flex-1 min-h-[320px] lg:min-h-0 relative overflow-hidden">
                <img
                  src={membershipHero}
                  alt="USNI members"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
