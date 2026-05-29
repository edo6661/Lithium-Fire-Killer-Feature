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
      className="relative overflow-hidden bg-background py-20 text-white border-y border-white/5 sm:py-24 lg:py-8"
      aria-labelledby="about-intro-heading"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.08, 0.05] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-24 -top-24 size-[480px] rounded-full bg-accent blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-sm"
        >
          PT. Famindo Alfa Spektrum Teknologi
        </motion.div>

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <h1
              id="about-intro-heading"
              className="text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
            >
              Tentang Kami
            </h1>
            <div className="mt-8 space-y-5">
              {intro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-foreground-muted sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>

          <StaggerChildren className="flex flex-col gap-3.5" staggerDelay={0.15}>
            <StaggerItem>
              <figure className="mb-2 overflow-hidden rounded-3xl border border-white/10 bg-surface/50 shadow-2xl">
                <img
                  src="/about-us-people-from-lfk.avif"
                  alt="Tim LFK Hartindo"
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </figure>
            </StaggerItem>

            {HIGHLIGHTS.map(({ Icon, label }) => (
              <StaggerItem key={label}>
                <div className="group flex items-center gap-4 rounded-2xl border border-white/5 bg-surface/40 px-6 py-5 ring-1 ring-white/5 backdrop-blur-md transition-all duration-300 hover:border-accent/30 hover:bg-surface/60 hover:shadow-lg">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6" strokeWidth={1.75} />
                  </div>
                  <p className="text-sm font-bold text-white/90 sm:text-base">{label}</p>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem>
              <div className="mt-1 rounded-2xl border border-accent/20 bg-accent/5 px-6 py-5 ring-1 ring-accent/10 transition-colors duration-300 hover:bg-accent/10">
                <div className="mb-3 text-2xl font-serif leading-none text-accent/40">"</div>
                <p className="text-sm italic leading-relaxed text-foreground-muted sm:text-base">
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