import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'

export type ButtonVariant = 'primary' | 'navy' | 'outline' | 'outline-dark' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

const base = 'inline-flex items-center justify-center gap-2 font-body font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-navy-bolder hover:bg-gold-dark border border-gold',
  // Solid navy — the primary action on light interior surfaces such as the
  // account pages and their modals, where gold reads as secondary.
  navy: 'bg-navy-bolder text-white hover:bg-navy-bright border border-navy-bolder hover:border-navy-bright',
  outline: 'bg-transparent text-white border border-white hover:bg-white hover:text-navy-bright',
  // Fills to navy-bright on hover, the same colour `navy` lands on — an
  // outline and a solid button sitting side by side should agree on hover.
  'outline-dark': 'bg-transparent text-navy-bolder border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright',
  link: 'bg-transparent p-0 text-link',
}

const sizes: Record<ButtonSize, string> = {
  // The article-toolbar size: Share, Save, Comments, and the author-bio pair
  // were each hand-rolled at these values before this token existed. Nothing
  // rendered `sm` at the time, so it was redefined to match them rather than
  // adding a fourth size beside one nothing used.
  sm: 'px-5 py-3 text-sm',
  md: 'px-5 py-4 text-base tracking-[-0.5px]',
  lg: 'px-6 py-4 text-base tracking-[-0.5px]',
}

function classes(variant: ButtonVariant, size: ButtonSize, fullWidth?: boolean) {
  return [base, variants[variant], sizes[size], fullWidth ? 'w-full' : ''].filter(Boolean).join(' ')
}

export function Button({ variant = 'primary', size = 'md', fullWidth, className = '', children, ...props }: ButtonProps) {
  return (
    <button className={`${classes(variant, size, fullWidth)} ${className}`} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({ variant = 'primary', size = 'md', fullWidth, className = '', children, href, ...props }: AnchorProps) {
  return (
    <a href={href} className={`${classes(variant, size, fullWidth)} ${className}`} {...props}>
      {children}
    </a>
  )
}

export function NavyButtonLink({ children, href, fullWidth, className = '' }: { children: React.ReactNode; href: string; fullWidth?: boolean; className?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-base tracking-[-0.5px] px-5 py-4 border border-navy-bolder hover:bg-navy-bright hover:border-navy-bright transition-colors duration-150 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </a>
  )
}
