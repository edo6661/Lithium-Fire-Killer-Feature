/**
 * Halaman Kontak — sumber: docs/CONTENT.md § PAGE 4: KONTAK
 */

import { ABOUT_CONTENT } from "./about";

export const CONTACT_PAGE_CONTENT = {
  info: {
    heading: "Informasi Kontak",
    channels: [
      {
        id: "phone",
        label: "Telepon / WhatsApp",
        value: "+62 812 9000 3278",
        href: "tel:+6281290003278",
        whatsappHref: "https://wa.me/6281290003278",
      },
      {
        id: "email",
        label: "Email",
        value: "support@famindofast.com",
        href: "mailto:support@famindofast.com",
      },
    ],
  },
  form: {
    heading: "Contact Form",
    fields: {
      firstName: {
        label: "Nama Depan",
        required: true,
      },
      email: {
        label: "Alamat Email",
        required: true,
      },
      message: {
        label: "Tulis Pesan Anda di Sini",
        required: true,
      },
    },
    submitLabel: "Kirim Pesan",
    errors: {
      required: "Kolom ini wajib diisi.",
      emailInvalid: "Format alamat email tidak valid.",
    },
    success: {
      title: "Pesan berhasil dikirim",
      message:
        "Terima kasih. Pesan Anda telah kami terima dan akan segera ditindaklanjuti.",
    },
  },
  location: {
    ...ABOUT_CONTENT.location,
    heading: "Peta & Lokasi",
    addressLabel: "Alamat",
    hoursLabel: "Waktu Operasional",
  },
} as const;
