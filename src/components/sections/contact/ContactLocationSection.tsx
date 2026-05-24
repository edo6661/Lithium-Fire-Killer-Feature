import { Clock, MapPin, Navigation, Building2 } from "lucide-react";
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";

const { location } = CONTACT_PAGE_CONTENT;

export const ContactLocationSection = () => {
  const mapsEmbedSrc = `https://www.google.com/maps?q=${location.mapsQuery}&output=embed`;
  const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${location.mapsQuery}`;

  return (
    <section
      className="bg-gradient-to-b from-slate-50/60 to-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="contact-location-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block rounded-full bg-brand-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-dark-blue">
            Kunjungi Kami
          </span>
          <h2
            id="contact-location-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
          >
            {location.heading}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[380px_1fr] lg:items-start">
          {/* Info card */}
          <div className="rounded-2xl border border-brand-navy/8 bg-white p-6 shadow-[0_4px_24px_rgba(0,43,150,0.05)] sm:p-8">
            <address className="not-italic space-y-6">
              {/* Address */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 ring-1 ring-brand-accent/15">
                  <MapPin className="size-5 text-brand-accent" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-navy/40">
                    {location.addressLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/80 sm:text-base">
                    {location.address}
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Hours */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 ring-1 ring-brand-primary/15">
                  <Clock className="size-5 text-brand-primary" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-navy/40">
                    {location.hoursLabel}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-brand-navy sm:text-base">
                    {location.hours}
                  </p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Building */}
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-dark-blue/8 ring-1 ring-brand-dark-blue/12">
                  <Building2 className="size-5 text-brand-dark-blue" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-widest text-brand-navy/40">
                    Gedung
                  </p>
                  <p className="mt-2 text-sm font-semibold text-brand-navy sm:text-base">
                    TCC Tower One Menara Batavia
                  </p>
                </div>
              </div>
            </address>

            {/* Directions button */}

            <a
              href={mapsDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-brand-navy/12 px-4 py-3 text-sm font-bold text-brand-navy transition-all duration-200 ease-out hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:text-brand-primary hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 active:translate-y-0"
            >
              <Navigation className="size-4" aria-hidden />
              Petunjuk Arah
            </a>
          </div>

          {/* Map */}
          <figure className="overflow-hidden rounded-2xl border border-brand-navy/8 shadow-[0_8px_32px_rgba(0,43,150,0.06)]">
            <iframe
              title="Lokasi kantor FAST di Google Maps"
              src={mapsEmbedSrc}
              className="aspect-video w-full min-h-[360px] border-0 bg-[#f0f4ff]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <figcaption className="sr-only">
              Peta Google Maps — {location.address}
            </figcaption>
          </figure>
        </div>
      </div>
    </section >
  );
};