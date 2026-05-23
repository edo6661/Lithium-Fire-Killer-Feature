import { AlertTriangle } from "lucide-react";
import { HOME_CONTENT } from "../../../content/home";
import { ButtonLink } from "../../ui/ButtonLink";

const { problem } = HOME_CONTENT;

export const ProblemSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="problem-heading"
    >
      {/* Decorative background shape */}
      <div
        className="pointer-events-none absolute -right-16 top-0 h-full w-1/2 rounded-l-[80px] bg-gradient-to-br from-brand-secondary/5 to-brand-primary/5"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: visual accent */}
          <div className="flex items-center justify-center lg:order-last">
            <div className="relative flex size-64 items-center justify-center lg:size-80">
              {/* Rings */}
              <div className="absolute size-full rounded-full border-2 border-brand-secondary/15 animate-ping" style={{ animationDuration: "3s" }} aria-hidden />
              <div className="absolute size-[80%] rounded-full border-2 border-brand-secondary/20" aria-hidden />
              <div className="absolute size-[60%] rounded-full border-2 border-brand-secondary/25" aria-hidden />
              {/* Center icon */}
              <div className="relative flex size-32 flex-col items-center justify-center rounded-full bg-gradient-to-br from-brand-secondary to-brand-primary text-white shadow-2xl shadow-brand-secondary/30">
                <AlertTriangle className="size-12" strokeWidth={1.5} />
              </div>
              {/* Label badges around */}
              <div className="absolute -top-2 right-8 rounded-xl bg-brand-navy px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                Thermal Runaway
              </div>
              <div className="absolute bottom-4 -left-4 rounded-xl bg-brand-dark-blue px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                Kelas Api Baru
              </div>
              <div className="absolute -bottom-2 right-4 rounded-xl bg-brand-secondary px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                Risiko Ledakan
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div>
            <span className="inline-block rounded-full bg-brand-secondary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-secondary">
              Kesadaran & Edukasi
            </span>
            <h2
              id="problem-heading"
              className="mt-4 text-3xl font-bold text-brand-navy sm:text-4xl lg:text-5xl"
            >
              {problem.headline}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-brand-navy/75 sm:text-lg">
              {problem.description}
            </p>
            <div className="mt-8">
              <ButtonLink
                to={problem.cta.href}
                variant="secondary"
                className="px-7 py-3.5 text-base"
              >
                {problem.cta.label}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};