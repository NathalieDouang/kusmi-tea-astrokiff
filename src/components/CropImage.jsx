/**
 * Reproduces Figma "image fill with crop": a fixed box (overflow hidden) with an
 * oversized inner image positioned by percentage — used for the sun/star/illu
 * decor where the design frames a zoomed region of the source asset.
 */
export default function CropImage({ src, box, crop, className = "", parallax }) {
  return (
    <div
      className={`abs ${className}`}
      data-par={parallax?.scroll}
      data-mouse={parallax?.mouse}
      style={{
        left: box.left,
        top: box.top,
        width: box.w,
        height: box.h,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <img
        src={src}
        alt=""
        style={{
          position: "absolute",
          maxWidth: "none",
          width: crop.w,
          height: crop.h,
          left: crop.left,
          top: crop.top,
        }}
      />
    </div>
  );
}
