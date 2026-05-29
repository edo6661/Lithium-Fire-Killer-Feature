import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { HEADER_NAV } from "../../content";
import { SITE } from "../../config/site";

const NAV_LINKS = HEADER_NAV;

const NAV_ICONS: Record<string, string> = {
  "/": "🏠",
  "/about": "🏢",
  "/lithium-fire-safety": "🔥",
  "/contact": "📞",
};

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll for header bg
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Lock scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out ${scrolled
        ? "border-b border-white/5 bg-background/75 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-xl py-1"
        : "border-b border-transparent bg-gradient-to-b from-background/80 to-transparent py-3"
        }`}
    >
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex min-w-0 shrink items-center rounded-xl transition-all duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label={`${SITE.shortName} — Beranda`}
        >
          <motion.img
            src="/logo/transparent-color.png"
            alt="FAST Logo"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:block" aria-label="Navigasi utama">
          <ul className="flex items-center gap-1 rounded-2xl border border-white/5 bg-surface/40 px-2 py-1.5 backdrop-blur-md shadow-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink
                  to={link.href}
                  end={link.href === "/"}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="relative block rounded-xl px-4 py-2 text-sm font-bold tracking-wide transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {({ isActive }) => (
                    <>
                      {/* Active pill — layoutId for smooth cross-link morphing */}
                      {isActive && (
                        <motion.span
                          layoutId="desktop-nav-pill"
                          className="absolute inset-0 z-0 rounded-xl bg-white/10 border border-white/10"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          aria-hidden
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors duration-200 ${isActive ? "text-white" : "text-foreground-muted hover:text-white"
                          }`}
                      >
                        {link.label}
                      </span>
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile toggle */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="relative inline-flex size-12 items-center justify-center rounded-2xl border border-white/10 bg-surface/50 text-white transition-colors duration-200 hover:bg-surface hover:border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent md:hidden"
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
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 top-[88px] z-40 bg-background/80 backdrop-blur-lg md:hidden"
              aria-hidden
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="absolute inset-x-4 top-[88px] z-50 origin-top rounded-3xl border border-white/10 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl md:hidden"
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
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : "bg-transparent text-foreground-muted border border-transparent hover:bg-surface hover:text-white hover:border-white/8"
                        }`
                      }
                    >
                      <span
                        className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-background/60 text-base border border-white/5"
                        aria-hidden
                      >
                        {NAV_ICONS[link.href]}
                      </span>
                      {link.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom contact hint */}
              <div className="mt-3 border-t border-white/8 pt-3 px-1">
                <a
                  href="https://wa.me/6281290003278"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 px-4 py-3 text-sm font-bold text-[#25D366] transition-colors duration-200 hover:bg-[#25D366]/15"
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#25D366]/15 text-base" aria-hidden>
                    💬
                  </span>
                  Hubungi via WhatsApp
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};