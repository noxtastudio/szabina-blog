import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  className?: string;
};

/**
 * Quiet fade-up on mount. CSS-only — no JS, no IntersectionObserver.
 * Runs once when the element first paints; below-the-fold elements
 * will already be revealed by the time the user scrolls to them,
 * which is the right tradeoff for reliability (we lost too many
 * elements to silent IO failures on mobile Safari).
 */
export function Reveal({ children, delay = 0, className }: Props) {
  const style = {
    "--reveal-delay": `${Math.round(delay * 1000)}ms`,
  } as CSSProperties;

  return (
    <div className={cn("reveal-mount", className)} style={style}>
      {children}
    </div>
  );
}
