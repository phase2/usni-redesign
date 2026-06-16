import { useState } from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

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

      <main className="flex-1 bg-neutral-subtlest">

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
                <div className="bg-[#fff8d6] border-l-4 border-[#ffaa00] px-8 py-6">
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
                <div className="bg-white border border-[#c4c9d4] p-8 lg:p-10">
                  <h2 className="font-headline text-[32px] text-navy-bolder leading-tight mb-7">
                    Sign in
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

        {/* ── Join CTA ── */}
        <section className="bg-navy-bolder py-16 lg:py-20">
          <div className="container-site text-center">
            <p className="font-body text-sm font-medium uppercase tracking-widest text-white/60 mb-5">
              Not yet a member?
            </p>
            <h2 className="font-headline text-4xl lg:text-5xl text-white leading-tight mb-5">
              Join the U.S. Naval Institute
            </h2>
            <p className="font-body text-[18px] text-white/75 max-w-[600px] mx-auto leading-[1.6] mb-10">
              Membership gives you full access to Proceedings, Naval History, the complete digital archive, and a community of the most serious minds in maritime defense.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <a
                href="/membership/join"
                className="inline-flex items-center justify-center bg-gold text-navy-bolder font-body font-bold text-base px-8 py-4 hover:bg-gold-dark transition-colors"
              >
                Join today
              </a>
              <a
                href="/membership"
                className="inline-flex items-center justify-center bg-transparent text-white font-body font-bold text-base px-8 py-4 border border-white/40 hover:bg-white/10 transition-colors"
              >
                Learn about membership
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
