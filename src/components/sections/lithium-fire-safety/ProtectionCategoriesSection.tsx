import { useId, useState, type KeyboardEvent } from "react";
import { Building2, Car, ChevronDown, HardHat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { LITHIUM_FIRE_SAFETY_CONTENT } from "../../../content/lithium-fire-safety";

type ProtectionCategory =
  (typeof LITHIUM_FIRE_SAFETY_CONTENT.protection.categories)[number];

const CATEGORY_ICONS: Record<ProtectionCategory["id"], LucideIcon> = {
  "ev-safety": Car,
  "business-safety": Building2,
  "mining-safety": HardHat,
};

const { protection } = LITHIUM_FIRE_SAFETY_CONTENT;
const CATEGORIES = protection.categories;

const CategoryPanel = ({ category }: { category: ProtectionCategory }) => {
  const Icon = CATEGORY_ICONS[category.id];

  return (
    <article className="rounded-2xl border border-brand-navy/10 bg-white p-6 text-brand-navy sm:p-8">
      <div className="flex items-start gap-4">
        <div
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary"
          aria-hidden
        >
          <Icon className="size-6" strokeWidth={1.75} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-brand-navy sm:text-2xl">
            {category.title}
          </h3>
          {"byline" in category && (
            <p className="mt-1 text-sm italic text-brand-navy/70">
              {category.byline}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {category.paragraphs.map((paragraph) => (
          <p
            key={paragraph.slice(0, 48)}
            className="text-base leading-relaxed text-brand-navy/80 sm:text-lg"
          >
            {paragraph}
          </p>
        ))}
      </div>

      {"subheading" in category && (
        <div className="mt-8">
          <h4 className="text-lg font-bold italic text-brand-navy">
            {category.subheading}
          </h4>
          <p className="mt-4 text-base leading-relaxed text-brand-navy/80 sm:text-lg">
            {category.subheadingParagraph}
          </p>
        </div>
      )}

      {"sectors" in category && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-brand-dark-blue">
            {category.sectorsLabel}
          </p>
          <ul className="mt-3 flex list-none flex-wrap gap-2">
            {category.sectors.map((sector) => (
              <li key={sector}>
                <span className="inline-block rounded-lg bg-brand-accent/10 px-3 py-1.5 text-sm font-medium text-brand-navy">
                  {sector}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export const ProtectionCategoriesSection = () => {
  const baseId = useId();
  const [activeIndex, setActiveIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const handleTabKeyDown = (
    e: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const lastIndex = CATEGORIES.length - 1;
    let nextIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = index === lastIndex ? 0 : index + 1;
        break;
      case "ArrowLeft":
        nextIndex = index === 0 ? lastIndex : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
      default:
        return;
    }

    e.preventDefault();
    setActiveIndex(nextIndex);
  };

  return (
    <section
      className="relative overflow-hidden bg-linear-to-br from-brand-navy via-brand-dark-blue to-brand-navy py-16 text-white sm:py-20 lg:py-24"
      aria-labelledby="protection-heading"
    >
      <div
        className="pointer-events-none absolute -left-16 bottom-0 size-80 rounded-full bg-brand-accent/15 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1
          id="protection-heading"
          className="max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl"
        >
          {protection.heading}
        </h1>

        {/* Desktop: Tabs */}
        <div className="mt-10 hidden md:block">
          <div
            role="tablist"
            aria-label="Kategori proteksi"
            aria-orientation="horizontal"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((category, index) => {
              const isActive = activeIndex === index;
              const tabId = `${baseId}-tab-${category.id}`;
              const panelId = `${baseId}-panel-${category.id}`;

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
                  className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy ${isActive
                      ? "bg-brand-primary text-white"
                      : "bg-white/10 text-white/90 hover:bg-white/15"
                    }`}
                >
                  {category.tabLabel}
                </button>
              );
            })}
          </div>

          {CATEGORIES.map((category, index) => {
            const isActive = activeIndex === index;
            const tabId = `${baseId}-tab-${category.id}`;
            const panelId = `${baseId}-panel-${category.id}`;

            return (
              <div
                key={category.id}
                role="tabpanel"
                id={panelId}
                aria-labelledby={tabId}
                hidden={!isActive}
                tabIndex={0}
                className="mt-6"
              >
                {isActive && <CategoryPanel category={category} />}
              </div>
            );
          })}
        </div>

        {/* Mobile: Accordion */}
        <div className="mt-10 space-y-3 md:hidden">
          {CATEGORIES.map((category, index) => {
            const isOpen = openAccordion === index;
            const triggerId = `${baseId}-accordion-${category.id}`;
            const panelId = `${baseId}-accordion-panel-${category.id}`;

            return (
              <div
                key={category.id}
                className="overflow-hidden rounded-xl border border-white/15 bg-white/5"
              >
                <h2 className="text-base font-semibold">
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenAccordion(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary"
                  >
                    <span>
                      {category.title}
                      {"byline" in category && (
                        <span className="mt-0.5 block text-xs font-normal italic text-white/70">
                          {category.byline}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden
                    />
                  </button>
                </h2>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="border-t border-white/10 px-2 pb-2 sm:px-3 sm:pb-3"
                >
                  {isOpen && (
                    <div className="pt-2">
                      <CategoryPanel category={category} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
