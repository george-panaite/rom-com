"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms before this element reveals once in view. */
  delay?: number;
  /** Element to render as the wrapper (default div). */
  as?: ElementType;
}

/**
 * Fades + lifts children into view via IntersectionObserver.
 * Respects prefers-reduced-motion and force-reveals after a short
 * fallback so content is never left hidden if IO never fires.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let revealTimer: ReturnType<typeof setTimeout>;

    // Reduced motion is handled in CSS (.reveal stays visible), so we only
    // need to drive the .in class for users who want the animation.
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealTimer = setTimeout(() => setShown(true), delay);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);

    // Safety net for environments where IO never fires.
    const fallback = setTimeout(() => setShown(true), 600);

    return () => {
      io.disconnect();
      clearTimeout(fallback);
      clearTimeout(revealTimer);
    };
  }, [delay]);

  return (
    <Tag ref={ref} className={`reveal${shown ? " in" : ""} ${className}`.trim()}>
      {children}
    </Tag>
  );
}
