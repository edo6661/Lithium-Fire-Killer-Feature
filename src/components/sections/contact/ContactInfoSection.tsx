import { Mail, Phone, MessageSquare, Clock } from "lucide-react";
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { info } = CONTACT_PAGE_CONTENT;

const CHANNEL_META = {
  phone: {
    Icon: Phone,
    badgeColor: "bg-[#25D366]/12 text-[#128C3C] ring-[#25D366]/20",
    iconBg: "bg-[#25D366]/10 text-[#128C3C] ring-[#25D366]/15",
    hoverBorder: "hover:border-[#25D366]/30",
    hoverGlow: "hover:shadow-[0_20px_48px_rgba(37,211,102,0.08)]",
  },
  email: {
    Icon: Mail,
    badgeColor: "bg-brand-accent/10 text-brand-dark-blue ring-brand-accent/20",
    iconBg: "bg-brand-accent/10 text-brand-accent ring-brand-accent/15",
    hoverBorder: "hover:border-brand-accent/30",
    hoverGlow: "hover:shadow-[0_20px_48px_rgba(13,132,252,0.08)]",
  },
};

export const ContactInfoSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-[#002fa8] to-[#001f7a] py-20 text-white sm:py-24 lg:py-32"
      aria-labelledby="contact-info-heading"
    >
      {/* Decorations */}
      <div className="pointer-events-none absolute -right-32 -top-24 size-[480px] rounded-full bg-brand-primary/10 blur-[80px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-brand-accent/8 blur-[80px]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Left: heading */}
          <AnimateIn direction="right">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-primary/25 bg-brand-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-brand-primary">
              <MessageSquare className="size-3.5" aria-hidden />
              Siap Membantu Anda
            </div>
            <h1
              id="contact-info-heading"
              className="text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
            >
              {info.heading}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60 sm:text-lg">
              Hubungi tim ahli kami untuk konsultasi proteksi kebakaran baterai lithium — gratis, tanpa komitmen apa pun.
            </p>

            {/* Hours note */}
            <div className="mt-8 inline-flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-white/55 backdrop-blur-sm">
              <Clock className="size-4 shrink-0 text-white/40" aria-hidden />
              <span>Jam operasional: <span className="font-semibold text-white/75">Senin – Jumat, 09.00 – 17.00 WIB</span></span>
            </div>
          </AnimateIn>

          {/* Right: Channel cards (Staggered) */}
          <StaggerChildren staggerDelay={0.15} className="flex flex-col gap-4">
            {info.channels.map((channel) => {
              const meta = CHANNEL_META[channel.id as keyof typeof CHANNEL_META];
              const Icon = meta?.Icon ?? Phone;
              return (
                <StaggerItem key={channel.id}>
                  <a
                    href={channel.id === "phone" ? channel.whatsappHref : channel.href}
                    className={`group flex h-full flex-col gap-5 rounded-2xl border border-white/8 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-white/15 hover:bg-white/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy ${meta?.hoverBorder ?? ""} ${meta?.hoverGlow ?? ""}`}
                    {...(channel.id === "phone" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {/* Icon */}
                    <div className={`inline-flex size-12 items-center justify-center rounded-xl ring-1 transition-transform duration-200 group-hover:scale-105 ${meta?.iconBg ?? "bg-white/10 text-white ring-white/10"}`}>
                      <Icon className="size-5.5" strokeWidth={1.75} />
                    </div>

                    {/* Label & value */}
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-white/40">
                        {channel.label}
                      </p>
                      <p className="mt-1.5 text-lg font-extrabold text-white transition-colors duration-200 group-hover:text-brand-primary sm:text-xl">
                        {channel.value}
                      </p>
                    </div>


                  </a>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
};