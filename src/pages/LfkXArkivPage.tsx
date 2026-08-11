import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { PageSeo } from "../components/seo/PageSeo";
import { PAGE_SEO } from "../config/seo";
import {
  ArkivHeroSection,
  ArkivVisionarySection,
  ArkivProductSection,
  ArkivCheckoutModal,
  ArkivCtaSection,
} from "../components/sections/lfk-x-arkiv";
import { FloatingBlobs } from "../components/sections/lfk-x-arkiv/FloatingBlobs";
import { Toast } from "../components/ui/Toast";
import { useCreateInvoiceVa } from "../hooks/useCreateInvoiceVa";
import { useYukkBackendHealth } from "../hooks/useYukkBackendHealth";
import { formatRupiah } from "../utils/format-currency";

export const LfkXArkivPage = () => {
  const { t } = useTranslation("lfk-x-arkiv");
  const { isChecking: isCheckingBackend, isBackendReachable } = useYukkBackendHealth();
  const {
    error,
    isLoading,
    vaData,
    isCheckoutOpen,
    checkoutStep,
    isPaymentComplete,
    lastPaidOrderId,
    lastPaidAmount,
    toast,
    openCheckout,
    handleCreateVA,
    handleCreateQris,
    markPaymentPaid,
    handlePaymentComplete,
    closeCheckout,
    clearToast,
  } = useCreateInvoiceVa();

  const checkoutDisabled = !isCheckingBackend && !isBackendReachable;

  return (
    <div className="relative min-h-screen bg-[#eaeff5] text-slate-900 selection:bg-slate-300 selection:text-slate-900 -mt-[72px] pt-[72px]">
      <PageSeo
        title={t("seo.title")}
        description={t("seo.description")}
        path={PAGE_SEO.lfkXArkiv.path}
      />

      <FloatingBlobs className="z-0" />

      <div className="relative z-10">
        <ArkivHeroSection />
        <ArkivVisionarySection />
        <ArkivProductSection
          onCheckout={openCheckout}
          checkoutDisabled={checkoutDisabled}
        />

        {isPaymentComplete && lastPaidOrderId ? (
          <div className="relative z-10 mx-auto max-w-5xl px-4 pb-4 sm:px-6 lg:px-8">
            <div className="flex gap-4 rounded-[1.5rem] border border-green-200 bg-green-50 px-5 py-4 text-green-950">
              <CheckCircle2 className="mt-0.5 size-6 shrink-0 text-green-600" />
              <div>
                <p className="text-base font-black tracking-tight">
                  {t("orderComplete.heading")}
                </p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-green-900/80">
                  {t("orderComplete.body")}
                </p>
                <p className="mt-2 text-xs font-bold text-green-900">
                  {t("orderComplete.docLabel")} {lastPaidOrderId}
                  {lastPaidAmount != null ? ` · ${formatRupiah(lastPaidAmount)}` : null}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {checkoutDisabled && (
          <div className="relative z-10 mx-auto max-w-5xl px-4 pb-4 sm:px-6 lg:px-8">
            <p
              role="alert"
              className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900"
            >
              Backend pembayaran belum siap. Pastikan{" "}
              <code className="rounded bg-amber-100 px-1">lithium-fire-killer-backend</code>{" "}
              berjalan, lalu refresh halaman ini.
            </p>
          </div>
        )}

        <ArkivCtaSection />
      </div>

      <ArkivCheckoutModal
        open={isCheckoutOpen}
        step={checkoutStep}
        onClose={closeCheckout}
        onCreateVA={handleCreateVA}
        onCreateQris={handleCreateQris}
        onMarkPaid={markPaymentPaid}
        onPaymentComplete={handlePaymentComplete}
        isLoading={isLoading}
        error={error}
        vaData={vaData}
        disabled={checkoutDisabled}
      />

      <Toast toast={toast} onClose={clearToast} />
    </div>
  );
};
