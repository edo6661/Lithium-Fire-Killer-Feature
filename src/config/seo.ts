import { SITE } from "./site";

export const SITE_URL = "https://www.lithiumfirekiller.com"; 
export const OG_IMAGE = `${SITE_URL}/og-image.png`; 


export const DEFAULT_SEO = {
  siteName: SITE.shortName,
  title: `${SITE.shortName} — Spesialis Perlindungan Kebakaran Baterai Lithium`,
  description:
    "PT. Famindo Alfa Spektrum Teknologi (FAST) — distributor eksklusif APAR Lithium Fire Killer Hartindo AF31 dan solusi proteksi kebakaran lithium.",
} as const;

export const PAGE_SEO = {
  home: {
    path: "/",
    title: `${SITE.shortName} — Spesialis Perlindungan Kebakaran Baterai Lithium`,
    description:
      "PT. Famindo Alfa Spektrum Teknologi menghadirkan teknologi perlindungan kebakaran lithium untuk mobilitas, penyimpanan energi, dan operasional bisnis.",
  },
  about: {
    path: "/about",
    title: `Tentang Kami — Distributor APAR Lithium Fire Killer | FAST`,
    description:
      "Kenali PT. Famindo Alfa Spektrum Teknologi (FAST), distributor eksklusif APAR Lithium Fire Killer Hartindo AF31 di Indonesia.",
  },
  lithiumFireSafety: {
    path: "/lithium-fire-safety",
    title: `Lithium Fire Safety — ${SITE.shortName}`,
    description:
      "Solusi proteksi kebakaran lithium: EV Safety, Business Safety, Mining Safety, dan metode EPC dari FAST.",
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
