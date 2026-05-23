import { PageSeo } from "../components/seo/PageSeo";
import {
  ContactFormSection,
  ContactInfoSection,
  ContactLocationSection,
} from "../components/sections/contact";
import { PAGE_SEO } from "../config/seo";

export const ContactPage = () => {
  const seo = PAGE_SEO.contact;

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
      />

      <ContactInfoSection />
      <ContactFormSection />
      <ContactLocationSection />
    </>
  );
};
