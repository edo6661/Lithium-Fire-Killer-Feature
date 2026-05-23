import { ABOUT_CONTENT } from "../../../content/about";

const { history } = ABOUT_CONTENT;

export const AboutHistorySection = () => {
  return (
    <section
      className="bg-gradient-to-b from-[#f0f4ff] to-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-history-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-brand-navy/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-navy">
            Sejarah & Visi
          </span>
          <h2
            id="about-history-heading"
            className="mt-4 text-2xl font-bold leading-snug text-brand-navy sm:text-3xl lg:text-4xl"
          >
            {history.headline}
          </h2>
        </div>

        {/* Key figures */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:gap-6">
          {history.keyFigures.map((figure, i) => (
            <div
              key={figure.name}
              className="flex flex-1 items-center gap-4 rounded-2xl border border-brand-navy/10 bg-white px-6 py-5 shadow-sm"
            >
              {/* Avatar */}
              <div
                className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold ${i === 0 ? "bg-gradient-to-br from-brand-primary to-brand-secondary" : "bg-gradient-to-br from-brand-dark-blue to-brand-navy"}`}
              >
                {figure.name.split(" ").slice(-1)[0]?.[0] ?? "?"}
              </div>
              <div>
                <p className="text-sm font-bold text-brand-navy">{figure.name}</p>
                <p className="mt-0.5 text-xs font-medium text-brand-primary">{figure.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline blocks */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-brand-primary via-brand-dark-blue to-transparent" aria-hidden />

            {history.blocks
              .filter((b) => b.paragraphs.length > 0 || b.subheading)
              .map((block, idx) => (
                <div key={block.subheading} className="relative flex gap-8 pb-10 last:pb-0">
                  {/* Dot */}
                  <div className="relative z-10 mt-1 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-brand-primary bg-white text-xs font-bold text-brand-primary shadow-sm">
                    {idx + 1}
                  </div>
                  <article className="flex-1 pt-1">
                    <h3 className="text-base font-bold italic text-brand-navy sm:text-lg">
                      {block.subheading}
                    </h3>
                    {block.paragraphs.length > 0 && (
                      <div className="mt-3 space-y-3">
                        {block.paragraphs.map((paragraph) => (
                          <p
                            key={paragraph.slice(0, 48)}
                            className="text-sm leading-relaxed text-brand-navy/75 sm:text-base"
                          >
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    )}
                  </article>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};