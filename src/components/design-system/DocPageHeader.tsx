import type { ReactNode } from 'react'
import DesignSystemBreadcrumb from '@/components/design-system/DesignSystemBreadcrumb'

/**
 * The standard opening of a design-system sheet: breadcrumb (derived from the
 * prototype map), H1, and an introduction. Sheets wrap their DocSections in the
 * same container this sets up, so every sheet starts at the same place.
 */
export default function DocPageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-6 max-w-[760px]">
      <DesignSystemBreadcrumb />
      <h1 className="font-headline text-5xl text-navy-bolder leading-[1.1] mb-4">{title}</h1>
      {children && (
        <div className="font-body text-lg text-neutral-subtle leading-relaxed flex flex-col gap-3">{children}</div>
      )}
    </div>
  )
}
