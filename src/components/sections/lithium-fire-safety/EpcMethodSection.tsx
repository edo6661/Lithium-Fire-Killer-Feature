import { LITHIUM_FIRE_SAFETY_CONTENT } from "../../../content/lithium-fire-safety";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { epc } = LITHIUM_FIRE_SAFETY_CONTENT;

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

export const EpcMethodSection = () => {
  return (
    <section
      className="bg-surface py-20 border-y border-white/5 sm:py-24 lg:py-32"
      aria-labelledby="epc-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_460px] lg:items-center lg:gap-16 xl:gap-24">
          <AnimateIn direction="right">
            <article className="space-y-6">
              <span className="inline-block rounded-full bg-white/5 border border-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-foreground-muted">
                Metodologi Kerja
              </span>
              <h2
                id="epc-heading"
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.12]"
              >
                {epc.heading}
              </h2>
              <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                {epc.description}
              </p>

              {/* EPC Badges — semua warna seragam */}
              <StaggerChildren staggerDelay={0.1} className="flex flex-wrap gap-3 pt-2">
                {EPC_LETTERS.map(({ letter, word, color }) => (
                  <StaggerItem key={letter}>
                    <motion.div
                      whileHover={{ y: -3, scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-sm cursor-default ${color}`}
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
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-background/50 backdrop-blur-md p-7 shadow-xl sm:p-8">
              <p className="mb-6 text-xs font-extrabold uppercase tracking-widest text-foreground-muted">
                {epc.stepsHeading}
              </p>

              <StaggerChildren className="space-y-3 list-none" staggerDelay={0.1}>
                {epc.steps.map((step, idx) => {
                  const sc = STEP_COLORS[idx] ?? STEP_COLORS[0];
                  return (
                    <StaggerItem key={step}>
                      <li className="group flex items-center gap-4">
                        {/* Nomor step — seragam dengan accent */}
                        <div
                          className={`flex size-11 shrink-0 items-center justify-center rounded-xl border text-sm font-extrabold shadow-sm transition-all duration-300 group-hover:scale-110 ${sc.num}`}
                        >
                          {idx + 1}
                        </div>
                        {/* Item row — warna seragam */}
                        <div className={`flex flex-1 items-center gap-3 rounded-xl border px-5 py-4 transition-all duration-200 ${sc.item}`}>
                          <CheckCircle2 className="size-4 shrink-0 text-accent/50 transition-colors duration-200 group-hover:text-accent" aria-hidden />
                          <p className="text-sm font-bold text-white/90 sm:text-base leading-snug">{step}</p>
                        </div>
                      </li>
                    </StaggerItem>
                  );
                })}
              </StaggerChildren>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};