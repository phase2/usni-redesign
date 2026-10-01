import { Link } from 'react-router-dom'
import DesignSystemLayout from '@/components/design-system/DesignSystemLayout'
import { prototypeMap, flattenLinks, type PrototypeGroup } from '@/data/prototypeMap'

/**
 * /toc — the Table of Contents: every component sheet, then every
 * prototype page, grouped by information-architecture bucket.
 *
 * Replaced the /design-system hub (a grid of seven component-sheet tiles);
 * /design-system now redirects here. The hero is a navy gradient, navy-boldest
 * to navy-subtle, with the type reversed out. Groups take the site's
 * section header — headline over a blue accent rule — and list their pages in
 * two flat columns: the nesting the PrototypeNav shows (checkout steps under
 * their flow, series under PME) is dropped here, and a label-only parent with
 * no page of its own falls away with it.
 *
 * Content comes from src/data/prototypeMap.ts, the same list the floating
 * PrototypeNav reads, so the two cannot disagree.
 */

function GroupLinks({ group }: { group: PrototypeGroup }) {
  const links = flattenLinks(group.links).filter((link) => link.href)

  return (
    <div id={group.id} className="scroll-mt-28 flex flex-col gap-5">
      <h3 className="font-headline text-[26px] lg:text-[32px] text-navy-bolder leading-[1.15] pb-4 border-b-2 border-[#0466C8]">
        {group.title}
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
        {links.map((link) => (
          <li key={`${link.label}-${link.href}`}>
            <Link to={link.href!} className="group flex flex-wrap items-baseline gap-x-2 gap-y-0.5 py-2">
              <span className="font-body font-semibold text-[15px] text-navy-bolder group-hover:text-[#0466c8] transition-colors">
                {link.label}
              </span>
              {link.note && <span className="font-body text-xs text-neutral-subtle">{link.note}</span>}
              <span className="basis-full font-mono text-[11px] text-neutral-subtle/80">{link.href}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function TableOfContents() {
  return (
    <DesignSystemLayout>
      <section style={{ background: 'linear-gradient(135deg, #001233 0%, #001845 45%, #023e7d 100%)' }}>
        <div className="max-w-container mx-auto px-6 lg:px-8 py-16 lg:py-24 text-center flex flex-col items-center">
          <h1 className="font-headline text-5xl lg:text-6xl text-white leading-[1.1]">
            Table of Contents
          </h1>
          <p className="font-body text-xs uppercase tracking-[0.08em] text-light-blue mt-6">
            Last updated October 2026 · v0.2
          </p>
        </div>
      </section>

      <div className="max-w-container mx-auto px-6 lg:px-8 pt-14 lg:pt-16 pb-24 grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-10 lg:gap-16 items-start">
        {/* Index */}
        <nav aria-label="Table of contents" className="lg:sticky lg:top-28">
          <p className="font-body font-medium text-xs uppercase tracking-[0.1em] text-navy-subtle mb-3">
            Contents
          </p>
          <ol className="flex flex-col gap-4">
            {prototypeMap.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`} className="font-body font-bold text-sm text-navy-bolder hover:text-[#0466c8]">
                  {section.title}
                </a>
                <ol className="mt-1.5 flex flex-col gap-1 pl-3 border-l border-border-light">
                  {section.groups.map((group) => (
                    <li key={group.id}>
                      <a href={`#${group.id}`} className="font-body text-[13px] text-neutral-subtle hover:text-[#0466c8]">
                        {group.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </li>
            ))}
          </ol>
        </nav>

        <div className="flex flex-col gap-20 min-w-0">
          {prototypeMap.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28 flex flex-col gap-12">
              <h2 className="font-headline text-[36px] lg:text-[48px] text-navy-bolder leading-[1.1]">
                {section.title}
              </h2>
              {section.groups.map((group) => (
                <GroupLinks key={group.id} group={group} />
              ))}
            </section>
          ))}
        </div>
      </div>
    </DesignSystemLayout>
  )
}
