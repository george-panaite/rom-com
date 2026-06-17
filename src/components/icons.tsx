/**
 * Lucide-identical icons, hand-inlined as React components.
 * Matches the prototype's `I.*` map and the codebase convention of
 * inlining SVGs (lucide-react is not a dependency). Stroke uses
 * currentColor with round caps/joins; sizes are set by the caller.
 */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, strokeWidth = 2, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <Svg strokeWidth={2.2} {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </Svg>
  );
}

export function FileText(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14 3v4a1 1 0 0 0 1 1h4" />
      <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2Z" />
    </Svg>
  );
}

export function Send(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M14.5 9.5 21 3M21 3l-6.5 18a.55.55 0 0 1-1 0l-3.5-7-7-3.5a.55.55 0 0 1 0-1Z" />
    </Svg>
  );
}

export function Building(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-4" />
      <path d="M9 9v.01M9 12v.01M9 15v.01" />
    </Svg>
  );
}

export function HeartPulse(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.5 1-1a5.5 5.5 0 0 0 0-7.9Z" />
    </Svg>
  );
}

export function Store(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 9h18M3 9l2-5h14l2 5M5 9v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9M9 13h6" />
    </Svg>
  );
}

export function AlertTriangle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </Svg>
  );
}

export function Check(props: IconProps) {
  return (
    <Svg strokeWidth={2.5} {...props}>
      <path d="M20 6 9 17l-5-5" />
    </Svg>
  );
}

export function ExternalLink(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </Svg>
  );
}
