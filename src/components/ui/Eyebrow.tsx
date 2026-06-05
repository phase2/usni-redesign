interface EyebrowProps {
  children: React.ReactNode
  light?: boolean
  className?: string
}

export default function Eyebrow({ children, light, className = '' }: EyebrowProps) {
  return (
    <p
      className={`font-body font-medium text-sm uppercase tracking-[0.08em] ${
        light ? 'text-light-blue' : 'text-navy-subtle'
      } ${className}`}
    >
      {children}
    </p>
  )
}
