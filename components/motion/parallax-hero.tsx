"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How far (in px) the image translates over the scroll range. */
  amount?: number;
};

/**
 * Hero parallax container — the photo scrolls slightly slower than the
 * viewport, giving the cinematic "weight" without crossing into theme-park.
 */
export function ParallaxHero({ children, className, amount = 120 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, amount]);
  const opacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.85, 0.4]);

  return (
    <div ref={ref} className={className}>
      <motion.div
        style={
          reduce ? undefined : { y, opacity, willChange: "transform" }
        }
        className="relative h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
