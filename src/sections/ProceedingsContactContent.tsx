const staff = [
  { name: 'James Stavridis',    title: 'Proceedings Chair',       email: 'jstavridis@usni.org' },
  { name: 'Bill Hamblet',       title: 'Editor-in-Chief',         email: 'bhamblet@usni.org' },
  { name: 'Bill Bray',          title: 'Deputy Editor-in-Chief',  email: 'bbray@usni.org' },
  { name: 'Emily Abdow',        title: 'Managing Editor',         email: 'eabdow@usni.org' },
  { name: 'Julie Olver',        title: 'Senior Editor',           email: 'jolver@usni.org' },
  { name: 'Karen Eskew',        title: 'Associate Editor',        email: 'keskew@usni.org' },
  { name: 'Candace Daniels',    title: 'Associate Editor',        email: 'cdaniels@usni.org' },
  { name: "Brian O'Rourke",     title: 'Art Director',            email: 'borourke@usni.org' },
  { name: 'Jennifer Pompi',     title: 'Senior Designer',         email: 'jpompi@usni.org' },
  { name: 'Joel Weickgenant',   title: 'Digital Editor',          email: 'jweickgenant@usni.org' },
  { name: 'Heather Legg',       title: 'Production Manager',      email: 'hlegg@usni.org' },
  { name: 'Moon Pich',          title: 'Advertising Manager',     email: 'mpich@usni.org' },
  { name: 'Samantha Ouellette', title: 'Circulation Manager',     email: 'souellette@usni.org' },
  { name: 'Liese Doherty',      title: 'Editorial Assistant',     email: 'ldoherty@usni.org' },
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-b border-[#0466C8] pb-4">
      <h2 className="font-headline text-[36px] text-navy-bolder leading-[1.2]">{children}</h2>
    </div>
  )
}

export default function ProceedingsContactContent() {
  return (
    <section className="bg-white py-16">
      <div className="container-site flex flex-col gap-16">

        {/* Staff + Sidebar grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">

          {/* Left: Staff grid */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <SectionHeading>Proceedings Staff</SectionHeading>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
              {staff.map((person) => (
                <div key={person.email} className="flex flex-col gap-0.5">
                  <p className="font-headline text-[20px] text-[#1d2535] leading-[1.2]">
                    {person.name}
                  </p>
                  <p className="font-body text-sm text-neutral-subtle leading-relaxed">
                    {person.title}
                  </p>
                  <a
                    href={`mailto:${person.email}`}
                    className="font-body font-bold text-sm text-navy-subtle underline underline-offset-2 hover:text-navy-bolder transition-colors"
                  >
                    {person.email}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Sticky sidebar */}
          <div className="flex-none w-full lg:w-[350px] lg:sticky top-[96px] flex flex-col gap-6">

            {/* Mailing Address */}
            <div className="flex flex-col gap-6">
              <SectionHeading>Mailing Address</SectionHeading>
              <p className="font-body text-base text-[#1d2535] leading-relaxed">
                U.S. Naval Institute<br />
                Proceedings<br />
                291 Wood Road<br />
                Annapolis, MD 21402
              </p>
            </div>

            {/* Phone Numbers */}
            <div className="flex flex-col gap-6">
              <SectionHeading>Phone Numbers</SectionHeading>
              <div className="font-body text-base text-[#1d2535] leading-relaxed flex flex-col gap-2">
                <p>
                  Phone Number:{' '}
                  <a href="tel:4102686110" className="font-bold text-navy-subtle underline underline-offset-2 hover:text-navy-bolder transition-colors">
                    (410) 268-6110
                  </a>
                </p>
                <p>
                  Fax Number:{' '}
                  <a href="tel:4102951049" className="font-bold text-navy-subtle underline underline-offset-2 hover:text-navy-bolder transition-colors">
                    (410) 295-1049
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Submission Guidelines alert banner */}
        <div className="bg-[#fff8d6] border-l-4 border-[#ffaa00] flex flex-col lg:flex-row lg:items-center gap-6 px-6 py-6 lg:px-8 lg:py-8">
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <h2 className="font-headline text-[36px] text-[#1d2535] leading-[1.2]">
              Proceedings Submission Guidelines
            </h2>
            <p className="font-body text-xl text-black leading-snug">
              Proceedings is built on the ideas of those who serve. If you have something to say — a fresh argument, a hard-won lesson, or a challenge to conventional thinking — here's how to put it in front of the naval community that reads us.
            </p>
          </div>
          <div className="flex-none w-full lg:w-[350px]">
            <a
              href="/proceedings/submissions"
              className="flex items-center justify-center w-full bg-navy-bold text-white font-body font-bold text-base tracking-[-0.5px] px-6 py-4 hover:bg-navy-bright transition-colors"
            >
              View our submission guidelines
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
