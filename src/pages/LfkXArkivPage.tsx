import { PageSeo } from "../components/seo/PageSeo";
import { PAGE_SEO } from "../config/seo";
import { motion } from "framer-motion";
import {
  ArkivHeroSection,
  ArkivVisionarySection,
  ArkivProductSection,
  ArkivCtaSection
} from "../components/sections/lfk-x-arkiv";

const FloatingBlobs = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
    <motion.img
      src="/arkiv/graphic-elements/Blob.png"
      animate={{ y: [0, -30, 0], rotate: [0, 10, -5, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[10%] left-[-5%] w-64 opacity-80 blur-[2px] sm:w-80"
      aria-hidden
    />
    <motion.img
      src="/arkiv/graphic-elements/Blob-2.png"
      animate={{ y: [0, 40, 0], rotate: [0, -10, 5, 0] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-[30%] right-[-10%] w-72 opacity-90 sm:w-96"
      aria-hidden
    />
    <motion.img
      src="/arkiv/graphic-elements/Blob-3.png"
      animate={{ y: [0, -25, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-[40%] left-[5%] w-48 opacity-70 blur-[3px]"
      aria-hidden
    />
    <motion.img
      src="/arkiv/graphic-elements/Blob-4.png"
      animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className="absolute bottom-[10%] right-[10%] w-56 opacity-85"
      aria-hidden
    />
    <motion.img
      src="/arkiv/graphic-elements/Blob-5.png"
      animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      className="absolute top-[60%] left-[30%] w-32 opacity-60 blur-[4px]"
      aria-hidden
    />
  </div>
);

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

      <FloatingBlobs />

      <div className="relative z-10">
        <ArkivHeroSection />
        <ArkivVisionarySection />
        <ArkivProductSection />
        <ArkivCtaSection />
      </div>
    </div>
  );
};