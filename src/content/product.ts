export const PRODUCT_CONTENT = {
  id: "lithium-fire-killer-hartindo-af31",
  brochureUrl: "/brochures/lfk-brochure.pdf",
  tokopediaUrl: "https://www.tokopedia.com/famindofast",
  slug: "lithium-fire-killer-hartindo-af31",
  title: "Lithium Fire Killer HARTINDO AF31",
  tagline: "The First Lithium Fire Extinguisher In The World",
  categoryId: "protective",
  description:
    "A multi-function, non-toxic, and eco-friendly extinguisher that is capable of handling multiple emergencies. From common paper fires to high-stake lithium battery blazes. Protect your home, fleet, also your life and your loved ones with this specialized fire safety solution.",
  image: "/products/lfk.avif",
  features: [
    "SNI Certified (Standar Nasional Indonesia)",
    "Fire Classes: A, B, D, F/K, & L (Lithium)",
    "One tool for every emergency",
    "National & International Lab-tested",
    "Eco-friendly & Non-toxic",
  ],
  partners: [
    {
      name: "Azko",
      logo: "/partners/azko.avif",
      locations: [
        "Gandaria City",
        "Kota Kasablanka",
        "Mall Artha Gading",
        "Living World Alam Sutera",
        "Q-Big BSD",
        "Bintaro Sektor 9",
      ],
    },
    {
      name: "Motovillage",
      logo: "/partners/motovillage.avif",
      locations: ["Moto Village Kemang"],
    },
    {
      name: "Blackstone",
      logo: "/partners/blackstone.avif",
      locations: ["Blackstone Garage Kebayoran"],
    },
    {
      name: "Jaecoo Andalan",
      logo: "/partners/jaecoo.avif",
      locations: ["Jaecoo Andalan Mampang"],
    },
  ],
  variants: [
    {
      id: "v1",
      weight: "1kg (Portable)",
      name: "LFK AF31 Portable - 1 KG",
      desc: "Lightweight suppression cylinder ideal for personal electric vehicles and compact areas.",
      images: {
        front: "/products/LFK/LFK_1_KG_[Font].avif",
        back: "/products/LFK/LFK_1_KG_[Back].avif",
        left: "/products/LFK/LFK_1_KG_[Left].avif",
        right: "/products/LFK/LFK_1_KG_[Right].avif",
      },
    },
    {
      id: "v2",
      weight: "3kg (Portable)",
      name: "LFK AF31 Portable - 3 KG",
      desc: "Versatile cylinder for standard EV garages, server rooms, and commercial spaces.",
      images: {
        front: "/products/LFK/LFK_3_KG_[Font].avif",
        back: "/products/LFK/LFK_3_KG_[Back].avif",
        left: "/products/LFK/LFK_3_KG_[Left].avif",
        right: "/products/LFK/LFK_3_KG_[Right].avif",
      },
    },
    {
      id: "v3",
      weight: "6kg (Portable)",
      name: "LFK AF31 Portable - 6 KG",
      desc: "High-capacity portable unit for industrial facilities and larger scale protection.",
      images: {
        front: "/products/LFK/LFK_6_KG_[Font].avif",
        back: "/products/LFK/LFK_6_KG_[Back].avif",
        left: "/products/LFK/LFK_6_KG_[Left].avif",
        right: "/products/LFK/LFK_6_KG_[Right].avif",
      },
    },
    {
      id: "v4",
      weight: "25kg (Trolley)",
      name: "LFK AF31 Trolley - 25 KG",
      desc: "Heavy-duty mobility solution for mining sites, large warehouses, and EV charging stations.",
      images: {
        front: "/products/LFK/LFK_25_KG_[Font].avif",
        back: "/products/LFK/LFK_25_KG_[Back].avif",
        left: "/products/LFK/LFK_25_KG_[Left].avif",
        right: "/products/LFK/LFK_25_KG_[Right].avif",
      },
    },
    {
      id: "v5",
      weight: "50kg (Trolley)",
      name: "LFK AF31 Trolley - 50 KG",
      desc: "Maximum capacity suppression system for extreme industrial environments and massive battery banks.",
      images: {
        front: "/products/LFK/LFK_50_KG_[Font].avif",
        back: "/products/LFK/LFK_50_KG_[Back].avif",
        left: "/products/LFK/LFK_50_KG_[Left].avif",
        right: "/products/LFK/LFK_50_KG_[Right].avif",
      },
    },
  ],
} as const;

export type ProductPartner = (typeof PRODUCT_CONTENT.partners)[number];
export type ProductVariant = (typeof PRODUCT_CONTENT.variants)[number];
