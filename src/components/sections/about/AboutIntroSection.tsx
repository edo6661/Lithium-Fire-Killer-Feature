import { ShieldCheck, Award, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../../../content/about";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { intro } = ABOUT_CONTENT;

const HIGHLIGHTS = [
  { Icon: ShieldCheck, label: "APAR Lithium #1 di Indonesia" },
  { Icon: Award, label: "Formula Hartindo AF31 — Tanpa Residu" },
  { Icon: Users, label: "Edukasi & Sosialisasi Nasional" },
];

export const AboutIntroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#002fa8] to-[#001f7a] py-20 text-white sm:py-24 lg:py-32"
      aria-labelledby="about-intro-heading"
    >
      {/* Ambient Animated Decorations */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.12, 0.16, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-24 size-[480px] rounded-full bg-brand-primary blur-[80px]"
        aria-hidden
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute -bottom-24 left-0 size-80 rounded-full bg-brand-accent blur-[80px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary backdrop-blur-sm"
        >
          <span className="size-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden />
          PT. Famindo Alfa Spektrum Teknologi
        </motion.div>

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h1
              id="about-intro-heading"
              className="text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
            >
              {intro.heading}
            </h1>
            <div className="mt-8 space-y-5">
              {intro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-white/70 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>

          {/* Right: Highlight cards (Staggered) */}
          <StaggerChildren className="flex flex-col gap-3.5" staggerDelay={0.15}>
            {HIGHLIGHTS.map(({ Icon, label }) => (
              <StaggerItem key={label}>
                <div className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 px-6 py-5 ring-1 ring-white/5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary ring-1 ring-brand-primary/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-bold text-white/90 sm:text-base">{label}</p>
                </div>
              </StaggerItem>
            ))}

            {/* Quote card */}
            <StaggerItem>
              <div className="mt-1 rounded-2xl border border-brand-primary/20 bg-brand-primary/8 px-6 py-5 ring-1 ring-brand-primary/10 transition-colors duration-300 hover:bg-brand-primary/15">
                <div className="mb-3 text-2xl font-serif text-brand-primary/40 leading-none">"</div>
                <p className="text-sm italic leading-relaxed text-white/70 sm:text-base">
                  APAR pertama di dunia yang terbukti efektif memadamkan api baterai lithium-ion tanpa meninggalkan residu kimia berbahaya.
                </p>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
};