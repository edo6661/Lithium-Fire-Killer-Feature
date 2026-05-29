import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { regulation } = HOME_CONTENT;

export const RegulationSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-8"
      aria-labelledby="regulation-heading"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-accent/5 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -left-24 bottom-0 size-80 rounded-full bg-blue-900/8 blur-[80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Regulasi Indonesia
          </span>
          <h2
            id="regulation-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight"
          >
            {regulation.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            {regulation.description}
          </p>
        </AnimateIn>

        <StaggerChildren staggerDelay={0.12} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {regulation.rows.map((row, idx) => (
            <StaggerItem key={row.id}>
              <motion.article
                whileHover={{ y: -8, scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-surface/40 p-7 shadow-xl backdrop-blur-md hover:border-accent/30 hover:bg-surface/70 transition-colors duration-300"
              >
                {/* Top accent bar */}
                <div
                  className="absolute inset-x-0 top-0 h-[2px] rounded-t-3xl bg-gradient-to-r from-accent to-blue-400 opacity-0 transition-opacity duration-400 group-hover:opacity-100"
                  aria-hidden
                />

                {/* Radial glow behind card on hover */}
                <div
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,152,212,0.07)_0%,transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />

                <div className="relative mb-5 flex items-center justify-between">
                  {/* Index badge */}
                  <motion.span
                    className="inline-flex size-9 items-center justify-center rounded-xl bg-accent/10 text-sm font-extrabold text-accent ring-1 ring-accent/20"
                    whileHover={{ rotate: [0, -8, 8, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </motion.span>

                  {/* Regulation badge */}
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-extrabold tracking-wide text-foreground-muted">
                    {row.regulation}
                  </span>
                </div>

                <h3 className="relative text-base font-bold leading-snug text-white transition-colors duration-200 group-hover:text-accent sm:text-lg">
                  {row.fullName}
                </h3>

                <div className="my-4 h-px bg-white/8 transition-colors duration-300 group-hover:bg-accent/20" />

                <p className="relative flex-1 text-sm leading-relaxed text-foreground-muted">
                  {row.description}
                </p>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
};