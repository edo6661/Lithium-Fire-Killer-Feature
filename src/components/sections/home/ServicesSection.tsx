import { Building2, Car, HardHat, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HOME_CONTENT } from "../../../content/home";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const SERVICE_ICONS: LucideIcon[] = [Car, Building2, HardHat];
const SERVICE_CONFIG = [
  {
    badge: "bg-brand-primary/10 text-brand-primary",
    icon: "bg-brand-primary/10 text-brand-primary ring-brand-primary/10",
    accent: "from-brand-primary to-[#ff9133]",
    glow: "group-hover:shadow-[0_20px_48px_rgba(255,115,0,0.10)]",
  },
  {
    badge: "bg-brand-accent/10 text-brand-accent",
    icon: "bg-brand-accent/10 text-brand-accent ring-brand-accent/10",
    accent: "from-brand-accent to-brand-dark-blue",
    glow: "group-hover:shadow-[0_20px_48px_rgba(13,132,252,0.10)]",
  },
  {
    badge: "bg-brand-dark-blue/10 text-brand-dark-blue",
    icon: "bg-brand-dark-blue/10 text-brand-dark-blue ring-brand-dark-blue/10",
    accent: "from-brand-dark-blue to-brand-navy",
    glow: "group-hover:shadow-[0_20px_48px_rgba(0,43,150,0.10)]",
  },
];

const { services } = HOME_CONTENT;

export const ServicesSection = () => {
  return (
    <section
      className="relative bg-gradient-to-b from-[#f0f4ff] via-[#f5f7ff] to-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary">
            Solusi Kami
          </span>
          <h2
            id="services-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
          >
            {services.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-navy/60 sm:text-lg">
            Solusi proteksi kebakaran lithium yang komprehensif untuk setiap kebutuhan industri Anda.
          </p>
        </AnimateIn>

        <StaggerChildren className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" staggerDelay={0.12}>
          {services.items.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Car;
            const config = SERVICE_CONFIG[index]!;
            return (
              <StaggerItem key={service.title}>
                <article className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_2px_16px_rgba(0,43,150,0.04)] transition-all duration-300 ease-out hover:-translate-y-2 hover:border-slate-200 ${config.glow}`}>
                  <div className={`absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r ${config.accent}`} aria-hidden />
                  <span className={`mb-6 inline-flex size-8 items-center justify-center rounded-full text-xs font-extrabold ${config.badge}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={`mb-5 inline-flex size-14 items-center justify-center rounded-xl ring-1 ${config.icon} transition-all duration-300 group-hover:scale-110`} aria-hidden>
                    <Icon className="size-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight text-brand-navy sm:text-xl">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy/65 sm:text-base">{service.description}</p>
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-brand-navy/30 transition-all duration-200 group-hover:text-brand-primary">
                    Pelajari lebih lanjut
                    <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerChildren>
      </div>
    </section>
  );
};