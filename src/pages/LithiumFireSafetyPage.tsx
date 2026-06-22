import { useTranslation } from "react-i18next";
import { PageSeo } from "../components/seo/PageSeo";
import {
  ContactCtaSection,
  ProtectionCategoriesSection,
} from "../components/sections/lithium-fire-safety";
import { PAGE_SEO } from "../config/seo";

export const LithiumFireSafetyPage = () => {
  const { t } = useTranslation("lithium-fire-safety");

  return (
    <>
      <PageSeo
        title={t("seo.title")}
        description={t("seo.description")}
        path={PAGE_SEO.lithiumFireSafety.path}
      />

      <ProtectionCategoriesSection />
      <ContactCtaSection />
    </>
  );
};