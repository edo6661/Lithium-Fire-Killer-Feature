import { useState, type SVGProps } from "react";
import { Mail, Phone, Instagram, Linkedin, Youtube, CheckCircle2, Send } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CONTACT, FOOTER, SITE } from "../../config/site";

const TikTokIcon = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const Footer = () => {
  const [isNewsletterSent, setIsNewsletterSent] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailValue) return;
    setIsNewsletterSent(true);
    setEmailValue("");
    setTimeout(() => setIsNewsletterSent(false), 5000);
  };

  const { newsletter, socialCta } = FOOTER;

  const NAV_COLS = [
    {
      heading: "Halaman",
      links: [
        { label: "Beranda", href: "/" },
        { label: "Tentang Kami", href: "/about" },
        { label: "Lithium Fire Safety", href: "/lithium-fire-safety" },
        { label: "Kontak", href: "/contact" },
      ],
    },
    {
      heading: "Solusi",
      links: [
        { label: "EV Fire Safety", href: "/lithium-fire-safety" },
        { label: "Business Safety", href: "/lithium-fire-safety" },
        { label: "Mining Safety", href: "/lithium-fire-safety" },
      ],
    },
  ];

  const SOCIAL: { Icon: LucideIcon; label: string }[] = [
    { Icon: Instagram, label: "Instagram FAST" },
    { Icon: Linkedin, label: "LinkedIn FAST" },
    { Icon: Youtube, label: "YouTube FAST" },
    { Icon: TikTokIcon as LucideIcon, label: "TikTok FAST" },
  ];

  return (
    <footer className="bg-brand-navy text-white selection:bg-accent/20">
      {/* Social bar */}
      <div className="border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-white/40">{socialCta}</p>
          <div className="flex items-center gap-2">
            {SOCIAL.map(({ Icon, label }) => (
              <motion.a
                key={label}
                href="#"
                aria-label={label}
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex size-9 items-center justify-center rounded-xl bg-white/[0.04] text-white/35 ring-1 ring-white/[0.07] transition-colors duration-200 hover:bg-accent hover:text-white hover:ring-accent/40 hover:shadow-[0_4px_16px_rgba(56,152,212,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <Icon className="size-4" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.1fr] lg:gap-10 xl:gap-16">

          {/* Brand column */}
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <img
                src="/logo/transparent-color-2.png"
                alt="FAST — PT. Famindo Alfa Spektrum Teknologi"
                className="h-32 w-auto object-contain"
              />
            </Link>

            <p className="max-w-[260px] text-sm leading-relaxed text-white/45">
              Distributor eksklusif APAR Lithium Fire Killer Hartindo AF31.
              Perlindungan kebakaran lithium terdepan untuk Indonesia.
            </p>

            <ul className="space-y-2.5 pt-1">
              {[
                { href: `mailto:${CONTACT.email}`, Icon: Mail, text: CONTACT.email },
                { href: CONTACT.phoneHref, Icon: Phone, text: CONTACT.phone },
              ].map(({ href, Icon, text }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-3 text-sm font-medium text-white/45 transition-all duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg"
                  >
                    <span className="flex size-7 items-center justify-center rounded-lg bg-white/[0.04] ring-1 ring-white/[0.07] text-white/30 transition-all duration-200 group-hover:bg-accent/20 group-hover:text-accent group-hover:ring-accent/25">
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    <span className="truncate">{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="space-y-5">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/20">
                {col.heading}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-all duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md"
                    >
                      <span className="h-px w-0 bg-gradient-to-r from-accent to-blue-400 transition-all duration-300 ease-out group-hover:w-4" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter */}
          <section aria-labelledby="footer-newsletter-heading" className="space-y-4">
            <h3
              id="footer-newsletter-heading"
              className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/20"
            >
              Newsletter
            </h3>
            <p className="text-sm leading-relaxed text-white/45">
              Dapatkan update terbaru seputar keamanan kebakaran baterai lithium.
            </p>

            <AnimatePresence mode="wait">
              {isNewsletterSent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 rounded-2xl border border-[#25D366]/25 bg-[#25D366]/10 px-4 py-3.5"
                >
                  <CheckCircle2 className="size-5 text-[#25D366] shrink-0" aria-hidden />
                  <p className="text-sm font-bold text-[#25D366]">Berhasil berlangganan!</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-3"
                  onSubmit={handleNewsletterSubmit}
                  noValidate
                >
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    {newsletter.emailLabel}
                  </label>
                  <input
                    id="footer-newsletter-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder={newsletter.emailPlaceholder}
                    className="w-full rounded-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/25 backdrop-blur-sm transition-all duration-300 hover:border-white/20 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent focus:shadow-[0_0_16px_rgba(56,152,212,0.15)] [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#0b1120] [&:-webkit-autofill]:[-webkit-text-fill-color:white]"
                  />
                  {/* Pill button matching new Button style */}
                  <motion.button
                    type="submit"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="group relative w-full overflow-hidden rounded-full bg-accent px-5 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(56,152,212,0.35)] hover:shadow-[0_8px_28px_rgba(56,152,212,0.5)] hover:bg-[#2d85bf] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    {/* Shine sweep */}
                    <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" aria-hidden />
                    <span className="relative flex items-center justify-center gap-2">
                      <Send className="size-3.5" aria-hidden />
                      {newsletter.submitButton}
                    </span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs font-medium text-white/25">
            © {new Date().getFullYear()} {SITE.name} ({SITE.shortName}). Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-accent/40" aria-hidden />
            <p className="text-xs font-bold tracking-widest text-white/15 uppercase">
              famindofast.com
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};