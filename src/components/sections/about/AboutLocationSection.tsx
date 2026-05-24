import { Clock, MapPin, MapPinned } from "lucide-react";
import { ABOUT_CONTENT } from "../../../content/about";

const { location } = ABOUT_CONTENT;

export const AboutLocationSection = () => {
  return (
    <section
      className="bg-gradient-to-b from-slate-50/60 to-white py-20 sm:py-24 lg:py-32"
      aria-labelledby="about-location-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-block rounded-full bg-brand-accent/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-brand-dark-blue">
            Temukan Kami
          </span>
          <h2
            id="about-location-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-brand-navy sm:text-4xl"
          >
            {location.heading}
          </h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <address className="not-italic">
            <div className="rounded-2xl border border-brand-navy/8 bg-white p-6 shadow-[0_4px_24px_rgba(0,43,150,0.05)] sm:p-8">
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent/10 ring-1 ring-brand-accent/15">
                    <MapPin className="size-5 text-brand-accent" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-brand-navy/40">
                      Alamat
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-brand-navy/80 sm:text-base">
                      {location.address}
                    </p>
                  </div>
                </li>

                <div className="h-px bg-slate-100" />

                <li className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 ring-1 ring-brand-primary/15">
                    <Clock className="size-5 text-brand-primary" aria-hidden />
                  </div>
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-widest text-brand-navy/40">
                      Waktu Operasional
                    </p>
                    <p className="mt-2 text-sm font-semibold text-brand-navy sm:text-base">
                      {location.hours}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </address>

          <figure className="overflow-hidden rounded-2xl border border-brand-navy/8 shadow-[0_8px_32px_rgba(0,43,150,0.06)]">
            <div
              className="flex aspect-video min-h-[280px] flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#f0f4ff] to-white px-6 text-center"
              role="img"
              aria-label="Placeholder embed Google Maps"
            >
              <div className="flex size-14 items-center justify-center rounded-2xl bg-brand-accent/10 ring-1 ring-brand-accent/15">
                <MapPinned className="size-7 text-brand-accent/60" strokeWidth={1.5} aria-hidden />
              </div>
              <p className="text-sm font-bold text-brand-navy/40">Google Maps</p>
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