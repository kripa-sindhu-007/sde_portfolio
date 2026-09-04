import Image from "next/image";

/**
 * A figure that ships both themes.
 *
 * Both images render; CSS shows the one matching the active theme. Doing the
 * swap in CSS rather than JS means no flash and nothing to hydrate.
 *
 * width/height are required by next/image, which is the point — an image with
 * no intrinsic box reflows the page when it lands, which is exactly the CLS
 * regression the icon-font work shipped and had to fix.
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
        <Image
          className="fig-light"
          src={`${src}-light.png`}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
        />
        <Image
          className="fig-dark"
          src={`${src}-dark.png`}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
        />
        {caption ? <figcaption>{caption}</figcaption> : null}
      </div>
    </figure>
  );
}
