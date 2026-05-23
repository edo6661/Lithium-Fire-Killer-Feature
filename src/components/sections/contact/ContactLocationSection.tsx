import { Clock, MapPin, Navigation } from "lucide-react";
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";

const { location } = CONTACT_PAGE_CONTENT;

export const ContactLocationSection = () => {
  const mapsEmbedSrc = `https://www.google.com/maps?q=${location.mapsQuery}&output=embed`;
  const mapsDirectionsHref = `https://www.google.com/maps/dir/?api=1&destination=${location.mapsQuery}`;

  return (
    <section
      className="bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="contact-location-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <span className="inline-block rounded-full bg-brand-accent/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-brand-dark-blue">
            Kunjungi Kami
          </span>
          <h2
            id="contact-location-heading"
            className="mt-4 text-2xl font-bold text-brand-navy sm:text-3xl"
          >
            {location.heading}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-[400px_1fr] lg:items-start">
          {/* Info card */}
          <div className="rounded-2xl border border-brand-navy/10 bg-gradient-to-br from-[#f0f4ff] to-white p-6 sm:p-8">
            <address className="not-italic space-y-6">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10">
                  <MapPin className="size-5 text-brand-accent" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/45">
                    {location.addressLabel}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy sm:text-base">
                    {location.address}
                  </p>
                </div>
              </div>

              <div className="h-px bg-brand-navy/8" />

              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                  <Clock className="size-5 text-brand-primary" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-brand-navy/45">
                    {location.hoursLabel}
                  </p>
                  <p className="mt-2 text-sm text-brand-navy sm:text-base">
                    {location.hours}
                  </p>
                </div>
              </div>
            </address>

            {/* Directions button */}
            <a
              href={mapsDirectionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-brand-navy/15 px-4 py-3 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            >
              <Navigation className="size-4" aria-hidden />
              Petunjuk Arah
            </a>
          </div>

          {/* Map */}
          <figure className="overflow-hidden rounded-2xl border border-brand-navy/10 shadow-md shadow-brand-navy/5">
            <iframe
              title="Lokasi kantor FAST di Google Maps"
              src={mapsEmbedSrc}
              className="aspect-video w-full min-h-[320px] border-0 bg-[#f0f4ff]"
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
    </section>
  );
};