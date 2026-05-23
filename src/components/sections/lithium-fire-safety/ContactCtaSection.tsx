import { MessageCircle, Phone } from "lucide-react";
import { LITHIUM_FIRE_SAFETY_CONTENT } from "../../../content/lithium-fire-safety";
import { ButtonLink } from "../../ui/ButtonLink";

const { cta } = LITHIUM_FIRE_SAFETY_CONTENT;

export const ContactCtaSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-[#e85a00] to-brand-secondary py-16 sm:py-20 lg:py-24"
      aria-labelledby="lfs-cta-heading"
    >
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-16 -top-16 size-72 rounded-full bg-white/10 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-16 -left-16 size-72 rounded-full bg-black/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white">
            <MessageCircle className="size-3" aria-hidden />
            Konsultasi Gratis
          </div>
          <h2
            id="lfs-cta-heading"
            className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
          >
            {cta.headline}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-white/80 sm:text-base">
            Tim ahli kami siap membantu menemukan solusi proteksi kebakaran lithium yang tepat untuk kebutuhan Anda.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink
              to={cta.button.href}
              variant="ghost"
              className="px-8 py-3.5 text-base"

            >
              {cta.button.label}
            </ButtonLink>
            <a
              href="https://wa.me/6281290003278"
              className="inline-flex items-center gap-2 rounded-lg bg-white/15 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <Phone className="size-4" aria-hidden />
              WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    </section >
  );
};      