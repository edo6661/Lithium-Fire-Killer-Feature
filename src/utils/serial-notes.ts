/**
 * Preferred serial digits for Arkiv checkout notes (customerNotes).
 * Rules: digits only, exactly 2 chars when filled.
 * Public checkout: both digits must differ (no twins).
 * Internal manual: twins allowed when `allowTwin: true`.
 */

export type SerialNotesResult =
  | { ok: true; value?: string }
  | { ok: false; reason: "incomplete" | "twin" };

export type ValidateSerialNotesOptions = {
  /** When true, twin digits (88, 99, …) are accepted. */
  allowTwin?: boolean;
};

export function normalizeSerialNotes(raw: string): string {
  return String(raw ?? "").replace(/\D/g, "").slice(0, 2);
}

/** True when both digits are the same (88, 99, …). */
export function isTwinSerialNotes(digits: string): boolean {
  return digits.length === 2 && digits[0] === digits[1];
}

/**
 * Empty → ok (optional).
 * One digit → incomplete.
 * Twin digits → twin (unless `allowTwin`).
 * Two digits → ok with value.
 */
export function validateSerialNotes(
  raw: string,
  opts?: ValidateSerialNotesOptions,
): SerialNotesResult {
  const digits = normalizeSerialNotes(raw);
  if (!digits) return { ok: true, value: undefined };
  if (digits.length < 2) return { ok: false, reason: "incomplete" };
  if (!opts?.allowTwin && isTwinSerialNotes(digits)) {
    return { ok: false, reason: "twin" };
  }
  return { ok: true, value: digits };
}
