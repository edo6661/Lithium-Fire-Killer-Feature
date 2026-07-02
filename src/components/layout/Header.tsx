import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HEADER_NAV } from "../../content";
import { SITE } from "../../config/site";

const NAV_LINKS = HEADER_NAV;


export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation("global");

  const isArkivPage = location.pathname === "/lfk-x-arkiv";

  // Helper untuk translasikan label navigasi
  const getNavLabel = (href: string) => {
    switch (href) {
      case "/": return t("header.nav.home");
      case "/about": return t("header.nav.about");
      case "/lithium-fire-safety": return t("header.nav.lithiumFireSafety");
      case "/contact": return t("header.nav.contact");
      default: return "";
    }
  };

  const toggleLanguage = () => {
    const nextLang = i18n.language === "id" ? "en" : "id";
    i18n.changeLanguage(nextLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-in-out ${scrolled || mobileOpen
          ? isArkivPage
            ? "bg-white/95 backdrop-blur-xl border-b border-slate-200 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
            : "bg-surface/80 backdrop-blur-xl border-b border-white/10 py-4 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          : isArkivPage
            ? "bg-white border-b border-transparent py-6"
            : "bg-gradient-to-b from-background/80 to-transparent py-6 border-b border-transparent"
        }`}
    >
      <div className="container mx-auto flex max-w-7xl items-center justify-between gap-8 px-6 md:px-12">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group relative z-10 flex min-w-0 shrink items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={`${SITE.shortName} — Beranda`}
        >
          <img
            src="/logo/transparent-color-2.png"
            alt="FAST Logo"
            className="h-12 w-auto object-contain transition-transform duration-500 will-change-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8" aria-label="Navigasi utama">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === "/"}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className={({ isActive }) =>
                  `group relative py-2 text-sm font-semibold transition-colors duration-300 ${isArkivPage
                    ? isActive
                      ? "text-slate-900"
                      : "text-slate-600 hover:text-slate-900"
                    : isActive
                      ? "text-white"
                      : "text-foreground/80 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {getNavLabel(link.href)}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] rounded-full transition-all duration-300 ease-out ${isActive ? "w-full" : "w-0 group-hover:w-full"
                        } ${isArkivPage ? "bg-slate-900" : "bg-accent"}`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Language Switcher */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-bold transition-all hover:scale-105 ${
              isArkivPage
                ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                : "border-white/20 text-white hover:bg-white/10"
            }`}
          >
            <Globe className="size-3.5" />
            {i18n.language.toUpperCase()}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className={`relative z-10 inline-flex rounded-md p-1 transition-colors focus:outline-none md:hidden ${isArkivPage ? "text-slate-800 hover:text-accent" : "text-foreground hover:text-accent"
            }`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          onClick={() => setMobileOpen((o) => !o)}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={mobileOpen ? "close" : "open"}
              initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              transition={{ duration: 0.18 }}
              className="flex items-center justify-center"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`fixed inset-0 top-[72px] z-40 backdrop-blur-lg md:hidden ${isArkivPage ? "bg-white/80" : "bg-background/80"
                }`}
              aria-hidden
              onClick={() => setMobileOpen(false)}
            />

            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute inset-x-4 top-[88px] z-50 origin-top overflow-hidden rounded-3xl border p-3 shadow-2xl backdrop-blur-xl md:hidden ${isArkivPage ? "border-slate-200 bg-white/95" : "border-white/10 bg-surface/95"
                }`}
              aria-label="Navigasi mobile"
            >
              <ul className="flex flex-col gap-1.5">
                {NAV_LINKS.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.28 }}
                  >
                    <NavLink
                      to={link.href}
                      end={link.href === "/"}
                      onClick={() => {
                        setMobileOpen(false);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={({ isActive }) =>
                        `flex items-center gap-3.5 rounded-2xl px-4 py-3.5 text-sm font-bold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${isActive
                          ? isArkivPage
                            ? "border border-slate-900 bg-slate-900 text-white"
                            : "border border-accent/20 bg-accent/10 text-accent"
                          : isArkivPage
                            ? "border border-transparent bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                            : "border border-transparent bg-transparent text-foreground-muted hover:border-white/8 hover:bg-surface hover:text-white"
                        }`
                      }
                    >
                      {() => (
                        <>
                         
                          {getNavLabel(link.href)}
                        </>
                      )}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Mobile Language Switcher */}
              <div className={`mx-1 mt-3 flex items-center justify-between border-t pt-3 ${isArkivPage ? "border-slate-200" : "border-white/8"}`}>
                <button
                  onClick={toggleLanguage}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                    isArkivPage
                      ? "border-slate-300 text-slate-700 hover:bg-slate-100"
                      : "border-white/20 text-white hover:bg-white/10"
                  }`}
                >
                  <Globe className="size-4" />
                  {i18n.language.toUpperCase()}
                </button>
              </div>

              <div
                className={`mx-1 mt-3 border-t pt-3 ${isArkivPage ? "border-slate-200" : "border-white/8"
                  }`}
              >
                <a
                  href="https://wa.me/6281290003278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#25D366]/20 bg-[#25D366]/10 px-4 py-3 text-sm font-bold text-[#25D366] transition-colors duration-200 hover:bg-[#25D366]/15"
                  onClick={() => setMobileOpen(false)}
                >
                  <span
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-base"
                    aria-hidden
                  >
                    💬
                  </span>
                  {t("footer.waButton")}
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};