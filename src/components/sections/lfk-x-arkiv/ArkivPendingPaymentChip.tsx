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

function stepTone(step: CheckoutStep): {
  badge: string;
  ring: string;
} {
  switch (step) {
    case "success":
      return { badge: "bg-emerald-500", ring: "ring-emerald-200/80" };
    case "expired":
      return { badge: "bg-amber-500", ring: "ring-amber-200/80" };
    case "failed":
      return { badge: "bg-red-500", ring: "ring-red-200/80" };
    default:
      return { badge: "bg-[#1A80C1]", ring: "ring-[#1A80C1]/25" };
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
          : t("payment.pendingChip.statusFailed");

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[90] flex justify-center p-4 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end"
        >
          <div
            className={`pointer-events-auto relative flex w-full max-w-sm items-stretch overflow-hidden rounded-2xl border border-white/70 bg-white/95 shadow-[0_20px_50px_rgba(15,23,42,0.18)] ring-1 backdrop-blur-xl ${tone.ring}`}
          >
            <div className={`w-1.5 shrink-0 ${tone.badge}`} />
            <button
              type="button"
              onClick={onResume}
              className="min-w-0 flex-1 px-4 py-3.5 text-left transition hover:bg-slate-50/80"
            >
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex size-8 items-center justify-center rounded-xl text-white ${tone.badge}`}
                >
                  {step === "paying" ? (
                    <Clock3 className="size-4" />
                  ) : (
                    <CreditCard className="size-4" />
                  )}
                </span>
                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#1A80C1]">
                    {t("payment.pendingChip.eyebrow")}
                  </p>
                  <p className="truncate text-sm font-black tracking-tight text-slate-900">
                    {statusText}
                  </p>
                </div>
              </div>
              <p className="mt-2 truncate text-xs font-semibold text-slate-500">
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
              ) : (
                <p className="mt-1 truncate font-mono text-[11px] text-slate-400">
                  {vaData.orderId}
                </p>
              )}
              <p className="mt-2 text-[11px] font-bold text-[#1A80C1]">
                {t("payment.pendingChip.tapHint")}
              </p>
            </button>
            <button
              type="button"
              aria-label={t("payment.pendingChip.dismissAria")}
              onClick={(e) => {
                e.stopPropagation();
                onDismiss();
              }}
              className="absolute top-2 right-2 rounded-full p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            >
              <X className="size-3.5" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
