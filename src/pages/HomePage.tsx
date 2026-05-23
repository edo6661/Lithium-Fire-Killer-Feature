import { PageSeo } from "../components/seo/PageSeo";
import {
  EducationSection,
  HeroSection,
  ProblemSection,
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
      <ProblemSection />
      <ServicesSection />
      <EducationSection />
      <ThermalRunawaySection />
      <RegulationSection />
    </>
  );
};
