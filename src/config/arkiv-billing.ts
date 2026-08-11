import type { CreateInvoiceVaPayload } from "../types/invoice";

/** Prefix nomor dokumen tagihan LFK × Arkiv (trxId YUKK / partnerReferenceNo QRIS). */
export const ARKIV_ORDER_ID_PREFIX = "SPR-ARKIV";

/** Nomor unik per percobaan checkout — hindari 409 InvoiceAlreadyExists. */
export function buildArkivOrderId(): string {
  return `${ARKIV_ORDER_ID_PREFIX}-${Date.now()}`;
}

export type ArkivPaymentMethod = "VA" | "QRIS";

export const ARKIV_VA_BANKS = [
  { code: "BRI", label: "BRI" },
  { code: "MANDIRI", label: "Mandiri" },
  { code: "BNI", label: "BNI" },
  { code: "PERMATA", label: "Permata" },
  { code: "CIMB", label: "CIMB" },
  // BCA di-hide — early go-live VA non-BCA saja
  // { code: "BCA", label: "BCA" },
] as const;

export type ArkivVaBankCode = (typeof ARKIV_VA_BANKS)[number]["code"];

/**
 * QRIS YUKK limit ~Rp 10.000.000 — produk real Rp 11.900.000 tidak muat.
 * false = sembunyikan QRIS di checkout (VA saja).
 * true  = tampilkan lagi (setelah limit dinaikkan / harga ≤ 10jt).
 */
export const ARKIV_QRIS_ENABLED = true;

/**
 * Tagihan aktif LFK × Arkiv.
 *
 * REMINDER early go-live:
 * - Batasi ±10 transaksi / hari agar tidak ternotice BI (kesepakatan YUKK).
 * - Masih harus test VA end-to-end di local sebelum andalkan prod.
 * - Logo bank belum ditambah (opsional).
 *
 * Harga real (saat go-live / user bilang siap): Rp 11.900.000
 */
export const ACTIVE_ARKIV_BILLING = {
  /**
   * Nominal TEST untuk sampling.
   * Ganti ke 11_900_000 saat harga real aktif (VA saja selama ARKIV_QRIS_ENABLED=false).
   */
  amounts: {
    VA: 10_000,
    QRIS: 1_000,
  } as const satisfies Record<ArkivPaymentMethod, number>,
  /** Harga jual final — aktifkan dengan mengganti `amounts` di atas. */
  realAmount: 11_900_000,
  defaultBankCode: "BRI" as ArkivVaBankCode,
  customerNo: "10011212",
  productLabel: "LFK x Arkiv - SARU Edition",
  productImage: "/products/arkiv/front.png",
} as const;

/** Sudut produk — file di public/products/arkiv */
export const ARKIV_PRODUCT_VIEWS = {
  front: "/products/arkiv/front.png",
  back: "/products/arkiv/back.png",
  left: "/products/arkiv/left.png",
  right: "/products/arkiv/right.png",
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
