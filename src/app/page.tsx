import Link from "next/link";
import { getAllArticles } from "@/lib/kennisbank";
import GuidesList from "@/components/GuidesList";
import Reveal from "@/components/Reveal";
import { ArrowRight, Check } from "@/components/icons";

export default function Home() {
  const articles = getAllArticles();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="pb-[30px] pt-14">
        <div className="mx-auto grid max-w-[1180px] items-center gap-10 px-5 sm:px-7 min-[881px]:grid-cols-[1.08fr_0.92fr] min-[881px]:gap-[50px]">
          <Reveal>
            <span className="eyebrow">Comunitatea ta în Olanda</span>
            <h1 className="mt-5 font-display text-[clamp(42px,5.6vw,74px)] font-extrabold leading-[0.98] tracking-[-0.025em]">
              Aici nu ești <span className="hl">singur</span> în Olanda.
            </h1>
            <p className="mt-6 max-w-[34ch] text-[19px] text-soft">
              Ghiduri clare despre acte și proceduri și Ana, asistenta care îți răspunde
              pe loc. Totul în română, gratuit.
            </p>
            <div className="mt-[30px] flex flex-wrap items-center gap-[13px]">
              <Link href="/asistent" className="btn btn-poppy">
                Întreabă pe Ana
                <span className="arr">
                  <ArrowRight />
                </span>
              </Link>
              <a href="#ghiduri" className="btn btn-ghost">
                Vezi ghidurile
              </a>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px] font-semibold text-soft">
              {["Gratuit", "În română", "Surse oficiale"].map((chip) => (
                <li key={chip} className="inline-flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-pine" />
                  {chip}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="relative h-[300px] min-[881px]:h-[440px]" delay={120}>
            <span className="absolute right-[8%] top-2 z-[3] rotate-[5deg] rounded-[14px] bg-ink px-4 py-[11px] font-display text-[13px] font-bold text-paper shadow-[0_10px_20px_-10px_rgba(0,0,0,0.4)]">
              în română
            </span>

            {/* Guides preview panel */}
            <div className="absolute left-0 top-0 flex h-[74%] w-[62%] flex-col overflow-hidden rounded-[26px] bg-pine p-5 text-paper shadow-[0_24px_44px_-26px_rgba(60,40,20,0.45)]">
              <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-honey">
                Ghiduri esențiale
              </span>
              <p className="mt-2.5 font-display text-[20px] font-bold leading-tight">
                Pas cu pas, în limba ta.
              </p>
              <ul className="mt-auto flex flex-col gap-2.5">
                {["Înregistrare & BSN", "Asigurare de sănătate", "Înregistrare ZZP (KVK)"].map(
                  (g) => (
                    <li key={g} className="flex items-center gap-2.5 text-[13.5px] font-semibold">
                      <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-honey/25 text-honey">
                        <Check className="h-3 w-3" />
                      </span>
                      {g}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Ana preview panel */}
            <div className="absolute bottom-0 right-0 flex h-[56%] w-[50%] flex-col justify-end overflow-hidden rounded-[26px] bg-[linear-gradient(150deg,#e0502e,#e9a93c)] p-5 shadow-[0_24px_44px_-26px_rgba(60,40,20,0.45)]">
              <div className="flex items-center gap-2.5">
                <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-white font-display text-[16px] font-extrabold text-poppy-d">
                  A
                </span>
                <span className="text-[11px] font-bold uppercase tracking-[0.05em] text-white">
                  Asistenta Ana
                </span>
              </div>
              <div className="mt-3 self-start rounded-[14px_14px_14px_4px] bg-white px-3.5 py-2.5 text-[13px] font-medium leading-snug text-ink shadow-sm">
                Salut! Cu ce te pot ajuta?
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ GUIDES ============ */}
      <section id="ghiduri" className="mx-auto max-w-[1180px] scroll-mt-[90px] px-5 py-16 sm:px-7">
        <Reveal className="mb-8">
          <span className="eyebrow">Ghidurile esențiale</span>
          <h2 className="mt-3 font-display text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.02] tracking-[-0.025em]">
            Pașii prin care trece oricine
          </h2>
          <p className="mt-2.5 max-w-[46ch] text-[16.5px] text-soft">
            Explicate simplu, cu surse oficiale. Alege ce te interesează acum.
          </p>
        </Reveal>
        <Reveal>
          <GuidesList articles={articles} />
        </Reveal>
      </section>

      {/* ============ ANA BAND ============ */}
      <section className="mx-auto max-w-[1180px] px-5 sm:px-7">
        <Reveal>
          <Link
            href="/asistent"
            className="relative my-5 block overflow-hidden rounded-[32px] bg-pine text-paper"
          >
            <div className="grid items-center gap-[30px] px-12 py-[50px] max-[880px]:justify-items-center max-[880px]:text-center min-[881px]:grid-cols-[auto_1fr_auto]">
              <span className="ana-face h-[90px] w-[90px] rounded-full text-[40px]">A</span>
              <div>
                <span className="eyebrow eyebrow-honey">Asistenta ta</span>
                <h3 className="my-2 mt-2.5 font-display text-[30px] font-extrabold tracking-[-0.02em]">
                  Salut, sunt Ana.
                </h3>
                <p className="max-w-[46ch] text-base text-white/80">
                  Întreabă-mă orice despre actele și pașii din Olanda. Îți răspund pe loc,
                  în limba română, gratuit.
                </p>
              </div>
              <span className="btn btn-ink">
                Începe o conversație
                <span className="arr">
                  <ArrowRight />
                </span>
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* ============ COMMUNITY ============ */}
      <section id="comunitate" className="mx-auto max-w-[1180px] scroll-mt-[90px] px-5 py-16 sm:px-7">
        <Reveal className="mb-8">
          <span className="eyebrow eyebrow-pine">Ce urmează</span>
          <h2 className="mt-3 font-display text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.02] tracking-[-0.025em]">
            Mai mult decât un ghid
          </h2>
          <p className="mt-2.5 max-w-[46ch] text-[16.5px] text-soft">
            Ghidul este doar începutul. Construim locul unde românii din Olanda se ajută
            între ei.
          </p>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          <Pillar
            n="01"
            title="Ghiduri și Ana"
            body="Proceduri traduse și o asistentă care răspunde la întrebări, gratuit."
            status="live"
            delay={0}
          />
          <Pillar
            n="02"
            title="Marktplaats"
            body="Muncă, meseriași, transport și locuințe, cu recenzii reale."
            status="soon"
            delay={70}
          />
          <Pillar
            n="03"
            title="Comunitate"
            body="Profiluri, recenzii și răspunsuri din experiența celor de aici."
            status="soon"
            delay={140}
          />
        </div>
      </section>
    </>
  );
}

function Pillar({
  n,
  title,
  body,
  status,
  delay,
}: {
  n: string;
  title: string;
  body: string;
  status: "live" | "soon";
  delay: number;
}) {
  return (
    <Reveal
      delay={delay}
      className="rounded-[22px] border border-line bg-card p-[26px] transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.2,0.7,0.2,1)] hover:-translate-y-1 hover:shadow-[0_22px_40px_-28px_rgba(60,40,20,0.4)]"
    >
      <div className="font-display text-[30px] font-extrabold text-line2">{n}</div>
      <h4 className="my-[7px] mt-2 font-display text-[21px] font-bold">{title}</h4>
      <p className="text-[14.5px] text-soft">{body}</p>
      <span
        className={`mt-4 inline-block whitespace-nowrap rounded-full px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.05em] ${
          status === "live" ? "bg-pine text-paper" : "bg-paper2 text-faint"
        }`}
      >
        {status === "live" ? "Disponibil acum" : "În curând"}
      </span>
    </Reveal>
  );
}
