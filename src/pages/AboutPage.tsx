import { PageSeo } from "../components/seo/PageSeo";
import {
  AboutHistorySection,
  AboutIntroSection,
} from "../components/sections/about";
import { PAGE_SEO } from "../config/seo";

export const AboutPage = () => {
  const seo = PAGE_SEO.about;

  return (
    <>
      <PageSeo
        title={seo.title}
        description={seo.description}
        path={seo.path}
      />

      <AboutIntroSection />
      <AboutHistorySection />
    </>
  );
};
