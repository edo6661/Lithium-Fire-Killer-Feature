# Arsitektur Proyek — FAST Landing Page

Struktur mengikuti **FAST Design System** (`/.cursor/rules/fast-design-system.md`): pemisahan UI primitives, layout global, section per halaman, dan halaman tipis sebagai composer.

## Struktur folder

```
src/
├── App.tsx                 # Root: BrowserRouter + routes
├── main.tsx                # Entry Vite
├── index.css               # Tailwind v4 + token warna brand
├── i18n.ts                 # (opsional) i18n
│
├── config/                 # Konstanta teknis & SEO (bukan copy panjang)
│   ├── site.ts             # Nav, kontak, re-export dari content
│   └── seo.ts              # Meta title/description per route
│
├── content/                # Sumber teks resmi — mirror docs/CONTENT.md
│   ├── global.ts           # Header, Footer, kontak global
│   ├── home.ts             # Halaman Beranda (fase berikutnya)
│   ├── about.ts            # Tentang Kami
│   ├── lithium-fire-safety.ts
│   ├── contact.ts
│   └── index.ts            # Barrel export
│
├── routes/
│   └── index.tsx           # React Router + MainLayout
│
├── pages/                  # Composer: SEO + urutan section (tipis)
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── LithiumFireSafetyPage.tsx
│   └── ContactPage.tsx
│
└── components/
    ├── layout/             # Header, Footer, MainLayout
    ├── ui/                 # Button, ButtonLink, Card, Badge (reusable)
    ├── seo/                # PageSeo (react-helmet-async)
    └── sections/           # Blok konten per halaman
        ├── home/
        ├── about/
        ├── contact/
        ├── lithium-fire-safety/
        └── shared/         # Section dipakai >1 halaman (mis. lokasi kantor)
```

## Alur data konten

1. Copywriting resmi ada di `docs/CONTENT.md`.
2. Implementasi TypeScript di `src/content/*.ts` — **jangan mengarang teks** di komponen.
3. `src/config/site.ts` mengekspor nav/kontak untuk routing & link (`tel:`, `mailto:`).
4. Section/page hanya mengimpor dari `content/` + merender UI.

## Routing

| Path                   | Halaman             | Label nav           |
| ---------------------- | ------------------- | ------------------- |
| `/`                    | Beranda             | Beranda             |
| `/about`               | Tentang Kami        | Tentang Kami        |
| `/lithium-fire-safety` | Lithium Fire Safety | Lithium Fire Safety |
| `/contact`             | Kontak              | Kontak              |

Alias redirect: `/tentang-kami` → `/about`, `/kontak` → `/contact`.

## Fase implementasi

| Fase | Scope                               | Status      |
| ---- | ----------------------------------- | ----------- |
| 1    | Arsitektur + Header + Footer        | Selesai     |
| 2    | Section + halaman (dari CONTENT.md) | Menunggu OK |
