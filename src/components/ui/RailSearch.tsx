import { useEffect, useState, type FormEvent } from 'react'

/**
 * The Keyword field at the top of a listing's filter rail. Typing only edits
 * the field; the search runs when the reader presses Enter or the search
 * button, so the results don't reshuffle under every keystroke.
 *
 * Emptying the field is the one exception: it applies at once, so deleting
 * the text brings everything back without a second step.
 *
 * `value` is the search currently applied. The field follows it when it
 * changes from outside (Clear all, Back and Forward), and keeps the reader's
 * unsubmitted text otherwise.
 *
 * A long facet's "Find …" box is not this: it only narrows that facet's
 * option list, so it still filters as you type.
 */
export default function RailSearch({
  id,
  label,
  value,
  onSearch,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onSearch: (value: string) => void
  placeholder?: string
}) {
  const [draft, setDraft] = useState(value)
  useEffect(() => setDraft(value), [value])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSearch(draft.trim())
  }

  return (
    <form
      role="search"
      onSubmit={submit}
      className="flex flex-col gap-1.5"
    >
      <label htmlFor={id} className="font-body font-semibold text-sm text-navy-bolder">
        {label}
      </label>
      {/* The site search box's frame, scaled down for the rail: a 2px navy
          border around the field and button together. The halo marks focus,
          which the site search box leaves unmarked */}
      <div className="flex items-stretch border-2 border-navy-bolder bg-white transition
        focus-within:shadow-[0_0_0_3px_rgba(4,102,200,0.15)]">
        <input
          id={id}
          // Plain text, not type="search": the search button is the field's
          // one control, so there's no built-in clear ✕ beside it
          type="text"
          enterKeyHint="search"
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value)
            if (!e.target.value.trim() && value) onSearch('')
          }}
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent font-body text-base text-navy-bolder
            placeholder:text-neutral-subtle outline-none px-3.5 py-2.5"
        />
        <button
          type="submit"
          className="flex-shrink-0 flex items-center justify-center w-11 bg-navy-bolder text-white
            hover:bg-navy-bright transition-colors"
        >
          <i className="fa-solid fa-magnifying-glass text-sm" aria-hidden="true" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  )
}
