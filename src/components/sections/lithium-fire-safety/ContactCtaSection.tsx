import { MessageCircle, Phone, ArrowRight } from "lucide-react";
import { LITHIUM_FIRE_SAFETY_CONTENT } from "../../../content/lithium-fire-safety";
import { ButtonLink } from "../../ui/ButtonLink";

const { cta } = LITHIUM_FIRE_SAFETY_CONTENT;

export const ContactCtaSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-[#e84500] to-brand-secondary py-20 sm:py-24 text-white"
      aria-labelledby="lfs-cta-heading"
    >
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full bg-white/8 blur-[60px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full bg-black/8 blur-[60px]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            <MessageCircle className="size-3.5" aria-hidden />
            Konsultasi Strategis Gratis
          </div>

          <h2
            id="lfs-cta-heading"
            className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl leading-[1.1]"
          >
            {cta.headline}
          </h2>

          <p className="mx-auto max-w-lg text-base leading-relaxed text-white/75 sm:text-lg">
            Tim konsultan ahli kami siap menganalisis risiko dan merancang sistem manajemen keamanan kebakaran lithium terbaik untuk korporasi Anda.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
            <ButtonLink
              to={cta.button.href}
              variant="ghost"
              className="w-full sm:w-auto px-8 py-3.5 text-sm"
            >
              {cta.button.label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>

            <a
              href="https://wa.me/6281290003278"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-brand-secondary shadow-lg shadow-black/8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-xl hover:shadow-black/12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white active:translate-y-0"
            >
              <Phone className="size-4 fill-brand-secondary text-brand-secondary" aria-hidden />
              WhatsApp Sekarang
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};