import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "../../../content/about";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { history } = ABOUT_CONTENT;

export const AboutHistorySection = () => {
  return (
    <section
      className="bg-surface border-y border-white/5 py-20 sm:py-24 lg:py-8"
      aria-labelledby="about-history-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-white/5 border border-white/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-foreground-muted">
            Sejarah & Visi
          </span>
          <h2
            id="about-history-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-[1.12]"
          >
            {history.headline}
          </h2>
        </AnimateIn>

        {/* Key figures */}
        <div className="mx-auto mt-10 flex max-w-2xl flex-col gap-4 sm:flex-row sm:gap-5">
          {history.keyFigures.map((figure, i) => (
            <AnimateIn key={figure.name} direction="up" delay={i * 0.1} className="flex-1">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="flex h-full items-center gap-4 rounded-3xl border border-white/10 bg-background/50 backdrop-blur-md px-6 py-5 shadow-xl transition-colors duration-300 hover:border-accent/35 hover:bg-background/70"
              >
                <div
                  className={`flex size-12 shrink-0 items-center justify-center rounded-full text-sm font-extrabold shadow-md transition-transform duration-300 hover:scale-110 ${i === 0
                    ? "bg-accent/20 border border-accent/30 text-accent"
                    : "bg-white/8 border border-white/15 text-white"
                    }`}
                >
                  {figure.name.split(" ").slice(-1)[0]?.[0] ?? "?"}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white">{figure.name}</p>
                  <p className="mt-0.5 text-xs font-bold text-accent">{figure.role}</p>
                </div>
              </motion.div>
            </AnimateIn>
          ))}
        </div>

        {/* Timeline */}
        <div className="mx-auto mt-16 max-w-3xl">
          <div className="relative space-y-0">
            {/* Animated vertical line */}
            <div className="absolute left-5 top-2 bottom-2 w-px bg-white/8" aria-hidden>
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="w-full bg-gradient-to-b from-accent via-accent/40 to-transparent origin-top h-full"
              />
            </div>

            <StaggerChildren staggerDelay={0.22}>
              {history.blocks
                .filter((b) => b.paragraphs.length > 0 || b.subheading)
                .map((block, idx) => (
                  <StaggerItem key={block.subheading}>
                    <div className="relative flex gap-8 pb-10 last:pb-0 group">
                      {/* Step circle */}
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        className="relative z-10 mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-white/10 bg-background text-xs font-extrabold text-foreground-muted transition-all duration-300 group-hover:border-accent group-hover:text-accent group-hover:shadow-[0_0_16px_rgba(56,152,212,0.35)]"
                      >
                        {idx + 1}
                      </motion.div>

                      <article className="flex-1 pt-1">
                        <h3 className="text-base font-extrabold italic text-white sm:text-lg">
                          {block.subheading}
                        </h3>
                        {block.paragraphs.length > 0 && (
                          <div className="mt-3 space-y-3">
                            {block.paragraphs.map((paragraph) => (
                              <p
                                key={paragraph.slice(0, 48)}
                                className="text-sm leading-relaxed text-foreground-muted sm:text-base"
                              >
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