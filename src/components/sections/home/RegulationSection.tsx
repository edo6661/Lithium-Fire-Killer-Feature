import { HOME_CONTENT } from "../../../content/home";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { regulation } = HOME_CONTENT;

export const RegulationSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#f0f4ff] to-white py-20 text-brand-navy sm:py-24 lg:py-32"
      aria-labelledby="regulation-heading"
    >
      {/* Subtle decorations */}
      <div className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-brand-primary/6 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-brand-accent/6 blur-[80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn direction="up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary">
            Regulasi Indonesia
          </span>
          <h2
            id="regulation-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl leading-tight"
          >
            {regulation.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-navy/55 sm:text-lg">
            {regulation.description}
          </p>
        </AnimateIn>

        {/* Cards */}
        <StaggerChildren
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          staggerDelay={0.13}
        >
          {regulation.rows.map((row, idx) => (
            <StaggerItem key={row.id}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-navy/8 bg-white p-7 shadow-[0_2px_16px_rgba(0,43,150,0.05)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-brand-primary/20 hover:shadow-[0_20px_48px_rgba(0,43,150,0.10)]">

                {/* Top accent bar */}
                <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-brand-primary to-brand-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />

                {/* Number + short code pill */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-primary/8 text-sm font-extrabold text-brand-primary ring-1 ring-brand-primary/12">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="rounded-full border border-brand-navy/10 bg-slate-50 px-3 py-1 text-[11px] font-extrabold tracking-wide text-brand-navy/50">
                    {row.regulation}
                  </span>
                </div>

                {/* Title only — no full name repeat */}
                <h3 className="text-base font-extrabold leading-snug text-brand-navy transition-colors duration-200 group-hover:text-brand-primary sm:text-lg">
                  {row.fullName}
                </h3>

                {/* Divider */}
                <div className="my-4 h-px bg-slate-100" />

                {/* Description — truncated visually */}
                <p className="flex-1 text-sm leading-relaxed text-brand-navy/60">
                  {row.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
};