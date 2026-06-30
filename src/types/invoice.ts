export type InvoiceVaStatus = "PENDING" | "PAID" | "UNPAID" | "EXPIRED" | "FAILED";

export interface CreateInvoiceVaPayload {
  orderId: string;
  grandTotal: number;
  bankCode: string;
  customerNo: string;
  virtualAccountName: string;
  virtualAccountEmail: string;
  virtualAccountPhone: string;
  notes?: string;
}

export interface InvoiceVaData {
  orderId: string;
  grandTotal: number;
  status: InvoiceVaStatus;
  virtualAccountNo: string;
  virtualAccountBank: string;
  paymentChannelCode: string;
  yukkResponseCode?: string;
  expiredDate?: string;
}

export interface SyncInvoiceStatusData {
  orderId: string;
  previousStatus: InvoiceVaStatus;
  newStatus: InvoiceVaStatus;
  updated: boolean;
  yukkTransactionStatus?: string;
  yukkTransactionStatusDesc?: string;
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
}

export interface YukkHealthReport {
  ready: boolean;
  canAttemptApi?: boolean;
}
