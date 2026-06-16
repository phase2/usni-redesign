import { useState } from 'react'
import facebookIcon from '@/assets/images/facebook.svg'
import instagramIcon from '@/assets/images/instagram.svg'
import youtubeIcon from '@/assets/images/youtube.svg'
import linkedinIcon from '@/assets/images/linkedin.svg'
import NewsletterModal from '@/components/ui/NewsletterModal'

const aboutLinks = [
  { label: 'About the Naval Institute', href: '/about' },
  { label: 'Naval Institute Foundation', href: '/about/foundation' },
  { label: 'Events', href: '/events' },
  { label: "Shop Our Ship's Store", href: '/ships-store' },
  { label: 'Advertise With Us', href: '/advertise' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Media Inquiries', href: '/media' },
]

const contentLinks = [
  { label: 'Proceedings', href: '/proceedings' },
  { label: 'USNI News', href: '/news' },
  { label: 'Naval History', href: '/naval-history' },
  { label: 'Books & Press', href: '/books' },
  { label: 'Naval Institute Archives', href: '/archives' },
  { label: 'Oral Histories', href: '/archive/oral-histories' },
  { label: 'Photos & Historical Prints', href: '/archive/photos' },
]

function FooterNavColumn({ title, links }: { title: string; links: typeof aboutLinks }) {
  return (
    <div className="flex flex-col flex-1 min-w-0">
      {/* Category heading */}
      <div className="mb-4">
        <p className="font-headline text-[24px] text-tan-subtlest not-italic leading-[1.3]">{title}</p>
        <span className="block h-[2px] w-[55px] bg-tan mt-2" />
      </div>
      {/* Links */}
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="flex items-center min-h-[44px] font-body font-normal text-base text-white/90
                     hover:text-white transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  )
}

export default function Footer() {
  const [newsletterOpen, setNewsletterOpen] = useState(false)

  return (
    <footer
      className="text-white py-[80px]"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, #023E7D 0%, #012B61 50%, #001845 100%)',
      }}
    >
      <div className="container-site">
        {/* ── Top section ── */}
        <div className="flex flex-col lg:flex-row gap-16 pb-16">

          {/* Left — logo + address */}
          <div className="flex-shrink-0 lg:w-[225px]">
            <img
              src="/usni-logo-footer.svg"
              alt="U.S. Naval Institute"
              className="h-[69px] w-auto"
            />
            <div className="mt-7 font-body text-[20px] text-white leading-[1.4]">
              <p>
                <span className="font-bold">U.S. Naval Institute</span>
                <br />291 Wood Road
                <br />Annapolis, MD 21402
              </p>
              <p className="mt-[10px]">410-268-6110</p>
              <p className="mt-[10px]">
                <a href="mailto:customer@usni.org" className="text-light-blue underline hover:text-white transition-colors">
                  customer@usni.org
                </a>
                <br />
                <a href="mailto:member@usni.org" className="text-light-blue underline hover:text-white transition-colors">
                  member@usni.org
                </a>
              </p>
            </div>
          </div>

          {/* Middle — nav columns */}
          <div className="flex flex-1 gap-10 lg:gap-10">
            <FooterNavColumn title="About USNI" links={aboutLinks} />
            <FooterNavColumn title="Content & Resources" links={contentLinks} />
          </div>

          {/* Right — newsletter CTA card */}
          <div className="flex-shrink-0 lg:w-[334px]">
            <div className="bg-navy-boldest border border-navy-bolder px-8 py-16 flex flex-col items-center text-center gap-6">
              <h3 className="font-headline text-[36px] text-white not-italic leading-[1.2]">
                Get the Latest News
              </h3>
              <p className="font-body text-[20px] text-white leading-[1.4]">
                Sign up to get updates about new releases and event invitations.
              </p>
              <button
                onClick={() => setNewsletterOpen(true)}
                className="flex items-center justify-center gap-2 w-full bg-gold text-navy-bolder
                           font-body font-bold text-base tracking-[-0.5px] px-6 py-4
                           hover:bg-gold-dark transition-colors"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                Join The List
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="flex flex-col gap-8">
          {/* Gold divider — matches Figma exactly */}
          <div className="h-px w-full bg-gold-subtle" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Copyright + legal links */}
            <div className="flex flex-col gap-2">
              <p className="font-body font-normal text-base text-white">
                Copyright © 2026 U.S. Naval Institute
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Use', href: '/terms' },
                  { label: 'Content License', href: '/license' },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-body font-bold text-base text-white underline hover:text-white/70 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Connect with us + social icons */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-4">
                <p className="font-body font-medium text-[18px] text-tan-subtle uppercase tracking-[0.06em] whitespace-nowrap">
                  Connect with us
                </p>
                <div className="w-[131px] h-px bg-tan-subtle hidden sm:block flex-shrink-0" />
              </div>
              <div className="flex items-center">
                {[
                  { src: facebookIcon, label: 'Facebook', href: 'https://facebook.com/usnavalinsitute' },
                  { src: instagramIcon, label: 'Instagram', href: 'https://instagram.com/usnavalinsitute' },
                  { src: youtubeIcon, label: 'YouTube', href: 'https://youtube.com/usnavalinsitute' },
                  { src: linkedinIcon, label: 'LinkedIn', href: 'https://linkedin.com/company/usnavalinsitute' },
                ].map(({ src, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="flex items-center justify-center w-16 h-16 hover:opacity-70 transition-opacity"
                  >
                    <img src={src} alt={label} className="w-8 h-8" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NewsletterModal open={newsletterOpen} onClose={() => setNewsletterOpen(false)} />
    </footer>
  )
}
