/**
 * Halaman Beranda — sumber: docs/CONTENT.md § PAGE 1: BERANDA
 */

export const HOME_CONTENT = {
  hero: {
    headline: "Spesialis Perlindungan Kebakaran Baterai Lithium",
    description:
      "Kebakaran baterai lithium bersifat unik dan tidak bisa ditangani dengan cara pemadaman biasa. Dengan pemahaman mendalam tentang thermal runaway, kami menghadirkan teknologi perlindungan kebakaran lithium yang terdepan untuk mobilitas, penyimpanan energi, dan operasional bisnis Anda.",
    cta: {
      label: "Lihat Profil Perusahaan Kami",
      href: "/about",
    },
  },
  problem: {
    headline: "No Fire, No Fear",
    description:
      "Perkembangan teknologi berbasis baterai lithium membawa kemajuan besar di berbagai sektor. Namun, kemajuan ini juga menghadirkan risiko kebakaran baterai lithium—suatu kelas api baru yang tidak dapat dipadamkan dengan alat pemadam konvensional. Untuk itu, edukasi bahaya dan pelatihan penanggulangan kebakaran lithium menjadi prioritas penting agar kita siap menghadapi tantangan ini dengan aman.",
    cta: {
      label: "Pelajari Lebih Detail",
      href: "/lithium-fire-safety",
    },
  },
  services: {
    heading: "Layanan / Solusi Keamanan",
    items: [
      {
        title: "EV Fire Safety",
        description:
          "Menjaga keselamatan diri adalah tanggung jawab setiap pemilik EV.",
      },
      {
        title: "Business Safety",
        description:
          "Prioritaskan keamanan nyawa karyawan dan aset bisnis Anda.",
      },
      {
        title: "Mining Safety",
        description:
          "Maksimalkan sistem keamanan operasional di sektor pertambangan.",
      },
    ],
  },
  education: {
    heading: "Apa Itu Baterai Lithium?",
    paragraphs: [
      "Baterai lithium-ion (Li-ion) adalah jenis baterai isi ulang yang banyak digunakan pada perangkat elektronik portabel maupun kendaraan listrik. Mekanismenya bekerja dengan memindahkan ion lithium antara elektroda positif (katoda) dan elektroda negatif (anoda) melalui elektrolit.",
      "Baterai Li-ion mampu menyimpan energi lebih besar dalam ukuran yang ringkas dan ringan, menjadikannya pilihan ideal untuk perangkat portabel. Berbeda dengan beberapa jenis baterai lain, baterai Li-ion tidak mengalami penurunan kapasitas meski diisi ulang sebelum benar-benar habis. Dengan umur pakai yang relatif panjang serta mampu melalui banyak siklus pengisian dan pengosongan, baterai ini lebih efisien, ramah lingkungan, dan dapat didaur ulang.",
      "Meskipun menawarkan banyak keunggulan, baterai lithium-ion juga memiliki risiko tertentu yang perlu diwaspadai.",
    ],
  },
  thermalRunaway: {
    heading: "Bahaya Thermal Runaway",
    paragraphs: [
      "Baterai lithium-ion menyimpan energi besar di dalam elektrolit yang mudah terbakar. Saat terjadi kerusakan fisik, korsleting, atau suhu berlebih, elektrolit dapat bocor dan memicu reaksi berbahaya berupa kebakaran atau ledakan. Faktor pemicu umumnya berasal dari cacat produksi, pengisian daya yang tidak sesuai, atau paparan suhu ekstrem.",
      "Thermal runaway adalah kondisi peningkatan suhu pada baterai yang berlangsung secara terus-menerus dan sulit dikendalikan. Proses ini dapat membuat baterai mengeluarkan asap, terbakar, hingga meledak. Memahami risiko ini penting agar pengguna lebih bijak dalam menyimpan, mengisi, dan menggunakan baterai lithium dengan cara yang aman.",
    ],
  },
  regulation: {
    heading: "Regulasi Pemerintah di Indonesia",
    description:
      "Peluang Indonesia sebagai pusat industri baterai lithium dan dukungan regulasi.",
    rows: [
      {
        id: "perpres-55-2019",
        regulation: "Perpres No. 55 Tahun 2019",
        fullName: "Peraturan Presiden Nomor 55 Tahun 2019",
        description:
          "Mengatur Percepatan Program Kendaraan Bermotor Listrik Berbasis Baterai (Battery Electric Vehicle/BEV) untuk transportasi jalan. Di dalamnya tercakup kerangka regulasi serta berbagai insentif guna menarik investasi, memperkuat industri lokal, membangun infrastruktur pendukung, dan mendorong adopsi kendaraan listrik secara luas di masyarakat.",
      },
      {
        id: "inpres-7-2022",
        regulation: "Inpres No. 7 Tahun 2022",
        fullName: "Instruksi Presiden Nomor 7 Tahun 2022",
        description:
          "Mewajibkan seluruh instansi pemerintah, baik pusat maupun daerah, untuk menggunakan kendaraan bermotor listrik berbasis baterai (Battery Electric Vehicle/BEV) sebagai kendaraan dinas operasional maupun kendaraan perorangan.",
      },
      {
        id: "permenhub-13-2024",
        regulation: "Permenhub No. 13 Tahun 2024",
        fullName: "Peraturan Menteri Perhubungan Nomor 13 Tahun 2024",
        description:
          "Mengatur tentang perlengkapan keselamatan kendaraan bermotor, termasuk sabuk keselamatan, alat pemadam api ringan (APAR), dan perlengkapan keselamatan lainnya. Tujuannya adalah untuk meningkatkan standar keselamatan berkendara dan melindungi pengguna jalan di Indonesia.",
      },
    ],
  },
} as const;
