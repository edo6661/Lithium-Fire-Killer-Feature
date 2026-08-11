import { useCallback, useState } from "react";

import {
  createInvoiceQris,
  createInvoiceVa,
  InvoiceApiError,
} from "../services/invoice.service";
import type {
  CreateInvoiceQrisPayload,
  CreateInvoiceVaPayload,
  InvoiceVaData,
} from "../types/invoice";

export type ToastVariant = "error" | "success";

export interface ToastState {
  message: string;
  variant: ToastVariant;
}

export type CheckoutStep = "form" | "paying" | "success";

export interface UseCreateInvoiceVaResult {
  isLoading: boolean;
  error: string | null;
  vaData: InvoiceVaData | null;
  isCheckoutOpen: boolean;
  checkoutStep: CheckoutStep;
  isPaymentComplete: boolean;
  lastPaidOrderId: string | null;
  lastPaidAmount: number | null;
  toast: ToastState | null;
  openCheckout: () => void;
  handleCreateVA: (payload: CreateInvoiceVaPayload) => Promise<void>;
  handleCreateQris: (payload: CreateInvoiceQrisPayload) => Promise<void>;
  markPaymentPaid: () => void;
  handlePaymentComplete: () => void;
  closeCheckout: () => void;
  clearToast: () => void;
  clearError: () => void;
}

export function useCreateInvoiceVa(): UseCreateInvoiceVaResult {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vaData, setVaData] = useState<InvoiceVaData | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("form");
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [lastPaidOrderId, setLastPaidOrderId] = useState<string | null>(null);
  const [lastPaidAmount, setLastPaidAmount] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const clearToast = useCallback(() => setToast(null), []);
  const clearError = useCallback(() => setError(null), []);

  const openCheckout = useCallback(() => {
    setError(null);
    setVaData(null);
    setIsPaymentComplete(false);
    setCheckoutStep("form");
    setIsCheckoutOpen(true);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    // Tutup selalu kembali ke form bersih; transaksi lama tidak dibawa lagi
    setCheckoutStep("form");
    setError(null);
  }, []);

  const markPaymentPaid = useCallback(() => {
    setVaData((prev) => (prev ? { ...prev, status: "PAID" } : prev));
    setCheckoutStep("success");
  }, []);

  const handlePaymentComplete = useCallback(() => {
    setIsPaymentComplete(true);
    setLastPaidOrderId(vaData?.orderId ?? null);
    setLastPaidAmount(vaData?.grandTotal ?? null);
    setIsCheckoutOpen(false);
    setCheckoutStep("form");
    setVaData(null);
    setToast({
      message: "Pembayaran berhasil diterima! Terima kasih.",
      variant: "success",
    });
  }, [vaData?.orderId, vaData?.grandTotal]);

  const handleCreateVA = useCallback(
    async (payload: CreateInvoiceVaPayload) => {
      setIsLoading(true);
      setError(null);
      setIsPaymentComplete(false);
      setLastPaidOrderId(null);
      setLastPaidAmount(null);
      clearToast();

      try {
        const data = await createInvoiceVa(payload);
        setVaData(data);
        setCheckoutStep("paying");
        setIsCheckoutOpen(true);
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
    },
    [clearToast],
  );

  const handleCreateQris = useCallback(
    async (payload: CreateInvoiceQrisPayload) => {
      setIsLoading(true);
      setError(null);
      setIsPaymentComplete(false);
      setLastPaidOrderId(null);
      setLastPaidAmount(null);
      clearToast();

      try {
        const data = await createInvoiceQris(payload);
        setVaData(data);
        setCheckoutStep("paying");
        setIsCheckoutOpen(true);
        setToast({
          message: "QRIS berhasil dibuat. Silakan scan dan bayar.",
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
    },
    [clearToast],
  );

  return {
    isLoading,
    error,
    vaData,
    isCheckoutOpen,
    checkoutStep,
    isPaymentComplete,
    lastPaidOrderId,
    lastPaidAmount,
    toast,
    openCheckout,
    handleCreateVA,
    handleCreateQris,
    markPaymentPaid,
    handlePaymentComplete,
    closeCheckout,
    clearToast,
    clearError,
  };
}
