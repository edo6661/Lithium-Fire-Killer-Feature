import { SITE } from "./site";

export const SITE_URL = "https://www.lithiumfirekiller.com";
export const OG_IMAGE = `${SITE_URL}/logo/transparent-color.png`;
export const OG_IMAGE_WIDTH = "612";
export const OG_IMAGE_HEIGHT = "408";

export const HOME_SEO_TITLE =
  "Lithium Fire Killer Hartindo AF31 — Indonesia’s most advanced Lithium Fire Protection";

export const HOME_SEO_DESCRIPTION =
  "PT. Famindo Alfa Spektrum Teknologi (FAST) — distributor eksklusif APAR Lithium Fire Killer Hartindo AF31 dan solusi proteksi kebakaran baterai lithium di Indonesia.";

export const DEFAULT_SEO = {
  siteName: SITE.shortName,
  title: HOME_SEO_TITLE,
  description: HOME_SEO_DESCRIPTION,
} as const;

export const PAGE_SEO = {
  home: {
    path: "/",
    title: HOME_SEO_TITLE,
    description: HOME_SEO_DESCRIPTION,
  },
  about: {
    path: "/about",
    title: `Tentang Kami — Distributor APAR Lithium Fire Killer | FAST`,
    description:
      "Kenali PT. Famindo Alfa Spektrum Teknologi (FAST), distributor eksklusif APAR Lithium Fire Killer Hartindo AF31 di Indonesia.",
  },
  lithiumFireSafety: {
    path: "/lithium-fire-safety",
    title: `Lithium Fire Safety — Lithium Fire Killer | ${SITE.shortName}`,
    description:
      "Solusi proteksi kebakaran lithium dengan Lithium Fire Killer Hartindo AF31: EV Safety, Business Safety, Mining Safety, dan metode EPC dari FAST.",
  },
  contact: {
    path: "/contact",
    title: `Kontak — Konsultasi Proteksi Kebakaran Lithium | FAST`,
    description:
      "Hubungi PT. Famindo Alfa Spektrum Teknologi (FAST) untuk konsultasi proteksi kebakaran lithium.",
  },
  lfkXArkiv: {
    path: "/lfk-x-arkiv",
    title: `LFK × Arkiv Limited Edition — ${SITE.shortName}`,
    description:
      "Lithium Fire Killer × Arkiv: A limited-edition collision of avant-garde art and revolutionary fire safety.",
  },
} as const;
