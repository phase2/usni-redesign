import { Link, useLocation } from 'react-router-dom'
import { designSystemSection } from '@/data/prototypeMap'

/**
 * Breadcrumb for a component sheet, set in the page area above its H1:
 *
 *   Table of contents / Design System / Components / Cards
 *
 * - "Table of contents" links to /toc.
 * - "Design System" is the section the sheet belongs to on that page; it has no
 *   page of its own, so it renders as text, not a link.
 * - The group ("Foundations" / "Components") jumps to its heading on the table
 *   of contents.
 * - The sheet name is the current page.
 *
 * The trail is read from src/data/prototypeMap.ts by the current path, so a
 * sheet needs no props and a renamed or regrouped sheet updates here by itself.
 * Styled after the site's Breadcrumb: bold navy links, italic current page.
 */
const link = 'font-body font-bold text-navy-subtle hover:text-navy-bolder transition-colors'

function Separator() {
  return (
    <span className="text-neutral-subtle" aria-hidden="true">
      /
    </span>
  )
}

export default function DesignSystemBreadcrumb() {
  const { pathname } = useLocation()
  const group = designSystemSection.groups.find((g) => g.links.some((l) => l.href === pathname))
  const sheet = group?.links.find((l) => l.href === pathname)

  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        <li className="inline-flex items-center gap-x-2">
          <Link to="/toc" className={link}>
            Table of contents
          </Link>
          <Separator />
        </li>
        <li className="inline-flex items-center gap-x-2">
          <span className="font-body text-neutral-subtle">{designSystemSection.title}</span>
          {group && <Separator />}
        </li>
        {group && (
          <li className="inline-flex items-center gap-x-2">
            <Link to={`/toc#${group.id}`} className={link}>
              {group.title}
            </Link>
            {sheet && <Separator />}
          </li>
        )}
        {sheet && (
          <li>
            <span className="font-body italic text-neutral-subtle" aria-current="page">
              {sheet.label}
            </span>
          </li>
        )}
      </ol>
    </nav>
  )
}
