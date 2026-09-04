import type { MDXComponents } from "mdx/types";
import { Figure } from "./Figure";
import { Aside } from "./Aside";

/**
 * The component set every article renders through — preview and production alike.
 */
export const mdxComponents: MDXComponents = {
  Figure,
  Aside,
  // wide tables scroll inside their own box; the page must never scroll sideways
  table: (props: React.ComponentProps<"table">) => (
    <div className="table-scroll">
      <table {...props} />
    </div>
  ),
};
