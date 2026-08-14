import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  AlertTriangle,
  Building2,
  CalendarClock,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  MapPin,
  PackageX,
  QrCode,
  RefreshCw,
  ShieldCheck,
  TimerOff,
  X,
  XCircle,
} from "lucide-react";
import {
  ACTIVE_ARKIV_BILLING,
  ARKIV_QRIS_ENABLED,
  ARKIV_VA_BANKS,
  arkivAmountFor,
  buildArkivOrderId,
  getArkivVaBank,
  type ArkivPaymentMethod,
  type ArkivVaBankCode,
} from "../../../config/arkiv-billing";
import { useInvoicePaymentStatus } from "../../../hooks/useInvoicePaymentStatus";
import { usePaymentCountdown } from "../../../hooks/usePaymentCountdown";
import type { CheckoutStep } from "../../../hooks/useCreateInvoiceVa";
import type {
  CreateInvoiceQrisPayload,
  CreateInvoiceVaPayload,
  InvoiceVaData,
} from "../../../types/invoice";
import {
  cancelInvoiceVa,
  InvoiceApiError,
  isArkivPurchaseUnavailable,
  syncInvoicePaymentStatus,
  type ArkivStockData,
} from "../../../services/invoice.service";
import { formatRupiah } from "../../../utils/format-currency";
import { formatVaExpiredDate } from "../../../utils/format-va-expired-date";
import { Button } from "../../ui/Button";
import { QrisQrImage } from "../../ui/QrisQrImage";

interface ArkivCheckoutModalProps {
  open: boolean;
  step: CheckoutStep;
  onClose: () => void;
  onCreateVA: (payload: CreateInvoiceVaPayload) => Promise<void>;
  onCreateQris: (payload: CreateInvoiceQrisPayload) => Promise<void>;
  onMarkPaid: () => void;
  onMarkExpired: () => void;
  onMarkFailed: () => void;
  onMarkDailyLimit: () => void;
  onMarkSoldOut: () => void;
  onMarkOfflineOnly: () => void;
  onRetry: () => void;
  onPaymentComplete: () => void;
  isLoading: boolean;
  error: string | null;
  vaData: InvoiceVaData | null;
  stock?: ArkivStockData | null;
  disabled?: boolean;
}

export const ArkivCheckoutModal = ({
  open,
  step,
  onClose,
  onCreateVA,
  onCreateQris,
  onMarkPaid,
  onMarkExpired,
  onMarkFailed,
  onMarkDailyLimit,
  onMarkSoldOut,
  onMarkOfflineOnly,
  onRetry,
  onPaymentComplete,
  isLoading,
  error,
  vaData,
  stock = null,
  disabled = false,
}: ArkivCheckoutModalProps) => {
  const { t } = useTranslation("lfk-x-arkiv");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<ArkivPaymentMethod>("VA");
  const [bankCode, setBankCode] = useState<ArkivVaBankCode>(
    ACTIVE_ARKIV_BILLING.defaultBankCode,
  );
  const [copiedField, setCopiedField] = useState<"va" | "amount" | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [cancelError, setCancelError] = useState<string | null>(null);

  const effectiveMethod: ArkivPaymentMethod =
    ARKIV_QRIS_ENABLED && method === "QRIS" ? "QRIS" : "VA";
  const total = arkivAmountFor(effectiveMethod);
  const isQrisPayment = vaData?.paymentChannelCode === "QRIS";
  const paidBank =
    getArkivVaBank(vaData?.virtualAccountBank) ??
    getArkivVaBank(vaData?.paymentChannelCode);
  const purchaseUnavailable = isArkivPurchaseUnavailable(stock);
  const formLocked = disabled || purchaseUnavailable;

  const { isChecking, checkError, checkStatus } = useInvoicePaymentStatus({
    orderId: vaData?.orderId ?? null,
    // Soft-terminal (expired/failed): tetap poll sebentar untuk late PAID.
    enabled:
      open &&
      (step === "paying" || step === "expired" || step === "failed"),
    expiredDate:
      open && step === "paying" ? (vaData?.expiredDate ?? null) : null,
    onPaid: onMarkPaid,
    onExpired: onMarkExpired,
    onFailed: onMarkFailed,
    onDailyLimit: onMarkDailyLimit,
    onSoldOut: onMarkSoldOut,
    onOfflineOnly: onMarkOfflineOnly,
  });

  const countdown = usePaymentCountdown(
    open && step === "paying" ? (vaData?.expiredDate ?? null) : null,
  );

  const showSuccess = step === "success";
  const showExpired = step === "expired";
  const showFailed = step === "failed";
  const showDailyLimit = step === "daily_limit";
  const showSoldOut = step === "sold_out";
  const showOfflineOnly = step === "offline_only";
  const showTerminalBlock =
    showExpired || showFailed || showDailyLimit || showSoldOut || showOfflineOnly;
  const countdownUrgent =
    countdown.remainingMs != null &&
    countdown.remainingMs > 0 &&
    countdown.remainingMs <= 2 * 60 * 1000;

  useEffect(() => {
    if (step === "paying") setCancelError(null);
  }, [step]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const handleCopyVa = async () => {
    if (!vaData?.virtualAccountNo) return;
    try {
      await navigator.clipboard.writeText(vaData.virtualAccountNo);
      setCopiedField("va");
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const handleCopyAmount = async () => {
    if (vaData?.grandTotal == null) return;
    try {
      // Angka polos (tanpa Rp / titik) — cocok tempel di form transfer bank.
      await navigator.clipboard.writeText(String(vaData.grandTotal));
      setCopiedField("amount");
      window.setTimeout(() => setCopiedField(null), 2000);
    } catch {
      setCopiedField(null);
    }
  };

  const handleCancelPayment = async () => {
    if (!vaData?.orderId || cancelling) return;

    const ok = window.confirm(t("payment.modal.cancelConfirm"));
    if (!ok) return;

    setCancelling(true);
    setCancelError(null);
    try {
      await cancelInvoiceVa(vaData.orderId);
      onRetry();
    } catch (err) {
      const message =
        err instanceof InvoiceApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Gagal membatalkan pembayaran.";

      // Race: mungkin sudah PAID / EXPIRED di server — cek dulu, jangan langsung buat tagihan baru.
      if (
        err instanceof InvoiceApiError &&
        (err.statusCode === 409 || /cannot be cancelled/i.test(message))
      ) {
        try {
          const synced = await syncInvoicePaymentStatus(vaData.orderId);
          if (synced.newStatus === "PAID") {
            onMarkPaid();
            return;
          }
          if (
            synced.newStatus === "EXPIRED" ||
            synced.newStatus === "FAILED"
          ) {
            if (synced.blockReason === "SOLD_OUT") onMarkSoldOut();
            else if (synced.blockReason === "DAILY_LIMIT") onMarkDailyLimit();
            else if (synced.newStatus === "EXPIRED") onMarkExpired();
            else onMarkFailed();
            return;
          }
        } catch {
          /* fall through */
        }
        setCancelError(
          "Tagihan tidak bisa dibatalkan (mungkin sudah berstatus akhir). Cek status pembayaran dulu.",
        );
        return;
      }

      setCancelError(message);
    } finally {
      setCancelling(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || formLocked) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedAddress = address.trim();

    if (ARKIV_QRIS_ENABLED && method === "QRIS") {
      await onCreateQris({
        orderId: buildArkivOrderId(),
        grandTotal: arkivAmountFor("QRIS"),
        customerName: trimmedName,
        customerEmail: trimmedEmail,
        customerPhone: trimmedPhone,
        customerAddress: trimmedAddress,
        notes: ACTIVE_ARKIV_BILLING.productLabel,
      });
      return;
    }

    await onCreateVA({
      orderId: buildArkivOrderId(),
      grandTotal: arkivAmountFor("VA"),
      bankCode,
      customerNo: ACTIVE_ARKIV_BILLING.customerNo,
      virtualAccountName: trimmedName,
      virtualAccountEmail: trimmedEmail,
      virtualAccountPhone: trimmedPhone,
      customerAddress: trimmedAddress,
      notes: ACTIVE_ARKIV_BILLING.productLabel,
    });
  };

  const orderSummary = (
    <aside className="space-y-5 rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-100 lg:sticky lg:top-0">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          {t("payment.checkout.summaryHeading")}
        </p>
        {stock && purchaseUnavailable ? (
          <p className="shrink-0 rounded-full bg-red-100 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-red-700">
            {t("product.soldOut")}
          </p>
        ) : null}
      </div>
      <div className="flex gap-4">
        <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-slate-200">
          <img
            src={ACTIVE_ARKIV_BILLING.productImage}
            alt=""
            className="size-full object-contain p-1"
          />
          
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-black leading-snug text-slate-900">
            {ACTIVE_ARKIV_BILLING.productLabel}
          </p>
          <p className="mt-2 text-sm font-bold text-slate-700">{formatRupiah(total)}</p>
        </div>
      </div>
      <div className="space-y-2 border-t border-slate-200 pt-4 text-sm">
        <div className="flex justify-between text-slate-600">
          <span>{t("payment.checkout.subtotalLabel")}</span>
          <span className="font-semibold">{formatRupiah(total)}</span>
        </div>
        <div className="flex items-end justify-between pt-1">
          <span className="text-base font-black text-slate-900">{t("payment.totalLabel")}</span>
          <span className="text-xl font-black tracking-tight text-slate-900">
            {formatRupiah(showSuccess && vaData ? vaData.grandTotal : total)}
          </span>
        </div>
      </div>
    </aside>
  );

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-4">
          <motion.button
            type="button"
            aria-label={t("payment.checkout.closeAria")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 sm:bg-slate-900/55 sm:backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.28, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-[1] flex max-h-[min(88vh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-[1.75rem] border border-white/40 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <p className="text-sm font-black tracking-tight text-slate-900 sm:text-base">
                {t("payment.checkout.brand")}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
              {showSuccess && vaData ? (
                <div className="mx-auto flex max-w-md flex-col items-center py-8 text-center">
                  <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
                    <CheckCircle2 className="size-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900">
                    {t("payment.modal.successHeading")}
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                    {t("payment.modal.successDescPart1")}{" "}
                    <span className="font-bold text-slate-900">{vaData.orderId}</span>{" "}
                    {t("payment.modal.successDescPart2")}{" "}
                    <span className="font-bold text-slate-900">
                      {formatRupiah(vaData.grandTotal)}
                    </span>{" "}
                    {t("payment.modal.successDescPart3")}
                  </p>
                  <p className="mt-4 max-w-sm rounded-2xl bg-slate-50 px-4 py-3 text-left text-xs font-medium leading-relaxed text-slate-600 ring-1 ring-slate-100">
                    {t("payment.modal.successTip")}
                  </p>
                  <Button
                    type="button"
                    className="mt-8 w-full bg-slate-900 py-4 text-white hover:bg-slate-800"
                    onClick={onPaymentComplete}
                  >
                    {t("payment.modal.finishBtn")}
                  </Button>
                </div>
              ) : showTerminalBlock && (vaData || showDailyLimit || showSoldOut || showOfflineOnly) ? (
                <div className="mx-auto flex max-w-md flex-col items-center py-8 text-center">
                  <div
                    className={`mb-6 flex size-20 items-center justify-center rounded-full ring-8 ${
                      showDailyLimit
                        ? "bg-sky-100 ring-sky-50"
                        : showOfflineOnly
                          ? "bg-accent/10 ring-accent/20"
                          : showSoldOut
                            ? "bg-slate-100 ring-slate-50"
                            : showExpired
                              ? "bg-amber-100 ring-amber-50"
                              : "bg-red-100 ring-red-50"
                    }`}
                  >
                    {showDailyLimit ? (
                      <CalendarClock className="size-10 text-sky-700" />
                    ) : showOfflineOnly ? (
                      <MapPin className="size-10 text-accent" />
                    ) : showSoldOut ? (
                      <PackageX className="size-10 text-slate-700" />
                    ) : showExpired ? (
                      <TimerOff className="size-10 text-amber-700" />
                    ) : (
                      <XCircle className="size-10 text-red-600" />
                    )}
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900">
                    {showDailyLimit
                      ? t("payment.modal.dailyLimitHeading")
                      : showOfflineOnly
                        ? t("payment.modal.offlineOnlyHeading")
                        : showSoldOut
                          ? t("payment.modal.soldOutHeading")
                          : showExpired
                            ? t("payment.modal.expiredHeading")
                            : t("payment.modal.failedHeading")}
                  </h2>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                    {showDailyLimit
                      ? t("payment.modal.dailyLimitDesc")
                      : showOfflineOnly
                        ? t("payment.modal.offlineOnlyDesc")
                        : showSoldOut
                          ? t("payment.modal.soldOutDesc")
                          : showExpired
                            ? t("payment.modal.expiredDesc")
                            : t("payment.modal.failedDesc")}
                  </p>
                  {showDailyLimit || showSoldOut || showOfflineOnly ? (
                    <p className="mt-4 max-w-sm rounded-2xl bg-slate-50 px-4 py-3 text-left text-xs font-medium leading-relaxed text-slate-600 ring-1 ring-slate-100">
                      {showDailyLimit
                        ? t("payment.modal.dailyLimitTip")
                        : showOfflineOnly
                          ? t("payment.modal.offlineOnlyTip")
                          : t("payment.modal.soldOutTip")}
                    </p>
                  ) : null}
                  {vaData ? (
                    <p className="mt-4 text-xs font-bold text-slate-500">
                      {t("payment.modal.docLabel")} {vaData.orderId}
                    </p>
                  ) : null}
                  <div className="mt-8 flex w-full flex-col gap-3">
                    {showDailyLimit || showSoldOut || showOfflineOnly ? null : (
                      <Button
                        type="button"
                        className="w-full bg-slate-900 py-4 text-white hover:bg-slate-800"
                        onClick={onRetry}
                      >
                        {t("payment.modal.retryBtn")}
                      </Button>
                    )}
                    <button
                      type="button"
                      onClick={onClose}
                      className={`w-full rounded-full py-3 text-sm font-bold transition ${
                        showDailyLimit || showSoldOut || showOfflineOnly
                          ? "bg-slate-900 py-4 text-white hover:bg-slate-800"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      {showDailyLimit
                        ? t("payment.modal.dailyLimitCloseBtn")
                        : showOfflineOnly
                          ? t("payment.modal.offlineOnlyCloseBtn")
                          : showSoldOut
                            ? t("payment.modal.soldOutCloseBtn")
                            : t("payment.modal.closeFailBtn")}
                    </button>
                  </div>
                </div>
              ) : step === "paying" && vaData ? (
                <div className="space-y-6">
                  <div className="xl:hidden">{orderSummary}</div>
                  <div className="grid items-start gap-8 xl:grid-cols-[1.15fr_0.85fr]">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">
                      {t("payment.modal.instructionBadge")}
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                      {isQrisPayment
                        ? t("payment.checkout.payingQrisHeading")
                        : t("payment.checkout.payingVaHeading")}
                    </h2>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
                        <CreditCard className="size-4" />
                        {t("payment.modal.waitingBadge")}
                      </div>
                      {countdown.label ? (
                        <div
                          className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-black uppercase tracking-wider ring-1 ${
                            countdownUrgent
                              ? "bg-red-50 text-red-700 ring-red-200"
                              : "bg-slate-900 text-white ring-slate-900"
                          }`}
                        >
                          <TimerOff className="size-3.5" />
                          {t("payment.modal.countdownLabel")} {countdown.label}
                        </div>
                      ) : null}
                    </div>
                    {countdownUrgent ? (
                      <p className="mt-2 text-xs font-bold text-red-600">
                        {t("payment.modal.countdownUrgent")}
                      </p>
                    ) : null}

                    <div className="mt-5 space-y-4">
                      <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {t("payment.modal.nominalLabel")}
                        </p>
                        <div className="mt-1 flex items-center gap-3">
                          <p className="min-w-0 flex-1 break-words text-3xl font-black tracking-tight text-slate-900">
                            {formatRupiah(vaData.grandTotal)}
                          </p>
                          <button
                            type="button"
                            onClick={handleCopyAmount}
                            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                            aria-label={t("payment.modal.copyAmountBtn")}
                          >
                            {copiedField === "amount" ? (
                              <>
                                <Check className="size-4 text-green-400" />{" "}
                                {t("payment.modal.copiedBtn")}
                              </>
                            ) : (
                              <>
                                <Copy className="size-4" />{" "}
                                {t("payment.modal.copyAmountBtn")}
                              </>
                            )}
                          </button>
                        </div>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {t("payment.modal.docLabel")} {vaData.orderId}
                        </p>
                      </div>

                      {countdown.label ? (
                        <div
                          className={`rounded-2xl p-4 ring-1 ${
                            countdownUrgent
                              ? "bg-red-50 ring-red-100"
                              : "bg-[#1A80C1]/8 ring-[#1A80C1]/20"
                          }`}
                        >
                          <p
                            className={`text-[10px] font-black uppercase tracking-widest ${
                              countdownUrgent ? "text-red-500" : "text-[#1A80C1]"
                            }`}
                          >
                            {t("payment.modal.countdownLabel")}
                          </p>
                          <p
                            className={`mt-1 font-mono text-4xl font-black tracking-tight tabular-nums ${
                              countdownUrgent ? "text-red-700" : "text-slate-900"
                            }`}
                          >
                            {countdown.label}
                          </p>
                          {vaData.expiredDate ? (
                            <p className="mt-2 text-xs font-semibold text-slate-500">
                              {t("payment.modal.expiredLabel")}:{" "}
                              {formatVaExpiredDate(vaData.expiredDate)}
                            </p>
                          ) : null}
                        </div>
                      ) : null}

                      {isQrisPayment && vaData.qrisContent ? (
                        <div className="flex flex-col items-center rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-5">
                          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {t("payment.modal.qrisLabel")}
                          </p>
                          <QrisQrImage content={vaData.qrisContent} size={260} />
                          {!countdown.label && vaData.expiredDate ? (
                            <p className="mt-3 text-xs font-semibold text-slate-500">
                              {t("payment.modal.expiredLabel")}:{" "}
                              {formatVaExpiredDate(vaData.expiredDate)}
                            </p>
                          ) : null}
                        </div>
                      ) : (
                        <>
                          <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                              {t("payment.modal.bankLabel")}
                            </p>
                            <p className="mt-1 flex items-center gap-2.5 text-lg font-black text-slate-900">
                              {paidBank ? (
                                <img
                                  src={paidBank.logo}
                                  alt={paidBank.label}
                                  className="h-10 w-auto max-w-[7.5rem] object-contain"
                                />
                              ) : (
                                <Building2 className="size-5 text-accent" />
                              )}
                              <span>{vaData.virtualAccountBank}</span>
                            </p>
                          </div>

                          {!countdown.label && vaData.expiredDate ? (
                            <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                {t("payment.modal.expiredLabel")}
                              </p>
                              <p className="mt-1 text-sm font-bold text-slate-900">
                                {formatVaExpiredDate(vaData.expiredDate)}
                              </p>
                            </div>
                          ) : null}

                          <div className="rounded-2xl border-2 border-dashed border-accent/30 bg-accent/5 p-4">
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                              {t("payment.modal.vaLabel")}
                            </p>
                            <div className="mt-2 flex items-center gap-3">
                              <p className="min-w-0 flex-1 break-all font-mono text-xl font-black tracking-wider text-slate-900 sm:text-2xl">
                                {vaData.virtualAccountNo}
                              </p>
                              <button
                                type="button"
                                onClick={handleCopyVa}
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                              >
                                {copiedField === "va" ? (
                                  <>
                                    <Check className="size-4 text-green-400" />{" "}
                                    {t("payment.modal.copiedBtn")}
                                  </>
                                ) : (
                                  <>
                                    <Copy className="size-4" /> {t("payment.modal.copyBtn")}
                                  </>
                                )}
                              </button>
                            </div>
                          </div>

                          <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
                            <p className="flex items-start gap-2 text-sm font-black text-amber-900">
                              <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                              {t("payment.modal.vaTransferGuide.title")}
                            </p>
                            <p className="mt-2 text-xs font-semibold leading-relaxed text-amber-900/80">
                              {t("payment.modal.vaTransferGuide.intro")}
                            </p>
                            <ul className="mt-3 space-y-3 text-xs leading-relaxed text-slate-700">
                              <li>
                                <p className="font-black text-slate-900">
                                  {t("payment.modal.vaTransferGuide.flexibleTitle")}
                                </p>
                                <p className="mt-0.5 font-medium">
                                  {t("payment.modal.vaTransferGuide.flexibleDesc")}
                                </p>
                              </li>
                              <li>
                                <p className="font-black text-slate-900">
                                  {t("payment.modal.vaTransferGuide.bcaTitle")}
                                </p>
                                <p className="mt-0.5 font-medium">
                                  {t("payment.modal.vaTransferGuide.bcaDesc")}
                                </p>
                              </li>
                              <li>
                                <p className="font-black text-slate-900">
                                  {t("payment.modal.vaTransferGuide.sameBankTitle")}
                                </p>
                                <p className="mt-0.5 font-medium">
                                  {t("payment.modal.vaTransferGuide.sameBankDesc")}
                                </p>
                              </li>
                            </ul>
                            <p className="mt-3 border-t border-amber-200/80 pt-3 text-xs font-semibold leading-relaxed text-amber-900/90">
                              {t("payment.modal.vaTransferGuide.tip")}
                            </p>
                          </div>
                        </>
                      )}
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        type="button"
                        onClick={() => checkStatus()}
                        disabled={isChecking || cancelling}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-slate-200 bg-white py-3.5 text-sm font-bold text-slate-800 transition hover:border-accent hover:text-accent disabled:opacity-60"
                      >
                        {isChecking ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />{" "}
                            {t("payment.modal.checkingBtn")}
                          </>
                        ) : (
                          <>
                            <RefreshCw className="size-4" /> {t("payment.modal.checkBtn")}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleCancelPayment()}
                        disabled={cancelling || isChecking}
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 py-3.5 text-sm font-bold text-red-700 transition hover:bg-red-100 disabled:opacity-60"
                      >
                        {cancelling ? (
                          <>
                            <Loader2 className="size-4 animate-spin" />{" "}
                            {t("payment.modal.cancellingBtn")}
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="size-4" />{" "}
                            {t("payment.modal.cancelBtn")}
                          </>
                        )}
                      </button>
                      {checkError || cancelError ? (
                        <p className="text-center text-xs font-semibold text-red-600">
                          {cancelError ?? checkError}
                        </p>
                      ) : (
                        <p className="text-center text-xs leading-relaxed text-slate-500">
                          {t("payment.modal.cancelHint")}
                          <br />
                          {t("payment.modal.autoUpdateNote")}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="hidden min-w-0 xl:block">{orderSummary}</div>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]"
                >
                  <div className="min-w-0 space-y-7">
                    <section>
                      <h2 className="text-lg font-black tracking-tight text-slate-900">
                        {t("payment.checkout.contactHeading")}
                      </h2>
                      <div className="mt-4 space-y-3">
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-bold text-slate-500">
                            {t("payment.form.nameLabel")}
                          </span>
                          <input
                            type="text"
                            required
                            disabled={isLoading || formLocked}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={t("payment.form.namePlaceholder")}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-bold text-slate-500">
                            {t("payment.form.emailLabel")}
                          </span>
                          <input
                            type="email"
                            required
                            disabled={isLoading || formLocked}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={t("payment.form.emailPlaceholder")}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-bold text-slate-500">
                            {t("payment.form.phoneLabel")}
                          </span>
                          <input
                            type="tel"
                            required
                            disabled={isLoading || formLocked}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t("payment.form.phonePlaceholder")}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                          />
                        </label>
                        <label className="block">
                          <span className="mb-1.5 block text-xs font-bold text-slate-500">
                            {t("payment.form.addressLabel")}
                          </span>
                          <textarea
                            required
                            rows={3}
                            disabled={isLoading || formLocked}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={t("payment.form.addressPlaceholder")}
                            maxLength={500}
                            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                          />
                        </label>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-lg font-black tracking-tight text-slate-900">
                        {t("payment.checkout.methodHeading")}
                      </h2>
                      <div
                        className={`mt-4 grid gap-3 ${
                          ARKIV_QRIS_ENABLED ? "sm:grid-cols-2" : "sm:grid-cols-1"
                        }`}
                      >
                        {ARKIV_QRIS_ENABLED ? (
                          <button
                            type="button"
                            disabled={isLoading || formLocked}
                            onClick={() => setMethod("QRIS")}
                            className={`rounded-2xl border px-4 py-4 text-left transition ${
                              method === "QRIS"
                                ? "border-accent bg-accent/10 ring-2 ring-accent/25"
                                : "border-slate-200 bg-white hover:border-slate-300"
                            } disabled:opacity-60`}
                          >
                            <span className="flex items-center gap-2 text-sm font-black text-slate-900">
                              <QrCode className="size-4 text-accent" />
                              {t("payment.checkout.methodQris")}
                            </span>
                            <span className="mt-1 block text-xs font-medium text-slate-500">
                              {t("payment.checkout.methodQrisHint")}
                            </span>
                            <span className="mt-2 block text-sm font-bold text-slate-800">
                              {formatRupiah(ACTIVE_ARKIV_BILLING.amounts.QRIS)}
                            </span>
                          </button>
                        ) : null}
                        <button
                          type="button"
                          disabled={isLoading || formLocked}
                          onClick={() => setMethod("VA")}
                          className={`rounded-2xl border px-4 py-4 text-left transition ${
                            effectiveMethod === "VA"
                              ? "border-accent bg-accent/10 ring-2 ring-accent/25"
                              : "border-slate-200 bg-white hover:border-slate-300"
                          } disabled:opacity-60`}
                        >
                          <span className="flex items-center gap-2 text-sm font-black text-slate-900">
                            <Building2 className="size-4 text-accent" />
                            {t("payment.checkout.methodVa")}
                          </span>
                          <span className="mt-1 block text-xs font-medium text-slate-500">
                            {t("payment.checkout.methodVaHint")}
                          </span>
                          <span className="mt-2 block text-sm font-bold text-slate-800">
                            {formatRupiah(ACTIVE_ARKIV_BILLING.amounts.VA)}
                          </span>
                        </button>
                      </div>

                      {effectiveMethod === "VA" ? (
                        <fieldset className="mt-5">
                          <legend className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">
                            {t("payment.checkout.bankHeading")}
                          </legend>
                          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                            {ARKIV_VA_BANKS.map((bank) => {
                              const selected = bankCode === bank.code;
                              return (
                                <button
                                  key={bank.code}
                                  type="button"
                                  disabled={isLoading || formLocked}
                                  onClick={() => setBankCode(bank.code)}
                                  className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-sm font-black transition ${
                                    selected
                                      ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/30"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                  } disabled:opacity-60`}
                                >
                                  <span className="flex h-12 w-full items-center justify-center">
                                    <img
                                      src={bank.logo}
                                      alt=""
                                      className="max-h-11 max-w-[7.5rem] object-contain"
                                    />
                                  </span>
                                  <span>{bank.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                      ) : null}
                    </section>

                    <div className="rounded-2xl bg-amber-50 p-4 ring-1 ring-amber-200">
                      <p className="flex items-start gap-2 text-sm font-black text-amber-900">
                        <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-600" />
                        {t("payment.modal.vaTransferGuide.title")}
                      </p>
                      <p className="mt-2 text-xs font-semibold leading-relaxed text-amber-900/80">
                        {t("payment.modal.vaTransferGuide.intro")}
                      </p>
                      <ul className="mt-3 space-y-3 text-xs leading-relaxed text-slate-700">
                        <li>
                          <p className="font-black text-slate-900">
                            {t("payment.modal.vaTransferGuide.flexibleTitle")}
                          </p>
                          <p className="mt-0.5 font-medium">
                            {t("payment.modal.vaTransferGuide.flexibleDesc")}
                          </p>
                        </li>
                        <li>
                          <p className="font-black text-slate-900">
                            {t("payment.modal.vaTransferGuide.bcaTitle")}
                          </p>
                          <p className="mt-0.5 font-medium">
                            {t("payment.modal.vaTransferGuide.bcaDesc")}
                          </p>
                        </li>
                        <li>
                          <p className="font-black text-slate-900">
                            {t("payment.modal.vaTransferGuide.sameBankTitle")}
                          </p>
                          <p className="mt-0.5 font-medium">
                            {t("payment.modal.vaTransferGuide.sameBankDesc")}
                          </p>
                        </li>
                      </ul>
                      <p className="mt-3 border-t border-amber-200/80 pt-3 text-xs font-semibold leading-relaxed text-amber-900/90">
                        {t("payment.modal.vaTransferGuide.tip")}
                      </p>
                    </div>

                    <div className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-semibold text-slate-600">
                      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" />
                      {t("payment.checkout.secureNote")}
                    </div>

                    {error ? (
                      <p
                        role="alert"
                        className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
                      >
                        {error}
                      </p>
                    ) : null}

                    <Button
                      type="submit"
                      disabled={isLoading || formLocked}
                      className="w-full bg-slate-900 py-4 text-base text-white hover:bg-slate-800"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-5 animate-spin" />
                          {t("payment.form.loadingBtn")}
                        </>
                      ) : (
                        <>
                          {t("payment.checkout.payBtn")} · {formatRupiah(total)}
                        </>
                      )}
                    </Button>
                  </div>

                  {orderSummary}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
