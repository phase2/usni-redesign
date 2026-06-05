function FooterLogo() {
  return (
    <img
      src="/usni-logo-footer.svg"
      alt="U.S. Naval Institute"
      className="h-12 w-auto"
    />
  )
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white transition-colors"
    >
      {children}
    </a>
  )
}

export default function Footer() {
  return (
    <footer
      className="text-white py-16 lg:py-20"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #023E7D 0%, #012B61 50%, #001845 100%)',
      }}
    >
      <div className="container-site">
        {/* Top section */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pb-12">
          {/* Left column: logo + address */}
          <div className="flex-shrink-0 lg:w-56">
            <FooterLogo />
            <div className="mt-7 font-body text-base text-white/80 leading-relaxed">
              <p className="font-bold text-white">U.S. Naval Institute</p>
              <p>291 Wood Road</p>
              <p>Annapolis, MD 21402</p>
              <p className="mt-3">410-268-6110</p>
              <p className="mt-2">
                <a href="mailto:customer@usni.org" className="text-light-blue underline hover:text-white transition-colors">
                  customer@usni.org
                </a>
              </p>
              <p>
                <a href="mailto:member@usni.org" className="text-light-blue underline hover:text-white transition-colors">
                  member@usni.org
                </a>
              </p>
            </div>
          </div>

          {/* Middle: nav columns */}
          <div className="flex flex-1 gap-10 lg:gap-12">
            {/* About USNI column */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="mb-4">
                <p className="font-headline text-lg text-tan-subtlest not-italic">About USNI</p>
                <span className="footer-nav-accent" />
              </div>
              {[
                { label: 'About the Naval Institute', href: '/about' },
                { label: 'Naval Institute Foundation', href: '/about/foundation' },
                { label: 'Events', href: '/events' },
                { label: "Shop Our Ship's Store", href: '/ships-store' },
                { label: 'Advertise With Us', href: '/advertise' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'Media Inquiries', href: '/media' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/80 hover:text-white transition-colors py-2.5 block"
                >
                  {link.label}
                </a>
              ))}
            </div>
            {/* Content & Resources column */}
            <div className="flex flex-col flex-1 min-w-0">
              <div className="mb-4">
                <p className="font-headline text-lg text-tan-subtlest not-italic">Content & Resources</p>
                <span className="footer-nav-accent" />
              </div>
              {[
                { label: 'Proceedings', href: '/proceedings' },
                { label: 'USNI News', href: '/news' },
                { label: 'Naval History', href: '/naval-history' },
                { label: 'Books & Press', href: '/books' },
                { label: 'Naval Institute Archives', href: '/archives' },
                { label: 'Oral Histories', href: '/oral-histories' },
                { label: 'Photos & Historical Prints', href: '/photos' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body text-sm text-white/80 hover:text-white transition-colors py-2.5 block"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: newsletter CTA card */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="bg-navy-boldest border border-navy-bolder p-8 lg:p-10 flex flex-col items-center text-center gap-5">
              <h3 className="font-headline text-3xl text-white not-italic">Get the Latest News</h3>
              <p className="font-body text-base text-white/80 leading-relaxed">
                Sign up to get updates about new releases and event invitations.
              </p>
              <a
                href="/newsletter"
                className="flex items-center justify-center gap-2 w-full bg-gold text-navy-bolder font-body font-bold text-sm tracking-[-0.5px] px-6 py-4 hover:bg-gold-dark transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Join The List
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-subtle/30 pt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex flex-col gap-2">
            <p className="font-body text-sm text-white/70">Copyright © 2026 U.S. Naval Institute</p>
            <div className="flex flex-wrap gap-5">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Use', href: '/terms' },
                { label: 'Content License', href: '/license' },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-body font-bold text-sm text-white underline hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <p className="font-body font-medium text-sm uppercase tracking-[0.08em] text-tan-subtle whitespace-nowrap">
                Connect with us
              </p>
              <div className="w-20 h-px bg-tan-subtle hidden sm:block" />
            </div>
            <div className="flex items-center">
              <SocialIcon href="https://facebook.com/usnavalinsitute" label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://instagram.com/usnavalinsitute" label="Instagram">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://youtube.com/usnavalinsitute" label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96C1 8.12 1 12 1 12s0 3.88.46 5.58a2.78 2.78 0 0 0 1.95 1.97C5.12 20 12 20 12 20s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97C23 15.88 23 12 23 12s0-3.88-.46-5.58z"/>
                  <polygon fill="white" points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02"/>
                </svg>
              </SocialIcon>
              <SocialIcon href="https://linkedin.com/company/usnavalinsitute" label="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
