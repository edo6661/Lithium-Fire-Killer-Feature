import { HOME_CONTENT } from "../../../content/home";
import { ButtonLink } from "../../ui/ButtonLink";

const { hero } = HOME_CONTENT;

const ShieldIllustration = () => (
  <svg
    viewBox="0 0 400 420"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-full max-w-[320px] lg:max-w-[380px]"
  >
    {/* Outer glow rings */}
    <circle cx="200" cy="200" r="180" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.06" strokeDasharray="6 10" />
    <circle cx="200" cy="200" r="148" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.08" strokeDasharray="4 8" />
    <circle cx="200" cy="200" r="116" fill="none" stroke="#FF7300" strokeWidth="0.75" strokeOpacity="0.18" />

    {/* Shield body */}
    <path
      d="M200 52 L318 100 L318 210 Q318 310 200 358 Q82 310 82 210 L82 100 Z"
      fill="#FF7300"
      fillOpacity="0.08"
      stroke="#FF7300"
      strokeWidth="1.5"
      strokeOpacity="0.5"
    />
    {/* Shield inner */}
    <path
      d="M200 76 L296 116 L296 208 Q296 290 200 332 Q104 290 104 208 L104 116 Z"
      fill="#FF7300"
      fillOpacity="0.10"
      stroke="#FF7300"
      strokeWidth="1"
      strokeOpacity="0.35"
    />
    {/* Shield fill core */}
    <path
      d="M200 100 L274 132 L274 206 Q274 270 200 308 Q126 270 126 206 L126 132 Z"
      fill="white"
      fillOpacity="0.04"
    />

    {/* Check mark */}
    <path
      d="M158 202 L186 232 L246 170"
      stroke="#FF7300"
      strokeWidth="10"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M158 202 L186 232 L246 170"
      stroke="white"
      strokeWidth="4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity="0.3"
    />

    {/* Floating badge — top left */}
    <rect x="28" y="100" width="110" height="42" rx="10" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
    <circle cx="50" cy="121" r="10" fill="#FF7300" fillOpacity="0.25" />
    <path d="M46 121 L49 124 L54 118" stroke="#FF7300" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <text x="66" y="118" fill="white" fillOpacity="0.9" fontSize="9" fontFamily="system-ui" fontWeight="700">ZERO RESIDUE</text>
    <text x="66" y="130" fill="white" fillOpacity="0.5" fontSize="8" fontFamily="system-ui">Tanpa sisa kimia</text>

    {/* Floating badge — bottom right */}
    <rect x="262" y="268" width="116" height="42" rx="10" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
    <circle cx="284" cy="289" r="10" fill="#0D84FC" fillOpacity="0.3" />
    <path d="M280 289 L283 286 L288 291 L280 289" stroke="#0D84FC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <text x="300" y="286" fill="white" fillOpacity="0.9" fontSize="9" fontFamily="system-ui" fontWeight="700">AF31 CERTIFIED</text>
    <text x="300" y="298" fill="white" fillOpacity="0.5" fontSize="8" fontFamily="system-ui">Hartindo Formula</text>

    {/* Floating badge — bottom left */}
    <rect x="18" y="272" width="104" height="42" rx="10" fill="white" fillOpacity="0.08" stroke="white" strokeWidth="0.5" strokeOpacity="0.2" />
    <circle cx="40" cy="293" r="10" fill="#ED2D00" fillOpacity="0.3" />
    <path d="M37 290 L40 286 L43 290 L40 298 Z" fill="#ED2D00" fillOpacity="0.8" />
    <text x="56" y="290" fill="white" fillOpacity="0.9" fontSize="9" fontFamily="system-ui" fontWeight="700">LITHIUM SAFE</text>
    <text x="56" y="302" fill="white" fillOpacity="0.5" fontSize="8" fontFamily="system-ui">Khusus Li-ion</text>

    {/* Decorative particles */}
    <circle cx="340" cy="130" r="4" fill="#FF7300" fillOpacity="0.45" />
    <circle cx="358" cy="168" r="2.5" fill="white" fillOpacity="0.25" />
    <circle cx="52" cy="340" r="3.5" fill="#0D84FC" fillOpacity="0.4" />
    <circle cx="338" cy="290" r="3" fill="#FF7300" fillOpacity="0.3" />
    <circle cx="72" cy="168" r="2" fill="white" fillOpacity="0.3" />
  </svg>
);

const STATS = [
  { value: "#1", label: "APAR Lithium di Indonesia" },
  { value: "AF31", label: "Formula Hartindo" },
  { value: "0 Residu", label: "Kimia Berbahaya" },
];

export const HeroSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#003bbf] to-brand-navy text-white"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute -right-32 -top-32 size-[500px] rounded-full bg-brand-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 -left-20 size-[400px] rounded-full bg-brand-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-primary">
              <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden />
              Distributor Eksklusif Hartindo AF31
            </div>

            <h1
              id="hero-heading"
              className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl"
            >
              Spesialis Perlindungan{" "}
              <span className="text-brand-primary">
                Kebakaran Baterai Lithium
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg lg:mx-0">
              {hero.description}
            </p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <ButtonLink
                to={hero.cta.href}
                variant="primary"
                className="px-7 py-3.5 text-base shadow-lg shadow-brand-primary/30"
              >
                {hero.cta.label}
              </ButtonLink>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition-colors hover:text-white"
              >
                Hubungi Kami <span aria-hidden>→</span>
              </a>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-3 border-t border-white/10 pt-8 sm:gap-6">
              {STATS.map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <p className="text-xl font-bold text-white sm:text-2xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/50 sm:text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Shield illustration */}
          <div
            className="flex shrink-0 items-center justify-center lg:w-80 xl:w-96"
            aria-hidden
          >
            <ShieldIllustration />
          </div>
        </div>
      </div>
    </section >
  );
};                              