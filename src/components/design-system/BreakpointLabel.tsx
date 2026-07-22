interface BreakpointLabelProps {
  device: 'desktop' | 'mobile'
  children: React.ReactNode
}

export default function BreakpointLabel({ device, children }: BreakpointLabelProps) {
  return (
    <div className="inline-flex items-center gap-2.5 bg-navy-bolder text-white px-4 py-2 mb-4">
      <i
        className={`fa-solid ${device === 'desktop' ? 'fa-display' : 'fa-mobile-screen-button'} text-sm`}
        aria-hidden="true"
      />
      <span className="font-body font-bold text-sm whitespace-nowrap">{children}</span>
    </div>
  )
}
