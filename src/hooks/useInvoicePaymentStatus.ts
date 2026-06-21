import { useCallback, useEffect, useRef, useState } from "react";

import { fetchInvoiceStatus, InvoiceApiError } from "../services/invoice.service";
import type { InvoiceVaStatus } from "../types/invoice";

const POLL_INTERVAL_MS = 5000;

export interface UseInvoicePaymentStatusOptions {
  orderId: string | null;
  /** Aktifkan polling saat modal terbuka */
  enabled: boolean;
  onPaid?: () => void;
}

export interface UseInvoicePaymentStatusResult {
  status: InvoiceVaStatus | null;
  isPaid: boolean;
  isChecking: boolean;
  checkError: string | null;
  checkStatus: () => Promise<InvoiceVaStatus | null>;
}

export function useInvoicePaymentStatus({
  orderId,
  enabled,
  onPaid,
}: UseInvoicePaymentStatusOptions): UseInvoicePaymentStatusResult {
  const [status, setStatus] = useState<InvoiceVaStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const onPaidRef = useRef(onPaid);

  useEffect(() => {
    onPaidRef.current = onPaid;
  }, [onPaid]);

  const isPaid = status === "PAID";

  const checkStatus = useCallback(async (): Promise<InvoiceVaStatus | null> => {
    if (!orderId) {
      return null;
    }

    setIsChecking(true);
    setCheckError(null);

    try {
      const data = await fetchInvoiceStatus(orderId);
      setStatus(data.status);

      if (data.status === "PAID") {
        onPaidRef.current?.();
      }

      return data.status;
    } catch (err) {
      const message =
        err instanceof InvoiceApiError
          ? err.message
          : err instanceof Error
            ? err.message
            : "Gagal memeriksa status pembayaran.";

      setCheckError(message);
      return null;
    } finally {
      setIsChecking(false);
    }
  }, [orderId]);

  useEffect(() => {
    if (!enabled || !orderId || isPaid) {
      return;
    }

    void checkStatus();

    const intervalId = window.setInterval(() => {
      void checkStatus();
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [enabled, orderId, isPaid, checkStatus]);

  useEffect(() => {
    if (!enabled) {
      setStatus(null);
      setCheckError(null);
    }
  }, [enabled]);

  return {
    status,
    isPaid,
    isChecking,
    checkError,
    checkStatus,
  };
}
