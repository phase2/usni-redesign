interface Props {
  categories: { label: string; href: string }[]
}

export default function BookProductCategoryTags({ categories }: Props) {
  return (
    <section className="bg-white border-t border-[#e4e7ec] py-12">
      <div className="container-site">

        <h2 className="font-body font-semibold text-xs uppercase tracking-widest text-neutral-subtle mb-4">
          Categories
        </h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href={cat.href}
              className="inline-flex items-center px-4 py-2 border border-[#c4c9d4] font-body text-sm text-navy-bolder
                hover:border-navy-bolder hover:bg-surface-subtle transition-colors"
            >
              {cat.label}
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
