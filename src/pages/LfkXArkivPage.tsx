import { useTranslation } from "react-i18next";
import { PageSeo } from "../components/seo/PageSeo";
import { PAGE_SEO } from "../config/seo";
import {
  ArkivHeroSection,
  ArkivVisionarySection,
  ArkivProductSection,
  PaymentInstructionModal,
  ArkivCtaSection,
  ArkivPaymentSection,
} from "../components/sections/lfk-x-arkiv";
import { FloatingBlobs } from "../components/sections/lfk-x-arkiv/FloatingBlobs";
import { Toast } from "../components/ui/Toast";
import { useCreateInvoiceVa } from "../hooks/useCreateInvoiceVa";
import { useYukkBackendHealth } from "../hooks/useYukkBackendHealth";

export const LfkXArkivPage = () => {
  const { t } = useTranslation("lfk-x-arkiv");
  const { isChecking: isCheckingBackend, isBackendReachable } = useYukkBackendHealth();
  const {
    error,
    isLoading,
    vaData,
    isModalOpen,
    isPaymentComplete,
    toast,
    handleCreateVA,
    markPaymentPaid,
    handlePaymentComplete,
    closeModal,
    clearToast,
  } = useCreateInvoiceVa();

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
        <ArkivProductSection />
        
        {!isCheckingBackend && !isBackendReachable && (
          <div className="relative z-10 mx-auto max-w-5xl px-4 pb-4 sm:px-6 lg:px-8">
            <p
              role="alert"
              className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-900"
            >
              Backend pembayaran belum siap. Pastikan{" "}
              <code className="rounded bg-amber-100 px-1">lithium-fire-killer-backend</code>{" "}
              berjalan di port 3001, lalu refresh halaman ini.
            </p>
          </div>
        )}

        <ArkivPaymentSection
          onCreateVA={handleCreateVA}
          isLoading={isLoading}
          error={error}
          isPaymentComplete={isPaymentComplete}
          vaData={vaData}
        />

        <ArkivCtaSection />
      </div>

      <PaymentInstructionModal
        open={isModalOpen}
        onClose={closeModal}
        onMarkPaid={markPaymentPaid}
        onPaymentComplete={handlePaymentComplete}
        vaData={vaData}
      />

      <Toast toast={toast} onClose={clearToast} />
    </div>
  );
};