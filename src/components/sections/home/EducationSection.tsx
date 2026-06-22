import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const BatteryDiagram = ({ t }: { t: any }) => (
  <svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="w-full max-w-[300px]">
    <defs>
      <marker id="arr1" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M2 2L8 5L2 8" fill="none" stroke="#3898d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
    <rect x="10" y="30" width="240" height="100" rx="14" fill="#0b1120" stroke="#3898d4" strokeOpacity="0.3" strokeWidth="1.5" />
    <rect x="250" y="58" width="16" height="44" rx="5" fill="#0b1120" stroke="#3898d4" strokeOpacity="0.3" strokeWidth="1" />
    {[0, 1, 2].map((i) => (
      <rect key={i} x={30 + i * 68} y="46" width="52" height="68" rx="9" fill={i === 1 ? "#3898d4" : "#112240"} fillOpacity={i === 1 ? 0.15 : 0.4} stroke={i === 1 ? "#3898d4" : "#1e293b"} strokeOpacity="0.5" strokeWidth="1" />
    ))}
    <path d="M84 80 L106 80" stroke="#3898d4" strokeWidth="1.5" strokeOpacity="0.65" markerEnd="url(#arr1)" fill="none" />
    <path d="M154 80 L176 80" stroke="#3898d4" strokeWidth="1.5" strokeOpacity="0.65" markerEnd="url(#arr1)" fill="none" />
    <text x="56" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui" fontWeight="600">{t("education.diagram.anode")}</text>
    <text x="124" y="126" textAnchor="middle" fill="#3898d4" fontSize="9" fontFamily="system-ui" fontWeight="600">{t("education.diagram.electrolyte")}</text>
    <text x="192" y="126" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="system-ui" fontWeight="600">{t("education.diagram.cathode")}</text>
    <text x="140" y="22" textAnchor="middle" fill="#ffffff" fontSize="10" fontFamily="system-ui" fontWeight="600">
      {t("education.diagram.ionFlow")}
      <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2.5s" repeatCount="indefinite" />
    </text>
    {[0, 1, 2].map((i) => (
      <g key={`ion-${i}`}>
        <circle cx="56" cy={60 + i * 20} r="6" fill="#3898d4" fillOpacity="0.85">
          <animateTransform attributeName="transform" type="translate" values="0,0; 136,0; 0,0" dur="4.5s" begin={`${i * 1.1}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
        </circle>
        <text x="56" y={60 + i * 20 + 2.5} textAnchor="middle" fill="white" fontSize="7" fontFamily="system-ui" fontWeight="bold">
          +
          <animateTransform attributeName="transform" type="translate" values="0,0; 136,0; 0,0" dur="4.5s" begin={`${i * 1.1}s`} repeatCount="indefinite" calcMode="spline" keySplines="0.42 0 0.58 1; 0.42 0 0.58 1" />
        </text>
      </g>
    ))}
  </svg>
);

export const EducationSection = () => {
  const { t } = useTranslation("home");
  const paragraphs = t("education.paragraphs", { returnObjects: true }) as string[];
  const advantages = t("education.advantages", { returnObjects: true }) as string[];

  return (
    <section className="bg-surface py-20 border-y border-white/5 sm:py-24 lg:py-8" aria-labelledby="education-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          <AnimateIn direction="right">
            <article>
              <span className="inline-block rounded-full bg-white/5 border border-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-foreground-muted">
                {t("education.badge")}
              </span>
              <h2 id="education-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.12]">
                {t("education.heading")}
              </h2>
              <div className="mt-6 space-y-5 max-w-prose">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-base leading-[1.75] text-white/70 sm:text-[1.05rem] sm:leading-[1.8]">
                    {paragraph}
                  </p>
                ))}
              </div>
              <StaggerChildren staggerDelay={0.12} className="mt-8 space-y-3">
                {advantages.map((adv, index) => (
                  <StaggerItem key={index}>
                    <motion.li whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 400, damping: 25 }} className="flex items-center gap-3 list-none">
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/20 transition-transform duration-200 hover:scale-110">
                        <CheckCircle2 aria-hidden className="size-3.5 text-accent" strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-semibold text-white/80 sm:text-base">{adv}</span>
                    </motion.li>
                  </StaggerItem>
                ))}
              </StaggerChildren>
            </article>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 250, damping: 22 }} className="group relative flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-background/50 p-10 shadow-xl backdrop-blur-md transition-colors duration-300 hover:border-accent/30 hover:bg-surface/70">
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ boxShadow: "0 0 60px rgba(56,152,212,0.08) inset" }} aria-hidden />
              <div className="relative z-10 w-full flex flex-col items-center">
                <BatteryDiagram t={t} />
                <p className="mt-5 text-center text-xs font-medium text-foreground-muted">
                  {t("education.diagram.note")}
                </p>
                <div className="mt-6 grid w-full grid-cols-2 gap-3 border-t border-white/8 pt-6">
                  {[
                    { value: t("education.diagram.stat1Value"), desc: t("education.diagram.stat1Desc") },
                    { value: t("education.diagram.stat2Value"), desc: t("education.diagram.stat2Desc") },
                  ].map((item, index) => (
                    <div key={index} className="rounded-xl border border-white/5 bg-white/[0.02] p-3 text-center transition-all duration-200 hover:border-accent/20 hover:bg-accent/[0.03]">
                      <p className="text-sm font-extrabold text-white">{item.value}</p>
                      <p className="mt-0.5 text-[11px] font-medium text-foreground-muted">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};