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
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#003bbf] to-brand-navy py-16 text-white sm:py-20 lg:py-28"
      aria-labelledby="about-intro-heading"
    >
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-brand-primary/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 left-0 size-72 rounded-full bg-brand-accent/15 blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Label */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          <span className="size-1.5 rounded-full bg-brand-primary" aria-hidden />
          PT. Famindo Alfa Spektrum Teknologi
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <article>
            <h1
              id="about-intro-heading"
              className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
            >
              {intro.heading}
            </h1>
            <div className="mt-8 space-y-5">
              {intro.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-white/80 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Right: highlight cards */}
          <div className="grid gap-4 sm:grid-cols-1">
            {HIGHLIGHTS.map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 px-6 py-5 backdrop-blur-sm"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/20 text-brand-primary">
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                <p className="text-sm font-semibold text-white/90 sm:text-base">{label}</p>
              </div>
            ))}

            {/* Quote card */}
            <div className="rounded-2xl border border-brand-primary/30 bg-brand-primary/10 px-6 py-5">
              <p className="text-sm italic leading-relaxed text-white/75 sm:text-base">
                "APAR pertama di dunia yang terbukti efektif memadamkan api baterai lithium-ion tanpa meninggalkan residu kimia berbahaya."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};