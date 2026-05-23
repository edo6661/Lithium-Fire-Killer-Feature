import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { HEADER_NAV } from "../../content";
import { CONTACT, SITE } from "../../config/site";

const NAV_LINKS = HEADER_NAV;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 lg:px-4 ${isActive
    ? "text-brand-primary"
    : "text-brand-navy/80 hover:text-brand-primary"
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isActive
    ? "bg-brand-primary/10 text-brand-primary"
    : "text-brand-navy hover:bg-brand-navy/5 hover:text-brand-primary"
  }`;

const NAV_ICONS: Record<string, string> = {
  "/": "🏠",
  "/about": "🏢",
  "/lithium-fire-safety": "🔥",
  "/contact": "📞",
};

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? "border-b border-brand-navy/10 bg-white/98 shadow-sm shadow-brand-navy/5 backdrop-blur-md"
        : "border-b border-transparent bg-white/95 backdrop-blur-sm"
        }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 shrink items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={`${SITE.shortName} — Beranda`}
        >
          <img
            src="/logo/transparent-color.png"
            alt="FAST — PT. Famindo Alfa Spektrum Teknologi"
            className="h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block" aria-label="Navigasi utama">
          <ul className="flex items-center gap-0.5 lg:gap-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  className={navLinkClass}
                  end={link.href === "/"}
                >
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <span
                          className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand-primary"
                          aria-hidden
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <a
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-lg border border-brand-navy/15 px-4 py-2 text-sm font-semibold text-brand-navy transition-colors hover:border-brand-primary hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          >
            <Phone className="size-3.5" aria-hidden />
            <span className="hidden lg:inline">{CONTACT.phone}</span>
            <span className="lg:hidden">Hubungi</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2 text-brand-navy transition-colors hover:bg-brand-primary/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 top-16 z-40 bg-brand-navy/20 backdrop-blur-sm md:hidden"
            aria-hidden
            onClick={() => setMobileOpen(false)}
          />
          <nav
            id="mobile-nav"
            className="absolute inset-x-0 top-full z-50 border-t border-brand-navy/10 bg-white pb-4 shadow-xl shadow-brand-navy/10 md:hidden"
            aria-label="Navigasi mobile"
          >
            <ul className="flex flex-col gap-1 px-3 pt-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <NavLink
                    to={link.href}
                    className={mobileNavLinkClass}
                    end={link.href === "/"}
                    onClick={() => setMobileOpen(false)}
                  >
                    <span className="text-base" aria-hidden>{NAV_ICONS[link.href]}</span>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            {/* Mobile contact strip */}
            <div className="mx-3 mt-4 rounded-xl bg-gradient-to-r from-brand-navy to-brand-dark-blue px-4 py-3">
              <a
                href={CONTACT.phoneHref}
                className="flex items-center justify-between text-sm font-semibold text-white"
                onClick={() => setMobileOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <Phone className="size-4 text-brand-primary" aria-hidden />
                  {CONTACT.phone}
                </span>
                <span className="text-white/50 text-xs">Hubungi kami →</span>
              </a>
            </div>
          </nav>
        </>
      )}
    </header>
  );
};