import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}
