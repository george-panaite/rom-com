"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SiteFooter() {
  const pathname = usePathname();
  // The Ana chat view is shown full-bleed, without the footer.
  if (pathname === "/asistent") return null;

  return (
    <footer className="mt-[30px] rounded-t-[34px] bg-ink px-0 pb-[34px] pt-14 text-paper">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-7">
        <div className="grid gap-9 border-b border-white/15 pb-[34px] md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link
              href="/"
              className="mb-3.5 flex items-center gap-[11px] font-display text-[21px] font-extrabold tracking-[-0.01em] text-paper"
            >
              <span className="grid h-9 w-9 place-items-center rounded-[13px] bg-poppy font-display text-[17px] font-extrabold text-white">
                G
              </span>
              Ghid Olanda
            </Link>
            <p className="max-w-[40ch] text-[14.5px] text-white/65">
              Informații clare despre viața în Olanda, în limba română. Un proiect
              independent pentru comunitate.
            </p>
          </div>

          <div>
            <h5 className="mb-3.5 text-xs font-extrabold uppercase tracking-[0.06em] text-white/50">
              Platformă
            </h5>
            <FootLink href="/">Ghiduri</FootLink>
            <FootLink href="/asistent">Asistenta Ana</FootLink>
            <FootLink href="/#comunitate">Comunitate</FootLink>
          </div>

          <div>
            <h5 className="mb-3.5 text-xs font-extrabold uppercase tracking-[0.06em] text-white/50">
              Despre
            </h5>
            <FootLink href="/">Cine suntem</FootLink>
            <FootLink href="/">Surse</FootLink>
            <FootLink href="/">Contact</FootLink>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 pt-[22px] text-[13px] text-white/50">
          <span>&copy; {new Date().getFullYear()} Ghid Olanda</span>
          <span>Informații neoficiale. Ana respectă EU AI Act.</span>
        </div>
      </div>
    </footer>
  );
}

function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="block py-1.5 text-[14.5px] text-white/80 transition-colors hover:text-honey"
    >
      {children}
    </Link>
  );
}
