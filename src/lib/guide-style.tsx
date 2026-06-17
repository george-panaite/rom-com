import type { ComponentType, SVGProps } from "react";
import { Building, HeartPulse, Store } from "@/components/icons";

type CategoryStyle = {
  /** category-class key used by the design (admin / sanatate / business) */
  key: string;
  /** Lucide-style icon for the category */
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Tailwind classes for the tinted icon tile / category pill */
  tint: string;
};

const DEFAULT: CategoryStyle = {
  key: "admin",
  Icon: Building,
  tint: "bg-pine-tint text-pine",
};

/** Map a Romanian guide category to its Acasă colour + icon. */
export function getCategoryStyle(category: string): CategoryStyle {
  switch (category.toLowerCase()) {
    case "administrativ":
      return { key: "admin", Icon: Building, tint: "bg-pine-tint text-pine" };
    case "sănătate":
    case "sanatate":
      return {
        key: "sanatate",
        Icon: HeartPulse,
        tint: "bg-poppy-wash text-poppy",
      };
    case "business":
      return { key: "business", Icon: Store, tint: "bg-honey-wash text-honey-d" };
    default:
      return DEFAULT;
  }
}
