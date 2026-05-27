import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  className?: string;
  /**
   * Direction is reserved for future use; currently only "up" is implemented
   * via the global `reveal-clip-up` keyframe.
   */
  direction?: "up" | "down";
};

/**
 * Bottom-up clip-path reveal on mount. CSS-only. See Reveal for rationale.
 */
export function ClipReveal({ children, delay = 0, className }: Props) {
  const style = {
    "--reveal-delay": `${Math.round(delay * 1000)}ms`,
  } as CSSProperties;

  return (
    <div className={cn("clip-reveal-mount", className)} style={style}>
      {children}
    </div>
  );
}
