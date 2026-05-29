import { motion } from "framer-motion";
import { LFK_X_ARKIV_CONTENT } from "../../../content";

const { hero } = LFK_X_ARKIV_CONTENT;

export const ArkivHeroSection = () => {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#0b1120] text-white">
      {/* Dark background placeholder (simulating the drawing canvas) */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1120]/50 to-[#eaeff5]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-[5rem] leading-[1.05]"
          style={{ textShadow: "0 4px 24px rgba(0,0,0,0.5)" }}
        >
          {hero.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg font-medium text-white/80 sm:text-xl"
        >
          {hero.subheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="mt-10"
        >
          <button className="rounded-full bg-white/20 backdrop-blur-md border border-white/40 px-8 py-3.5 text-sm font-extrabold tracking-widest text-white shadow-xl transition-all hover:bg-white hover:text-[#0b1120] hover:scale-105">
            {hero.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
};