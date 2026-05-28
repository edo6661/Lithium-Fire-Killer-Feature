import { HOME_CONTENT } from "../../../content/home";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { education } = HOME_CONTENT;

const BatteryDiagram = () => (
  <svg
    viewBox="0 0 280 160"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="w-full max-w-[300px]"
  >
    {/* Frame Baterai */}
    <rect x="10" y="30" width="240" height="100" rx="14" fill="#002B96" fillOpacity="0.05" stroke="#002B96" strokeOpacity="0.15" strokeWidth="1.5" />
    <rect x="250" y="58" width="16" height="44" rx="5" fill="#002B96" fillOpacity="0.12" stroke="#002B96" strokeOpacity="0.15" strokeWidth="1" />

    {/* Kolom Anoda, Elektrolit, Katoda */}
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

    {/* Garis Penunjuk Statis */}
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

    {/* Label Teks */}
    <text x="56" y="126" textAnchor="middle" fill="#0047AD" fillOpacity="0.65" fontSize="9" fontFamily="system-ui" fontWeight="600">Anoda</text>
    <text x="124" y="126" textAnchor="middle" fill="#FF7300" fillOpacity="0.80" fontSize="9" fontFamily="system-ui" fontWeight="600">Elektrolit</text>
    <text x="192" y="126" textAnchor="middle" fill="#0047AD" fillOpacity="0.65" fontSize="9" fontFamily="system-ui" fontWeight="600">Katoda</text>

    <motion.text
      animate={{ opacity: [0.3, 0.8, 0.3] }}
      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      x="140" y="22" textAnchor="middle" fill="#002B96" fontSize="10" fontFamily="system-ui" fontWeight="600"
    >
      Perpindahan Ion Li⁺
    </motion.text>

    {/* Animasi Partikel Ion Li+ */}
    {[0, 1, 2].map((i) => (
      <motion.g
        key={`ion-${i}`}
        animate={{ x: [0, 136, 0] }}
        transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity, delay: i * 1.1 }}
      >
        <circle cx="56" cy={60 + i * 20} r="6" fill="#0D84FC" fillOpacity="0.85" />
        <text x="56" y={60 + i * 20 + 2.5} textAnchor="middle" fill="white" fontSize="7" fontFamily="system-ui" fontWeight="bold">+</text>
      </motion.g>
    ))}
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
          <AnimateIn direction="right">
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

              {/* Advantages list (Staggered) */}
              <StaggerChildren staggerDelay={0.15} className="mt-8 space-y-3">
                {ADVANTAGES.map((adv) => (
                  <StaggerItem key={adv}>
                    <li className="flex items-center gap-3">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-accent/10">
                        <CheckCircle2 className="size-4 text-brand-accent" strokeWidth={2.5} aria-hidden />
                      </div>
                      <span className="text-sm font-semibold text-brand-navy/80 sm:text-base">{adv}</span>
                    </li>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </article>
          </AnimateIn>

          {/* Right: diagram card */}
          <AnimateIn direction="left" delay={0.1}>
            <div className="group flex flex-col items-center justify-center rounded-2xl border border-brand-navy/8 bg-gradient-to-br from-[#f0f4ff] to-white p-10 shadow-[0_8px_32px_rgba(0,43,150,0.06)] transition-all duration-300 hover:shadow-[0_16px_48px_rgba(0,43,150,0.10)] hover:border-brand-navy/15">
              <BatteryDiagram />
              <p className="mt-5 text-center text-xs font-medium text-brand-navy/40">
                Ilustrasi skematik pergerakan ion baterai lithium-ion
              </p>

              {/* Mini stat strip */}
              <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-brand-navy/8 pt-6">
                {[
                  { value: "Li-ion", desc: "Teknologi baterai" },
                  { value: "∞ Siklus", desc: "Tanpa memory effect" },
                ].map((item) => (
                  <div key={item.value} className="text-center transition-transform duration-200 group-hover:scale-105">
                    <p className="text-sm font-extrabold text-brand-navy">{item.value}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-brand-navy/45">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>

        </div>
      </div>
    </section>
  );
};