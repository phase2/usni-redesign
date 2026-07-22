interface CodeBlockProps {
  code: string
  className?: string
}

export default function CodeBlock({ code, className = '' }: CodeBlockProps) {
  return (
    <pre className={`bg-navy-boldest text-white/90 font-mono text-xs leading-relaxed p-4 overflow-x-auto ${className}`}>
      <code>{code}</code>
    </pre>
  )
}
