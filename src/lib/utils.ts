import { type ClassValue, clsx } from "clsx";

/**
 * Merge Tailwind classes safely. Install clsx if using this utility:
 * npm install clsx
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
