import { PageSeo } from "../components/seo/PageSeo";
import {
  ContactCtaSection,
  EpcMethodSection,
  ProtectionCategoriesSection,
} from "../components/sections/lithium-fire-safety";
import { PAGE_SEO } from "../config/seo";

export const LithiumFireSafetyPage = () => {
  const seo = PAGE_SEO.lithiumFireSafety;

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
      />

      <ProtectionCategoriesSection />
      <EpcMethodSection />
      <ContactCtaSection />
    </>
  );
};
