import { Clock, MapPin } from "lucide-react";
import { OFFICE } from "../../../config/site";

type OfficeLocationSectionProps = {
  headingId?: string;
};

export const OfficeLocationSection = ({
  headingId = "office-location-heading",
}: OfficeLocationSectionProps) => {
  const mapsEmbedSrc = `https://www.google.com/maps?q=${OFFICE.mapsQuery}&output=embed`;

  return (
    <section
      className="bg-linear-to-b from-brand-surface to-white py-16 sm:py-20 lg:py-24"
      aria-labelledby={headingId}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2
            id={headingId}
            className="text-2xl font-bold text-brand-navy sm:text-3xl"
          >
            Lokasi
          </h2>
          <p className="mt-3 text-sm text-brand-navy/70 sm:text-base">
            Kunjungi kantor kami di Jakarta Pusat.
          </p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
          <address className="not-italic">
            <ul className="space-y-6">
              <li className="flex gap-4">
                <MapPin
                  className="size-6 shrink-0 text-brand-accent"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-navy/60">
                    Alamat
                  </p>
                  <p className="mt-2 text-base leading-relaxed text-brand-navy sm:text-lg">
                    {OFFICE.address}
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <Clock
                  className="size-6 shrink-0 text-brand-accent"
                  aria-hidden
                />
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-brand-navy/60">
                    Operasional
                  </p>
                  <p className="mt-2 text-base text-brand-navy sm:text-lg">
                    {OFFICE.hours}
                  </p>
                </div>
              </li>
            </ul>
          </address>

          <figure className="overflow-hidden rounded-2xl border border-brand-navy/10 shadow-sm">
            <iframe
              title="Lokasi kantor FAST di Google Maps"
              src={mapsEmbedSrc}
              className="aspect-video w-full min-h-[280px] border-0 bg-brand-surface"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <figcaption className="sr-only">
              Peta Google Maps — {OFFICE.address}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
