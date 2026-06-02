import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { ButtonLink } from "../../ui/ButtonLink";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { hero } = HOME_CONTENT;

const LFK_HERO_PRODUCT = "/products/LFK/LFK_3_KG_[Font].avif";

const FeatureBadge = ({
  title,
  subtitle,
  icon,
  className,
}: {
  title: string;
  subtitle: string;
  icon: "check" | "shield";
  className?: string;
}) => (
  <div
    className={`flex items-center gap-2.5 rounded-[13px] border border-white/12 bg-[#0b1120]/80 px-3 py-2.5 shadow-lg backdrop-blur-sm ${className ?? ""}`}
  >
    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/25">
      {icon === "check" ? (
        <Check className="size-2.5 text-accent" strokeWidth={2.5} aria-hidden />
      ) : (
        <ShieldCheck className="size-2.5 text-accent" strokeWidth={2.5} aria-hidden />
      )}
    </div>
    <div className="min-w-0">
      <p className="text-[9px] font-bold uppercase leading-tight text-white/95">{title}</p>
      <p className="text-[7.5px] leading-tight text-white/45">{subtitle}</p>
    </div>
  </div>
);

const HeroProductVisual = () => (
  <div className="relative aspect-[3/4] w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[360px] xl:max-w-[400px]">
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
      <div className="absolute size-[92%] rounded-full border border-dashed border-white/5" />
      <div className="absolute size-[76%] rounded-full border border-dashed border-white/[0.07]" />
      <div className="absolute size-[60%] rounded-full border border-accent/15" />
      <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_center,rgba(56,152,212,0.12)_0%,transparent_70%)]" />
    </div>
    <img
      src={LFK_HERO_PRODUCT}
      alt="Lithium Fire Killer 3 KG — APAR kebakaran baterai lithium"
      className="relative z-10 mx-auto h-full w-full object-contain drop-shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
      width={400}
      height={520}
    />
    <FeatureBadge
      title="ZERO RESIDUE"
      subtitle="Tanpa sisa kimia"
      icon="check"
      className="absolute left-0 top-[22%] z-20 max-w-[140px] sm:max-w-none"
    />
    <FeatureBadge
      title="LAB TESTED & CERTIFIED"
      subtitle="Hartindo Formula"
      icon="shield"
      className="absolute right-0 bottom-[24%] z-20 max-w-[160px] sm:max-w-none"
    />
  </div>
);

const STATS = [
  { value: "#1", label: "APAR Lithium Pertama di Dunia", sublabel: "Terdepan & Terpercaya" },
  { value: "LFK-AF31", label: "Formula Paten Hartindo", sublabel: "Inovasi Eksklusif" },
  { value: "0 Residu", label: "Kimia Berbahaya", sublabel: "Aman untuk Lingkungan" },
];

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background text-white" aria-labelledby="hero-heading">
      <div className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-accent/5 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-48 -left-24 size-[440px] rounded-full bg-blue-900/10 blur-[100px]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36 xl:py-40">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-12 xl:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent backdrop-blur-sm"
            >
              <ShieldCheck className="size-4" />
              HARTINDO AF31 Lithium Fire Killer
            </motion.div>
            <motion.h1
              id="hero-heading"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-5xl xl:text-[3.5rem]"
            >
              {"Spesialis Perlindungan".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
              <br />
              <motion.span
                variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } }}
                className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-400 inline-block"
              >
                Kebakaran Baterai Lithium
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-foreground-muted sm:text-lg lg:mx-0"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
              className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
            >
              {/* PRIMARY CTA — solid accent, glow, pill shape */}
              <ButtonLink
                to={hero.cta.href}
                className="group w-full sm:w-auto px-8 py-3.5 text-sm font-bold bg-accent text-white rounded-full shadow-[0_0_24px_rgba(56,152,212,0.45)] hover:shadow-[0_0_40px_rgba(56,152,212,0.65)] hover:-translate-y-0.5 hover:bg-[#2d85bf] transition-all duration-300 ease-out"
              >
                {hero.cta.label}
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </ButtonLink>

              {/* SECONDARY — ghost pill dengan animated underline */}
              <a
                href="/contact"
                className="group relative inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold tracking-wide text-white/70 transition-all duration-300 hover:text-white"
              >
                <span className="relative">
                  Hubungi Kami
                  <span className="absolute inset-x-0 -bottom-0.5 h-px bg-gradient-to-r from-accent to-blue-400 scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" aria-hidden />
                </span>
                <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1 text-accent" />
              </a>
            </motion.div>

            {/* STATS — redesigned dengan card glassmorphism per item */}
            <StaggerChildren staggerDelay={0.12} className="mt-14 grid grid-cols-3 gap-3 border-t border-white/10 pt-8">
              {STATS.map((stat, i) => (
                <StaggerItem key={stat.label}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`relative group rounded-2xl border border-white/8 bg-white/[0.03] p-4 text-center lg:text-left backdrop-blur-sm transition-colors duration-300 hover:border-accent/25 hover:bg-accent/[0.04] ${i > 0 ? "lg:pl-5" : ""}`}
                  >
                    {/* Nomor ranking dengan shine */}
                    <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl leading-none">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 group-hover:from-accent group-hover:to-blue-300 transition-all duration-300">
                        {stat.value}
                      </span>
                    </p>
                    <p className="mt-1.5 text-xs font-bold leading-snug text-white/60 sm:text-[0.8rem]">{stat.label}</p>
                    <p className="mt-0.5 text-[10px] font-medium text-accent/60 tracking-wide hidden sm:block">{stat.sublabel}</p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>

          <motion.div
            className="flex shrink-0 items-center justify-center lg:w-80 xl:w-[400px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: easeOut }}
          >
            <motion.div
              animate={{ y: [0, -12, 0], rotate: [0, 0.6, -0.6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <HeroProductVisual />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};