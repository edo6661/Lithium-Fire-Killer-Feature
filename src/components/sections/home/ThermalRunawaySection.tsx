import { Flame, Zap, Thermometer, AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { AnimateIn } from "../../ui/AnimateIn";

const { thermalRunaway } = HOME_CONTENT;

const WARNING_POINTS = [
  { Icon: Zap, label: "Korsleting internal", sub: "Kerusakan fisik atau cacat produksi", color: "text-amber-400", bg: "bg-amber-500/10 ring-amber-500/15" },
  { Icon: Thermometer, label: "Suhu berlebih", sub: "Pengisian daya tidak sesuai atau paparan panas", color: "text-brand-primary", bg: "bg-brand-primary/10 ring-brand-primary/15" },
  { Icon: Flame, label: "Thermal runaway", sub: "Reaksi berantai suhu meningkat tak terkendali", color: "text-brand-secondary", bg: "bg-brand-secondary/10 ring-brand-secondary/15" },
];

export const ThermalRunawaySection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#0e0400] via-[#1c0800] to-[#001a5e] py-20 sm:py-24 lg:py-32 text-white"
      aria-labelledby="thermal-runaway-heading"
    >
      <div className="pointer-events-none absolute -left-24 top-0 size-96 rounded-full bg-brand-secondary/12 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-80 rounded-full bg-brand-primary/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          <AnimateIn direction="right">
            <article className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/25 bg-brand-secondary/12 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-secondary">
                <Flame className="size-3.5 fill-brand-secondary" aria-hidden />
                Bahaya Kritis
              </div>
              <h2 id="thermal-runaway-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.12]">
                {thermalRunaway.heading}
              </h2>
              <div className="space-y-4">
                {thermalRunaway.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-base leading-relaxed text-white/65 sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          </AnimateIn>

          {/* Chain visual */}
          <AnimateIn direction="left">
            <div className="flex flex-col gap-2">
              {WARNING_POINTS.map(({ Icon, label, sub, color, bg }, idx) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                >
                  <div className="group flex items-center gap-4 rounded-2xl border border-white/6 bg-white/[0.035] p-5 backdrop-blur-sm transition-all duration-200 hover:border-white/12 hover:bg-white/[0.06]">
                    <div className={`flex size-12 shrink-0 items-center justify-center rounded-xl ring-1 ${bg} transition-transform duration-200 group-hover:scale-105`}>
                      <Icon className={`size-5.5 ${color}`} strokeWidth={2} />
                    </div>
                    <div>
                      <p className="font-bold text-white/95">{label}</p>
                      <p className="mt-0.5 text-xs font-medium text-white/45 leading-snug">{sub}</p>
                    </div>
                  </div>
                  {idx < WARNING_POINTS.length - 1 && (
                    <div className="ml-11 my-1 h-5 w-px bg-gradient-to-b from-white/15 to-white/5" aria-hidden />
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-2 flex items-start gap-4 rounded-2xl border border-brand-secondary/30 bg-brand-secondary/10 p-5 shadow-[0_8px_32px_rgba(237,45,0,0.08)]"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-secondary/15 ring-1 ring-brand-secondary/20">
                  <AlertOctagon className="size-5.5 text-brand-secondary" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white/95">Kebakaran atau Ledakan Hebat</p>
                  <p className="mt-1 text-xs font-medium leading-relaxed text-white/55">
                    Tidak bisa dipadamkan menggunakan APAR konvensional biasa.
                  </p>
                </div>
              </motion.div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};