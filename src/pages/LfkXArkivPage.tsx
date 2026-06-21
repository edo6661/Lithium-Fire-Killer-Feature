import { PageSeo } from "../components/seo/PageSeo";
import { PAGE_SEO } from "../config/seo";
import {
  ArkivHeroSection,
  ArkivVisionarySection,
  ArkivProductSection,
  PaymentInstructionModal,
  ArkivCtaSection,
} from "../components/sections/lfk-x-arkiv";
import { FloatingBlobs } from "../components/sections/lfk-x-arkiv/FloatingBlobs";
import { Toast } from "../components/ui/Toast";
import { useCreateInvoiceVa } from "../hooks/useCreateInvoiceVa";

export const LfkXArkivPage = () => {
  const seo = PAGE_SEO.lfkXArkiv;
  const {
    vaData,
    isModalOpen,
    toast,
    markPaymentPaid,
    handlePaymentComplete,
    closeModal,
    clearToast,
  } = useCreateInvoiceVa();

  return (
    <div className="relative min-h-screen bg-[#eaeff5] text-slate-900 selection:bg-slate-300 selection:text-slate-900 -mt-[72px] pt-[72px]">
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
      />

      <FloatingBlobs className="z-0" />

      <div className="relative z-10">
        <ArkivHeroSection />
        <ArkivVisionarySection />
        <ArkivProductSection />
        
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
