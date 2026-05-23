import { HOME_CONTENT } from "../../../content/home";

const { education } = HOME_CONTENT;

// Mock SVG illustration: battery diagram
const BatteryDiagram = () => (
  <svg
    viewBox="0 0 280 160"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-full max-w-[280px]"
  >
    {/* Battery shell */}
    <rect x="10" y="30" width="240" height="100" rx="12" fill="#002B96" fillOpacity="0.06" stroke="#002B96" strokeOpacity="0.2" strokeWidth="1.5" />
    {/* Terminal */}
    <rect x="250" y="58" width="16" height="44" rx="4" fill="#002B96" fillOpacity="0.15" />
    {/* Cells */}
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={30 + i * 68}
        y="46"
        width="50"
        height="68"
        rx="8"
        fill={i === 1 ? "#FF7300" : "#0047AD"}
        fillOpacity={i === 1 ? 0.2 : 0.12}
        stroke={i === 1 ? "#FF7300" : "#0047AD"}
        strokeOpacity="0.4"
        strokeWidth="1"
      />
    ))}
    {/* Ion arrows */}
    <path d="M82 80 L104 80" stroke="#FF7300" strokeWidth="1.5" strokeOpacity="0.7" markerEnd="url(#arr-ed)" fill="none" />
    <path d="M152 80 L174 80" stroke="#0D84FC" strokeWidth="1.5" strokeOpacity="0.7" markerEnd="url(#arr-ed2)" fill="none" />
    <defs>
      <marker id="arr-ed" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M2 2L8 5L2 8" fill="none" stroke="#FF7300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
      <marker id="arr-ed2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M2 2L8 5L2 8" fill="none" stroke="#0D84FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    {/* Labels */}
    <text x="55" y="125" textAnchor="middle" fill="#0047AD" fillOpacity="0.7" fontSize="9" fontFamily="system-ui" fontWeight="600">Anoda</text>
    <text x="123" y="125" textAnchor="middle" fill="#FF7300" fillOpacity="0.85" fontSize="9" fontFamily="system-ui" fontWeight="600">Elektrolit</text>
    <text x="191" y="125" textAnchor="middle" fill="#0047AD" fillOpacity="0.7" fontSize="9" fontFamily="system-ui" fontWeight="600">Katoda</text>
    <text x="140" y="22" textAnchor="middle" fill="#002B96" fillOpacity="0.5" fontSize="10" fontFamily="system-ui" fontWeight="600">Ion Li⁺</text>
  </svg>
);

const ADVANTAGES = [
  { label: "Energi tinggi dalam kemasan ringkas" },
  { label: "Tidak ada memory effect" },
  { label: "Umur pakai panjang" },
  { label: "Dapat didaur ulang" },
];

export const EducationSection = () => {
  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left: text */}
          <article>
            <span className="inline-block rounded-full bg-brand-dark-blue/8 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-dark-blue">
              Edukasi
            </span>
            <h2
              id="education-heading"
              className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl lg:text-4xl"
            >
              {education.heading}
            </h2>
            <div className="mt-6 space-y-5">
              {education.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-brand-navy/75 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Right: visual + advantages */}
          <div className="flex flex-col gap-6">
            {/* Diagram card */}
            <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-navy/10 bg-gradient-to-br from-[#f0f4ff] to-white p-8">
              <BatteryDiagram />
              <p className="mt-4 text-xs text-brand-navy/40 text-center">
                Ilustrasi skematik baterai lithium-ion
              </p>
            </div>

            {/* Advantages */}
            <div className="grid grid-cols-2 gap-3">
              {ADVANTAGES.map((adv) => (
                <div
                  key={adv.label}
                  className="flex items-start gap-2.5 rounded-xl border border-brand-accent/15 bg-brand-accent/5 px-4 py-3"
                >
                  <span className="mt-0.5 size-4 shrink-0 rounded-full bg-brand-accent/20 text-center text-[10px] leading-4 text-brand-accent font-bold">✓</span>
                  <p className="text-xs font-medium text-brand-navy/80 sm:text-sm">{adv.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};