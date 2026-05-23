import { Flame, Zap, Thermometer } from "lucide-react";
import { HOME_CONTENT } from "../../../content/home";

const { thermalRunaway } = HOME_CONTENT;

const WARNING_POINTS = [
  { Icon: Zap, label: "Korsleting internal", color: "text-brand-primary" },
  { Icon: Thermometer, label: "Suhu berlebih", color: "text-brand-secondary" },
  { Icon: Flame, label: "Thermal runaway", color: "text-brand-secondary" },
];

export const ThermalRunawaySection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-[#1a0800] via-[#2d0f00] to-brand-navy py-16 sm:py-20 lg:py-24"
      aria-labelledby="thermal-runaway-heading"
    >
      {/* Glow effects */}
      <div className="pointer-events-none absolute -left-20 top-0 size-80 rounded-full bg-brand-secondary/25 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-brand-primary/20 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left text */}
          <article>
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-secondary/40 bg-brand-secondary/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-secondary">
              <Flame className="size-3" aria-hidden />
              Bahaya Kritis
            </div>
            <h2
              id="thermal-runaway-heading"
              className="mt-5 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
            >
              {thermalRunaway.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {thermalRunaway.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-white/75 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Right: visual chain */}
          <div className="flex flex-col gap-3">
            {WARNING_POINTS.map(({ Icon, label, color }, idx) => (
              <div key={label}>
                <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/6 px-6 py-5">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                    <Icon className={`size-5 ${color}`} strokeWidth={1.75} />
                  </div>
                  <p className="font-semibold text-white">{label}</p>
                </div>
                {idx < WARNING_POINTS.length - 1 && (
                  <div className="ml-[1.625rem] h-3 w-px bg-white/20" aria-hidden />
                )}
              </div>
            ))}
            {/* Final explosion card */}
            <div className="mt-1 rounded-2xl border border-brand-secondary/50 bg-brand-secondary/20 px-6 py-5">
              <p className="text-sm font-semibold text-brand-secondary sm:text-base">
                ⚠ Kebakaran atau ledakan — tidak bisa dipadamkan dengan APAR konvensional
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};