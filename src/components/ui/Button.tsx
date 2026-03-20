import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
}

export default function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "px-6 py-3 rounded-lg font-medium transition-all duration-200 cursor-pointer text-sm";

  const variants = {
    primary: "bg-foreground text-background hover:opacity-90",
    secondary: "bg-muted text-foreground hover:bg-muted/80",
    outline: "border border-border text-foreground hover:bg-muted",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
