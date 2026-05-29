import { Helmet } from "react-helmet-async";
import { DEFAULT_SEO, OG_IMAGE, SITE_URL } from "../../config/seo";

type PageSeoProps = {
  title: string;
  description: string;
  path: string;
};

export const PageSeo = ({ title, description, path }: PageSeoProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;

  return (
    <Helmet>
      {/* Core */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Theme color — browser tab accent on mobile */}
      <meta name="theme-color" content="#000000" />
      <meta name="color-scheme" content="dark" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="id_ID" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />
    </Helmet>
  );
};