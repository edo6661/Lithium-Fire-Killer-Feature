import { useTranslation } from "react-i18next";
import { PageSeo } from "../components/seo/PageSeo";
import {
  AboutHistorySection,
  AboutIntroSection,
  AboutLocationSection,
} from "../components/sections/about";
import { PAGE_SEO } from "../config/seo";

export const AboutPage = () => {
  const { t } = useTranslation("about");
  // Tetap ambil path dari config SEO
  const seoPath = PAGE_SEO.about.path;

  return (
    <>
      <PageSeo
        title={t("seo.title")}
        description={t("seo.description")}
        path={seoPath}
      />

      <AboutIntroSection />
      <AboutHistorySection />
      <AboutLocationSection />
    </>
  );
};