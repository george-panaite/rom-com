"use client";

import { useState } from "react";
import Link from "next/link";
import type { ArticleMetadata } from "@/lib/kennisbank";
import { getCategoryStyle } from "@/lib/guide-style";
import { ArrowRight } from "@/components/icons";

interface GuidesListProps {
  articles: ArticleMetadata[];
}

export default function GuidesList({ articles }: GuidesListProps) {
  const categories = ["Toate", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [activeCat, setActiveCat] = useState("Toate");

  const visible = articles.filter(
    (a) => activeCat === "Toate" || a.category === activeCat
  );

  return (
    <>
      {/* Filter pills */}
      <div className="mb-[22px] flex flex-wrap gap-[9px]">
        {categories.map((cat) => {
          const active = cat === activeCat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCat(cat)}
              className={`cursor-pointer rounded-full border-[1.5px] px-[17px] py-[9px] text-[13.5px] font-bold transition-[0.18s] ${
                active
                  ? "border-ink bg-ink text-paper"
                  : "border-line2 bg-transparent text-soft hover:border-ink hover:text-ink"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Guide rows */}
      <div className="flex flex-col gap-3.5">
        {visible.map((article) => {
          const { Icon, tint } = getCategoryStyle(article.category);
          return (
            <Link
              key={article.slug}
              href={`/ghid/${article.slug}`}
              className="group grid grid-cols-[auto_1fr] items-center gap-4 rounded-[22px] border border-line bg-card px-6 py-[22px] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-[3px] hover:border-line2 hover:shadow-[0_22px_40px_-28px_rgba(60,40,20,0.4)] min-[881px]:grid-cols-[auto_1fr_auto] min-[881px]:gap-6"
            >
              <span
                className={`grid h-[60px] w-[60px] flex-none place-items-center rounded-[18px] ${tint}`}
              >
                <Icon className="h-[27px] w-[27px]" />
              </span>

              <div>
                <div className="text-xs font-bold uppercase tracking-[0.05em] text-faint">
                  {article.category}
                </div>
                <h3 className="my-[5px] mt-1 font-display text-[22px] font-bold leading-[1.12] tracking-[-0.015em] text-ink">
                  {article.title}
                </h3>
                <p className="max-w-[60ch] text-[14.5px] text-soft">{article.summary}</p>

                {/* Mobile-only: cost + tap affordance (the desktop column is hidden < 881px) */}
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 min-[881px]:hidden">
                  <span className="font-display text-[15px] font-bold text-ink">
                    {article.cost}
                    {article.duration && (
                      <span className="ml-2 font-body text-xs font-semibold text-faint">
                        {article.duration}
                      </span>
                    )}
                  </span>
                  <ArrowRight className="h-[18px] w-[18px] text-poppy-d" />
                </div>
              </div>

              <div className="flex flex-none items-center gap-[22px] max-[880px]:hidden">
                <div className="text-right">
                  <div className="whitespace-nowrap font-display text-[18px] font-bold text-ink">
                    {article.cost}
                  </div>
                  <div className="text-xs font-semibold text-faint">{article.duration}</div>
                </div>
                <span className="grid h-[46px] w-[46px] flex-none place-items-center rounded-full bg-paper2 text-ink transition-all duration-200 group-hover:rotate-[-8deg] group-hover:bg-poppy group-hover:text-white">
                  <ArrowRight className="h-[19px] w-[19px]" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
