import { Clock, MapPin, MapPinned } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

export const AboutLocationSection = () => {
  const { t } = useTranslation("about");

  const INFO_ITEMS = [
    {
      id: "address",
      Icon: MapPin,
      iconBg: "bg-accent/10 text-accent ring-accent/20",
      label: t("location.addressLabel"),
      value: t("location.address"),
      valueClass: "text-sm leading-relaxed text-white/75 sm:text-base",
    },
    {
      id: "hours",
      Icon: Clock,
      iconBg: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
      label: t("location.hoursLabel"),
      value: t("location.hours"),
      valueClass: "text-sm font-semibold text-white sm:text-base",
    },
  ] as const;

  return (
    <section className="bg-background border-y border-white/5 py-20 sm:py-24 lg:py-8" aria-labelledby="about-location-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimateIn direction="up" className="mb-12">
          <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {t("location.badge")}
          </span>
          <h2 id="about-location-heading" className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {t("location.heading")}
          </h2>
          <p className="mt-3 text-sm text-foreground-muted sm:text-base">
            {t("location.description")}
          </p>
        </AnimateIn>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <AnimateIn direction="right">
            <address className="not-italic">
              <div className="rounded-3xl border border-white/10 bg-surface/40 backdrop-blur-md p-6 shadow-xl sm:p-8">
                <StaggerChildren staggerDelay={0.12} className="space-y-5">
                  {INFO_ITEMS.map(({ id, Icon, iconBg, label, value, valueClass }, idx) => (
                    <StaggerItem key={idx}>
                      <>
                        <div className="flex gap-4">
                          <div className={`flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 ${iconBg}`}>
                            <Icon className="size-5" aria-hidden />
                          </div>
                          <div>
                            <p className="text-xs font-extrabold uppercase tracking-widest text-foreground-muted">
                              {label}
                            </p>
                            <p className={`mt-2 ${valueClass}`}>{value}</p>
                          </div>
                        </div>
                        {idx < INFO_ITEMS.length - 1 && (
                          <div className="h-px bg-white/8 mt-5" />
                        )}
                      </>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </div>
            </address>
          </AnimateIn>

          <AnimateIn direction="left" delay={0.1}>
            <motion.figure
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
              className="overflow-hidden rounded-3xl border border-white/10 shadow-xl"
            >
              <div className="flex aspect-video min-h-[280px] flex-col items-center justify-center gap-4 bg-surface/50 px-6 text-center" role="img" aria-label="Placeholder embed Google Maps">
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                  className="flex size-16 items-center justify-center rounded-2xl bg-accent/10 ring-1 ring-accent/20"
                >
                  <MapPinned className="size-8 text-accent/60" strokeWidth={1.5} aria-hidden />
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white/60">{t("location.building")}</p>
                  <p className="mt-1 text-xs text-foreground-muted">{t("location.city")}</p>
                </div>
                <p className="sr-only">{t("location.address")}</p>
              </div>
              <figcaption className="sr-only">
                Placeholder peta — {t("location.address")}
              </figcaption>
            </motion.figure>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};