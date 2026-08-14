/**
 * Cutoff time untuk aturan stok web Arkiv:
 * Mulai 11 September 23:59 WIB (12 September WIB),
 * penjualan di web resmi ditutup total (tidak bisa dibeli di web lagi).
 * Jika masih ada stok di web, pembeli harus membeli offline di pameran Galeri ZEN1.
 * Jika stok di web sudah 0, muncul informasi stok telah habis.
 */
export const ARKIV_WEB_STOCK_CUTOFF_DATE = new Date(
  "2026-08-13T23:59:00+07:00",
  // "2026-09-11T23:59:00+07:00",
);

export type ArkivWebPurchaseState = "AVAILABLE" | "OFFLINE_ONLY" | "SOLD_OUT";

export function getArkivWebPurchaseState(
  quantityRemaining: number | null | undefined,
  now: Date = new Date(),
): ArkivWebPurchaseState {
  if (quantityRemaining != null && quantityRemaining <= 0) {
    return "SOLD_OUT";
  }
  if (now >= ARKIV_WEB_STOCK_CUTOFF_DATE) {
    return "OFFLINE_ONLY";
  }
  return "AVAILABLE";
}

export function isArkivWebSoldOut(
  quantityRemaining: number | null | undefined,
  now: Date = new Date(),
): boolean {
  return getArkivWebPurchaseState(quantityRemaining, now) !== "AVAILABLE";
}
