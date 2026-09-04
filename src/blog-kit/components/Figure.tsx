import Image from "next/image";
import blur from "../blur.generated.json";

const placeholders = blur as Record<string, string>;

/**
 * A figure that ships both themes.
 *
 * Both images render; CSS shows the one matching the active theme. Doing the
 * swap in CSS rather than JS means no flash and nothing to hydrate.
 *
 * width/height are required by next/image, which is the point — an image with
 * no intrinsic box reflows the page when it lands, which is exactly the CLS
 * regression the icon-font work shipped and had to fix.
 *
 * Placeholders come from blur.generated.json (see scripts/gen-blur.mjs), which
 * lives inside the kit so this import survives being copied. next/image
 * can only derive them itself from static imports, and covers are addressed by
 * path, so they are precomputed and committed.
 */
export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 628,
  priority = false,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  /** set on the first figure of an article — it is usually the LCP element */
  priority?: boolean;
}) {
  return (
    <figure>
      <div className="figure-inner">
        {(["light", "dark"] as const).map((theme) => {
          const file = `${src}-${theme}.png`;
          const b = placeholders[file];
          return (
            <Image
              key={theme}
              className={`fig-${theme}`}
              src={file}
              alt={alt}
              width={width}
              height={height}
              priority={priority}
              sizes="(max-width: 1000px) 100vw, 1000px"
              // a blurred version of the actual cover, so the box is never
              // empty while the full image downloads
              {...(b ? { placeholder: "blur" as const, blurDataURL: b } : {})}
            />
          );
        })}
        {caption ? <figcaption>{caption}</figcaption> : null}
      </div>
    </figure>
  );
}
