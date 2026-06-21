import { useCallback, useState } from "react";

import { createInvoiceVa, InvoiceApiError } from "../services/invoice.service";
import type { CreateInvoiceVaPayload, InvoiceVaData } from "../types/invoice";

export type ToastVariant = "error" | "success";

export interface ToastState {
  message: string;
  variant: ToastVariant;
}

export interface UseCreateInvoiceVaResult {
  isLoading: boolean;
  error: string | null;
  vaData: InvoiceVaData | null;
  isModalOpen: boolean;
  isPaymentComplete: boolean;
  toast: ToastState | null;
  handleCreateVA: (payload: CreateInvoiceVaPayload) => Promise<void>;
  markPaymentPaid: () => void;
  handlePaymentComplete: () => void;
  closeModal: () => void;
  clearToast: () => void;
  clearError: () => void;
}

export function useCreateInvoiceVa(): UseCreateInvoiceVaResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vaData, setVaData] = useState<InvoiceVaData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const clearToast = useCallback(() => setToast(null), []);
  const clearError = useCallback(() => setError(null), []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const markPaymentPaid = useCallback(() => {
    setVaData((prev) => (prev ? { ...prev, status: "PAID" } : prev));
  }, []);

  const handlePaymentComplete = useCallback(() => {
    setIsPaymentComplete(true);
    setIsModalOpen(false);
    setToast({
      message: "Pembayaran berhasil diterima! Terima kasih.",
      variant: "success",
    });
  }, []);

  const handleCreateVA = useCallback(async (payload: CreateInvoiceVaPayload) => {
    setIsLoading(true);
    setError(null);
    setIsPaymentComplete(false);
    clearToast();

    try {
      const data = await createInvoiceVa(payload);
      setVaData(data);
      setIsModalOpen(true);
      setToast({
        message: "Virtual Account berhasil dibuat. Silakan selesaikan pembayaran.",
        variant: "success",
      });
    } catch (err) {
      const message =
        err instanceof InvoiceApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Terjadi kesalahan tak terduga.";

      setError(message);
      setToast({ message, variant: "error" });
    } finally {
      setIsLoading(false);
    }
  }, [clearToast]);

  return {
    isLoading,
    error,
    vaData,
    isModalOpen,
    isPaymentComplete,
    toast,
    handleCreateVA,
    markPaymentPaid,
    handlePaymentComplete,
    closeModal,
    clearToast,
    clearError,
  };
}
