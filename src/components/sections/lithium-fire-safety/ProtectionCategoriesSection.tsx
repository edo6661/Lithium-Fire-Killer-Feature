import { useId, useState, type KeyboardEvent } from "react";
import { Building2, Car, ChevronDown, HardHat, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { EpcMethodBlock } from "./EpcMethodSection";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "ev-safety": Car,
  "business-safety": Building2,
  "mining-safety": HardHat,
};

const CATEGORY_COLORS: Record<string, any> = {
  "ev-safety": {
    icon: "bg-accent/10 text-accent ring-accent/20",
    tabActive: "bg-accent text-white shadow-[0_4px_16px_rgba(56,152,212,0.35)] border-accent",
    tabInactive: "bg-surface/50 border-white/8 text-foreground-muted hover:bg-surface hover:text-white hover:border-white/15",
    panelAccent: "from-accent/10",
  },
  "business-safety": {
    icon: "bg-accent/10 text-accent ring-accent/20",
    tabActive: "bg-accent text-white shadow-[0_4px_16px_rgba(56,152,212,0.35)] border-accent",
    tabInactive: "bg-surface/50 border-white/8 text-foreground-muted hover:bg-surface hover:text-white hover:border-white/15",
    panelAccent: "from-accent/10",
  },
  "mining-safety": {
    icon: "bg-accent/10 text-accent ring-accent/20",
    tabActive: "bg-accent text-white shadow-[0_4px_16px_rgba(56,152,212,0.35)] border-accent",
    tabInactive: "bg-surface/50 border-white/8 text-foreground-muted hover:bg-surface hover:text-white hover:border-white/15",
    panelAccent: "from-accent/10",
  },
};

const getSectorImage = (sector: string) => {
  const map: Record<string, string> = {
    "EV Charging Station": "/protection/business-safety/ev-charging-station.avif",
    "Battery Storage & Manufacturer": "/protection/business-safety/battery-storage-and-manufacturer.avif",
    "Manufacturer": "/protection/business-safety/manufacturer.avif",
    "Data Center": "/protection/business-safety/data-center.avif",
    "Logistics": "/protection/business-safety/logistics.avif",
    "Energy Powerplant": "/protection/business-safety/energy-powerplant.avif",
    "Research Laboratory": "/protection/business-safety/research-laboratory.avif",
    "Telecommunication": "/protection/business-safety/telecommunication.avif",
  };
  return map[sector];
};

const CategoryPanel = ({ category }: { category: any }) => {
  const Icon = CATEGORY_ICONS[category.id] || Car;
  const colors = CATEGORY_COLORS[category.id] || CATEGORY_COLORS["ev-safety"];

  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/50 backdrop-blur-md p-7 shadow-2xl sm:p-8 lg:p-10">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${colors.panelAccent} to-transparent opacity-60`}
        aria-hidden
      />

      <div className="relative">
        <div className="flex items-start gap-4 border-b border-white/8 pb-6">
          <div className={`inline-flex size-13 shrink-0 items-center justify-center rounded-xl ring-1 ${colors.icon}`} aria-hidden>
            <Icon className="size-6 stroke-[1.75]" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              {category.title}
            </h3>
            {category.byline && (
              <p className="mt-1 text-xs font-bold uppercase tracking-wider text-accent/80">
                {category.byline}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {category.paragraphs.map((paragraph: string, i: number) => (
            <p key={i} className="text-base leading-relaxed text-foreground-muted sm:text-lg">
              {paragraph}
            </p>
          ))}
        </div>

        {category.id === "ev-safety" && category.evGrowthChart && (
          <figure className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-background/60 shadow-sm">
            <p className="border-b border-white/8 px-5 py-4 text-sm font-extrabold tracking-tight text-white sm:px-6 sm:text-base">
              {category.evGrowthChart.heading}
            </p>
            <div className="p-4 sm:p-5">
              <img
                src="/protection/ev/chart-ev.png"
                alt="Grafik EV"
                loading="lazy"
                className="w-full rounded-xl bg-white"
              />
            </div>
            <figcaption className="border-t border-white/8 px-5 py-4 text-xs leading-relaxed text-foreground-muted sm:px-6 sm:text-sm">
              {category.evGrowthChart.sourcePrefix}{" "}
              <a
                href="https://investortrust.id/esg/24936/belasan-juta-kendaraan-listrik-ditargetkan-beroperasi-pada-2030-ternyata-ini-perhitungannya"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-white hover:decoration-white/50"
              >
                {category.evGrowthChart.sourceLabel}
              </a>
            </figcaption>
          </figure>
        )}

        {category.id === "ev-safety" && (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
            {["/protection/ev/1.avif", "/protection/ev/2.avif"].map((src, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="overflow-hidden rounded-2xl border border-white/10 shadow-sm bg-background/50"
              >
                <img
                  src={src}
                  alt={`EV Safety ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </motion.div>
            ))}
          </div>
        )}

        {category.id === "business-safety" && category.subheading && (
          <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/5 p-6">
            <h4 className="text-base font-extrabold tracking-tight text-white sm:text-lg">
              {category.subheading}
            </h4>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted sm:text-base">
              {category.subheadingParagraph}
            </p>
          </div>
        )}

        {category.id === "mining-safety" && category.epc && (
          <EpcMethodBlock epc={category.epc} />
        )}

        {category.id === "business-safety" && category.sectors && (
          <div className="mt-8">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-widest text-accent/80">
              {category.sectorsLabel}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {category.sectors.map((sector: string, i: number) => {
                const imgSrc = getSectorImage(sector);
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 320, damping: 22 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/8 bg-background/50 shadow-sm hover:border-accent/35 transition-colors duration-300"
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-background">
                      {imgSrc ? (
                        <img
                          src={imgSrc}
                          alt={sector}
                          loading="lazy"
                          className="size-full object-cover opacity-75 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-background/50">
                          <CheckCircle2 className="size-6 text-accent/30" />
                        </div>
                      )}
                    </div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 via-background/60 to-transparent p-4 pt-12">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-accent shrink-0" aria-hidden />
                        <span className="text-sm font-bold text-white drop-shadow-sm">{sector}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};

export const ProtectionCategoriesSection = () => {
  const { t } = useTranslation("lithium-fire-safety");
  const categories = t("protection.categories", { returnObjects: true }) as any[];

  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = categories.length - 1;
    let nextIndex: number | null = null;
    switch (e.key) {
      case "ArrowRight": nextIndex = index === lastIndex ? 0 : index + 1; break;
      case "ArrowLeft": nextIndex = index === 0 ? lastIndex : index - 1; break;
      case "Home": nextIndex = 0; break;
      case "End": nextIndex = lastIndex; break;
      default: return;
    }
    e.preventDefault();
    setActiveIndex(nextIndex);
  };

  const activeCategory = categories[activeIndex];

  return (
    <section className="relative overflow-hidden bg-background py-20 text-white border-y border-white/5 sm:py-24 lg:py-8" aria-labelledby="protection-heading">
      <div className="pointer-events-none absolute -left-20 bottom-0 size-96 rounded-full bg-accent/5 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-0 size-80 rounded-full bg-blue-900/8 blur-[80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="max-w-3xl"
        >
          <span className="inline-block rounded-full border border-accent/25 bg-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {t("protection.badge")}
          </span>
          <h1 id="protection-heading" className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
            {t("protection.heading")}
          </h1>
        </motion.div>

        {/* Desktop tabs */}
        <div className="mt-12 hidden md:block">
          <div role="tablist" aria-label="Kategori proteksi keamanan" aria-orientation="horizontal" className="flex flex-wrap gap-2.5 border-b border-white/8 pb-4">
            {categories.map((category, index) => {
              const isActive = activeIndex === index;
              const colors = CATEGORY_COLORS[category.id] || CATEGORY_COLORS["ev-safety"];
              const Icon = CATEGORY_ICONS[category.id] || Car;

              return (
                <motion.button
                  key={index}
                  type="button"
                  role="tab"
                  id={`${baseId}-tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${category.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  whileHover={!isActive ? { y: -2 } : {}}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold tracking-wide border transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${isActive ? colors.tabActive : colors.tabInactive}`}
                >
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  {category.tabLabel}
                </motion.button>
              );
            })}
          </div>

          {/* Tab panel */}
          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeIndex}
                  role="tabpanel"
                  id={`${baseId}-panel-${activeCategory.id}`}
                  aria-labelledby={`${baseId}-tab-${activeCategory.id}`}
                  initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  tabIndex={0}
                  className="focus-visible:outline-none"
                >
                  <CategoryPanel category={activeCategory} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="mt-10 space-y-3 md:hidden">
          {categories.map((category, index) => {
            const isOpen = openAccordion === index;
            const triggerId = `${baseId}-accordion-${category.id}`;
            const panelId = `${baseId}-accordion-panel-${category.id}`;
            const Icon = CATEGORY_ICONS[category.id] || Car;

            return (
              <div key={index} className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${isOpen ? "border-accent/35 bg-surface" : "border-white/8 bg-surface/50"}`}>
                <h2 className="text-base font-bold">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenAccordion(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4.5 shrink-0 text-foreground-muted" strokeWidth={1.75} aria-hidden />
                      <span className="tracking-wide">
                        {category.title}
                        {category.byline && (
                          <span className="mt-0.5 block text-xs font-bold uppercase tracking-wider text-accent/80">
                            {category.byline.replace("oleh ", "").replace("by ", "")}
                          </span>
                        )}
                      </span>
                    </span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown className={`size-4.5 shrink-0 transition-colors duration-200 ${isOpen ? "text-accent" : "text-foreground-muted"}`} aria-hidden />
                    </motion.div>
                  </button>
                </h2>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-white/8 px-2 pb-2 pt-2 sm:px-3 sm:pb-3">
                        <CategoryPanel category={category} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};