import { Clock, MapPin, Navigation, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { location } = CONTACT_PAGE_CONTENT;

const mapsEmbedSrc = `https://maps.google.com/maps?q=${location.mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
const mapsDirectionsHref = `https://maps.google.com/maps?daddr=${location.mapsQuery}`;

const INFO_ITEMS = [
  {
    id: "address",
    Icon: MapPin,
    iconBg: "bg-accent/10 text-accent ring-accent/20",
    label: location.addressLabel,
    value: location.address,
    valueClass: "text-sm leading-relaxed text-white/75 sm:text-base",
  },
  {
    id: "hours",
    Icon: Clock,
    iconBg: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
    label: location.hoursLabel,
    value: location.hours,
    valueClass: "text-sm font-semibold text-white sm:text-base",
  },
  {
    id: "building",
    Icon: Building2,
    iconBg: "bg-purple-500/10 text-purple-400 ring-purple-500/20",
    label: "Gedung",
    value: "TCC Tower One Menara Batavia",
    valueClass: "text-sm font-semibold text-white sm:text-base",
  },
] as const;

export const ContactLocationSection = () => {
  return (
    <section
      className="bg-background py-20 border-y border-white/5 sm:py-24 lg:py-32"
      aria-labelledby="contact-location-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimateIn direction="up" className="mb-12">
          <span className="inline-block rounded-full bg-accent/10 border border-accent/20 px-4 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            Kunjungi Kami
          </span>
          <h2
            id="contact-location-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
          >
            {location.heading}
          </h2>
        </AnimateIn>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
          {/* Info card */}
          <AnimateIn direction="right">
            <div className="rounded-3xl border border-white/10 bg-surface/40 backdrop-blur-md p-6 shadow-xl sm:p-8">
              <StaggerChildren staggerDelay={0.1} className="space-y-5">
                {INFO_ITEMS.map(({ id, Icon, iconBg, label, value, valueClass }, idx) => (
                  <StaggerItem key={id}>
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

              {/* Directions button */}
              <motion.a
                href={mapsDirectionsHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 360, damping: 22 }}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-sm font-bold text-white/80 backdrop-blur-sm transition-colors duration-200 hover:border-accent/40 hover:bg-accent/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <Navigation className="size-4 text-accent/70 transition-colors duration-200 group-hover:text-accent" aria-hidden />
                Petunjuk Arah
              </motion.a>
            </div>
          </AnimateIn>

          {/* Map */}
          <AnimateIn direction="left" delay={0.1}>
            <motion.figure
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 200, damping: 30 }}
              className="overflow-hidden rounded-3xl border border-white/10 shadow-xl bg-surface/50"
            >
              <iframe
                title="Lokasi kantor FAST di Google Maps"
                src={mapsEmbedSrc}
                className="aspect-video w-full min-h-[360px] border-0 opacity-90 contrast-125 grayscale-[15%]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <figcaption className="sr-only">
                Peta Google Maps — {location.address}
              </figcaption>
            </motion.figure>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
};