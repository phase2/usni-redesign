import { useLayoutEffect, useRef, useState } from 'react'

interface PreviewFrameProps {
  src: string
  /** The width the iframe renders at internally — this is what Tailwind's lg:/sm: media queries see,
   *  so it must stay a real desktop/mobile value (e.g. 1280 or 375) regardless of the container's
   *  actual size. The frame is then visually scaled down (via CSS transform) to fit its container,
   *  so it never overflows the docs column even though its internal layout viewport doesn't shrink. */
  width: number
  /** Fixed height in px. Omit to auto-measure from the loaded iframe's content height —
   *  only works for normal-flow content; position:fixed overlays (e.g. an off-canvas menu)
   *  need an explicit height since they fill whatever viewport height the iframe is given. */
  height?: number
  title: string
  /** Applied to the visible (border/background) box, which is sized to the actual scaled-down
   *  dimensions plus padding — not to the invisible full-width measuring wrapper. */
  className?: string
  /** Breathing room in px between the box edge and the scaled component. Default 24. */
  padding?: number
}

export default function PreviewFrame({ src, width, height, title, className = '', padding = 24 }: PreviewFrameProps) {
  const measureRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [availableWidth, setAvailableWidth] = useState(width)
  const [measuredHeight, setMeasuredHeight] = useState(height ?? 160)

  useLayoutEffect(() => {
    const el = measureRef.current
    if (!el) return
    setAvailableWidth(el.getBoundingClientRect().width)
    const observer = new ResizeObserver((entries) => setAvailableWidth(entries[0].contentRect.width))
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const handleLoad = () => {
    if (height != null) return
    const doc = iframeRef.current?.contentDocument
    if (doc) setMeasuredHeight(doc.documentElement.scrollHeight)
  }

  const naturalHeight = height ?? measuredHeight
  const scale = Math.min(1, (availableWidth - padding * 2) / width)
  const scaledWidth = width * scale
  const scaledHeight = naturalHeight * scale

  return (
    <div ref={measureRef} style={{ width: '100%' }}>
      <div
        className={className}
        style={{ width: scaledWidth + padding * 2, height: scaledHeight + padding * 2, overflow: 'hidden', padding }}
      >
        <div style={{ width, height: naturalHeight, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <iframe
            ref={iframeRef}
            src={src}
            title={title}
            onLoad={handleLoad}
            style={{ width, height: naturalHeight, border: 0, pointerEvents: 'none' }}
          />
        </div>
      </div>
    </div>
  )
}
