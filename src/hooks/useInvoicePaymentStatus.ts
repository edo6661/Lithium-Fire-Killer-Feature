import { useCallback, useEffect, useRef, useState } from "react";

import {
  expireInvoiceIfDue,
  syncInvoicePaymentStatus,
  InvoiceApiError,
} from "../services/invoice.service";
import type { InvoiceVaStatus } from "../types/invoice";

const POLL_INTERVAL_MS = 5000;

const TERMINAL_STATUSES: ReadonlySet<InvoiceVaStatus> = new Set([
  "PAID",
  "EXPIRED",
  "FAILED",
]);

export function isTerminalInvoiceStatus(
  status: InvoiceVaStatus | null | undefined,
): boolean {
  return status != null && TERMINAL_STATUSES.has(status);
}

export interface UseInvoicePaymentStatusOptions {
  orderId: string | null;
  /** Aktifkan polling saat modal terbuka */
  enabled: boolean;
  /** ISO deadline dari VA/QRIS — jika lewat, persist EXPIRED ke DB */
  expiredDate?: string | null;
  onPaid?: () => void;
  onExpired?: () => void;
  onFailed?: () => void;
  onDailyLimit?: () => void;
  onSoldOut?: () => void;
}

export interface UseInvoicePaymentStatusResult {
  status: InvoiceVaStatus | null;
  isPaid: boolean;
  isExpired: boolean;
  isFailed: boolean;
  isTerminal: boolean;
  isChecking: boolean;
  checkError: string | null;
  checkStatus: () => Promise<InvoiceVaStatus | null>;
}

export function useInvoicePaymentStatus({
  orderId,
  enabled,
  expiredDate,
  onPaid,
  onExpired,
  onFailed,
  onDailyLimit,
  onSoldOut,
}: UseInvoicePaymentStatusOptions): UseInvoicePaymentStatusResult {
  const [status, setStatus] = useState<InvoiceVaStatus | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const onPaidRef = useRef(onPaid);
  const onExpiredRef = useRef(onExpired);
  const onFailedRef = useRef(onFailed);
  const onDailyLimitRef = useRef(onDailyLimit);
  const onSoldOutRef = useRef(onSoldOut);
  const localExpiredFiredRef = useRef(false);

  useEffect(() => {
    onPaidRef.current = onPaid;
  }, [onPaid]);

  useEffect(() => {
    onExpiredRef.current = onExpired;
  }, [onExpired]);

  useEffect(() => {
    onFailedRef.current = onFailed;
  }, [onFailed]);

  useEffect(() => {
    onDailyLimitRef.current = onDailyLimit;
  }, [onDailyLimit]);

  useEffect(() => {
    onSoldOutRef.current = onSoldOut;
  }, [onSoldOut]);

  const isPaid = status === "PAID";
  const isExpired = status === "EXPIRED";
  const isFailed = status === "FAILED";
  const isTerminal = isTerminalInvoiceStatus(status);

  const applyStatus = useCallback(
    (
      next: InvoiceVaStatus,
      blockReason?: "SOLD_OUT" | "DAILY_LIMIT" | null,
    ) => {
      setStatus(next);
      if (next === "PAID") onPaidRef.current?.();
      if (next === "EXPIRED") onExpiredRef.current?.();
      if (next === "FAILED") {
        if (blockReason === "SOLD_OUT") onSoldOutRef.current?.();
        else if (blockReason === "DAILY_LIMIT") onDailyLimitRef.current?.();
        else onFailedRef.current?.();
      }
    },
    [],
  );

  const checkStatus = useCallback(async (): Promise<InvoiceVaStatus | null> => {
    if (!orderId) {
      return null;
    }

    setIsChecking(true);
    setCheckError(null);

    try {
      const data = await syncInvoicePaymentStatus(orderId);
      applyStatus(data.newStatus, data.blockReason);
      return data.newStatus;
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
  }, [orderId, applyStatus]);

  useEffect(() => {
    if (!enabled || !orderId || isTerminal) {
      return;
    }

    void checkStatus();

    const intervalId = window.setInterval(() => {
      void checkStatus();
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, [enabled, orderId, isTerminal, checkStatus]);

  /** Saat deadline lewat: persist EXPIRED ke DB, lalu update UI. */
  useEffect(() => {
    if (!enabled || !orderId || !expiredDate || isTerminal || localExpiredFiredRef.current) {
      return;
    }

    const deadline = new Date(expiredDate).getTime();
    if (Number.isNaN(deadline)) return;

    const fireLocalExpire = () => {
      if (localExpiredFiredRef.current) return;
      localExpiredFiredRef.current = true;
      void (async () => {
        try {
          const expired = await expireInvoiceIfDue(orderId);
          if (
            expired.newStatus === "EXPIRED" ||
            expired.newStatus === "FAILED" ||
            expired.newStatus === "PAID"
          ) {
            applyStatus(expired.newStatus);
            return;
          }
        } catch {
          // fallback sync YUKK (juga apply deadline di server)
        }

        try {
          const synced = await syncInvoicePaymentStatus(orderId);
          applyStatus(synced.newStatus);
          if (isTerminalInvoiceStatus(synced.newStatus)) return;
        } catch {
          // last resort: UI only — status DB mungkin belum update
        }

        applyStatus("EXPIRED");
      })();
    };

    const remaining = deadline - Date.now();
    if (remaining <= 0) {
      fireLocalExpire();
      return;
    }

    const timeoutId = window.setTimeout(fireLocalExpire, remaining);
    return () => window.clearTimeout(timeoutId);
  }, [enabled, orderId, expiredDate, isTerminal, applyStatus]);

  useEffect(() => {
    if (!enabled) {
      setStatus(null);
      setCheckError(null);
      localExpiredFiredRef.current = false;
    }
  }, [enabled]);

  return {
    status,
    isPaid,
    isExpired,
    isFailed,
    isTerminal,
    isChecking,
    checkError,
    checkStatus,
  };
}
