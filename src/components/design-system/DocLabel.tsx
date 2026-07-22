interface DocLabelProps {
  children: React.ReactNode
  className?: string
}

export default function DocLabel({ children, className = '' }: DocLabelProps) {
  return (
    <p className={`font-body font-bold text-xs uppercase tracking-[0.08em] text-neutral-subtle mb-4 ${className}`}>
      {children}
    </p>
  )
}
