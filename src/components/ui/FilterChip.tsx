/**
 * A removable chip for one active filter, shown above a listing's results so
 * a reader can see — and undo — what is narrowing them without going back to
 * the facet column (which, on mobile, is folded away behind its toggle).
 *
 * `group` names the facet the value belongs to, for values that would be
 * ambiguous alone — a bare "2026" reads better as "Year: 2026".
 */
export default function FilterChip({
  label,
  group,
  onRemove,
}: {
  label: string
  group?: string
  onRemove: () => void
}) {
  return (
    <span className="inline-flex items-center gap-1.5 bg-surface-subtle border border-border-light px-2.5 py-1 font-body text-xs text-navy-bolder">
      {group && <span className="text-neutral-subtle">{group}:</span>}
      {label}
      <button
        type="button"
        onClick={onRemove}
        className="text-neutral-subtle hover:text-navy-bolder transition-colors flex-shrink-0"
        aria-label={`Remove ${group ? `${group} ` : ''}${label} filter`}
      >
        <i className="fa-solid fa-xmark text-[10px]" aria-hidden="true" />
      </button>
    </span>
  )
}
