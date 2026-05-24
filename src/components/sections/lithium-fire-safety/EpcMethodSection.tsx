import { LITHIUM_FIRE_SAFETY_CONTENT } from "../../../content/lithium-fire-safety";
import { CheckCircle2 } from "lucide-react";
import { AnimateIn } from "../../ui/AnimateIn";

const { epc } = LITHIUM_FIRE_SAFETY_CONTENT;

const STEP_GRADIENTS = [
  "from-brand-primary to-[#ff9133]",
  "from-brand-dark-blue to-brand-navy",
  "from-brand-accent to-brand-dark-blue",
  "from-brand-navy to-[#051f61]",
];

const EPC_LETTERS = [
  { letter: "E", word: "Engineering", color: "bg-brand-primary/8 text-brand-primary border-brand-primary/15 ring-brand-primary/8" },
  { letter: "P", word: "Procurement", color: "bg-brand-dark-blue/8 text-brand-dark-blue border-brand-dark-blue/15 ring-brand-dark-blue/8" },
  { letter: "C", word: "Construction", color: "bg-brand-accent/8 text-brand-accent border-brand-accent/15 ring-brand-accent/8" },
];

export const EpcMethodSection = () => {
  return (
    <section
      className="bg-gradient-to-b from-white to-slate-50/60 py-20 sm:py-24 lg:py-32"
      aria-labelledby="epc-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-16 xl:gap-24">
          <AnimateIn direction="right">

            {/* Left: Narrative */}
            <article className="space-y-6">
              <span className="inline-block rounded-full bg-brand-dark-blue/8 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-dark-blue">
                Metodologi Kerja
              </span>
              <h2
                id="epc-heading"
                className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl leading-[1.12]"
              >
                {epc.heading}
              </h2>
              <p className="text-base leading-relaxed text-brand-navy/65 sm:text-lg">
                {epc.description}
              </p>

              {/* EPC Letter badges */}
              <div className="flex flex-wrap gap-3 pt-2">
                {EPC_LETTERS.map(({ letter, word, color }) => (
                  <div
                    key={letter}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 ring-1 shadow-sm ${color}`}
                  >
                    <span className="text-2xl font-extrabold leading-none">{letter}</span>
                    <div>
                      <p className="text-xs font-extrabold uppercase tracking-widest opacity-60">Fase</p>
                      <p className="text-sm font-bold tracking-wide">{word}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </AnimateIn>
          <AnimateIn direction="left" delay={0.1}>

            {/* Right: Steps */}
            <div className="rounded-2xl border border-brand-navy/8 bg-white p-7 shadow-[0_8px_40px_rgba(0,43,150,0.05)] sm:p-8">
              <p className="mb-6 text-xs font-extrabold uppercase tracking-widest text-brand-navy/35">
                {epc.stepsHeading}
              </p>
              <ol className="space-y-3 list-none" aria-label="Tahapan EPC Tambang">
                {epc.steps.map((step, idx) => (
                  <li key={step} className="group flex items-center gap-4">
                    {/* Step number */}
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-extrabold text-white shadow-sm transition-transform duration-200 group-hover:scale-105 ${STEP_GRADIENTS[idx] ?? STEP_GRADIENTS[0]}`}
                    >
                      {idx + 1}
                    </div>
                    {/* Step content */}
                    <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-5 py-4 transition-all duration-200 group-hover:border-slate-200 group-hover:bg-slate-50">
                      <CheckCircle2 className="size-4 shrink-0 text-brand-accent/50 transition-colors duration-200 group-hover:text-brand-accent" aria-hidden />
                      <p className="text-sm font-bold text-brand-navy sm:text-base leading-snug">{step}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};