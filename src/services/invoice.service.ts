import { API_BASE_URL } from "../config/api";
import type {
  CreateInvoiceQrisApiResponse,
  CreateInvoiceQrisPayload,
  CreateInvoiceVaApiResponse,
  CreateInvoiceVaPayload,
  InvoiceStatusApiResponse,
  InvoiceStatusData,
  InvoiceVaData,
  InvoiceVaStatus,
  SyncInvoiceStatusApiResponse,
  SyncInvoiceStatusData,
  YukkHealthReport,
} from "../types/invoice";

export class InvoiceApiError extends Error {
  readonly statusCode: number;
  readonly responseCode?: string;
  readonly hint?: string;
  /** Business code from backend, e.g. SOLD_OUT | DAILY_LIMIT */
  readonly code?: string;

  constructor(
    message: string,
    statusCode: number,
    responseCode?: string,
    hint?: string,
    code?: string,
  ) {
    super(message);
    this.name = "InvoiceApiError";
    this.statusCode = statusCode;
    this.responseCode = responseCode;
    this.hint = hint;
    this.code = code;
  }
}

function resolveErrorMessage(
  body: { message?: string; hint?: string; code?: string },
  status: number,
  fallback: string,
): string {
  if (body.code === "SOLD_OUT") {
    return "Stok edisi terbatas sudah habis. Pembelian tidak bisa dilanjutkan.";
  }
  if (body.code === "DAILY_LIMIT") {
    return "Kuota pembayaran hari ini sudah penuh. Silakan coba lagi besok.";
  }

  if (body.message && body.hint) {
    return `${body.message} ${body.hint}`;
  }

  if (body.message) {
    return body.message;
  }

  if (status === 409) {
    return "Tagihan dengan nomor dokumen ini sudah pernah dibuat. Silakan cek instruksi pembayaran Anda.";
  }

  if (status === 429) {
    return "Kuota pembayaran hari ini sudah penuh. Silakan coba lagi besok.";
  }

  if (status >= 500) {
    return "Server sedang bermasalah. Silakan coba beberapa saat lagi.";
  }

  return fallback;
}

export async function createInvoiceVa(
  payload: CreateInvoiceVaPayload,
): Promise<InvoiceVaData> {
  const response = await fetch(`${API_BASE_URL}/api/invoices/va`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  let body: CreateInvoiceVaApiResponse;

  try {
    body = (await response.json()) as CreateInvoiceVaApiResponse;
  } catch {
    throw new InvoiceApiError(
      "Respons server tidak valid. Pastikan backend berjalan.",
      response.status,
    );
  }

  if (!response.ok || !body.success || !body.data) {
    throw new InvoiceApiError(
      resolveErrorMessage(
        body,
        response.status,
        "Gagal membuat Virtual Account. Periksa data Anda dan coba lagi.",
      ),
      response.status,
      body.responseCode,
      body.hint,
      body.code,
    );
  }

  return {
    ...body.data,
    virtualAccountNo: body.data.virtualAccountNo ?? "",
    virtualAccountBank: body.data.virtualAccountBank ?? "",
  };
}

export async function createInvoiceQris(
  payload: CreateInvoiceQrisPayload,
): Promise<InvoiceVaData> {
  const response = await fetch(`${API_BASE_URL}/api/invoices/qris`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  let body: CreateInvoiceQrisApiResponse;

  try {
    body = (await response.json()) as CreateInvoiceQrisApiResponse;
  } catch {
    throw new InvoiceApiError(
      "Respons server tidak valid. Pastikan backend berjalan.",
      response.status,
    );
  }

  if (!response.ok || !body.success || !body.data) {
    throw new InvoiceApiError(
      resolveErrorMessage(
        body,
        response.status,
        "Gagal membuat QRIS. Periksa data Anda dan coba lagi.",
      ),
      response.status,
      body.responseCode,
      body.hint,
      body.code,
    );
  }

  return {
    ...body.data,
    virtualAccountNo: body.data.virtualAccountNo ?? "",
    virtualAccountBank: body.data.virtualAccountBank ?? "QRIS",
  };
}

export async function fetchYukkBackendHealth(): Promise<YukkHealthReport> {
  const response = await fetch(`${API_BASE_URL}/health/yukk`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8_000),
  });

  if (!response.ok) {
    throw new Error(`Backend health check failed: HTTP ${response.status}`);
  }

  return (await response.json()) as YukkHealthReport;
}

export async function syncInvoicePaymentStatus(
  orderId: string,
): Promise<SyncInvoiceStatusData> {
  const encodedOrderId = encodeURIComponent(orderId);
  const response = await fetch(
    `${API_BASE_URL}/api/invoices/${encodedOrderId}/sync-yukk`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
    },
  );

  let body: SyncInvoiceStatusApiResponse;

  try {
    body = (await response.json()) as SyncInvoiceStatusApiResponse;
  } catch {
    throw new InvoiceApiError(
      "Respons server tidak valid. Pastikan backend berjalan.",
      response.status,
    );
  }

  if (!response.ok || !body.success || !body.data) {
    throw new InvoiceApiError(
      body.message ?? "Gagal menyinkronkan status pembayaran dari YUKK.",
      response.status,
      body.responseCode,
    );
  }

  return body.data;
}

/** Persist EXPIRED ke DB jika deadline sudah lewat (tanpa YUKK). */
export async function expireInvoiceIfDue(
  orderId: string,
): Promise<{
  orderId: string;
  previousStatus: InvoiceVaStatus;
  newStatus: InvoiceVaStatus;
  updated: boolean;
  reason: string;
}> {
  const encodedOrderId = encodeURIComponent(orderId);
  const response = await fetch(
    `${API_BASE_URL}/api/invoices/${encodedOrderId}/expire-if-due`,
    {
      method: "POST",
      headers: { Accept: "application/json" },
    },
  );

  let body: {
    success?: boolean;
    message?: string;
    data?: {
      orderId: string;
      previousStatus: InvoiceVaStatus;
      newStatus: InvoiceVaStatus;
      updated: boolean;
      reason: string;
    };
  };

  try {
    body = (await response.json()) as typeof body;
  } catch {
    throw new InvoiceApiError(
      "Respons server tidak valid. Pastikan backend berjalan.",
      response.status,
    );
  }

  if (!response.ok || !body.success || !body.data) {
    throw new InvoiceApiError(
      body.message ?? "Gagal menandai invoice kadaluarsa.",
      response.status,
    );
  }

  return body.data;
}

export async function fetchInvoiceStatus(
  orderId: string,
): Promise<InvoiceStatusData> {
  const encodedOrderId = encodeURIComponent(orderId);
  const response = await fetch(
    `${API_BASE_URL}/api/invoices/${encodedOrderId}/status`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
    },
  );

  let body: InvoiceStatusApiResponse;

  try {
    body = (await response.json()) as InvoiceStatusApiResponse;
  } catch {
    throw new InvoiceApiError(
      "Respons server tidak valid. Pastikan backend berjalan.",
      response.status,
    );
  }

  if (!response.ok || !body.success || !body.data) {
    throw new InvoiceApiError(
      body.message ?? "Gagal memeriksa status pembayaran.",
      response.status,
    );
  }

  return body.data;
}

export type ArkivStockData = {
  id: string;
  label: string;
  quantityInitial: number;
  quantityRemaining: number;
  sold: number;
  soldOut: boolean;
  dailyQuota?: {
    usedCount: number;
    limitPerDay: number;
    remaining: number;
    exhausted: boolean;
    dayKey: string;
  };
};

/** Tidak bisa mulai checkout baru: stok habis atau limit lunas harian penuh. */
export function isArkivPurchaseUnavailable(stock: ArkivStockData | null | undefined): boolean {
  if (!stock) return false;
  return stock.soldOut || stock.dailyQuota?.exhausted === true;
}

export async function cancelInvoiceVa(
  orderId: string,
  reason = "Dibatalkan dari checkout",
): Promise<{ orderId: string; status: string; previousStatus: string }> {
  const encodedOrderId = encodeURIComponent(orderId);
  const response = await fetch(
    `${API_BASE_URL}/api/invoices/${encodedOrderId}/cancel`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ reason }),
    },
  );

  let body: {
    success?: boolean;
    message?: string;
    data?: { orderId: string; status: string; previousStatus: string };
  };

  try {
    body = (await response.json()) as typeof body;
  } catch {
    throw new InvoiceApiError(
      "Respons server tidak valid. Pastikan backend berjalan.",
      response.status,
    );
  }

  if (!response.ok || !body.success || !body.data) {
    throw new InvoiceApiError(
      body.message ?? "Gagal membatalkan tagihan.",
      response.status,
    );
  }

  return body.data;
}

export async function fetchArkivStock(): Promise<ArkivStockData> {
  const response = await fetch(`${API_BASE_URL}/api/invoices/stock/arkiv`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8_000),
  });

  let body: { success?: boolean; message?: string; data?: ArkivStockData };

  try {
    body = (await response.json()) as {
      success?: boolean;
      message?: string;
      data?: ArkivStockData;
    };
  } catch {
    throw new InvoiceApiError(
      "Respons server tidak valid. Pastikan backend berjalan.",
      response.status,
    );
  }

  if (!response.ok || !body.success || !body.data) {
    throw new InvoiceApiError(
      body.message ?? "Gagal memuat stok produk.",
      response.status,
    );
  }

  return body.data;
}
