/**
 * Renders a JSON-LD block.
 *
 * A <script> returned from a component is DOM-inserted and never executed —
 * which is fatal for the theme script in the root layout, but irrelevant here:
 * type="application/ld+json" is data, not code, and crawlers read it straight
 * out of the markup.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify escapes nothing dangerous here — the input is our own
      // frontmatter — but < is escaped anyway so a title can never close the tag
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
