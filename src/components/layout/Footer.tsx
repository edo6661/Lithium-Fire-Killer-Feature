import { Mail, Phone, Instagram, Linkedin, Youtube } from "lucide-react";
import { Button } from "../ui/Button";
import { CONTACT, FOOTER, SITE } from "../../config/site";
import { Link } from "react-router-dom";

export const Footer = () => {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  return (
    <footer className="bg-brand-navy text-white selection:bg-brand-primary/20">
      {/* Social Strip */}
      <div className="border-b border-white/[0.07]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm font-semibold text-white/60">{socialCta}</p>
          <div className="flex items-center gap-2.5">
            {[
              { Icon: Instagram, label: "Instagram FAST" },
              { Icon: Linkedin, label: "LinkedIn FAST" },
              { Icon: Youtube, label: "YouTube FAST" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-xl bg-white/6 text-white/50 ring-1 ring-white/8 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-brand-primary hover:text-white hover:ring-brand-primary/50 hover:shadow-lg hover:shadow-brand-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.65fr_0.65fr_1.1fr] lg:gap-10 xl:gap-16">

          {/* Brand Column */}
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-flex items-center rounded-xl transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              <img
                src="/logo/transparent-color.png"
                alt="FAST — PT. Famindo Alfa Spektrum Teknologi"
                className="h-11 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-[260px] text-sm leading-relaxed text-white/55 font-medium">
              Distributor eksklusif APAR Lithium Fire Killer Hartindo AF31. Perlindungan kebakaran lithium terdepan untuk Indonesia.
            </p>

            {/* Contact links */}
            <ul className="space-y-3 pt-1">
              {[
                { href: `mailto:${CONTACT.email}`, Icon: Mail, text: CONTACT.email },
                { href: CONTACT.phoneHref, Icon: Phone, text: CONTACT.phone },
              ].map(({ href, Icon, text }) => (
                <li key={text}>
                  <a
                    href={href}
                    className="group inline-flex items-center gap-3 text-sm font-medium text-white/60 transition-all duration-200 hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg"
                  >
                    <span className="flex size-7 items-center justify-center rounded-lg bg-white/6 ring-1 ring-white/8 text-white/40 transition-all duration-200 group-hover:bg-brand-primary/15 group-hover:text-brand-primary group-hover:ring-brand-primary/20">
                      <Icon className="size-3.5" aria-hidden />
                    </span>
                    <span className="truncate">{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Nav Columns */}
          {NAV_COLS.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="space-y-5">
              <h3 className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/25">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-all duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-md"
                    >
                      <span className="h-px w-0 bg-brand-primary transition-all duration-200 group-hover:w-3" aria-hidden />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter Column */}
          <section aria-labelledby="footer-newsletter-heading" className="space-y-4">
            <h3
              id="footer-newsletter-heading"
              className="text-[11px] font-extrabold uppercase tracking-[0.12em] text-white/25"
            >
              Newsletter
            </h3>
            <p className="text-sm font-medium leading-relaxed text-white/55">
              Dapatkan update terbaru seputar keamanan kebakaran baterai lithium.
            </p>
            <form
              className="flex flex-col gap-2.5"
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
                placeholder={newsletter.emailPlaceholder}
                className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm text-white placeholder:text-white/25 ring-1 ring-transparent transition-all duration-200 focus:border-brand-primary/60 focus:bg-white/10 focus:outline-none focus:ring-brand-primary/20"
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full shadow-lg shadow-brand-primary/15"
              >
                {newsletter.submitButton}
              </Button>
            </form>
          </section>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-white/[0.07] pt-8 sm:flex-row">
          <p className="text-xs font-medium text-white/35">
            © {new Date().getFullYear()} {SITE.name} ({SITE.shortName}). Hak cipta dilindungi.
          </p>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-brand-primary/50" aria-hidden />
            <p className="text-xs font-bold tracking-widest text-white/18 uppercase">
              famindofast.com
            </p>
          </div>
        </div>
      </div>
    </footer >
  );
};