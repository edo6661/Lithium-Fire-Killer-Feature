import { AlertTriangle, Zap, Flame, ShieldX } from "lucide-react";
import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { ButtonLink } from "../../ui/ButtonLink";
import { AnimateIn } from "../../ui/AnimateIn";

const { problem } = HOME_CONTENT;

const DANGER_TAGS = [
  { Icon: Zap, label: "Thermal Runaway", color: "bg-amber-500/10 text-amber-500 ring-amber-500/20" },
  { Icon: Flame, label: "Kelas Api Baru", color: "bg-brand-secondary/10 text-brand-secondary ring-brand-secondary/20" },
  { Icon: ShieldX, label: "Risiko Ledakan", color: "bg-brand-primary/10 text-brand-primary ring-brand-primary/20" },
];

export const ProblemSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="problem-heading"
    >
      <div
        className="pointer-events-none absolute -right-20 top-0 h-full w-[45%] rounded-l-[80px] bg-gradient-to-br from-slate-50 to-[#f0f4ff]/60 max-lg:hidden"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-28">

          {/* Graphic */}
          <AnimateIn direction="left" className="flex items-center justify-center lg:order-last">
            <div className="relative flex size-64 items-center justify-center sm:size-72 lg:size-80">
              <div className="absolute size-full rounded-full border border-brand-secondary/10" aria-hidden />
              <div className="absolute size-[82%] rounded-full border border-brand-secondary/15" aria-hidden />
              <div className="absolute size-[62%] rounded-full border border-brand-secondary/20" aria-hidden />
              <div
                className="absolute size-full rounded-full bg-brand-secondary/5 animate-ping"
                style={{ animationDuration: "5s" }}
                aria-hidden
              />
              <motion.div
                className="relative flex size-28 flex-col items-center justify-center gap-1 rounded-full bg-gradient-to-br from-brand-secondary via-[#d42500] to-brand-primary text-white shadow-[0_12px_40px_rgba(237,45,0,0.30)] ring-4 ring-brand-secondary/15"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle className="size-11 stroke-[1.5]" />
              </motion.div>

              {DANGER_TAGS.map(({ Icon, label, color }, i) => {
                const positions = [
                  "absolute -top-2 right-4",
                  "absolute bottom-8 -left-8",
                  "absolute -bottom-2 right-4",
                ];
                return (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`${positions[i]} inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold tracking-wide ring-1 shadow-lg ${color} bg-white`}
                  >
                    <Icon className="size-3.5" aria-hidden />
                    {label}
                  </motion.div>
                );
              })}
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn direction="right">
            <div className="space-y-6">
              <span className="inline-block rounded-full bg-brand-secondary/8 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-secondary">
                Kesadaran & Edukasi
              </span>
              <h2
                id="problem-heading"
                className="text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl xl:text-5xl leading-[1.12]"
              >
                {problem.headline}
              </h2>
              <p className="text-base leading-relaxed text-brand-navy/70 sm:text-lg">
                {problem.description}
              </p>
              <div className="pt-2">
                <ButtonLink
                  to={problem.cta.href}
                  variant="secondary"
                  className="w-full sm:w-auto px-8 py-3.5 text-sm shadow-lg shadow-brand-navy/10"
                >
                  {problem.cta.label}
                </ButtonLink>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};