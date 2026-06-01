import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

export type EpcContent = {
  heading: string;
  description: string;
  stepsHeading: string;
  steps: readonly string[];
};

// Semua fase pakai warna yang konsisten — accent/navy palette
const EPC_LETTERS = [
  { letter: "E", word: "Engineering", color: "bg-accent/10 text-accent border-accent/25" },
  { letter: "P", word: "Procurement", color: "bg-accent/10 text-accent border-accent/25" },
  { letter: "C", word: "Construction", color: "bg-accent/10 text-accent border-accent/25" },
];

// Warna per step yang seragam (semua bg sama seperti 1 2 3 4 di tahapan)
const STEP_COLORS = [
  { num: "bg-accent/10 text-accent border-accent/20", item: "border-accent/10 bg-accent/[0.04] hover:border-accent/25 hover:bg-accent/[0.08]" },
  { num: "bg-accent/10 text-accent border-accent/20", item: "border-accent/10 bg-accent/[0.04] hover:border-accent/25 hover:bg-accent/[0.08]" },
  { num: "bg-accent/10 text-accent border-accent/20", item: "border-accent/10 bg-accent/[0.04] hover:border-accent/25 hover:bg-accent/[0.08]" },
  { num: "bg-accent/10 text-accent border-accent/20", item: "border-accent/10 bg-accent/[0.04] hover:border-accent/25 hover:bg-accent/[0.08]" },
];

export const EpcMethodBlock = ({ epc }: { epc: EpcContent }) => {
  return (
    <div
      className="mt-10 border-t border-white/8 pt-10"
      aria-labelledby="epc-heading"
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-12">
        <article className="space-y-5">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-foreground-muted">
            Metodologi Kerja
          </span>
          <h4
            id="epc-heading"
            className="text-2xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-3xl"
          >
            {epc.heading}
          </h4>
          <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
            {epc.description}
          </p>

          <StaggerChildren staggerDelay={0.1} className="flex flex-wrap gap-3 pt-1">
            {EPC_LETTERS.map(({ letter, word, color }) => (
              <StaggerItem key={letter}>
                <motion.div
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`flex cursor-default items-center gap-3 rounded-xl border px-4 py-3 shadow-sm ${color}`}
                >
                  <span className="text-2xl font-extrabold leading-none">{letter}</span>
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest opacity-55">Fase</p>
                    <p className="text-sm font-bold tracking-wide">{word}</p>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </article>

        <div className="rounded-2xl border border-white/10 bg-background/50 p-6 sm:p-7">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-widest text-foreground-muted">
            {epc.stepsHeading}
          </p>

          <StaggerChildren className="list-none space-y-3" staggerDelay={0.1}>
            {epc.steps.map((step, idx) => {
              const sc = STEP_COLORS[idx] ?? STEP_COLORS[0];
              return (
                <StaggerItem key={step}>
                  <li className="group flex items-center gap-4">
                    <div
                      className={`flex size-11 shrink-0 items-center justify-center rounded-xl border text-sm font-extrabold shadow-sm transition-all duration-300 group-hover:scale-110 ${sc.num}`}
                    >
                      {idx + 1}
                    </div>
                    <div
                      className={`flex flex-1 items-center gap-3 rounded-xl border px-5 py-4 transition-all duration-200 ${sc.item}`}
                    >
                      <CheckCircle2
                        className="size-4 shrink-0 text-accent/50 transition-colors duration-200 group-hover:text-accent"
                        aria-hidden
                      />
                      <p className="text-sm font-bold leading-snug text-white/90 sm:text-base">{step}</p>
                    </div>
                  </li>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </div>
    </div>
  );
};