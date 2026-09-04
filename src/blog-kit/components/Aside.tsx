/** A quiet left-ruled note. Deliberately not a card — cards compete with prose. */
export function Aside({ children }: { children: React.ReactNode }) {
  return <div className="aside">{children}</div>;
}
