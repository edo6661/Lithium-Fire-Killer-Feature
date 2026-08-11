import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import { PageSeo } from "../components/seo/PageSeo";
import { PAGE_SEO } from "../config/seo";
import {
  ArkivHeroSection,
  ArkivVisionarySection,
  ArkivProductSection,
  ArkivCheckoutModal,
  ArkivBuyCtaSection,
} from "../components/sections/lfk-x-arkiv";
import { ArkivAccessGateModal, useArkivAccessGate } from "../components/sections/lfk-x-arkiv/ArkivAccessGateModal";
import { ArkivPendingPaymentChip } from "../components/sections/lfk-x-arkiv/ArkivPendingPaymentChip";
import { FloatingBlobs } from "../components/sections/lfk-x-arkiv/FloatingBlobs";
import { Toast } from "../components/ui/Toast";
import { useCreateInvoiceVa } from "../hooks/useCreateInvoiceVa";
import { useArkivStock } from "../hooks/useArkivStock";
import { formatRupiah } from "../utils/format-currency";

export const LfkXArkivPage = () => {
  const { t } = useTranslation("lfk-x-arkiv");
  const { stock, refresh: refreshStock } = useArkivStock();
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
    hasPendingSession,
    openCheckout,
    resumeCheckout,
    dismissPendingSession,
    handleCreateVA,
    handleCreateQris,
    markPaymentPaid,
    markPaymentExpired,
    markPaymentFailed,
    retryCheckout,
    handlePaymentComplete,
    closeCheckout,
    clearToast,
  } = useCreateInvoiceVa();

  const {
    gateOpen,
    requestAccess,
    closeGate,
    handleUnlocked,
  } = useArkivAccessGate(openCheckout);

  const onPaymentComplete = () => {
    handlePaymentComplete();
    refreshStock();
  };

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
        <ArkivProductSection onCheckout={() => void requestAccess()} stock={stock} />

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

        <ArkivBuyCtaSection onCheckout={() => void requestAccess()} stock={stock} />
      </div>

      <ArkivAccessGateModal
        open={gateOpen}
        onClose={closeGate}
        onUnlocked={handleUnlocked}
      />

      <ArkivCheckoutModal
        open={isCheckoutOpen}
        step={checkoutStep}
        onClose={closeCheckout}
        onCreateVA={handleCreateVA}
        onCreateQris={handleCreateQris}
        onMarkPaid={markPaymentPaid}
        onMarkExpired={markPaymentExpired}
        onMarkFailed={markPaymentFailed}
        onRetry={retryCheckout}
        onPaymentComplete={onPaymentComplete}
        isLoading={isLoading}
        error={error}
        vaData={vaData}
        stock={stock}
      />

      {vaData && hasPendingSession ? (
        <ArkivPendingPaymentChip
          open
          step={checkoutStep}
          vaData={vaData}
          onResume={resumeCheckout}
          onDismiss={dismissPendingSession}
        />
      ) : null}

      <Toast toast={toast} onClose={clearToast} />
    </div>
  );
};
