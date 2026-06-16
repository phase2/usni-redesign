export default function ProceedingsContactHero() {
  return (
    <section className="bg-[#ebf4ff] pt-12 pb-20">
      <div className="container-site flex flex-col gap-4">

        {/* Breadcrumb */}
        <div className="border-b border-[#C2DDFF] pb-4 flex items-center gap-2 text-sm">
          <a href="/" className="font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors">Home</a>
          <span className="text-neutral-subtle">/</span>
          <a href="/publications" className="font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors">Publications</a>
          <span className="text-neutral-subtle">/</span>
          <a href="/proceedings" className="font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors">Proceedings</a>
          <span className="text-neutral-subtle">/</span>
          <span className="font-body italic text-neutral-subtle">Contact Proceedings</span>
        </div>

        {/* Page title */}
        <h1 className="font-headline text-[64px] text-navy-bolder leading-[1.1]">
          Contact Proceedings
        </h1>

      </div>
    </section>
  )
}
