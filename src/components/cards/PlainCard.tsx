import type { PlainCardData } from '@/types'

interface PlainCardProps extends PlainCardData {}

export default function PlainCard({ headline, body, cta, href }: PlainCardProps) {
  return (
    <div className="flex flex-col border border-navy-subtle bg-white p-6 lg:p-7">
      <h3 className="font-headline text-2xl text-navy-bolder leading-[1.1] mb-4">{headline}</h3>
      <p className="font-body text-sm text-neutral-subtle leading-relaxed mb-8 flex-1">{body}</p>
      <a
        href={href}
        className="inline-flex items-center justify-center gap-2 bg-navy-bolder text-white font-body font-bold text-sm tracking-[-0.3px] px-5 py-3.5 border border-navy-bolder hover:bg-navy transition-colors duration-150 w-full"
      >
        {cta} →
      </a>
    </div>
  )
}
