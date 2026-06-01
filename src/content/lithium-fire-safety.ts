/**
 * Halaman Lithium Fire Safety — sumber: docs/CONTENT.md § PAGE 3
 */

export const LITHIUM_FIRE_SAFETY_CONTENT = {
  protection: {
    heading: "Kategori Proteksi",
    categories: [
      {
        id: "ev-safety",
        title: "Electric Vehicle (EV) Safety",
        tabLabel: "EV Safety",
        paragraphs: [
          "Industri kendaraan listrik (EV) di Indonesia berkembang sangat pesat dan segera menjadi bagian penting dari kebutuhan transportasi masyarakat.",
          "Oleh karena itu, setiap pemilik EV perlu memahami cara merawat kendaraannya sekaligus melindungi diri dari risiko kebakaran baterai lithium yang dapat terjadi kapan saja.",
        ],
        evGrowthChart: {
          heading: "Estimasi pertumbuhan EV di Indonesia",
          imageSrc: "/protection/ev/chart-ev.png",
          imageAlt:
            "Grafik batang horizontal perkembangan kendaraan listrik di Indonesia: 127 unit pada 2020 (baseline), 340.000 unit perkiraan 2025, dan target 15.000.000 unit pada 2030.",
          source: {
            prefix: "Estimasi pertumbuhan EV di Indonesia menurut",
            href: "https://investortrust.id/esg/24936/belasan-juta-kendaraan-listrik-ditargetkan-beroperasi-pada-2030-ternyata-ini-perhitungannya",
            label:
              "Belasan Juta Kendaraan Listrik Ditargetkan Beroperasi pada 2030, Ternyata Ini Perhitungannya — Investor Trust",
          },
        },
      },
      {
        id: "business-safety",
        title: "Business Safety",
        tabLabel: "Business Safety",
        paragraphs: [
          "Berbagai sektor bisnis di Indonesia kini telah mengadopsi teknologi berbasis baterai lithium, termasuk industri manufaktur baterai itu sendiri. Untuk melindungi karyawan dan menjaga keberlangsungan aset perusahaan, penerapan sistem keamanan terhadap risiko kebakaran baterai lithium menjadi hal yang mutlak diperlukan.",
        ],
        subheading: "Mengamankan Berbagai Sektor Bisnis Di Indonesia",
        subheadingParagraph:
          "PT. FAST hadir sebagai mitra strategis bagi berbagai sektor industri di Indonesia dalam menghadapi risiko kebakaran baterai lithium. Kami tidak hanya menyediakan solusi proteksi terdepan, tetapi juga berkomitmen untuk melindungi karyawan, aset, dan keberlangsungan bisnis melalui edukasi serta penerapan standar keselamatan yang efektif.",
        sectorsLabel: "Sektor yang dilayani:",
        sectors: [
          "EV Charging Station",
          "Battery Storage & Manufacturer",
          "Manufacturer",
          "Data Center",
          "Logistics",
          "Energy Powerplant",
          "Research Laboratory",
          "Telecommunication",
        ],
      },
      {
        id: "mining-safety",
        title: "Mining Safety",
        tabLabel: "Mining Safety",
        byline: "oleh PT. Fastindo Intiraya Solusi Tambang — FIRST",
        paragraphs: [
          "Industri pertambangan memiliki tantangan keselamatan yang sangat kompleks dan membutuhkan solusi khusus dari para ahli berpengalaman. Untuk itu, hadir FIRST (PT. Fastindo Intiraya Solusi Tambang) dengan komitmen kuat menghadirkan teknologi terdepan dan layanan terpercaya demi menjaga keselamatan serta memastikan pertambangan Indonesia tetap berada di garis terdepan.",
        ],
        epc: {
          heading: "Metode EPC",
          description:
            "EPC (Engineering, Procurement, and Construction) adalah metode yang digunakan oleh FIRST untuk merancang solusi sesuai kebutuhan spesifik di lokasi pertambangan. Proses ini mencakup perencanaan menyeluruh, penyusunan mekanisme pencegahan kebakaran, integrasi detektor, hingga pemasangan sistem proteksi kebakaran. Dengan pendekatan EPC, FIRST memastikan setiap tahap dilaksanakan secara tepat dan disesuaikan dengan kebutuhan klien.",
          stepsHeading: "Tahapan EPC:",
          steps: [
            "Perencanaan menyeluruh",
            "Penyusunan mekanisme pencegahan kebakaran",
            "Integrasi detektor",
            "Pemasangan sistem proteksi kebakaran secara presisi",
          ],
        },
      },
    ],
  },
  cta: {
    headline: "Butuh Bantuan Lebih Lanjut?",
    button: { label: "Hubungi Kami", href: "/contact" },
  },
} as const;
