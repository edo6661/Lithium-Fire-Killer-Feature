import { Mail, Phone, MessageSquare, Clock, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { CONTACT_PAGE_CONTENT } from "../../../content/contact";
import { AnimateIn } from "../../ui/AnimateIn";
import { StaggerChildren, StaggerItem } from "../../ui/StaggerChildren";

const { info } = CONTACT_PAGE_CONTENT;

const CHANNEL_META = {
  phone: {
    Icon: Phone,
    accentColor: "#25D366",
    badgeText: "WhatsApp",
    iconBg: "bg-[#25D366]/10 text-[#25D366] ring-[#25D366]/20",
    borderHover: "hover:border-[#25D366]/40",
    glowHover: "hover:shadow-[0_0_32px_rgba(37,211,102,0.18)]",
    shineColor: "via-[#25D366]/10",
  },
  email: {
    Icon: Mail,
    accentColor: "#3898d4",
    badgeText: "Email",
    iconBg: "bg-accent/10 text-accent ring-accent/20",
    borderHover: "hover:border-accent/40",
    glowHover: "hover:shadow-[0_0_32px_rgba(56,152,212,0.18)]",
    shineColor: "via-accent/10",
  },
};

export const ContactInfoSection = () => {
  return (
    <section
      className="relative overflow-hidden bg-background py-20 text-white border-y border-white/5 sm:py-24 lg:py-8"
      aria-labelledby="contact-info-heading"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -right-32 -top-24 size-[480px] rounded-full bg-accent/5 blur-[100px]" aria-hidden />
      <div className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-blue-900/10 blur-[100px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">

          {/* Left — heading */}
          <AnimateIn direction="right">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-accent">
              <MessageSquare className="size-3.5" aria-hidden />
              Siap Membantu Anda
            </div>
            <h1
              id="contact-info-heading"
              className="text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl"
            >
              {info.heading}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-foreground-muted sm:text-lg">
              Hubungi tim ahli kami untuk konsultasi proteksi kebakaran baterai lithium — gratis, tanpa komitmen apa pun.
            </p>

            <div className="mt-8 inline-flex items-center gap-2.5 rounded-2xl border border-white/10 bg-surface/50 px-4 py-3 text-sm text-foreground-muted backdrop-blur-md">
              <Clock className="size-4 shrink-0 text-white/40" aria-hidden />
              <span>
                Jam operasional:{" "}
                <span className="font-bold text-white/90">Senin – Jumat, 09.00 – 17.00 WIB</span>
              </span>
            </div>
          </AnimateIn>

          {/* Right — channel cards */}
          <StaggerChildren staggerDelay={0.15} className="flex flex-col gap-4">
            {info.channels.map((channel) => {
              const meta = CHANNEL_META[channel.id as keyof typeof CHANNEL_META];
              const Icon = meta?.Icon ?? Phone;
              const href = channel.id === "phone" ? channel.whatsappHref : channel.href;
              const isExternal = channel.id === "phone";

              return (
                <StaggerItem key={channel.id}>
                  <motion.a
                    href={href}
                    whileHover={{ y: -4, scale: 1.015 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 350, damping: 22 }}
                    className={`group relative flex h-full flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-surface/40 p-6 backdrop-blur-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${meta?.borderHover ?? ""} ${meta?.glowHover ?? ""}`}
                    {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {/* Shine sweep on hover */}
                    <span
                      className={`pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent ${meta?.shineColor ?? "via-white/5"} to-transparent transition-transform duration-600 group-hover:translate-x-full`}
                      aria-hidden
                    />

                    {/* Top row: icon + badge */}
                    <div className="flex items-center justify-between">
                      <div
                        className={`inline-flex size-14 items-center justify-center rounded-xl ring-1 transition-transform duration-300 group-hover:scale-110 ${meta?.iconBg ?? "bg-white/5 text-white ring-white/10"}`}
                      >
                        <Icon className="size-6" strokeWidth={1.75} />
                      </div>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-extrabold tracking-widest uppercase"
                        style={{
                          color: meta?.accentColor,
                          borderColor: `${meta?.accentColor}30`,
                          background: `${meta?.accentColor}0d`,
                        }}
                      >
                        {meta?.badgeText}
                        <ArrowUpRight className="size-3 opacity-60" aria-hidden />
                      </span>
                    </div>

                    {/* Label + value */}
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-foreground-muted">
                        {channel.label}
                      </p>
                      <p
                        className="mt-1.5 text-lg font-extrabold sm:text-xl transition-colors duration-200"
                        style={{ color: "white" }}
                      >
                        {channel.value}
                      </p>
                    </div>
                  </motion.a>
                </StaggerItem>
              );
            })}
          </StaggerChildren>

        </div>
      </div>
    </section>
  );
};