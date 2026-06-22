import { AlertTriangle, Zap, Flame, ShieldX, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "../../ui/ButtonLink";
import { AnimateIn } from "../../ui/AnimateIn";

const DANGER_ICONS = [
  { Icon: Zap, color: "text-amber-400" },
  { Icon: Flame, color: "text-red-400" },
  { Icon: ShieldX, color: "text-accent" },
];

export const ProblemSection = () => {
  const { t } = useTranslation("home");

  const tags = t("problem.tags", { returnObjects: true }) as Array<{ label: string }>;

  return (
    <section className="relative overflow-hidden bg-background py-20 border-y border-white/5 sm:py-24 lg:py-8" aria-labelledby="problem-heading">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-28">

          {/* Graphic */}
          <AnimateIn direction="left" className="flex items-center justify-center lg:order-last">
            <div className="relative flex size-64 items-center justify-center sm:size-72 lg:size-80">
              <div className="absolute size-full rounded-full border border-accent/10" aria-hidden />
              <div className="absolute size-[82%] rounded-full border border-accent/15" aria-hidden />
              <div className="absolute size-[62%] rounded-full border border-accent/20" aria-hidden />

              <motion.div
                className="relative flex size-28 flex-col items-center justify-center gap-1 rounded-full bg-surface border border-accent/20 text-white shadow-[0_0_30px_rgba(56,152,212,0.3)]"
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <AlertTriangle className="size-11 stroke-[1.5] text-accent" />
              </motion.div>

              {tags.map((tag, i) => {
                const { Icon, color } = DANGER_ICONS[i];
                const positions = [
                  "absolute -top-2 right-4",
                  "absolute bottom-8 -left-8",
                  "absolute -bottom-2 right-4",
                ];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.12 }}
                    className={`${positions[i]} inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold tracking-wide border border-white/10 bg-surface/80 backdrop-blur-md text-white shadow-xl`}
                  >
                    <Icon className={`size-3.5 ${color}`} aria-hidden />
                    {tag.label}
                  </motion.div>
                );
              })}
            </div>
          </AnimateIn>

          {/* Content */}
          <AnimateIn direction="right">
            <div className="space-y-6">
              <span className="inline-block rounded-full bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent border border-accent/20">
                {t("problem.badge")}
              </span>
              <h2 id="problem-heading" className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl xl:text-5xl leading-[1.12]">
                {t("problem.headline")}
              </h2>
              <p className="text-base leading-relaxed text-foreground-muted sm:text-lg">
                {t("problem.description")}
              </p>
              <div className="pt-2">
                <ButtonLink
                  to="/lithium-fire-safety"
                  className="group w-full sm:w-auto inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-bold text-white/85 backdrop-blur-sm transition-all duration-300 hover:border-accent/50 hover:bg-accent/10 hover:text-white hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(56,152,212,0.2)] focus-visible:ring-accent"
                >
                  {t("problem.cta")}
                  <ArrowUpRight className="size-4 text-accent/70 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" aria-hidden />
                </ButtonLink>
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};