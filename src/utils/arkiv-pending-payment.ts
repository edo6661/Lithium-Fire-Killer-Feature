import type { InvoiceVaData } from "../types/invoice";

const STORAGE_KEY = "lfk-arkiv-pending-payment";

export type ArkivCheckoutStep = "form" | "paying" | "success" | "expired" | "failed";

export type ArkivPendingPaymentSession = {
  vaData: InvoiceVaData;
  step: ArkivCheckoutStep;
  savedAt: string;
};

export function readArkivPendingPayment(): ArkivPendingPaymentSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ArkivPendingPaymentSession;
    if (!parsed?.vaData?.orderId || !parsed.step) return null;
    if (parsed.step === "form") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writeArkivPendingPayment(
  session: Omit<ArkivPendingPaymentSession, "savedAt">,
): void {
  try {
    const payload: ArkivPendingPaymentSession = {
      ...session,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* private mode / quota */
  }
}

export function clearArkivPendingPayment(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}

export function isResumableCheckoutStep(step: ArkivCheckoutStep): boolean {
  return (
    step === "paying" ||
    step === "success" ||
    step === "expired" ||
    step === "failed"
  );
}
