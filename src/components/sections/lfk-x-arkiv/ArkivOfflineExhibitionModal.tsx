import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MapPin, PackageX, Sparkles, X } from "lucide-react";
import type { ArkivWebPurchaseState } from "../../../utils/stock-cutoff";

interface ArkivOfflineExhibitionModalProps {
  open: boolean;
  onClose: () => void;
  state: ArkivWebPurchaseState;
}

export const ArkivOfflineExhibitionModal = ({
  open,
  onClose,
  state,
}: ArkivOfflineExhibitionModalProps) => {
  const { t } = useTranslation("lfk-x-arkiv");

  const isSoldOut = state === "SOLD_OUT";

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[96] flex items-center justify-center p-4">
          <motion.button
            type="button"
            aria-label={t("offlineModal.closeBtn")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 sm:bg-slate-900/55 sm:backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-[1] w-full max-w-md rounded-[1.75rem] border border-white/50 bg-white p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-5" />
            </button>

            <div
              className={`mx-auto flex size-14 items-center justify-center rounded-2xl ${
                isSoldOut
                  ? "bg-slate-100 text-slate-700"
                  : "bg-accent/10 text-accent"
              }`}
            >
              {isSoldOut ? (
                <PackageX className="size-7" />
              ) : (
                <MapPin className="size-7" />
              )}
            </div>

            <h2 className="mt-5 text-center text-2xl font-black tracking-tight text-slate-900">
              {isSoldOut
                ? t("offlineModal.soldOutHeading")
                : t("offlineModal.heading")}
            </h2>

            <p className="mt-3 text-center text-sm font-medium leading-relaxed text-slate-600">
              {isSoldOut
                ? t("offlineModal.soldOutDescription")
                : t("offlineModal.description")}
            </p>

            {!isSoldOut ? (
              <div className="mt-5 rounded-2xl border border-accent/20 bg-accent/5 p-4 text-center">
                <p className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-accent">
                  <Sparkles className="size-3.5" />
                  {t("offlineModal.locationLabel")}
                </p>
                <p className="mt-1 text-base font-black text-slate-900">
                  {t("offlineModal.locationValue")}
                </p>
              </div>
            ) : null}

            <button
              type="button"
              onClick={onClose}
              className="mt-6 flex w-full items-center justify-center rounded-full bg-slate-900 py-3.5 text-sm font-black text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800"
            >
              {t("offlineModal.closeBtn")}
            </button>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
