import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  ArrowLeft,
  Flame,
  ShieldCheck,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import { PageSeo } from "../components/seo/PageSeo";
import { PAGE_SEO } from "../config/seo";

export const NotFoundPage = () => {
  const { t } = useTranslation("not-found");
  const navigate = useNavigate();
  const seoPath = PAGE_SEO.notFound.path;

  const quickLinks = [
    {
      to: "/",
      icon: Home,
      title: t("links.home.title", "Beranda Utama"),
      description: t(
        "links.home.description",
        "Kembali ke pusat informasi utama FAST & APAR Hartindo AF31."
      ),
    },
    {
      to: "/lfk-x-arkiv",
      icon: Sparkles,
      title: t("links.arkiv.title", "LFK × Arkiv Limited"),
      description: t(
        "links.arkiv.description",
        "Edisi kolektor kolaborasi eksklusif seni avant-garde & fire safety."
      ),
      highlight: true,
    },
    {
      to: "/lithium-fire-safety",
      icon: ShieldCheck,
      title: t("links.safety.title", "Lithium Fire Safety"),
      description: t(
        "links.safety.description",
        "Pelajari bahaya Thermal Runaway & solusi proteksi menyeluruh."
      ),
    },
    {
      to: "/contact",
      icon: PhoneCall,
      title: t("links.contact.title", "Hubungi Tim FAST"),
      description: t(
        "links.contact.description",
        "Konsultasi langsung dengan spesialis proteksi kebakaran kami."
      ),
    },
  ];

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <PageSeo
        title={t("seo.title", "404 — Halaman Tidak Ditemukan | FAST Lithium Fire Killer")}
        description={t(
          "seo.description",
          "Halaman yang Anda cari tidak dapat ditemukan. Kembali ke beranda Lithium Fire Killer FAST."
        )}
        path={seoPath}
      />

      <div className="relative min-h-[calc(100vh-140px)] w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid">
        {/* Ambient Glows */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[750px] h-[350px] sm:h-[450px] bg-accent/10 blur-[130px] rounded-full animate-glow-pulse"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute top-1/4 right-10 w-[300px] h-[300px] bg-cyan-500/5 blur-[100px] rounded-full"
          aria-hidden="true"
        />

        {/* 404 Watermark Backdrop */}
        <div
          className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none z-0"
          aria-hidden="true"
        >
          <span className="text-[12rem] sm:text-[18rem] md:text-[24rem] font-black font-heading tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-accent/20 via-accent/5 to-transparent opacity-35 blur-[1px] leading-none block">
            404
          </span>
        </div>

        {/* Main Content Container */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 max-w-4xl w-full flex flex-col items-center text-center"
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass border border-accent/30 text-accent font-mono text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(56,152,212,0.2)] mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent"></span>
            </span>
            <span>{t("badge", "ERROR 404 • SIGNAL LOST")}</span>
          </div>

          {/* Icon Aura Centerpiece */}
          <div className="relative my-2 group">
            <div className="absolute inset-0 rounded-3xl bg-accent/20 blur-xl group-hover:bg-accent/40 transition-all duration-500 animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl glass border border-accent/40 flex items-center justify-center text-accent shadow-[0_0_30px_rgba(56,152,212,0.25)] group-hover:scale-105 transition-transform duration-300">
              <ShieldAlert className="w-10 h-10 sm:w-12 sm:h-12 animate-float" />
              <Flame className="w-4 h-4 text-amber-400 absolute bottom-3 right-3 animate-pulse" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mt-6 text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight text-glow">
            {t("title", "Halaman Tidak Ditemukan")}
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-foreground-muted leading-relaxed">
            {t(
              "subtitle",
              "Halaman yang Anda cari mungkin telah dipindahkan, dihapus, atau alamat URL yang dimasukkan kurang tepat. Sistem proteksi Lithium Fire Killer siap mengarahkan Anda kembali."
            )}
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-accent text-slate-950 font-bold hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_25px_rgba(56,152,212,0.35)] hover:shadow-[0_0_35px_rgba(56,152,212,0.6)] shine group text-sm sm:text-base"
            >
              <Home className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
              <span>{t("actions.backHome", "Kembali ke Beranda")}</span>
            </Link>

            <button
              type="button"
              onClick={handleGoBack}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full glass text-white font-semibold border border-white/10 hover:border-accent/40 hover:bg-surface/90 transition-all duration-300 group text-sm sm:text-base cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform text-accent" />
              <span>{t("actions.goBack", "Halaman Sebelumnya")}</span>
            </button>
          </div>

          {/* Quick Links Section */}
          <div className="mt-14 w-full pt-10 border-t border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-widest text-accent text-left flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                {t("quickLinksHeading", "Pintasan Solusi Proteksi")}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {quickLinks.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 * idx }}
                  >
                    <Link
                      to={item.to}
                      className={`group relative flex items-start gap-4 p-4 sm:p-5 rounded-2xl glass border ${
                        item.highlight
                          ? "border-accent/40 bg-accent/5 hover:border-accent"
                          : "border-white/5 hover:border-accent/40"
                      } transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(56,152,212,0.15)] h-full overflow-hidden`}
                    >
                      {item.highlight && (
                        <span className="absolute top-0 right-0 bg-accent/20 text-accent text-[10px] font-mono uppercase font-bold px-3 py-1 rounded-bl-xl border-l border-b border-accent/30">
                          Featured
                        </span>
                      )}

                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-slate-950 transition-all duration-300 shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="font-heading font-semibold text-white group-hover:text-accent transition-colors text-sm sm:text-base truncate">
                            {item.title}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-accent/60 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0" />
                        </div>
                        <p className="mt-1 text-xs text-foreground-muted line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
