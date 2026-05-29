import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../../config/site";

const WA_NUMBER = "6281290003278";
const WA_MESSAGE = encodeURIComponent(
  "Halo FAST, saya ingin berkonsultasi mengenai proteksi kebakaran baterai lithium."
);
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const WhatsAppIcon = () => (
  <svg
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="size-6 fill-white"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.25a.75.75 0 0 0 .916.948l5.544-1.453A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.728 9.728 0 0 1-4.953-1.354l-.355-.211-3.684.966.984-3.595-.232-.371A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

export const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setShowTooltip(true);
      const hideTimer = setTimeout(() => setShowTooltip(false), 4000);
      return () => clearTimeout(hideTimer);
    }, 1200);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-8 sm:right-8"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                className="pointer-events-none w-[220px] rounded-2xl border border-white/10 bg-surface px-4 py-3.5 shadow-[0_12px_40px_rgba(0,0,0,0.25)]"
                role="tooltip"
              >
                <div className="mb-2 flex items-center gap-2">
                  {/* Pulsing online dot — CSS only */}
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-60 animate-ping" style={{ animationDuration: "2s" }} />
                    <span className="relative inline-flex size-2 rounded-full bg-[#25D366]" />
                  </span>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-[#25D366]">Online</p>
                </div>
                <p className="text-xs font-bold text-white">Butuh bantuan?</p>
                <p className="mt-1 text-xs font-medium leading-relaxed text-white/50">
                  Konsultasi via WhatsApp bersama tim ahli kami.
                </p>
                {/* Arrow tail */}
                <div className="absolute -bottom-[5px] right-7 size-2.5 rotate-45 border-b border-r border-white/10 bg-surface" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* FAB */}
          <motion.a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Hubungi FAST via WhatsApp — ${CONTACT.phone}`}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onFocus={() => setShowTooltip(true)}
            onBlur={() => setShowTooltip(false)}
            whileHover={{ scale: 1.12, y: -3 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="relative flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_6px_24px_rgba(37,211,102,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:size-[60px]"
          >
            {/* Ping ring — CSS, not JS */}
            <span
              className="absolute inset-0 rounded-full bg-[#25D366] opacity-25 animate-ping"
              style={{ animationDuration: "2.5s" }}
              aria-hidden
            />
            <WhatsAppIcon />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};




