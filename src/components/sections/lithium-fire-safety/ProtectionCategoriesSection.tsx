import { useId, useState, type KeyboardEvent } from "react";
import { Building2, Car, ChevronDown, HardHat, CheckCircle2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LITHIUM_FIRE_SAFETY_CONTENT } from "../../../content/lithium-fire-safety";

type ProtectionCategory =
  (typeof LITHIUM_FIRE_SAFETY_CONTENT.protection.categories)[number];

const CATEGORY_ICONS: Record<ProtectionCategory["id"], LucideIcon> = {
  "ev-safety": Car,
  "business-safety": Building2,
  "mining-safety": HardHat,
};

const CATEGORY_COLORS: Record<ProtectionCategory["id"], { icon: string; tab: string }> = {
  "ev-safety": {
    icon: "bg-brand-primary/12 text-brand-primary ring-brand-primary/15",
    tab: "bg-brand-primary text-white shadow-md shadow-brand-primary/25",
  },
  "business-safety": {
    icon: "bg-brand-accent/12 text-brand-accent ring-brand-accent/15",
    tab: "bg-brand-primary text-white shadow-md shadow-brand-primary/25",
  },
  "mining-safety": {
    icon: "bg-amber-500/12 text-amber-400 ring-amber-500/15",
    tab: "bg-brand-primary text-white shadow-md shadow-brand-primary/25",
  },
};

const { protection } = LITHIUM_FIRE_SAFETY_CONTENT;
const CATEGORIES = protection.categories;

// Mapping fungsi untuk mencocokkan nama sektor di CONTENT.md dengan letak avif
const getSectorImage = (sector: string) => {
  const map: Record<string, string> = {
    "EV Charging Station": "/protection/business-safety/ev-charging-station.avif",
    "Battery Storage & Manufacturer": "/protection/business-safety/battery-storage-and-manufacturer.avif",
    "Manufacturer": "/protection/business-safety/manufacturer.avif",
    "Data Center": "/protection/business-safety/data-center.avif",
    "Logistics": "/protection/business-safety/logistics.avif",
    "Energy Powerplant": "/protection/business-safety/energy-powerplant.avif",
  };
  return map[sector];
};

const CategoryPanel = ({ category }: { category: ProtectionCategory }) => {
  const Icon = CATEGORY_ICONS[category.id];
  const colors = CATEGORY_COLORS[category.id];

  return (
    <article className="rounded-2xl border border-slate-100 bg-white p-7 shadow-[0_8px_40px_rgba(0,43,150,0.05)] sm:p-8 lg:p-10">
      <div className="flex items-start gap-4 border-b border-slate-100 pb-6">
        <div
          className={`inline-flex size-13 shrink-0 items-center justify-center rounded-xl ring-1 ${colors.icon}`}
          aria-hidden
        >
          <Icon className="size-6 stroke-[1.75]" />
        </div>
        <div>
          <h3 className="text-xl font-extrabold tracking-tight text-brand-navy sm:text-2xl">
            {category.title}
          </h3>
          {"byline" in category && (
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-brand-secondary/80">
              {category.byline}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {category.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="text-base leading-relaxed text-brand-navy/70 sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {/* Render gambar statis apabila kategori adalah EV Safety */}
      {category.id === "ev-safety" && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6">
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <img
              src="/protection/ev/1.avif"
              alt="EV Safety 1"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
            <img
              src="/protection/ev/2.avif"
              alt="EV Safety 2"
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      )}

      {"subheading" in category && (
        <div className="mt-8 rounded-xl border border-brand-accent/12 bg-gradient-to-br from-[#f0f7ff] to-white p-6">
          <h4 className="text-base font-extrabold tracking-tight text-brand-navy sm:text-lg">
            {category.subheading}
          </h4>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/65 sm:text-base">
            {category.subheadingParagraph}
          </p>
        </div>
      )}

      {"sectors" in category && (
        <div className="mt-8">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-widest text-brand-dark-blue/60">
            {category.sectorsLabel}
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {category.sectors.map((sector) => {
              const imgSrc = getSectorImage(sector);
              return (
                <div
                  key={sector}
                  className="group relative overflow-hidden rounded-xl border border-brand-accent/15 bg-white shadow-sm ring-1 ring-brand-accent/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-brand-accent/30"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    {imgSrc ? (
                      <img
                        src={imgSrc}
                        alt={sector}
                        loading="lazy"
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      /* Fallback apabila nama sektor tidak masuk ke dalam mapping */
                      <div className="flex size-full items-center justify-center bg-slate-100">
                        <CheckCircle2 className="size-6 text-brand-accent/30" />
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/90 via-brand-navy/60 to-transparent p-4 pt-12">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-brand-primary" aria-hidden />
                      <span className="text-sm font-bold text-white drop-shadow-sm">{sector}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
};

export const ProtectionCategoriesSection = () => {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const handleTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = CATEGORIES.length - 1;
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

  const activeCategory = CATEGORIES[activeIndex];

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#0032a8] to-[#001f7a] py-20 text-white sm:py-24 lg:py-32"
      aria-labelledby="protection-heading"
    >
      <div className="pointer-events-none absolute -left-20 bottom-0 size-96 rounded-full bg-brand-accent/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -right-20 top-0 size-80 rounded-full bg-brand-primary/8 blur-[80px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-primary">
            Layanan Proteksi
          </span>
          <h1
            id="protection-heading"
            className="mt-5 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
          >
            {protection.heading}
          </h1>
        </div>

        {/* Desktop: Tabs dengan Cross-fade */}
        <div className="mt-12 hidden md:block">
          <div
            role="tablist"
            aria-label="Kategori proteksi keamanan"
            aria-orientation="horizontal"
            className="flex flex-wrap gap-2.5 border-b border-white/8 pb-4"
          >
            {CATEGORIES.map((category, index) => {
              const isActive = activeIndex === index;
              const tabId = `${baseId}-tab-${category.id}`;
              const panelId = `${baseId}-panel-${category.id}`;
              const Icon = CATEGORY_ICONS[category.id];

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={tabId}
                  aria-selected={isActive}
                  aria-controls={panelId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy ${isActive
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/25"
                    : "bg-white/6 text-white/70 hover:bg-white/10 hover:text-white ring-1 ring-white/8"
                    }`}
                >
                  <Icon className="size-4" strokeWidth={1.75} aria-hidden />
                  {category.tabLabel}
                </button>
              );
            })}
          </div>

          <div className="mt-8">
            <AnimatePresence mode="wait">
              {activeCategory && (
                <motion.div
                  key={activeCategory.id}
                  role="tabpanel"
                  id={`${baseId}-panel-${activeCategory.id}`}
                  aria-labelledby={`${baseId}-tab-${activeCategory.id}`}
                  initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="focus-visible:outline-none"
                  tabIndex={0}
                >
                  <CategoryPanel category={activeCategory} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile: Accordion dengan Animate Height */}
        <div className="mt-10 space-y-3 md:hidden">
          {CATEGORIES.map((category, index) => {
            const isOpen = openAccordion === index;
            const triggerId = `${baseId}-accordion-${category.id}`;
            const panelId = `${baseId}-accordion-panel-${category.id}`;
            const Icon = CATEGORY_ICONS[category.id];

            return (
              <div
                key={category.id}
                className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${isOpen ? "border-white/15 bg-white/6" : "border-white/8 bg-white/[0.03]"
                  }`}
              >
                <h2 className="text-base font-bold">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenAccordion(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-4.5 shrink-0 text-white/60" strokeWidth={1.75} aria-hidden />
                      <span className="tracking-wide">
                        {category.title}
                        {"byline" in category && (
                          <span className="mt-0.5 block text-xs font-bold uppercase tracking-wider text-brand-primary/80">
                            {category.byline.replace("oleh ", "")}
                          </span>
                        )}
                      </span>
                    </span>
                    <ChevronDown
                      className={`size-4.5 shrink-0 text-white/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-brand-primary" : ""
                        }`}
                      aria-hidden
                    />
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
                      transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
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