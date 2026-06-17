interface ButtonLinkCTAProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function ButtonLinkCTA({ href, children, className = '' }: ButtonLinkCTAProps) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center ${className}`}
    >
      {/* Blue arrow badge */}
      <div className="w-10 h-10 bg-[#0466C8] flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-white transition-transform duration-200 group-hover:translate-x-1"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 10h12M11 5l5 5-5 5" />
        </svg>
      </div>

      {/* Label with animated underline */}
      <span className="relative font-body font-bold text-base text-navy-bolder px-3 py-2.5 leading-none">
        {children}
        <span className="absolute bottom-1 left-3 right-3 h-px bg-[#0466C8] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
      </span>
    </a>
  )
}
