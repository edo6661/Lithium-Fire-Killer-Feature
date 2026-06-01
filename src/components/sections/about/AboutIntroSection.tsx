import { ShieldCheck, Award, Users } from "lucide-react";
import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../../../content/about";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { intro } = ABOUT_CONTENT;

const HIGHLIGHTS = [
  { Icon: ShieldCheck, label: "Disributor APAR Lithium Pertama #1 Di Dunia" },
  { Icon: Award, label: "Dipercaya Agensi Pemerintahan & Sektor Bisnis Besar Ternama" },
  { Icon: Users, label: "Berkomitmen untuk Edukasi & Sosialisasi soal keselamatan" },
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

        <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
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
                  className="text-justify text-base leading-relaxed text-foreground-muted sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.article>

          <StaggerChildren
            className="flex flex-col gap-3.5 lg:sticky lg:top-24"
            staggerDelay={0.15}
          >
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
              <div className="rounded-2xl border border-accent/20 bg-accent/5 px-6 py-5 ring-1 ring-accent/10 transition-colors duration-300 hover:bg-accent/10">
                <div className="mb-3 text-2xl font-serif leading-none text-accent/40">"</div>
                <p className="text-sm italic leading-relaxed text-foreground-muted sm:text-base">
                  APAR pertama di dunia yang terbukti efektif memadamkan api baterai lithium-ion tanpa meninggalkan residu kimia berbahaya.
                </p>
              </div>
            </StaggerItem>
          </StaggerChildren>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mt-14 rounded-2xl border border-white/10 bg-surface/40 p-6 ring-1 ring-white/5 backdrop-blur-md sm:p-7 lg:mt-16"
          aria-labelledby="about-core-values-heading"
        >
          <p
            id="about-core-values-heading"
            className="text-xs font-bold uppercase tracking-widest text-accent"
          >
            {intro.coreValues.title}
          </p>
          <p
            className="mt-2 font-extrabold tracking-[0.35em] text-white sm:text-lg"
            aria-label={intro.coreValues.acronym}
          >
            {intro.coreValues.acronym}
          </p>
          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {intro.coreValues.items.map(({ letter, label }) => (
              <li
                key={letter}
                className="flex items-center gap-3 rounded-xl border border-white/5 bg-background/40 px-4 py-3"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/15 text-sm font-extrabold text-accent ring-1 ring-accent/25"
                  aria-hidden
                >
                  {letter}
                </span>
                <span className="text-sm font-semibold text-white/90 sm:text-base">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};