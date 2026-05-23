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
    <footer className="bg-brand-navy text-white">
      {/* Top CTA strip */}
      <div className="border-b border-white/10 bg-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm font-medium text-white/80">{socialCta}</p>
          <div className="flex items-center gap-4">
            {[
              { Icon: Instagram, label: "Instagram FAST" },
              { Icon: Linkedin, label: "LinkedIn FAST" },
              { Icon: Youtube, label: "YouTube FAST" },
            ].map(({ Icon, label }) => (

              <a
                key={label}
                href="#"
                aria-label={label}
                className="flex size-9 items-center justify-center rounded-lg bg-white/10 text-white/70 transition-colors hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main footer body */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_auto_1fr] lg:gap-16">

          {/* Brand column */}
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-3 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy"
            >
              <img
                src="/logo/transparent-color.png"
                alt="FAST — PT. Famindo Alfa Spektrum Teknologi"
                className="h-10 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
              Distributor eksklusif APAR Lithium Fire Killer Hartindo AF31. Perlindungan kebakaran lithium terdepan untuk Indonesia.
            </p>
            {/* Contact */}
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                >
                  <Mail className="size-4 shrink-0 text-brand-accent" aria-hidden />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                >
                  <Phone className="size-4 shrink-0 text-brand-accent" aria-hidden />
                  {CONTACT.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Nav columns */}
          {NAV_COLS.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Newsletter column */}
          <section aria-labelledby="footer-newsletter-heading">
            <h3
              id="footer-newsletter-heading"
              className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/40"
            >
              Newsletter
            </h3>
            <p className="mb-4 text-sm text-white/60">
              Dapatkan update terbaru seputar keamanan baterai lithium.
            </p>
            <form
              className="flex flex-col gap-2"
              onSubmit={handleNewsletterSubmit}
              noValidate
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {newsletter.emailLabel}
              </label>
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder={newsletter.emailPlaceholder}
                className="w-full rounded-lg border border-white/15 bg-white/8 px-4 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/40 transition-colors"
              />
              <Button
                type="submit"
                variant="primary"
                className="w-full"
              >
                {newsletter.submitButton}
              </Button>
            </form>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} {SITE.name} ({SITE.shortName}). Hak cipta dilindungi.
          </p>
          <p className="text-xs text-white/30">
            famindofast.com
          </p>
        </div>
      </div>
    </footer>
  );
};