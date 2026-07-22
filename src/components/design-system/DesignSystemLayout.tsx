import { Link } from 'react-router-dom'

interface DesignSystemLayoutProps {
  children: React.ReactNode
  breadcrumb?: string
}

export default function DesignSystemLayout({ children, breadcrumb }: DesignSystemLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-subtlest">
      <header className="sticky top-0 z-10 bg-white border-b border-border-light">
        <div className="max-w-container mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/design-system" className="flex items-center gap-3">
            <img src="/usni-logo-seal.svg" alt="" className="h-8 w-auto" />
            <span className="font-headline text-lg text-navy-bolder leading-none">Design System</span>
          </Link>
          <Link to="/" className="font-body text-sm text-navy-subtle hover:text-navy-bolder transition-colors">
            ← Back to USNI redesign prototype
          </Link>
        </div>
        {breadcrumb && (
          <div className="max-w-container mx-auto px-6 lg:px-8 pb-3 -mt-1">
            <p className="font-body text-xs uppercase tracking-[0.08em] text-neutral-subtle">
              <Link to="/design-system" className="hover:text-navy-subtle">Design System</Link>
              <span className="mx-2">/</span>
              {breadcrumb}
            </p>
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  )
}
