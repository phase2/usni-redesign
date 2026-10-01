import { Link } from 'react-router-dom'

interface DesignSystemLayoutProps {
  children: React.ReactNode
}

/**
 * Shared chrome for every design-system page: a sticky white bar with the full
 * USNI logo on the left (linking to the table of contents) and the "USNI
 * Redesign Prototypes & Design System" title on the right.
 *
 * Wayfinding lives elsewhere: each component sheet carries its own breadcrumb
 * in the page area above its H1 (DesignSystemBreadcrumb), and the floating
 * PrototypeNav covers the way back into the prototype, which is why the bar no
 * longer needs a "Back to prototype" link.
 */
export default function DesignSystemLayout({ children }: DesignSystemLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-subtlest">
      <header className="sticky top-0 z-10 bg-white border-b border-border-light">
        <div className="max-w-container mx-auto px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <Link to="/toc" aria-label="Redesign table of contents" className="flex-shrink-0">
            <img src="/usni-logo-full.svg" alt="U.S. Naval Institute" className="h-9 lg:h-12 w-auto" />
          </Link>
          {/* Long enough to wrap to two lines on a phone, so it is set tight and
              capped rather than forced onto one. */}
          <p className="font-headline text-base sm:text-xl lg:text-2xl text-navy-bolder leading-[1.15] text-right max-w-[220px] sm:max-w-none">
            USNI Redesign Prototypes &amp; Design System
          </p>
        </div>
      </header>
      <main>{children}</main>
    </div>
  )
}
