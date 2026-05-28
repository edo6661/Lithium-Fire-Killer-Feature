import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../../../content/about";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { history } = ABOUT_CONTENT;

export const AboutHistorySection = () => {
  return (
    <section
      className="bg-gradient-to-b from-[#f0f4ff]/60 to-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="about-history-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-navy/8 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-navy">
            Sejarah & Visi
          </span>
          <h2
            id="about-history-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl leading-[1.12]"
          >
            {history.headline}
          </h2>
        </AnimateIn>

        {/* Key figures */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:gap-5">
          {history.keyFigures.map((figure, i) => (
            <AnimateIn key={figure.name} direction="up" delay={i * 0.12} className="flex-1">
              <motion.div
                whileHover={{ y: -4 }}
                className="flex h-full items-center gap-4 rounded-2xl border border-brand-navy/8 bg-white px-6 py-5 shadow-[0_4px_20px_rgba(0,43,150,0.05)] transition-colors hover:border-brand-primary/20"
              >
                <div className={`flex size-12 shrink-0 items-center justify-center rounded-full text-white text-sm font-extrabold shadow-md ${i === 0 ? "bg-gradient-to-br from-brand-primary to-brand-secondary shadow-brand-primary/25" : "bg-gradient-to-br from-brand-dark-blue to-brand-navy shadow-brand-navy/25"}`}>
                  {figure.name.split(" ").slice(-1)[0]?.[0] ?? "?"}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-brand-navy">{figure.name}</p>
                  <p className="mt-0.5 text-xs font-bold text-brand-primary">{figure.role}</p>
                </div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative space-y-0">
            {/* Animated Vertical Line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200" aria-hidden>
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full bg-gradient-to-b from-brand-primary via-brand-dark-blue/50 to-transparent origin-top"
              />
            </div>

            <StaggerChildren staggerDelay={0.25}>
              {history.blocks
                .filter((b) => b.paragraphs.length > 0 || b.subheading)
                .map((block, idx) => (
                  <StaggerItem key={block.subheading}>
                    <div className="relative flex gap-8 pb-10 last:pb-0 group">
                      {/* Timeline Dot */}
                      <div className="relative z-10 mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-slate-200 bg-white text-xs font-extrabold text-slate-400 transition-all duration-500 group-hover:border-brand-primary group-hover:text-brand-primary group-hover:shadow-[0_4px_12px_rgba(255,115,0,0.2)]">
                        {idx + 1}
                      </div>

                      {/* Content */}
                      <article className="flex-1 pt-1">
                        <h3 className="text-base font-extrabold italic text-brand-navy sm:text-lg">{block.subheading}</h3>
                        {block.paragraphs.length > 0 && (
                          <div className="mt-3 space-y-3">
                            {block.paragraphs.map((paragraph) => (
                              <p key={paragraph.slice(0, 48)} className="text-sm leading-relaxed text-brand-navy/65 sm:text-base">
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        )}
                      </article>
                    </div>
                  </StaggerItem>
                ))}
            </StaggerChildren>
          </div>
        </div>
      </div>
    </section>
  );
};