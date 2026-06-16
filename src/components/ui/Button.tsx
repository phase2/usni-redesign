import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'outline' | 'outline-dark' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
}

type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>
type AnchorProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

const base = 'inline-flex items-center justify-center gap-2 font-body font-bold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-gold text-navy-bolder hover:bg-gold-dark border border-gold',
  outline: 'bg-transparent text-white border border-white hover:bg-white/10',
  'outline-dark': 'bg-transparent text-navy-bolder border border-navy-bolder hover:bg-navy-bolder hover:text-white',
  link: 'bg-transparent text-navy-subtle underline-offset-2 hover:underline p-0',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm tracking-[-0.3px]',
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
      className={`inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-base tracking-[-0.5px] px-5 py-4 border border-navy-bolder hover:bg-navy transition-colors duration-150 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </a>
  )
}
