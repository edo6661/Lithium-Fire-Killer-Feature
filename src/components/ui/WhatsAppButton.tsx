import { useEffect, useState } from "react";
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
    className="size-7 fill-white"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.557 4.126 1.532 5.862L.057 23.25a.75.75 0 0 0 .916.948l5.544-1.453A11.942 11.942 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.728 9.728 0 0 1-4.953-1.354l-.355-.211-3.684.966.984-3.595-.232-.371A9.712 9.712 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
  </svg>
);

export const WhatsAppButton = () => {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Muncul setelah scroll sedikit
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    // Juga tampil setelah 3 detik meski tidak scroll
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timer);
    };
  }, []);

  // Auto-show tooltip sekali setelah button muncul
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3500);
    }, 800);
    return () => clearTimeout(t);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col items-end gap-2 sm:bottom-8 sm:right-8">
      {/* Tooltip */}
      <div
        className={`pointer-events-none max-w-[200px] rounded-xl border border-[#25D366]/20 bg-white px-4 py-2.5 shadow-lg shadow-black/10 transition-all duration-300 ${showTooltip
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0"
          }`}
        role="tooltip"
        aria-hidden={!showTooltip}
      >
        <p className="text-xs font-semibold text-brand-navy">Butuh bantuan?</p>
        <p className="mt-0.5 text-xs text-brand-navy/60">
          Chat kami via WhatsApp
        </p>
        {/* Tail */}
        <div className="absolute -bottom-1.5 right-5 size-3 rotate-45 border-b border-r border-[#25D366]/20 bg-white" />
      </div>

      {/* Button */}
      <a
        href={WA_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Hubungi FAST via WhatsApp — ${CONTACT.phone}`}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className="group relative flex size-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-[#25D366]/40 transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-[#25D366]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:size-16"
      >
        {/* Pulse ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"
          aria-hidden
        />
        <WhatsAppIcon />
      </a>
    </div >
  );
};