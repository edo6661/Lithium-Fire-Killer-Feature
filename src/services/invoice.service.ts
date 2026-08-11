import { API_BASE_URL } from "../config/api";
import type {
  CreateInvoiceQrisApiResponse,
  CreateInvoiceQrisPayload,
  CreateInvoiceVaApiResponse,
  CreateInvoiceVaPayload,
  InvoiceStatusApiResponse,
  InvoiceStatusData,
  InvoiceVaData,
  SyncInvoiceStatusApiResponse,
  SyncInvoiceStatusData,
  YukkHealthReport,
} from "../types/invoice";

export class InvoiceApiError extends Error {
  readonly statusCode: number;
  readonly responseCode?: string;
  readonly hint?: string;

  constructor(
    message: string,
    statusCode: number,
    responseCode?: string,
    hint?: string,
  ) {
    super(message);
    this.name = "InvoiceApiError";
    this.statusCode = statusCode;
    this.responseCode = responseCode;
    this.hint = hint;
  }
}

function resolveErrorMessage(
  body: { message?: string; hint?: string },
  status: number,
  fallback: string,
): string {
  if (body.message && body.hint) {
    return `${body.message} ${body.hint}`;
  }

  if (body.message) {
    return body.message;
  }

  if (status === 409) {
    return "Tagihan dengan nomor dokumen ini sudah pernah dibuat. Silakan cek instruksi pembayaran Anda.";
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
