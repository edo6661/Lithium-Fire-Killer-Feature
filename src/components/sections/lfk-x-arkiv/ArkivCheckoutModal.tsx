import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Building2,
  Check,
  CheckCircle2,
  Copy,
  CreditCard,
  Loader2,
  QrCode,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  ACTIVE_ARKIV_BILLING,
  ARKIV_QRIS_ENABLED,
  ARKIV_VA_BANKS,
  arkivAmountFor,
  buildArkivOrderId,
  type ArkivPaymentMethod,
  type ArkivVaBankCode,
} from "../../../config/arkiv-billing";
import { useInvoicePaymentStatus } from "../../../hooks/useInvoicePaymentStatus";
import type { CheckoutStep } from "../../../hooks/useCreateInvoiceVa";
import type {
  CreateInvoiceQrisPayload,
  CreateInvoiceVaPayload,
  InvoiceVaData,
} from "../../../types/invoice";
import type { ArkivStockData } from "../../../services/invoice.service";
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
  const [method, setMethod] = useState<ArkivPaymentMethod>("VA");
  const [bankCode, setBankCode] = useState<ArkivVaBankCode>(
    ACTIVE_ARKIV_BILLING.defaultBankCode,
  );
  const [copied, setCopied] = useState(false);

  const effectiveMethod: ArkivPaymentMethod =
    ARKIV_QRIS_ENABLED && method === "QRIS" ? "QRIS" : "VA";
  const total = arkivAmountFor(effectiveMethod);
  const isQrisPayment = vaData?.paymentChannelCode === "QRIS";

  const { isPaid, isChecking, checkError, checkStatus } = useInvoicePaymentStatus({
    orderId: vaData?.orderId ?? null,
    enabled: open && step === "paying" && vaData?.status !== "PAID",
    onPaid: onMarkPaid,
  });

  const showSuccess = step === "success";

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
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading || disabled) return;

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();

    if (ARKIV_QRIS_ENABLED && method === "QRIS") {
      await onCreateQris({
        orderId: buildArkivOrderId(),
        grandTotal: arkivAmountFor("QRIS"),
        customerName: trimmedName,
        customerEmail: trimmedEmail,
        customerPhone: trimmedPhone,
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
      notes: ACTIVE_ARKIV_BILLING.productLabel,
    });
  };

  const orderSummary = (
    <aside className="space-y-5 rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-100 lg:sticky lg:top-0">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          {t("payment.checkout.summaryHeading")}
        </p>
        {stock ? (
          <p
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
              stock.soldOut
                ? "bg-red-100 text-red-700"
                : "bg-accent/15 text-accent"
            }`}
          >
            {stock.soldOut
              ? t("product.soldOut")
              : `${stock.quantityRemaining}/${stock.quantityInitial}`}
          </p>
        ) : null}
      </div>
      {stock && !stock.soldOut ? (
        <p className="-mt-2 text-xs font-semibold text-slate-500">
          {t("payment.checkout.stockLabel")}:{" "}
          {t("product.stockHint", {
            remaining: stock.quantityRemaining,
            initial: stock.quantityInitial,
          })}
        </p>
      ) : null}
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
            className="absolute inset-0 bg-slate-900/55 backdrop-blur-sm"
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
              ) : step === "paying" && vaData ? (
                <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent">
                      {t("payment.modal.instructionBadge")}
                    </p>
                    <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">
                      {isQrisPayment
                        ? t("payment.checkout.payingQrisHeading")
                        : t("payment.checkout.payingVaHeading")}
                    </h2>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-amber-700 ring-1 ring-amber-200">
                      <CreditCard className="size-4" />
                      {t("payment.modal.waitingBadge")}
                    </div>

                    <div className="mt-5 space-y-4">
                      <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                          {t("payment.modal.nominalLabel")}
                        </p>
                        <p className="mt-1 text-3xl font-black tracking-tight text-slate-900">
                          {formatRupiah(vaData.grandTotal)}
                        </p>
                        <p className="mt-1 text-xs font-medium text-slate-500">
                          {t("payment.modal.docLabel")} {vaData.orderId}
                        </p>
                      </div>

                      {isQrisPayment && vaData.qrisContent ? (
                        <div className="flex flex-col items-center rounded-2xl border border-dashed border-accent/30 bg-accent/5 p-5">
                          <p className="mb-3 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            {t("payment.modal.qrisLabel")}
                          </p>
                          <QrisQrImage content={vaData.qrisContent} size={260} />
                          {vaData.expiredDate ? (
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
                            <p className="mt-1 flex items-center gap-2 text-lg font-black text-slate-900">
                              <Building2 className="size-5 text-accent" />
                              {vaData.virtualAccountBank}
                            </p>
                          </div>

                          {vaData.expiredDate ? (
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
                              <p className="flex-1 break-all font-mono text-xl font-black tracking-wider text-slate-900 sm:text-2xl">
                                {vaData.virtualAccountNo}
                              </p>
                              <button
                                type="button"
                                onClick={handleCopyVa}
                                className="inline-flex shrink-0 items-center gap-2 rounded-full bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
                              >
                                {copied ? (
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
                        </>
                      )}
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        type="button"
                        onClick={() => checkStatus()}
                        disabled={isChecking}
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
                      {checkError ? (
                        <p className="text-center text-xs font-semibold text-red-600">
                          {checkError}
                        </p>
                      ) : (
                        <p className="text-center text-xs leading-relaxed text-slate-500">
                          {t("payment.modal.autoUpdateNote")}
                        </p>
                      )}
                    </div>
                  </div>
                  {orderSummary}
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"
                >
                  <div className="space-y-7">
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
                            disabled={isLoading || disabled}
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
                            disabled={isLoading || disabled}
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
                            disabled={isLoading || disabled}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder={t("payment.form.phonePlaceholder")}
                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
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
                            disabled={isLoading || disabled}
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
                          disabled={isLoading || disabled}
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
                                  disabled={isLoading || disabled}
                                  onClick={() => setBankCode(bank.code)}
                                  className={`rounded-xl border px-3 py-3 text-sm font-black transition ${
                                    selected
                                      ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/30"
                                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                                  } disabled:opacity-60`}
                                >
                                  {bank.label}
                                </button>
                              );
                            })}
                          </div>
                        </fieldset>
                      ) : null}
                    </section>

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
                      disabled={isLoading || disabled}
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
