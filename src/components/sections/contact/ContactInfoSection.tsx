import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";

const { info } = CONTACT_PAGE_CONTENT;

const CHANNEL_META = {
  phone: {
    Icon: Phone,
    badge: "Tersedia via WhatsApp",
    badgeColor: "bg-[#25D366]/15 text-[#128C3C]",
    accentColor: "bg-brand-accent/10 text-brand-accent",
  },
  email: {
    Icon: Mail,
    badge: "Respons dalam 1×24 jam",
    badgeColor: "bg-brand-accent/10 text-brand-dark-blue",
    accentColor: "bg-brand-primary/10 text-brand-primary",
  },
};

export const ContactInfoSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#003bbf] to-brand-navy py-16 text-white sm:py-20 lg:py-28"
      aria-labelledby="contact-info-heading"
    >
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-24 -top-16 size-96 rounded-full bg-brand-primary/20 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-20 left-0 size-72 rounded-full bg-brand-accent/15 blur-3xl" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/40 bg-brand-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-brand-primary">
          <MessageSquare className="size-3" aria-hidden />
          Siap Membantu Anda
        </div>

        <h1
          id="contact-info-heading"
          className="max-w-xl text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        >
          {info.heading}
        </h1>
        <p className="mt-4 max-w-lg text-base text-white/65 sm:text-lg">
          Hubungi tim ahli kami untuk konsultasi proteksi kebakaran baterai lithium.
        </p>

        {/* Channel cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:max-w-3xl">
          {info.channels.map((channel) => {
            const meta = CHANNEL_META[channel.id as keyof typeof CHANNEL_META];
            const Icon = meta?.Icon ?? Phone;
            return (

              <a
                key={channel.id}
                href={channel.id === "phone" ? channel.whatsappHref : channel.href}
                className="group flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/6 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
                {...(channel.id === "phone" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {/* Icon */}
                <div className={`inline-flex size-12 items-center justify-center rounded-xl ${meta?.accentColor ?? "bg-white/10 text-white"}`}>
                  <Icon className="size-6" strokeWidth={1.75} />
                </div>
                {/* Label & value */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/50">
                    {channel.label}
                  </p>
                  <p className="mt-1.5 text-lg font-bold text-white transition-colors group-hover:text-brand-primary sm:text-xl">
                    {channel.value}
                  </p>
                </div>
                {/* Badge */}
                {meta?.badge && (
                  <span className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${meta.badgeColor}`}>
                    {meta.badge}
                  </span>
                )}
              </a>
            );
          })}
        </div>

        {/* Hours note */}
        <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/50">
          <Clock className="size-4 shrink-0" aria-hidden />
          <span>Jam operasional: Senin – Jumat, 09.00 – 17.00 WIB</span>
        </div>
      </div>
    </section >
  );
};                                  