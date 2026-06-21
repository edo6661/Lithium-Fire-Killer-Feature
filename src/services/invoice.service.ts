import { API_BASE_URL } from "../config/api";
import type {
  CreateInvoiceVaApiResponse,
  CreateInvoiceVaPayload,
  InvoiceStatusApiResponse,
  InvoiceStatusData,
  InvoiceVaData,
} from "../types/invoice";

export class InvoiceApiError extends Error {
  readonly statusCode: number;
  readonly responseCode?: string;

  constructor(message: string, statusCode: number, responseCode?: string) {
    super(message);
    this.name = "InvoiceApiError";
    this.statusCode = statusCode;
    this.responseCode = responseCode;
  }
}

function resolveErrorMessage(body: CreateInvoiceVaApiResponse, status: number): string {
  if (body.message) {
    return body.message;
  }

  if (status === 409) {
    return "Tagihan dengan nomor dokumen ini sudah pernah dibuat. Silakan cek instruksi pembayaran Anda.";
  }

  if (status >= 500) {
    return "Server sedang bermasalah. Silakan coba beberapa saat lagi.";
  }

  return "Gagal membuat Virtual Account. Periksa data Anda dan coba lagi.";
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
      resolveErrorMessage(body, response.status),
      response.status,
      body.responseCode,
    );
  }

  return body.data;
}

export async function fetchInvoiceStatus(orderId: string): Promise<InvoiceStatusData> {
  const encodedOrderId = encodeURIComponent(orderId);
  const response = await fetch(`${API_BASE_URL}/api/invoices/${encodedOrderId}/status`, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

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
