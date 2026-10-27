import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Article image gallery.
 *
 * Modelled on the gallery at demo.braecrestschool.com: one large stage that
 * cross-fades between images, a horizontally scrolling thumbnail rail that keeps
 * the active thumb in view, prev/next controls, and click-to-zoom. That component
 * is Alpine.js driving GLightbox; this is the React equivalent with a
 * self-contained lightbox, since the production build inlines everything and a
 * CDN library is not an option.
 *
 * Square corners throughout — the reference rounds the stage and thumbs.
 */

export interface GalleryImage {
  src: string
  alt: string
  caption: string
  credit?: string
}

export default function ArticleImageGallery({
  images,
  heading,
  intro,
}: {
  images: GalleryImage[]
  heading?: string
  intro?: string
}) {
  const [index, setIndex] = useState(0)
  const [zoomed, setZoomed] = useState(false)
  const railRef = useRef<HTMLDivElement>(null)
  const current = images[index]

  const go = useCallback(
    (next: number) => {
      const wrapped = (next + images.length) % images.length
      setIndex(wrapped)
      railRef.current?.children[wrapped]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      })
    },
    [images.length],
  )

  // Arrow keys move through the gallery; Escape closes the zoom.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(false)
      if (e.key === 'ArrowLeft') go(index - 1)
      if (e.key === 'ArrowRight') go(index + 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go, index])

  return (
    <figure className="my-10 flex flex-col gap-4">
      {(heading || intro) && (
        <div className="flex flex-col gap-2">
          {heading && (
            <h2 className="font-headline text-[28px] text-[#001845] leading-[1.2]">{heading}</h2>
          )}
          {intro && (
            <p className="font-body text-[16px] text-neutral-subtle leading-[1.6]">{intro}</p>
          )}
        </div>
      )}

      {/* ── Stage ── */}
      <div className="relative w-full aspect-[16/9] bg-[#f4f4f6] overflow-hidden group">
        {images.map((img, i) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            loading={i === 0 ? undefined : 'lazy'}
            aria-hidden={i !== index}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              i === index ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          />
        ))}

        <button
          type="button"
          onClick={() => setZoomed(true)}
          className="absolute inset-0 z-20 cursor-zoom-in"
          aria-label={`Zoom: ${current.caption}`}
        />

        <span
          aria-hidden="true"
          className="absolute top-4 right-4 z-30 bg-white text-navy-bolder font-body font-bold text-[13px] px-4 py-2
                     opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          Click image to zoom
        </span>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center
                         bg-navy-bolder/85 text-white hover:bg-navy-bolder transition-all
                         opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center
                         bg-navy-bolder/85 text-white hover:bg-navy-bolder transition-all
                         opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* ── Caption for the image on the stage ── */}
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-l-2 border-[#0466c8] pl-4">
        <p className="font-body text-[15px] text-[#1d2535] leading-[1.55] flex-1 min-w-0">
          {current.caption}
          {current.credit && (
            <span className="text-neutral-subtle"> — {current.credit}</span>
          )}
        </p>
        <p className="font-body font-bold text-[13px] text-neutral-subtle flex-shrink-0">
          {index + 1} / {images.length}
        </p>
      </figcaption>

      {/* ── Thumbnail rail ── */}
      {images.length > 1 && (
        <div
          ref={railRef}
          className="grid grid-flow-col auto-cols-[92px] md:auto-cols-[120px] gap-2 md:gap-3
                     overflow-x-auto scroll-smooth snap-x scrollbar-hide py-1"
        >
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show image ${i + 1}: ${img.caption}`}
              aria-current={i === index ? 'true' : undefined}
              className={`h-[70px] md:h-[86px] overflow-hidden border-4 snap-center transition-all ${
                i === index
                  ? 'border-[#0466c8]'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.src} alt="" loading="lazy" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* ── Zoom ── */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center p-6 lg:p-12"
        >
          {/* Same backdrop as the Giving and Membership modals. */}
          <div
            className="absolute inset-0 bg-navy-boldest/70 backdrop-blur-sm cursor-zoom-out"
            onClick={() => setZoomed(false)}
            aria-hidden="true"
          />

          <img
            src={current.src}
            alt={current.alt}
            className="relative z-10 max-h-[78vh] max-w-full w-auto object-contain"
          />
          <p className="relative z-10 font-body text-[15px] text-white leading-[1.6] max-w-[820px] text-center mt-5">
            {current.caption}
            {current.credit && <span className="text-white/70"> — {current.credit}</span>}
          </p>

          <button
            type="button"
            onClick={() => setZoomed(false)}
            aria-label="Close"
            className="absolute top-6 right-6 z-20 flex items-center justify-center w-10 h-10 bg-white text-navy-bolder border border-navy-bolder hover:bg-navy-bright hover:text-white hover:border-navy-bright transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>
      )}
    </figure>
  )
}
