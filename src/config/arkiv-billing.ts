import type { CreateInvoiceVaPayload } from "../types/invoice";

/** Prefix nomor dokumen tagihan LFK × Arkiv (trxId YUKK / partnerReferenceNo QRIS). */
export const ARKIV_ORDER_ID_PREFIX = "SPR-ARKIV";

/** Nomor unik per percobaan checkout — hindari 409 InvoiceAlreadyExists. */
export function buildArkivOrderId(): string {
  return `${ARKIV_ORDER_ID_PREFIX}-${Date.now()}`;
}

export type ArkivPaymentMethod = "VA" | "QRIS";

export const ARKIV_VA_BANKS = [
  { code: "BRI", label: "BRI", logo: "/bank/bri.png" },
  { code: "MANDIRI", label: "Mandiri", logo: "/bank/mandiri.png" },
  { code: "BNI", label: "BNI", logo: "/bank/bni.png" },
  { code: "PERMATA", label: "Permata", logo: "/bank/permata.png" },
  { code: "CIMB", label: "CIMB", logo: "/bank/cimb.png" },
  // BCA di-hide — early go-live VA non-BCA saja
  // { code: "BCA", label: "BCA", logo: "/bank/bca.png" },
] as const;

export type ArkivVaBankCode = (typeof ARKIV_VA_BANKS)[number]["code"];

export function getArkivVaBank(code: string | null | undefined) {
  if (!code) return null;
  const normalized = code.replace(/^VA_/i, "").toUpperCase();
  return ARKIV_VA_BANKS.find((bank) => bank.code === normalized) ?? null;
}

/**
 * QRIS YUKK limit ~Rp 10.000.000 — produk real Rp 11.900.000 tidak muat.
 * false = sembunyikan QRIS di checkout (VA saja).
 * true  = tampilkan lagi (setelah limit dinaikkan / harga ≤ 10jt).
 */
export const ARKIV_QRIS_ENABLED = true;

/** Hold VA/QRIS: stok + kuota dipotong saat generate, dikembalikan jika expire/cancel. */
export const ARKIV_CHECKOUT_HOLD_MINUTES = 10;

/**
 * Tagihan aktif LFK × Arkiv.
 *
 * REMINDER early go-live:
 * - Batasi ±10 transaksi / hari agar tidak ternotice BI (kesepakatan YUKK).
 * - Masih harus test VA end-to-end di local sebelum andalkan prod.
 *
 * Harga real (saat go-live / user bilang siap): Rp 11.900.000
 */
export const ACTIVE_ARKIV_BILLING = {
  /**
   * Nominal TEST untuk sampling.
   * Ganti ke 11_900_000 saat harga real aktif (VA saja selama ARKIV_QRIS_ENABLED=false).
   */
  amounts: {
    VA: 11_000,
    QRIS: 1_000,
  } as const satisfies Record<ArkivPaymentMethod, number>,
  /** Harga jual final — aktifkan dengan mengganti `amounts` di atas. */
  realAmount: 11_900_000,
  defaultBankCode: "BRI" as ArkivVaBankCode,
  customerNo: "10011212",
  productLabel: "LFK x Arkiv - SARU Edition",
  productImage: "/products/arkiv/depan.avif",
} as const;

/** Sudut produk — file di public/products/arkiv */
export const ARKIV_PRODUCT_VIEWS = {
  front: "/products/arkiv/depan.avif",
  back: "/products/arkiv/belakang.avif",
  left: "/products/arkiv/kiri.avif",
  right: "/products/arkiv/kanan.avif",
} as const;

export type ArkivProductView = keyof typeof ARKIV_PRODUCT_VIEWS;

export function arkivAmountFor(method: ArkivPaymentMethod): number {
  return ACTIVE_ARKIV_BILLING.amounts[method];
}

/** @deprecated Prefer amounts.VA — kept for type-compatible callers */
export type ArkivBillingLegacy = Pick<
  CreateInvoiceVaPayload,
  "grandTotal" | "bankCode" | "customerNo"
> & { productLabel: string };
