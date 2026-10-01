import type { ReactNode } from 'react'

/**
 * Naval Institute Press Digital Editions — the page's introduction.
 *
 * Transcribed as the live /press/digitaleditions page displays it, less its
 * opening paragraph, which now leads the hero (see BooksDigitalEditions). The prose
 * lives here as JSX rather than in `src/data` because it carries inline links —
 * the same arrangement BooksAboutIntro and PmeIntro use. Every platform link
 * leaves the site for app.usni.org, so each opens in a new tab and says so.
 */
function PlatformLink({ children }: { children: ReactNode }) {
  return (
    <a
      href="https://app.usni.org/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-link"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default function DigitalEditionsIntro() {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="container-site">
        <div className="max-w-[760px] flex flex-col gap-5 font-body text-base lg:text-[17px] text-neutral-bold leading-[1.7]">
          <p>
            Clicking on the covers below will take you to the{' '}
            <PlatformLink>Naval Institute's Digital Book platform</PlatformLink>, where
            you can purchase* the digital book selected. In the shop page of the site
            (top righthand link), you will find all the{' '}
            <PlatformLink>digital books that are currently available for purchase</PlatformLink>
            *.
          </p>

          <p>
            The <PlatformLink>digital book platform</PlatformLink> is separate from the
            store on the U.S. Naval Institute website and you will need to sign up to
            purchase* and access your bookshelf. After you sign up, you will receive an
            email from{' '}
            <a href="mailto:nipdigital@usni.org" className="text-link">
              nipdigital@usni.org
            </a>{' '}
            asking you to confirm your email. After confirming your email, you will gain
            full access to the site.
          </p>

          <p className="text-sm text-neutral-subtle">
            <em>*Digital books are not eligible for USNI membership discounts</em>
          </p>
        </div>
      </div>
    </section>
  )
}
