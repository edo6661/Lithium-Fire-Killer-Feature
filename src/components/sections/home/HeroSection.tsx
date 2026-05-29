import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { ButtonLink } from "../../ui/ButtonLink";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { hero } = HOME_CONTENT;

const ShieldIllustration = () => (
  <svg
    viewBox="0 0 400 420"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-full max-w-[300px] drop-shadow-2xl lg:max-w-[360px] xl:max-w-[400px]"
  >
    <circle cx="200" cy="200" r="185" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.05" strokeDasharray="6 12" />
    <circle cx="200" cy="200" r="152" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.07" strokeDasharray="4 9" />
    <circle cx="200" cy="200" r="119" fill="none" stroke="#3898d4" strokeWidth="0.75" strokeOpacity="0.15" />
    <path d="M200 52 L318 100 L318 210 Q318 310 200 358 Q82 310 82 210 L82 100 Z" fill="#3898d4" fillOpacity="0.07" stroke="#3898d4" strokeWidth="1.5" strokeOpacity="0.45" />
    <path d="M200 76 L296 116 L296 208 Q296 290 200 332 Q104 290 104 208 L104 116 Z" fill="#3898d4" fillOpacity="0.09" stroke="#3898d4" strokeWidth="1" strokeOpacity="0.30" />
    <path d="M200 100 L274 132 L274 206 Q274 270 200 308 Q126 270 126 206 L126 132 Z" fill="white" fillOpacity="0.03" />
    <path d="M158 202 L186 232 L246 170" stroke="#3898d4" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M158 202 L186 232 L246 170" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" />
    <g>
      <rect x="28" y="100" width="112" height="44" rx="13" fill="#0b1120" fillOpacity="0.8" stroke="white" strokeWidth="0.5" strokeOpacity="0.12" />
      <circle cx="50" cy="122" r="10" fill="#3898d4" fillOpacity="0.22" />
      <path d="M46 122 L49 125 L54 119" stroke="#3898d4" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="66" y="119" fill="white" fillOpacity="0.95" fontSize="9" fontFamily="system-ui" fontWeight="700">ZERO RESIDUE</text>
      <text x="66" y="131" fill="white" fillOpacity="0.45" fontSize="7.5" fontFamily="system-ui">Tanpa sisa kimia</text>
    </g>
    <g>
      <rect x="260" y="268" width="118" height="44" rx="13" fill="#0b1120" fillOpacity="0.8" stroke="white" strokeWidth="0.5" strokeOpacity="0.12" />
      <circle cx="282" cy="290" r="10" fill="#3898d4" fillOpacity="0.28" />
      <path d="M278 290 L281 287 L286 292" stroke="#3898d4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <text x="298" y="287" fill="white" fillOpacity="0.95" fontSize="9" fontFamily="system-ui" fontWeight="700">AF31 CERTIFIED</text>
      <text x="298" y="299" fill="white" fillOpacity="0.45" fontSize="7.5" fontFamily="system-ui">Hartindo Formula</text>
    </g>
  </svg>
);

const STATS = [
  { value: "#1", label: "APAR Lithium di Indonesia", sublabel: "Terdepan & Terpercaya" },
  { value: "AF31", label: "Formula Hartindo", sublabel: "Inovasi Eksklusif" },
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
              Distributor Eksklusif Hartindo AF31
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
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
              <ShieldIllustration />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};