import { PageSeo } from "../components/seo/PageSeo";
import {
  ArkivCollaborationSection,
  EducationSection,
  HeroSection,
  ProblemSection,
  ProductSection,
  RegulationSection,
  ServicesSection,
  ThermalRunawaySection,
} from "../components/sections/home";
import { PAGE_SEO } from "../config/seo";

export const HomePage = () => {
  const seo = PAGE_SEO.home;

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
      />

      <HeroSection />
      <ArkivCollaborationSection />
      <ProblemSection />

      <ProductSection />

      <ServicesSection />
      <EducationSection />
      <ThermalRunawaySection />
      <RegulationSection />
    </>
  );
};