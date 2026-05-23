import { ABOUT_CONTENT, FOOTER_CONTENT, HEADER_NAV } from "../content";

export const SITE = {
  name: "PT. Famindo Alfa Spektrum Teknologi",
  shortName: "FAST",
  tagline: "Lithium Fire Safety",
} as const;

export const NAV_LINKS = HEADER_NAV;

export const CONTACT = {
  email: FOOTER_CONTENT.contact.email,
  phone: FOOTER_CONTENT.contact.phone,
  phoneHref: "tel:+6281290003278",
} as const;

export const OFFICE = ABOUT_CONTENT.location;

export const FOOTER = FOOTER_CONTENT;
