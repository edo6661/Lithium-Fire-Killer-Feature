import { PageSeo } from "../components/seo/PageSeo";
import { PAGE_SEO } from "../config/seo";
import {
  ArkivHeroSection,
  ArkivVisionarySection,
  ArkivProductSection,
  ArkivCtaSection
} from "../components/sections/lfk-x-arkiv";
import { FloatingBlobs } from "../components/sections/lfk-x-arkiv/FloatingBlobs";

export const LfkXArkivPage = () => {
  const seo = PAGE_SEO.lfkXArkiv;

  return (
    // Tambahkan -mt-[72px] pt-[72px] agar background menutupi celah MainLayout
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
    </div>
  );
};
