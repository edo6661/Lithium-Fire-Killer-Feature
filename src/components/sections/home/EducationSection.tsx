import { HOME_CONTENT } from "../../../content/home";
import { CheckCircle2 } from "lucide-react";

const { education } = HOME_CONTENT;

const BatteryDiagram = () => (
  <svg
    viewBox="0 0 280 160"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-full max-w-[300px]"
  >
    <rect x="10" y="30" width="240" height="100" rx="14" fill="#002B96" fillOpacity="0.05" stroke="#002B96" strokeOpacity="0.15" strokeWidth="1.5" />
    <rect x="250" y="58" width="16" height="44" rx="5" fill="#002B96" fillOpacity="0.12" stroke="#002B96" strokeOpacity="0.15" strokeWidth="1" />
    {[0, 1, 2].map((i) => (
      <rect
        key={i}
        x={30 + i * 68}
        y="46"
        width="52"
        height="68"
        rx="9"
        fill={i === 1 ? "#FF7300" : "#0047AD"}
        fillOpacity={i === 1 ? 0.15 : 0.10}
        stroke={i === 1 ? "#FF7300" : "#0047AD"}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    ))}
    <path d="M84 80 L106 80" stroke="#FF7300" strokeWidth="1.5" strokeOpacity="0.65" markerEnd="url(#arr1)" fill="none" />
    <path d="M154 80 L176 80" stroke="#0D84FC" strokeWidth="1.5" strokeOpacity="0.65" markerEnd="url(#arr2)" fill="none" />
    <defs>
      <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M2 2L8 5L2 8" fill="none" stroke="#FF7300" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
      <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M2 2L8 5L2 8" fill="none" stroke="#0D84FC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    <text x="56" y="126" textAnchor="middle" fill="#0047AD" fillOpacity="0.65" fontSize="9" fontFamily="system-ui" fontWeight="600">Anoda</text>
    <text x="124" y="126" textAnchor="middle" fill="#FF7300" fillOpacity="0.80" fontSize="9" fontFamily="system-ui" fontWeight="600">Elektrolit</text>
    <text x="192" y="126" textAnchor="middle" fill="#0047AD" fillOpacity="0.65" fontSize="9" fontFamily="system-ui" fontWeight="600">Katoda</text>
    <text x="140" y="22" textAnchor="middle" fill="#002B96" fillOpacity="0.45" fontSize="10" fontFamily="system-ui" fontWeight="600">Ion Li⁺</text>
  </svg>
);

const ADVANTAGES = [
  "Energi tinggi dalam kemasan ringkas",
  "Tidak ada memory effect",
  "Umur pakai panjang",
  "Dapat didaur ulang",
];

export const EducationSection = () => {
  return (
    <section
      className="bg-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="education-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">

          {/* Left: text */}
          <article>
            <span className="inline-block rounded-full bg-brand-dark-blue/8 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-dark-blue">
              Edukasi
            </span>
            <h2
              id="education-heading"
              className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl leading-[1.12]"
            >
              {education.heading}
            </h2>
            <div className="mt-6 space-y-4">
              {education.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-base leading-relaxed text-brand-navy/70 sm:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Advantages list */}
            <ul className="mt-8 space-y-3">
              {ADVANTAGES.map((adv) => (
                <li key={adv} className="flex items-center gap-3">
                  <CheckCircle2 className="size-5 shrink-0 text-brand-accent" strokeWidth={2} aria-hidden />
                  <span className="text-sm font-semibold text-brand-navy/80 sm:text-base">{adv}</span>
                </li>
              ))}
            </ul>
          </article>

          {/* Right: diagram card */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-brand-navy/8 bg-gradient-to-br from-[#f0f4ff] to-white p-10 shadow-[0_8px_32px_rgba(0,43,150,0.06)]">
            <BatteryDiagram />
            <p className="mt-5 text-center text-xs font-medium text-brand-navy/35">
              Ilustrasi skematik baterai lithium-ion
            </p>

            {/* Mini stat strip */}
            <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-brand-navy/8 pt-6">
              {[
                { value: "Li-ion", desc: "Teknologi baterai" },
                { value: "∞ Siklus", desc: "Tanpa memory effect" },
              ].map((item) => (
                <div key={item.value} className="text-center">
                  <p className="text-sm font-extrabold text-brand-navy">{item.value}</p>
                  <p className="mt-0.5 text-[11px] font-medium text-brand-navy/45">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};