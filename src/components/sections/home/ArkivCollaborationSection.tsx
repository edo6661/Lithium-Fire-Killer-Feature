import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, ArrowRight, Palette, ShieldCheck, Award } from "lucide-react";
import { ButtonLink } from "../../ui/ButtonLink";
import { AnimateIn } from "../../ui/AnimateIn";

const ARKIV_PRODUCT_IMAGE = "/products/arkiv/depan.avif";


export const ArkivCollaborationSection = () => {
  const { t } = useTranslation("home");

  const features = t("arkivCollab.features", { returnObjects: true }) as Array<{
    title: string;
    desc: string;
  }>;

  const featureIcons = [Palette, ShieldCheck, Award];

  return (
    <section
      className="relative overflow-hidden bg-[#0a0f1d] py-16 sm:py-24 lg:py-24 border-y border-white/10 text-white"
      aria-labelledby="arkiv-collab-heading"
    >
      {/* Background ambient lighting effects */}
      <div
        className="pointer-events-none absolute -left-32 top-1/2 -translate-y-1/2 size-[500px] rounded-full bg-accent/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 size-[450px] rounded-full bg-[#1A80C1]/20 blur-[130px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] border border-white/15 bg-gradient-to-b from-white/[0.08] via-white/[0.04] to-white/[0.02] p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.6)]">
          {/* Subtle glowing banner background decoration */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-gradient-to-br from-accent/20 to-blue-600/10 blur-3xl" aria-hidden />

          <div className="grid items-center gap-20 lg:grid-cols-12 lg:gap-12">
            {/* Left Content Column */}
            <div className="space-y-6 lg:col-span-7">
              <AnimateIn direction="up">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/15 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-accent backdrop-blur-md shadow-[0_0_15px_rgba(56,152,212,0.25)]">
                    <Sparkles className="size-3.5 text-accent animate-pulse" />
                    {t("arkivCollab.badge")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white/90">
                    {t("arkivCollab.badgeTag")}
                  </span>
                </div>
              </AnimateIn>

              <AnimateIn direction="up" delay={0.1}>
                <div className="space-y-2">
                  <h2
                    id="arkiv-collab-heading"
                    className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl"
                  >
                    {t("arkivCollab.headlinePart1")}
                  </h2>

                  <p className="text-xl font-bold leading-snug text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-200 to-sky-300 sm:text-2xl lg:text-3xl">
                    {t("arkivCollab.headlinePart2")}
                  </p>
                </div>
              </AnimateIn>

              <AnimateIn direction="up" delay={0.15}>
                <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
                  {t("arkivCollab.description")}
                </p>
              </AnimateIn>

              {/* Feature Cards Grid */}
              <AnimateIn direction="up" delay={0.2}>
                <div className="grid grid-cols-1 gap-3 border-y border-white/10 py-5 sm:grid-cols-3">
                  {Array.isArray(features) &&
                    features.map((feat, idx) => {
                      const Icon = featureIcons[idx] || Sparkles;
                      return (
                        <div
                          key={idx}
                          className="group flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.04] p-3.5 backdrop-blur-md transition-colors duration-300 hover:border-accent/40 hover:bg-accent/10"
                        >
                          <div className="mb-2 flex size-8 items-center justify-center rounded-lg bg-accent/20 text-accent">
                            <Icon className="size-4" />
                          </div>
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-wide text-white">
                              {feat.title}
                            </p>
                            <p className="mt-1 text-[11px] leading-snug text-slate-400">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </AnimateIn>

              {/* Call to Action Buttons */}
              <AnimateIn direction="up" delay={0.25}>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center">
                  <ButtonLink
                    to="/lfk-x-arkiv"
                    className="group w-full sm:w-auto px-8 py-4 text-sm font-extrabold bg-gradient-to-r from-accent via-blue-500 to-[#1A80C1] text-white rounded-full shadow-[0_0_28px_rgba(56,152,212,0.45)] hover:shadow-[0_0_40px_rgba(56,152,212,0.7)] hover:-translate-y-0.5 transition-all duration-300"
                  >
                    {t("arkivCollab.ctaPrimary")}
                    <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </ButtonLink>

                  <ButtonLink
                    to="/lfk-x-arkiv"
                    variant="outline"
                    className="group w-full sm:w-auto px-6 py-4 text-sm font-bold border-white/20 hover:border-white/40 hover:bg-white/10"
                  >
                    <Sparkles className="size-4 text-accent transition-transform duration-200 group-hover:rotate-12" />
                    {t("arkivCollab.ctaSecondary")}
                  </ButtonLink>
                </div>
              </AnimateIn>
            </div>

            {/* Right Graphic / Product Showcase Column */}
            <div className="relative flex items-center justify-center lg:col-span-5">
              <AnimateIn direction="up" delay={0.2}>
                <div className="relative aspect-square w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[420px]">
                  {/* Outer glowing ring circles */}
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center"
                    aria-hidden
                  >
                    <div className="absolute size-full rounded-full border border-dashed border-accent/20 animate-[spin_60s_linear_infinite]" />
                    <div className="absolute size-[85%] rounded-full border border-white/10" />
                    <div className="absolute size-[70%] rounded-full bg-radial from-accent/25 via-blue-900/20 to-transparent blur-2xl" />
                  </div>

                  {/* Floating Product Image */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 flex size-full items-center justify-center"
                  >
                    <img
                      src={ARKIV_PRODUCT_IMAGE}
                      alt="LFK x Arkiv SARU Edition"
                      className="max-h-[720px] w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.65)]"
                    />
                  </motion.div>

                  {/* Floating Badge Overlay 1 - Top Left */}
                  <div className="absolute left-0 top-6 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-950/80 px-3.5 py-2 shadow-2xl backdrop-blur-md sm:-left-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Sparkles className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-white">
                        {t("arkivCollab.saruEdition")}
                      </p>
                      <p className="text-[9px] font-semibold text-accent">
                        {t("arkivCollab.collectorsChoice")}
                      </p>
                    </div>
                  </div>

                  {/* Floating Badge Overlay 2 - Bottom Right */}
                  <div className="absolute right-0 bottom-6 z-20 flex items-center gap-2 rounded-2xl border border-white/20 bg-slate-950/80 px-3.5 py-2 shadow-2xl backdrop-blur-md sm:-right-2">
                    <div className="flex size-7 items-center justify-center rounded-full bg-blue-500/20 text-blue-400">
                      <ShieldCheck className="size-3.5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider text-white">
                        {t("arkivCollab.hartindoFormula")}
                      </p>
                      <p className="text-[9px] font-semibold text-slate-300">
                        {t("arkivCollab.lithiumFireKiller")}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
