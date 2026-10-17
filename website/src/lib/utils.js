import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Standard utility function used across shadcn/ui, Aceternity UI, and Magic UI
 * to combine dynamic Tailwind classes cleanly.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
