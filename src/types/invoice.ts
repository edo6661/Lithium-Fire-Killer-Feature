export type InvoiceVaStatus =
  | "PENDING"
  | "PAID"
  | "UNPAID"
  | "EXPIRED"
  | "FAILED"
  | "CANCELLED";

export interface CreateInvoiceVaPayload {
  orderId: string;
  grandTotal: number;
  bankCode: string;
  customerNo: string;
  virtualAccountName: string;
  virtualAccountEmail: string;
  virtualAccountPhone: string;
  customerAddress: string;
  customerNotes?: string;
  notes?: string;
}

export interface CreateInvoiceQrisPayload {
  orderId: string;
  grandTotal: number;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerNotes?: string;
  notes?: string;
}

/** Unified payment invoice payload returned by VA or QRIS create. */
export interface InvoiceVaData {
  orderId: string;
  grandTotal: number;
  status: InvoiceVaStatus;
  virtualAccountNo: string;
  virtualAccountBank: string;
  paymentChannelCode: string;
  paymentChannelName?: string;
  yukkResponseCode?: string;
  expiredDate?: string;
  qrisReferenceNo?: string | null;
  qrisContent?: string | null;
}

export interface SyncInvoiceStatusData {
  orderId: string;
  previousStatus: InvoiceVaStatus;
  newStatus: InvoiceVaStatus;
  updated: boolean;
  yukkTransactionStatus?: string;
  yukkTransactionStatusDesc?: string;
  /** Set when SUCCESS was blocked (stok/kuota). */
  blockReason?: "SOLD_OUT" | "DAILY_LIMIT" | null;
}

export interface SyncInvoiceStatusApiResponse {
  success: boolean;
  data?: SyncInvoiceStatusData;
  message?: string;
  responseCode?: string;
}

export interface InvoiceStatusData {
  orderId: string;
  status: InvoiceVaStatus;
  grandTotal: number;
  virtualAccountNo: string | null;
  virtualAccountBank: string | null;
  paidAt: string | null;
}

export interface InvoiceStatusApiResponse {
  success: boolean;
  data?: InvoiceStatusData;
  message?: string;
}

export interface CreateInvoiceVaApiResponse {
  success: boolean;
  data?: InvoiceVaData;
  message?: string;
  responseCode?: string;
  hint?: string;
  code?: string;
}

export interface CreateInvoiceQrisApiResponse {
  success: boolean;
  data?: InvoiceVaData;
  message?: string;
  responseCode?: string;
  hint?: string;
  code?: string;
}

export interface YukkHealthReport {
  ready: boolean;
  canAttemptApi?: boolean;
}
