interface DocSectionProps {
  title: string
  children: React.ReactNode
}

export default function DocSection({ title, children }: DocSectionProps) {
  return (
    <section className="py-14 border-t border-border-light first:border-t-0 first:pt-0">
      <h2 className="font-headline text-3xl text-navy-bolder mb-8">{title}</h2>
      {children}
    </section>
  )
}
