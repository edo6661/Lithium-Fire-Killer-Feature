import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion"; // Tambahan Framer Motion
import { HEADER_NAV } from "../../content";
import { SITE } from "../../config/site";

const NAV_LINKS = HEADER_NAV;

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative rounded-xl px-4 py-2 text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isActive
    ? "text-brand-primary bg-brand-primary/6"
    : "text-brand-navy/70 hover:text-brand-primary hover:bg-brand-primary/5"
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3.5 rounded-xl px-4 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${isActive
    ? "bg-brand-primary/10 text-brand-primary"
    : "text-brand-navy/80 hover:bg-slate-50 hover:text-brand-primary"
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
          ? "border-b border-slate-100/80 bg-white/92 shadow-[0_2px_20px_rgba(0,43,150,0.07)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/98 backdrop-blur-sm"
        }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          to="/"
          className="flex min-w-0 shrink items-center rounded-xl transition-all duration-200 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
          aria-label={`${SITE.shortName} — Beranda`}
        >
          <img
            src="/logo/transparent-color.png"
            alt="FAST — PT. Famindo Alfa Spektrum Teknologi"
            className="h-12 w-auto object-contain py-0.5"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block" aria-label="Navigasi utama">
          <ul className="flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink to={link.href} className={navLinkClass} end={link.href === "/"}>
                  {({ isActive }) => (
                    <>
                      {link.label}
                      {isActive && (
                        <motion.span
                          layoutId="desktop-active-indicator"
                          className="absolute inset-x-3 -bottom-[13px] h-[2.5px] rounded-full bg-brand-primary"
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

        {/* Mobile Toggle */}
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-2.5 text-brand-navy transition-all duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary md:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </motion.span>
        </button>
      </div>

      {/* Mobile Drawer dengan AnimatePresence */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[72px] z-40 bg-brand-navy/20 backdrop-blur-xs md:hidden"
              aria-hidden
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full z-50 border-t border-slate-100 bg-white/98 px-4 pb-6 pt-3 shadow-[0_20px_48px_rgba(0,43,150,0.10)] backdrop-blur-xl md:hidden"
              aria-label="Navigasi mobile"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <NavLink
                      to={link.href}
                      className={mobileNavLinkClass}
                      end={link.href === "/"}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span
                        className="flex size-8 items-center justify-center rounded-lg bg-slate-50 text-base ring-1 ring-slate-100"
                        aria-hidden
                      >
                        {NAV_ICONS[link.href]}
                      </span>
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="my-4 h-px bg-slate-100" />
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};