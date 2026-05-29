import { Flame, Zap, Thermometer, AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { AnimateIn } from "../../ui/AnimateIn";

const { thermalRunaway } = HOME_CONTENT;

const WARNING_POINTS = [
  {
    Icon: Zap,
    label: "Korsleting internal",
    sub: "Kerusakan fisik atau cacat produksi",
    color: "text-blue-400",
    bg: "bg-blue-500/10 ring-blue-500/15",
    glowColor: "rgba(96,165,250,0.15)",
  },
  {
    Icon: Thermometer,
    label: "Suhu berlebih",
    sub: "Pengisian daya tidak sesuai atau paparan panas",
    color: "text-accent",
    bg: "bg-accent/10 ring-accent/15",
    glowColor: "rgba(56,152,212,0.15)",
  },
  {
    Icon: Flame,
    label: "Thermal runaway",
    sub: "Reaksi berantai suhu meningkat tak terkendali",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 ring-cyan-500/15",
    glowColor: "rgba(34,211,238,0.15)",
  },
];

export const ThermalRunawaySection = () => {
  return (
    <section
      className="relative overflow-hidden bg-surface border-y border-white/5 py-20 sm:py-24 lg:py-8 text-white"
      aria-labelledby="thermal-runaway-heading"
    >
      {/* Ambient glows — CSS only, no JS */}
      <div className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-accent/5 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-blue-500/5 blur-[80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Left — text content */}
          <AnimateIn direction="right">
            <article className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
                <Flame className="size-3.5 fill-accent/40" aria-hidden />
                Bahaya Kritis
              </div>
              <h2
                id="thermal-runaway-heading"
                className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.12]"
              >
                {thermalRunaway.heading}
              </h2>
              <div className="space-y-5 max-w-prose">
                {thermalRunaway.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="text-base leading-[1.75] text-white/70 sm:text-[1.05rem] sm:leading-[1.8]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </AnimateIn>

          {/* Right — warning cards with staggered entrance */}
          <AnimateIn direction="left">
            <div className="flex flex-col gap-2">
              {WARNING_POINTS.map(({ Icon, label, sub, color, bg, glowColor }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                >
                  <motion.div
                    whileHover={{ x: 4, scale: 1.01 }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-background/50 p-5 backdrop-blur-sm transition-colors duration-200 hover:border-white/10 hover:bg-background/80"
                    style={{ "--glow": glowColor } as React.CSSProperties}
                  >
                    <div
                      className={`flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ${bg} transition-transform duration-200 group-hover:scale-110`}
                    >
                      <Icon className={`size-5 ${color}`} strokeWidth={2} />
                    </div>
                    <div className="min-w-0">
                      <p className="font-bold text-white/95 truncate">{label}</p>
                      <p className="mt-0.5 text-xs font-medium text-white/55 leading-snug">{sub}</p>
                    </div>
                  </motion.div>

                  {/* Connector line */}
                  {idx < WARNING_POINTS.length - 1 && (
                    <div className="ml-11 my-1 h-5 w-px bg-gradient-to-b from-white/12 to-white/3" aria-hidden />
                  )}
                </motion.div>
              ))}

              {/* Final danger card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.38, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-2"
              >
                <motion.div
                  whileHover={{ x: 4, scale: 1.015 }}
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  className="flex items-start gap-4 rounded-2xl border border-accent/20 bg-accent/8 p-5 transition-colors duration-200 hover:bg-accent/12 hover:border-accent/35"
                >
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 ring-1 ring-accent/20">
                    <AlertOctagon className="size-5 text-accent" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-white/95">Kebakaran atau Ledakan Hebat</p>
                    <p className="mt-1 text-xs font-medium leading-relaxed text-white/65">
                      Tidak bisa dipadamkan menggunakan APAR konvensional biasa.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};