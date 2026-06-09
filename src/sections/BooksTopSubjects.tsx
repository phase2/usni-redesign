import { topSubjects } from '@/data/books'

export default function BooksTopSubjects() {
  return (
    <section className="py-14 lg:py-16 bg-surface-subtle">
      <div className="container-site">

        <h2 className="font-headline text-3xl lg:text-4xl text-navy-bolder leading-tight mb-2 pb-4 border-b-2 border-[#0466C8]">
          Top Subjects
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
          {topSubjects.map((subject) => (
            <a
              key={subject.label}
              href={subject.href}
              className="group bg-navy-bolder hover:bg-navy-subtle transition-colors p-5 flex flex-col justify-between gap-6 min-h-[110px]"
            >
              <span className="font-headline text-[20px] text-white leading-snug">
                {subject.label}
              </span>
              <i className="fa-solid fa-arrow-right text-white text-lg group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
