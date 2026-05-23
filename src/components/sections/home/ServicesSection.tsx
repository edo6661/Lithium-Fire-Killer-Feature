import { Building2, Car, HardHat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HOME_CONTENT } from "../../../content/home";

const SERVICE_ICONS: LucideIcon[] = [Car, Building2, HardHat];
const SERVICE_COLORS = [
  {
    badge: "bg-brand-primary/10 text-brand-primary",
    icon: "bg-brand-primary/10 text-brand-primary",
    accent: "bg-brand-primary",
  },
  {
    badge: "bg-brand-accent/10 text-brand-accent",
    icon: "bg-brand-accent/10 text-brand-accent",
    accent: "bg-brand-accent",
  },
  {
    badge: "bg-brand-dark-blue/10 text-brand-dark-blue",
    icon: "bg-brand-dark-blue/10 text-brand-dark-blue",
    accent: "bg-brand-dark-blue",
  },
];

const { services } = HOME_CONTENT;

export const ServicesSection = () => {
  return (
    <section
      className="relative bg-gradient-to-b from-[#f0f4ff] to-white py-16 sm:py-20 lg:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-block rounded-full bg-brand-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-primary">
            Solusi Kami
          </span>
          <h2
            id="services-heading"
            className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl lg:text-4xl"
          >
            {services.heading}
          </h2>
        </div>

        <ul className="mt-12 grid list-none gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.items.map((service, index) => {
            const Icon = SERVICE_ICONS[index] ?? Car;
            const colors = SERVICE_COLORS[index]!;
            return (
              <li key={service.title}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-navy/8 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-navy/8">
                  {/* Accent bar top */}
                  <div className={`absolute inset-x-0 top-0 h-1 ${colors.accent} rounded-t-2xl`} aria-hidden />
                  {/* Number */}
                  <span className={`mb-5 inline-flex size-8 items-center justify-center rounded-full text-xs font-bold ${colors.badge}`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {/* Icon */}
                  <div
                    className={`mb-5 inline-flex size-14 items-center justify-center rounded-xl ${colors.icon} transition-transform duration-300 group-hover:scale-110`}
                    aria-hidden
                  >
                    <Icon className="size-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy sm:text-xl">{service.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-navy/70 sm:text-base">
                    {service.description}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};