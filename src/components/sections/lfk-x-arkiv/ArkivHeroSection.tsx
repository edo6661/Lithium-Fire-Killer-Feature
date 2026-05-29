import { motion } from "framer-motion";
import { LFK_X_ARKIV_CONTENT } from "../../../content";
import { Sparkles } from "lucide-react";

const { hero } = LFK_X_ARKIV_CONTENT;

export const ArkivHeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Effects - Clean Light Theme */}
      <div className="absolute inset-0 z-0">
        {/* Spotlight effect lembut dari atas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.9)_0%,transparent_80%)]" />
      </div>
      {/* Efek tekstur kertas/noise yang sangat tipis */}
      <div className="bg-noise absolute inset-0 opacity-[0.04] mix-blend-multiply" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/60 px-5 py-2 text-xs font-bold uppercase tracking-widest text-slate-800 backdrop-blur-md shadow-sm"
        >
          <Sparkles className="size-4 text-slate-900" />
          Exclusive Collaboration
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-5xl font-black tracking-tighter sm:text-7xl lg:text-[6.5rem] leading-[1.05]"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500">
            WHERE MASTERPIECE
          </span>
          <br />
          <span className="text-slate-900">
            MEETS PROTECTION.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto mt-8 max-w-2xl text-lg font-bold leading-relaxed text-slate-600 sm:text-xl"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-12"
        >
          {/* Tombol di-invert menjadi gelap agar kontras dengan background terang */}
          <button className="group relative overflow-hidden rounded-full border border-slate-900 bg-slate-900 px-10 py-4 text-sm font-extrabold tracking-widest text-white shadow-xl transition-all hover:scale-105 hover:bg-white hover:text-slate-900 hover:shadow-2xl">
            <span className="relative z-10">{hero.cta}</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};