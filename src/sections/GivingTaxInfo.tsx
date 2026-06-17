function DocIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0 text-navy-subtle" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

const docLinks = [
  { label: 'Form 990', href: '/giving/form-990' },
  { label: 'Audited Financials', href: '/giving/audited-financials' },
  { label: 'Donor Privacy Policy', href: '/giving/donor-privacy-policy' },
  { label: 'Mandated Disclosure for Charitable Organizations', href: '/giving/mandated-disclosure' },
]

export default function GivingTaxInfo() {
  return (
    <section id="tax-information" className="py-16 lg:py-20 bg-surface-subtle">
      <div className="container-site">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] xl:grid-cols-[416px_1fr] gap-12 lg:gap-16">

          {/* Left — label */}
          <div className="flex flex-col gap-3">
            <p className="eyebrow text-navy-subtle">Transparency</p>
            <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-[1.1]">
              Naval Institute Foundation Charitable Organization Information
            </h2>
          </div>

          {/* Right — details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-body text-base text-navy-bolder">
                <span className="font-bold">Tax ID:</span> # 52-1814344
              </p>
              <p className="font-body text-base text-navy-bolder">
                <span className="font-bold">IRS Tax Exempt Status:</span> 501(c)(3) public charity
              </p>
            </div>

            <div className="flex flex-col">
              {docLinks.map((link, i) => (
                <div key={link.href}>
                  {i > 0 && <div className="h-px bg-border-light" />}
                  <a
                    href={link.href}
                    className="flex items-center gap-3 py-3.5 font-body font-semibold text-base text-navy-subtle hover:text-navy transition-colors"
                  >
                    <DocIcon />
                    {link.label}
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
