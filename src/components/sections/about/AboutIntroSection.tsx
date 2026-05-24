import { ShieldCheck, Award, Users } from "lucide-react";
import { ABOUT_CONTENT } from "../../../content/about";

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
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-24 -top-24 size-[480px] rounded-full bg-brand-primary/12 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 left-0 size-80 rounded-full bg-brand-accent/10 blur-[80px]" aria-hidden />
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
        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary">
          <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden />
          PT. Famindo Alfa Spektrum Teknologi
        </div>

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left: Text */}
          <article>
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
          </article>

          {/* Right: Highlight cards */}
          <div className="flex flex-col gap-3.5">
            {HIGHLIGHTS.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/5 px-6 py-5 ring-1 ring-white/5 backdrop-blur-sm transition-all duration-200 hover:border-white/15 hover:bg-white/8"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary ring-1 ring-brand-primary/20">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-bold text-white/90 sm:text-base">{label}</p>
              </div>
            ))}

            {/* Quote card */}
            <div className="mt-1 rounded-2xl border border-brand-primary/20 bg-brand-primary/8 px-6 py-5 ring-1 ring-brand-primary/10">
              <div className="mb-3 text-2xl font-serif text-brand-primary/40 leading-none">"</div>
              <p className="text-sm italic leading-relaxed text-white/70 sm:text-base">
                APAR pertama di dunia yang terbukti efektif memadamkan api baterai lithium-ion tanpa meninggalkan residu kimia berbahaya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};