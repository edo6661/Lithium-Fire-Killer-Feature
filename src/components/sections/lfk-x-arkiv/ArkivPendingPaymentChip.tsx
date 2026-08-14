import { useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock3, CreditCard, X } from "lucide-react";
import type { CheckoutStep } from "../../../hooks/useCreateInvoiceVa";
import { usePaymentCountdown } from "../../../hooks/usePaymentCountdown";
import type { InvoiceVaData } from "../../../types/invoice";
import { formatRupiah } from "../../../utils/format-currency";

interface ArkivPendingPaymentChipProps {
  open: boolean;
  step: CheckoutStep;
  vaData: InvoiceVaData;
  onResume: () => void;
  onDismiss: () => void;
}

function stepTone(step: CheckoutStep): string {
  switch (step) {
    case "success":
      return "bg-emerald-500 shadow-[0_6px_24px_rgba(16,185,129,0.45)]";
    case "expired":
      return "bg-amber-500 shadow-[0_6px_24px_rgba(245,158,11,0.45)]";
    case "daily_limit":
      return "bg-sky-600 shadow-[0_6px_24px_rgba(2,132,199,0.45)]";
    case "offline_only":
      return "bg-accent shadow-[0_6px_24px_rgba(56,152,212,0.45)]";
    case "sold_out":
    case "failed":
      return "bg-red-500 shadow-[0_6px_24px_rgba(239,68,68,0.45)]";
    default:
      return "bg-[#1A80C1] shadow-[0_6px_24px_rgba(26,128,193,0.45)]";
  }
}

export const ArkivPendingPaymentChip = ({
  open,
  step,
  vaData,
  onResume,
  onDismiss,
}: ArkivPendingPaymentChipProps) => {
  const { t } = useTranslation("lfk-x-arkiv");
  const [showTip, setShowTip] = useState(true);
  const countdown = usePaymentCountdown(
    step === "paying" ? (vaData.expiredDate ?? null) : null,
  );
  const tone = stepTone(step);
  const isQris = vaData.paymentChannelCode === "QRIS";

  const statusText =
    step === "paying"
      ? t("payment.pendingChip.statusPaying")
      : step === "success"
        ? t("payment.pendingChip.statusSuccess")
        : step === "expired"
          ? t("payment.pendingChip.statusExpired")
          : step === "daily_limit"
            ? t("payment.pendingChip.statusDailyLimit")
            : step === "offline_only"
              ? t("payment.pendingChip.statusOfflineOnly")
              : step === "sold_out"
                ? t("payment.pendingChip.statusSoldOut")
                : t("payment.pendingChip.statusFailed");

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.7, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 20 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="fixed bottom-6 left-5 z-[60] flex flex-col items-start gap-3 sm:bottom-8 sm:left-8"
        >
          {/* Tooltip di atas FAB kiri — tidak bentrok dengan WA kanan */}
          <AnimatePresence>
            {showTip ? (
              <motion.button
                type="button"
                onClick={onResume}
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.22 }}
                className="relative w-[min(230px,calc(100vw-5.5rem))] rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-left shadow-[0_12px_40px_rgba(15,23,42,0.18)]"
              >
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1A80C1]">
                  {t("payment.pendingChip.eyebrow")}
                </p>
                <p className="mt-1 text-sm font-black leading-snug tracking-tight text-slate-900">
                  {statusText}
                </p>
                <p className="mt-1.5 truncate text-xs font-semibold text-slate-500">
                  {isQris
                    ? t("payment.pendingChip.channelQris")
                    : `${t("payment.pendingChip.channelVa")} · ${vaData.virtualAccountBank || "VA"}`}
                  {" · "}
                  {formatRupiah(vaData.grandTotal)}
                </p>
                {step === "paying" && countdown.label ? (
                  <p className="mt-1 font-mono text-xs font-bold tabular-nums text-slate-800">
                    {t("payment.pendingChip.timeLeft")} {countdown.label}
                  </p>
                ) : null}
                <p className="mt-2 text-[11px] font-bold text-[#1A80C1]">
                  {t("payment.pendingChip.tapHint")}
                </p>
                <div className="absolute -bottom-[5px] left-7 size-2.5 rotate-45 border-r border-b border-slate-200/80 bg-white" />
              </motion.button>
            ) : null}
          </AnimatePresence>

          <div className="relative">
            <motion.button
              type="button"
              aria-label={statusText}
              onClick={onResume}
              onMouseEnter={() => setShowTip(true)}
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className={`relative flex size-14 items-center justify-center rounded-full text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1A80C1] focus-visible:ring-offset-2 sm:size-[60px] ${tone}`}
            >
              {step === "paying" ? (
                <span
                  className="absolute inset-0 rounded-full bg-[#1A80C1] opacity-25 animate-ping"
                  style={{ animationDuration: "2.5s" }}
                  aria-hidden
                />
              ) : null}
              {step === "paying" ? (
                <Clock3 className="relative size-6" strokeWidth={2.25} />
              ) : (
                <CreditCard className="relative size-6" strokeWidth={2.25} />
              )}
            </motion.button>

            <button
              type="button"
              aria-label={t("payment.pendingChip.dismissAria")}
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:bg-slate-50 hover:text-slate-800"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
};
