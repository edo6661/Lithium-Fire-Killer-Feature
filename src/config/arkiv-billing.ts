import type { CreateInvoiceVaPayload } from "../types/invoice";

/** Tagihan SPR/Invoice aktif untuk halaman LFK × Arkiv (ganti saat integrasi MySQL frontend). */
export const ACTIVE_ARKIV_BILLING: Pick<
  CreateInvoiceVaPayload,
  "orderId" | "grandTotal" | "bankCode" | "customerNo"
> & {
  productLabel: string;
} = {
  orderId: "SPR-ARKIV-2026-001",
  grandTotal: 5_000_000,
  bankCode: "BCA",
  customerNo: "10011212",
  productLabel: "LFK × Arkiv — SARU Edition (Tier 2)",
};
