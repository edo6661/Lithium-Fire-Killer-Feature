import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { ButtonLink } from "../../ui/ButtonLink";
import { ArrowRight } from "lucide-react";

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
    <circle cx="200" cy="200" r="119" fill="none" stroke="#FF7300" strokeWidth="0.75" strokeOpacity="0.15" />
    <path d="M200 52 L318 100 L318 210 Q318 310 200 358 Q82 310 82 210 L82 100 Z" fill="#FF7300" fillOpacity="0.07" stroke="#FF7300" strokeWidth="1.5" strokeOpacity="0.45" />
    <path d="M200 76 L296 116 L296 208 Q296 290 200 332 Q104 290 104 208 L104 116 Z" fill="#FF7300" fillOpacity="0.09" stroke="#FF7300" strokeWidth="1" strokeOpacity="0.30" />
    <path d="M200 100 L274 132 L274 206 Q274 270 200 308 Q126 270 126 206 L126 132 Z" fill="white" fillOpacity="0.03" />
    <path d="M158 202 L186 232 L246 170" stroke="#FF7300" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M158 202 L186 232 L246 170" stroke="white" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.25" />
    <g>
      <rect x="28" y="100" width="112" height="44" rx="13" fill="#002b96" fillOpacity="0.55" stroke="white" strokeWidth="0.5" strokeOpacity="0.12" />
      <circle cx="50" cy="122" r="10" fill="#FF7300" fillOpacity="0.22" />
      <path d="M46 122 L49 125 L54 119" stroke="#FF7300" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <text x="66" y="119" fill="white" fillOpacity="0.95" fontSize="9" fontFamily="system-ui" fontWeight="700">ZERO RESIDUE</text>
      <text x="66" y="131" fill="white" fillOpacity="0.45" fontSize="7.5" fontFamily="system-ui">Tanpa sisa kimia</text>
    </g>
    <g>
      <rect x="260" y="268" width="118" height="44" rx="13" fill="#002b96" fillOpacity="0.55" stroke="white" strokeWidth="0.5" strokeOpacity="0.12" />
      <circle cx="282" cy="290" r="10" fill="#0D84FC" fillOpacity="0.28" />
      <path d="M278 290 L281 287 L286 292" stroke="#0D84FC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <text x="298" y="287" fill="white" fillOpacity="0.95" fontSize="9" fontFamily="system-ui" fontWeight="700">AF31 CERTIFIED</text>
      <text x="298" y="299" fill="white" fillOpacity="0.45" fontSize="7.5" fontFamily="system-ui">Hartindo Formula</text>
    </g>
    <g>
      <rect x="18" y="272" width="106" height="44" rx="13" fill="#002b96" fillOpacity="0.55" stroke="white" strokeWidth="0.5" strokeOpacity="0.12" />
      <circle cx="40" cy="294" r="10" fill="#ED2D00" fillOpacity="0.28" />
      <path d="M37 291 L40 287 L43 291 L40 299 Z" fill="#ED2D00" fillOpacity="0.75" />
      <text x="56" y="291" fill="white" fillOpacity="0.95" fontSize="9" fontFamily="system-ui" fontWeight="700">LITHIUM SAFE</text>
      <text x="56" y="303" fill="white" fillOpacity="0.45" fontSize="7.5" fontFamily="system-ui">Khusus Li-ion</text>
    </g>
    <circle cx="340" cy="128" r="4" fill="#FF7300" fillOpacity="0.4" />
    <circle cx="358" cy="166" r="2.5" fill="white" fillOpacity="0.2" />
    <circle cx="52" cy="340" r="3.5" fill="#0D84FC" fillOpacity="0.35" />
    <circle cx="338" cy="290" r="3" fill="#FF7300" fillOpacity="0.28" />
    <circle cx="72" cy="168" r="2" fill="white" fillOpacity="0.25" />
    <circle cx="312" cy="88" r="2" fill="#0D84FC" fillOpacity="0.3" />
  </svg>
);

const STATS = [
  { value: "#1", label: "APAR Lithium di Indonesia" },
  { value: "AF31", label: "Formula Hartindo" },
  { value: "0 Residu", label: "Kimia Berbahaya" },
];

const easeOut = [0.21, 0.47, 0.32, 0.98] as const;

export const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#0032a8] to-[#001f7a] text-white"
      aria-labelledby="hero-heading"
    >
      <div className="pointer-events-none absolute -right-40 -top-40 size-[560px] rounded-full bg-brand-primary/12 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-48 -left-24 size-[440px] rounded-full bg-brand-accent/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute right-1/4 top-1/3 size-64 rounded-full bg-brand-primary/5 blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36 xl:py-40">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-12 xl:gap-20">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: easeOut }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary backdrop-blur-sm"
            >
              <span className="size-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden />
              Distributor Eksklusif Hartindo AF31
            </motion.div>

            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: easeOut }}
              className="text-4xl font-extrabold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-5xl xl:text-[3.5rem]"
            >
              Spesialis Perlindungan{" "}
              <span className="relative inline-block bg-gradient-to-r from-[#ff8c1a] via-brand-primary to-[#ff5500] bg-clip-text text-transparent">
                Kebakaran Baterai Lithium
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2, ease: easeOut }}
              className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg lg:mx-0"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: easeOut }}
              className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <ButtonLink
                to={hero.cta.href}
                variant="primary"
                className="w-full sm:w-auto px-8 py-3.5 text-sm shadow-[0_8px_28px_rgba(255,115,0,0.30)] hover:shadow-[0_14px_36px_rgba(255,115,0,0.45)]"
              >
                {hero.cta.label}
              </ButtonLink>
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 py-2 text-sm font-bold tracking-wide text-white/70 transition-all duration-200 hover:text-white"
              >
                Hubungi Kami
                <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.45, ease: easeOut }}
              className="mt-14 grid grid-cols-3 gap-4 border-t border-white/[0.08] pt-8"
            >
              {STATS.map((stat, i) => (
                <div key={stat.label} className={`text-center lg:text-left ${i > 0 ? "border-l border-white/[0.08] pl-4 lg:pl-6" : ""}`}>
                  <p className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs font-medium text-white/45 sm:text-sm leading-snug">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Illustration */}
          <motion.div
            className="flex shrink-0 items-center justify-center lg:w-80 xl:w-[400px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: easeOut }}
            aria-hidden
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ShieldIllustration />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};