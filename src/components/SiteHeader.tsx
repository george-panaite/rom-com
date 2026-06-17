"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <header className="sticky top-0 z-[60] border-b border-line bg-paper/85 backdrop-blur-[10px]">
      <div className="mx-auto flex h-[74px] max-w-[1180px] items-center justify-between px-5 sm:px-7">
        <Link
          href="/"
          className="site-logo flex items-center gap-[11px] font-display text-[21px] font-extrabold tracking-[-0.01em]"
        >
          <span className="grid h-9 w-9 place-items-center rounded-[13px] bg-poppy font-display text-[17px] font-extrabold text-white">
            G
          </span>
          Ghid Olanda
        </Link>

        <nav className="flex items-center gap-7">
          <Link
            href="/"
            className={`text-[15px] font-semibold transition-colors hover:text-ink max-[880px]:hidden ${
              onHome ? "text-ink" : "text-soft"
            }`}
          >
            Ghiduri
          </Link>
          <Link
            href="/#comunitate"
            className="text-[15px] font-semibold text-soft transition-colors hover:text-ink max-[880px]:hidden"
          >
            Comunitate
          </Link>
          <Link href="/asistent" className="btn btn-poppy">
            Întreabă pe Ana
          </Link>
        </nav>
      </div>
    </header>
  );
}
