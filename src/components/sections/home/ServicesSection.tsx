import { Building2, Car, HardHat, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { HOME_CONTENT } from "../../../content/home";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const SERVICE_ICONS: LucideIcon[] = [Car, Building2, HardHat];

// Warna per kartu — subtle variety dalam satu palet
const SERVICE_COLORS = [
  {
    icon: "bg-accent/10 text-accent ring-accent/20",
    glow: "group-hover:shadow-[0_8px_40px_rgba(56,152,212,0.18)]",
    topBar: "from-accent/60 to-blue-400/60",
    num: "text-accent/40",
  },
  {
    icon: "bg-blue-400/10 text-blue-300 ring-blue-400/20",
    glow: "group-hover:shadow-[0_8px_40px_rgba(96,165,250,0.15)]",
    topBar: "from-blue-400/60 to-cyan-400/60",
    num: "text-blue-300/40",
  },
  {
    icon: "bg-cyan-500/10 text-cyan-300 ring-cyan-500/20",
    glow: "group-hover:shadow-[0_8px_40px_rgba(34,211,238,0.13)]",
    topBar: "from-cyan-400/60 to-accent/60",
    num: "text-cyan-300/40",
  },
];

const { services } = HOME_CONTENT;

export const ServicesSection = () => {
  return (
    <section
      className="relative bg-background py-20 sm:py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Solusi Kami
          </span>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            {services.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-foreground-muted sm:text-lg">
            Solusi proteksi kebakaran lithium yang komprehensif untuk setiap kebutuhan industri Anda.
          </p>
        </AnimateIn>

        <StaggerChildren staggerDelay={0.1} className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Car;
            const colors = SERVICE_COLORS[index] ?? SERVICE_COLORS[0];

            return (
              <StaggerItem key={service.title}>
                <motion.article
                  whileHover={{ y: -10, scale: 1.015 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 280, damping: 20 }}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/8 bg-surface/40 shadow-xl backdrop-blur-md transition-colors duration-300 hover:border-white/15 hover:bg-surface/70 ${colors.glow}`}
                >
                  {/* Top accent bar — animates in on hover */}
                  <div
                    className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-0 transition-opacity duration-400 group-hover:opacity-100 ${colors.topBar}`}
                    aria-hidden
                  />

                  {/* Background gradient radial on hover */}
                  <div
                    className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,152,212,0.06)_0%,transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                  />

                  <div className="relative flex h-full flex-col p-8">
                    {/* Index number — large watermark style */}
                    <span
                      className={`absolute right-6 top-5 select-none font-extrabold text-[4rem] leading-none tracking-tight pointer-events-none transition-all duration-300 group-hover:opacity-100 opacity-[0.06] ${colors.num}`}
                      aria-hidden
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* Icon */}
                    <div
                      className={`relative mb-6 inline-flex size-14 items-center justify-center rounded-xl ring-1 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(56,152,212,0.3)] ${colors.icon}`}
                      aria-hidden
                    >
                      <Icon className="size-7" strokeWidth={1.75} />
                    </div>

                    {/* Title */}
                    <h3 className="relative text-lg font-extrabold tracking-tight text-white transition-colors duration-200 group-hover:text-accent sm:text-xl">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="relative mt-3 flex-1 text-sm leading-relaxed text-foreground-muted sm:text-base">
                      {service.description}
                    </p>

                    {/* Footer link hint */}
                    <div className="relative mt-6 flex items-center gap-1.5 text-xs font-bold tracking-wide text-white/25 transition-all duration-300 group-hover:text-accent/70">
                      <span>Pelajari lebih lanjut</span>
                      <ArrowUpRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                    </div>
                  </div>
                </motion.article>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
};