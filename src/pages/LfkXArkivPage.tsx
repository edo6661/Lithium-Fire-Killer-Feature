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

export const LfkXArkivPage = () => {
  const { t } = useTranslation("lfk-x-arkiv");
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
        
        {/* Tambahkan ArkivPaymentSection di sini jika diperlukan (sesuai kode asli jika ada) */}
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