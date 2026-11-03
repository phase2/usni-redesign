import usniIcon from '@/assets/images/usni-icon-gold.svg'

/**
 * Stand-in for a title whose cover art the Press does not publish: the USNI
 * quill-and-sword mark on a tan plate in a white frame. Fills its parent, which
 * must be `relative` and own the 2:3 shape. Used by every book card.
 *
 * Uses `usni-icon-gold.svg` rather than the raster watermark the leadership
 * roster uses for a missing headshot. That one ships its own #F7F7F2 field with
 * no alpha channel, which meant knocking the field out with `mix-blend-multiply`
 * over the tan — it left a visible square and washed the mark out. The SVG is
 * transparent and needs no blending.
 */
export default function BookCoverPlate() {
  return (
    <div
      className="absolute inset-0 bg-tan-subtle border-[6px] border-white
                 flex items-center justify-center"
      aria-hidden="true"
    >
      <img src={usniIcon} alt="" className="w-[58%] h-auto" />
    </div>
  )
}
