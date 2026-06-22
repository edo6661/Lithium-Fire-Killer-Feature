import { useTranslation } from "react-i18next";
import { PageSeo } from "../components/seo/PageSeo";
import {
  ContactFormSection,
  ContactInfoSection,
  ContactLocationSection,
} from "../components/sections/contact";
import { PAGE_SEO } from "../config/seo";

export const ContactPage = () => {
  const { t } = useTranslation("contact");
  const seoPath = PAGE_SEO.contact.path;

  return (
    <>
      <PageSeo
        title={t("seo.title")}
        description={t("seo.description")}
        path={seoPath}
      />

      <ContactInfoSection />
      <ContactFormSection />
      <ContactLocationSection />
    </>
  );
};