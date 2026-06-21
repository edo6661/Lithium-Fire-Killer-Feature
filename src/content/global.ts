/**
 * Global UI copy — sumber: docs/CONTENT.md § GLOBAL UI COMPONENTS
 */

export const HEADER_NAV = [
  { label: "Beranda", href: "/" },
  { label: "Tentang Kami", href: "/about" },
  { label: "Lithium Fire Safety", href: "/lithium-fire-safety" },
  // { label: "LFK × Arkiv", href: "/lfk-x-arkiv" },
  { label: "Kontak", href: "/contact" },
] as const;

export const FOOTER_CONTENT = {
  socialCta: "Stay up to date by following our social media!",
  newsletter: {
    emailLabel: "Email",
    emailPlaceholder: "Email",
    submitButton: "Kirim Informasi",
  },
  contact: {
    email: "support@famindofast.com",
    phone: "+62 812 9000 3278",
  },
} as const;
