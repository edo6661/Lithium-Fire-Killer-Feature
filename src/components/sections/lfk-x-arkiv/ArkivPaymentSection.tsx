import { useState } from "react";
import { CheckCircle2, Loader2, ShieldCheck, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ACTIVE_ARKIV_BILLING } from "../../../config/arkiv-billing";
import type { CreateInvoiceVaPayload, InvoiceVaData } from "../../../types/invoice";
import { formatRupiah } from "../../../utils/format-currency";
import { AnimateIn } from "../../ui/AnimateIn";
import { Button } from "../../ui/Button";

const BANK_OPTIONS = [
  { code: "BCA", label: "BCA" },
  { code: "BRI", label: "BRI" },
  { code: "MANDIRI", label: "Mandiri" },
] as const;

interface ArkivPaymentSectionProps {
  onCreateVA: (payload: CreateInvoiceVaPayload) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  isPaymentComplete?: boolean;
  vaData?: InvoiceVaData | null;
}

export const ArkivPaymentSection = ({
  onCreateVA,
  isLoading,
  error,
  isPaymentComplete = false,
  vaData,
}: ArkivPaymentSectionProps) => {
  const { t } = useTranslation("lfk-x-arkiv");
  const [bankCode, setBankCode] = useState(ACTIVE_ARKIV_BILLING.bankCode);
  const [virtualAccountName, setVirtualAccountName] = useState("");
  const [virtualAccountEmail, setVirtualAccountEmail] = useState("");
  const [virtualAccountPhone, setVirtualAccountPhone] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLoading) return;

    await onCreateVA({
      orderId: ACTIVE_ARKIV_BILLING.orderId,
      grandTotal: ACTIVE_ARKIV_BILLING.grandTotal,
      bankCode,
      customerNo: ACTIVE_ARKIV_BILLING.customerNo,
      virtualAccountName: virtualAccountName.trim(),
      virtualAccountEmail: virtualAccountEmail.trim(),
      virtualAccountPhone: virtualAccountPhone.trim(),
      notes: ACTIVE_ARKIV_BILLING.productLabel,
    });
  };

  return (
    <section id="payment" className="relative z-10 mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <AnimateIn direction="up">
        <div className="overflow-hidden rounded-[3rem] border border-white/60 bg-white/70 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white">
                <Wallet className="size-3.5" />
                {t("payment.badge")}
              </div>
              <h2 className="text-3xl font-black tracking-tighter text-slate-900 sm:text-4xl">
                {t("payment.heading")}
              </h2>
              <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-slate-600">
                {t("payment.description")}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-900 px-5 py-4 text-right text-white shadow-lg">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {t("payment.totalLabel")}
              </p>
              <p className="mt-1 text-2xl font-black tracking-tight">
                {formatRupiah(ACTIVE_ARKIV_BILLING.grandTotal)}
              </p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {ACTIVE_ARKIV_BILLING.orderId}
              </p>
            </div>
          </div>

          {isPaymentComplete && vaData ? (
            <div className="flex flex-col items-center rounded-[2rem] border border-green-200 bg-green-50 px-6 py-10 text-center">
              <CheckCircle2 className="mb-4 size-12 text-green-600" />
              <h3 className="text-xl font-black text-slate-900">
                {t("payment.successHeading")}
              </h3>
              <p className="mt-2 max-w-md text-sm font-medium text-slate-600">
                {t("payment.successDescPart1")} <span className="font-bold text-slate-900">{vaData.orderId}</span> {t("payment.successDescPart2")} <span className="font-bold text-slate-900">{formatRupiah(vaData.grandTotal)}</span> {t("payment.successDescPart3")}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">
                    {t("payment.form.nameLabel")}
                  </span>
                  <input
                    type="text"
                    required
                    disabled={isLoading}
                    value={virtualAccountName}
                    onChange={(e) => setVirtualAccountName(e.target.value)}
                    placeholder={t("payment.form.namePlaceholder")}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">
                    {t("payment.form.emailLabel")}
                  </span>
                  <input
                    type="email"
                    required
                    disabled={isLoading}
                    value={virtualAccountEmail}
                    onChange={(e) => setVirtualAccountEmail(e.target.value)}
                    placeholder={t("payment.form.emailPlaceholder")}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">
                    {t("payment.form.phoneLabel")}
                  </span>
                  <input
                    type="tel"
                    required
                    disabled={isLoading}
                    value={virtualAccountPhone}
                    onChange={(e) => setVirtualAccountPhone(e.target.value)}
                    placeholder={t("payment.form.phonePlaceholder")}
                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                  />
                </label>
              </div>

              <div className="flex flex-col justify-between gap-6">
                <fieldset>
                  <legend className="mb-3 text-xs font-black uppercase tracking-widest text-slate-500">
                    {t("payment.form.bankLegend")}
                  </legend>
                  <div className="grid grid-cols-3 gap-3">
                    {BANK_OPTIONS.map((bank) => {
                      const selected = bankCode === bank.code;
                      return (
                        <button
                          key={bank.code}
                          type="button"
                          disabled={isLoading}
                          onClick={() => setBankCode(bank.code)}
                          className={`rounded-2xl border px-3 py-4 text-sm font-black transition ${selected ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/30" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"} disabled:opacity-60`}
                        >
                          {bank.label}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <p className="flex items-center gap-2 text-xs font-bold text-slate-600">
                    <ShieldCheck className="size-4 text-accent" />
                    {t("payment.form.secureNote")}
                  </p>
                </div>

                {error && (
                  <p role="alert" className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </p>
                )}

                <Button type="submit" disabled={isLoading} className="w-full py-4 text-base bg-slate-900 text-white hover:bg-slate-800">
                  {isLoading ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      {t("payment.form.loadingBtn")}
                    </>
                  ) : (
                    t("payment.form.submitBtn")
                  )}
                </Button>
              </div>
            </form>
          )}
        </div>
      </AnimateIn>
    </section>
  );
};