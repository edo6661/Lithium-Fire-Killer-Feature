import { useCallback, useEffect, useState } from "react";

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
import {
  clearArkivPendingPayment,
  isResumableCheckoutStep,
  readArkivPendingPayment,
  writeArkivPendingPayment,
  type ArkivCheckoutStep,
} from "../utils/arkiv-pending-payment";

export type ToastVariant = "error" | "success";

export interface ToastState {
  message: string;
  variant: ToastVariant;
}

export type CheckoutStep = ArkivCheckoutStep;

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
  /** Ada sesi pembayaran yang bisa dilanjutkan (modal tertutup). */
  hasPendingSession: boolean;
  openCheckout: () => void;
  resumeCheckout: () => void;
  dismissPendingSession: () => void;
  handleCreateVA: (payload: CreateInvoiceVaPayload) => Promise<void>;
  handleCreateQris: (payload: CreateInvoiceQrisPayload) => Promise<void>;
  markPaymentPaid: () => void;
  markPaymentExpired: () => void;
  markPaymentFailed: () => void;
  retryCheckout: () => void;
  handlePaymentComplete: () => void;
  closeCheckout: () => void;
  clearToast: () => void;
  clearError: () => void;
}

function loadInitialSession(): {
  vaData: InvoiceVaData | null;
  checkoutStep: CheckoutStep;
} {
  const saved = readArkivPendingPayment();
  if (!saved || !isResumableCheckoutStep(saved.step)) {
    return { vaData: null, checkoutStep: "form" };
  }
  return { vaData: saved.vaData, checkoutStep: saved.step };
}

export function useCreateInvoiceVa(): UseCreateInvoiceVaResult {
  const initial = loadInitialSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vaData, setVaData] = useState<InvoiceVaData | null>(initial.vaData);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>(initial.checkoutStep);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [lastPaidOrderId, setLastPaidOrderId] = useState<string | null>(null);
  const [lastPaidAmount, setLastPaidAmount] = useState<number | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const clearToast = useCallback(() => setToast(null), []);
  const clearError = useCallback(() => setError(null), []);

  useEffect(() => {
    if (vaData && isResumableCheckoutStep(checkoutStep)) {
      writeArkivPendingPayment({ vaData, step: checkoutStep });
      return;
    }
    if (checkoutStep === "form" && !vaData) {
      clearArkivPendingPayment();
    }
  }, [vaData, checkoutStep]);

  const hasPendingSession =
    !isCheckoutOpen && Boolean(vaData) && isResumableCheckoutStep(checkoutStep);

  /** Buka modal — resume otomatis jika masih ada sesi pembayaran. */
  const openCheckout = useCallback(() => {
    setError(null);
    setIsPaymentComplete(false);
    setIsCheckoutOpen(true);
  }, []);

  const resumeCheckout = useCallback(() => {
    setError(null);
    setIsCheckoutOpen(true);
  }, []);

  const dismissPendingSession = useCallback(() => {
    const ok = window.confirm(
      "Tutup pengingat pembayaran ini?\n\nTagihan di bank/YUKK tetap ada sampai kadaluarsa. Anda bisa buat pesanan baru nanti.",
    );
    if (!ok) return;
    clearArkivPendingPayment();
    setVaData(null);
    setCheckoutStep("form");
    setIsCheckoutOpen(false);
    setError(null);
  }, []);

  const closeCheckout = useCallback(() => {
    setIsCheckoutOpen(false);
    setError(null);
  }, []);

  const markPaymentPaid = useCallback(() => {
    setVaData((prev) => (prev ? { ...prev, status: "PAID" } : prev));
    setCheckoutStep("success");
  }, []);

  const markPaymentExpired = useCallback(() => {
    setVaData((prev) => (prev ? { ...prev, status: "EXPIRED" } : prev));
    setCheckoutStep("expired");
  }, []);

  const markPaymentFailed = useCallback(() => {
    setVaData((prev) => (prev ? { ...prev, status: "FAILED" } : prev));
    setCheckoutStep("failed");
  }, []);

  const retryCheckout = useCallback(() => {
    clearArkivPendingPayment();
    setVaData(null);
    setError(null);
    setCheckoutStep("form");
    setIsCheckoutOpen(true);
  }, []);

  const handlePaymentComplete = useCallback(() => {
    setIsPaymentComplete(true);
    setLastPaidOrderId(vaData?.orderId ?? null);
    setLastPaidAmount(vaData?.grandTotal ?? null);
    clearArkivPendingPayment();
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
        writeArkivPendingPayment({ vaData: data, step: "paying" });
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
        writeArkivPendingPayment({ vaData: data, step: "paying" });
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
    hasPendingSession,
    openCheckout,
    resumeCheckout,
    dismissPendingSession,
    handleCreateVA,
    handleCreateQris,
    markPaymentPaid,
    markPaymentExpired,
    markPaymentFailed,
    retryCheckout,
    handlePaymentComplete,
    closeCheckout,
    clearToast,
    clearError,
  };
}
