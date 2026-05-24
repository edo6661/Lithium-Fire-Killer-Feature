import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { HEADER_NAV } from "../../content";
import { CONTACT, SITE } from "../../config/site";

const NAV_LINKS = HEADER_NAV;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-xl px-4 py-2 text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isActive
    ? "text-brand-primary bg-brand-primary/6"
    : "text-brand-navy/75 hover:text-brand-primary hover:bg-brand-primary/5"
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isActive
    ? "bg-brand-primary/10 text-brand-primary"
    : "text-brand-navy/85 hover:bg-brand-navy/5 hover:text-brand-primary"
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
    const onScroll = () => setScrolled(window.scrollY > 12);
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ease-out ${scrolled
        ? "border-b border-slate-100 bg-white/90 shadow-[0_4px_24px_rgba(0,43,150,0.06)] backdrop-blur-lg"
        : "border-b border-transparent bg-white/98 backdrop-blur-sm"
        }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 shrink items-center rounded-xl transition-all duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={`${SITE.shortName} — Beranda`}
        >
          <img
            src="/logo/transparent-color.png"
            alt="FAST — PT. Famindo Alfa Spektrum Teknologi"
            className="h-14 w-auto object-contain py-1"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block" aria-label="Navigasi utama">
          <ul className="flex items-center gap-1">
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
                          className="absolute inset-x-4 -bottom-[13px] h-[2px] rounded-full bg-brand-primary"
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
            target="_blank"
            rel="noopener noreferrer"
            href={CONTACT.phoneHref}
            className="inline-flex items-center gap-2 rounded-xl border border-brand-navy/12 bg-white px-4 py-2.5 text-sm font-bold tracking-wide text-brand-navy shadow-sm transition-all duration-200 ease-out hover:border-brand-primary/30 hover:bg-brand-primary/5 hover:text-brand-primary hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 active:translate-y-0"
          >
            <Phone className="size-3.5 text-brand-primary" aria-hidden />
            <span className="hidden lg:inline">{CONTACT.phone}</span>
            <span className="lg:hidden">Hubungi</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-navy transition-all duration-200 hover:bg-brand-navy/6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <span className="transition-transform duration-200">
            {mobileOpen ? <X className="size-5.5" /> : <Menu className="size-5.5" />}
          </span>
        </button>
      </div>

      {/* Mobile Drawer */}
      {
        mobileOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 top-20 z-40 bg-brand-navy/15 backdrop-blur-xs md:hidden"
              aria-hidden
              onClick={() => setMobileOpen(false)}
            />
            <nav
              id="mobile-nav"
              className="absolute inset-x-0 top-full z-50 border-t border-slate-100/80 bg-white/97 px-4 pb-5 pt-2 shadow-[0_16px_40px_rgba(0,43,150,0.10)] backdrop-blur-xl md:hidden"
              aria-label="Navigasi mobile"
            >
              <ul className="flex flex-col gap-1 pt-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      className={mobileNavLinkClass}
                      end={link.href === "/"}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="flex size-8 items-center justify-center rounded-lg bg-slate-50 text-base" aria-hidden>
                        {NAV_ICONS[link.href]}
                      </span>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>

              {/* Mobile Contact Box */}
              <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-navy to-[#0034a8] p-5 shadow-lg shadow-brand-navy/15">
                <a
                  href={CONTACT.phoneHref}
                  className="flex items-center justify-between gap-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex items-center gap-3">
                    <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/10">
                      <Phone className="size-4 fill-brand-primary text-brand-primary" aria-hidden />
                    </span>
                    <span>{CONTACT.phone}</span>
                  </span>
                  <span className="text-xs font-semibold text-white/55">
                    Hubungi →
                  </span>
                </a>
              </div>
            </nav >
          </>
        )}
    </header >
  );
};