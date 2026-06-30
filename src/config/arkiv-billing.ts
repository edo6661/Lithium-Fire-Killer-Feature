import type { CreateInvoiceVaPayload } from "../types/invoice";

/** Prefix nomor dokumen tagihan LFK × Arkiv (trxId YUKK). */
export const ARKIV_ORDER_ID_PREFIX = "SPR-ARKIV";

/** Nomor unik per percobaan checkout — hindari 409 InvoiceAlreadyExists. */
export function buildArkivOrderId(): string {
  return `${ARKIV_ORDER_ID_PREFIX}-${Date.now()}`;
}

/** Tagihan aktif untuk halaman LFK × Arkiv. */
export const ACTIVE_ARKIV_BILLING: Pick<
  CreateInvoiceVaPayload,
  "grandTotal" | "bankCode" | "customerNo"
> & {
  productLabel: string;
} = {
  grandTotal: 5_000_000,
  bankCode: "BCA",
  customerNo: "10011212",
  productLabel: "LFK x Arkiv - SARU Edition (Tier 2)",
};
