import { LITHIUM_FIRE_SAFETY_CONTENT } from "../../../content/lithium-fire-safety";

const { epc } = LITHIUM_FIRE_SAFETY_CONTENT;

const STEP_COLORS = [
  "from-brand-primary to-brand-secondary",
  "from-brand-dark-blue to-brand-navy",
  "from-brand-accent to-brand-dark-blue",
  "from-brand-navy to-[#001a7a]",
];

export const EpcMethodSection = () => {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="epc-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_480px] lg:items-start lg:gap-16">

          {/* Left: text */}
          <article>
            <span className="inline-block rounded-full bg-brand-dark-blue/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-dark-blue">
              Metodologi
            </span>
            <h2
              id="epc-heading"
              className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl lg:text-4xl"
            >
              {epc.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-navy/70 sm:text-lg">
              {epc.description}
            </p>

            {/* EPC expanded */}
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                { letter: "E", word: "Engineering", color: "bg-brand-primary/10 text-brand-primary border-brand-primary/20" },
                { letter: "P", word: "Procurement", color: "bg-brand-dark-blue/10 text-brand-dark-blue border-brand-dark-blue/20" },
                { letter: "C", word: "Construction", color: "bg-brand-accent/10 text-brand-accent border-brand-accent/20" },
              ].map(({ letter, word, color }) => (
                <div key={letter} className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 ${color}`}>
                  <span className="text-lg font-bold">{letter}</span>
                  <span className="text-sm font-medium opacity-75">{word}</span>
                </div>
              ))}
            </div>
          </article>

          {/* Right: steps */}
          <div>
            <p className="mb-6 text-sm font-semibold uppercase tracking-widest text-brand-navy/45">
              {epc.stepsHeading}
            </p>
            <ol className="space-y-4" aria-label="Tahapan EPC">
              {epc.steps.map((step, idx) => (
                <li key={step} className="flex items-start gap-4">
                  {/* Number */}
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white shadow-sm ${STEP_COLORS[idx] ?? STEP_COLORS[0]}`}
                  >
                    {idx + 1}
                  </div>
                  {/* Content */}
                  <div className="flex flex-1 items-center rounded-xl border border-brand-navy/8 bg-[#f8fafc] px-5 py-4 min-h-[56px]">
                    <p className="text-sm font-medium text-brand-navy sm:text-base">{step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};