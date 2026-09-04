import Link from "next/link";
import { ThemeToggle } from "@/blog-kit/components/ThemeToggle";

export function BlogBar({ back }: { back?: { href: string; label: string } }) {
  return (
    <div className="blog-bar">
      <div className="in">
        <Link className="home" href={back?.href ?? "/"}>
          {back?.label ?? "← kripasindhu.dev"}
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
