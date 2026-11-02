/**
 * Renders `*text*` spans as <em>. Book copy italicizes titles ("*AI Warfighting*
 * argues…"), and keeping that markup in the data strings avoids turning every
 * paragraph into JSX.
 */
export default function InlineItalics({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\*[^*]+\*)/g).map((part, i) =>
        part.startsWith('*') && part.endsWith('*') && part.length > 2
          ? <em key={i}>{part.slice(1, -1)}</em>
          : part,
      )}
    </>
  )
}
