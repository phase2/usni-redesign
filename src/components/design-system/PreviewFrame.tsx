interface PreviewFrameProps {
  src: string
  /** The width the iframe renders at internally — this is what Tailwind's lg:/sm: media queries see.
   *  Desktop samples should use a value that comfortably fits the docs column (~1200px) so no scaling
   *  trick is needed; mobile samples (e.g. 375) are already narrow enough on their own. */
  width: number
  /** Fixed height in px. */
  height: number
  title: string
  /** Applied to the visible (border/background/padding) box. */
  className?: string
}

export default function PreviewFrame({ src, width, height, title, className = '' }: PreviewFrameProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <iframe
        src={src}
        title={title}
        style={{ width, height, border: 0, pointerEvents: 'none', display: 'block' }}
      />
    </div>
  )
}
