import { HOME_CONTENT } from "../../../content/home";

const { regulation } = HOME_CONTENT;

export const RegulationSection = () => {
  return (
    <section
      className="bg-brand-navy py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="regulation-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Regulasi Indonesia
          </span>
          <h2
            id="regulation-heading"
            className="mt-4 text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
          >
            {regulation.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/65 sm:text-base">
            {regulation.description}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {regulation.rows.map((row, idx) => (
            <article
              key={row.id}
              className="relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-colors hover:bg-white/8"
            >
              {/* Number badge */}
              <span className="mb-4 inline-flex size-8 items-center justify-center rounded-full bg-brand-primary/20 text-xs font-bold text-brand-primary">
                {String(idx + 1).padStart(2, "0")}
              </span>
              {/* Regulation code */}
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">
                {row.regulation}
              </p>
              {/* Full name */}
              <h3 className="mt-2 text-sm font-bold leading-snug text-white sm:text-base">
                {row.fullName}
              </h3>
              {/* Description */}
              <p className="mt-4 flex-1 text-xs leading-relaxed text-white/60 sm:text-sm">
                {row.description}
              </p>
              {/* Accent line */}
              <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand-primary to-transparent" aria-hidden />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};