import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";

export const ArkivHeroSection = () => {
  const { t } = useTranslation("lfk-x-arkiv");

  return (
    <section className="relative flex min-h-[100vh] flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-[#1A80C1] via-[#5a9fd4] to-[#eaeff5]">
        <img src="/hero-lfk-x-arkiv.png" alt="" aria-hidden className="hidden h-full w-full object-cover md:block" />
        <img src="/hero-lfk-x-arkiv.png" alt="" aria-hidden className="absolute inset-0 h-full w-full scale-125 object-cover object-[center_20%] opacity-50 blur-lg md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A80C1]/50 via-[#1A80C1]/25 to-[#1A80C1]/55 md:from-black/5 md:via-transparent md:to-black/20" aria-hidden />
      </div>

      <div className="bg-noise pointer-events-none absolute inset-0 z-[1] opacity-[0.04] mix-blend-multiply" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/70 px-5 py-2 text-xs font-bold uppercase tracking-widest text-[#1A80C1] backdrop-blur-md shadow-sm sm:mb-8"
        >
          <Sparkles className="size-4 text-[#FFCFCF]" />
          {t("hero.badge")}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.08, ease: [0.21, 0.47, 0.32, 0.98] }} className="mb-6 flex w-full justify-center sm:mb-8">
          <img src="/logo/arkiv.png" alt="Arkiv x Lithium Fire Killer" width={2001} height={672} decoding="async" className="h-auto w-[min(100%,17.5rem)] drop-shadow-[0_8px_28px_rgba(0,0,0,0.35)] sm:w-[min(100%,24rem)] md:w-[min(100%,28rem)] lg:w-[min(100%,32rem)]" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.16, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl font-black tracking-tighter text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.28),0_1px_3px_rgba(0,0,0,0.2)] sm:text-7xl lg:text-[6.5rem] leading-[1.05]"
        >
          <span>{t("hero.headlinePart1")}</span><br />
          <span>{t("hero.headlinePart2")}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mt-8 max-w-2xl rounded-2xl bg-gradient-to-r from-[#FFCFCF]/50 to-[#1A80C1]/50 px-6 py-4 text-lg font-bold leading-relaxed text-white backdrop-blur-md sm:text-xl border border-white/10 mb-12"
        >
          {t("hero.subheadline")}
        </motion.p>
      </div>
    </section>
  );
};