import { Clock, MapPin, MapPinned } from "lucide-react";
import { ABOUT_CONTENT } from "../../../content/about";

const { location } = ABOUT_CONTENT;

export const AboutLocationSection = () => {
  return (
    <section
      className="bg-linear-to-b from-brand-surface to-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-location-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-2xl">
          <h2
            id="about-location-heading"
            className="text-2xl font-bold text-brand-navy sm:text-3xl"
          >
            {location.heading}
          </h2>
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
                    {location.address}
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
                    Waktu Operasional
                  </p>
                  <p className="mt-2 text-base text-brand-navy sm:text-lg">
                    {location.hours}
                  </p>
                </div>
              </li>
            </ul>
          </address>

          <figure className="overflow-hidden rounded-2xl border border-brand-navy/10 shadow-sm">
            <div
              className="flex aspect-video min-h-[280px] flex-col items-center justify-center gap-3 bg-brand-surface px-6 text-center"
              role="img"
              aria-label="Placeholder embed Google Maps"
            >
              <MapPinned
                className="size-10 text-brand-accent/60"
                strokeWidth={1.5}
                aria-hidden
              />
              <p className="text-sm font-medium text-brand-navy/50">
                Google Maps
              </p>
              <p className="sr-only">{location.address}</p>
            </div>
            <figcaption className="sr-only">
              Placeholder peta — {location.address}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
};
